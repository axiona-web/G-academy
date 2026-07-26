# G-Academy — Bezpečnostný audit (Sprint 1)

Stav k verzii obsahu 2.1 · aplikácia: statický frontend (GitHub Pages) + Supabase (auth, Postgres s RLS, Edge Functions).

## Auditované oblasti

| Oblasť | Stav | Poznámka |
|---|---|---|
| **Row Level Security** | ✅ | Všetky tabuľky majú RLS: `profiles` (čítanie: vlastník/admin, zápis: vlastník), `progress` (vlastník/admin-read), `content_overrides` (read: prihlásení, write: admin), `error_logs` (insert: vlastník, read: admin), `events` (insert: vlastník, read: admin), `ai_usage` (read: vlastník/admin, write: len service role). Funkcia `is_admin()` je `security definer` — bez RLS rekurzie. |
| **Oprávnenia admina** | ✅ | Rola sa číta z DB (`profiles.role`), nie z klienta. Klientske `Auth.isAdmin()` riadi len UI — skutočnú ochranu dát robia RLS policies (aj keby si útočník zobrazil admin obrazovku, SELECT/UPSERT na cudzie dáta mu Postgres zamietne). |
| **IDOR** | ✅ | Všetky prístupy k dátam idú cez `auth.uid()` v policies — ID iného používateľa v požiadavke nepomôže. |
| **Prompt injection (AI proxy)** | ✅ Zmiernené | Edge function: limit dĺžky vstupu, systémový prompt sa pridáva na serveri s inštrukciou o neprezradení, výstup sa v UI escapuje. Zvyškové riziko: LLM možno „ukecať" — proxy ale nemá prístup k žiadnym dátam ani nástrojom, takže dopad je len obsahový. |
| **Rate limiting AI** | ✅ | 40 správ/deň/používateľa v edge function (tabuľka `ai_usage`, zápis len service rolou). |
| **XSS** | ✅ | Používateľské vstupy: chat mentora escapovaný (`esc()`), URL/názvy v auditore sanitizované (`Auditor.clean`), roleplay/interview vstupy sa nerenderujú späť ako HTML. Admin editor teórie povoľuje HTML zámerne (obsah kurzu) — ale zapisovať ho smie len admin (RLS) a validácia blokuje `<script>`. |
| **HTML export auditov** | ✅ | Reporty vkladajú len sanitizované hodnoty; súbor sa generuje lokálne u používateľa (Blob), nikam sa nenahráva. |
| **Reset hesla / session** | ✅ | Štandardné Supabase Auth flows (e-mailový reset s redirectom na aplikáciu, JWT session, `onAuthStateChange` reload pri odhlásení). Bez vlastnej kryptografie. |
| **Service Worker cache poisoning** | ✅ Zmiernené | SW cachuje len GET, nikdy Supabase/AI volania; verzia cache sa pri release bumpuje (v4). SW beží len na vlastnej doméne (same-origin policy). |
| **Priamy prístup k databáze otázok** | ⚠️ Známy limit | Otázky a odpovede sú v klientskom bundli — ktokoľvek si ich vie zobraziť v zdrojáku. Pre učebnú aplikáciu prijateľné; pre ostré platené certifikácie by museli otázky žiť na serveri (edge function vydáva otázky bez odpovedí a vyhodnocuje server). Zdokumentované rozhodnutie, plán vo Fáze monetizácie. |
| **Manipulácia XP / certifikácií cez konzolu** | ⚠️ Známy limit + detekcia | Stav aplikácie (XP, certifikácie) je klientsky — používateľ si ho technicky vie prepísať. Zmiernenie: (1) produktové eventy tvoria nezávislú serverovú stopu, (2) admin dashboard zvýrazňuje **anomálie** (vysoké XP bez zodpovedajúcej aktivity), (3) interné certifikácie logujú `certification_passed` event s výsledkom. Úplné riešenie = serverové vyhodnocovanie skúšok (viď vyššie) — odporúčané pred spustením platených certifikátov. |
| **Obchádzanie premium plánu** | ⚠️ Budúce | `plan` stĺpec je v DB (klient ho nemôže meniť — RLS), ale gating obsahu je zatiaľ klientsky. Pri spustení platených blokov treba premium obsah doručovať zo servera (tabuľka + RLS na `plan`), nie skrývať v UI. |
| **API kľúče** | ✅ | Anon key je verejný podľa dizajnu (chráni RLS). AI kľúč žije len ako server secret v edge function. Lokálny kľúč mentora je označený ako experimentálny s varovaním. |

## Odporúčania pred verejným spustením

1. Spusti `supabase-setup-2.sql` aj `supabase-setup-3.sql` (RLS pre nové tabuľky je v nich).
2. V Supabase → Authentication zapni **leaked password protection** a zváž rate limity na auth endpointy (Settings → Rate limits).
3. Over, že v `profiles` je admin len tvoj účet: `select email, role from profiles where role='admin';`
4. Pred spustením **platených** certifikácií/blokov: presunúť vyhodnocovanie skúšok a premium obsah na server (edge functions) — pozri známe limity vyššie.
5. Zálohy: Supabase free tier má denné zálohy obmedzené — exportuj si občas `progress` a `content_overrides` (Database → Backups / CSV export).
