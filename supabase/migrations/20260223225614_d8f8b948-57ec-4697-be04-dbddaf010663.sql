
-- Fix: Restrict media_content management to admins only
DROP POLICY IF EXISTS "Authenticated users can manage media content" ON public.media_content;

CREATE POLICY "Admins can manage media content"
ON public.media_content
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
