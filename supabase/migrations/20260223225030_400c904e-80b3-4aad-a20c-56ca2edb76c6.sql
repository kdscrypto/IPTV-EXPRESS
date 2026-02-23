-- Fix 1: Restrict clean_expired_content function to service_role only
REVOKE ALL ON FUNCTION public.clean_expired_content() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.clean_expired_content() FROM anon;
REVOKE ALL ON FUNCTION public.clean_expired_content() FROM authenticated;
GRANT EXECUTE ON FUNCTION public.clean_expired_content() TO service_role;

-- Fix 2: Add server-side validation constraints on contact_messages
ALTER TABLE public.contact_messages
  ALTER COLUMN name TYPE VARCHAR(255),
  ALTER COLUMN email TYPE VARCHAR(255),
  ALTER COLUMN subject TYPE VARCHAR(500),
  ALTER COLUMN message TYPE VARCHAR(5000);

ALTER TABLE public.contact_messages
  ADD CONSTRAINT contact_valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

ALTER TABLE public.contact_messages
  ADD CONSTRAINT contact_non_empty_fields CHECK (
    LENGTH(TRIM(name)) > 0 AND
    LENGTH(TRIM(email)) > 0 AND
    LENGTH(TRIM(subject)) > 0 AND
    LENGTH(TRIM(message)) > 0
  );