<script>
/* ═══════════════════════════════════════════════════════════════════
   LEARNING v2 — adaptívny mastery algoritmus, bezpečná AI proxy,
   časovo obmedzené praktické prípady, história auditov
   ═══════════════════════════════════════════════════════════════════ */

/* ── MASTERY v2 ──────────────────────────────────────────────────
   Vážený vzorec (podľa produktovej špecifikácie):
     30 % testové otázky · 20 % spaced repetition · 25 % praktické
     úlohy · 15 % simulácie · 10 % časová stabilita vedomostí
   Poistka: bez praxe a simulácií je mastery zastropované na 70 % —
   „náhodne trafených 10 otázok" nikdy neznamená 100 %. */
Engine.masteryV2 = true;
Engine.mastery = function (topic) {
  const s = App.state;
  /* 1) Testy (30 %): dokončené lekcie + najlepšie kvízy tém */
  let doneL = 0, quizSum = 0, quizN = 0, lastActivity = 0;
  topic.lessons.forEach(id => {
    if (s.completedLessons[id]) { doneL++; lastActivity = Math.max(lastActivity, s.completedLessons[id]); }
    const q = s.quizResults['lesson:' + id];
    if (q) { quizSum += q.score / q.total; quizN++; lastActivity = Math.max(lastActivity, q.date || 0); }
  });
  const tests = (doneL / topic.lessons.length * 0.4 + (quizN ? quizSum / quizN : 0) * 0.6);

  /* 2) Spaced repetition (20 %): kartičky modulu témy */
  const modCards = DATA.flashcards.filter(c => c.mod === topic.mod);
  const sr = modCards.length ? modCards.reduce((a, c) => {
    const st = s.flashcards[c.id];
    return a + (st && st.reps > 0 ? Math.min(1, st.reps / 3 * (st.ease / 2.5)) : 0);
  }, 0) / modCards.length : 0;

  /* 3) Praktické úlohy (25 %): projekty modulu + audity (pre GBP/GSC témy) */
  const modProjects = DATA.projects.filter(p => p.module === topic.mod);
  const projDone = modProjects.filter(p => (s.projects[p.id] || {}).status === 'done').length;
  const auditBonus = (s.audits || []).some(a => (topic.mod === 'gsc' && a.type === 'web') || (topic.mod === 'gbp' && a.type === 'gbp')) ? 0.3 : 0;
  const practical = Math.min(1, (modProjects.length ? projDone / modProjects.length : 0) + auditBonus);

  /* 4) Simulácie (15 %): roleplay + master projekty + časové prípady */
  const masterScores = Object.values(s.master || {}).filter(m => m.done);
  const masterAvg = masterScores.length ? masterScores.reduce((a, m) => a + m.score / 10, 0) / masterScores.length : 0;
  const casesDone = (s.cases || []).filter(c => c.mod === topic.mod);
  const caseAvg = casesDone.length ? casesDone.reduce((a, c) => a + c.pct / 100, 0) / casesDone.length : 0;
  const sims = Math.min(1, (s.roleplaysDone || 0) * 0.12 + masterAvg * 0.5 + caseAvg * 0.5);

  /* 5) Časová stabilita (10 %): čerstvosť poslednej aktivity v téme */
  const days = lastActivity ? (Date.now() - lastActivity) / 864e5 : 999;
  const stability = lastActivity ? Math.max(0, 1 - days / 60) : 0;

  let m = (tests * 30 + sr * 20 + practical * 25 + sims * 15 + stability * 10);
  /* Poistka: len teória bez praxe/simulácií = strop 70 % */
  if (practical === 0 && sims === 0) m = Math.min(m, 70);
  return Math.round(Math.min(100, m));
};

/* ── BEZPEČNÁ AI PROXY (Supabase Edge Function) ──────────────────
   API kľúč žije na serveri. Klient volá funkciu s JWT prihláseného
   používateľa. Lokálny kľúč zostáva len ako experimentálny fallback. */
Auth.aiProxyAvailable = function () { return !!(this.sb && this.user); };
Auth.aiProxy = async function (message, system) {
  const { data: { session } } = await this.sb.auth.getSession();
  const r = await fetch(GACADEMY_CONFIG.SUPABASE_URL + '/functions/v1/ai-mentor', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'authorization': 'Bearer ' + session.access_token },
    body: JSON.stringify({ message, system }),
  });
  const d = await r.json();
  if (d.error) throw new Error(d.error);
  return d.text;
};

/* Mentor: nová priorita — 1) serverová proxy, 2) lokálny kľúč
   (experiment s upozornením), 3) offline engine */
Views.mentorSend = async function () {
  const input = document.getElementById('mentor-input');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  this.mentorPush('user', this.esc(text));
  const sys = `Študent: progres ${App.overallProgress()} %, level ${App.level().name}, moduly: ${DATA.modules.map(m => m.short + ':' + App.moduleProgress(m.id) + '%').join(', ')}. Najslabšie témy: ${Engine.weakest(3).map(w => w.name + ' ' + w.m + '%').join(', ') || 'zatiaľ žiadne dáta'}.`;
  if (Auth.aiProxyAvailable()) {
    this.mentorPush('ai', '<span class="opacity-60">Premýšľam…</span>');
    try {
      const reply = await Auth.aiProxy(text, sys);
      App.state.mentorHistory.pop();
      this.mentorPush('ai', this.esc(reply).replace(/\n/g, '<br>'));
    } catch (e) {
      App.state.mentorHistory.pop();
      this.mentorPush('ai', `⚠️ AI proxy: ${this.esc(e.message)}<br>Prepínam na offline režim:<br><br>` + this.mentorEngine(text.toLowerCase(), text));
    }
    return;
  }
  if (App.state.apiKey) {
    this.mentorPush('ai', '<span class="opacity-60">Premýšľam…</span>');
    const reply = await this.mentorAPI(text);
    App.state.mentorHistory.pop();
    this.mentorPush('ai', reply);
    return;
  }
  setTimeout(() => this.mentorPush('ai', this.mentorEngine(text.toLowerCase(), text)), 350);
};
/* Statusová linka mentora: zobraz proxy stav */
(() => {
  const orig = Views.mentor;
  Views.mentor = function () {
    let html = orig.call(this);
    if (Auth.aiProxyAvailable()) html = html.replace(/🟢 Prepojený s API[^<]*|🟡 Offline režim[^<]*/, '🟢 AI mentor cez zabezpečenú proxy (denný limit 40 správ)');
    return html;
  };
})();

/* ── ČASOVO OBMEDZENÉ PRAKTICKÉ PRÍPADY ──────────────────────────
   „Máš 15 minút, konverzie klesli o 40 %…" — vyber 5 krokov
   v správnom poradí. Hodnotí sa výber, poradie, čas a škodlivé
   zásahy. Bližšie k reálnej práci než ABCD otázky. */
DATA.cases = [
  { id: 'case-ads-conv', mod: 'ads', limit: 900, title: 'Prepad konverzií o 40 %',
    scenario: 'Klientovi (e-shop) klesli konverzie z Google Ads o 40 % týždeň-na-týždeň. Útrata beží normálne. Vyber prvých 5 krokov v poradí, v akom ich urobíš.',
    bestFirst: 0,
    steps: [
      ['Otestovať konverzné meranie (Tag Assistant, testovací nákup)', 2],
      ['Skontrolovať funkčnosť webu a checkout procesu', 2],
      ['Porovnať obdobia: celý účet vs. kampane — kde presne prepad vznikol', 2],
      ['Pozrieť Auction Insights — nový konkurent / zmeny CPC', 1],
      ['Overiť sezónnosť medziročne', 1],
      ['Skontrolovať nedávne zmeny v účte (história zmien)', 1],
      ['Okamžite zdvojnásobiť rozpočet na kompenzáciu', -1],
      ['Prepnúť všetky kampane na manuálne CPC', -1],
      ['Vypnúť všetky kampane, kým sa to nevyrieši', -1],
      ['Prepísať všetky reklamné texty', 0]]},
  { id: 'case-gsc-deindex', mod: 'gsc', limit: 900, title: 'Stránky vypadli z indexu',
    scenario: 'Po piatkovom nasadení novej verzie webu začali stránky miznúť z indexu. Je pondelok ráno. Vyber prvých 5 krokov.',
    bestFirst: 0,
    steps: [
      ['Skontrolovať robots.txt na produkcii (Disallow z testu?)', 2],
      ['Overiť meta robots noindex v šablónach novej verzie', 2],
      ['Skontrolovať canonicaly — neukazujú všetky na jednu URL?', 2],
      ['URL Inspection na vzorke vypadnutých stránok', 1],
      ['Porovnať URL štruktúru — zmenili sa adresy bez redirectov?', 1],
      ['Pozrieť Page indexing report — ktorý stav rastie', 1],
      ['Poslať sitemap znova a čakať', 0],
      ['Request indexing na 500 stránok ručne', -1],
      ['Kúpiť spätné odkazy na posilnenie', -1],
      ['Vrátiť starú verziu webu bez diagnostiky', 0]]},
  { id: 'case-gbp-suspend', mod: 'gbp', limit: 600, title: 'Profil suspendovaný',
    scenario: 'Klientov GBP profil (autoservis, 200 recenzií) dnes ráno zmizol z Maps — hard suspension. Klient panikári. Prvých 5 krokov?',
    bestFirst: 1,
    steps: [
      ['Upokojiť klienta: recenzie a dáta sa suspendáciou nemažú', 1],
      ['Zistiť príčinu: nedávne zmeny profilu (názov? adresa? kategórie?)', 2],
      ['Skontrolovať súlad profilu s pravidlami (názov = reálny názov…)', 2],
      ['Pripraviť doklady: živnostenský list, fotky prevádzky, faktúry', 2],
      ['Podať odvolanie (appeal) s dôkazmi', 1],
      ['Založiť okamžite nový profil', -2],
      ['Nakúpiť recenzie na podporu dôveryhodnosti', -2],
      ['Napísať nahnevaný príspevok na sociálne siete', -1],
      ['Spustiť Google Ads s location assets ako náhradu', 0],
      ['Počkať týždeň, či sa to samo nevráti', -1]]},
  { id: 'case-ads-cpc', mod: 'ads', limit: 600, title: 'CPC vzrástlo o 60 %',
    scenario: 'Priemerné CPC v hlavnej Search kampani vzrástlo za 2 týždne o 60 %, konverzný pomer je stabilný. Prvých 5 krokov?',
    bestFirst: 0,
    steps: [
      ['Auction Insights: vstúpil nový agresívny konkurent?', 2],
      ['Skontrolovať Quality Score komponenty hlavných slov', 2],
      ['Porovnať search terms — nezmenil sa mix dopytov?', 2],
      ['Overiť, či nebeží learning fáza po nejakej zmene', 1],
      ['Skontrolovať Impression Share a stratený IS (rank vs. budget)', 1],
      ['Prehodnotiť tCPA/tROAS cieľ vzhľadom na novú realitu aukcie', 1],
      ['Plošne znížiť bidy o 60 %', -1],
      ['Vypnúť smart bidding úplne', -1],
      ['Pridať 500 nových broad match slov', -1],
      ['Zmeniť fakturačné údaje', 0]]},
  { id: 'case-gsc-ctr', mod: 'gsc', limit: 600, title: 'CTR kleslo, pozície stabilné',
    scenario: 'Organické CTR webu kleslo o tretinu, priemerné pozície sa nezmenili. Prvých 5 krokov?',
    bestFirst: 2,
    steps: [
      ['Skontrolovať, či Google neprepisuje titles (SERP vzorka ručne)', 2],
      ['Overiť zmeny SERP layoutu — nové ads, AI Overviews, rich results konkurencie', 2],
      ['Segmentovať: ktoré stránky/dopyty CTR ťahajú dole (brand vs. non-brand)', 2],
      ['Porovnať obdobia v Performance reporte s rovnakou sezónou', 1],
      ['Skontrolovať stratu rich results (Enhancements reporty)', 1],
      ['Prepísať title/description na najzasiahnutejších stránkach', 1],
      ['Znížiť ceny produktov', 0],
      ['Vymeniť CMS', -1],
      ['Pridať viac stránok', 0],
      ['Nahlásiť Googlu chybu v CTR', -1]]},
  { id: 'case-gbp-reviews', mod: 'gbp', limit: 600, title: 'Vlna 1★ recenzií',
    scenario: 'Reštaurácia klienta dostala za noc 8 recenzií 1★ bez textu od profilov bez histórie. Priemer padol zo 4,7 na 3,9. Prvých 5 krokov?',
    bestFirst: 0,
    steps: [
      ['Zdokumentovať vzorec: čas, profily bez histórie, žiadny text (screenshoty)', 2],
      ['Nahlásiť každú recenziu (konflikt záujmov/spam) + Reviews Management Tool', 2],
      ['Profesionálne verejne odpovedať na recenzie s textom', 1],
      ['Zintenzívniť žiadanie recenzií od reálnych zákazníkov (rozriediť útok)', 2],
      ['Informovať klienta o postupe a časovom rámci riešenia', 1],
      ['Preveriť, či nejde o reálny incident v prevádzke', 1],
      ['Odpovedať útočne a obviniť konkurenciu menovite', -2],
      ['Kúpiť 20 recenzií 5★ na vyváženie', -2],
      ['Vypnúť zobrazovanie recenzií', -1],
      ['Zmeniť názov firmy', -1]]},
];

const Cases = {
  session: null, timer: null,
  start(id) {
    const c = DATA.cases.find(x => x.id === id);
    const shuffled = App.sample(c.steps.map((s, i) => ({ s, i })), c.steps.length);
    this.session = { c, shuffled, picked: [], startedAt: Date.now(), endsAt: Date.now() + c.limit * 1000 };
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      const el = document.getElementById('case-timer');
      if (!this.session) { clearInterval(this.timer); return; }
      // Zavretý modal (klik mimo) počas behu = prerušenie prípadu
      if (!el && Date.now() - this.session.startedAt > 3000) {
        Track.log('simulation_abandoned', { kind: 'case', id: this.session.c.id });
        this.session = null; clearInterval(this.timer);
        App.toast('⏹ Prípad prerušený', 'môžeš ho spustiť znova', '');
        return;
      }
      const left = Math.max(0, Math.round((this.session.endsAt - Date.now()) / 1000));
      if (el) { el.textContent = '⏱ ' + Math.floor(left / 60) + ':' + String(left % 60).padStart(2, '0'); el.className = left < 60 ? 'text-sm font-bold text-red-500' : 'text-sm font-bold text-zinc-500'; }
      if (left <= 0) { App.toast('⏱ Čas vypršal!', 'Vyhodnocujem doterajší výber', ''); this.finish(); }
    }, 1000);
    this.render();
  },
  render() {
    const s = this.session;
    App.modal(`
      <div class="flex items-center justify-between mb-2">
        <h3 class="font-bold text-zinc-900 dark:text-white">⏱ ${s.c.title}</h3>
        <span id="case-timer" class="text-sm font-bold text-zinc-500">⏱ …</span>
      </div>
      <p class="text-sm text-zinc-600 dark:text-zinc-400 rounded-xl bg-zinc-100 dark:bg-zinc-800/70 p-3 mb-3">${s.c.scenario}</p>
      <div class="text-xs text-zinc-500 mb-2">Vybrané kroky (${s.picked.length}/5) — poradie rozhoduje:</div>
      <div class="space-y-1 mb-3 min-h-[40px]">${s.picked.map((pi, n) => `
        <div class="flex items-center gap-2 text-xs rounded-lg bg-indigo-500/10 px-2.5 py-1.5"><b class="text-indigo-400">${n + 1}.</b> ${s.c.steps[pi][0]}
        <button onclick="Cases.unpick(${n})" class="ml-auto text-red-400">✕</button></div>`).join('')}</div>
      <div class="space-y-1.5">${s.shuffled.filter(x => !s.picked.includes(x.i)).map(x => `
        <button onclick="Cases.pick(${x.i})" ${s.picked.length >= 5 ? 'disabled' : ''} class="btn-press w-full text-left px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-indigo-500 text-xs transition ${s.picked.length >= 5 ? 'opacity-40' : ''}">${x.s[0]}</button>`).join('')}</div>
      <button onclick="Cases.finish()" ${s.picked.length < 5 ? 'disabled' : ''} class="btn-press w-full mt-4 py-3 rounded-xl font-semibold text-white ${s.picked.length < 5 ? 'bg-zinc-400 dark:bg-zinc-700' : 'bg-emerald-600 hover:bg-emerald-500'}">Odovzdať riešenie</button>
    `, true);
  },
  pick(i) { if (this.session.picked.length < 5) { this.session.picked.push(i); this.render(); } },
  unpick(n) { this.session.picked.splice(n, 1); this.render(); },
  finish() {
    const s = this.session;
    if (!s) return;
    clearInterval(this.timer);
    const c = s.c;
    const vals = s.picked.map(i => c.steps[i][1]);
    const raw = vals.reduce((a, b) => a + b, 0);
    const maxRaw = [...c.steps.map(x => x[1])].sort((a, b) => b - a).slice(0, 5).reduce((a, b) => a + b, 0);
    const orderBonus = s.picked[0] === c.bestFirst ? 1 : 0;
    const timeUsed = (Date.now() - s.startedAt) / 1000;
    const timeBonus = timeUsed < c.limit / 2 && raw > 0 ? 1 : 0;
    const harmful = s.picked.filter(i => c.steps[i][1] < 0);
    const pct = Math.max(0, Math.round((raw + orderBonus + timeBonus) / (maxRaw + 2) * 100));
    App.state.cases = App.state.cases || [];
    App.state.cases.push({ id: c.id, mod: c.mod, pct, date: Date.now() });
    App.save();
    App.addXP(20 + Math.round(pct / 2), 'Časový prípad: ' + c.title);
    const ideal = c.steps.map((st, i) => ({ st, i })).filter(x => x.st[1] === 2);
    this.session = null;
    App.modal(`
      <div class="text-center mb-3"><div class="text-4xl">${pct >= 75 ? '🏆' : pct >= 50 ? '👍' : '📚'}</div>
      <h3 class="font-bold text-lg text-zinc-900 dark:text-white">${c.title}: ${pct} %</h3>
      <div class="text-xs text-zinc-500">výber ${raw}/${maxRaw} b. · prvý krok ${orderBonus ? '✓ správny' : '✗ (+0)'} · čas ${timeBonus ? '✓ bonus' : Math.round(timeUsed / 60) + ' min'}</div></div>
      ${harmful.length ? `<div class="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-xs mb-3"><b class="text-red-400">⚠️ Škodlivé zásahy (${harmful.length}):</b> ${harmful.map(i => c.steps[i][0]).join(' · ')} — takéto kroky v praxi poškodzujú účet alebo profil klienta.</div>` : ''}
      <div class="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 text-xs mb-4">
        <b class="text-emerald-500">Referenčný postup seniora:</b>
        <ol class="mt-1 space-y-0.5 list-decimal pl-4">${ideal.map(x => `<li>${x.st[0]}</li>`).join('')}</ol>
      </div>
      <button onclick="App.closeModal();App.go('tests')" class="btn-press w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold">Zavrieť</button>`, true);
  },
};

/* Karta prípadov v sekcii Testy */
(() => {
  const orig = Views.tests;
  Views.tests = function () {
    const done = App.state.cases || [];
    const card = Views.card(`
      <h3 class="font-bold text-zinc-900 dark:text-white mb-1">⏱ Časové prípady (praktický tréning)</h3>
      <p class="text-sm text-zinc-500 mb-4">Reálna situácia, tikajúce hodiny, 5 krokov v správnom poradí. Hodnotí sa výber, poradie, čas aj škodlivé zásahy.</p>
      <div class="grid sm:grid-cols-2 gap-2">
        ${DATA.cases.map(c => {
          const best = done.filter(x => x.id === c.id).sort((a, b) => b.pct - a.pct)[0];
          const m = App.getModule(c.mod);
          return `<button onclick="Cases.start('${c.id}')" class="btn-press text-left px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/50 transition">
            <div class="flex items-center justify-between"><b class="text-sm">${c.title}</b>${best ? `<span class="text-xs font-bold" style="color:${best.pct >= 75 ? '#10b981' : '#f59e0b'}">${best.pct} %</span>` : ''}</div>
            <div class="text-[10px] text-zinc-500 mt-0.5">${m.short} · limit ${c.limit / 60} min</div>
          </button>`;
        }).join('')}
      </div>`);
    return orig.call(this) + `<div class="mt-4">${card}</div>`;
  };
})();

/* ── HISTÓRIA AUDITOV: porovnanie s predchádzajúcim behom ────────
   + rozlíšenie typov tvrdení (namerané dáta vs. odporúčania) */
(() => {
  const orig = Views.showAudit;
  Views.showAudit = function (i) {
    orig.call(this, i);
    const a = App.state.audits[i];
    const prev = App.state.audits.slice(i + 1).find(x => x.type === a.type && x.url === a.url);
    const el = document.getElementById('audit-result');
    if (!el) return;
    let extra = `<div class="text-[11px] text-zinc-500 mt-3 rounded-xl border border-zinc-200 dark:border-zinc-800 p-2.5">
      ℹ️ <b>Typy tvrdení v audite:</b> ${a.type === 'web' ? 'skóre a metriky = <b>namerané dáta</b> (Google Lighthouse/CrUX, čas merania: ' + new Date(a.date).toLocaleString('sk') + ')' : 'skóre = <b>zistenia z auditu</b> (vstup konzultanta)'};
      texty „Ako na to" a „Očakávaný prínos" = <b>odporúčania</b> na základe best practices.</div>`;
    if (prev) {
      const prevNames = new Set(prev.recs.map(r => r.name));
      const curNames = new Set(a.recs.map(r => r.name));
      const resolved = [...prevNames].filter(n => !curNames.has(n));
      const added = [...curNames].filter(n => !prevNames.has(n));
      const diff = a.overall - prev.overall;
      extra = `<div class="rounded-xl border-2 ${diff >= 0 ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-red-500/30 bg-red-500/5'} p-3 mt-3 text-sm">
        <b>📈 Porovnanie s auditom z ${new Date(prev.date).toLocaleDateString('sk')}:</b>
        <div class="grid grid-cols-4 gap-2 mt-2 text-center text-xs">
          <div><b class="text-lg block">${prev.overall}</b>predtým</div>
          <div><b class="text-lg block">${a.overall}</b>teraz</div>
          <div><b class="text-lg block ${diff >= 0 ? 'text-emerald-500' : 'text-red-400'}">${diff >= 0 ? '+' : ''}${diff}</b>zmena</div>
          <div><b class="text-lg block text-emerald-500">${resolved.length}</b>vyriešené</div>
        </div>
        ${resolved.length ? `<div class="text-xs mt-2 text-emerald-600 dark:text-emerald-400">✓ Vyriešené: ${resolved.slice(0, 4).join(' · ')}${resolved.length > 4 ? '…' : ''}</div>` : ''}
        ${added.length ? `<div class="text-xs mt-1 text-amber-600 dark:text-amber-500">+ Nové nálezy: ${added.slice(0, 3).join(' · ')}</div>` : ''}
      </div>` + extra;
    }
    el.querySelector('div').insertAdjacentHTML('beforeend', extra);
  };
})();
</script>
