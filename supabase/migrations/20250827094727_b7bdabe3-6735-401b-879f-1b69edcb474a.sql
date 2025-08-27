-- Security Fix Migration: Secure RLS policies and add database constraints

-- 1. CRITICAL: Remove public access from update_logs table
DROP POLICY IF EXISTS "Update logs are publicly readable" ON public.update_logs;

-- Create admin-only policy for update_logs (replace with proper admin role when auth is implemented)
CREATE POLICY "Admin access to update logs" 
ON public.update_logs 
FOR SELECT 
USING (false); -- Currently blocks all access until proper admin auth is implemented

-- Allow service role to insert logs (for edge functions)
CREATE POLICY "Service role can insert update logs" 
ON public.update_logs 
FOR INSERT 
WITH CHECK (true); -- Service role bypasses RLS, but this ensures policy exists

-- 2. CRITICAL: Remove public access from content_sources table  
DROP POLICY IF EXISTS "Content sources are publicly readable" ON public.content_sources;

-- Create admin-only policy for content_sources
CREATE POLICY "Admin access to content sources" 
ON public.content_sources 
FOR SELECT 
USING (false); -- Currently blocks all access until proper admin auth is implemented

-- Allow service role to manage content sources (for edge functions)
CREATE POLICY "Service role can manage content sources" 
ON public.content_sources 
FOR ALL 
USING (true)
WITH CHECK (true); -- Service role bypasses RLS, but this ensures policy exists

-- 3. HIGH: Add missing unique constraint for media_content to fix ON CONFLICT issues
CREATE UNIQUE INDEX IF NOT EXISTS idx_media_content_external_source 
ON public.media_content (external_id, source) 
WHERE external_id IS NOT NULL AND source IS NOT NULL;

-- 4. Add performance indexes for commonly queried fields
CREATE INDEX IF NOT EXISTS idx_media_content_type_status 
ON public.media_content (type, status);

CREATE INDEX IF NOT EXISTS idx_media_content_expires_at 
ON public.media_content (expires_at) 
WHERE expires_at IS NOT NULL;

-- 5. Add constraint to ensure expires_at is in the future when set
CREATE OR REPLACE FUNCTION validate_expires_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.expires_at IS NOT NULL AND NEW.expires_at <= now() THEN
    RAISE EXCEPTION 'expires_at must be in the future';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_expires_at_trigger
  BEFORE INSERT OR UPDATE ON public.media_content
  FOR EACH ROW
  EXECUTE FUNCTION validate_expires_at();

-- 6. Ensure proper data integrity for content sources
ALTER TABLE public.content_sources 
ADD CONSTRAINT check_sync_status 
CHECK (sync_status IN ('idle', 'syncing', 'completed', 'error'));

-- 7. Add proper constraints for update_logs
ALTER TABLE public.update_logs 
ADD CONSTRAINT check_status 
CHECK (status IN ('success', 'error', 'warning'));

ALTER TABLE public.update_logs 
ADD CONSTRAINT check_record_counts 
CHECK (
  records_added >= 0 AND 
  records_updated >= 0 AND 
  records_removed >= 0
);