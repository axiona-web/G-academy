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
