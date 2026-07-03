
ALTER TABLE public.isd_responses ADD COLUMN IF NOT EXISTS precisions jsonb;
ALTER TABLE public.isd_responses ADD COLUMN IF NOT EXISTS veille_prestataire_origine text;
ALTER TABLE public.isd_responses ADD COLUMN IF NOT EXISTS veille_externalisation_origine text;
ALTER TABLE public.isd_responses ADD COLUMN IF NOT EXISTS dd_cabinet_origine text;
ALTER TABLE public.isd_responses
  ALTER COLUMN veille_capitalisation TYPE text[]
  USING CASE WHEN veille_capitalisation IS NULL THEN NULL ELSE ARRAY[veille_capitalisation] END;
