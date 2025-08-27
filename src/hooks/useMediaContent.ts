import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface MediaContent {
  id: string;
  title: string;
  type: 'film' | 'series' | 'sport';
  image_url: string;
  description: string | null;
  release_date: string | null;
  genre: string | null;
  status: 'recent' | 'upcoming' | 'live';
  priority: number;
  external_id: string | null;
  source: string | null;
  created_at: string;
  updated_at: string;
}

interface UseMediaContentReturn {
  content: MediaContent[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export const useMediaContent = (): UseMediaContentReturn => {
  const [content, setContent] = useState<MediaContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async () => {
    try {
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('media_content')
        .select('*')
        .order('priority', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(20);

      if (fetchError) {
        throw fetchError;
      }

      setContent((data as MediaContent[]) || []);
    } catch (err) {
      console.error('Error fetching media content:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch content');
      
      // Fallback to demo content if fetch fails
      setContent([
        {
          id: 'demo-1',
          title: 'Avengers: Endgame',
          type: 'film',
          image_url: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1280&h=720&fit=crop',
          description: 'Le grand finale de la saga Marvel',
          release_date: new Date().toISOString(),
          genre: 'Action, Science-fiction',
          status: 'recent',
          priority: 10,
          external_id: 'demo-1',
          source: 'DEMO',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'demo-2',
          title: 'Champions League Final',
          type: 'sport',
          image_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1280&h=720&fit=crop',
          description: 'La finale tant attendue',
          release_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          genre: 'Football',
          status: 'upcoming',
          priority: 15,
          external_id: 'demo-2',
          source: 'DEMO',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const triggerSync = async () => {
    try {
      await supabase.functions.invoke('sync-media-content');
      // Refresh content after sync
      setTimeout(fetchContent, 1000);
    } catch (err) {
      console.error('Error triggering sync:', err);
    }
  };

  useEffect(() => {
    fetchContent();
    
    // Trigger initial sync
    triggerSync();

    // Set up real-time subscription
    const channel = supabase
      .channel('media-content-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'media_content'
        },
        () => {
          fetchContent();
        }
      )
      .subscribe();

    // Auto-refresh every 30 minutes
    const interval = setInterval(() => {
      triggerSync();
    }, 30 * 60 * 1000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, []);

  return {
    content,
    loading,
    error,
    refresh: fetchContent
  };
};