<script>
/* ═══════════════════════════════════════════════════════════════════
   VIEWS — obrazovky aplikácie (časť A)
   Každá funkcia vracia HTML reťazec; afterRender rieši grafy a pod.
   ═══════════════════════════════════════════════════════════════════ */

const Views = {
  afterRender: {},

  /* ── Pomocné UI komponenty ── */
  card(inner, cls = '') {
    return `<div class="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#131316] p-5 ${cls}">${inner}</div>`;
  },
  progressBar(pct, color = 'from-indigo-500 to-violet-500', h = 'h-2') {
    return `<div class="${h} rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden"><div class="h-full rounded-full bg-gradient-to-r ${color} transition-all duration-700" style="width:${pct}%"></div></div>`;
  },
  statCard(icon, value, label, color) {
    return this.card(`
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style="background:${color}18;color:${color}">
          <i data-lucide="${icon}" class="w-5 h-5"></i>
        </div>
        <div class="min-w-0"><div class="text-xl font-bold text-zinc-900 dark:text-white leading-tight">${value}</div>
        <div class="text-xs text-zinc-500 truncate">${label}</div></div>
      </div>`);
  },
  chip(text, color) { return `<span class="chip" style="background:${color}18;color:${color}">${text}</span>`; },
  moduleColor(mid) { return App.getModule(mid)?.color || '#6366f1'; },

  /* ════════ DASHBOARD ════════ */
  dashboard() {
    const s = App.state;
    const overall = App.overallProgress();
    const lv = App.level();
    const lessonsDone = Object.keys(s.completedLessons).length;
    const testsDone = s.testHistory.length;
    const correct = s.testHistory.reduce((a, t) => a + t.score, 0);
    const totalQ = s.testHistory.reduce((a, t) => a + t.total, 0);
    const certsDone = Object.values(s.certs).filter(c => c.done).length;
    const projDone = Object.values(s.projects).filter(p => p.status === 'done').length;
    const hours = (App.totalMinutes() / 60).toFixed(1);
    const todayMin = s.timeLog[App.todayKey()] || 0;
    const weekLessons = App.lessonsThisWeek();
    const dueCards = App.fcDueCards().length;

    // Odporúčanie ďalšieho kroku
    const nextLesson = App.allLessons().find(l => !s.completedLessons[l.id]);

    // SVG progress ring
    const r = 52, circ = 2 * Math.PI * r, off = circ * (1 - overall / 100);

    return `
    <div class="grid gap-4">
      <!-- Hero: celkový progres + level -->
      <div class="grid md:grid-cols-3 gap-4">
        ${this.card(`
          <div class="flex items-center gap-5">
            <svg width="128" height="128" viewBox="0 0 128 128" class="shrink-0 -rotate-90">
              <circle cx="64" cy="64" r="${r}" fill="none" stroke="currentColor" class="text-zinc-200 dark:text-zinc-800" stroke-width="10"/>
              <circle cx="64" cy="64" r="${r}" fill="none" stroke="url(#pg)" stroke-width="10" stroke-linecap="round"
                stroke-dasharray="${circ}" stroke-dashoffset="${off}" class="ring-anim"/>
              <defs><linearGradient id="pg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#6366f1"/><stop offset="100%" stop-color="#a855f7"/></linearGradient></defs>
              <text x="64" y="60" text-anchor="middle" transform="rotate(90 64 64)" class="fill-zinc-900 dark:fill-white" style="font-size:26px;font-weight:800">${overall}%</text>
              <text x="64" y="78" text-anchor="middle" transform="rotate(90 64 64)" class="fill-zinc-400" style="font-size:9px">celkový progres</text>
            </svg>
            <div class="min-w-0">
              <div class="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-1">Úroveň</div>
              <div class="text-2xl font-extrabold text-zinc-900 dark:text-white flex items-center gap-2">${lv.icon} ${lv.name}</div>
              <div class="text-sm text-zinc-500 mt-1">${s.xp} XP ${lv.next ? `· do úrovne ${lv.next.name} chýba <b class="text-indigo-400">${lv.next.xp - s.xp} XP</b>` : '· maximálna úroveň!'}</div>
              ${nextLesson ? `<button onclick="App.go('lesson',{id:'${nextLesson.id}'})" class="btn-press mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition">
                <i data-lucide="play" class="w-4 h-4"></i> Pokračovať v učení</button>` :
                `<div class="mt-3 text-sm font-semibold text-emerald-500">🎉 Všetky lekcie dokončené!</div>`}
            </div>
          </div>`, 'md:col-span-2')}
        ${this.card(`
          <div class="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-3">Dnešné ciele</div>
          <div class="space-y-3">
            <div>
              <div class="flex justify-between text-sm mb-1"><span>🎯 Učenie dnes</span><b>${todayMin}/${s.dailyGoalMin} min</b></div>
              ${this.progressBar(Math.min(100, todayMin / s.dailyGoalMin * 100), 'from-emerald-500 to-teal-400')}
            </div>
            <div>
              <div class="flex justify-between text-sm mb-1"><span>📅 Lekcie (týždeň)</span><b>${weekLessons}/${s.weeklyGoalLessons}</b></div>
              ${this.progressBar(Math.min(100, weekLessons / s.weeklyGoalLessons * 100), 'from-sky-500 to-cyan-400')}
            </div>
            <div class="flex items-center justify-between text-sm pt-1">
              <span>🔥 Séria dní</span><b class="text-orange-500">${s.streak.count} ${s.streak.count === 1 ? 'deň' : s.streak.count < 5 ? 'dni' : 'dní'}</b>
            </div>
            ${dueCards ? `<button onclick="App.go('flashcards')" class="w-full btn-press text-left text-sm px-3 py-2 rounded-xl bg-amber-500/10 text-amber-500 font-semibold">🃏 ${dueCards} kartičiek na zopakovanie</button>` : ''}
          </div>`)}
      </div>

      <!-- Štatistické karty -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        ${this.statCard('clock', hours + ' h', 'Odpracované hodiny', '#6366f1')}
        ${this.statCard('book-open', lessonsDone + ' / ' + App.totalLessons(), 'Absolvované lekcie', '#10b981')}
        ${this.statCard('clipboard-check', testsDone, 'Absolvované testy', '#3b82f6')}
        ${this.statCard('check-circle-2', correct + (totalQ ? ' / ' + totalQ : ''), 'Správne odpovede', '#22c55e')}
        ${this.statCard('briefcase', projDone + ' / ' + DATA.projects.length, 'Dokončené projekty', '#f59e0b')}
        ${this.statCard('award', certsDone + ' / ' + DATA.certs.length, 'Získané certifikácie', '#a855f7')}
        ${this.statCard('zap', s.xp + ' XP', 'Skúsenostné body', '#eab308')}
        ${this.statCard('trophy', Object.keys(s.achievements).length + ' / ' + DATA.achievements.length, 'Achievementy', '#ef4444')}
      </div>

      <!-- Moduly -->
      <div class="mt-2">
        <div class="flex items-center justify-between mb-3">
          <h2 class="font-bold text-lg text-zinc-900 dark:text-white">Študijné moduly</h2>
          <button onclick="App.go('modules')" class="text-sm text-indigo-400 hover:underline">Všetky moduly →</button>
        </div>
        <div class="grid md:grid-cols-3 gap-4">${DATA.modules.map(m => this.moduleCard(m)).join('')}</div>
      </div>

      <!-- Achievementy (posledné) -->
      ${Object.keys(s.achievements).length ? `<div class="mt-2">
        <h2 class="font-bold text-lg text-zinc-900 dark:text-white mb-3">Odznaky</h2>
        <div class="flex flex-wrap gap-2">${DATA.achievements.filter(a => s.achievements[a.id]).map(a =>
          `<div class="chip bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 !py-1.5" title="${a.desc}">${a.icon} ${a.name}</div>`).join('')}</div>
      </div>` : ''}
    </div>`;
  },

  moduleCard(m) {
    const pct = App.moduleProgress(m.id);
    const done = App.moduleLessons(m.id).filter(l => App.state.completedLessons[l.id]).length;
    return `
    <div class="card-hover rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#131316] p-5 flex flex-col">
      <div class="flex items-start justify-between mb-3">
        <div class="w-11 h-11 rounded-xl flex items-center justify-center" style="background:${m.color}18;color:${m.color}">
          <i data-lucide="${m.icon}" class="w-5 h-5"></i>
        </div>
        ${this.chip(m.difficulty, m.color)}
      </div>
      <h3 class="font-bold text-zinc-900 dark:text-white">${m.name}</h3>
      <p class="text-sm text-zinc-500 mt-1 mb-3 flex-1">${m.desc}</p>
      <div class="flex items-center gap-3 text-xs text-zinc-500 mb-2">
        <span class="inline-flex items-center gap-1"><i data-lucide="clock" class="w-3.5 h-3.5"></i>~${m.hours} h</span>
        <span class="inline-flex items-center gap-1"><i data-lucide="book-open" class="w-3.5 h-3.5"></i>${done}/${App.moduleLessons(m.id).length} lekcií</span>
        <span class="ml-auto font-bold" style="color:${m.color}">${pct} %</span>
      </div>
      ${this.progressBar(pct, '', 'h-1.5').replace('from-indigo-500 to-violet-500', '').replace('bg-gradient-to-r', '').replace('style="width', `style="background:${m.color};width`)}
      <button onclick="App.go('module',{id:'${m.id}'})" class="btn-press mt-4 w-full py-2 rounded-xl text-sm font-semibold text-white transition hover:opacity-90" style="background:${m.color}">
        ${pct === 0 ? 'Začať' : pct === 100 ? 'Zopakovať' : 'Pokračovať'}
      </button>
    </div>`;
  },

  /* ════════ MODULY (zoznam) ════════ */
  modules() {
    return `
    <div class="grid md:grid-cols-3 gap-4">${DATA.modules.map(m => this.moduleCard(m)).join('')}</div>
    <div class="mt-6">${this.card(`
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center"><i data-lucide="graduation-cap" class="w-5 h-5"></i></div>
        <div class="flex-1">
          <div class="font-bold text-zinc-900 dark:text-white">Ako študovať</div>
          <div class="text-sm text-zinc-500">Odporúčané poradie: GBP → GSC → Ads. Každá lekcia = teória → checklist → mini test. Po sekciách si dávaj modulové testy a kartičky. Na konci každého modulu ťa čaká praktický projekt do portfólia.</div>
        </div>
      </div>`)}</div>`;
  },

  /* ════════ DETAIL MODULU ════════ */
  module(params) {
    const m = App.getModule(params.id);
    const pct = App.moduleProgress(m.id);
    const best = App.state.quizResults['module:' + m.id];
    return `
    <div class="mb-5">${this.card(`
      <div class="flex flex-wrap items-center gap-4">
        <div class="w-14 h-14 rounded-2xl flex items-center justify-center" style="background:${m.color}18;color:${m.color}"><i data-lucide="${m.icon}" class="w-7 h-7"></i></div>
        <div class="flex-1 min-w-[200px]">
          <h2 class="text-xl font-extrabold text-zinc-900 dark:text-white">${m.name}</h2>
          <div class="text-sm text-zinc-500">${m.desc}</div>
        </div>
        <div class="text-right">
          <div class="text-2xl font-extrabold" style="color:${m.color}">${pct} %</div>
          <div class="text-xs text-zinc-500">~${m.hours} h · ${m.difficulty}</div>
        </div>
      </div>
      <div class="mt-4">${this.progressBar(pct, '', 'h-2').replace('bg-gradient-to-r from-indigo-500 to-violet-500', '').replace('style="width', `style="background:${m.color};width`)}</div>
      <div class="mt-4 flex flex-wrap gap-2">
        <button onclick="App.startQuiz('module','${m.id}')" class="btn-press px-4 py-2 rounded-xl text-sm font-semibold border border-zinc-300 dark:border-zinc-700 hover:border-indigo-500 transition">
          📝 Modulový test (20 otázok)${best ? ` · najlepšie ${Math.round(best.score / best.total * 100)} %` : ''}
        </button>
        <button onclick="App.go('projects')" class="btn-press px-4 py-2 rounded-xl text-sm font-semibold border border-zinc-300 dark:border-zinc-700 hover:border-indigo-500 transition">💼 Projekty modulu</button>
      </div>`)}
    </div>
    ${m.sections.map((sec, si) => `
      <div class="mb-5">
        <h3 class="font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
          <span class="w-6 h-6 rounded-lg text-xs flex items-center justify-center font-bold" style="background:${m.color}18;color:${m.color}">${si + 1}</span>
          ${sec.title}
        </h3>
        <div class="grid gap-2">
          ${sec.lessons.map(l => {
            const done = !!App.state.completedLessons[l.id];
            const quiz = App.state.quizResults['lesson:' + l.id];
            return `<button onclick="App.go('lesson',{id:'${l.id}'})" class="btn-press text-left rounded-xl border ${done ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#131316]'} px-4 py-3 flex items-center gap-3 hover:border-indigo-500/50 transition">
              <span class="w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${done ? 'bg-emerald-500 text-white' : 'border-2 border-zinc-300 dark:border-zinc-700'}">${done ? '✓' : ''}</span>
              <div class="flex-1 min-w-0">
                <div class="font-semibold text-sm text-zinc-900 dark:text-white truncate">${l.title}</div>
                <div class="text-xs text-zinc-500">${l.min} min${quiz ? ` · test ${Math.round(quiz.score / quiz.total * 100)} %` : ''}</div>
              </div>
              <i data-lucide="chevron-right" class="w-4 h-4 text-zinc-400 shrink-0"></i>
            </button>`;
          }).join('')}
        </div>
      </div>`).join('')}`;
  },

  /* ════════ LEKCIA ════════ */
  lesson(params) {
    const l = App.getLesson(params.id);
    const m = App.getModule(l.moduleId);
    const done = !!App.state.completedLessons[l.id];
    const checks = App.state.checklistState[l.id] || l.checklist.map(() => false);
    const quiz = App.state.quizResults['lesson:' + l.id];
    const all = App.allLessons();
    const idx = all.findIndex(x => x.id === l.id);
    const prev = all[idx - 1], next = all[idx + 1];

    return `
    <button onclick="App.go('module',{id:'${m.id}'})" class="text-sm text-zinc-500 hover:text-indigo-400 mb-3 inline-flex items-center gap-1">
      <i data-lucide="arrow-left" class="w-4 h-4"></i> ${m.name} · ${l.sectionTitle}
    </button>

    ${this.card(`
      <div class="flex items-center justify-between flex-wrap gap-2 mb-1">
        <h2 class="text-xl font-extrabold text-zinc-900 dark:text-white">${l.title}</h2>
        <div class="flex gap-2">${this.chip('⏱ ' + l.min + ' min', m.color)}${done ? this.chip('✓ Dokončené', '#10b981') : ''}</div>
      </div>
      <div class="prose-lesson text-[15px] text-zinc-700 dark:text-zinc-300 mt-3">${l.theory}</div>`)}

    <!-- Kontrolný zoznam lekcie -->
    <div class="mt-4">${this.card(`
      <h3 class="font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2"><i data-lucide="list-checks" class="w-4 h-4 text-indigo-400"></i> Kontrolný zoznam</h3>
      <div class="space-y-2">
        ${l.checklist.map((c, i) => `
        <label class="flex items-start gap-3 cursor-pointer group">
          <input type="checkbox" ${checks[i] ? 'checked' : ''} onchange="App.toggleCheck('${l.id}',${i})"
            class="mt-0.5 w-4 h-4 rounded accent-indigo-500 shrink-0">
          <span class="text-sm ${checks[i] ? 'line-through text-zinc-400' : 'text-zinc-700 dark:text-zinc-300'} group-hover:text-indigo-400 transition">${c}</span>
        </label>`).join('')}
      </div>`)}
    </div>

    <!-- Akcie -->
    <div class="mt-4 grid sm:grid-cols-2 gap-3">
      <button onclick="App.startQuiz('lesson','${l.id}')" class="btn-press py-3 rounded-xl font-semibold border-2 border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10 transition">
        📝 Mini test (5 otázok)${quiz ? ` · najlepšie ${Math.round(quiz.score / quiz.total * 100)} %` : ''}
      </button>
      <button onclick="App.completeLesson('${l.id}')" ${done ? 'disabled' : ''}
        class="btn-press py-3 rounded-xl font-semibold text-white transition ${done ? 'bg-emerald-600/50 cursor-default' : 'bg-emerald-600 hover:bg-emerald-500'}">
        ${done ? '✓ Lekcia dokončená' : '✔ Označiť ako dokončené (+' + (l.min * 2) + ' XP)'}
      </button>
    </div>

    <!-- Navigácia medzi lekciami -->
    <div class="mt-4 flex justify-between text-sm">
      ${prev ? `<button onclick="App.go('lesson',{id:'${prev.id}'})" class="text-zinc-500 hover:text-indigo-400 inline-flex items-center gap-1"><i data-lucide="arrow-left" class="w-4 h-4"></i> ${prev.title}</button>` : '<span></span>'}
      ${next ? `<button onclick="App.go('lesson',{id:'${next.id}'})" class="text-zinc-500 hover:text-indigo-400 inline-flex items-center gap-1 text-right">${next.title} <i data-lucide="arrow-right" class="w-4 h-4"></i></button>` : '<span></span>'}
    </div>`;
  },

  /* ════════ TESTY (centrum) ════════ */
  tests() {
    const s = App.state;
    const history = [...s.testHistory].reverse().slice(0, 10);
    return `
    <div class="grid md:grid-cols-2 gap-4">
      ${this.card(`
        <h3 class="font-bold text-zinc-900 dark:text-white mb-1">📝 Modulové testy</h3>
        <p class="text-sm text-zinc-500 mb-4">20 náhodných otázok z celého modulu. Odporúčané po dokončení modulu — 80 %+ znamená pripravenosť.</p>
        <div class="space-y-2">
          ${DATA.modules.map(m => {
            const best = s.quizResults['module:' + m.id];
            return `<button onclick="App.startQuiz('module','${m.id}')" class="btn-press w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/50 transition text-left">
              <i data-lucide="${m.icon}" class="w-5 h-5" style="color:${m.color}"></i>
              <span class="flex-1 font-semibold text-sm">${m.name}</span>
              ${best ? `<span class="text-xs font-bold ${best.score / best.total >= 0.8 ? 'text-emerald-500' : 'text-amber-500'}">${Math.round(best.score / best.total * 100)} %</span>` : '<span class="text-xs text-zinc-500">—</span>'}
            </button>`;
          }).join('')}
        </div>`)}
      ${this.card(`
        <h3 class="font-bold text-zinc-900 dark:text-white mb-1">👑 Veľké skúšky</h3>
        <p class="text-sm text-zinc-500 mb-4">Simulácie reálnych certifikačných podmienok. Správne odpovede a vysvetlenia uvidíš až na konci.</p>
        <div class="space-y-2">
          <button onclick="App.startQuiz('final')" class="btn-press w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-violet-500/40 hover:bg-violet-500/10 transition text-left">
            <span class="text-lg">👑</span>
            <span class="flex-1"><span class="font-semibold text-sm block">Záverečný test kurzu</span><span class="text-xs text-zinc-500">100 otázok zo všetkých modulov</span></span>
            ${s.quizResults['final'] ? `<span class="text-xs font-bold text-emerald-500">${Math.round(s.quizResults['final'].score / s.quizResults['final'].total * 100)} %</span>` : ''}
          </button>
          <button onclick="App.startQuiz('cert')" class="btn-press w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-amber-500/40 hover:bg-amber-500/10 transition text-left">
            <span class="text-lg">🎓</span>
            <span class="flex-1"><span class="font-semibold text-sm block">Mock certifikačný test</span><span class="text-xs text-zinc-500">50 otázok · Ads · cieľ 80 % ako na Skillshope</span></span>
            ${s.quizResults['cert-mock'] ? `<span class="text-xs font-bold text-emerald-500">${Math.round(s.quizResults['cert-mock'].score / s.quizResults['cert-mock'].total * 100)} %</span>` : ''}
          </button>
        </div>
        <p class="text-xs text-zinc-500 mt-4">💡 Mini testy k lekciám (5 otázok) spúšťaš priamo v lekciách.</p>`)}
    </div>
    ${history.length ? `<div class="mt-4">${this.card(`
      <h3 class="font-bold text-zinc-900 dark:text-white mb-3">História testov</h3>
      <div class="space-y-1.5">${history.map(t => {
        const pct = Math.round(t.score / t.total * 100);
        const label = t.type === 'lesson' ? 'Mini test' : t.type === 'module' ? 'Modulový test' : t.type === 'final' ? 'Záverečný test' : 'Mock certifikácia';
        return `<div class="flex items-center gap-3 text-sm py-1.5 border-b border-zinc-100 dark:border-zinc-800/60 last:border-0">
          <span class="text-zinc-500 text-xs w-20">${new Date(t.date).toLocaleDateString('sk')}</span>
          <span class="flex-1">${label}</span>
          <span class="text-xs text-zinc-500">${t.score}/${t.total}</span>
          <span class="font-bold text-xs ${pct >= 80 ? 'text-emerald-500' : pct >= 60 ? 'text-amber-500' : 'text-red-500'}">${pct} %</span>
        </div>`;
      }).join('')}</div>`)}</div>` : ''}`;
  },

  /* ════════ QUIZ ENGINE (modálne okno) ════════ */
  renderQuiz() {
    const q = App.quiz;
    if (!q) return;

    /* Výsledková obrazovka s vysvetleniami všetkých odpovedí */
    if (q.finished) {
      const p = Math.round(q.score / q.questions.length * 100);
      App.modal(`
        <div class="text-center mb-5">
          <div class="text-5xl mb-2">${p >= 80 ? '🎉' : p >= 60 ? '💪' : '📚'}</div>
          <h3 class="text-2xl font-extrabold text-zinc-900 dark:text-white">${p} %</h3>
          <p class="text-sm text-zinc-500">${q.score} z ${q.questions.length} správne · ${p >= 80 ? 'Výborne — certifikačná úroveň!' : p >= 60 ? 'Dobré — ešte si prejdi vysvetlenia.' : 'Zopakuj si teóriu a skús to znova.'}</p>
        </div>
        <h4 class="font-bold text-sm text-zinc-900 dark:text-white mb-3">Vysvetlenie všetkých odpovedí</h4>
        <div class="space-y-3 mb-5">
          ${q.questions.map((question, i) => {
            const ok = q.answers[i] === question.c;
            return `<div class="rounded-xl border ${ok ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-red-500/30 bg-red-500/5'} p-3">
              <div class="text-sm font-semibold text-zinc-900 dark:text-white mb-1">${i + 1}. ${question.q}</div>
              <div class="text-xs ${ok ? 'text-emerald-500' : 'text-red-400'} mb-1">
                ${ok ? '✓ Správne: ' : '✗ Tvoja odpoveď: '}${q.answers[i] !== null ? question.o[q.answers[i]] : '(bez odpovede)'}
                ${!ok ? `<br>✓ Správne: ${question.o[question.c]}` : ''}
              </div>
              <div class="text-xs text-zinc-600 dark:text-zinc-400">${question.e}</div>
            </div>`;
          }).join('')}
        </div>
        <button onclick="App.closeModal();App.render()" class="btn-press w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold">Zavrieť</button>
      `, true);
      return;
    }

    /* Otázka */
    const cur = q.questions[q.idx];
    const answered = q.answers.filter(a => a !== null).length;
    App.modal(`
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-sm text-zinc-900 dark:text-white truncate pr-3">${q.title}</h3>
        <button onclick="App.closeModal()" class="text-zinc-400 hover:text-red-400 shrink-0"><i data-lucide="x" class="w-5 h-5"></i></button>
      </div>
      ${this.progressBar((q.idx + 1) / q.questions.length * 100, 'from-indigo-500 to-violet-500', 'h-1.5')}
      <div class="text-xs text-zinc-500 mt-2 mb-4">Otázka ${q.idx + 1} / ${q.questions.length} · zodpovedaných ${answered}</div>
      <div class="font-semibold text-zinc-900 dark:text-white mb-4">${cur.q}</div>
      <div class="space-y-2 mb-5">
        ${cur.o.map((opt, i) => `
          <button onclick="App.answerQuiz(${i})" class="btn-press w-full text-left px-4 py-3 rounded-xl border text-sm transition
            ${q.answers[q.idx] === i ? 'border-indigo-500 bg-indigo-500/10 font-semibold' : 'border-zinc-200 dark:border-zinc-700 hover:border-indigo-400'}">
            <span class="inline-block w-5 font-bold text-zinc-400">${'ABCD'[i]}</span> ${opt}
          </button>`).join('')}
      </div>
      <div class="flex gap-2">
        <button onclick="App.quizNav(-1)" ${q.idx === 0 ? 'disabled' : ''} class="btn-press px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-sm font-semibold ${q.idx === 0 ? 'opacity-40' : ''}">← Späť</button>
        ${q.idx < q.questions.length - 1
          ? `<button onclick="App.quizNav(1)" class="btn-press flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold">Ďalej →</button>`
          : `<button onclick="App.finishQuiz()" class="btn-press flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold">Vyhodnotiť test ✓</button>`}
      </div>
      <p class="text-[11px] text-zinc-500 mt-3">Správne odpovede a vysvetlenia sa zobrazia až po vyhodnotení — ako pri reálnej certifikácii.</p>
    `, false);
  },
