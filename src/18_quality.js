<script>
/* ═══════════════════════════════════════════════════════════════════
   QUALITY & CONTENT OPS — verziovanie obsahu, admin editor,
   logovanie chýb a hlásenie chýb v obsahu
   ───────────────────────────────────────────────────────────────────
   • Content overrides: úpravy lekcií/otázok sa neukladajú do kódu,
     ale ako "override" záznamy (Supabase tabuľka content_overrides;
     v lokálnom režime localStorage). Pri štarte sa aplikujú na DATA.
   • Admin editor: úprava lekcie/otázky bez zásahu do kódu, história
     posledných verzií, deaktivácia otázok, označenie „v revízii".
   • Error logging: window.onerror → lokálny buffer + Supabase.
   ═══════════════════════════════════════════════════════════════════ */

/* Globálne metadáta obsahu (verzia kurzu) */
DATA.contentMeta = { version: '2.1.0', released: '2026-07-26', source: 'G-Academy tím' };

const Content = {
  overrides: {},   // { id: {data, note, updated_at, updated_by, history} }
  LKEY: 'gacademy_overrides',

  /* ── Načítanie overridov (Supabase alebo localStorage) ── */
  async load() {
    try {
      if (Auth.sb && Auth.user) {
        const { data } = await Auth.sb.from('content_overrides').select('*');
        (data || []).forEach(r => this.overrides[r.id] = r);
      } else {
        this.overrides = JSON.parse(localStorage.getItem(this.LKEY) || '{}');
      }
    } catch (e) { this.overrides = {}; }
    this.apply();
  },

  /* Nájdi ORIGINÁL lekcie v DATA.modules — App.getLesson vracia kópie
     (spread v allLessons), mutácia kópie by sa stratila pri resete cache */
  origLesson(id) {
    for (const m of DATA.modules) for (const sec of m.sections) {
      const l = sec.lessons.find(x => x.id === id);
      if (l) return l;
    }
    return null;
  },

  /* ── Aplikovanie overridov na zabudovaný obsah ── */
  apply() {
    Object.entries(this.overrides).forEach(([id, row]) => {
      const d = row.data || row; // localStorage ukladá priamo data
      if (id.startsWith('lesson:')) {
        const l = this.origLesson(id.slice(7));
        if (!l) return;
        if (d.title) l.title = d.title;
        if (d.min) l.min = d.min;
        if (d.theory) l.theory = d.theory;
        if (Array.isArray(d.checklist)) l.checklist = d.checklist;
        l._rev = { date: row.updated_at || d._date, by: row.updated_by, outdated: !!d.outdated, note: row.note };
      } else if (id.startsWith('quiz:')) {
        const [, lid, qi] = id.split(':');
        const l = this.origLesson(lid);
        const q = l && l.quiz[+qi];
        if (!q) return;
        if (d.q) q.q = d.q;
        if (Array.isArray(d.o)) q.o = d.o;
        if (typeof d.c === 'number') q.c = d.c;
        if (d.e) q.e = d.e;
        q._disabled = !!d.disabled;
      }
    });
    /* Deaktivované otázky vyraď z kvízových poolov (lekcia si drží pôvodné pole
       pre editor, testový engine filtruje cez helper) */
    App._all = null; // reset cache lekcií
  },
  activeQuiz(lesson) { return lesson.quiz.filter(q => !q._disabled); },

  /* ── Uloženie override (admin) ── */
  async save(id, data, note) {
    const prev = this.overrides[id];
    const history = (prev?.history || []).slice(-4);
    if (prev) history.push({ date: prev.updated_at, by: prev.updated_by, data: prev.data });
    const row = { id, data, note: note || '', history, updated_by: Auth.user?.email || 'local-admin', updated_at: new Date().toISOString() };
    this.overrides[id] = row;
    if (Auth.sb && Auth.user) {
      const { error } = await Auth.sb.from('content_overrides').upsert(row);
      if (error) { App.toast('⚠️ Uloženie zlyhalo', error.message, ''); return false; }
    } else {
      localStorage.setItem(this.LKEY, JSON.stringify(this.overrides));
    }
    this.apply();
    App.toast('✅ Obsah uložený', id, '');
    return true;
  },
  async remove(id) {
    delete this.overrides[id];
    if (Auth.sb && Auth.user) await Auth.sb.from('content_overrides').delete().eq('id', id);
    else localStorage.setItem(this.LKEY, JSON.stringify(this.overrides));
    App.toast('↩️ Úprava odstránená', 'obsah sa vrátil na pôvodnú verziu — obnov stránku', '');
  },
};

/* ═══════════════ ERROR LOGGING ═══════════════ */
const ErrLog = {
  buffer: [],
  init() {
    this.buffer = JSON.parse(localStorage.getItem('gacademy_errors') || '[]');
    window.addEventListener('error', e => this.log('js-error', e.message, (e.filename || '') + ':' + e.lineno));
    window.addEventListener('unhandledrejection', e => this.log('js-error', 'Promise: ' + (e.reason?.message || e.reason), ''));
  },
  log(kind, message, detail) {
    const entry = { kind, message: String(message).slice(0, 300), detail: String(detail).slice(0, 300), date: Date.now() };
    this.buffer.push(entry);
    this.buffer = this.buffer.slice(-30);
    try { localStorage.setItem('gacademy_errors', JSON.stringify(this.buffer)); } catch (e) {}
    // Online: pošli do Supabase (admin ich vidí v Admin sekcii)
    if (Auth.sb && Auth.user) {
      Auth.sb.from('error_logs').insert({ user_id: Auth.user.id, kind, message: entry.message, detail: entry.detail, url: location.hash || '' }).then(() => {}, () => {});
    }
  },
};
ErrLog.init();

/* Hlásenie chyby v obsahu (dostupné každému v lekcii) */
Views.reportContent = function (lessonId) {
  App.modal(`
    <h3 class="font-bold text-lg text-zinc-900 dark:text-white mb-2">🚩 Nahlásiť chybu v obsahu</h3>
    <p class="text-xs text-zinc-500 mb-3">Lekcia: ${lessonId}. Popíš, čo je nesprávne alebo zastarané — admin hlásenie uvidí a obsah opraví.</p>
    <textarea id="report-txt" rows="4" class="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent p-3 text-sm outline-none focus:border-indigo-500 mb-3" placeholder="Napr.: limit popisu služby už nie je 300 znakov…"></textarea>
    <button onclick="ErrLog.log('content-report','Lekcia ${lessonId}',document.getElementById('report-txt').value);App.closeModal();App.toast('🚩 Ďakujeme!','Hlásenie odoslané','')"
      class="btn-press w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold">Odoslať hlásenie</button>`);
};

/* ═══════════════ ADMIN EDITOR OBSAHU ═══════════════
   Rozširuje Admin sekciu — výber lekcie → úprava polí → uloženie.
   Funguje aj v lokálnom režime (na vyskúšanie), naplno so Supabase. */
Views.adminEditor = function () {
  const opts = App.allLessons().map(l => `<option value="${l.id}">${App.getModule(l.moduleId).short} · ${l.title}${l._rev ? ' ✏️' : ''}</option>`).join('');
  return `
  <div class="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#131316] p-5 mt-4">
    <h3 class="font-bold text-sm text-zinc-900 dark:text-white mb-1">✏️ Editor obsahu</h3>
    <p class="text-xs text-zinc-500 mb-3">Úpravy sa ukladajú mimo kódu (${Auth.sb && Auth.user ? 'Supabase — uvidia ich všetci študenti' : 'lokálne — testovací režim'}) a prekryjú zabudovaný obsah. Obsah kurzu: v${DATA.contentMeta.version} (${DATA.contentMeta.released}).</p>
    <select id="ed-lesson" onchange="Views.adminEditLesson(this.value)" class="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-[#131316] px-3 py-2.5 text-sm mb-3">
      <option value="">— vyber lekciu na úpravu —</option>${opts}
    </select>
    <div id="ed-area"></div>
    ${Object.keys(Content.overrides).length ? `
    <div class="mt-4 border-t border-zinc-200 dark:border-zinc-800 pt-3">
      <h4 class="font-bold text-xs text-zinc-500 mb-2">Aktívne úpravy (${Object.keys(Content.overrides).length})</h4>
      <div class="space-y-1 text-xs">${Object.entries(Content.overrides).map(([id, r]) => `
        <div class="flex items-center gap-2 py-1 border-b border-zinc-100 dark:border-zinc-800/60 last:border-0">
          <span class="flex-1 truncate">${id}${r.note ? ' — ' + r.note : ''}</span>
          <span class="text-zinc-500 shrink-0">${r.updated_by || ''} · ${(r.updated_at || '').slice(0, 10)}</span>
          <button onclick="Content.remove('${id}').then(()=>App.render())" class="text-red-400 hover:underline shrink-0">vrátiť</button>
        </div>`).join('')}</div>
    </div>` : ''}
  </div>`;
};

Views.adminEditLesson = function (lid) {
  const area = document.getElementById('ed-area');
  if (!lid) { area.innerHTML = ''; return; }
  const l = App.getLesson(lid);
  area.innerHTML = `
    <div class="space-y-3 animate-fade-in">
      <div class="grid grid-cols-3 gap-2">
        <div class="col-span-2"><label class="text-[10px] font-bold text-zinc-500">NÁZOV</label>
        <input id="ed-title" value="${l.title.replace(/"/g, '&quot;')}" class="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm"></div>
        <div><label class="text-[10px] font-bold text-zinc-500">MINÚTY</label>
        <input id="ed-min" type="number" value="${l.min}" class="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm"></div>
      </div>
      <div><label class="text-[10px] font-bold text-zinc-500">TEÓRIA (HTML)</label>
      <textarea id="ed-theory" rows="8" class="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent p-3 text-xs font-mono">${l.theory.replace(/</g, '&lt;')}</textarea></div>
      <div><label class="text-[10px] font-bold text-zinc-500">CHECKLIST (1 položka na riadok)</label>
      <textarea id="ed-check" rows="3" class="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent p-3 text-xs">${l.checklist.join('\n')}</textarea></div>
      <div class="flex items-center gap-3">
        <label class="flex items-center gap-2 text-xs"><input id="ed-outdated" type="checkbox" ${l._rev?.outdated ? 'checked' : ''} class="w-4 h-4 accent-amber-500"> Označiť „obsah v revízii" (⚠️ badge pre študentov)</label>
      </div>
      <input id="ed-note" placeholder="Interná poznámka k úprave (zdroj, dôvod)…" value="${(l._rev?.note || '').replace(/"/g, '&quot;')}" class="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-xs">
      <div class="flex gap-2">
        <button onclick="Views.adminSaveLesson('${lid}')" class="btn-press flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold">💾 Uložiť lekciu</button>
      </div>
      <h4 class="font-bold text-xs text-zinc-500 pt-2 border-t border-zinc-200 dark:border-zinc-800">OTÁZKY KVÍZU</h4>
      <div class="space-y-2">${l.quiz.map((q, i) => `
        <details class="rounded-xl border border-zinc-200 dark:border-zinc-800 p-2.5 ${q._disabled ? 'opacity-50' : ''}">
          <summary class="text-xs cursor-pointer">${q._disabled ? '🚫 ' : ''}${i + 1}. ${q.q.slice(0, 70)}…</summary>
          <div class="mt-2 space-y-2">
            <textarea id="edq-q-${i}" rows="2" class="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent p-2 text-xs">${q.q}</textarea>
            ${q.o.map((o, oi) => `<div class="flex items-center gap-2">
              <input type="radio" name="edq-c-${i}" value="${oi}" ${q.c === oi ? 'checked' : ''} class="accent-emerald-500" title="správna odpoveď">
              <input id="edq-o-${i}-${oi}" value="${o.replace(/"/g, '&quot;')}" class="flex-1 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-2 py-1.5 text-xs">
            </div>`).join('')}
            <textarea id="edq-e-${i}" rows="2" placeholder="vysvetlenie" class="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent p-2 text-xs">${q.e}</textarea>
            <div class="flex gap-2">
              <button onclick="Views.adminSaveQuestion('${lid}',${i})" class="btn-press flex-1 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold">💾 Uložiť otázku</button>
              <button onclick="Views.adminToggleQuestion('${lid}',${i})" class="btn-press px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-semibold">${q._disabled ? '✓ Aktivovať' : '🚫 Deaktivovať'}</button>
            </div>
          </div>
        </details>`).join('')}
      </div>
    </div>`;
};
Views.adminSaveLesson = async function (lid) {
  await Content.save('lesson:' + lid, {
    title: document.getElementById('ed-title').value.trim(),
    min: +document.getElementById('ed-min').value || undefined,
    theory: document.getElementById('ed-theory').value,
    checklist: document.getElementById('ed-check').value.split('\n').map(s => s.trim()).filter(Boolean),
    outdated: document.getElementById('ed-outdated').checked,
  }, document.getElementById('ed-note').value.trim());
};
Views.adminSaveQuestion = async function (lid, i) {
  const l = App.getLesson(lid);
  const c = +([...document.getElementsByName('edq-c-' + i)].find(r => r.checked)?.value ?? l.quiz[i].c);
  await Content.save(`quiz:${lid}:${i}`, {
    q: document.getElementById('edq-q-' + i).value.trim(),
    o: l.quiz[i].o.map((_, oi) => document.getElementById(`edq-o-${i}-${oi}`).value.trim()),
    c, e: document.getElementById('edq-e-' + i).value.trim(),
    disabled: !!l.quiz[i]._disabled,
  });
};
Views.adminToggleQuestion = async function (lid, i) {
  const q = App.getLesson(lid).quiz[i];
  await Content.save(`quiz:${lid}:${i}`, { q: q.q, o: q.o, c: q.c, e: q.e, disabled: !q._disabled });
  Views.adminEditLesson(lid);
};

/* Admin view: pridaj editor + posledné chyby (rozšírenie existujúceho afterRender) */
(() => {
  const origAdmin = Views.admin;
  Views.admin = function () {
    return origAdmin.call(this) + Views.adminEditor() + `
      <div class="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#131316] p-5 mt-4">
        <h3 class="font-bold text-sm text-zinc-900 dark:text-white mb-2">🐞 Posledné chyby a hlásenia</h3>
        <div id="admin-errors" class="text-xs text-zinc-500">Načítavam…</div>
      </div>`;
  };
  const origAfter = Views.afterRender.admin;
  Views.afterRender.admin = async function () {
    if (origAfter) await origAfter();
    const el = document.getElementById('admin-errors');
    if (!el) return;
    let rows = ErrLog.buffer.map(e => ({ ...e, created_at: new Date(e.date).toISOString() }));
    if (Auth.sb && Auth.isAdmin()) {
      try { const { data } = await Auth.sb.from('error_logs').select('*').order('created_at', { ascending: false }).limit(20); if (data) rows = data; } catch (e) {}
    }
    el.innerHTML = rows.length ? rows.slice(0, 15).map(r => `
      <div class="py-1.5 border-b border-zinc-100 dark:border-zinc-800/60 last:border-0 flex gap-2">
        <span>${r.kind === 'content-report' ? '🚩' : '🐞'}</span>
        <span class="flex-1">${(r.message || '').slice(0, 90)}${r.detail ? ' — ' + (r.detail || '').slice(0, 60) : ''}</span>
        <span class="shrink-0">${(r.created_at || '').slice(0, 10)}</span>
      </div>`).join('') : 'Žiadne chyby — výborne! 🎉';
  };
})();

/* Lekcia: metadáta verzie + tlačidlo hlásenia (rozšírenie lesson view) */
(() => {
  const origLesson = Views.lesson;
  Views.lesson = function (params) {
    const l = App.getLesson(params.id);
    const rev = l._rev;
    const meta = `
    <div class="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-zinc-500">
      <span>📄 Obsah v${DATA.contentMeta.version}</span>
      <span>· kontrola: ${rev?.date ? String(rev.date).slice(0, 10) : DATA.contentMeta.released}</span>
      ${rev ? `<span>· upravil: ${rev.by || 'admin'}</span>` : ''}
      ${rev?.outdated ? '<span class="chip bg-amber-500/15 text-amber-500">⚠️ obsah v revízii</span>' : ''}
      <button onclick="Views.reportContent('${l.id}')" class="text-indigo-400 hover:underline">🚩 Nahlásiť chybu</button>
    </div>`;
    return origLesson.call(this, params) + meta;
  };
})();

/* Kvízové pooly: rešpektuj deaktivované otázky */
(() => {
  const origStart = App.startQuiz.bind(App);
  App.startQuiz = function (type, refId) {
    origStart(type, refId);
    if (this.quiz && !this.quiz.finished) {
      this.quiz.questions = this.quiz.questions.filter(q => !q._disabled);
      this.quiz.answers = new Array(this.quiz.questions.length).fill(null);
      Views.renderQuiz();
    }
  };
})();
</script>
