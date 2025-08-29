-- Fix security issue: Restrict access to content_sources table
-- Remove any existing policies that might allow public access
DROP POLICY IF EXISTS "Enable read access for all users" ON public.content_sources;
DROP POLICY IF EXISTS "Public read access" ON public.content_sources;

-- Ensure RLS is enabled on content_sources table
ALTER TABLE public.content_sources ENABLE ROW LEVEL SECURITY;

-- Create restrictive policy for authenticated users only (administrators)
-- Only authenticated users can read content sources
CREATE POLICY "Authenticated users can read content sources"
ON public.content_sources
FOR SELECT
TO authenticated
USING (true);

-- Only authenticated users can insert content sources
CREATE POLICY "Authenticated users can insert content sources"
ON public.content_sources
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Only authenticated users can update content sources
CREATE POLICY "Authenticated users can update content sources"
ON public.content_sources
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Only authenticated users can delete content sources
CREATE POLICY "Authenticated users can delete content sources"
ON public.content_sources
FOR DELETE
TO authenticated
USING (true);

-- Revoke any public access that might exist
REVOKE ALL ON public.content_sources FROM anon;
REVOKE ALL ON public.content_sources FROM public;

-- Grant access only to authenticated users
GRANT SELECT, INSERT, UPDATE, DELETE ON public.content_sources TO authenticated;