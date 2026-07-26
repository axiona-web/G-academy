
  /* ════════ AI MENTOR — logika ════════
     Offline režim: rule-based engine nad znalostnou bázou kurzu
     (slovník, lekcie, kvízové otázky, štatistiky používateľa, scenáre).
     S API kľúčom: volanie Anthropic/OpenAI API priamo z prehliadača. */
  mentorSim: null,        // aktívna simulácia klienta {scenario, phase}
  mentorQuizState: null,  // mini test v chate {questions, idx, score}

  mentorQuick(cmd) {
    const input = document.getElementById('mentor-input');
    input.value = cmd;
    if (!cmd.endsWith(' ')) this.mentorSend();
    else input.focus();
  },
  mentorPush(role, html) {
    App.state.mentorHistory.push({ role, html, t: Date.now() });
    if (App.state.mentorHistory.length > 60) App.state.mentorHistory = App.state.mentorHistory.slice(-60);
    App.save();
    this.mentorRenderChat();
  },
  mentorRenderChat() {
    const box = document.getElementById('mentor-chat');
    if (!box) return;
    const hist = App.state.mentorHistory;
    box.innerHTML = (hist.length ? hist : [{ role: 'ai', html: 'Ahoj Martin! 👋 Som tvoj AI mentor. Skús: <b>vysvetli CTR</b>, <b>test gbp</b>, <b>simulácia</b>, <b>čo ďalej</b> — alebo sa pýtaj vlastnými slovami.' }])
      .map(m => m.role === 'user'
        ? `<div class="flex justify-end"><div class="max-w-[85%] rounded-2xl rounded-br-md bg-indigo-600 text-white px-4 py-2.5 text-sm">${m.html}</div></div>`
        : `<div class="flex"><div class="max-w-[85%] rounded-2xl rounded-bl-md bg-zinc-100 dark:bg-zinc-800/80 px-4 py-2.5 text-sm text-zinc-800 dark:text-zinc-200">${m.html}</div></div>`)
      .join('');
    box.scrollTop = box.scrollHeight;
  },
  async mentorSend() {
    const input = document.getElementById('mentor-input');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    this.mentorPush('user', this.esc(text));
    // API režim
    if (App.state.apiKey) {
      this.mentorPush('ai', '<span class="opacity-60">Premýšľam…</span>');
      const reply = await this.mentorAPI(text);
      App.state.mentorHistory.pop();
      this.mentorPush('ai', reply);
      return;
    }
    // Offline engine
    setTimeout(() => this.mentorPush('ai', this.mentorEngine(text.toLowerCase(), text)), 350);
  },
  esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; },

  /* ── Offline rule-based engine ── */
  mentorEngine(t, raw) {
    // 1) Aktívny mini test v chate?
    if (this.mentorQuizState) return this.mentorQuizAnswer(raw);
    // 2) Aktívna simulácia klienta?
    if (this.mentorSim) return this.mentorSimStep(t);

    // 3) Príkazy
    if (t.startsWith('vysvetli') || t.startsWith('čo je') || t.startsWith('co je')) {
      const term = raw.replace(/^(vysvetli|čo je|co je)\s*/i, '').replace(/[?.]/g, '').trim();
      return this.mentorExplain(term);
    }
    if (t.includes('simul') || t.includes('hraj klienta') || t.includes('rola klienta')) return this.mentorSimStart();
    if (t.startsWith('test') || t.includes('vygeneruj test') || t.includes('vyskúšaj ma')) {
      const mod = t.includes('gbp') || t.includes('business') ? 'gbp' : t.includes('gsc') || t.includes('console') ? 'gsc' : t.includes('ads') ? 'ads' : null;
      return this.mentorQuizStart(mod);
    }
    if (t.includes('čo ďalej') || t.includes('co dalej') || t.includes('ďalšie štúdium') || t.includes('odporuč')) return this.mentorNextSteps();
    if (t.includes('slabé') || t.includes('slabe') || t.includes('silné') || t.includes('silne')) return this.mentorStrengths();
    if (t.includes('príklad') || t.includes('priklad')) {
      const term = raw.replace(/.*(príklad|priklad)( na| k| pre)?\s*/i, '').replace(/[?.]/g, '').trim();
      return this.mentorExample(term);
    }
    if (t.includes('ahoj') || t.includes('čau') || t.includes('cau')) return 'Ahoj! 👋 Na čom dnes pracujeme? Skús <b>vysvetli [pojem]</b>, <b>test [modul]</b>, <b>simulácia</b> alebo <b>čo ďalej</b>.';

    // 4) Voľné hľadanie v znalostnej báze
    const found = this.mentorExplain(raw, true);
    if (found) return found;
    return `Na toto v offline režime nemám presnú odpoveď. Skús:<br>
      • <b>vysvetli [pojem]</b> — napr. „vysvetli ROAS"<br>
      • <b>príklad na [téma]</b><br>
      • <b>test gbp / gsc / ads</b> — mini test v chate<br>
      • <b>simulácia</b> — hrám klienta, ty konzultanta<br>
      • <b>čo ďalej</b> / <b>slabé stránky</b> — analýza tvojho progresu<br>
      💡 V nastaveniach (⚙️) môžeš pridať API kľúč pre plnohodnotné AI odpovede.`;
  },

  mentorExplain(term, silent) {
    if (!term) return 'Napíš, ktorý pojem mám vysvetliť — napr. „vysvetli quality score".';
    const tl = term.toLowerCase();
    // Slovník
    const g = DATA.glossary.find(x => x.term.toLowerCase().includes(tl) || tl.includes(x.term.toLowerCase().split(' ')[0]));
    if (g) return `<b>${g.term}</b><br>🟢 <b>Jednoducho:</b> ${g.simple}<br>🔵 <b>Technicky:</b> ${g.tech}<br><span class="text-xs opacity-70">Chceš príklad? Napíš „príklad na ${g.term}".</span>`;
    // Lekcie — hľadaj v názvoch
    const l = App.allLessons().find(x => x.title.toLowerCase().includes(tl));
    if (l) {
      const txt = l.theory.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 400);
      return `Tému <b>${l.title}</b> pokrýva lekcia v module ${App.getModule(l.moduleId).short}:<br><span class="text-xs">${txt}…</span><br><button onclick="App.go('lesson',{id:'${l.id}'})" class="mt-2 text-xs font-bold text-indigo-400 underline">Otvoriť celú lekciu →</button>`;
    }
    if (silent) return null;
    return `Pojem „${this.esc(term)}" som v znalostnej báze nenašiel. Skús iný výraz (napr. anglický termín) alebo pozri Slovník.`;
  },

  mentorExample(term) {
    const tl = (term || '').toLowerCase();
    const examples = {
      'roas': 'E-shop minie 1 000 € na PMax a kampane prinesú objednávky za 4 500 €. ROAS = 4500/1000 = <b>450 %</b>. Marža je 30 % → break-even ROAS = 1/0,3 ≈ 333 %. Kampaň je zisková (450 > 333), ale sleduj marginálny ROAS pri škálovaní.',
      'cpa': 'Kampaň minula 600 € a priniesla 20 vyplnených formulárov. CPA = 600/20 = <b>30 €/lead</b>. Ak sa 1 z 5 leadov stane zákazníkom s maržou 400 €, akvizícia zákazníka stojí 150 € — zdravé čísla.',
      'ctr': 'Reklama má 12 000 impresií a 480 klikov → CTR = 480/12000 = <b>4 %</b>. Pre brandové Search kampane je normál aj 20 %+, pre non-brand 3–8 %, pre Display ~0,5 %.',
      'quality score': 'Slovo [oprava práčky] má QS 4: expected CTR „average", ad relevance „below average", landing „average". Diagnóza → reklama neobsahuje frázu. Fix: nadpis „Oprava práčok do 24 h" + rozdelenie ad group. O 2 týždne QS 7 a CPC kleslo o 30 %.',
      'ad rank': 'A: bid 2 €, QS 9 → 18. B: bid 4 €, QS 3 → 12. A vyhráva a zaplatí ~12/9 + 0,01 ≈ <b>1,34 €</b> — menej než polovicu bidu inzerenta B.',
      'break-even': 'Marža 40 % → break-even ROAS = 1/0,4 = 250 %. Všetko nad 250 % tvorí zisk; cieľ tROAS nastav podľa pomeru rast vs. ziskovosť.',
      'canonical': 'E-shop má /topanky?sort=cena aj /topanky. Do oboch dáš <code>&lt;link rel="canonical" href="https://shop.sk/topanky"&gt;</code> — Google zlúči signály na hlavnú URL a index zostane čistý.',
      'soft 404': 'Kategória „Sandále" po sezóne zobrazuje „0 produktov" s kódom 200. GSC ju označí soft 404. Fix: skryť kategóriu (404/410), presmerovať na „Letná obuv" (301), alebo naplniť produktmi.',
      'nap': 'Firma má na webe „Hlavná 5, +421 900 111 222", ale v katalógu Azet starú adresu „Dlhá 12". Táto nekonzistencia oslabuje dôveru algoritmu — oprava citácií je súčasť lokálneho SEO balíka.',
      'local pack': 'Vyhľadaj „pizza Nitra": mapa + 3 firmy = Local Pack. Poradie: relevance (kategória Pizzeria), distance (blízko centra dopytu), prominence (recenzie 4,7★/300). Tvoja práca: dostať klienta do tejto trojky.',
      'remarketing': 'Návštevník si pozrie 3 modely tenisiek a odíde. Dynamický remarketing mu 5 dní ukazuje presne tieto modely s dopravou zdarma. Konverzný pomer takejto kampane býva 3–10× vyšší než studená akvizícia.',
      'match': 'Keyword [servis notebookov]: spustí sa na „servis notebookov", „oprava notebooku" (rovnaký zámer), ale nie na „servis bicyklov". "servis notebookov" (phrase) chytí aj „rýchly servis notebookov bratislava".',
    };
    for (const k in examples) if (tl.includes(k)) return `🧪 <b>Príklad — ${k.toUpperCase()}:</b><br>${examples[k]}`;
    // fallback: nájdi lekciu s príkladom
    const l = App.allLessons().find(x => x.title.toLowerCase().includes(tl) && x.theory.includes('class="ex"'));
    if (l) return `Praktickú ukážku k téme nájdeš priamo v lekcii <b>${l.title}</b> — <button onclick="App.go('lesson',{id:'${l.id}'})" class="text-indigo-400 underline text-xs font-bold">otvoriť →</button>`;
    return `Skús konkrétnejšie: „príklad na ROAS", „príklad na canonical", „príklad na quality score"…`;
  },

  /* Mini test v chate */
  mentorQuizStart(mod) {
    const pool = (mod ? App.moduleLessons(mod) : App.allLessons()).flatMap(l => l.quiz);
    this.mentorQuizState = { questions: App.sample(pool, 3), idx: 0, score: 0 };
    const q = this.mentorQuizState.questions[0];
    return `📝 <b>Mini test${mod ? ' — ' + App.getModule(mod).name : ''}</b> (3 otázky). Odpovedaj písmenom A–D.<br><br><b>1. ${q.q}</b><br>${q.o.map((o, i) => `${'ABCD'[i]}) ${o}`).join('<br>')}`;
  },
  mentorQuizAnswer(raw) {
    const st = this.mentorQuizState;
    const letter = raw.trim().toUpperCase()[0];
    const idx = 'ABCD'.indexOf(letter);
    if (idx < 0) return 'Odpovedz písmenom A, B, C alebo D (alebo napíš „koniec" pre ukončenie).';
    if (raw.toLowerCase().includes('koniec')) { this.mentorQuizState = null; return 'Test ukončený.'; }
    const q = st.questions[st.idx];
    const ok = idx === q.c;
    if (ok) st.score++;
    let out = ok ? `✅ Správne! ${q.e}` : `❌ Nesprávne. Správne je <b>${'ABCD'[q.c]}) ${q.o[q.c]}</b>.<br><span class="text-xs">${q.e}</span>`;
    st.idx++;
    if (st.idx < st.questions.length) {
      const n = st.questions[st.idx];
      out += `<br><br><b>${st.idx + 1}. ${n.q}</b><br>${n.o.map((o, i) => `${'ABCD'[i]}) ${o}`).join('<br>')}`;
    } else {
      out += `<br><br>🏁 <b>Výsledok: ${st.score}/${st.questions.length}</b> ${st.score === 3 ? '— výborne! 🎉' : st.score === 2 ? '— dobré, ešte kúsok.' : '— zopakuj si teóriu a skús znova.'}`;
      App.addXP(st.score * 10, 'Mentor test');
      this.mentorQuizState = null;
    }
    return out;
  },

  /* Simulácia klienta */
  mentorSimStart() {
    const sc = App.sample(DATA.clientScenarios, 1)[0];
    this.mentorSim = { sc, phase: 1 };
    return `🎭 <b>Simulácia klienta: ${sc.name}</b><br>Ja hrám klienta, ty si konzultant. Odpovedaj vlastnými slovami, vyhodnotím tvoj prístup.<br><br><i>„${sc.intro}"</i><br><br><span class="text-xs opacity-70">💡 Tip: ${sc.hints[0]}</span>`;
  },
  mentorSimStep(t) {
    const sim = this.mentorSim;
    const sc = sim.sc;
    if (t.includes('koniec')) { this.mentorSim = null; return 'Simulácia ukončená. Napíš „simulácia" pre novú.'; }
    const goods = sim.phase === 1 ? sc.good : sc.good2;
    const hits = goods.filter(g => t.includes(g)).length;
    const quality = hits >= 2 ? 'excelentná' : hits === 1 ? 'dobrá' : 'slabá';
    let feedback = hits >= 2
      ? `✅ <b>Hodnotenie odpovede: ${quality}.</b> Trafil si kľúčové body (${hits} z ${goods.length} sledovaných tém).`
      : hits === 1
        ? `🟡 <b>Hodnotenie: ${quality}.</b> Zachytil si časť podstaty, ale klientovi chýba viac konkrétnosti.`
        : `🔴 <b>Hodnotenie: ${quality}.</b> Odpoveď míňa podstatu. Skús zapracovať: ${(sim.phase === 1 ? sc.hints : sc.hints2).map(h => `<br>• ${h}`).join('')}`;
    if (sim.phase === 1) {
      sim.phase = 2;
      return `${feedback}<br><br><i>Klient reaguje: „${sc.reply}"</i><br><br><span class="text-xs opacity-70">💡 Tip: ${sc.hints2[0]}</span>`;
    }
    this.mentorSim = null;
    App.addXP(hits >= 2 ? 60 : hits === 1 ? 30 : 10, 'Simulácia klienta');
    return `${feedback}<br><br><i>${sc.end}</i>`;
  },

  /* Odporúčania podľa dát používateľa */
  mentorNextSteps() {
    const s = App.state;
    const next = App.allLessons().find(l => !s.completedLessons[l.id]);
    const weak = this.weakestModule();
    const due = App.fcDueCards().length;
    const readyCert = DATA.certs.filter(c => !(s.certs[c.id] || {}).done && App.certReadiness(c) >= 75)[0];
    let out = '🧭 <b>Odporúčania podľa tvojho progresu:</b><br>';
    if (next) out += `<br>1️⃣ Pokračuj lekciou <b>${next.title}</b> (${App.getModule(next.moduleId).short}) — <button onclick="App.go('lesson',{id:'${next.id}'})" class="text-indigo-400 underline text-xs font-bold">otvoriť →</button>`;
    if (weak) out += `<br>2️⃣ Najslabší modul v testoch: <b>${weak.name}</b> (${weak.pct} % úspešnosť) — daj si modulový test a zopakuj slabé lekcie.`;
    if (due) out += `<br>3️⃣ Máš <b>${due} kartičiek</b> na zopakovanie — 5 minút a pamäť sa poďakuje.`;
    if (readyCert) out += `<br>🎓 Si pripravený na certifikáciu <b>${readyCert.name}</b> (${App.certReadiness(readyCert)} %) — choď na Skillshop!`;
    if (!next && !due) out += '<br>🎉 Všetko hotové — čas na reálnych klientov a projekty!';
    return out;
  },
  weakestModule() {
    let worst = null;
    DATA.modules.forEach(m => {
      const tests = App.state.testHistory.filter(t => t.id.includes(m.id));
      if (!tests.length) return;
      const pct = Math.round(tests.reduce((a, t) => a + t.score / t.total, 0) / tests.length * 100);
      if (!worst || pct < worst.pct) worst = { name: m.name, pct };
    });
    return worst;
  },
  mentorStrengths() {
    const rows = DATA.modules.map(m => {
      const tests = App.state.testHistory.filter(t => t.id.includes(m.id));
      const pct = tests.length ? Math.round(tests.reduce((a, t) => a + t.score / t.total, 0) / tests.length * 100) : null;
      return { m, pct };
    });
    let out = '💪 <b>Analýza silných a slabých stránok</b> (priemerná úspešnosť testov):<br>';
    rows.forEach(r => {
      out += `<br>${r.m.short}: ${r.pct === null ? '— zatiaľ bez testov' : `<b>${r.pct} %</b> ${r.pct >= 80 ? '🟢 silná stránka' : r.pct >= 60 ? '🟡 priemer' : '🔴 slabá stránka — zopakuj teóriu'}`}`;
    });
    out += `<br><br>Progres lekcií: ${DATA.modules.map(m => `${m.short} ${App.moduleProgress(m.id)} %`).join(' · ')}`;
    return out;
  },

  /* ── API režim (voliteľný vlastný kľúč) ── */
  async mentorAPI(text) {
    const sys = `Si AI mentor vzdelávacej platformy G-Academy pre Google Business Profile, Search Console a Google Ads. Odpovedaj po slovensky, stručne a prakticky, s dôrazom na agentúrnu prax. Študent: ${JSON.stringify({ progres: App.overallProgress() + '%', level: App.level().name, moduly: DATA.modules.map(m => m.short + ':' + App.moduleProgress(m.id) + '%').join(',') })}`;
    try {
      if (App.state.apiProvider === 'anthropic') {
        const r = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'content-type': 'application/json', 'x-api-key': App.state.apiKey, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
          body: JSON.stringify({ model: 'claude-sonnet-4-5', max_tokens: 1024, system: sys, messages: [{ role: 'user', content: text }] }),
        });
        const d = await r.json();
        if (d.error) throw new Error(d.error.message);
        return this.esc(d.content[0].text).replace(/\n/g, '<br>');
      } else {
        const r = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: { 'content-type': 'application/json', 'authorization': 'Bearer ' + App.state.apiKey },
          body: JSON.stringify({ model: 'gpt-4o-mini', messages: [{ role: 'system', content: sys }, { role: 'user', content: text }] }),
        });
        const d = await r.json();
        if (d.error) throw new Error(d.error.message);
        return this.esc(d.choices[0].message.content).replace(/\n/g, '<br>');
      }
    } catch (e) {
      return `⚠️ API chyba: ${this.esc(e.message)}.<br>Prepínam na offline režim:<br><br>` + this.mentorEngine(text.toLowerCase(), text);
    }
  },
  mentorSettings() {
    App.modal(`
      <h3 class="font-bold text-lg text-zinc-900 dark:text-white mb-1">Nastavenia AI Mentora</h3>
      <p class="text-xs text-zinc-500 mb-2">Mentor funguje aj offline. Na verejnom webe s prihlásením beží AI cez <b>zabezpečenú serverovú proxy</b> (kľúč nikdy neopúšťa server).</p>
      <p class="text-xs rounded-xl bg-amber-500/10 border border-amber-500/20 p-2.5 mb-4 text-amber-600 dark:text-amber-500">⚠️ Vlastný kľúč nižšie je len <b>lokálna experimentálna funkcia</b> — ukladá sa do tvojho prehliadača a je z neho čitateľný. Nepoužívaj ho na zdieľanom počítači a nikdy nie kľúč, ktorý platí niekto iný.</p>
      <label class="text-xs font-semibold text-zinc-500">Poskytovateľ</label>
      <select id="api-provider" class="w-full mt-1 mb-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-[#131316] px-3 py-2.5 text-sm">
        <option value="anthropic" ${App.state.apiProvider === 'anthropic' ? 'selected' : ''}>Anthropic (Claude)</option>
        <option value="openai" ${App.state.apiProvider === 'openai' ? 'selected' : ''}>OpenAI (GPT)</option>
      </select>
      <label class="text-xs font-semibold text-zinc-500">API kľúč</label>
      <input id="api-key" type="password" value="${App.state.apiKey}" placeholder="sk-… / sk-ant-…"
        class="w-full mt-1 mb-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-indigo-500">
      <div class="flex gap-2">
        <button onclick="App.state.apiKey='';App.save();App.closeModal();App.render()" class="btn-press px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-sm font-semibold">Vymazať</button>
        <button onclick="App.state.apiKey=document.getElementById('api-key').value.trim();App.state.apiProvider=document.getElementById('api-provider').value;App.save();App.closeModal();App.render()"
          class="btn-press flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold">Uložiť</button>
      </div>`);
  },
};

/* ═══════════════ afterRender: grafy (Chart.js) a chat ═══════════════ */
Views.afterRender.mentor = () => Views.mentorRenderChat();

Views.afterRender.stats = () => {
  const dark = App.state.theme === 'dark';
  const grid = dark ? '#27272a' : '#e4e4e7';
  const tick = dark ? '#a1a1aa' : '#52525b';
  Chart.defaults.font.family = 'Inter, sans-serif';
  Chart.defaults.color = tick;

  /* Čas učenia — 14 dní */
  const days = [...Array(14)].map((_, i) => {
    const d = new Date(Date.now() - (13 - i) * 864e5);
    const k = d.toISOString().slice(0, 10);
    return { label: d.toLocaleDateString('sk', { day: 'numeric', month: 'numeric' }), min: App.state.timeLog[k] || 0 };
  });
  new Chart(document.getElementById('ch-time'), {
    type: 'bar',
    data: { labels: days.map(d => d.label), datasets: [{ label: 'minúty', data: days.map(d => d.min), backgroundColor: '#6366f1', borderRadius: 6 }] },
    options: { plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { grid: { color: grid }, beginAtZero: true } } },
  });

  /* Úspešnosť testov v čase */
  const tests = App.state.testHistory.slice(-15);
  new Chart(document.getElementById('ch-tests'), {
    type: 'line',
    data: {
      labels: tests.map(t => new Date(t.date).toLocaleDateString('sk', { day: 'numeric', month: 'numeric' })),
      datasets: [{ label: '%', data: tests.map(t => Math.round(t.score / t.total * 100)), borderColor: '#10b981', backgroundColor: '#10b98130', fill: true, tension: 0.35, pointRadius: 4 }],
    },
    options: { plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { grid: { color: grid }, min: 0, max: 100 } } },
  });

  /* Progres modulov */
  new Chart(document.getElementById('ch-modules'), {
    type: 'bar',
    data: {
      labels: DATA.modules.map(m => m.short),
      datasets: [{ data: DATA.modules.map(m => App.moduleProgress(m.id)), backgroundColor: DATA.modules.map(m => m.color), borderRadius: 8 }],
    },
    options: { indexAxis: 'y', plugins: { legend: { display: false } }, scales: { x: { grid: { color: grid }, min: 0, max: 100 }, y: { grid: { display: false } } } },
  });

  /* Radar: silné/slabé stránky */
  const radarData = DATA.modules.map(m => {
    const t = App.state.testHistory.filter(x => x.id.includes(m.id));
    return t.length ? Math.round(t.reduce((a, x) => a + x.score / x.total, 0) / t.length * 100) : 0;
  });
  new Chart(document.getElementById('ch-radar'), {
    type: 'radar',
    data: { labels: DATA.modules.map(m => m.short), datasets: [{ label: 'úspešnosť testov %', data: radarData, borderColor: '#a855f7', backgroundColor: '#a855f730', pointBackgroundColor: '#a855f7' }] },
    options: { plugins: { legend: { display: false } }, scales: { r: { grid: { color: grid }, angleLines: { color: grid }, min: 0, max: 100, ticks: { display: false } } } },
  });

  /* Splnené moduly + certifikácie (doughnut) */
  const modsDone = DATA.modules.filter(m => App.moduleProgress(m.id) >= 100).length;
  const certsDone = Object.values(App.state.certs).filter(c => c.done).length;
  new Chart(document.getElementById('ch-done'), {
    type: 'doughnut',
    data: {
      labels: ['Moduly hotové', 'Moduly zostáva', 'Certifikácie hotové', 'Certifikácie zostáva'],
      datasets: [
        { data: [modsDone, DATA.modules.length - modsDone], backgroundColor: ['#10b981', dark ? '#27272a' : '#e4e4e7'], circumference: 180, rotation: 270 },
        { data: [certsDone, DATA.certs.length - certsDone], backgroundColor: ['#a855f7', dark ? '#3f3f46' : '#d4d4d8'], circumference: 180, rotation: 270 },
      ],
    },
    options: { plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10 } } } } },
  });

  /* Pripravenosť na certifikácie */
  document.getElementById('cert-ready-list').innerHTML = DATA.certs.map(c => {
    const r = App.certReadiness(c);
    const color = r >= 75 ? '#10b981' : r >= 45 ? '#f59e0b' : '#ef4444';
    return `<div><div class="flex justify-between text-xs mb-1"><span class="text-zinc-600 dark:text-zinc-400">${c.name}</span><b style="color:${color}">${r} %</b></div>
      <div class="h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden"><div class="h-full rounded-full" style="background:${color};width:${r}%"></div></div></div>`;
  }).join('');
};

/* ═══════════════ Štart aplikácie ═══════════════
   Bootstrap prevzal Auth modul (src/12_auth.js):
   - bez Supabase konfigurácie → lokálny režim (App.init priamo)
   - s konfiguráciou → registrácia/prihlásenie + cloud sync */
document.addEventListener('DOMContentLoaded', () => Auth.boot());
</script>
