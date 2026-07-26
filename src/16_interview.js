<script>
/* ═══════════════════════════════════════════════════════════════════
   INTERVIEW MODE — AI recruiter vedie technický pohovor
   ───────────────────────────────────────────────────────────────────
   3 tracky (PPC / SEO / Full-stack). Recruiter kladie otázky,
   odpovedáš vlastnými slovami, engine hodnotí pokrytie kľúčových
   bodov, ukáže vzorovú odpoveď a na konci dá verdikt + odporúčania.
   S API kľúčom mentora sa dá odpoveď dodatočne konzultovať.
   ═══════════════════════════════════════════════════════════════════ */

DATA.interviewTracks = [
  { id: 'ppc', name: 'PPC Specialist (Google Ads)', icon: '📣', role: 'Junior/Medior PPC pozícia v agentúre',
    questions: [
      { q: 'Vysvetlite, ako funguje aukcia Google Ads a čo je Ad Rank.', kw: ['bid', 'quality', 'kvalit', 'ad rank', 'aukci', 'druh'], model: 'Pri každom vyhľadávaní prebieha aukcia. O poradí rozhoduje Ad Rank ≈ max CPC bid × Quality Score + očakávaný vplyv assets. Nevyhráva najvyšší bid — kvalitná reklama platí menej za lepšiu pozíciu. Reálne platíte len toľko, koľko treba na prekonanie inzerenta pod vami.' },
      { q: 'Klient má e-shop s maržou 30 %. Aký ROAS cieľ mu nastavíte a prečo?', kw: ['break', '333', 'marž', 'roas', 'zisk', '1/0,3'], model: 'Break-even ROAS = 1/marža = 1/0,30 ≈ 333 %. Všetko nad to tvorí zisk. Cieľový tROAS nastavím nad break-even s ohľadom na cieľ: agresívny rast → bližšie k 350–400 %, maximalizácia zisku → vyššie. Zároveň upozorním, že maximalizácia ROAS ≠ maximalizácia zisku.' },
      { q: 'Prevzali ste účet, kde sa 30 % rozpočtu míňa na irelevantné dopyty. Aký je váš postup?', kw: ['search terms', 'negatív', 'match', 'exact', 'phrase', 'zoznam'], model: 'Analýza search terms reportu → identifikácia irelevantných vzorcov → negatívne kľúčové slová (vrátane synoným a tvarov), zdieľaný negatívny zoznam, prehodnotenie match types (broad len so smart biddingom), a týždenná rutina čistenia. Konvertujúce dopyty naopak povýšim na exact.' },
      { q: 'Kedy nasadíte Performance Max a aké sú jeho riziká?', kw: ['feed', 'meranie', 'brand', 'exclusion', 'doplnok', 'search'], model: 'PMax nasadzujem, keď funguje konverzné meranie, existujú kvalitné assets/feed a je vybudovaný Search základ. Riziká: čierna skrinka, pripisovanie brand konverzií (riešim brand exclusions) a závislosť od kvality konverzných dát. PMax je doplnok Search, nie náhrada.' },
      { q: 'Konverzie klienta zo dňa na deň klesli na nulu, útrata beží. Čo robíte?', kw: ['meranie', 'tag', 'test', 'web', 'formulár', 'technik'], model: 'Náhla nula pri bežnej útrate = takmer vždy rozbité meranie, nie trh. Overím konverzný tag (Tag Assistant/GTM preview), funkčnosť webu a formulárov, potom nedávne zmeny (release, consent lišta). Až po vylúčení techniky riešim trh a kampane.' },
      { q: 'Ako vysvetlíte klientovi rozdiel medzi CPA 20 € pri 10 konverziách a CPA 35 € pri 60 konverziách?', kw: ['objem', 'zisk', 'škál', 'marginal', 'absolút', 'celkov'], model: 'Nižšie CPA neznamená lepší biznis. 10×20 € = malý objem; 60 konverzií pri 35 € môže znamenať násobne vyšší celkový zisk, ak je CPA pod hranicou rentability. Škálovanie prirodzene zvyšuje marginálne CPA — optimalizujeme celkový zisk, nie pomerové číslo.' },
      { q: 'Aké kroky spravíte pred spustením kampaní pre úplne nového klienta?', kw: ['discovery', 'marž', 'meranie', 'keyword', 'research', 'cieľ', 'landing'], model: 'Discovery (biznis, marža, hodnota zákazníka → výpočet cieľového CPA/ROAS), keyword research a konkurenčná analýza, nasadenie a otestovanie konverzného merania + Consent Mode, review landing pages, návrh štruktúry (brand/non-brand), nastavenie očakávaní na prvé 3 mesiace.' },
      { q: 'Čo je Quality Score, z čoho sa skladá a ako ho zlepšíte?', kw: ['ctr', 'relevan', 'landing', 'komponent', 'tesn'], model: 'Diagnostické skóre 1–10 z troch komponentov: expected CTR, ad relevance, landing page experience. Zlepšenie podľa slabého komponentu: silnejšie reklamy a presnejšie cielenie (CTR), tesnejšie ad groups s kľúčovým slovom v nadpisoch (relevance), dedikované rýchle landing pages (LP experience).' },
    ]},
  { id: 'seo', name: 'SEO / Technical Specialist', icon: '🔍', role: 'SEO pozícia so zameraním na technické SEO',
    questions: [
      { q: 'Vysvetlite rozdiel medzi crawlingom a indexáciou — a ako do toho vstupuje robots.txt a noindex.', kw: ['crawl', 'index', 'robots', 'noindex', 'blokovan'], model: 'Crawling = sťahovanie stránok Googlebotom; indexácia = zaradenie do indexu. robots.txt riadi crawling (nie indexáciu!) — blokovaná URL sa môže indexovať „naslepo". Na de-indexáciu slúži noindex, pričom stránka nesmie byť blokovaná v robots.txt, inak Google noindex neuvidí.' },
      { q: 'Web po redizajne stratil 40 % organiky. Ako postupujete?', kw: ['redirect', '301', 'mapa', 'url', 'gsc', 'canonical', 'noindex'], model: 'Korelácia s nasadením = hľadám technickú regresiu: zmeny URL bez 301 redirect mapy, zabudnutý noindex z testu, rozbité canonicaly, robots.txt. V GSC kontrolujem Page indexing trendy a 404. Náprava: redirect mapa 1:1, oprava tagov, validácia opráv a monitoring.' },
      { q: 'Čo je „Crawled — currently not indexed" a ako to riešite?', kw: ['kvalit', 'intern', 'odkaz', 'obsah', 'thin', 'duplicit'], model: 'Google stránku stiahol, ale nepovažuje ju za dosť hodnotnú na indexáciu. Riešenie nie je Request indexing dokola, ale zlepšenie kvality a unikátnosti obsahu, interné prelinkovanie z autoritatívnych stránok a konsolidácia duplicít.' },
      { q: 'Vymenujte Core Web Vitals, ich prahové hodnoty a po jednej príčine zlyhania.', kw: ['lcp', 'inp', 'cls', '2,5', '200', '0,1'], model: 'LCP ≤ 2,5 s (pomalé hero obrázky/server), INP ≤ 200 ms (ťažký JavaScript), CLS ≤ 0,1 (obrázky bez rozmerov, naskakujúce bannery). Hodnotí sa na 75. percentile field dát (CrUX) za 28 dní — oprava sa v GSC prejaví až po týždňoch.' },
      { q: 'Kedy použijete canonical a kedy 301 redirect?', kw: ['canonical', '301', 'dostupn', 'duplicit', 'hint', 'trval'], model: 'Canonical: obe verzie majú zostať dostupné používateľom (parametre, varianty) — je to hint pre vyhľadávač. 301: URL má natrvalo zaniknúť v prospech inej — fyzicky presmeruje a prenáša signály. Pri migráciách vždy 301, pri variantoch canonical.' },
      { q: 'Klient sa pýta: „Dostali sme penalizáciu?" — ako to zistíte?', kw: ['manual', 'action', 'gsc', 'algoritm', 'core update', 'správa'], model: 'Manual action = správa v GSC reporte Manual actions — vtedy náprava + reconsideration request. Prázdny report + prepad pri známom core update = algoritmické prehodnotenie, žiadna žiadosť neexistuje — rieši sa kvalitou obsahu a webu. Rozlíšenie týchto dvoch situácií je kľúčové.' },
      { q: 'Ako spravíte technický audit webu — aké oblasti pokryjete?', kw: ['index', 'architekt', 'duplicit', 'cwv', 'odkaz', 'robots', 'priorit'], model: '8 oblastí: indexácia a crawling (robots, sitemap, coverage), architektúra a interné odkazy, duplicity a kanonizácia, obsah, CWV a mobilita, odkazový profil, bezpečnosť a penalizácie. Výstup: nálezy s dôkazmi, prioritizácia dopad × náročnosť, plán 30/60/90 dní.' },
      { q: 'Prečo môže mať stránka vysoké impresie a nízke CTR — a čo s tým?', kw: ['title', 'description', 'pozíci', 'snippet', 'benchmark', 'rich'], model: 'Buď nízka pozícia, alebo slabý snippet. Porovnám CTR s benchmarkom pre danú pozíciu; ak zaostáva, prepíšem title (dopyt + benefit + rok) a description (CTA), zvážim štruktúrované dáta pre rich results. Meriam pred/po na rovnakých dopytoch.' },
    ]},
  { id: 'full', name: 'Digital Specialist (GBP + SEO + Ads)', icon: '🎯', role: 'Full-stack digital pozícia / freelancer pre SME klientov',
    questions: [
      { q: 'Lokálna firma má 200 € mesačne na marketing. Kam ich investujete a prečo?', kw: ['gbp', 'profil', 'recenz', 'zadarmo', 'organ', 'search'], model: 'Najprv bezplatné kanály s najvyššou návratnosťou: kompletná optimalizácia GBP profilu + systém recenzií (najsilnejší lokálny kanál, zadarmo). Zvyšok do malej Search kampane na dopyty s najvyšším intentom. Display/social pri tomto rozpočte nemá zmysel.' },
      { q: 'Vysvetlite tri piliere lokálneho rankingu a ako ich ovplyvníte.', kw: ['relevance', 'distance', 'prominence', 'kategó', 'recenz', 'citáci'], model: 'Relevance (kategórie, kompletnosť profilu, obsah webu), Distance (neovplyvním — riadi realita polohy), Prominence (recenzie, citácie, autorita webu, PR). Prakticky: správna primárna kategória + systém recenzií + konzistentné NAP + lokálne landing pages.' },
      { q: 'Klient chce „byť prvý na Google". Ako s ním vediete rozhovor?', kw: ['očakáv', 'dopyt', 'cieľ', 'biznis', 'konkrét', 'metrik'], model: 'Preformulujem cieľ z pozície na biznis výsledok: „prvý na čo, pre koho a čo to prinesie?" Vysvetlím rozdiel SEO/Ads/lokálne výsledky, reálne časové rámce a navrhnem merateľné KPI (dopyty, hovory, objednávky). Sľubovanie pozícií je červená vlajka neprofesionála.' },
      { q: 'Aká je synergia medzi GBP a Google Ads pre lokálnu firmu?', kw: ['location', 'asset', 'prepoj', 'call', 'lokáln', 'maps'], model: 'Prepojenie GBP ↔ Ads odomyká location assets (adresa, hodnotenie, vzdialenosť pri reklame) a reklamy na Maps. Call assets + call konverzie merajú hovory. Organický profil zvyšuje dôveru pri brandovom overovaní po kliku na reklamu — kanály sa násobia, nie sčítavajú.' },
      { q: 'Firma dostala vlnu falošných 1★ recenzií od konkurencie. Postup?', kw: ['nahlás', 'konflikt', 'odpove', 'redressal', 'dôkaz', 'reviews management'], model: 'Recenzie od konkurencie = konflikt záujmov → nahlásiť (profil + Reviews Management Tool), doložiť vzorec (časová vlna, žiadni reálni zákazníci). Súbežne verejne profesionálne odpovedať pre budúcich zákazníkov a posilniť prísun reálnych recenzií, ktoré vlnu rozriedia.' },
      { q: 'Ako by ste merali úspešnosť GBP profilu a reportovali ju klientovi?', kw: ['interakc', 'volan', 'tras', 'utm', 'discovery', 'vanity'], model: 'Interakcie > zobrazenia: hovory, žiadosti o trasu, kliky na web (s UTM do GA4), rezervácie. Pomer discovery vs. brand dopytov ukazuje získavanie nových zákazníkov. Mesačný report: viditeľnosť, akcie, recenzie (počet/priemer/response rate) + vykonané práce. Zobrazenia sú vanity metrika.' },
      { q: 'Klient má web, GBP aj kampane — všetko priemerné. Kde začnete a prečo?', kw: ['audit', 'quick win', 'dopad', 'priorit', 'meranie', 'dáta'], model: 'Trojitý audit (GBP, web/GSC, Ads) → matica dopad × náročnosť → quick wins najprv (typicky: meranie konverzií, GBP kategórie a recenzie, negatívne slová). Bez auditu nezačínam nič „vylepšovať" — priority musia vychádzať z dát, nie dojmov.' },
      { q: 'Ako si udržiavate odbornosť v rýchlo sa meniacom Google ekosystéme?', kw: ['blog', 'test', 'komunita', 'oficiál', 'experiment', 'zdroje'], model: 'Oficiálne zdroje (Google Ads & Search Central blogy, release notes), overené komunity a newslettre, a hlavne vlastné experimenty na účtoch — zmeny najprv testujem, potom škálujem. Certifikácie obnovujem ročne; kľúčová je prax, nie teória.' },
    ]},
];

const Interview = {
  session: null, // { track, idx, scores[], answers[] }
  start(trackId) {
    const track = DATA.interviewTracks.find(t => t.id === trackId);
    this.session = { track, idx: 0, scores: [], answers: [] };
    this.renderQ();
  },
  renderQ(feedback) {
    const s = this.session;
    if (s.idx >= s.track.questions.length) { this.finish(); return; }
    const q = s.track.questions[s.idx];
    App.modal(`
      <div class="flex items-center justify-between mb-3">
        <div><h3 class="font-bold text-zinc-900 dark:text-white">🎙️ Pohovor: ${s.track.name}</h3>
        <div class="text-xs text-zinc-500">Otázka ${s.idx + 1}/${s.track.questions.length}</div></div>
        <button onclick="Interview.session=null;App.closeModal()" class="text-zinc-400 hover:text-red-400"><i data-lucide="x" class="w-5 h-5"></i></button>
      </div>
      ${Views.progressBar((s.idx + 1) / s.track.questions.length * 100, 'from-sky-500 to-cyan-400', 'h-1.5')}
      ${feedback || ''}
      <div class="rounded-2xl bg-zinc-100 dark:bg-zinc-800/70 p-4 text-sm text-zinc-800 dark:text-zinc-200 my-4">
        <b>Recruiter:</b> „${q.q}"
      </div>
      <textarea id="iv-input" rows="5" placeholder="Odpovedz ako na skutočnom pohovore — štruktúrovane, s konkrétnymi pojmami a príkladmi…"
        class="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent p-3 text-sm outline-none focus:border-sky-500 mb-3"></textarea>
      <button onclick="Interview.answer()" class="btn-press w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold">Odpovedať</button>
    `, true);
    if (window.lucide) lucide.createIcons();
  },
  answer() {
    const s = this.session;
    const text = (document.getElementById('iv-input').value || '').trim();
    if (text.length < 30) { App.toast('✍️ Rozveď odpoveď', 'na pohovore jednoslovná odpoveď neobstojí', ''); return; }
    const q = s.track.questions[s.idx];
    const t = text.toLowerCase();
    const hits = q.kw.filter(k => t.includes(k)).length;
    const score = Math.min(100, Math.round(hits / Math.min(4, q.kw.length) * 70) + (text.length > 200 ? 30 : text.length > 100 ? 20 : 10));
    s.scores.push(score);
    s.answers.push(text);
    const fb = `
      <div class="rounded-xl border ${score >= 70 ? 'border-emerald-500/30 bg-emerald-500/5' : score >= 40 ? 'border-amber-500/30 bg-amber-500/5' : 'border-red-500/30 bg-red-500/5'} p-3 mt-3 text-xs">
        <div class="font-bold mb-1 ${score >= 70 ? 'text-emerald-500' : score >= 40 ? 'text-amber-500' : 'text-red-400'}">
          ${score >= 70 ? '✅ Silná odpoveď' : score >= 40 ? '🟡 Priemerná odpoveď' : '🔴 Slabá odpoveď'} (${score}/100) — pokryl si ${hits}/${q.kw.length} kľúčových bodov
        </div>
        <div class="text-zinc-600 dark:text-zinc-400"><b>Vzorová odpoveď seniora:</b> ${q.model}</div>
      </div>`;
    s.idx++;
    this.renderQ(fb);
  },
  finish() {
    const s = this.session;
    const avg = Math.round(s.scores.reduce((a, b) => a + b, 0) / s.scores.length);
    const verdict = avg >= 75 ? ['🏆 Odporúčanie: PRIJAŤ', 'Odpovedal si na úrovni skúseného špecialistu. S portfóliom projektov z tejto akadémie máš na pohovore silnú pozíciu.', '#10b981']
      : avg >= 50 ? ['🤝 Odporúčanie: DRUHÉ KOLO', 'Základy máš, chýba hĺbka v niektorých témach. Prejdi si vzorové odpovede a zopakuj slabšie oblasti.', '#f59e0b']
      : ['📚 Odporúčanie: EŠTE TRÉNOVAŤ', 'Na reálny pohovor je priskoro — vráť sa k modulom, ktoré pokrývajú otázky s najnižším skóre.', '#ef4444'];
    App.state.interviews.push({ track: s.track.id, avg, date: Date.now() });
    App.save();
    App.addXP(40 + Math.round(avg / 2), 'Interview Mode');
    const weakest = s.track.questions.map((q, i) => ({ q: q.q, sc: s.scores[i] })).sort((a, b) => a.sc - b.sc).slice(0, 3);
    App.modal(`
      <div class="text-center mb-4">
        <div class="text-4xl mb-2">🎙️</div>
        <h3 class="font-bold text-lg text-zinc-900 dark:text-white">Pohovor dokončený — ${avg}/100</h3>
        <div class="font-bold mt-1" style="color:${verdict[2]}">${verdict[0]}</div>
        <p class="text-sm text-zinc-500 mt-1">${verdict[1]}</p>
      </div>
      <h4 class="font-bold text-sm mb-2">Skóre po otázkach</h4>
      <div class="space-y-1 mb-4">${s.scores.map((sc, i) => `
        <div class="flex items-center gap-2 text-xs"><span class="w-6 text-zinc-500">${i + 1}.</span>
        <div class="flex-1 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden"><div class="h-full rounded-full" style="background:${sc >= 70 ? '#10b981' : sc >= 40 ? '#f59e0b' : '#ef4444'};width:${sc}%"></div></div>
        <b class="w-8 text-right">${sc}</b></div>`).join('')}</div>
      <div class="rounded-xl bg-sky-500/10 border border-sky-500/20 p-3 text-xs mb-4">
        <b class="text-sky-400">Na zlepšenie:</b>
        <ul class="mt-1 space-y-0.5 text-zinc-600 dark:text-zinc-400">${weakest.map(w => `<li>• ${w.q} <b>(${w.sc}/100)</b></li>`).join('')}</ul>
      </div>
      <button onclick="Interview.session=null;App.closeModal();App.render()" class="btn-press w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold">Zavrieť</button>
    `, true);
    this.session = null;
  },
};

/* ═══════════════ VIEW: POHOVOR ═══════════════ */
Views.interview = function () {
  const hist = App.state.interviews || [];
  return `
  <p class="text-sm text-zinc-500 mb-4">🎙️ AI recruiter s tebou povedie technický pohovor — 8 otázok, odpovedáš vlastnými slovami, po každej odpovedi vidíš vzorovú odpoveď seniora. Na konci dostaneš verdikt ako z reálneho výberového konania.</p>
  <div class="grid md:grid-cols-3 gap-4">
    ${DATA.interviewTracks.map(t => {
      const best = hist.filter(h => h.track === t.id).sort((a, b) => b.avg - a.avg)[0];
      return `<div class="card-hover rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#131316] p-5 flex flex-col">
        <div class="text-3xl mb-2">${t.icon}</div>
        <h3 class="font-bold text-zinc-900 dark:text-white">${t.name}</h3>
        <p class="text-xs text-zinc-500 mt-1 mb-3 flex-1">${t.role} · ${t.questions.length} otázok</p>
        ${best ? `<div class="text-xs mb-2">Najlepší výsledok: <b style="color:${best.avg >= 75 ? '#10b981' : '#f59e0b'}">${best.avg}/100</b></div>` : ''}
        <button onclick="Interview.start('${t.id}')" class="btn-press w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold">Začať pohovor</button>
      </div>`;
    }).join('')}
  </div>
  ${hist.length ? `<div class="mt-4">${this.card(`
    <h3 class="font-bold text-sm text-zinc-900 dark:text-white mb-2">História pohovorov</h3>
    <div class="space-y-1">${[...hist].reverse().slice(0, 8).map(h => {
      const t = DATA.interviewTracks.find(x => x.id === h.track);
      return `<div class="flex items-center gap-3 text-sm py-1.5 border-b border-zinc-100 dark:border-zinc-800/60 last:border-0">
        <span>${t.icon}</span><span class="flex-1">${t.name}</span>
        <span class="text-xs text-zinc-500">${new Date(h.date).toLocaleDateString('sk')}</span>
        <b class="text-xs" style="color:${h.avg >= 75 ? '#10b981' : h.avg >= 50 ? '#f59e0b' : '#ef4444'}">${h.avg}/100</b></div>`;
    }).join('')}</div>`)}</div>` : ''}`;
};
</script>
