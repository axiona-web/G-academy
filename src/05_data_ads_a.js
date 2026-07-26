<script>
/* ═══════════════════════════════════════════════════════════════════
   DÁTA — MODUL 3: GOOGLE ADS (časť A: sekcie 1–3)
   Najväčší modul kurzu — od ekosystému po všetky typy kampaní.
   ═══════════════════════════════════════════════════════════════════ */
DATA.modules.push({
  id: 'ads',
  name: 'Google Ads',
  short: 'Ads',
  icon: 'megaphone',
  color: '#f59e0b',
  desc: 'Kompletný Google Ads: aukcia, Search, PMax, Shopping, Video, bidding, meranie konverzií, optimalizácia a príprava na oficiálne certifikácie.',
  difficulty: 'Začiatočník → Senior',
  hours: 38,
  sections: [

  /* ── SEKCIA 1: ZÁKLADY ── */
  { id: 'ads-s1', title: 'Základy Google Ads', lessons: [

    { id: 'ads-1-1', title: 'Ekosystém Google Ads a ako funguje aukcia', min: 30,
      theory: `<p><strong>Google Ads</strong> je aukčný reklamný systém pokrývajúci: vyhľadávanie (Search), partnerské weby a aplikácie (Display sieť — milióny webov), YouTube, Gmail, Discover, Maps a Google Play. Platíš spravidla za klik (<strong>CPC</strong>) alebo tisíc zobrazení (<strong>CPM</strong>), pri niektorých cieľoch za konverziu/zhliadnutie.</p>
<h3>Ako funguje aukcia (zjednodušene, ale presne)</h3>
<p>Pri každom vyhľadávaní prebehne bleskurýchla aukcia. O poradí rozhoduje <strong>Ad Rank</strong>:</p>
<p style="text-align:center"><code>Ad Rank ≈ max. CPC bid × Quality Score + vplyv assets a kontextu</code></p>
<ul>
<li><strong>Nevyhráva najvyššia ponuka</strong> — vyhráva najlepšia kombinácia ceny a kvality.</li>
<li>Reálne platíš len toľko, koľko treba na prekonanie Ad Ranku inzerenta pod tebou (aukcia druhej ceny, upravená o kvalitu) — často menej ako tvoj max bid.</li>
<li>Kvalitná reklama s relevantnou landing page môže platiť <strong>menej za lepšiu pozíciu</strong> než drahá nekvalitná.</li>
</ul>
<h3>Prečo je to geniálny model</h3>
<p>Google odmeňuje relevanciu, lebo relevantné reklamy = spokojní používatelia = viac vyhľadávaní. Pre teba to znamená: <strong>optimalizácia kvality je lacnejšia než zvyšovanie bidov.</strong></p>
<div class="ex">Inzerent A: bid 2 €, QS 9. Inzerent B: bid 4 €, QS 3. Ad Rank: A = 18, B = 12. A vyhráva vyššiu pozíciu a zaplatí len ~(12/9)+0,01 ≈ 1,34 € — hoci B ponúkal dvojnásobok.</div>
<div class="tip">Toto je aj najčastejšia certifikačná otázka: „Vyhráva aukciu vždy najvyšší bid?" Nie — Ad Rank kombinuje bid, kvalitu, prahové hodnoty, kontext vyhľadávania a očakávaný vplyv assets.</div>`,
      checklist: ['Viem vymenovať plochy, kde sa Ads zobrazujú', 'Rozumiem vzorcu Ad Ranku', 'Viem vysvetliť aukciu druhej ceny', 'Chápem, prečo kvalita znižuje cenu'],
      quiz: [
        { q: 'Aukciu Google Ads vyhráva:', o: ['Vždy najvyšší bid', 'Najlepšia kombinácia bidu a kvality (Ad Rank)', 'Najstarší účet', 'Najväčší rozpočet'], c: 1, e: 'Ad Rank = bid × kvalita + ďalšie faktory. Vysoký bid s nízkou kvalitou prehráva s nižším bidom a vysokou kvalitou.' },
        { q: 'Pri CPC modeli platíš za:', o: ['Zobrazenie', 'Kliknutie', 'Konverziu', 'Deň'], c: 1, e: 'Cost-per-click — platba až pri kliknutí na reklamu.' },
        { q: 'Skutočná zaplatená cena za klik je typicky:', o: ['Presne tvoj max bid', 'Len toľko, koľko treba na prekonanie konkurenta pod tebou', 'Dvojnásobok bidu', 'Fixná sadzba'], c: 1, e: 'Aukcia druhej ceny — platíš minimálnu čiastku potrebnú na udržanie pozície, nie svoj strop.' },
        { q: 'Do ekosystému Google Ads NEPATRÍ:', o: ['YouTube', 'Gmail', 'Facebook Feed', 'Google Maps'], c: 2, e: 'Facebook patrí spoločnosti Meta — Google Ads pokrýva Google plochy a partnerskú sieť.' },
        { q: 'Prečo Google odmeňuje kvalitné reklamy nižšou cenou?', o: ['Z dobrej vôle', 'Relevantné reklamy udržiavajú spokojnosť používateľov a dlhodobý zisk platformy', 'Zo zákona', 'Náhodou'], c: 1, e: 'Ekonomika platformy stojí na tom, že reklamy neodháňajú používateľov — relevancia sa preto vypláca všetkým stranám.' },
      ] },

    { id: 'ads-1-2', title: 'Štruktúra účtu: kampane, ad groups, reklamy', min: 25,
      theory: `<p>Google Ads má prísnu hierarchiu — a dobrá štruktúra je základ výkonu aj prehľadnosti:</p>
<ul>
<li><strong>Účet</strong> — fakturácia, používatelia, konverzie, publiká.</li>
<li><strong>Kampaň</strong> — rozpočet/deň, typ (Search, PMax…), bidding stratégia, lokality, jazyky, siete.</li>
<li><strong>Ad group (reklamná skupina)</strong> — kľúčové slová/cielenie + reklamy. Zlaté pravidlo: <strong>tesne súvisiace kľúčové slová + reklamy na tú istú tému</strong>.</li>
<li><strong>Reklamy a assets</strong> — RSA texty, rozšírenia.</li>
</ul>
<h3>Princípy dobrej štruktúry</h3>
<ul>
<li><strong>Kampane deľ podľa</strong>: biznis cieľov a marží, rozpočtových priorít, lokalít, typov produktov. Rozpočet sa nastavuje na úrovni kampane — čo potrebuje vlastný rozpočet, potrebuje vlastnú kampaň.</li>
<li><strong>Ad groups deľ podľa tém</strong>: „oprava práčky" ≠ „oprava umývačky". Reklama musí obsahovať to, čo človek hľadal.</li>
<li>Brand vs. non-brand vždy oddelene (radikálne iný výkon a CPC).</li>
<li>Éra smart biddingu praje <strong>konsolidácii</strong>: menej, väčších kampaní s dostatkom konverzných dát > desiatky mikrokampaní (výnimka: potreba oddelených rozpočtov/cieľov).</li>
</ul>
<h3>MCC (Manager Account)</h3>
<p>Agentúrny nadúčet spravujúci klientske účty. Klient vlastní svoj účet, agentúra má prístup cez MCC — rovnaká filozofia ako pri GBP.</p>
<div class="warn">Historický „SKAG" prístup (single keyword ad group — 1 kľúčové slovo = 1 skupina) je s dnešnými match types a smart biddingom prežitok, ktorý drobí dáta. Moderný štandard: tematické skupiny s 5–20 úzko súvisiacimi slovami.</div>`,
      checklist: ['Viem nakresliť hierarchiu účtu', 'Chápem, kedy vytvoriť novú kampaň vs. ad group', 'Brand a non-brand oddelené', 'Rozumiem úlohe MCC účtu'],
      quiz: [
        { q: 'Denný rozpočet sa nastavuje na úrovni:', o: ['Účtu', 'Kampane', 'Ad group', 'Kľúčového slova'], c: 1, e: 'Rozpočet je vlastnosť kampane — preto priority s vlastným rozpočtom potrebujú vlastnú kampaň.' },
        { q: 'Ad group má obsahovať:', o: ['Všetky kľúčové slová účtu', 'Tesne súvisiace kľúčové slová a reklamy na rovnakú tému', 'Maximálne 1 slovo', 'Len brandové výrazy'], c: 1, e: 'Téma skupiny = téma reklám = téma landing page. To je základ relevancie a Quality Score.' },
        { q: 'Prečo oddeľovať brand a non-brand kampane?', o: ['Je to povinné', 'Radikálne odlišný výkon, CPC a účel — spolu by skresľovali dáta a rozpočty', 'Kvôli farbám', 'Netreba oddeľovať'], c: 1, e: 'Brand má extrémne lacné konverzie — zmiešaný s non-brand vytvára ilúziu výkonu a maskuje reálne čísla.' },
        { q: 'MCC účet slúži na:', o: ['Hranie hier', 'Centrálnu správu viacerých klientskych účtov agentúrou', 'Zdvojnásobenie rozpočtu', 'Obchádzanie pravidiel'], c: 1, e: 'My Client Center — agentúrny manager účet s prístupom k účtom klientov bez preberania vlastníctva.' },
        { q: 'V ére smart biddingu sa pri štruktúre odporúča:', o: ['Tisíce mikrokampaní', 'Konsolidácia — menej kampaní s dostatkom konverzných dát', 'SKAG pre každé slovo', 'Jedna kampaň pre 10 krajín s rôznymi cieľmi'], c: 1, e: 'Algoritmy sa učia z dát — roztrieštené kampane = málo signálu na skupinu = horší výkon.' },
      ] },

    { id: 'ads-1-3', title: 'Typy kampaní — prehľad a výber', min: 25,
      theory: `<p>Výber typu kampane je strategické rozhodnutie podľa cieľa a fázy nákupného cyklu:</p>
<table>
<tr><th>Typ</th><th>Kde beží</th><th>Najlepší na</th></tr>
<tr><td><strong>Search</strong></td><td>výsledky vyhľadávania</td><td>zachytenie existujúceho dopytu — najvyšší intent</td></tr>
<tr><td><strong>Performance Max</strong></td><td>všetky plochy Googlu naraz</td><td>konverzie naprieč kanálmi, e-commerce (s feedom)</td></tr>
<tr><td><strong>Display</strong></td><td>milióny webov/aplikácií</td><td>awareness, remarketing, lacný zásah</td></tr>
<tr><td><strong>Shopping</strong></td><td>karta Nákupy + SERP</td><td>e-shopy — produktové reklamy s cenou a fotkou</td></tr>
<tr><td><strong>Video</strong></td><td>YouTube</td><td>awareness, consideration, akcie (VAC)</td></tr>
<tr><td><strong>Demand Gen</strong></td><td>YouTube, Shorts, Discover, Gmail</td><td>vizuálny dopyt „na sociálny spôsob"</td></tr>
<tr><td><strong>App</strong></td><td>všetky plochy</td><td>inštalácie a akcie v aplikácii</td></tr>
</table>
<h3>Ako vyberať (framework)</h3>
<ol>
<li><strong>Existuje dopyt?</strong> Ľudia to hľadajú → Search (+ Shopping pri e-shope).</li>
<li><strong>Dopyt treba vytvoriť?</strong> Nový produkt, impulz → Demand Gen, Video, Display.</li>
<li><strong>Máš feed a širšie ciele?</strong> → PMax ako doplnok Search, nie náhrada.</li>
<li><strong>Rozpočet?</strong> Malý rozpočet → koncentruj na najvyšší intent (Search exact/phrase na peniaze-dopyty). Nerozotieraj 500 € na 5 typov kampaní.</li>
</ol>
<div class="tip">Klasická zostava malej firmy: 1× Brand Search, 1× non-brand Search (core služby), neskôr + PMax/remarketing. Klasická zostava e-shopu: Brand Search + PMax s feedom + non-brand Search na top kategórie.</div>
<div class="warn">Najdrahšia začiatočnícka chyba: spustiť Display/Video „na skúšku" s konverzným očakávaním Search kampaní. Každý typ má inú rolu vo funneli — Display klik nemá intent Search kliku.</div>`,
      checklist: ['Viem priradiť typ kampane k cieľu', 'Rozumiem rozdielu zachytenie vs. vytváranie dopytu', 'Poznám typické zostavy pre službu a e-shop', 'Chápem role typov vo funneli'],
      quiz: [
        { q: 'Najvyšší nákupný intent má používateľ pri kontakte s kampaňou:', o: ['Display', 'Search', 'Video awareness', 'App'], c: 1, e: 'Pri Search používateľ aktívne hľadá riešenie — reklama odpovedá na jeho dopyt.' },
        { q: 'E-shop chce produktové reklamy s fotkou a cenou vo vyhľadávaní. Potrebuje:', o: ['Display', 'Shopping/PMax s produktovým feedom', 'App kampaň', 'Video'], c: 1, e: 'Produktové (Shopping) reklamy čerpajú z feedu v Merchant Center.' },
        { q: 'Demand Gen kampane bežia na:', o: ['Len vo vyhľadávaní', 'YouTube, Shorts, Discover a Gmail', 'Len na weboch tretích strán', 'V TV'], c: 1, e: 'Demand Gen je vizuálny formát pre „social-like" plochy Googlu — tvorba dopytu.' },
        { q: 'Firma s rozpočtom 400 €/mes. na nišovú službu má začať:', o: ['5 typmi kampaní naraz', 'Search kampaňou na dopyty s najvyšším intentom', 'Video kampaňou', 'Display sieťou'], c: 1, e: 'Malý rozpočet koncentruj tam, kde je hotový dopyt a najkratšia cesta ku konverzii.' },
        { q: 'Performance Max je:', o: ['Náhrada všetkých kampaní navždy', 'Cieľová kampaň bežiaca naprieč všetkými plochami, typicky doplnok Search', 'Len video formát', 'Zastaraný typ'], c: 1, e: 'PMax pokrýva všetky inventáre jedným cieľom — v dobrej štruktúre koexistuje so Search.' },
      ] },
  ]},

  /* ── SEKCIA 2: SEARCH KAMPANE DO HĹBKY ── */
  { id: 'ads-s2', title: 'Search kampane do hĺbky', lessons: [

    { id: 'ads-2-1', title: 'Keyword research a Keyword Planner', min: 30,
      theory: `<p>Kľúčové slová sú most medzi dopytom zákazníka a tvojou ponukou. Výskum robíš <strong>pred stavbou účtu</strong> — určuje štruktúru aj rozpočet.</p>
<h3>Keyword Planner</h3>
<p>Nástroj v Ads (Tools → Planning): návrhy slov z URL/témy, <strong>objemy vyhľadávania</strong>, konkurencia, odhad CPC (top of page bid). Presné objemy vyžadujú bežiaci účet s útratou; inak rozsahy (1k–10k). Funkcia Forecast odhadne kliky/cenu pre zoznam slov.</p>
<h3>Proces researchu</h3>
<ol>
<li><strong>Seed slová</strong> — brainstorm: produkty, služby, problémy, synonymá (aj slang: „klimoška").</li>
<li><strong>Expanzia</strong> — Keyword Planner, Google autocomplete, „related searches", konkurenčné nástroje.</li>
<li><strong>Klasifikácia podľa intentu:</strong> transakčné („kúpiť", „cena", „služba + mesto") → kampane; informačné („ako", „prečo") → zvyčajne SEO/obsah, nie Ads; brandové; konkurenčné brandy (drahé, nízke QS — opatrne).</li>
<li><strong>Zoskupenie do tém</strong> = budúce ad groups.</li>
<li><strong>Ekonomika:</strong> odhad CPC × očakávaný konverzný pomer vs. hodnota zákazníka. Slovo s CPC 3 € a 2 % konverziou = 150 €/konverzia — utiahne to marža?</li>
</ol>
<div class="ex">Servis klimatizácií: seed „servis klimatizácie". Expanzia: „čistenie klimatizácie cena", „plnenie klimatizácie [mesto]", „nefunguje klimatizácia" (problém-intent!), „klimatizácia smrdí". Skupiny: čistenie / plnenie / oprava / inštalácia — 4 ad groups so šitými reklamami.</div>
<div class="warn">Nekopíruj slepo objemy: slovo s 10 000 vyhľadávaniami a zlým intentom („klimatizácia wiki") spáli rozpočet. Intent > objem. Vždy.</div>`,
      checklist: ['Ovládam Keyword Planner vrátane Forecast', 'Klasifikujem slová podľa intentu', 'Zoskupujem do tém pre ad groups', 'Počítam ekonomiku slova (CPC × CR vs. hodnota)'],
      quiz: [
        { q: 'Keyword Planner ukazuje presné objemy vyhľadávania:', o: ['Vždy každému', 'Len účtom s dostatočnou útratou; inak rozsahy', 'Nikdy', 'Len v USA'], c: 1, e: 'Bez aktívnej útraty vidíš rozsahy (1k–10k) — presné čísla si Google „odomkýna" míňaním.' },
        { q: 'Dopyt „ako vyčistiť klimatizáciu doma" má pre platené kampane:', o: ['Skvelý transakčný intent', 'Informačný intent — kandidát skôr na obsah než na Ads', 'Navigačný intent', 'Žiadny intent'], c: 1, e: 'Hľadá návod, nie službu — platiť za tento klik sa väčšinou neoplatí, vhodnejší je blog.' },
        { q: 'Pri hodnotení kľúčového slova je dôležitejší:', o: ['Objem vyhľadávania', 'Intent a ekonomika (CPC × konverzný pomer vs. hodnota)', 'Dĺžka slova', 'Počet písmen'], c: 1, e: 'Vysoký objem so zlým intentom je pasca — kupuješ irelevantné kliky.' },
        { q: 'Bidovanie na brand konkurencie je:', o: ['Zakázané', 'Povolené (bez použitia ochrannej známky v texte), ale drahé s nízkym QS', 'Zadarmo', 'Povinné'], c: 1, e: 'Cieliť na cudzí brand ako kľúčové slovo sa smie; QS býva nízky a CPC vysoké — taktika na zváženie.' },
        { q: 'Výstupom keyword researchu je:', o: ['Jeden dlhý zoznam bez štruktúry', 'Tematické skupiny slov s intentom — základ štruktúry ad groups', 'Logo', 'Rozpočet na TV'], c: 1, e: 'Research priamo diktuje štruktúru účtu: témy → ad groups → šité reklamy → relevantné landing pages.' },
      ] },

    { id: 'ads-2-2', title: 'Match Types (typy zhody)', min: 25,
      theory: `<p>Match type určuje, na aké vyhľadávania sa kľúčové slovo spustí. Moderné zhody sú <strong>významové, nie doslovné</strong> — všetky zohľadňujú intent.</p>
<table>
<tr><th>Typ</th><th>Zápis</th><th>Spustí sa na</th></tr>
<tr><td><strong>Broad match</strong></td><td>oprava práčky</td><td>všetko súvisiace s významom: „pokazená práčka", „servis whirlpool", aj voľnejšie asociácie</td></tr>
<tr><td><strong>Phrase match</strong></td><td>"oprava práčky"</td><td>dopyty zahŕňajúce význam slova: „rýchla oprava práčky bratislava"</td></tr>
<tr><td><strong>Exact match</strong></td><td>[oprava práčky]</td><td>rovnaký význam/zámer: „oprava práčok", „opraviť práčku"</td></tr>
</table>
<p>Pozor: aj <strong>exact match už nie je doslovný</strong> — zahŕňa preklepy, množné čísla, synonymá so zhodným zámerom.</p>
<h3>Stratégia použitia</h3>
<ul>
<li><strong>Štart účtu:</strong> phrase + exact na overené peniaze-dopyty = kontrola.</li>
<li><strong>Broad match</strong> — len so smart biddingom (tCPA/tROAS) a dostatkom konverzných dát: algoritmus potrebuje signál, inak nakúpi šum. V kombinácii „broad + smart bidding + kvalitné negatívy" je dnes oficiálne odporúčaný a často funguje.</li>
<li><strong>Search terms report</strong> — tvoj najlepší priateľ: reálne dopyty, ktoré spustili reklamy → presúvaš do exact (dobré) alebo negatív (zlé). Rutina min. 1× týždenne pri novom účte.</li>
</ul>
<div class="warn">Broad match bez konverzného merania a bez negatív = najrýchlejší spôsob, ako spáliť rozpočet klienta. „Oprava práčky" broad ti bez dozoru nakúpi aj „návod na opravu práčky zadarmo pdf".</div>
<div class="ex">Mesiac 1: [čistenie klimatizácie], "čistenie klimatizácie" → zber dát. Mesiac 3: 50+ konverzií → test broad match kampane s tCPA a battle-tested negatívnym zoznamom.</div>`,
      checklist: ['Poznám zápis a správanie 3 typov zhody', 'Viem, že exact je významový, nie doslovný', 'Kontrolujem search terms report týždenne', 'Broad match nasadzujem len so smart biddingom a negatívami'],
      quiz: [
        { q: 'Zápis [oprava práčky] označuje:', o: ['Broad match', 'Phrase match', 'Exact match', 'Negatívne slovo'], c: 2, e: 'Hranaté zátvorky = exact match (zhoda zámeru), úvodzovky = phrase, bez znakov = broad.' },
        { q: 'Exact match sa spustí:', o: ['Len na doslovne identický dopyt', 'Aj na preklepy, plurály a dopyty s rovnakým zámerom', 'Na čokoľvek', 'Len na brand'], c: 1, e: 'Moderný exact je významový — „oprava práčok" spustí [oprava práčky].' },
        { q: 'Broad match sa odporúča kombinovať s:', o: ['Manuálnym CPC bez merania', 'Smart biddingom a priebežnou správou negatív', 'Vypnutými konverziami', 'Nulovým rozpočtom'], c: 1, e: 'Broad dáva algoritmu voľnosť — bez konverzného signálu a negatív nakupuje irelevantné dopyty.' },
        { q: 'Search terms report ukazuje:', o: ['Tvoje kľúčové slová', 'Reálne vyhľadávania, ktoré spustili tvoje reklamy', 'Slová konkurencie', 'Trendy v TV'], c: 1, e: 'Rozdiel keyword vs. search term je kľúčový — report odhaľuje, čo v skutočnosti kupuješ.' },
        { q: 'V search terms nájdeš opakovane konvertujúci dopyt, ktorý nemáš v slovách. Akcia:', o: ['Ignorovať', 'Pridať ako exact match keyword (kontrola bidu a reklamy)', 'Pridať ako negatívum', 'Zmazať kampaň'], c: 1, e: 'Overený dopyt si zaslúži vlastné slovo — presnejšie riadenie ponuky aj textu reklamy.' },
      ] },

    { id: 'ads-2-3', title: 'Negatívne kľúčové slová', min: 20,
      theory: `<p><strong>Negatívne slová</strong> hovoria, kedy sa reklama NEMÁ zobraziť. Sú rovnako dôležité ako pozitívne — chránia rozpočet pred irelevantnými klikmi.</p>
<h3>Ako fungujú</h3>
<ul>
<li>Negatívy <strong>nepoužívajú významové rozšírenie</strong> — blokujú (takmer) doslovne: negatívum „zadarmo" blokuje dopyty obsahujúce „zadarmo", ale nie „bezplatne"! Musíš blokovať aj synonymá a pri flektívnych jazykoch (slovenčina!) aj tvary slov: zadarmo, zdarma, bezplatne, bezplatná…</li>
<li>Úrovne: ad group → kampaň → <strong>zdieľaný zoznam</strong> (negative keyword list) na úrovni účtu — aplikovateľný na viac kampaní naraz. Univerzálny zoznam („zadarmo", „práca", „brigáda", „bazár", „recenzia", „návod", „wiki") patrí do každého účtu.</li>
<li>Match types negatív: broad/phrase/exact — s doslovnejšou logikou než pri pozitívnych.</li>
</ul>
<h3>Zdroje negatív</h3>
<ol>
<li><strong>Preventívne</strong> — brainstorm pred spustením: čo nechceš? (DIY, zamestnanie, lacné, konkurenčné produkty ktoré nepredávaš…).</li>
<li><strong>Search terms report</strong> — kontinuálne dopĺňanie z reálnych dopytov.</li>
<li><strong>Cross-kampaňové negatívy</strong> — brand slová ako negatívum v non-brand kampani (nech brand dopyty tečú do lacnej brand kampane) a naopak.</li>
</ol>
<div class="warn">Pozor na prehnané negativovanie: zablokovanie „cena" firme, ktorej zákazníci reálne hľadajú „služba cena" s nákupným úmyslom, odstrihne polovicu konverzií. Negatívuj na základe dát, nie dojmov.</div>
<div class="ex">Autoservis zistí v search terms: 18 % výdavkov idú na dopyty s „sám", „svojpomocne", „video návod". Pridá zoznam DIY negatív → CPA klesne o 15 % bez akejkoľvek inej zmeny.</div>`,
      checklist: ['Mám univerzálny negatívny zoznam pre každý účet', 'Blokujem aj synonymá a tvary slov', 'Cross-negatívy medzi brand a non-brand', 'Negatívy dopĺňam z search terms, nie z dojmov'],
      quiz: [
        { q: 'Negatívne kľúčové slová:', o: ['Rozširujú cielenie', 'Blokujú zobrazenie na nechcené dopyty', 'Znižujú Quality Score', 'Sú platené extra'], c: 1, e: 'Negatívy vylučujú dopyty — chránia rozpočet a čistia návštevnosť.' },
        { q: 'Negatívum „zadarmo" zablokuje aj dopyt „služba bezplatne":', o: ['Áno, automaticky', 'Nie — negatívy nepoužívajú synonymá, treba blokovať aj „bezplatne"', 'Len na mobile', 'Len v exact'], c: 1, e: 'Negatívy fungujú (takmer) doslovne — synonymá a tvary slov musíš pridať sám.' },
        { q: 'Zdieľaný negative keyword list je výhodný, lebo:', o: ['Je krajší', 'Jeden zoznam sa aplikuje na viac kampaní a spravuje centrálne', 'Zvyšuje CTR', 'Je povinný'], c: 1, e: 'Univerzálne negatívy (zadarmo, práca, návod…) spravuješ na jednom mieste pre celý účet.' },
        { q: 'Brand slová ako negatívum v non-brand kampani slúžia na:', o: ['Blokovanie konkurencie', 'Nasmerovanie brand dopytov do lacnej brand kampane', 'Zvýšenie CPC', 'Nič'], c: 1, e: 'Cross-negatívy riadia tok dopytov do správnych kampaní s správnymi bidmi.' },
        { q: 'Najlepší priebežný zdroj nových negatív je:', o: ['Horoskop', 'Search terms report', 'Konkurenčný web', 'Náhodný generátor'], c: 1, e: 'Reálne dopyty ukazujú, za čo skutočne platíš — irelevantné vzorce priebežne negatívuješ.' },
      ] },

    { id: 'ads-2-4', title: 'Tvorba reklám: Responsive Search Ads', min: 30,
      theory: `<p><strong>RSA (Responsive Search Ad)</strong> je štandardný formát Search reklamy: dodáš až <strong>15 nadpisov</strong> (30 znakov) a <strong>4 popisy</strong> (90 znakov), Google z nich skladá kombinácie (zobrazia sa až 3 nadpisy + 2 popisy) a učí sa, čo funguje.</p>
<h3>Anatómia výkonného RSA</h3>
<ul>
<li><strong>Nadpisy pokry rôzne uhly:</strong> kľúčové slovo (relevancia!), benefit („Oprava do 24 hodín"), dôveryhodnosť („4,9★ z 300 recenzií", „15 rokov skúseností"), ponuka/cena („od 39 €"), CTA („Objednajte online"), urgencia, lokalita.</li>
<li><strong>Aspoň 2–3 nadpisy obsahujú kľúčové slovo</strong> zo skupiny — zvyšok diverzifikuj (duplicitné nadpisy systém aj tak nespáruje).</li>
<li><strong>Pinning</strong> — pripnutie nadpisu na pozíciu (compliance texty, brand). Používaj striedmo: obmedzuje kombinácie a zvyčajne znižuje výkon.</li>
<li><strong>Ad Strength</strong> (Poor→Excellent) — heuristika kvality vstupov; nie je ranking faktor, ale koreluje s dostupnosťou impresií. Cieľ: Good+.</li>
<li>2 RSA na ad group (odporúčanie), Display path (viditeľná URL: /oprava-praciek).</li>
</ul>
<h3>Pravidlá textov</h3>
<p>Bez VEĽKÝCH SLOV, nadmernej interpunkcie!!!, klamlivých tvrdení, „najlepší" bez dôkazu (superlatívy s doložením OK), volanie po kliku („kliknite sem") je proti pravidlám.</p>
<div class="ex">Ad group „čistenie klimatizácie" — nadpisy: „Čistenie klimatizácie" / „Čistenie klímy do 24 h" / „Certifikovaní technici" / „4,9★ — 200+ recenzií" / „Cena od 49 €" / „Objednajte sa online" / „Pôsobíme v celej Nitre"… Popisy kombinujú problém+riešenie+dôkaz+CTA.</div>
<div class="tip">Najsilnejší test nadpisov: odpovedá reklama na presný dopyt lepšie než konkurencia? Napíš si 3 skutočné dopyty zo search terms a čítaj svoju reklamu ich očami.</div>`,
      checklist: ['RSA má 10+ rôznorodých nadpisov', 'Min. 2 nadpisy s kľúčovým slovom skupiny', 'Ad Strength aspoň Good', 'Pinning len kde nevyhnutné', 'Texty v súlade s pravidlami'],
      quiz: [
        { q: 'RSA umožňuje maximálne:', o: ['3 nadpisy a 1 popis', '15 nadpisov a 4 popisy', '5 nadpisov a 5 popisov', 'Neobmedzene'], c: 1, e: '15 nadpisov × 4 popisy — systém z nich skladá a testuje kombinácie.' },
        { q: 'Limit dĺžky nadpisu RSA je:', o: ['15 znakov', '30 znakov', '90 znakov', '160 znakov'], c: 1, e: 'Nadpis do 30 znakov, popis do 90 znakov.' },
        { q: 'Pinning nadpisov:', o: ['Vždy zvyšuje výkon', 'Obmedzuje kombinácie — používaj len z nutnosti (compliance, brand)', 'Je povinný', 'Zdvojnásobuje CTR'], c: 1, e: 'Pripnutie berie algoritmu voľnosť testovať — daň za kontrolu je zvyčajne nižší výkon.' },
        { q: 'Ad Strength „Excellent":', o: ['Garantuje prvú pozíciu', 'Je heuristika kvality vstupov, nie priamy ranking faktor', 'Znižuje cenu na polovicu', 'Je podmienka spustenia'], c: 1, e: 'Ad Strength hodnotí rozmanitosť a relevanciu assetov — koreluje s výkonom, ale aukciu nerozhoduje.' },
        { q: 'Ktorý nadpis porušuje pravidlá Google Ads?', o: ['„Oprava práčok Nitra"', '„KLIKNITE SEM!!!"', '„Cena od 39 €"', '„Otvorené aj v sobotu"'], c: 1, e: 'Caps lock, nadmerná interpunkcia a výzva „kliknite" sú porušenia redakčných pravidiel.' },
      ] },

    { id: 'ads-2-5', title: 'Quality Score a Ad Rank v praxi', min: 25,
      theory: `<p><strong>Quality Score (QS)</strong> je diagnostické skóre 1–10 na úrovni kľúčového slova, zložené z troch komponentov (každý: Below average / Average / Above average):</p>
<ul>
<li><strong>Expected CTR</strong> — očakávaná klikanosť reklamy na dané slovo.</li>
<li><strong>Ad Relevance</strong> — ako reklama zodpovedá zámeru slova.</li>
<li><strong>Landing Page Experience</strong> — relevancia, prehľadnosť, rýchlosť, mobilnosť cieľovej stránky.</li>
</ul>
<h3>Ako QS zlepšovať (podľa komponentu)</h3>
<table>
<tr><th>Slabý komponent</th><th>Akcia</th></tr>
<tr><td>Expected CTR</td><td>silnejšie nadpisy, benefity, assets; presnejšie match types; vyčistiť lacné irelevantné dopyty</td></tr>
<tr><td>Ad Relevance</td><td>tesnejšie ad groups, kľúčové slovo v nadpisoch, rozdeliť miešané témy</td></tr>
<tr><td>Landing Page</td><td>samostatná stránka pre tému (nie homepage!), obsah zhodný s reklamou, rýchlosť, mobil</td></tr>
</table>
<h3>Dôležité pravdy o QS</h3>
<ul>
<li>QS je <strong>diagnostika, nie cieľ</strong> — reportuj konverzie, QS používaj ako kompas.</li>
<li>Reálna aukcia používa jemnejšie real-time signály (čas, zariadenie, lokalita…) — QS v rozhraní je zjednodušený náhľad.</li>
<li>Vyšší QS = nižšie CPC pri rovnakej pozícii = <strong>zľava za relevanciu</strong>. Rozdiel QS 3 vs. 8 na rovnakom slove pokojne znamená polovičné CPC.</li>
</ul>
<div class="warn">Landing page je najčastejšie ignorovaný komponent: PPC-čkár „nemôže za web". Profesionál presadí u klienta dedikované landing pages — bez nich má kampaň strop, ktorý biddingom neprerazíš.</div>`,
      checklist: ['Poznám 3 komponenty QS', 'Viem priradiť akcie k slabým komponentom', 'QS beriem ako diagnostiku, nie KPI', 'Presadzujem dedikované landing pages'],
      quiz: [
        { q: 'Komponenty Quality Score sú:', o: ['CPC, CPA, ROAS', 'Expected CTR, Ad Relevance, Landing Page Experience', 'Bid, rozpočet, kampaň', 'Impresie, kliky, konverzie'], c: 1, e: 'Tri komponenty, každý hodnotený voči konkurencii ako below/average/above average.' },
        { q: 'Vysoký QS pri rovnakej pozícii znamená:', o: ['Vyššie CPC', 'Nižšie CPC — „zľavu za relevanciu"', 'Rovnaké CPC', 'Viac konverzií automaticky'], c: 1, e: 'Ad Rank = bid × kvalita → kvalitnejší inzerent potrebuje nižší bid na rovnaký Ad Rank.' },
        { q: 'Slabá Ad Relevance sa najčastejšie rieši:', o: ['Zvýšením bidu', 'Tesnejšími ad groups a kľúčovým slovom v nadpisoch', 'Vypnutím kampane', 'Zmenou fakturácie'], c: 1, e: 'Miešané témy v skupine = reklama nezodpovedá slovám. Rozdeľ a šij reklamy na tému.' },
        { q: 'QS ako metrika je:', o: ['Hlavné KPI klienta', 'Diagnostický nástroj — cieľom sú konverzie a ekonomika', 'Ranking webu', 'Skóre recenzií'], c: 1, e: 'QS pomáha nájsť slabiny, ale úspech kampane sa meria biznis výsledkami.' },
        { q: 'Smerovanie všetkých reklám na homepage typicky spôsobí:', o: ['Výborný QS', 'Slabý Landing Page Experience — stránka nezodpovedá konkrétnym dopytom', 'Nižšie CPC', 'Viac konverzií'], c: 1, e: 'Generická homepage nenaplní zámer špecifického dopytu — QS aj konverzný pomer trpia.' },
      ] },

    { id: 'ads-2-6', title: 'Assets (rozšírenia reklám)', min: 20,
      theory: `<p><strong>Assets</strong> (predtým Extensions) rozširujú reklamu o ďalšie prvky — zväčšujú plochu, pridávajú informácie a zvyšujú CTR (typicky o 10–20 %). Sú „zadarmo" — platíš štandardne za klik.</p>
<h3>Hlavné typy</h3>
<ul>
<li><strong>Sitelinks</strong> — odkazy na podstránky (Služby, Cenník, Kontakt, Recenzie). Min. 4 na kampaň.</li>
<li><strong>Callouts</strong> — krátke neklikateľné benefity („Zadarmo obhliadka", „Non-stop linka").</li>
<li><strong>Structured snippets</strong> — zoznamy podľa hlavičky (Typy: …, Značky: …).</li>
<li><strong>Call asset</strong> — telefónne číslo/tlačidlo volania (mobil!).</li>
<li><strong>Location asset</strong> — adresa a mapa z prepojeného <strong>GBP profilu</strong> (áno, tu sa spája GBP s Ads!).</li>
<li><strong>Image assets</strong> — obrázky pri textovej reklame.</li>
<li><strong>Price / Promotion assets</strong> — cenníkové karty, akcie so sviatkami.</li>
<li><strong>Lead form asset</strong> — formulár priamo v reklame.</li>
</ul>
<h3>Zásady</h3>
<ul>
<li>Zobrazovanie riadi Google podľa predpokladaného prínosu — nasaď <strong>všetky relevantné typy</strong>, nech má z čoho vyberať (a Ad Rank rastie o „expected impact of assets").</li>
<li>Assets na úrovni účtu/kampane/skupiny — špecifickejšie prepisujú všeobecné.</li>
<li>Sitelinks s vlastnými popismi (2 riadky) — výrazne väčšia plocha.</li>
</ul>
<div class="tip">Location assets prepojené s GBP zobrazujú reklamu s adresou, hodnotením a vzdialenosťou — pre lokálne firmy kritické. Prepojenie: Ads → Tools → Linked accounts → Business Profile. Toto je presne synergia, ktorú agentúra predáva: GBP + Ads spolu.</div>`,
      checklist: ['Nasadené min. 4 sitelinks s popismi', 'Callouts a structured snippets na účte', 'Call a location assets pre lokálne ciele', 'Prepojený GBP profil s Ads'],
      quiz: [
        { q: 'Assets (rozšírenia) primárne:', o: ['Zvyšujú cenu za klik', 'Zväčšujú reklamu a zvyšujú CTR bez extra poplatku', 'Sú platené mesačne', 'Znižujú Quality Score'], c: 1, e: 'Viac plochy a informácií = vyššia klikanosť; platíš stále štandardný CPC.' },
        { q: 'Location asset čerpá dáta z:', o: ['Facebooku', 'Prepojeného Google Business Profile', 'Wikipédie', 'Merchant Center'], c: 1, e: 'Prepojenie Ads ↔ GBP zobrazí adresu, mapu a hodnotenie pri reklame — kľúčové pre lokálne firmy.' },
        { q: 'Callout asset je:', o: ['Klikateľný odkaz', 'Krátky neklikateľný benefit („Doprava zadarmo")', 'Video', 'Formulár'], c: 1, e: 'Callouts sú textové „odrážky" benefitov — bez vlastného odkazu.' },
        { q: 'O zobrazení konkrétnych assets pri aukcii rozhoduje:', o: ['Inzerent natvrdo', 'Google podľa predpokladaného prínosu v danej aukcii', 'Abeceda', 'Používateľ'], c: 1, e: 'Systém skladá kombináciu assets dynamicky — preto nasaď všetky relevantné typy.' },
        { q: 'Assets ovplyvňujú Ad Rank:', o: ['Nie', 'Áno — „expected impact of assets" je súčasť výpočtu', 'Len v decembri', 'Len na desktope'], c: 1, e: 'Očakávaný vplyv rozšírení je oficiálna zložka Ad Ranku — ďalší dôvod ich plne využívať.' },
      ] },
  ]},

  /* ── SEKCIA 3: OSTATNÉ TYPY KAMPANÍ ── */
  { id: 'ads-s3', title: 'Display, PMax, Shopping, Video, Demand Gen, App', lessons: [

    { id: 'ads-3-1', title: 'Display kampane', min: 25,
      theory: `<p><strong>Google Display Network (GDN)</strong> — bannery na miliónoch webov, v aplikáciách, Gmaili a na YouTube. Zasiahne ~90 % internetovej populácie. Rola: <strong>awareness a remarketing</strong>, nie primárny výkonový kanál pre studené publikum.</p>
<h3>Cielenie</h3>
<ul>
<li><strong>Publiká:</strong> affinity (dlhodobé záujmy), in-market (aktívne nakupujúci v kategórii), remarketing, custom segments (podľa vyhľadávaných slov/webov), demographics, your data.</li>
<li><strong>Obsahové:</strong> témy webov, umiestnenia (konkrétne weby — placements), kľúčové slová v obsahu.</li>
<li>Optimized targeting — Google rozširuje cielenie za signálmi konverzií (v remarketingu opatrne vypínaj, inak „remarketing" mieri aj na nových ľudí).</li>
</ul>
<h3>Responsive Display Ads</h3>
<p>Dodáš obrázky (1,91:1 a 1:1), logá, až 5 nadpisov, dlhý nadpis, popisy — systém skladá formáty pre každý slot. Doplň vlastnými bannermi pri brand-citlivých klientoch.</p>
<h3>Ochrana rozpočtu (kritické!)</h3>
<ul>
<li><strong>Placement exclusions</strong> — vylúč mobilné hry/aplikácie (klasický zdroj náhodných klikov detí), nekvalitné weby.</li>
<li>Content exclusions (citlivý obsah), frequency capping.</li>
<li>Pravidelná kontrola „Where ads showed" reportu.</li>
</ul>
<div class="warn">Display CTR ~0,5 % a konverzný pomer zlomkový oproti Search — porovnávať ich priamo je chyba. Display hodnoť cez view-through/assist metriky a rast brand dopytov, alebo ho používaj čisto na remarketing.</div>`,
      checklist: ['Rozumiem typom publík (affinity, in-market, custom)', 'Vylučujem aplikácie a nekvalitné umiestnenia', 'Mám responsive display ad so všetkými assetmi', 'Display hodnotím správnymi metrikami'],
      quiz: [
        { q: 'Primárna rola Display kampaní je:', o: ['Zachytenie horúceho dopytu', 'Awareness a remarketing', 'Náhrada SEO', 'Predaj B2B softvéru na studeno'], c: 1, e: 'Display buduje povedomie a vracia návštevníkov — intent je násobne nižší než pri Search.' },
        { q: 'In-market publiká sú ľudia, ktorí:', o: ['Pracujú v marketingu', 'Aktívne prejavujú nákupné správanie v danej kategórii', 'Sú na trhovisku', 'Klikli na tvoju reklamu'], c: 1, e: 'Google ich identifikuje podľa signálov aktívneho nakupovania — silnejšie než široké affinity záujmy.' },
        { q: 'Častý zdroj nekvalitných Display klikov sú:', o: ['Spravodajské weby', 'Mobilné hry a aplikácie (náhodné kliky)', 'Blogy', 'E-maily'], c: 1, e: 'Deti a náhodné dotyky v appkách generujú kliky bez hodnoty — placement exclusions sú nutnosť.' },
        { q: 'Responsive Display Ad:', o: ['Má fixný rozmer', 'Skladá sa z dodaných obrázkov, log a textov pre rôzne sloty', 'Je len text', 'Funguje len na YouTube'], c: 1, e: 'RDA sa automaticky prispôsobuje formátom celej siete z tvojich assetov.' },
        { q: 'Porovnávať Display a Search podľa CTR je:', o: ['Správne', 'Zavádzajúce — iný intent, iná rola vo funneli', 'Povinné', 'Jediný spôsob hodnotenia'], c: 1, e: 'Display oslovuje ľudí, ktorí nič nehľadajú — hodnotí sa cez awareness/assist metriky a remarketing výkon.' },
      ] },

    { id: 'ads-3-2', title: 'Performance Max', min: 30,
      theory: `<p><strong>Performance Max (PMax)</strong> — jedna kampaň cez všetky plochy Googlu: Search, Shopping, Display, YouTube, Gmail, Discover, Maps. Ty dodáš ciele, assets a signály; Google skladá reklamy a alokuje rozpočet automaticky.</p>
<h3>Čo dodávaš</h3>
<ul>
<li><strong>Asset groups</strong> (tematické balíky): texty, obrázky, logá, videá (bez videa si ho Google vyrobí sám — radšej dodaj vlastné!), + prípadne produktový feed (listing groups).</li>
<li><strong>Audience signals</strong> — nápoveda, kým začať (remarketing, custom segments, your data). Signál, nie obmedzenie — systém pôjde aj mimo.</li>
<li>Ciele konverzií, tCPA/tROAS, rozpočet.</li>
</ul>
<h3>Silné a slabé stránky</h3>
<table>
<tr><th>Silné</th><th>Slabé</th></tr>
<tr><td>výkon pri e-commerce s feedom; jednoduchá správa; prístup k celému inventáru</td><td>čierna skrinka (obmedzený reporting per kanál); rado si pripisuje brand konverzie; potrebuje dáta a čas (2–6 týždňov learning)</td></tr>
</table>
<h3>Profesionálne zásady</h3>
<ul>
<li><strong>Vylúč brand</strong> z PMax (brand exclusions / account-level negatívy) — nech si PMax nepripisuje lacné brand konverzie a nevyzerá lepšie, než je.</li>
<li>Kvalitné konverzné meranie je podmienka — PMax bez dát strieľa naslepo.</li>
<li>Asset groups deľ podľa tém/kategórií produktov; sleduj Insights a search themes.</li>
<li>PMax = <strong>doplnok</strong> dobre postavenej Search štruktúry, nie náhrada (PMax má nižšiu prioritu než exact match slovo zhodné s dopytom).</li>
</ul>
<div class="warn">Klientovi, ktorý nemá konverzné meranie, feed ani assets, PMax nespúšťaj „lebo je moderný". Bez signálu a vstupov je to len drahá lotéria. Poradie: meranie → Search základ → potom PMax.</div>`,
      checklist: ['Viem, čo sú asset groups a audience signals', 'Brand vylúčený z PMax', 'Meranie konverzií pred spustením', 'PMax ako doplnok Search, nie náhrada'],
      quiz: [
        { q: 'Performance Max beží na:', o: ['Len vo vyhľadávaní', 'Všetkých plochách Googlu naraz', 'Len na YouTube', 'Mimo Google'], c: 1, e: 'Jedna kampaň pokrýva Search, Shopping, Display, YouTube, Gmail, Discover aj Maps.' },
        { q: 'Audience signal v PMax je:', o: ['Tvrdé obmedzenie cielenia', 'Nápoveda pre algoritmus, ktorý môže ísť aj mimo nej', 'Zoznam blokovaných ľudí', 'Typ rozpočtu'], c: 1, e: 'Signál urýchľuje učenie, ale systém cieli podľa pravdepodobnosti konverzie kdekoľvek.' },
        { q: 'Prečo vylúčiť brand dopyty z PMax?', o: ['Brand je zakázaný', 'Aby si PMax nepripisoval lacné brand konverzie a nevykazoval falošný výkon', 'Znižuje to rozpočet', 'Google to vyžaduje'], c: 1, e: 'Brand konverzie by prišli tak či tak — v PMax maskujú skutočnú inkrementalitu kampane.' },
        { q: 'Ak používateľ hľadá presne tvoj exact match keyword, prioritu má:', o: ['PMax', 'Search kampaň s exact match slovom', 'Display', 'Náhoda'], c: 1, e: 'Exact zhoda dopytu s keywordom má prednosť pred PMax — preto Search štruktúra zostáva základ.' },
        { q: 'Podmienka zmysluplného PMax je:', o: ['Pekné logo', 'Kvalitné konverzné meranie a dostatočné vstupy (assets, feed)', 'Účet starší ako 10 rokov', 'Manuálne CPC'], c: 1, e: 'PMax je automat riadený konverznými dátami — bez merania nemá podľa čoho optimalizovať.' },
      ] },

    { id: 'ads-3-3', title: 'Shopping a Merchant Center', min: 30,
      theory: `<p>Produktové reklamy (fotka, cena, obchod) stoja na <strong>Google Merchant Center (GMC)</strong> — tam žije <strong>produktový feed</strong>. Bez kvalitného feedu niet Shopping ani PMax retail.</p>
<h3>Feed — základ všetkého</h3>
<ul>
<li>Povinné atribúty: id, title, description, link, image_link, price, availability, condition, brand, GTIN/MPN (identifikátory).</li>
<li><strong>Title je najdôležitejší:</strong> Shopping nemá kľúčové slová — cielenie sa deje cez obsah feedu! Vzorec: Značka + Produkt + Atribúty (model, farba, veľkosť): „Nike Air Zoom Pegasus 41 pánske čierne 44".</li>
<li>Ceny a dostupnosť sa musia <strong>presne zhodovať s webom</strong> — nesúlad = suspendácia. Automatické aktualizácie + pravidelný feed refresh.</li>
<li>Diagnostics v GMC — zamietnuté produkty a dôvody; rieš priebežne.</li>
</ul>
<h3>Kampane</h3>
<ul>
<li><strong>Standard Shopping</strong> — väčšia kontrola: štruktúra cez product groups, vlastné bidy, priority (high/medium/low) na riadenie dopytov.</li>
<li><strong>PMax s feedom</strong> — dnes hlavná cesta; automatika + celý inventár.</li>
<li>Bezplatné záznamy (free listings) — organické produktové zobrazenia z GMC zadarmo.</li>
</ul>
<div class="warn">Najčastejšie suspendácie GMC: nesúlad cien web vs. feed, chýbajúce/neúplné obchodné podmienky, doprava a vratky nejasné, presmerovania, nedostupný web. GMC compliance je poloka úspechu e-commerce klienta.</div>
<div class="ex">Optimalizácia title z „Pegasus 41" na „Nike Air Zoom Pegasus 41 pánske bežecké tenisky čierne" zdvihla impresie produktu o desiatky percent — feed optimalizácia je „SEO Shoppingu".</div>`,
      checklist: ['Rozumiem povinným atribútom feedu', 'Optimalizujem titles podľa vzorca', 'Ceny feed = web (automatizácia)', 'Sledujem GMC Diagnostics', 'Viem rozdiel Standard Shopping vs. PMax'],
      quiz: [
        { q: 'Shopping kampane cielia na dopyty pomocou:', o: ['Kľúčových slov', 'Obsahu produktového feedu (najmä title a description)', 'URL webu', 'Náhodne'], c: 1, e: 'Shopping nemá keywords — relevanciu určuje feed. Preto je optimalizácia titles kľúčová.' },
        { q: 'Nesúlad ceny vo feede a na webe spôsobí:', o: ['Nič', 'Zamietnutie produktov až suspendáciu Merchant Center', 'Vyššie pozície', 'Zľavu'], c: 1, e: 'Cena a dostupnosť sa kontrolujú automaticky — nesúlad je najčastejší dôvod suspendácie.' },
        { q: 'Dobrý vzorec pre product title je:', o: ['Len názov modelu', 'Značka + produkt + kľúčové atribúty (farba, veľkosť, model)', 'CAPS LOCK PRE POZORNOSŤ', 'Emoji + cena'], c: 1, e: 'Bohatý štruktúrovaný title = viac zhôd s dopytmi = viac impresií.' },
        { q: 'GTIN je:', o: ['Typ kampane', 'Globálny identifikátor produktu (čiarový kód)', 'Google Trends Index', 'Formát obrázka'], c: 1, e: 'Global Trade Item Number pomáha Googlu spárovať produkt s katalógom a konkurenčnými ponukami.' },
        { q: 'Standard Shopping oproti PMax ponúka:', o: ['Menej kontroly', 'Väčšiu kontrolu (product groups, vlastné bidy, priority)', 'Viac plôch', 'Nižšie ceny vždy'], c: 1, e: 'Standard = manuálna kontrola štruktúry a bidov; PMax = automatika naprieč plochami.' },
      ] },

    { id: 'ads-3-4', title: 'Video kampane (YouTube)', min: 25,
      theory: `<p>YouTube je druhý najväčší vyhľadávač a Video kampane pokrývajú celý funnel — od awareness po konverzie.</p>
<h3>Formáty</h3>
<ul>
<li><strong>Skippable in-stream</strong> — preskočiteľná po 5 s; platíš pri 30 s zhliadnutí/dopozeraní/interakcii (CPV) alebo cieľovo.</li>
<li><strong>Non-skippable in-stream</strong> — do 15 s, platba CPM.</li>
<li><strong>In-feed video</strong> — vo výsledkoch/odporúčaniach YouTube.</li>
<li><strong>Bumper</strong> — 6 s, nepreskočiteľná, CPM; skvelá na frekvenciu a zapamätanie.</li>
<li><strong>YouTube Shorts</strong> reklamy, Masthead (prémiový banner).</li>
<li><strong>Video Action / v Demand Gen</strong> — konverzne orientované video s CTA.</li>
</ul>
<h3>Cielenie</h3>
<p>Publiká (in-market, affinity, remarketing, custom podľa vyhľadávaní na Google!), témy, umiestnenia (konkrétne kanály/videá), kľúčové slová (obsah videí).</p>
<h3>Kreatíva rozhoduje (80 % úspechu)</h3>
<ul>
<li><strong>Prvých 5 sekúnd</strong>: hook + brand + hodnota — než človek preskočí.</li>
<li>Dizajn pre zvuk vypnutý (titulky), mobil-first (väčšina zhliadnutí).</li>
<li>ABCD framework Googlu: <strong>A</strong>ttract (hook), <strong>B</strong>rand (skoro), <strong>C</strong>onnect (emócia/benefit), <strong>D</strong>irect (jasné CTA).</li>
</ul>
<div class="tip">Metriky podľa cieľa: awareness → CPM, reach, frequency, brand lift; consideration → view rate, CPV; akcia → konverzie, CPA. View rate nad ~30 % pri skippable = solídna kreatíva.</div>`,
      checklist: ['Poznám formáty a ich platobné modely', 'Rozumiem ABCD frameworku', 'Video má hook v prvých 5 s a titulky', 'Metriky volím podľa cieľa kampane'],
      quiz: [
        { q: 'Pri skippable in-stream platíš (CPV model), keď divák:', o: ['Uvidí prvý frame', 'Pozrie 30 s (alebo celé kratšie video) alebo interaguje', 'Preskočí po 5 s', 'Otvorí YouTube'], c: 1, e: 'Preskočenie do 30 s ťa nestojí nič — platíš za skutočné zhliadnutie či interakciu.' },
        { q: 'Bumper ad je:', o: ['60-sekundové video', '6-sekundová nepreskočiteľná reklama (CPM)', 'Banner na aute', 'Podcast'], c: 1, e: 'Krátky, nepreskočiteľný formát na budovanie frekvencie a zapamätateľnosti.' },
        { q: 'V ABCD frameworku znamená „A":', o: ['Audience', 'Attract — upútať v prvých sekundách', 'Auction', 'Assets'], c: 1, e: 'Attract, Brand, Connect, Direct — osvedčená štruktúra výkonnej video kreatívy.' },
        { q: 'Custom segments na YouTube umožňujú cieliť na ľudí podľa:', o: ['Farby trička', 'Toho, čo vyhľadávali na Google', 'Krvnej skupiny', 'Operátora'], c: 1, e: 'Custom segments z vyhľadávacích dopytov prinášajú search-intent na video plochy — podceňovaná zbraň.' },
        { q: 'Hlavná metrika awareness video kampane je:', o: ['CPA', 'Reach/CPM a brand lift', 'Počet kľúčových slov', 'CTR sitelinkov'], c: 1, e: 'Awareness sa nemeria konverziami — zásah, frekvencia a brand lift sú správne KPI.' },
      ] },

    { id: 'ads-3-5', title: 'Demand Gen kampane', min: 20,
      theory: `<p><strong>Demand Gen</strong> je „social-style" kampaň Googlu: vizuálne reklamy na <strong>YouTube (vrátane Shorts), Discover feede a Gmaili</strong> — plochách, kde ľudia scrollujú, objavujú a inšpirujú sa. Nástupca Discovery kampaní.</p>
<h3>Kedy Demand Gen</h3>
<ul>
<li>Vizuálne atraktívne produkty (móda, cestovanie, jedlo, lifestyle, e-commerce).</li>
<li>Tvorba dopytu — ľudia produkt ešte nehľadajú.</li>
<li>Alternatíva/doplnok k Meta Ads — podobné publikum aj formáty, často porovnateľné CPA.</li>
<li>Stredná časť funnela: medzi awareness videom a Search žatvou.</li>
</ul>
<h3>Špecifiká</h3>
<ul>
<li>Formáty: single image, carousel, video, produktový feed.</li>
<li><strong>Lookalike segmenty</strong> — z tvojich zoznamov (na rozdiel od bežných kampaní Googlu).</li>
<li>Bidding: maximize clicks/conversions, tCPA, tROAS.</li>
<li>Kreatíva „natívna": autentické fotky/videá výrazne prekonávajú korporátne bannery.</li>
</ul>
<div class="tip">Demand Gen predávaj klientom, ktorí sú závislí od Meta Ads, ako diverzifikáciu: rovnaký vizuálny prístup, publikum Googlu (YouTube + Discover = miliardy ľudí) a prepojenie so zvyškom Ads ekosystému.</div>
<div class="warn">Neočakávaj Search čísla: Demand Gen vytvára dopyt, ktorý často dozreje neskôr (aj cez brand vyhľadávanie). Meraj aj asistované konverzie a rast brand dopytov, nie len last-click.</div>`,
      checklist: ['Viem, na ktorých plochách Demand Gen beží', 'Rozumiem, kedy ho nasadiť', 'Poznám lookalike segmenty', 'Hodnotím ho aj cez asistované metriky'],
      quiz: [
        { q: 'Demand Gen kampane bežia na:', o: ['Weboch tretích strán', 'YouTube, Shorts, Discover a Gmail', 'Len vo vyhľadávaní', 'V rádiu'], c: 1, e: 'Vizuálne „feed" plochy Googlu — miesta objavovania, nie aktívneho hľadania.' },
        { q: 'Demand Gen je nástupcom kampaní:', o: ['Smart Shopping', 'Discovery', 'Universal App', 'Expanded Text Ads'], c: 1, e: 'Discovery kampane sa transformovali na Demand Gen s viac formátmi a funkciami.' },
        { q: 'Unikátna funkcia cielenia v Demand Gen je:', o: ['Kľúčové slová', 'Lookalike segmenty z vlastných zoznamov', 'PSČ', 'Vek domény'], c: 1, e: 'Lookalike (podobné publiká) Google ponúka práve v Demand Gen — paralela s Meta Ads.' },
        { q: 'Pre koho je Demand Gen najprirodzenejší?', o: ['B2B ERP softvér na studeno', 'Vizuálne produkty a e-commerce tvoriace dopyt', 'Havarijnú službu', 'Notára'], c: 1, e: 'Inšpiratívne, vizuálne nákupy fungujú vo feedoch najlepšie; havarijné služby žnú v Search.' },
        { q: 'Výkon Demand Gen hodnotíš:', o: ['Výhradne last-click konverziami', 'Aj cez asistované konverzie a rast brand dopytov', 'Počtom emoji', 'Rýchlosťou webu'], c: 1, e: 'Tvorba dopytu dozrieva neskôr a inde — last-click podhodnocuje jej prínos.' },
      ] },

    { id: 'ads-3-6', title: 'App kampane', min: 15,
      theory: `<p><strong>App campaigns</strong> (predtým UAC) propagujú mobilné aplikácie naprieč Search, Play, YouTube, Display a Discover. Najautomatizovanejší typ: nedodávaš cielenie ani umiestnenia — len texty, obrázky, videá, rozpočet a cieľ.</p>
<h3>Ciele</h3>
<ul>
<li><strong>App installs</strong> — maximalizácia inštalácií (tCPI).</li>
<li><strong>In-app actions</strong> — akcie v aplikácii: registrácia, nákup (tCPA).</li>
<li><strong>Pre-registration</strong> (Android) — pred vydaním.</li>
</ul>
<h3>Kľúčové princípy</h3>
<ul>
<li><strong>Meranie je všetko:</strong> Google Play sa prepája natívne; iOS vyžaduje SKAdNetwork/ATT — dáta sú obmedzenejšie (privacy), počítaj s tým pri hodnotení.</li>
<li>Firebase / app attribution partner (AppsFlyer, Adjust) na meranie in-app eventov.</li>
<li>Kreatívy v mnohých pomeroch (landscape, portrait, square) + video — systém testuje sám.</li>
<li>Optimalizuj na <strong>hodnotné akcie</strong>, nie holé inštalácie: milión inštalácií bez registrácií je vanity.</li>
</ul>
<div class="warn">Inštalácia je začiatok, nie cieľ. Kampaň optimalizovaná na najlacnejšie inštalácie priťahuje najmenej hodnotných používateľov — klasická pasca. Definuj event skutočnej hodnoty (nákup, predplatné) a optimalizuj naň.</div>`,
      checklist: ['Poznám 3 ciele App kampaní', 'Rozumiem obmedzeniam iOS merania', 'Dodávam kreatívy vo viacerých pomeroch', 'Optimalizujem na hodnotné akcie, nie inštalácie'],
      quiz: [
        { q: 'V App kampani nastavuješ:', o: ['Kľúčové slová a umiestnenia', 'Len assets, rozpočet a cieľ — cielenie je automatické', 'Presné weby', 'PSČ'], c: 1, e: 'App campaigns sú plne automatizované — vstupom sú kreatívy a cieľová hodnota.' },
        { q: 'Meranie iOS kampaní je obmedzené kvôli:', o: ['Pomalému internetu', 'Privacy rámcom (ATT/SKAdNetwork)', 'Malému displeju', 'Google to zakázal'], c: 1, e: 'Apple obmedzil tracking — atribúcia iOS inštalácií je agregovaná a oneskorená.' },
        { q: 'Lepší optimalizačný cieľ než inštalácia je:', o: ['Počet stiahnutí ikony', 'Hodnotná in-app akcia (nákup, registrácia)', 'Čas v obchode', 'Farba loga'], c: 1, e: 'Lacné inštalácie ≠ hodnotní používatelia — optimalizuj na akcie, ktoré tvoria biznis.' },
        { q: 'Na meranie in-app eventov slúži:', o: ['Merchant Center', 'Firebase alebo attribution partner (AppsFlyer, Adjust)', 'Search Console', 'Docs'], c: 1, e: 'SDK meranie eventov je podmienka optimalizácie na akcie v aplikácii.' },
        { q: 'App kampane bežia na:', o: ['Len v Google Play', 'Search, Play, YouTube, Display, Discover', 'Len na iOS', 'V App Store od Apple'], c: 1, e: 'Jedna kampaň pokrýva všetky plochy Googlu vhodné na propagáciu aplikácií.' },
      ] },
  ]},
