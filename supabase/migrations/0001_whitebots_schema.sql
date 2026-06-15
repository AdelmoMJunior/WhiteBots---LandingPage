create extension if not exists pgcrypto;
create extension if not exists citext;

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  email citext not null unique,
  role text not null default 'owner',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.modules (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title jsonb not null check (jsonb_typeof(title) = 'object'),
  summary jsonb not null check (jsonb_typeof(summary) = 'object'),
  description jsonb not null check (jsonb_typeof(description) = 'object'),
  icon text not null default 'Bot',
  accent text not null default '#8b5cf6',
  sort_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.module_features (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules(id) on delete cascade,
  title jsonb not null check (jsonb_typeof(title) = 'object'),
  description jsonb not null check (jsonb_typeof(description) = 'object'),
  badge text not null default '',
  sort_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.showcase_items (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('benefit', 'case', 'process')),
  title jsonb not null check (jsonb_typeof(title) = 'object'),
  summary jsonb not null check (jsonb_typeof(summary) = 'object'),
  metric_label jsonb not null default '{"pt-BR":"","en":""}'::jsonb,
  metric_value text not null default '',
  sort_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role jsonb not null check (jsonb_typeof(role) = 'object'),
  quote jsonb not null check (jsonb_typeof(quote) = 'object'),
  sort_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question jsonb not null check (jsonb_typeof(question) = 'object'),
  answer jsonb not null check (jsonb_typeof(answer) = 'object'),
  sort_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid,
  actor_email citext,
  action text not null,
  entity text not null,
  entity_id uuid,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists modules_updated_at on public.modules;
create trigger modules_updated_at
before update on public.modules
for each row execute function public.set_updated_at();

drop trigger if exists module_features_updated_at on public.module_features;
create trigger module_features_updated_at
before update on public.module_features
for each row execute function public.set_updated_at();

drop trigger if exists showcase_items_updated_at on public.showcase_items;
create trigger showcase_items_updated_at
before update on public.showcase_items
for each row execute function public.set_updated_at();

drop trigger if exists testimonials_updated_at on public.testimonials;
create trigger testimonials_updated_at
before update on public.testimonials
for each row execute function public.set_updated_at();

drop trigger if exists faqs_updated_at on public.faqs;
create trigger faqs_updated_at
before update on public.faqs
for each row execute function public.set_updated_at();

drop trigger if exists site_settings_updated_at on public.site_settings;
create trigger site_settings_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users au
    where au.active = true
      and (
        au.user_id = auth.uid()
        or lower(au.email::text) = lower(coalesce(auth.jwt() ->> 'email', ''))
      )
  );
$$;

alter table public.admin_users enable row level security;
alter table public.modules enable row level security;
alter table public.module_features enable row level security;
alter table public.showcase_items enable row level security;
alter table public.testimonials enable row level security;
alter table public.faqs enable row level security;
alter table public.site_settings enable row level security;
alter table public.audit_log enable row level security;

drop policy if exists "admin users can read own row" on public.admin_users;
create policy "admin users can read own row"
on public.admin_users for select
using (
  public.is_admin()
  or lower(email::text) = lower(coalesce(auth.jwt() ->> 'email', ''))
);

drop policy if exists "admins manage admin users" on public.admin_users;
create policy "admins manage admin users"
on public.admin_users for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "public read published modules" on public.modules;
create policy "public read published modules"
on public.modules for select
using (published = true or public.is_admin());

drop policy if exists "admins manage modules" on public.modules;
create policy "admins manage modules"
on public.modules for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "public read published module features" on public.module_features;
create policy "public read published module features"
on public.module_features for select
using (
  published = true
  and exists (
    select 1 from public.modules m
    where m.id = module_id and m.published = true
  )
  or public.is_admin()
);

drop policy if exists "admins manage module features" on public.module_features;
create policy "admins manage module features"
on public.module_features for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "public read published showcase" on public.showcase_items;
create policy "public read published showcase"
on public.showcase_items for select
using (published = true or public.is_admin());

drop policy if exists "admins manage showcase" on public.showcase_items;
create policy "admins manage showcase"
on public.showcase_items for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "public read published testimonials" on public.testimonials;
create policy "public read published testimonials"
on public.testimonials for select
using (published = true or public.is_admin());

drop policy if exists "admins manage testimonials" on public.testimonials;
create policy "admins manage testimonials"
on public.testimonials for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "public read published faqs" on public.faqs;
create policy "public read published faqs"
on public.faqs for select
using (published = true or public.is_admin());

drop policy if exists "admins manage faqs" on public.faqs;
create policy "admins manage faqs"
on public.faqs for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "public read site settings" on public.site_settings;
create policy "public read site settings"
on public.site_settings for select
using (true);

drop policy if exists "admins manage site settings" on public.site_settings;
create policy "admins manage site settings"
on public.site_settings for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "admins read audit log" on public.audit_log;
create policy "admins read audit log"
on public.audit_log for select
using (public.is_admin());

drop policy if exists "admins insert audit log" on public.audit_log;
create policy "admins insert audit log"
on public.audit_log for insert
with check (public.is_admin());

insert into public.site_settings (key, value)
values (
  'landing',
  '{
    "discordUrl": "https://discord.gg/whitebots",
    "heroEyebrow": {"pt-BR": "Bots Discord personalizados, seguros e escaláveis", "en": "Custom, secure, scalable Discord bots"},
    "heroTitle": {"pt-BR": "Automação premium para comunidades que querem operar em outro nível.", "en": "Premium automation for communities ready to operate at another level."},
    "heroSubtitle": {"pt-BR": "A WhiteBots projeta módulos sob medida para gestão, facções, atendimento, economia, moderação e fluxos complexos com acabamento profissional.", "en": "WhiteBots designs custom modules for management, factions, support, economy, moderation and complex workflows with professional polish."},
    "primaryCta": {"pt-BR": "Falar no Discord", "en": "Talk on Discord"},
    "secondaryCta": {"pt-BR": "Ver módulos", "en": "Explore modules"},
    "finalTitle": {"pt-BR": "Seu servidor pode parecer e funcionar como uma operação profissional.", "en": "Your server can look and run like a professional operation."},
    "finalSubtitle": {"pt-BR": "Entre pelo Discord, conte seu cenário e receba uma proposta de automação personalizada para o seu fluxo real.", "en": "Join through Discord, describe your operation and get a custom automation proposal for your actual workflow."}
  }'::jsonb
)
on conflict (key) do nothing;
