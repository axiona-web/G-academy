/* ═══════════════════════════════════════════════════════════════════
   G-Academy — konfigurácia nasadenia
   ───────────────────────────────────────────────────────────────────
   1) Vytvor si zadarmo projekt na https://supabase.com
   2) V projekte: Settings → API → skopíruj "Project URL" a "anon public" kľúč
   3) Vlož ich nižšie medzi úvodzovky a súbor ulož
   Kým sú polia prázdne, aplikácia beží v LOKÁLNOM režime bez
   registrácie (vhodné na testovanie na vlastnom počítači).
   Anon kľúč je verejný — je bezpečné mať ho v kóde (prístup k dátam
   chránia Row Level Security pravidlá zo súboru supabase-setup.sql).
   ═══════════════════════════════════════════════════════════════════ */
window.GACADEMY_CONFIG = {
  SUPABASE_URL: 'https://hbhmatwsoboxlkjbvwhd.supabase.co',       // napr. 'https://abcdefgh.supabase.co'
  SUPABASE_ANON_KEY: 'sb_publishable_LqWOR3svcRwpNGLeUN_XPQ_bUOZ6PGV',  // dlhý reťazec začínajúci 'eyJ…'

  /* ── Google API kľúče pre AI Auditor (rovnaké ako View Sales Suite) ──
     PSI_API_KEY: PageSpeed Insights — bez kľúča má API prísne limity (429).
     GOOGLE_MAPS_API_KEY: Places API (New) — automatické vyhľadanie GBP
     profilu a načítanie dát (hodnotenie, recenzie, fotky, hodiny).
     Pozor: v Google Cloud Console musia mať kľúče v „Website restrictions"
     povolenú aj doménu axiona-web.github.io/* */
  PSI_API_KEY: 'AIzaSyA4ncGTpc08O0idb_ykqhYoF0742_tvu_U',
  GOOGLE_MAPS_API_KEY: 'AIzaSyAnwJg7hLl05s-usDuSvrcM3nnu90dRczI',
};
