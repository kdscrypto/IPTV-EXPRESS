-- Create tables for dynamic media content
CREATE TABLE public.media_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('film', 'series', 'sport')),
  image_url TEXT NOT NULL,
  description TEXT,
  release_date TIMESTAMP WITH TIME ZONE,
  genre TEXT,
  status TEXT NOT NULL CHECK (status IN ('recent', 'upcoming', 'live')) DEFAULT 'recent',
  priority INTEGER DEFAULT 0,
  external_id TEXT,
  source TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Create index for performance
CREATE INDEX idx_media_content_type_status ON public.media_content (type, status);
CREATE INDEX idx_media_content_priority ON public.media_content (priority DESC);
CREATE INDEX idx_media_content_release_date ON public.media_content (release_date DESC);

-- Create table for tracking API sources
CREATE TABLE public.content_sources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  api_url TEXT NOT NULL,
  last_sync TIMESTAMP WITH TIME ZONE,
  sync_status TEXT DEFAULT 'idle',
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default sources
INSERT INTO public.content_sources (name, api_url) VALUES 
  ('TMDB', 'https://api.themoviedb.org/3'),
  ('Sports API', 'https://api.sportsdata.io/v3');

-- Create table for update logs
CREATE TABLE public.update_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  source_name TEXT NOT NULL,
  records_added INTEGER DEFAULT 0,
  records_updated INTEGER DEFAULT 0,
  records_removed INTEGER DEFAULT 0,
  sync_duration_ms INTEGER,
  status TEXT NOT NULL DEFAULT 'success',
  error_details TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.media_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.update_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (no auth required for media content)
CREATE POLICY "Media content is publicly readable" 
ON public.media_content 
FOR SELECT 
USING (true);

CREATE POLICY "Content sources are publicly readable" 
ON public.content_sources 
FOR SELECT 
USING (true);

CREATE POLICY "Update logs are publicly readable" 
ON public.update_logs 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_media_content_updated_at
  BEFORE UPDATE ON public.media_content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to clean expired content
CREATE OR REPLACE FUNCTION public.clean_expired_content()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM public.media_content 
  WHERE expires_at IS NOT NULL AND expires_at < now();
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  
  INSERT INTO public.update_logs (source_name, records_removed, status)
  VALUES ('cleanup', deleted_count, 'success');
  
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Enable realtime for media_content
ALTER TABLE public.media_content REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.media_content;