import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.56.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  genre_ids: number[];
}

interface TMDBResponse {
  results: TMDBMovie[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = 'https://gbssebvzecsgcfjlqtqp.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdic3NlYnZ6ZWNzZ2NmamxxdHFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNjcwMDgsImV4cCI6MjA3MTc0MzAwOH0.NBaNJ4mMtRieOhzbxY-MlYgWJg0Fzsvqe6ZLUiKA4rQ';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const tmdbApiKey = Deno.env.get('TMDB_API_KEY');
    if (!tmdbApiKey) {
      throw new Error('TMDB_API_KEY not configured');
    }

    console.log('Starting media content sync...');
    const startTime = Date.now();
    let recordsAdded = 0;
    let recordsUpdated = 0;

    // Update sync status
    await supabase
      .from('content_sources')
      .update({ sync_status: 'syncing', last_sync: new Date().toISOString() })
      .eq('name', 'TMDB');

    // Fetch trending movies
    const trendingResponse = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${tmdbApiKey}`
    );
    const trendingData: TMDBResponse = await trendingResponse.json();

    // Fetch upcoming movies
    const upcomingResponse = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${tmdbApiKey}`
    );
    const upcomingData: TMDBResponse = await upcomingResponse.json();

    // Fetch genre mapping
    const genresResponse = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${tmdbApiKey}`
    );
    const genresData = await genresResponse.json();
    const genreMap = new Map(genresData.genres?.map((g: any) => [g.id, g.name]) || []);

    // Process trending movies
    for (const movie of trendingData.results?.slice(0, 10) || []) {
      const genres = movie.genre_ids?.map(id => genreMap.get(id)).filter(Boolean).join(', ') || '';
      const imageUrl = movie.poster_path 
        ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
        : 'https://via.placeholder.com/1280x720/1a1a1a/ffffff?text=No+Image';

      const mediaContent = {
        title: movie.title,
        type: 'film',
        image_url: imageUrl,
        description: movie.overview || '',
        release_date: movie.release_date || null,
        genre: genres,
        status: 'recent',
        priority: 10,
        external_id: movie.id.toString(),
        source: 'TMDB',
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24h expiry
      };

      const { error } = await supabase
        .from('media_content')
        .upsert(mediaContent, { 
          onConflict: 'external_id,source',
          ignoreDuplicates: false 
        });

      if (error) {
        console.error('Error upserting trending movie:', error);
      } else {
        recordsAdded++;
      }
    }

    // Process upcoming movies
    for (const movie of upcomingData.results?.slice(0, 5) || []) {
      const genres = movie.genre_ids?.map(id => genreMap.get(id)).filter(Boolean).join(', ') || '';
      const imageUrl = movie.poster_path 
        ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
        : 'https://via.placeholder.com/1280x720/1a1a1a/ffffff?text=No+Image';

      const mediaContent = {
        title: movie.title,
        type: 'film',
        image_url: imageUrl,
        description: movie.overview || '',
        release_date: movie.release_date || null,
        genre: genres,
        status: 'upcoming',
        priority: 8,
        external_id: movie.id.toString(),
        source: 'TMDB',
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days expiry
      };

      const { error } = await supabase
        .from('media_content')
        .upsert(mediaContent, { 
          onConflict: 'external_id,source',
          ignoreDuplicates: false 
        });

      if (error) {
        console.error('Error upserting upcoming movie:', error);
      } else {
        recordsAdded++;
      }
    }

    // Add some demo sports content
    const sportsContent = [
      {
        title: "Real Madrid vs Barcelona",
        type: 'sport',
        image_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1280&h=720&fit=crop',
        description: "El Clásico - Le match le plus attendu de la Liga",
        release_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        genre: 'Football',
        status: 'upcoming',
        priority: 15,
        external_id: 'rm-vs-barca-2024',
        source: 'DEMO',
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        title: "PSG vs Marseille",
        type: 'sport',
        image_url: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=1280&h=720&fit=crop',
        description: "Ligue 1 - Le Classique français",
        release_date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        genre: 'Football',
        status: 'live',
        priority: 20,
        external_id: 'psg-vs-om-live',
        source: 'DEMO',
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    for (const content of sportsContent) {
      const { error } = await supabase
        .from('media_content')
        .upsert(content, { 
          onConflict: 'external_id,source',
          ignoreDuplicates: false 
        });

      if (error) {
        console.error('Error upserting sports content:', error);
      } else {
        recordsAdded++;
      }
    }

    // Clean expired content
    const { data: cleanupResult } = await supabase.rpc('clean_expired_content');
    console.log(`Cleaned ${cleanupResult || 0} expired records`);

    // Update sync status
    await supabase
      .from('content_sources')
      .update({ sync_status: 'completed' })
      .eq('name', 'TMDB');

    const syncDuration = Date.now() - startTime;

    // Log sync results
    await supabase
      .from('update_logs')
      .insert({
        source_name: 'TMDB',
        records_added: recordsAdded,
        records_updated: recordsUpdated,
        sync_duration_ms: syncDuration,
        status: 'success'
      });

    console.log(`Sync completed: ${recordsAdded} records added in ${syncDuration}ms`);

    return new Response(JSON.stringify({
      success: true,
      records_added: recordsAdded,
      records_updated: recordsUpdated,
      sync_duration_ms: syncDuration
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Sync error:', error);

    // Log error
    const supabaseUrl = 'https://gbssebvzecsgcfjlqtqp.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdic3NlYnZ6ZWNzZ2NmamxxdHFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNjcwMDgsImV4cCI6MjA3MTc0MzAwOH0.NBaNJ4mMtRieOhzbxY-MlYgWJg0Fzsvqe6ZLUiKA4rQ';
    const supabase = createClient(supabaseUrl, supabaseKey);

    await supabase
      .from('update_logs')
      .insert({
        source_name: 'TMDB',
        status: 'error',
        error_details: error.message
      });

    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});