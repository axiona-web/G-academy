<script>
/* ═══════════════════════════════════════════════════════════════════
   DÁTA — MODUL 2: GOOGLE SEARCH CONSOLE (GSC)
   ═══════════════════════════════════════════════════════════════════ */
DATA.modules.push({
  id: 'gsc',
  name: 'Google Search Console',
  short: 'GSC',
  icon: 'search-check',
  color: '#3b82f6',
  desc: 'Indexácia, technické SEO, Core Web Vitals, analýza výkonnosti vo vyhľadávaní a profesionálne audity webov.',
  difficulty: 'Začiatočník → Medior',
  hours: 20,
  sections: [

  /* ── SEKCIA 1: ZÁKLADY ── */
  { id: 'gsc-s1', title: 'Základy a nastavenie', lessons: [

    { id: 'gsc-1-1', title: 'Čo je GSC, nastavenie a verifikácia', min: 20,
      theory: `<p><strong>Google Search Console</strong> je bezplatný nástroj, cez ktorý Google komunikuje s majiteľmi webov: ukazuje, ako web vidí vyhľadávač, aké má problémy a na aké dopyty sa zobrazuje. Je to <strong>jediný oficiálny zdroj dát o organickej výkonnosti</strong> — pre SEO špecialistu nástroj číslo jeden.</p>
<h3>Typy properties</h3>
<ul>
<li><strong>Domain property</strong> — pokrýva celú doménu vrátane subdomén a http/https variantov (<code>example.com</code>). Verifikuje sa <strong>len cez DNS záznam</strong>. Odporúčaný typ.</li>
<li><strong>URL-prefix property</strong> — len presný prefix (<code>https://www.example.com/</code>). Viac metód verifikácie: HTML súbor, meta tag, Google Analytics, Google Tag Manager, DNS.</li>
</ul>
<h3>Prvé kroky po verifikácii</h3>
<ol>
<li>Pridaj používateľov (klient = Owner, agentúra = Full user).</li>
<li>Odošli sitemap.</li>
<li>Prezri Page indexing report a Performance.</li>
<li>Skontroluj Manual actions a Security issues (dedičstvo minulosti!).</li>
</ol>
<div class="tip">Pri preberaní klienta vždy over históriu: predchádzajúce manual actions, staré disavow súbory, nevyriešené bezpečnostné problémy. GSC dáta sa uchovávajú 16 mesiacov — starší vývoj sa dozvieš len z exportov.</div>
<div class="warn">GSC nič „nezapína" — web sa indexuje aj bez neho. GSC je okno a komunikačný kanál, nie podmienka indexácie. Toto je častý omyl klientov.</div>`,
      checklist: ['Viem rozdiel medzi Domain a URL-prefix property', 'Zvládnem DNS verifikáciu', 'Poznám role používateľov (Owner/Full/Restricted)', 'Viem, čo skontrolovať ako prvé pri prevzatí webu'],
      quiz: [
        { q: 'Domain property sa verifikuje:', o: ['HTML súborom', 'Výhradne DNS záznamom', 'Meta tagom', 'Cez Google Ads'], c: 1, e: 'Domain property vyžaduje TXT záznam v DNS — pokrýva potom všetky subdomény a protokoly.' },
        { q: 'Web bez Search Console:', o: ['Nemôže byť indexovaný', 'Normálne sa indexuje — GSC je len nástroj na monitoring', 'Je penalizovaný', 'Nezobrazuje sa na mobile'], c: 1, e: 'Indexácia beží nezávisle. GSC dáva dáta a komunikačný kanál, nie je podmienkou.' },
        { q: 'Ako dlho GSC uchováva dáta o výkonnosti?', o: ['30 dní', '16 mesiacov', '5 rokov', 'Navždy'], c: 1, e: 'História Performance dát je 16 mesiacov — dlhodobé trendy treba pravidelne exportovať.' },
        { q: 'Property pokrývajúca subdomény aj oba protokoly je:', o: ['URL-prefix', 'Domain property', 'Search property', 'Global property'], c: 1, e: 'Domain property zahŕňa www aj bez www, http aj https, aj subdomény.' },
        { q: 'Prvá kontrola pri prevzatí cudzieho webu do správy:', o: ['Farby webu', 'Manual actions a Security issues', 'Počet obrázkov', 'Font'], c: 1, e: 'Zdedená penalizácia či hack zásadne menia priority — kontroluje sa to ako prvé.' },
      ] },

    { id: 'gsc-1-2', title: 'Ako funguje crawling a indexácia', min: 25,
      theory: `<p>Cesta stránky do výsledkov vyhľadávania má tri fázy — a na každej sa dá niečo pokaziť:</p>
<h3>1. Crawling (prehľadávanie)</h3>
<p><strong>Googlebot</strong> objavuje URL (z odkazov, sitemap, histórie) a sťahuje ich obsah. Množstvo prehľadaných stránok limituje <strong>crawl budget</strong> — pri malých weboch nehrá rolu, pri veľkých (e-shopy, 100k+ URL) je kľúčový. Googlebot dnes crawluje primárne ako <strong>mobilné zariadenie</strong> (mobile-first indexing).</p>
<h3>2. Rendering & Indexing (spracovanie a indexácia)</h3>
<p>Google stránku vyrenderuje (vrátane JavaScriptu — s oneskorením), pochopí obsah, vyhodnotí duplicity a kanonickú verziu, a rozhodne, či ju <strong>zaradí do indexu</strong>. Indexácia nie je nárok — Google indexuje selektívne podľa kvality.</p>
<h3>3. Serving (zobrazovanie)</h3>
<p>Pri dopyte algoritmus vyberá a radí stránky z indexu.</p>
<h3>Nástroj: URL Inspection</h3>
<p>Pre konkrétnu URL ukáže: je v indexe? kedy bola crawlnutá? akú kanonickú verziu Google zvolil? ako stránku vyrenderoval? Umožňuje <strong>Request indexing</strong> — zaradenie do prioritnej fronty (nie garancia!).</p>
<div class="warn">„Crawled — currently not indexed" neznamená chybu, ale rozhodnutie: Google stránku videl a nepovažuje ju (zatiaľ) za dosť hodnotnú. Rieši sa kvalitou obsahu a internými odkazmi, nie opakovaným klikaním na Request indexing.</div>
<div class="ex">Nová stránka /sluzby/tepovanie: 1) over v URL Inspection, 2) pridaj interné odkazy z relevantných stránok, 3) uisti sa, že je v sitemap, 4) Request indexing. O pár dní over stav znova.</div>`,
      checklist: ['Viem vysvetliť crawling → indexing → serving', 'Rozumiem crawl budgetu a kedy je relevantný', 'Viem použiť URL Inspection', 'Chápem, prečo indexácia nie je nároková'],
      quiz: [
        { q: 'Správne poradie fáz je:', o: ['Indexing → Crawling → Serving', 'Crawling → Indexing → Serving', 'Serving → Crawling → Indexing', 'Rendering → Crawling → Serving'], c: 1, e: 'Najprv Google stránku objaví a stiahne, potom spracuje a indexuje, nakoniec zobrazuje vo výsledkoch.' },
        { q: 'Mobile-first indexing znamená:', o: ['Mobilné weby sú penalizované', 'Google primárne crawluje a hodnotí mobilnú verziu webu', 'Indexujú sa len aplikácie', 'Desktop verzia neexistuje'], c: 1, e: 'Googlebot smartphone je primárny crawler — mobilná verzia obsahu je tá, ktorá sa počíta.' },
        { q: 'Crawl budget je kritická téma najmä pre:', o: ['Weby s 5 stránkami', 'Veľké weby so státisícami URL', 'Všetky weby rovnako', 'Len spravodajské weby'], c: 1, e: 'Malé weby Googlebot prehľadá bez problémov; pri veľkých treba budget šetriť (filtre, parametre, duplicity).' },
        { q: '„Request indexing" v URL Inspection:', o: ['Garantuje indexáciu do hodiny', 'Zaradí URL do prioritnej fronty bez garancie', 'Zvyšuje ranking', 'Odstráni stránku z indexu'], c: 1, e: 'Je to žiadosť, nie príkaz — Google stránku posúdi štandardným procesom.' },
        { q: '„Crawled — currently not indexed" najlepšie vyriešiš:', o: ['100× Request indexing', 'Zlepšením kvality obsahu a interným prelinkovaním', 'Zmenou domény', 'Sťažnosťou Googlu'], c: 1, e: 'Google stránku videl a „nezaujala ho" — pomôže hodnotnejší obsah a silnejšie interné signály.' },
      ] },

    { id: 'gsc-1-3', title: 'Sitemap.xml', min: 20,
      theory: `<p><strong>XML sitemap</strong> je zoznam URL, ktoré chceš dať Googlu do pozornosti. Pomáha objavovať obsah (najmä nový a hlboko zanorený), ale <strong>nezaručuje indexáciu</strong> a nie je ranking faktor.</p>
<h3>Pravidlá správnej sitemap</h3>
<ul>
<li>Obsahuje <strong>len indexovateľné, kanonické URL s kódom 200</strong> — žiadne redirecty, 404, noindex, duplicitné varianty.</li>
<li>Limit 50 000 URL / 50 MB na súbor — väčšie weby delia na viac sitemap + <strong>sitemap index</strong>.</li>
<li>Atribút <code>&lt;lastmod&gt;</code> udržiavaný pravdivo (Google ho používa; <code>priority</code> a <code>changefreq</code> ignoruje).</li>
<li>Odošli v GSC (Sitemaps report) + uveď v robots.txt (<code>Sitemap: https://…</code>).</li>
<li>Špeciálne typy: image, video, news sitemap; pri viacjazyčných weboch hreflang.</li>
</ul>
<h3>Sitemaps report v GSC</h3>
<p>Ukazuje stav spracovania (Success / Has errors / Couldn't fetch) a počet objavených URL. Kliknutím sa dá filtrovať Page indexing report len na URL zo sitemap — výborný trik na audit indexácie dôležitých stránok.</p>
<div class="tip">Pomer „URL v sitemap" vs. „z toho indexované" je jedna z najrýchlejších diagnostík zdravia webu. Ak máš v sitemap 10 000 URL a indexovaných 2 000, máš problém s kvalitou alebo technikou — a presne vieš, kde začať kopať.</div>
<div class="warn">CMS často generujú do sitemap odpad: tag pages, archívy autorov, parametre. Sitemap plná ne-kanonických URL mätie a plytvá crawl budgetom.</div>`,
      checklist: ['Sitemap obsahuje len kanonické 200 URL', 'Odoslaná v GSC a uvedená v robots.txt', 'lastmod sa aktualizuje pravdivo', 'Viem filtrovať indexačný report podľa sitemap'],
      quiz: [
        { q: 'XML sitemap:', o: ['Garantuje indexáciu všetkých URL', 'Pomáha objavovaniu URL, ale indexáciu negarantuje', 'Je ranking faktor', 'Je povinná pre indexáciu'], c: 1, e: 'Sitemap je odporúčanie pre crawler — o indexácii rozhoduje kvalita a ďalšie signály.' },
        { q: 'Limit jednej sitemap je:', o: ['500 URL', '50 000 URL / 50 MB', '1 000 000 URL', 'Bez limitu'], c: 1, e: 'Väčšie weby používajú viac súborov spojených sitemap indexom.' },
        { q: 'Ktorý atribút Google zo sitemap reálne používa?', o: ['priority', 'changefreq', 'lastmod', 'color'], c: 2, e: 'Google potvrdil, že lastmod používa (ak je dôveryhodný); priority a changefreq ignoruje.' },
        { q: 'Do sitemap NEPATRIA:', o: ['Kanonické produktové stránky', 'URL s redirectom, 404 a noindex', 'Hlavná stránka', 'Kategórie e-shopu'], c: 1, e: 'Sitemap má obsahovať len čisté indexovateľné URL — inak vysiela zmätočné signály.' },
        { q: 'V sitemap je 10 000 URL, indexovaných 2 000. Čo to signalizuje?', o: ['Všetko v poriadku', 'Pravdepodobný problém s kvalitou obsahu alebo technikou', 'Chybu Googlu', 'Priveľa spätných odkazov'], c: 1, e: 'Nízky pomer indexácie dôležitých URL = jasný signál na hĺbkovú diagnostiku (kvalita, duplicity, technické bloky).' },
      ] },

    { id: 'gsc-1-4', title: 'robots.txt a riadenie crawlingu', min: 25,
      theory: `<p><code>robots.txt</code> v koreni domény hovorí crawlerom, <strong>čo nesmú prehľadávať</strong>. Pozor na najdôležitejší koncept: <strong>robots.txt riadi crawling, nie indexáciu!</strong></p>
<h3>Syntax</h3>
<pre style="background:#71717a15;padding:.8em 1em;border-radius:10px;font-size:.85em;overflow:auto">User-agent: *
Disallow: /admin/
Disallow: /kosik
Allow: /admin/verejne.css
Sitemap: https://www.example.com/sitemap.xml</pre>
<ul>
<li><code>User-agent</code> — pre koho pravidlá platia (<code>*</code> = všetci, <code>Googlebot</code>…).</li>
<li><code>Disallow / Allow</code> — cesty; wildcards <code>*</code> a koniec reťazca <code>$</code>.</li>
<li>Špecifickejšie (dlhšie) pravidlo vyhráva.</li>
</ul>
<h3>Zásadné fakty</h3>
<ul>
<li>Zablokovaná URL sa <strong>môže indexovať aj tak</strong> (ak na ňu vedú odkazy) — zobrazí sa bez popisu. Na de-indexáciu slúži <code>noindex</code> meta tag — a stránka pritom <strong>nesmie byť blokovaná</strong> v robots.txt (inak Google noindex neuvidí!).</li>
<li>robots.txt nie je bezpečnostný nástroj — je verejne čitateľný.</li>
<li>Nikdy neblokuj CSS/JS potrebné na render.</li>
<li>Chyba 5xx pri načítaní robots.txt môže zastaviť crawling celého webu; 404 = žiadne obmedzenia.</li>
</ul>
<div class="warn">Klasická katastrofa: web sa spustí do produkcie s <code>Disallow: /</code> z testovacieho prostredia. Návštevnosť padá, „nikto nevie prečo". Kontrola robots.txt je krok č. 1 každého technického auditu.</div>
<div class="ex">E-shop chce z indexu dostať filtre (?farba=…): NEblokovať v robots.txt, ale nasadiť canonical/noindex — a až keď zmiznú z indexu, prípadne blokovať kvôli crawl budgetu.</div>`,
      checklist: ['Ovládam syntax robots.txt vrátane wildcards', 'Chápem rozdiel crawling vs. indexácia', 'Viem, prečo noindex nesmie byť kombinovaný s Disallow', 'Kontrolujem robots.txt pri každom audite'],
      quiz: [
        { q: 'robots.txt primárne riadi:', o: ['Indexáciu', 'Crawling (prehľadávanie)', 'Ranking', 'Rýchlosť webu'], c: 1, e: 'Robots.txt zakazuje sťahovanie URL crawlerom. Indexáciu riadi noindex/canonical.' },
        { q: 'URL blokovaná v robots.txt:', o: ['Nikdy sa neindexuje', 'Môže sa indexovať (bez obsahu), ak na ňu vedú odkazy', 'Automaticky dostane 404', 'Je penalizovaná'], c: 1, e: 'Google URL nesmie stiahnuť, ale o jej existencii vie — môže ju indexovať „naslepo".' },
        { q: 'Chceš stránku odstrániť z indexu. Správny postup:', o: ['Disallow v robots.txt', 'noindex meta tag a stránku NEblokovať v robots.txt', 'Zmazať sitemap', 'Zmeniť title'], c: 1, e: 'Google musí stránku crawlnúť, aby noindex videl. Blokovanie by de-indexácii zabránilo.' },
        { q: 'Čo spôsobí Disallow: / pre všetkých user-agentov na produkcii?', o: ['Nič', 'Zastavenie crawlingu celého webu a postupný prepad viditeľnosti', 'Zrýchlenie webu', 'Lepší ranking'], c: 1, e: 'Kompletný zákaz crawlingu je jedna z najničivejších technických chýb — klasika pri nasadení z testu.' },
        { q: 'Server vracia pre robots.txt chybu 503. Googlebot:', o: ['Ignoruje to', 'Môže dočasne prestať crawlovať celý web', 'Zmaže web z indexu okamžite', 'Prepne na Bing'], c: 1, e: '5xx pri robots.txt Google interpretuje opatrne — radšej crawling pozastaví, kým sa súbor nesprístupní.' },
      ] },
  ]},

  /* ── SEKCIA 2: INDEXÁCIA A POKRYTIE ── */
  { id: 'gsc-s2', title: 'Indexácia a pokrytie', lessons: [

    { id: 'gsc-2-1', title: 'Page indexing (Coverage) report', min: 30,
      theory: `<p>Report <strong>Pages (Page indexing)</strong> — historicky „Coverage" — je srdce GSC: ukazuje, ktoré URL sú indexované a prečo ostatné nie sú.</p>
<h3>Najčastejšie stavy a ich význam</h3>
<table>
<tr><th>Stav</th><th>Význam / typická akcia</th></tr>
<tr><td>Not found (404)</td><td>URL neexistuje — v poriadku, ak je to zámer; problém, ak na ňu vedú odkazy</td></tr>
<tr><td>Excluded by 'noindex' tag</td><td>zámerné vylúčenie — over, či je naozaj zámerné</td></tr>
<tr><td>Blocked by robots.txt</td><td>crawler nemá prístup — over zámer</td></tr>
<tr><td>Crawled — currently not indexed</td><td>Google videl, nezaradil → kvalita/duplicita</td></tr>
<tr><td>Discovered — currently not indexed</td><td>Google o URL vie, ešte necrawoval → crawl budget / priorita</td></tr>
<tr><td>Duplicate without user-selected canonical</td><td>duplicita bez tvojho canonicalu → doplň canonical</td></tr>
<tr><td>Duplicate, Google chose different canonical</td><td>Google ignoroval tvoj canonical → zjednoť signály</td></tr>
<tr><td>Page with redirect</td><td>URL presmerovaná — normálne pri migráciách</td></tr>
<tr><td>Soft 404</td><td>stránka „vyzerá prázdno" → samostatná lekcia</td></tr>
</table>
<h3>Ako s reportom pracovať</h3>
<ol>
<li>Neriešiť absolútne čísla, ale <strong>trendy</strong> (skok neindexovaných po nasadení novej verzie = alarm).</li>
<li>Filtrovať na „All submitted pages" (zo sitemap) — dôležité URL vs. celý šum.</li>
<li>Každý stav → vzorka URL → over v URL Inspection → urči príčinu → oprav → <strong>Validate fix</strong>.</li>
</ol>
<div class="tip">Nie každá neindexovaná URL je problém! Web má bežne tisíce legitímne vylúčených URL (parametre, archívy, redirecty). Panika z „vysokého počtu vylúčených" je znak amatéra — profesionál sa pýta: „Sú indexované všetky stránky, ktoré indexované byť majú?"</div>`,
      checklist: ['Rozumiem významu 8+ stavov reportu', 'Sledujem trendy, nie absolútne čísla', 'Používam filter na submitted pages', 'Ovládam cyklus: diagnóza → oprava → Validate fix'],
      quiz: [
        { q: 'Rozdiel medzi „Crawled" a „Discovered" (currently not indexed):', o: ['Žiadny', 'Crawled = stiahnutá ale nezaradená; Discovered = Google o nej vie, ešte ju nestiahol', 'Discovered je horší stav', 'Crawled znamená indexovaná'], c: 1, e: 'Discovered signalizuje skôr crawl prioritu/budget; Crawled signalizuje skôr posúdenie kvality.' },
        { q: '„Duplicate, Google chose different canonical" znamená:', o: ['Chýba canonical tag', 'Google sa rozhodol ignorovať tvoj canonical a vybral inú URL', 'Stránka je 404', 'Stránka je penalizovaná'], c: 1, e: 'Canonical je len hint. Ak ostatné signály (odkazy, sitemap, obsah) ukazujú inam, Google si vyberie sám.' },
        { q: 'Veľký počet vylúčených URL v reporte je:', o: ['Vždy katastrofa', 'Často normálny — kľúčové je, či sú indexované dôležité stránky', 'Dôvod na zmenu domény', 'Znak penalizácie'], c: 1, e: 'Redirecty, parametre a zámerné noindexy sú legitímne vylúčenia. Hodnotí sa pokrytie dôležitých URL.' },
        { q: 'Po oprave chyby v reporte klikneš na:', o: ['Delete report', 'Validate fix', 'Request budget', 'Disavow'], c: 1, e: 'Validate fix spustí overovací proces — Google postupne pre-crawluje dotknuté URL a stav aktualizuje.' },
        { q: 'Náhly skok neindexovaných stránok deň po nasadení novej verzie webu naznačuje:', o: ['Sezónnosť', 'Technickú regresiu v novej verzii (noindex, robots, canonicaly…)', 'Konkurencia zaútočila', 'Normálny jav'], c: 1, e: 'Korelácia s releasom = hľadaj chybu v deploy: zabudnutý noindex z testu, rozbité canonicaly, zmena URL štruktúry.' },
      ] },

    { id: 'gsc-2-2', title: 'Canonical URL', min: 25,
      theory: `<p><strong>Canonical</strong> označuje preferovanú verziu stránky pri duplicitnom/podobnom obsahu. Duplicity vznikajú všade: http/https, www/bez-www, trailing slash, parametre (?utm, ?sort), tlačové verzie, varianty produktov.</p>
<h3>Ako Google kanonizuje</h3>
<p>Canonical tag (<code>&lt;link rel="canonical" href="…"&gt;</code>) je <strong>silný hint, nie príkaz</strong>. Google kombinuje signály: canonical tag, redirecty, interné odkazy, sitemap, externé odkazy, https preferenciu, kvalitu obsahu. Výsledok vidíš v URL Inspection: „User-declared canonical" vs. „Google-selected canonical".</p>
<h3>Best practices</h3>
<ul>
<li>Každá stránka má <strong>self-referencing canonical</strong> (odkazuje sama na seba) — základná hygiena.</li>
<li>Absolútne URL, jeden canonical na stránke, konzistentný s internými odkazmi a sitemap.</li>
<li>Canonical ≠ redirect: canonical necháva obe verzie dostupné pre používateľa; redirect fyzicky presmeruje.</li>
<li>Nikdy canonical na 404, redirect či noindex stránku.</li>
</ul>
<div class="warn">Najčastejší fail: celý web s canonicalmi na homepage (chyba šablóny). Google potom „zloží" všetky stránky do jednej. Druhý klasický fail: canonical na http verziu po prechode na https.</div>
<div class="ex">E-shop: /topanky?sort=cena&size=42 → canonical na /topanky. Parametrické varianty sa zlúčia a autorita sa nekúskuje. Ale pozor: farebné varianty s vlastným dopytom („čierne nike air") si môžu zaslúžiť vlastnú kanonickú stránku.</div>`,
      checklist: ['Viem, kde vznikajú duplicity', 'Chápem hint vs. príkaz a Google-selected canonical', 'Self-referencing canonical na celom webe', 'Canonical konzistentný so sitemap a internými odkazmi'],
      quiz: [
        { q: 'Canonical tag je pre Google:', o: ['Záväzný príkaz', 'Silný hint, ktorý môže prehlasovať inými signálmi', 'Ranking faktor', 'Zastaraná technika'], c: 1, e: 'Google canonical rešpektuje, len ak je konzistentný s ostatnými signálmi (odkazy, sitemap, redirecty).' },
        { q: 'Self-referencing canonical znamená:', o: ['Canonical na homepage', 'Stránka odkazuje canonicalom sama na seba', 'Canonical na konkurenciu', 'Chybu'], c: 1, e: 'Štandardná hygiena — každá kanonická stránka deklaruje samu seba, čím neutralizuje parametre a varianty.' },
        { q: 'Rozdiel canonical vs. 301 redirect:', o: ['Žiadny', 'Canonical necháva obe URL dostupné; redirect používateľa fyzicky presmeruje', 'Redirect je hint', 'Canonical je rýchlejší'], c: 1, e: 'Canonical rieši signály pre vyhľadávač pri zachovaní oboch verzií; redirect verziu odstraňuje z používania.' },
        { q: 'Chyba šablóny dala všetkým stránkam canonical na homepage. Dôsledok:', o: ['Nič sa nestane', 'Google môže z indexu postupne vyradiť podstránky', 'Web sa zrýchli', 'Homepage dostane penalizáciu'], c: 1, e: 'Masívne nesprávne canonicaly vedú k de-indexácii obsahu — kritická chyba s veľkým dopadom.' },
        { q: 'Kde overíš, akú kanonickú URL si Google reálne vybral?', o: ['V robots.txt', 'V URL Inspection (Google-selected canonical)', 'V Google Ads', 'Nedá sa overiť'], c: 1, e: 'URL Inspection zobrazuje deklarovaný aj Googlom zvolený canonical — nezhoda = signály treba zjednotiť.' },
      ] },

    { id: 'gsc-2-3', title: 'Redirecty (301, 302, migrácie)', min: 25,
      theory: `<p>Redirect presmeruje používateľa aj crawler na inú URL. Pre SEO je kľúčové vybrať správny typ a nerozbiť reťazce.</p>
<h3>Typy redirectov</h3>
<ul>
<li><strong>301 Moved Permanently</strong> — trvalé; prenáša ranking signály na cieľ. Štandard pri zmene URL.</li>
<li><strong>302 Found / 307</strong> — dočasné; signály zostávajú na pôvodnej URL. Použi pri krátkodobých presunoch. (Dlhodobé 302 Google časom „prekvalifikuje" na 301, ale nespoliehaj sa.)</li>
<li><strong>308</strong> — trvalý ekvivalent 307 (zachováva HTTP metódu).</li>
<li><strong>Meta refresh / JS redirect</strong> — núdzové riešenia, pomalšie a menej spoľahlivé.</li>
</ul>
<h3>Pravidlá praxe</h3>
<ul>
<li><strong>Reťazce a slučky:</strong> max 1 skok (A→C, nie A→B→C). Googlebot nasleduje max ~10 skokov, každý skok riedi signály a spomaľuje.</li>
<li><strong>Redirect na relevantný ekvivalent</strong>, nie plošne na homepage — masové redirecty na homepage Google vyhodnocuje ako soft 404!</li>
<li><strong>Migrácia webu:</strong> kompletná mapa starých → nových URL, 1:1 redirecty, aktualizácia sitemap, interných odkazov a canonicalov, monitoring v GSC (Crawl stats, 404, indexácia) minimálne 3–6 mesiacov. Redirecty drž aspoň rok.</li>
</ul>
<div class="warn">Najdrahšia SEO chyba vôbec: redesign/migrácia bez redirect mapy. Stovky 404, strata odkazového profilu, prepad návštevnosti o desiatky percent. Ak ti klient povie „meníme web", prvá otázka znie: „Kde je redirect mapa?"</div>`,
      checklist: ['Viem kedy 301 vs. 302', 'Kontrolujem reťazce (max 1 skok)', 'Redirectujem na relevantné ekvivalenty', 'Ovládam checklist migrácie webu'],
      quiz: [
        { q: 'Pri trvalej zmene URL použiješ:', o: ['302', '301', 'Meta refresh', '404'], c: 1, e: '301 signalizuje trvalý presun a prenáša signály na novú URL.' },
        { q: 'Reťazec A→B→C→D je problém, lebo:', o: ['Nie je problém', 'Každý skok riedi signály, spomaľuje a Googlebot má limit skokov', 'Je nelegálny', 'Funguje len v Chrome'], c: 1, e: 'Reťazce treba narovnať na priamy skok A→D — efektivita aj prenos signálov.' },
        { q: 'Masový redirect všetkých zrušených produktov na homepage Google typicky vyhodnotí ako:', o: ['Správne riešenie', 'Soft 404', 'Penalizáciu', 'Duplicitu'], c: 1, e: 'Irelevantný cieľ redirectu = soft 404. Presmerúvaj na najbližší relevantný ekvivalent (kategóriu, náhradu).' },
        { q: 'Pri migrácii webu je kľúčový dokument:', o: ['Nové logo', 'Mapa starých → nových URL s 1:1 redirectmi', 'Tlačová správa', 'Zoznam zamestnancov'], c: 1, e: 'Redirect mapa je základ zachovania rankingu — bez nej sa autorita stratí v 404.' },
        { q: '302 redirect signály:', o: ['Prenáša okamžite na cieľ', 'Ponecháva na pôvodnej URL (dočasný presun)', 'Maže', 'Zdvojnásobuje'], c: 1, e: '302 = dočasné — Google predpokladá návrat pôvodnej URL a signály na ňu viaže ďalej.' },
      ] },

    { id: 'gsc-2-4', title: '404 a Soft 404', min: 20,
      theory: `<h3>404 Not Found</h3>
<p>Stránka neexistuje. <strong>404 samotná nie je penalizácia</strong> — je to normálna súčasť webu. Problém je, keď: 404 vracia URL, na ktorú vedú <strong>interné odkazy</strong> (zlá UX + plytvanie crawlingom), URL s <strong>externými odkazmi</strong> (strácaš autoritu → redirect na ekvivalent), alebo bývalá výkonná stránka.</p>
<h3>Soft 404</h3>
<p>Server vracia <strong>200 OK</strong>, ale obsah hovorí „nič tu nie je": prázdne kategórie e-shopu, „0 výsledkov", stránky s minimálnym obsahom, chybové hlášky s kódom 200, irelevantné redirecty na homepage. Google ich zaradí ako soft 404 a neindexuje.</p>
<h3>Riešenia soft 404</h3>
<ol>
<li>Stránka má existovať → <strong>doplň skutočný obsah</strong>.</li>
<li>Stránka nemá existovať → vracaj <strong>skutočnú 404/410</strong> (410 Gone = „odstránené natrvalo", o niečo rýchlejšia de-indexácia).</li>
<li>Existuje náhrada → <strong>301 na relevantný ekvivalent</strong>.</li>
</ol>
<h3>Dobrá 404 stránka</h3>
<p>Vracia skutočný kód 404, vysvetlí situáciu, ponúkne vyhľadávanie, odkazy na kategórie a CTA — mení stratenú návštevu na príležitosť.</p>
<div class="tip">Pravidelne kontroluj 404 s externými odkazmi (Ahrefs/Semrush „best by links" + filter 404) — redirect takejto URL na ekvivalent je najlacnejší linkbuilding na svete: autorita, ktorú už máš, len ju strácaš.</div>`,
      checklist: ['Viem, kedy je 404 OK a kedy problém', 'Rozpoznám príčiny soft 404', 'Poznám 3 riešenia soft 404', '404 stránka webu je užitočná a vracia správny kód'],
      quiz: [
        { q: 'Existencia 404 stránok na webe:', o: ['Vždy znižuje ranking celého webu', 'Je normálna; problém sú 404 s odkazmi alebo bývalou návštevnosťou', 'Vedie k manual action', 'Blokuje crawling'], c: 1, e: '404 je prirodzená. Riešiš tie, kam vedú odkazy, alebo ktoré mali hodnotu.' },
        { q: 'Soft 404 je stránka, ktorá:', o: ['Vracia kód 404', 'Vracia 200, ale obsahovo je prázdna/bezcenná', 'Má mäkký dizajn', 'Načítava sa pomaly'], c: 1, e: 'Kód hovorí OK, obsah hovorí „nič" — Google to klasifikuje ako soft 404 a neindexuje.' },
        { q: 'Prázdna kategória e-shopu („0 produktov") s kódom 200 skončí ako:', o: ['Featured snippet', 'Soft 404', 'Rich result', 'Canonical'], c: 1, e: 'Typický zdroj soft 404 — riešením je skryť/naplniť kategóriu alebo vracať 404.' },
        { q: 'Kód 410 znamená:', o: ['Presmerované', 'Odstránené natrvalo (Gone)', 'Server preťažený', 'Vyžaduje sa platba'], c: 1, e: '410 explicitne hovorí „zmazané navždy" — Google de-indexuje o niečo rýchlejšie než pri 404.' },
        { q: 'Zrušený produkt s kvalitnými externými odkazmi najlepšie ošetríš:', o: ['Necháš 404', '301 na najbližší relevantný ekvivalent', 'Redirect na homepage', 'Zablokuješ v robots.txt'], c: 1, e: 'Redirect na ekvivalent zachová autoritu odkazov. Homepage by bol soft 404, 404 by autoritu zahodila.' },
      ] },

    { id: 'gsc-2-5', title: 'Structured Data a Rich Results', min: 25,
      theory: `<p><strong>Štruktúrované dáta</strong> (schema.org, formát <strong>JSON-LD</strong>) pomáhajú Googlu pochopiť význam obsahu a odomykajú <strong>rich results</strong> — obohatené výsledky s hviezdičkami, cenami, FAQ, drobčekmi navigácie…</p>
<h3>Najužitočnejšie typy schém</h3>
<ul>
<li><strong>Product</strong> + Offer + AggregateRating — cena, dostupnosť, hodnotenie (e-shopy).</li>
<li><strong>LocalBusiness</strong> — lokálne firmy (prepojenie s GBP!).</li>
<li><strong>Article / NewsArticle</strong>, <strong>Recipe</strong>, <strong>Event</strong>, <strong>JobPosting</strong>, <strong>FAQPage</strong> (obmedzené zobrazovanie), <strong>BreadcrumbList</strong>, <strong>Organization</strong>, <strong>VideoObject</strong>.</li>
</ul>
<h3>Pravidlá</h3>
<ul>
<li>Markup musí zodpovedať <strong>viditeľnému obsahu</strong> — značkovanie neexistujúcich recenzií je porušenie s rizikom manual action.</li>
<li>Rich result nie je nárok — schema je vstupenka do lotérie, nie garancia.</li>
<li>Priamy ranking benefit schema nemá; benefit je CTR (výraznejší výsledok) a strojové pochopenie.</li>
</ul>
<h3>Nástroje</h3>
<ul>
<li><strong>Rich Results Test</strong> — validácia konkrétnej URL/kódu.</li>
<li><strong>Schema Markup Validator</strong> — čistá schema validácia.</li>
<li><strong>GSC → Enhancements reporty</strong> — chyby a warningy naprieč webom (Products, FAQ, Breadcrumbs…) + Validate fix.</li>
</ul>
<div class="ex">Produkt so schémou: vo výsledkoch sa zobrazí „★4,8 (124) · Skladom · 49,90 €" — výsledok zaberá viac miesta a CTR bežne rastie o desiatky percent oproti holému modrému odkazu.</div>
<div class="warn">Warning v GSC (napr. chýbajúce odporúčané pole) nebráni rich resultu — Error áno. Prioritizuj errors, warningy rieš postupne.</div>`,
      checklist: ['Rozumiem JSON-LD a schema.org', 'Viem vybrať vhodné typy schém pre daný web', 'Validujem cez Rich Results Test', 'Sledujem Enhancements reporty v GSC'],
      quiz: [
        { q: 'Odporúčaný formát štruktúrovaných dát je:', o: ['XML', 'JSON-LD', 'CSV', 'YAML'], c: 1, e: 'Google odporúča JSON-LD v <script> tagu — oddelený od HTML, ľahko spravovateľný.' },
        { q: 'Správna implementácia schema markup:', o: ['Garantuje rich result', 'Robí stránku oprávnenou — zobrazenie rozhoduje Google', 'Zvyšuje priamo ranking', 'Je povinná'], c: 1, e: 'Schema je podmienka účasti, nie garancia zobrazenia rich resultu.' },
        { q: 'Označenie hodnotenia 4,9★, ktoré na stránke reálne nie je:', o: ['Šikovný trik', 'Porušenie pravidiel s rizikom manual action', 'Odporúčanie Googlu', 'Neutrálne'], c: 1, e: 'Markup musí zodpovedať viditeľnému obsahu — spamové štruktúrované dáta majú vlastnú manual action.' },
        { q: 'Hlavný merateľný prínos rich results je:', o: ['Nižší bounce rate', 'Vyššie CTR vo výsledkoch vyhľadávania', 'Rýchlejší server', 'Viac stránok v indexe'], c: 1, e: 'Obohatený výsledok je nápadnejší a zaberá viac miesta — kliká naň viac ľudí.' },
        { q: 'Error vs. Warning v Enhancements reporte:', o: ['Sú to synonymá', 'Error bráni rich resultu, warning nie', 'Warning je horší', 'Oba blokujú indexáciu'], c: 1, e: 'Chyby robia markup neplatným pre rich results; warningy sú len odporúčania na doplnenie.' },
      ] },
  ]},

  /* ── SEKCIA 3: VÝKONNOSŤ ── */
  { id: 'gsc-s3', title: 'Analýza výkonnosti', lessons: [

    { id: 'gsc-3-1', title: 'Performance report: kliky, impresie, dimenzie', min: 30,
      theory: `<p><strong>Performance</strong> je najpoužívanejší report GSC — jediné miesto so skutočnými dátami o dopytoch, na ktoré sa web zobrazuje.</p>
<h3>Štyri metriky</h3>
<ul>
<li><strong>Impressions</strong> — koľkokrát sa výsledok zobrazil (počíta sa aj bez scrollnutia k nemu, pri zobrazení danej stránky výsledkov).</li>
<li><strong>Clicks</strong> — kliknutia na výsledok.</li>
<li><strong>CTR</strong> = kliky / impresie.</li>
<li><strong>Average position</strong> — priemerná pozícia (priemer najvyšších pozícií pri každej impresii).</li>
</ul>
<h3>Dimenzie a filtre</h3>
<p>Queries (dopyty), Pages (URL), Countries, Devices, Search appearance (rich results…), Dates. Filtre: presná zhoda, obsahuje, regex (!), porovnávanie období. Search type: Web / Image / Video / News.</p>
<h3>Kľúčové úskalia interpretácie</h3>
<ul>
<li><strong>Anonymizované dopyty</strong> — časť dopytov (zriedkavé/osobné) sa nezobrazuje; súčet dopytov ≠ total.</li>
<li>Pri kombinácii dimenzií (query+page) sa dáta ďalej orezávajú.</li>
<li>16 mesiacov histórie; porovnávaj rovnaké obdobia (sezónnosť).</li>
<li>Priemerná pozícia je priemer — vstup na nový dopyt na pozícii 50 „zhorší" priemer, hoci je to dobrá správa. Vždy analyzuj spolu s impresiami.</li>
</ul>
<div class="tip">Regex filter je superschopnosť: <code>^(ako|čo|prečo|kedy)</code> vyfiltruje otázkové dopyty (content nápady), filter na brand vs. non-brand oddelí značkovú návštevnosť. Nauč sa 5 základných regex vzorov a si míľu pred konkurenciou.</div>`,
      checklist: ['Rozumiem definíciám 4 metrík', 'Viem filtrovať cez regex', 'Oddeľujem brand vs. non-brand dopyty', 'Poznám limity dát (anonymizácia, 16 mesiacov)'],
      quiz: [
        { q: 'CTR sa počíta ako:', o: ['Impresie / kliky', 'Kliky / impresie', 'Kliky × pozícia', 'Impresie − kliky'], c: 1, e: 'Click-through rate = podiel klikov na počte zobrazení.' },
        { q: 'Priemerná pozícia sa náhle zhoršila zo 4 na 9, impresie vzrástli 3×. Najpravdepodobnejšie:', o: ['Web dostal penalizáciu', 'Web sa začal zobrazovať na množstvo nových dopytov na nižších pozíciách', 'Konkurencia zaplatila Googlu', 'Chyba v GSC'], c: 1, e: 'Nové dopyty vstupujú na nízkych pozíciách a ťahajú priemer dole — v skutočnosti viditeľnosť rastie.' },
        { q: 'Súčet klikov cez všetky dopyty je menší než total, lebo:', o: ['GSC klame', 'Časť dopytov je anonymizovaná', 'Kliky sa počítajú dvakrát', 'Total zahŕňa Ads'], c: 1, e: 'Zriedkavé a citlivé dopyty Google skrýva — v tabuľke chýbajú, v totále sú.' },
        { q: 'Na vyfiltrovanie otázkových dopytov použiješ:', o: ['Presnú zhodu', 'Regex filter (napr. ^(ako|prečo|čo))', 'Filter krajiny', 'Search appearance'], c: 1, e: 'Regex umožňuje vzorce — otázkové slová na začiatku dopytu sú klasika pre content plán.' },
        { q: 'Impresia sa započíta:', o: ['Len ak používateľ výsledok reálne videl na obrazovke', 'Pri zobrazení stránky výsledkov, kde sa výsledok nachádza', 'Len pri kliknutí', 'Len na desktope'], c: 1, e: 'Impresia nevyžaduje, aby k výsledku používateľ doscrolloval (platí pre klasické výsledky).' },
      ] },

    { id: 'gsc-3-2', title: 'CTR optimalizácia', min: 25,
      theory: `<p>Zvýšiť CTR znamená získať <strong>viac klikov z existujúcich pozícií</strong> — najrýchlejšie SEO víťazstvo, bez čakania na rast rankingu.</p>
<h3>Proces: nájdi podvýkonné stránky</h3>
<ol>
<li>Performance → Pages, filter: pozícia &lt; 10, zoradiť podľa impresií.</li>
<li>Porovnaj CTR s očakávaným benchmarkom pre danú pozíciu (orientačne: #1 ~25–30 %, #3 ~10 %, #5 ~6 %, #10 ~2 %).</li>
<li>Stránky s vysokými impresiami a CTR pod benchmarkom = zoznam na prepis title/description.</li>
</ol>
<h3>Čo zvyšuje CTR</h3>
<ul>
<li><strong>Title</strong>: dopyt na začiatku, benefit, čísla, rok, brand na konci („10 tipov na… (2026) | Firma"). Pozor: Google title bežne prepisuje — drž sa ~50–60 znakov a relevancie k dopytu.</li>
<li><strong>Meta description</strong> — nie je ranking faktor, ale je to „reklamný text zadarmo": CTA, benefit, ~150–160 znakov.</li>
<li><strong>Rich results</strong> (schema), <strong>favicon</strong>, priateľská URL, aktuálny dátum pri článkoch.</li>
</ul>
<h3>Meranie</h3>
<p>Zapíš dátum zmeny (anotácie!), porovnaj CTR rovnakých dopytov 4 týždne pred/po. Pozor na zmeny SERP layoutu (nové ads, AI Overviews) — ovplyvňujú CTR bez ohľadu na tvoje úpravy.</p>
<div class="ex">Stránka „poistenie psa": pozícia 4, impresie 12 000/mes., CTR 1,8 % (benchmark ~8 %). Nový title „Poistenie psa od 5 €/mes. — porovnanie 2026" + description s CTA → CTR 5,9 % = +490 klikov mesačne bez zmeny pozície.</div>`,
      checklist: ['Viem nájsť stránky s podpriemerným CTR', 'Poznám orientačné CTR benchmarky podľa pozície', 'Píšem title s dopytom a benefitom', 'Meriam dopad zmien pred/po'],
      quiz: [
        { q: 'CTR optimalizácia je atraktívna, lebo:', o: ['Zlepšuje Core Web Vitals', 'Prináša kliky z existujúcich pozícií — rýchlo a lacno', 'Zvyšuje počet stránok', 'Znižuje CPC'], c: 1, e: 'Nemusíš čakať na rast rankingu — vyťažíš viac z pozícií, ktoré už máš.' },
        { q: 'Kandidát na CTR optimalizáciu je stránka s:', o: ['Nízkymi impresiami a pozíciou 90', 'Vysokými impresiami, pozíciou v top 10 a CTR pod benchmarkom', 'Nulovými impresiami', 'CTR 30 %'], c: 1, e: 'Vysoká viditeľnosť + slabé kliky = najväčší potenciál zisku z prepísania snippetu.' },
        { q: 'Meta description:', o: ['Je priamy ranking faktor', 'Neovplyvňuje ranking, ale ovplyvňuje CTR', 'Je povinná pre indexáciu', 'Má limit 20 znakov'], c: 1, e: 'Description je „inzerát" vo výsledkoch — na poradie nevplýva, na klikanosť áno.' },
        { q: 'Google zobrazený title:', o: ['Vždy presne kopíruje tvoj title tag', 'Môže prepísať podľa dopytu a obsahu stránky', 'Generuje náhodne', 'Berie z meta keywords'], c: 1, e: 'Google title bežne upravuje — kvalitný, relevantný title tag znižuje pravdepodobnosť prepisu.' },
        { q: 'Orientačné CTR pre pozíciu #1 v organiku je:', o: ['~2 %', '~25–30 %', '~80 %', '~50 %'], c: 1, e: 'Prvá pozícia berie zhruba štvrtinu až tretinu klikov (líši sa podľa SERP prvkov).' },
      ] },

    { id: 'gsc-3-3', title: 'Analýza dopytov a Average Position', min: 25,
      theory: `<p>Dopyty (queries) sú surovina pre content aj biznis stratégiu. Tri najvýnosnejšie analýzy:</p>
<h3>1. Striking distance (pozície 5–20)</h3>
<p>Dopyty, kde si „na dostrel" prvej trojky. Filter: pozícia 5–20, zoradiť podľa impresií. Akcia: posilni stránku (rozšír obsah o subtémy, interné odkazy z autoritatívnych stránok, aktualizuj) → posun o 2–3 pozície tu znamená násobky návštevnosti.</p>
<h3>2. Kanibalizácia</h3>
<p>Viac stránok webu súťaží o rovnaký dopyt — striedajú sa v SERP, delia si CTR a signály. Diagnóza: filter na dopyt → záložka Pages ukáže viac URL s impresiami. Riešenie: zlúčiť obsah (301), rozlíšiť intent stránok, upraviť interné odkazy a canonicaly.</p>
<h3>3. Content gap podľa intentu</h3>
<p>Dopyty s impresiami, na ktoré nemáš venovanú stránku (odpovedá „nesprávna" URL) = nápady na nový obsah s overeným dopytom. Klasifikuj podľa intentu: informačný (blog), transakčný (produkt/služba), navigačný (brand).</p>
<div class="tip">Exportuj dopyty do tabuľky mesačne a označuj si: brand/non-brand, intent, cieľovú URL. Po pol roku máš dátovú mapu témy, akú konkurencia nemá — a content plán sa píše sám.</div>
<div class="warn">Average position per web je takmer bezcenná metrika (mix všetkých dopytov). Pracuj s pozíciou per dopyt alebo per stránka — a vždy spolu s impresiami.</div>`,
      checklist: ['Viem vyfiltrovať striking distance dopyty', 'Odhalím kanibalizáciu cez query→pages', 'Klasifikujem dopyty podľa intentu', 'Mesačný export dopytov do vlastnej databázy'],
      quiz: [
        { q: 'Striking distance dopyty sú tie na pozíciách:', o: ['1–3', 'zhruba 5–20', '50–100', 'Bez impresií'], c: 1, e: 'Blízko vrcholu, ale mimo top klikov — malé zlepšenie prináša veľký nárast návštevnosti.' },
        { q: 'Kanibalizáciu dopytu odhalíš tak, že:', o: ['Pozrieš robots.txt', 'Vyfiltruješ dopyt a v záložke Pages vidíš viac URL s impresiami', 'Spustíš PageSpeed test', 'Skontroluješ sitemap'], c: 1, e: 'Viac vlastných stránok zobrazovaných na jeden dopyt = deľba signálov a nestabilné pozície.' },
        { q: 'Bežné riešenie kanibalizácie dvoch podobných článkov je:', o: ['Zmazať oba', 'Zlúčiť do jedného + 301 redirect slabšieho', 'Pridať tretí článok', 'Ignorovať'], c: 1, e: 'Konsolidácia spája signály do jednej silnej stránky — typicky nasleduje rast pozícií.' },
        { q: 'Dopyt „kúpiť bežecké topánky" má intent:', o: ['Informačný', 'Transakčný', 'Navigačný', 'Lokálny'], c: 1, e: '„Kúpiť" signalizuje nákupný zámer — patrí na produktovú/kategóriovú stránku, nie na blog.' },
        { q: 'Priemerná pozícia celého webu je:', o: ['Najdôležitejšia SEO metrika', 'Málo užitočná — zmysel má pozícia per dopyt/stránka', 'Ranking faktor', 'Vždy rastúca'], c: 1, e: 'Mix stoviek dopytov v jednom čísle nič nehovorí — analyzuj granulárne.' },
      ] },

    { id: 'gsc-3-4', title: 'Interné a externé odkazy (Links report)', min: 20,
      theory: `<p>Report <strong>Links</strong> ukazuje odkazový profil webu očami Googlu.</p>
<h3>External links (spätné odkazy)</h3>
<ul>
<li><strong>Top linked pages</strong> — najodkazovanejšie stránky webu.</li>
<li><strong>Top linking sites</strong> — domény, ktoré odkazujú.</li>
<li><strong>Top linking text</strong> — anchor texty.</li>
</ul>
<p>Použitie: nájdi stránky s autoritou (a interne z nich odkazuj na dôležité stránky), odhaľ stratené hodnoty (odkazované 404!), skontroluj anchor profil. GSC ukazuje vzorku — na hĺbkovú analýzu slúžia Ahrefs/Majestic, ale GSC je zadarmo a „od zdroja".</p>
<h3>Internal links</h3>
<p>Počet interných odkazov per stránka ~ ako dôležito stránku vidí Google v rámci webu. Dôležité biznis stránky s 2 internými odkazmi = problém architektúry. <strong>Interné prelinkovanie je najpodceňovanejšia SEO páka:</strong> je zadarmo, máš ju plne pod kontrolou a funguje.</p>
<h3>Disavow</h3>
<p>Nástroj na „zrieknutie sa" toxických odkazov. Dnes potrebný len pri manual action za neprirodzené odkazy alebo po jasnej negatívnej SEO atake — Google tvrdí, že bežný spam ignoruje. Nepoužívaj preventívne bez dôvodu.</p>
<div class="ex">Klientov blogový článok má 40 spätných odkazov, ale 0 interných odkazov na produktovú stránku. Pridaním kontextového odkazu z článku na produkt prelieváš autoritu presne tam, kde zarába.</div>`,
      checklist: ['Viem čítať 3 pohľady external links', 'Kontrolujem odkazované 404', 'Auditujem interné odkazy dôležitých stránok', 'Viem, kedy (ne)použiť disavow'],
      quiz: [
        { q: 'Top linked pages report ukazuje:', o: ['Najnavštevovanejšie stránky', 'Stránky s najväčším počtom spätných odkazov', 'Najrýchlejšie stránky', 'Stránky s chybami'], c: 1, e: 'Ukazuje, kam smeruje externá autorita — tieto stránky sú ideálne zdroje interných odkazov.' },
        { q: 'Dôležitá produktová stránka má podľa reportu 2 interné odkazy. Správna akcia:', o: ['Nič', 'Doplniť kontextové interné odkazy z relevantných stránok', 'Zmazať stránku', 'Kúpiť spätné odkazy'], c: 1, e: 'Málo interných odkazov = slabý signál dôležitosti. Interné prelinkovanie máš plne vo svojich rukách.' },
        { q: 'Disavow tool by si mal použiť:', o: ['Každý mesiac preventívne', 'Pri manual action za odkazy alebo jasnej negatívnej SEO ataky', 'Pri každom spamovom odkaze', 'Nikdy neexistoval'], c: 1, e: 'Google bežný odkazový spam ignoruje — disavow je pre výnimočné situácie.' },
        { q: 'Anchor text je:', o: ['Kód stránky', 'Klikateľný text odkazu', 'Meta tag', 'Obrázok'], c: 1, e: 'Text, cez ktorý odkaz vedie — pomáha Googlu pochopiť tému cieľovej stránky.' },
        { q: 'Odkazovaná stránka, ktorá teraz vracia 404:', o: ['Nie je problém', 'Stráca autoritu odkazov — rieš redirectom na ekvivalent', 'Zvyšuje ranking', 'Musí sa nahlásiť Googlu'], c: 1, e: 'Autorita „vyteká" do prázdna — 301 na relevantnú stránku ju zachráni.' },
      ] },
  ]},

  /* ── SEKCIA 4: TECHNICKÉ ZDRAVIE ── */
  { id: 'gsc-s4', title: 'Technické zdravie webu', lessons: [

    { id: 'gsc-4-1', title: 'Core Web Vitals', min: 30,
      theory: `<p><strong>Core Web Vitals (CWV)</strong> sú metriky používateľského zážitku, ktoré Google používa ako (mierny) ranking signál a najmä ako štandard kvality webu.</p>
<h3>Tri metriky</h3>
<table>
<tr><th>Metrika</th><th>Meria</th><th>Dobré</th><th>Zlé</th></tr>
<tr><td><strong>LCP</strong> (Largest Contentful Paint)</td><td>načítanie najväčšieho prvku</td><td>≤ 2,5 s</td><td>&gt; 4 s</td></tr>
<tr><td><strong>INP</strong> (Interaction to Next Paint)</td><td>odozva na interakcie (nahradila FID)</td><td>≤ 200 ms</td><td>&gt; 500 ms</td></tr>
<tr><td><strong>CLS</strong> (Cumulative Layout Shift)</td><td>vizuálna stabilita (poskakovanie)</td><td>≤ 0,1</td><td>&gt; 0,25</td></tr>
</table>
<h3>Field data vs. Lab data</h3>
<p>GSC report CWV zobrazuje <strong>field data</strong> — reálne merania od používateľov Chrome (CrUX), 28-dňový kĺzavý agregát, hodnotený na 75. percentile. <strong>Lab data</strong> (Lighthouse/PageSpeed simulácia) slúžia na diagnostiku, ale hodnotí sa field. Preto: oprava sa v GSC prejaví až po týždňoch zberu nových dát.</p>
<h3>Najčastejšie príčiny a fixy</h3>
<ul>
<li><strong>LCP</strong>: pomalý server (TTFB), veľké obrázky → WebP/AVIF, lazy-loading (nie pre LCP prvok!), CDN, preload hero obrázka.</li>
<li><strong>INP</strong>: ťažký JavaScript, dlhé tasky → code splitting, odloženie skriptov tretích strán.</li>
<li><strong>CLS</strong>: obrázky bez rozmerov, naskakujúce bannery/ads, webfonty → rezervuj miesto (width/height, aspect-ratio), font-display.</li>
</ul>
<div class="warn">URL bez dostatku CrUX dát sa v reporte nezobrazia vôbec — „prázdny report" pri malom webe neznamená, že je všetko OK, len že Google nemá dosť meraní.</div>`,
      checklist: ['Poznám 3 metriky a ich prahové hodnoty', 'Chápem field vs. lab data a 28-dňové okno', 'Viem priradiť typické príčiny k metrikám', 'Používam PageSpeed Insights na diagnostiku'],
      quiz: [
        { q: 'Ktorá metrika nahradila FID?', o: ['LCP', 'INP', 'CLS', 'TTFB'], c: 1, e: 'Interaction to Next Paint (INP) meria odozvu na všetky interakcie — FID nahradila v marci 2024.' },
        { q: 'Dobrá hodnota LCP je:', o: ['≤ 2,5 s', '≤ 10 s', '≤ 0,1', '≤ 200 ms'], c: 0, e: 'LCP do 2,5 sekundy = dobré; nad 4 s = zlé.' },
        { q: 'GSC CWV report zobrazuje:', o: ['Simulované lab merania', 'Field data reálnych používateľov (CrUX) na 75. percentile', 'Dáta z Google Ads', 'Odhady AI'], c: 1, e: 'Report stojí na CrUX — reálne merania Chrome používateľov za 28 dní.' },
        { q: 'Banner, ktorý naskočí a posunie obsah, zhoršuje:', o: ['LCP', 'INP', 'CLS', 'CTR'], c: 2, e: 'Layout shift = posun rozloženia — presne to meria Cumulative Layout Shift.' },
        { q: 'Opravil si LCP problém. V GSC sa zlepšenie prejaví:', o: ['Okamžite', 'Po týždňoch — až sa nazbierajú nové 28-dňové field dáta', 'Nikdy', 'Po zaplatení'], c: 1, e: 'Field data sú kĺzavý agregát — zmena sa do reportu premieta postupne.' },
      ] },

    { id: 'gsc-4-2', title: 'Mobile Usability a HTTPS', min: 20,
      theory: `<h3>Mobilná použiteľnosť</h3>
<p>Od nástupu mobile-first indexingu je mobilná verzia <strong>tá hlavná</strong>. Samostatný Mobile Usability report Google z GSC odstránil (2023), no požiadavky platia ďalej a testujú sa cez Lighthouse/reálne zariadenia:</p>
<ul>
<li>Viewport meta tag, responzívny layout (žiadne horizontálne scrollovanie).</li>
<li>Čitateľné písmo (16 px+ základ), dostatočné dotykové ciele (~48 px).</li>
<li>Obsah paritný s desktopom — skrývanie obsahu na mobile = jeho strata pre indexáciu.</li>
<li>Žiadne agresívne interstitials (celoplošné pop-upy) — Google ich penalizuje.</li>
</ul>
<h3>HTTPS</h3>
<p>HTTPS je roky <strong>ľahký ranking signál</strong> a absolútny štandard. GSC má HTTPS report (koľko URL je servovaných cez HTTPS). Checklist migrácie na HTTPS / audit:</p>
<ul>
<li>Platný certifikát (autoobnova!), celý web na https, 301 z http.</li>
<li>Žiadny <strong>mixed content</strong> (http zdroje na https stránke).</li>
<li>Canonicaly, sitemap, interné odkazy → všetky na https verziu.</li>
<li>HSTS hlavička ako bonus.</li>
</ul>
<div class="warn">Expirovaný certifikát = celoobrazovkové varovanie prehliadača = okamžitá strata takmer všetkej návštevnosti. Nastav monitoring expirácie — banalita, ktorá položila nejeden e-shop počas víkendu.</div>`,
      checklist: ['Web prejde mobilným testom (viewport, ciele, písmo)', 'Obsah na mobile paritný s desktopom', 'Celý web na HTTPS s 301 z HTTP', 'Bez mixed content, certifikát s autoobnovou'],
      quiz: [
        { q: 'Mobile-first indexing znamená, že Google hodnotí:', o: ['Desktop verziu', 'Primárne mobilnú verziu obsahu', 'Obe verzie rovnako', 'Aplikáciu'], c: 1, e: 'Mobilná verzia je tá „skutočná" — obsah skrytý na mobile pre indexáciu neexistuje.' },
        { q: 'Agresívny celoplošný pop-up hneď po príchode z vyhľadávania:', o: ['Zvyšuje konverzie bez rizika', 'Google penalizuje (intrusive interstitials)', 'Je povinný pre GDPR', 'Zlepšuje CLS'], c: 1, e: 'Intrusive interstitials na vstupe z výsledkov Google explicitne postihuje. (Cookie lišty v rozumnej miere sú OK.)' },
        { q: 'HTTPS je:', o: ['Bez vplyvu na SEO', 'Ľahký ranking signál a bezpečnostný štandard', 'Najsilnejší ranking faktor', 'Potrebný len pre e-shopy'], c: 1, e: 'Malý ranking boost + nutnosť pre dôveru, moderné API a HTTP/2.' },
        { q: 'Mixed content znamená:', o: ['Text aj video na stránke', 'HTTP zdroje načítavané na HTTPS stránke', 'Dva jazyky obsahu', 'Duplicitný obsah'], c: 1, e: 'Nezabezpečené zdroje na zabezpečenej stránke — prehliadače blokujú a varujú.' },
        { q: 'Expirovaný SSL certifikát spôsobí:', o: ['Mierne spomalenie', 'Varovanie prehliadača a masívny prepad návštev', 'Nič viditeľné', 'Lepší ranking'], c: 1, e: 'Používatelia z celoobrazovkového varovania odchádzajú — monitoring expirácie je povinnosť.' },
      ] },

    { id: 'gsc-4-3', title: 'Security Issues a Manual Actions', min: 25,
      theory: `<h3>Manual Actions (ručné zásahy)</h3>
<p>Na rozdiel od algoritmických zmien ide o <strong>ručnú penalizáciu od zamestnanca Googlu</strong> za porušenie pravidiel (spam policies). Report Manual actions ukazuje typ a rozsah (celý web / časť). Najčastejšie: neprirodzené odkazy (na web / z webu), thin content, cloaking, spamové štruktúrované dáta, hacknutý obsah.</p>
<p><strong>Proces nápravy:</strong> 1) pochop presný dôvod, 2) odstráň problém všade (pri odkazoch: odstrániť + disavow zvyšok), 3) zdokumentuj, 4) podaj <strong>Reconsideration request</strong> — úprimný, konkrétny, s dôkazmi. Odpoveď trvá dni až týždne.</p>
<h3>Security Issues</h3>
<p>Hlásenia o hacknutí: injektovaný obsah, malware, phishing stránky, japanese keyword hack (japonské spam stránky v indexe), presmerovania na spam. Web dostane varovanie vo výsledkoch („Táto stránka môže byť hacknutá") a v prehliadači.</p>
<p><strong>Postup pri hacku:</strong> izoluj (heslá, prístupy) → identifikuj rozsah (nové URL v indexe: <code>site:</code> operátor!) → vyčisti (zálohy, aktualizácie CMS/pluginov) → sprav bezpečnostný audit → v GSC <strong>Request review</strong>.</p>
<div class="warn">Algoritmický prepad (core update) NIE JE manual action — v reporte nič neuvidíš a reconsideration request neexistuje. Rozlišuj: manual action = správa v GSC; algoritmus = prepad bez správy. Toto je jedna z najčastejších klientskych otázok: „Dostali sme penalizáciu?"</div>
<div class="tip">Pri prevzatí každého nového klienta over Manual actions aj Security issues ako prvé — zdedený problém mení celú stratégiu.</div>`,
      checklist: ['Rozlišujem manual action vs. algoritmický prepad', 'Poznám top 5 dôvodov manual actions', 'Ovládam proces reconsideration requestu', 'Viem postup pri hacknutom webe vrátane site: kontroly'],
      quiz: [
        { q: 'Manual action je:', o: ['Automatická zmena algoritmu', 'Ručná penalizácia od Googlu za porušenie pravidiel, viditeľná v GSC', 'Chyba servera', 'Platená služba'], c: 1, e: 'Manual action udeľuje človek a vždy sa zobrazí v reporte Manual actions s dôvodom.' },
        { q: 'Návštevnosť klesla po core update, report Manual actions je prázdny. Ide o:', o: ['Manual action', 'Algoritmické prehodnotenie — reconsideration request neexistuje', 'Hack', 'Chybu GSC'], c: 1, e: 'Bez správy v GSC nejde o penalizáciu — algoritmický prepad sa rieši kvalitou, nie žiadosťou.' },
        { q: 'Po odstránení dôvodu manual action podávaš:', o: ['Disavow', 'Reconsideration request', 'Validate fix', 'Sťažnosť'], c: 1, e: 'Žiadosť o prehodnotenie s popisom nápravy a dôkazmi posudzuje tím Googlu.' },
        { q: 'Japanese keyword hack sa prejavuje:', o: ['Pomalým webom', 'Tisíckami japonských spam stránok indexovaných pod tvojou doménou', 'Zmenou loga', 'Vypnutím HTTPS'], c: 1, e: 'Útočník generuje spam URL na tvojej doméne — odhalíš to operátorom site:domena.sk.' },
        { q: 'Prvý krok pri zistení hacku je:', o: ['Reconsideration request', 'Zabezpečiť prístupy a izolovať problém', 'Zmazať celý web', 'Kúpiť novú doménu'], c: 1, e: 'Najprv zastav útočníka (heslá, prístupy, aktualizácie), potom čisti a žiadaj review.' },
      ] },
  ]},

  /* ── SEKCIA 5: PRAX ── */
  { id: 'gsc-s5', title: 'Prax: riešenia, audit, projekt', lessons: [

    { id: 'gsc-5-1', title: 'Riešenie bežných problémov (playbook)', min: 30,
      theory: `<p>Scenáre, ktoré ťa v praxi stretnú znova a znova — a presný postup:</p>
<h3>„Nová stránka sa neindexuje"</h3>
<ol><li>URL Inspection: stav? blokovaná? canonical inam?</li><li>Interné odkazy na ňu (osirotená stránka sa indexuje zle)</li><li>Je v sitemap?</li><li>Kvalita: unikátny obsah? nie thin?</li><li>Request indexing a týždeň počkať.</li></ol>
<h3>„Návštevnosť náhle klesla"</h3>
<ol><li>Kedy presne? (Performance, porovnanie období, per stránka/dopyt)</li><li>Celý web či časť? Brand či non-brand?</li><li>Manual actions? Security? → GSC</li><li>Zhoda s core update? (sleduj oznámenia Googlu)</li><li>Technická regresia? (release v ten dátum, robots, noindex, migrácia)</li><li>SERP zmena? (nový layout, AI Overviews, konkurent)</li></ol>
<h3>„Stránky vypadli z indexu"</h3>
<p>Page indexing trend → aký stav narástol → vzorka URL → URL Inspection → typicky: nechcený noindex, rozbité canonicaly, server 5xx, expirovaná doména/certifikát.</p>
<h3>„Duplicitný obsah"</h3>
<p>Identifikuj vzorec (parametre? varianty? http/https?) → zvoľ nástroj: canonical (varianty), 301 (staré verzie), noindex (interné vyhľadávanie), robots (crawl budget veľkých webov — až po de-indexácii).</p>
<div class="tip">Zaveď si „incident log": dátum, symptóm, diagnóza, fix, výsledok. Po roku máš vlastnú knižnicu riešení — a presne takto vyzerá seniorita.</div>`,
      checklist: ['Ovládam postup pre neindexujúcu sa stránku', 'Mám framework diagnostiky prepadu návštevnosti', 'Viem vybrať správny nástroj na duplicity', 'Vediem si incident log'],
      quiz: [
        { q: 'Prvý krok pri neindexujúcej sa stránke:', o: ['Request indexing 20×', 'URL Inspection — zistiť aktuálny stav a príčinu', 'Nový web', 'Disavow'], c: 1, e: 'Diagnóza pred liečbou — URL Inspection povie, či je blokovaná, duplicitná alebo len nekvalitná.' },
        { q: 'Návštevnosť klesla presne v deň veľkého release webu. Primárne podozrenie:', o: ['Core update', 'Technická regresia v novej verzii', 'Sezónnosť', 'Konkurencia'], c: 1, e: 'Časová zhoda s nasadením = najprv hľadaj noindex, robots, canonicaly, zmeny URL.' },
        { q: 'Osirotená stránka (orphan page) je:', o: ['Stránka bez obrázkov', 'Stránka, na ktorú nevedú žiadne interné odkazy', 'Stránka bez recenzií', 'Stará stránka'], c: 1, e: 'Bez interných odkazov Google stránku ťažko objavuje aj hodnotí — slabé indexačné signály.' },
        { q: 'Na de-indexáciu výsledkov interného vyhľadávania (?s=...) použiješ:', o: ['301 redirect', 'noindex (a neskôr prípadne robots.txt)', 'Nový title', 'Sitemap'], c: 1, e: 'Interné výsledky nemajú byť v indexe — noindex je štandard; robots až po zmiznutí z indexu.' },
        { q: 'Prepad len brandových dopytov naznačuje:', o: ['SEO problém webu', 'Problém značky/reputácie alebo zmenu dopytu po značke', 'Chybu sitemap', 'Pomalý server'], c: 1, e: 'Brand dopyty odrážajú záujem o značku — ich pokles nie je klasický SEO technický problém.' },
      ] },

    { id: 'gsc-5-2', title: 'Kompletný technický audit webu', min: 40,
      theory: `<p>SEO/technický audit je vlajkový produkt špecialistu. Štruktúra profesionálneho auditu:</p>
<h3>1. Prístupy a zber dát</h3>
<p>GSC, GA4, crawler (Screaming Frog / Sitebulb), logy (ideálne), Ahrefs/Semrush.</p>
<h3>2. Indexácia a crawling</h3>
<ul><li>robots.txt, sitemap kvalita, Page indexing trendy, pomer crawlnuté/indexované, crawl stats (5xx, priemerná odozva), osirotené stránky (crawler vs. sitemap vs. GSC).</li></ul>
<h3>3. Architektúra a interné odkazy</h3>
<ul><li>Hĺbka kliknutí (dôležité stránky ≤ 3 kliky), interné odkazy na peniaze-stránky, breadcrumbs, fazetová navigácia pod kontrolou.</li></ul>
<h3>4. Duplicity a kanonizácia</h3>
<ul><li>Parametre, varianty, http/www verzie, canonical konzistencia, hreflang pri viacjazyčnosti.</li></ul>
<h3>5. Obsah</h3>
<ul><li>Thin content, kanibalizácia, title/description kvalita, štruktúra nadpisov, striking distance príležitosti.</li></ul>
<h3>6. Výkon a UX</h3>
<ul><li>CWV field data, mobilná paritnosť, HTTPS/mixed content, interstitials.</li></ul>
<h3>7. Odkazy a autorita</h3>
<ul><li>Profil, odkazované 404, anchor texty, toxicita (len pri podozrení).</li></ul>
<h3>8. Bezpečnosť a penalizácie</h3>
<ul><li>Manual actions, security issues, história domény.</li></ul>
<h3>Výstup</h3>
<p>Ako pri GBP: exekutívne zhrnutie → nálezy s dôkazmi (screenshoty, čísla) → <strong>prioritizácia dopad × náročnosť</strong> (P0 kritické / P1 / P2) → plán 30/60/90 dní. Zlaté pravidlo: <strong>každý nález má mať „prečo na tom záleží" a „ako to opraviť"</strong> — audit bez návodu je len zoznam výčitiek.</p>
<div class="tip">Nálezy formuluj v jazyku biznisu: nie „máte 3 400 soft 404", ale „3 400 stránok míňa crawl budget a brzdí indexáciu nových produktov — oprava uvoľní cestu novinkám do vyhľadávania".</div>`,
      checklist: ['Mám šablónu auditu s 8 oblasťami', 'Používam crawler + GSC + analytiku spoločne', 'Nálezy prioritizujem dopad × náročnosť', 'Každý nález má dôvod a riešenie'],
      quiz: [
        { q: 'Prioritizácia nálezov auditu sa robí podľa:', o: ['Abecedy', 'Dopadu × náročnosti implementácie', 'Dátumu objavenia', 'Počtu screenshotov'], c: 1, e: 'Impact/effort matica zabezpečí, že sa najprv rieši to, čo prinesie najviac za najmenej práce.' },
        { q: 'Osirotené stránky nájdeš porovnaním:', o: ['GSC vs. Ads', 'Crawl dát (odkazy) vs. sitemap/GSC zoznamu URL', 'Titles vs. descriptions', 'Nedajú sa nájsť'], c: 1, e: 'URL, ktoré existujú (sitemap/GSC), ale crawler ich cez odkazy nenašiel = osirotené.' },
        { q: 'Dôležité stránky by mali byť od homepage vzdialené:', o: ['Max ~3 kliky', 'Min 10 klikov', 'Na tom nezáleží', 'Presne 7 klikov'], c: 0, e: 'Hĺbka kliknutí koreluje s crawl prioritou aj tokom autority — peniaze-stránky patria plytko.' },
        { q: 'Audit bez odporúčaní („ako opraviť") je:', o: ['Štandard', 'Nedokončená práca — nálezy musia mať riešenie a dôvod', 'Lepší', 'Lacnejší a preto správny'], c: 1, e: 'Hodnota auditu je v akcionabilite — klient potrebuje vedieť čo, prečo a ako.' },
        { q: 'Crawl stats s rastúcim podielom 5xx odpovedí signalizuje:', o: ['Zdravý server', 'Problémy servera, ktoré môžu brzdiť crawling', 'Viac obsahu', 'Lepší ranking'], c: 1, e: '5xx chyby Googlebota odrádzajú — crawl rate klesá a s ním aj čerstvosť indexu.' },
      ] },

    { id: 'gsc-5-3', title: 'Záverečný projekt modulu GSC', min: 60,
      theory: `<p>Portfóliový projekt — kompletný technický audit reálneho webu.</p>
<h3>Zadanie</h3>
<ol>
<li>Vyber reálny web (vlastný, známeho, alebo verejný stredne veľký web — audit sa dá spraviť aj bez prístupu do GSC pomocou crawlera a verejných nástrojov; ideálne však s prístupom).</li>
<li>Vykonaj <strong>audit podľa 8-oblastnej šablóny</strong> z lekcie 5.2.</li>
<li>Nájdi a zdokumentuj <strong>minimálne 10 konkrétnych nálezov</strong> s dôkazmi (screenshoty, URL, dáta).</li>
<li>Každý nález: závažnosť (P0–P2) · dopad na biznis · presný návod na opravu.</li>
<li>Vytvor <strong>plán 30/60/90 dní</strong> a exekutívne zhrnutie na pol strany.</li>
<li>Bonus: sprav CTR analýzu (ak máš prístup k Performance) a navrhni 5 nových title/description.</li>
</ol>
<h3>Kritériá hodnotenia</h3>
<ul>
<li>Pokrytie všetkých 8 oblastí — 25 %</li>
<li>Kvalita a dôkaznosť nálezov — 30 %</li>
<li>Správnosť navrhovaných riešení — 25 %</li>
<li>Prioritizácia a biznis jazyk — 20 %</li>
</ul>
<div class="tip">Použi bezplatné nástroje: Screaming Frog (500 URL zdarma), PageSpeed Insights, Rich Results Test, operátor site:, Ahrefs Webmaster Tools (zadarmo pre vlastný web). Profesionálny audit sa dá spraviť s nulovým rozpočtom.</div>`,
      checklist: ['Vybraný web a zozbierané dáta', 'Audit všetkých 8 oblastí', 'Min. 10 nálezov s dôkazmi a riešeniami', 'Prioritizácia P0–P2', 'Plán 30/60/90 + exekutívne zhrnutie', 'Projekt v PDF do portfólia'],
      quiz: [
        { q: 'Minimálny počet zdokumentovaných nálezov v projekte:', o: ['3', '10', '100', '1'], c: 1, e: 'Desať konkrétnych, doložených nálezov preukazuje schopnosť systematickej diagnostiky.' },
        { q: 'Každý nález musí obsahovať:', o: ['Len screenshot', 'Závažnosť, dopad na biznis a návod na opravu', 'Meno vývojára, ktorý to pokazil', 'Cenu opravy v bitcoinoch'], c: 1, e: 'Akcionabilita = závažnosť + dopad + riešenie. Bez toho je to len pozorovanie.' },
        { q: 'Audit webu bez prístupu do GSC:', o: ['Je nemožný', 'Je možný pomocou crawlera a verejných nástrojov, len s obmedzeniami', 'Je vždy lepší', 'Je nelegálny'], c: 1, e: 'Crawler, PageSpeed, site: operátor a Ahrefs free odhalia veľa — chýbajú „len" interné dáta Performance.' },
        { q: 'Screaming Frog vo free verzii crawluje:', o: ['50 URL', '500 URL', '50 000 URL', 'Neobmedzene'], c: 1, e: 'Limit 500 URL free verzie stačí na audit menšieho webu alebo vzorky veľkého.' },
        { q: 'Exekutívne zhrnutie projektu má rozsah:', o: ['20 strán', 'Cca pol strany — kľúčové zistenia a plán', 'Jedno slovo', 'Nemá tam byť'], c: 1, e: 'Manažérske zhrnutie musí byť stráviteľné za minútu — detail je v tele auditu.' },
      ] },
  ]},
]});
</script>
