<script>
/* ═══════════════════════════════════════════════════════════════════
   GBP AUDITOR s AUTOMATICKÝM VYHĽADANÍM PROFILU (Places API New)
   ───────────────────────────────────────────────────────────────────
   Rovnaký princíp ako View Sales Suite: zadáš názov firmy →
   places:searchText nájde profily → výber → načítanie detailov →
   časť auditových otázok sa vyplní automaticky z reálnych dát
   (hodnotenie, počet recenzií, fotky, hodiny, web…), zvyšok
   doplní konzultant vo wizarde. Bez API kľúča beží pôvodný
   plne manuálny wizard.
   ═══════════════════════════════════════════════════════════════════ */

const Places = {
  key() { return window.GACADEMY_CONFIG?.GOOGLE_MAPS_API_KEY || ''; },

  /* Vyhľadanie profilov podľa názvu (Places API New — searchText) */
  async search(query) {
    const r = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': this.key(),
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.primaryTypeDisplayName',
      },
      body: JSON.stringify({ textQuery: query, languageCode: 'sk', maxResultCount: 5 }),
    });
    if (!r.ok) {
      let msg = 'HTTP ' + r.status;
      try { const j = await r.json(); msg = j.error?.message || msg; } catch (e) {}
      throw new Error(msg);
    }
    return (await r.json()).places || [];
  },

  /* Detail profilu — polia potrebné na auto-audit */
  async details(placeId) {
    const fields = 'id,displayName,formattedAddress,nationalPhoneNumber,websiteUri,rating,userRatingCount,photos,primaryTypeDisplayName,types,regularOpeningHours,businessStatus,editorialSummary,googleMapsUri,reviews';
    const r = await fetch('https://places.googleapis.com/v1/places/' + encodeURIComponent(placeId) + '?fields=' + fields + '&languageCode=sk&key=' + this.key());
    if (!r.ok) {
      let msg = 'HTTP ' + r.status;
      try { const j = await r.json(); msg = j.error?.message || msg; } catch (e) {}
      throw new Error(msg);
    }
    return r.json();
  },

  /* ── Auto-vyhodnotenie otázok auditu z dát profilu ──
     Vraciame len to, čo z API vieme SPOĽAHLIVO — zvyšok je manuálny.
     (Places API neprezrádza: claim status, Posts, Q&A, popis, služby…) */
  autoAnswers(p) {
    const out = {}; const facts = [];
    // Otváracie hodiny
    if (p.regularOpeningHours?.periods?.length) { out.hours = 1; facts.push('✅ Otváracie hodiny: vyplnené'); }
    else { out.hours = 0; facts.push('❌ Otváracie hodiny: chýbajú'); }
    // Fotky (API vracia max 10 — 10 = „10 a viac")
    const ph = (p.photos || []).length;
    out.photos = ph >= 10 ? 1 : ph >= 4 ? 0.5 : 0;
    facts.push((ph >= 10 ? '✅' : ph >= 4 ? '🟡' : '❌') + ' Fotky: ' + (ph >= 10 ? '10+' : ph));
    // Recenzie — počet
    const rc = p.userRatingCount || 0;
    out['reviews-count'] = rc >= 50 ? 1 : rc >= 10 ? 0.5 : 0;
    facts.push((rc >= 50 ? '✅' : rc >= 10 ? '🟡' : '❌') + ' Recenzie: ' + rc + (p.rating ? ' (priemer ' + p.rating + '★)' : ''));
    // Web
    if (p.websiteUri) facts.push('✅ Web: ' + p.websiteUri.replace(/^https?:\/\//, '').slice(0, 40));
    else { facts.push('❌ Web: chýba na profile'); out.landing = 0; }
    // Primárna kategória (informatívne — správnosť posúdi konzultant)
    if (p.primaryTypeDisplayName?.text) facts.push('ℹ️ Primárna kategória: ' + p.primaryTypeDisplayName.text);
    if (p.businessStatus && p.businessStatus !== 'OPERATIONAL') facts.push('⚠️ Stav: ' + p.businessStatus);
    return { answers: out, facts };
  },
};

/* ── Nový vstupný krok GBP auditu: vyhľadanie profilu ── */
(() => {
  const manualWizard = Views.startGbpAudit; // pôvodný wizard (fallback + pokračovanie)

  Views.startGbpAudit = function (answers = {}, step = -1) {
    // Krok -1 s dostupným API kľúčom → obrazovka vyhľadávania
    if (step === -1 && Places.key()) { Views.gbpSearch(); return; }
    manualWizard.call(this, answers, step);
  };

  Views.gbpSearch = function (msg = '') {
    App.modal(`
      <h3 class="font-bold text-lg text-zinc-900 dark:text-white mb-1">📍 GBP Audit</h3>
      <p class="text-xs text-zinc-500 mb-3">Zadaj názov firmy (ideálne s mestom) — načítam jej profil z Google Maps a časť auditu vyplním automaticky z reálnych dát.</p>
      ${msg ? `<div class="text-xs rounded-xl bg-red-500/10 text-red-400 p-2.5 mb-3">${msg}</div>` : ''}
      <div class="flex gap-2 mb-2">
        <input id="gbp-search" placeholder="napr. Pizzeria Bella Nitra" onkeydown="if(event.key==='Enter')Views.gbpDoSearch()"
          class="flex-1 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-emerald-500">
        <button onclick="Views.gbpDoSearch()" id="gbp-search-btn" class="btn-press px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold">Hľadať</button>
      </div>
      <div id="gbp-results"></div>
      <button onclick="App.closeModal();Views._gbpName='';(${'Views.startGbpAudit'})({},0)" class="w-full text-center text-xs text-zinc-500 hover:text-indigo-400 mt-3">Preskočiť vyhľadanie — vyplniť audit ručne</button>`);
  };

  Views.gbpDoSearch = async function () {
    const q = document.getElementById('gbp-search').value.trim();
    if (q.length < 3) return;
    const btn = document.getElementById('gbp-search-btn');
    btn.disabled = true; btn.textContent = 'Hľadám…';
    try {
      const places = await Places.search(q);
      btn.disabled = false; btn.textContent = 'Hľadať';
      const box = document.getElementById('gbp-results');
      if (!places.length) { box.innerHTML = '<p class="text-xs text-zinc-500">Nič sa nenašlo — skús pridať mesto.</p>'; return; }
      box.innerHTML = places.map(p => `
        <button onclick="Views.gbpPick('${p.id}')" class="btn-press w-full text-left rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-emerald-500 px-3 py-2.5 mb-1.5 transition">
          <div class="flex items-center justify-between gap-2">
            <b class="text-sm text-zinc-900 dark:text-white truncate">${p.displayName?.text || '—'}</b>
            ${p.rating ? `<span class="text-xs shrink-0 text-amber-500 font-bold">★ ${p.rating} (${p.userRatingCount || 0})</span>` : '<span class="text-xs text-zinc-500 shrink-0">bez recenzií</span>'}
          </div>
          <div class="text-[11px] text-zinc-500 truncate">${p.primaryTypeDisplayName?.text ? p.primaryTypeDisplayName.text + ' · ' : ''}${p.formattedAddress || ''}</div>
        </button>`).join('');
    } catch (e) {
      btn.disabled = false; btn.textContent = 'Hľadať';
      Views.gbpSearch('⚠️ Places API: ' + Views.esc(e.message) + '<br>Najčastejšia príčina: kľúč v Google Cloud nemá povolenú túto doménu (Website restrictions → pridaj axiona-web.github.io/*). Zatiaľ môžeš audit vyplniť ručne.');
    }
  };

  Views.gbpPick = async function (placeId) {
    const box = document.getElementById('gbp-results');
    box.innerHTML = '<p class="text-xs text-zinc-500">⏳ Načítavam detail profilu…</p>';
    try {
      const p = await Places.details(placeId);
      const auto = Places.autoAnswers(p);
      Views._gbpName = p.displayName?.text || 'GBP profil';
      Views._gbpPlace = {
        name: Views._gbpName, address: p.formattedAddress, rating: p.rating, reviews: p.userRatingCount,
        photos: (p.photos || []).length, web: p.websiteUri || '', category: p.primaryTypeDisplayName?.text || '', maps: p.googleMapsUri || '',
      };
      Views._gbpAuto = auto;
      // Súhrn zistení + štart wizardu so zvyšnými otázkami
      App.modal(`
        <h3 class="font-bold text-lg text-zinc-900 dark:text-white mb-1">📍 ${Views.esc(Views._gbpName)}</h3>
        <p class="text-[11px] text-zinc-500 mb-3">${Views.esc(p.formattedAddress || '')}</p>
        <div class="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 text-xs mb-3">
          <b class="text-emerald-500">🤖 Automaticky zistené z profilu (namerané dáta):</b>
          <div class="mt-1 space-y-0.5 text-zinc-700 dark:text-zinc-300">${auto.facts.map(f => `<div>${f}</div>`).join('')}</div>
        </div>
        <p class="text-xs text-zinc-500 mb-4">${Object.keys(auto.answers).length} otázok auditu je vyplnených automaticky. Zvyšných ${Auditor.gbpQuestions.length - Object.keys(auto.answers).length} posúdiš sám — otvor si profil na Maps${Views._gbpPlace.maps ? ` (<a href="${Views._gbpPlace.maps}" target="_blank" class="text-indigo-400 underline">odkaz</a>)` : ''} a odpovedaj.</p>
        <button onclick="App.closeModal();Views.gbpWizardAuto()" class="btn-press w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">Pokračovať v audite →</button>`);
    } catch (e) {
      box.innerHTML = `<p class="text-xs text-red-400">⚠️ ${Views.esc(e.message)}</p>`;
    }
  };

  /* Wizard preskakujúci auto-zodpovedané otázky */
  Views.gbpWizardAuto = function (answers, step = 0) {
    answers = answers || { ...Views._gbpAuto.answers };
    const qs = Auditor.gbpQuestions;
    while (step < qs.length && answers[qs[step].id] !== undefined && !qs[step]._askedManually) step++;
    if (step >= qs.length) {
      const audit = Auditor.runGbpAudit(answers, Views._gbpName);
      audit.place = Views._gbpPlace;           // reálne dáta do auditu aj reportu
      audit.autoFacts = Views._gbpAuto.facts;
      App.save();
      App.closeModal(); App.go('auditor'); Views.showAudit(0);
      return;
    }
    const q = qs[step];
    App.modal(`
      <div class="text-xs text-zinc-500 mb-2">Otázka ${step + 1}/${qs.length} · ${q.cat} <span class="text-emerald-500">· auto-vyplnené: ${Object.keys(Views._gbpAuto.answers).length}</span></div>
      ${Views.progressBar((step + 1) / qs.length * 100, 'from-emerald-500 to-teal-400', 'h-1.5')}
      <h3 class="font-bold text-zinc-900 dark:text-white my-4">${q.q}</h3>
      <div class="grid grid-cols-3 gap-2">
        <button onclick='Views.gbpWizardAuto(${JSON.stringify({ ...answers, [q.id]: 1 })},${step + 1})' class="btn-press py-3 rounded-xl bg-emerald-500/15 text-emerald-500 font-bold text-sm">✓ Áno</button>
        <button onclick='Views.gbpWizardAuto(${JSON.stringify({ ...answers, [q.id]: 0.5 })},${step + 1})' class="btn-press py-3 rounded-xl bg-amber-500/15 text-amber-500 font-bold text-sm">~ Čiastočne</button>
        <button onclick='Views.gbpWizardAuto(${JSON.stringify({ ...answers, [q.id]: 0 })},${step + 1})' class="btn-press py-3 rounded-xl bg-red-500/15 text-red-400 font-bold text-sm">✗ Nie</button>
      </div>`);
  };

  /* Detail auditu: zobraz reálne dáta profilu, ak existujú */
  const origShow = Views.showAudit;
  Views.showAudit = function (i) {
    origShow.call(this, i);
    const a = App.state.audits[i];
    const el = document.getElementById('audit-result');
    if (!el || !a?.place) return;
    const pl = a.place;
    el.querySelector('div').insertAdjacentHTML('afterbegin', `
      <div class="rounded-xl bg-zinc-100 dark:bg-zinc-800/60 p-3 mb-4 text-xs flex flex-wrap gap-x-4 gap-y-1">
        <span>⭐ <b>${pl.rating ?? '—'}</b> (${pl.reviews ?? 0} recenzií)</span>
        <span>📷 ${pl.photos >= 10 ? '10+' : pl.photos} fotiek</span>
        ${pl.category ? `<span>🏷 ${Views.esc(pl.category)}</span>` : ''}
        ${pl.web ? `<span>🌐 ${Views.esc(pl.web.replace(/^https?:\/\//, '').slice(0, 30))}</span>` : '<span>🌐 bez webu</span>'}
        ${pl.maps ? `<a href="${pl.maps}" target="_blank" class="text-indigo-400 underline">otvoriť na Maps ↗</a>` : ''}
        <span class="text-zinc-500">· dáta: Google Places API, ${new Date(a.date).toLocaleDateString('sk')}</span>
      </div>`);
  };
})();
</script>
