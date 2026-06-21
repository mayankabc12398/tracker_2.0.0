// Browser Internals Course — Part 2: The Rendering Pipeline (CRP) topics.
// Pure data ES module. No JSX, no imports. One exported object literal.
export const browserContentB = {
  // ─────────────────────────────────────────────────────────────────────────
  "critical-rendering-path": {
    overview:
      "**Critical Rendering Path (CRP)** woh poora sequence of steps hai jo browser follow karta hai HTML, CSS aur JS ko leke screen par actual **pixels** dikhane tak. Jab bhi koi page load hota hai, browser ko bytes → characters → tokens → nodes → tree banana padta hai, phir **DOM + CSSOM → Render Tree → Layout → Paint → Composite**. 🎯 Yeh hi woh 'critical' path hai jise jitna chhota aur fast karoge, page utna jaldi dikhega. Web performance ke har interview ka **dil** yahin hai.",
    why:
      "CRP samajhna isliye zaroori hai kyunki **First Paint, First Contentful Paint (FCP) aur Largest Contentful Paint (LCP)** sab issi pipeline pe depend karte hain. Agar tumhe nahi pata ki **CSS render-blocking** hai aur **synchronous JS parser ko rok deta hai**, to tum kabhi nahi samjha paoge ki page blank kyun dikh raha hai. Product companies (Google, Flipkart, Amazon) seedha poochti hain: 'page kaise render hota hai start se end tak?' — yeh wahi answer hai. ⚡ Fast CRP = better UX = better conversions = paisa. 💰",
    concept: [
      {
        h: "CRP ka matlab — bytes se pixels tak",
        p: "Browser ko network se sirf **bytes** milte hain. Usse pehle characters mein decode karta hai (encoding ke hisaab se), phir **tokenize** karta hai, phir **nodes** banata hai, phir **trees**. DOM aur CSSOM dono trees milke **Render Tree** banate hain, jisme sirf visible content hota hai. Yeh poora flow hi CRP hai.",
      },
      {
        h: "Render-blocking resources (CSS)",
        p: "**CSS by default render-blocking hai.** Jab tak browser saari CSS download + parse karke CSSOM nahi bana leta, woh Render Tree nahi banata, isliye kuch bhi paint nahi hota. Isliye CSS ko `<head>` mein jaldi rakho aur critical CSS ko inline karo. `media` attribute (jaise `media=\"print\"`) se non-critical CSS ko non-blocking bana sakte ho.",
        code: "<!-- print CSS render-blocking nahi hai -->\n<link rel=\"stylesheet\" href=\"print.css\" media=\"print\" />\n<!-- responsive CSS ko bhi conditionally non-blocking -->\n<link rel=\"stylesheet\" href=\"big.css\" media=\"(min-width: 900px)\" />",
        lang: "html",
      },
      {
        h: "Parser-blocking resources (JS)",
        p: "Default `<script>` **parser-blocking** hai: jab parser script tag pe pahunchta hai, woh DOM banana rok deta hai, script download + execute hota hai, phir parsing resume hoti hai. Aur kyunki JS, CSSOM ko query kar sakta hai, browser script ko **tab tak rokta hai jab tak pehle wali CSS load na ho** — isliye CSS bhi indirectly JS execution ko block karti hai!",
        code: "<script src=\"app.js\"></script>            <!-- blocking -->\n<script src=\"app.js\" defer></script>       <!-- DOM ready ke baad, order mein -->\n<script src=\"analytics.js\" async></script> <!-- download hote hi, kabhi bhi -->",
        lang: "html",
      },
      {
        h: "CRP optimize karne ke 3 levers",
        p: "Interview mein yeh teen yaad rakho: **(1) Critical resources ki sankhya kam karo** (bundling, code splitting), **(2) critical bytes kam karo** (minify, compress, tree-shake), **(3) critical path length kam karo** (defer/async JS, preload key assets, inline critical CSS). Inhi teeno se LCP/FCP tezz hoti hai.",
      },
      {
        h: "CRP ek baar nahi — baar baar chalta hai",
        p: "Initial load ke baad bhi, har DOM/CSS change pe pipeline ka kuch hissa dobara chalta hai: style change → **Recalc Style → Layout → Paint → Composite**. Iseliye runtime performance bhi CRP ka hissa hai (layout thrashing, repaint, compositing). Yeh sabse common galatfehmi hai ki CRP sirf load-time cheez hai.",
      },
    ],
    analogy:
      "Socho tum ek **restaurant** chala rahe ho. 🍽️ HTML = ingredients ki list (DOM), CSS = recipe aur plating instructions (CSSOM). Render Tree = woh final dish jo customer actually khayega (jo ingredients waste/hidden hain woh plate pe nahi aate). Layout = plate par har cheez ki exact jagah aur size decide karna. Paint = colour, garnish, sauce lagana. Composite = alag alag plates ko tray pe arrange karke ek saath serve karna. Agar koi ek step slow hua (jaise recipe na mile = CSS na aaye), poora order ruk jaata hai — yahi render-blocking hai!",
    syntax: {
      code: "// CRP ko measure karne ke liye PerformanceObserver\nconst po = new PerformanceObserver((list) => {\n  for (const entry of list.getEntries()) {\n    console.log(entry.name, entry.startTime.toFixed(1) + \"ms\");\n  }\n});\npo.observe({ type: \"paint\", buffered: true });        // first-paint, FCP\npo.observe({ type: \"largest-contentful-paint\", buffered: true }); // LCP",
      note: "paint entries first-paint aur first-contentful-paint dono देती hain; LCP alag entry-type hai.",
      lang: "js",
    },
    steps: [
      "Browser HTML bytes receive karta hai aur encoding ke hisaab se **characters** mein decode karta hai.",
      "HTML parser characters ko **tokens** mein todta hai (tokenization), phir tokens se **nodes** banata hai.",
      "Nodes ko jodkar **DOM tree** banti hai (parent-child relationships ke saath).",
      "Saath hi CSS bytes se **CSSOM tree** banti hai — yeh render-blocking step hai.",
      "DOM + CSSOM milke **Render Tree** banate hain (sirf visible nodes + computed styles).",
      "**Layout (reflow)** har node ki exact x/y position aur width/height compute karta hai.",
      "**Paint** har node ko paint records (draw commands) mein convert karta hai, possibly multiple layers mein.",
      "**Compositing** layers ko GPU pe combine karke final pixels screen par draw karta hai. 🖼️",
    ],
    internals: {
      p: "Blink mein yeh pipeline document lifecycle ke through chalti hai jise **document lifecycle phases** kehte hain. Important baat: yeh **interleaved** hai. Preload scanner (ek speculative, lookahead parser) main parser ke aage daudta hai aur `<img>`, `<link>`, `<script src>` jaise resources ko jaldi se fetch kar deta hai — chahe main parser script pe block ho. Iseliye blocking script ke baad bhi neeche ke images load hote rehte hain. Aur layout + paint + composite ko browser frame budget (~16.6ms @60fps) ke andar fit karne ki koshish karta hai via the **frame scheduler**.",
      code: "// Document lifecycle (Blink) — simplified mental model\n// Parse HTML        -> DOM\n// Parse CSS         -> CSSOM\n// Style (Recalc)    -> computed styles per node\n// Layout            -> geometry (LayoutObject tree)\n// Pre-paint / Paint -> paint records / display lists\n// Composite         -> layer tree -> GPU -> pixels\n// Har frame pe sirf 'dirty' phases dobara chalte hain.",
      lang: "js",
    },
    process: {
      type: "boxes",
      items: [
        { label: "HTML", sub: "bytes → DOM", color: "#EF4444" },
        { label: "CSS", sub: "bytes → CSSOM", color: "#F97316" },
        { label: "Render Tree", sub: "DOM + CSSOM", color: "#8B5CF6" },
        { label: "Layout", sub: "geometry", color: "#06B6D4" },
        { label: "Paint", sub: "draw records", color: "#3B82F6" },
        { label: "Composite", sub: "GPU → pixels", color: "#22C55E" },
      ],
    },
    visual: {
      type: "timeline",
      items: [
        { year: "1", text: "Network: HTML bytes aate hain, encoding decode hoti hai." },
        { year: "2", text: "Parse: tokenizer → DOM tree banti jaati hai." },
        { year: "3", text: "CSSOM: CSS parse hoti hai (render-blocking)." },
        { year: "4", text: "Render Tree: visible nodes + computed styles merge." },
        { year: "5", text: "Layout: positions aur sizes calculate." },
        { year: "6", text: "Paint + Composite: pixels screen par — First Paint! 🎉" },
      ],
    },
    memory:
      "DOM aur CSSOM dono **tree data structures** hain jo memory mein rehte hain (C++ objects in Blink, JS se accessible via wrappers). Bada DOM (10k+ nodes) zyada memory leta hai aur har style recalc / layout ko mehnga banata hai. Render Tree memory mein DOM se chhoti hoti hai kyunki `display:none` wale nodes usme aate hi nahi. Detached DOM nodes jinpe JS reference bacha rehta hai = **memory leak**.",
    browser:
      "Chrome DevTools → **Performance** tab record karo, to tumhe yeh saari phases nazar aati hain: Parse HTML (neela), Recalculate Style (purple), Layout (purple), Paint (green), Composite Layers (green). **Coverage** tab batata hai kitni CSS/JS actually use hui — unused critical CSS hatao. **Lighthouse** seedha CRP-based metrics (FCP, LCP, TBT) deta hai.",
    notes: {
      concept: "CRP = bytes → DOM/CSSOM → Render Tree → Layout → Paint → Composite. Yeh sequence ratt lo. 📝",
      tip: "Critical CSS ko `<head>` mein **inline** karo aur baaki CSS ko async load karo — pehla paint dramatically tez ho jaata hai.",
      warning: "CSS sirf render-blocking nahi, woh apne se pehle aane wali JS ko bhi indirectly block karti hai (kyunki JS CSSOM padh sakta hai).",
      error: "Bade JS bundles ko `<head>` mein bina defer/async ke daalna — poora DOM construction ruk jaata hai aur page blank dikhta hai.",
    },
    compare: {
      headers: ["Property", "Render-blocking?", "Parser-blocking?", "Tip"],
      rows: [
        ["External CSS (default)", "Haan", "Nahi (par JS ko rokti hai)", "head mein jaldi, critical inline karo"],
        ["CSS with media=print", "Nahi", "Nahi", "Non-critical CSS ke liye use karo"],
        ["<script> (default)", "Nahi", "Haan", "body ke end mein daalo ya defer"],
        ["<script defer>", "Nahi", "Nahi", "DOM ready ke baad, order maintain"],
        ["<script async>", "Nahi", "Nahi (download tak)", "independent scripts (analytics)"],
      ],
    },
    mistakes: [
      { bad: "Saari CSS ek hi bade blocking file mein daalna.", fix: "Critical CSS inline karo, baaki ko async/lazy load karo (media trick ya rel=preload + onload)." },
      { bad: "Render-blocking JS ko document ke top par rakhna.", fix: "defer use karo ya scripts ko body ke end mein le jao." },
      { bad: "CRP ko sirf load-time event samajhna.", fix: "Yaad rakho runtime style/DOM changes bhi pipeline ka hissa dobara chalate hain." },
      { bad: "Sab kuch preload kar dena.", fix: "Sirf truly critical assets preload karo, warna bandwidth contention badh jaata hai." },
    ],
    best: [
      "Critical resources (count) kam karo — bundle aur split smartly.",
      "Critical bytes kam karo — minify, gzip/brotli, image optimize.",
      "Critical path length kam karo — defer/async JS, inline critical CSS.",
      "Key LCP image / font ke liye `rel=preload` use karo.",
      "Fonts ke liye `font-display: swap` se invisible text (FOIT) avoid karo.",
      "Lighthouse + Performance panel se regularly measure karo, andaaze se mat optimize karo.",
    ],
    performance:
      "⚡ CRP optimization seedha **Web Vitals** improve karta hai. FCP tab aata hai jab pehla pixel paint hota hai — isliye render-blocking CSS/JS kam karo. LCP tab aata hai jab sabse bada element (often hero image/heading) paint hota hai — use preload karo. TBT (Total Blocking Time) tab kharaab hota hai jab long JS tasks main thread block karte hain. Golden rule: **main thread ko free rakho, critical bytes chhote rakho.**",
    tricky: [
      {
        title: "CSS bhi JS ko block karti hai — kaise?",
        explain: "Agar `<link rel=stylesheet>` ke baad ek inline `<script>` hai, to browser script ko tab tak execute nahi karega jab tak CSS load + CSSOM build na ho jaye, kyunki script `getComputedStyle()` jaisa kuch padh sakta hai. Iseliye ek slow CSS file poore page ke JS ko delay kar sakti hai.",
        lang: "html",
      },
      {
        title: "Kya bina CSS ke browser paint karega?",
        code: "<head>\n  <link rel=\"stylesheet\" href=\"slow.css\">\n</head>\n<body><h1>Hello</h1></body>",
        explain: "Nahi (mostly). CSS render-blocking hai, isliye jab tak slow.css aakar CSSOM nahi banti, browser Render Tree nahi banata aur 'Hello' bhi paint nahi hota — page blank rehta hai. Yeh classic 'flash of unstyled blank' issue hai.",
        lang: "html",
      },
    ],
    interview: {
      beginner: [
        { q: "Critical Rendering Path kya hai?", a: "Woh sequence of steps jisse browser HTML/CSS/JS ko process karke screen par pixels dikhata hai: DOM → CSSOM → Render Tree → Layout → Paint → Composite." },
        { q: "Kaun se resources render-blocking hote hain?", a: "By default CSS render-blocking hoti hai, aur synchronous (default) `<script>` parser-blocking hota hai." },
      ],
      intermediate: [
        { q: "defer aur async mein kya farak hai?", a: "Dono parser ko block nahi karte. `defer` scripts ko DOM ready ke baad document order mein chalata hai; `async` jaise hi download ho jaye waise hi (kisi bhi order mein) chalata hai. Dependent scripts ke liye defer, independent ke liye async." },
        { q: "CRP optimize karne ke 3 main techniques?", a: "(1) Critical resource count kam karo, (2) critical bytes kam karo (minify/compress), (3) critical path length kam karo (defer/async JS, inline critical CSS, preload)." },
      ],
      advanced: [
        { q: "Preload scanner kya hai aur kyun matter karta hai?", a: "Ek speculative lookahead parser jo main parser ke aage daudkar img/link/script jaise resources ko jaldi fetch kar leta hai, chahe main parser ek blocking script pe ruka ho. Yeh effective CRP length kam karta hai." },
        { q: "Ek slow CSS file JS execution ko kaise delay karti hai?", a: "Kyunki uske baad aane wala script CSSOM query kar sakta hai (getComputedStyle), browser script execution ko CSSOM ready hone tak rokta hai — to slow CSS indirectly JS ko block karti hai." },
      ],
    },
    mcqs: [
      {
        q: "Initial render ke liye kaun sa resource by default render-blocking hai?",
        options: ["async script", "External CSS", "Image", "defer script"],
        answer: 1,
        explain: "External CSS by default render-blocking hai — Render Tree CSSOM ke bina nahi banta.",
      },
      {
        q: "CRP ka sahi order kaun sa hai?",
        options: [
          "Layout → Paint → DOM → CSSOM",
          "DOM/CSSOM → Render Tree → Layout → Paint → Composite",
          "Paint → Layout → Render Tree → DOM",
          "Composite → Paint → Layout → DOM",
        ],
        answer: 1,
        explain: "Pehle DOM aur CSSOM, phir Render Tree, phir Layout, Paint aur sabse aakhir Composite.",
      },
    ],
    exercises: {
      easy: [
        "Ek HTML page banao jisme `<head>` mein ek `<link rel=stylesheet>` ho aur DevTools Performance mein 'Recalculate Style' phase dhoondo.",
        "Ek script ko pehle default, phir defer, phir async banakar console.log timing compare karo.",
      ],
      medium: [
        "Lighthouse chalao aur 'Eliminate render-blocking resources' suggestion ko critical CSS inline karke fix karo.",
        "Ek LCP image pe `rel=preload` lagao aur LCP timing ka difference measure karo.",
      ],
      advanced: [
        "PerformanceObserver se FCP aur LCP capture karke ek chhota RUM (real user monitoring) snippet likho.",
        "Ek page ka 'critical bytes' graph banao: kitni CSS/JS actually first paint ke liye chahiye thi (Coverage tab use karo).",
      ],
    },
    summary: [
      "CRP = bytes → DOM/CSSOM → Render Tree → Layout → Paint → Composite.",
      "CSS render-blocking hai; default script parser-blocking hai.",
      "Optimize: resource count, bytes, aur path length teeno kam karo.",
      "defer/async, critical CSS inline, aur preload key tools hain.",
      "CRP load-time aur runtime dono pe lagta hai (style/DOM changes).",
      "Measure with Lighthouse + Performance panel — FCP/LCP improve karo.",
    ],
    cheatsheet: [
      {
        h: "CRP phases",
        code: "HTML  -> DOM\nCSS   -> CSSOM\nDOM + CSSOM -> Render Tree\nRender Tree -> Layout (geometry)\nLayout -> Paint (records)\nPaint -> Composite (GPU)",
      },
      {
        h: "Blocking cheatsheet",
        code: "CSS            -> render-blocking\n<script>       -> parser-blocking\n<script defer> -> non-blocking, ordered\n<script async> -> non-blocking, unordered\nmedia=print    -> non render-blocking CSS",
      },
    ],
    projects: [
      "E-commerce homepage ki FCP/LCP optimize karna (Flipkart/Amazon style).",
      "News site mein critical CSS inline karke above-the-fold ko instant render karna.",
      "Ek RUM dashboard banana jo real users ki FCP/LCP/CLS track kare.",
      "SSR app mein render-blocking resources ko streaming ke saath minimize karna.",
    ],
    advanced:
      "🚀 Senior level pe CRP ko **frame budget** ke lens se dekho. 60fps matlab har frame ke liye ~16.6ms. Us budget mein input handling, JS, style, layout, paint aur composite sab fit hone chahiye. Blink ka **frame scheduler** (BeginMainFrame) decide karta hai kab style/layout/paint phases run honge. RenderingNG architecture mein paint aur compositing decouple ho gaye hain taaki transform/opacity animations poore compositor thread pe chal sakein — main thread busy hone par bhi smooth. Yahi reason hai ki `transform` se animate karna `top/left` se animate karne se kahin saste hota hai.",
    quiz: [
      {
        q: "Frame budget kitna hota hai 60fps ke liye?",
        options: ["100ms", "~16.6ms", "1s", "500ms"],
        answer: 1,
        explain: "1000ms / 60 ≈ 16.6ms per frame — usi mein saara kaam fit hona chahiye.",
      },
      {
        q: "Sabse achha tareeka first paint tez karne ka?",
        options: [
          "Saari CSS ko bottom mein daalna",
          "Critical CSS inline + non-critical async",
          "Sab kuch async script bana dena",
          "Images ko base64 mein convert karna",
        ],
        answer: 1,
        explain: "Critical CSS inline karne se Render Tree turant ban jaata hai; baaki CSS async load hoti hai.",
      },
    ],
    related: ["html-parsing-dom", "cssom", "render-tree", "layout-reflow", "paint-repaint", "compositing", "rendering-performance"],
  },

  // ─────────────────────────────────────────────────────────────────────────
  "html-parsing-dom": {
    overview:
      "**HTML Parsing** woh process hai jisme browser raw HTML text ko padh kar ek structured **DOM (Document Object Model)** tree banata hai. Yeh do steps mein hota hai: **tokenization** (HTML ko tokens mein todna) aur **tree construction** (tokens se nodes banakar tree jodna). DOM ek live, in-memory tree hai jise JavaScript query aur modify kar sakta hai. 🌳 Yeh CRP ka pehla aur sabse foundational step hai.",
    why:
      "DOM samajhna har frontend developer ke liye foundation hai. Interview mein common questions: 'DOM kaise banta hai?', 'script DOM ko block kyun karta hai?', 'HTMLCollection aur NodeList mein farak?', 'innerHTML XSS-prone kyun hai?'. Bina DOM internals samjhe tum performance (reflow), security (XSS), aur framework behaviour (React reconciliation) kuch bhi deeply nahi samajh paoge. 🧠 Yeh sab DOM par hi tika hai.",
    concept: [
      {
        h: "Tokenization — HTML ko tokens mein todna",
        p: "Tokenizer (ek state machine) raw HTML characters ko padh kar **tokens** banata hai: start tag, end tag, comment, text, doctype. Jaise `<p>Hi</p>` se tokens banenge: `StartTag(p)`, `Character(H,i)`, `EndTag(p)`. HTML spec ek extremely detailed state machine define karta hai jo malformed HTML ko bhi gracefully handle karta hai (error recovery).",
        code: "<!-- input -->\n<p class=\"x\">Hi</p>\n<!-- tokens -->\n<!-- StartTag: p, attrs: {class: x} -->\n<!-- Character: H, i -->\n<!-- EndTag: p -->",
        lang: "html",
      },
      {
        h: "Tree construction — DOM banana",
        p: "Tree construction stage tokens ko leke **nodes** banata hai aur unhe parent-child rishton ke saath jodta hai. Browser ek 'stack of open elements' maintain karta hai. Galat-nested ya missing tags ko spec ke rules se fix karta hai (jaise automatically `<tbody>` insert karna). Result: ek complete **DOM tree** jisme document → html → head/body → … nodes hote hain.",
      },
      {
        h: "Node types — sab kuch node hai",
        p: "DOM mein har cheez ek node hai: **Element node** (`<div>`), **Text node** ('Hello'), **Comment node** (`<!-- -->`), **Document node** (root), **DocumentType** (doctype), **Attribute** (legacy). `nodeType` property batati hai: 1 = element, 3 = text, 8 = comment, 9 = document. Whitespace bhi text nodes banata hai — yeh aksar surprise karta hai!",
        code: "document.body.nodeType;        // 1 (element)\ndocument.body.firstChild.nodeType; // 3 ya whitespace text node\ndocument.nodeType;             // 9 (document)",
        lang: "js",
      },
      {
        h: "Script DOM construction ko block karta hai",
        p: "Jab parser ek default `<script>` pe pahunchta hai, woh DOM banana **rok** deta hai, script ko download (agar src hai) aur execute karta hai, phir parsing resume hoti hai. Reason: script `document.write()` kar sakta hai ya DOM ko modify kar sakta hai. Isiliye `defer`/`async` use karke parsing ko unblock karte hain.",
        code: "<script src=\"a.js\"></script>       <!-- DOM ruk jaati hai -->\n<script src=\"a.js\" defer></script>  <!-- parse continue, DOM ready ke baad run -->\n<script src=\"a.js\" async></script>  <!-- parse continue, download hote hi run -->",
        lang: "html",
      },
      {
        h: "Preload scanner — speculative parsing",
        p: "Jab main parser script pe block hota hai, ek alag lightweight **preload scanner** aage badhkar HTML mein `<img>`, `<link>`, `<script src>` jaise resources ko dhoondh kar pehle se fetch shuru kar deta hai. Yeh perceived load time bahut kam karta hai — isiliye critical resources ko HTML mein declare karna (na ki JS se inject karna) better hota hai.",
      },
    ],
    analogy:
      "Socho HTML ek lego instruction manual hai. 📖 Tokenizer = manual ke har step ko ek-ek karke padhna (token = ek instruction line). Tree construction = actually lego pieces ko jodna ek-ek karke jab tak poora model na ban jaye (DOM tree). Agar instruction mein koi step galat-likha hai (missing closing tag), to ek experienced builder (browser ka error recovery) andaaza laga ke sahi se jod deta hai. Aur jab manual mein likha ho 'pehle is special piece ko paint karke laao' (script) — to builder ruk jaata hai jab tak woh piece taiyaar na ho.",
    syntax: {
      code: "// DOM ko query aur traverse karna\nconst el = document.querySelector(\".card\");   // pehla match\nconst all = document.querySelectorAll(\"li\");   // static NodeList\nconst live = document.getElementsByTagName(\"li\"); // live HTMLCollection\n\nel.children;       // sirf element children (HTMLCollection)\nel.childNodes;     // sab nodes incl. text/comment (NodeList)\nel.nodeType;       // 1 = element, 3 = text, 8 = comment",
      note: "querySelectorAll static NodeList deta hai; getElementsBy* live collections dete hain.",
      lang: "js",
    },
    steps: [
      "Browser HTML bytes ko encoding (UTF-8 etc.) ke hisaab se **characters** mein decode karta hai.",
      "**Tokenizer** characters ko state-machine se **tokens** mein todta hai (start/end tag, text, comment).",
      "**Tree construction** har token se ek **node** banata hai.",
      "Nodes ko parent-child relationship ke saath jodkar **DOM tree** banti hai.",
      "Malformed HTML ko spec ke error-recovery rules se fix kiya jaata hai (auto-close, implicit tags).",
      "`<script>` milne par parsing pause hoti hai jab tak script download + execute na ho (default).",
      "**Preload scanner** background mein resources fetch karta rehta hai.",
      "Parsing complete hone par **DOMContentLoaded** event fire hota hai. 🎉",
    ],
    internals: {
      p: "Blink mein HTML parsing **HTMLDocumentParser** handle karta hai, jo **HTMLTokenizer** (state machine per HTML spec) aur **HTMLTreeBuilder** (insertion modes ke saath) use karta hai. Parser kuch had tak background thread pe tokenize kar sakta hai. DOM nodes C++ objects hain (jaise `HTMLDivElement`) jinpe JS V8 wrappers ke through baat karta hai. `document.write()` parser ko corrupt kar sakta hai isliye usse avoid karo. `DOMContentLoaded` tab fire hota hai jab DOM ready ho (deferred scripts ke baad) lekin images/CSS ka wait nahi karta; `load` event saare sub-resources ke baad fire hota hai.",
      code: "document.addEventListener(\"DOMContentLoaded\", () => {\n  console.log(\"DOM ready — par images/CSS abhi load ho rahe ho sakte hain\");\n});\nwindow.addEventListener(\"load\", () => {\n  console.log(\"Sab kuch (images/CSS/fonts) load ho gaya\");\n});",
      lang: "js",
    },
    process: {
      type: "boxes",
      items: [
        { label: "Bytes", sub: "network se", color: "#EF4444" },
        { label: "Characters", sub: "encoding decode", color: "#F97316" },
        { label: "Tokens", sub: "tokenizer", color: "#8B5CF6" },
        { label: "Nodes", sub: "tree builder", color: "#06B6D4" },
        { label: "DOM Tree", sub: "ready", color: "#22C55E" },
      ],
    },
    visual: {
      type: "tree",
      root: "document",
      children: [
        {
          label: "html",
          color: "#F97316",
          children: [
            { label: "head", color: "#8B5CF6", children: [{ label: "title", color: "#06B6D4" }] },
            { label: "body", color: "#8B5CF6", children: [{ label: "h1", color: "#22C55E" }, { label: "p", color: "#22C55E" }] },
          ],
        },
      ],
    },
    memory:
      "DOM tree memory mein C++ node objects ka network hai. Har node parent/child/sibling pointers rakhta hai. Bada DOM (deep nesting, hazaaron nodes) zyada RAM khaata hai aur traversal/style-recalc ko slow karta hai. **Detached DOM nodes** — jo document se hata diye gaye par JS variable mein abhi bhi referenced hain — garbage collect nahi hote = **memory leak**. Event listeners + closures bhi nodes ko zinda rakh sakte hain.",
    browser:
      "DevTools → **Elements** panel live DOM dikhata hai (na ki original HTML source — yeh post-JS, post-error-recovery DOM hai). View Source vs Inspect mein farak isiliye dikhta hai. **Memory** panel se detached DOM nodes dhoondh sakte ho ('Detached' filter). Performance panel mein 'Parse HTML' event dikhta hai.",
    notes: {
      concept: "DOM ≠ HTML source. DOM woh live tree hai jo browser ne banaya (error recovery + JS changes ke baad). 📝",
      tip: "Bahut saare DOM updates batch karo (DocumentFragment ya framework) taaki har update pe reflow na ho.",
      warning: "innerHTML se user content daalna XSS ka darwaza hai — textContent ya proper sanitization use karo.",
      error: "getElementsByTagName ki live collection par loop chalate hue usme add/remove karna infinite loop ya skip bug deta hai.",
    },
    compare: {
      headers: ["Feature", "HTMLCollection", "NodeList"],
      rows: [
        ["Milta hai", "getElementsBy*, .children", "querySelectorAll, .childNodes"],
        ["Live ya static?", "Live (auto-update)", "querySelectorAll = static; childNodes = live"],
        ["Contents", "Sirf element nodes", "Sab nodes (text, comment bhi)"],
        ["forEach support", "Nahi (Array.from karo)", "Haan (querySelectorAll par)"],
        ["Index access", "Haan", "Haan"],
      ],
    },
    mistakes: [
      { bad: "innerHTML += se DOM update karna baar-baar.", fix: "Poori string ek baar banao ya DocumentFragment use karo; += poora subtree re-parse karta hai." },
      { bad: "Live HTMLCollection par loop karte hue DOM modify karna.", fix: "Pehle Array.from() se snapshot lo, phir iterate karo." },
      { bad: "User input ko innerHTML mein daalna.", fix: "textContent use karo ya DOMPurify se sanitize karo (XSS se bachne ke liye)." },
      { bad: "Har element ko alag-alag append karna loop mein.", fix: "Sab nodes ek DocumentFragment mein jodo, phir ek baar append karo (1 reflow)." },
    ],
    best: [
      "DOM reads aur writes ko batch karo taaki layout thrashing na ho.",
      "User content ke liye textContent prefer karo, innerHTML nahi.",
      "Bulk inserts ke liye DocumentFragment use karo.",
      "querySelector/querySelectorAll modern aur predictable hain — prefer karo.",
      "Critical resources ko HTML mein declare karo (preload scanner ke liye), JS se inject mat karo.",
      "Event delegation use karo bajaye har node pe listener lagane ke (memory + perf).",
    ],
    performance:
      "⚡ DOM operations mehnge hote hain kyunki har structural change layout/paint trigger kar sakta hai. Bada DOM (Lighthouse warning: >1500 nodes, depth >32, >60 children) style recalc aur layout ko slow karta hai. Repeated `innerHTML +=` poora subtree dobara parse + rebuild karta hai — O(n) har baar. Reads (offsetWidth, getBoundingClientRect) pending writes ke baad **forced synchronous layout** trigger karte hain. Solution: reads aur writes ko alag-alag phases mein batch karo.",
    tricky: [
      {
        title: "querySelectorAll live hai ya static?",
        code: "const list = document.querySelectorAll(\"li\");\nconst live = document.getElementsByTagName(\"li\");\nconsole.log(list.length, live.length); // maano 3, 3\ndocument.body.append(document.createElement(\"li\"));\nconsole.log(list.length, live.length); // 3, 4",
        output: "3 3\n3 4",
        explain: "querySelectorAll ek **static** snapshot deta hai — naya li add karne par uski length nahi badhti. getElementsByTagName **live** hai — woh apne-aap update ho jaata hai.",
        lang: "js",
      },
      {
        title: "childNodes mein extra nodes kyun?",
        code: "<ul>\n  <li>A</li>\n</ul>\n<script>\n  console.log(document.querySelector(\"ul\").childNodes.length);\n</script>",
        output: "3",
        explain: "childNodes mein text nodes (whitespace/newlines `<ul>` ke andar) bhi count hote hain. Yahan: text (newline+spaces) + li + text = 3. Sirf elements chahiye to `.children` use karo (length 1).",
        lang: "html",
      },
    ],
    interview: {
      beginner: [
        { q: "DOM kya hai?", a: "Document Object Model — HTML ka in-memory tree representation jise JS query aur modify kar sakta hai. Har element, text, comment ek node hota hai." },
        { q: "DOMContentLoaded aur load mein farak?", a: "DOMContentLoaded tab fire hota hai jab DOM ready ho (CSS/images ka wait nahi). load tab fire hota hai jab saare sub-resources (images, CSS, fonts) bhi load ho jaayein." },
      ],
      intermediate: [
        { q: "HTMLCollection vs NodeList?", a: "HTMLCollection live hota hai aur sirf elements rakhta hai (getElementsBy*, .children). NodeList: querySelectorAll se static milta hai aur sab node types rakh sakta hai; .childNodes wala live hota hai." },
        { q: "Script DOM parsing ko block kyun karta hai?", a: "Kyunki default script document.write() ya DOM modification kar sakta hai, browser parsing rok ke script execute karta hai. defer/async se isse unblock karte hain." },
      ],
      advanced: [
        { q: "Tokenization aur tree construction mein farak?", a: "Tokenization characters ko tokens (state machine) mein todta hai; tree construction tokens ko nodes banakar DOM tree mein jodta hai with insertion modes aur error recovery." },
        { q: "Preload scanner kya karta hai?", a: "Jab main parser blocking script pe ruka ho, ek speculative scanner aage badhkar img/link/script resources pehle se fetch karta hai — load time kam hota hai." },
      ],
    },
    mcqs: [
      {
        q: "querySelectorAll kya return karta hai?",
        options: ["Live HTMLCollection", "Static NodeList", "Array", "Live NodeList"],
        answer: 1,
        explain: "querySelectorAll ek static NodeList deta hai jo baad ke DOM changes reflect nahi karta.",
      },
      {
        q: "Text node ka nodeType kya hai?",
        options: ["1", "3", "8", "9"],
        answer: 1,
        explain: "nodeType 3 = text node. 1 = element, 8 = comment, 9 = document.",
      },
    ],
    exercises: {
      easy: [
        "Ek nested HTML lo aur console mein document.body.childNodes ko print karke text nodes count karo.",
        "querySelectorAll vs getElementsByTagName ki length compare karo ek element add karne se pehle aur baad mein.",
      ],
      medium: [
        "DocumentFragment use karke 1000 list items efficiently insert karo aur reflow count compare karo.",
        "Ek script ko defer aur async banakar DOMContentLoaded relative timing observe karo.",
      ],
      advanced: [
        "Ek mini HTML tokenizer likho jo `<tag>text</tag>` ko start/text/end tokens mein tode.",
        "Detached DOM node memory leak banao, phir DevTools Memory panel mein dhoondho aur fix karo.",
      ],
    },
    summary: [
      "HTML parsing = tokenization + tree construction → DOM tree.",
      "DOM live in-memory tree hai; har cheez node hai (element/text/comment/document).",
      "Default script parser-blocking hai; defer/async se unblock karo.",
      "Preload scanner blocking ke dauran resources pehle fetch kar leta hai.",
      "HTMLCollection live + element-only; querySelectorAll static.",
      "DOM ≠ HTML source — error recovery aur JS isse badal dete hain.",
    ],
    cheatsheet: [
      {
        h: "Node types",
        code: "1 = Element     <div>\n3 = Text        \"Hello\"\n8 = Comment     <!-- -->\n9 = Document    document\n10 = DocumentType <!doctype>",
      },
      {
        h: "Collections",
        code: "querySelectorAll  -> static NodeList\nchildNodes        -> live NodeList (all nodes)\nchildren          -> live HTMLCollection (elements)\ngetElementsBy*    -> live HTMLCollection",
      },
    ],
    projects: [
      "Ek HTML diff/sanitizer banana jo unsafe tags strip kare (XSS prevention).",
      "Virtual DOM ka chhota clone banana (diff + patch).",
      "Ek markdown → DOM renderer likhna node-by-node.",
      "Browser extension jo page ke DOM ko traverse karke stats (node count, depth) dikhaye.",
    ],
    advanced:
      "🚀 Senior level pe samjho ki DOM aur the **JS engine** alag-alag worlds hain — DOM C++ mein rehta hai (Blink), JS V8 mein. Har DOM access (jaise `el.offsetWidth`) ek C++ ↔ JS boundary cross hota hai jo cost rakhta hai. Yahi reason hai ki frameworks (React, Vue) virtual DOM/batched updates use karte hain — taaki real DOM operations minimize ho. Aur DOM mutations layout invalidation trigger karte hain; isliye **DOM reads aur writes ko separate phases mein batch** karna (FastDOM pattern) layout thrashing rokta hai. Streaming HTML parsing (server jab chunks bhejta hai) browser ko progressively DOM build karne deta hai — perceived performance ka bada lever.",
    quiz: [
      {
        q: "DOMContentLoaded kab fire hota hai?",
        options: [
          "Jab saari images load ho jaayein",
          "Jab DOM ready ho (images/CSS ka wait nahi)",
          "Jab pehla paint ho",
          "Jab user scroll kare",
        ],
        answer: 1,
        explain: "DOMContentLoaded DOM ready hone par fire hota hai; sub-resources ke liye load event hota hai.",
      },
      {
        q: "Bulk DOM insert ke liye best approach?",
        options: ["innerHTML += loop mein", "DocumentFragment mein jodke ek baar append", "Har node alag append", "setTimeout mein insert"],
        answer: 1,
        explain: "DocumentFragment offscreen build hota hai aur ek hi reflow trigger karta hai — sabse efficient.",
      },
    ],
    related: ["critical-rendering-path", "cssom", "render-tree", "browser-apis", "xss-csrf-csp", "observers"],
  },

  // ─────────────────────────────────────────────────────────────────────────
  "cssom": {
    overview:
      "**CSSOM (CSS Object Model)** woh tree hai jo browser CSS rules ko parse karke banata hai — DOM ka CSS-counterpart. Jaise DOM HTML structure represent karta hai, CSSOM batata hai ki har element pe kaun se computed styles apply honge (cascade, inheritance, specificity ke baad). 🎨 CSSOM **render-blocking** hota hai: jab tak yeh ready nahi, browser Render Tree nahi banata aur kuch paint nahi hota.",
    why:
      "CSSOM samajhna isliye crucial hai kyunki interview mein puchhte hain 'CSS render-blocking kyun hai?', 'specificity kaise compute hoti hai?', 'style recalculation kab trigger hoti hai?'. CSSOM hi woh reason hai ki ek slow CSS file poore page ko blank rok deti hai. Aur runtime pe **style recalculation** (recalc) ek bada performance cost hai jo CSSOM se related hai. 🧠 Bina iske CRP adhura hai.",
    concept: [
      {
        h: "CSS bytes se CSSOM tree tak",
        p: "DOM ki tarah hi: CSS bytes → characters → tokens → nodes → CSSOM tree. CSSOM ek tree isliye hai kyunki styles **cascade aur inherit** hote hain — parent ke styles children pe flow hote hain (jaise `color`, `font-family`). Browser har node ke liye final **computed style** nikalta hai sabhi matching rules ko cascade karke.",
        code: "body { font-size: 16px; }\np   { font-weight: bold; }\np span { color: red; }\n/* span ka computed: font-size 16 (inherited), bold (inherited), red */",
        lang: "css",
      },
      {
        h: "CSS render-blocking kyun hai?",
        p: "Agar browser bina CSSOM ke paint kare, to pehle unstyled content dikhega phir achanak styled (FOUC — flash of unstyled content), jo bahut bura UX hai. Isliye browser **deliberately** Render Tree banane se pehle saari CSSOM ka wait karta hai. CSS by default render-blocking hai — yeh design choice hai, bug nahi.",
      },
      {
        h: "Specificity aur cascade",
        p: "Jab ek element pe multiple rules match karein, **specificity** decide karta hai kaun jeetega. Specificity 4 parts mein: inline (1000) > id (100) > class/attribute/pseudo-class (10) > element/pseudo-element (1). Tie hone par **last declared rule** jeetta hai (source order). `!important` cascade ko override karta hai (par avoid karo).",
        code: "/* specificity comparison */\n#nav .item   { color: blue; }   /* 100 + 10 = 110 */\n.menu .item  { color: green; }  /* 10 + 10 = 20  -> haarta hai */\n/* result: blue jeetega */",
        lang: "css",
      },
      {
        h: "Style calculation aur recalculation",
        p: "**Recalculate Style** woh phase hai jisme browser har affected element ke liye final computed styles nikalta hai (matching rules + cascade + inheritance). Initial load pe yeh poore tree pe chalta hai. Runtime mein, class add/remove ya inline style change recalc trigger karta hai — sirf affected subtree pe (Blink mein style invalidation optimization se).",
      },
      {
        h: "CSSOM JS se accessible hai",
        p: "JS se CSSOM ko padh/badal sakte ho: `getComputedStyle(el)` final computed values deta hai, `document.styleSheets` saari stylesheets, `el.style` inline styles. `getComputedStyle` mehnga ho sakta hai kyunki yeh **forced style recalc + layout** trigger kar sakta hai agar pending changes hon.",
        code: "const el = document.querySelector(\".box\");\nconst cs = getComputedStyle(el);\nconsole.log(cs.color, cs.fontSize); // resolved/computed values\nel.style.color = \"red\";            // inline style -> recalc trigger",
        lang: "js",
      },
    ],
    analogy:
      "Socho DOM ek ghar ka **structure** hai (kamre, deewarein) aur CSSOM uska **interior design plan** hai. 🏠 Cascade matlab: ground rule hai 'poore ghar ki deewarein safed' (body color), lekin bedroom ka apna rule 'bedroom blue' (specificity zyada) us area ke liye jeet jaata hai. Inheritance matlab: agar bedroom ka font 'modern' hai to uske andar ki almari ko bhi default 'modern' mil jaata hai (jab tak alag na bola jaye). Aur jab tak poora design plan (CSSOM) ready na ho, interior designer (browser) kuch bhi paint nahi karta — warna aadha-adhura ghar dikhega (FOUC).",
    syntax: {
      code: "// CSSOM ko JS se access karna\ngetComputedStyle(el).color;          // resolved computed value (string)\nel.style.backgroundColor = \"navy\";   // inline style set (CSSOM update)\ndocument.styleSheets[0].cssRules;     // sheet ke rules\nel.classList.add(\"active\");            // style recalc trigger",
      note: "getComputedStyle resolved values deta hai; el.style sirf inline styles padhta hai.",
      lang: "js",
    },
    steps: [
      "Browser CSS bytes (external file, `<style>`, ya inline) receive karta hai.",
      "Bytes → characters → **tokens** mein convert hote hain (CSS tokenizer).",
      "Tokens se rules aur **CSSOM nodes** banti hain.",
      "Nodes ko tree mein jodte hain — cascade/inheritance ke liye structure ready.",
      "Browser CSSOM complete hone ka **wait** karta hai (render-blocking).",
      "DOM + CSSOM merge hoke **Render Tree** banta hai.",
      "Style recalculation har visible node ke liye **computed styles** nikalta hai.",
      "Runtime changes (class/style) affected subtree pe recalc dobara trigger karte hain. 🔁",
    ],
    internals: {
      p: "Blink mein CSS parsing **CSSParser** karta hai jo stylesheets ko `StyleRule` objects mein convert karta hai. Style resolution ke liye Blink **style invalidation** aur **matching** ka optimized system use karta hai — woh ruling 'is element pe kaun se selectors match karte hain?' ko fast banata hai via rule indexing (by id/class/tag). Recalc poore tree pe nahi, sirf **invalidated** subtrees pe chalta hai. Computed styles **ComputedStyle** objects mein store hote hain jo immutable aur shared (cached) ho sakte hain — agar do elements ka computed style same hai to woh ek hi ComputedStyle object share karte hain (memory saving).",
      code: "// Style invalidation ka mental model\n// el.classList.add('active') ->\n//   1. browser maps 'active' class -> affected selectors\n//   2. sirf un elements ko 'dirty' mark karta hai\n//   3. next frame pe Recalc Style sirf dirty subtree pe\n//   4. agar geometry badli -> Layout bhi",
      lang: "js",
    },
    process: {
      type: "boxes",
      items: [
        { label: "CSS Bytes", sub: "file/style/inline", color: "#EF4444" },
        { label: "Tokens", sub: "CSS tokenizer", color: "#F97316" },
        { label: "Rules", sub: "parser", color: "#8B5CF6" },
        { label: "CSSOM Tree", sub: "cascade-ready", color: "#06B6D4" },
        { label: "Computed Style", sub: "per node", color: "#22C55E" },
      ],
    },
    visual: {
      type: "timeline",
      items: [
        { year: "1", text: "CSS bytes aate hain (link/style/inline)." },
        { year: "2", text: "Tokenize + parse → rules ban-te hain." },
        { year: "3", text: "CSSOM tree assemble hoti hai (render-blocking)." },
        { year: "4", text: "Cascade + inheritance + specificity resolve." },
        { year: "5", text: "Recalc Style: har node ka computed style." },
        { year: "6", text: "CSSOM ready → Render Tree ban sakta hai. ✅" },
      ],
    },
    memory:
      "CSSOM rules aur computed styles memory mein rehte hain. Blink ek smart optimization karta hai: **shared ComputedStyle objects** — agar bahut saare elements ka final style identical hai, woh ek hi object reference karte hain, memory bachti hai. Bahut saari unused CSS rules abhi bhi parse hoti hain aur memory + matching cost badhati hain. Bade, complex selectors (deep descendant chains) matching ko slow aur memory-heavy banate hain.",
    browser:
      "DevTools → **Elements → Styles** panel cascade dikhata hai: kaun se rules apply hue, kaun overridden (strikethrough) hue. **Computed** tab final resolved values dikhata hai. **Coverage** tab batata hai kitni CSS use hui — unused CSS hatao. Performance panel mein **Recalculate Style** events (purple) dikhte hain, aur unka 'reason' bhi (jaise class change).",
    notes: {
      concept: "CSSOM = CSS ka in-memory tree. Render-blocking by design — FOUC se bachne ke liye. 📝",
      tip: "Specificity badhane ke liye id selectors avoid karo; flat, class-based selectors (BEM) maintainable + fast hote hain.",
      warning: "getComputedStyle ek pending write ke baad call karna forced synchronous layout/recalc trigger kar sakta hai.",
      error: "!important ka overuse cascade ko unmaintainable bana deta hai — debugging nightmare ban jaata hai.",
    },
    compare: {
      headers: ["Aspect", "DOM", "CSSOM"],
      rows: [
        ["Source", "HTML", "CSS"],
        ["Represent karta", "Document structure", "Styles (cascade/inherit)"],
        ["Render-blocking?", "Nahi (parser-blocking nature alag)", "Haan"],
        ["JS access", "querySelector, etc.", "getComputedStyle, styleSheets"],
        ["Merge result", "DOM + CSSOM = Render Tree", "DOM + CSSOM = Render Tree"],
      ],
    },
    mistakes: [
      { bad: "Deep descendant selectors (.a .b .c .d) use karna.", fix: "Flat class selectors (BEM) use karo — matching fast hoti hai." },
      { bad: "Specificity wars jeetne ke liye !important spam.", fix: "Selectors ko consistent specificity pe rakho; cascade ko samajh ke organize karo." },
      { bad: "Loop mein getComputedStyle baar-baar call karna.", fix: "Ek baar read karke cache karo; reads/writes batch karo (layout thrashing)." },
      { bad: "Saari CSS ek hi blocking file mein.", fix: "Critical CSS inline + non-critical async (render-blocking time kam)." },
    ],
    best: [
      "Critical CSS ko inline karo, non-critical ko async load karo.",
      "Flat, low-specificity selectors prefer karo (BEM / utility classes).",
      "Unused CSS regularly purge karo (Coverage tab / PurgeCSS).",
      "!important se bacho; cascade ko samajh ke design karo.",
      "Class toggles use karo bajaye multiple inline style sets ke (ek recalc).",
      "Animations ke liye composited properties (transform/opacity) prefer karo, layout-triggering nahi.",
    ],
    performance:
      "⚡ CSSOM ka sabse bada perf impact do jagah: **(1) Render-blocking** — slow/large CSS first paint delay karti hai, isliye critical CSS inline + minify karo. **(2) Style recalculation** — har class/style change recalc trigger karta hai. Bade DOM + complex selectors recalc ko mehnga banate hain. Bure scenario: JS loop mein har iteration pe class toggle + getComputedStyle read = forced sync recalc har baar. Fix: batch reads, batch writes, simple selectors.",
    tricky: [
      {
        title: "Kya specificity ya source order jeetta hai?",
        code: ".btn { color: green; }\n.btn { color: blue; }   /* same specificity */\n/* dono .btn — kaun jeetega? */",
        output: "blue (last declared)",
        explain: "Jab specificity barabar ho, **source order** decide karta hai — last declared rule jeetta hai. Isliye blue apply hoga.",
        lang: "css",
      },
      {
        title: "getComputedStyle resolved value deta hai",
        code: "// CSS: .box { width: 50%; }\nconst w = getComputedStyle(box).width;\nconsole.log(w); // \"50%\" ya pixels?",
        output: "\"640px\" (resolved, not 50%)",
        explain: "getComputedStyle aksar **resolved/used** value deta hai pixels mein, na ki authored '50%'. Isliye yeh layout pe depend karta hai aur forced layout trigger kar sakta hai.",
        lang: "js",
      },
    ],
    interview: {
      beginner: [
        { q: "CSSOM kya hai?", a: "CSS Object Model — CSS rules ka in-memory tree representation jo cascade, inheritance aur specificity ke baad har element ke computed styles batata hai." },
        { q: "CSS render-blocking kyun hai?", a: "Taaki browser bina complete styles ke paint na kare — warna unstyled content flash hoga (FOUC). Isliye Render Tree CSSOM ready hone ka wait karta hai." },
      ],
      intermediate: [
        { q: "Specificity kaise calculate hoti hai?", a: "Inline (1000) > id (100) > class/attr/pseudo-class (10) > element/pseudo-element (1). Higher specificity jeetti hai; tie pe source order (last wins)." },
        { q: "Style recalculation kab trigger hoti hai?", a: "Jab koi cheez computed styles ko invalidate kare: class add/remove, inline style change, stylesheet insert, ya DOM structure change jo selector matching badle." },
      ],
      advanced: [
        { q: "Blink style recalc ko kaise optimize karta hai?", a: "Style invalidation system se: woh class/id ko affected selectors se map karke sirf invalidated subtrees ko dirty karta hai, na ki poora tree. Plus rule indexing se matching fast hoti hai aur ComputedStyle objects share/cache hote hain." },
        { q: "getComputedStyle perf concern kyun hai?", a: "Woh resolved values deta hai jo layout pe depend karte hain — agar pending DOM/style changes hon to forced synchronous style recalc + layout trigger kar sakta hai, jisse layout thrashing hoti hai." },
      ],
    },
    mcqs: [
      {
        q: "Kaun render-blocking hai initial render ke liye?",
        options: ["DOM", "CSSOM", "Render Tree", "Composite"],
        answer: 1,
        explain: "CSSOM render-blocking hai — Render Tree iske bina nahi banta.",
      },
      {
        q: "#nav .item ki specificity kya hai?",
        options: ["20", "110", "11", "101"],
        answer: 1,
        explain: "id = 100, class = 10, total = 110.",
      },
    ],
    exercises: {
      easy: [
        "Do same-specificity rules likho aur observe karo kaun jeetta hai (source order).",
        "getComputedStyle se ek element ka resolved width print karo.",
      ],
      medium: [
        "DevTools Coverage tab se unused CSS find karo aur ek page se purge karo.",
        "Ek class toggle button banao aur Performance panel mein 'Recalculate Style' event dekho.",
      ],
      advanced: [
        "Ek specificity calculator function likho jo selector string leke (a,b,c) tuple return kare.",
        "Layout thrashing demo banao (loop mein read+write) aur phir batch karke fix karo, timing compare karo.",
      ],
    },
    summary: [
      "CSSOM = CSS ka in-memory tree (cascade + inheritance + specificity).",
      "CSS render-blocking hai by design — FOUC se bachne ke liye.",
      "Specificity: inline > id > class > element; tie pe source order.",
      "Recalc Style class/style/structure change pe trigger hoti hai.",
      "DOM + CSSOM = Render Tree.",
      "getComputedStyle resolved values deta hai aur forced layout trigger kar sakta hai.",
    ],
    cheatsheet: [
      {
        h: "Specificity",
        code: "inline style   = 1000\n#id            = 100\n.class :hover [attr] = 10\nelement ::before = 1\ntie -> last declared wins",
      },
      {
        h: "CSSOM via JS",
        code: "getComputedStyle(el).prop  // resolved value\nel.style.prop = ...        // inline (recalc)\ndocument.styleSheets        // all sheets\nel.classList.toggle('x')    // recalc trigger",
      },
    ],
    projects: [
      "Critical CSS extractor tool (above-the-fold CSS inline karna).",
      "Ek theme-switcher jo CSS variables runtime pe badle (minimal recalc).",
      "Specificity visualizer jo bataye kaun sa rule kyun jeeta.",
      "Unused-CSS auditor jo Coverage data se report banaye.",
    ],
    advanced:
      "🚀 Senior insight: modern CSS engines mein **style sharing** aur **invalidation sets** key optimizations hain. Blink rules ko buckets (id/class/tag) mein index karta hai taaki har element ke liye saari rules check na karni padein. CSS containment (`contain: layout style paint`) aur `content-visibility: auto` se tum browser ko bata sakte ho ki ek subtree independent hai — recalc/layout ko us area tak limit kar deta hai, jo bade pages pe huge win hai. CSS custom properties (variables) runtime themes ke liye powerful hain par inheritance-heavy variables zyada recalc trigger kar sakte hain — soch-samajh ke use karo.",
    quiz: [
      {
        q: "content-visibility: auto kya karta hai?",
        options: [
          "Element hide karta hai",
          "Off-screen subtree ka rendering work skip/defer karta hai",
          "CSS variable banata hai",
          "Specificity badhata hai",
        ],
        answer: 1,
        explain: "Yeh off-screen content ka layout/paint defer karta hai, initial render aur recalc cost kam karta hai.",
      },
      {
        q: "Tie-breaker jab specificity equal ho?",
        options: ["First declared", "Last declared (source order)", "Alphabetical", "Random"],
        answer: 1,
        explain: "Equal specificity par source order mein last declared rule jeetta hai.",
      },
    ],
    related: ["critical-rendering-path", "html-parsing-dom", "render-tree", "layout-reflow", "rendering-performance"],
  },

  // ─────────────────────────────────────────────────────────────────────────
  "render-tree": {
    overview:
      "**Render Tree** woh tree hai jo browser **DOM + CSSOM** ko combine karke banata hai. Ismein **sirf visible content** hota hai — har node ke saath uska computed style attached hota hai. Yeh woh blueprint hai jiske upar **Layout** chalega. 🌲 Important: `display:none` wale nodes Render Tree mein **aate hi nahi**, lekin `visibility:hidden` wale aate hain (bas invisible rehte hain). Yeh distinction interview ka favourite hai.",
    why:
      "Render Tree samajhna isliye zaroori hai kyunki yeh batata hai ki kya actually paint hoga aur layout space ghera. `display:none` vs `visibility:hidden` vs `opacity:0` ka farak directly Render Tree behaviour se aata hai — yeh classic interview question hai. Aur performance ke liye: jo nodes Render Tree mein nahi hain (display:none) un par layout/paint cost nahi lagti. 🧠",
    concept: [
      {
        h: "DOM + CSSOM = Render Tree",
        p: "Browser DOM tree ko top se traverse karta hai aur har visible node ke liye matching CSSOM computed styles attach karta hai. Result Render Tree (Blink mein **Layout Tree / LayoutObject tree**) hai. Yeh DOM se thodi alag structure ho sakti hai — kuch nodes skip hote hain, aur pseudo-elements (`::before`, `::after`) jo DOM mein nahi hote, Render Tree mein **aa jaate hain** kyunki unke styles content generate karte hain.",
      },
      {
        h: "display:none — Render Tree se bahar",
        p: "`display:none` matlab element bilkul **render hi nahi hota** — woh Render Tree mein nahi aata, koi space nahi gherta, layout/paint mein cost nahi. Element DOM mein abhi bhi maujood hai (JS se accessible) par visually aur geometrically gayab hai. Isse toggle karna layout reflow trigger karta hai (kyunki tree structure badalti hai).",
        code: ".hidden { display: none; }\n/* DOM mein hai, par Render Tree se bahar — 0 space, 0 paint */",
        lang: "css",
      },
      {
        h: "visibility:hidden — invisible par present",
        p: "`visibility:hidden` element ko **invisible** banata hai par woh **Render Tree mein rehta hai** aur apni jagah (space) gherta hai. Layout pe asar padta hai (space reserved), paint mein bhi 'box' consider hota hai par content draw nahi hota. Iseliye `display:none` se toggle karna aur `visibility:hidden` se toggle karna alag layout impact rakhte hain.",
        code: ".invisible { visibility: hidden; }\n/* Render Tree mein hai, space gherta hai, dikhta nahi */",
        lang: "css",
      },
      {
        h: "opacity:0 — fully painted, transparent",
        p: "`opacity:0` element ko fully transparent banata hai, par woh **Render Tree mein hai, space gherta hai, AUR actually paint bhi hota hai** (bas dikhta nahi). Plus opacity ek composited property hai — opacity:0 se animate karna often apni layer banata hai. Yeh teeno (none/hidden/opacity:0) ka farak interview gold hai.",
        code: ".transparent { opacity: 0; }\n/* paint hota hai (cost), space gherta hai, clickable bhi reh sakta hai */",
        lang: "css",
      },
      {
        h: "Kya kya Render Tree se bahar rehta hai",
        p: "Render Tree mein nahi aate: `display:none` elements, `<head>`, `<script>`, `<meta>`, `<title>` jaise non-visual elements, aur whitespace-only text nodes (mostly). Aate hain: visible elements, text content, aur generated pseudo-element content. Yeh selective inclusion hi Render Tree ko DOM se chhota aur paint-focused banata hai.",
      },
    ],
    analogy:
      "Socho ek **stage drama** ho raha hai. 🎭 DOM = saare actors backstage (sab maujood). CSSOM = costume + makeup + positioning instructions. Render Tree = sirf woh actors jo **abhi stage par** hain audience ke saamne. `display:none` = actor backstage hai, stage par space hi nahi le raha (jaise hai hi nahi). `visibility:hidden` = actor stage par khada hai apni jagah ghere hue, par invisible cloak pehna hua (dikhta nahi par jagah le raha hai). `opacity:0` = actor stage par hai, light bhi pad rahi hai (paint ho raha hai), bas spotlight ne use 100% transparent kar diya.",
    syntax: {
      code: "// Teeno hide techniques ka farak\nel.style.display = \"none\";        // Render Tree se hata — no space, no paint\nel.style.visibility = \"hidden\";   // Render Tree mein — space gherta, no draw\nel.style.opacity = \"0\";           // Render Tree mein — paint hota, transparent\n\n// check visibility (none ke liye offsetParent null hota hai)\nconsole.log(el.offsetParent === null); // display:none -> true",
      note: "display:none par offsetParent null hota hai aur getBoundingClientRect saare 0 deta hai.",
      lang: "js",
    },
    steps: [
      "Browser DOM tree ko root se traverse karna shuru karta hai.",
      "Har node ke liye check karta hai: kya yeh visible hai? (`display:none` skip).",
      "Visible node ke liye CSSOM se matching **computed styles** attach karta hai.",
      "Pseudo-elements (`::before`/`::after`) ka generated content add karta hai.",
      "Non-visual nodes (script/meta/head) ko exclude karta hai.",
      "Result: **Render Tree** (Blink ka LayoutObject tree) — sirf visible, styled content.",
      "Yeh tree **Layout** phase ka input ban-ta hai.",
      "Tree dirty hone par (DOM/style change) relevant hissa dobara build hota hai. 🔁",
    ],
    internals: {
      p: "Blink mein iska naam technically **Layout Tree** (pehle 'render tree') hai, jo **LayoutObject** nodes se bana hota hai. Har visible DOM node ke liye ek (ya zyada) LayoutObject ban-ta hai jo geometry aur paint info rakhta hai. Anonymous LayoutObjects bhi banti hain (jaise table layout fix karne ke liye, ya block ke andar mixed inline/block content ke liye). `display:none` wale DOM nodes ke liye koi LayoutObject nahi banta. Yeh tree DOM se 1:1 nahi hota — yahi reason hai ki structure aksar alag dikhti hai.",
      code: "// Mental model: DOM node -> LayoutObject (agar visible)\n// <div style='display:none'>   -> koi LayoutObject NAHI\n// <span style='visibility:hidden'> -> LayoutObject hai (geometry), paint skip\n// <p>text</p>                  -> LayoutBlock + LayoutText\n// ::before { content: 'x' }     -> generated LayoutObject",
      lang: "js",
    },
    process: {
      type: "boxes",
      items: [
        { label: "DOM Tree", sub: "structure", color: "#EF4444" },
        { label: "CSSOM", sub: "computed styles", color: "#F97316" },
        { label: "Visibility filter", sub: "display:none skip", color: "#8B5CF6" },
        { label: "Render Tree", sub: "visible + styled", color: "#22C55E" },
      ],
    },
    visual: {
      type: "timeline",
      items: [
        { year: "1", text: "DOM tree ready hota hai." },
        { year: "2", text: "CSSOM ready hota hai (computed styles)." },
        { year: "3", text: "Traverse DOM; display:none nodes skip." },
        { year: "4", text: "Visible nodes ko CSSOM styles attach." },
        { year: "5", text: "Pseudo-elements + generated content add." },
        { year: "6", text: "Render Tree taiyaar → Layout ke liye input. ✅" },
      ],
    },
    memory:
      "Render Tree (LayoutObject tree) DOM se aksar chhoti hoti hai kyunki display:none nodes, head/script/meta included nahi hote. Har LayoutObject geometry + style reference rakhta hai. Bahut saare visible nodes = bada layout tree = mehnga layout/paint + zyada memory. `display:none` use karke off-screen heavy subtrees ko render tree se bahar rakhna memory + perf bachata hai (lekin toggle karte waqt rebuild cost lagta hai).",
    browser:
      "DevTools direct 'Render Tree' nahi dikhata, par tum infer kar sakte ho: `display:none` element ka getBoundingClientRect saara 0 dega aur offsetParent null hoga. **Layout** events Performance panel mein dikhte hain. Rendering tab mein 'Paint flashing' on karke dekh sakte ho ki konse areas actually paint ho rahe hain (jo Render Tree mein hain).",
    notes: {
      concept: "Render Tree = DOM + CSSOM, sirf visible content. display:none bahar, visibility:hidden andar. 📝",
      tip: "Bade off-screen UI ko display:none rakho taaki layout/paint cost na lage; ya content-visibility:auto use karo.",
      warning: "display:none toggle karna reflow trigger karta hai kyunki layout tree structure badalti hai.",
      error: "visibility:hidden ko 'no cost' samajhna galat hai — woh abhi bhi space gherta aur layout/paint mein consider hota hai.",
    },
    compare: {
      headers: ["Property", "display:none", "visibility:hidden", "opacity:0"],
      rows: [
        ["Render Tree mein?", "Nahi", "Haan", "Haan"],
        ["Space gherta hai?", "Nahi", "Haan", "Haan"],
        ["Paint hota hai?", "Nahi", "Nahi (content)", "Haan (transparent)"],
        ["Click/events?", "Nahi", "Nahi", "Haan (default)"],
        ["Animate kar sakte?", "Nahi (binary)", "Nahi smoothly", "Haan (composited)"],
      ],
    },
    mistakes: [
      { bad: "visibility:hidden ko zero-cost samajhna.", fix: "Yaad rakho woh space gherta hai aur layout mein consider hota hai; sirf content draw skip hota hai." },
      { bad: "Animation ke liye display:none ↔ block toggle karna.", fix: "opacity/transform use karo smooth composited animation ke liye; display animate nahi hota." },
      { bad: "Heavy off-screen content ko sirf opacity:0 se chhupana.", fix: "opacity:0 abhi bhi paint hota hai; display:none ya content-visibility use karo cost bachane ke liye." },
      { bad: "Yeh sochna ki display:none element JS se inaccessible ho jaata hai.", fix: "Woh DOM mein rehta hai aur JS se fully accessible/modifiable hai." },
    ],
    best: [
      "display:none use karo jab element ki space + paint dono chhupani ho.",
      "visibility:hidden use karo jab layout space reserve rakhna ho.",
      "opacity (+ transform) use karo smooth, composited animations ke liye.",
      "Heavy off-screen sections ke liye content-visibility:auto consider karo.",
      "Hide/show toggle se hone wale reflows minimize karo (batch updates).",
      "Accessibility: display:none/visibility:hidden screen readers se bhi hide karte hain — soch ke use karo.",
    ],
    performance:
      "⚡ Render Tree directly layout/paint cost decide karta hai. Jitne zyada visible nodes, utna mehnga layout aur paint. `display:none` se off-screen heavy content ko tree se nikalna cost bachata hai (par toggle pe rebuild). `visibility:hidden` aur `opacity:0` cost NAHI bachate — woh abhi bhi layout (aur opacity:0 toh paint bhi) karte hain. Animations ke liye: opacity/transform composited hain (cheap), jabki display/visibility toggle layout/paint trigger karte hain (mehnga).",
    tricky: [
      {
        title: "display:none element ka getBoundingClientRect?",
        code: "el.style.display = \"none\";\nconst r = el.getBoundingClientRect();\nconsole.log(r.width, r.height, r.top);",
        output: "0 0 0",
        explain: "display:none element Render Tree mein nahi hai, isliye uski koi geometry nahi — saara 0 milta hai. Yahi reason hai ki hidden element ki dimensions measure karne se pehle use briefly visible/offscreen karna padta hai.",
        lang: "js",
      },
      {
        title: "opacity:0 click still works?",
        code: "<button style=\"opacity:0\">Click</button>\n<!-- kya user isse click kar sakta hai? -->",
        output: "Haan, click hota hai",
        explain: "opacity:0 sirf visual transparency hai — element abhi bhi Render Tree mein hai, space gherta hai aur pointer events default rehte hain. Isliye 'invisible' button galti se clickable reh sakta hai (pointer-events:none chahiye hoga).",
        lang: "html",
      },
    ],
    interview: {
      beginner: [
        { q: "Render Tree kya hai?", a: "DOM + CSSOM ko combine karke bana tree jisme sirf visible content + computed styles hote hain. Yeh Layout phase ka input hota hai." },
        { q: "display:none Render Tree mein aata hai?", a: "Nahi. display:none element Render Tree mein nahi aata, koi space nahi gherta aur paint nahi hota — par DOM mein maujood rehta hai." },
      ],
      intermediate: [
        { q: "display:none vs visibility:hidden?", a: "display:none Render Tree se bahar (no space, no paint). visibility:hidden Render Tree mein rehta hai, space gherta hai par content draw nahi hota." },
        { q: "Kya pseudo-elements Render Tree mein hote hain?", a: "Haan — ::before/::after DOM mein nahi hote par agar unka content generate hota hai to woh Render Tree (LayoutObject) mein aate hain aur paint hote hain." },
      ],
      advanced: [
        { q: "Render Tree DOM se structurally alag kyun ho sakti hai?", a: "Kyunki display:none nodes skip hote hain, head/script/meta exclude hote hain, pseudo-elements add hote hain, aur Blink anonymous LayoutObjects banata hai (table/inline-block fixups), to 1:1 mapping nahi hoti." },
        { q: "opacity:0, visibility:hidden, display:none mein paint cost ka order?", a: "display:none: 0 cost (tree se bahar). visibility:hidden: layout cost hai par content paint skip. opacity:0: layout + paint dono hote hain (sabse mehnga of the three), bas pixels transparent hote hain." },
      ],
    },
    mcqs: [
      {
        q: "Kaun Render Tree mein NAHI aata?",
        options: ["visibility:hidden element", "opacity:0 element", "display:none element", "::before content"],
        answer: 2,
        explain: "display:none element Render Tree se completely bahar rehta hai.",
      },
      {
        q: "opacity:0 element ke baare mein sahi kya hai?",
        options: [
          "Space nahi gherta",
          "Paint nahi hota",
          "Paint hota hai, space gherta hai, clickable reh sakta hai",
          "DOM se hat jaata hai",
        ],
        answer: 2,
        explain: "opacity:0 fully painted hota hai (transparent), space gherta hai, aur default pointer events rakhta hai.",
      },
    ],
    exercises: {
      easy: [
        "Ek element ko teeno (none/hidden/opacity:0) banao aur uske getBoundingClientRect compare karo.",
        "opacity:0 button banao aur dekho click chalta hai ya nahi.",
      ],
      medium: [
        "Performance panel record karke display:none toggle bनाम opacity toggle ke layout/paint events compare karo.",
        "Ek hidden element ki height measure karne ka safe tarika likho (offscreen visibility:hidden trick).",
      ],
      advanced: [
        "content-visibility:auto ka use karke ek long list ka initial render time improve karo aur measure karo.",
        "Ek accordion banao jo height + opacity transition use kare (display:none toggle ke bina) smooth animation ke liye.",
      ],
    },
    summary: [
      "Render Tree = DOM + CSSOM, sirf visible content + computed styles.",
      "display:none: Render Tree se bahar, 0 space, 0 paint.",
      "visibility:hidden: tree mein, space gherta, content draw skip.",
      "opacity:0: tree mein, space gherta, paint hota (transparent), clickable.",
      "Pseudo-elements aate hain; head/script/meta nahi aate.",
      "Render Tree Layout phase ka input hai.",
    ],
    cheatsheet: [
      {
        h: "Hide techniques",
        code: "display:none       -> no tree, no space, no paint\nvisibility:hidden  -> tree+space, no content draw\nopacity:0          -> tree+space+paint, transparent\ncontent-visibility:auto -> defer offscreen render",
      },
      {
        h: "Measure hidden",
        code: "// display:none -> rect all 0\n// safe measure:\nel.style.visibility = 'hidden';\nel.style.position = 'absolute';\nconst h = el.offsetHeight;",
      },
    ],
    projects: [
      "Accordion/collapse component jo smooth animation kare (display toggle ke bina).",
      "Tab UI jisme inactive tabs ko display:none rakho (paint cost bachao).",
      "Skeleton loader jo content ready hone par visibility/opacity transition kare.",
      "Long feed mein content-visibility se off-screen render skip karna.",
    ],
    advanced:
      "🚀 Senior level: Blink ka Layout Tree (LayoutObject tree) RenderingNG mein further refine hua hai — paint property trees aur layer assignment isi se derive hote hain. `content-visibility: auto` element ke off-screen hone par uska layout + paint **skip** karta hai aur `contain-intrinsic-size` se placeholder geometry deta hai — yeh huge lists pe render time ko nateekar deta hai. Samjho: Render Tree se exclude hona (display:none) vs render work defer karna (content-visibility) do alag strategies hain — pehla content gayab kar deta hai (accessibility/SEO impact), doosra content rakhta hai par work tabhi karta hai jab zaroorat ho.",
    quiz: [
      {
        q: "content-visibility:auto ka render fayda?",
        options: [
          "Element hamesha hide karta hai",
          "Off-screen subtree ka layout/paint skip karta hai",
          "Specificity badhata hai",
          "Element ko GPU layer banata hai",
        ],
        answer: 1,
        explain: "Off-screen hone par woh layout aur paint defer/skip karta hai, initial render fast hota hai.",
      },
      {
        q: "Smooth fade-out ke liye best?",
        options: ["display:none toggle", "visibility:hidden toggle", "opacity transition", "remove from DOM"],
        answer: 2,
        explain: "opacity composited hai aur smoothly animate hoti hai; display animate nahi hota.",
      },
    ],
    related: ["critical-rendering-path", "html-parsing-dom", "cssom", "layout-reflow", "paint-repaint", "compositing"],
  },

  // ─────────────────────────────────────────────────────────────────────────
  "layout-reflow": {
    overview:
      "**Layout** (jise **Reflow** bhi kehte hain) woh phase hai jisme browser Render Tree ke har node ki exact **geometry** calculate karta hai — kaha hoga (x, y position) aur kitna bada (width, height). Yeh box model ke hisaab se hota hai. 📐 Reflow mehnga hota hai kyunki ek element ka size badalne se uske aaspaas/parent/children sab affect ho sakte hain. **Forced synchronous layout** aur **layout thrashing** is topic ke killer interview concepts hain.",
    why:
      "Layout/reflow web performance ka sabse bada villain hai. Janky scrolling, slow animations, laggy UI — bahut baar inka root cause excessive reflow hota hai. Interview mein deeply puchhte hain: 'kya reflow trigger karta hai?', 'layout thrashing kya hai aur kaise rokte ho?', 'forced synchronous layout kab hota hai?'. ⚡ Senior frontend roles ke liye yeh must-know hai.",
    concept: [
      {
        h: "Layout = geometry calculation",
        p: "Render Tree ke paas styles hain par exact pixels nahi. Layout phase root se chalkar har node ka **box model** (content + padding + border + margin) aur uski exact position + dimensions compute karta hai. Percentages, flexbox, grid, viewport units — sab yahin resolve hote hain actual pixels mein. Output: har node ke liye precise rectangle.",
      },
      {
        h: "Reflow kya trigger karta hai",
        p: "Reflow tab hota hai jab geometry badle: window resize, DOM nodes add/remove, font load, content change, ya **geometric CSS properties** change (width, height, padding, margin, top, left, display, position, font-size). Non-geometric changes (color, background) reflow nahi karte — sirf repaint. Yeh distinction crucial hai.",
        code: "el.style.width = \"200px\";   // reflow (geometry)\nel.style.padding = \"10px\";   // reflow\nel.style.color = \"red\";      // NO reflow, sirf repaint\nel.classList.add(\"big\");      // depends on rules",
        lang: "js",
      },
      {
        h: "Forced Synchronous Layout (layout thrashing)",
        p: "Normally browser reflow ko batch karke frame ke end mein ek baar karta hai. Par agar tum DOM **write** ke turant baad ek geometry **read** karo (jaise `offsetHeight`, `getBoundingClientRect`), to browser ko **abhi** layout calculate karna padega taaki sahi value de — yeh **forced synchronous layout** hai. Loop mein yeh karna = **layout thrashing**, super slow.",
        code: "// BAD: layout thrashing (read-write-read-write)\nfor (const box of boxes) {\n  box.style.width = box.offsetWidth + 10 + \"px\"; // read forces layout, then write\n}",
        lang: "js",
      },
      {
        h: "Reflow scope — local vs global",
        p: "Reflow poore page ka bhi ho sakta hai (global, jaise root font-size ya window resize) ya ek subtree tak limited (local). Browser jitna ho sake scope ko chhota rakhne ki koshish karta hai. **CSS containment** (`contain: layout`) aur absolutely-positioned elements reflow ko isolate karne mein madad karte hain — unka change parent/siblings ko utna affect nahi karta.",
        code: ".widget { contain: layout; }\n/* iske andar ke changes bahar ke layout ko affect nahi karte */",
        lang: "css",
      },
      {
        h: "Read/write batching se bachao",
        p: "Layout thrashing rokne ka golden rule: saare **reads** pehle karo (batch), phir saare **writes** (batch). Isse browser ek hi baar layout karta hai. Libraries jaise FastDOM yahi automate karti hain. `requestAnimationFrame` mein writes karna bhi smooth frame timing deta hai.",
        code: "// GOOD: pehle saare reads, phir saare writes\nconst widths = boxes.map((b) => b.offsetWidth); // sab reads\nboxes.forEach((b, i) => { b.style.width = widths[i] + 10 + \"px\"; }); // sab writes",
        lang: "js",
      },
    ],
    analogy:
      "Socho tum ek **bookshelf** arrange kar rahe ho. 📚 Layout = har kitaab ki exact jagah aur jitni jagah woh legi calculate karna. Ab agar tum ek kitaab ko bada (width++) kar do, to uske right wali saari kitaaben khisak jaati hain, shayad shelf bhi adjust ho — yeh reflow hai (ek change, bahut saari cheezein recompute). **Layout thrashing** matlab: ek kitaab rakho, phir poori shelf naap lo, phir doosri rakho, phir dobara naap lo… har baar poori shelf measure karna pagalpan hai. Smart tareeka: pehle saari naap lo (reads), phir saari rakho (writes) — shelf ek hi baar settle hogi.",
    syntax: {
      code: "// Layout-triggering reads (forced sync layout agar pending writes hon)\nel.offsetWidth; el.offsetHeight; el.offsetTop; el.offsetLeft;\nel.clientWidth; el.clientHeight; el.scrollTop; el.scrollHeight;\nel.getBoundingClientRect();\ngetComputedStyle(el).height;\nwindow.getComputedStyle(el);  // resolved geometric values",
      note: "In properties ko write ke turant baad read karna forced synchronous layout trigger karta hai.",
      lang: "js",
    },
    steps: [
      "Render Tree taiyaar hota hai (visible nodes + computed styles).",
      "Layout root se shuru hota hai aur tree ko top-down traverse karta hai.",
      "Har node ka **box model** (content/padding/border/margin) calculate hota hai.",
      "Position aur dimensions exact pixels mein resolve hote hain (%/flex/grid sab).",
      "Geometry change (write) tree ko 'dirty' mark karta hai — pending layout.",
      "Normally browser pending layout ko frame ke end mein ek baar batch karta hai.",
      "Agar write ke baad geometry read ho → **forced synchronous layout** abhi.",
      "Final geometry **Paint** phase ko di jaati hai. 🎨",
    ],
    internals: {
      p: "Blink mein layout LayoutObject tree pe chalta hai. Browser ek **dirty bit** system use karta hai — jab kuch geometry badle, affected LayoutObjects ko 'needs layout' mark kiya jaata hai, na ki turant recompute. Phir agle **BeginMainFrame** (frame scheduler) pe ek hi baar layout pass hota hai. Lekin agar JS beech mein geometry property padhe, browser ko consistency ke liye layout abhi flush karna padta hai — isiliye forced sync layout. Modern Blink **LayoutNG** use karta hai jo zyada predictable aur isolated layout deta hai (fragment-based).",
      code: "// requestAnimationFrame se writes ko frame ke saath align karo\nfunction animate() {\n  // saare reads (agar zaroori)\n  const top = box.getBoundingClientRect().top;\n  // saare writes\n  requestAnimationFrame(() => { box.style.transform = `translateY(${top + 1}px)`; });\n}\n// behtar: transform use karo jo layout hi trigger nahi karta",
      lang: "js",
    },
    process: {
      type: "boxes",
      items: [
        { label: "Render Tree", sub: "input", color: "#EF4444" },
        { label: "Box Model", sub: "content+pad+border+margin", color: "#F97316" },
        { label: "Position", sub: "x, y resolve", color: "#8B5CF6" },
        { label: "Dimensions", sub: "w, h pixels", color: "#06B6D4" },
        { label: "Geometry", sub: "→ Paint", color: "#22C55E" },
      ],
    },
    visual: {
      type: "timeline",
      items: [
        { year: "1", text: "Geometry change hoti hai (DOM/style/resize)." },
        { year: "2", text: "Affected nodes 'needs layout' mark hote hain (dirty)." },
        { year: "3", text: "Frame scheduler agla frame plan karta hai." },
        { year: "4", text: "Layout pass: box model + positions compute." },
        { year: "5", text: "Forced sync layout agar JS geometry padhe." },
        { year: "6", text: "Final geometry Paint ko di jaati hai. 🎨" },
      ],
    },
    memory:
      "Layout khud naya memory zyada nahi banata — woh existing LayoutObjects ki geometry update karta hai. Par bada/deep layout tree zyada memory + zyada layout time. Layout results (geometry) cache hote hain jab tak invalidate na ho. Frequent reflows CPU-bound hain (memory se zyada), par detached layout subtrees aur baar-baar rebuild hone wale large trees indirectly memory pressure badha sakte hain.",
    browser:
      "DevTools → **Performance** panel record karo: purple **Layout** events dikhte hain, aur 'Forced reflow' warnings (yellow triangle) batati hain ki kahan tumne layout thrashing kiya. Hover karne par stack trace milti hai. **Rendering** tab → 'Layout Shift Regions' se CLS-causing reflows dikhte hain. Console mein bhi 'Forced reflow while executing JavaScript' warning aati hai.",
    notes: {
      concept: "Reflow = geometry recompute. Mehnga kyunki ek change cascade karta hai. 📐",
      tip: "Reads aur writes ko alag batch karo; transform/opacity se animate karo (layout trigger nahi).",
      warning: "Write ke turant baad offsetHeight/getBoundingClientRect read karna forced synchronous layout deta hai — loop mein = thrashing.",
      error: "Loop ke andar style write + geometry read mix karna page ko visibly slow/janky bana deta hai.",
    },
    compare: {
      headers: ["Property change", "Reflow?", "Repaint?", "Composite-only?"],
      rows: [
        ["width / height", "Haan", "Haan", "Nahi"],
        ["top / left (position)", "Haan", "Haan", "Nahi"],
        ["color / background", "Nahi", "Haan", "Nahi"],
        ["transform", "Nahi", "Nahi", "Haan ✅"],
        ["opacity", "Nahi", "Nahi", "Haan ✅"],
      ],
    },
    mistakes: [
      { bad: "Loop mein write phir read (offsetWidth) karna.", fix: "Pehle saare reads batch karo, phir saare writes — ek hi layout pass." },
      { bad: "Animation ke liye top/left/width animate karna.", fix: "transform: translate()/scale() use karo — layout hi trigger nahi hota, compositor pe chalta hai." },
      { bad: "Har item ko alag-alag DOM mein insert karna.", fix: "DocumentFragment se batch insert karo — ek reflow." },
      { bad: "getBoundingClientRect ko har scroll/mousemove pe call karna.", fix: "Cache karo ya IntersectionObserver/ResizeObserver use karo (passive, no forced layout)." },
    ],
    best: [
      "Reads aur writes ko separate phases mein batch karo (FastDOM pattern).",
      "Animations ke liye transform/opacity use karo, geometric properties nahi.",
      "Bulk DOM changes DocumentFragment ya offscreen element pe karo.",
      "CSS containment (contain: layout) se reflow scope isolate karo.",
      "Layout-triggering reads (offset*, getBoundingClientRect) ko minimize aur cache karo.",
      "Frequent updates ko requestAnimationFrame mein align karo.",
    ],
    performance:
      "⚡ Layout/reflow performance ka sabse important section hai. Reflow O(n) ya worse ho sakta hai (n = affected nodes). **Layout thrashing** — read/write interleave in a loop — har read forced sync layout deta hai, to 100 items ka loop 100 full layouts kar sakta hai (100x slow!). Golden rules: (1) reads batch, writes batch; (2) transform/opacity se animate (no layout); (3) bade trees pe contain/content-visibility lagao. Smooth 60fps ke liye main thread ko har frame 16.6ms mein free rakhna hai.",
    tricky: [
      {
        title: "Yeh code kitne layouts trigger karega?",
        code: "for (let i = 0; i < items.length; i++) {\n  items[i].style.height = \"100px\";       // write\n  console.log(items[i].offsetHeight);     // read -> forced layout!\n}",
        output: "items.length forced layouts (thrashing)",
        explain: "Har iteration mein write ke baad read aata hai. Read ko sahi value dene ke liye browser ko abhi layout flush karna padta hai. To N items = N forced synchronous layouts. Fix: pehle saari heights set karo (writes), phir saari offsetHeight padho (reads).",
        lang: "js",
      },
      {
        title: "transform vs top — kaun reflow karta hai?",
        code: "// Animation A\nel.style.left = x + \"px\";\n// Animation B\nel.style.transform = `translateX(${x}px)`;",
        output: "A: reflow+paint, B: composite only",
        explain: "`left` geometric property hai — har frame reflow + repaint. `transform` compositor thread pe handle hota hai, na layout na paint — sirf composite. Isliye B kahin smooth aur saste hai. Yeh animation performance ka core rule hai.",
        lang: "js",
      },
    ],
    interview: {
      beginner: [
        { q: "Layout (reflow) kya hai?", a: "Woh phase jisme browser har visible node ki exact geometry (position aur size) calculate karta hai box model ke hisaab se. Render Tree iska input hai." },
        { q: "Kaun se changes reflow trigger karte hain?", a: "Geometric changes: width/height, padding/margin, position (top/left), font-size, DOM add/remove, window resize. Color/background sirf repaint karte hain." },
      ],
      intermediate: [
        { q: "Forced synchronous layout kya hai?", a: "Jab tum DOM write ke turant baad geometry property (offsetHeight, getBoundingClientRect) padhte ho, browser ko sahi value dene ke liye abhi layout calculate karna padta hai — yeh forced sync layout hai." },
        { q: "Layout thrashing kaise rokte ho?", a: "Reads aur writes ko alag batch karo (saare reads pehle, saare writes baad mein). transform/opacity se animate karo jo layout trigger nahi karte. DocumentFragment se bulk insert karo." },
      ],
      advanced: [
        { q: "Browser reflow ko kaise optimize karta hai internally?", a: "Dirty-bit system se: changes turant recompute nahi hote, nodes 'needs layout' mark hote hain aur agle frame pe ek baar batch layout hota hai. JS jab geometry padhe to consistency ke liye layout flush hota hai. LayoutNG isolated, fragment-based layout deta hai." },
        { q: "transform geometric properties se kaise sasta hai?", a: "transform layout aur paint dono ko skip kar sakta hai agar element apni compositor layer pe ho — woh sirf composite step pe matrix transform apply karta hai GPU pe. width/top reflow + repaint dono force karte hain main thread pe." },
      ],
    },
    mcqs: [
      {
        q: "Kaun sa change reflow trigger NAHI karta?",
        options: ["width change", "transform change", "padding change", "DOM node insert"],
        answer: 1,
        explain: "transform layout trigger nahi karta — woh composite step pe handle hota hai.",
      },
      {
        q: "Layout thrashing ka best fix?",
        options: [
          "Sab setTimeout mein daalo",
          "Reads aur writes ko separate batch karo",
          "innerHTML use karo",
          "!important lagao",
        ],
        answer: 1,
        explain: "Reads batch + writes batch = ek layout pass, thrashing khatam.",
      },
    ],
    exercises: {
      easy: [
        "Ek loop banao jo write+read mix kare aur Performance panel mein 'Forced reflow' warning dekho.",
        "Wahi loop reads/writes batch karke fix karo aur layout count compare karo.",
      ],
      medium: [
        "Ek box ko left se aur ek ko transform se animate karke FPS/jank compare karo.",
        "DocumentFragment vs individual append ke reflow count measure karo (1000 items).",
      ],
      advanced: [
        "Ek FastDOM-style mini scheduler likho jo reads aur writes ko separate rAF phases mein run kare.",
        "contain: layout lagakar ek widget ke andar ke changes ka outside-layout impact measure karo.",
      ],
    },
    summary: [
      "Layout/reflow = har node ki exact geometry (position + size) compute.",
      "Geometric properties reflow karti hain; color/background sirf repaint.",
      "Forced sync layout: write ke baad geometry read karna.",
      "Layout thrashing: loop mein read/write interleave — super slow.",
      "Fix: reads batch, writes batch; transform/opacity se animate.",
      "containment + DocumentFragment se reflow scope/cost kam.",
    ],
    cheatsheet: [
      {
        h: "Layout-triggering reads",
        code: "offsetWidth/Height/Top/Left\nclientWidth/Height\nscrollTop/Height\ngetBoundingClientRect()\ngetComputedStyle(el).height",
      },
      {
        h: "Avoid thrashing",
        code: "// BAD\nwrite; read; write; read;\n// GOOD\nread; read;  // batch\nwrite; write; // batch\n// BEST: transform/opacity (no layout)",
      },
    ],
    projects: [
      "Smooth drag-and-drop jo transform use kare (no per-frame reflow).",
      "Virtual scroll list jo only visible rows layout kare.",
      "Performance audit tool jo forced reflows detect kare.",
      "Animation library wrapper jo geometric animates ko transform pe map kare.",
    ],
    advanced:
      "🚀 Senior level: Blink ka **LayoutNG** (next-gen layout) ek rewrite hai jo layout ko fragment-based aur more isolated banata hai — better containment aur fewer global reflows. Samjho ki layout main-thread pe chalta hai, isliye long layouts INP (Interaction to Next Paint) ko hurt karte hain. **CSS containment** (`contain: layout style paint size`) browser ko guarantee deta hai ki ek subtree independent hai — to uske bahar ka change usme reflow nahi karta aur vice-versa, jo bade apps pe massive win hai. Aur `content-visibility: auto` off-screen subtrees ka layout poora skip kar deta hai. Pro tip: animation ko hamesha **composited properties (transform/opacity)** pe rakho taaki main-thread layout/paint bilkul bypass ho jaaye.",
    quiz: [
      {
        q: "CSS contain: layout ka fayda?",
        options: [
          "Element hide karta hai",
          "Subtree ke layout ko isolate karta hai (bahar affect nahi)",
          "Specificity badhata hai",
          "Paint disable karta hai",
        ],
        answer: 1,
        explain: "Containment subtree ko independent declare karta hai, reflow scope chhota rehta hai.",
      },
      {
        q: "100 items ke loop mein write+read interleave karne se?",
        options: ["1 layout", "100 forced layouts", "0 layouts", "10 layouts"],
        answer: 1,
        explain: "Har read forced sync layout maangti hai — 100 items = ~100 layouts (thrashing).",
      },
    ],
    related: ["critical-rendering-path", "render-tree", "paint-repaint", "compositing", "rendering-performance", "frame-scheduler"],
  },

  // ─────────────────────────────────────────────────────────────────────────
  "paint-repaint": {
    overview:
      "**Paint** woh phase hai jisme browser layout ki geometry ko **actual pixels** mein convert karne ke liye **draw commands (paint records)** generate karta hai — colours, backgrounds, borders, text, shadows, images. 🎨 **Repaint** tab hota hai jab koi visual property (jaise color) badle bina geometry badle — to layout skip hota hai par paint dobara chalta hai. Paint layers mein hota hai, jise baad mein compositing combine karti hai.",
    why:
      "Paint/repaint samajhna performance ke liye zaroori hai. Bahut saari UI jank ka karan large paint areas aur frequent repaints hote hain. Interview mein puchhte hain: 'paint-only properties kaun si hain?', 'repaint kab hota hai vs reflow?', 'paint cost kaise kam karein?'. ⚡ Yeh layout aur compositing ke beech ka crucial link hai.",
    concept: [
      {
        h: "Paint = pixels ke draw commands",
        p: "Layout ke baad browser ke paas har node ka rectangle hai par actual coloured pixels nahi. Paint phase har node ke liye **paint records** (display list — ordered draw operations) banata hai: 'yahan red rectangle banao', 'yahan yeh text draw karo', 'yahan shadow lagao'. Yeh records baad mein rasterize hokar pixels ban-te hain.",
      },
      {
        h: "Repaint vs Reflow",
        p: "**Reflow** geometry change karta hai (mehnga, layout + paint). **Repaint** sirf visual appearance change karta hai bina geometry ke (sasta-ish, layout skip). Jaise `background-color` ya `color` change = repaint only. Par `width` change = reflow + repaint dono. Sabse sasta: composited properties (transform/opacity) jo na reflow na repaint karte.",
        code: "el.style.color = \"blue\";          // repaint only\nel.style.backgroundColor = \"yellow\"; // repaint only\nel.style.width = \"200px\";          // reflow + repaint\nel.style.transform = \"scale(1.1)\";  // na reflow na repaint (composite)",
        lang: "js",
      },
      {
        h: "Paint order aur stacking",
        p: "Paint ek specific order mein hota hai (CSS stacking contexts ke hisaab se): background → borders → children → … z-index, opacity, transform stacking context banate hain. Overlapping elements ke liye order matter karta hai. Galat stacking se elements galat layer pe paint ho sakte hain ya unnecessary repaints trigger ho sakte hain.",
      },
      {
        h: "Paint areas — chhota rakho",
        p: "Browser sirf 'dirty' (changed) region ko repaint karne ki koshish karta hai, par kabhi-kabhi pura layer repaint hota hai. Bada paint area = mehnga. DevTools 'Paint flashing' green se dikhata hai konsa area repaint hua. Goal: repaint areas chhote rakho aur frequently-animating cheezon ko apni layer pe daalo (composite).",
        code: "/* frequently changing element ko alag layer pe promote */\n.animating { will-change: transform; }\n/* taaki uska change baaki page ko repaint na kare */",
        lang: "css",
      },
      {
        h: "Paint-only vs layout-triggering properties",
        p: "Paint-only properties (layout skip): `color`, `background`, `background-color`, `border-color`, `box-shadow`, `visibility`, `outline`. Layout-triggering (reflow + paint): `width`, `height`, `margin`, `padding`, `top/left`, `font-size`, `display`. Composite-only (na layout na paint): `transform`, `opacity`. Yeh teen buckets yaad rakho!",
      },
    ],
    analogy:
      "Socho ek **colouring book**. 📓 Layout = pencil se outlines aur har shape ki exact jagah banana (geometry). Paint = un shapes ke andar actual rang bharna (colours, shading, texture). **Repaint** = ek shape ka rang badalna (lal se neela) bina uski outline/jagah badle — bas us shape ko dobara colour karo, baaki sab waisa hi. **Reflow** = poora layout dobara banana kyunki ek shape bada ho gaya, ab baaki shapes khisak gaye — phir unhe dobara colour bhi karna padega. Sabse smart: transparent sheet (layer) pe ek cheez banao jise tum slide/fade kar sako bina dobara colour kiye (compositing).",
    syntax: {
      code: "// Paint cost minimize karne ke patterns\n// 1. Paint-only properties prefer karo color changes ke liye\nel.style.backgroundColor = \"#222\";   // repaint only\n\n// 2. Frequently animating ko layer pe promote karo\n// CSS: .box { will-change: transform; }\n\n// 3. Animation transform/opacity se (no paint)\nel.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300 });",
      note: "will-change ko zaroorat ke time hi lagao; hamesha rakhna memory waste karta hai.",
      lang: "js",
    },
    steps: [
      "Layout phase har node ki final geometry deta hai.",
      "Paint phase har node ke liye **paint records** (display list) banata hai.",
      "Records order mein hote hain (stacking contexts/z-index ke hisaab se).",
      "Background, borders, text, shadows, images sab ke draw commands generate hote hain.",
      "Content ko **layers** mein assign kiya jaata hai (kuch elements apni layer paate hain).",
      "Visual property change (color) → sirf affected area ka **repaint**.",
      "Paint records **rasterization** ke liye taiyaar hote hain (composite phase).",
      "Rasterized tiles GPU pe composite hokar screen par aate hain. 🖼️",
    ],
    internals: {
      p: "Blink mein paint Render Tree (LayoutObject tree) aur **paint property trees** se 'display lists' (paint records) generate karta hai — yeh actual draw operations ki ordered list hai (Skia, Chrome ka 2D graphics library, in commands ko execute karta hai). Yeh records phir **raster** hote hain (tiles mein, often compositor/raster threads pe) pixels banane ke liye. RenderingNG mein paint aur raster decouple hain. Sirf 'dirty' (invalidated) paint regions dobara record/raster hote hain. will-change ya certain properties element ko apni **compositing layer** dete hain taaki uska repaint baaki page ko affect na kare.",
      code: "// Mental model\n// LayoutObject + paint property tree -> display list (Skia commands)\n//   e.g. drawRect, drawText, drawImage\n// display list -> rasterize -> bitmap tiles\n// tiles -> compositor -> GPU -> screen\n// color change: sirf affected display list + raster dobara",
      lang: "js",
    },
    process: {
      type: "boxes",
      items: [
        { label: "Layout geometry", sub: "input", color: "#EF4444" },
        { label: "Paint records", sub: "display list", color: "#F97316" },
        { label: "Layers", sub: "assignment", color: "#8B5CF6" },
        { label: "Rasterize", sub: "tiles → bitmap", color: "#06B6D4" },
        { label: "Pixels", sub: "→ composite", color: "#22C55E" },
      ],
    },
    visual: {
      type: "timeline",
      items: [
        { year: "1", text: "Layout se final geometry milti hai." },
        { year: "2", text: "Paint records (display list) generate hote hain." },
        { year: "3", text: "Content layers mein assign hota hai." },
        { year: "4", text: "Color change -> sirf affected area repaint." },
        { year: "5", text: "Display list rasterize hoke tiles banti hain." },
        { year: "6", text: "Tiles composite hoke screen par. 🖼️" },
      ],
    },
    memory:
      "Paint records (display lists) aur rasterized tiles (bitmaps) memory mein rehte hain. Bade paint areas aur bahut saari layers = zyada GPU/system memory. Har compositing layer apna backing store (texture/bitmap) rakhta hai — **layer explosion** (too many will-change/layers) memory ko bahut badha deta hai. Iseliye will-change sirf zaroorat ke time lagao. Rasterized tiles ko browser cache karta hai jab tak content invalidate na ho.",
    browser:
      "DevTools → **Rendering** tab → 'Paint flashing' on karo: jo bhi area repaint hota hai green flash karta hai — overpainting easily spot ho jaata hai. **Layer borders** option layers dikhata hai. **Performance** panel mein green 'Paint' aur 'Rasterize' events dikhte hain. **Layers** panel (3-dot menu) har compositing layer aur uska memory dikhata hai.",
    notes: {
      concept: "Paint = pixels ke draw commands. Repaint = visual change bina geometry. 🎨",
      tip: "Frequently-animating element ko will-change: transform se apni layer do — uska change baaki page ko repaint nahi karega.",
      warning: "box-shadow, border-radius, filters paint ko mehnga banate hain — large areas pe inhe avoid/optimize karo.",
      error: "will-change ko sab elements pe permanently lagana layer explosion + memory blowup deta hai.",
    },
    compare: {
      headers: ["Property", "Reflow", "Repaint", "Composite-only"],
      rows: [
        ["color / background-color", "Nahi", "Haan", "Nahi"],
        ["box-shadow / border-color", "Nahi", "Haan", "Nahi"],
        ["width / height / top", "Haan", "Haan", "Nahi"],
        ["transform", "Nahi", "Nahi", "Haan ✅"],
        ["opacity", "Nahi", "Nahi", "Haan ✅"],
      ],
    },
    mistakes: [
      { bad: "Animation ke liye background-position/color animate karna har frame.", fix: "transform/opacity use karo — paint hi skip ho jaata hai." },
      { bad: "Bade area pe heavy box-shadow/filter animate karna.", fix: "Inhe avoid karo ya chhote, static layers pe rakho; transform-based effects use karo." },
      { bad: "will-change ko har element pe hamesha lagana.", fix: "Sirf animation se thodi der pehle lagao aur baad mein hatao (layer explosion se bacho)." },
      { bad: "Pura page ka repaint trigger karna ek chhote change se.", fix: "Changing element ko alag layer pe rakho aur paint area chhota karo." },
    ],
    best: [
      "Color/visual changes ke liye paint-only properties use karo.",
      "Animations transform/opacity pe rakho (paint bhi skip).",
      "Frequently-changing elements ko will-change se layer pe promote karo (judiciously).",
      "Paint areas chhote rakho — DevTools Paint flashing se verify karo.",
      "Expensive paint (shadows, filters, large gradients) ko minimize karo.",
      "will-change ko temporarily lagao, permanently nahi.",
    ],
    performance:
      "⚡ Paint cost layer ke size aur complexity pe depend karta hai. Bade paint areas (full-screen backgrounds) aur expensive effects (box-shadow, blur filters, large border-radius) paint ko slow karte hain. Frequent repaints (har frame) jank dete hain. Optimization: (1) animation ko transform/opacity pe le jao (paint hi nahi hota), (2) changing content ko apni layer do (uska repaint isolate ho), (3) paint areas chhote rakho. Rule: 'paint-only' < 'reflow+paint', par 'composite-only' (transform/opacity) sabse sasta hai.",
    tricky: [
      {
        title: "color change reflow karta hai?",
        code: "el.style.color = \"red\";\n// kya layout dobara hoga?",
        output: "Nahi — sirf repaint",
        explain: "color ek paint-only property hai. Text ka size/position nahi badalta, sirf uska colour. Isliye layout skip hota hai aur sirf affected area repaint hota hai. Yeh reflow se sasta hai par composite-only (transform) se mehnga.",
        lang: "js",
      },
      {
        title: "transform se paint kyun skip hota hai?",
        code: ".box { will-change: transform; }\n// box.style.transform = 'translateX(100px)'",
        output: "Na reflow, na repaint — sirf composite",
        explain: "Agar element apni compositing layer pe hai (will-change se promote), to transform sirf compositor thread pe ek matrix transform hai GPU pe — content pehle se rasterized hai, dobara paint karne ki zaroorat hi nahi. Isliye yeh sabse smooth/sasta animation hai.",
        lang: "css",
      },
    ],
    interview: {
      beginner: [
        { q: "Paint phase kya karta hai?", a: "Layout ki geometry ko actual pixels ke draw commands (paint records / display list) mein convert karta hai — colours, text, borders, shadows, images." },
        { q: "Repaint aur reflow mein farak?", a: "Reflow geometry change karta hai (layout + paint). Repaint sirf visual appearance (color/background) change karta hai bina geometry ke — layout skip hota hai." },
      ],
      intermediate: [
        { q: "Kaun si properties paint-only hain?", a: "color, background-color, border-color, box-shadow, outline, visibility — yeh layout trigger nahi karti, sirf repaint." },
        { q: "Paint cost kaise kam karein?", a: "Animations transform/opacity pe le jao (paint skip), changing elements ko alag layer do, paint areas chhote rakho, aur expensive effects (shadows/filters) minimize karo." },
      ],
      advanced: [
        { q: "Display list / paint records kya hain?", a: "Paint phase ka output — ordered draw operations ki list (Skia commands jaise drawRect/drawText) jo rasterize hokar bitmap tiles banti hai. Sirf dirty regions dobara record/raster hote hain." },
        { q: "will-change layer promotion kaise paint ko affect karta hai?", a: "Element apni compositing layer paata hai, to uska transform/opacity change baaki page ko repaint nahi karta — sirf compositor pe handle hota hai. Par har jagah lagana layer explosion + memory blowup deta hai." },
      ],
    },
    mcqs: [
      {
        q: "Kaun sa change reflow NAHI karta par repaint karta hai?",
        options: ["width change", "color change", "transform change", "DOM insert"],
        answer: 1,
        explain: "color paint-only hai — repaint hota hai par reflow nahi.",
      },
      {
        q: "Sabse sasta animation property?",
        options: ["left", "width", "transform", "margin"],
        answer: 2,
        explain: "transform composite-only hai — na reflow na repaint, GPU pe handle.",
      },
    ],
    exercises: {
      easy: [
        "Paint flashing on karke color change vs width change ka paint area compare karo.",
        "Ek element ko transform se aur ek ko left se animate karke paint events compare karo.",
      ],
      medium: [
        "will-change: transform lagakar dekho ki ek element ki layer ban jaati hai (Layers panel).",
        "Ek heavy box-shadow animate karke paint cost measure karo, phir transform-based alternative banao.",
      ],
      advanced: [
        "DevTools Layers panel se layer count aur memory analyze karke layer explosion identify karo.",
        "Ek paint-heavy component ko optimize karo: animation transform pe, area chhota, will-change temporary.",
      ],
    },
    summary: [
      "Paint = geometry se pixel draw commands (display list / paint records).",
      "Repaint = visual change (color/background) bina geometry — layout skip.",
      "Paint-only: color, background, border-color, box-shadow.",
      "transform/opacity composite-only — paint bhi skip karte hain.",
      "Paint areas chhote rakho; changing content ko alag layer do.",
      "Expensive effects (shadows/filters) paint ko mehnga banate hain.",
    ],
    cheatsheet: [
      {
        h: "Property buckets",
        code: "composite-only: transform, opacity\npaint-only:     color, background, box-shadow,\n                border-color, visibility\nreflow+paint:   width, height, margin, padding,\n                top, left, font-size, display",
      },
      {
        h: "Reduce paint",
        code: ".animate { will-change: transform; } // temp layer\n// animate via transform/opacity\n// DevTools -> Rendering -> Paint flashing\n// keep dirty regions small",
      },
    ],
    projects: [
      "Smooth toggle/switch jo transform+opacity use kare (no repaint jank).",
      "Theme switcher jo paint-only properties se instant color flip kare.",
      "Particle animation jo composited layers pe chale (GPU).",
      "Paint-cost audit tool jo overpainting regions highlight kare.",
    ],
    advanced:
      "🚀 Senior level: Chrome ka paint pipeline **Skia** (2D graphics) pe bana hai aur RenderingNG mein paint → raster → composite cleanly decouple hain. Paint property trees (transform/clip/effect/scroll trees) browser ko allow karte hain ki woh transform/opacity/scroll ko paint dobara kiye bina handle kare — yeh hi reason hai ki composited animations buttery smooth hain. Raster aksar alag threads pe (compositor/raster workers) hota hai taaki main thread free rahe. Pro insight: paint invalidation ko chhota rakhna (small dirty rects) aur layer count ko control mein rakhna (avoid layer explosion) dono balance karne padte hain — har layer extra memory leta hai par paint isolation deta hai.",
    quiz: [
      {
        q: "Chrome paint ke liye kaun si graphics library use karta hai?",
        options: ["OpenGL only", "Skia", "Cairo", "WebGL"],
        answer: 1,
        explain: "Skia Chrome ki 2D graphics library hai jo paint/raster commands execute karti hai.",
      },
      {
        q: "Composited animation smooth kyun hoti hai?",
        options: [
          "Woh main thread pe layout karti hai",
          "Paint property trees se transform/opacity bina repaint handle hote hain",
          "Woh CSS specificity badhati hai",
          "Woh DOM ko hata deti hai",
        ],
        answer: 1,
        explain: "Pre-rasterized layer pe sirf transform/opacity apply hoti hai — paint/layout skip, GPU pe smooth.",
      },
    ],
    related: ["critical-rendering-path", "render-tree", "layout-reflow", "compositing", "rendering-performance", "compositor-raster"],
  },

  // ─────────────────────────────────────────────────────────────────────────
  "compositing": {
    overview:
      "**Compositing** rendering pipeline ka aakhri phase hai jisme browser alag-alag **layers** (jo separately paint/raster hue hain) ko sahi order mein combine karke final image banata hai jo screen par dikhta hai. 🖼️ Yeh mostly **GPU** pe aur **compositor thread** pe hota hai — main thread se alag. Isiliye `transform` aur `opacity` animations **buttery smooth** hote hain: woh compositor pe chalte hain bina main thread (layout/paint) ko chhue.",
    why:
      "Compositing samajhna 60fps smooth UI banane ki key hai. Interview mein puchhte hain: 'transform/opacity animations smooth kyun hote hain?', 'GPU acceleration kya hai?', 'will-change kab use karein?', 'layer explosion kya hai?'. Senior frontend roles ke liye yeh distinguishing knowledge hai — jo log compositing samajhte hain woh genuinely fast UIs banate hain. ⚡",
    concept: [
      {
        h: "Layers aur compositing",
        p: "Browser page ko ek ya zyada **compositing layers** mein todta hai (har layer ek separate bitmap/texture). Layout aur paint ke baad, in layers ko **compositor thread** GPU ki madad se combine (composite) karta hai. Agar ek layer ka sirf position/opacity badle, to baaki layers ko dobara paint karne ki zaroorat nahi — sirf composite dobara, jo bahut sasta hai.",
      },
      {
        h: "Compositor thread — main thread se alag",
        p: "Chrome mein ek dedicated **compositor thread** hota hai jo layers ko combine karta hai aur scrolling/composited animations handle karta hai. Yeh main thread se independent chalti hai. Iseliye agar main thread busy ho (heavy JS), tab bhi composited animation (transform/opacity) aur scroll smooth reh sakte hain — woh compositor thread pe chal rahe hain. 🧵",
      },
      {
        h: "transform aur opacity — compositor pe",
        p: "`transform` (translate/scale/rotate) aur `opacity` woh special properties hain jo **compositor thread pe** handle ho sakti hain bina layout ya paint ke. Woh pre-rasterized layer pe sirf GPU matrix transform / alpha apply karti hain. Isiliye inse animate karna sabse sasta aur smooth hai. Doosri properties (left, width, color) main thread pe layout/paint maangti hain.",
        code: ".smooth {\n  transition: transform 0.3s, opacity 0.3s;\n}\n.smooth:hover {\n  transform: translateY(-4px) scale(1.02); /* compositor */\n  opacity: 0.9;                            /* compositor */\n}",
        lang: "css",
      },
      {
        h: "Layer promotion — will-change",
        p: "Tum browser ko hint de sakte ho ki ek element apni layer pe daal de via `will-change: transform` (ya `transform: translateZ(0)` ka purana hack). Isse element pehle se apni layer pe rasterize ho jaata hai, to animation start karte waqt layer banane ka lag nahi aata. Par yeh judiciously karo — har layer GPU memory leti hai.",
        code: ".animating { will-change: transform; }\n/* purana hack (avoid in new code): */\n.legacy { transform: translateZ(0); }",
        lang: "css",
      },
      {
        h: "Layer explosion — over-promotion ka khatra",
        p: "Agar tum bahut saare elements ko will-change/translateZ se layers bana do, to **layer explosion** ho jaata hai: har layer apna backing memory leta hai aur compositor ko zyada layers manage karne padte hain — performance ULTA kharaab ho jaati hai aur GPU memory blow ho jaati hai. Rule: sirf un cheezon ko promote karo jo genuinely animate ho rahi hain.",
      },
    ],
    analogy:
      "Socho ek **cartoon animation studio** purane zamaane ka. 🎬 Har layer = ek transparent acetate sheet. Background ek sheet pe (pahaad, aasmaan) — woh nahi badalta. Character doosri sheet pe. Ab character ko chalane ke liye animator sirf character wali sheet ko slide karta hai (transform) — background sheet ko dobara banane ki zaroorat hi nahi! Camera (compositor/GPU) saari sheets ko upar-neeche rakhke ek final frame shoot karta hai. Yeh exactly compositing hai: alag layers, ek combine karke final image. Agar har chhoti cheez ke liye nayi sheet banao (layer explosion), to studio mein sheets ka dher lag jaayega aur kaam slow ho jaayega.",
    syntax: {
      code: "// Smooth, GPU-accelerated animation (compositor pe)\nel.animate(\n  [{ transform: \"translateX(0)\" }, { transform: \"translateX(200px)\" }],\n  { duration: 400, easing: \"ease-out\" }\n);\n\n// Layer promote (animation se pehle), phir hatao\nel.style.willChange = \"transform\";\n// ... animation ...\nel.addEventListener(\"transitionend\", () => { el.style.willChange = \"auto\"; });",
      note: "will-change animation ke baad 'auto' kar do taaki layer release ho aur memory free ho.",
      lang: "js",
    },
    steps: [
      "Paint phase har layer ke liye paint records (display list) deta hai.",
      "Browser content ko **compositing layers** mein todta hai (promotion criteria ke hisaab se).",
      "Har layer alag-alag **rasterize** hoti hai (tiles → bitmaps), often raster threads pe.",
      "Rasterized tiles **GPU** par upload hoti hain (textures).",
      "**Compositor thread** layers ko sahi order/position/opacity ke saath combine karta hai.",
      "transform/opacity change → sirf composite dobara (no layout/paint).",
      "Final composited frame **screen** par display hota hai.",
      "Scroll bhi compositor pe handle hota hai (smooth, main-thread-independent). 🧵",
    ],
    internals: {
      p: "Chrome mein compositing **compositor thread** (CC — Chromium Compositor) aur **GPU process** handle karte hain. Render process main thread paint records banata hai, phir compositor thread layers ko tiles mein todke (raster worker threads pe) rasterize karta hai, aur GPU process pe textures upload karke composite karta hai (via the display compositor). Composited properties (transform/opacity/scroll) ko compositor **bina main thread ko involve kiye** apply kar sakta hai — yeh RenderingNG ka 'property trees' design enable karta hai. Layer promotion ke triggers: 3D transform, will-change: transform/opacity, video/canvas, position:fixed (kabhi), animating transform/opacity, etc.",
      code: "// Threads ka mental model\n// Main thread:       JS, style, layout, paint records\n// Compositor thread: layerize, tiling, scroll, composited anim\n// Raster threads:    tiles -> bitmaps\n// GPU process:       textures, final composite -> screen\n// transform/opacity -> compositor handle, main thread free",
      lang: "js",
    },
    process: {
      type: "boxes",
      items: [
        { label: "Paint records", sub: "per layer", color: "#EF4444" },
        { label: "Layerize", sub: "split layers", color: "#F97316" },
        { label: "Rasterize", sub: "tiles → bitmap", color: "#8B5CF6" },
        { label: "GPU upload", sub: "textures", color: "#06B6D4" },
        { label: "Composite", sub: "combine → screen", color: "#22C55E" },
      ],
    },
    visual: {
      type: "timeline",
      items: [
        { year: "1", text: "Paint records taiyaar hote hain (per layer)." },
        { year: "2", text: "Content compositing layers mein split hota hai." },
        { year: "3", text: "Layers rasterize hokar tiles/bitmaps banti hain." },
        { year: "4", text: "Tiles GPU pe textures ke roop mein upload." },
        { year: "5", text: "Compositor thread layers combine karta hai." },
        { year: "6", text: "Final frame screen par — transform/opacity smooth. 🖼️" },
      ],
    },
    memory:
      "Har compositing layer apna **backing store** (GPU texture / bitmap) rakhta hai — yeh memory mehngi hoti hai, especially bade ya high-DPI layers ke liye. **Layer explosion** (too many layers) GPU memory ko balloon kar deta hai aur compositing ko slow karta hai. Iseliye will-change ko zaroorat ke time hi lagao aur baad mein 'auto' karo taaki backing store release ho. DevTools Layers panel har layer ki memory dikhata hai — usse audit karo.",
    browser:
      "DevTools → **Layers** panel (3-dot → More tools) saari compositing layers 3D mein dikhata hai, har layer ka memory aur 'compositing reason' (kyun promote hui). **Rendering** tab → 'Layer borders' on karke layers screen pe dikhao. Performance panel mein green 'Composite Layers' events dikhte hain. Agar layer count high hai → layer explosion ka sign.",
    notes: {
      concept: "Compositing = layers ko GPU pe combine. transform/opacity compositor pe = smooth. 🖼️",
      tip: "Smooth animations ke liye sirf transform aur opacity animate karo — compositor handle karta hai, main thread free.",
      warning: "will-change ko har jagah mat lagao — layer explosion GPU memory blow karke ULTA slow kar deta hai.",
      error: "transform: translateZ(0) ko 'magic perf fix' samajhke har element pe lagana memory waste + slowdown deta hai.",
    },
    compare: {
      headers: ["Aspect", "Main thread props", "Composited props (transform/opacity)"],
      rows: [
        ["Layout trigger?", "Haan (geometric)", "Nahi"],
        ["Paint trigger?", "Haan", "Nahi"],
        ["Thread", "Main thread", "Compositor thread / GPU"],
        ["Smoothness", "Jank if main busy", "Smooth even if main busy"],
        ["Example", "left, width, color", "transform, opacity"],
      ],
    },
    mistakes: [
      { bad: "Animation ke liye left/top/width animate karna.", fix: "transform: translate()/scale() use karo — compositor pe smooth chalega." },
      { bad: "Har element pe will-change: transform lagana.", fix: "Sirf actively animating elements pe lagao; baad mein 'auto' karo (layer explosion se bacho)." },
      { bad: "translateZ(0) hack har jagah daalna performance ke naam pe.", fix: "Measure karo; bina zaroorat layer banana memory waste hai." },
      { bad: "will-change permanently rehne dena.", fix: "Animation end pe will-change hatao taaki GPU backing store free ho." },
    ],
    best: [
      "Animations sirf transform aur opacity pe rakho (compositor-friendly).",
      "will-change animation se thodi der pehle lagao, baad mein 'auto' karo.",
      "Layer count monitor karo (DevTools Layers panel) — explosion se bacho.",
      "Scroll-heavy UI mein composited (passive) scrolling rely karo.",
      "High-DPI bade layers se bacho (GPU memory).",
      "Measure-driven raho — promotion blindly mat karo, profile karke decide karo.",
    ],
    performance:
      "⚡ Compositing 60fps ka raaz hai. transform/opacity animations compositor thread pe chalte hain — main thread chahe heavy JS se busy ho, animation/scroll smooth rehte hain. Layout/paint-triggering animations (left/width/color) main thread pe chalte hain — busy hone par jank. **Balance**: layers paint isolation + GPU offload dete hain (acche), par har layer memory + compositing overhead leta hai (layer explosion = bura). Golden rule: minimum layers, sirf transform/opacity animate, will-change temporary.",
    tricky: [
      {
        title: "Animation smooth kyun rahi jab main thread busy tha?",
        code: "// main thread blocked\nwhile (Date.now() < end) {}  // 2s block\n// par CSS transform animation chalti rahi!",
        output: "transform animation smooth chali",
        explain: "Agar animation transform/opacity pe ho aur element apni compositing layer pe ho, to woh **compositor thread** pe chalti hai — main thread block hone se uspe farak nahi padta. Agar animation left/width pe hoti, woh main thread pe ruk jaati (jank).",
        lang: "js",
      },
      {
        title: "will-change har jagah lagana kyun bura hai?",
        code: ".item { will-change: transform; } /* 1000 items pe */",
        output: "Layer explosion, memory blowup, slowdown",
        explain: "Har element ko alag layer + GPU backing store mil jaata hai. 1000 layers = huge GPU memory + compositing overhead. Performance ULTA gir jaati hai. will-change ek hint hai, magic nahi — sirf genuinely animating elements pe use karo.",
        lang: "css",
      },
    ],
    interview: {
      beginner: [
        { q: "Compositing kya hai?", a: "Rendering ka aakhri phase jisme alag-alag paint layers ko GPU/compositor thread combine karke final screen image banata hai." },
        { q: "Kaun si properties compositor pe chalti hain?", a: "transform aur opacity — yeh layout aur paint ke bina compositor thread pe handle ho sakti hain, isliye smooth animations deti hain." },
      ],
      intermediate: [
        { q: "transform animation smooth kyun hoti hai?", a: "Woh compositor thread pe chalti hai (main thread se alag) aur GPU pe pre-rasterized layer pe sirf matrix transform apply hota hai — na layout na paint, isliye main thread busy hone par bhi smooth." },
        { q: "will-change kya karta hai aur kab use karein?", a: "Browser ko hint deta hai ki element animate hoga, to woh pehle se apni layer pe rasterize ho jaata hai. Use sirf actively animating elements pe karo aur baad mein 'auto' set karo." },
      ],
      advanced: [
        { q: "Layer explosion kya hai aur kyun problem hai?", a: "Bahut saare elements ko layers banana (over will-change/translateZ). Har layer GPU backing store leta hai aur compositing overhead badhaata hai — memory blow + performance degrade. Minimum layers rakho." },
        { q: "Compositor thread ka role kya hai RenderingNG mein?", a: "Woh layerize/tiling/raster orchestrate karta hai, scrolling aur composited animations (transform/opacity) ko main thread ke bina handle karta hai via property trees, aur GPU process ke saath final frame composite karta hai." },
      ],
    },
    mcqs: [
      {
        q: "Compositor thread pe kaun si animation smooth chalegi even if main thread busy?",
        options: ["left animation", "width animation", "transform animation", "margin animation"],
        answer: 2,
        explain: "transform compositor pe chalta hai — main thread busy hone par bhi smooth.",
      },
      {
        q: "Layer explosion ka result?",
        options: [
          "Hamesha tezz performance",
          "GPU memory blowup aur slowdown",
          "Better SEO",
          "Specificity badhna",
        ],
        answer: 1,
        explain: "Bahut saare layers GPU memory aur compositing overhead badhate hain — performance ulta gir jaati hai.",
      },
    ],
    exercises: {
      easy: [
        "Ek element ko transform se animate karo aur Layers panel mein uski layer dekho.",
        "left vs transform animation ko main-thread block ke saath compare karo (kaun smooth rehta hai).",
      ],
      medium: [
        "will-change: transform lagakar aur hatakar Layers panel mein memory difference observe karo.",
        "Ek scroll-linked effect transform se banao taaki woh compositor pe smooth chale.",
      ],
      advanced: [
        "DevTools Layers panel se ek page ka layer count audit karke layer explosion fix karo.",
        "Ek complex card animation banao jo sirf transform/opacity use kare aur 60fps maintain kare under load.",
      ],
    },
    summary: [
      "Compositing = layers ko GPU/compositor thread pe combine karna (final phase).",
      "Compositor thread main thread se alag — composited anim/scroll smooth.",
      "transform aur opacity compositor pe handle — sabse sasta, smooth.",
      "will-change se layer promote karo, par temporarily (memory).",
      "Layer explosion: too many layers = GPU memory + overhead = slow.",
      "Smooth 60fps UI ka raaz: minimum layers + transform/opacity animate.",
    ],
    cheatsheet: [
      {
        h: "Composited props",
        code: "transform  -> compositor (no layout/paint)\nopacity    -> compositor (no layout/paint)\n// Layer promotion triggers:\nwill-change: transform/opacity\n3D transform, <video>, <canvas>, animating",
      },
      {
        h: "will-change usage",
        code: "// before animation\nel.style.willChange = 'transform';\n// after animation\nel.style.willChange = 'auto'; // free layer\n// avoid: permanent / on many elements",
      },
    ],
    projects: [
      "60fps card hover/parallax effect using only transform/opacity.",
      "Smooth mobile-style drawer/bottom-sheet on compositor thread.",
      "Scroll-driven animation jo compositor pe chale (no main-thread jank).",
      "Layer audit dashboard jo page ke compositing layers + memory dikhaye.",
    ],
    advanced:
      "🚀 Senior level: Chrome ka **RenderingNG** architecture compositing ko **property trees** (transform, clip, effect, scroll) pe build karta hai — yeh decouple karta hai ki content kaha paint hua vs woh screen pe kaha/kaise dikhega. Iseliye compositor transform/opacity/scroll ko bina render process ke main thread ko chhue apply kar sakta hai. Threaded scrolling, **off-main-thread (compositor) animations**, aur GPU rasterization sab issi se aate hain. Pro insight: 'GPU acceleration' free lunch nahi — har layer GPU memory leta hai aur texture upload bhi cost rakhta hai; isliye senior engineers profile karke decide karte hain ki kaun se elements promote karne hain. Aur jab koi non-composited property (jaise box-shadow) ek composited layer mein animate hoti hai, woh layer ko har frame dobara raster karwa sakti hai — yeh chhupa hua perf killer hai.",
    quiz: [
      {
        q: "RenderingNG mein compositing kis structure pe based hai?",
        options: ["DOM tree only", "Property trees (transform/clip/effect/scroll)", "CSSOM only", "Event loop"],
        answer: 1,
        explain: "Property trees compositor ko transform/opacity/scroll independently apply karne dete hain.",
      },
      {
        q: "Composited layer mein box-shadow animate karne ka khatra?",
        options: [
          "Kuch nahi hota",
          "Layer har frame dobara raster ho sakti hai (perf killer)",
          "Specificity badhti hai",
          "DOM hat jaata hai",
        ],
        answer: 1,
        explain: "box-shadow paint-affecting hai — usse animate karna layer ko re-raster karwa sakta hai, smoothness khatam.",
      },
    ],
    related: ["critical-rendering-path", "render-tree", "layout-reflow", "paint-repaint", "rendering-performance", "compositor-raster"],
  },
}
