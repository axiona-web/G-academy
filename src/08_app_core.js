<script>
/* ═══════════════════════════════════════════════════════════════════
   APP CORE — stav, localStorage, router, gamifikácia, časomiera
   Architektúra: App (jadro) + Views (obrazovky, samostatný súbor)
   ═══════════════════════════════════════════════════════════════════ */

const App = {
  /* ── Predvolený stav (ukladá sa do localStorage) ── */
  defaultState() {
    return {
      xp: 0,
      completedLessons: {},        // { lessonId: timestamp }
      checklistState: {},          // { lessonId: [bool,...] }
      quizResults: {},             // { quizId: {score,total,date} } — najlepší výsledok
      testHistory: [],             // [{type:'lesson'|'module'|'final'|'cert', id, score, total, date}]
      flashcards: {},              // { cardId: {due, interval, ease, reps} }
      fcReviews: 0,
      certs: {},                   // { certId: {done, date} }
      projects: {},                // { projId: {status:'todo'|'progress'|'done', notes, checks:[], rating} }
      streak: { last: null, count: 0 },
      dailyGoalMin: 30,
      weeklyGoalLessons: 5,
      timeLog: {},                 // { 'YYYY-MM-DD': minutes }
      achievements: {},            // { achId: timestamp }
      theme: 'dark',
      apiKey: '', apiProvider: 'anthropic',
      mentorHistory: [],
      /* Learning engine (etapa 2) */
      plan: null,            // denný plán mentora
      quests: null,          // daily/weekly/monthly questy
      skillPoints: 0,
      roleplaysDone: 0,      // počet odohraných klientskych rozhovorov
      master: {},            // Master Mode: { clientId: {step, score, log[], done} }
      audits: [],            // história AI auditov (pre portfolio builder)
      interviews: [],        // história pohovorov
    };
  },

  state: null,
  KEY: 'gacademy_v1',

  /* ── Perzistencia ── */
  load() {
    try {
      const raw = localStorage.getItem(this.KEY);
      this.state = raw ? Object.assign(this.defaultState(), JSON.parse(raw)) : this.defaultState();
    } catch (e) { this.state = this.defaultState(); }
  },
  save() { try { localStorage.setItem(this.KEY, JSON.stringify(this.state)); } catch (e) {} },

  /* ── Pomocníci na dáta kurzu ── */
  allLessons() {
    if (this._all) return this._all;
    this._all = [];
    DATA.modules.forEach(m => m.sections.forEach(sec => sec.lessons.forEach(l => this._all.push({ ...l, moduleId: m.id, sectionId: sec.id, sectionTitle: sec.title }))));
    return this._all;
  },
  totalLessons() { return this.allLessons().length; },
  getModule(id) { return DATA.modules.find(m => m.id === id); },
  getLesson(id) { return this.allLessons().find(l => l.id === id); },
  moduleLessons(mid) { return this.allLessons().filter(l => l.moduleId === mid); },
  moduleProgress(mid) {
    const ls = this.moduleLessons(mid);
    const done = ls.filter(l => this.state.completedLessons[l.id]).length;
    return ls.length ? Math.round(done / ls.length * 100) : 0;
  },
  /* Celkový progres: 70 % lekcie, 15 % projekty, 15 % certifikácie */
  overallProgress() {
    const lessons = Object.keys(this.state.completedLessons).length / this.totalLessons();
    const projects = Object.values(this.state.projects).filter(p => p.status === 'done').length / DATA.projects.length;
    const certs = Object.values(this.state.certs).filter(c => c.done).length / DATA.certs.length;
    return Math.round((lessons * 0.7 + projects * 0.15 + certs * 0.15) * 100);
  },

  /* ── Gamifikácia: XP a levely ── */
  LEVELS: [
    { name: 'Začiatočník', xp: 0, icon: '🌱' },
    { name: 'Junior', xp: 1200, icon: '🌿' },
    { name: 'Medior', xp: 3500, icon: '🌳' },
    { name: 'Senior', xp: 7000, icon: '⭐' },
    { name: 'Expert', xp: 12000, icon: '🏆' },
  ],
  level() {
    let lv = this.LEVELS[0], next = null;
    for (let i = 0; i < this.LEVELS.length; i++) {
      if (this.state.xp >= this.LEVELS[i].xp) { lv = this.LEVELS[i]; next = this.LEVELS[i + 1] || null; }
    }
    return { ...lv, next };
  },
  addXP(amount, reason) {
    this.state.xp += amount;
    this.save();
    this.toast(`+${amount} XP`, reason || '', '⚡');
    this.checkAchievements();
    this.refreshTopbar();
  },

  /* ── Streak (séria dní) ── */
  todayKey() { const d = new Date(); return d.toISOString().slice(0, 10); },
  touchStreak() {
    const today = this.todayKey();
    const s = this.state.streak;
    if (s.last === today) return;
    const yest = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
    s.count = (s.last === yest) ? s.count + 1 : 1;
    s.last = today;
    this.save();
    if (s.count > 1) this.toast(`🔥 Séria ${s.count} dní!`, 'Len tak ďalej', '');
  },

  /* ── Časomiera učenia (aktívny čas v aplikácii) ── */
  startTimer() {
    // Každú minútu, keď je karta viditeľná, pripíše 1 minútu do denného logu.
    setInterval(() => {
      if (document.hidden) return;
      const k = this.todayKey();
      this.state.timeLog[k] = (this.state.timeLog[k] || 0) + 1;
      if (this.state.timeLog[k] === this.state.dailyGoalMin) this.toast('🎯 Denný cieľ splnený!', `${this.state.dailyGoalMin} minút učenia`, '');
      this.save();
    }, 60000);
  },
  totalMinutes() { return Object.values(this.state.timeLog).reduce((a, b) => a + b, 0); },

  /* ── Achievementy ── */
  checkAchievements() {
    DATA.achievements.forEach(a => {
      if (!this.state.achievements[a.id] && a.check(this.state)) {
        this.state.achievements[a.id] = Date.now();
        this.save();
        this.toast(`${a.icon} ${a.name}`, a.desc, '');
      }
    });
  },

  /* ── Toasty ── */
  toast(title, sub, icon) {
    const el = document.createElement('div');
    el.className = 'animate-pop pointer-events-auto rounded-2xl border border-zinc-200 dark:border-zinc-700/70 bg-white dark:bg-[#1a1a1f] shadow-xl px-4 py-3 flex items-center gap-3';
    el.innerHTML = `<span class="text-xl">${icon || ''}</span><div class="min-w-0"><div class="font-semibold text-sm text-zinc-900 dark:text-white truncate">${title}</div>${sub ? `<div class="text-xs text-zinc-500 truncate">${sub}</div>` : ''}</div>`;
    document.getElementById('toasts').appendChild(el);
    setTimeout(() => { el.style.transition = 'opacity .4s, transform .4s'; el.style.opacity = 0; el.style.transform = 'translateX(20px)'; setTimeout(() => el.remove(), 400); }, 3200);
  },

  /* ── Téma ── */
  applyTheme() {
    document.documentElement.classList.toggle('dark', this.state.theme === 'dark');
    document.querySelector('meta[name="theme-color"]').content = this.state.theme === 'dark' ? '#09090b' : '#fafafa';
  },
  toggleTheme() { this.state.theme = this.state.theme === 'dark' ? 'light' : 'dark'; this.save(); this.applyTheme(); },

  /* ── Router ── */
  NAV: [
    { id: 'dashboard', name: 'Prehľad', icon: 'layout-dashboard' },
    { id: 'skilltree', name: 'Skill Tree', icon: 'git-branch' },
    { id: 'modules', name: 'Moduly', icon: 'book-open' },
    { id: 'tests', name: 'Testy', icon: 'clipboard-check' },
    { id: 'flashcards', name: 'Flashcards', icon: 'layers' },
    { id: 'projects', name: 'Projekty', icon: 'briefcase' },
    { id: 'auditor', name: 'AI Auditor', icon: 'scan-search' },
    { id: 'agency', name: 'Agentúra', icon: 'building-2' },
    { id: 'interview', name: 'Pohovor', icon: 'mic' },
    { id: 'certs', name: 'Certifikácie', icon: 'award' },
    { id: 'glossary', name: 'Slovník', icon: 'book-a' },
    { id: 'career', name: 'Kariéra', icon: 'trending-up' },
    { id: 'stats', name: 'Štatistiky', icon: 'bar-chart-3' },
    { id: 'mentor', name: 'AI Mentor', icon: 'bot' },
  ],
  MOBILE_NAV: ['dashboard', 'modules', 'tests', 'mentor'],
  /* Skupiny navigácie pre desktop sidebar (prehľadnosť pri 14+ položkách) */
  NAV_GROUPS: [
    ['Učenie', ['dashboard', 'skilltree', 'modules', 'tests', 'flashcards']],
    ['Prax', ['projects', 'auditor', 'agency', 'interview']],
    ['Rozvoj', ['certs', 'glossary', 'career', 'stats']],
    ['AI', ['mentor']],
  ],
  current: { view: 'dashboard', params: {} },

  /* Navigačné položky — Admin sekcia sa pridá len administrátorovi */
  navItems() {
    const items = [...this.NAV];
    if (typeof Auth !== 'undefined' && Auth.isAdmin()) items.push({ id: 'admin', name: 'Admin', icon: 'shield' });
    return items;
  },

  go(view, params = {}) {
    this.current = { view, params };
    this.render();
    window.scrollTo({ top: 0 });
  },

  render() {
    const { view, params } = this.current;
    const fn = Views[view] || Views.dashboard;
    // .call(Views) — metódy obrazoviek používajú this na zdieľané komponenty
    document.getElementById('main').innerHTML = `<div class="animate-slide-up">${fn.call(Views, params)}</div>`;
    document.getElementById('page-title').textContent = this.pageTitle();
    this.renderNav();
    this.refreshTopbar();
    if (window.lucide) lucide.createIcons();
    if (Views.afterRender[view]) Views.afterRender[view](params);
  },
  pageTitle() {
    const { view, params } = this.current;
    if (view === 'lesson') { const l = this.getLesson(params.id); return l ? l.title : 'Lekcia'; }
    if (view === 'module') { const m = this.getModule(params.id); return m ? m.name : 'Modul'; }
    const n = this.navItems().find(n => n.id === view);
    return n ? n.name : 'G-Academy';
  },
  renderNav() {
    const active = this.current.view === 'lesson' || this.current.view === 'module' ? 'modules' : this.current.view;
    const items = this.navItems();
    const btn = n => `
      <button onclick="App.go('${n.id}')" class="nav-item w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition hover:bg-zinc-100 dark:hover:bg-zinc-800/70 ${active === n.id ? 'active font-semibold' : 'text-zinc-600 dark:text-zinc-400'}">
        <i data-lucide="${n.icon}" class="w-4 h-4 shrink-0"></i><span>${n.name}</span>
      </button>`;
    // Desktop: zoskupené sekcie + Admin na konci (ak existuje)
    const grouped = this.NAV_GROUPS.map(([label, ids]) => `
      <div class="px-3 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">${label}</div>
      ${ids.map(id => items.find(x => x.id === id)).filter(Boolean).map(btn).join('')}`).join('');
    const adminItem = items.find(x => x.id === 'admin');
    document.getElementById('nav-desktop').innerHTML = grouped + (adminItem ? `<div class="px-3 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">Správa</div>${btn(adminItem)}` : '');
    // Mobil: 4 hlavné položky + „Viac" so všetkými sekciami
    document.getElementById('nav-mobile').innerHTML = this.MOBILE_NAV.map(id => {
      const n = this.NAV.find(x => x.id === id);
      return `<button onclick="App.go('${n.id}')" class="flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] ${active === id ? 'text-indigo-500 font-semibold' : 'text-zinc-500'}">
        <i data-lucide="${n.icon}" class="w-5 h-5"></i>${n.name}</button>`;
    }).join('') + `
      <button onclick="App.moreMenu()" class="flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] ${!this.MOBILE_NAV.includes(active) ? 'text-indigo-500 font-semibold' : 'text-zinc-500'}">
        <i data-lucide="grip" class="w-5 h-5"></i>Viac</button>`;
    // Sidebar footer: level widget
    const lv = this.level();
    const nextXp = lv.next ? lv.next.xp : lv.xp;
    const prevXp = lv.xp;
    const pct = lv.next ? Math.min(100, Math.round((this.state.xp - prevXp) / (nextXp - prevXp) * 100)) : 100;
    document.getElementById('sidebar-footer').innerHTML = `
      <div class="flex items-center gap-2 mb-2"><span class="text-lg">${lv.icon}</span>
        <div class="min-w-0 flex-1"><div class="text-xs font-bold text-zinc-900 dark:text-white">${lv.name}</div>
        <div class="text-[10px] text-zinc-500">${this.state.xp} XP ${lv.next ? '· do ' + lv.next.name + ': ' + (lv.next.xp - this.state.xp) : '· MAX'}</div></div></div>
      <div class="h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden"><div class="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" style="width:${pct}%"></div></div>`;
  },
  refreshTopbar() {
    document.getElementById('topbar-streak').textContent = `🔥 ${this.state.streak.count}`;
    document.getElementById('topbar-xp').textContent = `⚡ ${this.state.xp} XP`;
  },

  /* Mobilné menu „Viac" — mriežka všetkých sekcií */
  moreMenu() {
    this.modal(`
      <h3 class="font-bold text-zinc-900 dark:text-white mb-4">Všetky sekcie</h3>
      <div class="grid grid-cols-3 gap-2">
        ${this.navItems().map(n => `
        <button onclick="App.closeModal();App.go('${n.id}')" class="btn-press flex flex-col items-center gap-1.5 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/50 transition">
          <i data-lucide="${n.icon}" class="w-5 h-5 text-indigo-400"></i>
          <span class="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">${n.name}</span>
        </button>`).join('')}
      </div>`);
  },

  /* ── Modal ── */
  modal(html, wide) {
    document.getElementById('modal-root').innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="App.closeModal()"></div>
        <div class="relative animate-pop w-full ${wide ? 'max-w-3xl' : 'max-w-lg'} max-h-[85vh] overflow-y-auto rounded-2xl border border-zinc-200 dark:border-zinc-700/70 bg-white dark:bg-[#141418] p-6 shadow-2xl">${html}</div>
      </div>`;
    if (window.lucide) lucide.createIcons();
  },
  closeModal() { document.getElementById('modal-root').innerHTML = ''; },

  /* ── Lekcie: dokončenie, checklisty ── */
  toggleCheck(lessonId, idx) {
    const l = this.getLesson(lessonId);
    if (!this.state.checklistState[lessonId]) this.state.checklistState[lessonId] = l.checklist.map(() => false);
    this.state.checklistState[lessonId][idx] = !this.state.checklistState[lessonId][idx];
    this.save();
    this.render();
  },
  completeLesson(id) {
    if (this.state.completedLessons[id]) return;
    const l = this.getLesson(id);
    this.state.completedLessons[id] = Date.now();
    this.touchStreak();
    this.save();
    this.addXP(l.min * 2, `Lekcia: ${l.title}`);
    // týždenný cieľ
    const week = this.lessonsThisWeek();
    if (week === this.state.weeklyGoalLessons) this.toast('📅 Týždenný cieľ splnený!', `${week} lekcií tento týždeň`, '');
    // learning engine: questy a denný plán
    if (typeof Engine !== 'undefined') { Engine.autoTickPlan(); Engine.questProgress('weekly-check'); Engine.questProgress('monthly-check'); }
    this.render();
  },
  lessonsThisWeek() {
    const now = new Date(); const day = (now.getDay() + 6) % 7; // pondelok=0
    const monday = new Date(now); monday.setHours(0, 0, 0, 0); monday.setDate(now.getDate() - day);
    return Object.values(this.state.completedLessons).filter(t => t >= monday.getTime()).length;
  },

  /* ── Testový engine (kvízy lekcií, modulové, finálny, mock cert) ──
     Testy neukazujú správne odpovede priebežne — vyhodnotenie s
     vysvetleniami až na konci (ako reálne certifikácie). */
  quiz: null,
  _quizTimer: null,
  startQuiz(type, refId) {
    let questions = [], title = '', quizId = '', limitSec = 0;
    if (type === 'lesson') {
      const l = this.getLesson(refId);
      questions = l.quiz.map((q, i) => ({ ...q, src: l.id + ':' + i }));
      title = 'Mini test: ' + l.title; quizId = 'lesson:' + refId;
    } else if (type === 'module') {
      const pool = this.moduleLessons(refId).flatMap(l => l.quiz.map((q, i) => ({ ...q, src: l.id + ':' + i })));
      questions = this.sample(pool, 20);
      title = 'Modulový test: ' + this.getModule(refId).name; quizId = 'module:' + refId;
    } else if (type === 'final') {
      const pool = this.allLessons().flatMap(l => l.quiz.map((q, i) => ({ ...q, src: l.id + ':' + i })));
      questions = this.sample(pool, 100);
      title = 'Záverečný test (100 otázok)'; quizId = 'final';
    } else if (type === 'cert') {
      // Mock certifikačná skúška — reálne podmienky Skillshopu: 50 otázok / 75 minút
      const pool = this.moduleLessons('ads').flatMap(l => l.quiz.map((q, i) => ({ ...q, src: l.id + ':' + i })));
      questions = this.sample(pool, 50);
      title = 'Mock certifikačný test (Ads, 50 otázok)'; quizId = 'cert-mock'; limitSec = 75 * 60;
    } else if (type === 'internal') {
      // Interná certifikačná skúška (GBP/GSC Expert): 40 otázok / 50 minút, 80 %
      const cert = DATA.certs.find(c => c.id === refId);
      const pool = this.moduleLessons(cert.examModule).flatMap(l => l.quiz.map((q, i) => ({ ...q, src: l.id + ':' + i })));
      questions = this.sample(pool, 40);
      title = 'Skúška: ' + cert.name; quizId = 'internal:' + refId; limitSec = 50 * 60;
    }
    this.quiz = { type, refId, quizId, title, questions, answers: new Array(questions.length).fill(null), idx: 0, limitSec, endsAt: limitSec ? Date.now() + limitSec * 1000 : 0 };
    // Časomiera: každú sekundu aktualizuj displej; po vypršaní auto-vyhodnotenie
    clearInterval(this._quizTimer);
    if (limitSec) this._quizTimer = setInterval(() => {
      const q = this.quiz;
      if (!q || q.finished) { clearInterval(this._quizTimer); return; }
      const left = Math.max(0, Math.round((q.endsAt - Date.now()) / 1000));
      const el = document.getElementById('quiz-timer');
      if (el) {
        el.textContent = '⏱ ' + Math.floor(left / 60) + ':' + String(left % 60).padStart(2, '0');
        el.className = left < 300 ? 'text-xs font-bold text-red-500' : 'text-xs font-bold text-zinc-500';
      }
      if (left <= 0) { this.toast('⏱ Čas vypršal', 'Test sa vyhodnocuje', ''); this.finishQuiz(); }
    }, 1000);
    Views.renderQuiz();
  },
  sample(arr, n) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a.slice(0, Math.min(n, a.length));
  },
  answerQuiz(optIdx) {
    this.quiz.answers[this.quiz.idx] = optIdx;
    Views.renderQuiz();
  },
  quizNav(dir) {
    this.quiz.idx = Math.max(0, Math.min(this.quiz.questions.length - 1, this.quiz.idx + dir));
    Views.renderQuiz();
  },
  finishQuiz() {
    const q = this.quiz;
    if (!q || q.finished) return;
    clearInterval(this._quizTimer);
    const score = q.questions.reduce((s, question, i) => s + (q.answers[i] === question.c ? 1 : 0), 0);
    const total = q.questions.length;
    // Interná certifikácia: úspech ≥ 80 % automaticky udelí certifikát
    if (q.type === 'internal' && score / total >= 0.8 && !(this.state.certs[q.refId] || {}).done) {
      this.state.certs[q.refId] = { done: true, date: Date.now() };
      this.toast('🎓 Certifikácia získaná!', DATA.certs.find(c => c.id === q.refId).name, '');
    }
    // uloženie najlepšieho výsledku + histórie
    const prev = this.state.quizResults[q.quizId];
    if (!prev || score / total > prev.score / prev.total) this.state.quizResults[q.quizId] = { score, total, date: Date.now() };
    this.state.testHistory.push({ type: q.type, id: q.quizId, score, total, date: Date.now() });
    this.touchStreak();
    this.save();
    const pct = Math.round(score / total * 100);
    const xp = q.type === 'lesson' ? score * 10 : q.type === 'module' ? score * 15 : score * 20;
    this.addXP(xp, `Test: ${pct} %`);
    q.finished = true; q.score = score;
    Views.renderQuiz();
  },

  /* ── Flashcards: zjednodušený SM-2 spaced repetition ──
     Hodnotenie: 0=nevedel, 1=ťažké, 2=dobré, 3=ľahké */
  fcState(id) {
    if (!this.state.flashcards[id]) this.state.flashcards[id] = { due: 0, interval: 0, ease: 2.5, reps: 0 };
    return this.state.flashcards[id];
  },
  fcDueCards() {
    const now = Date.now();
    return DATA.flashcards.filter(c => this.fcState(c.id).due <= now);
  },
  fcReview(cardId, grade) {
    const s = this.fcState(cardId);
    if (grade === 0) { s.interval = 0; s.reps = 0; s.ease = Math.max(1.3, s.ease - 0.2); }
    else {
      s.reps++;
      if (s.reps === 1) s.interval = 1;
      else if (s.reps === 2) s.interval = 3;
      else s.interval = Math.round(s.interval * s.ease);
      if (grade === 1) { s.ease = Math.max(1.3, s.ease - 0.15); s.interval = Math.max(1, Math.round(s.interval * 0.7)); }
      if (grade === 3) s.ease += 0.1;
    }
    s.due = Date.now() + (s.interval === 0 ? 10 * 60 * 1000 : s.interval * 864e5);
    this.state.fcReviews = (this.state.fcReviews || 0) + 1;
    this.touchStreak();
    this.save();
    this.addXP(grade > 0 ? 5 : 2, 'Flashcard');
    this.checkAchievements();
  },

  /* ── Certifikácie ── */
  certReadiness(cert) {
    // Pravdepodobnosť úspechu = kombinácia progresu modulov + výsledkov testov
    let base = 0, weight = 0;
    Object.entries(cert.reqModules).forEach(([mid, req]) => {
      base += Math.min(1, this.moduleProgress(mid) / req) * 60; weight += 60;
    });
    const modTests = this.state.testHistory.filter(t => t.type !== 'lesson');
    const best = modTests.length ? Math.max(...modTests.map(t => t.score / t.total)) : 0;
    base += best * 40; weight += 40;
    return Math.round(base / weight * 100);
  },
  toggleCert(id) {
    const c = this.state.certs[id] || { done: false };
    c.done = !c.done; c.date = c.done ? Date.now() : null;
    this.state.certs[id] = c;
    this.save();
    if (c.done) this.addXP(500, 'Certifikácia získaná! 🎉');
    this.checkAchievements();
    this.render();
  },

  /* ── Projekty ── */
  projState(id) {
    if (!this.state.projects[id]) {
      const p = DATA.projects.find(x => x.id === id);
      this.state.projects[id] = { status: 'todo', notes: '', checks: p.checklist.map(() => false), rating: 0 };
    }
    return this.state.projects[id];
  },
  projToggleCheck(pid, idx) {
    const s = this.projState(pid); s.checks[idx] = !s.checks[idx];
    if (s.status === 'todo' && s.checks.some(Boolean)) s.status = 'progress';
    this.save(); this.render();
  },
  projSetStatus(pid, status) {
    const s = this.projState(pid);
    const was = s.status; s.status = status;
    this.save();
    if (status === 'done' && was !== 'done') {
      const p = DATA.projects.find(x => x.id === pid);
      this.addXP(p.xp, `Projekt: ${p.name}`);
    }
    this.checkAchievements(); this.render();
  },
  projSaveNotes(pid, val) { this.projState(pid).notes = val; this.save(); },
  projSetRating(pid, r) { this.projState(pid).rating = r; this.save(); this.render(); },

  /* ── Init ── */
  init() {
    this.load();
    this.applyTheme();
    this.startTimer();
    this.render();
    this.checkAchievements();
    // PWA service worker (funguje len cez http(s), pri file:// sa ticho preskočí)
    if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    }
  },
};
</script>
