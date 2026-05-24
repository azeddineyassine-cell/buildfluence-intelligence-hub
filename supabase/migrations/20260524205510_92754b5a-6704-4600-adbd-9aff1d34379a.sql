CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  prenom text,
  nom text,
  email text NOT NULL,
  message text,
  langue text NOT NULL DEFAULT 'fr',
  statut text NOT NULL DEFAULT 'nouveau'
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead"
ON public.leads FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Service role can read leads"
ON public.leads FOR SELECT
TO service_role
USING (true);