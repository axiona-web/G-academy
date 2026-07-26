<script>
/* ═══════════════════════════════════════════════════════════════════
   SPRINT 1 — MERANIE KVALITY
   ───────────────────────────────────────────────────────────────────
   1) Track: produktové eventy (lokálny buffer + Supabase events)
   2) QStats: analytika otázok + pravidlá slabých otázok
   3) Onboarding diagnostika: cieľ, skúsenosti, vstupný test → cesta
   4) Confidence score pre mastery (low/medium/high)
   5) Obsahové statusy (Draft → Expert reviewed → Deprecated)
   6) Export / obnova / vymazanie progresu
   7) Validačná vrstva admin editora
   8) Admin: analytika + problémové otázky + anomálie XP
   Implementované prevažne cez wrappery existujúcich funkcií —
   pôvodné moduly zostávajú nezmenené (menší risk regresie).
   ═══════════════════════════════════════════════════════════════════ */

/* ══ 1) PRODUKTOVÉ EVENTY ══ */
const Track = {
  buffer: [],
  log(name, props = {}) {
    const e = { name, props, date: Date.now() };
    this.buffer.push(e);
    this.buffer = this.buffer.slice(-500);
    try { localStorage.setItem('gacademy_events', JSON.stringify(this.buffer.slice(-200))); } catch (x) {}
    if (Auth.sb && Auth.user) {
      Auth.sb.from('events').insert({ user_id: Auth.user.id, name, props }).then(() => {}, () => {});
    }
    QStats.onEvent(name, props);
  },
  init() { try { this.buffer = JSON.parse(localStorage.getItem('gacademy_events') || '[]'); } catch (e) { this.buffer = []; } },
};
Track.init();

/* ══ 2) ANALYTIKA OTÁZOK (kalibrácia) ══
   Per otázka (kľúč = lessonId:index): pokusy, správne, zmeny odpovede,
   priemerný čas. Pravidlá slabej otázky:
   • úspešnosť > 95 % (príliš ľahká) alebo < 30 % (nejasná/ťažká)
   • veľa zmien odpovede (nejednoznačné možnosti)
   • nahlásenia používateľov */
const QStats = {
  data: {},
  init() { try { this.data = JSON.parse(localStorage.getItem('gacademy_qstats') || '{}'); } catch (e) { this.data = {}; } },
  save() { try { localStorage.setItem('gacademy_qstats', JSON.stringify(this.data)); } catch (e) {} },
  rec(src) { if (!this.data[src]) this.data[src] = { n: 0, ok: 0, chg: 0, ms: 0 }; return this.data[src]; },
  onEvent(name, props) {
    if (name === 'question_answered' && props.src) {
      const r = this.rec(props.src);
      r.n++; if (props.correct) r.ok++;
      if (props.ms) r.ms = Math.round((r.ms * (r.n - 1) + props.ms) / r.n);
      this.save();
    }
    if (name === 'answer_changed' && props.src) { this.rec(props.src).chg++; this.save(); }
  },
  /* Zoznam problémových otázok pre admina */
  flagged() {
    const out = [];
    Object.entries(this.data).forEach(([src, r]) => {
      if (r.n < 5) return; // málo dát — nehodnotiť
      const rate = r.ok / r.n;
      const flags = [];
      if (rate > 0.95) flags.push('príliš ľahká (' + Math.round(rate * 100) + '% úspešnosť)');
      if (rate < 0.30) flags.push('nejasná/príliš ťažká (' + Math.round(rate * 100) + '%)');
      if (r.chg / r.n > 0.5) flags.push('časté zmeny odpovede (nejednoznačné možnosti?)');
      if (flags.length) {
        const [lid, qi] = [src.slice(0, src.lastIndexOf(':')), +src.slice(src.lastIndexOf(':') + 1)];
        const l = App.getLesson(lid);
        out.push({ src, lesson: l ? l.title : lid, q: l ? (l.quiz[qi]?.q || '') : '', n: r.n, rate: Math.round(rate * 100), flags });
      }
    });
    return out.sort((a, b) => a.rate - b.rate);
  },
};
QStats.init();

/* ── Wrappery: napojenie eventov na existujúce funkcie ── */
(() => {
  const wrap = (obj, fn, before, after) => {
    const orig = obj[fn].bind(obj);
    obj[fn] = function (...a) { if (before) before(...a); const r = orig(...a); if (after) after(r, ...a); return r; };
  };
  wrap(App, 'completeLesson', (id) => Track.log('lesson_completed', { id }));
  wrap(App, 'go', (view, params) => { if (view === 'lesson' && params?.id) Track.log('lesson_started', { id: params.id }); });
  wrap(App, 'startQuiz', (type, refId) => {
    Track.log(type === 'cert' || type === 'internal' ? 'certification_started' : 'quiz_started', { type, refId });
    App._qStart = Date.now();
  });
  wrap(App, 'answerQuiz', (optIdx) => {
    const q = App.quiz; if (!q) return;
    if (q.answers[q.idx] !== null && q.answers[q.idx] !== optIdx) Track.log('answer_changed', { src: q.questions[q.idx].src });
  });
  wrap(App, 'finishQuiz', null, () => {
    const q = App.quiz; if (!q || !q.finished) return;
    const ms = App._qStart ? Math.round((Date.now() - App._qStart) / q.questions.length) : 0;
    q.questions.forEach((question, i) => Track.log('question_answered', { src: question.src, correct: q.answers[i] === question.c, ms }));
    const pct = q.score / q.questions.length;
    Track.log(pct >= 0.8 ? 'quiz_completed' : 'quiz_failed', { id: q.quizId, pct: Math.round(pct * 100) });
    if (q.type === 'internal' && pct >= 0.8) Track.log('certification_passed', { id: q.refId });
  });
  wrap(Views, 'fcGrade', (g) => Track.log('flashcard_repeated', { grade: g }));
  wrap(Roleplay, 'start', (cid) => Track.log('simulation_started', { kind: 'roleplay', cid }));
  wrap(Cases, 'start', (id) => Track.log('simulation_started', { kind: 'case', id }));
  wrap(Auditor, 'runGbpAudit', null, () => Track.log('audit_created', { type: 'gbp' }));
  wrap(Auditor, 'buildReport', (a) => Track.log('report_exported', { type: a?.type }));
  wrap(Views, 'mentorSend', () => Track.log('mentor_used', {}));
  wrap(ErrLog, 'log', (kind, message) => { if (kind === 'content-report') Track.log('error_reported', { message: String(message).slice(0, 100) }); });
  const origWeb = Auditor.runWebAudit.bind(Auditor);
  Auditor.runWebAudit = async (url) => { const r = await origWeb(url); Track.log('audit_created', { type: 'web' }); return r; };
})();

/* ══ 3) ONBOARDING DIAGNOSTIKA ══
   Nový používateľ nezačína slepo od lekcie 1: cieľ → skúsenosti →
   vstupný test (12 otázok, 4 z každého modulu) → baseline per modul
   → odporúčaná študijná cesta na dashboarde. */
const Onboard = {
  test: null,
  maybeShow() {
    if (App.state.onboarding || Object.keys(App.state.completedLessons).length > 3) return;
    this.stepGoal();
  },
  stepGoal() {
    App.modal(`
      <div class="text-center mb-4"><div class="text-3xl mb-1">👋</div>
      <h3 class="font-bold text-lg text-zinc-900 dark:text-white">Vitaj! Nastavme ti študijnú cestu</h3>
      <p class="text-xs text-zinc-500">2 otázky + krátky vstupný test (12 otázok) — potom presne uvidíš, kde začať.</p></div>
      <label class="text-xs font-semibold text-zinc-500">Aký je tvoj cieľ?</label>
      <div class="grid gap-1.5 mt-1 mb-3">
        ${[['agency', '💼 Zamestnať sa v agentúre'], ['freelance', '🚀 Vlastní klienti / freelancing'], ['own', '🏪 Marketing pre vlastnú firmu'], ['cert', '🎓 Hlavne certifikácie']].map(([v, t]) =>
          `<label class="flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-700 px-3 py-2 text-sm cursor-pointer has-[:checked]:border-indigo-500"><input type="radio" name="ob-goal" value="${v}" class="accent-indigo-500">${t}</label>`).join('')}
      </div>
      <label class="text-xs font-semibold text-zinc-500">Skúsenosti s Google marketingom?</label>
      <div class="grid gap-1.5 mt-1 mb-4">
        ${[['none', '🌱 Úplný začiatočník'], ['some', '🌿 Niečo som už skúšal(a)'], ['pro', '🌳 Pracujem s tým, chcem sa zlepšiť']].map(([v, t]) =>
          `<label class="flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-700 px-3 py-2 text-sm cursor-pointer has-[:checked]:border-indigo-500"><input type="radio" name="ob-exp" value="${v}" class="accent-indigo-500">${t}</label>`).join('')}
      </div>
      <button onclick="Onboard.stepTest()" class="btn-press w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold">Pokračovať na vstupný test →</button>
      <button onclick="Onboard.skip()" class="w-full text-center text-xs text-zinc-500 hover:text-indigo-400 mt-2">Preskočiť diagnostiku</button>`, false);
  },
  stepTest() {
    const goal = document.querySelector('input[name="ob-goal"]:checked')?.value || 'freelance';
    const exp = document.querySelector('input[name="ob-exp"]:checked')?.value || 'none';
    // 4 otázky z každého modulu (z prvých sekcií — reprezentatívne základy)
    const qs = DATA.modules.flatMap(m => App.sample(m.sections[0].lessons.flatMap(l => l.quiz.map((q, i) => ({ ...q, mod: m.id, src: l.id + ':' + i }))), 4));
    this.test = { goal, exp, qs, idx: 0, answers: [] };
    this.renderQ();
  },
  renderQ() {
    const t = this.test;
    if (t.idx >= t.qs.length) { this.finish(); return; }
    const q = t.qs[t.idx];
    App.modal(`
      <div class="text-xs text-zinc-500 mb-2">Vstupný test · otázka ${t.idx + 1}/${t.qs.length} · ${App.getModule(q.mod).short}</div>
      ${Views.progressBar((t.idx + 1) / t.qs.length * 100, 'from-indigo-500 to-violet-500', 'h-1.5')}
      <div class="font-semibold text-zinc-900 dark:text-white my-4">${q.q}</div>
      <div class="space-y-2">${q.o.map((o, i) => `<button onclick="Onboard.answer(${i})" class="btn-press w-full text-left px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-indigo-400 text-sm"><b class="text-zinc-400 mr-1">${'ABCD'[i]}</b> ${o}</button>`).join('')}</div>
      <p class="text-[11px] text-zinc-500 mt-3">Netipuj nasilu — „neviem" je cenná informácia pre tvoju cestu. Výsledok nič neblokuje.</p>`, false);
  },
  answer(i) { this.test.answers.push(i); this.test.idx++; this.renderQ(); },
  finish() {
    const t = this.test;
    const base = {};
    DATA.modules.forEach(m => {
      const idx = t.qs.map((q, i) => ({ q, i })).filter(x => x.q.mod === m.id);
      const ok = idx.filter(x => t.answers[x.i] === x.q.c).length;
      base[m.id] = Math.round(ok / idx.length * 100);
    });
    // Odporúčaná cesta: moduly od najslabšieho, prvé sekcie
    const order = [...DATA.modules].sort((a, b) => base[a.id] - base[b.id]);
    const path = order.flatMap(m => m.sections.slice(0, 2).map(s => ({ mod: m.id, title: s.title }))).slice(0, 6);
    App.state.onboarding = { goal: t.goal, exp: t.exp, base, path, date: Date.now() };
    App.save();
    Track.log('onboarding_completed', { base, goal: t.goal });
    App.modal(`
      <div class="text-center mb-4"><div class="text-3xl mb-1">🧭</div>
      <h3 class="font-bold text-lg text-zinc-900 dark:text-white">Tvoja diagnostika</h3></div>
      <div class="space-y-2 mb-4">${DATA.modules.map(m => `
        <div class="flex items-center gap-2 text-sm"><span class="w-40">${m.name}</span>
        <div class="flex-1 h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden"><div class="h-full rounded-full" style="background:${m.color};width:${base[m.id]}%"></div></div>
        <b class="w-10 text-right text-xs">${base[m.id]} %</b></div>`).join('')}</div>
      <div class="rounded-xl bg-indigo-500/10 border border-indigo-500/20 p-3 text-sm mb-4">
        <b class="text-indigo-400">Odporúčaná cesta:</b>
        <ol class="mt-1 text-xs space-y-0.5 list-decimal pl-4 text-zinc-700 dark:text-zinc-300">${path.map(p => `<li>${p.title} <span class="text-zinc-500">(${App.getModule(p.mod).short})</span></li>`).join('')}</ol>
      </div>
      <button onclick="App.closeModal();App.render()" class="btn-press w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold">Začať študovať</button>`, false);
  },
  skip() { App.state.onboarding = { skipped: true, date: Date.now() }; App.save(); App.closeModal(); },
};
/* Zobraz onboarding pri prvom otvorení dashboardu */
(() => {
  const orig = Views.afterRender.dashboard;
  Views.afterRender.dashboard = (p) => { if (orig) orig(p); setTimeout(() => Onboard.maybeShow(), 400); };
})();
/* Karta cesty na dashboarde (ak diagnostika prebehla) */
(() => {
  const orig = Views.dailyPlanCard;
  Views.dailyPlanCard = function () {
    let html = orig.call(this);
    const ob = App.state.onboarding;
    if (ob && ob.base) {
      html += `<div class="mt-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#131316] p-4">
        <div class="flex items-center justify-between text-xs">
          <span class="font-bold text-zinc-700 dark:text-zinc-300">🧭 Vstupná diagnostika: ${DATA.modules.map(m => m.short + ' ' + ob.base[m.id] + '%').join(' · ')}</span>
          <button onclick="delete App.state.onboarding;App.save();Onboard.maybeShow()" class="text-indigo-400 hover:underline">↻ zopakovať</button>
        </div></div>`;
    }
    return html;
  };
})();

/* ══ 4) CONFIDENCE SCORE PRE MASTERY ══
   Mastery číslo bez dôvery je zavádzajúce. Confidence low/med/high:
   podľa množstva odpovedí, čerstvosti, konzistencie a prítomnosti praxe. */
Engine.confidence = function (topic) {
  const s = App.state;
  let answers = 0, last = 0, results = [];
  topic.lessons.forEach(id => {
    const q = s.quizResults['lesson:' + id];
    if (q) { answers += q.total; last = Math.max(last, q.date || 0); results.push(q.score / q.total); }
    if (s.completedLessons[id]) last = Math.max(last, s.completedLessons[id]);
  });
  const practice = Object.values(s.projects).some(p => p.status === 'done') || (s.roleplaysDone || 0) > 0 || (s.cases || []).length > 0;
  const days = last ? (Date.now() - last) / 864e5 : 999;
  const variance = results.length > 1 ? Math.max(...results) - Math.min(...results) : 0;
  let score = 0;
  score += answers >= 15 ? 2 : answers >= 5 ? 1 : 0;       // dosť dát?
  score += days < 21 ? 2 : days < 60 ? 1 : 0;               // čerstvé?
  score += variance < 0.3 ? 1 : 0;                           // konzistentné?
  score += practice ? 2 : 0;                                 // overené praxou?
  return score >= 5 ? { key: 'high', label: 'vysoká istota', icon: '●●●' } : score >= 3 ? { key: 'med', label: 'stredná istota', icon: '●●○' } : { key: 'low', label: 'nízka istota', icon: '●○○' };
};
/* Mastery váhy nastaviteľné per modul (kalibrácia váh je hypotéza —
   teoretické témy majú miernejší strop bez praxe) */
Engine.masteryCaps = { gbp: 70, gsc: 75, ads: 65 };
(() => {
  const orig = Engine.mastery.bind(Engine);
  Engine.mastery = function (topic) {
    let m = orig(topic);
    // uvoľni strop podľa modulu (orig má fix 70)
    if (m === 70) m = Math.min(this.masteryCaps[topic.mod] ?? 70, 100);
    return m;
  };
})();
/* Heatmapa: doplň confidence */
(() => {
  const orig = Views.heatmapHTML;
  Views.heatmapHTML = function () {
    let html = orig.call(this);
    const weak = Engine.knowledge().filter(k => k.m > 0);
    if (!weak.length) return html;
    const lows = weak.filter(k => Engine.confidence(k).key === 'low').length;
    return html.replace('</div>\n  </div>', `</div>
    <p class="text-[11px] text-zinc-500 mt-3">🎯 Istota odhadov: pri ${lows} z ${weak.length} rozpracovaných tém je <b>nízka</b> (málo odpovedí, žiadna prax alebo staré výsledky) — mastery ber s rezervou, kým nepridáš prax.</p>
  </div>`);
  };
})();

/* ══ 5) OBSAHOVÉ STATUSY ══ */
DATA.contentStatuses = ['AI generated', 'Draft', 'Human reviewed', 'Expert reviewed', 'Needs update', 'Deprecated'];
DATA.defaultContentStatus = 'AI generated'; // poctivý default — obsah vytvorila AI, revízie robí admin
/* Status sa ukladá do lesson override (data.status) — editor ho ponúka,
   lekcia ho zobrazuje. */
(() => {
  const origApply = Content.apply.bind(Content);
  Content.apply = function () {
    origApply();
    Object.entries(this.overrides).forEach(([id, row]) => {
      const d = row.data || row;
      if (id.startsWith('lesson:') && d.status) {
        const l = this.origLesson(id.slice(7));
        if (l) l._status = d.status;
      }
    });
    App._all = null;
  };
  const origLessonView = Views.lesson;
  Views.lesson = function (params) {
    const l = App.getLesson(params.id);
    const st = l._status || DATA.defaultContentStatus;
    const colors = { 'Expert reviewed': '#10b981', 'Human reviewed': '#3b82f6', 'AI generated': '#a1a1aa', 'Draft': '#a1a1aa', 'Needs update': '#f59e0b', 'Deprecated': '#ef4444' };
    return origLessonView.call(this, params).replace('📄 Obsah v', `<span class="chip" style="background:${colors[st]}22;color:${colors[st]}">${st}</span> 📄 Obsah v`);
  };
})();

/* ══ 6) EXPORT / OBNOVA / VYMAZANIE PROGRESU ══ */
const Backup = {
  export() {
    const blob = new Blob([JSON.stringify({ exported: new Date().toISOString(), app: 'g-academy', state: App.state }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'g-academy-zaloha-' + App.todayKey() + '.json';
    a.click();
    Track.log('report_exported', { type: 'backup' });
    App.toast('💾 Záloha stiahnutá', 'ulož si súbor na bezpečné miesto', '');
  },
  import(file) {
    const r = new FileReader();
    r.onload = () => {
      try {
        const d = JSON.parse(r.result);
        if (!d.state || d.app !== 'g-academy') throw new Error('Neplatný súbor zálohy.');
        if (!confirm(`Obnoviť progres zo zálohy z ${d.exported?.slice(0, 10)}? Aktuálny stav (${App.state.xp} XP) bude nahradený (${d.state.xp} XP).`)) return;
        App.state = Object.assign(App.defaultState(), d.state);
        App.save();
        if (Auth.syncNow) Auth.syncNow();
        location.reload();
      } catch (e) { App.toast('⚠️ Obnova zlyhala', e.message, ''); }
    };
    r.readAsText(file);
  },
  async wipe() {
    if (!confirm('Naozaj VYMAZAŤ všetok progres? Toto sa nedá vrátiť (odporúčame najprv export).')) return;
    if (!confirm('Posledné potvrdenie — zmazať XP, lekcie, testy, certifikácie aj históriu?')) return;
    if (Auth.sb && Auth.user) { try { await Auth.sb.from('progress').delete().eq('user_id', Auth.user.id); } catch (e) {} }
    localStorage.removeItem(App.KEY);
    Track.log('account_data_wiped', {});
    location.reload();
  },
  ui() {
    App.modal(`
      <h3 class="font-bold text-lg text-zinc-900 dark:text-white mb-1">💾 Zálohovanie a dáta</h3>
      <p class="text-xs text-zinc-500 mb-4">Progres sa ukladá ${Auth.user ? 'k tvojmu účtu (cloud) aj lokálne' : 'lokálne v prehliadači'}. Manuálna záloha ťa chráni pred akoukoľvek stratou.</p>
      <div class="space-y-2">
        <button onclick="Backup.export()" class="btn-press w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold">⬇️ Exportovať progres (JSON)</button>
        <label class="btn-press block w-full py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-sm font-semibold text-center cursor-pointer hover:border-indigo-500">⬆️ Obnoviť zo zálohy<input type="file" accept=".json" class="hidden" onchange="Backup.import(this.files[0])"></label>
        <button onclick="Backup.wipe()" class="btn-press w-full py-2.5 rounded-xl border border-red-500/40 text-red-400 text-sm font-semibold hover:bg-red-500/10">🗑 Vymazať všetok progres a dáta</button>
      </div>`);
  },
};
/* Tlačidlo v sidebar footeri */
(() => {
  const orig = App.renderNav.bind(App);
  App.renderNav = function () {
    orig();
    const f = document.getElementById('sidebar-footer');
    if (f && !f.querySelector('.backup-btn')) {
      f.insertAdjacentHTML('beforeend', `<button onclick="Backup.ui()" class="backup-btn mt-2 w-full text-[10px] text-zinc-500 hover:text-indigo-400 text-left">💾 Zálohovanie a dáta</button>`);
    }
  };
})();

/* ══ 7) VALIDAČNÁ VRSTVA ADMIN EDITORA ══
   Uloženie otázky/lekcie prejde kontrolami — editor nie je len
   textové pole, chráni konzistenciu obsahu. */
const Validate = {
  question(d) {
    const errs = [];
    if (!d.q || d.q.length < 10) errs.push('Otázka je príliš krátka.');
    if (!Array.isArray(d.o) || d.o.length !== 4) errs.push('Musia existovať presne 4 možnosti.');
    if (d.o.some(o => !o || o.length < 1)) errs.push('Žiadna možnosť nesmie byť prázdna.');
    const norm = d.o.map(o => (o || '').toLowerCase().trim());
    if (new Set(norm).size !== norm.length) errs.push('Dve možnosti sú identické.');
    if (typeof d.c !== 'number' || d.c < 0 || d.c > 3) errs.push('Neplatný index správnej odpovede.');
    if (!d.e || d.e.length < 15) errs.push('Vysvetlenie chýba alebo je príliš krátke (min. 15 znakov).');
    // mäkká kontrola: vysvetlenie by malo súvisieť so správnou odpoveďou
    if (d.e && d.o[d.c]) {
      const key = norm[d.c].split(/\s+/).filter(w => w.length > 5);
      if (key.length && !key.some(w => d.e.toLowerCase().includes(w.slice(0, 6)))) errs.push('⚠️ Upozornenie: vysvetlenie zrejme neodkazuje na správnu odpoveď — skontroluj súlad.');
    }
    return errs;
  },
  lesson(d) {
    const errs = [];
    if (!d.title || d.title.length < 5) errs.push('Názov je príliš krátky.');
    if (!d.theory || d.theory.replace(/<[^>]+>/g, '').length < 100) errs.push('Teória je príliš krátka (min. 100 znakov textu).');
    if (!Array.isArray(d.checklist) || d.checklist.length < 2) errs.push('Checklist musí mať aspoň 2 položky.');
    if (/<script/i.test(d.theory || '')) errs.push('Teória nesmie obsahovať <script> značky.');
    return errs;
  },
};
(() => {
  const origQ = Views.adminSaveQuestion;
  Views.adminSaveQuestion = async function (lid, i) {
    const l = App.getLesson(lid);
    const c = +([...document.getElementsByName('edq-c-' + i)].find(r => r.checked)?.value ?? l.quiz[i].c);
    const d = {
      q: document.getElementById('edq-q-' + i).value.trim(),
      o: l.quiz[i].o.map((_, oi) => document.getElementById(`edq-o-${i}-${oi}`).value.trim()),
      c, e: document.getElementById('edq-e-' + i).value.trim(),
    };
    const errs = Validate.question(d);
    const hard = errs.filter(e => !e.startsWith('⚠️'));
    if (hard.length) { App.toast('❌ Validácia zlyhala', hard[0], ''); return; }
    if (errs.length && !confirm(errs.join('\n') + '\n\nUložiť napriek upozorneniu?')) return;
    await origQ.call(this, lid, i);
  };
  const origL = Views.adminSaveLesson;
  Views.adminSaveLesson = async function (lid) {
    const d = {
      title: document.getElementById('ed-title').value.trim(),
      theory: document.getElementById('ed-theory').value,
      checklist: document.getElementById('ed-check').value.split('\n').map(s => s.trim()).filter(Boolean),
    };
    const errs = Validate.lesson(d);
    if (errs.length) { App.toast('❌ Validácia zlyhala', errs[0], ''); return; }
    // status obsahu z dropdownu (ak existuje)
    const status = document.getElementById('ed-status')?.value;
    await Content.save('lesson:' + lid, {
      title: d.title,
      min: +document.getElementById('ed-min').value || undefined,
      theory: d.theory, checklist: d.checklist,
      outdated: document.getElementById('ed-outdated').checked,
      status: status || undefined,
    }, document.getElementById('ed-note').value.trim());
  };
  /* Do editora pridaj dropdown statusu */
  const origEdit = Views.adminEditLesson;
  Views.adminEditLesson = function (lid) {
    origEdit.call(this, lid);
    if (!lid) return;
    const l = App.getLesson(lid);
    const chk = document.getElementById('ed-outdated');
    if (chk && !document.getElementById('ed-status')) {
      chk.closest('div').insertAdjacentHTML('beforebegin', `
        <div><label class="text-[10px] font-bold text-zinc-500">STAV OBSAHU</label>
        <select id="ed-status" class="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-[#131316] px-3 py-2 text-sm">
          ${DATA.contentStatuses.map(s => `<option ${(l._status || DATA.defaultContentStatus) === s ? 'selected' : ''}>${s}</option>`).join('')}
        </select></div>`);
    }
  };
})();

/* ══ 8) ADMIN: ANALYTIKA UČENIA + PROBLÉMOVÉ OTÁZKY + ANOMÁLIE ══ */
(() => {
  const orig = Views.admin;
  Views.admin = function () {
    return orig.call(this) + `
      <div class="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#131316] p-5 mt-4">
        <h3 class="font-bold text-sm text-zinc-900 dark:text-white mb-2">📊 Produktová analytika</h3>
        <div id="admin-analytics" class="text-xs text-zinc-500">Načítavam…</div>
      </div>
      <div class="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#131316] p-5 mt-4">
        <h3 class="font-bold text-sm text-zinc-900 dark:text-white mb-2">🚩 Problémové otázky (na revíziu)</h3>
        <div id="admin-flagged" class="text-xs text-zinc-500"></div>
      </div>`;
  };
  const origAfter = Views.afterRender.admin;
  Views.afterRender.admin = async function () {
    if (origAfter) await origAfter();
    /* Problémové otázky: lokálne štatistiky + (online) agregát z events */
    let flagged = QStats.flagged();
    if (Auth.sb && Auth.isAdmin()) {
      try {
        const { data } = await Auth.sb.from('events').select('props').eq('name', 'question_answered').limit(5000);
        if (data && data.length) {
          const agg = {};
          data.forEach(e => { const s = e.props?.src; if (!s) return; agg[s] = agg[s] || { n: 0, ok: 0, chg: 0, ms: 0 }; agg[s].n++; if (e.props.correct) agg[s].ok++; });
          QStats.data = Object.assign({}, QStats.data, agg);
          flagged = QStats.flagged();
        }
      } catch (e) {}
    }
    const fEl = document.getElementById('admin-flagged');
    if (fEl) fEl.innerHTML = flagged.length ? flagged.slice(0, 12).map(f => `
      <div class="py-2 border-b border-zinc-100 dark:border-zinc-800/60 last:border-0">
        <div class="flex gap-2"><b class="shrink-0" style="color:${f.rate < 30 ? '#ef4444' : '#f59e0b'}">${f.rate} %</b>
        <span class="flex-1">${f.q.slice(0, 90)}… <span class="text-zinc-500">(${f.lesson}, n=${f.n})</span></span></div>
        <div class="text-[10px] text-amber-500 mt-0.5">${f.flags.join(' · ')}</div>
      </div>`).join('') : 'Zatiaľ žiadne otázky s dostatkom dát (min. 5 odpovedí) mimo noriem. Dáta sa zbierajú automaticky z testov.';
    /* Analytika: udalosti + retencia + anomálie */
    const aEl = document.getElementById('admin-analytics');
    if (!aEl) return;
    if (Auth.sb && Auth.isAdmin()) {
      try {
        const since = new Date(Date.now() - 30 * 864e5).toISOString();
        const { data: evs } = await Auth.sb.from('events').select('name,user_id,created_at').gte('created_at', since).limit(5000);
        const { data: prog } = await Auth.sb.from('progress').select('user_id,xp,updated_at');
        const byName = {};
        (evs || []).forEach(e => byName[e.name] = (byName[e.name] || 0) + 1);
        const users = new Set((evs || []).map(e => e.user_id));
        // anomálie: XP bez zodpovedajúcej aktivity v eventoch
        const activity = {};
        (evs || []).forEach(e => activity[e.user_id] = (activity[e.user_id] || 0) + 1);
        const anomalies = (prog || []).filter(p => p.xp > 500 && (activity[p.user_id] || 0) < 5);
        aEl.innerHTML = `
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
            ${[['lesson_completed', 'Dokončené lekcie'], ['quiz_completed', 'Úspešné testy'], ['quiz_failed', 'Neúspešné testy'], ['simulation_started', 'Simulácie'], ['audit_created', 'Audity'], ['mentor_used', 'AI mentor'], ['report_exported', 'Exporty'], ['error_reported', 'Hlásenia']].map(([k, n]) =>
              `<div class="rounded-xl border border-zinc-200 dark:border-zinc-800 p-2 text-center"><b class="text-lg block text-zinc-900 dark:text-white">${byName[k] || 0}</b>${n}</div>`).join('')}
          </div>
          <div>Aktívni používatelia (30 dní): <b>${users.size}</b> · celkovo eventov: <b>${(evs || []).length}</b></div>
          ${anomalies.length ? `<div class="mt-2 rounded-xl bg-red-500/10 border border-red-500/20 p-2.5"><b class="text-red-400">⚠️ Anomálie XP (${anomalies.length}):</b> používatelia s vysokým XP bez zodpovedajúcej aktivity v eventoch — možná manipulácia stavu. Detaily v tabuľke progress vs. events.</div>` : '<div class="mt-2 text-emerald-500">✓ Žiadne XP anomálie.</div>'}`;
      } catch (e) { aEl.innerHTML = 'Analytika vyžaduje spustený supabase-setup-3.sql (tabuľka events).'; }
    } else {
      const byName = {};
      Track.buffer.forEach(e => byName[e.name] = (byName[e.name] || 0) + 1);
      aEl.innerHTML = 'Lokálny režim — vlastné eventy: ' + (Object.entries(byName).map(([k, v]) => `${k}: <b>${v}</b>`).join(' · ') || 'zatiaľ žiadne');
    }
  };
})();
</script>
