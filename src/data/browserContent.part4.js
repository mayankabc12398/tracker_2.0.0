export const browserContentD = {
  "browser-storage": {
    overview: "Browser storage matlab data ko **client-side** (user ke browser me) save karna taaki page reload ya browser band hone ke baad bhi data mile. Cookies, localStorage, sessionStorage, IndexedDB aur Cache Storage — har ek ka apna use-case, capacity aur lifetime hota hai. 🗄️",
    why: "Har baar server se data laana slow hai. User preferences (theme, language), auth tokens, offline data, cart items — ye sab client par store karna fast aur smooth experience deta hai. Bina storage ke har page reload pe sab kuch reset ho jaata.",
    concept: [
      {
        h: "Cookies 🍪",
        p: "Chhoti si data (~4KB) jo **har HTTP request ke saath server ko apne aap jaati hai**. Mostly auth/session ke liye. Expiry set kar sakte ho. Sync API, document.cookie se access.",
        code: "document.cookie = \"theme=dark; max-age=86400; path=/; Secure; SameSite=Lax\";\n// Read (raw string, parse karna padta hai)\nconsole.log(document.cookie);",
        lang: "js"
      },
      {
        h: "localStorage 📦",
        p: "~5-10MB, key-value strings, **kabhi expire nahi hota** jab tak manually clear na karo. Same origin me persist. Server ko nahi jaata. Synchronous API.",
        code: "localStorage.setItem(\"user\", JSON.stringify({ name: \"Dev\" }));\nconst user = JSON.parse(localStorage.getItem(\"user\"));\nlocalStorage.removeItem(\"user\");\nlocalStorage.clear();",
        lang: "js"
      },
      {
        h: "sessionStorage ⏳",
        p: "localStorage jaisa hi par sirf **ek tab/session tak** zinda rehta hai. Tab band = data gaya. Naya tab = naya alag storage. Refresh pe survive karta hai.",
        code: "sessionStorage.setItem(\"step\", \"3\");\nconsole.log(sessionStorage.getItem(\"step\"));",
        lang: "js"
      },
      {
        h: "IndexedDB 🗃️",
        p: "Bada (hundreds of MB+), **asynchronous**, transactional NoSQL database browser me. Objects, files, blobs store kar sakte ho. Indexes par query. Offline apps ke liye best.",
        code: "const req = indexedDB.open(\"myDB\", 1);\nreq.onupgradeneeded = (e) => {\n  e.target.result.createObjectStore(\"users\", { keyPath: \"id\" });\n};\nreq.onsuccess = (e) => {\n  const db = e.target.result;\n  const tx = db.transaction(\"users\", \"readwrite\");\n  tx.objectStore(\"users\").put({ id: 1, name: \"Dev\" });\n};",
        lang: "js"
      },
      {
        h: "Cache Storage (Cache API) 🚀",
        p: "Service Worker ke saath use hota hai. **Request/Response pairs** store karta hai — offline support aur PWA ke liye. Network responses ko cache karke fast serve.",
        code: "caches.open(\"v1\").then((cache) => {\n  cache.add(\"/index.html\");\n  cache.put(\"/api/data\", new Response(JSON.stringify({ ok: true })));\n});",
        lang: "js"
      }
    ],
    analogy: "Socho ek student ke paas alag jagahein hain: **Cookie** = ID card jo har gate par dikhana padta hai (server tak jaata). **localStorage** = ghar ki almari (permanent). **sessionStorage** = bag jo school chhodte hi khaali (tab band = gaya). **IndexedDB** = pura library cabinet (bada, organized). **Cache Storage** = photocopy shop ki saved copies (offline serve).",
    syntax: {
      code: "// localStorage CRUD\nlocalStorage.setItem(key, value);   // value MUST be string\nconst v = localStorage.getItem(key);\nlocalStorage.removeItem(key);\nlocalStorage.clear();\nlocalStorage.length;                 // count\nlocalStorage.key(0);                 // nth key name",
      note: "localStorage/sessionStorage sirf strings store karte hain — objects ke liye JSON.stringify / JSON.parse use karo.",
      lang: "js"
    },
    steps: [
      "Decide karo data ka nature: temporary, permanent, ya server ko bhejna hai?",
      "Auth/session token chahiye server ko? → Cookie (HttpOnly + Secure).",
      "Chhota client-only persistent data (theme, settings)? → localStorage.",
      "Sirf current tab tak (multi-step form, wizard)? → sessionStorage.",
      "Bada/structured/offline data ya files? → IndexedDB.",
      "Network responses cache karke offline serve karna? → Cache Storage + Service Worker.",
      "Hamesha sensitive data ko encrypt karo, plain mat rakho.",
      "Storage quota exceed handle karo (try/catch ya QuotaExceededError)."
    ],
    internals: {
      p: "localStorage main thread par **synchronous** hai — bada data read/write UI block kar sakta hai. Browser har origin ke storage ko disk par (SQLite/LevelDB type stores) persist karta hai. IndexedDB async hai isliye main thread free rehta hai. Storage events sirf **doosre tabs** me fire hote hain, current tab me nahi.",
      code: "window.addEventListener(\"storage\", (e) => {\n  // fires in OTHER tabs of same origin\n  console.log(e.key, e.oldValue, e.newValue);\n});",
      lang: "js"
    },
    process: {
      type: "boxes",
      items: [
        { label: "Cookie", sub: "~4KB, server ko jaata", color: "#F43F5E" },
        { label: "localStorage", sub: "~5-10MB, permanent", color: "#10B981" },
        { label: "sessionStorage", sub: "tab tak, sync", color: "#14B8A6" },
        { label: "IndexedDB", sub: "MB+, async DB", color: "#3B82F6" },
        { label: "Cache Storage", sub: "req/res, offline", color: "#8B5CF6" }
      ]
    },
    visual: {
      type: "timeline",
      items: [
        { year: "1", text: "User action → data save karne ka decision" },
        { year: "2", text: "Type choose: cookie / localStorage / IDB" },
        { year: "3", text: "Browser disk par origin-scoped store me likhta hai" },
        { year: "4", text: "Reload pe browser wahi store load karta hai" },
        { year: "5", text: "Expiry / clear / quota par data hatta hai" }
      ]
    },
    memory: "Yaad rakho: **CLSIC** — Cookie (server), Local (permanent), Session (tab), IndexedDB (big async), Cache (offline). 'Sirf cookie hi server jaati hai' — baaki sab client-only.",
    browser: "Chrome DevTools → Application tab me Cookies, Local Storage, Session Storage, IndexedDB, Cache Storage sab dikhte hain. Wahin se inspect, edit aur delete kar sakte ho.",
    notes: {
      concept: "localStorage aur sessionStorage dono ka API exactly same hai — sirf lifetime alag.",
      tip: "Auth token ko localStorage me rakhne se XSS risk hota hai — HttpOnly cookie zyada safe hai.",
      warning: "localStorage synchronous hai — bade data ko store/parse karna main thread block karta hai.",
      error: "Quota cross karne par QuotaExceededError aata hai — Safari private mode me localStorage 0 ho sakta hai."
    },
    compare: {
      headers: ["Feature", "Cookie", "localStorage", "sessionStorage", "IndexedDB", "Cache Storage"],
      rows: [
        ["Capacity", "~4KB", "~5-10MB", "~5MB", "100MB+ (large)", "Disk-limited"],
        ["Lifetime", "Set expiry", "Permanent", "Tab close = gone", "Permanent", "Permanent"],
        ["Scope", "Domain+path", "Origin", "Tab + origin", "Origin", "Origin"],
        ["Sync/Async", "Sync", "Sync", "Sync", "Async", "Async"],
        ["Sent to server", "Yes (auto)", "No", "No", "No", "No"],
        ["Data type", "String", "String", "String", "Any (objects/blobs)", "Request/Response"]
      ]
    },
    mistakes: [
      { bad: "localStorage.setItem('user', {name:'Dev'}) — object directly", fix: "JSON.stringify karo: localStorage.setItem('user', JSON.stringify(obj))." },
      { bad: "Sensitive token localStorage me plain text", fix: "HttpOnly Secure cookie use karo ya at least encrypt karo." },
      { bad: "Bada data localStorage me sync write", fix: "IndexedDB (async) use karo — main thread block na ho." },
      { bad: "Maan lena storage event current tab me fire hoga", fix: "storage event sirf doosre tabs me aata hai — same-tab sync khud handle karo." }
    ],
    best: [
      "Strings ke liye JSON.stringify/parse hamesha try/catch ke saath.",
      "Sensitive data cookie (HttpOnly+Secure) me, client-only data localStorage me.",
      "Bada/structured data IndexedDB me rakho, localStorage me nahi.",
      "Cookies par SameSite aur Secure flags set karo.",
      "Quota errors gracefully handle karo (try/catch).",
      "Cache Storage ko version karo (v1, v2) taaki purana cache cleanup ho."
    ],
    performance: "⚡ localStorage sync hai — 1MB+ JSON parse main thread ko block karega aur jank dega. IndexedDB async hone se non-blocking hai, isliye large data ke liye prefer karo. Cookies har request me jaati hain to unhe chhota rakho warna network overhead badhta hai.",
    tricky: [
      {
        title: "localStorage sirf string store karta hai",
        code: "localStorage.setItem(\"n\", 5);\nconsole.log(typeof localStorage.getItem(\"n\"));",
        output: "\"string\"",
        explain: "5 number bhi string \"5\" ban jaata hai. Number chahiye to Number() ya parseInt karo.",
        lang: "js"
      },
      {
        title: "sessionStorage tab-specific hai",
        explain: "Same URL do tabs me kholo to dono ka sessionStorage alag hota hai — share nahi hota. localStorage share hota hai.",
        lang: "js"
      }
    ],
    interview: {
      beginner: [
        { q: "localStorage aur sessionStorage me difference?", a: "Dono ka API same hai. localStorage permanent rehta hai (manual clear tak), sessionStorage tab band hote hi clear ho jaata hai. sessionStorage har tab ke liye alag." },
        { q: "Cookie kab use karte ho?", a: "Jab data server ko har request ke saath chahiye — jaise auth/session token. Cookie automatically server ko jaati hai." }
      ],
      intermediate: [
        { q: "localStorage me object kaise store karoge?", a: "JSON.stringify se string banao, JSON.parse se wapas object. Direct object store karoge to '[object Object]' string ban jaayega." },
        { q: "Auth token kahan store karna safe hai?", a: "HttpOnly Secure cookie — JS use access nahi kar sakta isliye XSS-safe. localStorage XSS me chura jaa sakta hai." }
      ],
      advanced: [
        { q: "localStorage performance problem kya hai?", a: "Synchronous hone se bade data ka read/write/parse main thread block karta hai → jank. IndexedDB async hai isliye large data ke liye behtar." },
        { q: "Tabs ke beech state sync kaise karoge?", a: "storage event listener (doosre tab me fire) ya BroadcastChannel API use karke real-time sync." }
      ]
    },
    mcqs: [
      { q: "Konsa storage har HTTP request ke saath server ko jaata hai?", options: ["localStorage", "sessionStorage", "Cookie", "IndexedDB"], answer: 2, explain: "Sirf cookies automatically har same-domain request ke saath bhejti hain." },
      { q: "Konsa storage tab band hote hi clear ho jaata hai?", options: ["localStorage", "sessionStorage", "Cookie", "IndexedDB"], answer: 1, explain: "sessionStorage sirf current tab/session tak zinda rehta hai." },
      { q: "Large structured offline data ke liye sabse acha?", options: ["Cookie", "localStorage", "IndexedDB", "sessionStorage"], answer: 2, explain: "IndexedDB async, transactional aur bada data handle karta hai." }
    ],
    exercises: {
      easy: ["Theme (dark/light) ko localStorage me save karo aur reload pe apply karo.", "Cookie set karke 1 din baad expire karo."],
      medium: ["Multi-step form ka progress sessionStorage me save karo.", "localStorage me todo list (array of objects) store + retrieve karo."],
      advanced: ["IndexedDB me users store banao aur add/get/delete implement karo.", "storage event se do tabs ke beech cart sync karo."]
    },
    summary: [
      "5 storage types: Cookie, localStorage, sessionStorage, IndexedDB, Cache Storage.",
      "Sirf cookie server ko auto jaati hai; baaki client-only.",
      "localStorage permanent, sessionStorage tab tak.",
      "IndexedDB async + bada; localStorage sync + chhota.",
      "Sensitive data HttpOnly cookie me, plain localStorage me nahi.",
      "JSON.stringify/parse zaroori for objects in web storage."
    ],
    cheatsheet: [
      { h: "localStorage", code: "localStorage.setItem('k', JSON.stringify(v));\nJSON.parse(localStorage.getItem('k'));" },
      { h: "Cookie", code: "document.cookie='k=v; max-age=3600; Secure; SameSite=Lax';" },
      { h: "IndexedDB open", code: "const r = indexedDB.open('db', 1);\nr.onsuccess = e => e.target.result;" }
    ],
    projects: [
      "Theme/language preference persistence (localStorage).",
      "Offline-first PWA notes app (IndexedDB + Cache Storage).",
      "Shopping cart that survives reload (localStorage).",
      "Multi-step checkout wizard state (sessionStorage).",
      "Remember-me login with secure cookies."
    ],
    advanced: "🚀 Senior level: Storage quota management (navigator.storage.estimate()), persistent storage permission (navigator.storage.persist()), eviction policies (browser low-disk pe data hata sakta hai), aur cross-tab sync ke liye BroadcastChannel vs storage event trade-offs. PWA me Cache Storage + IndexedDB ka combo offline strategy banata hai.",
    quiz: [
      { q: "navigator.storage.estimate() kya batata hai?", options: ["Used aur available storage quota", "Cookie count", "Tab count", "Cache hits"], answer: 0, explain: "Ye origin ke storage usage aur quota ka estimate deta hai." },
      { q: "storage event kahan fire hota hai?", options: ["Same tab", "Doosre tabs (same origin)", "Server par", "Kahin nahi"], answer: 1, explain: "Change karne wale tab ko chhodkar baaki same-origin tabs me fire hota hai." }
    ],
    related: ["browser-caching", "web-workers", "browser-apis"]
  },

  "browser-caching": {
    overview: "Browser caching matlab resources (HTML, CSS, JS, images) ko **dobara download na karna** — pehle wali copy reuse karna. HTTP headers (Cache-Control, ETag, Last-Modified) batate hain kya, kitni der aur kaise cache karna hai. ⚡",
    why: "Har request server tak jaana slow aur mehnga hai. Caching se pages turant load hote hain, bandwidth bachti hai aur server load kam hota hai. Achhi caching = fast repeat-visits.",
    concept: [
      {
        h: "Cache-Control header 🎛️",
        p: "Server response me batata hai cache rules. **max-age** (seconds tak fresh), **no-cache** (har baar revalidate karo), **no-store** (bilkul cache mat karo), **public** (CDN bhi cache kare), **private** (sirf browser cache kare).",
        code: "Cache-Control: public, max-age=31536000, immutable   // 1 saal, kabhi change nahi\nCache-Control: no-cache                              // store karo par revalidate\nCache-Control: no-store                              // kabhi cache mat karo",
        lang: "js"
      },
      {
        h: "ETag + If-None-Match (304) 🏷️",
        p: "Server resource ka unique hash (ETag) bhejta hai. Next time browser **If-None-Match** me wahi ETag bhejta hai. Agar change nahi hua to server **304 Not Modified** bhejta hai (body bina) — bandwidth bacha.",
        code: "// Response\nETag: \"abc123\"\n// Next request\nIf-None-Match: \"abc123\"\n// Response if unchanged\nHTTP/1.1 304 Not Modified",
        lang: "js"
      },
      {
        h: "Last-Modified + If-Modified-Since 📅",
        p: "ETag ka time-based version. Server resource ki last modified date bhejta hai. Browser **If-Modified-Since** bhejta hai. Unchanged to 304. ETag se kam precise.",
        code: "Last-Modified: Wed, 18 Jun 2026 10:00:00 GMT\nIf-Modified-Since: Wed, 18 Jun 2026 10:00:00 GMT",
        lang: "js"
      },
      {
        h: "Memory cache vs Disk cache 💾",
        p: "**Memory cache** RAM me — super fast, sirf current session tak. **Disk cache** disk par — slower par persistent across sessions. Browser khud decide karta hai kahan rakhe.",
        lang: "js"
      },
      {
        h: "Service Worker cache 🛠️",
        p: "Programmable cache layer. Tum khud control karte ho kya cache ho aur offline kaise serve ho. HTTP cache se zyada flexible — cache-first, network-first strategies.",
        code: "self.addEventListener(\"fetch\", (e) => {\n  e.respondWith(\n    caches.match(e.request).then((res) => res || fetch(e.request))\n  );\n});",
        lang: "js"
      }
    ],
    analogy: "Caching ek student ka **notes photocopy** rakhna hai. Pehli baar library se book laao (network), photocopy bana lo (cache). Agli baar photocopy hi padho (fast). **ETag** = teacher se poochna 'syllabus change hua?' — agar nahi to '304: same hai, apni copy padho'. **max-age** = 'ye notes 1 saal valid hain, dobara mat poochna'.",
    syntax: {
      code: "// Fetch with cache control\nfetch(\"/data.json\", { cache: \"no-cache\" });   // revalidate\nfetch(\"/data.json\", { cache: \"force-cache\" }); // cache se hi lo\nfetch(\"/data.json\", { cache: \"reload\" });      // network se fresh",
      note: "fetch() ka 'cache' option browser ke HTTP cache behavior ko control karta hai.",
      lang: "js"
    },
    steps: [
      "Browser resource maangta hai (HTML/CSS/JS/image).",
      "Cache check: kya yeh resource already cached hai?",
      "Agar cached aur max-age fresh → directly cache se serve (no network).",
      "Agar cached par stale → ETag/Last-Modified ke saath revalidate request.",
      "Server unchanged → 304 Not Modified (body nahi, cache reuse).",
      "Server changed → 200 with new body, cache update.",
      "no-store → hamesha fresh fetch, cache nahi.",
      "Service Worker ho to woh apni strategy se intercept karta hai."
    ],
    internals: {
      p: "Browser ki cache hierarchy: **Service Worker cache → Memory cache → Disk cache → HTTP/2 Push cache → Network**. Request pehle SW se guzarti hai (agar registered), fir memory (fastest), fir disk. 'immutable' wale assets revalidate bhi nahi karte. Content-hashed filenames (app.a1b2.js) se long cache + safe updates milte hain.",
      code: "// cache-first strategy in SW\ncaches.match(req).then(c => c || fetch(req).then(r => {\n  const copy = r.clone();\n  caches.open('v1').then(cache => cache.put(req, copy));\n  return r;\n}));",
      lang: "js"
    },
    process: {
      type: "boxes",
      items: [
        { label: "Service Worker", sub: "programmable, offline", color: "#8B5CF6" },
        { label: "Memory Cache", sub: "RAM, fastest, session", color: "#10B981" },
        { label: "Disk Cache", sub: "persistent, slower", color: "#14B8A6" },
        { label: "Network", sub: "last resort, slowest", color: "#F43F5E" }
      ]
    },
    visual: {
      type: "timeline",
      items: [
        { year: "1", text: "Request bani — browser cache check karta hai" },
        { year: "2", text: "Fresh (max-age valid)? → cache se serve, done" },
        { year: "3", text: "Stale? → ETag/Last-Modified ke saath revalidate" },
        { year: "4", text: "304 → cache reuse | 200 → new body + cache update" },
        { year: "5", text: "no-store → hamesha network se fresh" }
      ]
    },
    memory: "Yaad rakho: **'max-age = kitni der fresh, ETag = changed ya nahi, no-store = bilkul mat rakho'**. 304 = 'same hai, apni copy use karo'.",
    browser: "DevTools → Network tab me 'Size' column me '(memory cache)', '(disk cache)' ya '304' dikhta hai. Headers me Cache-Control, ETag, Last-Modified inspect karo. 'Disable cache' checkbox testing ke liye.",
    notes: {
      concept: "no-cache ka matlab 'cache mat karo' NAHI hai — store karo par har baar revalidate karo. no-store = bilkul mat store karo.",
      tip: "Static assets (JS/CSS) ko content hash ke saath naam do (app.a1b2.js) → long max-age + immutable safe.",
      warning: "HTML ko long cache mat karo — warna users ko purana app dikhega. HTML no-cache, assets long cache.",
      error: "Stale cache se purana code chal sakta hai — cache busting (hashing) zaroori hai."
    },
    compare: {
      headers: ["Header/Concept", "Kaam", "Network call?", "Use case"],
      rows: [
        ["max-age", "Fresh duration", "Nahi (jab tak fresh)", "Static assets"],
        ["no-cache", "Store + revalidate", "Haan (304 possible)", "HTML, dynamic"],
        ["no-store", "Bilkul cache nahi", "Hamesha", "Sensitive data"],
        ["ETag", "Content hash check", "Revalidate only", "Precise validation"],
        ["Last-Modified", "Date check", "Revalidate only", "Time-based fallback"],
        ["immutable", "Kabhi revalidate nahi", "Nahi", "Hashed assets"]
      ]
    },
    mistakes: [
      { bad: "HTML par Cache-Control: max-age=31536000", fix: "HTML ko no-cache rakho, sirf hashed static assets ko long cache do." },
      { bad: "no-cache ko 'never store' samajhna", fix: "no-cache = store + always revalidate; no-store = never store." },
      { bad: "Assets bina content-hash ke long-cache", fix: "Filename me hash daalo (app.a1b2.js) taaki update safe ho." },
      { bad: "Service worker cache version bump bhulna", fix: "Cache name version karo (v1→v2) aur activate me purana delete karo." }
    ],
    best: [
      "Hashed static assets: Cache-Control: public, max-age=31536000, immutable.",
      "HTML/API: no-cache ya short max-age + ETag.",
      "ETag use karo precise revalidation ke liye.",
      "Sensitive responses par no-store.",
      "Service Worker me clear cache versioning + cleanup.",
      "CDN ke sasth public cache use karo bandwidth bachane ke liye."
    ],
    performance: "⚡ Achha caching repeat-visit ko milliseconds me load karta hai — zero network. 304 responses body skip karke bandwidth bachate hain. immutable assets revalidation bhi skip karte hain. Galat caching = stale bugs ya har baar full download (slow).",
    tricky: [
      {
        title: "no-cache vs no-store",
        explain: "no-cache: cache karo par use se pehle revalidate (304 mil sakta hai, fast). no-store: cache hi mat karo, hamesha full fetch. Naam bhramit karte hain!",
        lang: "js"
      },
      {
        title: "304 me body nahi hota",
        explain: "304 Not Modified response empty body bhejta hai — browser apni cached copy use karta hai. Isliye 304 bahut light hota hai.",
        lang: "js"
      }
    ],
    interview: {
      beginner: [
        { q: "Browser caching kyun?", a: "Resources dobara download na karke fast load, kam bandwidth aur kam server load." },
        { q: "max-age kya karta hai?", a: "Resource kitne seconds tak 'fresh' maana jaaye — us duration me browser cache se serve karta hai bina network ke." }
      ],
      intermediate: [
        { q: "ETag kaise kaam karta hai?", a: "Server resource ka hash ETag me bhejta hai. Browser next time If-None-Match me wahi bhejta hai. Unchanged → 304 (body skip), changed → 200 new body." },
        { q: "no-cache aur no-store me farq?", a: "no-cache: store karo par har use se pehle revalidate. no-store: kabhi store mat karo." }
      ],
      advanced: [
        { q: "Cache busting kaise karte ho?", a: "Static asset filename me content hash (app.a1b2.js). Content badle to hash badle → naya URL → browser fresh fetch karta hai, purana long-cached safe rehta hai." },
        { q: "Browser cache hierarchy?", a: "Service Worker → Memory cache (RAM) → Disk cache → Network. Pehle SW intercept karta hai fir memory/disk check hota hai." }
      ]
    },
    mcqs: [
      { q: "304 Not Modified ka matlab?", options: ["Resource delete ho gaya", "Cached copy abhi valid hai, reuse karo", "Server error", "Cache disabled"], answer: 1, explain: "304 batata hai resource change nahi hua — browser apni cached copy use kare." },
      { q: "Konsa header bilkul cache nahi hone deta?", options: ["max-age=0", "no-cache", "no-store", "private"], answer: 2, explain: "no-store browser ko cache hi nahi karne deta." },
      { q: "Content-hashed filename (app.a1b2.js) ka fayda?", options: ["Chhota size", "Safe long-term caching + auto cache bust", "Faster parse", "SEO"], answer: 1, explain: "Content badalne par hash badalta hai → naya URL → fresh fetch, purana cached safe." }
    ],
    exercises: {
      easy: ["DevTools Network me 'memory cache' aur 'disk cache' wale resources dhoondho.", "Ek image par Cache-Control header inspect karo."],
      medium: ["fetch() ke cache options (no-cache, reload, force-cache) test karo.", "Server response me ETag aur 304 flow observe karo."],
      advanced: ["Service Worker me cache-first strategy implement karo.", "Cache versioning (v1→v2) + purana cache cleanup likho."]
    },
    summary: [
      "Caching = resources reuse, no re-download → fast + kam bandwidth.",
      "Cache-Control: max-age, no-cache, no-store, public/private.",
      "ETag/Last-Modified se revalidation → 304 Not Modified.",
      "Hierarchy: Service Worker → Memory → Disk → Network.",
      "Hashed assets long-cache, HTML no-cache.",
      "Service Worker programmable cache + offline support."
    ],
    cheatsheet: [
      { h: "Long cache asset", code: "Cache-Control: public, max-age=31536000, immutable" },
      { h: "Always revalidate", code: "Cache-Control: no-cache\nETag: \"abc123\"" },
      { h: "SW cache-first", code: "caches.match(req).then(r => r || fetch(req));" }
    ],
    projects: [
      "PWA with offline support (Service Worker cache).",
      "Static site with aggressive asset caching + CDN.",
      "API response caching layer for faster repeat loads.",
      "Image-heavy gallery with disk cache optimization.",
      "Cache-busting build pipeline (hashed filenames)."
    ],
    advanced: "🚀 Senior level: stale-while-revalidate (cached serve + background update), CDN edge caching vs browser caching, Vary header (cache per Accept-Encoding/language), HTTP/2 push cache, aur Service Worker me network-first vs cache-first vs stale-while-revalidate strategies ka trade-off. Cache key design aur partitioned cache (privacy) bhi important hai.",
    quiz: [
      { q: "stale-while-revalidate kya karta hai?", options: ["Cache serve + background me update", "Cache delete", "Network-only", "Block request"], answer: 0, explain: "Turant cached copy serve karta hai aur background me fresh laata hai — fast + eventually fresh." },
      { q: "Vary header kis liye?", options: ["Cache size", "Alag responses cache karne (e.g. encoding/language) ke liye", "Expiry", "Security"], answer: 1, explain: "Vary batata hai request ke kis header pe response alag ho sakta hai → alag cache entries." }
    ],
    related: ["browser-storage", "web-workers", "http-versions"]
  },

  "web-workers": {
    overview: "Web Workers JavaScript ko **background thread** me chalane dete hain — main (UI) thread free rehta hai. Heavy computation worker me karo to page hang nahi hota. Workers me **DOM access nahi** hota; communication **postMessage** se hota hai. 🧵",
    why: "JavaScript single-threaded hai. Bhaari kaam (image processing, big loops, parsing) main thread par chale to UI freeze ho jaata hai — clicks/scroll ruk jaate hain. Workers us kaam ko alag thread me bhej kar UI smooth rakhte hain.",
    concept: [
      {
        h: "Dedicated Worker 👷",
        p: "Sabse common. Ek script, ek owner page. Heavy CPU tasks background me. DOM nahi chhu sakta. main thread <-> worker postMessage se baat karte hain.",
        code: "// main.js\nconst w = new Worker(\"worker.js\");\nw.postMessage({ n: 40 });\nw.onmessage = (e) => console.log(\"result:\", e.data);\n\n// worker.js\nonmessage = (e) => {\n  const r = heavyCalc(e.data.n);\n  postMessage(r);\n};",
        lang: "js"
      },
      {
        h: "Shared Worker 🤝",
        p: "Multiple tabs/windows (same origin) ek hi worker share kar sakte hain. Tabs ke beech shared state/communication. 'port' ke through baat hoti hai.",
        code: "const sw = new SharedWorker(\"shared.js\");\nsw.port.start();\nsw.port.postMessage(\"hello\");\nsw.port.onmessage = (e) => console.log(e.data);",
        lang: "js"
      },
      {
        h: "Service Worker 🛡️",
        p: "Special worker jo **network proxy** ki tarah kaam karta hai. Requests intercept, offline caching, push notifications, background sync. PWA ki neenv. Page ke bina bhi chal sakta hai.",
        code: "navigator.serviceWorker.register(\"/sw.js\");\n// sw.js\nself.addEventListener(\"fetch\", (e) => {\n  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));\n});",
        lang: "js"
      },
      {
        h: "No DOM, message passing 📬",
        p: "Workers DOM, window, document access nahi kar sakte. Sirf postMessage se data bhejte hain. Data **structured clone** hota hai (copy), ya Transferable objects se ownership transfer hota hai (fast).",
        code: "// Transferable: ownership transfer (copy nahi)\nconst buf = new ArrayBuffer(1024);\nworker.postMessage(buf, [buf]); // buf ab main thread me unusable",
        lang: "js"
      },
      {
        h: "Service Worker lifecycle ♻️",
        p: "**install** (cache setup) → **activate** (purana cache cleanup) → **fetch** (requests handle). Ek baar registered, page reloads ke beech zinda rehta hai.",
        code: "self.addEventListener(\"install\", e => e.waitUntil(caches.open(\"v1\")));\nself.addEventListener(\"activate\", e => {/* old cache delete */});\nself.addEventListener(\"fetch\", e => {/* respond */});",
        lang: "js"
      }
    ],
    analogy: "Main thread = ek waiter jo orders bhi le aur khana bhi banaye → customers wait karenge. **Web Worker** = alag chef (kitchen) jo background me khana banata hai, waiter (UI) free rehkar customers serve karta rehta hai. **Service Worker** = restaurant ka gatekeeper jo har order (request) ko intercept karke decide karta hai — fresh banाye ya freezer (cache) se de.",
    syntax: {
      code: "const worker = new Worker(\"worker.js\");\nworker.postMessage(data);          // send\nworker.onmessage = (e) => e.data;  // receive\nworker.terminate();                // stop worker\n// inside worker:\nself.onmessage = (e) => self.postMessage(result);",
      note: "Worker file alag JS file honi chahiye (ya Blob URL/module worker). main thread se DOM-related kaam hi karo.",
      lang: "js"
    },
    steps: [
      "Heavy task identify karo jo UI block karta hai.",
      "Alag worker.js file banao (no DOM code).",
      "Main thread me new Worker('worker.js') se create karo.",
      "postMessage se input data worker ko bhejo.",
      "Worker me onmessage par computation karo.",
      "postMessage se result wapas main thread ko bhejo.",
      "Main thread onmessage me result UI me dikhao.",
      "Kaam khatam → worker.terminate() se memory free karo."
    ],
    internals: {
      p: "Har worker apna **alag thread, alag global scope (self), alag event loop** rakhta hai — memory share nahi hota (except SharedArrayBuffer). Data postMessage se **structured clone algorithm** se copy hota hai. Transferable objects (ArrayBuffer) ownership transfer karte hain bina copy ke (fast). Service Worker browser ke control me chalta hai aur page band hone pe bhi events (push/sync) handle kar sakta hai.",
      code: "// SharedArrayBuffer: actual shared memory (rare, advanced)\nconst sab = new SharedArrayBuffer(1024);\nworker.postMessage(sab); // dono threads same memory dekhte hain",
      lang: "js"
    },
    process: {
      type: "boxes",
      items: [
        { label: "Main Thread", sub: "UI + DOM", color: "#3B82F6" },
        { label: "postMessage", sub: "data copy/transfer", color: "#F97316" },
        { label: "Worker Thread", sub: "heavy compute, no DOM", color: "#10B981" },
        { label: "Result back", sub: "postMessage → UI", color: "#14B8A6" }
      ]
    },
    visual: {
      type: "timeline",
      items: [
        { year: "1", text: "Main thread Worker create karta hai" },
        { year: "2", text: "postMessage se input bhejta hai" },
        { year: "3", text: "Worker background thread me compute karta hai" },
        { year: "4", text: "UI smooth chalti rehti hai (non-blocking)" },
        { year: "5", text: "Worker postMessage se result wapas bhejta hai" }
      ]
    },
    memory: "Yaad rakho: **'Worker = alag thread, NO DOM, postMessage hi zariya'**. Dedicated (1 page), Shared (many tabs), Service (network proxy + offline).",
    browser: "DevTools → Sources me workers alag dikhte hain (debug kar sakte ho). Application → Service Workers me register/update/unregister. Service Worker offline testing ke liye Network → Offline.",
    notes: {
      concept: "Workers ka alag global scope hota hai — window nahi, 'self' use hota hai.",
      tip: "Bade data ke liye Transferable objects use karo (copy nahi, transfer) — bahut fast.",
      warning: "Workers DOM access nahi kar sakte — UI update main thread me hi karo.",
      error: "Worker file alag se serve honi chahiye; CORS/file:// se Worker load fail ho sakta hai."
    },
    compare: {
      headers: ["Feature", "Dedicated Worker", "Shared Worker", "Service Worker"],
      rows: [
        ["Scope", "Ek page", "Multiple tabs", "Origin-wide proxy"],
        ["DOM access", "Nahi", "Nahi", "Nahi"],
        ["Main use", "Heavy compute", "Cross-tab share", "Offline/cache/push"],
        ["Lifetime", "Page tak", "Tabs tak", "Page ke baad bhi"],
        ["Network intercept", "Nahi", "Nahi", "Haan (fetch)"]
      ]
    },
    mistakes: [
      { bad: "Worker me document.getElementById use karna", fix: "Worker me DOM nahi — data postMessage se main thread ko bhejo, wahin DOM update karo." },
      { bad: "Bada array har baar copy karke bhejna", fix: "Transferable (ArrayBuffer) use karo — ownership transfer, no copy." },
      { bad: "Worker terminate na karna", fix: "Kaam khatam pe worker.terminate() — warna memory leak." },
      { bad: "Service Worker cache version bump bhulna", fix: "install/activate me cache name version + purana delete karo." }
    ],
    best: [
      "CPU-heavy kaam workers me, DOM kaam main thread me.",
      "Bade data ke liye Transferable objects.",
      "Worker pool reuse karo (har baar naya mat banao).",
      "Service Worker ko HTTPS par hi register karo (security).",
      "Error handling: worker.onerror listener lagao.",
      "Worker ko module type me likho (clean imports)."
    ],
    performance: "⚡ Workers heavy computation main thread se hata kar UI ko 60fps smooth rakhte hain. Lekin postMessage me structured clone ka cost hota hai — bade objects ke liye Transferable ya SharedArrayBuffer use karo. Service Worker offline + caching se repeat loads instant ho jaate hain.",
    tricky: [
      {
        title: "Worker me window undefined",
        code: "// worker.js\nconsole.log(typeof window);  // \"undefined\"\nconsole.log(typeof self);    // \"object\"",
        output: "undefined / object",
        explain: "Workers me window nahi hota — global object 'self' hai. DOM APIs unavailable.",
        lang: "js"
      },
      {
        title: "Transferable ke baad buffer unusable",
        explain: "ArrayBuffer transfer karne ke baad sender side par woh detached ho jaata hai (byteLength 0) — kyunki ownership transfer ho gaya, copy nahi hua.",
        lang: "js"
      }
    ],
    interview: {
      beginner: [
        { q: "Web Worker kya hai?", a: "Background thread me JS chalane ka tarika taaki main/UI thread free rahe aur page hang na ho. DOM access nahi hota; postMessage se communication." },
        { q: "Worker DOM access kar sakta hai?", a: "Nahi. Workers ka apna global scope (self) hota hai, window/document nahi. UI update main thread me hi hota hai." }
      ],
      intermediate: [
        { q: "Service Worker aur Web Worker me farq?", a: "Web Worker heavy compute ke liye background thread. Service Worker network proxy hai — requests intercept, offline cache, push notifications; page ke baad bhi zinda." },
        { q: "Workers ke beech data kaise jaata hai?", a: "postMessage se. Default me structured clone (copy). Bade data ke liye Transferable objects ya SharedArrayBuffer." }
      ],
      advanced: [
        { q: "Service Worker lifecycle samjhao.", a: "Register → install (cache setup, waitUntil) → activate (purana cache cleanup) → fetch (requests handle). Update hone par naya SW install hota hai aur purana close hone par activate." },
        { q: "SharedArrayBuffer kya hai?", a: "Actual shared memory dono threads ke beech (copy nahi). High-performance parallel computing ke liye, par security (Spectre) wajah se cross-origin isolation headers chahiye." }
      ]
    },
    mcqs: [
      { q: "Worker me DOM access?", options: ["Haan", "Nahi", "Sirf read", "Sirf Service Worker"], answer: 1, explain: "Kisi bhi worker me DOM/window access nahi hota." },
      { q: "Network requests intercept konsa worker karta hai?", options: ["Dedicated", "Shared", "Service Worker", "Koi nahi"], answer: 2, explain: "Service Worker fetch events se requests intercept karta hai (proxy)." },
      { q: "Bade data ko bina copy ke worker ko kaise bhejte hain?", options: ["JSON.stringify", "Transferable objects", "localStorage", "cookie"], answer: 1, explain: "Transferable objects ownership transfer karte hain — copy nahi hota, fast." }
    ],
    exercises: {
      easy: ["Ek dedicated worker banao jo number ka square return kare.", "Worker me ek loop chalao aur UI freeze na ho yeh observe karo."],
      medium: ["Worker me Fibonacci(40) calculate karke result UI me dikhao.", "Transferable ArrayBuffer worker ko bhejo aur process karo."],
      advanced: ["Service Worker register karke offline page serve karo.", "Service Worker me cache-first + network fallback strategy likho."]
    },
    summary: [
      "Workers = background threads, UI thread free, no DOM.",
      "Communication postMessage se (structured clone / Transferable).",
      "Dedicated = 1 page, Shared = many tabs, Service = network proxy.",
      "Service Worker: offline cache, push, lifecycle install/activate/fetch.",
      "Worker me self global, window nahi.",
      "Heavy compute workers me bhejo for smooth 60fps UI."
    ],
    cheatsheet: [
      { h: "Create worker", code: "const w = new Worker('worker.js');\nw.postMessage(data);\nw.onmessage = e => e.data;" },
      { h: "Inside worker", code: "self.onmessage = e => self.postMessage(work(e.data));" },
      { h: "Register SW", code: "navigator.serviceWorker.register('/sw.js');" }
    ],
    projects: [
      "Image/video processing in background (no UI freeze).",
      "Offline-capable PWA (Service Worker + cache).",
      "Real-time data crunching dashboard (worker compute).",
      "Cross-tab chat/state sync via Shared Worker.",
      "Push notifications + background sync app."
    ],
    advanced: "🚀 Senior level: Worker pools (reuse instead of create/destroy), Comlink library (postMessage ko async function calls jaisa banata hai), OffscreenCanvas (canvas rendering worker me), SharedArrayBuffer + Atomics (true parallelism), aur cross-origin isolation (COOP/COEP headers) requirements. Service Worker me advanced strategies aur background sync senior interviews me aate hain.",
    quiz: [
      { q: "OffscreenCanvas kya allow karta hai?", options: ["DOM in worker", "Canvas rendering worker thread me", "localStorage in worker", "Cookies"], answer: 1, explain: "OffscreenCanvas canvas drawing ko worker thread me le jaata hai — main thread free." },
      { q: "Comlink library kya simplify karti hai?", options: ["DOM access", "postMessage ko function calls jaisa", "CSS", "Caching"], answer: 1, explain: "Comlink worker communication ko RPC-style async function calls me wrap kar deti hai." }
    ],
    related: ["browser-caching", "browser-storage", "async-internals"]
  },

  "same-origin-cors": {
    overview: "**Same-Origin Policy (SOP)** browser ki security ki neenv hai — ek origin ka script doosre origin ke data ko freely nahi padh sakta. **CORS** (Cross-Origin Resource Sharing) ek controlled tarika hai jisse server kuch cross-origin requests ko allow kar sakta hai. 🔒",
    why: "Bina SOP ke, koi malicious site tumhare bank account (jis pe tum logged-in ho) ka data padh sakti thi. SOP isolation deta hai. Par real apps ko alag domains (api.example.com) se data chahiye — CORS safe tarika deta hai cross-origin allow karne ka.",
    concept: [
      {
        h: "Origin = protocol + host + port 🌐",
        p: "Do URLs **same origin** tab hain jab teeno match karein: protocol (http/https), host (domain), aur port. Ek bhi alag = cross-origin.",
        code: "// Origin = https://app.com:443\nhttps://app.com/page    // SAME origin\nhttp://app.com          // DIFFERENT (protocol)\nhttps://api.app.com     // DIFFERENT (host)\nhttps://app.com:8080    // DIFFERENT (port)",
        lang: "js"
      },
      {
        h: "Same-Origin Policy 🛡️",
        p: "Browser scripts ko doosre origin ke responses padhne se rokta hai. Tum request bhej sakte ho, par bina permission response read nahi kar sakte. Cookies, DOM, localStorage sab origin-isolated.",
        lang: "js"
      },
      {
        h: "Simple vs Preflighted requests ✈️",
        p: "**Simple request** (GET/POST/HEAD with safe headers) seedha jaati hai. **Preflighted** request (PUT/DELETE, custom headers, JSON content-type) se pehle browser **OPTIONS** request bhejta hai permission poochhne.",
        code: "// Preflight (browser automatically bhejta hai)\nOPTIONS /data HTTP/1.1\nAccess-Control-Request-Method: PUT\nAccess-Control-Request-Headers: Content-Type",
        lang: "js"
      },
      {
        h: "CORS response headers 📋",
        p: "Server batata hai kis origin ko allow karna hai: **Access-Control-Allow-Origin**, allowed methods, headers, aur credentials. Browser inhe check karke allow/block karta hai.",
        code: "Access-Control-Allow-Origin: https://app.com\nAccess-Control-Allow-Methods: GET, POST, PUT\nAccess-Control-Allow-Headers: Content-Type\nAccess-Control-Allow-Credentials: true",
        lang: "js"
      },
      {
        h: "Credentials (cookies) 🍪",
        p: "Cross-origin request ke saath cookies bhejne ke liye client par credentials:'include' aur server par Allow-Credentials:true chahiye. Tab Allow-Origin '*' nahi, specific origin hona chahiye.",
        code: "fetch(\"https://api.app.com/data\", { credentials: \"include\" });\n// Server: Access-Control-Allow-Credentials: true\n//         Access-Control-Allow-Origin: https://app.com (NOT *)",
        lang: "js"
      }
    ],
    analogy: "SOP ek **society ka security guard** hai. Tumhare ghar (origin A) ka aadmi padosi ke ghar (origin B) me bina permission ghus kar saaman nahi dekh sakta. **CORS** = padosi ne guard ko likhwa diya 'flat A-101 wale ko mere drawing room tak aane do' (Access-Control-Allow-Origin). **Preflight** = pehle guard ko phone karke poochhna 'main aa sakta hoon?' (OPTIONS) — guard 'haan' bole tabhi aao.",
    syntax: {
      code: "fetch(\"https://api.other.com/data\")\n  .then(r => r.json())\n  .catch(err => console.error(\"CORS blocked?\", err));\n\n// With credentials\nfetch(url, { credentials: \"include\" });",
      note: "CORS server-side configuration hai — frontend se 'fix' nahi hota. Server ko sahi headers bhejne padte hain.",
      lang: "js"
    },
    steps: [
      "Browser cross-origin request banata hai (fetch/XHR).",
      "Check: simple request hai ya preflight chahiye?",
      "Preflight chahiye → browser OPTIONS request bhejta hai.",
      "Server OPTIONS ka jawab Access-Control-* headers se deta hai.",
      "Browser headers check karta hai — allowed origin/method/header?",
      "Allowed → actual request jaati hai, response milta hai.",
      "Not allowed → browser response BLOCK karta hai (CORS error).",
      "Credentials chahiye → Allow-Credentials:true + specific origin."
    ],
    internals: {
      p: "Important: CORS error me request server tak **pohonchti hai aur process bhi hoti hai** — browser sirf JS ko **response padhne se rokta hai**. Isiliye CSRF se bachne ke liye CORS kaafi nahi. Preflight ko Access-Control-Max-Age se cache kiya jaa sakta hai (har baar OPTIONS na ho). Opaque responses (no-cors mode) milte hain par read nahi hote.",
      code: "// Preflight caching\nAccess-Control-Max-Age: 86400  // 1 din tak OPTIONS skip",
      lang: "js"
    },
    process: {
      type: "boxes",
      items: [
        { label: "Cross-origin fetch", sub: "app.com → api.com", color: "#3B82F6" },
        { label: "Preflight OPTIONS", sub: "permission poochho", color: "#F97316" },
        { label: "Server headers", sub: "Allow-Origin etc.", color: "#10B981" },
        { label: "Allowed? read", sub: "warna BLOCK", color: "#F43F5E" }
      ]
    },
    visual: {
      type: "timeline",
      items: [
        { year: "1", text: "JS cross-origin request banata hai" },
        { year: "2", text: "Non-simple? → browser OPTIONS preflight bhejta hai" },
        { year: "3", text: "Server Access-Control-Allow-* headers bhejta hai" },
        { year: "4", text: "Browser headers verify karta hai" },
        { year: "5", text: "Match → response readable | warna CORS error" }
      ]
    },
    memory: "Yaad rakho: **Origin = Protocol + Host + Port (PHP)**. CORS error frontend bug nahi — **server** ko Access-Control-Allow-Origin set karna padta hai.",
    browser: "DevTools → Console me CORS errors clearly dikhte hain ('blocked by CORS policy'). Network tab me OPTIONS (preflight) request aur uske response headers (Access-Control-*) inspect karo.",
    notes: {
      concept: "CORS server ko request reach hone se nahi rokta — sirf browser-side JS ko response read karne se rokta hai.",
      tip: "Development me proxy (Vite proxy) use karke CORS bypass kar sakte ho dev me.",
      warning: "Access-Control-Allow-Origin: '*' ke saath credentials:include kaam nahi karta — specific origin chahiye.",
      error: "'No Access-Control-Allow-Origin header' = server ne CORS allow nahi kiya. Fix server par hota hai."
    },
    compare: {
      headers: ["Aspect", "Simple Request", "Preflighted Request"],
      rows: [
        ["Methods", "GET, POST, HEAD", "PUT, DELETE, PATCH"],
        ["Preflight", "Nahi", "Haan (OPTIONS pehle)"],
        ["Content-Type", "text/plain, form", "application/json etc."],
        ["Custom headers", "Nahi", "Haan"],
        ["Extra round-trip", "Nahi", "Haan (OPTIONS)"]
      ]
    },
    mistakes: [
      { bad: "CORS error ko frontend code se fix karne ki koshish", fix: "CORS server-side hai — server par Access-Control-Allow-Origin set karo." },
      { bad: "Allow-Origin: '*' with credentials:'include'", fix: "Credentials ke saath specific origin do, '*' allowed nahi." },
      { bad: "Maanna ki CORS error = request server tak nahi gayi", fix: "Request jaati hai aur process bhi hoti hai — browser sirf response block karta hai." },
      { bad: "Har request par preflight ignore karna (slow)", fix: "Access-Control-Max-Age se preflight cache karo." }
    ],
    best: [
      "Server par exact allowed origins whitelist karo (not blind '*').",
      "Credentials zaroori ho tabhi include karo, with specific origin.",
      "Preflight ko Max-Age se cache karo (performance).",
      "Dev me Vite/proxy se CORS handle karo, prod me proper headers.",
      "CORS ke bharose security mat rakho — auth tokens + CSRF protection use karo.",
      "Sirf zaroori methods/headers allow karo (least privilege)."
    ],
    performance: "⚡ Preflight (OPTIONS) ek extra round-trip add karta hai — bar-bar non-simple requests slow ho sakti hain. Access-Control-Max-Age se preflight cache karke ise reduce karo. Simple requests (GET) me preflight nahi hota — fast.",
    tricky: [
      {
        title: "Subdomain bhi cross-origin hai",
        code: "// app.com se\nfetch(\"https://api.app.com/x\"); // CROSS-origin! (host alag)",
        explain: "api.app.com aur app.com alag origins hain — subdomain different host hai, isliye CORS lagega.",
        lang: "js"
      },
      {
        title: "CORS error me bhi server data process karta hai",
        explain: "POST request server tak jaati hai, DB update bhi ho sakta hai — browser sirf JS ko response padhne se rokta hai. Isiliye CORS CSRF protection nahi hai.",
        lang: "js"
      }
    ],
    interview: {
      beginner: [
        { q: "Origin kya hota hai?", a: "Protocol + Host + Port ka combination. Teeno same hone par same-origin, ek bhi alag to cross-origin." },
        { q: "Same-Origin Policy kyun hai?", a: "Security — taaki ek malicious site doosre origin (jaise tumhare logged-in bank) ka data na padh sake." }
      ],
      intermediate: [
        { q: "CORS kaise kaam karta hai?", a: "Server response me Access-Control-Allow-Origin (aur related) headers bhejta hai. Browser inhe check karke decide karta hai cross-origin response JS ko dena hai ya block karna hai." },
        { q: "Preflight request kab hoti hai?", a: "Non-simple requests par (PUT/DELETE, custom headers, application/json). Browser pehle OPTIONS bhej kar permission leta hai." }
      ],
      advanced: [
        { q: "CORS error me request server tak jaati hai kya?", a: "Haan — request jaati hai aur process hoti hai. Browser sirf JS ko response padhne se rokta hai. Isiliye CORS CSRF se nahi bachata." },
        { q: "Credentials ke saath '*' kyun nahi chalta?", a: "Security — credentials (cookies) ke saath wildcard origin allow karna har site ko sensitive data dega. Specific origin must be echoed back." }
      ]
    },
    mcqs: [
      { q: "Origin kis se banta hai?", options: ["Sirf domain", "Protocol + Host + Port", "Sirf path", "URL + cookie"], answer: 1, explain: "Origin = protocol + host + port. Teeno same = same origin." },
      { q: "Preflight request konsi method use karti hai?", options: ["GET", "POST", "OPTIONS", "HEAD"], answer: 2, explain: "Browser OPTIONS request se preflight bhejta hai." },
      { q: "CORS fix kahan hota hai?", options: ["Frontend JS", "Browser settings", "Server response headers", "DNS"], answer: 2, explain: "Server ko Access-Control-Allow-Origin headers bhejne padte hain." }
    ],
    exercises: {
      easy: ["DevTools Console me CORS error reproduce karo (cross-origin fetch).", "Same vs cross origin ke 3 URL examples likho."],
      medium: ["Network tab me preflight OPTIONS request inspect karo.", "Vite dev proxy se CORS bypass setup samjho."],
      advanced: ["Ek simple server par CORS headers add karke cross-origin fetch allow karo.", "Credentials:include flow with specific origin implement karo."]
    },
    summary: [
      "Origin = protocol + host + port; teeno match = same origin.",
      "SOP security ke liye cross-origin data reading rokti hai.",
      "CORS server-controlled tarika hai cross-origin allow karne ka.",
      "Non-simple requests par preflight OPTIONS jaati hai.",
      "Access-Control-Allow-* headers server bhejta hai.",
      "CORS request ko nahi rokta, sirf response reading rokta hai."
    ],
    cheatsheet: [
      { h: "Allow origin", code: "Access-Control-Allow-Origin: https://app.com" },
      { h: "Credentials", code: "fetch(url, { credentials: 'include' });\n// + Allow-Credentials: true" },
      { h: "Preflight cache", code: "Access-Control-Max-Age: 86400" }
    ],
    projects: [
      "Frontend (app.com) consuming API on api.app.com (CORS setup).",
      "Public API with whitelisted CORS origins.",
      "Authenticated cross-origin app with credentials cookies.",
      "Dev proxy setup to avoid CORS in local development.",
      "Third-party widget embedding with controlled CORS."
    ],
    advanced: "🚀 Senior level: CORS vs CORB (Cross-Origin Read Blocking), opaque responses (no-cors mode), Cross-Origin-Resource-Policy (CORP), COOP/COEP for cross-origin isolation (SharedArrayBuffer ke liye zaroori), aur SameSite cookies ka CORS ke saath interaction. Yeh samajhna ki CORS ek browser-enforced policy hai, server-to-server pe lagu nahi hoti — important distinction.",
    quiz: [
      { q: "CORS server-to-server requests pe lagu hota hai?", options: ["Haan", "Nahi, sirf browsers enforce karte hain", "Sirf HTTPS me", "Sirf GET pe"], answer: 1, explain: "CORS browser-enforced hai. Server-to-server (curl, backend) calls par CORS lagu nahi hota." },
      { q: "COOP/COEP headers kis liye chahiye?", options: ["Caching", "Cross-origin isolation (SharedArrayBuffer)", "DNS", "Compression"], answer: 1, explain: "Cross-origin isolation enable karke SharedArrayBuffer jaise powerful features safely milte hain." }
    ],
    related: ["xss-csrf-csp", "browser-apis", "tls-ssl"]
  },

  "xss-csrf-csp": {
    overview: "Web security ke 3 must-know: **XSS** (malicious script inject karna), **CSRF** (user ke logged-in session ka galat fायda uthana), aur **CSP** (Content-Security-Policy header jo allowed sources restrict karke XSS rokta hai). Product interviews me ye guaranteed aate hain. 🛡️",
    why: "Web apps user data handle karte hain — passwords, payments, personal info. Ek XSS ya CSRF hole se attacker accounts hijack, data chura ya actions perform kar sakta hai. Security samajhna har frontend dev ki zimmedari hai.",
    concept: [
      {
        h: "XSS — Cross-Site Scripting 💉",
        p: "Attacker malicious JS inject karta hai jo victim ke browser me chalta hai — cookies/tokens chura sakta hai. **Stored** (DB me save, sab ko serve), **Reflected** (URL/param se reflect), **DOM-based** (client-side JS unsafe DOM update).",
        code: "// VULNERABLE: user input directly DOM me\nel.innerHTML = userInput; // <img src=x onerror=alert(document.cookie)>\n\n// SAFE: text as text\nel.textContent = userInput;",
        lang: "js"
      },
      {
        h: "XSS prevention 🧼",
        p: "User input ko **escape/sanitize** karo. innerHTML ki jagah textContent. HTML chahiye to DOMPurify jaisi library se sanitize. Frameworks (React) by default escape karte hain — par dangerouslySetInnerHTML risk hai.",
        code: "import DOMPurify from \"dompurify\";\nel.innerHTML = DOMPurify.sanitize(userHtml); // safe HTML",
        lang: "js"
      },
      {
        h: "CSRF — Cross-Site Request Forgery 🎭",
        p: "Attacker tumhare logged-in session (cookie auto-send) ka use karke tumhari taraf se request karwata hai — bina tumhe pata chale (e.g. paisa transfer). Tum kisi malicious site par ho aur woh tumhare bank ko request bhejti hai.",
        code: "<!-- malicious site par -->\n<form action=\"https://bank.com/transfer\" method=\"POST\">\n  <input name=\"amount\" value=\"10000\">\n</form>\n<script>document.forms[0].submit()</script>",
        lang: "html"
      },
      {
        h: "CSRF prevention 🔐",
        p: "**CSRF tokens** (server unique token deta hai, attacker ke paas nahi hota), **SameSite cookies** (Lax/Strict — cross-site requests me cookie nahi jaati), aur sensitive actions par re-auth.",
        code: "Set-Cookie: session=abc; SameSite=Strict; Secure; HttpOnly\n// + hidden CSRF token form me, server verify karta hai",
        lang: "js"
      },
      {
        h: "CSP — Content-Security-Policy 📜",
        p: "HTTP header jo batata hai kaunse sources se scripts/styles/images load ho sakte hain. Inline scripts aur unknown sources block karke XSS ko rokta hai (defense in depth).",
        code: "Content-Security-Policy: default-src 'self'; script-src 'self' https://cdn.com; object-src 'none'",
        lang: "js"
      }
    ],
    analogy: "**XSS** = koi tumhare ghar ki diary me chupke se note likh de jo tum padh ke act kar lo (inject script). **CSRF** = tumhare naam ka signed blank cheque chura ke koi use kar le (tumhara logged-in session). **CSP** = ghar ka rule board: 'sirf in-in logon ka saaman andar aayega' — bahar wala (unknown script) block. **SameSite cookie** = cheque sirf apne bank counter par hi valid, baahar nahi.",
    syntax: {
      code: "// XSS-safe rendering\nel.textContent = userInput;          // escapes automatically\nel.innerHTML = DOMPurify.sanitize(x); // if HTML needed\n\n// CSP via meta (header preferred)\n// <meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'self'\">",
      note: "Best defense layered hai: input validation + output encoding + CSP + SameSite cookies.",
      lang: "js"
    },
    steps: [
      "Sab user input ko untrusted maano.",
      "Output par escape karo — innerHTML ki jagah textContent.",
      "HTML render karna ho to DOMPurify se sanitize karo.",
      "Auth cookies HttpOnly + Secure + SameSite set karo.",
      "State-changing requests par CSRF token verify karo.",
      "CSP header lagao — allowed sources restrict.",
      "Inline scripts avoid karo (CSP unsafe-inline mat do).",
      "Dependencies update rakho (known vulnerabilities patch)."
    ],
    internals: {
      p: "XSS isliye khatarnak hai kyunki injected script **same origin** me chalta hai — uske paas DOM, cookies (non-HttpOnly), localStorage sab tak access hota hai. CSRF cookie ke auto-send hone par tika hai; SameSite=Lax cross-site POST par cookie rokta hai. CSP browser ko batata hai allowed sources — violation par script block + report. HttpOnly cookie JS se hidden hota hai isliye XSS me bhi token safe rehta hai.",
      code: "// CSP report-only mode (testing)\nContent-Security-Policy-Report-Only: default-src 'self'; report-uri /csp-report",
      lang: "js"
    },
    process: {
      type: "boxes",
      items: [
        { label: "XSS", sub: "inject script", color: "#F43F5E" },
        { label: "Escape/Sanitize", sub: "textContent, DOMPurify", color: "#10B981" },
        { label: "CSRF", sub: "session misuse", color: "#F97316" },
        { label: "Token + SameSite", sub: "verify + cookie guard", color: "#14B8A6" },
        { label: "CSP", sub: "allowed sources only", color: "#8B5CF6" }
      ]
    },
    visual: {
      type: "timeline",
      items: [
        { year: "1", text: "Attacker malicious input/link banata hai" },
        { year: "2", text: "App input ko unsafe render/process karta hai" },
        { year: "3", text: "XSS: script victim browser me chalta hai" },
        { year: "4", text: "Cookies/tokens chura ya actions perform" },
        { year: "5", text: "Defense: escape + CSP + SameSite + CSRF token" }
      ]
    },
    memory: "Yaad rakho: **XSS = code inject (escape se roko), CSRF = session misuse (token+SameSite se roko), CSP = allowed sources ka guard**. HttpOnly cookie = JS se token safe.",
    browser: "DevTools → Console me CSP violations report hoti hain ('Refused to load... violates CSP'). Network → response headers me CSP, Set-Cookie (SameSite) check karo. Application → Cookies me HttpOnly/Secure/SameSite flags dikhte hain.",
    notes: {
      concept: "React aur most frameworks output by default escape karte hain — XSS tab aata hai jab tum dangerouslySetInnerHTML / innerHTML use karo.",
      tip: "Auth token HttpOnly cookie me rakho — XSS me bhi JS use nahi kar payega.",
      warning: "CSP me 'unsafe-inline' aur 'unsafe-eval' avoid karo — ye XSS protection kamzor karte hain.",
      error: "innerHTML = userInput sabse common XSS hole hai — textContent ya sanitize use karo."
    },
    compare: {
      headers: ["Attack/Defense", "Kya hai", "Main Fix"],
      rows: [
        ["XSS", "Malicious script inject", "Escape output, DOMPurify, CSP"],
        ["CSRF", "Session ka galat use", "CSRF token, SameSite cookie"],
        ["CSP", "Defense layer", "Restrict script/style sources"],
        ["Stored XSS", "DB me save, sab ko serve", "Sanitize on input + output"],
        ["DOM XSS", "Client-side unsafe DOM", "textContent, avoid innerHTML"]
      ]
    },
    mistakes: [
      { bad: "el.innerHTML = userInput", fix: "el.textContent = userInput; ya DOMPurify.sanitize() agar HTML zaroori." },
      { bad: "Auth token localStorage me", fix: "HttpOnly Secure cookie — XSS me JS access nahi kar payega." },
      { bad: "CSP me unsafe-inline allow karna", fix: "Nonce/hash based CSP use karo, inline scripts hatao." },
      { bad: "CSRF ke liye sirf CORS pe bharosa", fix: "CSRF token + SameSite cookie use karo — CORS CSRF nahi rokta." }
    ],
    best: [
      "User input untrusted — escape on output (textContent).",
      "HTML zaroori ho to DOMPurify se sanitize.",
      "Auth cookies: HttpOnly + Secure + SameSite=Lax/Strict.",
      "State-changing requests par CSRF token verify.",
      "Strict CSP (no unsafe-inline/eval), nonce/hash use karo.",
      "Dependencies regularly update + audit (npm audit)."
    ],
    performance: "⚡ Security overhead minimal hai par worth it. CSP header chhota hai. Sanitization (DOMPurify) sirf user-HTML par lagao, har render par nahi. CSRF token check fast hai. Security ko 'baad me' mat chhodo — retrofitting mehngi hoti hai.",
    tricky: [
      {
        title: "React XSS via dangerouslySetInnerHTML",
        code: "<div dangerouslySetInnerHTML={{__html: userInput}} />",
        explain: "React normally escape karta hai, par dangerouslySetInnerHTML raw HTML inject karta hai — userInput ho to XSS. Pehle DOMPurify.sanitize karo.",
        lang: "js"
      },
      {
        title: "SameSite=Lax vs Strict",
        explain: "Strict: cross-site se cookie bilkul nahi (external link se aane par bhi logged-out feel). Lax: top-level GET navigation par cookie jaati hai (better UX), par cross-site POST par nahi — CSRF se kaafi bachav.",
        lang: "js"
      }
    ],
    interview: {
      beginner: [
        { q: "XSS kya hai?", a: "Cross-Site Scripting — attacker malicious JS inject karta hai jo victim ke browser me chalta hai, cookies/data chura sakta hai. Fix: input escape/sanitize + CSP." },
        { q: "CSRF kya hai?", a: "Cross-Site Request Forgery — victim ke logged-in session (auto-sent cookie) ka use karke uski taraf se unwanted request. Fix: CSRF token + SameSite cookie." }
      ],
      intermediate: [
        { q: "XSS ke types?", a: "Stored (DB me save, har visitor ko serve), Reflected (URL/param se turant reflect), DOM-based (client-side JS unsafe DOM manipulation se)." },
        { q: "CSP kaise XSS rokta hai?", a: "Allowed script/style sources restrict karke. Inline scripts aur unknown domains block ho jaate hain, isliye injected script chal hi nahi pata (defense in depth)." }
      ],
      advanced: [
        { q: "HttpOnly cookie XSS me kaise help karta hai?", a: "HttpOnly cookie JS (document.cookie) se readable nahi hota. To XSS hone par bhi attacker session token nahi chura sakta." },
        { q: "CORS CSRF se kyun nahi bachata?", a: "CSRF me browser request bhejta hai (form/img), JS response read nahi karta. CORS sirf JS response-reading rokta hai, request bhejna nahi. CSRF token/SameSite chahiye." }
      ]
    },
    mcqs: [
      { q: "Sabse common XSS hole kaunsa?", options: ["textContent", "innerHTML with user input", "fetch", "addEventListener"], answer: 1, explain: "innerHTML me unsanitized user input XSS deta hai — textContent ya sanitize use karo." },
      { q: "CSRF ka best cookie defense?", options: ["Secure", "HttpOnly", "SameSite", "Path"], answer: 2, explain: "SameSite cookie cross-site requests me cookie bhejne se rokta hai." },
      { q: "CSP me kya avoid karna chahiye?", options: ["default-src 'self'", "unsafe-inline", "script-src specific cdn", "object-src none"], answer: 1, explain: "'unsafe-inline' inline scripts allow karke XSS protection kamzor karta hai." }
    ],
    exercises: {
      easy: ["innerHTML vs textContent ka XSS difference demo karo.", "Ek cookie ko HttpOnly + SameSite set karke inspect karo."],
      medium: ["DOMPurify se user HTML sanitize karke render karo.", "Simple CSP header lagao aur violation dekho."],
      advanced: ["CSRF token flow (server issue + verify) implement karo.", "Nonce-based CSP setup karke inline script allow karo safely."]
    },
    summary: [
      "XSS: script injection — escape output, sanitize, CSP se roko.",
      "XSS types: Stored, Reflected, DOM-based.",
      "CSRF: session misuse — CSRF token + SameSite cookie se roko.",
      "CSP: allowed sources restrict, defense in depth.",
      "Auth token HttpOnly cookie me safe rakho.",
      "CORS CSRF nahi rokta — alag defenses chahiye."
    ],
    cheatsheet: [
      { h: "Safe render", code: "el.textContent = input;\nel.innerHTML = DOMPurify.sanitize(html);" },
      { h: "Secure cookie", code: "Set-Cookie: s=x; HttpOnly; Secure; SameSite=Strict" },
      { h: "CSP", code: "Content-Security-Policy: default-src 'self'; object-src 'none'" }
    ],
    projects: [
      "Comment/blog system with sanitized user HTML (DOMPurify).",
      "Banking-style app with CSRF tokens + SameSite cookies.",
      "App with strict CSP (nonce-based scripts).",
      "Auth flow using HttpOnly Secure cookies.",
      "Security audit of an existing app (XSS/CSRF/CSP review)."
    ],
    advanced: "🚀 Senior level: Trusted Types API (DOM XSS ko structurally rokna), nonce vs hash based CSP, CSP report-uri/report-to for monitoring, Subresource Integrity (SRI) for CDN scripts, SameSite=None+Secure trade-offs, aur double-submit cookie vs synchronizer token CSRF patterns. Defense-in-depth philosophy: koi single layer enough nahi.",
    quiz: [
      { q: "Trusted Types API kis se bachata hai?", options: ["CSRF", "DOM-based XSS", "Clickjacking", "CORS"], answer: 1, explain: "Trusted Types DOM sink (innerHTML etc.) me raw strings ko structurally rokta hai — DOM XSS prevention." },
      { q: "SRI (Subresource Integrity) kya verify karta hai?", options: ["Cookie", "CDN script ka hash (tampering)", "Origin", "Token"], answer: 1, explain: "SRI script ka integrity hash check karta hai — tampered CDN script load nahi hota." }
    ],
    related: ["same-origin-cors", "browser-storage", "tls-ssl"]
  },

  "rendering-performance": {
    overview: "Rendering performance matlab page ko **smooth aur fast** banana — 60fps (har frame ~16ms) maintain karna. Iska raaz hai reflow/repaint kam karna, sahi CSS properties (transform/opacity) se animate karna, aur DOM reads/writes batch karna. ⚡",
    why: "Janky scroll, laggy animations aur slow interactions users ko frustrate karte hain. Har frame 16ms me banna chahiye warna jank dikhta hai. Performance directly user retention aur conversions affect karti hai.",
    concept: [
      {
        h: "Reflow vs Repaint vs Composite 🔁",
        p: "**Reflow (layout)** = geometry change (width, position) — sabse mehnga. **Repaint** = sirf visual (color, background) — geometry same. **Composite** = sirf GPU layers move (transform/opacity) — sabse sasta.",
        code: "el.style.width = \"200px\";   // REFLOW (layout)\nel.style.color = \"red\";     // REPAINT\nel.style.transform = \"translateX(10px)\"; // COMPOSITE (fast)",
        lang: "js"
      },
      {
        h: "Layout thrashing se bacho 🚫",
        p: "Read-write-read-write loop me har read forced sync layout karwata hai. Sab **reads pehle, writes baad me** batch karo. requestAnimationFrame me writes karo.",
        code: "// BAD: thrashing (read-write loop)\nfor (const el of els) { el.style.width = el.offsetWidth + 10 + \"px\"; }\n// GOOD: batch reads then writes\nconst ws = els.map(el => el.offsetWidth);\nels.forEach((el, i) => el.style.width = ws[i] + 10 + \"px\");",
        lang: "js"
      },
      {
        h: "transform/opacity se animate 🎬",
        p: "Animations ke liye top/left/width ki jagah **transform aur opacity** use karo — ye composite-only hain, GPU par chalte hain, reflow/repaint trigger nahi karte. Buttery smooth.",
        code: "/* BAD: reflow har frame */\n.box { left: 100px; transition: left .3s; }\n/* GOOD: composite only */\n.box { transform: translateX(100px); transition: transform .3s; }",
        lang: "css"
      },
      {
        h: "requestAnimationFrame ⏱️",
        p: "Animations ko browser ke repaint cycle ke saath sync karne ke liye rAF use karo — setTimeout se behtar (frame-aligned, background tab me paused).",
        code: "function animate() {\n  el.style.transform = \"translateX(\" + x++ + \"px)\";\n  requestAnimationFrame(animate);\n}\nrequestAnimationFrame(animate);",
        lang: "js"
      },
      {
        h: "will-change & content-visibility 🪄",
        p: "**will-change** browser ko hint deta hai ki element animate hoga (layer pehle bana lo). **content-visibility:auto** off-screen content ka rendering skip karta hai — long pages me bada boost.",
        code: ".animated { will-change: transform; }\n.section { content-visibility: auto; }",
        lang: "css"
      }
    ],
    analogy: "Page rendering ek **stage show** hai. **Reflow** = pura stage set dobara lagana (sabse slow). **Repaint** = sirf curtains ka rang badalna. **Composite** = actors ko move karna (light/fast). Smart director (browser) transform/opacity se actors move karta hai, pura set nahi badalta. **Layout thrashing** = baar-baar set naap kar badalna — time waste.",
    syntax: {
      code: "// Batch DOM reads & writes\nrequestAnimationFrame(() => {\n  const h = el.offsetHeight;   // READ\n  el.style.height = h * 2 + \"px\"; // WRITE\n});\n\n// Composite-friendly animation\nel.style.transform = \"scale(1.2)\";\nel.style.opacity = \"0.5\";",
      note: "Reads aur writes ko alag karo. Animation transform/opacity se karo. rAF use karo.",
      lang: "js"
    },
    steps: [
      "Performance panel me jank/slow frames identify karo.",
      "Layout thrashing dhoondho (forced sync layout warnings).",
      "DOM reads aur writes ko alag-alag batch karo.",
      "Animations ko transform/opacity me convert karo.",
      "rAF se frame-aligned updates karo.",
      "Off-screen content par content-visibility:auto lagao.",
      "will-change se animate hone wale elements ko hint do.",
      "Images lazy-load karo (loading=lazy / IntersectionObserver)."
    ],
    internals: {
      p: "Browser pipeline: **JS → Style → Layout → Paint → Composite**. transform/opacity sirf Composite stage tak jaate hain (GPU), isliye fast. width/top jaise Layout trigger karte hain → poora pipeline dobara. Forced synchronous layout tab hota hai jab tum write ke baad turant geometry read karo — browser ko abhi layout karna padta hai. content-visibility browser ko off-screen subtree skip karne deta hai (containment).",
      code: "// Forced sync layout (BAD)\nel.style.width = \"100px\"; // write\nconst w = el.offsetWidth; // READ → forces immediate layout!",
      lang: "js"
    },
    process: {
      type: "boxes",
      items: [
        { label: "JS", sub: "logic/style change", color: "#3B82F6" },
        { label: "Style", sub: "CSS compute", color: "#14B8A6" },
        { label: "Layout", sub: "geometry (reflow)", color: "#F43F5E" },
        { label: "Paint", sub: "pixels (repaint)", color: "#F97316" },
        { label: "Composite", sub: "GPU layers (fast)", color: "#10B981" }
      ]
    },
    visual: {
      type: "timeline",
      items: [
        { year: "1", text: "Frame budget ~16ms (60fps) target" },
        { year: "2", text: "JS run + style recalc" },
        { year: "3", text: "Layout (geometry change = mehnga)" },
        { year: "4", text: "Paint (pixels) → Composite (GPU)" },
        { year: "5", text: "transform/opacity sidha Composite → smooth" }
      ]
    },
    memory: "Yaad rakho: **'transform/opacity = free animation, width/top = costly reflow'**. Reads pehle, writes baad me. 16ms ka frame budget.",
    browser: "DevTools → Performance panel: record karke flame chart, FPS meter, aur 'long tasks' dekho. Rendering tab me 'Paint flashing' (kya repaint ho raha) aur 'Layout Shift Regions' on karo. Purple = layout, green = paint.",
    notes: {
      concept: "transform aur opacity ko GPU compositor handle karta hai — main thread layout/paint skip ho jaata hai.",
      tip: "will-change ko sirf animate hone se thodi der pehle add karo, hamesha mat rakho (memory cost).",
      warning: "Layout thrashing (read-write-read loop) silently performance kill karta hai — Performance panel me 'Forced reflow' warning dikhta hai.",
      error: "Har element par will-change daalna memory blow karta hai — selectively use karo."
    },
    compare: {
      headers: ["Operation", "Pipeline stage", "Cost", "Example"],
      rows: [
        ["Geometry change", "Layout+Paint+Composite", "High (reflow)", "width, top, font-size"],
        ["Visual change", "Paint+Composite", "Medium (repaint)", "color, background"],
        ["Transform/opacity", "Composite only", "Low (GPU)", "translate, scale, opacity"]
      ]
    },
    mistakes: [
      { bad: "left/top se animate karna", fix: "transform: translate() use karo — composite-only, no reflow." },
      { bad: "Loop me read offsetWidth fir write style", fix: "Reads aur writes alag karo (read all, then write all)." },
      { bad: "setTimeout se animation", fix: "requestAnimationFrame use karo — frame-aligned, smooth." },
      { bad: "Sab elements par will-change: transform", fix: "Sirf jo animate ho rahe hain unpe, animation ke baad hata do." }
    ],
    best: [
      "Animations: transform + opacity (composite-only).",
      "DOM reads aur writes batch karo (no thrashing).",
      "rAF se frame-synced updates.",
      "content-visibility:auto for long off-screen content.",
      "Images lazy load + correct dimensions (no CLS).",
      "Critical CSS inline, non-critical JS defer/async."
    ],
    performance: "⚡ 60fps ke liye har frame ~16.6ms me banna chahiye. transform/opacity GPU par chalte hain — main thread free. Layout thrashing aur big reflows jank ki #1 wajah hain. content-visibility long pages ka initial render dramatically tez karta hai (off-screen skip).",
    tricky: [
      {
        title: "Forced synchronous layout",
        code: "el.style.width = \"100px\";\nconst h = el.offsetHeight; // forces layout NOW\nel.style.height = h + \"px\";",
        explain: "Write ke turant baad geometry read karne se browser ko abhi layout karna padta hai (sync). Reads ko writes se pehle group karo.",
        lang: "js"
      },
      {
        title: "transform reflow trigger nahi karta",
        explain: "transform: translateX() element ko visually move karta hai bina layout ke — siblings ki position recalculate nahi hoti. Isliye width/left se kahin tez.",
        lang: "js"
      }
    ],
    interview: {
      beginner: [
        { q: "Reflow aur repaint me farq?", a: "Reflow geometry/layout change hai (width, position) — mehnga. Repaint sirf visual change (color) jisme layout same rehta hai — kam mehnga." },
        { q: "Smooth animation ke liye konsi CSS properties?", a: "transform aur opacity — ye composite-only hain, GPU par chalte hain, reflow/repaint trigger nahi karte." }
      ],
      intermediate: [
        { q: "Layout thrashing kya hai?", a: "Bar-bar DOM read aur write interleave karna jisse browser ko har read par forced synchronous layout karna padta hai. Fix: reads pehle batch, writes baad me." },
        { q: "requestAnimationFrame kyun behtar hai?", a: "Browser ke repaint cycle ke saath sync hota hai (frame-aligned ~16ms), background tab me paused, isliye setTimeout se smooth aur efficient." }
      ],
      advanced: [
        { q: "Rendering pipeline ke stages?", a: "JS → Style → Layout → Paint → Composite. transform/opacity sirf Composite tak jaate hain (GPU), baaki properties Layout/Paint trigger karke poora pipeline dobara chalati hain." },
        { q: "content-visibility:auto kaise help karta hai?", a: "Off-screen content ka rendering (layout/paint) skip karta hai jab tak woh viewport ke paas na aaye — long pages ka initial render aur scroll perf dramatically improve hota hai." }
      ]
    },
    mcqs: [
      { q: "Sabse sasta animation property?", options: ["width", "left", "transform", "margin"], answer: 2, explain: "transform composite-only hai (GPU) — reflow/repaint nahi." },
      { q: "60fps ke liye frame budget?", options: ["100ms", "~16ms", "1s", "50ms"], answer: 1, explain: "60fps = 1000/60 ≈ 16.6ms per frame." },
      { q: "Layout thrashing ka fix?", options: ["Zyada CSS", "Reads aur writes batch karna", "More setTimeout", "Inline styles"], answer: 1, explain: "Reads pehle, writes baad me karke forced sync layout avoid hota hai." }
    ],
    exercises: {
      easy: ["left vs transform animation ka jank compare karo Performance panel me.", "Paint flashing on karke kaunsa area repaint hota hai dekho."],
      medium: ["Layout thrashing wala loop fix karke reads/writes batch karo.", "content-visibility:auto laga ke long list ka render time naapo."],
      advanced: ["rAF based smooth scroll animation banao.", "will-change ko dynamically add/remove karke memory vs perf balance karo."]
    },
    summary: [
      "Pipeline: JS → Style → Layout → Paint → Composite.",
      "transform/opacity = composite-only (fast, GPU).",
      "Reflow (geometry) sabse mehnga; repaint medium.",
      "Layout thrashing avoid: reads pehle, writes baad me.",
      "rAF se frame-aligned animations.",
      "content-visibility + lazy load for long pages."
    ],
    cheatsheet: [
      { h: "Fast animate", code: "el.style.transform = 'translateX(10px)';\nel.style.opacity = '0.5';" },
      { h: "Batch DOM", code: "const w = el.offsetWidth; // read\nel.style.width = w+10+'px'; // write" },
      { h: "Skip offscreen", code: ".section { content-visibility: auto; }" }
    ],
    projects: [
      "Smooth 60fps scroll-driven animation site.",
      "Long feed/list optimized with content-visibility + lazy load.",
      "Performance audit + fix of a janky existing page.",
      "Image gallery with lazy loading, no layout shift.",
      "GPU-accelerated transform-based UI animations."
    ],
    advanced: "🚀 Senior level: Compositor thread vs main thread (animations jo compositor par chalti hain main-thread-blocking se immune), layer explosion (zyada layers = memory), CSS containment (contain: layout/paint), passive event listeners for scroll, web font loading strategies (FOIT/FOUT), aur frame budgeting (long tasks ko break karke INP improve karna).",
    quiz: [
      { q: "CSS 'contain: layout' kya karta hai?", options: ["Layout ko element ke andar isolate", "Color change", "Network cache", "Cookie"], answer: 0, explain: "Containment browser ko batata hai element ka layout bahar affect nahi karta — reflow scope chhota, faster." },
      { q: "Passive scroll listener ka fayda?", options: ["Cookie save", "Browser scroll ko block nahi hone deta (smooth)", "CSS", "Caching"], answer: 1, explain: "passive:true se browser jaanta hai listener preventDefault nahi karega — scroll smooth rehta hai." }
    ],
    related: ["debounce-throttle", "web-vitals", "layout-reflow"]
  },

  "debounce-throttle": {
    overview: "**Debounce** aur **Throttle** rate-limiting techniques hain jo bar-bar fire hone wale events (typing, scroll, resize) ko control karke performance bachate hain. Debounce = ruko jab tak shaant na ho. Throttle = fixed interval pe hi chalao. Lazy loading bhi isi family ka part hai. ⏱️",
    why: "Scroll/resize/keyup events second me sैkdo baar fire hote hain. Har event par heavy work (API call, DOM update) = lag aur waste. Debounce/throttle inhe smartly limit karke app ko fast rakhte hain.",
    concept: [
      {
        h: "Debounce 🛑",
        p: "Function ko tab tak rok do jab tak events ka 'burst' rukne ke baad ek wait time na guzar jaaye. Last call ke baad hi chalta hai. **Search input** ke liye perfect — user type karna ruke tab API call.",
        code: "function debounce(fn, delay) {\n  let t;\n  return (...args) => {\n    clearTimeout(t);\n    t = setTimeout(() => fn(...args), delay);\n  };\n}\nconst onSearch = debounce(apiCall, 400);",
        lang: "js"
      },
      {
        h: "Throttle 🚦",
        p: "Function ko fixed interval me **at most ek baar** chalne do, chahe event kitni baar fire ho. **Scroll/resize** ke liye perfect — har 200ms me ek baar update.",
        code: "function throttle(fn, limit) {\n  let wait = false;\n  return (...args) => {\n    if (!wait) {\n      fn(...args);\n      wait = true;\n      setTimeout(() => (wait = false), limit);\n    }\n  };\n}\nconst onScroll = throttle(update, 200);",
        lang: "js"
      },
      {
        h: "Kab kaunsa? 🤔",
        p: "**Debounce**: jab tumhe sirf 'final' state chahiye — search, autosave, resize-end. **Throttle**: jab regular updates chahiye during action — scroll position, drag, mousemove, infinite scroll trigger.",
        lang: "js"
      },
      {
        h: "Lazy loading (loading=lazy) 🖼️",
        p: "Off-screen images ko viewport ke paas aane par hi load karo. Native: `<img loading=\"lazy\">`. Custom: IntersectionObserver se. Initial load tez, bandwidth bacha.",
        code: "<img src=\"photo.jpg\" loading=\"lazy\" alt=\"...\">",
        lang: "html"
      },
      {
        h: "IntersectionObserver lazy load 👀",
        p: "Scroll event ki jagah IntersectionObserver image visible hone par load karta hai — efficient (no constant scroll listener).",
        code: "const io = new IntersectionObserver((entries) => {\n  entries.forEach((e) => {\n    if (e.isIntersecting) {\n      e.target.src = e.target.dataset.src;\n      io.unobserve(e.target);\n    }\n  });\n});\ndocument.querySelectorAll(\"img[data-src]\").forEach((i) => io.observe(i));",
        lang: "js"
      }
    ],
    analogy: "**Debounce** = lift ka darwaza: log aate rahein to darwaza band nahi hota, jab koi 5 sec tak na aaye tab band ho jaata hai (last event ke baad action). **Throttle** = nalka jo har 1 sec me sirf ek boond deta hai chahe kitna bhi khulla rakho (fixed rate). **Lazy load** = buffet me plate tabhi banao jab customer aaye, pehle se nahi.",
    syntax: {
      code: "const debounced = debounce(fn, 400);\nconst throttled = throttle(fn, 200);\ninput.addEventListener(\"input\", debounced);\nwindow.addEventListener(\"scroll\", throttled);",
      note: "Debounce = last call ke baad chalta hai. Throttle = interval me ek baar. Delay ko use-case ke hisaab se tune karo.",
      lang: "js"
    },
    steps: [
      "Identify karo kaunsa event high-frequency hai (input/scroll/resize).",
      "Decide: final result chahiye (debounce) ya periodic (throttle)?",
      "Search/autosave → debounce wrapper banao.",
      "Scroll/drag/mousemove → throttle wrapper banao.",
      "Appropriate delay choose karo (search ~300-500ms, scroll ~100-200ms).",
      "Listener par wrapped function attach karo.",
      "Cleanup: component unmount par listener remove karo.",
      "Images/components ke liye lazy loading lagao."
    ],
    internals: {
      p: "Debounce ek timer use karta hai jo har call par reset hota hai — sirf jab calls ruk jaayein tab timer complete hota hai aur fn chalta hai. Throttle ek flag/timestamp se track karta hai ki last execution ke baad enough time guzra ki nahi. Advanced versions me leading/trailing edge options hote hain (turant chalao ya end pe). Dono closures ka use karke private timer state rakhte hain.",
      code: "// Throttle with leading + trailing\nfunction throttle(fn, limit) {\n  let last = 0, t;\n  return (...a) => {\n    const now = Date.now();\n    const remaining = limit - (now - last);\n    if (remaining <= 0) { last = now; fn(...a); }\n    else { clearTimeout(t); t = setTimeout(() => { last = Date.now(); fn(...a); }, remaining); }\n  };\n}",
      lang: "js"
    },
    process: {
      type: "boxes",
      items: [
        { label: "Events burst", sub: "type/scroll fast", color: "#3B82F6" },
        { label: "Debounce", sub: "wait, then last", color: "#10B981" },
        { label: "Throttle", sub: "1 per interval", color: "#14B8A6" },
        { label: "Result", sub: "kam calls, fast app", color: "#22C55E" }
      ]
    },
    visual: {
      type: "timeline",
      items: [
        { year: "1", text: "User type/scroll — events tezi se fire" },
        { year: "2", text: "Debounce: timer reset har keystroke par" },
        { year: "3", text: "User ruka → wait poora → ek call" },
        { year: "4", text: "Throttle: har 200ms me ek call (regular)" },
        { year: "5", text: "Result: heavy work limited → smooth UI" }
      ]
    },
    memory: "Yaad rakho: **'Debounce = ruko aur DEKHO (last), Throttle = ghadi ki THAP (regular interval)'**. Search → debounce. Scroll → throttle.",
    browser: "DevTools → Performance panel me debounce/throttle lagane se pehle aur baad ke event handler calls ka difference dekho. Network tab me search debounce se API calls drastically kam dikhenge.",
    notes: {
      concept: "Debounce last event ke baad ek baar; throttle pehle/interval me regular — dono purpose alag.",
      tip: "lodash _.debounce / _.throttle production-ready hain (leading/trailing/maxWait options ke saath).",
      warning: "Debounce delay zyada rakhoge to search 'laggy' lagega — 300-500ms sweet spot.",
      error: "React me debounce wrapper ko useMemo/useRef me rakho warna har render par naya banega (kaam nahi karega)."
    },
    compare: {
      headers: ["Aspect", "Debounce", "Throttle"],
      rows: [
        ["Kab chalta hai", "Events rukne ke baad (last)", "Fixed interval me regular"],
        ["Best for", "Search, autosave, resize-end", "Scroll, drag, mousemove"],
        ["Calls", "Ek (burst ke baad)", "Multiple (rate-limited)"],
        ["Feeling", "Wait then act", "Steady updates"]
      ]
    },
    mistakes: [
      { bad: "Scroll par debounce (updates rुk jaate hain)", fix: "Scroll par throttle use karo — regular updates chahiye." },
      { bad: "Search par throttle (extra API calls)", fix: "Search par debounce — final query par hi call." },
      { bad: "React me render ke andar debounce(fn) banana", fix: "useMemo/useRef se stable instance banao." },
      { bad: "Listener cleanup na karna", fix: "Component unmount par removeEventListener karo." }
    ],
    best: [
      "Search/autosave: debounce (~300-500ms).",
      "Scroll/resize/drag: throttle (~100-200ms).",
      "Production me lodash debounce/throttle use karo.",
      "React me stable instance (useMemo/useRef).",
      "Scroll/resize listeners par { passive: true }.",
      "Lazy load images/components for fast initial load."
    ],
    performance: "⚡ Debounce/throttle event handler ke call count ko nat'ki kam karte hain — kabhi-kabhi sैkdo se ek-do tak. Search debounce se API calls aur server load drop. Scroll throttle + passive listener se buttery scroll. Lazy loading initial payload aur bandwidth bachata hai.",
    tricky: [
      {
        title: "Debounce vs Throttle output difference",
        code: "// 10 fast events, delay 1000ms\n// debounce: 1 call (last event ke baad)\n// throttle: ~ek call har 1000ms (multiple)",
        explain: "Same events, alag behavior: debounce sirf aakhri par, throttle regular intervals par fire karta hai.",
        lang: "js"
      },
      {
        title: "Closure se private timer",
        explain: "Debounce/throttle closure use karke 't' (timer) ko private rakhte hain — har wrapped function ka apna independent timer hota hai.",
        lang: "js"
      }
    ],
    interview: {
      beginner: [
        { q: "Debounce kya hai?", a: "Function ko events ke burst ke baad (jab shaant ho jaaye) ek baar chalana. Har naye event par timer reset hota hai. Search input ke liye ideal." },
        { q: "Throttle kya hai?", a: "Function ko fixed interval me at most ek baar chalana, chahe event kitni baar fire ho. Scroll/resize ke liye ideal." }
      ],
      intermediate: [
        { q: "Debounce vs Throttle kab use karoge?", a: "Debounce jab sirf final state chahiye (search, autosave). Throttle jab during-action regular updates chahiye (scroll position, drag, infinite scroll)." },
        { q: "Debounce implement karke dikhao.", a: "Closure me timer rakho, har call par clearTimeout + naya setTimeout(fn, delay). Calls rukne par hi fn chalta hai." }
      ],
      advanced: [
        { q: "Leading vs trailing edge?", a: "Leading: pehle event par turant chalao. Trailing: burst/interval ke end par chalao. lodash dono support karta hai (leading/trailing options)." },
        { q: "Scroll listener par throttle vs IntersectionObserver?", a: "Lazy load/visibility ke liye IntersectionObserver behtar — browser-optimized, koi constant scroll listener nahi. Throttle scroll-position logic ke liye theek hai." }
      ]
    },
    mcqs: [
      { q: "Search input ke liye sabse acha?", options: ["Throttle", "Debounce", "Dono nahi", "setInterval"], answer: 1, explain: "Debounce — user type rukne par final query par ek call." },
      { q: "Throttle ka behavior?", options: ["Sirf last call", "Fixed interval me regular calls", "Kabhi nahi chalta", "Random"], answer: 1, explain: "Throttle interval me at most ek baar regularly chalata hai." },
      { q: "Lazy load ke liye best modern API?", options: ["scroll event", "IntersectionObserver", "setInterval", "resize"], answer: 1, explain: "IntersectionObserver visibility detect karta hai bina constant scroll listener ke." }
    ],
    exercises: {
      easy: ["Search box par debounce laga ke console me query log karo.", "<img loading='lazy'> se images lazy load karo."],
      medium: ["Scroll position ko throttle se update karo.", "Debounce aur throttle ka call-count difference measure karo."],
      advanced: ["IntersectionObserver se infinite scroll banao.", "Leading+trailing edge wala throttle implement karo."]
    },
    summary: [
      "Debounce: burst ke baad ek baar (last) — search/autosave.",
      "Throttle: fixed interval me regular — scroll/drag.",
      "Dono closure + timer use karte hain (rate-limiting).",
      "Lazy loading: off-screen images viewport pe load.",
      "IntersectionObserver scroll-event se behtar lazy load.",
      "React me stable instance (useMemo/useRef) zaroori."
    ],
    cheatsheet: [
      { h: "Debounce", code: "let t; return (...a)=>{clearTimeout(t);t=setTimeout(()=>fn(...a),d);};" },
      { h: "Throttle", code: "let w; return (...a)=>{if(!w){fn(...a);w=1;setTimeout(()=>w=0,l);}};" },
      { h: "Lazy img", code: "<img src='x.jpg' loading='lazy'>" }
    ],
    projects: [
      "Live search with debounced API calls.",
      "Infinite scroll feed (IntersectionObserver).",
      "Autosave editor (debounce on typing).",
      "Scroll-progress bar (throttled).",
      "Lazy-loaded image gallery."
    ],
    advanced: "🚀 Senior level: maxWait option (debounce me forced execution after max time), requestAnimationFrame-based throttle (frame-aligned scroll handlers), cancel/flush methods, aur scroll-linked effects ke liye IntersectionObserver + CSS scroll-driven animations. React me useDebouncedValue/useDeferredValue (concurrent) bhi modern approach hai.",
    quiz: [
      { q: "rAF-based throttle ka fayda scroll me?", options: ["Frame-aligned, smooth updates", "More calls", "Cookie", "DNS"], answer: 0, explain: "rAF throttle handler ko repaint cycle se align karta hai — jank-free scroll updates." },
      { q: "debounce ka maxWait kya karta hai?", options: ["Delay kam", "Max time ke baad force execute", "Cancel", "Nothing"], answer: 1, explain: "maxWait ensure karta hai continuous events me bhi function eventually chal jaaye (forced)." }
    ],
    related: ["rendering-performance", "observers", "web-vitals"]
  },

  "web-vitals": {
    overview: "**Core Web Vitals** Google ke real-user metrics hain jo page ki **loading, interactivity aur visual stability** measure karte hain — **LCP, CLS, INP**. Plus FCP aur TTFB. Ye SEO ranking aur user experience dono affect karte hain. 📊",
    why: "Fast 'lagne' wala page = better UX, zyada retention, behtar conversions, aur Google ranking. Web Vitals objectively measure karte hain ki user ko page kitna fast aur stable feel ho raha hai — gut-feel nahi, numbers.",
    concept: [
      {
        h: "LCP — Largest Contentful Paint 🖼️",
        p: "Sabse bada visible element (hero image/heading) kab render hua. **Loading speed** ka metric. Good: ≤2.5s, Poor: >4s. Fix: image optimize, server fast, critical CSS, preload.",
        lang: "js"
      },
      {
        h: "CLS — Cumulative Layout Shift 📐",
        p: "Page load ke dauran content kitna 'kude' (unexpected shifts). **Visual stability** ka metric. Good: ≤0.1, Poor: >0.25. Fix: image/video par width-height, ads ke liye reserved space, font swap careful.",
        lang: "js"
      },
      {
        h: "INP — Interaction to Next Paint ⚡",
        p: "User interaction (click/tap/key) ke baad next paint tak kitna time — **responsiveness** ka metric. **FID ko replace kiya** (Mar 2024). Good: ≤200ms, Poor: >500ms. Fix: long tasks break, less main-thread JS.",
        lang: "js"
      },
      {
        h: "FCP & TTFB 🚀",
        p: "**FCP** (First Contentful Paint): pehla content kab dikha. **TTFB** (Time To First Byte): server se pehla byte kab aaya. Ye supporting metrics hain — LCP/loading ka foundation.",
        lang: "js"
      },
      {
        h: "Kaise measure karein 🔬",
        p: "**Lab** (synthetic): Lighthouse, DevTools. **Field** (real users): web-vitals JS library, CrUX, PageSpeed Insights. Field data 'real' experience batata hai.",
        code: "import { onLCP, onCLS, onINP } from \"web-vitals\";\nonLCP(console.log);\nonCLS(console.log);\nonINP(console.log);",
        lang: "js"
      }
    ],
    analogy: "Web Vitals ek **restaurant review** jaise hain. **LCP** = main dish kitni jaldi aayi (loading). **CLS** = table par cheezein hilti to nahi rahi jab tum kha rahe the (stability — bartan khisak gaya to irritating). **INP** = waiter ne tumhari request par kitni jaldi response diya (interactivity). Teeno acha = 5-star experience.",
    syntax: {
      code: "import { onLCP, onCLS, onINP, onFCP, onTTFB } from \"web-vitals\";\nonLCP((m) => sendToAnalytics(m));\nonCLS((m) => sendToAnalytics(m));\nonINP((m) => sendToAnalytics(m));",
      note: "web-vitals library real-user (field) metrics deti hai — analytics ko bhejo trends track karne ke liye.",
      lang: "js"
    },
    steps: [
      "Lighthouse/PageSpeed Insights se current scores naapo.",
      "web-vitals library se real-user (field) data collect karo.",
      "LCP slow? → image optimize, preload hero, server/TTFB fix.",
      "CLS high? → images/videos par dimensions, reserve ad space.",
      "INP slow? → long JS tasks break karo, main thread free karo.",
      "Code-split + defer non-critical JS.",
      "Fonts: font-display:swap + preload.",
      "Re-measure aur iterate (lab + field dono)."
    ],
    internals: {
      p: "Web Vitals **PerformanceObserver** API par bante hain — browser performance entries (largest-contentful-paint, layout-shift, event timing) emit karta hai. LCP last largest paint tak track hota hai (interaction tak). CLS layout shift score = impact fraction × distance fraction. INP saari interactions me se worst (75th percentile) leta hai. Field data isliye real-user 75th percentile par report hota hai.",
      code: "new PerformanceObserver((list) => {\n  for (const entry of list.getEntries()) console.log(entry.name, entry.startTime);\n}).observe({ type: \"largest-contentful-paint\", buffered: true });",
      lang: "js"
    },
    process: {
      type: "boxes",
      items: [
        { label: "LCP", sub: "loading ≤2.5s", color: "#10B981" },
        { label: "CLS", sub: "stability ≤0.1", color: "#14B8A6" },
        { label: "INP", sub: "interactivity ≤200ms", color: "#3B82F6" },
        { label: "FCP/TTFB", sub: "supporting", color: "#8B5CF6" }
      ]
    },
    visual: {
      type: "timeline",
      items: [
        { year: "1", text: "TTFB — server se pehla byte" },
        { year: "2", text: "FCP — pehla content dikha" },
        { year: "3", text: "LCP — sabse bada element render (≤2.5s)" },
        { year: "4", text: "User interaction → INP measure (≤200ms)" },
        { year: "5", text: "Load ke dauran CLS — koi shift nahi (≤0.1)" }
      ]
    },
    memory: "Yaad rakho: **'LCP loading, CLS stability, INP interactivity'** — teeno Core. Thresholds: 2.5s / 0.1 / 200ms (good). INP ne FID ko replace kiya.",
    browser: "DevTools → Lighthouse panel report deta hai. Performance panel me 'Web Vitals' lane (LCP/CLS markers) dikhta hai. Rendering tab → 'Layout Shift Regions' se CLS ke culprits highlight. PageSpeed Insights field + lab dono deta hai.",
    notes: {
      concept: "INP ne March 2024 me FID ko Core Web Vital ki tarah replace kiya — INP poori page lifetime ki responsiveness measure karta hai, FID sirf first input ka delay.",
      tip: "Field (real-user) data lab se zyada matter karta hai — actual users ka experience.",
      warning: "Lab score acha hone par bhi field me kharab ho sakta hai (real devices/networks slow).",
      error: "Bina width/height ke images CLS ka #1 cause hain — dimensions hamesha do."
    },
    compare: {
      headers: ["Metric", "Kya", "Good", "Needs Improvement", "Poor"],
      rows: [
        ["LCP", "Loading", "≤2.5s", "2.5-4s", ">4s"],
        ["CLS", "Stability", "≤0.1", "0.1-0.25", ">0.25"],
        ["INP", "Interactivity", "≤200ms", "200-500ms", ">500ms"],
        ["FCP", "First paint", "≤1.8s", "1.8-3s", ">3s"],
        ["TTFB", "Server", "≤800ms", "0.8-1.8s", ">1.8s"]
      ]
    },
    mistakes: [
      { bad: "Images bina width/height (CLS spike)", fix: "Hamesha explicit width/height ya aspect-ratio do." },
      { bad: "Sara JS main thread par (INP slow)", fix: "Long tasks break karo, code-split, defer non-critical JS." },
      { bad: "Hero image lazy/un-optimized (LCP slow)", fix: "Hero ko preload + optimize, lazy mat karo." },
      { bad: "Sirf lab score dekhna", fix: "Field (real-user) data bhi monitor karo — asli experience." }
    ],
    best: [
      "Hero/LCP element preload + optimize (no lazy).",
      "Images/videos/ads par dimensions reserve (CLS ≤0.1).",
      "Long JS tasks break + code-split (INP ≤200ms).",
      "font-display:swap + font preload.",
      "Field data monitor karo (web-vitals + analytics).",
      "Lab (Lighthouse) + field (CrUX) dono use karo."
    ],
    performance: "⚡ Web Vitals khud performance ka scorecard hain. LCP fast = user ko page jaldi 'ready' lagta hai. CLS low = frustrating jumps nahi. INP fast = clicks turant respond. Achhe Vitals = better UX + SEO ranking boost (Google ranking factor).",
    tricky: [
      {
        title: "INP vs FID",
        explain: "FID sirf FIRST interaction ka input delay naapta tha. INP poori visit ki saari interactions me se worst (responsiveness) leta hai — zyada comprehensive. March 2024 se INP Core Web Vital hai.",
        lang: "js"
      },
      {
        title: "CLS sirf load tak nahi",
        explain: "CLS poori page lifetime me cumulative unexpected shifts hai (sirf initial load nahi). User-initiated shifts (button click se expand) count nahi hote.",
        lang: "js"
      }
    ],
    interview: {
      beginner: [
        { q: "Core Web Vitals kaunse hain?", a: "LCP (loading), CLS (visual stability), INP (interactivity). Ye teeno Google ke real-user UX metrics hain aur SEO bhi affect karte hain." },
        { q: "LCP kya measure karta hai?", a: "Sabse bade visible element (hero image/heading) ke render hone ka time. Good ≤2.5s. Loading speed ka indicator." }
      ],
      intermediate: [
        { q: "CLS kam kaise karein?", a: "Images/videos par width-height/aspect-ratio do, ads/embeds ke liye space reserve karo, content ko upar inject mat karo, fonts ko carefully swap karo." },
        { q: "INP improve kaise karein?", a: "Main thread free karo — long JS tasks ko chhote chunks me todo, unnecessary work defer karo, code-split, heavy compute web worker me bhejo." }
      ],
      advanced: [
        { q: "INP ne FID ko kyun replace kiya?", a: "FID sirf first input ka delay naapta tha (processing time nahi). INP saari interactions ki end-to-end latency (input→next paint) leta hai — real responsiveness ka better measure." },
        { q: "Lab vs Field data?", a: "Lab (Lighthouse) controlled synthetic test — debugging ke liye. Field (CrUX/web-vitals) real users ka data (75th percentile) — actual experience aur SEO isi par based hai." }
      ]
    },
    mcqs: [
      { q: "Konsa metric visual stability measure karta hai?", options: ["LCP", "CLS", "INP", "TTFB"], answer: 1, explain: "CLS (Cumulative Layout Shift) unexpected layout shifts naapta hai." },
      { q: "INP ne kis metric ko replace kiya?", options: ["LCP", "CLS", "FID", "FCP"], answer: 2, explain: "INP ne March 2024 me FID ko Core Web Vital ke roop me replace kiya." },
      { q: "Good LCP threshold?", options: ["≤1s", "≤2.5s", "≤4s", "≤5s"], answer: 1, explain: "LCP ≤2.5s 'good' maana jaata hai." }
    ],
    exercises: {
      easy: ["Apni site par Lighthouse chala ke LCP/CLS/INP scores nikaalo.", "web-vitals library se console me metrics log karo."],
      medium: ["Images par width/height add karke CLS improve karo.", "Hero image preload karke LCP improve karo."],
      advanced: ["Long JS task ko chunks me todkar INP improve karo.", "web-vitals data ko analytics endpoint pe bhejo (field monitoring)."]
    },
    summary: [
      "Core Web Vitals: LCP (loading), CLS (stability), INP (interactivity).",
      "Thresholds: LCP ≤2.5s, CLS ≤0.1, INP ≤200ms.",
      "INP ne FID ko replace kiya (Mar 2024).",
      "FCP aur TTFB supporting metrics.",
      "Lab (Lighthouse) + Field (real users) dono measure karo.",
      "Vitals SEO ranking aur UX dono affect karte hain."
    ],
    cheatsheet: [
      { h: "Measure", code: "import {onLCP,onCLS,onINP} from 'web-vitals';\nonLCP(console.log);" },
      { h: "CLS fix", code: "<img src='x.jpg' width='800' height='600'>" },
      { h: "LCP fix", code: "<link rel='preload' as='image' href='hero.jpg'>" }
    ],
    projects: [
      "Web Vitals dashboard (field data via analytics).",
      "Performance optimization of a slow landing page.",
      "CLS-free image gallery with reserved dimensions.",
      "INP optimization by breaking long tasks.",
      "Lighthouse CI in build pipeline."
    ],
    advanced: "🚀 Senior level: INP debugging (input delay vs processing vs presentation delay breakdown), attribution (web-vitals/attribution se exact culprit element), RUM (Real User Monitoring) setup, 75th percentile reporting kyun, scheduler.yield() se long tasks break, aur Speculation Rules / prerendering se LCP improve. CrUX dataset BigQuery analysis bhi advanced topic.",
    quiz: [
      { q: "scheduler.yield() kis metric ko help karta hai?", options: ["CLS", "INP (long tasks break)", "TTFB", "LCP"], answer: 1, explain: "scheduler.yield() main thread ko yield karke long tasks todta hai → better INP." },
      { q: "Field data kis percentile par report hota hai?", options: ["50th", "75th", "90th", "100th"], answer: 1, explain: "Core Web Vitals 75th percentile par assess hote hain (most users ka experience)." }
    ],
    related: ["rendering-performance", "devtools", "critical-rendering-path"]
  },

  "devtools": {
    overview: "**Chrome DevTools** browser ka built-in toolkit hai — debug, inspect, profile aur optimize karne ke liye. Elements, Console, Network, Performance, Memory, Application, Lighthouse panels har frontend dev ka rozana hathiyar hain. 🛠️",
    why: "Code blindly likhna nahi chahiye. DevTools se DOM dekho, errors padho, network requests trace karo, performance bottlenecks dhoondho, memory leaks pakdo. Yeh debugging aur optimization ka heart hai.",
    concept: [
      {
        h: "Elements panel 🌳",
        p: "DOM tree aur CSS live inspect/edit. Styles, computed values, box model dekho. Element select karke real-time CSS tweak. Event listeners aur accessibility bhi.",
        lang: "js"
      },
      {
        h: "Console panel 💬",
        p: "Logs, errors, warnings. JS run karo live. console.log/table/error/group/time. Expressions evaluate, DOM access ($0 = selected element, $$ = querySelectorAll).",
        code: "console.table([{a:1},{a:2}]);\nconsole.time(\"x\"); /* ... */ console.timeEnd(\"x\");\n$0; // currently selected element in Elements",
        lang: "js"
      },
      {
        h: "Network panel 🌐",
        p: "Saari requests — status, size, timing, headers. **Waterfall** chart se timing breakdown. Cache hits, response preview, throttling (slow 3G simulate), 'Disable cache'.",
        lang: "js"
      },
      {
        h: "Performance panel 🔥",
        p: "Runtime profiling — **flame chart** (call stack over time), **FPS meter**, long tasks, layout/paint events. Jank aur bottleneck dhoondhne ke liye record karo.",
        lang: "js"
      },
      {
        h: "Memory panel 🧠",
        p: "**Heap snapshot** (memory at a moment), **allocation timeline** (kab kitni memory allocate hui). Memory leaks (detached DOM nodes, growing arrays) detect karo.",
        lang: "js"
      },
      {
        h: "Application & Lighthouse 📦",
        p: "**Application**: Cookies, localStorage, sessionStorage, IndexedDB, Cache, Service Workers inspect/edit. **Lighthouse**: automated audit (Performance, Accessibility, SEO, Best Practices) score + suggestions.",
        lang: "js"
      }
    ],
    analogy: "DevTools ek car mechanic ka **garage** hai. **Elements** = engine khol kar dekhna (DOM/CSS). **Console** = dashboard warning lights + diagnostics. **Network** = fuel/parts ki supply chain trace. **Performance** = speedometer + engine RPM profiling. **Memory** = fuel tank leak detection. **Lighthouse** = pura service report card.",
    syntax: {
      code: "// Console power tricks\n$0                    // selected element\n$$(\"div\")             // querySelectorAll array\nconsole.table(arr)    // tabular log\nconsole.dir(obj)      // object tree\ndebugger;             // breakpoint in code",
      note: "DevTools kholne ke liye F12 ya Ctrl+Shift+I. Mobile view: Ctrl+Shift+M (device toolbar).",
      lang: "js"
    },
    steps: [
      "F12 se DevTools kholo.",
      "UI/CSS issue? → Elements panel me inspect + tweak.",
      "JS error/log? → Console panel padho.",
      "Slow/failing request? → Network panel waterfall.",
      "Janky/slow page? → Performance panel record + flame chart.",
      "Memory leak suspect? → Memory panel heap snapshot compare.",
      "Storage/SW inspect? → Application panel.",
      "Overall audit? → Lighthouse run karo."
    ],
    internals: {
      p: "DevTools browser ke rendering engine se **Chrome DevTools Protocol (CDP)** ke through baat karta hai — yahi protocol Puppeteer/Playwright automation use karte hain. Performance panel V8 ke sampling profiler se call stacks capture karta hai. Heap snapshot V8 heap graph traverse karke retained sizes calculate karta hai. Network panel actual network stack se timing (DNS, connect, TTFB, download) leta hai.",
      code: "// Programmatic profiling\nconsole.profile(\"work\");\n/* heavy code */\nconsole.profileEnd(\"work\"); // shows in Performance",
      lang: "js"
    },
    process: {
      type: "boxes",
      items: [
        { label: "Elements", sub: "DOM + CSS", color: "#3B82F6" },
        { label: "Console", sub: "logs + run JS", color: "#10B981" },
        { label: "Network", sub: "requests + waterfall", color: "#14B8A6" },
        { label: "Performance", sub: "flame chart + FPS", color: "#F97316" },
        { label: "Memory", sub: "heap + leaks", color: "#F43F5E" },
        { label: "Application", sub: "storage + SW", color: "#8B5CF6" }
      ]
    },
    visual: {
      type: "timeline",
      items: [
        { year: "1", text: "Problem dekho — UI / error / slow" },
        { year: "2", text: "Sahi panel choose karo (Elements/Network...)" },
        { year: "3", text: "Inspect / record / snapshot" },
        { year: "4", text: "Bottleneck ya bug identify karo" },
        { year: "5", text: "Fix, re-test, Lighthouse se verify" }
      ]
    },
    memory: "Yaad rakho panels: **E-C-N-P-M-A-L** — Elements (DOM), Console (logs), Network (requests), Performance (flame), Memory (leaks), Application (storage), Lighthouse (audit).",
    browser: "Sab kuch DevTools hi hai! Shortcuts: F12 (open), Ctrl+Shift+C (inspect element), Ctrl+Shift+M (device mode), Ctrl+Shift+P (command menu — sab features). Esc se drawer (console) toggle.",
    notes: {
      concept: "$0 Elements me selected element hai, $1-$4 previously selected. $ aur $$ = querySelector/querySelectorAll shortcuts (sirf console me).",
      tip: "Ctrl+Shift+P (command menu) DevTools ka 'search everything' hai — screenshot, coverage, sab milta hai.",
      warning: "Performance recording overhead deta hai — measure thoda inflated ho sakta hai; relative comparison par focus karo.",
      error: "Network 'Disable cache' sirf DevTools open hone par kaam karta hai — testing ke baad off karna yaad rakho."
    },
    compare: {
      headers: ["Panel", "Kaam", "Kab use"],
      rows: [
        ["Elements", "DOM/CSS inspect+edit", "UI/styling issues"],
        ["Console", "Logs, run JS", "Errors, quick tests"],
        ["Network", "Requests, waterfall", "API/loading issues"],
        ["Performance", "Flame chart, FPS", "Jank, slow runtime"],
        ["Memory", "Heap, allocations", "Memory leaks"],
        ["Application", "Storage, SW", "Cookies/cache/PWA"],
        ["Lighthouse", "Audit score", "Overall quality check"]
      ]
    },
    mistakes: [
      { bad: "console.log se sab debug karna", fix: "Breakpoints (Sources) + watch expressions use karo — zyada powerful." },
      { bad: "Performance bina throttling test karna", fix: "CPU/network throttle laga ke real-device experience naapo." },
      { bad: "Memory leak ko ignore karna", fix: "Heap snapshots compare karo, detached DOM nodes dhoondho." },
      { bad: "Production me console.log chhodna", fix: "Build me strip karo — performance + security." }
    ],
    best: [
      "Breakpoints + step debugging use karo (Sources panel).",
      "Network throttling se real conditions test.",
      "Lighthouse regularly run karo (perf + a11y + SEO).",
      "Heap snapshots se memory leaks pakdo.",
      "Command menu (Ctrl+Shift+P) se features explore.",
      "Coverage tab se unused CSS/JS dhoondho."
    ],
    performance: "⚡ Performance panel jank ka root cause batata hai — long tasks, forced reflows, heavy paints. Network panel slow/blocking requests reveal karta hai. Coverage tab unused code dikhata hai (bundle size). DevTools ke bina optimization andhere me teer chalana hai.",
    tricky: [
      {
        title: "$0 aur $_ ka use",
        code: "$0   // Elements me selected element\n$_   // last console expression ka result\n$$(\"a\")[0].href  // first link href",
        explain: "$0 selected element deta hai, $_ pichla result. $$ querySelectorAll ka array deta hai — quick console debugging.",
        lang: "js"
      },
      {
        title: "Detached DOM node leak",
        explain: "JS me reference rakhne se removed DOM node garbage collect nahi hota (detached node). Memory snapshot me 'Detached' filter se ye leaks dikhte hain.",
        lang: "js"
      }
    ],
    interview: {
      beginner: [
        { q: "Network panel kis liye?", a: "Saari network requests inspect karne — status, timing, size, headers, waterfall. API/loading issues debug karne ke liye." },
        { q: "Elements panel me kya karte ho?", a: "DOM tree aur CSS live inspect/edit. Box model, computed styles dekhna aur real-time CSS tweak karna." }
      ],
      intermediate: [
        { q: "Performance panel kaise use karoge?", a: "Record karke flame chart me call stacks, long tasks, layout/paint events dekho. Jank aur bottlenecks identify karke optimize karo." },
        { q: "Memory leak kaise dhoondhoge?", a: "Memory panel me heap snapshots lo (before/after action), compare karo. Growing retained size ya detached DOM nodes leak indicate karte hain." }
      ],
      advanced: [
        { q: "Chrome DevTools Protocol kya hai?", a: "CDP wahi protocol hai jisse DevTools browser se baat karta hai. Puppeteer/Playwright isi se browser automate karte hain (DOM, network, profiling control)." },
        { q: "Coverage tab kya batata hai?", a: "Page load/interaction par kitna CSS/JS actually use hua vs unused. Bundle size aur dead-code optimization ke liye useful." }
      ]
    },
    mcqs: [
      { q: "Memory leaks dhoondhne ka panel?", options: ["Network", "Memory", "Elements", "Console"], answer: 1, explain: "Memory panel heap snapshots aur allocation timeline se leaks pakdta hai." },
      { q: "Flame chart kis panel me?", options: ["Performance", "Network", "Application", "Console"], answer: 0, explain: "Performance panel flame chart se runtime call stacks dikhata hai." },
      { q: "Storage/Service Worker kahan inspect?", options: ["Elements", "Application", "Network", "Memory"], answer: 1, explain: "Application panel me cookies, storage, cache, SW sab milte hain." }
    ],
    exercises: {
      easy: ["Elements me ek button ka CSS live edit karo.", "Console me console.table se array print karo."],
      medium: ["Network panel me slow 3G throttle laga ke load time naapo.", "Performance record karke ek long task identify karo."],
      advanced: ["Heap snapshot compare karke memory leak dhoondho.", "Coverage tab se unused JS/CSS percentage nikaalo."]
    },
    summary: [
      "DevTools panels: Elements, Console, Network, Performance, Memory, Application, Lighthouse.",
      "Elements: DOM+CSS inspect/edit.",
      "Network: requests + waterfall + throttling.",
      "Performance: flame chart + FPS + jank.",
      "Memory: heap snapshots + leak detection.",
      "Application: storage/SW; Lighthouse: audits."
    ],
    cheatsheet: [
      { h: "Console", code: "$0 // selected\n$$('div') // querySelectorAll\nconsole.table(arr)" },
      { h: "Shortcuts", code: "F12 open | Ctrl+Shift+P command menu\nCtrl+Shift+C inspect" },
      { h: "Profile", code: "console.profile('x'); /*...*/ console.profileEnd('x');" }
    ],
    projects: [
      "Debug + fix a layout bug using Elements panel.",
      "Diagnose slow page with Performance + Network.",
      "Find and fix a memory leak via heap snapshots.",
      "Audit + improve a site with Lighthouse.",
      "Reduce bundle using Coverage tab insights."
    ],
    advanced: "🚀 Senior level: Chrome DevTools Protocol se programmatic profiling, Performance insights / Performance Monitor (live CPU/memory), source maps debugging (minified prod code), conditional/logpoint breakpoints, network request blocking/override (Local Overrides), aur remote debugging (mobile/headless). Coverage + Lighthouse CI ko build pipeline me integrate karna bhi pro move hai.",
    quiz: [
      { q: "Local Overrides kya allow karte hain?", options: ["Server change", "Network responses ko locally edit + persist", "DNS", "Cookies delete"], answer: 1, explain: "Local Overrides se tum network responses (JS/CSS/JSON) locally modify karke test kar sakte ho." },
      { q: "Logpoint kya hai?", options: ["Crash", "Code change bina console.log jaisa log", "Network log", "Memory dump"], answer: 1, explain: "Logpoint code modify kiye bina ek line par message log karta hai (non-breaking breakpoint)." }
    ],
    related: ["web-vitals", "rendering-performance", "browser-storage"]
  },

  "browser-apis": {
    overview: "Browser bahut saari built-in **JavaScript APIs** deta hai jo native browser features tak pohonch deti hain — **Fetch** (network), **History** (SPA routing), **Geolocation** (location), **Clipboard** (copy/paste) aur bahut kuch. Inhe jaanna modern web dev ke liye zaroori hai. 🌐",
    why: "Bina browser APIs ke web apps static rahenge. Fetch se data laao, History se SPA navigation banao, Geolocation se nearby results, Clipboard se sharing — ye APIs apps ko interactive aur powerful banati hain.",
    concept: [
      {
        h: "Fetch API 📡",
        p: "Modern promise-based network requests (XHR ka successor). GET/POST, headers, JSON, async/await ke saath clean. Default me cookies cross-origin nahi bhejta (credentials option se).",
        code: "const res = await fetch(\"/api/users\", {\n  method: \"POST\",\n  headers: { \"Content-Type\": \"application/json\" },\n  body: JSON.stringify({ name: \"Dev\" })\n});\nconst data = await res.json();",
        lang: "js"
      },
      {
        h: "History API 🧭",
        p: "**pushState** (new history entry, URL change bina reload), **replaceState** (current replace), **popstate** event (back/forward). SPA routing ki neenv — React Router/Vue Router isi pe bante hain.",
        code: "history.pushState({ page: 2 }, \"\", \"/page/2\");\nwindow.addEventListener(\"popstate\", (e) => {\n  console.log(\"navigated:\", e.state);\n});",
        lang: "js"
      },
      {
        h: "Geolocation API 📍",
        p: "User ki location (permission ke saath). getCurrentPosition (ek baar), watchPosition (continuous). Maps, nearby search, delivery tracking ke liye.",
        code: "navigator.geolocation.getCurrentPosition(\n  (pos) => console.log(pos.coords.latitude, pos.coords.longitude),\n  (err) => console.error(err.message)\n);",
        lang: "js"
      },
      {
        h: "Clipboard API 📋",
        p: "Programmatically copy/paste. navigator.clipboard.writeText (copy), readText (paste — permission needed). 'Copy link' buttons ke liye. Secure context (HTTPS) chahiye.",
        code: "await navigator.clipboard.writeText(\"https://link.com\");\nconst text = await navigator.clipboard.readText();",
        lang: "js"
      },
      {
        h: "Aur bhi APIs 🧰",
        p: "**Notifications**, **Web Share** (navigator.share), **localStorage/IndexedDB** (storage), **WebSocket** (real-time), **Battery**, **Vibration** (mobile), **Page Visibility** (tab focus). Har feature ke liye ek API.",
        code: "if (navigator.share) {\n  await navigator.share({ title: \"Cool\", url: location.href });\n}\ndocument.addEventListener(\"visibilitychange\", () => {\n  console.log(document.hidden ? \"hidden\" : \"visible\");\n});",
        lang: "js"
      }
    ],
    analogy: "Browser APIs ek smartphone ke **built-in apps/sensors** jaise hain. **Fetch** = internet browser app (data laao). **History** = back/forward navigation buttons. **Geolocation** = GPS sensor. **Clipboard** = copy-paste system. Tumhe sensor banane ki zaroorat nahi — bas API call karke use karo.",
    syntax: {
      code: "// Fetch with async/await + error handling\ntry {\n  const res = await fetch(url);\n  if (!res.ok) throw new Error(\"HTTP \" + res.status);\n  const data = await res.json();\n} catch (e) {\n  console.error(e);\n}",
      note: "fetch HTTP error (404/500) par reject NAHI hota — sirf network fail par. res.ok ya res.status manually check karo.",
      lang: "js"
    },
    steps: [
      "Feature identify karo (data fetch, routing, location, copy).",
      "Sahi API choose karo (Fetch/History/Geolocation/Clipboard).",
      "Feature detection karo (if 'share' in navigator).",
      "Permission-based APIs (geo/clipboard) ke liye permission handle karo.",
      "Async APIs ko async/await + try-catch se wrap karo.",
      "Errors aur edge cases (denied permission, offline) handle karo.",
      "Secure context (HTTPS) wali APIs ko HTTPS par hi test karo.",
      "Cleanup (watchPosition → clearWatch, listeners remove)."
    ],
    internals: {
      p: "Ye APIs browser ke C++ internals par JS bindings hain — async APIs Web APIs hone ke naate event loop ke through callbacks/promises resolve karti hain (main thread block nahi). Fetch ek Request banakar network stack ko deta hai aur Response (streamable body) deta hai. History API browser ke session history stack ko manipulate karta hai bina full page reload ke (yahi SPA ko fast banata hai). Permission-gated APIs Permissions API se state track karti hain.",
      code: "// Permissions API se state check\nconst status = await navigator.permissions.query({ name: \"geolocation\" });\nconsole.log(status.state); // granted | denied | prompt",
      lang: "js"
    },
    process: {
      type: "boxes",
      items: [
        { label: "Fetch", sub: "network/data", color: "#3B82F6" },
        { label: "History", sub: "SPA routing", color: "#10B981" },
        { label: "Geolocation", sub: "location", color: "#14B8A6" },
        { label: "Clipboard", sub: "copy/paste", color: "#F97316" },
        { label: "Share/Notify", sub: "native UX", color: "#8B5CF6" }
      ]
    },
    visual: {
      type: "timeline",
      items: [
        { year: "1", text: "App ko native feature chahiye (data/location...)" },
        { year: "2", text: "Feature detection — API available?" },
        { year: "3", text: "Permission chahiye? → user se maango" },
        { year: "4", text: "API call (async) — promise/callback" },
        { year: "5", text: "Result handle + errors gracefully manage" }
      ]
    },
    memory: "Yaad rakho: **'Fetch data, History route, Geo location, Clipboard copy'**. Fetch HTTP errors par reject nahi hota — res.ok check karo.",
    browser: "DevTools → Console me APIs test karo (navigator.geolocation, fetch). Network tab me fetch requests dikhte hain. Application → Permissions me granted permissions. Sensors panel se geolocation override kar sakte ho (testing).",
    notes: {
      concept: "Fetch sirf network failure par reject hota hai — 404/500 par resolve hota hai (res.ok false). Manually check karo.",
      tip: "Feature detection ('share' in navigator) karo — sab browsers/devices me har API nahi hoti.",
      warning: "Clipboard, Geolocation, Notifications secure context (HTTPS) aur user permission maangti hain.",
      error: "Geolocation user deny kar sakta hai — error callback hamesha handle karo."
    },
    compare: {
      headers: ["API", "Kaam", "Async?", "Permission?"],
      rows: [
        ["Fetch", "Network requests", "Yes (promise)", "No"],
        ["History", "SPA routing", "No (sync)", "No"],
        ["Geolocation", "User location", "Yes (callback)", "Yes"],
        ["Clipboard", "Copy/paste", "Yes (promise)", "Yes (read)"],
        ["Notifications", "Push/alerts", "Yes", "Yes"]
      ]
    },
    mistakes: [
      { bad: "fetch ke baad turant data use (await bhula)", fix: "await res.json() karo — response body bhi promise hai." },
      { bad: "fetch error sirf .catch pe rely", fix: "res.ok / res.status bhi check karo — 404/500 reject nahi hote." },
      { bad: "Geolocation success maan lena", fix: "Error callback do — user deny ya timeout ho sakta hai." },
      { bad: "Clipboard HTTP par use", fix: "HTTPS (secure context) zaroori hai — HTTP par fail." }
    ],
    best: [
      "Async APIs ko async/await + try-catch se handle karo.",
      "Fetch me res.ok aur status check karo.",
      "Feature detection before use (in operator).",
      "Permission denial gracefully handle (fallback UI).",
      "Secure-context APIs HTTPS par hi.",
      "watchPosition/listeners cleanup (clearWatch/remove)."
    ],
    performance: "⚡ Ye APIs async (non-blocking) hain — main thread free rehta hai. Fetch streaming responses support karta hai (bade data efficiently). History API full reload avoid karke SPA navigation ko instant banata hai. Geolocation/watchPosition ka enableHighAccuracy battery drain karta hai — soch kar use karo.",
    tricky: [
      {
        title: "Fetch 404 par reject nahi hota",
        code: "const res = await fetch(\"/missing\"); // 404\nconsole.log(res.ok);     // false\n// .catch yahan NAHI chalega! manually check karo",
        explain: "Fetch sirf network error (offline, DNS fail) par reject hota hai. HTTP error status par resolve hota hai with ok=false.",
        lang: "js"
      },
      {
        title: "pushState reload nahi karta",
        explain: "history.pushState URL change kar deta hai bina page reload ke — SPA ka core trick. Back button popstate fire karta hai, page reload nahi hota.",
        lang: "js"
      }
    ],
    interview: {
      beginner: [
        { q: "Fetch API kya hai?", a: "Promise-based modern network request API (XHR ka successor). async/await ke saath clean code, JSON handling easy. res.json() se body parse." },
        { q: "History API kis kaam aati hai?", a: "URL aur browser history ko bina full reload ke manage karna — SPA routing ki neenv. pushState, replaceState, popstate." }
      ],
      intermediate: [
        { q: "Fetch error handling ka catch kya miss karta hai?", a: "Fetch HTTP errors (404/500) par reject nahi hota — sirf network failure par. res.ok ya res.status manually check karna padta hai." },
        { q: "pushState aur replaceState me farq?", a: "pushState nayi history entry banata hai (back button kaam karega). replaceState current entry ko replace karta hai (history me add nahi)." }
      ],
      advanced: [
        { q: "SPA routing internally kaise kaam karti hai?", a: "Router pushState/replaceState se URL update karta hai (no reload), popstate listen karke back/forward handle karta hai, aur URL match karke component render karta hai." },
        { q: "Permissions API ka role?", a: "navigator.permissions.query se geo/clipboard/notifications jaise permissions ka state (granted/denied/prompt) check kar sakte ho bina trigger kiye — better UX." }
      ]
    },
    mcqs: [
      { q: "Fetch 404 par kya hota hai?", options: ["Reject", "Resolve with res.ok=false", "Crash", "Retry"], answer: 1, explain: "Fetch HTTP errors par resolve hota hai (ok=false) — sirf network fail par reject." },
      { q: "SPA routing ka core API?", options: ["Fetch", "History (pushState)", "Clipboard", "Geolocation"], answer: 1, explain: "History API pushState/popstate se URL bina reload manage karta hai." },
      { q: "Konsi API ko permission chahiye?", options: ["Fetch", "History", "Geolocation", "console"], answer: 2, explain: "Geolocation user permission maangti hai location access ke liye." }
    ],
    exercises: {
      easy: ["Fetch se ek public API call karke data console me dikhao.", "navigator.clipboard.writeText se 'copy link' button banao."],
      medium: ["History pushState se mini SPA navigation banao (no reload).", "Geolocation se user ki lat/lng dikhao with error handling."],
      advanced: ["popstate handle karke back/forward wali simple router banao.", "Web Share + feature detection + fallback implement karo."]
    },
    summary: [
      "Browser APIs native features ko JS me expose karti hain.",
      "Fetch: promise-based network (res.ok check zaroori).",
      "History: pushState/replaceState/popstate — SPA routing.",
      "Geolocation: location (permission + error handle).",
      "Clipboard: copy/paste (HTTPS + permission).",
      "Feature detection + async error handling best practice."
    ],
    cheatsheet: [
      { h: "Fetch", code: "const r = await fetch(url);\nif(!r.ok) throw Error(r.status);\nconst d = await r.json();" },
      { h: "History", code: "history.pushState({}, '', '/path');\nonpopstate = e => render(e.state);" },
      { h: "Clipboard", code: "await navigator.clipboard.writeText('hi');" }
    ],
    projects: [
      "SPA with custom History-based router.",
      "Weather app using Geolocation + Fetch.",
      "Share/copy-link feature (Clipboard + Web Share).",
      "Real-time dashboard (Fetch + WebSocket).",
      "Tab-aware app (Page Visibility API)."
    ],
    advanced: "🚀 Senior level: Navigation API (modern History replacement — cleaner SPA routing), AbortController (fetch cancel karna), Streams API (fetch response streaming), Fetch keepalive (page unload par bhi request bhejna — analytics), Background Fetch, aur File System Access API. Permissions API se proactive permission UX bhi pro pattern hai.",
    quiz: [
      { q: "AbortController fetch me kya karta hai?", options: ["Retry", "Request cancel", "Cache", "Auth"], answer: 1, explain: "AbortController se in-flight fetch ko cancel kar sakte ho (signal pass karke)." },
      { q: "fetch keepalive: true kab useful?", options: ["Auth", "Page unload par bhi request complete (analytics)", "Caching", "Routing"], answer: 1, explain: "keepalive request ko page unload ke baad bhi complete hone deta hai — beacon/analytics ke liye." }
    ],
    related: ["same-origin-cors", "observers", "browser-storage"]
  },

  "observers": {
    overview: "**Observer APIs** browser ko 'kuch hone par batao' kehne ka efficient tarika hain. **IntersectionObserver** (element viewport me aaya/gaya), **MutationObserver** (DOM badla), **ResizeObserver** (element size badla). Polling/scroll-listener se kahin behtar — performance friendly. 👀",
    why: "Pehle log scroll/resize events par constant listeners lagate the — har scroll par dozens of callbacks → jank. Observers callback sirf tab dete hain jab actual change ho, async aur batched. Performance aur clean code dono milte hain.",
    concept: [
      {
        h: "IntersectionObserver 🎯",
        p: "Element viewport (ya kisi root) ke saath intersect kab karta hai. **Lazy loading, infinite scroll, visibility tracking, animations-on-scroll** ke liye perfect. Scroll listener ki zaroorat nahi.",
        code: "const io = new IntersectionObserver((entries) => {\n  entries.forEach((e) => {\n    if (e.isIntersecting) console.log(\"visible:\", e.target);\n  });\n}, { threshold: 0.5 });\nio.observe(document.querySelector(\".box\"));",
        lang: "js"
      },
      {
        h: "MutationObserver 🔬",
        p: "DOM tree me changes detect karta hai — nodes add/remove, attributes change, text change. Third-party DOM changes track karne, ya kisi element ke aane ka wait karne ke liye.",
        code: "const mo = new MutationObserver((mutations) => {\n  mutations.forEach((m) => console.log(m.type, m.addedNodes));\n});\nmo.observe(target, { childList: true, subtree: true, attributes: true });",
        lang: "js"
      },
      {
        h: "ResizeObserver 📏",
        p: "Kisi element ka size badalne par callback (window resize nahi — specific element). Responsive components, charts redraw, container queries-jaisa logic ke liye.",
        code: "const ro = new ResizeObserver((entries) => {\n  entries.forEach((e) => console.log(e.contentRect.width));\n});\nro.observe(document.querySelector(\".card\"));",
        lang: "js"
      },
      {
        h: "Observers > event listeners ⚡",
        p: "Scroll/resize events main thread par har frame fire hote hain (jank). Observers async + batched hain, browser-optimized — sirf relevant change par callback. Performance ka bada difference.",
        lang: "js"
      },
      {
        h: "Cleanup zaroori 🧹",
        p: "Observers ko disconnect/unobserve karna zaroori — warna memory leak. SPA/React me component unmount par cleanup.",
        code: "io.unobserve(el);   // ek element\nio.disconnect();    // sab stop\nmo.disconnect();\nro.disconnect();",
        lang: "js"
      }
    ],
    analogy: "Observers ek **smart doorbell/CCTV** jaise hain. Purana tarika (scroll event) = har second darwaze pe ja kar dekhna 'koi aaya?' (waste of energy). Observer = doorbell jo sirf tab bajti hai jab koi aata hai (event-driven). **IntersectionObserver** = motion sensor (kuch viewport me ghusa). **MutationObserver** = CCTV jo room me changes record kare. **ResizeObserver** = measuring tape jo size badalne par alert kare.",
    syntax: {
      code: "const observer = new IntersectionObserver(callback, options);\nobserver.observe(element);\nobserver.unobserve(element);\nobserver.disconnect();\n// options: { root, rootMargin, threshold }",
      note: "Teeno observers ka pattern same: new Observer(callback) → observe(target) → disconnect() cleanup.",
      lang: "js"
    },
    steps: [
      "Decide: viewport visibility / DOM change / element resize?",
      "Sahi observer choose karo (Intersection/Mutation/Resize).",
      "new Observer(callback) banao.",
      "Options set karo (threshold, rootMargin, childList etc.).",
      "observer.observe(target) call karo.",
      "Callback me entries/mutations process karo.",
      "Ek baar kaam ho to unobserve (e.g. lazy load).",
      "Component unmount/cleanup par disconnect() karo."
    ],
    internals: {
      p: "Observers browser engine me native (C++) hain — callbacks **asynchronously** aur **batched** deliver hote hain (microtask/rendering ke baad), isliye main thread block nahi hota. IntersectionObserver internally browser ke compositor/intersection logic use karta hai (har frame JS run nahi karta). MutationObserver records ko queue karke ek microtask me batch karta hai. Yahi inhe scroll/resize event listeners se zyada performant banata hai.",
      code: "// IntersectionObserver options ka asar\nnew IntersectionObserver(cb, {\n  root: null,              // viewport\n  rootMargin: \"200px\",     // 200px pehle trigger (preload)\n  threshold: [0, 0.5, 1]   // 0%, 50%, 100% par callback\n});",
      lang: "js"
    },
    process: {
      type: "boxes",
      items: [
        { label: "IntersectionObserver", sub: "viewport visibility", color: "#10B981" },
        { label: "MutationObserver", sub: "DOM changes", color: "#3B82F6" },
        { label: "ResizeObserver", sub: "element size", color: "#14B8A6" },
        { label: "Cleanup", sub: "disconnect()", color: "#F43F5E" }
      ]
    },
    visual: {
      type: "timeline",
      items: [
        { year: "1", text: "new Observer(callback) banao" },
        { year: "2", text: "options set (threshold/rootMargin/childList)" },
        { year: "3", text: "observe(target) — watching shuru" },
        { year: "4", text: "Change hua → callback async + batched" },
        { year: "5", text: "Kaam done → unobserve/disconnect (cleanup)" }
      ]
    },
    memory: "Yaad rakho: **'Intersection = dikha/gaya, Mutation = DOM badla, Resize = size badla'**. Pattern: new → observe → disconnect. Scroll listener se behtar (async + batched).",
    browser: "DevTools → Performance panel me observers ke callbacks dikhte hain (scroll listeners se kam frequent). Console me observer banakar test kar sakte ho. Elements panel me DOM change karke MutationObserver fire dekho.",
    notes: {
      concept: "Observer callbacks asynchronous hote hain — turant nahi, batched milte hain. Synchronous logic mat assume karo.",
      tip: "IntersectionObserver me rootMargin se element actual viewport me aane se PEHLE load shuru karo (smoother lazy load).",
      warning: "Observers disconnect/unobserve na karne par memory leak — especially SPA me.",
      error: "MutationObserver me galat options (childList/attributes na dena) se kuch detect nahi hota — options zaroori."
    },
    compare: {
      headers: ["Observer", "Kya detect", "Common use", "Replaces"],
      rows: [
        ["IntersectionObserver", "Viewport intersection", "Lazy load, infinite scroll", "scroll event"],
        ["MutationObserver", "DOM mutations", "DOM change tracking", "polling/DOMNodeInserted"],
        ["ResizeObserver", "Element size", "Responsive components", "window resize event"]
      ]
    },
    mistakes: [
      { bad: "Scroll event se lazy load (jank)", fix: "IntersectionObserver use karo — async, batched, efficient." },
      { bad: "Observer disconnect na karna", fix: "Kaam done ya unmount par unobserve/disconnect — leak avoid." },
      { bad: "MutationObserver bina options", fix: "childList/attributes/subtree explicitly set karo." },
      { bad: "window.resize se element-size logic", fix: "ResizeObserver use karo — specific element ka size track." }
    ],
    best: [
      "Lazy load/infinite scroll: IntersectionObserver (rootMargin se preload).",
      "DOM change tracking: MutationObserver with precise options.",
      "Element resize logic: ResizeObserver, not window.resize.",
      "Hamesha cleanup: unobserve/disconnect on unmount.",
      "Callbacks light rakho (async batched, par heavy work avoid).",
      "threshold tune karo use-case ke hisaab se (visibility %)."
    ],
    performance: "⚡ Observers scroll/resize event listeners ki jagah lekar main thread se constant work hatate hain — callbacks async + batched aur browser-optimized. IntersectionObserver lazy loading ko jank-free banata hai. ResizeObserver layout-thrashing-free size tracking deta hai. Ye modern performant UI ka backbone hain.",
    tricky: [
      {
        title: "rootMargin se early trigger",
        code: "new IntersectionObserver(cb, { rootMargin: \"300px\" });\n// element 300px door se hi 'intersecting' — preload!",
        explain: "rootMargin viewport ko virtually bada/chhota karta hai — positive value se element pehle hi trigger ho jaata hai (smoother lazy load).",
        lang: "js"
      },
      {
        title: "Observer callback async hai",
        explain: "observe() ke turant baad callback nahi chalta — browser ise async batch karke deta hai. Initial state ke liye threshold/buffered behavior samajhna zaroori.",
        lang: "js"
      }
    ],
    interview: {
      beginner: [
        { q: "IntersectionObserver kya hai?", a: "Ek element viewport (ya root) ke saath intersect kab karta hai detect karne wali API. Lazy loading, infinite scroll, on-scroll animations ke liye — scroll listener ki zaroorat nahi." },
        { q: "Observers event listeners se kyun behtar?", a: "Event listeners (scroll/resize) har frame fire hote hain (jank). Observers async, batched aur browser-optimized hain — sirf actual change par callback." }
      ],
      intermediate: [
        { q: "Teeno observers ka use batao.", a: "IntersectionObserver: viewport visibility (lazy load). MutationObserver: DOM changes (nodes/attributes). ResizeObserver: element size change (responsive components)." },
        { q: "Infinite scroll IntersectionObserver se kaise?", a: "List ke end me ek 'sentinel' element rakho, usse observe karo. Jab woh viewport me aaye (isIntersecting), agla data load karo." }
      ],
      advanced: [
        { q: "rootMargin aur threshold ka kaam?", a: "rootMargin root ke bounds ko grow/shrink karta hai (preload ke liye early trigger). threshold batata hai kitna % visible hone par callback fire ho (0=koi pixel, 1=poora)." },
        { q: "Observers internally fast kyun hain?", a: "Native engine me implemented, callbacks async + batched (har frame JS nahi), IntersectionObserver compositor-level intersection use karta hai — main thread par constant work nahi." }
      ]
    },
    mcqs: [
      { q: "Lazy loading ke liye konsa observer?", options: ["MutationObserver", "IntersectionObserver", "ResizeObserver", "PerformanceObserver"], answer: 1, explain: "IntersectionObserver viewport visibility detect karke lazy load karta hai." },
      { q: "DOM node add/remove detect karne ke liye?", options: ["IntersectionObserver", "MutationObserver", "ResizeObserver", "scroll"], answer: 1, explain: "MutationObserver childList option se DOM mutations detect karta hai." },
      { q: "Observers event listeners se behtar kyun?", options: ["Synchronous", "Async + batched + optimized", "More callbacks", "Bigger code"], answer: 1, explain: "Observers async, batched aur browser-optimized hote hain — kam main-thread work." }
    ],
    exercises: {
      easy: ["IntersectionObserver se ek element visible hone par console log karo.", "ResizeObserver se ek box ka width change track karo."],
      medium: ["IntersectionObserver se images lazy load karo (data-src → src).", "MutationObserver se dynamically added node detect karo."],
      advanced: ["Sentinel + IntersectionObserver se infinite scroll banao.", "ResizeObserver se ek chart ko container resize par redraw karo."]
    },
    summary: [
      "3 observers: Intersection (viewport), Mutation (DOM), Resize (element size).",
      "Pattern: new Observer(cb) → observe(target) → disconnect().",
      "Scroll/resize listeners se behtar — async, batched, fast.",
      "IntersectionObserver: lazy load, infinite scroll, visibility.",
      "rootMargin se preload, threshold se visibility %.",
      "Cleanup (unobserve/disconnect) memory leak avoid karne ko zaroori."
    ],
    cheatsheet: [
      { h: "Intersection", code: "const io=new IntersectionObserver(cb,{threshold:0.5});\nio.observe(el);" },
      { h: "Mutation", code: "new MutationObserver(cb).observe(t,{childList:true,subtree:true});" },
      { h: "Resize", code: "new ResizeObserver(cb).observe(el);" }
    ],
    projects: [
      "Lazy-loaded image gallery (IntersectionObserver).",
      "Infinite scroll feed with sentinel element.",
      "Scroll-triggered animations / reveal-on-scroll.",
      "Responsive chart that redraws on container resize (ResizeObserver).",
      "Auto-detect dynamically injected DOM (MutationObserver)."
    ],
    advanced: "🚀 Senior level: PerformanceObserver (Web Vitals measure karna), IntersectionObserver v2 (visibility + occlusion detection for ad fraud), ResizeObserver ka 'ResizeObserver loop limit exceeded' error handling, content-visibility ke saath IntersectionObserver synergy, aur observers ko React hooks (useIntersectionObserver) me wrap karna with proper cleanup. Container queries ne kuch ResizeObserver use-cases CSS me la diye hain.",
    quiz: [
      { q: "PerformanceObserver kis kaam aata hai?", options: ["DOM change", "Performance entries (Web Vitals) observe", "Resize", "Network"], answer: 1, explain: "PerformanceObserver LCP/CLS/long-tasks jaisi performance entries observe karta hai." },
      { q: "IntersectionObserver v2 ka extra feature?", options: ["Resize", "Actual visibility + occlusion detection", "DOM diff", "Caching"], answer: 1, explain: "v2 batata hai element genuinely visible hai (kisi cheez se dhaka to nahi) — ad-fraud detection ke liye." }
    ],
    related: ["debounce-throttle", "rendering-performance", "browser-apis"]
  }
}
