-- Add unique constraint for external_id and source combination
ALTER TABLE public.media_content 
ADD CONSTRAINT media_content_external_id_source_unique 
UNIQUE (external_id, source);