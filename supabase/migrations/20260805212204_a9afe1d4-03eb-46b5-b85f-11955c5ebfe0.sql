-- Intelligence Politique — schéma isolé par préfixe ip_.
-- Ne supprime et ne modifie aucun objet existant hors de ce préfixe.

create table if not exists public.ip_actors (
  actor_id text primary key,
  actor_type text not null check (actor_type in ('parti','personnalité')),
  rank_scope integer,
  canonical_name_fr text not null,
  canonical_name_ar text,
  acronym text,
  party_id text references public.ip_actors(actor_id),
  current_role_fr text,
  monitoring_status text,
  public_display_status text,
  verification_status text,
  source_ids text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ip_mentions (
  id bigint primary key,
  alert_id bigint,
  title text,
  description text,
  url text,
  published_at timestamptz,
  source_type text,
  language text,
  country text,
  tone text,
  source_name text,
  source_url text,
  direct_reach bigint,
  cumulative_reach bigint,
  domain_reach bigint,
  tags text,
  score numeric,
  alert_name text,
  matched_actor_ids text,
  direct_party_ids text,
  personality_ids text,
  inferred_party_ids text,
  actor_count integer not null default 0,
  max_confidence numeric(4,2) not null default 0,
  review_status text not null check (review_status in ('auto_valide','revue_manuelle','sans_acteur')),
  imported_at timestamptz not null default now()
);

create table if not exists public.ip_mention_actors (
  mention_id bigint not null references public.ip_mentions(id) on delete cascade,
  actor_id text not null references public.ip_actors(actor_id) on delete cascade,
  actor_type text not null,
  canonical_name text not null,
  alias_used text,
  alias_id text,
  match_field text,
  priority integer,
  confidence numeric(4,2) not null,
  context_rule text,
  context_result text,
  review_status text not null check (review_status in ('auto_valide','revue_manuelle')),
  human_decision text check (human_decision is null or human_decision in ('valider','rejeter')),
  reviewed_at timestamptz,
  primary key (mention_id, actor_id)
);

create index if not exists ip_mentions_published_at_idx on public.ip_mentions(published_at desc);
create index if not exists ip_mentions_review_status_idx on public.ip_mentions(review_status);
create index if not exists ip_mention_actors_actor_idx on public.ip_mention_actors(actor_id);
create index if not exists ip_mention_actors_review_idx on public.ip_mention_actors(review_status, human_decision);

alter table public.ip_actors enable row level security;
alter table public.ip_mentions enable row level security;
alter table public.ip_mention_actors enable row level security;
revoke all on public.ip_actors, public.ip_mentions, public.ip_mention_actors from anon, authenticated;

create or replace view public.v_ip_actor_ranking as
select
  a.actor_id, a.actor_type, a.canonical_name_fr, a.canonical_name_ar,
  a.acronym, a.party_id, a.current_role_fr,
  count(distinct ma.mention_id)::integer as mention_count,
  coalesce(sum(m.direct_reach),0)::bigint as direct_reach,
  round(avg(ma.confidence),2) as avg_match_confidence,
  count(*) filter (where lower(m.tone) in ('positive','positif'))::integer as positive_count,
  count(*) filter (where lower(m.tone) in ('negative','négatif','negatif'))::integer as negative_count,
  count(*) filter (where lower(m.tone) in ('neutral','neutre'))::integer as neutral_count,
  max(m.published_at) as latest_mention_at
from public.ip_actors a
left join public.ip_mention_actors ma on ma.actor_id=a.actor_id
  and (ma.review_status='auto_valide' or ma.human_decision='valider')
left join public.ip_mentions m on m.id=ma.mention_id
group by a.actor_id;

create or replace view public.v_ip_kpis as
select
  count(*)::integer as document_count,
  count(*) filter (where published_at >= now()-interval '24 hours')::integer as documents_24h,
  count(distinct source_name)::integer as source_count,
  count(*) filter (where review_status='revue_manuelle')::integer as mentions_pending_review,
  max(published_at) as freshest_publication_at,
  max(imported_at) as dataset_imported_at
from public.ip_mentions;

create or replace view public.v_ip_recent_mentions as
select m.id,m.title,m.url,m.published_at,m.source_type,m.language,m.country,m.tone,m.source_name,
       ma.actor_id,a.canonical_name_fr,ma.confidence
from public.ip_mentions m
join public.ip_mention_actors ma on ma.mention_id=m.id
join public.ip_actors a on a.actor_id=ma.actor_id
where ma.review_status='auto_valide' or ma.human_decision='valider';

revoke all on public.v_ip_actor_ranking, public.v_ip_kpis, public.v_ip_recent_mentions from anon, authenticated;
grant select on public.ip_actors, public.ip_mentions, public.ip_mention_actors,
  public.v_ip_actor_ranking, public.v_ip_kpis, public.v_ip_recent_mentions to service_role;

comment on view public.v_ip_actor_ranking is 'Agrégats descriptifs validés. Ne constitue pas un score IBDN.';