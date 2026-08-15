ALTER TABLE public.access_requests
  ADD COLUMN IF NOT EXISTS first_name text,
  ADD COLUMN IF NOT EXISTS last_name text,
  ADD COLUMN IF NOT EXISTS position text,
  ADD COLUMN IF NOT EXISTS request_type text NOT NULL DEFAULT 'access_request',
  ADD COLUMN IF NOT EXISTS report_slug text;

CREATE INDEX IF NOT EXISTS access_requests_request_type_idx ON public.access_requests (request_type);