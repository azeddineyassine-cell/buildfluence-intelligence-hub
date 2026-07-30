CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

CREATE TABLE public.sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  url text NOT NULL,
  type text NOT NULL DEFAULT 'rss',
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT sources_type_rss CHECK (type = 'rss'),
  CONSTRAINT sources_url_unique UNIQUE (url)
);

GRANT ALL ON public.sources TO service_role;
ALTER TABLE public.sources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sources service_role only" ON public.sources FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE TABLE public.raw_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id uuid NOT NULL REFERENCES public.sources(id) ON DELETE CASCADE,
  title text,
  url text NOT NULL UNIQUE,
  published_at timestamptz,
  raw_text text,
  collected_at timestamptz NOT NULL DEFAULT now(),
  processed boolean NOT NULL DEFAULT false
);

GRANT ALL ON public.raw_content TO service_role;
ALTER TABLE public.raw_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "raw_content service_role only" ON public.raw_content FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE INDEX raw_content_processed_idx ON public.raw_content (processed) WHERE processed = false;

CREATE TABLE public.content_analysis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  raw_content_id uuid NOT NULL REFERENCES public.raw_content(id) ON DELETE CASCADE,
  theme text,
  parties_mentionnees jsonb NOT NULL DEFAULT '[]'::jsonb,
  tonalite text,
  score_pertinence numeric,
  processed_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.content_analysis TO service_role;
ALTER TABLE public.content_analysis ENABLE ROW LEVEL SECURITY;
CREATE POLICY "content_analysis service_role only" ON public.content_analysis FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE INDEX content_analysis_raw_content_idx ON public.content_analysis (raw_content_id);