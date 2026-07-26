-- ═══════════════════════════════════════════════════════════════════
-- G-Academy — Supabase setup 2 (Fáza „Stabilita")
-- Spusti CELÝ súbor v SQL Editore (rovnako ako supabase-setup.sql).
-- Pridáva: editor obsahu, logovanie chýb, limity AI proxy.
-- ═══════════════════════════════════════════════════════════════════

-- ── 1. Obsahové úpravy (admin editor lekcií a otázok) ─────────────
-- Každý riadok = jedna úprava obsahu (override), ktorá sa pri štarte
-- aplikácie natiahne a prekryje zabudovaný obsah. História posledných
-- verzií sa drží priamo v riadku (stĺpec history).
create table if not exists public.content_overrides (
  id          text primary key,          -- 'lesson:gbp-1-1' | 'quiz:gbp-1-1:2' | 'meta'
  data        jsonb not null,            -- upravené polia
  note        text,                       -- interná poznámka autora úpravy
  history     jsonb not null default '[]'::jsonb, -- posledných 5 verzií
  updated_by  text,
  updated_at  timestamptz not null default now()
);
alter table public.content_overrides enable row level security;

-- Čítať smie každý prihlásený (obsah je pre všetkých študentov):
drop policy if exists "overrides_read" on public.content_overrides;
create policy "overrides_read" on public.content_overrides
  for select using (auth.role() = 'authenticated');

-- Zapisovať smie len admin:
drop policy if exists "overrides_write" on public.content_overrides;
create policy "overrides_write" on public.content_overrides
  for all using (public.is_admin()) with check (public.is_admin());

-- ── 2. Logovanie chýb aplikácie + hlásenia chýb v obsahu ──────────
create table if not exists public.error_logs (
  id          bigint generated always as identity primary key,
  user_id     uuid references auth.users on delete set null,
  kind        text not null default 'js-error',  -- 'js-error' | 'content-report'
  message     text,
  detail      text,
  url         text,
  created_at  timestamptz not null default now()
);
alter table public.error_logs enable row level security;

drop policy if exists "errors_insert" on public.error_logs;
create policy "errors_insert" on public.error_logs
  for insert with check (auth.uid() = user_id);

drop policy if exists "errors_read_admin" on public.error_logs;
create policy "errors_read_admin" on public.error_logs
  for select using (public.is_admin());

-- ── 3. Limity AI proxy (počítadlo denného využitia) ───────────────
create table if not exists public.ai_usage (
  user_id     uuid references auth.users on delete cascade,
  day         date not null default current_date,
  count       int  not null default 0,
  primary key (user_id, day)
);
alter table public.ai_usage enable row level security;

-- Do tabuľky zapisuje len edge function (service role — obchádza RLS).
-- Používateľ vidí svoje využitie:
drop policy if exists "ai_usage_read_own" on public.ai_usage;
create policy "ai_usage_read_own" on public.ai_usage
  for select using (auth.uid() = user_id or public.is_admin());
