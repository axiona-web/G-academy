<script>
/* ═══════════════════════════════════════════════════════════════════
   LEARNING ENGINE — študentský model, denný plán mentora, quests,
   skill tree a knowledge heatmap
   ───────────────────────────────────────────────────────────────────
   Filozofia: žiadne náhodné úlohy. Všetko sa počíta z reálnych dát
   používateľa: dokončené lekcie, výsledky kvízov, flashcards, streak.
   ═══════════════════════════════════════════════════════════════════ */

/* ── TÉMY pre knowledge map (uzly poznania s priradenými lekciami) ── */
DATA.topics = [
  { id: 't-local-basics', name: 'Lokálne vyhľadávanie', mod: 'gbp', lessons: ['gbp-1-1', 'gbp-1-2'] },
  { id: 't-ranking', name: 'Local Ranking faktory', mod: 'gbp', lessons: ['gbp-1-3', 'gbp-1-4'] },
  { id: 't-profile-setup', name: 'Založenie a verifikácia', mod: 'gbp', lessons: ['gbp-2-1', 'gbp-2-2'] },
  { id: 't-categories', name: 'Kategórie a nastavenia', mod: 'gbp', lessons: ['gbp-2-3', 'gbp-2-4'] },
  { id: 't-content-gbp', name: 'Obsah profilu (foto, produkty)', mod: 'gbp', lessons: ['gbp-2-5', 'gbp-2-6', 'gbp-3-1', 'gbp-3-2'] },
  { id: 't-reviews', name: 'Recenzie', mod: 'gbp', lessons: ['gbp-3-3', 'gbp-3-4'] },
  { id: 't-spam', name: 'Spam fighting', mod: 'gbp', lessons: ['gbp-3-5'] },
  { id: 't-localseo', name: 'Lokálne SEO (NAP, citácie)', mod: 'gbp', lessons: ['gbp-4-1', 'gbp-4-2'] },
  { id: 't-gbp-advanced', name: 'GBP optimalizácia a analytika', mod: 'gbp', lessons: ['gbp-4-3', 'gbp-4-4', 'gbp-5-1'] },
  { id: 't-crawling', name: 'Crawling a indexácia', mod: 'gsc', lessons: ['gsc-1-1', 'gsc-1-2'] },
  { id: 't-sitemap-robots', name: 'Sitemap a robots.txt', mod: 'gsc', lessons: ['gsc-1-3', 'gsc-1-4'] },
  { id: 't-coverage', name: 'Coverage a canonical', mod: 'gsc', lessons: ['gsc-2-1', 'gsc-2-2'] },
  { id: 't-redirects', name: 'Redirecty a 404', mod: 'gsc', lessons: ['gsc-2-3', 'gsc-2-4'] },
  { id: 't-schema', name: 'Structured Data', mod: 'gsc', lessons: ['gsc-2-5'] },
  { id: 't-performance', name: 'Performance a CTR', mod: 'gsc', lessons: ['gsc-3-1', 'gsc-3-2', 'gsc-3-3'] },
  { id: 't-cwv', name: 'Core Web Vitals', mod: 'gsc', lessons: ['gsc-4-1', 'gsc-4-2'] },
  { id: 't-penalties', name: 'Penalizácie a bezpečnosť', mod: 'gsc', lessons: ['gsc-4-3', 'gsc-5-1'] },
  { id: 't-auction', name: 'Aukcia a Ad Rank', mod: 'ads', lessons: ['ads-1-1', 'ads-1-2'] },
  { id: 't-keywords', name: 'Keywords a Match Types', mod: 'ads', lessons: ['ads-2-1', 'ads-2-2', 'ads-2-3'] },
  { id: 't-quality-score', name: 'Quality Score a reklamy', mod: 'ads', lessons: ['ads-2-4', 'ads-2-5', 'ads-2-6'] },
  { id: 't-campaign-types', name: 'Typy kampaní (PMax, Shopping…)', mod: 'ads', lessons: ['ads-1-3', 'ads-3-1', 'ads-3-2', 'ads-3-3', 'ads-3-4', 'ads-3-5', 'ads-3-6'] },
  { id: 't-bidding', name: 'Bidding, CPA, ROAS', mod: 'ads', lessons: ['ads-4-1', 'ads-4-2'] },
  { id: 't-measurement', name: 'Meranie a atribúcia', mod: 'ads', lessons: ['ads-4-3', 'ads-4-4'] },
  { id: 't-audiences', name: 'Publiká a remarketing', mod: 'ads', lessons: ['ads-5-1', 'ads-5-2'] },
  { id: 't-optimization', name: 'Optimalizácia a reporting', mod: 'ads', lessons: ['ads-6-1', 'ads-6-2', 'ads-6-3', 'ads-6-4'] },
];

const Engine = {
  /* ── Mastery témy 0–100 %: 40 % dokončenie lekcií + 60 % kvízy ── */
  mastery(topic) {
    const s = App.state;
    let doneL = 0, quizSum = 0, quizN = 0;
    topic.lessons.forEach(id => {
      if (s.completedLessons[id]) doneL++;
      const q = s.quizResults['lesson:' + id];
      if (q) { quizSum += q.score / q.total; quizN++; }
    });
    const lessonPart = doneL / topic.lessons.length * 40;
    const quizPart = quizN ? (quizSum / quizN) * 60 : 0;
    return Math.round(lessonPart + quizPart);
  },
  /* Stav témy pre knowledge map */
  topicStatus(topic) {
    const m = this.mastery(topic);
    const started = topic.lessons.some(id => App.state.completedLessons[id]);
    if (m >= 85) return { m, key: 'done', label: 'Ovládam', color: '#10b981' };
    if (m >= 60) return { m, key: 'learning', label: 'Učím sa', color: '#3b82f6' };
    if (started || m > 0) return { m, key: 'repeat', label: 'Zopakovať', color: '#f59e0b' };
    return { m, key: 'todo', label: 'Neviem', color: '#71717a' };
  },
  knowledge() { return DATA.topics.map(t => ({ ...t, ...this.topicStatus(t) })); },
  /* Najslabšie témy, v ktorých už používateľ pracoval (má pokusy) */
  weakest(n = 3) {
    return this.knowledge()
      .filter(t => t.m > 0 && t.m < 85)
      .sort((a, b) => a.m - b.m)
      .slice(0, n);
  },

  /* ── DENNÝ PLÁN MENTORA ──────────────────────────────────────────
     Generuje sa raz denne z aktuálneho stavu. Nikdy nie náhodne:
     lekcie = ďalšie nedokončené; kvíz = najslabší modul;
     opakovanie = due flashcards; dôvod = najslabšia téma. */
  dailyPlan() {
    const s = App.state;
    const today = App.todayKey();
    if (s.plan && s.plan.date === today) return s.plan;
    const nextLessons = App.allLessons().filter(l => !s.completedLessons[l.id]).slice(0, 2);
    const weak = this.weakest(1)[0];
    const due = App.fcDueCards().length;
    const weakMod = weak ? weak.mod : (nextLessons[0] ? nextLessons[0].moduleId : 'ads');
    const items = [];
    nextLessons.forEach(l => items.push({ id: 'lesson:' + l.id, type: 'lesson', label: `Lekcia: ${l.title}`, action: `App.go('lesson',{id:'${l.id}'})` }));
    if (due) items.push({ id: 'fc', type: 'fc', label: `${Math.min(due, 8)} flashcards na zopakovanie`, action: `App.go('flashcards')` });
    items.push({ id: 'quiz:' + weakMod, type: 'quiz', label: `10 otázok z modulu ${App.getModule(weakMod).short}`, action: `App.startQuiz('module','${weakMod}')` });
    const proj = DATA.projects.find(p => (App.state.projects[p.id] || {}).status !== 'done');
    if (proj && App.moduleProgress(proj.module) >= 50) items.push({ id: 'proj:' + proj.id, type: 'proj', label: `Praktická úloha: pokrok v projekte „${proj.name}"`, action: `App.go('projects')` });
    const reason = weak
      ? `pretože téma <b>${weak.name}</b> má mastery len ${weak.m} % — posledné testy ukazujú chyby práve tu.`
      : (nextLessons.length ? 'pretože si na začiatku cesty — najdôležitejšia je pravidelnosť.' : 'pretože všetko máš hotové — udržiavaj vedomosti opakovaním.');
    s.plan = { date: today, items, reason, done: {} };
    App.save();
    return s.plan;
  },
  planCheck(itemId) {
    const p = App.state.plan;
    if (!p || p.done[itemId]) return;
    p.done[itemId] = true;
    App.save();
    if (Object.keys(p.done).length === p.items.length) {
      App.state.skillPoints = (App.state.skillPoints || 0) + 3;
      App.addXP(80, '🎯 Denný plán splnený! +3 Skill Points');
      this.questProgress('daily');
    }
    App.render();
  },
  /* Automatické odškrtávanie plánu podľa reálnej aktivity */
  autoTickPlan() {
    const p = App.state.plan;
    if (!p || p.date !== App.todayKey()) return;
    p.items.forEach(it => {
      if (p.done[it.id]) return;
      if (it.type === 'lesson' && App.state.completedLessons[it.id.replace('lesson:', '')]) p.done[it.id] = true;
      if (it.type === 'fc' && App.fcDueCards().length === 0) p.done[it.id] = true;
      if (it.type === 'quiz') {
        const mod = it.id.replace('quiz:', '');
        const t = App.state.testHistory.filter(x => x.id === 'module:' + mod && x.date > new Date(p.date).getTime());
        if (t.length) p.done[it.id] = true;
      }
    });
    App.save();
  },

  /* ── QUESTS: denné / týždenné / mesačné ── */
  weekKey() { const d = new Date(); const on = new Date(d.getFullYear(), 0, 1); return d.getFullYear() + '-w' + Math.ceil((((d - on) / 864e5) + on.getDay() + 1) / 7); },
  monthKey() { return App.todayKey().slice(0, 7); },
  quests() {
    const s = App.state;
    if (!s.quests) s.quests = {};
    const q = s.quests;
    if (!q.weekly || q.weekly.week !== this.weekKey()) q.weekly = { week: this.weekKey(), lessons: 0 };
    if (!q.monthly || q.monthly.month !== this.monthKey()) q.monthly = { month: this.monthKey(), xpStart: s.xp };
    const dailyDone = s.plan && s.plan.date === App.todayKey() && Object.keys(s.plan.done).length >= s.plan.items.length;
    const weeklyTarget = 7, monthlyTarget = 1500;
    return [
      { icon: '☀️', name: 'Daily Quest', desc: 'Splň celý denný plán mentora', prog: dailyDone ? 1 : (s.plan && s.plan.date === App.todayKey() ? Object.keys(s.plan.done).length / s.plan.items.length : 0), reward: '80 XP + 3 SP' },
      { icon: '📅', name: 'Weekly Quest', desc: `Dokonči ${weeklyTarget} lekcií tento týždeň`, prog: Math.min(1, App.lessonsThisWeek() / weeklyTarget), reward: '200 XP + 5 SP' },
      { icon: '🌙', name: 'Monthly Challenge', desc: `Získaj ${monthlyTarget} XP tento mesiac`, prog: Math.min(1, (s.xp - q.monthly.xpStart) / monthlyTarget), reward: 'Odznak + 15 SP' },
    ];
  },
  questProgress(type) {
    const s = App.state;
    if (type === 'weekly-check' && App.lessonsThisWeek() === 7) { s.skillPoints = (s.skillPoints || 0) + 5; App.addXP(200, '📅 Weekly Quest splnený!'); }
    if (type === 'monthly-check' && s.quests?.monthly && (s.xp - s.quests.monthly.xpStart) >= 1500 && !s.quests.monthly.claimed) { s.quests.monthly.claimed = true; s.skillPoints = (s.skillPoints || 0) + 15; App.toast('🌙 Monthly Challenge splnený!', '+15 Skill Points', ''); }
    App.save();
  },

  /* ── PREDIKCIE ── */
  clientReadiness() {
    // pripravenosť na reálneho klienta: progres + testy + prax (roleplay, projekty)
    const prog = App.overallProgress();
    const tests = App.state.testHistory.filter(t => t.type !== 'lesson');
    const testAvg = tests.length ? tests.reduce((a, t) => a + t.score / t.total, 0) / tests.length * 100 : 0;
    const practice = Math.min(100, ((App.state.roleplaysDone || 0) * 10) + (Object.values(App.state.projects).filter(p => p.status === 'done').length * 15));
    return Math.round(prog * 0.4 + testAvg * 0.35 + practice * 0.25);
  },
};

/* ═══════════════ VIEW: SKILL TREE ═══════════════ */
Views.skilltree = function () {
  /* Uzol = sekcia modulu. Odomyká sa: prvá sekcia vždy; ďalšia keď
     predchádzajúca ≥ 60 %. Master vetva po dokončení všetkých modulov. */
  const sectionPct = (sec) => {
    const done = sec.lessons.filter(l => App.state.completedLessons[l.id]).length;
    return Math.round(done / sec.lessons.length * 100);
  };
  const treeHtml = DATA.modules.map(m => {
    let prevPct = 100;
    const nodes = m.sections.map((sec, i) => {
      const pct = sectionPct(sec);
      const unlocked = i === 0 || prevPct >= 60;
      const state = !unlocked ? 'locked' : pct >= 100 ? 'done' : pct > 0 ? 'progress' : 'open';
      const node = { sec, pct, unlocked, state };
      prevPct = pct;
      return node;
    });
    return `
    <div class="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#131316] p-5">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:${m.color}18;color:${m.color}"><i data-lucide="${m.icon}" class="w-5 h-5"></i></div>
        <div><div class="font-bold text-zinc-900 dark:text-white">${m.name}</div><div class="text-xs text-zinc-500">${App.moduleProgress(m.id)} % · vetva stromu</div></div>
      </div>
      <div class="relative pl-5">
        <div class="absolute left-[9px] top-2 bottom-2 w-0.5 bg-zinc-200 dark:bg-zinc-800"></div>
        ${nodes.map(n => `
        <div class="relative mb-3 last:mb-0">
          <div class="absolute -left-5 top-2.5 w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center text-[9px] font-bold
            ${n.state === 'done' ? 'bg-emerald-500 border-emerald-500 text-white' : n.state === 'progress' ? 'border-indigo-500 text-indigo-400 bg-white dark:bg-[#131316]' : n.state === 'open' ? 'border-zinc-400 bg-white dark:bg-[#131316]' : 'border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800'}">
            ${n.state === 'done' ? '✓' : n.state === 'locked' ? '🔒' : ''}
          </div>
          <button ${n.unlocked ? `onclick="App.go('module',{id:'${m.id}'})"` : 'disabled'}
            class="w-full text-left rounded-xl border px-3 py-2 transition ${n.unlocked ? 'border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/50 btn-press' : 'border-zinc-100 dark:border-zinc-800/50 opacity-45 cursor-not-allowed'}">
            <div class="flex items-center justify-between">
              <span class="text-sm font-semibold ${n.state === 'done' ? 'text-emerald-500' : 'text-zinc-800 dark:text-zinc-200'}">${n.sec.title}</span>
              <span class="text-xs font-bold" style="color:${n.state === 'done' ? '#10b981' : m.color}">${n.unlocked ? n.pct + ' %' : ''}</span>
            </div>
            ${n.unlocked ? `<div class="mt-1.5 h-1 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden"><div class="h-full rounded-full" style="background:${m.color};width:${n.pct}%"></div></div>` : '<div class="text-[10px] text-zinc-500 mt-0.5">Odomkne sa: predchádzajúca sekcia ≥ 60 %</div>'}
          </button>
        </div>`).join('')}
      </div>
    </div>`;
  }).join('');

  const allDone = DATA.modules.every(m => App.moduleProgress(m.id) >= 100);
  return `
  <p class="text-sm text-zinc-500 mb-4">🌳 Strom znalostí — uzly sa odomykajú postupne. Master vetva (Agentúra) sa otvorí po dokončení všetkých troch modulov.</p>
  <div class="grid md:grid-cols-3 gap-4">${treeHtml}</div>
  <div class="mt-4 rounded-2xl border-2 ${allDone ? 'border-violet-500/50 bg-violet-500/5' : 'border-dashed border-zinc-300 dark:border-zinc-700'} p-5 text-center">
    <div class="text-3xl mb-1">${allDone ? '👑' : '🔒'}</div>
    <div class="font-bold text-zinc-900 dark:text-white">MASTER MODE — Agentúra</div>
    <p class="text-xs text-zinc-500 mt-1">${allDone ? 'Odomknuté! 20 komplexných klientskych projektov s reálnymi udalosťami.' : 'Dokonči všetky tri moduly a odomkni simuláciu vlastnej agentúry s 20 projektmi.'}</p>
    <button onclick="App.go('agency')" class="btn-press mt-3 px-5 py-2 rounded-xl text-sm font-semibold ${allDone ? 'bg-violet-600 hover:bg-violet-500 text-white' : 'border border-zinc-300 dark:border-zinc-700'}">${allDone ? 'Vstúpiť do Agentúry' : 'Pozrieť klientov (roleplay je dostupný hneď)'}</button>
  </div>`;
};

/* ═══════════════ Heatmap + Knowledge map (pre Štatistiky) ═══════════════ */
Views.heatmapHTML = function () {
  const know = Engine.knowledge();
  const counts = { done: 0, learning: 0, repeat: 0, todo: 0 };
  know.forEach(k => counts[k.key]++);
  const heat = (m) => m >= 85 ? '#10b981' : m >= 60 ? '#22c55e' : m >= 40 ? '#f59e0b' : m > 0 ? '#ef4444' : (App.state.theme === 'dark' ? '#27272a' : '#e4e4e7');
  return `
  <div class="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#131316] p-5 mt-4">
    <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
      <h3 class="font-bold text-sm text-zinc-900 dark:text-white">🗺️ Knowledge Map — heatmapa znalostí</h3>
      <div class="flex gap-3 text-[11px] text-zinc-500">
        <span>🟢 Ovládam (${counts.done})</span><span>🔵 Učím sa (${counts.learning})</span>
        <span>🟠 Zopakovať (${counts.repeat})</span><span>⚪ Neviem (${counts.todo})</span>
      </div>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
      ${know.map(k => `
      <div class="rounded-xl border border-zinc-200 dark:border-zinc-800 p-3" title="${k.label}">
        <div class="flex items-center justify-between mb-1.5">
          <span class="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate pr-2">${k.name}</span>
          <span class="text-xs font-extrabold shrink-0" style="color:${heat(k.m)}">${k.m} %</span>
        </div>
        <div class="h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden"><div class="h-full rounded-full transition-all duration-700" style="background:${heat(k.m)};width:${Math.max(2, k.m)}%"></div></div>
        <div class="text-[10px] mt-1" style="color:${k.color}">${k.label} · ${App.getModule(k.mod).short}</div>
      </div>`).join('')}
    </div>
    <div class="mt-4 grid sm:grid-cols-2 gap-3">
      <div class="rounded-xl bg-indigo-500/10 border border-indigo-500/20 p-3 text-xs">
        <b class="text-indigo-400">🎯 Predikcia certifikácie (Search):</b>
        <span class="text-zinc-700 dark:text-zinc-300">${App.certReadiness(DATA.certs[0])} % pravdepodobnosť úspechu</span>
      </div>
      <div class="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 text-xs">
        <b class="text-emerald-500">🤝 Pripravenosť na klienta:</b>
        <span class="text-zinc-700 dark:text-zinc-300">${Engine.clientReadiness()} % (progres + testy + prax)</span>
      </div>
    </div>
  </div>`;
};

/* ═══════════════ Denný plán + Quests karta (pre Dashboard) ═══════════════ */
Views.dailyPlanCard = function () {
  Engine.autoTickPlan();
  const plan = Engine.dailyPlan();
  const doneN = Object.keys(plan.done).length;
  const quests = Engine.quests();
  return `
  <div class="grid md:grid-cols-3 gap-4 mt-2">
    <div class="md:col-span-2 rounded-2xl border-2 border-indigo-500/30 bg-indigo-500/5 p-5">
      <div class="flex items-center gap-2 mb-1">
        <span class="text-lg">🤖</span><h3 class="font-bold text-zinc-900 dark:text-white">Mentor: dnešný plán</h3>
        <span class="ml-auto text-xs font-bold text-indigo-400">${doneN}/${plan.items.length}</span>
      </div>
      <p class="text-xs text-zinc-500 mb-3">Odporúčam presne toto — ${plan.reason}</p>
      <div class="space-y-1.5">
        ${plan.items.map(it => `
        <div class="flex items-center gap-2.5 rounded-xl px-3 py-2 ${plan.done[it.id] ? 'bg-emerald-500/10' : 'bg-white dark:bg-[#131316] border border-zinc-200 dark:border-zinc-800'}">
          <span class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 ${plan.done[it.id] ? 'bg-emerald-500 text-white' : 'border-2 border-zinc-300 dark:border-zinc-600'}">${plan.done[it.id] ? '✓' : ''}</span>
          <span class="text-sm flex-1 ${plan.done[it.id] ? 'line-through text-zinc-400' : 'text-zinc-800 dark:text-zinc-200'}">${it.label}</span>
          ${!plan.done[it.id] ? `<button onclick="${it.action.replace(/"/g, '&quot;')}" class="btn-press text-xs font-bold text-indigo-400 hover:underline shrink-0">Spustiť →</button>` : ''}
        </div>`).join('')}
      </div>
    </div>
    <div class="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#131316] p-5">
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-bold text-sm text-zinc-900 dark:text-white">⚔️ Questy</h3>
        <span class="chip bg-violet-500/10 text-violet-400">💠 ${App.state.skillPoints || 0} SP</span>
      </div>
      <div class="space-y-3">
        ${quests.map(q => `
        <div>
          <div class="flex justify-between text-xs mb-1">
            <span class="font-semibold text-zinc-700 dark:text-zinc-300">${q.icon} ${q.name}</span>
            <span class="text-zinc-500">${Math.round(q.prog * 100)} %</span>
          </div>
          <div class="h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden"><div class="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" style="width:${q.prog * 100}%"></div></div>
          <div class="text-[10px] text-zinc-500 mt-0.5">${q.desc} · ${q.reward}</div>
        </div>`).join('')}
      </div>
    </div>
  </div>`;
};
</script>
