
  /* ════════ FLASHCARDS (spaced repetition) ════════ */
  fcSession: null,
  flashcards() {
    const due = App.fcDueCards();
    const total = DATA.flashcards.length;
    const learned = DATA.flashcards.filter(c => App.fcState(c.id).reps > 0).length;
    return `
    <div class="grid sm:grid-cols-3 gap-4 mb-5">
      ${this.statCard('layers', total, 'Kartičiek celkom', '#6366f1')}
      ${this.statCard('alarm-clock', due.length, 'Na zopakovanie dnes', '#f59e0b')}
      ${this.statCard('brain', learned, 'V učení (spaced repetition)', '#10b981')}
    </div>
    <div id="fc-area">
      ${due.length === 0
        ? this.card(`<div class="text-center py-8"><div class="text-4xl mb-3">🎉</div>
            <div class="font-bold text-zinc-900 dark:text-white">Všetko zopakované!</div>
            <p class="text-sm text-zinc-500 mt-1">Spaced repetition naplánoval ďalšie opakovania podľa tvojich odpovedí. Vráť sa zajtra — alebo si prejdi kartičky mimo plánu.</p>
            <button onclick="Views.fcStart(true)" class="btn-press mt-4 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold">Precvičiť všetky (mimo plánu)</button></div>`)
        : this.card(`<div class="text-center py-8"><div class="text-4xl mb-3">🃏</div>
            <div class="font-bold text-zinc-900 dark:text-white">${due.length} kartičiek čaká</div>
            <p class="text-sm text-zinc-500 mt-1">Hodnotenie určí, kedy sa kartička vráti: Nevedel som (10 min) → Ľahké (dlhé intervaly).</p>
            <button onclick="Views.fcStart(false)" class="btn-press mt-4 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold">Začať opakovanie</button></div>`)}
    </div>`;
  },
  fcStart(all) {
    const cards = all ? App.sample(DATA.flashcards, DATA.flashcards.length) : App.sample(App.fcDueCards(), 999);
    this.fcSession = { cards, idx: 0, flipped: false, offPlan: all };
    this.fcRender();
  },
  fcRender() {
    const s = this.fcSession;
    const area = document.getElementById('fc-area');
    if (!area) return;
    if (!s || s.idx >= s.cards.length) {
      this.fcSession = null;
      App.render();
      App.toast('🃏 Session hotová!', 'Skvelá práca', '');
      return;
    }
    const c = s.cards[s.idx];
    const mod = App.getModule(c.mod);
    area.innerHTML = `
      <div class="max-w-xl mx-auto">
        <div class="text-xs text-zinc-500 text-center mb-3">Kartička ${s.idx + 1} / ${s.cards.length} · ${mod.short}</div>
        <div class="fc-scene h-64 cursor-pointer" onclick="Views.fcFlip()">
          <div class="fc-card w-full h-full ${s.flipped ? 'flipped' : ''}">
            <div class="fc-face rounded-2xl border-2 border-indigo-500/40 bg-white dark:bg-[#16161b] p-6 flex flex-col items-center justify-center text-center">
              <div class="text-[10px] uppercase tracking-widest text-indigo-400 font-bold mb-3">Otázka</div>
              <div class="font-bold text-lg text-zinc-900 dark:text-white">${c.q}</div>
              <div class="text-xs text-zinc-500 mt-4">klikni pre odpoveď ↻</div>
            </div>
            <div class="fc-face fc-back rounded-2xl border-2 border-emerald-500/40 bg-white dark:bg-[#16161b] p-6 flex flex-col items-center justify-center text-center">
              <div class="text-[10px] uppercase tracking-widest text-emerald-500 font-bold mb-3">Odpoveď</div>
              <div class="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">${c.a}</div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-4 gap-2 mt-4 ${s.flipped ? '' : 'opacity-30 pointer-events-none'}">
          <button onclick="Views.fcGrade(0)" class="btn-press py-2.5 rounded-xl bg-red-500/15 text-red-400 text-xs font-bold">Nevedel som<br><span class="font-normal opacity-70">10 min</span></button>
          <button onclick="Views.fcGrade(1)" class="btn-press py-2.5 rounded-xl bg-amber-500/15 text-amber-500 text-xs font-bold">Ťažké<br><span class="font-normal opacity-70">kratší interval</span></button>
          <button onclick="Views.fcGrade(2)" class="btn-press py-2.5 rounded-xl bg-emerald-500/15 text-emerald-500 text-xs font-bold">Dobré<br><span class="font-normal opacity-70">štandard</span></button>
          <button onclick="Views.fcGrade(3)" class="btn-press py-2.5 rounded-xl bg-sky-500/15 text-sky-400 text-xs font-bold">Ľahké<br><span class="font-normal opacity-70">dlhší interval</span></button>
        </div>
      </div>`;
    if (window.lucide) lucide.createIcons();
  },
  fcFlip() { this.fcSession.flipped = !this.fcSession.flipped; this.fcRender(); },
  fcGrade(g) {
    const s = this.fcSession;
    if (!s.offPlan) App.fcReview(s.cards[s.idx].id, g);
    else { App.state.fcReviews = (App.state.fcReviews || 0) + 1; App.save(); }
    s.idx++; s.flipped = false;
    this.fcRender();
  },

  /* ════════ PROJEKTY ════════ */
  projects() {
    return `
    <p class="text-sm text-zinc-500 mb-4">Praktické projekty tvoria tvoje <b>portfólio</b> — presne tieto výstupy budeš ukazovať agentúram a klientom. Každý dokončený projekt = veľký balík XP.</p>
    <div class="grid md:grid-cols-2 gap-4">
      ${DATA.projects.map(p => {
        const st = App.projState(p.id);
        const m = App.getModule(p.module);
        const donePct = Math.round(st.checks.filter(Boolean).length / p.checklist.length * 100);
        const statusChip = st.status === 'done' ? this.chip('✓ Dokončený', '#10b981') : st.status === 'progress' ? this.chip('⏳ Prebieha', '#f59e0b') : this.chip('○ Nezačatý', '#71717a');
        return `<div class="card-hover rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#131316] p-5">
          <div class="flex items-start justify-between mb-2">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:${m.color}18;color:${m.color}"><i data-lucide="${p.icon}" class="w-5 h-5"></i></div>
            ${statusChip}
          </div>
          <h3 class="font-bold text-zinc-900 dark:text-white">${p.name}</h3>
          <p class="text-xs text-zinc-500 mt-1 mb-3">${p.goal}</p>
          ${this.progressBar(donePct, 'from-emerald-500 to-teal-400', 'h-1.5')}
          <div class="flex items-center justify-between mt-3">
            <span class="text-xs text-zinc-500">${st.checks.filter(Boolean).length}/${p.checklist.length} krokov · +${p.xp} XP</span>
            <button onclick="Views.openProject('${p.id}')" class="btn-press text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white">Otvoriť</button>
          </div>
        </div>`;
      }).join('')}
    </div>`;
  },
  openProject(pid) {
    const p = DATA.projects.find(x => x.id === pid);
    const st = App.projState(pid);
    App.modal(`
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-bold text-lg text-zinc-900 dark:text-white">${p.name}</h3>
        <button onclick="App.closeModal()" class="text-zinc-400 hover:text-red-400"><i data-lucide="x" class="w-5 h-5"></i></button>
      </div>
      <div class="rounded-xl bg-indigo-500/10 border border-indigo-500/20 p-3 text-sm text-zinc-700 dark:text-zinc-300 mb-4"><b class="text-indigo-400">Zadanie:</b> ${p.brief}</div>
      <h4 class="font-bold text-sm mb-2">Kontrolný zoznam</h4>
      <div class="space-y-1.5 mb-4">
        ${p.checklist.map((c, i) => `<label class="flex items-start gap-2.5 cursor-pointer text-sm">
          <input type="checkbox" ${st.checks[i] ? 'checked' : ''} onchange="App.projToggleCheck('${pid}',${i});Views.openProject('${pid}')" class="mt-0.5 w-4 h-4 rounded accent-emerald-500">
          <span class="${st.checks[i] ? 'line-through text-zinc-400' : ''}">${c}</span>
        </label>`).join('')}
      </div>
      <h4 class="font-bold text-sm mb-2">Sebahodnotenie</h4>
      <div class="flex gap-1 mb-4">${[1, 2, 3, 4, 5].map(r =>
        `<button onclick="App.projSetRating('${pid}',${r});Views.openProject('${pid}')" class="text-2xl ${st.rating >= r ? '' : 'grayscale opacity-40'}">⭐</button>`).join('')}
        <span class="text-xs text-zinc-500 self-center ml-2">${st.rating ? st.rating + '/5' : 'ohodnoť svoju prácu'}</span></div>
      <h4 class="font-bold text-sm mb-2">Poznámky</h4>
      <textarea onchange="App.projSaveNotes('${pid}',this.value)" rows="4" placeholder="Zisti, čo fungovalo, čo bolo ťažké, čo nabudúce inak…"
        class="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent p-3 text-sm focus:border-indigo-500 outline-none">${st.notes}</textarea>
      <div class="grid grid-cols-3 gap-2 mt-4">
        <button onclick="App.projSetStatus('${pid}','todo');Views.openProject('${pid}')" class="btn-press py-2 rounded-xl text-xs font-semibold border ${st.status === 'todo' ? 'border-zinc-500 bg-zinc-500/10' : 'border-zinc-300 dark:border-zinc-700'}">○ Nezačatý</button>
        <button onclick="App.projSetStatus('${pid}','progress');Views.openProject('${pid}')" class="btn-press py-2 rounded-xl text-xs font-semibold border ${st.status === 'progress' ? 'border-amber-500 bg-amber-500/10 text-amber-500' : 'border-zinc-300 dark:border-zinc-700'}">⏳ Prebieha</button>
        <button onclick="App.projSetStatus('${pid}','done');Views.openProject('${pid}')" class="btn-press py-2 rounded-xl text-xs font-semibold border ${st.status === 'done' ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500' : 'border-zinc-300 dark:border-zinc-700'}">✓ Dokončený</button>
      </div>
    `, true);
  },

  /* ════════ CERTIFIKÁCIE ════════ */
  certs() {
    return `
    <p class="text-sm text-zinc-500 mb-4">Oficiálne certifikácie na <b>Google Skillshop</b> — zadarmo, online, 80 % na absolvovanie, platnosť 12 mesiacov. Pravdepodobnosť úspechu sa počíta z tvojho progresu a výsledkov testov.</p>
    <div class="grid md:grid-cols-2 gap-4">
      ${DATA.certs.map(c => {
        const st = App.state.certs[c.id] || {};
        const ready = App.certReadiness(c);
        const readyColor = ready >= 75 ? '#10b981' : ready >= 45 ? '#f59e0b' : '#ef4444';
        return `<div class="card-hover rounded-2xl border ${st.done ? 'border-emerald-500/40' : 'border-zinc-200 dark:border-zinc-800'} bg-white dark:bg-[#131316] p-5">
          <div class="flex items-start justify-between gap-2 mb-2">
            <h3 class="font-bold text-zinc-900 dark:text-white leading-snug">${st.done ? '✅ ' : '🎓 '}${c.name}</h3>
            ${this.chip(c.difficulty, '#6366f1')}
          </div>
          <p class="text-xs text-zinc-500 mb-3">${c.desc}</p>
          <div class="grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-zinc-600 dark:text-zinc-400 mb-3">
            <span>📝 ${c.questions}</span><span>⏱ ${c.time}</span>
            <span>🎯 Hranica: ${c.passing}</span><span>📅 Platnosť: ${c.validity}</span>
          </div>
          <div class="mb-3">
            <div class="flex justify-between text-xs mb-1"><span class="text-zinc-500">Pravdepodobnosť úspechu</span><b style="color:${readyColor}">${ready} %</b></div>
            ${this.progressBar(ready, '', 'h-1.5').replace('bg-gradient-to-r from-indigo-500 to-violet-500', '').replace('style="width', `style="background:${readyColor};width`)}
          </div>
          <details class="mb-3">
            <summary class="text-xs font-semibold text-indigo-400 cursor-pointer">Odporúčané znalosti a checklist pripravenosti</summary>
            <ul class="mt-2 space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
              ${c.knowledge.map(k => `<li>• ${k}</li>`).join('')}
            </ul>
            <div class="mt-2 space-y-1 text-xs">
              ${c.checklist.map(k => `<div class="flex gap-1.5"><span class="text-emerald-500">☐</span><span class="text-zinc-600 dark:text-zinc-400">${k}</span></div>`).join('')}
            </div>
          </details>
          <div class="flex gap-2">
            ${c.internal
              ? `<button onclick="App.startQuiz('internal','${c.id}')" class="btn-press flex-1 py-2 rounded-xl text-xs font-semibold text-white transition ${st.done ? 'bg-zinc-600 hover:bg-zinc-500' : 'bg-violet-600 hover:bg-violet-500'}">${st.done ? '↻ Zopakovať skúšku' : '🎓 Spustiť skúšku (40 ot. / 50 min)'}</button>`
              : `<a href="${c.url}" target="_blank" rel="noopener" class="btn-press flex-1 text-center py-2 rounded-xl text-xs font-semibold border border-zinc-300 dark:border-zinc-700 hover:border-indigo-500 transition">↗ Skillshop</a>
            <button onclick="App.toggleCert('${c.id}')" class="btn-press flex-1 py-2 rounded-xl text-xs font-semibold text-white transition ${st.done ? 'bg-zinc-600 hover:bg-zinc-500' : 'bg-emerald-600 hover:bg-emerald-500'}">
              ${st.done ? 'Zrušiť označenie' : ready >= 75 ? '✓ Som pripravený — splnená!' : 'Označiť ako splnenú'}
            </button>`}
          </div>
          ${st.done && st.date ? `<div class="text-[10px] text-zinc-500 mt-2">Získaná ${new Date(st.date).toLocaleDateString('sk')} · obnova o 12 mes.</div>` : ''}
        </div>`;
      }).join('')}
    </div>`;
  },

  /* ════════ SLOVNÍK ════════ */
  glossary() {
    return `
    <div class="flex flex-wrap gap-2 mb-4">
      <input id="gl-search" oninput="Views.glFilter()" placeholder="Hľadať pojem…"
        class="flex-1 min-w-[200px] rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-indigo-500">
      <select id="gl-cat" onchange="Views.glFilter()" class="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-[#131316] px-3 py-2.5 text-sm outline-none">
        <option value="">Všetky oblasti</option>
        <option value="ads">Google Ads</option>
        <option value="gbp">GBP / Local</option>
        <option value="gsc">GSC / SEO</option>
      </select>
    </div>
    <div id="gl-list" class="grid md:grid-cols-2 gap-3">${this.glItems(DATA.glossary)}</div>`;
  },
  glItems(items) {
    const colors = { ads: '#f59e0b', gbp: '#10b981', gsc: '#3b82f6' };
    return items.map(g => `
      <div class="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#131316] p-4">
        <div class="flex items-center justify-between mb-1.5">
          <h3 class="font-bold text-zinc-900 dark:text-white">${g.term}</h3>
          ${this.chip(g.cat.toUpperCase(), colors[g.cat])}
        </div>
        <p class="text-sm text-zinc-700 dark:text-zinc-300"><b class="text-emerald-500 text-xs">JEDNODUCHO:</b> ${g.simple}</p>
        <p class="text-xs text-zinc-500 mt-1.5"><b class="text-indigo-400">TECHNICKY:</b> ${g.tech}</p>
      </div>`).join('') || '<p class="text-sm text-zinc-500">Žiadne výsledky.</p>';
  },
  glFilter() {
    const q = document.getElementById('gl-search').value.toLowerCase();
    const cat = document.getElementById('gl-cat').value;
    const items = DATA.glossary.filter(g =>
      (!cat || g.cat === cat) &&
      (!q || g.term.toLowerCase().includes(q) || g.simple.toLowerCase().includes(q) || g.tech.toLowerCase().includes(q)));
    document.getElementById('gl-list').innerHTML = this.glItems(items);
  },

  /* ════════ KARIÉRA ════════ */
  career() {
    const s = App.state;
    // „Čo ovládam" — sekcie s dokončenými všetkými lekciami
    const known = [], toLearn = [];
    DATA.modules.forEach(m => m.sections.forEach(sec => {
      const done = sec.lessons.every(l => s.completedLessons[l.id]);
      (done ? known : toLearn).push({ m, sec });
    }));
    const missingCerts = DATA.certs.filter(c => !(s.certs[c.id] || {}).done);
    return `
    <div class="grid md:grid-cols-2 gap-4 mb-4">
      ${this.card(`
        <h3 class="font-bold text-zinc-900 dark:text-white mb-3">✅ Čo už ovládam</h3>
        ${known.length ? `<div class="space-y-1.5">${known.map(k => `<div class="text-sm flex items-center gap-2"><span style="color:${k.m.color}">●</span> ${k.sec.title} <span class="text-xs text-zinc-500">(${k.m.short})</span></div>`).join('')}</div>`
        : '<p class="text-sm text-zinc-500">Zatiaľ nič dokončené — každá dokončená sekcia sa objaví tu.</p>'}`)}
      ${this.card(`
        <h3 class="font-bold text-zinc-900 dark:text-white mb-3">📚 Čo sa ešte potrebujem naučiť</h3>
        ${toLearn.length ? `<div class="space-y-1.5">${toLearn.slice(0, 10).map(k => `<div class="text-sm flex items-center gap-2 text-zinc-600 dark:text-zinc-400"><span class="opacity-40" style="color:${k.m.color}">○</span> ${k.sec.title} <span class="text-xs text-zinc-500">(${k.m.short})</span></div>`).join('')}${toLearn.length > 10 ? `<div class="text-xs text-zinc-500">…a ďalších ${toLearn.length - 10}</div>` : ''}</div>`
        : '<p class="text-sm font-semibold text-emerald-500">🎉 Všetko dokončené!</p>'}`)}
    </div>

    <h3 class="font-bold text-lg text-zinc-900 dark:text-white mb-3">💼 Pozície, ktoré môžem robiť</h3>
    <div class="grid md:grid-cols-2 gap-4 mb-5">
      ${DATA.career.positions.map(p => {
        const avgReady = Math.round(p.needs.reduce((a, mid) => a + App.moduleProgress(mid), 0) / p.needs.length);
        const ready = avgReady >= 80;
        return `<div class="rounded-2xl border ${ready ? 'border-emerald-500/40' : 'border-zinc-200 dark:border-zinc-800'} bg-white dark:bg-[#131316] p-5">
          <div class="flex items-start justify-between gap-2 mb-1">
            <h4 class="font-bold text-zinc-900 dark:text-white">${p.title}</h4>
            ${this.chip(p.level, ready ? '#10b981' : '#71717a')}
          </div>
          <div class="text-sm font-semibold text-indigo-400 mb-1.5">${p.salary}</div>
          <p class="text-xs text-zinc-500 mb-3">${p.desc}</p>
          <div class="flex justify-between text-xs mb-1"><span class="text-zinc-500">Pripravenosť (${p.needs.map(n => App.getModule(n).short).join(' + ')})</span><b>${avgReady} %</b></div>
          ${this.progressBar(avgReady, ready ? 'from-emerald-500 to-teal-400' : 'from-zinc-400 to-zinc-500', 'h-1.5')}
        </div>`;
      }).join('')}
    </div>

    <div class="grid md:grid-cols-3 gap-4">
      ${this.card(`
        <h3 class="font-bold text-zinc-900 dark:text-white mb-3">🗺️ Kariérny postup</h3>
        <ol class="space-y-2 text-sm">${DATA.career.steps.map((st, i) => `<li class="flex gap-2.5"><span class="w-5 h-5 rounded-full bg-indigo-500/15 text-indigo-400 text-xs font-bold flex items-center justify-center shrink-0">${i + 1}</span><span class="text-zinc-700 dark:text-zinc-300">${st}</span></li>`).join('')}</ol>`)}
      ${this.card(`
        <h3 class="font-bold text-zinc-900 dark:text-white mb-3">📜 Chýbajúce certifikácie</h3>
        ${missingCerts.length ? `<div class="space-y-1.5 text-sm">${missingCerts.map(c => `<div class="flex items-center justify-between gap-2"><span class="text-zinc-700 dark:text-zinc-300 text-xs">${c.name}</span><b class="text-xs shrink-0" style="color:${App.certReadiness(c) >= 75 ? '#10b981' : '#f59e0b'}">${App.certReadiness(c)} %</b></div>`).join('')}</div><button onclick="App.go('certs')" class="mt-3 text-xs text-indigo-400 hover:underline">Prejsť na certifikácie →</button>`
        : '<p class="text-sm font-semibold text-emerald-500">Všetky certifikácie získané! 🏆</p>'}`)}
      ${this.card(`
        <h3 class="font-bold text-zinc-900 dark:text-white mb-3">🚀 Odporúčané ďalšie štúdium</h3>
        <div class="space-y-1.5 text-sm">${DATA.career.extra.map(e => `<div class="flex gap-2 text-zinc-700 dark:text-zinc-300"><span class="text-indigo-400">→</span><span class="text-xs">${e}</span></div>`).join('')}</div>`)}
    </div>`;
  },

  /* ════════ ŠTATISTIKY (Chart.js) ════════ */
  stats() {
    return `
    <div class="grid md:grid-cols-2 gap-4">
      ${this.card(`<h3 class="font-bold text-sm mb-3 text-zinc-900 dark:text-white">⏱ Čas učenia — posledných 14 dní</h3><canvas id="ch-time" height="180"></canvas>`)}
      ${this.card(`<h3 class="font-bold text-sm mb-3 text-zinc-900 dark:text-white">📈 Úspešnosť testov v čase</h3><canvas id="ch-tests" height="180"></canvas>`)}
      ${this.card(`<h3 class="font-bold text-sm mb-3 text-zinc-900 dark:text-white">📊 Progres modulov</h3><canvas id="ch-modules" height="180"></canvas>`)}
      ${this.card(`<h3 class="font-bold text-sm mb-3 text-zinc-900 dark:text-white">🧭 Silné a slabé stránky (úspešnosť testov podľa modulu)</h3><canvas id="ch-radar" height="180"></canvas>`)}
    </div>
    <div class="grid md:grid-cols-2 gap-4 mt-4">
      ${this.card(`<h3 class="font-bold text-sm mb-3 text-zinc-900 dark:text-white">🎓 Odhad pripravenosti na certifikácie</h3><div id="cert-ready-list" class="space-y-3"></div>`)}
      ${this.card(`<h3 class="font-bold text-sm mb-3 text-zinc-900 dark:text-white">🏆 Splnené moduly a certifikácie</h3><canvas id="ch-done" height="180"></canvas>`)}
    </div>
    ${this.heatmapHTML ? this.heatmapHTML() : ''}`;
  },

  /* ════════ AI MENTOR ════════ */
  mentor() {
    const hasKey = !!App.state.apiKey;
    return `
    <div class="grid lg:grid-cols-3 gap-4">
      <div class="lg:col-span-2">
        ${this.card(`
          <div class="flex items-center gap-3 mb-4 pb-3 border-b border-zinc-200 dark:border-zinc-800">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white"><i data-lucide="bot" class="w-5 h-5"></i></div>
            <div class="flex-1">
              <div class="font-bold text-zinc-900 dark:text-white">AI Mentor</div>
              <div class="text-xs text-zinc-500">${hasKey ? '🟢 Prepojený s API (' + App.state.apiProvider + ')' : '🟡 Offline režim (znalostná báza kurzu)'}</div>
            </div>
            <button onclick="Views.mentorSettings()" class="text-zinc-400 hover:text-indigo-400" title="Nastavenia API"><i data-lucide="settings" class="w-4 h-4"></i></button>
          </div>
          <div id="mentor-chat" class="h-[420px] overflow-y-auto space-y-3 pr-1 mb-3"></div>
          <div class="flex gap-2">
            <input id="mentor-input" onkeydown="if(event.key==='Enter')Views.mentorSend()" placeholder="Napíš správu… (napr. vysvetli quality score)"
              class="flex-1 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-indigo-500">
            <button onclick="Views.mentorSend()" class="btn-press px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"><i data-lucide="send" class="w-4 h-4"></i></button>
          </div>`)}
      </div>
      <div class="space-y-3">
        ${this.card(`
          <h3 class="font-bold text-sm mb-2 text-zinc-900 dark:text-white">Rýchle akcie</h3>
          <div class="space-y-1.5">
            ${[
              ['📖 Vysvetli pojem', 'vysvetli '],
              ['🧪 Daj mi príklad', 'príklad na quality score'],
              ['📝 Vygeneruj test', 'test ads'],
              ['🎭 Simulácia klienta', 'simulácia'],
              ['🧭 Čo študovať ďalej?', 'čo ďalej'],
              ['💪 Moje slabé stránky', 'slabé stránky'],
            ].map(([label, cmd]) => `<button onclick="Views.mentorQuick('${cmd}')" class="btn-press w-full text-left text-xs font-semibold px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/50 transition">${label}</button>`).join('')}
          </div>`)}
        ${this.card(`
          <h3 class="font-bold text-sm mb-2 text-zinc-900 dark:text-white">Čo mentor vie</h3>
          <ul class="text-xs text-zinc-500 space-y-1">
            <li>• vysvetliť každý pojem zo slovníka a lekcií</li>
            <li>• vytvoriť príklady a mini testy</li>
            <li>• vyhodnotiť odpovede s vysvetlením</li>
            <li>• hrať klienta v simulácii a hodnotiť tvoje riešenia</li>
            <li>• odporučiť ďalšie štúdium podľa tvojich dát</li>
            <li>• s API kľúčom: plnohodnotné AI odpovede</li>
          </ul>`)}
      </div>
    </div>`;
  },
