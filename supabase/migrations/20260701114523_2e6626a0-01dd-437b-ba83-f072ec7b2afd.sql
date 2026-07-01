
CREATE TABLE public.isd_responses (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),

  secteur text,
  type_organisation text,
  fonction text,

  q1 int, q2 int, q3 int,
  q4 int, q5 int, q6 int, q7 int, q8 int,
  q9 int, q10 int, q11 int, q12 int,

  veille_thematiques text[],
  veille_outil text,
  veille_organisation text,
  veille_capitalisation text,

  outil_donnee text[],
  outil_carto text[],
  outil_crise text[],
  outil_signaux text[],
  dd_realisation text,

  approfondissement boolean NOT NULL DEFAULT false,
  appro jsonb,

  commentaire_ouvert text,

  contact_nom text,
  contact_fonction text,
  contact_organisation text,
  contact_email text,

  score_p1 numeric,
  score_p2 numeric,
  score_p3 numeric,
  score_p4 numeric,
  score_global numeric,
  niveau text
);

GRANT ALL ON public.isd_responses TO service_role;

ALTER TABLE public.isd_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access" ON public.isd_responses
  FOR ALL TO service_role USING (true) WITH CHECK (true);
