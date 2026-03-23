
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  form_type TEXT NOT NULL CHECK (form_type IN ('strategic_exchange', 'diagnostic', 'demo', 'contact')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization TEXT,
  position TEXT,
  phone TEXT,
  topic TEXT,
  priority TEXT,
  message TEXT,
  situation TEXT,
  platform TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Service role can read submissions"
ON public.contact_submissions
FOR SELECT
TO service_role
USING (true);
