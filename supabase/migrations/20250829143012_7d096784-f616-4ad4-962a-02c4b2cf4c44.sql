-- Allow the sync function to insert/update media content
-- Since this is a system function that needs to populate data for all users to see,
-- we need to allow the service role to write to the media_content table

-- Add policy for service role to insert/update media content
CREATE POLICY "Service role can manage media content"
ON public.media_content
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Add policy for authenticated users to insert/update media content if needed
-- (for admin functions)
CREATE POLICY "Authenticated users can manage media content"
ON public.media_content
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);