-- Fix RLS policies for edge function access
-- Allow service role to manage media content properly
DROP POLICY IF EXISTS "Service role can manage media content" ON public.media_content;

CREATE POLICY "Service role can manage media content" 
ON public.media_content 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Update content_sources to restrict API URL access
DROP POLICY IF EXISTS "Admin access to content sources" ON public.content_sources;
DROP POLICY IF EXISTS "Service role can manage content sources" ON public.content_sources;

-- Only service role can access content sources (for edge functions)
CREATE POLICY "Service role can manage content sources" 
ON public.content_sources 
FOR ALL 
USING (true)
WITH CHECK (true);