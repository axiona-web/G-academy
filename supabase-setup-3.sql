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
