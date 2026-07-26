# 🚀 Návod: Nasadenie G-Academy na web (krok za krokom)

Celé nasadenie je **zadarmo** a zaberie cca 30–40 minút. Nepotrebuješ vedieť programovať — len klikať podľa návodu.

Výsledok: aplikácia beží na adrese `https://TVOJE-MENO.github.io/g-academy/`, ľudia sa registrujú e-mailom, ty si admin a vidíš ich progres.

---

## ČASŤ A — Supabase (registrácia používateľov) · ~15 min

Supabase je bezplatná služba, ktorá sa postará o účty a databázu.

### A1. Založ si Supabase účet
1. Choď na **https://supabase.com** a klikni **Start your project**.
2. Prihlás sa (najjednoduchšie tlačidlom **Continue with GitHub** — GitHub účet si vytvoríme v časti B, takže ak ho ešte nemáš, sprav najprv krok B1 a vráť sa sem; alebo použi e-mail).

### A2. Vytvor projekt
1. Klikni **New project**.
2. Vyplň:
   - **Name:** `g-academy`
   - **Database Password:** klikni **Generate a password** a ulož si ho (netreba ho neskôr, ale odlož si ho).
   - **Region:** vyber `Central EU (Frankfurt)` — najbližšie k SK.
3. Klikni **Create new project** a počkaj ~2 minúty, kým sa projekt pripraví.

### A3. Vytvor databázové tabuľky
1. V ľavom menu klikni na ikonu **SQL Editor**.
2. Klikni **New query**.
3. Otvor súbor **`supabase-setup.sql`** (je v tomto priečinku) v Poznámkovom bloku, **skopíruj celý obsah** a vlož ho do editora.
4. Klikni **Run** (alebo Ctrl+Enter). Dole sa zobrazí `Success. No rows returned` — hotovo.

### A4. Skopíruj si kľúče
1. V ľavom menu: **Project Settings** (ozubené koliesko) → **API** (prípadne **API Keys**).
2. Uvidíš dve hodnoty:
   - **Project URL** — napr. `https://abcdefgh.supabase.co`
   - **anon public** kľúč — dlhý reťazec začínajúci `eyJ…` (klikni na ikonu kopírovania)
3. Otvor súbor **`config.js`** (v tomto priečinku) v Poznámkovom bloku a vlož hodnoty medzi úvodzovky:

```js
window.GACADEMY_CONFIG = {
  SUPABASE_URL: 'https://abcdefgh.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOi...',
};
```

4. Ulož súbor. *(Tento „anon" kľúč je verejný — je v poriadku, že bude na webe. Dáta chránia bezpečnostné pravidlá z kroku A3.)*

### A5. (Odporúčané) Zjednoduš registráciu
Predvolene Supabase vyžaduje potvrdenie e-mailu. Na začiatok to môžeš vypnúť:
1. Ľavé menu → **Authentication** → **Sign In / Providers** → **Email**.
2. Vypni prepínač **Confirm email** a ulož.
3. *(Keď budeš mať reálnych používateľov, môžeš to znova zapnúť.)*

---

## ČASŤ B — GitHub (umiestnenie webu) · ~15 min

### B1. Založ si GitHub účet
1. Choď na **https://github.com** → **Sign up**.
2. Zadaj e-mail, heslo a používateľské meno (napr. `martindominik`) — **toto meno bude v adrese webu**, tak si ho vyber s rozvahou.
3. Potvrď e-mail.

### B2. Vytvor repozitár
1. Vpravo hore klikni **+** → **New repository**.
2. **Repository name:** `g-academy`
3. Nechaj **Public** (GitHub Pages zadarmo funguje len na public repozitároch).
4. NIČ iné nezaškrtávaj, klikni **Create repository**.

### B3. Nahraj súbory (cez prehliadač, bez inštalácie)
1. Na stránke nového repozitára klikni na odkaz **uploading an existing file**.
2. Otvor priečinok `g-academy` na svojom počítači a **potiahni myšou do okna prehliadača tieto súbory**:
   - `index.html`
   - `config.js` *(už s vyplnenými kľúčmi z kroku A4!)*
   - `manifest.json`
   - `sw.js`
   - `README.md`
   - `supabase-setup.sql`
   - *(priečinky `src/` a `NAVOD.md` môžeš nahrať tiež — nie sú nutné pre beh webu, ale je dobré mať zdrojáky zálohované. Priečinok potiahni celý.)*
3. Dole klikni **Commit changes**.

### B4. Zapni GitHub Pages
1. V repozitári klikni na záložku **Settings** (vpravo hore).
2. V ľavom menu klikni **Pages**.
3. V časti **Build and deployment** → **Source** nechaj `Deploy from a branch`; **Branch** nastav na `main` a priečinok `/ (root)` → klikni **Save**.
4. Počkaj 1–2 minúty a obnov stránku — hore sa zobrazí adresa:
   **`https://TVOJE-MENO.github.io/g-academy/`**
5. Otvor ju — mala by ťa privítať prihlasovacia obrazovka G-Academy. 🎉

---

## ČASŤ C — Staň sa adminom · ~5 min

1. Na svojom webe klikni **Registrácia** a vytvor si účet so svojím e-mailom (`mdominik01@gmail.com`).
2. Choď do **Supabase → SQL Editor → New query** a spusti:

```sql
update public.profiles set role = 'admin' where email = 'mdominik01@gmail.com';
```

3. Na webe sa **odhlás a znova prihlás** — v ľavom menu pribudne sekcia **🛡️ Admin** so zoznamom všetkých registrovaných študentov, ich XP, levelom a progresom.

---

## Ako to celé funguje

- **Registrácia je zadarmo** — každý nový používateľ dostane rolu `student` a plán `free`.
- **Progres v cloude** — XP, lekcie, testy sa ukladajú k účtu; študent sa môže prihlásiť z mobilu aj počítača.
- **Admin** — vidíš všetkých študentov a ich progres. Rolu/plán meníš v Supabase → **Table Editor** → `profiles`.
- **Platené bloky (budúcnosť)** — v databáze už existuje stĺpec `plan` (`free`/`premium`). Keď budeš chcieť spustiť platený obsah, napíš mi — napojíme Stripe/platobnú bránu a označíme vybrané moduly ako premium. Základ je pripravený.

## Ako neskôr upraviť obsah alebo dizajn

1. Uprav príslušný súbor v priečinku `src/` (obsah lekcií = `03`–`07`, vzhľad = `01`–`02`, logika = `08`–`12`).
2. Zlož nový `index.html` (návod v README) alebo mi napíš — upravím a pripravím súbor.
3. V GitHub repozitári klikni na `index.html` → ikona ceruzky / **Upload files** → nahraj novú verziu → **Commit changes**. Web sa obnoví do minúty.

## Riešenie problémov

| Problém | Riešenie |
|---|---|
| Stránka je biela / 404 | Over, že súbor sa volá presne `index.html` a Pages je zapnuté na branch `main` + `/ (root)`. |
| Zobrazí sa app bez prihlásenia | `config.js` nemá vyplnené kľúče, alebo si nahral starú verziu — over obsah súboru priamo na GitHube. |
| Registrácia hlási chybu | Over, že prebehol celý `supabase-setup.sql` (časť A3) bez chýb. |
| Nevidím Admin sekciu | Spusti SQL z časti C a odhlás/prihlás sa. |
| Zmeny na webe nevidno | Stlač Ctrl+Shift+R (tvrdé obnovenie) — service worker môže držať starú verziu v cache. |
