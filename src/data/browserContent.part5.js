// Browser Internals Course — Part 5: Senior-level topics + master interview prep.

export const browserContentE = {
  'blink-renderingng': {
    overview:
      '**Blink** Chromium ka rendering engine hai (WebKit se fork, 2013). **RenderingNG** Blink ki modern rendering architecture hai — ek multi-year rewrite jisne pipeline ko reliable, fast aur extensible banaya. Iske core ideas: **BlinkNG** (cleaned-up pipeline), **LayoutNG** (naya layout engine), **immutable display lists**, **property trees**, aur main thread vs **compositor thread** ka clean split. Goal: har frame predictable, parallel-friendly aur GPU-accelerated ho. 🚀',
    why:
      'Senior frontend interview mein "browser frame kaise banta hai" deep level par pucha jata hai. RenderingNG samajhne se aap jaante ho ki transform/opacity cheap kyun, layout thrash kyun mahanga, aur composited animations smooth kyun. Yeh performance debugging ki foundation hai.',
    concept: [
      { h: 'Blink kya hai', p: 'Blink Chromium ka rendering engine — HTML/CSS parse, DOM/CSSOM banata, layout/paint/compositing karta. JavaScript V8 handle karta (alag), Blink unhe bind karta (DOM bindings).' },
      { h: 'RenderingNG goals', p: 'Teen pillars: **Reliability** (predictable, testable pipeline), **Performance** (parallel, GPU, cached), **Extensibility** (naye features add karna aasan). Yeh ek architectural reset tha, naya feature nahi.' },
      { h: 'Pipeline (13 stages, simplified)', p: 'Animate → Style → Layout → Pre-paint (property trees) → Scroll → Paint (display lists) → Commit → Layerize → Raster → Decode → Activate → Draw. Pehle hisse main thread par, raster/draw compositor + GPU par.', code: `// Conceptual stages\nAnimate -> Style -> Layout -> Pre-paint\n   -> Paint (display list) -> Commit\n   -> Layerize -> Raster -> Draw (GPU)` },
      { h: 'LayoutNG', p: 'Naya layout engine — har layout algorithm (block, flex, grid, text) ek clean, isolated unit. Input/output well-defined, fragment-based. Purana legacy layout buggy aur intertwined tha. LayoutNG fragmentation (multicol, print) bhi solve karta.' },
      { h: 'Immutable display lists', p: 'Paint ka output ek **immutable list of paint ops** (draw ops) hota hai, na ki mutable render objects. Immutable hone se compositor thread bina lock ke read kar sakta — thread-safe, cacheable.', code: `// Display list = ordered paint ops\n[ drawRect, drawText, drawImage, ... ]` },
      { h: 'Property trees', p: 'Transform / Clip / Effect (opacity) / Scroll ko alag **trees** mein store karte (na ki ek bade layer tree mein). Isse compositor sirf transform/opacity update kar sakta bina re-paint kiye — yahi composited animations ka raaz hai.' },
    ],
    analogy:
      'Socho ek **film studio** 🎬. Purana Blink = ek hi banda script, set, lighting, camera sab handle karta — chaos, ek galti sab kuch tod deti. RenderingNG = assembly line: writer (style), set designer (layout), painter (paint), camera operator (compositor). Har stage ka clear input/output. Aur "display list" ek **shooting script** ki tarah hai — fixed (immutable), sab parallel padh sakte. Property trees = camera ki "move opacity/zoom" knobs jo set dobara banaye bina chalte.',
    syntax: {
      code: `// Aap pipeline ko sirf observe kar sakte ho (control nahi)\n// Compositor-only properties (cheap, GPU):\nel.style.transform = "translateX(100px)"\nel.style.opacity = "0.5"\n\n// Layout trigger karne wale (mahange, main thread):\nel.style.width = "200px"   // -> Style+Layout+Paint+Composite`,
      note: 'transform/opacity = property tree update (composite only). width/top = poora pipeline. DevTools "Rendering" tab se layer borders dekho.',
    },
    steps: [
      'JavaScript / animations DOM ya style badalte hain — pipeline invalidate hota hai.',
      'Style: matched CSS rules se har element ka computed style banta (ComputedStyle).',
      'Layout (LayoutNG): geometry calculate — har box ka size/position, fragment tree.',
      'Pre-paint: property trees (transform/clip/effect/scroll) build/update hote.',
      'Paint: visible content ke liye immutable display lists generate hote.',
      'Commit: main thread se display lists + property trees compositor thread ko diye jaate.',
      'Layerize + Raster: layers tiles mein toot kar bitmap mein raster hote (raster threads / GPU).',
      'Draw: compositor GPU ko draw quads bhejta — final frame screen par aata.',
    ],
    internals: {
      p: '🧠 **Deep**: RenderingNG ka killer feature hai ki **main thread aur compositor thread alag-alag rates par chal sakte**. Main thread agar busy hai (long JS task), compositor phir bhi pehle se committed display lists + property trees use karke smooth scroll/transform/opacity animations chala sakta hai. Property trees ki wajah se compositor sirf transform matrix ya opacity value badal kar naya frame draw kar leta — re-style, re-layout, re-paint kuch nahi. Display lists immutable hone se cross-thread bina copy/lock share hote (ref-counted). LayoutNG fragment trees deterministic hote — same input = same output, isliye testable. Yeh teen cheezein (immutability, property trees, thread split) milke "60fps even when main thread janks" possible banati hain.',
      code: `// Compositor thread (simplified mental model)\nfunction onVSync() {\n  // main thread se kuch nahi chahiye agar sirf\n  // transform/opacity badla\n  const frame = drawUsing(committedDisplayLists, propertyTrees)\n  gpu.submit(frame)   // ~16.6ms budget\n}`,
      lang: 'js',
    },
    process: {
      type: 'boxes',
      items: [
        { label: 'Style', sub: 'Computed styles', color: '#9333EA' },
        { label: 'Layout (NG)', sub: 'Geometry / fragments', color: '#8B5CF6' },
        { label: 'Pre-paint', sub: 'Property trees', color: '#06B6D4' },
        { label: 'Paint', sub: 'Display lists', color: '#22C55E' },
        { label: 'Commit', sub: 'Main -> Compositor', color: '#EAB308' },
        { label: 'Raster + Draw', sub: 'Tiles -> GPU', color: '#F97316' },
      ],
    },
    visual: {
      type: 'timeline',
      items: [
        { year: '2013', text: 'Blink WebKit se fork hua (Chromium).' },
        { year: '2016', text: 'LayoutNG project shuru — naya layout engine.' },
        { year: '2019', text: 'LayoutNG ship; property trees mature hue.' },
        { year: '2021', text: 'RenderingNG officially document/announce hua.' },
        { year: 'Aaj', text: 'Immutable display lists + threaded pipeline standard.' },
      ],
    },
    memory:
      'Yaad rakho: **"SLPP-CRD"** — Style, Layout, Pre-paint, Paint, Commit, Raster, Draw. NG = "Next Generation" = clean + immutable + threaded.',
    browser:
      'Yeh sab Chromium (Chrome, Edge, Brave, Opera) mein hai. Firefox ka engine **Gecko** (WebRender/Servo ideas), Safari ka **WebKit**. Concepts (property trees, compositing) similar hain par implementation alag.',
    notes: {
      concept: 'RenderingNG = Blink ki modern, threaded, immutable rendering architecture.',
      tip: 'transform/opacity hi aise hain jo property tree update se composite-only chalte. Inhe animate karo.',
      warning: 'width/height/top/left animate karna har frame layout+paint trigger karta — jank.',
      error: 'Galat dhaarna: "RenderingNG ek alag browser hai." Nahi — yeh Blink ke andar ki architecture hai.',
    },
    compare: {
      headers: ['Aspect', 'Legacy Blink', 'RenderingNG'],
      rows: [
        ['Layout', 'Intertwined, buggy', 'LayoutNG — isolated, fragment-based'],
        ['Paint output', 'Mutable render objects', 'Immutable display lists'],
        ['Compositing', 'Layer tree heavy', 'Property trees (transform/clip/effect/scroll)'],
        ['Threading', 'Main-thread bound', 'Main vs compositor decoupled'],
      ],
    },
    mistakes: [
      { bad: 'top/left se element animate karna.', fix: 'transform: translate() use karo — composite-only.' },
      { bad: 'Har frame layout-triggering property padhna+likhna (thrash).', fix: 'Reads batch karo, fir writes (FastDOM pattern).' },
      { bad: '"box-shadow/filter cheap hai" maan lena.', fix: 'Yeh paint-heavy hote; will-change/layer se manage karo.' },
    ],
    best: [
      'Animations sirf transform aur opacity par.',
      'Layout-triggering properties ko hot paths mein avoid karo.',
      'will-change: transform soch-samajh kar (layer promote), overuse nahi.',
      'DevTools Performance + Layers panel se pipeline stages dekho.',
      'Bade DOM trees avoid karo — style/layout cost O(elements).',
    ],
    performance:
      '⚡ RenderingNG ka pura point performance hai. Composite-only updates (transform/opacity) main thread ko bypass kar sakte, isliye 60fps even under JS load. Layout aur Paint sabse mahange stages — inhe trigger karne wali properties se bacho. Tiles + raster threads parallel chalte taaki scroll smooth rahe.',
    tricky: [
      { title: 'transform vs left — kaun re-layout karega?', code: `// A\nel.style.left = "100px"\n// B\nel.style.transform = "translateX(100px)"`, explain: 'A poora pipeline (Style->Layout->Paint->Composite) trigger karta. B sirf property tree (transform) update — composite-only, GPU par, fast. Visually same, cost alag.', lang: 'js' },
      { title: 'Layout thrash', code: `for (const el of items) {\n  const h = el.offsetHeight  // READ (forces layout)\n  el.style.height = h + 10 + "px"  // WRITE (invalidates)\n}`, explain: 'Read ke baad write, fir agle iteration mein read — har baar synchronous layout (forced reflow). Solution: pehle saare reads, fir saare writes.', lang: 'js' },
    ],
    interview: {
      beginner: [
        { q: 'Blink kya hai?', a: 'Chromium ka rendering engine — HTML/CSS ko visual page mein convert karta (parse, layout, paint, composite). WebKit se 2013 mein fork hua.' },
        { q: 'RenderingNG kya hai?', a: 'Blink ki modern rendering architecture. Goals: reliability, performance, extensibility. Key ideas: LayoutNG, immutable display lists, property trees, threaded pipeline.' },
      ],
      intermediate: [
        { q: 'Property trees kya solve karte?', a: 'Transform/clip/effect/scroll ko alag trees mein rakhte. Compositor inhe layer tree dobara banaye bina update kar sakta — composited (transform/opacity) animations smooth aur cheap ho jaate.' },
        { q: 'Display lists immutable kyun?', a: 'Immutable hone se compositor thread bina lock/copy ke read kar sakta — thread-safe sharing, caching, aur deterministic re-draw possible.' },
      ],
      advanced: [
        { q: 'Main thread jank ke bawajood scroll smooth kaise?', a: 'Compositor thread pehle committed display lists + property trees use karta. Agar sirf scroll/transform/opacity badla, compositor independently naya frame draw kar leta — main thread (JS, layout) involve nahi hota.' },
        { q: 'LayoutNG ne kya improve kiya?', a: 'Har layout algorithm isolated, fragment-based, deterministic input/output. Legacy intertwined layout ke bugs/jank theek kiye, fragmentation (multicol/print) properly handle kiya, testability badhi.' },
      ],
    },
    mcqs: [
      { q: 'RenderingNG ka paint output kya hai?', options: ['Mutable render objects', 'Immutable display list', 'Pixels directly', 'DOM tree'], answer: 1, explain: 'Paint immutable display list (paint ops) banata jo compositor safely share karta.' },
      { q: 'Kaunsi property composite-only update hai?', options: ['width', 'transform', 'margin', 'font-size'], answer: 1, explain: 'transform (aur opacity) property tree update — layout/paint skip.' },
      { q: 'Property trees mein kaun NAHI hota?', options: ['Transform', 'Clip', 'Effect', 'Font-family'], answer: 3, explain: 'Trees: transform, clip, effect, scroll. Font style computed style mein.' },
    ],
    exercises: {
      easy: ['DevTools > Rendering > "Layer borders" on karo aur ek animated element dekho.'],
      medium: ['Ek box ko top/left se animate karo, fir transform se — Performance panel mein dono ki cost compare karo.'],
      advanced: ['Ek list par layout thrash code likho, Performance mein "forced reflow" warnings dekho, fir read/write batch karke fix karo.'],
    },
    summary: [
      'Blink = Chromium rendering engine; RenderingNG = uski modern architecture.',
      'Pillars: reliability, performance, extensibility.',
      'Key: LayoutNG, immutable display lists, property trees, threaded pipeline.',
      'Property trees se transform/opacity composite-only (cheap) chalte.',
      'Main thread aur compositor decoupled — jank ke bawajood smooth.',
    ],
    cheatsheet: [
      { h: 'Pipeline', code: `Style -> Layout -> Pre-paint\n-> Paint -> Commit -> Raster -> Draw` },
      { h: 'Cheap vs costly', code: `cheap:  transform, opacity\ncostly: width, top, layout props` },
    ],
    projects: [
      'Ek smooth card-flip animation banao sirf transform se (no layout).',
      'Performance audit: ek page ke layout/paint hotspots identify karo.',
      'Long-list scroll ko buttery banao (composite-only + content-visibility).',
    ],
    advanced:
      '🚀 Aur gehrai: surface aggregation (Viz/Display Compositor) jo multiple compositor frames ko ek screen frame mein merge karta; OOP-D (out-of-process display compositor); GPU raster vs CPU raster trade-offs; CompositeAfterPaint (CAP) jisne paint aur compositing ka order theek kiya; partial raster aur tile invalidation.',
    quiz: [
      { q: 'RenderingNG kis engine ki architecture hai?', options: ['Gecko', 'Blink', 'WebKit', 'V8'], answer: 1, explain: 'Blink (Chromium).' },
      { q: 'Commit kis ke beech hota hai?', options: ['V8 aur DOM', 'Main aur compositor thread', 'GPU aur disk', 'Style aur paint'], answer: 1, explain: 'Main thread display lists/property trees compositor ko commit karta.' },
    ],
    related: ['rendering-engines', 'compositor-raster', 'critical-rendering-path', 'paint-repaint'],
  },

  'site-isolation': {
    overview:
      '**Site Isolation** Chromium ka security feature hai jisme har **site** apne alag **renderer process** mein chalti hai. Iska matlab cross-site iframes bhi alag process mein jaate (**OOPIFs** — Out-of-Process Iframes). Yeh **Spectre/Meltdown** jaise side-channel attacks aur compromised renderer se cross-site data churane se bachata. Cost: zyada memory (har process ka overhead), benefit: strong security boundary. 🛡️',
    why:
      'Spectre (2018) ne dikhaya ki same process mein data read kiya ja sakta hai memory se. Site Isolation iska real-world defense hai. Senior interview mein "process per site kyun, security model kya hai, OOPIF kya hai" pucha jata. Web security ka foundation.',
    concept: [
      { h: '"Site" ki definition', p: 'Site = scheme + eTLD+1 (registrable domain). Yaani https://a.example.com aur https://b.example.com **same site** (example.com), lekin https://evil.com alag site. Origin se broader hai.', code: `// Same SITE (example.com):\nhttps://app.example.com\nhttps://api.example.com\n// Different site:\nhttps://attacker.com` },
      { h: 'Process-per-site-instance', p: 'Default model: har site-instance ko alag renderer process. Cross-site navigation = process swap. Same-site frames share kar sakte, cross-site nahi.' },
      { h: 'OOPIFs (Out-of-Process Iframes)', p: 'Agar parent page A.com hai aur usme B.com ka iframe hai, to wo iframe **alag process** mein render hota. Yeh embedded ads/widgets ko host page se isolate karta.', code: `<!-- a.com page -->\n<iframe src="https://b.com/widget"></iframe>\n<!-- b.com alag renderer process mein -->` },
      { h: 'Spectre defense', p: 'Spectre speculative execution se same process ki memory leak kar sakta. Agar attacker ki site aur victim ka data alag process mein hain, to attacker speculatively bhi victim data tak nahi pahunch sakta — process boundary OS-level barrier hai.' },
      { h: 'CORB / ORB', p: 'Cross-Origin Read Blocking (ab Opaque Response Blocking) sensitive cross-site responses (HTML/JSON/XML) ko attacker ke renderer mein pahunchne se rokta — taaki Spectre ke liye data hi available na ho.' },
    ],
    analogy:
      'Socho ek **bank** 🏦. Bina Site Isolation = sab customers ek bade hall mein, koi bhi paas wale ka form jhaank sakta (Spectre). Site Isolation = har customer apne **alag soundproof cabin** (process) mein. Cabin ki deewar = OS process boundary. Ek cabin mein chori bhi ho jaaye to baaki cabins safe. OOPIF = customer ke saath aaya unknown agent (third-party iframe) bhi apni alag cabin mein baithta, customer ke kaagaz nahi dekh sakta. Cost: zyada cabins = zyada jagah (memory).',
    syntax: {
      code: `// Site Isolation transparent hai — koi API nahi.\n// Lekin developers cross-origin isolation enable kar\n// sakte powerful features (SharedArrayBuffer) ke liye:\n// Response headers:\nCross-Origin-Opener-Policy: same-origin\nCross-Origin-Embedder-Policy: require-corp\n// Check:\nif (self.crossOriginIsolated) { /* SAB + safe */ }`,
      note: 'crossOriginIsolated true hone par hi SharedArrayBuffer/high-res timers milte — yeh Spectre mitigation se juda hai.',
    },
    steps: [
      'User a.com par jaata — browser ek renderer process spawn karta a.com ke liye.',
      'a.com page mein b.com ka cross-site iframe hai.',
      'Browser process b.com ke liye ALAG renderer process banata (OOPIF).',
      'Dono renderers sandboxed; aapas mein sirf browser process ke through (IPC) baat.',
      'a.com ka JS b.com iframe ki memory/DOM access nahi kar sakta (origin + process boundary).',
      'Cross-site network responses CORB/ORB se filter — sensitive data attacker renderer mein nahi aata.',
      'Cross-site navigation par browser process swap karta (ya naya banata).',
    ],
    internals: {
      p: '🧠 **Deep**: Site Isolation enforce do jagah hota — (1) **renderer process assignment**: browser process decide karta ki kaunsa frame kis process mein, site (eTLD+1) ke aadhar par. (2) **Network response filtering** (CORB/ORB): browser process hi network se data laata aur decide karta ki kis renderer ko deta. Ek compromised renderer agar arbitrary data maange bhi, browser process cross-site sensitive responses nahi dega. Frame tree logically ek hota par physically multiple processes mein bata — rendering ke liye compositor frames ko **Viz/Display Compositor** (GPU process) merge karta (surface aggregation). Memory cost real hai: har process ~10-30MB+ overhead, isliye low-memory devices par Android mein Site Isolation selective tha (pehle sirf "high-value" sites jaha user password type karta).',
      code: `// Conceptual: browser process arbitration\nfunction processFor(frameUrl, parentSite) {\n  const site = eTLDplus1(frameUrl)   // "example.com"\n  if (site === parentSite) return parentProcess\n  return getOrCreateProcessForSite(site) // OOPIF\n}`,
      lang: 'js',
    },
    process: {
      type: 'boxes',
      items: [
        { label: 'Browser Process', sub: 'Privileged, arbiter', color: '#9333EA' },
        { label: 'Renderer A (a.com)', sub: 'Sandboxed', color: '#06B6D4' },
        { label: 'Renderer B (b.com)', sub: 'OOPIF, sandboxed', color: '#F97316' },
        { label: 'GPU/Viz Process', sub: 'Frames merge', color: '#22C55E' },
      ],
    },
    visual: {
      type: 'timeline',
      items: [
        { year: '1', text: 'Chrome multi-process tha par cross-site iframes share process kar sakte the.' },
        { year: '2', text: '2018: Spectre/Meltdown public — same-process memory leak risk.' },
        { year: '3', text: '2018: Site Isolation desktop par default on.' },
        { year: '4', text: '2019+: Android par selective, fir broader rollout.' },
        { year: '5', text: 'Aaj: OOPIFs + CORB/ORB standard security baseline.' },
      ],
    },
    memory:
      'Yaad: **"Har SITE ka apna ghar"** — site = scheme + eTLD+1. Iframe alag site = OOPIF = alag process. Boundary = Spectre se bachao.',
    browser:
      'Site Isolation Chromium (Chrome/Edge) ka flagship feature. Firefox ka equivalent **Project Fission** (per-site processes). Safari (WebKit) bhi process isolation karta. Sab Spectre ke baad isolation ki taraf gaye.',
    notes: {
      concept: 'Har site apne renderer process mein; cross-site iframe = OOPIF.',
      tip: 'COOP + COEP set karke crossOriginIsolated banao agar SharedArrayBuffer chahiye.',
      warning: 'Site = eTLD+1, origin nahi. Subdomains same site, alag port/subdomain phir bhi same site.',
      error: 'Galat: "iframe same process mein hota." Cross-site iframe alag process (OOPIF) mein hota.',
    },
    compare: {
      headers: ['Concept', 'Origin', 'Site'],
      rows: [
        ['Banta hai', 'scheme + host + port', 'scheme + eTLD+1'],
        ['a.example.com vs b.example.com', 'Different origin', 'Same site'],
        ['Used by', 'Same-Origin Policy, CORS', 'Site Isolation, SameSite cookies'],
        ['Granularity', 'Sankri (strict)', 'Broad'],
      ],
    },
    mistakes: [
      { bad: '"Origin aur site same cheez hai" maan lena.', fix: 'Origin = scheme+host+port; site = scheme+eTLD+1 (broader).' },
      { bad: 'Cross-site iframe se parent ka data padhne ki koshish.', fix: 'Origin + process boundary block karega; postMessage use karo.' },
      { bad: 'SharedArrayBuffer expect karna bina COOP/COEP ke.', fix: 'Cross-origin isolation enable karo headers se.' },
    ],
    best: [
      'Third-party widgets ko iframe mein rakho — automatic OOPIF isolation milta.',
      'Sensitive APIs (cookies) ke liye HttpOnly + SameSite use karo.',
      'COOP/COEP set karke crossOriginIsolated lo jab high-precision features chahiye.',
      'Server par CORB/ORB friendly content-types do (JSON ko application/json).',
      'Memory-constrained scenarios mein iframe count soch-samajh kar.',
    ],
    performance:
      '⚡ Trade-off: zyada processes = zyada RAM aur thoda zyada IPC overhead, par security worth it. Chrome memory ka bada hissa Site Isolation se hai — yahi "Chrome RAM khaata hai" meme ka ek karan. Benefit: ek tab crash baaki tabs/sites ko nahi le jaata, aur cross-site attacks block.',
    tricky: [
      { title: 'Same site ya different site?', code: `// Page: https://mail.google.com\n// Iframe: https://docs.google.com\n// Same site? -> eTLD+1 = google.com dono\n// Answer: SAME site (no OOPIF)`, output: `Same site -> usually same process`, explain: 'eTLD+1 (google.com) same hai, isliye same site. Origin alag (mail vs docs) par site same. OOPIF cross-site par hota.', lang: 'js' },
      { title: 'crossOriginIsolated check', code: `console.log(self.crossOriginIsolated)\n// Without COOP+COEP:`, output: `false`, explain: 'Bina Cross-Origin-Opener-Policy aur Cross-Origin-Embedder-Policy ke crossOriginIsolated false rehta — SharedArrayBuffer block.', lang: 'js' },
    ],
    interview: {
      beginner: [
        { q: 'Site Isolation kya hai?', a: 'Chromium feature jisme har site apne alag renderer process mein chalti — cross-site data theft aur Spectre se bachav.' },
        { q: 'OOPIF kya hai?', a: 'Out-of-Process Iframe — cross-site iframe jo parent page se alag renderer process mein render hota.' },
      ],
      intermediate: [
        { q: '"Site" aur "origin" mein farak?', a: 'Origin = scheme+host+port (strict). Site = scheme+eTLD+1 (broad). a.example.com aur b.example.com alag origin par same site.' },
        { q: 'Site Isolation Spectre se kaise bachata?', a: 'Spectre same process ki memory leak karta. Alag sites alag process mein hone se attacker ki site victim ka data speculatively bhi read nahi kar sakti — process boundary OS-level hai.' },
      ],
      advanced: [
        { q: 'CORB/ORB ka role?', a: 'Browser process cross-site sensitive responses (HTML/JSON/XML) ko attacker ke renderer mein deliver hone se rokta, taaki Spectre ke liye memory mein data hi na ho.' },
        { q: 'Memory cost kaise manage hota?', a: 'Har process ka overhead hota; low-RAM (Android) par pehle selective isolation (sirf sensitive sites). Process reuse aur thresholds se balance.' },
      ],
    },
    mcqs: [
      { q: 'Cross-site iframe kahan render hota?', options: ['Same process', 'Alag renderer process (OOPIF)', 'GPU process', 'Browser process'], answer: 1, explain: 'OOPIF — alag renderer process.' },
      { q: 'Site kis se banti hai?', options: ['scheme+host+port', 'scheme + eTLD+1', 'sirf host', 'origin + path'], answer: 1, explain: 'Site = scheme + registrable domain (eTLD+1).' },
      { q: 'Site Isolation mukhya rूप se kis se bachata?', options: ['XSS', 'Spectre/cross-site leaks', 'Slow network', 'Memory leak'], answer: 1, explain: 'Side-channel (Spectre) aur cross-site data theft.' },
    ],
    exercises: {
      easy: ['chrome://process-internals (ya Task Manager) khol kar dekho kitne renderer processes hain.'],
      medium: ['Ek page mein cross-site iframe daalo, Chrome Task Manager mein alag process confirm karo.'],
      advanced: ['COOP+COEP headers set karke crossOriginIsolated true karo aur SharedArrayBuffer use karo.'],
    },
    summary: [
      'Har site apne renderer process mein — Site Isolation.',
      'Cross-site iframe = OOPIF = alag process.',
      'Site = scheme + eTLD+1; origin se broader.',
      'Spectre + cross-site data theft se primary defense.',
      'Cost: zyada memory; benefit: strong security boundary.',
    ],
    cheatsheet: [
      { h: 'Site vs Origin', code: `origin: scheme+host+port\nsite:   scheme+eTLD+1` },
      { h: 'Cross-origin isolation', code: `COOP: same-origin\nCOEP: require-corp\n-> self.crossOriginIsolated` },
    ],
    projects: [
      'Third-party chat widget ko OOPIF iframe mein embed karke isolate karo.',
      'Ek app ko cross-origin isolated banao SharedArrayBuffer (wasm threads) ke liye.',
      'Security audit: kaunse third-party scripts inline hain (risk) vs iframed (isolated).',
    ],
    advanced:
      '🚀 Aur gehrai: Origin-keyed agent clusters (Origin-Agent-Cluster header) origin-level isolation; process-per-origin (stricter) vs process-per-site trade-offs; renderer sandbox layers (seccomp-bpf, Win32k lockdown); Spectre ke baad timer resolution reduction; "compromised renderer" threat model jisme browser process untrusted renderer maan kar arbitrate karta.',
    quiz: [
      { q: 'OOPIF ka full form?', options: ['Out-of-Page iframe', 'Out-of-Process Iframe', 'Origin-Only iframe', 'Optional iframe'], answer: 1, explain: 'Out-of-Process Iframe.' },
      { q: 'COOP+COEP kis ke liye chahiye?', options: ['CSS grid', 'crossOriginIsolated / SharedArrayBuffer', 'Cookies', 'Service worker'], answer: 1, explain: 'Cross-origin isolation enable karne ke liye.' },
    ],
    related: ['multi-process', 'browser-processes', 'same-origin-cors', 'xss-csrf-csp'],
  },

  'frame-scheduler': {
    overview:
      'Ek smooth 60fps experience ke liye browser ko har **~16.6ms** mein ek frame banana hota — yeh frame budget hai. Har frame mein ek pipeline chalti: **Input → requestAnimationFrame → Style → Layout → Paint → Composite**, aur agar time bache to **requestIdleCallback**. **Blink Scheduler** tasks ko priority deta taaki important kaam (input, animation) time par ho aur **jank** (missed frames) na ho. Long tasks (>50ms) frame ko block karte hain. ⏱️',
    why:
      'Performance ka dil yahi hai. "60fps kaise milta, rAF vs setTimeout, long task kya, jank kyun" senior interviews mein core. INP (Interaction to Next Paint) web vital directly is se juda hai.',
    concept: [
      { h: '16.6ms frame budget', p: '60fps = 1000ms / 60 ≈ 16.6ms per frame. Is budget mein input handle + JS + style + layout + paint + composite sab fit hona chahiye. Miss = dropped frame = jank.', code: `// 60 frames in 1000ms\n1000 / 60 = 16.66ms per frame budget` },
      { h: 'Frame lifecycle', p: 'Order: pending input events → requestAnimationFrame callbacks → style recalc → layout → paint → composite. rAF "frame se theek pehle, render se theek pehle" chalta — animation update ki sahi jagah.' },
      { h: 'requestAnimationFrame', p: 'Browser ko bolta "agle paint se pehle yeh callback chalao". Visual updates ke liye ideal — display refresh ke saath sync, tab background mein paused.', code: `function loop(ts) {\n  el.style.transform = "translateX(" + (ts/10 % 200) + "px)"\n  requestAnimationFrame(loop)\n}\nrequestAnimationFrame(loop)` },
      { h: 'requestIdleCallback', p: 'Frame ke baad jo time bache (idle) usme low-priority kaam chalata — analytics, prefetch, logging. timeRemaining() deta. Critical kaam ke liye NAHI.', code: `requestIdleCallback((deadline) => {\n  while (deadline.timeRemaining() > 0 && tasks.length) {\n    process(tasks.pop())\n  }\n})` },
      { h: 'Blink Scheduler & task priorities', p: 'Scheduler tasks ko queues mein priority deta: input/user-blocking highest, fir default, fir idle/background. Yeh main thread ko fairly share karta taaki responsiveness bani rahe.' },
      { h: 'Long tasks & jank', p: 'Koi bhi JS task >50ms = "long task" — wo frame block karta, input late handle hota, animation atak jaati (jank). Solution: kaam ko chote chunks mein todo (yield), Web Worker offload, scheduler.yield().' },
    ],
    analogy:
      'Socho ek **bus jo har 16.6 second par nikalti** 🚌. Har trip mein passengers (input, animation, style, layout, paint) chadhne chahiye — time pe na chade to bus chhoot gayi (dropped frame = jank). requestAnimationFrame = "bus chhutne se theek pehle wala passenger" (animation). requestIdleCallback = "bus jaane ke baad bachi free seats par standby log" (low priority). Long task = ek passenger jo darwaze par 50 second khada rehta — baaki sab late, bus chhoot jaati. Scheduler = conductor jo decide karta kaun pehle chade.',
    syntax: {
      code: `// Smooth animation\nrequestAnimationFrame(function loop(ts) {\n  update(ts)        // sirf transform/opacity\n  requestAnimationFrame(loop)\n})\n\n// Idle work\nrequestIdleCallback(() => sendAnalytics(), { timeout: 2000 })\n\n// Yield to keep responsive (modern)\nawait scheduler.yield?.()`,
      note: 'setInterval/setTimeout display refresh se sync nahi — animations ke liye rAF use karo.',
    },
    steps: [
      'VSync signal aata (~hr 16.6ms display refresh).',
      'Browser pending input events (click, scroll, touch) dispatch karta.',
      'requestAnimationFrame callbacks chalte — yahan animation state update karo.',
      'Style recalc: badle hue elements ke computed styles.',
      'Layout: geometry recompute (agar layout-affecting changes).',
      'Paint: display lists generate (agar paint-affecting changes).',
      'Composite: compositor layers merge karke GPU ko bhejta.',
      'Agar budget bacha: requestIdleCallback chalta idle work ke liye.',
    ],
    internals: {
      p: '🧠 **Deep**: Main thread ek single thread hai jisme JS execution, parsing, style, layout, paint scheduling sab compete karte. Blink Scheduler isi thread ko multiple **task queues** (input, compositor, default, idle, etc.) mein organize karta aur har point par sabse high-priority queue se task uthata. Critical insight: **rendering ek task ki tarah schedule hota** — agar aapka JS task chal raha hai, rendering (rAF, style, layout, paint) tab tak nahi hoga jab tak JS yield na kare. Isliye ek 200ms synchronous loop poore 12 frames drop kar dega. Long Tasks API (PerformanceObserver) >50ms tasks report karta. Modern web mein **scheduler.postTask()** explicit priorities deta aur **scheduler.yield()** se aap long task ke beech main thread ko "saans" de sakte (continuation high-priority par resume). rAF callbacks frame ke "BeginMainFrame" phase mein, style/layout se pehle chalte — isliye DOM reads/writes vahan batch karna best.',
      code: `// Long task ko chunk karke yield karo\nasync function processAll(items) {\n  for (let i = 0; i < items.length; i++) {\n    doWork(items[i])\n    if (i % 50 === 0) await yieldToMain()\n  }\n}\nfunction yieldToMain() {\n  return new Promise(r => setTimeout(r, 0))\n}`,
      lang: 'js',
    },
    process: {
      type: 'boxes',
      items: [
        { label: 'Input', sub: 'Click/scroll/touch', color: '#EF4444' },
        { label: 'rAF', sub: 'Animation update', color: '#9333EA' },
        { label: 'Style', sub: 'Recalc', color: '#8B5CF6' },
        { label: 'Layout', sub: 'Geometry', color: '#06B6D4' },
        { label: 'Paint', sub: 'Display list', color: '#22C55E' },
        { label: 'Composite', sub: 'GPU', color: '#F97316' },
      ],
    },
    visual: {
      type: 'timeline',
      items: [
        { year: '0ms', text: 'VSync — frame shuru, budget ~16.6ms.' },
        { year: '~2ms', text: 'Pending input events dispatch.' },
        { year: '~4ms', text: 'requestAnimationFrame callbacks run.' },
        { year: '~8ms', text: 'Style + Layout recalc.' },
        { year: '~12ms', text: 'Paint + Composite — frame GPU ko.' },
        { year: '16.6ms', text: 'Frame done; idle time -> requestIdleCallback.' },
      ],
    },
    memory:
      'Yaad: **"I-RAF-SLPC"** — Input, rAF, Style, Layout, Paint, Composite. Budget = 16.6ms. >50ms = long task = jank.',
    browser:
      'rAF aur rIC dono Chromium, Firefox, Safari mein hain (rIC Safari mein late aaya). Scheduler.postTask/yield abhi Chromium-leading. Frame budget display refresh par depend (120Hz = ~8.3ms).',
    notes: {
      concept: 'Frame = Input -> rAF -> Style -> Layout -> Paint -> Composite, har ~16.6ms.',
      tip: 'rAF ke andar DOM reads pehle, writes baad mein batch karo — layout thrash avoid.',
      warning: 'Long task (>50ms) frames block karta, INP/responsiveness kharab.',
      error: 'setTimeout ko animation ke liye use karna — refresh se out of sync, janky.',
    },
    compare: {
      headers: ['API', 'Kab chalta', 'Use'],
      rows: [
        ['requestAnimationFrame', 'Paint se theek pehle, har frame', 'Visual animation'],
        ['requestIdleCallback', 'Frame ke baad, idle time', 'Low-priority work'],
        ['setTimeout(fn,0)', 'Macrotask, refresh se unrelated', 'Defer/yield'],
        ['scheduler.postTask', 'Priority-based queue', 'Explicit prioritization'],
      ],
    },
    mistakes: [
      { bad: 'setInterval(16) se animate karna.', fix: 'requestAnimationFrame use karo — refresh-synced.' },
      { bad: 'rAF ke andar bhaari layout-trigger reads+writes mix.', fix: 'Reads batch, fir writes; transform/opacity prefer.' },
      { bad: 'Pura data ek synchronous loop mein process.', fix: 'Chunks + yieldToMain()/scheduler.yield().' },
    ],
    best: [
      'Animations sirf rAF + transform/opacity se.',
      'Long tasks ko 50ms se chote rakho; yield karo.',
      'Non-urgent kaam requestIdleCallback ya postTask("background") mein.',
      'Heavy compute Web Worker mein offload karo.',
      'Long Tasks API se monitor karo (PerformanceObserver).',
      'INP optimize: input handlers light rakho.',
    ],
    performance:
      '⚡ Frame budget 16.6ms — par realistically aapko ~10ms hi milta JS ke liye (style/layout/paint bhi share karte). 120Hz par sirf ~8.3ms. Long tasks INP ke sabse bade dushman. Yield karna, code split, worker offload — yahi smoothness ke tools.',
    tricky: [
      { title: 'rAF kab chalega?', code: `console.log('A')\nrequestAnimationFrame(() => console.log('rAF'))\nPromise.resolve().then(() => console.log('micro'))\nconsole.log('B')`, output: `A\nB\nmicro\nrAF`, explain: 'Sync (A,B) pehle, fir microtask (Promise), fir rAF (next frame se pehle, macro-ish). rAF microtasks ke baad agle render phase mein.', lang: 'js' },
      { title: 'Long task drops frames', code: `// Button click handler\nbtn.onclick = () => {\n  const end = performance.now() + 200\n  while (performance.now() < end) {} // 200ms block\n}`, output: `~12 frames dropped, page frozen`, explain: '200ms synchronous loop main thread block karta — koi rAF/paint/input 200ms tak nahi. INP terrible. Chunk + yield karo.', lang: 'js' },
    ],
    interview: {
      beginner: [
        { q: 'Frame budget kya hai?', a: '60fps ke liye har frame ~16.6ms (1000/60) mein banana hota. Is budget mein input+JS+style+layout+paint+composite fit hona chahiye.' },
        { q: 'requestAnimationFrame kya karta?', a: 'Browser ko bolta agle paint se pehle callback chalao — animations ke liye, refresh-synced, background tab mein paused.' },
      ],
      intermediate: [
        { q: 'rAF vs setTimeout animation ke liye?', a: 'rAF display refresh se synced aur paint se pehle chalta — smooth. setTimeout refresh se unrelated, timing drift, frame miss possible.' },
        { q: 'requestIdleCallback kab use karein?', a: 'Non-urgent background kaam (analytics, prefetch, cleanup) jab frame ke baad time bache. timeRemaining() check karke chunk mein chalao.' },
      ],
      advanced: [
        { q: 'Long task kya hai aur kaise fix?', a: 'JS task >50ms jo main thread block karta, input/animation late karta (jank, kharab INP). Fix: kaam chote chunks mein todo + yield, Web Worker offload, scheduler.yield/postTask.' },
        { q: 'Frame mein rAF aur microtask ka order?', a: 'Sync code -> microtasks drain -> (next frame) rAF callbacks -> style/layout/paint. Har task ke baad microtask queue drain hota; rAF render phase ka hissa.' },
      ],
    },
    mcqs: [
      { q: '60fps frame budget kitna?', options: ['33ms', '16.6ms', '8ms', '100ms'], answer: 1, explain: '1000/60 ≈ 16.6ms.' },
      { q: 'Long task kitne ms se?', options: ['>10ms', '>50ms', '>100ms', '>200ms'], answer: 1, explain: '>50ms = long task.' },
      { q: 'Animation ke liye best API?', options: ['setInterval', 'requestAnimationFrame', 'setTimeout', 'requestIdleCallback'], answer: 1, explain: 'rAF refresh-synced.' },
    ],
    exercises: {
      easy: ['requestAnimationFrame se ek box ko transform se left-to-right move karo.'],
      medium: ['10000 items ka loop chunk karke yieldToMain() se process karo, page responsive rakho.'],
      advanced: ['PerformanceObserver se "longtask" entries observe karke console mein report karo.'],
    },
    summary: [
      'Frame budget = 16.6ms (60fps).',
      'Frame: Input -> rAF -> Style -> Layout -> Paint -> Composite.',
      'rAF = animations; rIC = idle low-priority work.',
      'Long task (>50ms) = jank; chunk + yield karo.',
      'Scheduler tasks ko priority deta responsiveness ke liye.',
    ],
    cheatsheet: [
      { h: 'Frame APIs', code: `requestAnimationFrame(cb)  // paint se pehle\nrequestIdleCallback(cb)    // idle time\nscheduler.postTask(cb,{priority})` },
      { h: 'Yield', code: `await new Promise(r => setTimeout(r,0))\n// ya: await scheduler.yield()` },
    ],
    projects: [
      'Ek custom smooth scroll/parallax sirf rAF + transform se.',
      'Ek heavy data import ko chunk + yield se non-blocking banao.',
      'Long Tasks dashboard banao jo runtime jank measure kare.',
    ],
    advanced:
      '🚀 Aur gehrai: scheduler.postTask() priorities (user-blocking/user-visible/background); scheduler.yield() with continuation priority; isInputPending(); INP optimization (event handler ko rAF/post-task mein defer); content-visibility se off-screen rendering skip; BeginMainFrame internals aur compositor-driven scroll jo main thread se independent.',
    quiz: [
      { q: 'rIC ka kaam?', options: ['Animation', 'Idle low-priority work', 'Layout', 'Input'], answer: 1, explain: 'Idle time mein non-urgent work.' },
      { q: '120Hz par frame budget?', options: ['16.6ms', '8.3ms', '33ms', '4ms'], answer: 1, explain: '1000/120 ≈ 8.3ms.' },
    ],
    related: ['event-loop', 'rendering-performance', 'compositor-raster', 'web-vitals'],
  },

  'compositor-raster': {
    overview:
      '**Compositor thread** aur **Raster thread(s)** browser ko smooth scroll/animation dene ka raaz hain. Page ko **layers** mein bata jata, har layer **tiles** mein, fir tiles **raster** (bitmap mein convert) hote — yeh kaam raster threads + **GPU process** par hota, main thread se ALAG. Isliye agar sirf **transform/opacity** badle, compositor thread khud naya frame bana leta — "compositor-only" properties cheap hain. Compositor GPU ko **draw quads** bhejta. 🎨',
    why:
      '"transform/opacity cheap kyun, scroll smooth kaise jab JS busy ho, layer promotion kya" — senior performance interviews ka favourite. Yeh samajhne se aap jank-free UI bana sakte ho.',
    concept: [
      { h: 'Compositor thread', p: 'Main thread se alag thread jo layers ko compose (assemble) karta. Scroll aur transform/opacity animations ise handle karne se main thread (JS, layout) busy hone par bhi smooth chalte.' },
      { h: 'Layers', p: 'Page ke kuch hisse alag "compositing layers" ban jaate (e.g. will-change, transform, video, canvas). Har layer independently transform/composite ho sakta bina dusron ko re-paint kiye.', code: `.card { will-change: transform; }\n/* promote to its own layer */` },
      { h: 'Tiles', p: 'Bade layers ko chote **tiles** (e.g. 256x256) mein bata jata. Sirf visible (aur aas-paas) tiles raster hote — memory bachti aur scroll ke liye aage ke tiles pehle se ready.' },
      { h: 'Raster threads', p: 'Tiles ko actual pixels (bitmap) mein convert karna = rasterization. Yeh dedicated raster threads / GPU par hota — paint ops (display list) ko execute karke texture banate.' },
      { h: 'GPU process & draw quads', p: 'Compositor har layer ke liye **draw quads** (kahan, kaunsi texture, kaunsa transform) banata aur GPU process ko bhejta. GPU inhe compose karke final frame screen par draw karta.', code: `// Conceptual draw quad\n{ texture: tileTextureId, transform: matrix, rect: {...} }` },
      { h: 'Compositor-only properties', p: 'transform aur opacity ko compositor sirf layer ka transform/alpha badal kar apply kar sakta — re-style/layout/paint kuch nahi. Isliye yeh sabse cheap animations hain.' },
    ],
    analogy:
      'Socho ek **stage drama** 🎭. Main thread = director jo script likhta, sets banwata (layout/paint) — slow, ek baar. Layers = alag-alag movable **backdrops/props** painted on transparent sheets. Compositor thread = stagehand jo sheets ko slide/fade karta (transform/opacity) bina dobara paint kiye — instant. Tiles = bade backdrop ko chote panels mein todna taaki sirf visible panel paint ho. GPU = projector jo sab sheets ko final scene mein merge kar deta. Director (main thread) busy script likhne mein ho, stagehand (compositor) phir bhi backdrops smoothly slide karta rehta.',
    syntax: {
      code: `/* Layer promote karne ke tarike */\n.el { will-change: transform; }       /* explicit hint */\n.el { transform: translateZ(0); }     /* old hack */\n\n/* Cheap (compositor-only): */\n.el { transform: scale(1.1); opacity: .5; }\n\n/* Costly (main thread): */\n.el { width: 200px; top: 50px; }`,
      note: 'will-change overuse = bahut zyada layers = zyada GPU memory. Soch-samajh kar promote karo.',
    },
    steps: [
      'Main thread paint karke immutable display lists banata aur compositor ko commit karta.',
      'Compositor thread layers identify karta (kaunse elements alag layer).',
      'Har layer tiles mein bata jata; priority (visible pehle) set hoti.',
      'Raster threads / GPU tiles ko bitmap textures mein raster karte.',
      'Compositor draw quads banata (texture + transform + position).',
      'Draw quads GPU process ko bheje jaate.',
      'GPU quads ko compose karke final frame screen par draw karta.',
      'Scroll/transform/opacity par compositor naye quads bina main thread ke bhej sakta.',
    ],
    internals: {
      p: '🧠 **Deep**: Compositing ka power "decoupling" mein hai. Jab main thread paint complete karke commit karta, compositor thread ke paas ek snapshot (display lists + layer/property trees) hota. Ab agar user scroll kare ya ek composited transform/opacity animation chale, compositor thread INHE bina main thread se baat kiye apply kar sakta — wo bas existing tile textures ko naye transform/position par draw karta. Isiliye ek 200ms JS long task ke dauraan bhi scroll smooth reh sakta. Raster do tareeke se — GPU raster (Skia/Ganesh ya Graphite GPU par paint ops chala kar) ya CPU raster (fir texture upload). Tiles ki vajah se **partial raster** possible — sirf badle/naye dikhne wale tiles raster hote. Compositor scroll ko bhi handle karta (compositor-driven scrolling) jab tak koi non-passive JS scroll handler use ko main thread par force na kare — isliye passive event listeners important hain. Layer banane ka khud cost hai: zyada layers = zyada memory + zyada compose work, isliye browser khud bhi layer count manage karta.',
      code: `// Smooth even when main thread busy:\n// Compositor thread loop (conceptual)\nonVSync(() => {\n  if (onlyTransformOrOpacityChanged) {\n    submitQuads(existingTextures, newTransforms) // no main thread\n  }\n})\n// Passive listener -> compositor scroll stays smooth\nel.addEventListener('touchstart', fn, { passive: true })`,
      lang: 'js',
    },
    process: {
      type: 'boxes',
      items: [
        { label: 'Main thread', sub: 'Paint -> display list', color: '#9333EA' },
        { label: 'Commit', sub: 'Lists + layers', color: '#EAB308' },
        { label: 'Compositor thread', sub: 'Layerize + tiles', color: '#06B6D4' },
        { label: 'Raster threads', sub: 'Tiles -> textures', color: '#F97316' },
        { label: 'GPU process', sub: 'Draw quads -> frame', color: '#22C55E' },
      ],
    },
    visual: {
      type: 'timeline',
      items: [
        { year: '1', text: 'Main thread paint karke display lists commit karta.' },
        { year: '2', text: 'Compositor layers + tiles mein bata.' },
        { year: '3', text: 'Raster threads tiles ko textures mein raster karte.' },
        { year: '4', text: 'Compositor draw quads banata.' },
        { year: '5', text: 'GPU quads compose karke frame screen par draw karta.' },
      ],
    },
    memory:
      'Yaad: **"Layer -> Tile -> Raster -> Quad -> Draw"**. transform + opacity = compositor-only = sabse cheap.',
    browser:
      'Compositing concept sab browsers mein (Chromium cc/Viz, Firefox WebRender, WebKit). Skia/Graphite Chromium ka graphics layer. GPU process Chromium mein crash-isolation aur acceleration deta.',
    notes: {
      concept: 'Compositor thread layers ko compose karta, main thread se independent.',
      tip: 'Animate sirf transform/opacity — compositor-only, GPU-accelerated.',
      warning: 'will-change overuse = bahut layers = GPU memory blow-up.',
      error: 'Non-passive scroll/touch listener compositor scroll ko main thread par force karta — jank.',
    },
    compare: {
      headers: ['Property', 'Trigger', 'Cost'],
      rows: [
        ['transform', 'Composite only', 'Sabse cheap (GPU)'],
        ['opacity', 'Composite only', 'Cheap (GPU)'],
        ['color/bg-color', 'Paint + Composite', 'Medium'],
        ['width/height/top', 'Layout + Paint + Composite', 'Mahanga'],
      ],
    },
    mistakes: [
      { bad: 'left/top/margin se slide animate.', fix: 'transform: translate() — compositor-only.' },
      { bad: 'Har element par will-change: transform.', fix: 'Sirf jo actually animate honge; animation ke baad hata do.' },
      { bad: '{ passive: false } scroll handler bina zaroorat.', fix: 'passive: true rakho taaki compositor scroll smooth.' },
    ],
    best: [
      'Animations: sirf transform + opacity.',
      'Layer promotion sirf zaroori elements par (will-change).',
      'Passive event listeners scroll/touch ke liye.',
      'Bade off-screen content content-visibility se skip karo.',
      'DevTools > Layers panel se layer count/memory monitor karo.',
      'Animation khatam hone par will-change remove karo.',
    ],
    performance:
      '⚡ Compositor-only animations 60fps even jab main thread jam ho — kyunki wo alag thread + GPU par chalte. Lekin layers free nahi: har layer GPU memory + compose overhead leta. Goal: minimum layers, sirf transform/opacity animate, passive listeners se compositor scroll rakho.',
    tricky: [
      { title: 'Same animation, different cost', code: `/* A */ @keyframes a { to { left: 300px } }\n/* B */ @keyframes b { to { transform: translateX(300px) } }`, output: `A: layout+paint each frame (jank)\nB: composite only (smooth)`, explain: 'A har frame layout+paint main thread par — janky. B compositor-only — GPU par smooth even under load. Visually same.', lang: 'js' },
      { title: 'Passive listener vs jank', code: `el.addEventListener('wheel', onWheel) // default passive? depends\nel.addEventListener('wheel', onWheel, { passive: true })`, output: `passive:true -> compositor scrolls without waiting JS`, explain: 'Non-passive handler browser ko JS chalने ka wait karna padta (preventDefault ho sakta), scroll main thread par — jank. passive:true compositor ko aage badhne deta.', lang: 'js' },
    ],
    interview: {
      beginner: [
        { q: 'Compositor thread kya karta?', a: 'Main thread se alag thread jo layers ko compose karke frame banata — scroll aur transform/opacity animations isi se smooth rehte.' },
        { q: 'Raster kya hai?', a: 'Paint ops (display list) ko actual pixels/bitmap textures mein convert karna. Raster threads/GPU par hota.' },
      ],
      intermediate: [
        { q: 'transform/opacity cheap kyun?', a: 'Yeh "compositor-only" hain — compositor thread bas layer ka transform matrix/alpha badal kar GPU par naya frame draw karta, re-style/layout/paint nahi. Main thread bypass.' },
        { q: 'Layers + tiles ka fayda?', a: 'Layers independently transform/composite ho sakte. Tiles se sirf visible hisse raster hote (memory bachat) aur scroll ke liye aage ke tiles pre-raster ho sakte.' },
      ],
      advanced: [
        { q: 'Scroll smooth kaise jab JS busy?', a: 'Compositor thread main thread se decoupled. Committed tiles/textures use karke compositor khud scroll/transform apply karta. Bas passive listeners hon — non-passive handler scroll ko main thread par force kar deta.' },
        { q: 'Layer promotion ke trade-offs?', a: 'Fayda: composite-only updates cheap. Nuksaan: har layer GPU memory + compose cost. will-change overuse memory blow-up aur kabhi slower. Sirf actually animating elements promote karo.' },
      ],
    },
    mcqs: [
      { q: 'Kaunsi property compositor-only hai?', options: ['height', 'transform', 'padding', 'top'], answer: 1, explain: 'transform (aur opacity) compositor-only.' },
      { q: 'Tiles ka maqsad?', options: ['Security', 'Layer ko chote raster-able units mein todna', 'JS speed', 'Caching DNS'], answer: 1, explain: 'Sirf visible tiles raster — memory + scroll efficiency.' },
      { q: 'Compositor GPU ko kya bhejta?', options: ['DOM', 'Draw quads', 'CSS rules', 'JS bundle'], answer: 1, explain: 'Draw quads (texture + transform + position).' },
    ],
    exercises: {
      easy: ['will-change: transform laga kar DevTools Layers panel mein naya layer dekho.'],
      medium: ['Ek animation left/top se banao, fir transform se — Performance mein paint flashing compare karo.'],
      advanced: ['Scroll handler ko passive:true vs false karke jank ka difference measure karo.'],
    },
    summary: [
      'Compositor thread main thread se alag — smooth scroll/animation.',
      'Layer -> Tile -> Raster -> Draw quad -> GPU frame.',
      'transform + opacity = compositor-only = cheap.',
      'will-change layer promote karta par memory cost.',
      'Passive listeners se compositor scroll smooth.',
    ],
    cheatsheet: [
      { h: 'Cheap animate', code: `transform: translate/scale/rotate\nopacity: 0..1` },
      { h: 'Promote layer', code: `will-change: transform;\n/* remove after animation */` },
    ],
    projects: [
      'Ek 60fps card carousel sirf transform se (no layout).',
      'Scroll-linked parallax compositor-friendly banao.',
      'GPU memory audit: kitne layers, kitni texture memory (Layers panel).',
    ],
    advanced:
      '🚀 Aur gehrai: Viz/Display Compositor aur surface aggregation (multiple processes ke frames merge); GPU raster vs CPU raster aur Skia Graphite; checkerboarding (tile raster pichhe reh jaane par blank); compositor animations vs Web Animations API "accelerated" check; will-change ke alawa transform-3d/backface hacks; off-thread paint worklets (Houdini).',
    quiz: [
      { q: 'opacity kis thread par apply hota animation mein?', options: ['Main', 'Compositor', 'Network', 'Worker'], answer: 1, explain: 'Compositor-only property.' },
      { q: 'will-change overuse ka nuksaan?', options: ['Faster always', 'Zyada GPU memory/layers', 'Security risk', 'DNS slow'], answer: 1, explain: 'Bahut layers = memory + compose overhead.' },
    ],
    related: ['compositing', 'paint-repaint', 'rendering-performance', 'frame-scheduler'],
  },

  'interview-questions': {
    overview:
      'Yeh **capstone** topic hai — Browser Internals ke sabse important cross-cutting interview questions ek jagah. "URL type karne par kya hota", event loop output ordering, reflow vs repaint, critical rendering path, storage, CORS, V8/JIT, GC, web vitals, HTTP/2 vs HTTP/3 — sab. Ise final revision aur mock-prep ke liye use karo. 🎯',
    why:
      'Product companies (FAANG, startups) browser internals deeply puchti hain — "kya hota jab URL type karte ho" classic hai. Yeh topic saare concepts ko interview-format mein consolidate karta taaki aap confidently answer kar sako.',
    concept: [
      { h: 'Sabse classic: URL type karne par kya hota', p: 'URL parse -> DNS lookup (IP) -> TCP handshake -> TLS handshake (https) -> HTTP request -> server response -> HTML parse (DOM) -> CSS (CSSOM) -> render tree -> layout -> paint -> composite -> JS execute. End-to-end pata hona chahiye.' },
      { h: 'Event loop ordering', p: 'Call stack -> microtasks (Promise, queueMicrotask) FULLY drain -> ek macrotask (setTimeout) -> phir microtasks -> render (rAF). Output ordering questions yahin se.', code: `console.log(1)\nsetTimeout(() => console.log(2))\nPromise.resolve().then(() => console.log(3))\nconsole.log(4)\n// 1 4 3 2` },
      { h: 'Reflow vs Repaint', p: 'Reflow (layout): geometry badalne par (width, top) — mahanga, dependents bhi recompute. Repaint: sirf visual (color, visibility) — sasta, no geometry. Composite (transform/opacity): sabse sasta.' },
      { h: 'Rendering / process model', p: 'Browser multi-process: Browser, Renderer (per site — Site Isolation), GPU, Network, Utility. Renderer ka main thread JS+layout+paint; compositor alag thread.' },
      { h: 'Network: HTTP/2 vs HTTP/3', p: 'HTTP/2: multiplexing over single TCP (head-of-line blocking at TCP). HTTP/3: QUIC over UDP — per-stream, no TCP HOL blocking, faster handshake (0-RTT), connection migration.' },
    ],
    analogy:
      'Yeh topic ek **exam ka guide-book** hai 📔. Baaki topics chapters the; yeh saare chapters ke "most-asked questions" ka curated set. Jaise board exam se pehle aap "important questions" revise karte ho — concept naya nahi, par interview-ready packaging hai. Practice karo jaise real interview ho.',
    syntax: {
      code: `// Classic output question — predict karo:\nconsole.log('start')\nsetTimeout(() => console.log('timeout'))\nPromise.resolve()\n  .then(() => console.log('promise1'))\n  .then(() => console.log('promise2'))\nconsole.log('end')\n// start, end, promise1, promise2, timeout`,
      note: 'Rule: sync -> saare microtasks -> ek macrotask -> microtasks -> repeat. rAF render se pehle.',
    },
    steps: [
      'Pehle fundamentals solid karo (event loop, CRP, network).',
      'Har topic ka 30-second crisp answer ready rakho.',
      '"URL type karne par kya hota" end-to-end bolne ki practice karo.',
      'Output-based (event loop) questions roz solve karo.',
      'Trade-offs samjho (memory vs security, layers vs cost).',
      'Web Vitals (LCP, INP, CLS) numbers + fixes yaad rakho.',
      'Mock interview do — bolkar samjhao, sirf padho mat.',
      'Comparison tables (process vs thread, reflow vs repaint) revise karo.',
    ],
    internals: {
      p: '🧠 **Deep cheat-sheet of mechanisms**: (1) **Event loop**: ek macrotask uthao -> run -> microtask queue PURA drain -> render opportunity (rAF, style, layout, paint) -> next macrotask. async/await internally Promise + microtask. (2) **V8 JIT**: Ignition bytecode interpret karta, hot code TurboFan optimize karta (speculative, types ke aadhar par); type change par deopt. (3) **GC**: V8 generational — young (Scavenger, fast, frequent) + old (Mark-Sweep-Compact, slow). Reachability se garbage decide. (4) **CRP**: DOM + CSSOM -> render tree -> layout -> paint; CSS render-blocking, JS parser-blocking (defer/async se bachao). (5) **Compositing**: transform/opacity compositor thread par, layout bypass. In sab mechanisms ko milakar bolना senior signal deta.',
      code: `// async/await = Promise + microtask\nasync function f() {\n  console.log('A')\n  await null          // yield -> microtask\n  console.log('B')    // microtask mein\n}\nconsole.log('start'); f(); console.log('end')\n// start, A, end, B`,
      lang: 'js',
    },
    process: {
      type: 'boxes',
      items: [
        { label: 'Fundamentals', sub: 'Event loop, CRP', color: '#9333EA' },
        { label: 'Network', sub: 'DNS/TCP/TLS/HTTP', color: '#06B6D4' },
        { label: 'Rendering', sub: 'Reflow/paint/composite', color: '#F97316' },
        { label: 'JS engine', sub: 'V8/JIT/GC', color: '#EAB308' },
        { label: 'Security', sub: 'CORS/CSP/isolation', color: '#EF4444' },
        { label: 'Vitals', sub: 'LCP/INP/CLS', color: '#22C55E' },
      ],
    },
    visual: {
      type: 'timeline',
      items: [
        { year: '1', text: 'URL parse + DNS lookup (IP milta).' },
        { year: '2', text: 'TCP + TLS handshake (secure connection).' },
        { year: '3', text: 'HTTP request -> response (HTML).' },
        { year: '4', text: 'Parse: DOM + CSSOM -> render tree.' },
        { year: '5', text: 'Layout -> Paint -> Composite -> screen.' },
      ],
    },
    memory:
      'Capstone mantra: **"Network -> Parse -> Render -> JS -> Optimize"**. Event loop: sync, micro (all), one macro, repeat.',
    browser:
      'Yeh sab Chromium pe sabse documented (RenderingNG, V8, Site Isolation), par concepts Firefox (Gecko/SpiderMonkey) aur Safari (WebKit/JSCore) mein bhi lagu. Interview mein engine-agnostic concepts bolना safe.',
    notes: {
      concept: 'Cross-cutting browser-internals interview consolidation.',
      tip: 'Har answer ko trade-off ke saath bolo — senior signal.',
      warning: '"URL type karne par kya hota" ko ratna mat — flow samjho taaki follow-ups handle ho.',
      error: 'Sirf padhna interview crack nahi karta — bolkar (out loud) practice karo.',
    },
    compare: {
      headers: ['Concept', 'A', 'B'],
      rows: [
        ['Process vs Thread', 'Process: isolated memory', 'Thread: shared memory in process'],
        ['Reflow vs Repaint', 'Reflow: geometry (mahanga)', 'Repaint: visual only (sasta)'],
        ['microtask vs macrotask', 'Promise — drain fully first', 'setTimeout — one per loop'],
        ['HTTP/2 vs HTTP/3', 'TCP, TCP HOL blocking', 'QUIC/UDP, no TCP HOL'],
        ['localStorage vs sessionStorage', 'Persistent, ~5-10MB, sync', 'Tab-scoped, cleared on close'],
      ],
    },
    mistakes: [
      { bad: 'Event loop mein microtask vs macrotask order ulta batana.', fix: 'Saare microtasks drain -> fir ek macrotask.' },
      { bad: 'Reflow aur repaint ko same samajhna.', fix: 'Reflow = layout (geometry); repaint = paint (visual).' },
      { bad: 'async/await ko "synchronous wait" samajhna.', fix: 'await yield karta -> continuation microtask mein.' },
      { bad: 'CORS ko client-side security samajhna.', fix: 'CORS browser-enforced relaxation; server headers se control.' },
    ],
    best: [
      'Har core topic ka crisp + deep dono version ready rakho.',
      'Output-based event loop questions roz practice.',
      'Trade-offs aur "kab kya use" articulate karo.',
      'Web Vitals targets yaad: LCP<2.5s, INP<200ms, CLS<0.1.',
      'Bolkar mock practice — explanation clarity matters.',
      'Follow-up "kyun" ke liye ready raho.',
    ],
    performance:
      '⚡ Performance questions ka core: kaam main thread se hatao (Web Worker, compositor), long tasks chunk karo, CRP optimize (defer/async JS, critical CSS), transform/opacity animate, images lazy-load + sized (CLS). Numbers ke saath bolना impactful.',
    tricky: [
      { title: 'Event loop classic', code: `console.log(1)\nsetTimeout(() => console.log(2), 0)\nPromise.resolve().then(() => console.log(3))\nconsole.log(4)`, output: `1\n4\n3\n2`, explain: 'Sync (1,4) -> microtask (3) -> macrotask (2). Microtasks macrotask se pehle.', lang: 'js' },
      { title: 'async/await ordering', code: `async function a() {\n  console.log('a1')\n  await b()\n  console.log('a2')\n}\nasync function b() { console.log('b1') }\nconsole.log('start')\na()\nconsole.log('end')`, output: `start\na1\nb1\nend\na2`, explain: 'b() sync chalti b1 tak; await ke baad ka (a2) microtask mein, isliye end ke baad.', lang: 'js' },
      { title: 'Loop with var vs let', code: `for (var i = 0; i < 3; i++) setTimeout(() => console.log(i))\nfor (let j = 0; j < 3; j++) setTimeout(() => console.log(j))`, output: `3 3 3\n0 1 2`, explain: 'var function-scoped (shared i, final 3). let block-scoped (har iteration naya j). Closure classic.', lang: 'js' },
      { title: 'Reflow trigger', code: `el.style.width = '100px'   // reflow\nel.style.color = 'red'     // repaint only\nel.style.transform = 'translateX(10px)' // composite only`, output: `width: layout\ncolor: paint\ntransform: composite`, explain: 'Width geometry badalta (reflow); color sirf visual (repaint); transform compositor-only (cheapest).', lang: 'js' },
    ],
    interview: {
      beginner: [
        { q: 'URL type karne par kya hota (high level)?', a: 'URL parse -> DNS se IP -> TCP+TLS connection -> HTTP request -> response (HTML) -> browser DOM/CSSOM banata -> render tree -> layout -> paint -> composite -> JS chalta -> interactive page.' },
        { q: 'DOM aur CSSOM kya hain?', a: 'DOM = HTML ka tree representation. CSSOM = CSS rules ka tree. Dono milke render tree (sirf visible elements) banate jise layout/paint kiya jata.' },
        { q: 'localStorage vs sessionStorage vs cookies?', a: 'localStorage: persistent ~5-10MB, sync, JS-only. sessionStorage: tab-scoped, close par clear. cookies: chhote (~4KB), har request ke saath jaate, server-readable, expiry/HttpOnly/SameSite.' },
        { q: 'Reflow aur repaint mein farak?', a: 'Reflow (layout): geometry change (width, position) — mahanga, dependent elements bhi recompute. Repaint: sirf visual (color, visibility) — sasta. Transform/opacity = composite, sabse sasta.' },
      ],
      intermediate: [
        { q: 'Event loop kaise kaam karta?', a: 'Call stack khali hone par event loop ek macrotask uthata, run karta, fir microtask queue PURA drain karta, fir render (rAF/paint) ka mauka, fir agla macrotask. async/await microtask par chalta.' },
        { q: 'microtask vs macrotask?', a: 'Microtask (Promise.then, queueMicrotask, await continuation) — current task ke turant baad, queue fully drain. Macrotask (setTimeout, events, message) — ek per loop iteration. Micro pehle.' },
        { q: 'Critical Rendering Path optimize kaise?', a: 'CSS minimize/inline critical, JS defer/async (parser block avoid), kam render-blocking resources, important content jaldi, font-display swap. Goal: first paint jaldi.' },
        { q: 'CORS kya hai aur kaise kaam karta?', a: 'Same-Origin Policy cross-origin requests block karta; CORS server ko Access-Control-Allow-Origin jaise headers se selectively allow karne deta. Browser preflight (OPTIONS) bhejta complex requests ke liye. Browser-enforced.' },
        { q: 'Web Vitals?', a: 'LCP (largest content paint <2.5s) loading, INP (interaction to next paint <200ms) responsiveness, CLS (layout shift <0.1) visual stability. Core UX metrics.' },
      ],
      advanced: [
        { q: 'V8 JS ko fast kaise chalata?', a: 'Ignition source ko bytecode mein, interpret karta. Hot code TurboFan optimize karta (speculative, observed types se machine code). Type assumptions tootne par deoptimize. Hidden classes + inline caches property access fast karte.' },
        { q: 'V8 garbage collection?', a: 'Generational: young generation (Scavenger — fast, frequent, copying) aur old generation (Mark-Sweep-Compact — slow). Reachability se garbage decide; incremental/concurrent steps se main thread pause kam.' },
        { q: 'HTTP/2 vs HTTP/3?', a: 'HTTP/2: ek TCP connection par multiplexed streams, par TCP-level head-of-line blocking. HTTP/3: QUIC over UDP — independent streams (no TCP HOL), faster/0-RTT handshake, connection migration (IP badalne par survive).' },
        { q: 'Scroll smooth kaise rehta jab main thread busy?', a: 'Compositor thread main thread se decoupled; committed layers/tiles use karke scroll aur transform/opacity khud handle karta. Passive event listeners zaroori taaki handler scroll ko main thread par na khींche.' },
        { q: 'Site Isolation kya hai aur kyun?', a: 'Har site alag renderer process mein (cross-site iframe = OOPIF). Spectre/side-channel aur cross-site data theft se bachav. Cost: memory; benefit: strong security boundary.' },
      ],
    },
    mcqs: [
      { q: 'console.log(1);setTimeout(()=>log(2));Promise.resolve().then(()=>log(3));log(4) — output?', options: ['1 2 3 4', '1 4 3 2', '1 4 2 3', '1 3 4 2'], answer: 1, explain: 'Sync(1,4) -> micro(3) -> macro(2).' },
      { q: 'Kaunsa reflow trigger karta?', options: ['color', 'visibility', 'width', 'opacity'], answer: 2, explain: 'width geometry badalta -> reflow.' },
      { q: 'HTTP/3 kis par based?', options: ['TCP', 'QUIC/UDP', 'WebSocket', 'gRPC'], answer: 1, explain: 'QUIC over UDP.' },
      { q: 'Microtask example?', options: ['setTimeout', 'Promise.then', 'setInterval', 'requestAnimationFrame'], answer: 1, explain: 'Promise.then microtask hai.' },
      { q: 'INP kya measure karta?', options: ['Loading', 'Responsiveness', 'Stability', 'Network'], answer: 1, explain: 'Interaction to Next Paint = responsiveness.' },
    ],
    exercises: {
      easy: ['"URL type karne par kya hota" ko 60 second mein bolkar samjhao.'],
      medium: ['5 event-loop output questions khud likho aur solve karo.'],
      advanced: ['Ek mock 30-min interview do (dost ke saath) sirf browser internals par.'],
    },
    summary: [
      'Capstone: cross-cutting browser internals interview prep.',
      'Master: URL flow, event loop, reflow vs repaint, CRP.',
      'Network: DNS/TCP/TLS, HTTP/2 vs HTTP/3.',
      'Engine: V8 JIT + generational GC.',
      'Security: CORS, CSP, Site Isolation. Vitals: LCP/INP/CLS.',
      'Bolkar practice karo, trade-offs ke saath.',
    ],
    cheatsheet: [
      { h: 'Event loop', code: `sync -> micro(all) -> 1 macro -> micro -> render` },
      { h: 'Cost order', code: `composite < repaint < reflow` },
      { h: 'Vitals', code: `LCP<2.5s  INP<200ms  CLS<0.1` },
    ],
    projects: [
      'Real company Q: "Type karne se page dikhne tak ka pura journey samjhao."',
      'Real company Q: "Yeh code ka output kya, kyun (event loop)?"',
      'Real company Q: "Ek slow page ko kaise debug + optimize karoge?"',
      'Real company Q: "Animation janky hai — kaise smooth karoge?"',
      'Real company Q: "CORS error aa raha — diagnose karo."',
    ],
    advanced:
      '🚀 Senior-level depth: speculation rules / prerendering, back-forward cache (bfcache), Early Hints (103), priority hints (fetchpriority), Server Timing, partitioned storage (CHIPS), Spectre mitigations, scheduler.yield for INP, RenderingNG pipeline detail, QUIC connection migration. In advanced cheezon ka zikr senior signal deta.',
    quiz: [
      { q: 'async/await internally kis par based?', options: ['Threads', 'Promises + microtasks', 'setTimeout', 'Workers'], answer: 1, explain: 'Promise + microtask continuation.' },
      { q: 'Cheapest visual update?', options: ['width', 'transform', 'top', 'margin'], answer: 1, explain: 'transform = composite only.' },
      { q: 'Site Isolation primary benefit?', options: ['Speed', 'Cross-site/Spectre defense', 'Less memory', 'Better CSS'], answer: 1, explain: 'Security boundary against cross-site/Spectre.' },
    ],
    related: ['event-loop', 'critical-rendering-path', 'navigation-flow', 'web-vitals'],
  },
}
