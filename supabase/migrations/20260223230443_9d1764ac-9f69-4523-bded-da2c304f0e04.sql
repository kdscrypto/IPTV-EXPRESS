
-- Fix content_sources: restrict management to admins only
DROP POLICY IF EXISTS "Authenticated users can delete content sources" ON public.content_sources;
DROP POLICY IF EXISTS "Authenticated users can insert content sources" ON public.content_sources;
DROP POLICY IF EXISTS "Authenticated users can read content sources" ON public.content_sources;
DROP POLICY IF EXISTS "Authenticated users can update content sources" ON public.content_sources;

-- Replace with admin-only policies
CREATE POLICY "Admins can read content sources"
ON public.content_sources FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage content sources"
ON public.content_sources FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
