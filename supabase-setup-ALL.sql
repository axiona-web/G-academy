-- ═══ G-Academy: KOMPLETNÝ Supabase setup (1+2+3 v jednom) ═══
-- Vlož celý súbor do SQL Editora a spusti raz.

-- ═══════════════════════════════════════════════════════════════════
-- G-Academy — Supabase setup
-- Spusti CELÝ tento súbor v Supabase: SQL Editor → New query → vlož
-- → Run. Vytvorí tabuľky, bezpečnostné pravidlá (RLS) a trigger.
-- ═══════════════════════════════════════════════════════════════════

-- ── 1. Profily používateľov (rola, plán) ──────────────────────────
create table if not exists public.profiles (
  id          uuid primary key references auth.users on delete cascade,
  email       text,
  full_name   text,
  role        text not null default 'student',   -- 'student' | 'admin'
  plan        text not null default 'free',      -- 'free' | 'premium' (budúce platené bloky)
  created_at  timestamptz not null default now()
);
alter table public.profiles enable row level security;

-- ── 2. Progres štúdia (celý stav aplikácie ako JSON) ──────────────
create table if not exists public.progress (
  user_id     uuid primary key references auth.users on delete cascade,
  state       jsonb,                              -- kompletný stav aplikácie
  overall     int  not null default 0,            -- celkový progres v % (pre admin prehľad)
  xp          int  not null default 0,
  level       text,
  updated_at  timestamptz not null default now()
);
alter table public.progress enable row level security;

-- ── 3. Pomocná funkcia: je prihlásený používateľ admin? ───────────
-- (security definer = smie nazrieť do profiles bez rekurzie RLS)
create or replace function public.is_admin()
returns boolean
language sql security definer stable
set search_path = public
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

-- ── 4. RLS pravidlá ───────────────────────────────────────────────
-- Profily: každý vidí svoj profil, admin vidí všetky; meniť môže len svoj.
drop policy if exists "profiles_select" on public.profiles;
create policy "profiles_select" on public.profiles
  for select using (auth.uid() = id or public.is_admin());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- Progres: každý číta/zapisuje svoj, admin číta všetky.
drop policy if exists "progress_select" on public.progress;
create policy "progress_select" on public.progress
  for select using (auth.uid() = user_id or public.is_admin());

drop policy if exists "progress_insert_own" on public.progress;
create policy "progress_insert_own" on public.progress
  for insert with check (auth.uid() = user_id);

drop policy if exists "progress_update_own" on public.progress;
create policy "progress_update_own" on public.progress
  for update using (auth.uid() = user_id);

-- ── 5. Trigger: pri registrácii automaticky vytvor profil ─────────
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ═══════════════════════════════════════════════════════════════════
-- 6. POVÝŠENIE ADMINA — spusti AŽ PO svojej registrácii v aplikácii!
--    (odkomentuj riadok, skontroluj e-mail a spusti samostatne)
-- ═══════════════════════════════════════════════════════════════════
-- update public.profiles set role = 'admin' where email = 'mdominik01@gmail.com';

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

-- ═══════════════════════════════════════════════════════════════════
-- G-Academy — Supabase setup 3 (Sprint 1: meranie kvality)
-- Spusti celý súbor v SQL Editore.
-- Pridáva: produktové eventy (analytika učenia a otázok).
-- ═══════════════════════════════════════════════════════════════════

-- ── Produktové eventy ─────────────────────────────────────────────
-- Insert-only tabuľka. Klient zapisuje udalosti (lesson_completed,
-- quiz_failed, answer_changed…), admin z nich číta agregáty:
-- dokončenia lekcií, dropout, úspešnosť otázok, retencia.
create table if not exists public.events (
  id          bigint generated always as identity primary key,
  user_id     uuid references auth.users on delete set null,
  name        text not null,          -- napr. 'quiz_completed'
  props       jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now()
);
alter table public.events enable row level security;

drop policy if exists "events_insert_own" on public.events;
create policy "events_insert_own" on public.events
  for insert with check (auth.uid() = user_id);

drop policy if exists "events_read_admin" on public.events;
create policy "events_read_admin" on public.events
  for select using (public.is_admin());

-- Index pre admin agregácie
create index if not exists events_name_idx on public.events (name, created_at desc);

-- ── Poznámka k integrite (viď SECURITY.md) ────────────────────────
-- XP a certifikácie sú súčasťou klientskeho stavu (progress.state).
-- Eventy slúžia aj ako nezávislá stopa: admin dashboard porovnáva
-- XP so súčtom udalostí a upozorní na anomálie (XP bez aktivity).
