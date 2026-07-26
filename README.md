# G-Academy — Google Marketing Akadémia

Interaktívna vzdelávacia platforma: **Google Business Profile · Google Search Console · Google Ads** — od základov po profesionálnu (agentúrnu) úroveň.

## Spustenie

Stačí otvoriť **`index.html`** dvojklikom v prehliadači. Žiadna inštalácia, žiadny backend.

- Progres sa ukladá lokálne (localStorage) — zostáva aj po zatvorení prehliadača.
- **PWA / offline režim:** ak aplikáciu spustíš cez lokálny server (napr. `python3 -m http.server` v tomto priečinku a otvoríš `http://localhost:8000`), zaregistruje sa service worker (`sw.js`) a apka funguje offline + dá sa „nainštalovať" ako aplikácia. Pri otvorení cez `file://` funguje všetko okrem offline cache.

## Obsah

| | |
|---|---|
| **3 moduly** | GBP (22 lekcií) · GSC (19 lekcií) · Google Ads (29 lekcií) |
| **Testy** | 350 otázok: mini testy (5), modulové (20), záverečný (100), mock certifikácia (50) — vyhodnotenie s vysvetleniami až na konci, ako pri reálnych skúškach |
| **Flashcards** | 40 kartičiek so spaced repetition (zjednodušený SM-2) |
| **Projekty** | 6 portfóliových projektov s checklistami, hodnotením a poznámkami |
| **Certifikácie** | 7 certifikácií s odhadom pravdepodobnosti úspechu podľa tvojho progresu |
| **Slovník** | 41 pojmov — jednoduché aj technické vysvetlenie |
| **Kariéra** | pozície, platy, kariérny postup, chýbajúce certifikácie |
| **Gamifikácia** | XP, 5 úrovní (Začiatočník→Expert), 21 achievementov, denné/týždenné ciele, streak |
| **AI Mentor** | offline rule-based mentor (vysvetlenia, testy, simulácie klienta, analýza slabín) + voliteľný API kľúč (Claude/GPT) pre plnohodnotné AI |
| **Štatistiky** | Chart.js grafy: čas učenia, testy, progres, radar silných/slabých stránok |

## Architektúra

Jednosúborová SPA (`index.html`), zložená z komentovaných komponentov v `src/`:

```
src/01_head.html      – head, Tailwind config, štýly, animácie
src/02_body.html      – app shell (sidebar, topbar, mobilná navigácia)
src/03_data_gbp.js    – dáta modulu Google Business Profile
src/04_data_gsc.js    – dáta modulu Search Console
src/05-06_data_ads    – dáta modulu Google Ads (2 časti)
src/07_data_misc.js   – certifikácie, projekty, slovník, flashcards, kariéra, achievementy, scenáre mentora
src/08_app_core.js    – App: stav, localStorage, router, gamifikácia, quiz engine, SM-2
src/09-11_views       – Views: všetky obrazovky + Chart.js grafy + AI mentor
src/12_auth.js        – Auth: registrácia/prihlásenie (Supabase), cloud sync, admin sekcia
```

Zloženie po úprave komponentov: `cat src/01* src/02* src/03* src/04* src/05* src/06* src/07* src/08* src/09* src/10* src/11* src/12* > index.html`

## Nasadenie na web

Kompletný návod (GitHub Pages + Supabase registrácia, admin rola, budúce platené bloky) je v súbore **NAVOD.md**. Konfigurácia kľúčov: `config.js`. Databázový setup: `supabase-setup.sql`.

Technológie: HTML5, Tailwind CSS (CDN), vanilla JS, Chart.js, Lucide Icons, localStorage, PWA (manifest + service worker), dark/light mode.
