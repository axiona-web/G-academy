/* ═══════════════════════════════════════════════════════════════════
   G-Academy — Service Worker (PWA offline podpora)
   Stratégia: cache-first pre app shell a CDN knižnice.
   Poznámka: SW funguje len cez http(s) — pri otvorení cez file://
   sa aplikácia správa normálne, len bez offline cache.
   ═══════════════════════════════════════════════════════════════════ */
const CACHE = 'gacademy-v7';
const ASSETS = [
  './index.html',
  './manifest.json',
  './config.js',
  './icon-192.png',
  './icon-512.png',
];

/* Inštalácia: predcachovanie app shellu */
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

/* Aktivácia: vyčistenie starých verzií cache */
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

/* Fetch: cache-first s dopĺňaním cache (aj pre CDN zdroje) */
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  // API volania (AI mentor, Supabase auth/dáta) nikdy necachuj
  if (e.request.url.includes('api.anthropic.com') || e.request.url.includes('api.openai.com') || e.request.url.includes('.supabase.co')) return;
  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request)
        .then((resp) => {
          const copy = resp.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
          return resp;
        })
        .catch(() => caches.match('./index.html'));
    })
  );
});
