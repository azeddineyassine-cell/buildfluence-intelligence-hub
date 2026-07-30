ALTER TABLE public.sources DROP CONSTRAINT IF EXISTS sources_type_rss;
ALTER TABLE public.sources ADD CONSTRAINT sources_type_check CHECK (type IN ('rss', 'youtube'));