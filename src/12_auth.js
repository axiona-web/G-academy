<script>
/* ═══════════════════════════════════════════════════════════════════
   AUTH — registrácia, prihlásenie, roly a cloud sync (Supabase)
   ───────────────────────────────────────────────────────────────────
   Režimy:
   • Lokálny — config.js nemá vyplnené kľúče → aplikácia beží ako
     doteraz (localStorage), bez prihlasovania. Vhodné na vývoj.
   • Online — s kľúčmi Supabase: povinná registrácia/prihlásenie,
     progres sa synchronizuje k účtu, admin vidí zoznam študentov.
   Monetizácia (budúcnosť): profiles.plan ('free'/'premium') +
   Auth.hasAccess() — miesto, kde sa neskôr zapoja platené bloky.
   ═══════════════════════════════════════════════════════════════════ */

const Auth = {
  sb: null,          // Supabase klient
  user: null,        // aktuálny auth používateľ
  profile: null,     // riadok z tabuľky profiles (role, plan…)
  _syncTimer: null,

  configured() {
    const c = window.GACADEMY_CONFIG;
    return !!(c && c.SUPABASE_URL && c.SUPABASE_ANON_KEY && window.supabase);
  },
  isAdmin() { return this.profile?.role === 'admin'; },
  /* Budúce platené bloky: tu sa neskôr skontroluje profile.plan */
  hasAccess(/* blockId */) { return true; },

  /* ── Bootstrap aplikácie ── */
  async boot() {
    if (!this.configured()) {
      // lokálny režim — aplikuj lokálne obsahové úpravy a štartuj
      if (typeof Content !== 'undefined') await Content.load();
      App.init(); return;
    }
    this.sb = window.supabase.createClient(GACADEMY_CONFIG.SUPABASE_URL, GACADEMY_CONFIG.SUPABASE_ANON_KEY);
    const landing = this.readAuthLanding();   // návrat z e-mailového odkazu?
    const { data: { session } } = await this.sb.auth.getSession();
    if (landing.error) { this.renderGate('login', '⚠️ ' + landing.error); return; }
    if (session) {
      await this.onLogin(session.user);
      if (landing.type === 'signup' || landing.type === 'email_change') this.welcomeVerified();
      if (landing.type === 'recovery') setTimeout(() => this.recoveryForm(), 500);
    } else if (landing.type === 'signup') {
      this.renderGate('login', '✅ E-mail overený! Prihlás sa a môžeme začať.');
    } else this.renderGate();
    // reaguj na zmeny session (odhlásenie v inom tabe, obnova hesla)
    this.sb.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') location.reload();
      if (event === 'PASSWORD_RECOVERY') this.recoveryForm();
    });
  },

  /* ── Po prihlásení: profil, cloud stav, štart aplikácie ── */
  async onLogin(user) {
    this.user = user;
    // profil (rola, plán) — vytvára ho DB trigger pri registrácii
    const { data: prof } = await this.sb.from('profiles').select('*').eq('id', user.id).single();
    this.profile = prof || { role: 'student', plan: 'free' };
    // localStorage kľúč per používateľ (aby sa účty na 1 počítači nemiešali)
    App.KEY = 'gacademy_v1_' + user.id;
    App.load();
    // cloud stav: použij ten s vyšším XP (jednoduchá deterministická stratégia)
    try {
      const { data: row } = await this.sb.from('progress').select('state').eq('user_id', user.id).single();
      if (row && row.state && (row.state.xp || 0) >= (App.state.xp || 0)) {
        App.state = Object.assign(App.defaultState(), row.state);
        App.save();
      }
    } catch (e) { /* prvé prihlásenie — riadok ešte neexistuje */ }
    // obal App.save → každá zmena naplánuje cloud sync (debounce 4 s)
    const origSave = App.save.bind(App);
    App.save = () => { origSave(); this.scheduleSync(); };
    window.addEventListener('beforeunload', () => this.syncNow());
    document.getElementById('auth-gate')?.remove();
    // Obsahové úpravy (admin editor) — aplikovať pred prvým renderom
    if (typeof Content !== 'undefined') await Content.load();
    App.init();
    this.renderUserChip();
    this.syncNow();
  },

  /* ── Cloud sync progresu ── */
  scheduleSync() {
    clearTimeout(this._syncTimer);
    this._syncTimer = setTimeout(() => this.syncNow(), 4000);
  },
  async syncNow() {
    if (!this.sb || !this.user) return;
    try {
      await this.sb.from('progress').upsert({
        user_id: this.user.id,
        state: App.state,
        overall: App.overallProgress(),
        xp: App.state.xp,
        level: App.level().name,
        updated_at: new Date().toISOString(),
      });
    } catch (e) { console.warn('sync fail', e); }
  },

  async logout() {
    await this.syncNow();
    await this.sb.auth.signOut();
    location.reload();
  },

  /* ── Chip prihláseného používateľa v topbare ── */
  renderUserChip() {
    const el = document.getElementById('topbar-user');
    if (!el || !this.user) return;
    const name = this.profile?.full_name || this.user.email.split('@')[0];
    el.innerHTML = `
      <div class="flex items-center gap-1.5">
        <span class="chip bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 max-w-[130px]" title="${this.user.email}">
          ${this.isAdmin() ? '🛡️ ' : '👤 '}<span class="truncate">${name}</span>
        </span>
        <button onclick="Auth.logout()" title="Odhlásiť sa" class="btn-press w-9 h-9 rounded-xl border border-zinc-200 dark:border-zinc-700/70 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
          <i data-lucide="log-out" class="w-4 h-4"></i>
        </button>
      </div>`;
    if (window.lucide) lucide.createIcons();
  },

  /* ── Prihlasovacia / registračná brána ── */
  renderGate(mode = 'login', msg = '') {
    let gate = document.getElementById('auth-gate');
    if (!gate) {
      gate = document.createElement('div');
      gate.id = 'auth-gate';
      document.body.appendChild(gate);
    }
    const isReg = mode === 'register';
    gate.innerHTML = `
    <div class="fixed inset-0 z-[100] overflow-y-auto bg-surface-light dark:bg-surface-dark flex items-center justify-center p-4">
      <div class="w-full max-w-md animate-slide-up">
        <div class="text-center mb-6">
          <div class="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-indigo-500/30 mb-3">G</div>
          <h1 class="text-2xl font-extrabold text-zinc-900 dark:text-white">G-Academy</h1>
          <p class="text-sm text-zinc-500">Google Business Profile · Search Console · Google Ads</p>
        </div>
        <div class="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#131316] p-6">
          <div class="grid grid-cols-2 gap-1 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/70 mb-5">
            <button onclick="Auth.renderGate('login')" class="py-2 rounded-lg text-sm font-semibold transition ${!isReg ? 'bg-white dark:bg-[#131316] shadow text-zinc-900 dark:text-white' : 'text-zinc-500'}">Prihlásenie</button>
            <button onclick="Auth.renderGate('register')" class="py-2 rounded-lg text-sm font-semibold transition ${isReg ? 'bg-white dark:bg-[#131316] shadow text-zinc-900 dark:text-white' : 'text-zinc-500'}">Registrácia</button>
          </div>
          ${msg ? `<div class="mb-4 text-sm rounded-xl px-3 py-2.5 ${msg.startsWith('✅') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-400'}">${msg}</div>` : ''}
          ${isReg ? `
            <label class="text-xs font-semibold text-zinc-500">Meno</label>
            <input id="auth-name" placeholder="Tvoje meno" class="w-full mt-1 mb-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-indigo-500">` : ''}
          <label class="text-xs font-semibold text-zinc-500">E-mail</label>
          <input id="auth-email" type="email" placeholder="tvoj@email.sk" class="w-full mt-1 mb-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-indigo-500">
          <label class="text-xs font-semibold text-zinc-500">Heslo</label>
          <input id="auth-pass" type="password" placeholder="min. 6 znakov" onkeydown="if(event.key==='Enter')Auth.${isReg ? 'register' : 'login'}()"
            class="w-full mt-1 mb-5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-indigo-500">
          <button onclick="Auth.${isReg ? 'register' : 'login'}()" id="auth-submit"
            class="btn-press w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition">
            ${isReg ? 'Vytvoriť účet zadarmo' : 'Prihlásiť sa'}
          </button>
          ${isReg
            ? '<p class="text-[11px] text-zinc-500 mt-4 text-center">Registrácia je bezplatná. Získaš prístup ku všetkým lekciám, testom a projektom.</p>'
            : `<button onclick="Auth.resetPassword()" class="w-full text-center text-xs text-zinc-500 hover:text-indigo-400 mt-4">Zabudnuté heslo?</button>`}
        </div>
        <p class="text-center text-[11px] text-zinc-500 mt-4">Progres sa ukladá k tvojmu účtu — môžeš sa učiť z hociktorého zariadenia.</p>
      </div>
    </div>`;
  },
  _busy(b) {
    const btn = document.getElementById('auth-submit');
    if (btn) { btn.disabled = b; btn.textContent = b ? 'Moment…' : btn.textContent; }
  },

  async login() {
    const email = document.getElementById('auth-email').value.trim();
    const pass = document.getElementById('auth-pass').value;
    if (!email || !pass) return this.renderGate('login', 'Vyplň e-mail aj heslo.');
    this._busy(true);
    const { data, error } = await this.sb.auth.signInWithPassword({ email, password: pass });
    if (error) return this.renderGate('login', this.slovak(error.message));
    await this.onLogin(data.user);
  },

  async register() {
    const name = document.getElementById('auth-name').value.trim();
    const email = document.getElementById('auth-email').value.trim();
    const pass = document.getElementById('auth-pass').value;
    if (!name || !email || !pass) return this.renderGate('register', 'Vyplň všetky polia.');
    if (pass.length < 6) return this.renderGate('register', 'Heslo musí mať aspoň 6 znakov.');
    this._busy(true);
    const { data, error } = await this.sb.auth.signUp({ email, password: pass, options: { data: { full_name: name } } });
    if (error) return this.renderGate('register', this.slovak(error.message));
    // Ak je v Supabase zapnuté potvrdenie e-mailu, session ešte nie je aktívna
    if (!data.session) return this.renderGate('login', `✅ Účet vytvorený! Poslali sme ti overovací e-mail na <b>${this.esc(email)}</b> — klikni v ňom na odkaz a vráť sa sem. (Skontroluj aj priečinok Spam.)`);
    await this.onLogin(data.user);
  },

  /* ── Návrat z e-mailového odkazu (overenie, obnova hesla) ──
     Supabase vracia info buď v hash fragmente (#type=signup&…),
     alebo v query parametroch (?type=…, ?error_description=…).
     Po prečítaní URL vyčistíme, nech v adresnom riadku nezostávajú tokeny. */
  readAuthLanding() {
    const hash = new URLSearchParams((location.hash || '').replace(/^#/, ''));
    const query = new URLSearchParams(location.search || '');
    const get = k => hash.get(k) || query.get(k);
    const out = {
      type: get('type') || (get('code') ? 'signup' : null),
      error: get('error_description') ? decodeURIComponent(get('error_description')).replace(/\+/g, ' ') : null,
    };
    if (out.error && /expired|invalid/i.test(out.error)) {
      out.error = 'Odkaz je neplatný alebo expiroval. Zaregistruj sa znova, prípadne požiadaj o nový e-mail.';
    }
    if (out.type || out.error) history.replaceState(null, '', location.pathname);
    return out;
  },

  /* Uvítacia obrazovka po úspešnom overení e-mailu */
  welcomeVerified() {
    setTimeout(() => App.modal(`
      <div class="text-center">
        <div class="text-5xl mb-3">🎉</div>
        <h3 class="font-bold text-xl text-zinc-900 dark:text-white mb-1">E-mail overený — vitaj v G-Academy!</h3>
        <p class="text-sm text-zinc-500 mb-5">Tvoj účet je aktívny a progres sa odteraz ukladá do cloudu — môžeš sa učiť z počítača aj mobilu.</p>
        <div class="text-left rounded-xl bg-indigo-500/10 border border-indigo-500/20 p-3 text-xs text-zinc-700 dark:text-zinc-300 mb-4">
          <b class="text-indigo-400">Ako začať:</b>
          <div class="mt-1 space-y-0.5">
            <div>1. Vyplň krátku vstupnú diagnostiku — pripraví ti študijnú cestu</div>
            <div>2. Drž sa denného plánu mentora na hlavnej obrazovke</div>
            <div>3. Po každej lekcii ťa čaká mini test (5 otázok)</div>
          </div>
        </div>
        <button onclick="App.closeModal()" class="btn-press w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold">Poďme na to 🚀</button>
      </div>`), 500);
  },

  /* Obrazovka nastavenia nového hesla — otvorí sa po kliknutí na
     odkaz „obnova hesla" z e-mailu (event PASSWORD_RECOVERY) */
  recoveryForm() {
    App.modal(`
      <h3 class="font-bold text-lg text-zinc-900 dark:text-white mb-2">🔑 Nastav si nové heslo</h3>
      <p class="text-xs text-zinc-500 mb-4">Prišiel si z odkazu na obnovu hesla — zadaj nové heslo (min. 6 znakov).</p>
      <input id="rec-pass" type="password" placeholder="Nové heslo" class="w-full mb-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-indigo-500">
      <input id="rec-pass2" type="password" placeholder="Nové heslo znova" class="w-full mb-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-indigo-500">
      <div id="rec-msg" class="text-xs text-red-400 mb-2"></div>
      <button onclick="Auth.saveNewPassword()" class="btn-press w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold">Uložiť nové heslo</button>`);
  },
  async saveNewPassword() {
    const p1 = document.getElementById('rec-pass').value;
    const p2 = document.getElementById('rec-pass2').value;
    const msg = document.getElementById('rec-msg');
    if (p1.length < 6) { msg.textContent = 'Heslo musí mať aspoň 6 znakov.'; return; }
    if (p1 !== p2) { msg.textContent = 'Heslá sa nezhodujú.'; return; }
    const { error } = await this.sb.auth.updateUser({ password: p1 });
    if (error) { msg.textContent = this.slovak(error.message); return; }
    App.closeModal();
    App.toast('✅ Heslo zmenené', 'odteraz sa prihlasuješ novým heslom', '');
  },

  async resetPassword() {
    const email = document.getElementById('auth-email').value.trim();
    if (!email) return this.renderGate('login', 'Napíš svoj e-mail do poľa vyššie a klikni znova na „Zabudnuté heslo".');
    await this.sb.auth.resetPasswordForEmail(email, { redirectTo: location.origin + location.pathname });
    this.renderGate('login', '✅ Ak účet existuje, poslali sme ti e-mail na obnovu hesla.');
  },

  esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; },

  /* Preklad najčastejších chýb Supabase */
  slovak(msg) {
    const map = {
      'Invalid login credentials': 'Nesprávny e-mail alebo heslo.',
      'User already registered': 'Tento e-mail už má účet — skús sa prihlásiť.',
      'Email not confirmed': 'E-mail ešte nie je potvrdený — skontroluj schránku.',
      'Password should be at least 6 characters': 'Heslo musí mať aspoň 6 znakov.',
      'email rate limit exceeded': 'Momentálne sme odoslali priveľa e-mailov — skús to prosím o hodinu, alebo napíš správcovi.',
      'over_email_send_rate_limit': 'Momentálne sme odoslali priveľa e-mailov — skús to prosím o hodinu.',
      'For security purposes': 'Kvôli bezpečnosti počkaj chvíľu pred ďalším pokusom.',
      'Signups not allowed': 'Registrácie sú dočasne vypnuté — kontaktuj správcu.',
      'Email signups are disabled': 'Registrácia e-mailom je vypnutá — kontaktuj správcu.',
      'Unable to validate email address': 'Neplatná adresa e-mailu.',
      'Failed to fetch': 'Nepodarilo sa spojiť so serverom — skontroluj internetové pripojenie.',
    };
    for (const k in map) if (msg.includes(k)) return map[k];
    return '⚠️ ' + msg;
  },
};

/* ═══════════════ ADMIN — prehľad študentov ═══════════════ */
Views.admin = function () {
  return `
  <p class="text-sm text-zinc-500 mb-4">🛡️ Administrátorská sekcia — zoznam registrovaných študentov a ich progres (dáta zo Supabase).</p>
  <div id="admin-stats" class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4"></div>
  ${this.card(`<div id="admin-table" class="text-sm text-zinc-500">Načítavam študentov…</div>`)}`;
};
Views.afterRender.admin = async () => {
  if (!Auth.isAdmin()) { document.getElementById('admin-table').innerHTML = 'Prístup len pre administrátora.'; return; }
  try {
    const [{ data: profiles }, { data: progress }] = await Promise.all([
      Auth.sb.from('profiles').select('*').order('created_at', { ascending: false }),
      Auth.sb.from('progress').select('user_id, overall, xp, level, updated_at'),
    ]);
    const progMap = Object.fromEntries((progress || []).map(p => [p.user_id, p]));
    const rows = (profiles || []).map(p => ({ ...p, prog: progMap[p.id] }));
    // súhrnné karty
    const active7 = rows.filter(r => r.prog && (Date.now() - new Date(r.prog.updated_at)) < 7 * 864e5).length;
    const avgProgress = rows.length ? Math.round(rows.reduce((a, r) => a + (r.prog?.overall || 0), 0) / rows.length) : 0;
    document.getElementById('admin-stats').innerHTML =
      Views.statCard('users', rows.length, 'Registrovaných', '#6366f1') +
      Views.statCard('activity', active7, 'Aktívni (7 dní)', '#10b981') +
      Views.statCard('percent', avgProgress + ' %', 'Priemerný progres', '#f59e0b') +
      Views.statCard('shield', rows.filter(r => r.role === 'admin').length, 'Adminov', '#a855f7');
    // tabuľka
    document.getElementById('admin-table').innerHTML = `
      <div class="overflow-x-auto"><table class="w-full text-sm">
        <thead><tr class="text-left text-xs text-zinc-500 border-b border-zinc-200 dark:border-zinc-800">
          <th class="py-2 pr-3">Používateľ</th><th class="py-2 pr-3">Rola</th><th class="py-2 pr-3">Plán</th>
          <th class="py-2 pr-3">Level</th><th class="py-2 pr-3">XP</th><th class="py-2 pr-3">Progres</th><th class="py-2">Aktivita</th>
        </tr></thead>
        <tbody>${rows.map(r => `
          <tr class="border-b border-zinc-100 dark:border-zinc-800/60 last:border-0">
            <td class="py-2.5 pr-3"><div class="font-semibold text-zinc-900 dark:text-white">${r.full_name || '—'}</div><div class="text-xs text-zinc-500">${r.email}</div></td>
            <td class="py-2.5 pr-3">${r.role === 'admin' ? '🛡️ admin' : 'študent'}</td>
            <td class="py-2.5 pr-3">${r.plan === 'premium' ? '💎 premium' : 'free'}</td>
            <td class="py-2.5 pr-3">${r.prog?.level || '—'}</td>
            <td class="py-2.5 pr-3">${r.prog?.xp ?? 0}</td>
            <td class="py-2.5 pr-3 min-w-[110px]">
              <div class="flex items-center gap-2"><div class="flex-1 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden"><div class="h-full rounded-full bg-indigo-500" style="width:${r.prog?.overall || 0}%"></div></div><span class="text-xs font-bold">${r.prog?.overall || 0}%</span></div></td>
            <td class="py-2.5 text-xs text-zinc-500">${r.prog ? new Date(r.prog.updated_at).toLocaleDateString('sk') : 'nezačal'}</td>
          </tr>`).join('')}</tbody>
      </table></div>
      <p class="text-[11px] text-zinc-500 mt-3">💡 Rolu/plán zmeníš v Supabase → Table Editor → profiles (stĺpce role, plan). Platené bloky sa neskôr napoja na stĺpec plan.</p>`;
    if (window.lucide) lucide.createIcons();
  } catch (e) {
    document.getElementById('admin-table').innerHTML = '⚠️ Nepodarilo sa načítať dáta: ' + e.message;
  }
};
</script>
