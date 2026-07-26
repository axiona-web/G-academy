<script>
/* ═══════════════════════════════════════════════════════════════════
   AI AUDITOR + PORTFOLIO BUILDER
   ───────────────────────────────────────────────────────────────────
   • Web audit: REÁLNE dáta z Google PageSpeed Insights API
     (bezplatné, funguje priamo z prehliadača) → výkon, CWV, SEO.
   • GBP audit: expertný wizard — odpovieš na otázky podľa profilu,
     engine vypočíta skóre a prioritizované odporúčania.
   • Každé odporúčanie: závažnosť · dopad · náročnosť · čas · prínos.
   • Portfolio Builder: z auditu vygeneruje profesionálny HTML report
     pripravený na odoslanie klientovi (tlač → PDF).
   ═══════════════════════════════════════════════════════════════════ */

const Auditor = {
  /* ── Katalóg odporúčaní pre web audit (mapované na PSI audity) ──
     sev: critical/high/med/low · impact/effort 1–5 · time · benefit */
  webRecs: {
    'largest-contentful-paint': { name: 'Zrýchliť LCP (najväčší prvok)', sev: 'high', impact: 4, effort: 3, time: '1–3 dni', benefit: 'Lepší UX, konverzie aj CWV hodnotenie', how: 'Optimalizuj hero obrázok (WebP/AVIF, preload), zrýchli server (TTFB), použi CDN.' },
    'cumulative-layout-shift': { name: 'Odstrániť poskakovanie layoutu (CLS)', sev: 'med', impact: 3, effort: 2, time: '0,5–1 deň', benefit: 'Stabilná stránka = menej frustrácie a chybných klikov', how: 'Nastav rozmery obrázkov/iframe, rezervuj miesto pre bannery, font-display: swap.' },
    'total-blocking-time': { name: 'Znížiť blokovanie JavaScriptom (INP/TBT)', sev: 'high', impact: 4, effort: 4, time: '2–5 dní', benefit: 'Rýchla odozva na kliky, lepšie INP', how: 'Code splitting, odloženie skriptov tretích strán, audit tag managera.' },
    'server-response-time': { name: 'Zrýchliť odozvu servera (TTFB)', sev: 'high', impact: 4, effort: 3, time: '1–2 dni', benefit: 'Základ všetkých rýchlostných metrík', how: 'Caching, lepší hosting, optimalizácia databázy.' },
    'render-blocking-resources': { name: 'Odstrániť render-blocking zdroje', sev: 'med', impact: 3, effort: 2, time: '0,5 dňa', benefit: 'Rýchlejšie prvé vykreslenie', how: 'Critical CSS inline, defer/async pre JS, odlož nepotrebné CSS.' },
    'uses-optimized-images': { name: 'Optimalizovať obrázky', sev: 'med', impact: 3, effort: 1, time: '2–4 hodiny', benefit: 'Menšie prenosy, rýchlejšie LCP', how: 'WebP/AVIF formáty, správne rozmery, lazy-loading (nie pre LCP prvok).' },
    'document-title': { name: 'Doplniť title stránky', sev: 'critical', impact: 5, effort: 1, time: '30 minút', benefit: 'Title je základný SEO signál a text v SERP', how: 'Unikátny title do 60 znakov: dopyt + benefit + brand.' },
    'meta-description': { name: 'Doplniť meta description', sev: 'high', impact: 3, effort: 1, time: '1 hodina', benefit: 'Vyššie CTR vo výsledkoch (reklamný text zadarmo)', how: '150–160 znakov, benefit + CTA, unikátne per stránka.' },
    'link-text': { name: 'Opraviť generické texty odkazov', sev: 'low', impact: 2, effort: 1, time: '1–2 hodiny', benefit: 'Lepšie pochopenie štruktúry Googlom', how: 'Nahraď „kliknite sem" popisnými anchor textami.' },
    'is-crawlable': { name: 'KRITICKÉ: Stránka je blokovaná pre indexáciu!', sev: 'critical', impact: 5, effort: 1, time: '30 minút', benefit: 'Bez indexácie neexistuje organická návštevnosť', how: 'Odstráň noindex / robots.txt blokáciu — over zámer s vývojárom.' },
    'robots-txt': { name: 'Opraviť robots.txt', sev: 'high', impact: 4, effort: 1, time: '1 hodina', benefit: 'Správne riadenie crawlingu', how: 'Validuj syntax, over že neblokuje CSS/JS ani dôležité sekcie.' },
    'image-alt': { name: 'Doplniť alt texty obrázkov', sev: 'low', impact: 2, effort: 2, time: '2–4 hodiny', benefit: 'Prístupnosť + obrázkové vyhľadávanie', how: 'Popisné alt atribúty pre informačné obrázky.' },
    'hreflang': { name: 'Opraviť hreflang', sev: 'med', impact: 3, effort: 2, time: '0,5 dňa', benefit: 'Správne jazykové verzie v správnych krajinách', how: 'Konzistentné obojsmerné hreflang anotácie + x-default.' },
    'canonical': { name: 'Opraviť canonical', sev: 'high', impact: 4, effort: 1, time: '1–2 hodiny', benefit: 'Čistá kanonizácia = žiadne rozdrobené signály', how: 'Self-referencing canonical, absolútna URL, súlad so sitemap.' },
    'viewport': { name: 'Doplniť viewport meta tag', sev: 'critical', impact: 5, effort: 1, time: '15 minút', benefit: 'Bez neho web nie je mobilný — mobile-first indexing!', how: '<meta name="viewport" content="width=device-width, initial-scale=1">.' },
    'is-on-https': { name: 'Prejsť na HTTPS', sev: 'critical', impact: 5, effort: 2, time: '0,5 dňa', benefit: 'Bezpečnosť, dôvera, ranking signál', how: 'SSL certifikát (Let\'s Encrypt zdarma) + 301 z HTTP + oprava mixed content.' },
  },

  /* Sanitizácia používateľských vstupov pred uložením/renderovaním
     (ochrana pred HTML injection v histórii auditov a reportoch) */
  clean(s) { return String(s || '').replace(/[<>"'`]/g, '').slice(0, 200); },

  /* ── WEB AUDIT cez PageSpeed Insights API ── */
  async runWebAudit(url) {
    url = this.clean(url);
    const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=' + encodeURIComponent(url) + '&strategy=mobile&category=PERFORMANCE&category=SEO&locale=sk';
    const resp = await fetch(api);
    if (!resp.ok) throw new Error('PSI API vrátilo ' + resp.status + ' — skontroluj URL (musí byť verejne dostupná).');
    const d = await resp.json();
    const lh = d.lighthouseResult;
    if (!lh) throw new Error('Lighthouse analýza zlyhala — web môže blokovať roboty.');
    const perf = Math.round((lh.categories.performance?.score || 0) * 100);
    const seo = Math.round((lh.categories.seo?.score || 0) * 100);
    // Field data (CrUX) ak existujú
    const crux = d.loadingExperience?.metrics || {};
    const cwv = {
      lcp: crux.LARGEST_CONTENTFUL_PAINT_MS ? (crux.LARGEST_CONTENTFUL_PAINT_MS.percentile / 1000).toFixed(1) + ' s (' + this.cat(crux.LARGEST_CONTENTFUL_PAINT_MS.category) + ')' : (lh.audits['largest-contentful-paint']?.displayValue || '—') + ' (lab)',
      cls: crux.CUMULATIVE_LAYOUT_SHIFT_SCORE ? (crux.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile / 100).toFixed(2) + ' (' + this.cat(crux.CUMULATIVE_LAYOUT_SHIFT_SCORE.category) + ')' : (lh.audits['cumulative-layout-shift']?.displayValue || '—') + ' (lab)',
      inp: crux.INTERACTION_TO_NEXT_PAINT ? crux.INTERACTION_TO_NEXT_PAINT.percentile + ' ms (' + this.cat(crux.INTERACTION_TO_NEXT_PAINT.category) + ')' : 'nedostatok field dát',
    };
    // Zozbieraj neúspešné audity, na ktoré máme odporúčania
    const recs = [];
    Object.entries(this.webRecs).forEach(([id, rec]) => {
      const a = lh.audits[id];
      if (a && a.score !== null && a.score < 0.9) recs.push({ ...rec, detail: a.displayValue || '' });
    });
    const sevRank = { critical: 0, high: 1, med: 2, low: 3 };
    recs.sort((a, b) => sevRank[a.sev] - sevRank[b.sev] || b.impact - a.impact);
    const overall = Math.round(perf * 0.45 + seo * 0.4 + (recs.filter(r => r.sev === 'critical').length ? 0 : 15));
    const audit = {
      type: 'web', url, date: Date.now(),
      overall: Math.min(100, overall), perf, seo, cwv, recs,
      quickWins: recs.filter(r => r.effort <= 2).slice(0, 5),
      longTerm: recs.filter(r => r.effort >= 3),
      adsReady: seo >= 70 && perf >= 40 ? 'Web je použiteľný ako landing page pre kampane.' : 'Pred spustením kampaní odporúčame opraviť kritické nálezy — landing page kvalita ovplyvňuje Quality Score aj konverzie.',
    };
    App.state.audits.unshift(audit);
    App.state.audits = App.state.audits.slice(0, 20);
    App.save();
    App.addXP(50, 'AI Audit webu');
    return audit;
  },
  cat(c) { return c === 'FAST' ? 'dobré' : c === 'AVERAGE' ? 'priemer' : 'zlé'; },

  /* ── GBP AUDIT WIZARD — otázky a váhy ── */
  gbpQuestions: [
    { id: 'claimed', q: 'Je profil prevzatý (claimnutý) a verifikovaný?', w: 10, cat: 'Základ', rec: { name: 'Prevziať a verifikovať profil', sev: 'critical', impact: 5, effort: 2, time: '3–10 dní', benefit: 'Bez verifikácie firma nespravuje svoju prezentáciu', how: 'Claim na google.com/business + video verifikácia.' } },
    { id: 'name', q: 'Je názov profilu presne reálny názov firmy (bez pridaných kľúčových slov)?', w: 6, cat: 'Základ', rec: { name: 'Opraviť názov profilu', sev: 'high', impact: 4, effort: 1, time: '30 minút', benefit: 'Súlad s pravidlami — bez rizika suspendácie', how: 'Názov = reálny názov na výklade/dokladoch.' } },
    { id: 'category', q: 'Je primárna kategória čo najkonkrétnejšia pre core biznis?', w: 10, cat: 'Relevancia', rec: { name: 'Optimalizovať primárnu kategóriu', sev: 'critical', impact: 5, effort: 1, time: '1 hodina + analýza', benefit: 'Najsilnejší relevančný signál profilu', how: 'Analyzuj kategórie top 3 konkurentov v Local Packu, zvoľ najkonkrétnejšiu.' } },
    { id: 'seccat', q: 'Sú doplnené relevantné sekundárne kategórie?', w: 4, cat: 'Relevancia', rec: { name: 'Doplniť sekundárne kategórie', sev: 'med', impact: 3, effort: 1, time: '30 minút', benefit: 'Pokrytie ďalších služieb', how: 'Pridaj len reálne vykonávané činnosti (max 9).' } },
    { id: 'nap', q: 'Je NAP (názov, adresa, telefón) zhodný s webom a katalógmi?', w: 7, cat: 'Základ', rec: { name: 'Zjednotiť NAP všade', sev: 'high', impact: 4, effort: 2, time: '0,5–1 deň', benefit: 'Dôvera algoritmu v dáta o firme', how: 'Master formát NAP → web, profil, katalógy, sociálne siete.' } },
    { id: 'hours', q: 'Sú otváracie hodiny aktuálne vrátane sviatkov (special hours)?', w: 5, cat: 'Základ', rec: { name: 'Aktualizovať hodiny + sviatky', sev: 'high', impact: 3, effort: 1, time: '30 minút', benefit: 'Menej negatívnych recenzií od zákazníkov pred zavretými dverami', how: 'Nastav special hours na celý rok dopredu.' } },
    { id: 'desc', q: 'Je vyplnený popis firmy (využitých ~750 znakov)?', w: 3, cat: 'Obsah', rec: { name: 'Napísať popis firmy', sev: 'low', impact: 2, effort: 1, time: '1 hodina', benefit: 'Lepšia konverzia profilu', how: 'Čo robíte, pre koho, čím ste výnimoční — kľúčové info v prvých 250 znakoch.' } },
    { id: 'services', q: 'Sú vyplnené Služby s popismi?', w: 6, cat: 'Obsah', rec: { name: 'Vyplniť služby s popismi', sev: 'med', impact: 3, effort: 2, time: '2–3 hodiny', benefit: 'Relevančné signály + justifications', how: 'Všetky služby + 300-znakové popisy s prirodzenými frázami.' } },
    { id: 'products', q: 'Sú vytvorené Produkty (karty s fotkou a cenou)?', w: 5, cat: 'Obsah', rec: { name: 'Vytvoriť produktové karty', sev: 'med', impact: 3, effort: 2, time: '2–3 hodiny', benefit: 'Vizuálna dominancia Knowledge Panelu — quick win #1', how: 'Min. 5 produktov/balíkov s fotkou, cenou a CTA na web.' } },
    { id: 'photos', q: 'Má profil 10+ kvalitných reálnych fotiek (nie stock) a pribúdajú nové?', w: 6, cat: 'Obsah', rec: { name: 'Doplniť fotografie + nastaviť rytmus', sev: 'med', impact: 3, effort: 2, time: '0,5 dňa + priebežne', benefit: 'Viac žiadostí o trasu a klikov', how: 'Foto scenár: exteriér 3×, interiér 5×, tím, práca. Potom 2–4 nové mesačne.' } },
    { id: 'posts', q: 'Publikuje firma Google Posts aspoň 2× mesačne?', w: 3, cat: 'Obsah', rec: { name: 'Rozbehnúť Google Posts', sev: 'low', impact: 2, effort: 1, time: '1 h/mesiac', benefit: 'Živý profil + CTA v paneli', how: 'Recykluj obsah zo sociálnych sietí, 1–2 posty týždenne.' } },
    { id: 'qa', q: 'Je Q&A sekcia naplnená vlastnými FAQ a monitorovaná?', w: 3, cat: 'Obsah', rec: { name: 'Naplniť a strážiť Q&A', sev: 'med', impact: 3, effort: 1, time: '2 hodiny + monitoring', benefit: 'Kontrola nad verejnými odpoveďami', how: 'Seed 5–10 FAQ, zapni notifikácie, odpovedaj do 24 h.' } },
    { id: 'reviews-count', q: 'Má firma porovnateľný počet recenzií ako top 3 konkurencia?', w: 9, cat: 'Recenzie', rec: { name: 'Spustiť systém získavania recenzií', sev: 'critical', impact: 5, effort: 2, time: 'priebežne', benefit: 'Najsilnejší prominence signál + konverzia', how: 'Review link/QR + žiadosť po každej zákazke + follow-up SMS/e-mail.' } },
    { id: 'reviews-reply', q: 'Odpovedá firma na (takmer) všetky recenzie?', w: 5, cat: 'Recenzie', rec: { name: 'Odpovedať na recenzie (SLA 24–48 h)', sev: 'high', impact: 3, effort: 1, time: '15 min/deň', benefit: 'Signál starostlivosti pre zákazníkov aj algoritmus', how: '4A framework, šablóny pre bežné scenáre.' } },
    { id: 'landing', q: 'Odkazuje profil na relevantnú rýchlu stránku (s UTM parametrami)?', w: 4, cat: 'Web', rec: { name: 'Nastaviť správnu landing + UTM', sev: 'med', impact: 3, effort: 1, time: '1 hodina', benefit: 'Merateľnosť prínosu profilu v GA4', how: 'Lokálna podstránka + ?utm_source=gbp.' } },
    { id: 'schema', q: 'Má web LocalBusiness schema markup?', w: 3, cat: 'Web', rec: { name: 'Implementovať LocalBusiness schema', sev: 'low', impact: 2, effort: 2, time: '2 hodiny', benefit: 'Strojové prepojenie webu s profilom', how: 'JSON-LD: name, address, phone, geo, openingHours, sameAs.' } },
    { id: 'spam', q: 'Je Local Pack bez zjavného spamu konkurencie (keyword stuffing názvov)?', w: 4, cat: 'Konkurencia', rec: { name: 'Nahlásiť spam konkurencie', sev: 'med', impact: 4, effort: 2, time: '2–3 hodiny', benefit: 'Každý odstránený spamer = pozícia vyššie zadarmo', how: 'Suggest an edit + Redressal form s dôkazmi.' } },
    { id: 'citations', q: 'Je firma v hlavných katalógoch (Zoznam, Azet, Bing, Apple Maps)?', w: 3, cat: 'Web', rec: { name: 'Vybudovať základné citácie', sev: 'low', impact: 2, effort: 2, time: '0,5 dňa', benefit: 'Prominence + konzistencia dát', how: '10–20 kvalitných katalógov s master NAP.' } },
  ],

  runGbpAudit(answers, bizName) {
    bizName = this.clean(bizName);
    let score = 0, totalW = 0;
    const recs = [];
    this.gbpQuestions.forEach(q => {
      totalW += q.w;
      const a = answers[q.id]; // 1 = áno, 0.5 = čiastočne, 0 = nie
      score += q.w * (a ?? 0);
      if ((a ?? 0) < 1) recs.push({ ...q.rec, partial: a === 0.5 });
    });
    const sevRank = { critical: 0, high: 1, med: 2, low: 3 };
    recs.sort((a, b) => sevRank[a.sev] - sevRank[b.sev] || b.impact - a.impact);
    const overall = Math.round(score / totalW * 100);
    const audit = {
      type: 'gbp', url: bizName, date: Date.now(), overall,
      cats: ['Základ', 'Relevancia', 'Obsah', 'Recenzie', 'Web', 'Konkurencia'].map(c => {
        const qs = this.gbpQuestions.filter(q => q.cat === c);
        const s = qs.reduce((a, q) => a + q.w * (answers[q.id] ?? 0), 0);
        const t = qs.reduce((a, q) => a + q.w, 0);
        return { name: c, pct: Math.round(s / t * 100) };
      }),
      recs,
      quickWins: recs.filter(r => r.effort <= 1).slice(0, 5),
      longTerm: recs.filter(r => r.effort >= 2),
    };
    App.state.audits.unshift(audit);
    App.state.audits = App.state.audits.slice(0, 20);
    App.save();
    App.addXP(60, 'GBP Audit dokončený');
    return audit;
  },

  /* ── PORTFOLIO BUILDER: standalone HTML report na stiahnutie ── */
  buildReport(audit) {
    const sevColor = { critical: '#dc2626', high: '#ea580c', med: '#d97706', low: '#65a30d' };
    const sevName = { critical: 'KRITICKÉ', high: 'VYSOKÁ', med: 'STREDNÁ', low: 'NÍZKA' };
    const stars = n => '●'.repeat(n) + '○'.repeat(5 - n);
    const html = `<!DOCTYPE html><html lang="sk"><head><meta charset="utf-8">
<title>Audit — ${audit.url}</title>
<style>
  body{font-family:'Segoe UI',system-ui,sans-serif;margin:0;color:#18181b;background:#fff}
  .page{max-width:820px;margin:0 auto;padding:48px 40px}
  .head{display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #6366f1;padding-bottom:20px;margin-bottom:32px}
  .logo{width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:20px}
  h1{font-size:22px;margin:0}h2{font-size:16px;margin:28px 0 12px;color:#4f46e5}
  .muted{color:#71717a;font-size:13px}
  .score{display:flex;gap:16px;flex-wrap:wrap;margin:20px 0}
  .sc{flex:1;min-width:140px;border:1px solid #e4e4e7;border-radius:14px;padding:16px;text-align:center}
  .sc b{font-size:30px;display:block}
  table{width:100%;border-collapse:collapse;font-size:13px;margin:10px 0}
  th,td{border:1px solid #e4e4e7;padding:8px 10px;text-align:left;vertical-align:top}
  th{background:#fafafa}
  .sev{display:inline-block;padding:2px 8px;border-radius:99px;color:#fff;font-size:11px;font-weight:700}
  .qw{background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:12px 16px;margin:8px 0}
  .foot{margin-top:40px;padding-top:16px;border-top:1px solid #e4e4e7;font-size:11px;color:#a1a1aa;display:flex;justify-content:space-between}
  @media print{.page{padding:20px}}
</style></head><body><div class="page">
  <div class="head">
    <div style="display:flex;gap:14px;align-items:center">
      <div class="logo">G</div>
      <div><h1>${audit.type === 'web' ? 'Technický audit webu' : 'Audit Google Business Profile'}</h1>
      <div class="muted">${audit.url} · ${new Date(audit.date).toLocaleDateString('sk')}</div></div>
    </div>
    <div style="text-align:right"><b style="font-size:34px;color:${audit.overall >= 70 ? '#16a34a' : audit.overall >= 45 ? '#d97706' : '#dc2626'}">${audit.overall}/100</b><div class="muted">celkové skóre</div></div>
  </div>

  <h2>Zhrnutie</h2>
  <p style="font-size:14px;line-height:1.7">${audit.type === 'web'
    ? `Web dosiahol celkové skóre <b>${audit.overall}/100</b> (výkon ${audit.perf}/100, SEO ${audit.seo}/100). Identifikovali sme <b>${audit.recs.length} odporúčaní</b>, z toho ${audit.recs.filter(r => r.sev === 'critical').length} kritických. ${audit.adsReady}`
    : `Profil dosiahol celkové skóre <b>${audit.overall}/100</b>. Identifikovali sme <b>${audit.recs.length} odporúčaní</b> na zlepšenie viditeľnosti v lokálnom vyhľadávaní, z toho ${audit.recs.filter(r => r.sev === 'critical').length} kritických.`}</p>

  <div class="score">
  ${audit.type === 'web'
    ? `<div class="sc"><b style="color:#6366f1">${audit.perf}</b><span class="muted">Výkon (mobile)</span></div>
       <div class="sc"><b style="color:#6366f1">${audit.seo}</b><span class="muted">SEO</span></div>
       <div class="sc"><b style="font-size:16px;line-height:2.2">${audit.cwv.lcp}</b><span class="muted">LCP</span></div>
       <div class="sc"><b style="font-size:16px;line-height:2.2">${audit.cwv.cls}</b><span class="muted">CLS</span></div>`
    : audit.cats.map(c => `<div class="sc"><b style="color:${c.pct >= 70 ? '#16a34a' : c.pct >= 45 ? '#d97706' : '#dc2626'}">${c.pct}%</b><span class="muted">${c.name}</span></div>`).join('')}
  </div>

  ${audit.quickWins.length ? `<h2>⚡ Quick Wins (rýchle výhry)</h2>
  ${audit.quickWins.map(r => `<div class="qw"><b>${r.name}</b> — ${r.how} <span class="muted">(${r.time})</span></div>`).join('')}` : ''}

  <h2>Všetky odporúčania podľa priority</h2>
  <table><tr><th>Odporúčanie</th><th>Závažnosť</th><th>Dopad</th><th>Náročnosť</th><th>Čas</th><th>Očakávaný prínos</th></tr>
  ${audit.recs.map(r => `<tr>
    <td><b>${r.name}</b><br><span class="muted">${r.how}</span></td>
    <td><span class="sev" style="background:${sevColor[r.sev]}">${sevName[r.sev]}</span></td>
    <td>${stars(r.impact)}</td><td>${stars(r.effort)}</td><td>${r.time}</td><td>${r.benefit}</td></tr>`).join('')}
  </table>

  <div class="foot"><span>Vypracované v G-Academy · ${new Date(audit.date).toLocaleDateString('sk')}</span><span>Strana 1</span></div>
</div></body></html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `audit-${(audit.url || 'report').replace(/[^a-z0-9]/gi, '-').slice(0, 40)}.html`;
    a.click();
    App.toast('📄 Report stiahnutý', 'Otvor v prehliadači → Ctrl+P → uložiť ako PDF', '');
  },
};

/* ═══════════════ VIEW: AI AUDITOR ═══════════════ */
Views.auditor = function () {
  const history = App.state.audits || [];
  return `
  <div class="grid md:grid-cols-2 gap-4">
    ${this.card(`
      <div class="flex items-center gap-2 mb-1"><span class="text-xl">🌐</span><h3 class="font-bold text-zinc-900 dark:text-white">Audit webu</h3></div>
      <p class="text-xs text-zinc-500 mb-3">Reálna analýza cez Google PageSpeed Insights API — výkon, Core Web Vitals, SEO kontroly. Trvá ~30 sekúnd.</p>
      <div class="flex gap-2">
        <input id="audit-url" placeholder="https://www.priklad.sk" class="flex-1 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-indigo-500">
        <button onclick="Views.startWebAudit()" id="audit-btn" class="btn-press px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold">Auditovať</button>
      </div>
      <div id="audit-status" class="text-xs text-zinc-500 mt-2"></div>`)}
    ${this.card(`
      <div class="flex items-center gap-2 mb-1"><span class="text-xl">📍</span><h3 class="font-bold text-zinc-900 dark:text-white">Audit Google Business Profile</h3></div>
      <p class="text-xs text-zinc-500 mb-3">Expertný wizard — otvor si profil klienta na Maps, odpovedz na ${Auditor.gbpQuestions.length} otázok a dostaneš skóre + prioritizovaný akčný plán.</p>
      <button onclick="Views.startGbpAudit()" class="btn-press w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold">Spustiť GBP audit</button>`)}
  </div>
  <div id="audit-result" class="mt-4"></div>
  ${history.length ? `<div class="mt-4">${this.card(`
    <h3 class="font-bold text-sm text-zinc-900 dark:text-white mb-3">📂 História auditov (Portfolio)</h3>
    <div class="space-y-1.5">${history.map((a, i) => `
      <div class="flex items-center gap-3 text-sm py-2 border-b border-zinc-100 dark:border-zinc-800/60 last:border-0">
        <span>${a.type === 'web' ? '🌐' : '📍'}</span>
        <span class="flex-1 truncate">${a.url}</span>
        <span class="text-xs text-zinc-500">${new Date(a.date).toLocaleDateString('sk')}</span>
        <b class="text-xs" style="color:${a.overall >= 70 ? '#10b981' : a.overall >= 45 ? '#f59e0b' : '#ef4444'}">${a.overall}/100</b>
        <button onclick="Views.showAudit(${i})" class="text-xs font-bold text-indigo-400 hover:underline">Zobraziť</button>
        <button onclick="Auditor.buildReport(App.state.audits[${i}])" class="text-xs font-bold text-emerald-500 hover:underline">📄 Report</button>
      </div>`).join('')}</div>`)}</div>` : ''}`;
};

Views.startWebAudit = async function () {
  const url = document.getElementById('audit-url').value.trim();
  if (!url.startsWith('http')) { document.getElementById('audit-status').innerHTML = '⚠️ Zadaj celú URL vrátane https://'; return; }
  const btn = document.getElementById('audit-btn');
  btn.disabled = true; btn.textContent = 'Analyzujem…';
  document.getElementById('audit-status').innerHTML = '⏳ Google Lighthouse analyzuje web (20–40 s)…';
  try {
    await Auditor.runWebAudit(url);
    App.render();
    this.showAudit(0);
  } catch (e) {
    btn.disabled = false; btn.textContent = 'Auditovať';
    document.getElementById('audit-status').innerHTML = '❌ ' + e.message;
  }
};

Views.showAudit = function (i) {
  const a = App.state.audits[i];
  if (!a) return;
  const sevColor = { critical: '#ef4444', high: '#f97316', med: '#f59e0b', low: '#84cc16' };
  const sevName = { critical: 'Kritické', high: 'Vysoká', med: 'Stredná', low: 'Nízka' };
  const el = document.getElementById('audit-result');
  el.innerHTML = `
  <div class="rounded-2xl border-2 border-indigo-500/30 bg-white dark:bg-[#131316] p-5 animate-slide-up">
    <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
      <div><h3 class="font-bold text-lg text-zinc-900 dark:text-white">${a.type === 'web' ? '🌐' : '📍'} ${a.url}</h3>
      <div class="text-xs text-zinc-500">${new Date(a.date).toLocaleString('sk')}</div></div>
      <div class="flex items-center gap-3">
        <div class="text-right"><b class="text-3xl" style="color:${a.overall >= 70 ? '#10b981' : a.overall >= 45 ? '#f59e0b' : '#ef4444'}">${a.overall}</b><span class="text-zinc-500 text-sm">/100</span></div>
        <button onclick="Auditor.buildReport(App.state.audits[${i}])" class="btn-press px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold">📄 Stiahnuť report pre klienta</button>
      </div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
      ${a.type === 'web'
        ? `<div class="rounded-xl border border-zinc-200 dark:border-zinc-800 p-3 text-center"><b class="text-xl text-indigo-400">${a.perf}</b><div class="text-[10px] text-zinc-500">Výkon</div></div>
           <div class="rounded-xl border border-zinc-200 dark:border-zinc-800 p-3 text-center"><b class="text-xl text-indigo-400">${a.seo}</b><div class="text-[10px] text-zinc-500">SEO</div></div>
           <div class="rounded-xl border border-zinc-200 dark:border-zinc-800 p-3 text-center"><b class="text-sm">${a.cwv.lcp}</b><div class="text-[10px] text-zinc-500">LCP</div></div>
           <div class="rounded-xl border border-zinc-200 dark:border-zinc-800 p-3 text-center"><b class="text-sm">${a.cwv.cls}</b><div class="text-[10px] text-zinc-500">CLS</div></div>`
        : a.cats.map(c => `<div class="rounded-xl border border-zinc-200 dark:border-zinc-800 p-3 text-center"><b class="text-xl" style="color:${c.pct >= 70 ? '#10b981' : c.pct >= 45 ? '#f59e0b' : '#ef4444'}">${c.pct}%</b><div class="text-[10px] text-zinc-500">${c.name}</div></div>`).join('')}
    </div>
    ${a.type === 'web' ? `<div class="text-xs rounded-xl bg-amber-500/10 border border-amber-500/20 p-3 mb-4"><b class="text-amber-500">Google Ads pripravenosť:</b> <span class="text-zinc-700 dark:text-zinc-300">${a.adsReady}</span></div>` : ''}
    ${a.quickWins.length ? `<h4 class="font-bold text-sm text-emerald-500 mb-2">⚡ Quick Wins</h4>
      <div class="space-y-1.5 mb-4">${a.quickWins.map(r => `<div class="text-sm rounded-xl bg-emerald-500/5 border border-emerald-500/20 px-3 py-2"><b>${r.name}</b> <span class="text-zinc-500 text-xs">· ${r.time}</span><div class="text-xs text-zinc-500">${r.how}</div></div>`).join('')}</div>` : ''}
    <h4 class="font-bold text-sm text-zinc-900 dark:text-white mb-2">Všetky odporúčania (${a.recs.length})</h4>
    <div class="space-y-2">
      ${a.recs.map(r => `
      <details class="rounded-xl border border-zinc-200 dark:border-zinc-800 px-3 py-2">
        <summary class="cursor-pointer flex items-center gap-2 text-sm">
          <span class="chip text-white" style="background:${sevColor[r.sev]}">${sevName[r.sev]}</span>
          <b class="flex-1 text-zinc-800 dark:text-zinc-200">${r.name}</b>
          <span class="text-[10px] text-zinc-500 shrink-0">${r.time}</span>
        </summary>
        <div class="mt-2 text-xs text-zinc-600 dark:text-zinc-400 space-y-1">
          <div><b>Ako na to:</b> ${r.how}</div>
          <div><b>Očakávaný prínos:</b> ${r.benefit}</div>
          <div class="flex gap-4"><span><b>Dopad:</b> ${'●'.repeat(r.impact)}${'○'.repeat(5 - r.impact)}</span><span><b>Náročnosť:</b> ${'●'.repeat(r.effort)}${'○'.repeat(5 - r.effort)}</span></div>
        </div>
      </details>`).join('')}
    </div>
  </div>`;
  if (el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/* GBP wizard v modáli */
Views.startGbpAudit = function (answers = {}, step = -1) {
  const qs = Auditor.gbpQuestions;
  if (step === -1) {
    App.modal(`
      <h3 class="font-bold text-lg text-zinc-900 dark:text-white mb-2">📍 GBP Audit</h3>
      <p class="text-sm text-zinc-500 mb-4">Otvor si profil firmy na Google Maps (a jej web) a odpovedz na ${qs.length} otázok. Na konci dostaneš skóre, akčný plán a report pre klienta.</p>
      <label class="text-xs font-semibold text-zinc-500">Názov firmy</label>
      <input id="gbp-name" placeholder="napr. Pizzeria Bella Nitra" class="w-full mt-1 mb-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-indigo-500">
      <button onclick="Views.startGbpAudit({}, 0)" class="btn-press w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">Začať audit</button>`);
    return;
  }
  if (step === 0) Views._gbpName = document.getElementById('gbp-name')?.value.trim() || 'GBP profil';
  if (step >= qs.length) {
    const audit = Auditor.runGbpAudit(answers, Views._gbpName);
    App.closeModal();
    App.render();
    Views.showAudit(0);
    return;
  }
  const q = qs[step];
  App.modal(`
    <div class="text-xs text-zinc-500 mb-2">Otázka ${step + 1}/${qs.length} · ${q.cat}</div>
    ${Views.progressBar((step + 1) / qs.length * 100, 'from-emerald-500 to-teal-400', 'h-1.5')}
    <h3 class="font-bold text-zinc-900 dark:text-white my-4">${q.q}</h3>
    <div class="grid grid-cols-3 gap-2">
      <button onclick='Views.startGbpAudit(${JSON.stringify({ ...answers, [q.id]: 1 })},${step + 1})' class="btn-press py-3 rounded-xl bg-emerald-500/15 text-emerald-500 font-bold text-sm">✓ Áno</button>
      <button onclick='Views.startGbpAudit(${JSON.stringify({ ...answers, [q.id]: 0.5 })},${step + 1})' class="btn-press py-3 rounded-xl bg-amber-500/15 text-amber-500 font-bold text-sm">~ Čiastočne</button>
      <button onclick='Views.startGbpAudit(${JSON.stringify({ ...answers, [q.id]: 0 })},${step + 1})' class="btn-press py-3 rounded-xl bg-red-500/15 text-red-400 font-bold text-sm">✗ Nie</button>
    </div>`);
};
</script>
