<script>
/* ═══════════════════════════════════════════════════════════════════
   SIMULOVANÍ KLIENTI (50) + ROLEPLAY ENGINE + MASTER MODE „AGENTÚRA"
   ───────────────────────────────────────────────────────────────────
   • 50 unikátnych klientov: odvetvie, rozpočet, stav webu/profilu,
     konkurencia, história, problémy, ciele, povaha.
   • Roleplay: viac-kolový rozhovor s náladou klienta; hodnotí sa
     komunikácia, argumentácia, odbornosť a profesionalita.
   • Master Mode: 20 komplexných projektov s náhodnými udalosťami
     (zamietnutá reklama, prepad CTR…) a záverečným hodnotením.
   ═══════════════════════════════════════════════════════════════════ */

/* ── Katalóg problémov: kľúč → popis, očakávané témy v odpovedi ── */
DATA.problemLib = {
  'no-reviews':      { txt: 'takmer žiadne recenzie',                    kw: ['recenz', 'qr', 'žiada', 'follow', 'link'], advice: 'systém žiadania recenzií (QR/link + follow-up)' },
  'neg-reviews':     { txt: 'séria negatívnych recenzií',                kw: ['odpove', '4a', 'ospravedl', 'offline', 'nahlás'], advice: 'profesionálne odpovede (4A) + nahlásenie recenzií porušujúcich pravidlá' },
  'bad-categories':  { txt: 'zle zvolená primárna kategória profilu',    kw: ['kategó', 'konkurenc', 'local pack', 'primárn'], advice: 'analýza kategórií konkurencie a zmena primárnej kategórie' },
  'dup-profiles':    { txt: 'duplicitné firemné profily',                kw: ['duplic', 'zlúč', 'claim', 'prevz'], advice: 'zlúčenie/odstránenie duplicít a prevzatie hlavného profilu' },
  'spam-comp':       { txt: 'konkurencia spamuje názvy kľúčovými slovami', kw: ['spam', 'nahlás', 'redressal', 'suggest'], advice: 'spam fighting: Suggest an edit + Redressal form' },
  'local-invisible': { txt: 'firma nie je vidieť v Local Packu',         kw: ['audit', 'kategó', 'recenz', 'vzdialen', 'prominence'], advice: 'GBP audit → kategórie, recenzie, obsah, citácie' },
  'no-tracking':     { txt: 'kampane bežia bez merania konverzií',       kw: ['meranie', 'konverz', 'tag', 'gtm', 'consent'], advice: 'nasadenie konverzného merania + Consent Mode pred akoukoľvek optimalizáciou' },
  'wasted-budget':   { txt: 'rozpočet sa míňa na irelevantné dopyty',    kw: ['search terms', 'negatív', 'match', 'vylúč'], advice: 'čistenie search terms + negatívne kľúčové slová + prísnejšie match types' },
  'low-ctr':         { txt: 'reklamy majú nízke CTR',                    kw: ['rsa', 'nadpis', 'assets', 'relevan', 'ctr'], advice: 'prepis RSA (kľúčové slovo v nadpisoch, benefity) + assets' },
  'low-qs':          { txt: 'nízke Quality Score a drahé kliky',         kw: ['quality', 'landing', 'relevan', 'ad group', 'tesn'], advice: 'tesnejšie ad groups + dedikované landing pages' },
  'no-landing':      { txt: 'všetky reklamy vedú na homepage',           kw: ['landing', 'podstránk', 'relevan', 'konverz'], advice: 'dedikované landing pages pre témy kampaní' },
  'pmax-brand':      { txt: 'PMax si pripisuje brandové konverzie',      kw: ['brand', 'vylúč', 'exclusion', 'inkrement'], advice: 'brand exclusions v PMax + oddelená brand kampaň' },
  'no-negatives':    { txt: 'kampane nemajú negatívne slová',            kw: ['negatív', 'zoznam', 'zadarmo', 'search terms'], advice: 'univerzálny negatívny zoznam + týždenná rutina' },
  'brand-mixed':     { txt: 'brand a non-brand výkony sa miešajú',       kw: ['brand', 'oddel', 'kampa', 'čist'], advice: 'oddelenie brand kampane pre čisté dáta' },
  'feed-errors':     { txt: 'produkty zamietnuté v Merchant Center',     kw: ['feed', 'merchant', 'cen', 'title', 'gtin', 'diagnostic'], advice: 'oprava feedu: zhoda cien, GTIN, titles, Diagnostics' },
  'migration-404':   { txt: 'po redizajne prepadla návštevnosť (404-ky)', kw: ['redirect', '301', 'mapa', 'migrác'], advice: 'redirect mapa starých → nových URL + validácia v GSC' },
  'slow-web':        { txt: 'pomalý web, zlé Core Web Vitals',           kw: ['lcp', 'rýchlos', 'obrázk', 'cwv', 'core web'], advice: 'optimalizácia LCP (obrázky, server) + CWV monitoring' },
  'not-indexed':     { txt: 'nové stránky sa neindexujú',                kw: ['index', 'sitemap', 'interné odkazy', 'inspection', 'kvalit'], advice: 'URL Inspection diagnóza + interné odkazy + sitemap' },
  'soft404':        { txt: 'tisíce soft 404 stránok míňajú crawl budget', kw: ['soft 404', 'prázdne', '410', 'noindex'], advice: 'vyčistenie prázdnych stránok (obsah / 404 / 301)' },
  'cannibal':        { txt: 'viac článkov súťaží o rovnaký dopyt',       kw: ['kanibal', 'zlúč', '301', 'konsolid'], advice: 'konsolidácia obsahu + 301 slabších článkov' },
  'no-schema':       { txt: 'web nemá structured data',                  kw: ['schema', 'json', 'rich', 'markup'], advice: 'JSON-LD markup (Product/LocalBusiness) pre rich results' },
  'seasonal':        { txt: 'sezónny biznis s výkyvmi dopytu',           kw: ['sezón', 'medziroč', 'rozpoč', 'plán'], advice: 'sezónne plánovanie rozpočtov + medziročné porovnávanie' },
};

/* ── 50 KLIENTOV ──
   [meno, osoba, odvetvie, mesto, rozpočet €/mes, web(ok/bad/none),
    gbp(none/unclaimed/weak/good), konkurencia, povaha, história, problémy[], ciele] */
DATA.clients = [
  ['Dental Smile', 'MUDr. Eva Krajčová', 'Zubná ambulancia', 'Bratislava', 800, 'ok', 'weak', 'high', 'analytical', 'Nová ambulancia, 2 roky na trhu.', ['no-reviews', 'local-invisible'], 'Plný diár nových pacientov'],
  ['AutoFix Pro', 'Peter Molnár', 'Autoservis', 'Nitra', 500, 'bad', 'unclaimed', 'med', 'friendly', '15 rokov servisu, web z roku 2012.', ['dup-profiles', 'slow-web'], 'Viac zákaziek na pneuservis'],
  ['Reality Horizont', 'Ing. Jana Bieliková', 'Realitná kancelária', 'Košice', 1500, 'ok', 'good', 'high', 'impatient', 'Kampane robili sami, míňali bez výsledkov.', ['no-tracking', 'wasted-budget'], 'Leady na predaj bytov pod 40 €'],
  ['AK Urban & Partners', 'JUDr. Marek Urban', 'Advokátska kancelária', 'Bratislava', 1200, 'ok', 'weak', 'high', 'skeptical', 'Skúsili agentúru, sklamali sa.', ['low-qs', 'no-landing'], 'Klienti na obchodné právo'],
  ['Trattoria Rosa', 'Giovanni Rossi', 'Reštaurácia', 'Bratislava', 400, 'ok', 'good', 'high', 'friendly', 'Skvelé jedlo, slabá viditeľnosť.', ['neg-reviews', 'spam-comp'], 'Viac rezervácií cez víkendy'],
  ['GreenDev', 'Ing. Tomáš Novotný', 'Developer', 'Žilina', 3000, 'ok', 'none', 'med', 'analytical', 'Predávajú novú etapu projektu.', ['no-tracking', 'no-landing'], '30 dopytov na byty mesačne'],
  ['Kaviareň Lúčka', 'Zuzana Dvončová', 'Kaviareň', 'Trnava', 200, 'none', 'weak', 'med', 'chaotic', 'Malá kaviareň, žiadny marketing.', ['no-reviews', 'local-invisible'], 'Viac miestnych zákazníkov'],
  ['ElektroMax.sk', 'Milan Baran', 'E-shop s elektronikou', 'online', 5000, 'ok', 'none', 'high', 'analytical', 'Rastú, ale ROAS stagnuje.', ['feed-errors', 'pmax-brand'], 'ROAS 500 % pri raste útraty'],
  ['Hotel Panoráma', 'Mgr. Alena Piatková', 'Hotel', 'Vysoké Tatry', 2000, 'ok', 'good', 'high', 'friendly', 'Závislí od booking portálov.', ['seasonal', 'low-ctr'], 'Viac priamych rezervácií'],
  ['StavPro', 'Jozef Hric', 'Stavebná firma', 'Banská Bystrica', 700, 'bad', 'unclaimed', 'low', 'skeptical', 'Zákazky len z odporúčaní.', ['dup-profiles', 'no-reviews'], 'Stabilný prísun dopytov'],
  ['Účtovníctvo Presné', 'Ing. Mária Tóthová', 'Účtovníctvo', 'Nitra', 300, 'ok', 'weak', 'med', 'analytical', 'Chcú rásť o 10 klientov ročne.', ['local-invisible', 'no-landing'], 'B2B klienti — s.r.o. v okrese'],
  ['Elektro Švec', 'Ondrej Švec', 'Elektrikár', 'Trenčín', 250, 'none', 'none', 'low', 'friendly', 'Živnostník, chce prvé online kroky.', ['no-reviews', 'local-invisible'], 'Telefonáty na súrne opravy'],
  ['Fit Zone', 'Katarína Vlčková', 'Fitness centrum', 'Prešov', 600, 'ok', 'good', 'med', 'impatient', 'Januárová vlna vždy odíde.', ['seasonal', 'no-tracking'], 'Celoročný prísun členstiev'],
  ['Pet Shop Maxík', 'Lucia Hrušková', 'Chovateľské potreby', 'Martin', 450, 'ok', 'weak', 'med', 'friendly', 'Kamenná predajňa + malý e-shop.', ['feed-errors', 'no-reviews'], 'Online objednávky krmiva'],
  ['Autoškola Jazdi', 'Roman Kolár', 'Autoškola', 'Žilina', 350, 'bad', 'weak', 'med', 'chaotic', 'Web robí synovec.', ['slow-web', 'low-ctr'], 'Naplniť 3 kurzy mesačne'],
  ['Krásne Vlasy', 'Simona Ballová', 'Kaderníctvo', 'Bratislava', 150, 'none', 'good', 'high', 'friendly', 'Instagram im funguje, Google ignorovali.', ['no-reviews', 'spam-comp'], 'Rezervácie nových klientiek'],
  ['TechFix Servis', 'Adam Kučera', 'Servis počítačov', 'Košice', 400, 'ok', 'weak', 'med', 'analytical', 'Konkurujú veľkým reťazcom.', ['low-qs', 'no-negatives'], 'Servisné zákazky B2B'],
  ['Vinárstvo Terra', 'Pavol Šimko', 'Vinárstvo', 'Modra', 500, 'ok', 'none', 'low', 'friendly', 'Predávajú cez veľkoobchod, chcú D2C.', ['no-schema', 'no-tracking'], 'Predaj vína cez e-shop'],
  ['Zámočník NONSTOP', 'Igor Malík', 'Zámočníctvo', 'Bratislava', 600, 'bad', 'weak', 'high', 'impatient', 'Trh plný spamerov a lead-gen podvodov.', ['spam-comp', 'wasted-budget'], 'Hovory na otváranie dverí'],
  ['Optika Jasno', 'Mgr. Viera Očenášová', 'Optika', 'Trnava', 300, 'ok', 'good', 'med', 'analytical', 'Solídny biznis, chcú viac vyšetrení.', ['low-ctr', 'no-landing'], 'Rezervácie meraní zraku'],
  ['Sťahovanie Rýchlo', 'Marek Držík', 'Sťahovacie služby', 'celé SK', 550, 'ok', 'unclaimed', 'med', 'chaotic', 'SAB biznis, jazdí po celom kraji.', ['dup-profiles', 'wasted-budget'], 'Dopyty na firemné sťahovania'],
  ['Jazyková škola Speak', 'PhDr. Nina Lacková', 'Jazyková škola', 'Bratislava', 900, 'ok', 'weak', 'high', 'friendly', 'Konkurencia masívne inzeruje.', ['brand-mixed', 'low-qs'], 'Zápisy do firemných kurzov'],
  ['Cukráreň Vanilka', 'Eva Šulcová', 'Cukráreň', 'Piešťany', 180, 'none', 'weak', 'low', 'friendly', 'Torty na objednávku, IG funguje.', ['no-reviews', 'local-invisible'], 'Objednávky svadobných tort'],
  ['SolarTech SK', 'Ing. Peter Gajdoš', 'Fotovoltika', 'celé SK', 2500, 'ok', 'none', 'high', 'analytical', 'Trh ochladol po dotačnom boome.', ['wasted-budget', 'no-landing'], 'Kvalifikované dopyty pod 60 €'],
  ['Móda Nina', 'Nina Príkopová', 'E-shop s módou', 'online', 3500, 'ok', 'none', 'high', 'impatient', 'Meta Ads zdraželi, hľadajú diverzifikáciu.', ['feed-errors', 'no-tracking'], 'ROAS 400 % z Google'],
  ['Fyzio Aktív', 'Mgr. Ján Baláž', 'Fyzioterapia', 'Nitra', 350, 'ok', 'weak', 'med', 'friendly', 'Plná kapacita o 2 mesiace — chcú stabilitu.', ['no-reviews', 'not-indexed'], 'Stabilné objednávky terapií'],
  ['Autopožičovňa Drive', 'Filip Urblík', 'Autopožičovňa', 'Bratislava', 800, 'ok', 'weak', 'high', 'skeptical', 'Cenová vojna s konkurenciou.', ['low-ctr', 'brand-mixed'], 'Rezervácie na dlhodobý prenájom'],
  ['Záhradníctvo Flóra', 'Anna Ružičková', 'Záhradníctvo', 'Zvolen', 250, 'bad', 'good', 'low', 'friendly', 'Sezónny biznis jar/jeseň.', ['seasonal', 'slow-web'], 'Jarný nápor zvládnuť online'],
  ['DetOX Čistiareň', 'Braňo Mikuš', 'Čistiareň odevov', 'Bratislava', 200, 'none', 'weak', 'med', 'chaotic', '3 pobočky, každá iné údaje na webe.', ['dup-profiles', 'local-invisible'], 'Zjednotiť pobočky + viac zákaziek'],
  ['LawTech Consulting', 'JUDr. Ivana Šebová', 'Právne poradenstvo B2B', 'Bratislava', 1000, 'ok', 'none', 'med', 'analytical', 'Nový butik, nulová viditeľnosť.', ['not-indexed', 'no-landing'], 'B2B leady na GDPR audity'],
  ['Pekáreň Chlebík', 'Martin Bosák', 'Pekáreň', 'Ružomberok', 150, 'none', 'unclaimed', 'low', 'friendly', 'Profil vytvoril Google automaticky.', ['dup-profiles', 'no-reviews'], 'Ranné návštevy miestnych'],
  ['SwimAcademy', 'Mgr. Petra Vodová', 'Plavecká škola', 'Košice', 400, 'ok', 'weak', 'med', 'impatient', 'Kurzy sa plnia na poslednú chvíľu.', ['seasonal', 'low-ctr'], 'Naplniť kurzy mesiac vopred'],
  ['Strechy Kováč', 'Ľubomír Kováč', 'Strechárske práce', 'Prešov', 450, 'bad', 'weak', 'med', 'skeptical', '„Internetu neverím, ale konkurencia rastie."', ['no-reviews', 'slow-web'], 'Dopyty na rekonštrukcie striech'],
  ['Yoga Space', 'Dominika Tichá', 'Yoga štúdio', 'Bratislava', 250, 'ok', 'good', 'high', 'friendly', 'Komunita je, rast sa zastavil.', ['cannibal', 'low-ctr'], 'Noví členovia na mesačné členstvá'],
  ['AutoUmyváreň Lesk', 'Rasťo Dubec', 'Ručná umyváreň', 'Trnava', 200, 'none', 'weak', 'med', 'chaotic', 'Detailing robia najlepšie v okolí.', ['no-reviews', 'local-invisible'], 'Rezervácie na detailing balíky'],
  ['MedSpa Elixír', 'MUDr. Laura Fialová', 'Estetická medicína', 'Bratislava', 1800, 'ok', 'weak', 'high', 'impatient', 'Vysoká hodnota zákazníka, drahé kliky.', ['low-qs', 'no-tracking'], 'Konzultácie pod 35 €'],
  ['Kníhkupectvo Literka', 'Alica Vargová', 'Kníhkupectvo', 'Banská Bystrica', 300, 'ok', 'good', 'med', 'friendly', 'E-shop + predajňa, malé objednávky.', ['no-schema', 'feed-errors'], 'Rast online objednávok'],
  ['HomeCleaning Pro', 'Iveta Šálková', 'Upratovacie služby', 'Bratislava', 500, 'ok', 'none', 'high', 'analytical', 'B2C aj B2B upratovanie, SAB.', ['no-landing', 'wasted-budget'], 'Pravidelné B2B kontrakty'],
  ['Rybárske Potreby Splávik', 'Milan Ostrih', 'Špecializovaný obchod', 'Komárno', 250, 'bad', 'weak', 'low', 'friendly', 'Niche komunita, verní zákazníci.', ['slow-web', 'no-reviews'], 'Zákazníci z celého regiónu'],
  ['IT Kurzy CodeNow', 'Ing. Dávid Herda', 'Vzdelávanie IT', 'online', 1500, 'ok', 'none', 'high', 'analytical', 'Kurzy programovania pre dospelých.', ['cannibal', 'brand-mixed'], 'Prihlášky na bootcamp'],
  ['Veterinár VetCare', 'MVDr. Soňa Králiková', 'Veterinárna ambulancia', 'Žilina', 300, 'ok', 'good', 'med', 'friendly', 'Milovaní, ale nedostupní — plno.', ['neg-reviews', 'no-landing'], 'Presun rutiny na online obj.'],
  ['Moto Servis Rider', 'Erik Čierny', 'Servis motocyklov', 'Trenčín', 300, 'none', 'unclaimed', 'low', 'chaotic', 'Sezóna apríl–október.', ['seasonal', 'dup-profiles'], 'Naplniť jarné termíny'],
  ['Svadobný Salón Bella', 'Diana Weissová', 'Svadobný salón', 'Nitra', 350, 'ok', 'weak', 'med', 'friendly', 'Dlhý rozhodovací proces nevesty.', ['no-reviews', 'low-ctr'], 'Termíny skúšok šiat'],
  ['GastroDodávky HoReCa', 'Štefan Polák', 'B2B distribúcia gastro', 'celé SK', 1200, 'ok', 'none', 'med', 'skeptical', 'Obchodníci v teréne, online nula.', ['not-indexed', 'no-landing'], 'B2B dopyty reštaurácií'],
  ['Klimatizácie AirFlow', 'Marcel Vetrík', 'Klimatizácie a servis', 'Bratislava', 700, 'ok', 'weak', 'high', 'impatient', 'Leto = zlatá horúčka, zima = mŕtvo.', ['seasonal', 'wasted-budget'], 'Vyhladiť sezónu servismi'],
  ['Farby-Laky Duha', 'Vlado Farbiar', 'Predajňa farieb', 'Prievidza', 200, 'bad', 'weak', 'low', 'friendly', 'Konkuruje im OBI.', ['local-invisible', 'slow-web'], 'Miestni majstri a domácnosti'],
  ['TattooArt Studio', 'Rebeka Čiernik', 'Tetovacie štúdio', 'Košice', 250, 'none', 'good', 'med', 'chaotic', 'IG plný, Google prázdny.', ['no-reviews', 'spam-comp'], 'Rezervácie na väčšie projekty'],
  ['Bazény AquaJoy', 'Ing. Radoslav Vlna', 'Predaj a montáž bazénov', 'celé SK', 1600, 'ok', 'none', 'med', 'analytical', 'Drahý produkt, dlhý cyklus.', ['no-tracking', 'seasonal'], 'Kvalifikované dopyty na montáž'],
  ['Senior Care Láskavo', 'Mgr. Helena Dobrá', 'Opatrovateľské služby', 'Bratislava', 600, 'ok', 'weak', 'med', 'friendly', 'Citlivá cieľovka — rozhodujú deti seniorov.', ['no-reviews', 'no-landing'], 'Dopyty rodín na opateru'],
  ['Grand Optika Group', 'Ing. Norbert Skala', 'Sieť optík (8 pobočiek)', 'celé SK', 4000, 'ok', 'weak', 'high', 'analytical', 'Každá pobočka iný chaos.', ['dup-profiles', 'brand-mixed'], 'Štandardizovať a rásť ako sieť'],
].map((c, i) => ({
  id: 'cl' + (i + 1), name: c[0], person: c[1], industry: c[2], city: c[3], budget: c[4],
  web: c[5], gbp: c[6], competition: c[7], personality: c[8], history: c[9], problems: c[10], goal: c[11],
  master: i % 5 !== 4, // ~40 klientov vhodných na roleplay, 20 z nich sú master projekty (označené nižšie)
}));
/* 20 master projektov = prvých 20 klientov s najvyššími rozpočtami */
(() => {
  const sorted = [...DATA.clients].sort((a, b) => b.budget - a.budget).slice(0, 20).map(c => c.id);
  DATA.clients.forEach(c => c.master = sorted.includes(c.id));
})();

/* ── Udalosti pre Master Mode (možnosti: score 0–2 + feedback) ── */
DATA.masterEvents = [
  { txt: '🚨 Google zamietol tvoju hlavnú reklamu — „Nedostupná cieľová stránka".', opts: [
    ['Vytvorím novú reklamu s iným textom', 0, 'Text nie je problém — dôvod je landing page. Reklama by bola zamietnutá znova.'],
    ['Skontrolujem dostupnosť a rýchlosť landing page a požiadam o prehodnotenie', 2, 'Presne — „Destination not working" znamená nedostupný/nefunkčný web. Fix + re-review.'],
    ['Počkám, možno sa to opraví samo', 0, 'Zamietnutá reklama sa sama neopraví — kampaň stojí a klient platí za nič.']]},
  { txt: '⭐ Klient dostal 1★ recenziu: „Katastrofa, nikdy viac!" — bez detailov.', opts: [
    ['Odpoviem profesionálne (4A) a pokúsim sa presunúť riešenie offline', 2, 'Správne — verejná odpoveď je pre budúcich zákazníkov, detaily patria do súkromného kanála.'],
    ['Poradím klientovi recenziu ignorovať', 0, 'Neodpovedaná negatívna recenzia odrádza zákazníkov a signalizuje nezáujem.'],
    ['Nahlásim recenziu Googlu, nech ju zmaže', 1, 'Nahlásiť možno len recenzie porušujúce pravidlá — všeobecná nespokojnosť medzi ne nepatrí. Odpoveď je nutná tak či tak.']]},
  { txt: '📉 CTR kampane kleslo za 2 týždne z 6 % na 2,8 %.', opts: [
    ['Zvýšim bidy, nech sme vyššie', 1, 'Vyššia pozícia môže CTR zdvihnúť, ale nerieši príčinu — najprv diagnostika (SERP, konkurencia, search terms).'],
    ['Skontrolujem Auction Insights a search terms — čo sa zmenilo v aukcii a dopytoch', 2, 'Správny prístup: najprv príčina (nový konkurent? iné dopyty? únava kreatívy?), potom liek.'],
    ['Vypnem kampaň', 0, 'Vypnutie bez diagnózy zahodí dáta aj momentum. CTR pokles je signál na analýzu, nie paniku.']]},
  { txt: '💸 Klient volá: „Znižujem rozpočet na polovicu, výsledky nevidím."', opts: [
    ['Súhlasím bez diskusie — klient má vždy pravdu', 1, 'Ústretovosť áno, ale bez dát klient nevidí, čo stráca. Chýba ti argumentácia hodnotou.'],
    ['Ukážem dáta: čo rozpočet priniesol, čo polovica znamená pre výsledky, a navrhnem koncentráciu na najvýkonnejšie kampane', 2, 'Profesionál: dáta + dôsledky + plán B. Rozpočet sa možno zníži, ale informovane a s prioritizáciou.'],
    ['Poviem mu, že to je chyba a výsledky prídu', 0, 'Prázdne sľuby bez dát dôveru nezachránia — presne tak sa klienti strácajú.']]},
  { txt: '⚔️ Konkurencia spustila agresívne kampane na brand tvojho klienta.', opts: [
    ['Spustím obrannú brand kampaň s vysokým Impression Share cieľom', 2, 'Brand obrana je lacná a účinná — vlastný brand má najvyšší QS, konkurent platí násobne viac.'],
    ['Začnem bidovať na brand konkurencie ako odvetu', 1, 'Možné, ale drahé (nízky QS) a eskaluje vojnu. Najprv obrana vlastného brandu.'],
    ['Nič — na brand klienta predsa nikto nemôže', 0, 'Môže — bidovanie na cudzí brand je povolené. Bez obrany konkurent zbiera tvojich najhorúcejších zákazníkov.']]},
  { txt: '🛒 Merchant Center zamietol 40 % produktov: „nesúlad cien".', opts: [
    ['Skontrolujem synchronizáciu feedu a webu a zapnem automatické aktualizácie cien', 2, 'Presne — cena vo feede sa musí zhodovať s webom. Automatika + pravidelný refresh feedu.'],
    ['Zmažem zamietnuté produkty z feedu', 0, 'Prídeš o 40 % sortimentu v Shopping — problém je synchronizácia, nie produkty.'],
    ['Založím nový Merchant Center účet', 0, 'Nový účet s rovnakou chybou skončí rovnako — a opakované zakladanie účtov je rizikové.']]},
  { txt: '📵 Klientovi prestali chodiť konverzie — nula už 3 dni, útrata beží.', opts: [
    ['Kampane sa pokazili — vypnem ich, kým sa to nevyrieši', 1, 'Zastavenie útraty je pochopiteľné, ale pravdepodobná príčina je meranie — najprv over tag.'],
    ['Otestujem konverzné meranie (Tag Assistant, testovacia konverzia) — náhla nula je takmer vždy technika', 2, 'Správne — nulové konverzie pri bežnej útrate = rozbitý tag/web/formulár, nie trh.'],
    ['Zvýšim rozpočet, nech sa konverzie vrátia', 0, 'Liať viac peňazí do nemeraného systému je najhoršia možná reakcia.']]},
  { txt: '🗺️ Profil klienta zmizol z Maps — „suspendovaný".', opts: [
    ['Založím okamžite nový profil', 0, 'Duplicitný profil počas suspendácie porušuje pravidlá a môže zablokovať aj odvolanie.'],
    ['Zistím príčinu (zmeny na profile? pravidlá?), opravím a podám odvolanie s dokladmi', 2, 'Správny proces: príčina → náprava → appeal s dôkazmi (doklady, fotky prevádzky).'],
    ['Poviem klientovi, že Google sa zbláznil a treba čakať', 0, 'Suspendácie majú dôvody a formálny appeal proces — čakanie nič nevyrieši.']]},
  { txt: '🤖 Klient si prečítal o PMax a žiada: „Zrušme všetko, dajme všetko do PMax!"', opts: [
    ['Vysvetlím role kampaní: PMax ako doplnok Search základu, brand oddelene, a navrhnem test', 2, 'Presne — PMax nie je náhrada štruktúry. Vysvetlenie + kontrolovaný experiment = profesionálny prístup.'],
    ['Urobím, čo klient chce', 0, 'Slepé vykonanie by zničilo fungujúcu štruktúru a čisté dáta — tvoja práca je aj poradiť.'],
    ['Odmietnem — PMax je čierna skrinka a nepoužívame ho', 1, 'Paušálne odmietnutie moderného nástroja tiež nie je odbornosť — PMax má svoje miesto.']]},
  { txt: '📊 Mesačný report: CPA vzrástlo o 20 %, klient čaká vysvetlenie.', opts: [
    ['Pošlem tabuľku s číslami, nech si to pozrie', 0, 'Report bez interpretácie je nedokončená práca — klient číslam nerozumie.'],
    ['Analyzujem príčinu (aukcia? sezóna? zmeny?), vysvetlím ľudskou rečou a priložím plán nápravy', 2, 'Interpretácia + príčina + plán — presne za toto si klient platí špecialistu.'],
    ['Číslo v reporte radšej nezvýrazním', 0, 'Skrývanie sa vždy prevalí a zničí dôveru. Zlé správy komunikuj proaktívne.']]},
  { txt: '🔍 Po nasadení novej šablóny webu klesla organika o 30 %.', opts: [
    ['Skontrolujem technickú regresiu: noindex, robots.txt, canonicaly, zmeny URL', 2, 'Prepad po nasadení = takmer vždy technická chyba v novej verzii. Systematický technický audit.'],
    ['Počkáme — Google si zvykne', 0, 'Ak nová verzia blokuje indexáciu, čakanie prepad len prehĺbi.'],
    ['Kúpim spätné odkazy na posilnenie', 0, 'Odkazy neriešia technickú príčinu a kupovanie porušuje pravidlá.']]},
  { txt: '💬 Klient chce kúpiť 50 recenzií „na rozbeh" — „všetci to tak robia".', opts: [
    ['Odmietnem a vysvetlím riziká (filter, strata dôvery, pravidlá) + ponúknem legálny systém žiadania recenzií', 2, 'Etika + alternatíva. Kúpené recenzie sú zakázané a spam filter ich aj tak zoberie.'],
    ['Kúpim ich cez spoľahlivého dodávateľa', 0, 'Porušenie pravidiel s rizikom pre profil klienta — a tvoju reputáciu.'],
    ['Poviem, že sa to nedá', 1, 'Odmietnutie je správne, ale bez vysvetlenia a alternatívy klient pôjde za niekým „ochotnejším".']]},
  { txt: '⏰ Sezóna klienta vrcholí o 6 týždňov a kampane ešte len spúšťaš.', opts: [
    ['Spustím všetko naraz s maximálnym rozpočtom', 1, 'Rýchlosť áno, ale bez learning fázy a čistenia dopytov spáliš veľa. Postupný nábeh je efektívnejší.'],
    ['Spustím ihneď core Search s prísnym cielením, nech sa systém učí, a rozpočet stupňujem k sezóne', 2, 'Presne — learning fáza prebehne pred špičkou a do sezóny vstupuješ s vyladeným účtom.'],
    ['Radšej počkám na začiatok sezóny', 0, 'Premeškáš learning fázu — kampane sa budú učiť počas najdrahších týždňov.']]},
  { txt: '🧾 Klient sa pýta: „Prečo platíme za kliky na naše vlastné meno? Veď nás nájdu aj tak."', opts: [
    ['Vysvetlím: obrana pred konkurenciou, kontrola správy, lacné konverzie — a ukážem dáta Impression Share na brande', 2, 'Korektná odpoveď s dátami. Ak na brand nikto nebiduje, možno kampaň netreba — rozhodnú dáta.'],
    ['Brand kampaň okamžite vypnem', 1, 'Ak konkurencia na brand biduje, vypnutie ju pustí na vrch — najprv over aukciu.'],
    ['Poviem, že to tak robia všetci', 0, '„Všetci to tak robia" nie je argument — klient si zaslúži vecné vysvetlenie.']]},
];

/* ═══════════════ ROLEPLAY ENGINE v2 ═══════════════ */
const Roleplay = {
  session: null, // { client, round, mood, scores:{comm,arg,expert,prof}, log }

  start(clientId) {
    const c = DATA.clients.find(x => x.id === clientId);
    this.session = { client: c, round: 1, mood: c.personality === 'skeptical' || c.personality === 'impatient' ? 'wary' : 'neutral', scores: { comm: 0, arg: 0, expert: 0, prof: 0 }, maxRounds: 3 };
    const moodTxt = { friendly: 'priateľsky', skeptical: 'skepticky', impatient: 'netrpezlivo', analytical: 'vecne', chaotic: 'chaoticky' }[c.personality];
    this.renderChat(`<b>${c.person}</b> (${c.name}, ${c.industry}) pôsobí ${moodTxt}:<br><br><i>„${this.intro(c)}"</i>`);
  },
  intro(c) {
    const probs = c.problems.map(p => DATA.problemLib[p].txt).join(' a ');
    const openers = {
      friendly: `Dobrý deň! Odporučili nám vás. Máme ${c.industry.toLowerCase()} v ${c.city} a trápi nás, že ${probs}. Cieľ? ${c.goal}. Rozpočet vieme dať okolo ${c.budget} € mesačne. Čo na to hovoríte?`,
      skeptical: `Dobrý deň. Poviem otvorene — marketérom moc neverím. ${c.history} Ale fakt je, že ${probs}. Ak by ste ma vedeli presvedčiť... cieľ je ${c.goal.toLowerCase()}. Prečo by som mal veriť práve vám?`,
      impatient: `Dobrý deň, poďme rovno k veci, nemám veľa času. ${c.industry}, ${c.city}, problém: ${probs}. Potrebujem ${c.goal.toLowerCase()} — a rýchlo. Koľko a za aký čas?`,
      analytical: `Dobrý deň. Pripravil som si podklady: ${c.history} Identifikovali sme, že ${probs}. KPI: ${c.goal.toLowerCase()}, mesačný rozpočet ${c.budget} €. Zaujíma ma váš konkrétny postup a metriky.`,
      chaotic: `Jéj, dobrý deň! Tak ja ani neviem kde začať... ${c.history} No a vraj ${probs}? Alebo to bolo niečo iné... Každopádne chceme ${c.goal.toLowerCase()}. Pomôžete? Čo máme robiť?`,
    };
    return openers[c.personality];
  },
  evaluate(text) {
    const t = text.toLowerCase();
    const c = this.session.client;
    // odbornosť: trafené témy z problémov klienta
    const allKw = c.problems.flatMap(p => DATA.problemLib[p].kw);
    const expertHits = allKw.filter(k => t.includes(k)).length;
    // argumentácia: čísla, dáta, proces, prečo
    const argHits = ['dát', 'čísl', 'merat', 'krok', 'najprv', 'preto', 'napríklad', 'audit', '%', '€'].filter(k => t.includes(k)).length;
    // komunikácia: dĺžka primeraná, otázky na klienta, oslovenie
    const commHits = (t.length > 80 ? 1 : 0) + (t.includes('?') ? 1 : 0) + (['rozumiem', 'chápem', 'dobrá otázka', 'súhlas'].some(k => t.includes(k)) ? 1 : 0);
    // profesionalita: bez prehnaných sľubov
    const badPromise = ['garantujem', 'zaručujem', 'prvé miesto', 'do týždňa', '100 %'].some(k => t.includes(k));
    const profScore = badPromise ? 0 : (['realis', 'očakáv', 'týždn', 'mesiac', 'postupne'].some(k => t.includes(k)) ? 2 : 1);
    const s = this.session.scores;
    s.expert += Math.min(2, expertHits);
    s.arg += Math.min(2, argHits >= 2 ? 2 : argHits);
    s.comm += Math.min(2, commHits);
    s.prof += profScore;
    /* Rubrika: zaznamenaj dôvody odpočtov (kalibrované hodnotenie) */
    if (!this.session.deductions) this.session.deductions = [];
    const round = this.session.round;
    if (expertHits === 0) this.session.deductions.push(`Kolo ${round}: −2 Odbornosť — odpoveď nereagovala na konkrétne problémy klienta (${c.problems.map(p => DATA.problemLib[p].txt).join(', ')})`);
    if (argHits < 2) this.session.deductions.push(`Kolo ${round}: −${2 - Math.min(2, argHits)} Argumentácia — chýbali dáta, čísla alebo konkrétny postup krokov`);
    if (commHits < 2) this.session.deductions.push(`Kolo ${round}: −${2 - Math.min(2, commHits)} Komunikácia — ${!t.includes('?') ? 'žiadna otázka na klienta' : 'príliš stručná odpoveď'}`);
    if (badPromise) this.session.deductions.push(`Kolo ${round}: −2 Profesionalita — ZAKÁZANÉ TVRDENIE (garancia/prvé miesto/nereálny termín)`);
    else if (profScore < 2) this.session.deductions.push(`Kolo ${round}: −1 Profesionalita — chýbalo nastavenie realistických očakávaní`);
    // nálada klienta
    const roundScore = Math.min(2, expertHits) + profScore;
    if (badPromise) this.session.mood = 'angry';
    else if (roundScore >= 3) this.session.mood = 'happy';
    else if (roundScore <= 1) this.session.mood = this.session.mood === 'wary' ? 'angry' : 'wary';
    return { expertHits, badPromise, roundScore };
  },
  reply(evalR) {
    const c = this.session.client;
    const advice = c.problems.map(p => DATA.problemLib[p].advice)[this.session.round - 2] || DATA.problemLib[c.problems[0]].advice;
    if (evalR.badPromise) return `„Moment — ${['garancie', 'prvé miesto', 'do týždňa'].find(x => true)}? To mi sľuboval aj minulý dodávateľ a dopadlo to zle. Teraz vám verím menej. Skúste znova — bez zázrakov."`;
    if (this.session.mood === 'happy') {
      const replies = [
        `„Dobre, to znie rozumne. A čo konkrétne by ste riešili ako prvé — a dokedy uvidím prvé čísla?"`,
        `„Páči sa mi ten prístup. Posledná vec: rozpočet ${c.budget} € — stačí to vôbec? A ako budeme merať, či to funguje?"`,
      ];
      return replies[this.session.round - 2] || replies[0];
    }
    if (this.session.mood === 'angry') return `„Úprimne? Nepresvedčili ste ma. Hovoríte všeobecne. Náš problém je ${DATA.problemLib[c.problems[0]].txt} — počul som, že sa to rieši cez ${advice}. Viete o tom niečo?"`;
    const nextProb = c.problems[Math.min(this.session.round - 1, c.problems.length - 1)];
    return `„Hm, čiastočne rozumiem, ale stále mi nie je jasný postup. Konkrétne — čo spravíte s tým, že ${DATA.problemLib[nextProb].txt}?"`;
  },
  finish() {
    const s = this.session.scores;
    const max = this.session.maxRounds * 2;
    const pct = k => Math.round(Math.min(100, s[k] / max * 100));
    const total = Math.round((pct('comm') + pct('arg') + pct('expert') + pct('prof')) / 4);
    App.state.roleplaysDone = (App.state.roleplaysDone || 0) + 1;
    App.save();
    App.addXP(30 + Math.round(total / 2), 'Roleplay s klientom');
    const grade = total >= 80 ? '🏆 Výborné — klient by podpísal zmluvu.' : total >= 55 ? '👍 Solídne — klient si vyžiada ešte jedno stretnutie.' : '📚 Klient sa „ozve neskôr". Pozri si tipy nižšie a skús iného klienta.';
    const c = this.session.client;
    const html = `
      <div class="text-center mb-3"><div class="text-4xl">${total >= 80 ? '🏆' : total >= 55 ? '🤝' : '📚'}</div>
      <div class="font-bold text-lg text-zinc-900 dark:text-white">Hodnotenie: ${total} %</div>
      <div class="text-sm text-zinc-500">${grade}</div></div>
      ${[['💬 Komunikácia', 'comm'], ['📊 Argumentácia', 'arg'], ['🎓 Odbornosť', 'expert'], ['🤵 Profesionalita', 'prof']].map(([n, k]) => `
        <div class="flex items-center gap-2 text-sm mb-1.5"><span class="w-36">${n}</span>
        <div class="flex-1 h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden"><div class="h-full rounded-full ${pct(k) >= 60 ? 'bg-emerald-500' : 'bg-amber-500'}" style="width:${pct(k)}%"></div></div>
        <b class="w-10 text-right text-xs">${pct(k)} %</b></div>`).join('')}
      ${this.session.deductions && this.session.deductions.length ? `
      <div class="mt-3 rounded-xl bg-amber-500/10 border border-amber-500/20 p-3 text-xs text-zinc-700 dark:text-zinc-300">
        <b class="text-amber-500">📋 Rubrika — dôvody odpočtov:</b>
        <ul class="mt-1 space-y-0.5">${this.session.deductions.slice(0, 8).map(d => `<li>• ${d}</li>`).join('')}</ul>
      </div>` : ''}
      <div class="mt-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 p-3 text-xs text-zinc-700 dark:text-zinc-300">
        <b class="text-indigo-400">Referenčné riešenie (čo klient potreboval počuť):</b> ${c.problems.map(p => DATA.problemLib[p].advice).join(' · ')}
      </div>`;
    this.session = null;
    return html;
  },
  renderChat(clientHtml, feedback) {
    const s = this.session;
    const moodEmoji = { neutral: '😐', wary: '🤨', happy: '🙂', angry: '😠' };
    App.modal(`
      <div class="flex items-center justify-between mb-3">
        <div><h3 class="font-bold text-zinc-900 dark:text-white">${s ? s.client.name : 'Roleplay'}</h3>
        ${s ? `<div class="text-xs text-zinc-500">Kolo ${s.round}/${s.maxRounds} · nálada klienta: ${moodEmoji[s.mood]} · rozpočet ${s.client.budget} €/mes.</div>` : ''}</div>
        <button onclick="Roleplay.session=null;App.closeModal()" class="text-zinc-400 hover:text-red-400"><i data-lucide="x" class="w-5 h-5"></i></button>
      </div>
      ${feedback ? `<div class="mb-3 text-xs rounded-xl bg-zinc-100 dark:bg-zinc-800/70 p-3">${feedback}</div>` : ''}
      <div class="rounded-2xl bg-zinc-100 dark:bg-zinc-800/70 p-4 text-sm text-zinc-800 dark:text-zinc-200 mb-4">${clientHtml}</div>
      ${s ? `
      <textarea id="rp-input" rows="4" placeholder="Tvoja odpoveď klientovi… (píš ako skutočnému klientovi — konkrétne kroky, dáta, realistické očakávania)"
        class="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent p-3 text-sm outline-none focus:border-indigo-500 mb-3"></textarea>
      <button onclick="Roleplay.send()" class="btn-press w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold">Odpovedať klientovi</button>`
      : `<button onclick="App.closeModal();App.render()" class="btn-press w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold">Zavrieť</button>`}
    `, true);
    if (window.lucide) lucide.createIcons();
  },
  send() {
    const text = document.getElementById('rp-input').value.trim();
    if (text.length < 20) { App.toast('✍️ Napíš plnohodnotnú odpoveď', 'aspoň pár viet', ''); return; }
    const ev = this.evaluate(text);
    const fb = ev.badPromise
      ? '🔴 <b>Pozor:</b> nereálne sľuby (garancie, prvé miesto…) sú červená vlajka — profesionál ich nikdy nedáva.'
      : ev.roundScore >= 3 ? '🟢 <b>Dobrá odpoveď:</b> trafil si témy klienta a držíš realistické očakávania.'
      : ev.expertHits === 0 ? '🟠 <b>Príliš všeobecné:</b> odpoveď sa dala povedať hocikomu — klient potrebuje počuť riešenie svojho problému.'
      : '🟡 <b>Čiastočne:</b> smer dobrý, pridaj konkrétny postup a dáta.';
    this.session.round++;
    if (this.session.round > this.session.maxRounds) {
      this.renderChat(this.finish(), fb);
    } else {
      this.renderChat(`<i>${this.reply(ev)}</i>`, fb);
    }
  },
};

/* ═══════════════ MASTER MODE ENGINE ═══════════════ */
const Master = {
  unlocked() { return DATA.modules.every(m => App.moduleProgress(m.id) >= 100); },
  stateFor(cid) {
    if (!App.state.master[cid]) App.state.master[cid] = { step: 0, score: 0, events: App.sample(DATA.masterEvents, 5).map(e => DATA.masterEvents.indexOf(e)), done: false, log: [] };
    return App.state.master[cid];
  },
  open(cid) {
    const c = DATA.clients.find(x => x.id === cid);
    const st = this.stateFor(cid);
    if (st.done) { this.finalReport(cid); return; }
    if (st.step === 0) {
      App.modal(`
        <h3 class="font-bold text-lg text-zinc-900 dark:text-white mb-1">👑 Master projekt: ${c.name}</h3>
        <p class="text-xs text-zinc-500 mb-3">${c.industry} · ${c.city} · rozpočet ${c.budget} €/mes. · konkurencia: ${c.competition}</p>
        <div class="rounded-xl bg-zinc-100 dark:bg-zinc-800/70 p-3 text-sm mb-3">
          <b>Brief:</b> ${c.history} Problémy: ${c.problems.map(p => DATA.problemLib[p].txt).join(', ')}. Cieľ: ${c.goal}.
          Stav webu: ${{ ok: 'v poriadku', bad: 'zastaraný', none: 'žiadny' }[c.web]} · GBP: ${{ none: 'neexistuje', unclaimed: 'neprevzatý', weak: 'slabý', good: 'dobrý' }[c.gbp]}.
        </div>
        <p class="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Spravuješ tohto klienta 5 „týždňov". Každý týždeň príde reálna udalosť a tvoja reakcia rozhodne o výsledku spolupráce.</p>
        <button onclick="App.closeModal();Master.nextEvent('${cid}')" class="btn-press w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold">Začať týždeň 1 →</button>`, true);
      st.step = 1; App.save();
      return;
    }
    this.nextEvent(cid);
  },
  nextEvent(cid) {
    const st = this.stateFor(cid);
    if (st.step > 5) { st.done = true; App.save(); this.finalReport(cid); return; }
    const ev = DATA.masterEvents[st.events[st.step - 1]];
    const shuffled = App.sample(ev.opts.map((o, i) => ({ o, i })), ev.opts.length);
    App.modal(`
      <div class="text-xs text-zinc-500 mb-2">Týždeň ${st.step}/5 · skóre ${st.score}/${(st.step - 1) * 2}</div>
      ${Views.progressBar(st.step / 5 * 100, 'from-violet-500 to-fuchsia-500', 'h-1.5')}
      <h3 class="font-bold text-zinc-900 dark:text-white my-4">${ev.txt}</h3>
      <div class="space-y-2">
        ${shuffled.map(({ o, i }) => `
        <button onclick="Master.choose('${cid}',${st.events[st.step - 1]},${i})" class="btn-press w-full text-left px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-violet-500 text-sm transition">${o[0]}</button>`).join('')}
      </div>`, true);
  },
  choose(cid, evIdx, optIdx) {
    const st = this.stateFor(cid);
    const opt = DATA.masterEvents[evIdx].opts[optIdx];
    st.score += opt[1];
    st.log.push({ ev: evIdx, opt: optIdx, pts: opt[1] });
    st.step++;
    App.save();
    App.modal(`
      <div class="text-center mb-3 text-3xl">${opt[1] === 2 ? '✅' : opt[1] === 1 ? '🟡' : '❌'}</div>
      <div class="font-bold text-center text-zinc-900 dark:text-white mb-2">${opt[1] === 2 ? 'Výborná reakcia! (+2)' : opt[1] === 1 ? 'Čiastočne správne (+1)' : 'Zlá reakcia (0)'}</div>
      <p class="text-sm text-zinc-600 dark:text-zinc-400 rounded-xl bg-zinc-100 dark:bg-zinc-800/70 p-3 mb-4">${opt[2]}</p>
      <button onclick="App.closeModal();Master.nextEvent('${cid}')" class="btn-press w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold">${st.step > 5 ? 'Záverečné hodnotenie →' : 'Pokračovať na týždeň ' + st.step + ' →'}</button>`, true);
  },
  finalReport(cid) {
    const c = DATA.clients.find(x => x.id === cid);
    const st = this.stateFor(cid);
    const pct = Math.round(st.score / 10 * 100);
    const grade = pct >= 85 ? ['A', '#10b981', 'Klient predlžuje zmluvu a odporúča ťa ďalej. Toto je senior výkon.'] : pct >= 65 ? ['B', '#3b82f6', 'Spolupráca pokračuje — pár rozhodnutí by senior spravil inak.'] : pct >= 45 ? ['C', '#f59e0b', 'Klient zostáva, ale dôvera je naštrbená. Pozri si vysvetlenia udalostí.'] : ['D', '#ef4444', 'Klient odchádza. Prejdi si teóriu k udalostiam a skús projekt znova.'];
    if (!st.rewarded) { st.rewarded = true; App.save(); App.addXP(100 + st.score * 15, `Master projekt: ${c.name}`); }
    App.modal(`
      <div class="text-center mb-4">
        <div class="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl font-extrabold text-white mb-2" style="background:${grade[1]}">${grade[0]}</div>
        <h3 class="font-bold text-lg text-zinc-900 dark:text-white">${c.name} — záverečné hodnotenie</h3>
        <div class="text-sm text-zinc-500">${st.score}/10 bodov (${pct} %)</div>
        <p class="text-sm text-zinc-600 dark:text-zinc-400 mt-2">${grade[2]}</p>
      </div>
      <div class="space-y-1.5 mb-4 text-xs">
        ${st.log.map(l => { const e = DATA.masterEvents[l.ev]; return `<div class="rounded-xl border border-zinc-200 dark:border-zinc-800 p-2.5">
          <div class="flex gap-2"><span>${l.pts === 2 ? '✅' : l.pts === 1 ? '🟡' : '❌'}</span><span class="flex-1 text-zinc-700 dark:text-zinc-300">${e.txt}</span></div>
        </div>`; }).join('')}
      </div>
      <div class="grid grid-cols-2 gap-2">
        <button onclick="delete App.state.master['${cid}'];App.save();App.closeModal();Master.open('${cid}')" class="btn-press py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-sm font-semibold">↻ Skúsiť znova</button>
        <button onclick="App.closeModal();App.render()" class="btn-press py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold">Zavrieť</button>
      </div>`, true);
  },
};

/* ═══════════════ VIEW: AGENTÚRA ═══════════════ */
Views.agency = function () {
  const unlocked = Master.unlocked();
  const masterClients = DATA.clients.filter(c => c.master);
  const doneMaster = masterClients.filter(c => (App.state.master[c.id] || {}).done).length;
  return `
  <div class="rounded-2xl border-2 ${unlocked ? 'border-violet-500/40 bg-violet-500/5' : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#131316]'} p-5 mb-4">
    <div class="flex flex-wrap items-center gap-4">
      <div class="text-3xl">🏢</div>
      <div class="flex-1 min-w-[220px]">
        <h2 class="font-extrabold text-lg text-zinc-900 dark:text-white">Tvoja agentúra</h2>
        <p class="text-xs text-zinc-500">Roleplay rozhovory s klientmi sú dostupné hneď — trénuj komunikáciu. Master projekty (👑) sa odomknú dokončením všetkých modulov.</p>
      </div>
      <div class="text-right">
        <div class="text-xl font-extrabold text-violet-400">${doneMaster}/20</div>
        <div class="text-[10px] text-zinc-500">master projektov</div>
        <div class="text-xs mt-1 ${unlocked ? 'text-emerald-500 font-bold' : 'text-zinc-500'}">${unlocked ? '👑 Master Mode odomknutý' : '🔒 Master Mode zamknutý'}</div>
      </div>
    </div>
  </div>
  <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
    ${DATA.clients.map(c => {
      const mst = App.state.master[c.id];
      const persona = { friendly: '🙂 priateľský', skeptical: '🤨 skeptický', impatient: '⏱ netrpezlivý', analytical: '📊 analytický', chaotic: '🌪 chaotický' }[c.personality];
      return `<div class="card-hover rounded-2xl border ${mst?.done ? 'border-violet-500/40' : 'border-zinc-200 dark:border-zinc-800'} bg-white dark:bg-[#131316] p-4">
        <div class="flex items-start justify-between mb-1">
          <h3 class="font-bold text-sm text-zinc-900 dark:text-white">${c.master ? '👑 ' : ''}${c.name}</h3>
          <span class="text-[10px] text-zinc-500 shrink-0">${c.budget} €/m</span>
        </div>
        <div class="text-xs text-zinc-500 mb-2">${c.industry} · ${c.city} · ${persona}</div>
        <div class="text-[11px] text-zinc-600 dark:text-zinc-400 mb-3">${c.problems.map(p => '• ' + DATA.problemLib[p].txt).join('<br>')}</div>
        <div class="flex gap-2">
          <button onclick="Roleplay.start('${c.id}')" class="btn-press flex-1 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold">💬 Rozhovor</button>
          ${c.master ? `<button onclick="${Master.unlocked() ? `Master.open('${c.id}')` : `App.toast('🔒 Master Mode','Dokonči všetky 3 moduly','')`}" class="btn-press flex-1 py-1.5 rounded-lg text-[11px] font-semibold ${Master.unlocked() ? 'bg-violet-600 hover:bg-violet-500 text-white' : 'border border-zinc-300 dark:border-zinc-700 text-zinc-500'}">${mst?.done ? '📋 Hodnotenie' : '👑 Projekt'}</button>` : ''}
        </div>
      </div>`;
    }).join('')}
  </div>`;
};
</script>
