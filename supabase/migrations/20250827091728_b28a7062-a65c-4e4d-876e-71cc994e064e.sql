-- Fix function search_path security issues by dropping cascade and recreating
DROP TRIGGER IF EXISTS update_media_content_updated_at ON public.media_content CASCADE;
DROP FUNCTION IF EXISTS public.update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS public.clean_expired_content() CASCADE;

-- Recreate functions with secure search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = ''
LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate trigger
CREATE TRIGGER update_media_content_updated_at
  BEFORE UPDATE ON public.media_content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Recreate clean expired content function with secure search_path
CREATE OR REPLACE FUNCTION public.clean_expired_content()
RETURNS INTEGER 
SECURITY DEFINER
SET search_path = ''
LANGUAGE plpgsql AS $$
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
$$;