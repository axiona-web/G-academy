<script>
/* ═══════════════════════════════════════════════════════════════════
   DÁTA — MODUL 1: GOOGLE BUSINESS PROFILE (GBP)
   Štruktúra: modul → sekcie → lekcie (teória, checklist, kvíz 5 otázok)
   Kvízové otázky: { q: otázka, o: [možnosti], c: index správnej, e: vysvetlenie }
   ═══════════════════════════════════════════════════════════════════ */
window.DATA = window.DATA || {};
DATA.modules = DATA.modules || [];

DATA.modules.push({
  id: 'gbp',
  name: 'Google Business Profile',
  short: 'GBP',
  icon: 'map-pin',
  color: '#10b981',
  desc: 'Lokálne vyhľadávanie, Google Maps, správa firemného profilu, recenzie a lokálne SEO — od založenia profilu po profesionálne audity pre klientov.',
  difficulty: 'Začiatočník → Medior',
  hours: 22,
  sections: [

  /* ── SEKCIA 1: ÚVOD DO LOKÁLNEHO VYHĽADÁVANIA ── */
  { id: 'gbp-s1', title: 'Úvod do lokálneho vyhľadávania', lessons: [

    { id: 'gbp-1-1', title: 'Čo je Google Business Profile a prečo je kľúčový', min: 20,
      theory: `<p><strong>Google Business Profile (GBP)</strong> — predtým Google My Business — je bezplatný nástroj, cez ktorý firma spravuje svoju prezentáciu v Google vyhľadávaní a na Google Maps. Pre lokálne firmy (reštaurácie, servisy, lekári, remeselníci, obchody) je to často <strong>najdôležitejší marketingový kanál vôbec</strong> — dôležitejší než vlastný web.</p>
<h3>Prečo na GBP záleží</h3>
<ul>
<li>Približne <strong>46 % všetkých vyhľadávaní na Google má lokálny zámer</strong> („kaviareň v okolí", „zubár Bratislava").</li>
<li>Väčšina používateľov, ktorí hľadajú lokálnu firmu na mobile, ju navštívi alebo kontaktuje do 24 hodín.</li>
<li>GBP profil sa zobrazuje <strong>nad organickými výsledkami</strong> v tzv. Local Packu — získava kliky skôr než web.</li>
</ul>
<h3>Čo všetko profil obsahuje</h3>
<p>Názov, kategórie, adresu, otváracie hodiny, telefón, web, fotografie, recenzie, príspevky (Posts), produkty, služby, otázky a odpovede (Q&A) a atribúty (napr. bezbariérový prístup, Wi-Fi).</p>
<div class="ex">Vyhľadaj na Google „pizza + tvoje mesto". Všimni si: hore mapa s 3 firmami (Local Pack), pri každej hodnotenie, vzdialenosť a hodiny. Toto sú GBP profily — nie weby. Kto nemá optimalizovaný profil, v tejto hre vôbec nehrá.</div>
<div class="tip">Ako budúci špecialista budeš klientom predávať presne toto: viditeľnosť v momente, keď zákazník aktívne hľadá ich službu. GBP má typicky najvyššiu návratnosť zo všetkých lokálnych kanálov, pretože je zadarmo.</div>`,
      checklist: ['Rozumiem rozdielu medzi GBP profilom a webstránkou', 'Viem vysvetliť klientovi hodnotu GBP jednou vetou', 'Pozrel som si Local Pack pre 3 rôzne vyhľadávania', 'Viem vymenovať aspoň 8 prvkov GBP profilu'],
      quiz: [
        { q: 'Čo je Google Business Profile?', o: ['Platená reklama na Google Maps', 'Bezplatný nástroj na správu firemnej prezentácie v Google Search a Maps', 'Analytický nástroj pre weby', 'CRM systém od Google'], c: 1, e: 'GBP je bezplatný nástroj na správu toho, ako sa firma zobrazuje vo vyhľadávaní a na mapách. Nejde o platenú reklamu.' },
        { q: 'Aký podiel vyhľadávaní na Google má približne lokálny zámer?', o: ['5 %', '15 %', 'okolo 46 %', '90 %'], c: 2, e: 'Približne 46 % vyhľadávaní má lokálny zámer — preto je lokálna viditeľnosť taká cenná.' },
        { q: 'Ako sa GBP volal v minulosti?', o: ['Google Places+', 'Google My Business', 'Google Local Ads', 'Google Maps Manager'], c: 1, e: 'Nástroj sa premenoval z Google My Business (GMB) na Google Business Profile v roku 2021. Skratku GMB stále veľa ľudí používa.' },
        { q: 'Kde sa zobrazuje Local Pack?', o: ['Pod organickými výsledkami', 'Len v aplikácii Google Maps', 'Typicky nad organickými výsledkami vyhľadávania', 'Len na desktope'], c: 2, e: 'Local Pack (mapa + 3 firmy) sa zobrazuje typicky nad klasickými organickými výsledkami — preto zbiera veľkú časť klikov.' },
        { q: 'Ktorý typ firmy profituje z GBP najviac?', o: ['Globálny e-shop bez predajne', 'Lokálna služba so zákazníkmi v okolí', 'Mobilná hra', 'Spravodajský portál'], c: 1, e: 'GBP je určený pre firmy s lokálnou pôsobnosťou — kamenné prevádzky a služby vykonávané u zákazníka.' },
      ] },

    { id: 'gbp-1-2', title: 'Ako funguje Google Maps a lokálny algoritmus', min: 25,
      theory: `<p>Google Maps nie je len mapa — je to <strong>vyhľadávač lokálnych firiem</strong> s vlastným algoritmom. Keď používateľ zadá dopyt, Google zostaví poradie firiem na základe stoviek signálov, pričom dáta čerpá z GBP profilov, webov, recenzií, citácií a správania používateľov.</p>
<h3>Odkiaľ Google berie dáta o firmách</h3>
<ul>
<li><strong>GBP profily</strong> — primárny zdroj (to, čo firma sama vyplní).</li>
<li><strong>Weby firiem</strong> — Google porovnáva údaje na webe s profilom.</li>
<li><strong>Third-party zdroje</strong> — katalógy, registre firiem, dátoví agregátori.</li>
<li><strong>Používatelia</strong> — recenzie, fotky, odpovede na otázky „Je tu bezbariérový vstup?", návrhy úprav.</li>
</ul>
<h3>Typy lokálnych vyhľadávaní</h3>
<ul>
<li><strong>Explicitné</strong> — dopyt obsahuje lokalitu: „autoservis Trnava".</li>
<li><strong>Implicitné</strong> — dopyt lokalitu neobsahuje, ale Google ju predpokladá: „autoservis" (zohľadní polohu používateľa).</li>
<li><strong>„V okolí" (near me)</strong> — extrémne závislé od aktuálnej GPS polohy.</li>
</ul>
<div class="warn">Výsledky sú personalizované podľa polohy — ty a tvoj klient vidíte iné poradie. Pri auditoch nikdy nehodnoť pozície z vlastného prehliadača; používaj nástroje na geo-grid tracking (napr. Local Falcon) alebo aspoň anonymné okno s nastavenou lokalitou.</div>
<div class="ex">Zadaj „lekáreň" do Maps doma a potom na druhom konci mesta. Poradie sa úplne zmení — vzdialenosť je silný signál. Toto je kľúčové pochopiť pred akoukoľvek optimalizáciou.</div>`,
      checklist: ['Viem vysvetliť rozdiel medzi explicitným a implicitným lokálnym dopytom', 'Rozumiem, prečo sa výsledky líšia podľa polohy', 'Poznám 4 zdroje dát, z ktorých Google skladá lokálne výsledky', 'Vyskúšal som to isté vyhľadávanie z dvoch rôznych lokalít'],
      quiz: [
        { q: '„Autoservis" zadané bez mesta je príklad akého dopytu?', o: ['Explicitného lokálneho', 'Implicitného lokálneho', 'Navigačného', 'Transakčného bez lokálneho zámeru'], c: 1, e: 'Lokalita nie je v dopyte, ale Google ju predpokladá z polohy používateľa — implicitný lokálny dopyt.' },
        { q: 'Prečo vidí klient iné poradie v Local Packu ako ty?', o: ['Google náhodne mieša výsledky', 'Výsledky sú personalizované najmä podľa polohy', 'Klient má pomalší internet', 'Local Pack sa mení len raz denne'], c: 1, e: 'Lokálne výsledky silne závisia od polohy (a čiastočne histórie) používateľa. Preto sa pozície merajú geo-grid nástrojmi.' },
        { q: 'Ktorý z týchto NIE je zdroj dát pre lokálne výsledky?', o: ['GBP profil firmy', 'Recenzie používateľov', 'Súkromné e-maily firmy v Gmaili', 'Firemný web'], c: 2, e: 'Google nepoužíva obsah súkromných e-mailov na lokálny ranking. Profily, weby, citácie a používateľské dáta áno.' },
        { q: 'Čo najviac ovplyvňuje výsledky pri dopyte „kaviareň near me"?', o: ['Počet fotiek na profile', 'Aktuálna poloha používateľa', 'Vek domény webu', 'Počet followerov na Instagrame'], c: 1, e: '„Near me" dopyty sú extrémne citlivé na GPS polohu — vzdialenosť je tu dominantný faktor.' },
        { q: 'Používatelia môžu do Google Maps prispievať:', o: ['Iba recenziami', 'Recenziami, fotkami, odpoveďami a návrhmi úprav', 'Ničím, obsah tvorí len firma', 'Len platenými príspevkami'], c: 1, e: 'Maps je čiastočne crowdsourced — používatelia pridávajú recenzie, fotky, odpovede na otázky aj návrhy úprav údajov.' },
      ] },

    { id: 'gbp-1-3', title: 'Ranking faktory: Relevance, Distance, Prominence', min: 25,
      theory: `<p>Google oficiálne uvádza <strong>tri piliere lokálneho rankingu</strong>. Každý audit a optimalizácia sa točí okolo nich.</p>
<h3>1. Relevance (relevantnosť)</h3>
<p>Ako dobre profil zodpovedá dopytu. Ovplyvňuješ ju <strong>kategóriami</strong> (najsilnejší faktor!), názvom, popisom, službami, produktmi a obsahom webu. Firma s kategóriou „Pizzeria" bude relevantná pre „pizza", nie pre „sushi".</p>
<h3>2. Distance (vzdialenosť)</h3>
<p>Vzdialenosť prevádzky od používateľa (alebo od lokality v dopyte). Nedá sa priamo optimalizovať — ale dá sa s ňou pracovať: service area, viac prevádzok, lokálne landing pages.</p>
<h3>3. Prominence (významnosť)</h3>
<p>Ako známa a dôveryhodná je firma. Skladá sa z: <strong>počtu a kvality recenzií</strong>, hodnotenia, citácií (zmienok o firme na iných weboch), autority webu (odkazy, SEO) a offline známosti značky.</p>
<table><tr><th>Pilier</th><th>Hlavné páky optimalizácie</th></tr>
<tr><td>Relevance</td><td>správne kategórie, kompletný profil, služby, obsah webu</td></tr>
<tr><td>Distance</td><td>nemeníš — ale cieliš dopyty pre svoju oblasť</td></tr>
<tr><td>Prominence</td><td>recenzie, citácie, linkbuilding, PR</td></tr></table>
<div class="warn">Najčastejší omyl klientov: „Chcem byť prvý v celom kraji." Pri silnom faktore vzdialenosti to pre kamennú prevádzku nie je reálne. Nastav očakávania hneď na začiatku spolupráce.</div>
<div class="tip">Podľa každoročného prieskumu Local Search Ranking Factors sú najsilnejšie signály: primárna kategória, kľúčové slová v názve profilu (pozor na pravidlá!), vzdialenosť a recenzie.</div>`,
      checklist: ['Viem vymenovať a vysvetliť 3 piliere lokálneho rankingu', 'Ku každému pilieru viem priradiť aspoň 2 optimalizačné páky', 'Rozumiem, prečo sa vzdialenosť nedá „obísť"', 'Viem klientovi vysvetliť reálne očakávania dosahu'],
      quiz: [
        { q: 'Ktoré tri faktory Google oficiálne uvádza pre lokálny ranking?', o: ['Rýchlosť webu, obsah, odkazy', 'Relevance, Distance, Prominence', 'CTR, CPC, CPA', 'Recenzie, fotky, príspevky'], c: 1, e: 'Oficiálna trojica je Relevance (relevantnosť), Distance (vzdialenosť) a Prominence (významnosť).' },
        { q: 'Ktorý prvok profilu má najväčší vplyv na Relevance?', o: ['Cover fotka', 'Primárna kategória', 'Počet Google Posts', 'Otváracie hodiny'], c: 1, e: 'Primárna kategória je dlhodobo považovaná za najsilnejší relevančný signál profilu.' },
        { q: 'Prominence firmy zvýšiš najmä:', o: ['Zmenou adresy', 'Recenziami, citáciami a autoritou webu', 'Skrátením otváracích hodín', 'Zmenou telefónneho čísla'], c: 1, e: 'Prominence = známosť a dôveryhodnosť: recenzie, zmienky/citácie, odkazy, PR.' },
        { q: 'Klient chce byť v Local Packu v meste vzdialenom 40 km od prevádzky. Čo mu povieš?', o: ['Stačí pridať mesto do názvu profilu', 'Kúpime viac recenzií', 'Faktor vzdialenosti to prakticky znemožňuje; riešením je napr. reálna pobočka', 'Zaplatíme Googlu za rozšírenie dosahu'], c: 2, e: 'Distance sa nedá oklamať. Pridávanie miest do názvu porušuje pravidlá a kupovanie recenzií je zakázané. Reálne riešenie = prevádzka v danej lokalite (alebo Ads).' },
        { q: 'Citácia (citation) v lokálnom SEO znamená:', o: ['Citát z recenzie zákazníka', 'Zmienku o firme (názov, adresa, telefón) na inom webe', 'Odkaz v akademickej práci', 'Textovú reklamu'], c: 1, e: 'Citácia je výskyt NAP údajov firmy na externých weboch — katalógy, registre, médiá. Posilňuje Prominence.' },
      ] },

    { id: 'gbp-1-4', title: 'Local Pack a Knowledge Panel', min: 20,
      theory: `<p>GBP profil sa v Google zobrazuje na dvoch hlavných miestach a je dôležité ich rozlišovať.</p>
<h3>Local Pack (Map Pack, 3-Pack)</h3>
<p>Blok s mapou a <strong>troma firmami</strong>, ktorý sa zobrazí pri dopytoch s lokálnym zámerom. Obsahuje názov, hodnotenie, kategóriu, adresu/vzdialenosť, hodiny a niekedy <strong>justifications</strong> — úryvky („Na webe uvádza: …", „V recenzii sa spomína…"), ktorými Google zdôvodňuje zobrazenie. Kliknutím na „Viac firiem" sa otvorí <strong>Local Finder</strong> s kompletným zoznamom.</p>
<h3>Knowledge Panel</h3>
<p>Veľký panel <strong>vpravo</strong> (na mobile hore), ktorý sa zobrazí pri <strong>brandovom vyhľadávaní</strong> — keď niekto hľadá konkrétnu firmu podľa mena. Zobrazuje kompletný profil: fotky, recenzie, hodiny, príspevky, Q&A, tlačidlá volať/trasa/web.</p>
<table><tr><th></th><th>Local Pack</th><th>Knowledge Panel</th></tr>
<tr><td>Kedy</td><td>všeobecný dopyt („zubár")</td><td>brandový dopyt („Dental Plus Nitra")</td></tr>
<tr><td>Konkurencia</td><td>bojuješ o 3 miesta</td><td>panel máš „sám pre seba"</td></tr>
<tr><td>Cieľ optimalizácie</td><td>dostať sa dnu (ranking)</td><td>konverzia — presvedčiť a neodradiť</td></tr></table>
<div class="tip">Knowledge Panel je tvoja výkladná skriňa. Aj firma, ktorá sa nikdy nedostane do Local Packu na ťažké dopyty, musí mať perfektný panel — pretože tam končí každý, komu ju niekto odporučil.</div>
<div class="ex">Vyhľadaj ľubovoľnú známu reštauráciu podľa mena. Prezri si celý Knowledge Panel: Popular times, recenzie, Q&A, fotky od návštevníkov. Toto všetko sa dá ovplyvňovať cez GBP.</div>`,
      checklist: ['Viem rozlíšiť Local Pack, Local Finder a Knowledge Panel', 'Rozumiem rozdielu medzi všeobecným a brandovým dopytom', 'Viem, čo sú justifications a odkiaľ sa berú', 'Prezrel som si Knowledge Panel 3 firiem'],
      quiz: [
        { q: 'Koľko firiem štandardne zobrazuje Local Pack?', o: ['1', '3', '5', '10'], c: 1, e: 'Štandardný Local Pack (preto aj „3-Pack") zobrazuje tri firmy + odkaz na ďalšie výsledky (Local Finder).' },
        { q: 'Knowledge Panel firmy sa typicky zobrazí pri:', o: ['Každom vyhľadávaní', 'Vyhľadávaní firmy podľa mena (brandový dopyt)', 'Iba platených kampaniach', 'Vyhľadávaní konkurencie'], c: 1, e: 'Panel sa viaže na brandové vyhľadávanie konkrétnej firmy.' },
        { q: 'Čo sú „justifications" v Local Packu?', o: ['Právne vyhlásenia firmy', 'Úryvky (z webu, recenzií, produktov), ktorými Google zdôvodňuje výsledok', 'Platené popisky', 'Odpovede na recenzie'], c: 1, e: 'Justifications sú automatické úryvky ako „Na webe uvádza: bezlepková pizza" — zvyšujú CTR a dajú sa nepriamo optimalizovať obsahom.' },
        { q: 'Hlavný cieľ optimalizácie Knowledge Panelu je:', o: ['Predbehnúť konkurenciu v rankingu', 'Konverzia — presvedčiť používateľa, ktorý firmu už našiel', 'Znížiť cenu za klik', 'Zvýšiť počet indexovaných stránok'], c: 1, e: 'V paneli už nesúťažíš o pozíciu — súťažíš o dôveru a akciu (hovor, trasa, rezervácia).' },
        { q: 'Local Finder je:', o: ['Platený nástroj na hľadanie firiem', 'Rozšírený zoznam lokálnych výsledkov po kliknutí na „Viac firiem"', 'Aplikácia pre kuriérov', 'Časť Search Console'], c: 1, e: 'Local Finder je plný zoznam lokálnych výsledkov s mapou — pokračovanie Local Packu.' },
      ] },
  ]},

  /* ── SEKCIA 2: ZALOŽENIE A SPRÁVA PROFILU ── */
  { id: 'gbp-s2', title: 'Založenie a správa profilu', lessons: [

    { id: 'gbp-2-1', title: 'Založenie profilu krok za krokom', min: 25,
      theory: `<p>Profil sa zakladá na <code>google.com/business</code> pod Google účtom firmy. Postup:</p>
<ol>
<li><strong>Over, či profil už neexistuje.</strong> Vyhľadaj firmu na Maps — Google často vytvára profily automaticky z verejných dát. Ak existuje, žiadaj o <strong>prevzatie vlastníctva (claim)</strong>, nikdy nezakladaj duplicitu.</li>
<li><strong>Presný názov firmy</strong> — tak, ako je používaný v reálnom svete (na výklade, dokladoch). Bez pridaných kľúčových slov.</li>
<li><strong>Typ firmy:</strong> kamenná prevádzka (zákazníci chodia k tebe), service area business – SAB (ty chodíš k zákazníkom — inštalatér, upratovanie; adresa sa skryje a nastavíš oblasti pôsobenia), alebo hybrid.</li>
<li><strong>Kategória, adresa/oblasť, kontakty, web.</strong></li>
<li><strong>Verifikácia</strong> (samostatná lekcia).</li>
</ol>
<h3>Kto môže mať profil</h3>
<p>Firma musí mať <strong>osobný kontakt so zákazníkmi</strong> v uvedených hodinách. Čisto online biznis bez prevádzky nárok nemá. Zakázané sú profily na P.O. boxy, virtuálne sídla bez personálu a coworkingy bez označenia firmy.</p>
<div class="warn">Duplicitné profily sú jeden z najčastejších problémov v praxi. Ak klient „nevidí" svoj profil, najprv hľadaj existujúce/automaticky vytvorené profily — až potom zakladaj nový.</div>
<div class="tip">Používaj vždy firemný Google účet (nie osobný Gmail konateľa) a klientom nastavuj prístup cez role — vlastníctvo musí zostať klientovi, agentúra má byť Manager.</div>`,
      checklist: ['Pred založením vždy skontrolujem existujúce profily', 'Viem rozlíšiť kamennú prevádzku, SAB a hybrid', 'Poznám pravidlá oprávnenosti (eligibility)', 'Viem, prečo má byť vlastníkom profilu klient a agentúra len Manager'],
      quiz: [
        { q: 'Prvý krok pred založením nového profilu je:', o: ['Vymyslieť názov s kľúčovými slovami', 'Overiť, či profil už neexistuje (a prípadne ho prevziať)', 'Nahrať 50 fotiek', 'Zaplatiť poplatok Googlu'], c: 1, e: 'Google často vytvára profily automaticky. Duplicita škodí — existujúci profil treba claimnúť.' },
        { q: 'Service Area Business (SAB) je firma, ktorá:', o: ['Má viac pobočiek', 'Poskytuje služby u zákazníka a adresu na profile skrýva', 'Podniká len online', 'Funguje len sezónne'], c: 1, e: 'SAB (inštalatér, sťahovanie…) chodí k zákazníkom — nastavuje oblasti pôsobenia a adresa sa nezobrazuje.' },
        { q: 'Ktorá firma NEMÁ nárok na GBP profil?', o: ['Kaviareň', 'Mobilný kaderník', 'Čisto online e-shop bez kontaktu so zákazníkmi', 'Zubná ambulancia'], c: 2, e: 'Podmienkou je osobný kontakt so zákazníkmi. Čisto online biznis bez prevádzky profil mať nemôže.' },
        { q: 'Ako má znieť názov firmy na profile?', o: ['Názov + mesto + hlavná služba', 'Presne ako v reálnom svete, bez pridaných kľúčových slov', 'Veľkými písmenami pre viditeľnosť', 'Názov + telefónne číslo'], c: 1, e: 'Pravidlá vyžadujú reálny názov. Keyword stuffing v názve je porušenie, ktoré môže viesť k obmedzeniu profilu.' },
        { q: 'Správne nastavenie prístupov pre agentúru je:', o: ['Agentúra je Primary Owner', 'Klient je vlastník, agentúra Manager', 'Zdieľané heslo od účtu klienta', 'Agentúra si založí vlastný duplicitný profil'], c: 1, e: 'Vlastníctvo patrí klientovi; agentúra dostane rolu Manager. Duplicitné profily a zdieľané heslá sú zlá prax.' },
      ] },

    { id: 'gbp-2-2', title: 'Verifikácia profilu', min: 20,
      theory: `<p>Bez verifikácie sa profil nezobrazuje verejne v plnej miere a nedá sa spravovať. Google rozhoduje o metóde verifikácie podľa kategórie, regiónu a rizikovosti — <strong>nevyberáš si ju sám</strong>.</p>
<h3>Metódy verifikácie</h3>
<ul>
<li><strong>Video verifikácia</strong> — dnes najčastejšia. Natáčaš nepretržité video: okolie prevádzky, označenie firmy (výklad, logo), interiér, dôkaz oprávnenia (kľúče, pokladňa, dokumenty).</li>
<li><strong>Pohľadnica poštou</strong> — kód doručený na adresu (5–14 dní), historicky štandard.</li>
<li><strong>Telefón / SMS / e-mail</strong> — pre niektoré kategórie.</li>
<li><strong>Live videohovor</strong> so zástupcom Googlu.</li>
<li><strong>Hromadná verifikácia</strong> (bulk) — pre siete s 10+ prevádzkami cez tabuľku.</li>
</ul>
<h3>Tipy pre video verifikáciu (najviac zlyháva)</h3>
<ul>
<li>Jeden nepretržitý záber — bez strihov.</li>
<li>Začni vonku: ulica, číslo budovy, výklad s názvom → potom dovnútra.</li>
<li>Ukáž veci dokazujúce prevádzku: vybavenie, pokladňu, pečiatku, faktúry.</li>
<li>SAB bez kancelárie: firemné auto s polepom, náradie, dokumenty.</li>
</ul>
<div class="warn">Ak verifikácia opakovane zlyháva, profil môže skončiť v stave „suspended". Nikdy neskúšaj obchádzať pravidlá falošnou adresou — reaktivácia je potom veľmi zdĺhavá (appeal proces s dokladovaním).</div>`,
      checklist: ['Viem vymenovať aspoň 4 metódy verifikácie', 'Viem pripraviť klienta na video verifikáciu (scenár záberov)', 'Rozumiem, prečo si metódu nevyberám', 'Viem, čo robiť pri zamietnutej verifikácii'],
      quiz: [
        { q: 'Kto určuje metódu verifikácie profilu?', o: ['Majiteľ firmy pri registrácii', 'Google podľa kategórie, regiónu a rizika', 'Agentúra', 'Vyberá sa vždy pohľadnica'], c: 1, e: 'Metódu ponúka Google — nedá sa ľubovoľne zvoliť. Dnes prevláda video verifikácia.' },
        { q: 'Najčastejšia metóda verifikácie v súčasnosti je:', o: ['Fax', 'Video verifikácia', 'Osobná návšteva technika', 'Notárske overenie'], c: 1, e: 'Google výrazne presadzuje video verifikáciu, lebo najlepšie preukazuje reálnu existenciu prevádzky.' },
        { q: 'Video na verifikáciu musí byť:', o: ['Profesionálne zostrihané', 'Jeden nepretržitý záber bez strihov', 'Maximálne 5 sekúnd', 'Čiernobiele'], c: 1, e: 'Google vyžaduje kontinuálne video — strihy vzbudzujú podozrenie z manipulácie.' },
        { q: 'Čo má ukázať SAB podnikateľ bez kancelárie vo verifikačnom videu?', o: ['Svoju obývačku', 'Firemné auto, náradie a dokumenty preukazujúce podnikanie', 'Screenshot webu', 'Výpis z banky'], c: 1, e: 'SAB dokazuje reálne podnikanie: polep na aute, vybavenie, živnostenské dokumenty.' },
        { q: 'Bulk verifikácia je určená pre:', o: ['Firmy s 10 a viac prevádzkami', 'Každého, kto o ňu požiada', 'Neziskové organizácie', 'Firmy bez webu'], c: 0, e: 'Hromadná verifikácia cez tabuľku je pre siete od 10 prevádzok.' },
      ] },

    { id: 'gbp-2-3', title: 'Základné nastavenia profilu a NAP', min: 20,
      theory: `<p>Po verifikácii nastáva „zlaté" nastavenie základov. Kľúčový pojem: <strong>NAP = Name, Address, Phone</strong> — musí byť <strong>100 % konzistentný</strong> všade: na profile, webe, sociálnych sieťach aj v katalógoch.</p>
<h3>Čo nastaviť ako prvé</h3>
<ul>
<li><strong>Názov</strong> — reálny názov, konzistentný s webom.</li>
<li><strong>Adresa / service area</strong> — presný pin na mape (skontroluj polohu špendlíka!).</li>
<li><strong>Telefón</strong> — ideálne lokálne číslo; pri call trackingu nastav trackovacie číslo ako primárne a pôvodné ako dodatočné.</li>
<li><strong>Web</strong> — pri viacerých pobočkách odkazuj na <strong>lokálnu podstránku</strong>, nie homepage.</li>
<li><strong>Otváracie hodiny</strong> + sviatky (special hours) — neaktuálne hodiny sú top dôvod negatívnych recenzií.</li>
<li><strong>Popis firmy</strong> — do 750 znakov, prirodzený text o tom, čo robíš, pre koho a čím si výnimočný. Popis nie je ranking faktor v Local Packu, ale ovplyvňuje konverziu.</li>
<li><strong>Atribúty</strong> — Wi-Fi, terasa, bezbariérovosť, platba kartou, „women-owned"…</li>
<li><strong>Dátum otvorenia</strong>, krátky názov, sociálne siete.</li>
</ul>
<div class="warn">Nekonzistentné NAP (raz „Hlavná 5", inde „Hlavna 5/A", tretí formát telefónu) oslabuje dôveru algoritmu v dáta a je klasický nález auditu. Zaveď jednotný „master formát" a používaj ho všade.</div>
<div class="tip">Special hours na sviatky nastavuj vždy vopred na celý rok — Google inak zobrazuje otravné hlásenie „Hodiny sa môžu líšiť", ktoré znižuje dôveru.</div>`,
      checklist: ['Mám definovaný master formát NAP', 'Skontroloval som presnú polohu pinu na mape', 'Hodiny vrátane sviatkov sú nastavené', 'Popis využíva limit 750 znakov zmysluplne', 'Prešiel som všetky dostupné atribúty'],
      quiz: [
        { q: 'NAP znamená:', o: ['Network Access Point', 'Name, Address, Phone', 'New Ad Position', 'Navigation and Places'], c: 1, e: 'NAP = názov, adresa, telefón — základná trojica lokálnych dát, ktorá musí byť konzistentná naprieč internetom.' },
        { q: 'Firma s 5 pobočkami má na profile pobočky odkazovať na:', o: ['Homepage webu', 'Lokálnu podstránku danej pobočky', 'Facebook', 'PDF cenník'], c: 1, e: 'Lokálna landing page zvyšuje relevanciu aj konverziu — používateľ pristane na stránke „svojej" pobočky.' },
        { q: 'Popis firmy na GBP môže mať maximálne:', o: ['160 znakov', '750 znakov', '2000 znakov', 'Neobmedzene'], c: 1, e: 'Limit je 750 znakov, pričom najdôležitejšie informácie patria do prvých ~250 (zvyšok sa skrýva za „viac").' },
        { q: 'Najčastejší praktický dôsledok neaktuálnych otváracích hodín je:', o: ['Pokuta od Googlu', 'Negatívne recenzie od zákazníkov, ktorí prišli k zavretým dverám', 'Zmazanie profilu', 'Vyššie CPC'], c: 1, e: 'Zákazník pred zavretými dverami = takmer istá 1★ recenzia. Hodiny sú hygienický základ.' },
        { q: 'Pri použití call tracking čísla je správne:', o: ['Nahradiť ním číslo všade a pôvodné zmazať', 'Nastaviť trackovacie ako primárne a pôvodné lokálne ako dodatočné', 'Call tracking sa s GBP nesmie používať', 'Uviesť obe čísla v názve firmy'], c: 1, e: 'Tento postup zachová konzistenciu NAP (Google si spáruje pôvodné číslo) a zároveň meriaš hovory.' },
      ] },

    { id: 'gbp-2-4', title: 'Kategórie — najsilnejší relevančný signál', min: 25,
      theory: `<p>Kategórie hovoria Googlu, <strong>čím firma je</strong>. Vyberáš <strong>1 primárnu</strong> (najväčšia váha) a až <strong>9 sekundárnych</strong>. Zoznam je pevný — Google má vyše 4 000 kategórií a nedajú sa vymýšľať vlastné.</p>
<h3>Ako vybrať primárnu kategóriu</h3>
<ul>
<li>Má vystihovať <strong>core biznis</strong> — to, z čoho máš najviac tržieb / na čo chceš byť nachádzaný.</li>
<li>Buď <strong>čo najkonkrétnejší</strong>: „Pizza restaurant" &gt; „Restaurant"; „Emergency plumber" &gt; „Plumber", ak je to tvoja niche.</li>
<li>Špehuj konkurenciu: pozri, akú primárnu kategóriu majú firmy v Local Packu na tvoje kľúčové dopyty (dá sa zistiť napr. cez GMB Everywhere alebo v zdrojovom kóde).</li>
</ul>
<h3>Sekundárne kategórie</h3>
<p>Pokrývajú ďalšie reálne činnosti (kaviareň + „Breakfast restaurant" + „Wine bar"). Pridávaj len tie, ktoré firma <strong>naozaj vykonáva</strong> — nerelevantné kategórie rozrieďujú relevanciu a môžu spustiť re-verifikáciu.</p>
<div class="ex">Autoservis, ktorý robí hlavne pneuservis: primárna „Tire shop" (nie „Auto repair shop"), sekundárne „Auto repair shop", „Oil change service", „Wheel alignment service". Po zmene primárnej kategórie firmy bežne skáču v rankingu na nišové dopyty.</div>
<div class="warn">Zmena primárnej kategórie je najsilnejší jednorazový zásah do profilu — rob ju premyslene a sleduj dopad 2–4 týždne. Príliš časté zmeny môžu spustiť opätovnú verifikáciu.</div>
<div class="tip">Kategórie odomykajú funkcie profilu: reštaurácie dostanú menu a rezervácie, hotely majú úplne iný typ profilu, servisy dostanú zoznam služieb. Aj preto je správna kategória kľúčová.</div>`,
      checklist: ['Viem, koľko kategórií môže mať profil (1+9)', 'Primárnu kategóriu volím podľa core biznisu a konkurencie v Local Packu', 'Odstránil som nerelevantné kategórie', 'Viem, že kategórie odomykajú špeciálne funkcie profilu'],
      quiz: [
        { q: 'Koľko kategórií môže mať GBP profil?', o: ['Iba 1', '1 primárnu + max 9 sekundárnych', 'Neobmedzene', '3 primárne'], c: 1, e: 'Jedna primárna (najsilnejšia váha) a až deväť sekundárnych.' },
        { q: 'Pri výbere primárnej kategórie platí:', o: ['Čím všeobecnejšia, tým lepšie', 'Čo najkonkrétnejšia kategória zodpovedajúca core biznisu', 'Vždy „Professional services"', 'Vyber si vlastný názov kategórie'], c: 1, e: 'Konkrétnejšia kategória = presnejšia relevancia na nišové dopyty. Vlastné kategórie neexistujú.' },
        { q: 'Nerelevantné sekundárne kategórie:', o: ['Zlepšujú viditeľnosť na všetko', 'Rozrieďujú relevanciu a môžu spôsobiť problémy', 'Sú povinné', 'Zvyšujú počet recenzií'], c: 1, e: 'Kategórie, ktoré firma reálne nerobí, škodia relevancii a môžu spustiť re-verifikáciu profilu.' },
        { q: 'Ako zistíš vhodnú primárnu kategóriu pre klienta?', o: ['Hodíš si mincou', 'Analyzuješ kategórie konkurencie v Local Packu na cieľové dopyty', 'Vyberieš prvú v abecede', 'Použiješ vždy rovnakú pre všetkých klientov'], c: 1, e: 'Konkurenčná analýza Local Packu je štandardný postup — víťazné firmy prezrádzajú, čo algoritmus na daný dopyt „chce".' },
        { q: 'Prečo kategórie ovplyvňujú aj funkcie profilu?', o: ['Neovplyvňujú', 'Google podľa kategórie odomyká špecifické funkcie (menu, rezervácie, služby…)', 'Určujú cenu reklamy', 'Menia jazyk profilu'], c: 1, e: 'Typ kategórie určuje dostupné moduly — reštaurácia má menu, hotel ceny izieb, servis zoznam služieb.' },
      ] },

    { id: 'gbp-2-5', title: 'Produkty a služby na profile', min: 20,
      theory: `<p>Sekcie <strong>Products</strong> a <strong>Services</strong> premieňajú profil na mini-katalóg a zároveň dodávajú Googlu relevančné signály (a materiál na justifications).</p>
<h3>Services (Služby)</h3>
<p>Zoznam služieb zoskupený podľa kategórií profilu. Ku každej službe: názov, popis (do 300 znakov), cena/od-ceny. Google časť služieb predvypĺňa — skontroluj ich a doplň vlastné. Ideálne pokry všetko, na čo chceš byť nachádzaný: „výmena rozvodov", „čistenie klimatizácie"…</p>
<h3>Products (Produkty)</h3>
<p>Vizuálne karty s fotkou, názvom, kategóriou, cenou, popisom a CTA (odkaz na web/objednávku). Zobrazujú sa výrazne v Knowledge Paneli (karusel). Skvelé aj pre služby — „produktom" môže byť balík („Jarná prehliadka klimatizácie — 49 €").</p>
<div class="tip">Products sú jedna z najviac podceňovaných sekcií. Väčšina konkurencie ich nevypĺňa — pritom vizuálne dominujú panelu a vedú kliky priamo na konverznú stránku. Pri auditoch to býva quick win #1.</div>
<div class="warn">Regulované odvetvia (zdravotníctvo, financie…) majú sekcie obmedzené. A nezabudni: obsah musí dodržiavať pravidlá — žiadne zakázané produkty, klamlivé ceny či keyword stuffing v názvoch.</div>
<div class="ex">Kaderníctvo pridá produkty: „Dámsky strih — od 25 €", „Balayage — od 80 €", „Pánsky strih — 15 €", každý s peknou fotkou a odkazom na online rezerváciu. Panel zrazu vyzerá ako výklad — a rezervácie rastú.</div>`,
      checklist: ['Vyplnil som služby pre všetky kategórie profilu', 'Ku kľúčovým službám som pridal popisy s prirodzenými kľúčovými slovami', 'Vytvoril som aspoň 5 produktových kariet s fotkami a CTA', 'Skontroloval som predvyplnené služby od Googlu'],
      quiz: [
        { q: 'Sekcia Products sa zobrazuje:', o: ['Len v administrácii', 'Ako vizuálny karusel v Knowledge Paneli', 'Len v platených reklamách', 'Iba v aplikácii Maps pre Android'], c: 1, e: 'Produktové karty tvoria nápadný vizuálny blok priamo v profile firmy.' },
        { q: 'Môže služba (napr. strih vlasov) figurovať ako „produkt"?', o: ['Nie, len fyzický tovar', 'Áno, balíčky služieb sú bežná a účinná prax', 'Len so súhlasom Googlu', 'Len pre e-shopy'], c: 1, e: 'Products bežne slúžia aj na balíky služieb s cenou a CTA — výborný konverzný prvok.' },
        { q: 'Popis jednotlivej služby v sekcii Services má limit:', o: ['100 znakov', '300 znakov', '750 znakov', '1500 znakov'], c: 1, e: 'Každá služba môže mať popis do 300 znakov — priestor na prirodzené kľúčové slová.' },
        { q: 'Prečo vypĺňať služby čo najúplnejšie?', o: ['Zvyšuje to počet recenzií', 'Dodáva relevančné signály a materiál pre justifications', 'Je to povinné pre verifikáciu', 'Znižuje to CPC'], c: 1, e: 'Služby pomáhajú Googlu pochopiť ponuku firmy a často sa objavia ako justification („Poskytuje: čistenie klimatizácie").' },
        { q: 'Predvyplnené služby od Googlu by si mal:', o: ['Ignorovať', 'Skontrolovať, upraviť a doplniť vlastnými', 'Všetky zmazať', 'Nahlásiť ako chybu'], c: 1, e: 'Google služby predvypĺňa podľa kategórie — treba ich prejsť, vypnúť nerelevantné a doplniť reálne.' },
      ] },

    { id: 'gbp-2-6', title: 'Fotografie, videá, logo a cover', min: 25,
      theory: `<p>Vizuál rozhoduje o prvom dojme. Profily s kvalitnými fotkami získavajú podľa Googlu výrazne viac žiadostí o trasu a preklikov na web.</p>
<h3>Typy vizuálov</h3>
<ul>
<li><strong>Logo</strong> — štvorec min. 250×250 px; zobrazuje sa pri odpovediach na recenzie a príspevkoch.</li>
<li><strong>Cover fotka</strong> — 16:9; „návrh" hlavnej fotky (Google si finálnu hlavnú fotku vyberá sám podľa výkonu!).</li>
<li><strong>Fotky prevádzky</strong>: exteriér (rozpoznateľnosť pri príchode — rôzne uhly aj denná doba), interiér (atmosféra), tím, produkty/práca, „at work" zábery.</li>
<li><strong>Videá</strong> — do 30 s, do 75 MB, min. 720p.</li>
</ul>
<h3>Best practices</h3>
<ul>
<li>Formát JPG/PNG, min. 720×720 px, reálne fotky (žiadne stock!).</li>
<li>Pravidelnosť &gt; kvantita jednorazovo: ideálne pár nových fotiek mesačne — signál živého profilu.</li>
<li>Fotky pridávajú aj zákazníci — nedajú sa mazať svojvoľne, len nahlásiť pri porušení pravidiel.</li>
<li>Geotagging fotiek (EXIF) sa dlhodobo považuje za mýtus — nespoliehaj sa naň, dôležitejší je obsah a pravidelnosť.</li>
</ul>
<div class="warn">Stock fotky pôsobia falošne, používatelia ich rozoznajú a Google ich môže odstrániť. Autenticita vyhráva — aj mierne amatérska reálna fotka je lepšia než dokonalý stock.</div>
<div class="tip">Sprav klientovi „foto scenár": 20 povinných záberov (fasáda z 3 uhlov, vstup, 5× interiér, 5× práca/produkty, 3× tím…). Jediné dopoludnie s telefónom vyrieši obsah na pol roka.</div>`,
      checklist: ['Nahraté logo a cover v správnych rozmeroch', 'Min. 10 reálnych fotiek: exteriér, interiér, tím, produkty', 'Nastavený proces pravidelného pridávania fotiek', 'Žiadne stock fotky na profile'],
      quiz: [
        { q: 'Hlavnú fotku profilu v konečnom dôsledku:', o: ['Určuje majiteľ natvrdo', 'Vyberá Google (cover je len preferencia)', 'Vyberajú zákazníci hlasovaním', 'Neexistuje hlavná fotka'], c: 1, e: 'Cover je „návrh" — Google si hlavnú fotku volí algoritmicky, často podľa výkonu a kvality.' },
        { q: 'Maximálna dĺžka videa na GBP je:', o: ['10 sekúnd', '30 sekúnd', '2 minúty', '10 minút'], c: 1, e: 'Videá majú limit 30 sekúnd, 75 MB a minimálne rozlíšenie 720p.' },
        { q: 'Prečo sa neodporúčajú stock fotky?', o: ['Sú príliš drahé', 'Pôsobia neautenticky a Google ich môže odstrániť', 'Majú zlé rozlíšenie', 'Spomaľujú profil'], c: 1, e: 'GBP má zobrazovať reálnu prevádzku. Stock fotky porušujú zmysel profilu a podkopávajú dôveru.' },
        { q: 'Fotku, ktorú pridal zákazník a je nevhodná, môžeš:', o: ['Okamžite zmazať v administrácii', 'Nahlásiť Googlu na odstránenie pri porušení pravidiel', 'Prefarbiť', 'Skryť pred verejnosťou'], c: 1, e: 'Zákaznícke fotky majiteľ nemaže — dajú sa len nahlásiť (report) a Google posúdi porušenie pravidiel.' },
        { q: 'Lepšia stratégia pridávania fotiek je:', o: ['100 fotiek naraz pri založení a potom nič', 'Pravidelne niekoľko nových fotiek mesačne', 'Len 1 fotka loga', 'Fotky pridávať iba v decembri'], c: 1, e: 'Pravidelný prísun čerstvého obsahu signalizuje aktívny, živý profil — a udržiava ho atraktívny.' },
      ] },
  ]},

  /* ── SEKCIA 3: OBSAH A INTERAKCIE ── */
  { id: 'gbp-s3', title: 'Obsah a interakcie so zákazníkmi', lessons: [

    { id: 'gbp-3-1', title: 'Google Posts (Príspevky)', min: 20,
      theory: `<p><strong>Google Posts</strong> sú krátke príspevky zobrazované priamo v profile firmy — mini sociálna sieť vo vyhľadávaní.</p>
<h3>Typy príspevkov</h3>
<ul>
<li><strong>Update (Novinka)</strong> — bežný príspevok; text do 1 500 znakov + fotka + CTA tlačidlo (Zavolať, Objednať, Viac info…).</li>
<li><strong>Offer (Ponuka)</strong> — akcia s dátumom platnosti, kupónom a podmienkami; zvýraznená visačkou.</li>
<li><strong>Event (Udalosť)</strong> — s názvom, dátumom a časom konania.</li>
</ul>
<h3>Na čo Posts reálne fungujú</h3>
<p>Priamy vplyv na ranking je slabý až žiadny — ich sila je v <strong>konverzii a čerstvosti</strong>: profil pôsobí živo, ponuky priťahujú pozornosť v Knowledge Paneli a CTA vedie na web. Príspevky typu Update sa archivujú (staršie ~6 mesiacov sa skrývajú), Offers po skončení platnosti zmiznú.</p>
<h3>Osvedčený rytmus</h3>
<ul>
<li>1–2 príspevky týždenne (minimum 2/mesiac).</li>
<li>Formát: reálna fotka + krátky úderný text + jasné CTA.</li>
<li>Témy: akcie, nové produkty, sezónne služby, zákulisie, recenzia týždňa, FAQ odpovede.</li>
</ul>
<div class="warn">Príspevky prechádzajú moderáciou — zamietajú sa najmä pre: telefónne čísla v texte, nekvalitné/nesúvisiace fotky, zakázané témy (alkohol, tabak, hazard…) a klamlivé ponuky.</div>
<div class="tip">Recykluj obsah: to, čo klient publikuje na Facebooku/Instagrame, uprav do formátu Posts. Nulové extra náklady na tvorbu obsahu — a profil žije.</div>`,
      checklist: ['Poznám 3 typy príspevkov a ich použitie', 'Viem, prečo Posts pomáhajú konverzii viac než rankingu', 'Mám pripravený mesačný plán príspevkov', 'Viem, čo najčastejšie spôsobuje zamietnutie príspevku'],
      quiz: [
        { q: 'Ktorý typ príspevku má dátum platnosti a visačku akcie?', o: ['Update', 'Offer', 'Event', 'Story'], c: 1, e: 'Offer je špeciálny formát pre časovo obmedzené ponuky — s kupónom a podmienkami.' },
        { q: 'Hlavný prínos Google Posts je:', o: ['Priame výrazné zlepšenie rankingu', 'Konverzia a dojem živého profilu', 'Zvýšenie Domain Authority', 'Náhrada webu'], c: 1, e: 'Posts primárne zvyšujú engagement a konverziu v paneli; rankingový efekt je zanedbateľný.' },
        { q: 'Maximálna dĺžka textu príspevku je:', o: ['280 znakov', '750 znakov', '1500 znakov', 'Neobmedzená'], c: 2, e: 'Limit je 1 500 znakov, viditeľných bez rozkliknutia je ale len prvých ~75–100 — najdôležitejšie patrí na začiatok.' },
        { q: 'Častý dôvod zamietnutia príspevku moderáciou je:', o: ['Použitie emoji', 'Telefónne číslo v texte príspevku', 'Príliš krátky text', 'Publikovanie v pondelok'], c: 1, e: 'Telefónne čísla v texte Posts pravidlá zakazujú — na kontakt slúži CTA tlačidlo a údaje profilu.' },
        { q: 'Rozumný publikačný rytmus pre Posts je:', o: ['10× denne', '1–2× týždenne', '1× ročne', 'Posts sa neoplatí publikovať'], c: 1, e: 'Konzistencia 1–2 príspevkov týždenne udržiava profil čerstvý bez spamovania.' },
      ] },

    { id: 'gbp-3-2', title: 'Otázky a odpovede (Q&A)', min: 15,
      theory: `<p>Sekcia <strong>Questions & Answers</strong> umožňuje komukoľvek položiť firme verejnú otázku — a <strong>komukoľvek</strong> na ňu odpovedať. To je príležitosť aj riziko.</p>
<h3>Prečo je Q&A dôležité</h3>
<ul>
<li>Odpovede vidia všetci budúci zákazníci — je to verejné FAQ.</li>
<li>Ak firma neodpovedá, odpovie „komunita" — často nesprávne.</li>
<li>Otázka s najviac lajkami sa zobrazuje priamo v Knowledge Paneli.</li>
</ul>
<h3>Profesionálna správa Q&A</h3>
<ol>
<li><strong>Seed vlastné FAQ:</strong> firma smie sama položiť otázky a hneď na ne odpovedať (z profilu firmy). Naplň sekciu 5–10 najčastejšími otázkami: parkovanie, platba kartou, objednávanie, bezbariérovosť…</li>
<li><strong>Zapni notifikácie</strong> a odpovedaj do 24 hodín.</li>
<li><strong>Lajkuj správne odpovede</strong>, nech sa zobrazujú navrchu.</li>
<li>Nevhodné otázky/odpovede <strong>nahlasuj</strong>.</li>
</ol>
<div class="warn">Neodpovedaná otázka „Máte otvorené aj v nedeľu?" so zlou odpoveďou od náhodného používateľa reálne stojí firmu zákazníkov. Q&A monitoring patrí do každého mesačného servisu profilu.</div>
<div class="ex">Reštaurácia si sama položí: „Dá sa u vás zaparkovať?" → odpovie: „Áno, 20 miest zdarma priamo pri vchode." Otázka časom nazbiera lajky a visí v paneli ako mini-reklama na parkovanie.</div>`,
      checklist: ['Naplnil som Q&A vlastnými 5–10 otázkami s odpoveďami', 'Mám zapnuté notifikácie na nové otázky', 'Odpovedám do 24 hodín', 'Viem nahlásiť nevhodný obsah'],
      quiz: [
        { q: 'Kto môže odpovedať na otázky v Q&A sekcii profilu?', o: ['Len majiteľ profilu', 'Ktokoľvek — vrátane bežných používateľov', 'Len Google', 'Len overení zákazníci'], c: 1, e: 'Q&A je verejné — odpovedať môže hocikto. Preto musí firma sekciu aktívne spravovať.' },
        { q: 'Smie firma sama položiť otázku na vlastnom profile a odpovedať na ňu?', o: ['Nie, je to zakázané', 'Áno, „seedovanie" FAQ je legitímna odporúčaná prax', 'Len raz ročne', 'Len cez podporu Googlu'], c: 1, e: 'Google túto prax výslovne pripúšťa — je to spôsob, ako naplniť profil užitočným FAQ.' },
        { q: 'Ktorá otázka sa zobrazuje priamo v Knowledge Paneli?', o: ['Najnovšia', 'Tá s najväčším počtom lajkov', 'Najdlhšia', 'Náhodná'], c: 1, e: 'Otázky radí počet palcov hore — preto sa oplatí lajkovať správne odpovede.' },
        { q: 'Aká je rozumná reakčná doba na novú otázku?', o: ['Do 24 hodín', 'Do mesiaca', 'Odpovedať netreba', 'Do roka'], c: 0, e: 'Rýchla odpoveď predíde nesprávnym odpovediam komunity a pôsobí profesionálne.' },
        { q: 'Najväčšie riziko ignorovania Q&A je:', o: ['Pokuta', 'Nesprávne odpovede od cudzích ľudí odrádzajúce zákazníkov', 'Zmazanie profilu', 'Strata verifikácie'], c: 1, e: 'Ak neodpovie firma, odpovie niekto iný — a mylná informácia môže odradiť reálnych zákazníkov.' },
      ] },

    { id: 'gbp-3-3', title: 'Recenzie: stratégia získavania a odpovedania', min: 30,
      theory: `<p>Recenzie sú <strong>najsilnejší prominence signál</strong> aj najsilnejší konverzný prvok. Algoritmus zohľadňuje: počet, priemer, čerstvosť, rýchlosť pribúdania (velocity), kľúčové slová v textoch aj odpovede firmy.</p>
<h3>Ako recenzie eticky získavať</h3>
<ul>
<li><strong>Pýtaj si ich!</strong> Najväčší dôvod, prečo firmy nemajú recenzie: nikoho nepožiadali. Ideálny moment: hneď po pozitívnej skúsenosti.</li>
<li><strong>Review link / QR kód</strong> — GBP generuje priamy odkaz na napísanie recenzie. Daj ho na účtenku, vizitku, do e-mailu, SMS.</li>
<li><strong>Systematizuj:</strong> automatický follow-up po nákupe/službe.</li>
<li>Povolené je plošné žiadanie všetkých zákazníkov. <strong>Zakázané:</strong> kupovanie recenzií, výmena za zľavu/darček, review gating (filtrovanie — spokojných poslať na Google, nespokojných do formulára), recenzie od zamestnancov a rodiny.</li>
</ul>
<h3>Odpovedanie na recenzie</h3>
<ul>
<li>Odpovedaj na <strong>všetky</strong> — aj pozitívne (krátko, osobne, s vďakou).</li>
<li>Odpovede číta budúci zákazník — píšeš pre neho, nie pre recenzenta.</li>
<li>Prirodzene spomeň službu („Ďakujeme, že ste si vybrali našu detailingovú umyváreň…") — texty recenzií a odpovedí sú relevančný signál.</li>
</ul>
<div class="warn">Review gating je výslovne zakázaný a nástroje, ktoré ho robia, ohrozujú profil. Rovnako hromadný nárast recenzií z jednej IP / počas jedného dňa spúšťa spam filter — recenzie potom miznú.</div>
<div class="tip">Nauč klienta „vetu na pýtanie recenzie": „Pomohlo by nám, keby ste nám nechali recenziu na Googli — tu je QR kód, zaberie to minútu." Konverzia žiadostí naživo je násobne vyššia než e-mailom.</div>`,
      checklist: ['Mám vygenerovaný review link a QR kód', 'Nastavený systém žiadania recenzií po každej zákazke', 'Odpovedám na 100 % recenzií', 'Viem, čo je review gating a prečo je zakázaný'],
      quiz: [
        { q: 'Review gating znamená:', o: ['Zbieranie recenzií cez QR kód', 'Filtrovanie — spokojní idú na Google, nespokojní do súkromného formulára', 'Odpovedanie na recenzie', 'Zoradenie recenzií podľa hviezdičiek'], c: 1, e: 'Selektívne smerovanie len spokojných zákazníkov na Google je porušením pravidiel Googlu.' },
        { q: 'Ktorá praktika je POVOLENÁ?', o: ['Zľava výmenou za recenziu', 'Plošné požiadanie všetkých zákazníkov o recenziu', 'Recenzie od zamestnancov', 'Nákup recenzií od agentúry'], c: 1, e: 'Žiadať o recenzie sa smie — plošne a bez odmeny. Incentivizácia, kupovanie a recenzie zainteresovaných osôb sú zakázané.' },
        { q: 'Algoritmus pri recenziách zohľadňuje:', o: ['Iba priemerné hodnotenie', 'Počet, priemer, čerstvosť, texty aj odpovede', 'Iba počet', 'Len recenzie s fotkou'], c: 1, e: 'Ranking vníma komplex signálov vrátane tempa pribúdania a kľúčových slov v textoch.' },
        { q: 'Pre koho v skutočnosti píšeš odpoveď na negatívnu recenziu?', o: ['Pre právnika', 'Pre budúcich zákazníkov, ktorí si ju prečítajú', 'Pre Google support', 'Pre konkurenciu'], c: 1, e: 'Odpoveď je verejná vizitka firmy — číta ju každý budúci zákazník pri rozhodovaní.' },
        { q: 'Náhly príval 30 recenzií za jeden deň z firemnej Wi-Fi pravdepodobne spôsobí:', o: ['Rast rankingu', 'Zásah spam filtra a miznutie recenzií', 'Ocenenie od Googlu', 'Nič'], c: 1, e: 'Neprirodzený vzorec (rovnaká IP, krátky čas) spúšťa filter — recenzie sa nezobrazia alebo zmiznú.' },
      ] },

    { id: 'gbp-3-4', title: 'Negatívne recenzie a krízová komunikácia', min: 25,
      theory: `<p>Negatívne recenzie prídu vždy. Rozdiel medzi amatérom a profesionálom je v <strong>reakcii</strong>.</p>
<h3>Framework odpovede na negatívnu recenziu (4A)</h3>
<ol>
<li><strong>Acknowledge</strong> — poďakuj za spätnú väzbu, oslov menom.</li>
<li><strong>Apologize</strong> — ospravedlň sa za skúsenosť (nie nutne priznanie viny: „Mrzí nás, že vaša návšteva nesplnila očakávania").</li>
<li><strong>Act</strong> — uveď, čo s tým robíte („preverili sme postup, doplnili sme školenie").</li>
<li><strong>Aside</strong> — presuň detail offline („zavolajte nám na…, radi to vyriešime").</li>
</ol>
<p>Zásady: odpovedz <strong>do 24–48 h</strong>, nikdy sa nehádaj, nezverejňuj údaje zákazníka (GDPR aj pravidlá!), zostaň vecný a ľudský. Budúci zákazník hodnotí teba, nie recenzenta.</p>
<h3>Kedy sa dá recenzia odstrániť</h3>
<p>Len ak porušuje pravidlá Googlu: spam/fake, konflikt záujmov (konkurencia, ex-zamestnanec), nenávistný prejav, vulgarizmy, off-topic, osobné údaje. <strong>„Je nepravdivá" alebo „nespravodlivá" nie je dôvod.</strong> Postup: nahlásiť v profile → počkať (dni až týždne) → prípadne odvolanie cez Reviews Management Tool → pri právnom obsahu formulár na právne nahlásenie.</p>
<div class="warn">Nikdy neodpovedaj v afekte a nikdy neprezraď, že recenzent bol/nebol zákazníkom konkrétneho dňa s konkrétnou objednávkou — porušuješ tým ochranu údajov a eskaluješ konflikt.</div>
<div class="ex">1★ „Čakal som 40 minút." → „Dobrý deň, pán Novák, ďakujeme za spätnú väzbu a ospravedlňujeme sa za dlhé čakanie. V piatky večer posilňujeme tím, aby sa to neopakovalo. Ozvite sa nám prosím na info@…, radi vám to vynahradíme."</div>`,
      checklist: ['Ovládam 4A framework odpovede', 'Viem, ktoré recenzie sa dajú nahlásiť a ktoré nie', 'Poznám postup nahlásenia a odvolania', 'Mám šablóny odpovedí pre bežné scenáre'],
      quiz: [
        { q: 'Recenziu „služba sa mi nepáčila, 1 hviezdička" možno odstrániť:', o: ['Áno, je negatívna', 'Nie — negatívny názor zákazníka pravidlá neporušuje', 'Áno, po zaplatení poplatku', 'Áno, ak má firma veľa 5★ recenzií'], c: 1, e: 'Google maže len recenzie porušujúce pravidlá (spam, konflikt záujmov, vulgarizmy…). Nespokojnosť je legitímny obsah.' },
        { q: 'Prvý krok pri odpovedi na negatívnu recenziu podľa 4A:', o: ['Obhajoba firmy', 'Poďakovanie a uznanie spätnej väzby (Acknowledge)', 'Právna vyhrážka', 'Ignorovanie'], c: 1, e: '4A: Acknowledge → Apologize → Act → Aside. Začíname uznaním spätnej väzby.' },
        { q: 'Recenzia od ex-zamestnanca, ktorý sa mstí, sa dá nahlásiť ako:', o: ['Off-topic', 'Konflikt záujmov', 'Nedá sa nahlásiť', 'Duplicita'], c: 1, e: 'Recenzie súčasných/bývalých zamestnancov a konkurencie spadajú pod konflikt záujmov — legitímny dôvod na nahlásenie.' },
        { q: '„Aside" v 4A frameworku znamená:', o: ['Zmazať recenziu', 'Presunúť riešenie detailov do súkromného kanála', 'Odpovedať s odstupom mesiaca', 'Odpovedať anonymne'], c: 1, e: 'Detailné riešenie patrí offline (telefón, e-mail) — verejná odpoveď zostáva stručná a profesionálna.' },
        { q: 'V odpovedi na recenziu je zakázané:', o: ['Ospravedlniť sa', 'Zverejniť osobné údaje či detaily objednávky zákazníka', 'Ponúknuť riešenie', 'Osloviť menom, ktorým sa recenzent sám podpísal'], c: 1, e: 'Zverejnenie údajov zákazníka porušuje pravidlá aj GDPR a konflikt len eskaluje.' },
      ] },

    { id: 'gbp-3-5', title: 'Spam, falošné profily a Redressal', min: 20,
      theory: `<p>Lokálne výsledky sú plné spamu — a jeho čistenie je legitímna (a klientmi milovaná) SEO taktika: keď zmizne podvodná konkurencia, tvoj klient stúpa.</p>
<h3>Typické formy map spamu</h3>
<ul>
<li><strong>Keyword stuffing v názve</strong> — „Zámočník NONSTOP Bratislava lacno 24/7" (reálny názov: „Peter Kováč").</li>
<li><strong>Falošné adresy</strong> — virtuálne kancelárie, byty, neexistujúce pobočky na pokrytie mesta.</li>
<li><strong>Duplicitné profily</strong> tej istej firmy pre viac kľúčových slov.</li>
<li><strong>Fake recenzie</strong> — kupované siete recenzentov.</li>
<li><strong>Lead-gen podvody</strong> — profily preposielajúce dopyty tomu, kto zaplatí (časté: zámočníci, odťahovky, sťahovanie).</li>
</ul>
<h3>Ako spam nahlásiť</h3>
<ol>
<li><strong>Suggest an edit</strong> priamo na Maps — na úpravu názvu (najrýchlejšie pri keyword stuffingu).</li>
<li><strong>Business Redressal Complaint Form</strong> — oficiálny formulár Googlu na komplexné podnety s dôkazmi (screenshoty, fotky miesta, web).</li>
<li>Fake recenzie — nahlásiť jednotlivo pri recenzii.</li>
</ol>
<div class="tip">Sprav klientovi „spam audit" konkurencie: porovnaj názvy profilov v Local Packu s reálnymi názvami na weboch. Každý vyčistený spamer = posun o pozíciu vyššie zadarmo.</div>
<div class="warn">Nikdy spam nenapodobňuj, ani keď „všetkým v branži prechádza". Vlny čistenia prichádzajú nepravidelne a strata profilu (hard suspension) znamená týždne bez najväčšieho zdroja zákazníkov.</div>`,
      checklist: ['Rozpoznám 5 hlavných foriem map spamu', 'Viem použiť Suggest an edit', 'Poznám Redressal Complaint Form', 'Urobil som spam audit aspoň jedného odvetvia'],
      quiz: [
        { q: '„Kľúčové slová v názve profilu navyše oproti reálnemu názvu" sú:', o: ['Odporúčaná optimalizácia', 'Porušenie pravidiel (keyword stuffing)', 'Povinnosť', 'Platená funkcia'], c: 1, e: 'Názov musí zodpovedať reálnemu názvu firmy. Stuffing je najrozšírenejší map spam — a dá sa nahlásiť.' },
        { q: 'Oficiálny formulár na komplexné nahlásenie podvodných profilov sa volá:', o: ['Google Spam Fighter', 'Business Redressal Complaint Form', 'Maps Cleanup Tool', 'Profile Guard'], c: 1, e: 'Redressal form je určený na podložené podnety proti porušovaniu pravidiel na Maps.' },
        { q: 'Prečo sa čistenie spamu oplatí tvojmu klientovi?', o: ['Google vypláca odmeny', 'Odstránená podvodná konkurencia = posun klienta vyššie', 'Zvyšuje počet recenzií', 'Znižuje cenu Ads'], c: 1, e: 'Local Pack má 3 miesta — každý odstránený spamer uvoľňuje pozíciu poctivým firmám.' },
        { q: 'Najrýchlejší nástroj na opravu spamového názvu profilu je:', o: ['Súdna žaloba', 'Suggest an edit priamo na Maps', 'E-mail generálnemu riaditeľovi Googlu', 'Nový vlastný profil'], c: 1, e: 'Návrh úpravy názvu cez Maps býva pri jasnom rozpore s realitou schválený prekvapivo rýchlo.' },
        { q: 'Hard suspension profilu znamená:', o: ['Profil je skrytý z vyhľadávania/Maps', 'Zníženie počtu fotiek', 'Zákaz odpovedať na recenzie', 'Spomalenie načítania profilu'], c: 0, e: 'Pri hard suspension profil z Maps zmizne — firma prichádza o celý lokálny kanál až do úspešného odvolania.' },
      ] },
  ]},

  /* ── SEKCIA 4: LOKÁLNE SEO ── */
  { id: 'gbp-s4', title: 'Lokálne SEO', lessons: [

    { id: 'gbp-4-1', title: 'NAP konzistencia a citácie', min: 25,
      theory: `<p><strong>Citácia</strong> = výskyt firemných údajov (NAP) na externom webe: katalógy firiem, mapové služby, oborové portály, médiá. Citácie potvrdzujú Googlu, že firma existuje, kde sídli a čím je — budujú <strong>Prominence a dôveru v dáta</strong>.</p>
<h3>Typy citácií</h3>
<ul>
<li><strong>Štruktúrované</strong> — profily v katalógoch (Zoznam.sk, Azet, Firmy.sk, Yelp, Foursquare, Apple Maps, Bing Places…).</li>
<li><strong>Neštruktúrované</strong> — zmienky v článkoch, blogoch, novinách.</li>
</ul>
<h3>Citation building v praxi</h3>
<ol>
<li>Zisti existujúce citácie (vyhľadaj názov + telefón, názov + adresa; nástroje: BrightLocal, Whitespark).</li>
<li><strong>Oprav nekonzistencie</strong> — staré adresy a čísla sú horšie než žiadna citácia.</li>
<li>Vybuduj základný balík: top národné katalógy + oborové (lekári → lekárske portály) + lokálne (mestské weby, obchodná komora).</li>
<li>Master NAP dokument — jediný zdroj pravdy pre všetky registrácie.</li>
</ol>
<div class="warn">Po presťahovaní firmy je aktualizácia citácií kritická — staré adresy v katalógoch dokážu rozbiť dôveru v novú adresu a s ňou aj ranking. Toto je štandardná položka „relocation checklistu".</div>
<div class="tip">V slovenskom/českom prostredí má citation building menšiu váhu než v USA, ale základný balík (10–20 kvalitných katalógov) + bezchybná konzistencia je stále lacný a merateľný základ. Kvalita &gt; kvantita: 500 spamových katalógov nepomôže.</div>`,
      checklist: ['Mám master NAP dokument', 'Zauditoval som existujúce citácie klienta', 'Opravil som nekonzistencie', 'Vybudoval som základný balík katalógov vrátane Bing Places a Apple Maps'],
      quiz: [
        { q: 'Štruktúrovaná citácia je:', o: ['Zmienka v novinovom článku', 'Profil firmy v katalógu s poliami pre NAP', 'Recenzia na Google', 'Odkaz z PPC reklamy'], c: 1, e: 'Štruktúrované citácie sú záznamy v adresároch/katalógoch; neštruktúrované sú voľné zmienky v texte.' },
        { q: 'Horšie než chýbajúca citácia je:', o: ['Citácia so starou adresou/telefónom', 'Citácia v cudzom jazyku', 'Krátka citácia', 'Citácia bez fotky'], c: 0, e: 'Nekonzistentné údaje aktívne škodia dôvere algoritmu v dáta o firme.' },
        { q: 'Prvý krok citation buildingu je:', o: ['Registrácia do 500 katalógov', 'Audit existujúcich citácií a oprava nekonzistencií', 'Kúpa odkazov', 'Zmena názvu firmy'], c: 1, e: 'Najprv vyčisti existujúce záznamy — až potom má zmysel budovať nové.' },
        { q: 'Pri citáciách platí:', o: ['Čím viac katalógov, tým lepšie, kvalita nerozhoduje', 'Kvalita a relevancia katalógov > kvantita', 'Citácie sú úplne zbytočné', 'Počítajú sa len platené katalógy'], c: 1, e: 'Hŕstka kvalitných a oborovo relevantných citácií prekoná stovky spamových adresárov.' },
        { q: 'Ktorý úkon je kritický po zmene sídla firmy?', o: ['Zmena loga', 'Aktualizácia adresy vo všetkých citáciách', 'Zmazanie recenzií', 'Nová cover fotka'], c: 1, e: 'Staré adresy roztrúsené po webe podkopávajú novú adresu — relocation vyžaduje systematickú aktualizáciu citácií.' },
      ] },

    { id: 'gbp-4-2', title: 'On-page lokálne SEO a landing pages', min: 30,
      theory: `<p>GBP nefunguje vo vákuu — <strong>web firmy je kotva profilu</strong>. Autorita a relevancia webu sa prelieva do lokálneho rankingu.</p>
<h3>Lokálna on-page optimalizácia</h3>
<ul>
<li><strong>Title & H1</strong>: služba + lokalita („Autoservis Nitra | AutoFix").</li>
<li><strong>NAP vo footeri</strong> — zhodný s profilom, ideálne klikateľný telefón.</li>
<li><strong>LocalBusiness schema</strong> (JSON-LD): name, address, telephone, openingHours, geo, sameAs → prepája web s profilom strojovo čitateľne.</li>
<li><strong>Vložená Google mapa</strong> na kontaktnej stránke.</li>
<li><strong>Lokálny obsah</strong>: referencie z okolia, prípadové štúdie („rekonštrukcia kúpeľne v Petržalke"), lokálne FAQ.</li>
</ul>
<h3>Location pages pre viac pobočiek</h3>
<p>Každá pobočka má mať <strong>vlastnú unikátnu podstránku</strong>: /pobocky/bratislava, /pobocky/kosice. Obsah: unikátny text (nie kópia!), NAP pobočky, mapa, fotky pobočky, tím, recenzie pobočky, otváracie hodiny, schema. GBP profil pobočky odkazuje presne na jej stránku.</p>
<h3>Service pages</h3>
<p>Pre každú hlavnú službu samostatná stránka („výmena autoskiel", „geometria kolies") — tá potom cieli na dopyty „služba + mesto" a dodáva profilu relevanciu (aj justifications „Na webe uvádza…").</p>
<div class="warn">Doorway pages — desiatky takmer identických stránok „služba + každé mesto v okrese" bez reálnej prítomnosti — sú porušením pravidiel Googlu a po core updatoch pravidelne padajú. Stránku si zaslúžia len lokality, kde má firma reálnu pôsobnosť a unikátny obsah.</div>`,
      checklist: ['Title/H1 obsahujú službu + lokalitu', 'NAP vo footeri sa zhoduje s profilom', 'Implementovaná LocalBusiness schema', 'Každá pobočka má unikátnu location page', 'Hlavné služby majú vlastné stránky'],
      quiz: [
        { q: 'LocalBusiness schema slúži na:', o: ['Zrýchlenie webu', 'Strojovo čitateľné prepojenie údajov firmy medzi webom a Googlom', 'Blokovanie botov', 'Meranie konverzií'], c: 1, e: 'JSON-LD markup pomáha Googlu spárovať a dôverovať údajom o firme (NAP, hodiny, geo).' },
        { q: 'Firma s pobočkami v 3 mestách má mať:', o: ['Jednu spoločnú kontaktnú stránku', 'Unikátnu podstránku pre každú pobočku', 'Tri samostatné weby', 'Iba GBP profily bez webu'], c: 1, e: 'Location pages s unikátnym obsahom sú štandard — každý profil odkazuje na „svoju" stránku.' },
        { q: 'Doorway pages sú:', o: ['Stránky o vchodových dverách', 'Množstvo takmer identických stránok pre lokality bez reálnej prítomnosti — porušenie pravidiel', 'Povinná súčasť lokálneho SEO', 'Stránky s otváracími hodinami'], c: 1, e: 'Masovo generované mestské stránky bez pridanej hodnoty Google penalizuje.' },
        { q: 'Správny title pre lokálnu službu vyzerá:', o: ['„Domov"', '„Autoservis Nitra | AutoFix"', '„Vitajte na našej stránke"', '„AutoFix AutoFix AutoFix Nitra Nitra"'], c: 1, e: 'Služba + lokalita + značka — prirodzene, bez stuffingu.' },
        { q: 'Service pages (stránky služieb) pomáhajú lokálnemu SEO, lebo:', o: ['Zvyšujú počet reklám', 'Cielia dopyty „služba + mesto" a dodávajú profilu relevanciu', 'Skrývajú obsah pred konkurenciou', 'Znižujú bounce rate na 0'], c: 1, e: 'Každá služba so stránkou = šanca rankovať na konkrétny dopyt + zdroj justifications pre profil.' },
      ] },

    { id: 'gbp-4-3', title: 'Pokročilá optimalizácia profilu', min: 25,
      theory: `<p>Keď sú základy hotové, prichádzajú taktiky, ktoré oddeľujú profesionála od amatéra.</p>
<h3>Justifications engineering</h3>
<p>Google zobrazuje pri výsledku úryvky: <em>„Na webe uvádza: …"</em> (website justification), <em>„V recenzii sa spomína…"</em> (review justification), <em>„Poskytuje: …"</em> (services justification), produktové justifications. Ovplyvníš ich tým, že cieľové frázy máš <strong>na webe, v službách, produktoch</strong> — a zákazníkov vedieš k zmienke služby v recenzii („Ak budete spokojní s čistením sedačiek, spomeňte to prosím v recenzii").</p>
<h3>Ďalšie páky</h3>
<ul>
<li><strong>Atribúty</strong> — pravidelne pribúdajú nové; prejdi ich kvartálne.</li>
<li><strong>Booking integrácie</strong> — prepojenie rezervačného systému (Reserve with Google) pridáva tlačidlo rezervácie.</li>
<li><strong>Menu / cenník</strong> pre gastro; <strong>UTM parametre</strong> na odkazoch (website?utm_source=gbp…) pre čisté meranie v GA4.</li>
<li><strong>Geo-grid tracking</strong> — meranie pozícií v mriežke bodov po meste (Local Falcon, BrightLocal); jediný korektný spôsob reportovania lokálnych pozícií.</li>
<li><strong>Konkurenčný benchmark</strong> — počty recenzií, kategórie, rýchlosť rastu top 3 → z toho plán, čo dobehnúť.</li>
</ul>
<div class="tip">UTM tagovanie odkazov z GBP je must-have: bez neho sa návštevy z profilu v GA4 tvária ako organic/direct a klient nevidí skutočnú hodnotu tvojej práce.</div>
<div class="ex">Klient — kozmetika: cieľ „predĺženie mihalníc". Frázu nasadíme na web (H2 + odsek), do Services aj ako Product s fotkou. Zákazníčky prosíme o zmienku v recenzii. O 6 týždňov sa pri profile zobrazuje review justification s touto frázou a CTR z Local Packu rastie.</div>`,
      checklist: ['Rozumiem 4 typom justifications a viem ich ovplyvniť', 'Odkazy z profilu majú UTM parametre', 'Nastavený geo-grid tracking pozícií', 'Kvartálny check nových atribútov a funkcií', 'Benchmark top 3 konkurentov'],
      quiz: [
        { q: '„V recenzii sa spomína: čistenie sedačiek" je príklad:', o: ['Website justification', 'Review justification', 'Platenej reklamy', 'Atribútu'], c: 1, e: 'Review justification vzniká, keď texty recenzií obsahujú frázu zhodnú s dopytom.' },
        { q: 'Prečo tagovať odkazy z GBP pomocou UTM?', o: ['Zlepšuje ranking', 'Aby sa návštevnosť z profilu dala korektne merať v GA4', 'Je to povinné', 'Zrýchľuje načítanie'], c: 1, e: 'Bez UTM sa kliknutia z profilu miešajú s bežným organicom — nevieš preukázať hodnotu profilu.' },
        { q: 'Geo-grid tracking slúži na:', o: ['Sledovanie polohy zamestnancov', 'Meranie lokálnych pozícií v mriežke bodov po meste', 'Meranie rýchlosti webu', 'Plánovanie trás'], c: 1, e: 'Pozícia v Local Packu závisí od miesta hľadania — mriežka ukáže reálnu viditeľnosť po celom meste.' },
        { q: 'Reserve with Google umožňuje:', o: ['Rezervovať si meno firmy', 'Priamu rezerváciu služby cez tlačidlo na profile', 'Predplatiť si vyššie pozície', 'Rezervovať reklamný priestor'], c: 1, e: 'Integrácia rezervačných systémov pridáva na profil konverzné tlačidlo Book.' },
        { q: 'Website justification ovplyvníš najmä:', o: ['Počtom fotiek', 'Obsahom textu na stránke, na ktorú profil odkazuje', 'Počtom followerov', 'Zmenou telefónneho čísla'], c: 1, e: '„Na webe uvádza:" čerpá z textu cieľovej stránky — frázy, na ktoré chceš justification, tam musia byť.' },
      ] },

    { id: 'gbp-4-4', title: 'GBP analytika (Performance)', min: 20,
      theory: `<p>Sekcia <strong>Performance</strong> v profile ukazuje, ako profil reálne pracuje. Bez dát nevieš optimalizovať ani reportovať.</p>
<h3>Kľúčové metriky</h3>
<ul>
<li><strong>Searches (dopyty)</strong> — na aké výrazy sa profil zobrazil; delené na <em>brandové</em> (názov firmy) a <em>discovery</em> (kategória/služba — „kaderníctvo nitra"). Rast discovery = rastie viditeľnosť u nových ľudí.</li>
<li><strong>Zobrazenia</strong> — Search vs. Maps, mobil vs. desktop.</li>
<li><strong>Interakcie</strong>: kliky na web, volania, žiadosti o trasu, správy, rezervácie, objednávky jedla.</li>
</ul>
<h3>Ako dáta interpretovať</h3>
<ul>
<li>Pomer discovery/brand ~ ukazuje, či profil získava nových zákazníkov, alebo len obsluhuje existujúcich.</li>
<li>Volania podľa dní/hodín → optimalizácia otváracích hodín a personálu.</li>
<li>Sezónnosť porovnávaj medziročne, nie medzimesačne.</li>
</ul>
<h3>Limity a doplnky</h3>
<p>Dáta sú vzorkované, s ~3-dňovým oneskorením a históriou len 6 mesiacov — <strong>exportuj mesačne</strong> do reportu. Kombinuj s GA4 (UTM!), call trackingom a geo-grid pozíciami. Do klientskeho reportu patrí: viditeľnosť (zobrazenia, pozície), akcie (volania, trasy, kliky), recenzie (počet, priemer, response rate) a vykonané práce.</p>
<div class="warn">Nikdy nereportuj len „zobrazenia" — sú to vanity metriky. Klient platí za telefonáty a objednávky; stavaj report na interakciách a ich trende.</div>`,
      checklist: ['Rozlišujem brandové vs. discovery dopyty', 'Mesačne exportujem dáta (história len 6 mesiacov!)', 'Report staviam na interakciách, nie zobrazeniach', 'Prepojené s GA4 cez UTM'],
      quiz: [
        { q: 'Discovery dopyty sú:', o: ['Hľadania názvu firmy', 'Hľadania kategórie/služby, pri ktorých sa profil zobrazil', 'Platené kliky', 'Dopyty z e-mailu'], c: 1, e: 'Discovery = používateľ hľadal službu, nie konkrétnu firmu — ukazovateľ získavania nových zákazníkov.' },
        { q: 'História dát v GBP Performance siaha:', o: ['10 rokov', '6 mesiacov', '30 dní', 'Neobmedzene'], c: 1, e: 'K dispozícii je len ~6 mesiacov — preto sa dáta pravidelne exportujú.' },
        { q: 'Najhodnotnejšie metriky pre klientsky report sú:', o: ['Zobrazenia profilu', 'Interakcie: volania, trasy, kliky na web', 'Počet fotiek', 'Počet príspevkov'], c: 1, e: 'Interakcie sú najbližšie k tržbám — zobrazenia sú len vstupná (vanity) metrika.' },
        { q: 'Rastúci podiel discovery dopytov signalizuje:', o: ['Problém s profilom', 'Rast viditeľnosti u nových zákazníkov', 'Pokles značky', 'Chybu merania'], c: 1, e: 'Viac discovery zobrazení = profil sa ukazuje ľuďom, ktorí firmu nepoznali — presne to je cieľ optimalizácie.' },
        { q: 'Sezónny biznis (zmrzlina) porovnávaš správne:', o: ['Júl vs. január', 'Júl 2026 vs. júl 2025 (medziročne)', 'Pondelok vs. utorok', 'Vôbec'], c: 1, e: 'Medziročné porovnanie eliminuje sezónny efekt — medzimesačné by ukazovalo len počasie.' },
      ] },
  ]},

  /* ── SEKCIA 5: PRAX ── */
  { id: 'gbp-s5', title: 'Prax: audity, prípadové štúdie, projekt', lessons: [

    { id: 'gbp-5-1', title: 'GBP audit krok za krokom', min: 35,
      theory: `<p>Audit je vstupná brána každej spolupráce — a produkt, ktorý sa dá predávať samostatne. Profesionálny GBP audit má pevnú štruktúru:</p>
<h3>1. Základná diagnostika</h3>
<ul><li>Existencia duplicít, stav verifikácie, vlastníctvo a prístupy, prípadné obmedzenia (suspension).</li></ul>
<h3>2. Kompletnosť a správnosť profilu</h3>
<ul><li>Názov (súlad s realitou — spam check), kategórie vs. konkurencia, NAP vs. web, hodiny + special hours, popis, atribúty, odkaz na správnu landing page + UTM.</li></ul>
<h3>3. Obsah</h3>
<ul><li>Fotky (počet, kvalita, čerstvosť, pomer firemné/zákaznícke), Posts (frekvencia), Services/Products (vyplnenosť), Q&A (seedované? zodpovedané?).</li></ul>
<h3>4. Recenzie</h3>
<ul><li>Počet, priemer, tempo, response rate a kvalita odpovedí, porovnanie s top 3 konkurentmi, kľúčové slová v recenziách.</li></ul>
<h3>5. Web & citácie</h3>
<ul><li>Landing page relevancia, LocalBusiness schema, NAP konzistencia, základné citácie, Bing/Apple Maps.</li></ul>
<h3>6. Viditeľnosť</h3>
<ul><li>Geo-grid pozície na 5–10 kľúčových dopytov, Performance dáta, spam analýza konkurencie.</li></ul>
<h3>Výstup</h3>
<p>Report: exekutívne zhrnutie (3 vety pre majiteľa) → skóre podľa oblastí → <strong>prioritizovaný akčný plán</strong> (quick wins do 7 dní / 30 dní / 90 dní) s odhadom dopadu.</p>
<div class="tip">Vždy začni quick winmi, ktoré klient uvidí: doplniť Products, opraviť hodiny, odpovedať na recenzie. Rýchly viditeľný výsledok buduje dôveru pre dlhodobú prácu.</div>`,
      checklist: ['Mám šablónu auditu so 6 oblasťami', 'Súčasťou auditu je geo-grid meranie', 'Výstupom je prioritizovaný akčný plán', 'Viem audit odprezentovať majiteľovi bez žargónu'],
      quiz: [
        { q: 'Prvá vec, ktorú v audite kontroluješ, je:', o: ['Počet fotiek', 'Duplicity, verifikácia, vlastníctvo profilu', 'Farba loga', 'Počet Posts'], c: 1, e: 'Bez vyriešeného vlastníctva, verifikácie a duplicít nemá zmysel optimalizovať detaily.' },
        { q: 'Akčný plán v audite má byť:', o: ['Abecedný zoznam', 'Prioritizovaný podľa dopadu a náročnosti (quick wins najskôr)', 'Tajný', 'Len ústny'], c: 1, e: 'Prioritizácia (7/30/90 dní) robí z auditu použiteľný plán, nie len zoznam chýb.' },
        { q: 'Prečo patrí do auditu analýza konkurencie?', o: ['Nepatrí tam', 'Ranking je relatívny — cieľ je definovaný tým, čo robí top 3', 'Kvôli právnym dôvodom', 'Aby bol report dlhší'], c: 1, e: 'Lokálny ranking je súťaž o 3 miesta — bez benchmarku nevieš, koľko recenzií či akú kategóriu potrebuješ.' },
        { q: 'Response rate v kontexte recenzií znamená:', o: ['Rýchlosť webu', 'Podiel recenzií, na ktoré firma odpovedala', 'Počet nových recenzií', 'Priemer hviezdičiek'], c: 1, e: 'Response rate meria, na koľko % recenzií firma reaguje — signál starostlivosti pre zákazníkov aj Google.' },
        { q: 'Exekutívne zhrnutie auditu je určené pre:', o: ['Vývojárov', 'Majiteľa firmy — stručne a bez žargónu', 'Google support', 'Konkurenciu'], c: 1, e: 'Majiteľ potrebuje 3 vety: kde sme, čo nás brzdí, čo urobíme. Detaily sú v tele auditu.' },
      ] },

    { id: 'gbp-5-2', title: 'Prípadové štúdie z praxe', min: 25,
      theory: `<h3>Case study 1: Zubná ambulancia — od neviditeľnosti k plnému diáru</h3>
<p><strong>Stav:</strong> neclaimnutý profil, 4 recenzie, generická kategória „Lekár".<br>
<strong>Zásah:</strong> claim + verifikácia, primárna kategória „Zubná ambulancia" + sekundárne („Dentálna hygiena", „Zubný implantológ"), Services kompletné, systém žiadania recenzií (QR na recepcii + SMS follow-up), 2 Posts mesačne, location page so schema.<br>
<strong>Výsledok za 6 mesiacov:</strong> recenzie 4 → 87 (priemer 4,9), discovery zobrazenia +340 %, telefonáty z profilu +210 %. Kľúčová páka: recenzie + správna kategória.</p>
<h3>Case study 2: Inštalatér (SAB) — boj so spamom</h3>
<p><strong>Stav:</strong> poctivý živnostník na 2. strane Local Finderu; pack okupovali profily s názvami „Inštalatér NONSTOP lacno 24/7" a falošnými adresami.<br>
<strong>Zásah:</strong> spam audit → 14 nahlásení (Suggest an edit + Redressal form s dôkazmi), vlastný profil: service area, služby, fotky z realizácií, žiadanie recenzií so zmienkou služby.<br>
<strong>Výsledok:</strong> 9 zo 14 spamerov odstránených/premenovaných do 8 týždňov, klient v top 3 na „inštalatér + mesto", dopyty +150 %.</p>
<h3>Case study 3: Sieť fitness centier — škálovanie</h3>
<p><strong>Stav:</strong> 12 pobočiek, chaos: rôzne názvy, spoločný web bez location pages, recenzie bez odpovedí.<br>
<strong>Zásah:</strong> jednotný naming, bulk správa profilov, 12 location pages so schema, centrálny playbook na recenzie (SLA 24 h), UTM štandard, mesačný report per pobočka.<br>
<strong>Výsledok:</strong> priemerný rast interakcií +85 %, zjednotený brand, škálovateľný proces — presne to, čo agentúra predáva sieťam.</p>
<div class="tip">Všimni si vzorec: diagnostika → základy (kategórie, NAP, landing) → recenzný systém → obsah → meranie. Poradie krokov je takmer vždy rovnaké; mení sa len dôraz.</div>`,
      checklist: ['Rozumiem spoločnému vzorcu všetkých troch štúdií', 'Viem identifikovať „kľúčovú páku" pre daný typ klienta', 'Viem, ako sa líši práca pre SAB, ambulanciu a sieť', 'Zapísal som si štruktúru case study pre vlastné portfólio'],
      quiz: [
        { q: 'Aká bola kľúčová páka rastu zubnej ambulancie?', o: ['Platené reklamy', 'Recenzný systém + správna primárna kategória', 'Nový web za 10 000 €', 'Video na YouTube'], c: 1, e: 'Kombinácia špecifickej kategórie a systematických recenzií — najčastejší víťazný ťah v lokálnych službách.' },
        { q: 'Pri inštalatérovi bol najväčší rast dosiahnutý:', o: ['Znížením cien', 'Odstránením spamovej konkurencie z Local Packu', 'Kúpou recenzií', 'Zmenou farby loga'], c: 1, e: 'Spam fighting uvoľnil pozície — klient sa posunul do top 3 bez zmeny vlastného profilu navyše.' },
        { q: 'Hlavný problém siete fitness centier bol:', o: ['Málo pobočiek', 'Nekonzistencia a chýbajúce procesy naprieč pobočkami', 'Priveľa recenzií', 'Zlá poloha pobočiek'], c: 1, e: 'Pri sieťach je kľúč štandardizácia: naming, location pages, playbooky, reporting.' },
        { q: 'SLA 24 h na recenzie znamená:', o: ['Recenzie sa mažú po 24 hodinách', 'Záväzok odpovedať na každú recenziu do 24 hodín', 'Recenzie možno písať len 24 hodín', 'Nič'], c: 1, e: 'Service Level Agreement — interný štandard rýchlosti reakcie na recenzie.' },
        { q: 'Typické poradie krokov optimalizácie je:', o: ['Obsah → meranie → základy', 'Diagnostika → základy → recenzie → obsah → meranie', 'Recenzie → nič ďalšie', 'Meranie → obsah → diagnostika'], c: 1, e: 'Najprv oprav fundamenty, potom buduj prominence a obsah, celé to meraj — univerzálny playbook.' },
      ] },

    { id: 'gbp-5-3', title: 'Záverečný projekt modulu GBP', min: 60,
      theory: `<p>Čas premeniť vedomosti na <strong>portfóliový výstup</strong>. Tento projekt zodpovedá reálnej zákazke „audit + stratégia" v hodnote 300–800 €.</p>
<h3>Zadanie</h3>
<p>Vyber si reálnu lokálnu firmu (ideálne známeho / miestny biznis, ktorému môžeš výsledok aj poslať) a vypracuj:</p>
<ol>
<li><strong>Kompletný audit profilu</strong> podľa 6-oblastnej šablóny z lekcie 5.1 — vrátane screenshotov.</li>
<li><strong>Konkurenčnú analýzu</strong> top 3 v Local Packu na 5 kľúčových dopytov (kategórie, recenzie, obsah, spam check).</li>
<li><strong>Akčný plán</strong> 7/30/90 dní s prioritami a odhadom dopadu.</li>
<li><strong>Simuláciu exekúcie:</strong> návrh 4 Google Posts, 10 Q&A párov, šablóny odpovedí na recenzie (pozitívna, negatívna, fake), review-akvizičný plán.</li>
<li><strong>Návrh reportu</strong> — aké metriky, v akej frekvencii, ako prezentované.</li>
</ol>
<h3>Kritériá hodnotenia</h3>
<ul>
<li>Úplnosť auditu (všetkých 6 oblastí) — 30 %</li>
<li>Kvalita konkurenčnej analýzy a využitie geo-grid logiky — 20 %</li>
<li>Realistickosť a prioritizácia akčného plánu — 25 %</li>
<li>Kvalita pripravených materiálov (Posts, Q&A, šablóny) — 15 %</li>
<li>Prezentovateľnosť klientovi (jazyk, štruktúra) — 10 %</li>
</ul>
<div class="tip">Hotový projekt ulož ako PDF — je to tvoja prvá referencia. Traja takíto „cvièní" klienti = portfólio, s ktorým sa dá uchádzať o prácu v agentúre alebo osloviť prvých platiacich klientov.</div>`,
      checklist: ['Vybral som reálnu firmu', 'Dokončený 6-oblastný audit so screenshotmi', 'Konkurenčná analýza top 3', 'Akčný plán 7/30/90 dní', 'Pripravené Posts, Q&A a šablóny odpovedí', 'Návrh mesačného reportu', 'Projekt uložený ako PDF do portfólia'],
      quiz: [
        { q: 'Prečo robiť projekt na reálnej firme namiesto vymyslenej?', o: ['Je to jednoduchšie', 'Vzniká použiteľná referencia a reálne dáta na analýzu', 'Google to vyžaduje', 'Nie je v tom rozdiel'], c: 1, e: 'Reálna firma = reálne dáta, reálne problémy a hotový portfóliový výstup, ktorý môžeš aj doručiť.' },
        { q: 'Najvyššiu váhu v hodnotení projektu má:', o: ['Grafická úprava', 'Úplnosť auditu', 'Počet strán', 'Rýchlosť vypracovania'], c: 1, e: 'Audit je jadro (30 %) — bez kompletnej diagnostiky sú ostatné časti postavené na piesku.' },
        { q: 'Akčný plán v projekte deľíš na horizonty:', o: ['1/2/3 roky', '7/30/90 dní', 'Ráno/obed/večer', 'Q1–Q4'], c: 1, e: 'Štandard 7/30/90 dní: okamžité quick wins, mesačné úlohy, štvrťročná stratégia.' },
        { q: 'Súčasťou simulácie exekúcie je:', o: ['Návrh Posts, Q&A párov a šablón odpovedí na recenzie', 'Kúpa domény', 'Založenie s.r.o.', 'Natočenie TV reklamy'], c: 0, e: 'Projekt testuje aj exekučné zručnosti — obsah a šablóny, ktoré by si klientovi reálne dodal.' },
        { q: 'Reálna trhová hodnota kvalitného GBP auditu so stratégiou je rádovo:', o: ['5–10 €', '300–800 €', '50 000 €', 'Robí sa len zadarmo'], c: 1, e: 'Audit + stratégia je bežne predávaná služba v stovkách eur — presne to, čo sa tu učíš vyrobiť.' },
      ] },
  ]},
]});
</script>
