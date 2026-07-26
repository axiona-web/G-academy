
  /* ── SEKCIA 4: BIDDING A MERANIE ── (pokračovanie modulu Google Ads) */
  { id: 'ads-s4', title: 'Bidding, meranie a atribúcia', lessons: [

    { id: 'ads-4-1', title: 'Bidding stratégie', min: 30,
      theory: `<p>Bidding stratégia určuje, ako sa nastavuje ponuka v každej aukcii. Éra manuálneho CPC končí — <strong>Smart Bidding</strong> (strojové učenie s aukčnými signálmi: zariadenie, čas, lokalita, publikum, prehliadač…) je štandard.</p>
<h3>Prehľad stratégií</h3>
<table>
<tr><th>Stratégia</th><th>Optimalizuje na</th><th>Kedy</th></tr>
<tr><td>Manual CPC</td><td>nič — ty riadiš bidy</td><td>špeciálne prípady, mikro-rozpočty</td></tr>
<tr><td>Maximize Clicks</td><td>max. klikov v rozpočte</td><td>štart bez konverzných dát, traffic ciele</td></tr>
<tr><td>Maximize Conversions</td><td>max. konverzií v rozpočte</td><td>štart smart biddingu bez CPA cieľa</td></tr>
<tr><td><strong>Target CPA</strong> (tCPA)</td><td>konverzie pri cieľovej cene</td><td>lead-gen s jasnou hodnotou leadu</td></tr>
<tr><td>Maximize Conversion Value</td><td>max. hodnoty konverzií</td><td>e-commerce bez ROAS cieľa</td></tr>
<tr><td><strong>Target ROAS</strong> (tROAS)</td><td>hodnota pri cieľovej návratnosti</td><td>e-commerce s meranými hodnotami</td></tr>
<tr><td>Target Impression Share</td><td>podiel zobrazení (napr. top)</td><td>brand obrana, viditeľnosť</td></tr>
</table>
<h3>Zásady praxe</h3>
<ul>
<li>Smart bidding potrebuje <strong>dáta</strong>: ideálne 30+ konverzií/mesiac na kampaň (tROAS ~50+). Menej dát → Maximize Conversions bez cieľa, konsolidácia kampaní, mikrokonverzie.</li>
<li><strong>Learning fáza</strong> ~1–2 týždne po zmene: nehodnotiť, nemeniť. Veľké zmeny cieľa (viac ako ±20 %) resetujú učenie — meniť postupne.</li>
<li>tCPA nastav realisticky (blízko historického CPA) a uťahuj postupne.</li>
<li>Rozpočet limitovaný (Limited by budget) + tCPA = konflikt; rieš poradie: rozpočet alebo cieľ.</li>
</ul>
<div class="warn">Najčastejšia chyba: tCPA 10 € pri historickom CPA 40 €. Systém nevie doručiť, zobrazovanie kolabuje a klient volá „Ads nefungujú". Ciele sa uťahujú po 10–15 % krokoch, nie skokom.</div>`,
      checklist: ['Viem priradiť stratégiu k cieľu a objemu dát', 'Rešpektujem learning fázu', 'Ciele mením postupne (±10–15 %)', 'Rozumiem konfliktu rozpočet vs. cieľ'],
      quiz: [
        { q: 'Target ROAS je najvhodnejší pre:', o: ['Lead-gen bez hodnôt', 'E-commerce s meranými hodnotami transakcií', 'Brand awareness', 'Účty bez konverzií'], c: 1, e: 'tROAS optimalizuje pomer hodnota/náklad — potrebuje merané hodnoty konverzií a dostatok dát.' },
        { q: 'Po zmene bidding stratégie nasleduje:', o: ['Okamžitý stabilný výkon', 'Learning fáza (~1–2 týždne) s volatilitou', 'Vypnutie kampane', 'Reset účtu'], c: 1, e: 'Algoritmus sa učí — v learning fáze výkon kolíše a nemá sa hodnotiť ani meniť.' },
        { q: 'Historické CPA je 40 €. Aké tCPA nastavíš na štart?', o: ['10 €', 'Okolo 40 € a postupne uťahovať', '1 €', '400 €'], c: 1, e: 'Nerealisticky agresívny cieľ zadusí zobrazovanie — začni pri realite a uťahuj po krokoch.' },
        { q: 'Smart Bidding využíva pri každej aukcii:', o: ['Len tvoj max bid', 'Kontextové signály (čas, zariadenie, lokalita, publikum…)', 'Náhodu', 'Fázy mesiaca'], c: 1, e: 'Real-time signály sú hlavná výhoda oproti manuálnemu biddovaniu — človek ich kombinovať nedokáže.' },
        { q: 'Target Impression Share použiješ na:', o: ['Maximalizáciu ROAS', 'Obranu brandu / garanciu viditeľnosti na dopytoch', 'Zníženie CPA', 'App inštalácie'], c: 1, e: 'Stratégia cieli podiel zobrazení (napr. absolute top na brand dopytoch) — viditeľnosť, nie výkon.' },
      ] },

    { id: 'ads-4-2', title: 'CPA, ROAS a ekonomika kampaní', min: 25,
      theory: `<p>Bez pochopenia ekonomiky si len „nastavovač kampaní". S ním si konzultant, ktorý rozumie biznisu.</p>
<h3>Kľúčové vzorce</h3>
<ul>
<li><strong>CPA</strong> (cost per acquisition) = náklady / konverzie.</li>
<li><strong>ROAS</strong> (return on ad spend) = hodnota konverzií / náklady (400 % = 4 € tržieb na 1 € reklamy).</li>
<li><strong>Break-even ROAS</strong> = 1 / marža. Marža 25 % → break-even ROAS 400 %. Všetko pod = strata!</li>
<li><strong>Cieľové CPA</strong> = hodnota zákazníka × prijateľný podiel na akvizíciu. Lead → zákazník 30 %, zákazník prinesie 500 € marže, chceš max 20 % na marketing → CPA leadu max 30 €.</li>
<li><strong>LTV</strong> (lifetime value) — zákazník s opakovanými nákupmi unesie vyššie akvizičné CPA. Firmy vyhrávajúce aukcie často „prehrávajú" na prvej objednávke a zarábajú na LTV.</li>
</ul>
<h3>ROAS vs. zisk — pasca</h3>
<p>Maximalizácia ROAS ≠ maximalizácia zisku! ROAS 1000 % pri útrate 100 € = 900 € marginálnej hodnoty; ROAS 400 % pri útrate 2 000 € = 6 000 €. <strong>Vyšší ROAS často znamená menší celkový zisk</strong>, lebo škálovanie znižuje efektivitu na okraji. Hľadá sa bod, kde marginálny ROAS = break-even.</p>
<div class="ex">Klient chce „ROAS aspoň 800 %". Otázka profesionála: „Aká je marža?" Marža 50 % → break-even 200 % → ROAS 800 % je zbytočne konzervatívny a brzdí rast. Správny rozhovor je o marži a kapacite, nie o okrúhlom čísle.</div>
<div class="tip">Nauč sa pýtať klientov: maržu, hodnotu zákazníka, % leadov, ktoré sa stanú zákazkami, opakovanosť nákupov. Tieto 4 čísla robia z PPC nastavení biznis stratégiu.</div>`,
      checklist: ['Viem vypočítať break-even ROAS z marže', 'Odvodím cieľové CPA z hodnoty zákazníka', 'Chápem ROAS vs. zisk paradox', 'Pýtam si od klientov maržové dáta'],
      quiz: [
        { q: 'ROAS 500 % znamená:', o: ['5 € nákladov na 1 € tržieb', '5 € hodnoty konverzií na 1 € nákladov', '5 % konverzný pomer', '500 klikov'], c: 1, e: 'Return on ad spend = hodnota / náklad. 500 % = päťnásobok útraty v tržbách.' },
        { q: 'Break-even ROAS pri marži 20 % je:', o: ['20 %', '500 %', '120 %', '80 %'], c: 1, e: '1 / 0,20 = 5 = 500 %. Pod touto hranicou kampaň prerába aj pri „pekných" tržbách.' },
        { q: 'Firma s vysokým LTV si môže dovoliť:', o: ['Nižšie CPA než konkurencia', 'Vyššie akvizičné CPA — zarába na opakovaných nákupoch', 'Žiadnu reklamu', 'Len organiku'], c: 1, e: 'Kto vidí hodnotu zákazníka na roky, môže prvú objednávku „kúpiť" drahšie — a vyhráva aukcie.' },
        { q: 'Maximalizácia ROAS vždy maximalizuje zisk:', o: ['Áno', 'Nie — príliš vysoký cieľový ROAS obmedzí objem a celkový zisk', 'Áno, pri e-commerce', 'ROAS so ziskom nesúvisí'], c: 1, e: 'Škálovanie znižuje okrajovú efektivitu — optimálny bod je tam, kde marginálny ROAS = break-even, nie maximum.' },
        { q: 'CPA vypočítaš ako:', o: ['Konverzie / kliky', 'Náklady / konverzie', 'Kliky / impresie', 'Tržby / marža'], c: 1, e: 'Cost per acquisition = celkové náklady delené počtom konverzií.' },
      ] },

    { id: 'ads-4-3', title: 'Meranie konverzií (tag, GA4, consent)', min: 35,
      theory: `<p><strong>Meranie je základ všetkého</strong> — smart bidding, optimalizácia aj reporting stoja na konverzných dátach. Zlé meranie = zlé rozhodnutia celého systému.</p>
<h3>Spôsoby merania</h3>
<ul>
<li><strong>Google Ads konverzný tag</strong> (cez Google Tag / GTM) — priame meranie akcií na webe. Odporúčaný primárny zdroj pre bidding.</li>
<li><strong>Import z GA4</strong> — key events importované do Ads. Pozor: iný atribučný pohľad, mierne odlišné čísla sú normálne.</li>
<li><strong>Enhanced Conversions</strong> — hashované first-party dáta (e-mail) zlepšujú presnosť pri obmedzeniach cookies.</li>
<li><strong>Offline conversion import</strong> — uzavreté obchody z CRM späť do Ads (GCLID) — svätý grál lead-gen merania: optimalizuješ na zákazky, nie formuláre.</li>
<li>Volania: call assets / číslo na webe (website call conversions).</li>
</ul>
<h3>Nastavenie konverzií</h3>
<ul>
<li><strong>Primary</strong> (vstupujú do biddingu) vs. <strong>Secondary</strong> (len pozorovanie). Mikrokonverzie (scroll, čas) nikdy nie primary — riedia signál!</li>
<li>Hodnoty: statické (lead = 30 €) alebo dynamické (hodnota objednávky).</li>
<li>Conversion window, počítanie raz/každá (lead raz, nákup každý).</li>
</ul>
<h3>Consent Mode v2 (EÚ realita)</h3>
<p>Od 2024 povinný pre EÚ: signály <code>ad_storage</code>, <code>ad_user_data</code>, <code>ad_personalization</code> podľa súhlasu z cookie lišty (CMP). Bez súhlasu tagy posielajú „cookieless pingy" a Google <strong>modeluje</strong> chýbajúce konverzie. Bez správne nasadeného Consent Mode prichádzaš o remarketing publiká aj presnosť merania v EÚ.</p>
<div class="warn">Klasika z auditov: konverzia „návšteva stránky ďakujeme" sa spúšťa aj pri refreshi/priamej návšteve; duplicitné tagy počítajú konverziu 2×; primary konverzia „klik na telefón" s 90 % náhodných dotykov. Pred spustením kampaní vždy over meranie cez Tag Assistant/GTM preview.</div>`,
      checklist: ['Konverzie meriam Ads tagom cez GTM', 'Primary vs. secondary správne rozdelené', 'Enhanced conversions zapnuté', 'Consent Mode v2 nasadený', 'Meranie otestované pred spustením kampaní'],
      quiz: [
        { q: 'Mikrokonverzie (scroll 90 %) majú byť:', o: ['Primary — čím viac signálu, tým lepšie', 'Secondary — nesmú riadiť bidding', 'Zmazané', 'Jediné konverzie'], c: 1, e: 'Primary konverzie riadia smart bidding — riedke „mäkké" akcie by ho naučili loviť lacný šum.' },
        { q: 'Offline conversion import umožňuje:', o: ['Vypnúť internet', 'Posielať uzavreté obchody z CRM do Ads a optimalizovať na zákazky', 'Tlačiť reporty', 'Merať TV reklamu'], c: 1, e: 'Cez GCLID spáruješ lead s neskorším obchodom — bidding sa učí na skutočných tržbách.' },
        { q: 'Consent Mode v2 v EÚ:', o: ['Je dobrovoľná ozdoba', 'Je podmienka pre meranie a remarketing — bez súhlasu sa konverzie modelujú', 'Zakazuje reklamu', 'Platí len v USA'], c: 1, e: 'CMP + Consent Mode v2 sú od marca 2024 nutné; chýbajúce dáta Google dopĺňa modelovaním.' },
        { q: 'Enhanced Conversions fungujú na princípe:', o: ['Čítania myšlienok', 'Hashovaných first-party údajov (napr. e-mail) na presnejšie spárovanie', 'Skrytej kamery', 'Cookies tretích strán'], c: 1, e: 'Hashovaný údaj z konverznej stránky sa bezpečne páruje s prihlásenými účtami Google.' },
        { q: 'Čísla konverzií v GA4 a Google Ads sa mierne líšia. To je:', o: ['Kritická chyba', 'Normálne — odlišná atribúcia a logika počítania', 'Dôvod zmazať účet', 'Nemožné'], c: 1, e: 'Rôzne modely (atribúcia, okná, čas pripísania) = prirodzené rozdiely. Dôležitá je konzistencia zdroja pre bidding.' },
      ] },

    { id: 'ads-4-4', title: 'Atribúcia', min: 20,
      theory: `<p>Zákazník pred konverziou interaguje viackrát: video → Discover → Search brand → konverzia. <strong>Atribúcia rozhoduje, ktorý kontakt dostane kredit</strong> — a tým mení, čo vyzerá výkonne.</p>
<h3>Modely</h3>
<ul>
<li><strong>Last click</strong> — všetok kredit poslednému kliku. Podhodnocuje horný funnel, nadhodnocuje brand Search.</li>
<li><strong>Data-driven attribution (DDA)</strong> — dnešný default: strojové učenie rozdeľuje kredit podľa skutočného príspevku (porovnávaním konverzných ciest). Frakčné konverzie (0,4) sú normálne.</li>
<li>Historické modely (first click, linear, time decay, position-based) Google postupne odstránil.</li>
</ul>
<h3>Praktické dôsledky</h3>
<ul>
<li>Prechod last click → DDA „presunie" konverzie z brand kampaní do horného funnela — priprav klienta, že čísla sa zmenia bez zmeny reality.</li>
<li>Reporty: Attribution (Assisted conversions, konverzné cesty) ukazujú, čo by last-click pohľad zabil.</li>
<li>Skutočnú <strong>inkrementalitu</strong> (čo by sa nestalo bez reklamy) ani DDA nezmeria — na to slúžia experimenty (geo testy, holdout skupiny). Minimálne buď skeptický k brand kampaniam „s ROAS 3000 %".</li>
</ul>
<div class="ex">E-shop vypol Demand Gen, lebo „mala zlé last-click CPA". O 3 týždne klesli brand vyhľadávania aj celkové konverzie o 15 %. Kampaň tvoril dopyt, ktorý žala brand Search — atribúcia mu len nedávala kredit.</div>`,
      checklist: ['Rozumiem last click vs. DDA', 'Viem vysvetliť frakčné konverzie', 'Pozerám asistované konverzie a cesty', 'Chápem limity atribúcie (inkrementalita)'],
      quiz: [
        { q: 'Predvolený atribučný model v Google Ads je dnes:', o: ['Last click', 'Data-driven attribution', 'First click', 'Linear'], c: 1, e: 'DDA rozdeľuje kredit strojovým učením podľa reálneho príspevku interakcií.' },
        { q: 'V reporte vidíš 12,4 konverzie. Desatinné číslo znamená:', o: ['Chybu', 'Frakčný kredit z data-driven atribúcie', 'Polovičného zákazníka', 'Zaokrúhľovanie meny'], c: 1, e: 'DDA deľí konverziu medzi viac kontaktov — frakcie sú očakávané.' },
        { q: 'Last click model systematicky nadhodnocuje:', o: ['Video kampane', 'Brand Search (posledný krok cesty)', 'Display', 'Demand Gen'], c: 1, e: 'Posledný klik býva brand vyhľadávanie — last click mu pripíše prácu celého funnela.' },
        { q: 'Skutočnú inkrementalitu kampane zmeriaš:', o: ['Last click reportom', 'Experimentmi (geo testy, holdout skupiny)', 'Počtom impresií', 'Quality Score'], c: 1, e: 'Atribúcia deľí pozorované konverzie; inkrementalita vyžaduje kontrolnú skupinu bez reklamy.' },
        { q: 'Po prechode na DDA konverzie brand kampane „klesli". Realita:', o: ['Kampaň sa pokazila', 'Kredit sa spravodlivejšie rozdelil do celej cesty', 'Google kradne konverzie', 'Meranie prestalo fungovať'], c: 1, e: 'Zmena modelu preskupuje kredit — celkový počet konverzií účtu zostáva, mení sa jeho rozdelenie.' },
      ] },
  ]},

  /* ── SEKCIA 5: PUBLIKÁ A REMARKETING ── */
  { id: 'ads-s5', title: 'Publiká a remarketing', lessons: [

    { id: 'ads-5-1', title: 'Typy publík v Google Ads', min: 20,
      theory: `<p>Publiká sú vrstva „komu" nad vrstvou „čo" (kľúčové slová/umiestnenia). Prehľad od najširších po najcennejšie:</p>
<ul>
<li><strong>Demographics</strong> — vek, pohlavie, rodičovstvo, príjem (podľa krajiny).</li>
<li><strong>Affinity</strong> — dlhodobé záujmy a životný štýl („nadšenci fitness"). Awareness.</li>
<li><strong>In-market</strong> — aktívne nakupujú v kategórii („autá — SUV"). Consideration/akcia.</li>
<li><strong>Life events</strong> — sťahovanie, svadba, promócia.</li>
<li><strong>Custom segments</strong> — definuješ vlastné: podľa vyhľadávaných výrazov na Google, navštevovaných webov/aplikácií. Podceňovaná zbraň pre nišové B2B.</li>
<li><strong>Your data (first-party)</strong> — návštevníci webu, používatelia aplikácie, <strong>Customer Match</strong> (nahrané e-maily zákazníkov), engagement s YouTube kanálom.</li>
</ul>
<h3>Targeting vs. Observation</h3>
<p>Kľúčový koncept: <strong>Targeting</strong> zužuje zobrazovanie len na publikum; <strong>Observation</strong> nechá kampaň bežať normálne, len zbiera dáta o výkone segmentu (a umožňuje bid adjustments pri manuáli). V Search štandardne <strong>Observation</strong> — targeting by zbytočne odrezal dopyt.</p>
<div class="tip">Rutina profesionála: na každú Search kampaň navesiť Observation publiká (in-market kategórie, remarketing, customer match). Po mesiaci vidíš, ktoré segmenty konvertujú lepšie — hotová mapa pre budúce stratégie a Demand Gen cielenie.</div>`,
      checklist: ['Poznám hierarchiu publík od demografie po first-party', 'Rozumiem custom segments', 'Ovládam rozdiel Targeting vs. Observation', 'Na Search kampaniach mám Observation publiká'],
      quiz: [
        { q: 'In-market publikum obsahuje ľudí, ktorí:', o: ['Kedysi dávno klikli na reklamu', 'Práve aktívne prejavujú nákupné správanie v kategórii', 'Bývajú pri trhu', 'Sú fanúšikovia značky'], c: 1, e: 'In-market = aktuálny nákupný režim — signály z vyhľadávania, prezerania, porovnávania.' },
        { q: 'Režim Observation na publiku:', o: ['Zúži kampaň len na dané publikum', 'Nechá kampaň bežať normálne a meria výkon segmentu', 'Zastaví kampaň', 'Zdvojnásobí bid'], c: 1, e: 'Observation = zber dát bez obmedzenia dosahu; Targeting = obmedzenie len na publikum.' },
        { q: 'Custom segment môžeš postaviť na:', o: ['Farbe očí', 'Vyhľadávaných výrazoch a navštevovaných weboch', 'Rodnom čísle', 'Značke telefónu suseda'], c: 1, e: 'Custom segments z dopytov/webov prinášajú vlastné definície zámeru — ideálne pre niche B2B.' },
        { q: 'Customer Match funguje na základe:', o: ['Telepatie', 'Nahraných hashovaných kontaktov zákazníkov (e-mail, telefón)', 'Cookies tretích strán', 'Náhody'], c: 1, e: 'First-party zoznamy spárované s Google účtami — cielenie aj tvorba podobných stratégií.' },
        { q: 'Na Search kampani je štandardná voľba publík:', o: ['Targeting', 'Observation', 'Vypnúť publiká', 'Demographics only'], c: 1, e: 'Search žne dopyt — zužovať ho publikom sa oplatí len výnimočne (RLSA stratégie); Observation dáva dáta zadarmo.' },
      ] },

    { id: 'ads-5-2', title: 'Remarketing v praxi', min: 25,
      theory: `<p><strong>Remarketing</strong> cieli na ľudí, ktorí už s tebou interagovali — najteplejšie publikum s najvyššou konverzitou.</p>
<h3>Zdroje zoznamov</h3>
<ul>
<li>Web (Google tag) — všetci návštevníci, návštevníci sekcií, košík bez nákupu, konvertujúci.</li>
<li>Aplikácia, YouTube (videnia, odbery), Customer Match (CRM zoznamy), Lead formy.</li>
</ul>
<h3>Segmentácia = hodnota</h3>
<p>Nie „všetci návštevníci 30 dní" s jedným bannerom, ale vrstvy podľa zámeru:</p>
<ul>
<li><strong>Opustený košík (1–7 dní)</strong> — najvyššia hodnota; pripomeň, vyrieš námietku (doprava zadarmo?).</li>
<li><strong>Prezerali produkt/službu (7–30 dní)</strong> — dynamický remarketing (presne videné produkty z feedu).</li>
<li>Návšteva bez hĺbky (30–90 dní) — mäkšia pripomienka brandu.</li>
<li><strong>Zákazníci</strong> — cross-sell/upsell, alebo exclusion (nevyhadzuj peniaze na akvizičné kampane pre existujúcich).</li>
</ul>
<h3>Pravidlá a limity</h3>
<ul>
<li><strong>Frequency capping</strong> — prenasledovanie 50× denne značku poškodzuje.</li>
<li>Trvanie členstva podľa nákupného cyklu (e-shop 30–90 dní, B2B aj 540).</li>
<li>Privacy realita: cookies tretích strán ustupujú → remarketing stojí čoraz viac na first-party dátach, Consent Mode a prihlásených používateľoch. <strong>Buduj vlastné zoznamy (Customer Match) — to je aktívum, ktoré klientovi nikto nevezme.</strong></li>
<li>Zakázané kategórie pre personalizovanú reklamu: zdravie, financie v citlivom rozsahu a ďalšie.</li>
</ul>
<div class="ex">E-shop: dynamický remarketing na košík (3 dni, capping 3/deň) s kupónom na dopravu → ROAS 1400 % pri 5 % podielu na rozpočte. Malý objem, obrovská efektivita — presne rola remarketingu.</div>`,
      checklist: ['Zoznamy segmentované podľa zámeru a času', 'Dynamický remarketing s feedom (e-commerce)', 'Frequency capping nastavený', 'Zákazníci vylúčení z akvizičných kampaní', 'Budujem Customer Match zoznamy'],
      quiz: [
        { q: 'Najhodnotnejší remarketingový segment e-shopu je typicky:', o: ['Všetci návštevníci za rok', 'Opustený košík posledných dní', 'Ľudia, čo videli logo', 'Konkurencia'], c: 1, e: 'Košík = takmer dokončený nákup — malý segment s najvyššou konverzitou.' },
        { q: 'Dynamický remarketing zobrazuje:', o: ['Náhodné produkty', 'Presne produkty, ktoré používateľ prezeral (z feedu)', 'Len logo', 'Textové reklamy'], c: 1, e: 'Feed + tag s ID produktov = personalizované bannery s videnými položkami.' },
        { q: 'Prečo vylúčiť existujúcich zákazníkov z akvizičnej kampane?', o: ['Netreba', 'Akvizičný rozpočet má hľadať nových — zákazníkov obslúži lacnejší kanál', 'Je to zakázané', 'Zákazníci nesmú vidieť reklamu'], c: 1, e: 'Platiť akvizičné CPC za ľudí, ktorí už nakupujú, je plytvanie — na nich slúži e-mail/vernostný kanál.' },
        { q: 'Frequency capping rieši:', o: ['Rýchlosť webu', 'Obmedzenie počtu zobrazení reklamy jednej osobe', 'Počet kampaní', 'Fakturáciu'], c: 1, e: 'Prehnaná frekvencia otravuje a škodí značke — capping drží slušnú mieru.' },
        { q: 'Budúcnosť remarketingu stojí najmä na:', o: ['Cookies tretích strán', 'First-party dátach (Customer Match, prihlásení používatelia)', 'Faxe', 'Telefónnom zozname'], c: 1, e: 'S ústupom 3rd-party cookies sú vlastné dáta klienta kľúčové aktívum cielenia.' },
      ] },
  ]},

  /* ── SEKCIA 6: OPTIMALIZÁCIA A REPORTING ── */
  { id: 'ads-s6', title: 'Optimalizácia, testovanie, reporting', lessons: [

    { id: 'ads-6-1', title: 'Optimalizačný proces (týždenná rutina)', min: 30,
      theory: `<p>Optimalizácia nie je náhodné „vylepšovanie", ale <strong>disciplinovaná rutina</strong>. Rámec pre spravovaný účet:</p>
<h3>Denne (nový účet) / 2× týždenne (stabilný)</h3>
<ul><li>Anomálie: prudké zmeny útraty, vypnuté reklamy (disapproved), stav rozpočtov, konverzné meranie beží (nula konverzií za deň pri bežných 10 = alarm merania, nie výkonu!).</li></ul>
<h3>Týždenne</h3>
<ul>
<li><strong>Search terms</strong> → negatívy + nové exact slová.</li>
<li>Výkon per kampaň/skupina vs. ciele (CPA/ROAS) — pozor na malé vzorky!</li>
<li>Rozpočty: presun z podvýkonných do výkonných s vyčerpaným rozpočtom (Limited by budget + dobré CPA = rastová príležitosť).</li>
<li>Auction insights — zmeny konkurencie (nový hráč = rast CPC).</li>
</ul>
<h3>Mesačne</h3>
<ul>
<li>RSA assets: výmena „Low" performerov, dopĺňanie variácií.</li>
<li>Analýza per zariadenie/lokalita/čas → úpravy.</li>
<li>Landing pages: konverzný pomer, rýchlosť.</li>
<li>Recommendations & optimalizačné skóre: <strong>kriticky posúdiť</strong> — nie auto-apply! Časť odporúčaní je užitočná, časť zvyšuje útratu bez úžitku.</li>
</ul>
<h3>Zlaté pravidlá</h3>
<ul>
<li><strong>Štatistická významnosť:</strong> 5 klikov nie je dáta. Rozhoduj na stovkách klikov / desiatkach konverzií.</li>
<li><strong>Jedna zmena naraz</strong> (na kampaň) + anotácie zmien s dátumom.</li>
<li>Porovnávaj správne obdobia (týždeň vs. týždeň, medziročne pri sezóne).</li>
</ul>
<div class="warn">Auto-apply recommendations nechávaj vypnuté. Google je tvoj partner, ale aj predajca — odporúčania „pridaj broad match a zvýš rozpočet" nie sú vždy v záujme klienta. Optimalizačné skóre nie je KPI kvality účtu.</div>`,
      checklist: ['Mám týždennú optimalizačnú rutinu', 'Search terms čistím týždenne', 'Zmeny anotujem s dátumom', 'Auto-apply vypnuté, odporúčania posudzujem kriticky'],
      quiz: [
        { q: 'Účet má bežne 10 konverzií denne, dnes 0 pri normálnej útrate. Prvé podozrenie:', o: ['Trh zomrel', 'Rozbité konverzné meranie', 'Konkurencia', 'Počasie'], c: 1, e: 'Náhla nula pri bežiacej útrate = takmer vždy technika (tag, web, formulár), nie dopyt.' },
        { q: 'Rozhodnutie vypnúť kľúčové slovo po 5 klikoch bez konverzie je:', o: ['Správne', 'Predčasné — vzorka je štatisticky bezvýznamná', 'Povinné', 'Optimalizácia'], c: 1, e: 'Pri 2 % konverznom pomere je 5 klikov nič — rozhoduj na zmysluplných objemoch.' },
        { q: '„Limited by budget" pri kampani s výborným CPA znamená:', o: ['Problém kvality', 'Rastovú príležitosť — zvýšenie rozpočtu prinesie viac konverzií', 'Nutnosť vypnúť kampaň', 'Chybu Googlu'], c: 1, e: 'Kampaň by minula viac pri dobrej efektivite — presuň rozpočet z horších miest.' },
        { q: 'Auto-apply recommendations sa odporúča:', o: ['Zapnúť všetky', 'Nechať vypnuté a odporúčania posudzovať manuálne', 'Zapnúť v piatok', 'Neexistujú'], c: 1, e: 'Automatické aplikovanie odovzdáva kontrolu — časť odporúčaní zvyšuje útratu bez prínosu.' },
        { q: 'Auction insights report ukazuje:', o: ['Tvoje heslá', 'Prekryv a pozície konkurentov v aukciách', 'Návštevnosť konkurencie', 'Ich rozpočty presne'], c: 1, e: 'Impression share, overlap rate, position above rate — kto a ako silno s tebou súťaží.' },
      ] },

    { id: 'ads-6-2', title: 'A/B testovanie', min: 25,
      theory: `<p>Systematické testovanie oddeľuje rast od stagnácie. V Ads testuješ na troch úrovniach:</p>
<h3>1. Experiments (oficiálny nástroj)</h3>
<p>Custom experiments: kópia kampane so zmenou, split návštevnosti (50/50), pevné trvanie, štatistické vyhodnotenie priamo v rozhraní. Testuj: bidding stratégie, landing pages, štruktúru, broad match. <strong>Jedna premenná na experiment!</strong></p>
<h3>2. RSA asset testovanie</h3>
<p>V rámci RSA testuje kombinácie sám Google — tvoja rola: dodávať nové nadpisy, sledovať asset performance (Low → vymeniť), porovnávať variácie cez Ad variations.</p>
<h3>3. Landing page testy</h3>
<p>Často najväčší pákový efekt: zdvihnúť konverzný pomer z 2 % na 3 % = −33 % CPA naprieč celým účtom, bez zmeny kampaní. Testuj: headline (zhoda s reklamou!), formulár (počet polí!), CTA, sociálny dôkaz, rýchlosť.</p>
<h3>Metodika</h3>
<ul>
<li><strong>Hypotéza vopred:</strong> „Skrátenie formulára z 8 na 4 polia zvýši CR o 20 %+" — nie „skúsime niečo".</li>
<li>Vzorka: aspoň ~100 konverzií na variant pre spoľahlivý záver (orientačne); menšie účty → testuj väčšie zmeny (výrazné efekty vidno skôr).</li>
<li>Trvanie: min. 2–4 týždne (celé týždne kvôli dňom v týždni).</li>
<li>Zapisuj výsledky — knižnica testov je know-how agentúry.</li>
</ul>
<div class="ex">Hypotéza: pridanie „4,9★ z 320 recenzií" do nadpisov RSA zvýši CTR. Test cez Ad variations na 4 týždne: CTR +11 %, CPA −6 %. Zavedené do celého účtu — a do playbooku pre ďalších klientov.</div>`,
      checklist: ['Testujem cez Experiments s jednou premennou', 'Sledujem asset performance v RSA', 'Landing page testy s hypotézou', 'Vediem knižnicu testov a výsledkov'],
      quiz: [
        { q: 'Správny experiment mení:', o: ['Všetko naraz', 'Jednu premennú', 'Nič', 'Iba farby'], c: 1, e: 'Viac zmien naraz = nevieš, čo spôsobilo výsledok. Izoluj premennú.' },
        { q: 'Custom experiment v Ads rozdelí:', o: ['Rozpočet medzi klientov', 'Návštevnosť medzi pôvodnú a testovaciu verziu kampane', 'Účet na dva', 'Tím'], c: 1, e: 'Split (typicky 50/50) umožní férové porovnanie výkonu obidvoch verzií.' },
        { q: 'Zvýšenie konverzného pomeru landing page z 2 % na 3 % zníži CPA o:', o: ['3 %', '~33 %', '50 %', '0 %'], c: 1, e: 'Rovnaké kliky, 1,5× konverzií → CPA klesá na 2/3. Landing page je obrovská páka.' },
        { q: 'Test má bežať:', o: ['3 hodiny', 'Min. 2–4 celé týždne', '1 deň', 'Rok minimum'], c: 1, e: 'Celé týždne vyrovnajú denné vzorce; kratšie testy klamú.' },
        { q: 'Pred spustením testu potrebuješ:', o: ['Tlačovú správu', 'Jasnú hypotézu a metriku úspechu', 'Súhlas Googlu', 'Nový web'], c: 1, e: 'Hypotéza vopred bráni „interpretácii po" — vieš, čo meriaš a kedy je test úspešný.' },
      ] },

    { id: 'ads-6-3', title: 'Reporting pre klientov', min: 25,
      theory: `<p>Report je produkt — často jediné, čo klient z tvojej práce „vidí". Zlý report = stratený klient aj pri dobrých výsledkoch.</p>
<h3>Štruktúra dobrého reportu</h3>
<ol>
<li><strong>Exekutívne zhrnutie</strong> (3–5 viet ľudskou rečou): čo sa dialo, prečo, čo ďalej.</li>
<li><strong>Biznis metriky:</strong> konverzie, CPA/ROAS, hodnota — vs. cieľ a vs. minulé obdobie.</li>
<li><strong>Vysvetlenie zmien:</strong> „CPA vzrástlo o 12 % — do aukcie vstúpil nový konkurent (auction insights), kompenzujeme rozšírením exact slov."</li>
<li><strong>Vykonané práce</strong> — nech je vidieť hodnota správy účtu.</li>
<li><strong>Plán na ďalšie obdobie</strong> + potreby od klienta (landing page, fotky, rozpočet).</li>
</ol>
<h3>Zásady</h3>
<ul>
<li><strong>Metriky v jazyku biznisu:</strong> majiteľa nezaujíma CTR — zaujíma ho, koľko stojí zákazník a či sa reklamy oplatia. Vanity metriky (impresie!) nikdy ako hlavné čísla.</li>
<li>Konzistentné obdobia a definície; anotácie zmien priamo v grafe.</li>
<li>Nástroje: <strong>Looker Studio</strong> (zadarmo, live dashboardy z Ads/GA4/GSC) — štandard agentúr.</li>
<li>Zlé správy komunikuj proaktívne a s plánom — dôvera sa buduje v zlých mesiacoch, nie v dobrých.</li>
</ul>
<div class="warn">Report bez interpretácie je len tabuľka — klient si ju nevie prečítať a začne pochybovať. Každé číslo v reporte má odpovedať na otázku „no a čo to pre mňa znamená?"</div>`,
      checklist: ['Report začína exekutívnym zhrnutím', 'Hlavné metriky sú biznisové (CPA/ROAS/hodnota)', 'Mám Looker Studio šablónu', 'Zlé správy komunikujem proaktívne s plánom'],
      quiz: [
        { q: 'Hlavné metriky klientskeho reportu majú byť:', o: ['Impresie a CTR', 'Konverzie, CPA/ROAS a hodnota vs. ciele', 'Počet kľúčových slov', 'Optimalizačné skóre'], c: 1, e: 'Klient platí za biznis výsledky — vanity metriky patria nanajvýš do prílohy.' },
        { q: 'Štandardný bezplatný nástroj na klientske dashboardy je:', o: ['Excel 97', 'Looker Studio', 'Poznámkový blok', 'Paint'], c: 1, e: 'Looker Studio ťahá live dáta z Ads, GA4 aj GSC do zdieľateľných dashboardov.' },
        { q: 'CPA medzimesačne vzrástlo. V reporte:', o: ['Číslo skryješ', 'Vysvetlíš príčinu a plán nápravy', 'Zmeníš definíciu CPA', 'Obviníš klienta'], c: 1, e: 'Proaktívna interpretácia + plán = dôvera. Skrývanie sa vždy prevalí.' },
        { q: 'Sekcia „vykonané práce" v reporte slúži na:', o: ['Vyplnenie miesta', 'Zviditeľnenie hodnoty priebežnej správy účtu', 'Splnenie zákona', 'Nič'], c: 1, e: 'Klient nevidí do účtu — bez tejto sekcie nevie, že správa účtu je kontinuálna práca.' },
        { q: 'Report bez interpretácie čísel je:', o: ['Profesionálny štandard', 'Nedostatočný — čísla potrebujú kontext „čo to znamená a čo s tým"', 'Rýchlejší a preto lepší', 'Povinný formát'], c: 1, e: 'Interpretácia a odporúčania sú presne to, za čo si klient platí špecialistu.' },
      ] },

    { id: 'ads-6-4', title: 'Najčastejšie chyby v Google Ads účtoch', min: 25,
      theory: `<p>Zoznam chýb, ktoré nájdeš v 90 % auditovaných účtov — tvoj checklist na audit aj prevenciu:</p>
<h3>Meranie a stratégia</h3>
<ol>
<li><strong>Žiadne/rozbité konverzné meranie</strong> — účet letí naslepo. Chyba č. 1.</li>
<li>Mikrokonverzie ako primary — bidding sa učí na šume.</li>
<li>Brand a non-brand zmiešané — falošný pocit výkonu.</li>
<li>Žiadna stratégia — kampane „nejak bežia" bez cieľov CPA/ROAS.</li>
</ol>
<h3>Štruktúra a cielenie</h3>
<ol start="5">
<li>Všetko na homepage — žiadne relevantné landing pages.</li>
<li>Miešané témy v jednej ad group → generické reklamy.</li>
<li>Broad match bez negatív a bez smart biddingu.</li>
<li>Zabudnuté lokality (celé Slovensko pri lokálnej firme; „Presence or interest" default zahŕňa aj záujem o lokalitu — skontroluj nastavenie!).</li>
<li>Display select zapnutý v Search kampani (default!) — miešanie sietí.</li>
</ol>
<h3>Správa</h3>
<ol start="10">
<li>Search terms nikto nečistí mesiace.</li>
<li>Auto-apply odporúčania zapnuté — účet sa „optimalizuje" sám proti záujmom klienta.</li>
<li>Žiadne assets/rozšírenia.</li>
<li>Rozpočty rozotreté na 15 kampaní po 2 €/deň — nič nemá dosť dát.</li>
<li>Nulová práca s ad copy — 1 reklama na skupinu, roky nezmenená.</li>
</ol>
<div class="tip">Tento zoznam je zároveň tvoj „audit produkt": prejdi cudzí účet proti týmto 14 bodom a máš profesionálny audit s vysokou pridanou hodnotou za hodinu práce. Väčšina účtov spravovaných „kamarátom, čo tomu rozumie" má 8+ z týchto chýb.</div>`,
      checklist: ['Viem vymenovať top 5 chýb merania a stratégie', 'Kontrolujem nastavenie lokalít (presence vs. interest)', 'Search partner / Display select nastavenia vedome', 'Používam zoznam ako audit checklist'],
      quiz: [
        { q: 'Najzávažnejšia chyba v Ads účte je typicky:', o: ['Málo emoji v reklamách', 'Chýbajúce alebo rozbité konverzné meranie', 'Krátke nadpisy', 'Málo kampaní'], c: 1, e: 'Bez merania nefunguje bidding, optimalizácia ani vyhodnotenie — všetko ostatné je sekundárne.' },
        { q: 'Predvolené nastavenie lokalít „Presence or interest" znamená:', o: ['Len ľudia v lokalite', 'Aj ľudia, ktorí o lokalitu prejavili záujem (môžu byť inde)', 'Celý svet', 'Len turisti'], c: 1, e: 'Default zahŕňa „záujem o lokalitu" — lokálna firma často chce prepnúť na Presence only.' },
        { q: 'Rozpočet 30 €/deň na 15 kampaní spôsobí:', o: ['Skvelú diverzifikáciu', 'Žiadna kampaň nemá dosť dát na učenie a optimalizáciu', 'Vyššie zľavy', 'Rýchlejší learning'], c: 1, e: 'Fragmentácia = hlad po dátach všade. Konsoliduj do menej kampaní so zmysluplnými rozpočtami.' },
        { q: 'Miešanie brand a non-brand výkonu v jednom čísle:', o: ['Je štandard', 'Vytvára ilúziu výkonu — brand konverzie maskujú drahý non-brand', 'Zlepšuje ROAS reálne', 'Vyžaduje ho Google'], c: 1, e: 'Brand konvertuje lacno „sám od seba" — priemer potom skrýva skutočnú cenu akvizície nových zákazníkov.' },
        { q: 'Jedna nemenná reklama na ad group počas 2 rokov znamená:', o: ['Stabilitu', 'Únavu kreatívy a stratu potenciálu — reklamy treba obmieňať a testovať', 'Vernosť značke', 'Úsporu'], c: 1, e: 'Ad fatigue + žiadne testovanie = kampaň nevyužíva najsilnejšiu páku Search reklamy: text.' },
      ] },
  ]},

  /* ── SEKCIA 7: PRAX A CERTIFIKÁCIE ── */
  { id: 'ads-s7', title: 'Prax, case studies a certifikácie', lessons: [

    { id: 'ads-7-1', title: 'Stavba účtu od nuly (kompletný playbook)', min: 40,
      theory: `<p>Kompletný postup spustenia účtu pre nového klienta — od brífu po prvý report:</p>
<h3>Fáza 1: Discovery (týždeň 1)</h3>
<ul><li>Biznis: marža, hodnota zákazníka, kapacita, sezónnosť, USP, konkurencia. Ciele → cieľové CPA/ROAS (vypočítané, nie vysnívané). Keyword research + odhad rozpočtu (Keyword Planner forecast).</li></ul>
<h3>Fáza 2: Základy (týždeň 1–2)</h3>
<ul><li>Účet (klient vlastní, agentúra cez MCC), fakturácia, konverzné meranie (GTM + testy!), GA4 prepojenie, Consent Mode, publiká (remarketing tagy zbierajú od prvého dňa), landing pages review.</li></ul>
<h3>Fáza 3: Stavba (týždeň 2)</h3>
<ul>
<li>Brand Search kampaň (obrana, lacné konverzie, čisté dáta).</li>
<li>Non-brand Search: 2–5 tematických ad groups, phrase+exact, RSA ×2, všetky assets, univerzálne negatívy, správne lokality (Presence only!).</li>
<li>E-shop: + Merchant Center, feed, PMax/Shopping.</li>
</ul>
<h3>Fáza 4: Launch a stabilizácia (týždeň 3–6)</h3>
<ul><li>Štart: Maximize Clicks alebo Max Conversions (podľa dát), denná kontrola search terms prvé 2 týždne, po 30–50 konverziách prechod na tCPA/tROAS, learning fáza — nechať dýchať.</li></ul>
<h3>Fáza 5: Rast (mesiac 2+)</h3>
<ul><li>Škálovanie víťazov, rozšírenie tém, remarketing/Demand Gen, experimenty, mesačný reporting rytmus.</li></ul>
<div class="tip">Nikdy nesľubuj výsledky prvého mesiaca — prvý mesiac je zber dát a kalibrácia. Nastav očakávania: mesiac 1 = učenie, mesiac 2–3 = stabilizácia na cieľové CPA, potom škálovanie. Klient, ktorý toto počul vopred, neodíde po 4 týždňoch.</div>`,
      checklist: ['Mám discovery dotazník pre klientov', 'Meranie nasadené a otestované pred spustením', 'Štruktúra: brand + tematické non-brand', 'Plán prechodu na smart bidding po zbere dát', 'Očakávania klienta nastavené na 3 mesiace'],
      quiz: [
        { q: 'Prvý technický krok pred spustením kampaní je:', o: ['Napísať reklamy', 'Nasadiť a otestovať konverzné meranie', 'Zvýšiť rozpočet', 'Vybrať farby'], c: 1, e: 'Kampane bez merania = žiadne dáta pre bidding ani vyhodnotenie. Meranie je fáza 2, kampane až po ňom.' },
        { q: 'Prečo spustiť brand kampaň aj pri malom rozpočte?', o: ['Netreba ju', 'Lacná obrana pred konkurenciou a čisté oddelenie brand dát', 'Zvyšuje CPC', 'Google ju vyžaduje'], c: 1, e: 'Brand CPC je nízke, konkurencia môže na brand bidovať — a oddelenie čistí non-brand čísla.' },
        { q: 'Na tCPA prechádzaš typicky po:', o: ['1 dni', '30–50 konverziách nazbieraných v účte', '1000 konverzií', 'Nikdy'], c: 1, e: 'Smart bidding potrebuje signál — do jeho nazbierania slúži Max Conversions/Clicks.' },
        { q: 'Reálne očakávanie od 1. mesiaca kampaní je:', o: ['Okamžitý cieľový ROAS', 'Zber dát a kalibrácia — výkon sa stabilizuje v mesiacoch 2–3', 'Zdvojnásobenie firmy', 'Nič sa nedozvieme'], c: 1, e: 'Learning + čistenie dopytov + optimalizácia potrebujú čas — sľubovať okamžité výsledky je cesta k strate klienta.' },
        { q: 'Remarketingové tagy nasadzuješ:', o: ['Až keď spustíš remarketing kampaň', 'Od prvého dňa — zoznamy sa budujú priebežne', 'Nikdy', 'Len v decembri'], c: 1, e: 'Publiká sa plnia od nasadenia tagu — keď remarketing spustíš, zoznamy už majú objem.' },
      ] },

    { id: 'ads-7-2', title: 'Case studies: reálne scenáre', min: 30,
      theory: `<h3>Case 1: Lokálna služba (zámočník) — malý rozpočet, veľký intent</h3>
<p><strong>Vstup:</strong> 500 €/mes., okamžitá potreba zákazníkov („havarijný" dopyt).<br>
<strong>Riešenie:</strong> len Search, exact/phrase na core dopyty („otváranie dverí [mesto]"), Presence only lokality, call assets + call konverzie, otváracie hodiny 24/7 v reklamách, mobilná landing s klik-to-call.<br>
<strong>Výsledok:</strong> CPA hovoru 8 €, 55 hovorov/mes. Kľúč: nulový rozptyl — každé euro na najvyšší intent.</p>
<h3>Case 2: E-shop s kozmetikou — škálovanie cez feed a PMax</h3>
<p><strong>Vstup:</strong> 3 000 €/mes., stagnujúci ROAS 350 % pri break-even 300 %.<br>
<strong>Riešenie:</strong> feed audit (titles + GTIN + obrázky), PMax rozdelený podľa marže kategórií (rôzne tROAS!), brand exclusions, non-brand Search na top kategórie, zvýšenie hodnôt cez Enhanced Conversions.<br>
<strong>Výsledok:</strong> ROAS 480 % pri +40 % útrate — rast zisku, nie len pomeru. Kľúč: maržová segmentácia PMax.</p>
<h3>Case 3: B2B SaaS — dlhý cyklus, offline import</h3>
<p><strong>Vstup:</strong> leady lacné, ale obchod hlásil nekvalitu.<br>
<strong>Riešenie:</strong> offline conversion import z CRM (lead → demo → deal), primary konverzia zmenená z „formulár" na „kvalifikovaný lead", tCPA na novú konverziu, custom segments (vyhľadávače konkurenčných riešení), obsah na porovnávacie dopyty.<br>
<strong>Výsledok:</strong> počet leadov −20 %, počet dealov +35 %. Kľúč: optimalizácia na kvalitu cez CRM slučku.</p>
<div class="tip">Vzorec všetkých troch: pochopenie biznisu → správne KPI → meranie tohto KPI → koncentrácia rozpočtu tam, kde KPI rastie. Kampane sú detail; systém je stratégia + meranie.</div>`,
      checklist: ['Rozumiem stratégii pre malý rozpočet', 'Chápem maržovú segmentáciu PMax', 'Viem, ako CRM slučka mení optimalizáciu B2B', 'Zapísal som si vzorec: biznis → KPI → meranie → koncentrácia'],
      quiz: [
        { q: 'Pri rozpočte 500 € na havarijnú službu je správna stratégia:', o: ['PMax + Display + Video mix', 'Koncentrácia na Search s najvyšším intentom a call konverzie', 'Brand awareness YouTube', 'Newsletter'], c: 1, e: 'Malý rozpočet + urgentný dopyt = 100 % na dno funnela, merané hovormi.' },
        { q: 'PMax rozdelený podľa marže kategórií umožňuje:', o: ['Krajšie názvy kampaní', 'Rôzne tROAS ciele pre rôzne ziskové produkty', 'Viac fotiek', 'Rýchlejší web'], c: 1, e: 'Kategória s maržou 60 % unesie iný ROAS cieľ než kategória s 15 % — jeden spoločný cieľ by jednu z nich brzdil.' },
        { q: 'B2B firma s „lacnými ale nekvalitnými leadmi" má:', o: ['Znížiť CPA cieľ', 'Zaviesť offline import a optimalizovať na kvalifikované leady/dealy', 'Vypnúť Ads', 'Zdvojnásobiť rozpočet'], c: 1, e: 'CRM spätná väzba naučí bidding rozlišovať kvalitu — menej leadov, viac obchodov.' },
        { q: 'Rast ROAS z 350 % na 480 % pri +40 % útrate znamená:', o: ['Menší zisk', 'Rast absolútneho zisku — efektivita aj objem naraz', 'Chybu merania', 'Nič'], c: 1, e: 'Vyšší pomer pri vyššom objeme = ideálny výsledok škálovania (nad break-even 300 %).' },
        { q: 'Spoločný menovateľ úspešných case studies je:', o: ['Veľký rozpočet', 'Správne KPI + presné meranie + koncentrácia rozpočtu', 'Šťastie', 'Počet kampaní'], c: 1, e: 'Stratégia a meranie robia výsledok; samotné „nastavenie kampaní" je len remeslo na konci.' },
      ] },

    { id: 'ads-7-3', title: 'Príprava na certifikácie Google Ads', min: 25,
      theory: `<p>Oficiálne certifikácie sú na <strong>Google Skillshop</strong> (skillshop.docebosaas.com / skillshop.withgoogle.com) — zadarmo, online, bez dozoru.</p>
<h3>Dostupné certifikácie Google Ads</h3>
<ul>
<li><strong>Search</strong> — najdôležitejšia; aukcia, keywords, RSA, bidding.</li>
<li><strong>Display</strong>, <strong>Video</strong>, <strong>Shopping</strong> (feed/Merchant), <strong>Apps</strong>, <strong>Measurement</strong> (konverzie, atribúcia), <strong>AI-Powered Ads / Performance</strong> (novšie moduly okolo PMax a automatizácie).</li>
</ul>
<h3>Formát skúšky (typicky)</h3>
<ul>
<li>~50 otázok, limit ~75 minút, potrebných <strong>80 %</strong>.</li>
<li>Multiple choice, scenárové otázky („Inzerent chce X, čo odporučíš?").</li>
<li>Platnosť 12 mesiacov — potom obnova.</li>
<li>Neúspech → opakovanie po 24 hodinách.</li>
</ul>
<h3>Ako sa učiť (efektívne)</h3>
<ol>
<li>Prejdi Skillshop study path k danej certifikácii (výklad + mini kvízy).</li>
<li>Dôraz na <strong>Google „ideológiu"</strong>: správne odpovede favorizujú automatizáciu, smart bidding, broad match + smart bidding, RSA, PMax. Skúška testuje Google-recommended prístup — aj tam, kde má prax nuansy.</li>
<li>Scenárové otázky: hľadaj cieľ inzerenta v zadaní — odpoveď sa viaže na cieľ (awareness→reach, konverzie→smart bidding…).</li>
<li>V tejto aplikácii: sprav si záverečný test modulu Ads a Mock certifikačný test na 80 %+ pred ostrým pokusom.</li>
</ol>
<div class="warn">Certifikácia ≠ kompetencia — je to vstupenka a signál pre klientov/zamestnávateľov (a podmienka Google Partner statusu agentúr). Skutočnú hodnotu buduje prax z projektov. Ideál: certifikát + portfólio projektov z tohto kurzu.</div>`,
      checklist: ['Mám účet na Skillshop', 'Prešiel som study path k Search certifikácii', 'Rozumiem „Google-recommended" logike odpovedí', 'Mock test v tejto aplikácii na 80 %+'],
      quiz: [
        { q: 'Certifikácie Google Ads sú:', o: ['Platené 500 €', 'Zadarmo na Google Skillshop', 'Len pre agentúry', 'Zrušené'], c: 1, e: 'Skillshop poskytuje študijné materiály aj skúšky bezplatne.' },
        { q: 'Na absolvovanie potrebuješ typicky:', o: ['50 %', '80 %', '100 %', '65 %'], c: 1, e: 'Hranica je 80 % — pri neúspechu opakuješ po 24 hodinách.' },
        { q: 'Platnosť certifikácie je:', o: ['Doživotná', '12 mesiacov', '5 rokov', '30 dní'], c: 1, e: 'Certifikácie sa obnovujú ročne — Google chce aktuálne znalosti.' },
        { q: 'V certifikačných otázkach Google favorizuje:', o: ['Manuálne CPC a vypnutú automatizáciu', 'Odporúčané postupy: smart bidding, RSA, automatizáciu', 'Reklamy bez merania', 'Čo najviac kampaní'], c: 1, e: 'Skúška testuje Google-recommended prístup — pri odpovediach mysli „čo by odporučil Google".' },
        { q: 'Certifikácia má najväčšiu hodnotu v kombinácii s:', o: ['Ďalšími 10 certifikátmi bez praxe', 'Portfóliom reálnych projektov', 'Peknou fotkou', 'Ničím'], c: 1, e: 'Certifikát otvára dvere, portfólio a výsledky ich držia otvorené.' },
      ] },

    { id: 'ads-7-4', title: 'Záverečný projekt modulu Google Ads', min: 90,
      theory: `<p>Vrcholový projekt kurzu — kompletný návrh Google Ads systému pre reálnu firmu.</p>
<h3>Zadanie</h3>
<p>Vyber si reálnu firmu (pokojne tú istú ako pri GBP projekte) a vypracuj <strong>kompletný media plán a návrh účtu</strong>:</p>
<ol>
<li><strong>Discovery dokument:</strong> biznis model, marža, hodnota zákazníka, výpočet cieľového CPA/ROAS, konkurenčná analýza (kto inzeruje na core dopyty — over v SERP!).</li>
<li><strong>Keyword research:</strong> min. 50 slov v tematických skupinách s intentom a odhadom CPC (Keyword Planner).</li>
<li><strong>Návrh štruktúry účtu:</strong> kampane (typy, rozpočty, bidding), ad groups, match types, negatívne zoznamy — vizuálna schéma.</li>
<li><strong>Kreatívy:</strong> 2 kompletné RSA (15 nadpisov + 4 popisy) pre 2 rôzne ad groups + návrh assets (sitelinks, callouts…).</li>
<li><strong>Plán merania:</strong> konverzné akcie (primary/secondary), hodnoty, Consent Mode, remarketing zoznamy.</li>
<li><strong>Launch plán:</strong> fázy, míľniky, prechod na smart bidding, očakávania pre klienta na 3 mesiace.</li>
<li><strong>Návrh reportu:</strong> mock mesačný report s vymyslenými (ale realistickými) číslami a interpretáciou.</li>
</ol>
<h3>Kritériá hodnotenia</h3>
<ul>
<li>Ekonomika (CPA/ROAS odvodené z biznisu) — 20 %</li>
<li>Kvalita researchu a štruktúry — 25 %</li>
<li>Kreatívy a súlad s pravidlami — 20 %</li>
<li>Plán merania — 20 %</li>
<li>Launch plán a report — 15 %</li>
</ul>
<div class="tip">Tento dokument je presne to, čo agentúry nazývajú „návrh stratégie" a fakturujú za 500–1500 €. S GBP auditom, GSC auditom a týmto plánom máš kompletné portfólio troch služieb — dosť na juniora v agentúre aj na prvých vlastných klientov.</div>`,
      checklist: ['Discovery s výpočtom cieľového CPA/ROAS', 'Keyword research 50+ slov v skupinách', 'Schéma štruktúry účtu', '2 kompletné RSA + assets', 'Plán merania vrátane Consent Mode', 'Launch plán s očakávaniami', 'Mock report s interpretáciou'],
      quiz: [
        { q: 'Cieľové CPA v projekte odvodíš z:', o: ['Okrúhleho čísla', 'Marže a hodnoty zákazníka', 'CPC konkurencie', 'Rozpočtu na kávu'], c: 1, e: 'Ekonomika firmy určuje, čo si akvizícia môže dovolit — všetko ostatné sa odvíja od toho.' },
        { q: 'Konkurenčnú analýzu inzerentov spravíš najjednoduchšie:', o: ['Telefonátom konkurencii', 'Vyhľadaním core dopytov a analýzou zobrazených reklám', 'Kúpou dát', 'Nedá sa'], c: 1, e: 'SERP je verejný — reklamy, ich texty, ponuky a landing pages konkurencie vidíš na vlastné oči.' },
        { q: 'Kompletné RSA v projekte znamená:', o: ['1 nadpis', '15 nadpisov a 4 popisy s rôznymi uhlami', '5 emoji', 'Len URL'], c: 1, e: 'Plne obsadené RSA s diverzitou uhlov je štandard kvalitnej práce.' },
        { q: 'Mock report s vymyslenými číslami trénuje:', o: ['Klamanie', 'Interpretáciu a komunikáciu výsledkov klientovi', 'Matematiku', 'Grafický dizajn'], c: 1, e: 'Schopnosť vysvetliť čísla a navrhnúť ďalšie kroky je polovica hodnoty špecialistu.' },
        { q: 'Trhová hodnota kompletného návrhu stratégie je rádovo:', o: ['10 €', '500–1500 €', '1 000 000 €', 'Nula'], c: 1, e: 'Strategický návrh účtu je štandardná platená služba agentúr — tvoj projekt je jej plnohodnotná verzia.' },
      ] },
  ]},
]});
</script>
