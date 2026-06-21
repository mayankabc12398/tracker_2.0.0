// Browser Internals content — Part 1: Browser basics, architecture, processes, networking stack

export const browserContentA = {
  'what-is-browser': {
    overview:
      'Browser ek **software application** hai jo internet se web pages (HTML, CSS, JS) laata hai aur unhe aapki screen par **render** (draw) karta hai. Aap URL type karte ho, browser server se data maangta hai, response ko parse karke ek sundar visual page bana deta hai. Chrome, Firefox, Safari, Edge — sab browsers hain. 🌐',
    why:
      'Frontend developer ke liye browser hi **runtime environment** hai — aapka HTML/CSS/JS yahin chalता hai. Interview mein "browser kaise kaam karta hai" ek classic question hai (Google, Amazon, etc.). Agar browser ka internal samajh aa gaya to performance, debugging aur security sab clear ho jaata hai.',
    concept: [
      { h: 'Browser ka asli kaam', p: 'Browser ka primary kaam hai: user ne jo resource maanga (URL), use server se **fetch** karna aur browser window mein **display** karna. Resource HTML page, PDF, image, video — kuch bhi ho sakta hai. Location URI (Uniform Resource Identifier) se decide hota hai.' },
      { h: 'Browser ke types', p: '**Chrome** (Google, Blink engine), **Edge** (Microsoft, ab Blink/Chromium), **Firefox** (Mozilla, Gecko engine), **Safari** (Apple, WebKit engine), **Opera/Brave** (Chromium based). Market share mein Chrome/Chromium-based browsers sabse aage hain.' },
      { h: 'Browser engine vs rendering engine', p: '**Browser engine** ek umbrella term hai jo UI aur rendering ko coordinate karta hai. **Rendering engine** (jaise Blink, WebKit, Gecko) actual mein HTML/CSS ko pixels mein convert karta hai. **JS engine** (V8, SpiderMonkey) JavaScript ko execute karta hai — yeh alag component hai.' },
      { h: 'Standards aur compatibility', p: 'Browsers **W3C** aur **WHATWG** ke standards follow karte hain taaki ek hi website har browser mein same chale. Real life mein chhote-mote differences rehte hain — isliye developers "cross-browser testing" karte hain.' },
    ],
    analogy:
      'Browser ek **restaurant waiter** ki tarah hai. 🍽️ Aap (user) menu se dish ka naam (URL) bolte ho. Waiter kitchen (server) tak order le jaata hai, dish (HTML/CSS/JS) wapas laata hai, aur use plate par achhe se saja kar (render) aapke saamne rakhता hai. Aapko kitchen ka jhanjhat nahi dekhna padता.',
    syntax: {
      code: `// Browser hi global "window" object deta hai\nconsole.log(window.location.href)   // current URL\nconsole.log(navigator.userAgent)    // browser ki identity\nconsole.log(window.innerWidth)      // viewport width\n\n// Browser-provided APIs\nfetch('/api/data')                  // networking\nlocalStorage.setItem('k', 'v')      // storage`,
      note: 'window, document, navigator, fetch — yeh sab browser ke diye gaye objects/APIs hain, JS language ka part nahi.',
      lang: 'js',
    },
    steps: [
      'User browser kholता hai aur URL type karta hai (ya link click).',
      'Browser URL ko parse karta hai — protocol, host, path nikalता hai.',
      'Network ke through server se resource fetch hota hai.',
      'Rendering engine HTML/CSS ko parse karta hai.',
      'JS engine JavaScript execute karta hai.',
      'Final page screen par paint ho jaata hai.',
    ],
    internals:
      'Modern browser ek **multi-process** application hai. Ek "Browser process" overall control rakhता hai (address bar, tabs, bookmarks), jabki har tab/site ke liye alag "Renderer process" hota hai jo HTML/CSS/JS handle karता hai. Ek GPU process drawing accelerate karता hai. Isse ek tab crash ho to baaki browser zinda rehता hai. 🧠',
    process: {
      type: 'boxes',
      items: [
        { label: 'URL', sub: 'User input', color: '#F97316' },
        { label: 'Fetch', sub: 'Network se data', color: '#3B82F6' },
        { label: 'Parse', sub: 'HTML/CSS', color: '#8B5CF6' },
        { label: 'Execute JS', sub: 'V8 engine', color: '#EAB308' },
        { label: 'Render', sub: 'Pixels on screen', color: '#22C55E' },
      ],
    },
    visual: {
      type: 'timeline',
      items: [
        { year: '1990', text: 'WorldWideWeb (Nexus) — sabse pehla browser, Tim Berners-Lee ne banaya.' },
        { year: '1993', text: 'Mosaic — images inline dikhane wala pehla popular browser.' },
        { year: '1994', text: 'Netscape Navigator — web ko mass popular banaya.' },
        { year: '1995', text: 'Internet Explorer aaya; "browser wars" shuru.' },
        { year: '2004', text: 'Firefox release — open-source revolution.' },
        { year: '2008', text: 'Google Chrome (V8 + multi-process) — game changer.' },
      ],
    },
    browser:
      'Har browser apna engine use karता hai isliye behaviour mein farak ho sakta hai. Chrome/Edge/Brave = Blink, Safari = WebKit, Firefox = Gecko. Engine decide karता hai ki CSS/JS features kitne fast aur kis tarah render honge.',
    notes: {
      concept: 'Browser = network client + rendering engine + JS engine + UI. Yeh aapke code ka runtime hai.',
      tip: 'F12 dabakar DevTools kholo — yahin se aap browser ke internals (network, rendering, console) dekh sakte ho.',
      warning: 'Browser aur server alag cheezen hain. Browser client-side hai (user ke device par), server remote machine par.',
    },
    compare: {
      headers: ['Browser', 'Rendering Engine', 'JS Engine', 'Company'],
      rows: [
        ['Chrome', 'Blink', 'V8', 'Google'],
        ['Edge', 'Blink', 'V8', 'Microsoft'],
        ['Firefox', 'Gecko', 'SpiderMonkey', 'Mozilla'],
        ['Safari', 'WebKit', 'JavaScriptCore', 'Apple'],
      ],
    },
    mistakes: [
      { bad: 'Browser aur search engine ko same samajhna (Chrome = Google).', fix: 'Chrome ek browser hai; Google ek search engine (website). Browser mein aap koi bhi search engine khol sakte ho.' },
      { bad: '"window" aur "document" ko JavaScript language ka part samajhna.', fix: 'Yeh browser-provided Web APIs hain. Node.js mein window nahi hota.' },
      { bad: 'Sochna ki ek browser engine sab handle karता hai.', fix: 'Rendering engine aur JS engine alag components hain (Blink + V8).' },
    ],
    best: [
      'Cross-browser testing karo — sab engines same nahi.',
      'Standard W3C/WHATWG APIs use karo, vendor-specific se bacho.',
      'Latest browser versions support karo lekin graceful degradation rakho.',
      'DevTools master karo — yeh browser ke andar dekhne ki khidki hai.',
    ],
    performance:
      'Browser ka multi-process design parallelism deta hai, par memory zyada use karता hai (har process ka apna memory). Chrome "task manager" (Shift+Esc) se aap dekh sakte ho ki kaun sa tab kitna RAM/CPU le raha hai. ⚡',
    tricky: [
      { title: 'Browser single-threaded hai ya multi-threaded?', explain: 'JavaScript execution single-threaded hai (ek main thread), lekin browser khud multi-process + multi-threaded hai. Networking, rendering, compositing, GC — yeh alag threads/processes mein chalte hain.' },
      { title: 'Kya browser bina internet ke chal sakता hai?', explain: 'Haan — cached pages, Service Workers (offline PWA), aur local files (file://) browser bina network ke bhi dikhа sakta hai.' },
    ],
    interview: {
      beginner: [
        { q: 'Browser kya hai?', a: 'Ek software jo web resources (HTML/CSS/JS) ko server se fetch karke screen par render karता hai aur user interaction allow karता hai.' },
        { q: 'Kuch browsers ke naam batao.', a: 'Chrome, Firefox, Safari, Edge, Opera, Brave.' },
      ],
      intermediate: [
        { q: 'Browser engine aur JS engine mein fark?', a: 'Browser/rendering engine (Blink) HTML/CSS ko pixels mein convert karता hai; JS engine (V8) JavaScript code execute karता hai. Dono alag par saath kaam karte hain.' },
        { q: 'Chrome aur Chromium mein fark?', a: 'Chromium open-source base hai; Chrome usi par Google ki branding, auto-update, codecs aur tracking features add karke banta hai.' },
      ],
      advanced: [
        { q: 'Browser kaun se standards follow karता hai?', a: 'WHATWG (HTML Living Standard, DOM), W3C (CSS, accessibility), ECMA (JavaScript/ECMAScript), IETF (HTTP, TLS, QUIC).' },
      ],
    },
    mcqs: [
      { q: 'Chrome kaun sa rendering engine use karता hai?', options: ['Gecko', 'WebKit', 'Blink', 'Trident'], answer: 2, explain: 'Chrome aur Edge dono Blink (Chromium) use karte hain.' },
      { q: 'Safari ka JS engine kaun sa hai?', options: ['V8', 'SpiderMonkey', 'JavaScriptCore', 'Chakra'], answer: 2, explain: 'Safari WebKit + JavaScriptCore (Nitro) use karता hai.' },
    ],
    exercises: {
      easy: ['DevTools kholkar window.location aur navigator.userAgent print karo.'],
      medium: ['Do alag browsers mein ek hi page kholkar rendering differences note karo.'],
      advanced: ['Chrome Task Manager (Shift+Esc) se ek tab ka memory/CPU usage analyse karo.'],
    },
    summary: [
      'Browser web resources fetch karke render karता hai.',
      'Components: networking + rendering engine + JS engine + UI.',
      'Chrome=Blink+V8, Firefox=Gecko+SpiderMonkey, Safari=WebKit+JSC.',
      'Modern browsers multi-process hote hain (stability + security).',
      'window/document/fetch browser-provided APIs hain, JS language ka part nahi.',
    ],
    cheatsheet: [
      { h: 'Browser global objects', code: `window      // global scope (browser)\ndocument    // DOM root\nnavigator   // browser info\nlocation    // current URL\nhistory     // session history` },
      { h: 'Engines', code: `Chrome/Edge -> Blink + V8\nFirefox     -> Gecko + SpiderMonkey\nSafari      -> WebKit + JavaScriptCore` },
    ],
    projects: ['Cross-browser compatible landing page', 'Feature-detection based polyfill loader', 'A browser capability dashboard using navigator APIs', 'Offline-first PWA'],
    advanced:
      'Senior level par browser ko ek **operating system** ki tarah dekha jaata hai — process management, sandboxing, IPC (inter-process communication), memory isolation, aur scheduling sab OS jaise concepts use karता hai. Chrome ka site-isolation Spectre/Meltdown jaise CPU attacks se bachने ke liye har site ko alag process mein daalता hai.',
    quiz: [
      { q: 'Browser ka primary kaam kya hai?', options: ['Code compile karna', 'Web resources fetch + render karna', 'Database manage karna', 'Files compress karna'], answer: 1, explain: 'Resource fetch karna aur display karna browser ka core kaam hai.' },
      { q: 'Edge kis engine par switch hua?', options: ['Gecko', 'EdgeHTML', 'Blink/Chromium', 'WebKit'], answer: 2, explain: '2020 ke baad Edge Chromium (Blink) par shift ho gaya.' },
    ],
    related: ['browser-architecture', 'rendering-engines', 'v8-architecture'],
  },

  'browser-architecture': {
    overview:
      'Browser internally kai **components** ka collection hai jo milkar kaam karte hain: User Interface, Browser Engine, Rendering Engine, Networking, JavaScript Engine, UI Backend, aur Data Storage. Har component ki ek specific zimmedari hai. In sab ko samajhna interview ka strong foundation hai. 🏗️',
    why:
      'High-level architecture pata hona zaroori hai taaki aap samajh sako ki aapka HTML/CSS/JS kahan aur kaise process hota hai. "Browser ke components batao" frequently poocha jaata hai. Performance debugging mein bhi yeh knowledge kaam aati hai.',
    concept: [
      { h: 'User Interface (UI)', p: 'Jo aap dekhte ho: address bar, back/forward buttons, bookmarks, tabs, menu. Bas page ke andar ka content (rendered area) iska part nahi — woh rendering engine handle karता hai.' },
      { h: 'Browser Engine', p: 'UI aur rendering engine ke beech ka **coordinator/bridge**. UI ke actions (reload, navigate) ko rendering engine tak pahunchata hai. Yeh queries aur manipulations route karता hai.' },
      { h: 'Rendering Engine', p: 'HTML aur CSS ko parse karke screen par content draw karता hai. Blink (Chrome), WebKit (Safari), Gecko (Firefox). Yahi DOM, CSSOM, layout, paint ka kaam karता hai.' },
      { h: 'Networking', p: 'HTTP/HTTPS requests handle karता hai — server se data laana. Caching, cookies, security (TLS) sab yahin. Platform-independent layer.' },
      { h: 'JavaScript Engine', p: 'JS code ko parse + execute karता hai (V8, SpiderMonkey). Rendering engine ke saath tightly integrated hota hai (DOM manipulate karne ke liye).' },
      { h: 'UI Backend + Data Storage', p: '**UI Backend**: basic widgets (combo box, window) draw karne ke liye OS ke underlying methods use karता hai. **Data Storage**: cookies, localStorage, IndexedDB, cache — persistence layer (chhota database).' },
    ],
    analogy:
      'Socho browser ek **car** hai. 🚗 UI = steering, dashboard, pedals (jo driver use karता hai). Browser engine = transmission (driver ke commands engine tak pahunchाता hai). Rendering engine = engine khud (asli kaam). Networking = fuel pump (bahar se fuel/data laaता hai). Data storage = glove box (cheezen rakhne ke liye).',
    syntax: {
      code: `// Architecture ko code se nahi, layers se samjho:\n//\n//  +-------------------------------+\n//  |        User Interface         |\n//  +-------------------------------+\n//  |        Browser Engine         |\n//  +----------------+--------------+\n//  | Rendering Eng. |  JS Engine   |\n//  +----------------+--------------+\n//  |  Networking    | UI Backend   |\n//  +----------------+--------------+\n//  |        Data Storage           |\n//  +-------------------------------+`,
      note: 'Yeh ek conceptual layered diagram hai — actual Chrome isse multi-process design mein implement karता hai.',
      lang: 'js',
    },
    steps: [
      'User Interface se action aaya (URL enter / click).',
      'Browser Engine us request ko rendering engine tak forward karता hai.',
      'Networking layer server se resource fetch karता hai.',
      'Rendering Engine HTML/CSS parse karता hai (DOM + CSSOM).',
      'JavaScript Engine JS execute karता hai aur DOM modify karता hai.',
      'UI Backend ke through final pixels OS par draw hote hain.',
      'Data Storage cookies/cache ko persist karता hai.',
    ],
    internals:
      'Yeh classic 7-component model conceptual hai. Chrome iss model ko **multi-process architecture** mein realize karता hai: networking ek alag Network Service process mein, rendering har site ke alag Renderer process mein, aur drawing GPU process mein hoti hai. Components processes ke beech **IPC (Inter-Process Communication)** se baat karte hain. 🧠',
    process: {
      type: 'tree',
      root: 'Browser',
      children: [
        { label: 'UI', sub: 'Address bar, tabs', color: '#F97316' },
        { label: 'Browser Engine', sub: 'Coordinator', color: '#EF4444', children: [
          { label: 'Rendering Engine', sub: 'Blink/WebKit/Gecko', color: '#8B5CF6' },
          { label: 'JS Engine', sub: 'V8/SpiderMonkey', color: '#EAB308' },
        ] },
        { label: 'Networking', sub: 'HTTP/HTTPS', color: '#3B82F6' },
        { label: 'Data Storage', sub: 'Cookies, cache, IndexedDB', color: '#22C55E' },
      ],
    },
    visual: {
      type: 'boxes',
      items: [
        { label: 'UI', sub: 'User dekhta hai', color: '#F97316' },
        { label: 'Browser Engine', sub: 'Bridge', color: '#EF4444' },
        { label: 'Rendering Engine', sub: 'HTML/CSS', color: '#8B5CF6' },
        { label: 'Networking', sub: 'Fetch data', color: '#3B82F6' },
        { label: 'Storage', sub: 'Persist', color: '#22C55E' },
      ],
    },
    memory:
      'Data Storage layer multiple mechanisms deta hai: cookies (~4KB, server ko jaate hain), localStorage/sessionStorage (~5-10MB), IndexedDB (large structured data), Cache Storage (Service Worker). Har origin ka apna isolated storage hota hai.',
    browser:
      'Chrome ka layered model multi-process mein convert hota hai; Firefox ka "Quantum" project bhi components ko parallelize karta hai (Servo se aaye ideas). Safari WebKit2 multi-process model use karता hai.',
    notes: {
      concept: '7 core components: UI, Browser Engine, Rendering Engine, Networking, JS Engine, UI Backend, Data Storage.',
      tip: 'Yaad rakhne ka order: "User Browser Renders Net JS UI Data".',
      warning: 'Rendering engine aur browser engine alag hain — interview mein inhe mix mat karna.',
    },
    compare: {
      headers: ['Component', 'Zimmedari', 'Example'],
      rows: [
        ['UI', 'User-facing controls', 'Address bar, tabs'],
        ['Browser Engine', 'UI <-> rendering bridge', 'Command routing'],
        ['Rendering Engine', 'HTML/CSS -> pixels', 'Blink, WebKit'],
        ['Networking', 'Fetch resources', 'HTTP, TLS, cache'],
        ['JS Engine', 'Execute JS', 'V8, SpiderMonkey'],
        ['Data Storage', 'Persistence', 'Cookies, IndexedDB'],
      ],
    },
    mistakes: [
      { bad: 'Browser engine ko rendering engine samajh lena.', fix: 'Browser engine coordinator hai; rendering engine actual draw karता hai.' },
      { bad: 'JS engine ko networking ka part samajhna.', fix: 'JS engine alag component hai jo sirf JS execute karता hai.' },
      { bad: 'Storage ko sirf cookies tak limit samajhna.', fix: 'localStorage, sessionStorage, IndexedDB, Cache API bhi storage ka part hain.' },
    ],
    best: [
      'Architecture ko layered model ki tarah yaad karo.',
      'Har component ki single responsibility samjho.',
      'Multi-process realization ko 7-component model se connect karo.',
      'Storage ke har type ka use-case clear rakho.',
    ],
    performance:
      'Components ke beech IPC overhead hota hai, par yeh isolation security aur stability deता hai. Modern browsers shared memory aur Mojo (Chrome ka IPC system) se communication optimize karte hain. ⚡',
    tricky: [
      { title: 'Rendering engine aur browser engine alag kyun?', explain: 'Separation of concerns ke liye — ek hi rendering engine (WebKit) alag-alag browsers (Safari, purana Chrome) mein reuse ho sakta tha, jabki browser engine UI-specific tha.' },
    ],
    interview: {
      beginner: [
        { q: 'Browser ke main components kaun se hain?', a: 'UI, Browser Engine, Rendering Engine, Networking, JS Engine, UI Backend, Data Storage.' },
      ],
      intermediate: [
        { q: 'Browser engine ka kaam kya hai?', a: 'Yeh UI aur rendering engine ke beech coordinator hai — UI ke actions ko rendering engine tak route karता hai.' },
        { q: 'Data Storage layer kya store karता hai?', a: 'Cookies, localStorage, sessionStorage, IndexedDB, aur cache — sabhi origin-isolated.' },
      ],
      advanced: [
        { q: '7-component model multi-process design se kaise relate hota hai?', a: 'Conceptual components processes mein map hote hain: Networking -> Network Service, Rendering -> Renderer process, drawing -> GPU process. IPC se communicate karte hain.' },
      ],
    },
    mcqs: [
      { q: 'Kaun sa component HTML/CSS ko pixels mein convert karता hai?', options: ['Browser Engine', 'Rendering Engine', 'Networking', 'UI Backend'], answer: 1, explain: 'Rendering engine HTML/CSS ko parse karke draw karता hai.' },
      { q: 'Cookies kis layer ka part hain?', options: ['UI', 'JS Engine', 'Data Storage', 'Networking'], answer: 2, explain: 'Cookies persistence ke liye Data Storage layer mein aate hain.' },
    ],
    exercises: {
      easy: ['Browser ke 7 components ek diagram mein likho.'],
      medium: ['Har component ka ek real example map karo.'],
      advanced: ['7-component model ko Chrome ke 4 main processes par map karo.'],
    },
    summary: [
      'Browser = 7 layered components.',
      'Browser engine UI aur rendering engine ka bridge hai.',
      'Rendering engine HTML/CSS -> pixels; JS engine JS execute karता hai.',
      'Networking fetching, Data Storage persistence handle karता hai.',
      'Real browsers iss model ko multi-process design mein implement karte hain.',
    ],
    cheatsheet: [
      { h: '7 Components', code: `1. User Interface\n2. Browser Engine\n3. Rendering Engine\n4. Networking\n5. JS Engine\n6. UI Backend\n7. Data Storage` },
    ],
    projects: ['Browser architecture diagram tool', 'Component-wise debugging checklist', 'Storage inspector dashboard'],
    advanced:
      'Senior insight: yeh academic 7-layer model real Chromium codebase se simplified hai. Chromium mein "content" module rendering encapsulate karता hai, "net" module networking, aur "Mojo" IPC framework processes ko jodता hai. Architecture ka asli challenge security boundaries aur performance ka balance hai.',
    quiz: [
      { q: 'Browser engine kis kaam ke liye hai?', options: ['JS execute', 'UI-rendering coordination', 'Data store', 'TLS handshake'], answer: 1, explain: 'Browser engine UI aur rendering engine ko coordinate karता hai.' },
    ],
    related: ['what-is-browser', 'multi-process', 'rendering-engines'],
  },

  'multi-process': {
    overview:
      'Purane browsers **single-process** the — ek hi process sab tabs handle karता. Ek tab crash hua to poora browser gir jaata. Chrome ne **multi-process architecture** introduce ki: har tab/site ka apna process. Isse stability, security aur performance teeno improve hue. 🛡️',
    why:
      'Yeh ek favourite interview topic hai — "browser multi-process kyun use karता hai?" Stability, security (sandboxing), aur parallelism ke trade-offs samajhna senior-level discussion hai. Site-isolation aur Spectre attacks se bhi yeh connected hai.',
    concept: [
      { h: 'Single-process problem', p: 'Single-process browser mein sab tabs, network, JS ek hi process aur memory share karte hain. Ek tab ka crash ya infinite loop poore browser ko hang/crash kar deता hai. Ek malicious page baaki tabs ka data padh sakता hai. 😵' },
      { h: 'Multi-process solution', p: 'Chrome har major function alag process mein chalाता hai: Browser process, Renderer process (per tab/site), GPU process, Network process, Utility processes. Ek crash hua to sirf woh tab marता hai, "Aw, Snap!" page aata hai, baaki theek rehte hain.' },
      { h: 'Stability', p: 'Process isolation matlab ek renderer crash hone par baaki tabs unaffected. Browser process kabhi crash na ho iska khaas dhyan rakha jaता hai (woh sabse critical hai).' },
      { h: 'Security & Sandboxing', p: 'Renderer process **sandbox** mein chalta hai — uske paas direct file system / OS access nahi hota. Agar koi malicious site renderer ko hijack kar le, to sandbox use bahar nuksaan karne se rokта hai. Browser process privileged operations karता hai.' },
      { h: 'Performance trade-off', p: 'Parallelism milta hai (alag CPU cores use), lekin har process ka apna memory overhead hota hai. Isliye Chrome RAM zyada khaता hai. Low-memory devices par Chrome processes ko merge bhi kar deता hai.', code: `// Chrome process model (simplified)\n// 1 Browser process (master)\n// N Renderer processes (per site/tab, sandboxed)\n// 1 GPU process\n// 1 Network service process\n// M Utility processes (audio, storage, etc.)` },
    ],
    analogy:
      'Single-process browser ek **building with one big hall** ki tarah hai — ek jagah aag lagi to poori building jal gayi. 🔥 Multi-process ek **building with separate fireproof rooms** hai — ek room mein aag lagi to door band, baaki rooms safe. Har room (process) apne logon (tab) ko isolate rakhता hai.',
    syntax: {
      code: `// Chrome mein dekhne ka tarika:\n// Menu -> More Tools -> Task Manager (Shift+Esc)\n// Aapko har tab/extension ka alag process dikhega\n\n// chrome://process-internals  bhi internal info deta hai`,
      note: 'Task Manager mein "Process ID" same hone par matlab woh tabs same process share kar rahe hain.',
      lang: 'js',
    },
    steps: [
      'Browser process start hota hai (master controller).',
      'Naya tab khulta hai -> naya Renderer process spawn hota hai.',
      'Renderer sandbox ke andar HTML/CSS/JS process karता hai.',
      'Network service process resources fetch karता hai.',
      'GPU process drawing/compositing accelerate karता hai.',
      'Sab processes IPC se Browser process ke through baat karte hain.',
      'Tab band -> uska Renderer process terminate ho jaata hai.',
    ],
    internals:
      'Chrome ka default model "process-per-site-instance" hai. Memory bachane ke liye yeh "process-per-site" ya kam-memory devices par "process-per-tab" jaise modes par switch kar sakता hai. **Site Isolation** (2018 se default) har site ko guarantee deता hai ki uska data alag process mein rahe — yeh Spectre/Meltdown speculative-execution attacks ke against zaroori hai. 🧠',
    process: {
      type: 'boxes',
      items: [
        { label: 'Browser Process', sub: 'Master, privileged', color: '#EF4444' },
        { label: 'Renderer (Tab 1)', sub: 'Sandboxed', color: '#8B5CF6' },
        { label: 'Renderer (Tab 2)', sub: 'Sandboxed', color: '#8B5CF6' },
        { label: 'GPU Process', sub: 'Drawing', color: '#06B6D4' },
        { label: 'Network Process', sub: 'Fetching', color: '#3B82F6' },
      ],
    },
    visual: {
      type: 'timeline',
      items: [
        { year: '1', text: 'Single-process era: ek crash = poora browser gaya.' },
        { year: '2', text: 'Chrome (2008): multi-process model introduce.' },
        { year: '3', text: 'Sandboxing: renderer ko OS access se kaata.' },
        { year: '4', text: 'Site Isolation (2018): per-site process, Spectre defense.' },
      ],
    },
    memory:
      'Multi-process ka biggest cost memory hai — har process ka apna V8 instance aur heap. Chrome shared memory aur "RenderProcessHost" reuse se overhead kam karता hai. Low-RAM devices par process limit lag jaati hai aur tabs same process share karne lagte hain.',
    browser:
      'Firefox "Electrolysis (e10s)" + "Fission" project se multi-process + site isolation laaya. Safari WebKit2 mein UI aur web content alag processes mein chalाता hai. Sab modern browsers ab multi-process hain.',
    notes: {
      concept: 'Multi-process = stability + security (sandbox) + parallelism, cost = memory.',
      tip: 'Aw Snap page tab tabhi aata hai jab us tab ka renderer crash hota hai — baaki tabs safe.',
      warning: 'Zyada tabs = zyada processes = zyada RAM. Yahi Chrome ke "RAM eater" reputation ka kaaran hai.',
    },
    compare: {
      headers: ['Aspect', 'Single-process', 'Multi-process'],
      rows: [
        ['Crash', 'Poora browser girta', 'Sirf ek tab girta'],
        ['Security', 'Sab shared, weak', 'Sandbox isolation'],
        ['Parallelism', 'Limited', 'Multiple cores use'],
        ['Memory', 'Kam', 'Zyada'],
      ],
    },
    mistakes: [
      { bad: 'Sochna ki har tab hamesha alag process mein hota hai.', fix: 'Memory pressure mein Chrome tabs ko same process mein merge kar deta hai.' },
      { bad: 'Sandbox ko "antivirus" samajhna.', fix: 'Sandbox renderer ke privileges restrict karता hai, malware scan nahi karता.' },
      { bad: 'Multi-process = sirf performance maan lena.', fix: 'Primary motivation stability aur security hai; parallelism bonus hai.' },
    ],
    best: [
      'Process isolation ke security benefits highlight karo interview mein.',
      'Memory vs stability trade-off samjho.',
      'Site Isolation ko Spectre attacks se connect karo.',
      'Single vs multi-process clearly compare karo.',
    ],
    performance:
      'Parallel rendering aur execution multi-core CPUs ka faayda uthate hain, par per-process memory overhead hota hai. Chrome ko balance ke liye dynamic process limits implement karne padte hain — yeh ek classic systems trade-off hai. ⚡',
    tricky: [
      { title: 'Agar har site alag process mein hai to memory infinite kaise nahi badhti?', explain: 'Chrome ka ek process limit hota hai (RAM ke hisaab se calculate). Limit ke baad naye tabs existing processes reuse karte hain (process-per-site model).' },
      { title: 'iframe alag process mein ho sakता hai?', explain: 'Haan — Site Isolation ke saath cross-origin iframe "Out-of-Process iframe (OOPIF)" ban kar parent se alag process mein render hota hai.' },
    ],
    interview: {
      beginner: [
        { q: 'Browser multi-process kyun use karता hai?', a: 'Stability (ek crash sabko na giraye), security (sandbox isolation), aur performance (parallelism) ke liye.' },
      ],
      intermediate: [
        { q: 'Sandbox kya hai?', a: 'Renderer process ka restricted environment — usse direct file system/OS access nahi hota, taaki compromise hone par nuksaan na ho.' },
        { q: 'Single-process ka main problem kya tha?', a: 'Ek tab ka crash poore browser ko gira deता tha, aur tabs ek-doosre ka data access kar sakte the.' },
      ],
      advanced: [
        { q: 'Site Isolation kyun introduce hua?', a: 'Spectre/Meltdown jaise speculative-execution attacks ko rokne ke liye — har site ka data alag process mein rakhna taaki cross-site memory leak na ho.' },
      ],
    },
    mcqs: [
      { q: 'Multi-process ka primary fayda kya hai?', options: ['Kam memory', 'Stability + security', 'Chhota download', 'Fast typing'], answer: 1, explain: 'Stability aur security multi-process ki main wajah hain.' },
      { q: 'Renderer process kahan chalता hai?', options: ['Privileged mode', 'Sandbox', 'Kernel', 'GPU only'], answer: 1, explain: 'Renderer sandboxed hota hai, restricted privileges ke saath.' },
    ],
    exercises: {
      easy: ['Chrome Task Manager kholkar processes count karo.'],
      medium: ['Single vs multi-process ka pros/cons table banao.'],
      advanced: ['Site Isolation aur OOPIF par ek short note likho.'],
    },
    summary: [
      'Single-process: ek crash = sab gaya.',
      'Multi-process: per-tab/site processes, isolation.',
      'Benefits: stability, security (sandbox), parallelism.',
      'Cost: zyada memory.',
      'Site Isolation Spectre attacks se bachाता hai.',
    ],
    cheatsheet: [
      { h: 'Why multi-process', code: `Stability  -> crash isolation\nSecurity   -> sandbox, site isolation\nPerformance-> parallelism (multi-core)\nCost       -> more memory` },
    ],
    projects: ['Process monitor visualisation', 'Memory-vs-tabs benchmark', 'Sandbox concept explainer'],
    advanced:
      'Senior depth: Chrome ka process allocation policy ("process model") configurable hai. Spectre ke baad Site Isolation default hua, jisme cross-origin documents aur subframes ko alag process mein force kiya jaता hai. Trade-off: zyada processes = zyada IPC + memory, isliye Chrome "process reuse thresholds" tune karता hai based on device RAM.',
    quiz: [
      { q: 'Sandbox kis cheez ko restrict karता hai?', options: ['Network speed', 'Renderer ke OS privileges', 'CSS rendering', 'JS syntax'], answer: 1, explain: 'Sandbox renderer ke system-level privileges limit karता hai.' },
    ],
    related: ['browser-processes', 'site-isolation', 'browser-architecture'],
  },

  'browser-processes': {
    overview:
      'Chrome ke multi-process model mein har process ka apna specific kaam hai: **Browser process** (master), **Renderer process** (web content), **GPU process** (drawing), **Network process** (fetching), **Plugin/Utility processes** (extra tasks). Yeh sab **IPC** se baat karte hain. Inhe samajhna interview mein deep points deta hai. ⚙️',
    why:
      'Interviewer often poochta hai "Chrome ke alag-alag processes kya karte hain aur kaise communicate karte hain?" Yeh knowledge debugging (kaun crash hua), security (kaun sandboxed hai), aur performance ke liye essential hai.',
    concept: [
      { h: 'Browser Process (master)', p: 'Sabse privileged. UI (address bar, bookmarks, back/forward), network requests authorize karna, file access, aur baaki processes ko manage karna iska kaam hai. Yeh crash hua to poora browser jaता hai — isliye ise minimal aur stable rakha jaता hai.' },
      { h: 'Renderer Process', p: 'Har tab/site ka apna. HTML parse -> DOM, CSS -> CSSOM, layout, paint, aur JS execution (V8) sab yahin hota hai. **Sandboxed** — direct OS access nahi. Yeh process tab-specific content ka dil hai.' },
      { h: 'GPU Process', p: 'Drawing aur compositing ko GPU-accelerate karता hai. Sab renderers ke liye ek shared GPU process hota hai. Isolation se ek GPU crash poore browser ko nahi giराता. 🎨' },
      { h: 'Network Process (Network Service)', p: 'Saare network requests handle karता hai — DNS, TCP, TLS, HTTP, cache, cookies. Pehle yeh browser process ke andar tha; ab alag process mein for stability aur security.' },
      { h: 'Plugin & Utility Processes', p: '**Plugin process** (jaise purane Flash) ke liye alag isolation. **Utility processes** chhote tasks ke liye: audio, data decoding, storage service, network parsing. Sab isolated taaki crash contain ho.', code: `// Chrome ke process types\n// browser  : master / privileged\n// renderer : per site, sandboxed (web content)\n// gpu      : drawing, compositing\n// network  : DNS/TCP/TLS/HTTP\n// utility  : audio, storage, etc.\n// plugin   : legacy plugins` },
    ],
    analogy:
      'Socho ek **bada office**. 🏢 Browser process = CEO (sab decisions, sab manage karता). Renderer = alag-alag departments (har project apne cabin mein). GPU process = printing/design department (visuals banाता). Network process = courier/mailroom (bahar se data laता). Utility = support staff. Sab phone/email (IPC) se coordinate karte hain.',
    syntax: {
      code: `// IPC = Inter-Process Communication\n// Chrome "Mojo" framework use karता hai\n//\n// Renderer (sandboxed) ----IPC----> Browser process\n//   "mujhe ye file/network resource chahiye"\n// Browser process privilege check karke deता hai\n//\n// chrome://process-internals se details dekho`,
      note: 'Renderer khud network/file access nahi karता — Browser process se IPC ke through request karता hai (security).',
      lang: 'js',
    },
    steps: [
      'Browser process start -> UI dikhता hai.',
      'User URL deta hai -> Browser process Network process se fetch karwाता hai.',
      'Response aaने par Browser process Renderer process spawn/assign karता hai.',
      'Renderer HTML/CSS parse aur JS execute karता hai (sandbox mein).',
      'Renderer drawing commands GPU process ko bhejता hai.',
      'GPU process pixels screen par compose karता hai.',
      'Sab processes Browser process ke through IPC se coordinate karte hain.',
    ],
    internals:
      'Chrome ka IPC system "Mojo" hai — typed, async messages processes ke beech bhejता hai. Renderer sandboxed hone ki wajah se privileged operations (file, network) directly nahi kar sakता; woh Browser process se IPC karता hai jo permission check karke perform karता hai. Yeh "broker" model security ka core hai. 🧠',
    process: {
      type: 'boxes',
      items: [
        { label: 'Browser', sub: 'Master/privileged', color: '#EF4444' },
        { label: 'Network', sub: 'DNS/TCP/TLS', color: '#3B82F6' },
        { label: 'Renderer', sub: 'DOM/JS, sandboxed', color: '#8B5CF6' },
        { label: 'GPU', sub: 'Compositing', color: '#06B6D4' },
        { label: 'Utility', sub: 'Audio/storage', color: '#22C55E' },
      ],
    },
    visual: {
      type: 'tree',
      root: 'Browser Process',
      children: [
        { label: 'Renderer', sub: 'Web content', color: '#8B5CF6' },
        { label: 'GPU', sub: 'Drawing', color: '#06B6D4' },
        { label: 'Network', sub: 'Fetching', color: '#3B82F6' },
        { label: 'Utility', sub: 'Misc tasks', color: '#22C55E' },
      ],
    },
    memory:
      'Har process apna memory leta hai. Browser process kam par stable. Renderers sabse zyada (DOM + JS heap). GPU process textures/buffers rakhता hai. Memory pressure mein Chrome inactive renderers ko discard kar deता hai aur tab reload par fir banाता hai.',
    browser:
      'Firefox bhi separate processes use karta hai (parent process + content processes + GPU process). Safari WebKit2 mein "WebContent", "Networking", aur "GPU" processes alag hote hain. Concept har modern browser mein same hai.',
    notes: {
      concept: 'Browser=master, Renderer=content(sandboxed), GPU=draw, Network=fetch, Utility=misc. IPC se baat.',
      tip: 'Task Manager mein har row ek process hai — crash debugging ke liye dekho kaun mar gaya.',
      warning: 'Renderer kabhi directly file/network access nahi karता — hamesha Browser process ke through (security).',
    },
    compare: {
      headers: ['Process', 'Kaam', 'Sandboxed?'],
      rows: [
        ['Browser', 'UI, coordination, privileges', 'Nahi (privileged)'],
        ['Renderer', 'DOM, CSS, JS, paint', 'Haan'],
        ['GPU', 'Compositing, drawing', 'Partially'],
        ['Network', 'DNS/TCP/TLS/HTTP', 'Haan'],
        ['Utility', 'Audio, storage, decode', 'Haan'],
      ],
    },
    mistakes: [
      { bad: 'Sochna renderer khud network call karता hai.', fix: 'Renderer Browser/Network process se IPC ke through karता hai (sandbox).' },
      { bad: 'GPU process ko har tab ka alag samajhna.', fix: 'GPU process generally ek hi shared hota hai sab renderers ke liye.' },
      { bad: 'IPC ko ek simple function call samajhna.', fix: 'IPC processes ke beech message-passing hai (Mojo), function call nahi — overhead hota hai.' },
    ],
    best: [
      'Har process ka role aur sandbox status yaad rakho.',
      'IPC (Mojo) ka broker model security ke context mein samjho.',
      'Crash debugging ke liye process types pehchanो.',
      'Renderer ka privilege-less nature emphasize karo.',
    ],
    performance:
      'IPC message passing mein serialization overhead hai, isliye Chrome batching aur shared memory use karता hai. Frequent IPC chatty design performance kharab karता hai — yahi reason hai ki rendering pipeline ko renderer ke andar hi रखा jaता hai. ⚡',
    tricky: [
      { title: 'Renderer ko file save karni hai (download). Kaise?', explain: 'Renderer directly file system access nahi kar sakता. Woh Browser process ko IPC bhejता hai; Browser process (privileged) permission check karke file likhता hai.' },
      { title: 'GPU process crash hua to kya hota hai?', explain: 'Browser GPU process ko restart kar deता hai; tabs reload nahi hote, sirf rendering thodi der ke liye software fallback par chali jaa sakती hai.' },
    ],
    interview: {
      beginner: [
        { q: 'Chrome ke main processes kaun se hain?', a: 'Browser, Renderer, GPU, Network, aur Utility processes.' },
      ],
      intermediate: [
        { q: 'Renderer aur Browser process mein fark?', a: 'Browser process privileged master hai (UI, network authorize); Renderer sandboxed hai aur sirf web content (DOM/JS) handle karता hai.' },
        { q: 'Processes communicate kaise karte hain?', a: 'IPC ke through — Chrome "Mojo" framework se typed async messages bhejता hai.' },
      ],
      advanced: [
        { q: 'Network service alag process mein kyun banaya gaya?', a: 'Stability aur security ke liye — network code crash ya compromise hone par baaki browser unaffected rahe, aur isolation ke through privilege boundary banti hai.' },
      ],
    },
    mcqs: [
      { q: 'Kaun sa process sabse privileged hai?', options: ['Renderer', 'GPU', 'Browser', 'Utility'], answer: 2, explain: 'Browser process master hai aur sabse privileged.' },
      { q: 'Renderer process file system ko kaise access karता hai?', options: ['Directly', 'Browser process ke through IPC', 'GPU se', 'Bilkul nahi kar sakता'], answer: 1, explain: 'Sandboxed renderer Browser process se IPC karke access karता hai.' },
    ],
    exercises: {
      easy: ['Task Manager se har process type identify karo.'],
      medium: ['Ek diagram banao jisme processes IPC se jude hon.'],
      advanced: ['Renderer ke ek network request ka end-to-end IPC flow likho.'],
    },
    summary: [
      'Browser process = master/privileged (UI, coordination).',
      'Renderer = sandboxed web content (DOM/JS/paint).',
      'GPU = drawing/compositing; Network = fetching.',
      'Utility/Plugin = isolated misc tasks.',
      'Sab IPC (Mojo) se communicate karte hain.',
    ],
    cheatsheet: [
      { h: 'Process roles', code: `browser  -> master, UI, privileges\nrenderer -> DOM/JS, sandboxed\ngpu      -> compositing\nnetwork  -> DNS/TCP/TLS/HTTP\nutility  -> audio/storage/decode` },
    ],
    projects: ['Process-role explainer UI', 'IPC flow animation', 'Crash isolation demo'],
    advanced:
      'Senior depth: Mojo IPC interfaces ".mojom" files se define hote hain. Renderer ko "capabilities" (interface pointers) Browser process selectively deता hai — yeh principle of least privilege follow karता hai. Network Service ko alag process mein nikalna ("Servicification") Chromium ka bada architectural shift tha.',
    quiz: [
      { q: 'GPU process ka kaam kya hai?', options: ['DNS resolve', 'Compositing/drawing', 'JS execute', 'Cookies store'], answer: 1, explain: 'GPU process drawing aur compositing accelerate karता hai.' },
    ],
    related: ['multi-process', 'compositing', 'site-isolation'],
  },

  'rendering-engines': {
    overview:
      'Rendering engine woh component hai jo HTML aur CSS ko parse karke screen par pixels banाता hai. Teen major engines hain: **Blink** (Chrome, Edge), **WebKit** (Safari), aur **Gecko** (Firefox). Inka history, differences aur comparison interview mein aksar poocha jaता hai. 🖼️',
    why:
      'Rendering engine decide karता hai ki aapka CSS/HTML kaise dikhega aur kitna fast. Cross-browser bugs ka root cause yahi hai. Interview mein "Blink, WebKit, Gecko mein fark" classic question hai. Engine ka itihaas browser ki evolution samjhata hai.',
    concept: [
      { h: 'Blink (Chromium)', p: 'Google ne 2013 mein WebKit se **fork** karke Blink banaya (Chrome, Edge, Opera, Brave). Tab se isका apna development. Sabse zyada market share. Naye web features yahin pehle aate hain.' },
      { h: 'WebKit (Apple)', p: 'Apple ka engine (Safari, iOS ke saare browsers — Apple ki policy ke kaaran iOS par sab WebKit use karte hain). WebKit khud KHTML (KDE) se evolve hua tha. Blink ka parent.' },
      { h: 'Gecko (Mozilla)', p: 'Mozilla ka engine (Firefox). "Quantum" project ke saath modernize hua, Rust-based "Servo" se parallel CSS engine (Stylo) aaya. Independent rehne ka commitment — web monoculture rokne ke liye. 🦊' },
      { h: 'EdgeHTML (RIP) & history', p: 'Microsoft ka purana engine EdgeHTML 2020 mein retire ho gaya jab Edge Chromium (Blink) par shift hua. Trident (old IE) bhi gaya. Aaj basically teen engines bach gaye hain.' },
      { h: 'Engine common pipeline', p: 'Sab engines roughly same pipeline follow karte hain: Parse HTML -> DOM, Parse CSS -> CSSOM, Render tree, Layout, Paint, Composite. Differences implementation details aur feature support timing mein hote hain.', code: `// Sab engines ka core flow:\nHTML -> DOM\nCSS  -> CSSOM\nDOM + CSSOM -> Render Tree\nRender Tree -> Layout -> Paint -> Composite` },
    ],
    analogy:
      'Rendering engines alag-alag **cooks** ki tarah hain. 👨‍🍳 Recipe (HTML/CSS) same hai, par har cook (Blink/WebKit/Gecko) thoda alag tarike se banाता hai — taste (rendering) mein chhote differences aa jaate hain. Isliye ek hi dish (page) har cook ke yahan thodi alag dikhती hai.',
    syntax: {
      code: `// Engine pata karne ka tarika (feature detection > UA sniffing)\nconsole.log(navigator.userAgent)\n\n// Vendor prefixes engine differences dikhate the:\n// -webkit-  (Blink/WebKit)\n// -moz-     (Gecko)\n// -ms-      (old Edge/IE)\n// Aaj standard properties prefer karo`,
      note: 'User-Agent sniffing avoid karo; feature detection (CSS.supports, in operator) reliable hai.',
      lang: 'js',
    },
    steps: [
      'Engine HTML bytes ko characters mein decode karता hai.',
      'Tokenizer characters ko tokens mein todता hai.',
      'Tokens se nodes ban kar DOM tree banta hai.',
      'CSS parse hokar CSSOM banता hai.',
      'DOM + CSSOM milkar Render tree banाते hain.',
      'Layout (reflow) har element ka size/position calculate karता hai.',
      'Paint pixels draw karता hai; Compositor layers ko screen par jodता hai.',
    ],
    internals:
      'Blink ek naye architecture "RenderingNG" par chal raha hai — pipeline ko predictable, parallel aur GPU-accelerated banाने ke liye. Gecko ne "Stylo" (Rust) se CSS styling ko parallel kiya. WebKit "Nitro" JS engine aur apna layout use karता hai. Internally sab DOM ko C++ objects mein represent karte hain. 🧠',
    process: {
      type: 'boxes',
      items: [
        { label: 'Parse HTML', sub: 'DOM', color: '#F97316' },
        { label: 'Parse CSS', sub: 'CSSOM', color: '#8B5CF6' },
        { label: 'Render Tree', sub: 'Merge', color: '#EAB308' },
        { label: 'Layout', sub: 'Geometry', color: '#06B6D4' },
        { label: 'Paint+Composite', sub: 'Pixels', color: '#22C55E' },
      ],
    },
    visual: {
      type: 'timeline',
      items: [
        { year: '1998', text: 'KHTML (KDE) — WebKit ka ancestor.' },
        { year: '2001', text: 'Gecko (Mozilla/Netscape) mature.' },
        { year: '2003', text: 'Apple WebKit fork karता hai KHTML se.' },
        { year: '2008', text: 'Chrome WebKit ke saath launch.' },
        { year: '2013', text: 'Google Blink ko WebKit se fork karta hai.' },
        { year: '2020', text: 'Edge Chromium/Blink par shift; EdgeHTML retire.' },
      ],
    },
    browser:
      'iOS par chhota twist: Apple ki policy ke kaaran iPhone/iPad par har browser (Chrome, Firefox bhi) andar se WebKit use karता hai. Desktop par yeh restriction nahi. Yahi reason hai ki iOS Safari aksar feature support mein peeche reh jaता hai.',
    notes: {
      concept: 'Blink (Chrome/Edge), WebKit (Safari), Gecko (Firefox) — teen major engines.',
      tip: 'Blink WebKit ka fork hai; WebKit KHTML ka descendant. Sab ek family se nikle.',
      warning: 'iOS par sab browsers WebKit use karne ko majboor hain — yeh ek important interview trivia hai.',
    },
    compare: {
      headers: ['Engine', 'Browser', 'Company', 'Notable'],
      rows: [
        ['Blink', 'Chrome, Edge, Opera', 'Google', 'WebKit se fork (2013)'],
        ['WebKit', 'Safari', 'Apple', 'iOS par mandatory'],
        ['Gecko', 'Firefox', 'Mozilla', 'Rust-based Stylo/Servo'],
        ['EdgeHTML', 'Old Edge', 'Microsoft', 'Retired (2020)'],
      ],
    },
    mistakes: [
      { bad: 'Blink aur WebKit ko same samajhna.', fix: 'Blink 2013 mein WebKit se fork hua; ab independent develop hote hain.' },
      { bad: 'Sochna iOS Chrome Blink use karता hai.', fix: 'iOS par sab browsers WebKit use karne ko majboor hain.' },
      { bad: 'Vendor prefixes (-webkit-) ko production mein zaroori samajhna.', fix: 'Aaj zyada standard CSS supported hai; prefixes selectively chahiye.' },
    ],
    best: [
      'Feature detection use karo, engine sniffing nahi.',
      'Cross-engine testing karo (Blink, WebKit, Gecko).',
      'Standard CSS/JS prefer karo over vendor-specific.',
      'iOS WebKit limitations ko dhyan mein rakho.',
    ],
    performance:
      'Engines compositing aur GPU acceleration se rendering fast karte hain. Blink ka RenderingNG aur Gecko ka WebRender (GPU-based) modern, parallel pipelines hain. Same code alag engines par alag perform kar sakता hai — isliye real-device testing zaroori. ⚡',
    tricky: [
      { title: 'Chrome aur Edge same engine, fir bhi alag kyun?', explain: 'Dono Blink use karte hain par UI, services, sync, aur privacy features alag hain. Rendering same, "browser shell" alag.' },
      { title: 'Ek CSS feature Chrome mein chal raha par Safari mein nahi — kyun?', explain: 'WebKit ne abhi woh feature implement nahi kiya ya alag tarah kiya. Engine feature-support timelines alag hote hain.' },
    ],
    interview: {
      beginner: [
        { q: 'Teen major rendering engines kaun se hain?', a: 'Blink (Chrome/Edge), WebKit (Safari), Gecko (Firefox).' },
      ],
      intermediate: [
        { q: 'Blink kaise aaya?', a: 'Google ne 2013 mein WebKit se fork karke Blink banaya, taaki Chromium ka apna control ho.' },
        { q: 'iOS par browsers kaun sa engine use karte hain?', a: 'Sab WebKit — Apple ki App Store policy ke kaaran (recently EU mein change ho raha hai).' },
      ],
      advanced: [
        { q: 'Gecko ne Rust kyun use kiya?', a: 'Servo/Stylo project se memory-safety aur parallelism laane ke liye — CSS styling ko multi-core par parallelize kiya (Quantum).' },
      ],
    },
    mcqs: [
      { q: 'Blink kis engine se fork hua?', options: ['Gecko', 'WebKit', 'Trident', 'Presto'], answer: 1, explain: 'Blink 2013 mein WebKit ka fork hai.' },
      { q: 'Firefox kaun sa engine use karता hai?', options: ['Blink', 'WebKit', 'Gecko', 'EdgeHTML'], answer: 2, explain: 'Firefox Gecko engine use karता hai.' },
    ],
    exercises: {
      easy: ['Teen engines aur unke browsers ki list banao.'],
      medium: ['Ek CSS feature ka cross-engine support caniuse par check karo.'],
      advanced: ['Blink ke RenderingNG architecture par short note likho.'],
    },
    summary: [
      'Blink (Chrome/Edge), WebKit (Safari), Gecko (Firefox).',
      'Blink WebKit ka fork (2013); WebKit KHTML descendant.',
      'iOS par sab browsers WebKit use karte hain.',
      'Gecko Rust-based Stylo se parallel styling karता hai.',
      'Sab engines same pipeline: DOM->CSSOM->RenderTree->Layout->Paint.',
    ],
    cheatsheet: [
      { h: 'Engines', code: `Blink  -> Chrome, Edge, Opera, Brave\nWebKit -> Safari (+ all iOS browsers)\nGecko  -> Firefox\nEdgeHTML -> retired 2020` },
    ],
    projects: ['Cross-engine CSS test suite', 'caniuse-style feature dashboard', 'Engine history timeline page'],
    advanced:
      'Senior depth: Blink ka RenderingNG goal hai pipeline ko "reliable, extensible, parallel". Yeh BlinkGenPropertyTrees aux structures, GPU-side raster/composite, aur off-main-thread work introduce karता hai. Gecko ka WebRender pages ko GPU par "ek game engine ki tarah" render karता hai. Yeh CPU se GPU par shift modern rendering ka core trend hai.',
    quiz: [
      { q: 'iOS Chrome andar se kaun sa engine chalाता hai?', options: ['Blink', 'WebKit', 'Gecko', 'V8 only'], answer: 1, explain: 'iOS par sab browsers WebKit par majboor hain.' },
    ],
    related: ['critical-rendering-path', 'blink-renderingng', 'what-is-browser'],
  },

  'navigation-flow': {
    overview:
      'Yeh THE classic interview question hai: "Jab aap URL type karke Enter dabate ho, kya hota hai?" Pura journey: URL parse -> DNS lookup -> TCP connection -> TLS handshake -> HTTP request/response -> HTML parsing -> rendering. Yeh sab milliseconds mein hota hai. 🚀',
    why:
      'Yeh ek "system design lite" question hai jo aapki end-to-end understanding test karta hai — networking, security, browser internals sab ek saath. Har bade product company (Google, Amazon, Meta) ke interview mein aaता hai. Iska depth aapko stand out karता hai.',
    concept: [
      { h: '1. URL parse + cache check', p: 'Browser URL ko todता hai: scheme (https), host (google.com), port, path. Pehle yeh check karता hai ki page cache mein to nahi (HSTS list, browser cache, Service Worker). Agar autocomplete/search query hai to default search engine par bhejता hai.' },
      { h: '2. DNS resolution', p: 'Hostname (google.com) ko IP address (142.250.x.x) mein convert karna. Browser cache -> OS cache -> router -> ISP resolver -> root/TLD/authoritative servers. (Detail "dns-lookup" topic mein.)' },
      { h: '3. TCP + TLS connection', p: 'IP mil gaya to **TCP 3-way handshake** (SYN, SYN-ACK, ACK) se connection banта hai. HTTPS ho to upar **TLS handshake** (certificate verify, keys exchange) bhi hota hai. HTTP/3 mein yeh QUIC/UDP par hota hai.' },
      { h: '4. HTTP request/response', p: 'Browser GET request bhejता hai (headers, cookies ke saath). Server response deता hai (status code, headers, HTML body). Redirects (301/302) handle hote hain.' },
      { h: '5. Parsing + rendering', p: 'Browser HTML parse karke DOM banाता hai, CSS se CSSOM, JS execute karता hai, render tree -> layout -> paint -> composite. Sub-resources (CSS, JS, images) parallel fetch hote hain. Page screen par aa jaता hai. ✨', code: `// Simplified flow\nURL -> Cache check\n    -> DNS lookup (IP)\n    -> TCP handshake\n    -> TLS handshake (https)\n    -> HTTP request\n    -> HTTP response (HTML)\n    -> Parse + Render\n    -> Paint to screen` },
    ],
    analogy:
      'Socho aap kisi dost ke ghar (website) jana chahte ho. 🏠 URL = dost ka naam. DNS = phone directory se uska address (IP) dhoondhna. TCP handshake = darwaze par knock karke "kya main aa sakta hoon?" confirm karna. TLS = secret handshake taaki koi sune na. HTTP request = "mujhe khana do" maangna. Rendering = khana plate mein saja kar khaना.',
    syntax: {
      code: `// Browser ye sab internally karता hai, par Performance API se dekh sakte ho:\nconst nav = performance.getEntriesByType('navigation')[0]\nconsole.log('DNS:', nav.domainLookupEnd - nav.domainLookupStart)\nconsole.log('TCP:', nav.connectEnd - nav.connectStart)\nconsole.log('TTFB:', nav.responseStart - nav.requestStart)\nconsole.log('DOM ready:', nav.domContentLoadedEventEnd)`,
      note: 'Navigation Timing API se aap har phase ka time measure kar sakte ho — real interview bonus.',
      lang: 'js',
    },
    steps: [
      'URL parse + cache/HSTS check.',
      'DNS lookup -> hostname se IP address.',
      'TCP 3-way handshake (SYN/SYN-ACK/ACK).',
      'TLS handshake (HTTPS) -> secure channel.',
      'HTTP request bhejna (GET + headers + cookies).',
      'Server HTTP response deता hai (status + HTML).',
      'HTML parse -> DOM, CSS -> CSSOM, JS execute.',
      'Render tree -> Layout -> Paint -> Composite -> screen par page.',
    ],
    internals:
      'Optimization layers: browser DNS prefetch aur preconnect kar sakता hai. HTTP/2/3 par ek connection par multiple resources multiplex hote hain. Browser "speculative" parsing aur preload scanner se sub-resources jaldi fetch karता hai. Critical Rendering Path optimize karke first paint fast hota hai. Redirects, caching headers, aur compression (gzip/brotli) bhi flow ka part hain. 🧠',
    process: {
      type: 'boxes',
      items: [
        { label: 'URL', sub: 'Parse + cache', color: '#F97316' },
        { label: 'DNS', sub: 'Hostname -> IP', color: '#3B82F6' },
        { label: 'TCP+TLS', sub: 'Secure connect', color: '#EF4444' },
        { label: 'HTTP', sub: 'Request/response', color: '#8B5CF6' },
        { label: 'Render', sub: 'Parse + paint', color: '#22C55E' },
      ],
    },
    visual: {
      type: 'timeline',
      items: [
        { year: '1', text: 'URL parse aur cache/HSTS check.' },
        { year: '2', text: 'DNS lookup: domain ka IP nikalna.' },
        { year: '3', text: 'TCP handshake + TLS handshake (https).' },
        { year: '4', text: 'HTTP request bheja, response (HTML) aaya.' },
        { year: '5', text: 'HTML/CSS parse, JS run, DOM/CSSOM bana.' },
        { year: '6', text: 'Layout + Paint + Composite -> page visible.' },
      ],
    },
    memory:
      'Caching har layer par memory bachाता hai: DNS cache (IP yaad), HTTP cache (resources reuse), Service Worker cache (offline). Browser parsed resources ko memory cache mein bhi rakhता hai taaki same-session reuse ho.',
    browser:
      'Browser-specific optimizations: Chrome "preconnect"/"prefetch" hints, speculative DNS, aur preload scanner use karता hai. Safari/Firefox bhi similar prefetching karte hain. Modern browsers HTTP/3 par 0-RTT connection se aur fast ho gaye hain.',
    notes: {
      concept: 'URL -> DNS -> TCP -> TLS -> HTTP -> Parse -> Render. Yeh end-to-end journey hai.',
      tip: 'Interview mein har step ka ek line bolo, fir jis par poochein deep jao — structured answer impress karता hai.',
      warning: 'Sub-resources (CSS/JS/images) ke liye yeh cycle (DNS/TCP/HTTP) phir se chal sakता hai (alag domains).',
    },
    compare: {
      headers: ['Phase', 'Kaam', 'Typical time'],
      rows: [
        ['DNS', 'Hostname -> IP', '~20-120ms (cache miss)'],
        ['TCP', '3-way handshake', '~1 RTT'],
        ['TLS', 'Secure channel', '1-2 RTT (1.2), 1 RTT (1.3)'],
        ['TTFB', 'Server processing', 'Varies'],
        ['Render', 'Parse + paint', 'Depends on page'],
      ],
    },
    mistakes: [
      { bad: 'DNS step skip kar dena answer mein.', fix: 'DNS pehla critical network step hai — hamesha mention karo.' },
      { bad: 'TLS ko TCP se pehle batana.', fix: 'Pehle TCP connection, fir uske upar TLS handshake hota hai (HTTP/1.1/2 mein).' },
      { bad: 'Rendering ko "bas dikh gaya" bol kar chhodna.', fix: 'DOM->CSSOM->RenderTree->Layout->Paint->Composite detail do.' },
    ],
    best: [
      'Answer ko phases mein structure karo (network -> parse -> render).',
      'Caching aur optimizations (preconnect, HTTP/2) mention karo.',
      'Navigation Timing API ka zikr bonus deta hai.',
      'Sub-resource fetching parallelism samjhao.',
    ],
    performance:
      'Har RTT (round-trip time) latency add karता hai, isliye DNS prefetch, preconnect, HTTP/2 multiplexing, aur HTTP/3 (0-RTT) crucial hain. TTFB aur First Contentful Paint optimize karna user experience ka core hai. ⚡',
    tricky: [
      { title: 'HTTP/3 mein TCP handshake hota hai?', explain: 'Nahi — HTTP/3 QUIC (UDP par) use karता hai, jo TCP+TLS handshake ko ek combined fast handshake mein merge kar deता hai (0-RTT possible).' },
      { title: 'Type karte hi page kabhi-kabhi instant kyun load hota hai?', explain: 'HSTS preload, browser cache, ya Service Worker se page already cached ho sakता hai — network call hi nahi hoti.' },
    ],
    interview: {
      beginner: [
        { q: 'URL Enter dabane par sabse pehle kya hota hai?', a: 'Browser URL parse karता hai aur cache/HSTS check karता hai, fir DNS lookup shuru karता hai.' },
      ],
      intermediate: [
        { q: 'DNS ke baad kya hota hai?', a: 'IP mil jaata hai, fir TCP 3-way handshake aur (HTTPS) TLS handshake hota hai, fir HTTP request jaता hai.' },
        { q: 'Page kaise render hota hai?', a: 'HTML->DOM, CSS->CSSOM, JS execute, Render Tree, Layout, Paint, Composite — fir screen par dikhता hai.' },
      ],
      advanced: [
        { q: 'Latency kam karne ke kaun se network techniques hain?', a: 'DNS prefetch, preconnect, HTTP/2 multiplexing, HTTP/3 (QUIC 0-RTT), CDN, caching, aur TLS 1.3.' },
      ],
    },
    mcqs: [
      { q: 'TLS handshake kab hota hai?', options: ['DNS se pehle', 'TCP connection ke baad', 'HTTP response ke baad', 'Rendering ke dauran'], answer: 1, explain: 'TLS handshake TCP connection establish hone ke baad hota hai (HTTP/1.1/2).' },
      { q: 'Hostname ko IP mein kaun convert karता hai?', options: ['TCP', 'TLS', 'DNS', 'HTTP'], answer: 2, explain: 'DNS hostname ko IP address mein resolve karता hai.' },
    ],
    exercises: {
      easy: ['Navigation ke 6 main steps yaad karke likho.'],
      medium: ['Navigation Timing API se DNS aur TCP time measure karo.'],
      advanced: ['HTTP/2 aur HTTP/3 navigation flow ka comparison likho.'],
    },
    summary: [
      'URL parse + cache check pehla step.',
      'DNS hostname ko IP mein convert karता hai.',
      'TCP handshake -> TLS handshake (https) -> HTTP request.',
      'Server HTML response deता hai.',
      'Parse (DOM/CSSOM) -> Layout -> Paint -> page visible.',
    ],
    cheatsheet: [
      { h: 'Navigation order', code: `URL parse / cache\n  -> DNS (IP)\n  -> TCP handshake\n  -> TLS handshake (https)\n  -> HTTP request/response\n  -> Parse (DOM+CSSOM)\n  -> Layout -> Paint -> Composite` },
    ],
    projects: ['Page-load waterfall visualizer', 'TTFB monitoring tool', 'Navigation Timing dashboard'],
    advanced:
      'Senior depth: real navigation mein browser process aur renderer process IPC karte hain — Browser process navigation start karता hai, response ke commit hone par Renderer ko document handover hota hai ("navigation commit"). Speculative connections, preload scanner, aur Early Hints (103) latency kam karte hain. CRP optimization aur resource prioritization yahan key hain.',
    quiz: [
      { q: 'HTTP/3 kis protocol par chalta hai?', options: ['TCP', 'UDP (QUIC)', 'SMTP', 'FTP'], answer: 1, explain: 'HTTP/3 QUIC use karता hai jo UDP par bana hai.' },
    ],
    related: ['dns-lookup', 'tcp-udp', 'tls-ssl', 'critical-rendering-path'],
  },

  'dns-lookup': {
    overview:
      'DNS (Domain Name System) internet ki **phonebook** hai — yeh human-friendly domain (google.com) ko machine IP address (142.250.x.x) mein convert karता hai. Computers IP se baat karte hain, hum naam yaad rakhte hain. DNS yeh translation karता hai. 📞',
    why:
      'Navigation flow ka pehla network step DNS hai. Interview mein "DNS resolution kaise hota hai", "cache layers kya hain", "recursive vs iterative" classic questions hain. DNS slow hua to page load slow — performance ka direct connection.',
    concept: [
      { h: 'DNS kya hai aur kyun', p: 'IP address (numbers) yaad rakhna mushkil hai. DNS naam ko IP mein map karता hai. Yeh ek distributed, hierarchical database hai jo poori duniya mein faila hua hai.' },
      { h: 'Cache layers (sabse pehle yeh)', p: 'Lookup shuru hone se pehle browser check karता hai: **Browser DNS cache** -> **OS cache** (hosts file + resolver cache) -> **Router cache** -> **ISP resolver cache**. Kahin bhi mil gaya to wahin se return, network call bach gayi.' },
      { h: 'Recursive resolver', p: 'Agar cache miss, to ISP/Google (8.8.8.8) ka **recursive resolver** kaam sambhालता hai. Yeh aapki taraf se baaki servers se poochta hai aur final IP laकर deता hai.' },
      { h: 'Root -> TLD -> Authoritative', p: 'Resolver pehle **Root server** se poochta hai (".com kaun handle karता hai?"), Root **TLD server** (.com) batाता hai, TLD server **Authoritative server** (google.com ka owner) batाता hai, jo final IP deता hai. 🌳' },
      { h: 'DNS records', p: '**A** (IPv4), **AAAA** (IPv6), **CNAME** (alias), **MX** (mail), **NS** (nameserver), **TXT** (verification/SPF). TTL har record ke saath hota hai jo batाता hai kitni der cache rakhni hai.', code: `// Common DNS records\n// A     google.com -> 142.250.x.x  (IPv4)\n// AAAA  google.com -> 2607:...      (IPv6)\n// CNAME www -> google.com           (alias)\n// MX    mail handling\n// NS    nameservers\n// TXT   verification / SPF` },
    ],
    analogy:
      'DNS ek **phone directory** hai. 📒 Aapko apne dost ka phone number (IP) yaad nahi, par naam (domain) yaad hai. Aap directory mein naam dhoondhte ho aur number nikal lete ho. Cache layers aapki "recent contacts" list ki tarah hain — bar-bar directory kholne ki zaroorat nahi.',
    syntax: {
      code: `# Command line se DNS dekho (terminal):\nnslookup google.com\ndig google.com A\n\n# Browser DNS cache clear (Chrome):\n# chrome://net-internals/#dns -> Clear host cache`,
      note: 'nslookup aur dig DNS debugging ke standard tools hain.',
      lang: 'js',
    },
    steps: [
      'Browser DNS cache check.',
      'OS cache (hosts file + resolver) check.',
      'Router cache check.',
      'ISP recursive resolver se poochna.',
      'Resolver Root server se poochta hai.',
      'Root TLD server (.com) batाता hai.',
      'TLD Authoritative server batाता hai.',
      'Authoritative server final IP deता hai; resolver cache karke browser ko return.',
    ],
    internals:
      'Recursive resolver heavy-lifting karता hai (aapke liye sab servers se poochna). Authoritative servers tak ka path "iterative" hota hai (resolver step-by-step poochta hai). TTL caching ke through repeat lookups avoid hote hain. **DNS-over-HTTPS (DoH)** aur **DNS-over-TLS (DoT)** privacy ke liye DNS queries ko encrypt karte hain. 🧠',
    process: {
      type: 'timeline',
      items: [
        { year: '1', text: 'Browser/OS/Router cache check.' },
        { year: '2', text: 'Cache miss -> ISP recursive resolver.' },
        { year: '3', text: 'Resolver -> Root server (".com?").' },
        { year: '4', text: 'Root -> TLD server (.com).' },
        { year: '5', text: 'TLD -> Authoritative server (google.com).' },
        { year: '6', text: 'Authoritative -> final IP; cache + return.' },
      ],
    },
    visual: {
      type: 'tree',
      root: 'DNS Hierarchy',
      children: [
        { label: 'Root', sub: '. (13 root servers)', color: '#EF4444', children: [
          { label: 'TLD', sub: '.com .org .in', color: '#F97316', children: [
            { label: 'Authoritative', sub: 'google.com IP', color: '#22C55E' },
          ] },
        ] },
      ],
    },
    memory:
      'TTL (Time To Live) decide karता hai kitni der ek record cache mein rahe. Chhota TTL = fresh data par zyada lookups; bada TTL = fast par stale ho sakता. Browser, OS, resolver sab apni cache rakhte hain.',
    browser:
      'Chrome DNS prefetch karता hai (page ke links ke domains pehle se resolve). chrome://net-internals/#dns se cache dekh/clear kar sakte ho. Browsers ab DNS-over-HTTPS (DoH) support karte hain privacy ke liye.',
    notes: {
      concept: 'DNS domain ko IP mein convert karता hai; cache layers + Root/TLD/Authoritative hierarchy.',
      tip: 'Lookup hamesha cache se shuru hoti hai — browser -> OS -> router -> ISP.',
      warning: 'Recursive vs iterative confuse mat karo: resolver recursively client ki seva karता hai, par servers se iteratively poochta hai.',
    },
    compare: {
      headers: ['Layer', 'Kahan', 'Speed'],
      rows: [
        ['Browser cache', 'Browser memory', 'Fastest'],
        ['OS cache', 'Operating system', 'Fast'],
        ['Router cache', 'Local router', 'Fast'],
        ['ISP resolver', 'ISP servers', 'Network call'],
        ['Authoritative', 'Domain owner', 'Slowest (full resolve)'],
      ],
    },
    mistakes: [
      { bad: 'Sochna har request par full DNS resolve hota hai.', fix: 'Cache layers ki wajah se zyadatar lookups cache se hi mil jaate hain.' },
      { bad: 'A aur AAAA record ko same samajhna.', fix: 'A IPv4 deता hai, AAAA IPv6 deता hai.' },
      { bad: 'Recursive aur iterative ko interchange karna.', fix: 'Resolver client ke liye recursive hai par authoritative chain mein iterative queries karता hai.' },
    ],
    best: [
      'Cache layers ka order yaad rakho (browser->OS->router->ISP).',
      'TTL trade-offs samjho (freshness vs lookups).',
      'DNS prefetch/preconnect se latency kam karo.',
      'DoH/DoT privacy improvements jaano.',
    ],
    performance:
      'DNS lookup ek round-trip add karta hai (cache miss par). Isliye <link rel="dns-prefetch"> aur preconnect hints third-party domains ke liye load fast karte hain. CDN aur Anycast DNS resolution time kam karte hain. ⚡',
    tricky: [
      { title: 'Galat IP cache ho gaya, site nahi khul rahi — kya karein?', explain: 'DNS cache stale ho sakता hai (purana IP). chrome://net-internals/#dns aur OS resolver cache (ipconfig /flushdns) clear karne se theek hota hai.' },
      { title: 'CDN domain har baar alag IP kyun deता hai?', explain: 'GeoDNS/Anycast user ke nearest server ka IP return karता hai, isliye location/load ke hisaab se IP badal sakता hai.' },
    ],
    interview: {
      beginner: [
        { q: 'DNS kya hai?', a: 'Domain Name System — domain naam ko IP address mein convert karne wala internet ka phonebook.' },
      ],
      intermediate: [
        { q: 'DNS cache layers kaun se hain?', a: 'Browser cache, OS cache, router cache, aur ISP resolver cache.' },
        { q: 'Root, TLD, Authoritative server ka role?', a: 'Root TLD ka pata deता hai, TLD authoritative ka, authoritative final IP deता hai.' },
      ],
      advanced: [
        { q: 'Recursive aur iterative resolution mein fark?', a: 'Recursive: resolver client ke liye poora kaam karke final answer laता hai. Iterative: server sirf next server ka reference deता hai, client/resolver khud aage poochta hai.' },
      ],
    },
    mcqs: [
      { q: 'A record kya deता hai?', options: ['IPv6', 'IPv4', 'Mail server', 'Alias'], answer: 1, explain: 'A record IPv4 address map karता hai.' },
      { q: 'DNS lookup sabse pehle kahan check karता hai?', options: ['Root server', 'Browser cache', 'TLD server', 'Authoritative'], answer: 1, explain: 'Sabse pehle browser apni DNS cache check karता hai.' },
    ],
    exercises: {
      easy: ['nslookup se kisi site ka IP nikalo.'],
      medium: ['DNS cache layers ka order diagram banao.'],
      advanced: ['dig se A, AAAA, MX, NS records inspect karo.'],
    },
    summary: [
      'DNS domain ko IP mein convert karता hai (internet phonebook).',
      'Cache order: browser -> OS -> router -> ISP resolver.',
      'Hierarchy: Root -> TLD -> Authoritative.',
      'Records: A, AAAA, CNAME, MX, NS, TXT; TTL caching.',
      'DoH/DoT DNS queries encrypt karke privacy dete hain.',
    ],
    cheatsheet: [
      { h: 'DNS flow', code: `cache (browser/OS/router/ISP)\n  -> recursive resolver\n  -> Root (.)\n  -> TLD (.com)\n  -> Authoritative\n  -> IP returned + cached` },
      { h: 'Records', code: `A=IPv4  AAAA=IPv6  CNAME=alias\nMX=mail NS=nameserver TXT=verify` },
    ],
    projects: ['DNS lookup CLI tool', 'TTL-aware cache simulator', 'dns-prefetch performance demo'],
    advanced:
      'Senior depth: DNS distributed + hierarchical hai. Anycast se ek IP par geographically nearest server respond karता hai (resilience + speed). DNSSEC records ko cryptographically sign karke spoofing rokta hai. DoH/DoT privacy dete hain par centralization debate bhi laate hain. CDN DNS-based routing ka backbone hai.',
    quiz: [
      { q: 'TTL kya control karता hai?', options: ['IP version', 'Cache duration', 'Server load', 'Encryption'], answer: 1, explain: 'TTL batाता hai DNS record kitni der cache rahe.' },
    ],
    related: ['navigation-flow', 'tcp-udp', 'browser-caching'],
  },

  'tcp-udp': {
    overview:
      'TCP aur UDP do transport-layer protocols hain jo data ko network par bhejते hain. **TCP** reliable hai (data guaranteed, ordered) — web, email ke liye. **UDP** fast par unreliable hai — video calls, gaming, aur HTTP/3 (QUIC) ke liye. Inka fark interview ka pakka sawaal hai. 📦',
    why:
      'Navigation flow mein connection setup TCP par hota hai. "TCP vs UDP", "3-way handshake samjhao" bahut common questions hain. HTTP/3 ke UDP shift ko samajhne ke liye yeh foundation zaroori hai. Networking interviews ka core.',
    concept: [
      { h: 'TCP (Transmission Control Protocol)', p: '**Connection-oriented, reliable, ordered.** Pehle handshake se connection banता hai, data guaranteed deliver hota hai (acknowledgements + retransmission), aur order maintain hota hai. Thoda slow par bharosेmand. Web, email, file transfer iska use karte hain.' },
      { h: 'UDP (User Datagram Protocol)', p: '**Connectionless, fast, unreliable.** No handshake, no guarantee, no ordering. Bas "fire and forget". Packet kho gaya to kho gaya. Low latency chahiye wahan: live video, VoIP, online gaming, DNS, aur HTTP/3 (QUIC). ⚡' },
      { h: 'TCP 3-way handshake', p: 'Connection banane ka process: **SYN** (client: "connect karna chahta hoon"), **SYN-ACK** (server: "theek hai, main bhi ready"), **ACK** (client: "confirm, shuru karein"). Teen messages ke baad connection ready. 🤝' },
      { h: 'Reliability mechanisms', p: 'TCP sequence numbers (ordering), acknowledgements (confirm delivery), retransmission (lost packets dobara), flow control (receiver overload na ho), aur congestion control (network jam na ho) use karता hai. UDP mein in mein se kuch nahi.' },
      { h: 'Kab kaun use karein', p: 'TCP: jab har byte zaroori ho (webpage, payment). UDP: jab speed > perfection ho (live stream — ek frame miss chalega par lag nahi chahiye). HTTP/3 UDP par QUIC banakar reliability khud handle karता hai.', code: `// 3-way handshake\n// Client --- SYN --->        Server\n// Client <-- SYN-ACK -       Server\n// Client --- ACK --->        Server\n// Connection established!` },
    ],
    analogy:
      'TCP ek **registered courier** hai 📮 — receiver sign karता hai (acknowledgement), parcel kho gaya to dobara bhejते hain, sab order mein milta hai. UDP ek **postcard throwing** hai 🃏 — bas phenk diya, mila to mila, na mila to na mila, par super fast. Live cricket commentary ke liye postcard theek hai (purani baat ki dobari nahi chahiye).',
    syntax: {
      code: `// Application level par aap directly TCP/UDP nahi chunte browser mein,\n// par concept aise dikhega (Node.js example):\n\n// TCP server\nconst net = require('net')\nnet.createServer(socket => socket.write('hi')).listen(3000)\n\n// UDP socket\nconst dgram = require('dgram')\nconst u = dgram.createSocket('udp4')\nu.send('ping', 41234, 'localhost')`,
      note: 'Browsers HTTP/1.1/2 ke liye TCP, HTTP/3 ke liye UDP (QUIC) use karte hain — aap explicitly choose nahi karte.',
      lang: 'js',
    },
    steps: [
      'TCP: Client SYN bhejता hai (sequence number ke saath).',
      'Server SYN-ACK se reply karता hai (acknowledge + apna SYN).',
      'Client ACK bhejता hai -> connection established.',
      'Data exchange hota hai (sequenced, acknowledged).',
      'Lost packet par retransmission hota hai.',
      'Connection 4-way handshake (FIN/ACK) se close hota hai.',
      'UDP: koi handshake nahi — bas datagrams seedhe bhej diye.',
    ],
    internals:
      'TCP ka sliding window flow control receiver ki capacity manage karता hai; congestion control (Reno, CUBIC, BBR) network ko jam hone se rokता hai. Lost packets retransmit hote hain par "head-of-line blocking" ho sakता hai (ek packet ke kho jaने se baaki ruk jaate hain). QUIC (HTTP/3) UDP par reliability + multiplexing deता hai bina HOL blocking ke. 🧠',
    process: {
      type: 'boxes',
      items: [
        { label: 'SYN', sub: 'Client -> Server', color: '#F97316' },
        { label: 'SYN-ACK', sub: 'Server -> Client', color: '#3B82F6' },
        { label: 'ACK', sub: 'Client -> Server', color: '#22C55E' },
        { label: 'Data', sub: 'Reliable transfer', color: '#8B5CF6' },
      ],
    },
    visual: {
      type: 'timeline',
      items: [
        { year: '1', text: 'TCP: SYN/SYN-ACK/ACK se connection.' },
        { year: '2', text: 'Data sequenced + acknowledged.' },
        { year: '3', text: 'Lost packets retransmit.' },
        { year: '4', text: 'UDP: no handshake, fire-and-forget.' },
        { year: '5', text: 'HTTP/3 (QUIC) UDP par reliability khud deता hai.' },
      ],
    },
    browser:
      'Browsers HTTP/1.1 aur HTTP/2 ke liye TCP par chalte hain. HTTP/3 UDP (QUIC) use karता hai — connection setup fast aur per-stream multiplexing bina TCP ke head-of-line blocking ke. WebRTC (video calls) bhi UDP use karता hai.',
    notes: {
      concept: 'TCP=reliable/ordered/slow; UDP=fast/unreliable/no-order. 3-way handshake: SYN, SYN-ACK, ACK.',
      tip: '"UDP" yaad rakho as "Unreliable Datagram Protocol" — guarantee nahi deता.',
      warning: 'HTTP/3 UDP par hai par unreliable nahi — QUIC reliability layer add karता hai.',
    },
    compare: {
      headers: ['Feature', 'TCP', 'UDP'],
      rows: [
        ['Connection', 'Connection-oriented', 'Connectionless'],
        ['Reliability', 'Guaranteed', 'No guarantee'],
        ['Ordering', 'Ordered', 'No ordering'],
        ['Speed', 'Slower', 'Faster'],
        ['Use case', 'Web, email, files', 'Video, gaming, DNS, HTTP/3'],
      ],
    },
    mistakes: [
      { bad: 'UDP ko "kharab/useless" samajhna.', fix: 'UDP low-latency apps (gaming, video, DNS) ke liye ideal hai.' },
      { bad: '3-way handshake ko 2 steps batana.', fix: 'Teen steps hain: SYN, SYN-ACK, ACK.' },
      { bad: 'HTTP/3 ko unreliable maan lena kyunki UDP hai.', fix: 'QUIC UDP ke upar reliability + ordering add karता hai.' },
    ],
    best: [
      '3-way handshake ke teen steps yaad rakho.',
      'Use-case ke hisaab se TCP/UDP choose karna samjho.',
      'QUIC/HTTP/3 ke UDP advantages jaano.',
      'Head-of-line blocking concept clear rakho.',
    ],
    performance:
      'TCP handshake ek extra RTT add karता hai connection start par; HTTPS par TLS aur RTT jodता hai. QUIC (HTTP/3) handshake combine karke 0-1 RTT mein connection deता hai, aur per-stream independence se HOL blocking khatam karता hai — yeh modern web ki speed ka raaz hai. ⚡',
    tricky: [
      { title: 'Live video call kis protocol par hota hai aur kyun?', explain: 'UDP par (WebRTC). Kyunki latency critical hai — ek purana frame retransmit karne se lag aaता; better hai use drop karke aage badho.' },
      { title: 'TCP mein head-of-line blocking kya hai?', explain: 'Ek packet kho jaने par baaki sab received packets bhi application tak nahi pahunchte jab tak woh retransmit na ho — sab "line mein ruk jaate hain".' },
    ],
    interview: {
      beginner: [
        { q: 'TCP aur UDP mein basic fark?', a: 'TCP reliable, ordered, connection-oriented hai; UDP fast, unreliable, connectionless hai.' },
      ],
      intermediate: [
        { q: '3-way handshake samjhao.', a: 'SYN (client), SYN-ACK (server), ACK (client) — teen messages ke baad TCP connection ready ho jaता hai.' },
        { q: 'UDP kahan use hota hai?', a: 'Live video/VoIP, online gaming, DNS, aur HTTP/3 (QUIC) — jahan speed > reliability.' },
      ],
      advanced: [
        { q: 'TCP ke reliability mechanisms kya hain?', a: 'Sequence numbers (ordering), ACKs, retransmission, flow control (sliding window), aur congestion control (CUBIC/BBR).' },
      ],
    },
    mcqs: [
      { q: '3-way handshake ka sahi order?', options: ['ACK, SYN, SYN-ACK', 'SYN, SYN-ACK, ACK', 'SYN, ACK, FIN', 'SYN-ACK, SYN, ACK'], answer: 1, explain: 'Sahi order: SYN -> SYN-ACK -> ACK.' },
      { q: 'HTTP/3 kis protocol par hai?', options: ['TCP', 'UDP (QUIC)', 'SCTP', 'ICMP'], answer: 1, explain: 'HTTP/3 QUIC use karता hai jo UDP par bana hai.' },
    ],
    exercises: {
      easy: ['TCP vs UDP ka 5-point comparison likho.'],
      medium: ['3-way handshake ka diagram banao.'],
      advanced: ['Head-of-line blocking aur QUIC ka solution explain karo.'],
    },
    summary: [
      'TCP: reliable, ordered, connection-oriented (web/email).',
      'UDP: fast, unreliable, connectionless (video/gaming/DNS).',
      '3-way handshake: SYN, SYN-ACK, ACK.',
      'TCP reliability: sequence, ACK, retransmission, flow/congestion control.',
      'HTTP/3 QUIC UDP par reliability + multiplexing deता hai.',
    ],
    cheatsheet: [
      { h: 'TCP vs UDP', code: `TCP: reliable, ordered, slow, handshake\nUDP: fast, no-guarantee, no-order\nHandshake: SYN -> SYN-ACK -> ACK` },
    ],
    projects: ['Chat app over TCP', 'Real-time game over UDP', 'Handshake visualizer'],
    advanced:
      'Senior depth: TCP congestion control algorithms (Reno, CUBIC, BBR) bandwidth fairly share karne ke liye evolve hue. TCP ka HOL blocking aur multi-RTT setup HTTP/2 ki performance ko limit karता tha; isliye QUIC (UDP-based) bana jo connection-ID se network switch par bhi connection bachाता hai aur per-stream loss recovery deता hai.',
    quiz: [
      { q: 'Kaun sa protocol guaranteed delivery deता hai?', options: ['UDP', 'TCP', 'ICMP', 'ARP'], answer: 1, explain: 'TCP acknowledgements + retransmission se guaranteed delivery deता hai.' },
    ],
    related: ['navigation-flow', 'tls-ssl', 'http-versions'],
  },

  'tls-ssl': {
    overview:
      'TLS (Transport Layer Security, purana naam SSL) woh protocol hai jo HTTPS ko secure banाता hai. Yeh data ko **encrypt** karता hai taaki beech mein koi padh na sake, server ki **identity verify** karता hai (certificate), aur data ki **integrity** rakhता hai. Lock icon 🔒 isi ka result hai.',
    why:
      'Har modern site HTTPS use karती hai. "TLS handshake samjhao", "symmetric vs asymmetric", "certificate kaise verify hota hai" — security interviews ke core questions. Yeh privacy aur trust ka foundation hai.',
    concept: [
      { h: 'SSL vs TLS', p: 'SSL purana protocol tha (ab deprecated, insecure). TLS uska successor hai. Aaj "SSL certificate" bolte hain par actually **TLS** hi use hota hai. Current versions: TLS 1.2 aur TLS 1.3.' },
      { h: 'Symmetric vs Asymmetric encryption', p: '**Asymmetric** (public/private key): slow par key exchange ke liye safe. **Symmetric** (ek shared key): fast par key dono ke paas honi chahiye. TLS dono use karता hai — asymmetric se safely ek symmetric "session key" decide karta hai, fir us fast symmetric key se data encrypt. 🔑' },
      { h: 'Certificates & CA', p: 'Server ek **digital certificate** deता hai (Certificate Authority/CA jaise Lets Encrypt se signed). Browser CA ke signature verify karता hai taaki pata chale server asli hai, koi impostor nahi. Chain of trust: site cert -> intermediate CA -> root CA (browser mein pre-installed).' },
      { h: 'TLS handshake steps', p: '**ClientHello** (supported ciphers, TLS version) -> **ServerHello** + certificate -> client cert verify karता hai -> key exchange (session key decide) -> dono "Finished" -> ab symmetric encrypted data flow. 🤝' },
      { h: 'TLS 1.2 vs 1.3', p: 'TLS 1.3 zyada fast aur secure: handshake 2 RTT se 1 RTT (ya 0-RTT resumption) ho gaya, purane weak ciphers hata diye. Yeh modern HTTPS ka default ban raha hai.', code: `// TLS handshake (simplified, TLS 1.2)\n// 1. ClientHello  (ciphers, random)\n// 2. ServerHello  + Certificate\n// 3. Client verifies cert (CA chain)\n// 4. Key exchange -> shared session key\n// 5. Finished (both) -> encrypted data` },
    ],
    analogy:
      'TLS ek **locked briefcase exchange** ki tarah hai. 💼 Pehle dono ek secret lock combination (session key) decide karते hain ek secure tarike se (asymmetric). Server apna ID card (certificate) dikhata hai jise ek trusted authority (CA) ne verify kiya. Iske baad sab documents us locked briefcase (symmetric encryption) mein hi exchange hote hain — beech wala koi padh nahi sakता.',
    syntax: {
      code: `# Certificate inspect karna (terminal):\nopenssl s_client -connect google.com:443\n\n// Browser mein: lock icon -> Connection secure -> Certificate dekho\n// HSTS header force-https karता hai:\n// Strict-Transport-Security: max-age=31536000; includeSubDomains`,
      note: 'HSTS browser ko hamesha HTTPS use karne ko force karता hai (downgrade attacks rokता).',
      lang: 'js',
    },
    steps: [
      'Client ClientHello bhejता hai (TLS version, cipher suites, random).',
      'Server ServerHello + apna certificate bhejता hai.',
      'Client certificate ko CA chain se verify karता hai.',
      'Key exchange — dono ek shared symmetric session key derive karte hain.',
      'Dono "Finished" message bhejते hain (encrypted).',
      'Ab saara data symmetric session key se encrypt hokar flow karता hai.',
      'Session resumption se agli baar handshake fast (0-RTT) ho sakta hai.',
    ],
    internals:
      'Asymmetric crypto (RSA/ECDHE) sirf session key securely agree karne ke liye use hoti hai (slow). Actual data symmetric (AES) se encrypt hota hai (fast). TLS 1.3 ne forward secrecy ke liye ephemeral keys (ECDHE) mandatory ki, weak algorithms hatae, aur handshake ko 1-RTT kar diya. Certificate verification chain-of-trust par chalती hai. 🧠',
    process: {
      type: 'boxes',
      items: [
        { label: 'ClientHello', sub: 'Ciphers, version', color: '#F97316' },
        { label: 'ServerHello', sub: '+ Certificate', color: '#3B82F6' },
        { label: 'Verify', sub: 'CA chain check', color: '#EF4444' },
        { label: 'Key Exchange', sub: 'Session key', color: '#8B5CF6' },
        { label: 'Encrypted Data', sub: 'AES symmetric', color: '#22C55E' },
      ],
    },
    visual: {
      type: 'timeline',
      items: [
        { year: '1', text: 'ClientHello: supported ciphers + TLS version.' },
        { year: '2', text: 'ServerHello + certificate bheja.' },
        { year: '3', text: 'Client CA chain se cert verify karता hai.' },
        { year: '4', text: 'Shared symmetric session key derive.' },
        { year: '5', text: 'Encrypted (AES) data exchange shuru.' },
      ],
    },
    browser:
      'Browser pre-installed root CA list rakhता hai (trust store). Invalid/expired/self-signed cert par "Not Secure" warning dikhता hai. Lock icon click karke aap certificate details dekh sakte ho. HSTS preload list browsers mein built-in hoti hai.',
    notes: {
      concept: 'TLS = encryption + authentication (cert) + integrity. Asymmetric se key exchange, symmetric se data.',
      tip: 'TLS 1.3 yaad rakho: faster (1-RTT/0-RTT), weak ciphers removed.',
      warning: 'SSL deprecated hai — "SSL certificate" bolते hain par actual TLS use hota hai.',
    },
    compare: {
      headers: ['Aspect', 'TLS 1.2', 'TLS 1.3'],
      rows: [
        ['Handshake RTT', '2 RTT', '1 RTT (0-RTT resume)'],
        ['Weak ciphers', 'Allowed', 'Removed'],
        ['Forward secrecy', 'Optional', 'Mandatory (ECDHE)'],
        ['Speed', 'Slower', 'Faster'],
      ],
    },
    mistakes: [
      { bad: 'Sochna TLS sirf symmetric ya sirf asymmetric use karता hai.', fix: 'Dono — asymmetric se key exchange, symmetric se actual data.' },
      { bad: 'SSL aur TLS ko current dono samajhna.', fix: 'SSL deprecated; aaj sirf TLS use hota hai.' },
      { bad: 'Certificate ko encryption ka source samajhna.', fix: 'Certificate identity verify karता hai; encryption keys se hoti hai.' },
    ],
    best: [
      'TLS 1.3 use karo (fast + secure).',
      'HSTS enable karo downgrade attacks rokne ke liye.',
      "Valid CA-signed certificates use karo (Let's Encrypt free).",
      'Forward secrecy (ECDHE) ciphers prefer karo.',
    ],
    performance:
      'TLS handshake RTT add karता hai, isliye TLS 1.3 ka 1-RTT/0-RTT aur session resumption crucial hain. HTTP/3 (QUIC) TLS ko transport mein integrate karke handshake aur fast karता hai. CDN edge par TLS terminate karke latency kam karte hain. ⚡',
    tricky: [
      { title: '0-RTT resumption ka risk kya hai?', explain: 'Replay attack — purana 0-RTT data attacker dobara bhej sakता hai. Isliye 0-RTT sirf idempotent (safe-to-repeat) requests ke liye use karna chahiye.' },
      { title: 'Self-signed certificate par browser kyun warning deता hai?', explain: 'Use kisi trusted CA ne sign nahi kiya, isliye browser identity verify nahi kar sakता — man-in-the-middle ho sakता hai.' },
    ],
    interview: {
      beginner: [
        { q: 'HTTPS HTTP se kaise alag hai?', a: 'HTTPS TLS encryption layer add karता hai — data encrypted, server authenticated, aur integrity protected.' },
      ],
      intermediate: [
        { q: 'TLS symmetric ya asymmetric use karता hai?', a: 'Dono — asymmetric se session key securely exchange, fir fast symmetric encryption se actual data.' },
        { q: 'Certificate ka role kya hai?', a: 'Server ki identity verify karna — CA-signed certificate se browser confirm karता hai ki server asli hai.' },
      ],
      advanced: [
        { q: 'TLS 1.3 mein kya improvements hain?', a: 'Handshake 1-RTT (0-RTT resumption), mandatory forward secrecy (ECDHE), weak ciphers removed, simpler/faster aur safer.' },
      ],
    },
    mcqs: [
      { q: 'TLS handshake ka pehla message kaun sa hai?', options: ['ServerHello', 'ClientHello', 'Certificate', 'Finished'], answer: 1, explain: 'ClientHello pehle bhejta hai supported ciphers/version ke saath.' },
      { q: 'Actual data encryption kis se hoti hai?', options: ['Asymmetric (RSA)', 'Symmetric session key', 'Hashing', 'Certificate'], answer: 1, explain: 'Data fast symmetric session key (AES) se encrypt hota hai.' },
    ],
    exercises: {
      easy: ['Kisi site ka certificate browser mein inspect karo.'],
      medium: ['TLS handshake ke 5 steps diagram banao.'],
      advanced: ['TLS 1.2 vs 1.3 handshake RTT compare karke explain karo.'],
    },
    summary: [
      'TLS (purana SSL) HTTPS ko secure banाता hai.',
      'Provides: encryption + authentication (cert) + integrity.',
      'Asymmetric se key exchange, symmetric se data encryption.',
      'Certificate CA-signed hota hai (chain of trust).',
      'TLS 1.3 faster (1-RTT/0-RTT) aur safer hai.',
    ],
    cheatsheet: [
      { h: 'TLS handshake', code: `ClientHello -> ServerHello + Cert\n-> verify cert (CA)\n-> exchange session key\n-> Finished -> encrypted data` },
      { h: 'Encryption', code: `Asymmetric -> key exchange (slow)\nSymmetric  -> data (fast, AES)` },
    ],
    projects: ["HTTPS setup with Let's Encrypt", 'Certificate expiry monitor', 'TLS handshake visualizer'],
    advanced:
      'Senior depth: TLS 1.3 ne handshake ko round-trips kam karne ke liye redesign kiya, aur ephemeral ECDHE se forward secrecy default kar di (purani session keys leak ho bhi to past traffic safe). QUIC TLS ko transport mein embed karता hai. Certificate Transparency logs misissued certs detect karte hain; OCSP stapling revocation check fast karता hai.',
    quiz: [
      { q: 'Forward secrecy ka fayda kya hai?', options: ['Faster handshake', 'Past traffic safe rehता hai key leak hone par', 'Smaller certs', 'No CA needed'], answer: 1, explain: 'Ephemeral keys se purana traffic future key compromise se safe rehता hai.' },
    ],
    related: ['tcp-udp', 'navigation-flow', 'http-versions'],
  },

  'http-versions': {
    overview:
      'HTTP woh protocol hai jisse browser aur server data exchange karte hain. Iske versions evolve hue: **HTTP/1.1** (text, one-request-per-connection issues), **HTTP/2** (multiplexing, binary, header compression), aur **HTTP/3** (QUIC over UDP, no head-of-line blocking). Comparison interview mein zaroor aata hai. 🌐',
    why:
      'Web performance ka core HTTP version par depend karता hai. "HTTP/1.1 vs 2 vs 3", "multiplexing kya hai", "HTTP/3 UDP par kyun" — frequent interview questions. Yeh navigation flow aur performance optimization se directly juda hai.',
    concept: [
      { h: 'HTTP/1.1 (1997)', p: 'Text-based, har request alag. **Problem**: ek connection par ek time ek hi request (head-of-line blocking), browsers ko parallelism ke liye 6 connections kholne padte the. Keep-alive aur pipelining the par pipelining buggy thi.' },
      { h: 'HTTP/2 (2015)', p: '**Multiplexing**: ek hi TCP connection par multiple requests parallel (streams). **Binary** protocol (text nahi), **header compression** (HPACK), aur **server push** (server pehle se resources bhejे). Bahut fast. Par TCP-level head-of-line blocking abhi bhi tha. ⚡' },
      { h: 'HTTP/3 (2022)', p: '**QUIC over UDP**. TCP ka HOL blocking khatam — har stream independent. Connection setup fast (TLS integrated, 0-RTT). Network switch (WiFi -> mobile) par connection bachता hai (connection ID). Modern web ka future. 🚀' },
      { h: 'Multiplexing samjho', p: 'HTTP/1.1 mein ek pipe se ek-ek karke cheezen jaati thi. HTTP/2 ek pipe mein multiple "lanes" (streams) banाता hai — sab parallel. HTTP/3 har lane ko UDP par independent rakhता hai taaki ek packet loss baaki ko na roke.' },
      { h: 'Head-of-line blocking', p: 'HTTP/1.1: application-level (ek slow response baaki rok deता). HTTP/2: TCP-level (ek lost TCP packet saare streams rok deता). HTTP/3: solved — QUIC per-stream loss recovery deता hai.', code: `// Evolution\n// HTTP/1.1: text, 1 req/connection (multiple TCP conns)\n// HTTP/2:   binary, multiplexed streams (1 TCP), HPACK\n// HTTP/3:   QUIC over UDP, no HOL blocking, 0-RTT` },
    ],
    analogy:
      'Socho ek **highway**. 🛣️ HTTP/1.1 = single-lane road, ek car ke baad doosri (jam aasaani se). HTTP/2 = multi-lane highway ek hi road par (cars parallel), par ek accident (lost packet) poori road rok deता hai (TCP HOL). HTTP/3 = har lane ki apni separate road (UDP streams) — ek accident sirf usi lane ko rokता hai, baaki chalti rehती hain.',
    syntax: {
      code: `// Browser DevTools -> Network tab -> Protocol column\n// h3   = HTTP/3\n// h2   = HTTP/2\n// http/1.1\n\n// Response header se version-related hints:\n// alt-svc: h3=\":443\"  (server HTTP/3 support batाता hai)`,
      note: 'DevTools Network panel mein "Protocol" column add karke har request ka HTTP version dekho.',
      lang: 'js',
    },
    steps: [
      'Browser server se connect karता hai (TCP for 1.1/2, UDP/QUIC for 3).',
      'HTTPS ke liye TLS handshake (HTTP/3 mein QUIC ke andar integrated).',
      'HTTP/1.1: requests serial/multiple connections.',
      'HTTP/2: ek connection par multiplexed streams.',
      'HTTP/3: QUIC streams, independent per-stream delivery.',
      'Headers compress hote hain (HPACK in h2, QPACK in h3).',
      'Server responses bhejता hai; browser parse + render karता hai.',
    ],
    internals:
      'HTTP/2 ek TCP connection ko frames mein todकर interleave karता hai (multiplexing) — par TCP packet loss saare streams ko block karता hai (TCP HOL). HTTP/3 QUIC use karता hai jo UDP par apni reliability + congestion control deता hai, har stream independent, aur TLS 1.3 transport mein baked. Connection ID se IP change par bhi connection survive karता hai. 🧠',
    process: {
      type: 'boxes',
      items: [
        { label: 'HTTP/1.1', sub: 'Text, serial', color: '#EF4444' },
        { label: 'HTTP/2', sub: 'Binary, multiplex (TCP)', color: '#8B5CF6' },
        { label: 'HTTP/3', sub: 'QUIC/UDP, no HOL', color: '#22C55E' },
      ],
    },
    visual: {
      type: 'timeline',
      items: [
        { year: '1991', text: 'HTTP/0.9 — sirf GET, plain HTML.' },
        { year: '1996', text: 'HTTP/1.0 — headers, status codes.' },
        { year: '1997', text: 'HTTP/1.1 — keep-alive, host header.' },
        { year: '2015', text: 'HTTP/2 — multiplexing, binary, HPACK.' },
        { year: '2022', text: 'HTTP/3 — QUIC over UDP, no HOL blocking.' },
      ],
    },
    memory:
      'HTTP/2 header compression (HPACK) aur HTTP/3 (QPACK) repeated headers ko dictionary se compress karte hain — har request mein same cookies/headers dobara bhejne ka overhead kam. Yeh bandwidth aur memory dono bachाता hai.',
    browser:
      'Browsers automatically best supported version negotiate karte hain (ALPN during TLS). Agar server "alt-svc: h3" advertise kare to browser HTTP/3 par upgrade kar sakता hai. Server push ab Chrome ne deprecate kar diya (Early Hints/preload prefer).',
    notes: {
      concept: 'HTTP/1.1=serial; HTTP/2=multiplexed binary (TCP); HTTP/3=QUIC over UDP (no HOL).',
      tip: 'HTTP/2 ka biggest win multiplexing hai; HTTP/3 ka biggest win HOL blocking ka khatma.',
      warning: 'HTTP/2 server push ab deprecated hai — interview mein latest status mention karna acha.',
    },
    compare: {
      headers: ['Feature', 'HTTP/1.1', 'HTTP/2', 'HTTP/3'],
      rows: [
        ['Transport', 'TCP', 'TCP', 'UDP (QUIC)'],
        ['Format', 'Text', 'Binary', 'Binary'],
        ['Multiplexing', 'No', 'Yes', 'Yes'],
        ['HOL blocking', 'App-level', 'TCP-level', 'None'],
        ['Header compression', 'No', 'HPACK', 'QPACK'],
      ],
    },
    mistakes: [
      { bad: 'HTTP/2 ko head-of-line blocking se completely free samajhna.', fix: 'HTTP/2 mein abhi bhi TCP-level HOL blocking hai; HTTP/3 use solve karता hai.' },
      { bad: 'HTTP/3 ko unreliable samajhna kyunki UDP.', fix: 'QUIC UDP par reliability + ordering khud add karता hai.' },
      { bad: 'HTTP/2 server push ko aaj bhi recommended samajhna.', fix: 'Yeh deprecated hai; preload/Early Hints use karo.' },
    ],
    best: [
      'HTTP/2 ya 3 enable karo (multiplexing benefits).',
      'Domain sharding HTTP/2 mein avoid karo (ek connection better).',
      'Header size chhota rakho (compression ke bawajood).',
      'HTTP/3 ke liye alt-svc advertise karo.',
    ],
    performance:
      'HTTP/2 multiplexing ne multiple-connection overhead khatam kiya; HTTP/3 ne TCP HOL blocking aur slow handshake fix kiya (0-RTT). Mobile/lossy networks par HTTP/3 ka faayda sabse zyada dikhता hai. CDN aur server config se enable karo. ⚡',
    tricky: [
      { title: 'HTTP/2 hone ke baad bhi page slow kyun ho sakता hai lossy network par?', explain: 'TCP head-of-line blocking — ek lost packet saare multiplexed streams ko rok deता hai. HTTP/3 (QUIC) yeh problem solve karता hai.' },
      { title: 'Domain sharding HTTP/2 mein kyun anti-pattern hai?', explain: 'HTTP/1.1 mein parallel connections ke liye sharding helpful tha, par HTTP/2 ek connection par multiplex karता hai — sharding extra connections/handshakes laकर ulta nuksaan karता hai.' },
    ],
    interview: {
      beginner: [
        { q: 'HTTP kya hai?', a: 'HyperText Transfer Protocol — browser aur server ke beech data exchange karne wala application-layer protocol.' },
      ],
      intermediate: [
        { q: 'HTTP/2 ne kya improve kiya?', a: 'Multiplexing (parallel streams ek connection par), binary framing, header compression (HPACK), aur server push.' },
        { q: 'HTTP/3 HTTP/2 se kaise alag hai?', a: 'HTTP/3 QUIC (UDP) par chalता hai, TCP HOL blocking khatam, faster connection setup (0-RTT), aur connection migration.' },
      ],
      advanced: [
        { q: 'QUIC TCP+TLS ko kaise improve karता hai?', a: 'QUIC UDP par reliability deता hai, TLS 1.3 ko integrate karता hai (combined handshake, 0-RTT), per-stream loss recovery se HOL blocking khatam, aur connection ID se network change par connection survive karता hai.' },
      ],
    },
    mcqs: [
      { q: 'HTTP/2 ka main feature kya hai?', options: ['Text format', 'Multiplexing', 'UDP transport', 'No headers'], answer: 1, explain: 'HTTP/2 multiplexing se ek connection par parallel requests deता hai.' },
      { q: 'HTTP/3 kis transport par chalता hai?', options: ['TCP', 'UDP (QUIC)', 'SCTP', 'WebSocket'], answer: 1, explain: 'HTTP/3 QUIC use karता hai jo UDP par bana hai.' },
    ],
    exercises: {
      easy: ['DevTools Network mein Protocol column dekho aur versions identify karo.'],
      medium: ['HTTP/1.1 vs 2 vs 3 ka comparison table banao.'],
      advanced: ['QUIC kaise TCP HOL blocking solve karता hai, explain karo.'],
    },
    summary: [
      'HTTP/1.1: text, serial, app-level HOL blocking.',
      'HTTP/2: binary, multiplexing, HPACK, server push.',
      'HTTP/3: QUIC over UDP, no HOL blocking, 0-RTT.',
      'Multiplexing ek connection par parallel requests deता hai.',
      'HTTP/3 mobile/lossy networks par best perform karता hai.',
    ],
    cheatsheet: [
      { h: 'HTTP versions', code: `1.1 -> TCP, text, serial\n2   -> TCP, binary, multiplex, HPACK\n3   -> QUIC/UDP, no HOL, 0-RTT, QPACK` },
    ],
    projects: ['Enable HTTP/2 on a server', 'HTTP/3 vs 2 latency benchmark', 'Protocol detection dashboard'],
    advanced:
      'Senior depth: QUIC IETF standard hai jo UDP ke upar streams, reliability, congestion control, aur TLS 1.3 ko combine karता hai. Iska connection migration (connection ID based) mobile users ke liye game-changer hai. HTTP/2 ka server push real-world mein helpful nahi nikla (cache-unaware), isliye deprecate hua; uski jagah Early Hints (103) aur preload aaye.',
    quiz: [
      { q: 'TCP head-of-line blocking kaun sa version solve karता hai?', options: ['HTTP/1.1', 'HTTP/2', 'HTTP/3', 'Koi nahi'], answer: 2, explain: 'HTTP/3 (QUIC over UDP) per-stream independence se TCP HOL blocking solve karता hai.' },
    ],
    related: ['tcp-udp', 'tls-ssl', 'navigation-flow'],
  },
}
