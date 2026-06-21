// JS content — Part 1: Fundamentals + Variables & Data Types

export const jsContentA = {
  'what-is-js': {
    overview:
      'JavaScript ek **programming language** hai jo web pages ko *interactive* banati hai. HTML page ka structure deta hai, CSS use sajaता hai, aur **JavaScript use jaan (behaviour)** deta hai — button click, form validation, animations, data fetch, sab JS karta hai. Aaj JS sirf browser tak nahi — server (Node.js), mobile apps, desktop apps, sab jagah chalti hai.',
    why:
      'JavaScript duniya ki sabse zyada use hone wali language hai (har website use karti hai). Frontend developer banne ke liye JS ka mazboot hona **must** hai — React, Angular, Vue sab JS par bane hain. Interview ka 70% JavaScript fundamentals par hota hai.',
    concept: [
      { h: 'JavaScript karti kya hai?', p: 'JS web page ko *dynamic* banati hai — matlab page bina reload kiye badal sakta hai. Cart mein item add karna, live search, dark mode toggle — sab JS.' },
      { h: 'History (chhoti kahani)', p: '1995 mein **Brendan Eich** ne Netscape ke liye sirf **10 din** mein JS banayi. Pehle naam "Mocha", phir "LiveScript", phir marketing ke liye "JavaScript" (Java popular tha tab). Java aur JavaScript **bilkul alag** hain — naam ka dhokha hai!' },
      { h: 'ECMAScript kya hai?', p: '**ECMAScript (ES)** JavaScript ka official *standard/rulebook* hai (ECMA-262). JavaScript us standard ka implementation hai. **ES6 (2015)** sabse bada update tha — let/const, arrow functions, classes, promises sab aaye. Uske baad har saal version aata hai (ES2016, ES2017…).', code: `// ES6 ke kuch features\nconst name = 'JS'\nconst greet = () => \`Hello \${name}\`\nconsole.log(greet())` },
    ],
    analogy:
      'Socho website ek **insaan** hai. HTML uska *body/skeleton* hai, CSS uske *kapde aur look*, aur JavaScript uska *dimaag aur muscles* — jo sochta hai aur react karta hai. Bina JS ke website ek statue ki tarah hai — sundar par hilती-dulती nahi. 🧠',
    syntax: { code: `// JS aise likhte hain (browser console / .js file)\nconsole.log('Hello World')\n\nlet user = 'Devendra'\nconsole.log('Welcome ' + user)`, note: 'console.log() output dikhane ka sabse common tarika hai — debugging ka best dost.' },
    examples: [
      { level: 'Beginner', title: 'Pehla JS program', code: `console.log('Namaste JavaScript! 🙏')`, result: 'Namaste JavaScript! 🙏', explain: 'console.log() browser ke developer console mein value print karta hai.' },
      { level: 'Beginner', title: 'Page ko interactive banao', code: `// HTML: <button id="btn">Click me</button>\nconst btn = document.getElementById('btn')\nbtn.addEventListener('click', () => {\n  alert('Button dab gaya! 🎉')\n})`, explain: 'Yahi JS ka asli kaam hai — user ke action par react karna.' },
    ],
    notes: {
      concept: 'JS ek **interpreted, dynamically-typed, single-threaded** language hai jo browser ke JS engine mein chalti hai.',
      tip: 'Sikhne ke liye browser kholo → F12 → Console tab. Wahan turant JS likh kar test kar sakte ho.',
      warning: 'Java aur JavaScript alag hain. "Java is to JavaScript what Car is to Carpet" — naam ke alawa kuch common nahi.',
    },
    compare: {
      headers: ['Cheez', 'HTML', 'CSS', 'JavaScript'],
      rows: [
        ['Kaam', 'Structure / content', 'Styling / look', 'Behaviour / logic'],
        ['Type', 'Markup language', 'Style sheet', 'Programming language'],
        ['Example', '<h1>, <p>', 'color, margin', 'if, loops, functions'],
      ],
    },
    mistakes: [
      { bad: 'JavaScript ko Java samajhna.', fix: 'Dono alag languages hain. Naam similar par kaam bilkul alag.' },
      { bad: '`console.log` ko `console.Log` likhna.', fix: 'JS case-sensitive hai — chhote/bade letters matter karte hain.' },
    ],
    best: ['Hamesha browser console mein experiment karo.', 'Chhote programs se shuru karo.', 'Variable/function ke naam meaningful rakho.'],
    interview: {
      beginner: [
        { q: 'JavaScript kya hai?', a: 'Ek high-level, interpreted, dynamically-typed programming language jo web ko interactive banati hai aur browser + server dono par chalti hai.' },
        { q: 'JavaScript aur Java mein fark?', a: 'Bilkul alag languages. Java compiled + statically-typed hai, JS interpreted + dynamically-typed. Naam ke alawa koi relation nahi.' },
      ],
      intermediate: [
        { q: 'ECMAScript kya hai?', a: 'JavaScript ka official standard/specification (ECMA-262). JS us standard ka implementation hai. ES6 (2015) sabse important version tha.' },
      ],
      advanced: [
        { q: 'JS interpreted hai ya compiled?', a: 'Modern JS engines (jaise V8) "JIT compilation" use karte hain — code ko runtime par machine code mein compile karte hain. To technically JS dono ka mix hai.' },
      ],
    },
    mcqs: [
      { q: 'JavaScript kisne banayi?', options: ['Brendan Eich', 'James Gosling', 'Guido van Rossum', 'Dennis Ritchie'], answer: 0, explain: 'Brendan Eich ne 1995 mein Netscape ke liye banayi.' },
      { q: 'ECMAScript kya hai?', options: ['Ek browser', 'JS ka standard', 'Ek library', 'Ek framework'], answer: 1, explain: 'ECMAScript JavaScript ka official standard hai.' },
    ],
    exercises: {
      easy: ['Console mein apna naam print karo.', 'Do numbers add karke console mein dikhao.'],
      medium: ['Ek button banao jo click par background colour badle.'],
      advanced: ['Ek choti to-do list banao jisme item add ho aur list update ho.'],
    },
    summary: [
      'JavaScript web ko interactive banati hai (behaviour layer).',
      '1995 mein Brendan Eich ne banayi.',
      'ECMAScript JS ka standard hai; ES6 (2015) sabse bada update.',
      'JS browser + server (Node) dono par chalti hai.',
    ],
    cheatsheet: [
      { h: 'Output', code: `console.log(x)   // console mein\nalert(x)         // popup\ndocument.write(x)` },
      { h: 'Comment', code: `// single line\n/* multi\n   line */` },
    ],
    projects: ['Form validation', 'Image slider', 'Live search', 'Dark/light theme toggle', 'Shopping cart', 'Games (memory, tic-tac-toe)'],
    advanced:
      'JavaScript "first-class functions" support karti hai (functions ko variables ki tarah pass kar sakte ho), prototype-based inheritance use karti hai, aur event-driven + non-blocking I/O ke liye famous hai — yahi cheez ise web ke liye perfect banati hai.',
    quiz: [
      { q: 'JS web page ko kya deti hai?', options: ['Structure', 'Styling', 'Behaviour/interactivity', 'Database'], answer: 2, explain: 'JS interactivity/behaviour deti hai.' },
      { q: 'Kaunsा ES version sabse bada update tha?', options: ['ES5', 'ES6', 'ES3', 'ES2020'], answer: 1, explain: 'ES6 (2015) — let/const, arrow, classes, promises.' },
    ],
    related: ['how-js-works', 'variables', 'single-threaded'],
  },

  'how-js-works': {
    overview:
      'JavaScript code ko chalane ke liye browser ke andar ek **JS Engine** hota hai. Engine code padhता hai, samajhta hai, aur **machine code** mein badalkar chalata hai. Har browser ka apna engine hai — Chrome ka **V8**, Firefox ka **SpiderMonkey**, Safari ka **JavaScriptCore**.',
    why:
      'Engine kaise kaam karता hai yeh samajhna interview mein bahut poocha jaata hai (V8, JIT, call stack, memory heap). Isse performance optimize karna aur "kyun aisa output aaya" samajhna aasaan ho jaata hai.',
    concept: [
      { h: 'JS Engine kya hai?', p: 'Ek program jo JS code ko execute karता hai. Do main parts: **Memory Heap** (variables/objects store) aur **Call Stack** (function execution track).' },
      { h: 'V8 Engine', p: 'Google ka super-fast engine, C++ mein likha. Chrome aur Node.js dono V8 use karte hain. Yahi JS ko itna fast banata hai.' },
      { h: 'Interpreted vs Compiled', p: '**Compiled** (C++): pehle poora code machine code mein convert, phir chalता. **Interpreted** (purani JS): line-by-line padh kar chalता. Modern JS dono ka mix use karti hai.' },
      { h: 'JIT Compilation', p: '**Just-In-Time**: V8 pehle code ko interpreter (Ignition) se jaldi chalata hai, aur jo code baar-baar chalता hai ("hot code") use compiler (TurboFan) optimized machine code mein badal deta hai. Best of both worlds — fast start + fast run.', code: `// V8 ka flow (simplified)\nSource Code\n   ↓ Parser → AST (Abstract Syntax Tree)\n   ↓ Ignition (interpreter) → Bytecode\n   ↓ TurboFan (compiler) → Optimized Machine Code` },
    ],
    analogy:
      'JIT ko aise samjho: Ek **translator** (interpreter) turant bol kar translate karता hai (fast start). Lekin jo lines baar-baar bolni hain, unki **printed copy** (compiled) bana leta hai taaki agli baar aur fast ho. 🗣️📄',
    syntax: { code: `// Engine kuch likhne ka syntax nahi — concept hai\n// Lekin call stack dekh sakte ho:\nfunction a() { b() }\nfunction b() { console.log('hi') }\na()\n// Stack: a() → b() → console.log → wapas khaali`, note: 'Engine internal hai — hum sirf JS likhte hain, engine use chalata hai.' },
    steps: [
      '**Parsing**: Engine code ko padhता hai aur **AST** (tree structure) banाता hai.',
      '**Compilation**: Ignition interpreter AST ko **bytecode** mein badalता hai.',
      '**Execution**: Bytecode chalता hai; call stack par functions push/pop hote hain.',
      '**Optimization**: TurboFan "hot" code ko optimized machine code mein compile karता hai (JIT).',
      '**De-optimization**: Agar assumption galat ho (jaise type badal jaaye), to wapas bytecode par aata hai.',
    ],
    internals:
      'V8 mein do main components hain: **Memory Heap** (jahan objects/variables allocate hote hain — unstructured memory) aur **Call Stack** (jahan execution context push/pop hote hain — LIFO order). Garbage Collector (Orinoco) un objects ko hata deta hai jinka koi reference nahi bacha.',
    visual: {
      type: 'boxes',
      items: [
        { label: 'Source Code', sub: 'Aapka JS', color: '#F59E0B' },
        { label: 'Parser → AST', sub: 'Tree banaya', color: '#6366F1' },
        { label: 'Bytecode', sub: 'Ignition', color: '#22C55E' },
        { label: 'Machine Code', sub: 'TurboFan (JIT)', color: '#EF4444' },
      ],
    },
    notes: {
      concept: 'JS Engine = Memory Heap + Call Stack. V8 = Chrome + Node ka engine.',
      tip: 'Node.js bhi V8 use karता hai — isliye JS server par bhi chal jaati hai.',
      warning: 'JS "single-threaded" hai — ek time par ek hi call stack, ek hi cheez chalti hai.',
    },
    compare: {
      headers: ['Feature', 'Interpreted', 'Compiled', 'JIT (modern JS)'],
      rows: [
        ['Kab convert', 'Run time, line-by-line', 'Pehle se poora', 'Run time par hot code'],
        ['Speed', 'Slow', 'Fast', 'Fast (dono ka mix)'],
        ['Example', 'Purani JS', 'C, C++', 'V8 (Chrome)'],
      ],
    },
    mistakes: [
      { bad: '"JS sirf interpreted hai" maan lena.', fix: 'Modern JS JIT compilation use karti hai — interpreted + compiled dono.' },
      { bad: 'V8 ko language samajhna.', fix: 'V8 ek engine hai jo JS chalata hai.' },
    ],
    best: ['Performance ke liye monomorphic code likho (same type ke values).', 'Bade loops mein objects ka shape (keys) consistent rakho — V8 optimize karता hai.', 'Memory leaks se bacho (unused references hatao).'],
    interview: {
      beginner: [
        { q: 'JS Engine kya hai?', a: 'Ek program jo JS code ko execute karता hai. Isme Memory Heap aur Call Stack hote hain. Chrome ka engine V8 hai.' },
      ],
      intermediate: [
        { q: 'V8 kya hai?', a: 'Google ka high-performance JS engine (C++ mein), jo Chrome aur Node.js mein use hota hai. JIT compilation use karता hai.' },
        { q: 'JS interpreted hai ya compiled?', a: 'Dono ka mix — JIT compilation. Pehle interpret hota hai, phir hot code optimized machine code mein compile hota hai.' },
      ],
      advanced: [
        { q: 'JIT compilation kaise kaam karता hai?', a: 'Ignition interpreter bytecode banाता hai (fast start). TurboFan compiler baar-baar chalne wale "hot" code ko optimized machine code mein badalता hai. Type assumptions galat hone par de-optimize ho jaata hai.' },
      ],
    },
    mcqs: [
      { q: 'Chrome ka JS engine?', options: ['SpiderMonkey', 'V8', 'Chakra', 'Nitro'], answer: 1, explain: 'Chrome aur Node dono V8 use karte hain.' },
      { q: 'JIT ka matlab?', options: ['Java In Time', 'Just-In-Time', 'JS Internal Tool', 'Join In Thread'], answer: 1, explain: 'Just-In-Time compilation.' },
    ],
    exercises: {
      easy: ['Likho: V8 kahan-kahan use hota hai?', '3 JS engines ke naam likho.'],
      medium: ['AST kya hota hai apne shabdon mein samjhao.'],
      advanced: ['Ek aisा code socho jo de-optimization trigger kare (type change karke).'],
    },
    summary: [
      'JS Engine code ko execute karता hai (Memory Heap + Call Stack).',
      'V8 = Chrome + Node ka engine.',
      'Modern JS JIT compilation use karti hai (interpreted + compiled mix).',
      'Ignition = interpreter, TurboFan = optimizing compiler.',
    ],
    cheatsheet: [
      { h: 'Engines', code: `Chrome  → V8\nFirefox → SpiderMonkey\nSafari  → JavaScriptCore\nNode.js → V8` },
      { h: 'V8 Pipeline', code: `Code → AST → Bytecode\n     → Optimized Machine Code` },
    ],
    advanced:
      'V8 "Hidden Classes" aur "Inline Caching" use karता hai property access fast karne ke liye. Agar aap objects ke properties hamesha ek hi order mein add karein, to V8 same hidden class reuse karता hai — yeh ek bada performance win hai.',
    quiz: [
      { q: 'Memory Heap kya store karता hai?', options: ['Functions ka order', 'Objects/variables', 'CSS', 'HTML'], answer: 1, explain: 'Heap mein objects/variables allocate hote hain.' },
      { q: 'TurboFan kya hai?', options: ['Interpreter', 'Optimizing compiler', 'Parser', 'Browser'], answer: 1, explain: 'TurboFan V8 ka optimizing compiler hai.' },
    ],
    related: ['single-threaded', 'execution-context', 'memory-management'],
  },

  'single-threaded': {
    overview:
      'JavaScript **single-threaded** hai — matlab ek time par sirf **ek hi kaam** kar sakti hai (ek call stack). Phir bhi JS heavy kaam (API call, timer) ke time hang nahi hoti — kyunki **asynchronous** behaviour aur **event loop** use karती hai. Yahi JS ki sabse khaas baat hai.',
    why:
      'Single-threaded + async samajhna interview mein bahut critical hai. Iske bina event loop, promises, setTimeout sab confusing lagte hain. Real apps mein smooth UX iska direct result hai.',
    concept: [
      { h: 'Single-threaded matlab?', p: 'JS ke paas ek hi **call stack** hai. Ek time par ek hi function chalता hai. Doosra tab tak wait karता hai (synchronous default).' },
      { h: 'Synchronous code', p: 'Line-by-line, upar se neeche. Har line apna kaam poora karke hi agli line chalने deti hai. Agar ek line slow hai, baaki ruk jaati hain (**blocking**).', code: `console.log('1')\nconsole.log('2')\nconsole.log('3')\n// Output: 1, 2, 3 (order mein)` },
      { h: 'Asynchronous code', p: 'Kuch kaam (timer, network) background mein bhej diye jaate hain (browser ke Web APIs). Jab complete hote hain, callback queue mein aate hain aur baad mein chalte hain. JS block nahi hoti.', code: `console.log('1')\nsetTimeout(() => console.log('2'), 0)\nconsole.log('3')\n// Output: 1, 3, 2 ✅` },
      { h: 'Magic kaun karता hai?', p: 'Browser ke **Web APIs** (setTimeout, fetch, DOM events) + **Event Loop** + **Callback Queue** milkar async illusion dete hain. JS khud single-threaded hi rehti hai.' },
    ],
    analogy:
      'Socho ek **akela chef** (single thread) restaurant mein. Wo ek dish banाता hai (sync). Lekin agar ek dish oven mein 10 min lagती hai, to wo oven on karke (async) doosri dishes banाने lagता hai. Oven beep kare (callback) to wapas us dish par aata hai. Ek chef, fir bhi sab chalता rehता hai! 👨‍🍳',
    syntax: { code: `// Sync (blocking)\nconst data = readFileSync('big.txt') // ruk jaata hai\n\n// Async (non-blocking)\nfetch('/api/data').then(res => res.json()) // background mein`, note: 'Async code JS ko responsive rakhता hai — UI freeze nahi hoti.' },
    steps: [
      'Synchronous code call stack par chalता hai (sabse pehle).',
      'Async task (setTimeout/fetch) milne par JS use **Web API** ko de deta hai.',
      'Web API timer/network handle karता hai (background mein).',
      'Complete hone par callback **Callback Queue** (ya Microtask Queue) mein jaata hai.',
      'Call stack khaali hone par **Event Loop** callback ko stack par push karता hai → wo chalता hai.',
    ],
    internals:
      'JS runtime = Call Stack (sync execution) + Web APIs (async kaam) + Callback/Task Queue + Microtask Queue + Event Loop. Event loop ka kaam: "Stack khaali hai? Toh queue se agla callback uthao." Microtasks (promises) hamesha macrotasks (setTimeout) se pehle chalte hain.',
    visual: {
      type: 'timeline',
      items: [
        { year: '1', text: 'Sync code call stack par chalता hai' },
        { year: '2', text: 'Async task Web API ko diya jaता hai' },
        { year: '3', text: 'Task complete → callback queue mein' },
        { year: '4', text: 'Stack khaali → event loop callback ko chalाता hai' },
      ],
    },
    examples: [
      { level: 'Beginner', title: 'Sync order', code: `console.log('Start')\nconsole.log('Middle')\nconsole.log('End')`, result: ['Start', 'Middle', 'End'], explain: 'Sync code hamesha order mein chalता hai.' },
      { level: 'Intermediate', title: 'Async setTimeout', code: `console.log('Start')\nsetTimeout(() => console.log('Timer'), 0)\nconsole.log('End')`, result: ['Start', 'End', 'Timer'], explain: 'setTimeout 0ms bhi ho, callback queue mein jaता hai aur sync code ke baad chalता hai.' },
      { level: 'Advanced', title: 'Promise vs setTimeout', code: `console.log('1')\nsetTimeout(() => console.log('2'), 0)\nPromise.resolve().then(() => console.log('3'))\nconsole.log('4')`, result: ['1', '4', '3', '2'], explain: 'Microtask (Promise=3) macrotask (setTimeout=2) se pehle chalता hai.' },
    ],
    notes: {
      concept: 'JS single-threaded hai par async ki wajah se non-blocking lagती hai.',
      tip: 'setTimeout(fn, 0) turant nahi chalता — sync code khatam hone ke baad chalता hai.',
      warning: 'Bhaari sync loop (jaise infinite loop) poora page freeze kar deta hai — single thread block ho jaता hai.',
      error: 'Async result ko sync ki tarah use karna (fetch ke turant baad data use karna) — abhi data aaya hi nahi hota.',
    },
    compare: {
      headers: ['Feature', 'Synchronous', 'Asynchronous'],
      rows: [
        ['Execution', 'Ek-ek karke (blocking)', 'Background, non-blocking'],
        ['UI', 'Freeze ho sakti hai', 'Responsive rehti hai'],
        ['Example', 'normal code, loops', 'setTimeout, fetch, promises'],
        ['Order', 'Predictable', 'Event loop decide karता hai'],
      ],
    },
    mistakes: [
      { bad: 'Maan lena setTimeout(fn, 0) turant chalेga.', fix: 'Wo sync code ke baad, callback queue se chalेga.' },
      { bad: 'Heavy computation main thread par karna.', fix: 'Web Workers use karo bhaari kaam ke liye (UI freeze na ho).' },
    ],
    best: ['Async operations (API) ke liye async/await ya promises use karo.', 'Bhaari kaam Web Workers mein bhejो.', 'UI block karne wale sync loops avoid karo.'],
    interview: {
      beginner: [
        { q: 'JS single-threaded hai matlab?', a: 'Ek hi call stack hai — ek time par ek hi kaam. Lekin async + event loop se non-blocking behaviour milta hai.' },
        { q: 'Sync vs async?', a: 'Sync: line-by-line blocking. Async: background mein, non-blocking, callback baad mein chalता hai.' },
      ],
      intermediate: [
        { q: 'JS single-thread hote hue bhi async kaise?', a: 'Browser ke Web APIs (setTimeout, fetch) background mein kaam karte hain, aur event loop callbacks ko queue se stack par laता hai jab stack khaali ho.' },
      ],
      advanced: [
        { q: 'setTimeout(fn,0) aur Promise.then mein kaun pehle?', a: 'Promise.then (microtask) pehle chalेga. Microtask queue, macrotask (setTimeout) se higher priority rakhti hai.' },
      ],
    },
    mcqs: [
      { q: 'JS kitne threads use karती hai (main execution)?', options: ['1', '2', '4', 'Unlimited'], answer: 0, explain: 'JS single-threaded hai (ek call stack).' },
      { q: 'setTimeout(fn, 0) kab chalेga?', options: ['Turant', 'Sync code ke baad', 'Kabhi nahi', 'Sabse pehle'], answer: 1, explain: 'Sync code khatam hone ke baad, queue se.' },
    ],
    exercises: {
      easy: ['Predict karo: console.log(1); setTimeout(()=>console.log(2)); console.log(3) ka output.'],
      medium: ['Ek async function likho jo 2 sec baad message print kare.'],
      advanced: ['Promise aur setTimeout mix karke output order predict karo.'],
    },
    summary: [
      'JS single-threaded hai (ek call stack).',
      'Sync = blocking, async = non-blocking.',
      'Web APIs + Event Loop + Queues = async magic.',
      'Microtasks (promises) macrotasks (setTimeout) se pehle.',
    ],
    cheatsheet: [
      { h: 'Output rule', code: `1. Sync code\n2. Microtasks (Promise.then)\n3. Macrotasks (setTimeout)` },
    ],
    projects: ['Live search (debounce)', 'API data fetch with loader', 'Auto-save', 'Polling/notifications'],
    advanced:
      'Heavy CPU kaam ke liye **Web Workers** ek alag thread dete hain (true parallelism), lekin wo DOM access nahi kar sakte. Node.js mein "libuv" thread pool background I/O handle karта hai — JS phir bhi single-threaded rehti hai.',
    quiz: [
      { q: 'Async magic kaun deta hai?', options: ['JS engine akela', 'Web APIs + Event Loop', 'CSS', 'HTML'], answer: 1, explain: 'Web APIs + Event Loop + Queues.' },
      { q: 'Microtask vs macrotask priority?', options: ['Macro pehle', 'Micro pehle', 'Same', 'Random'], answer: 1, explain: 'Microtasks pehle chalte hain.' },
    ],
    related: ['event-loop', 'promises', 'async-await'],
  },

  variables: {
    overview:
      'Variables data ko **store** karne ke containers hain — jaise dabbe jisme value rakhte ho. JS mein 3 tarike hain: **var** (purana), **let** (modern, badal sakta), **const** (modern, fix value). Aaj **let aur const** use karte hain, **var avoid** karते hain.',
    why:
      'Har program variables se shuru hota hai. var/let/const ka fark interview ka **favourite** sawaal hai (scope, hoisting, TDZ). Galat choice se bugs aate hain.',
    concept: [
      { h: 'var (purana tarika)', p: '**Function-scoped**, hoisting ke saath `undefined` milta hai, re-declare aur re-assign dono ho sakta. Modern code mein avoid karo — confusing bugs.', code: `var x = 10\nvar x = 20 // re-declare allowed (problem!)\nx = 30      // re-assign allowed` },
      { h: 'let (modern, changeable)', p: '**Block-scoped** ({ } ke andar), re-assign ho sakta par re-declare nahi (same scope mein). Jab value badalni ho.', code: `let count = 0\ncount = 1  // ✅ re-assign\n// let count = 2 ❌ re-declare error` },
      { h: 'const (modern, fixed)', p: '**Block-scoped**, value **re-assign nahi** ho sakti, declare karte time hi value deni padti. Default choice — jab value na badle.', code: `const PI = 3.14\n// PI = 3.15 ❌ TypeError\nconst user = { name: 'A' }\nuser.name = 'B' // ✅ object andar badal sakta!` },
    ],
    analogy:
      'Socho 3 tarah ke **dabbe**: `var` ek purana dabba bina lid ke (kabhi bhi badal/replace). `let` ek dabba with lid jise tum khol kar content badal sakte ho. `const` ek **sealed gift box** — content fix, par agar andar ek bag ho to bag ke andar ki cheezein badal sakti ho (object mutation). 🎁',
    syntax: { code: `let variableName = value   // changeable\nconst CONSTANT = value     // fixed\nvar oldStyle = value       // avoid\n\n// Example\nlet age = 25\nconst name = 'Devendra'\nage = 26 // ok`, note: 'Rule: default `const`, badalना ho to `let`, `var` kabhi nahi.' },
    steps: [
      '`const` se shuru karo (default).',
      'Agar value re-assign karni padे, to `let` use karo.',
      '`var` bilkul avoid karo (legacy code chhod kar).',
      'Naam camelCase + meaningful rakho (`userAge`, `totalPrice`).',
    ],
    examples: [
      { level: 'Beginner', title: 'Teeno declare', code: `var a = 1\nlet b = 2\nconst c = 3\nconsole.log(a, b, c)`, result: '1 2 3' },
      { level: 'Intermediate', title: 'const object mutation', code: `const user = { name: 'Amit' }\nuser.name = 'Sumit'   // ✅ allowed\nuser.age = 30         // ✅ allowed\nconsole.log(user)\n// user = {} ❌ yeh error deta`, result: "{ name: 'Sumit', age: 30 }", explain: 'const reference ko lock karता hai, object ke contents ko nahi.' },
      { level: 'Advanced', title: 'Block scope fark', code: `if (true) {\n  var x = 1\n  let y = 2\n}\nconsole.log(x) // 1 (var leak)\nconsole.log(y) // ReferenceError (block-scoped)`, explain: 'var block ke bahar bhi accessible — yahi var ka problem hai.' },
    ],
    memory:
      '`var` execution context ke variable environment mein store hoti hai aur hoisting ke time `undefined` se initialize ho jaati hai. `let`/`const` bhi hoist hote hain par **Temporal Dead Zone** mein rehte hain — declaration se pehle access par error. Block scope ke variables block khatam hone par garbage collect ho sakte hain (agar koi reference na ho).',
    browser:
      'Browser console mein `var` se declare top-level variable `window` object par lag jaता hai (`window.x`), jabki `let`/`const` nahi lagte. Isliye modern code window pollution se bacha rehता hai.',
    notes: {
      concept: 'let/const block-scoped, var function-scoped.',
      tip: 'Default `const`. Sirf badalना ho to `let`.',
      warning: '`const` object/array ko freeze nahi karता — sirf re-assign rokта hai. Andar ki values badal sakti hain.',
      error: '`const x` bina value ke declare karna — SyntaxError. const ko initialize karna zaroori.',
    },
    compare: {
      headers: ['Feature', 'var', 'let', 'const'],
      rows: [
        ['Scope', 'Function', 'Block', 'Block'],
        ['Re-declare', 'Haan', 'Nahi', 'Nahi'],
        ['Re-assign', 'Haan', 'Haan', 'Nahi'],
        ['Hoisting', 'undefined', 'TDZ (error)', 'TDZ (error)'],
        ['window par lagta?', 'Haan', 'Nahi', 'Nahi'],
      ],
    },
    mistakes: [
      { bad: 'Har jagah `var` use karna.', fix: 'let/const use karo — predictable scoping.' },
      { bad: 'Maan lena const object immutable hai.', fix: 'const sirf re-assign rokता hai; Object.freeze() se contents lock karo.' },
    ],
    best: ['Default `const`, badalना ho to `let`.', 'Naam meaningful + camelCase.', '`var` avoid karo.', 'Constants UPPER_CASE mein likho (config values).'],
    interview: {
      beginner: [
        { q: 'var, let, const mein fark?', a: 'var function-scoped + re-declare allowed. let block-scoped + re-assign allowed. const block-scoped + re-assign nahi. Default const use karo.' },
      ],
      intermediate: [
        { q: 'const object ko modify kar sakte?', a: 'Haan, object ke properties badal sakte ho. const sirf variable ka reference lock karता hai, content nahi. Lock karne ke liye Object.freeze().' },
      ],
      advanced: [
        { q: 'TDZ kya hai?', a: 'Temporal Dead Zone — let/const declare hone se pehle ke region mein access karne par ReferenceError aata hai, kyunki wo initialize nahi hue.' },
      ],
    },
    mcqs: [
      { q: 'Kaunsा block-scoped nahi hai?', options: ['let', 'const', 'var', 'dono let aur const'], answer: 2, explain: 'var function-scoped hai.' },
      { q: 'const x; valid hai?', options: ['Haan', 'Nahi (initialize zaroori)', 'Sirf number ke saath', 'Browser depend'], answer: 1, explain: 'const ko declare karte time value deni zaroori hai.' },
    ],
    exercises: {
      easy: ['let aur const se 2 variables banao aur print karo.', 'const object banao aur ek property add karo.'],
      medium: ['Ek loop var ke saath aur let ke saath likho, output compare karo.'],
      advanced: ['TDZ demonstrate karne wala code likho.'],
    },
    summary: [
      'var = function-scoped, purana, avoid.',
      'let = block-scoped, re-assign ok.',
      'const = block-scoped, re-assign nahi (par object andar badal sakta).',
      'Default const, fir let, var kabhi nahi.',
    ],
    cheatsheet: [
      { h: 'Choose', code: `const → default (no change)\nlet   → value changes\nvar   → ❌ avoid` },
      { h: 'Scope', code: `var  → function\nlet  → block { }\nconst→ block { }` },
    ],
    advanced:
      'Loop mein `var` ek classic bug deta hai: `for(var i=0;i<3;i++) setTimeout(()=>console.log(i))` → 3,3,3 print hoga (ek hi `i`). `let` use karo → 0,1,2 (har iteration ka apna `i` — block scope). Yeh closure + scope ka famous interview question hai.',
    quiz: [
      { q: 'Default kya use karna chahiye?', options: ['var', 'let', 'const', 'koi bhi'], answer: 2, explain: 'const default; badalna ho to let.' },
      { q: 'var ka scope?', options: ['Block', 'Function', 'Global only', 'Module'], answer: 1, explain: 'var function-scoped hai.' },
    ],
    related: ['data-types', 'hoisting', 'scope'],
  },

  'data-types': {
    overview:
      'JavaScript mein data 2 categories mein hai: **Primitive** (simple, immutable values — string, number, boolean, null, undefined, symbol, bigint) aur **Non-Primitive** (objects, arrays, functions). Primitive value **copy** hoti hai, non-primitive **reference** se.',
    why:
      'Data types samajhna har cheez ki neev hai. "Pass by value vs reference", `typeof`, equality — sab isi par depend karte hain. Interview mein bahut poocha jaता hai.',
    concept: [
      { h: '7 Primitive types', p: '`string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`. Yeh **immutable** hote hain (value badal nahi sakti, nayi banti hai) aur **value** se copy hote hain.', code: `let s = 'hi'        // string\nlet n = 42          // number\nlet b = true        // boolean\nlet u                // undefined\nlet empty = null    // null\nlet id = Symbol('id')\nlet big = 123n      // bigint` },
      { h: 'Non-Primitive (Reference)', p: '`object`, `array`, `function`. Yeh **mutable** hain aur **reference** (memory address) se store/copy hote hain. Do objects same content ke ho to bhi `===` false (alag reference).', code: `let obj = { name: 'A' }\nlet arr = [1, 2, 3]\nlet fn = () => {}\nconsole.log(typeof obj) // 'object'` },
      { h: 'Value vs Reference copy', p: 'Primitive copy karne par nayi value banti hai (independent). Object copy karne par sirf reference copy hota hai — dono same object point karte hain.', code: `let a = 10, b = a\nb = 20\nconsole.log(a) // 10 (alag)\n\nlet o1 = {x:1}, o2 = o1\no2.x = 99\nconsole.log(o1.x) // 99 (same ref!)` },
    ],
    analogy:
      'Primitive ek **WhatsApp message** ki tarah — forward karo to copy ban jaता hai, doosre ka edit tumhare par asar nahi. Reference ek **Google Doc link** ki tarah — link share karo, koi bhi edit kare to sabko same doc mein dikhता hai. 📄🔗',
    syntax: { code: `typeof 'hi'        // 'string'\ntypeof 42          // 'number'\ntypeof true        // 'boolean'\ntypeof undefined   // 'undefined'\ntypeof null        // 'object' (famous bug!)\ntypeof {}          // 'object'\ntypeof []          // 'object'\ntypeof function(){} // 'function'`, note: 'typeof null === "object" ek historical bug hai — yaad rakho!' },
    examples: [
      { level: 'Beginner', title: 'typeof check', code: `console.log(typeof 'JS')\nconsole.log(typeof 100)\nconsole.log(typeof true)\nconsole.log(typeof null)`, result: ['string', 'number', 'boolean', 'object'], explain: 'typeof null === "object" — JS ka purana bug.' },
      { level: 'Intermediate', title: 'Reference behaviour', code: `const arr1 = [1, 2, 3]\nconst arr2 = arr1\narr2.push(4)\nconsole.log(arr1)`, result: '[1, 2, 3, 4]', explain: 'arr2 same array point karता hai — arr1 bhi change ho gaya.' },
      { level: 'Advanced', title: 'Array check sahi tarika', code: `console.log(typeof [])           // 'object'\nconsole.log(Array.isArray([]))   // true\nconsole.log([] instanceof Array) // true`, explain: 'Array detect karne ke liye Array.isArray() best hai.' },
    ],
    memory:
      'Primitive values **stack** mein store hoti hain (fast, fixed size). Objects/arrays/functions **heap** mein store hote hain, aur stack mein sirf unka **reference (pointer)** rehता hai. Isliye object copy karne par reference copy hota hai, actual data nahi.',
    notes: {
      concept: '7 primitives + objects. Primitive = value copy, object = reference copy.',
      tip: 'Array check ke liye `Array.isArray()`, type check ke liye `typeof` (ya `Object.prototype.toString.call()`).',
      warning: '`typeof null` returns `"object"` — yeh bug hai, fix nahi hoga (backward compatibility).',
      error: 'Object ko `=` se copy karke "independent copy" maan lena — wo reference share karता hai.',
    },
    compare: {
      headers: ['Feature', 'Primitive', 'Non-Primitive (Object)'],
      rows: [
        ['Examples', 'string, number, boolean…', 'object, array, function'],
        ['Stored as', 'Value (stack)', 'Reference (heap)'],
        ['Copy', 'Independent copy', 'Shared reference'],
        ['Mutable?', 'Immutable', 'Mutable'],
        ['=== compares', 'Value', 'Reference'],
      ],
    },
    mistakes: [
      { bad: '`typeof []` se array detect karna (deta hai "object").', fix: '`Array.isArray(x)` use karo.' },
      { bad: 'Object `=` se copy karke alag samajhna.', fix: 'Spread `{...obj}` ya structuredClone() se copy karo.' },
    ],
    best: ['Array check ke liye `Array.isArray()`.', 'Object copy ke liye spread / structuredClone.', 'null vs undefined ka fark samjho.', 'Numbers ke liye precision dhyan rakho (0.1+0.2 !== 0.3).'],
    interview: {
      beginner: [
        { q: 'JS mein kitne data types?', a: '7 primitive (string, number, boolean, null, undefined, symbol, bigint) + object (non-primitive).' },
        { q: 'null aur undefined mein fark?', a: 'undefined = value assign nahi hui (default). null = jaan-bujhkar "khaali" value set ki gayi.' },
      ],
      intermediate: [
        { q: 'Primitive vs reference type?', a: 'Primitive value se copy hote hain (independent). Reference types (object/array/function) reference se copy hote hain (shared).' },
      ],
      advanced: [
        { q: 'typeof null kya deta aur kyun?', a: '"object" deta hai — yeh JS ke pehle version ka bug hai (type tag 0 objects ke liye tha, null ka pointer bhi 0 tha). Backward compatibility ke liye fix nahi kiya gaya.' },
      ],
    },
    mcqs: [
      { q: 'Kaunsा primitive type nahi hai?', options: ['string', 'number', 'array', 'symbol'], answer: 2, explain: 'array object (non-primitive) hai.' },
      { q: 'typeof null?', options: ['null', 'undefined', 'object', 'number'], answer: 2, explain: 'Famous bug — "object".' },
    ],
    exercises: {
      easy: ['Har primitive type ka ek variable banao aur typeof print karo.'],
      medium: ['Do objects banao same content ke, === se compare karo, result samjhao.'],
      advanced: ['Ek function likho jo kisi value ka exact type bataye (array, null, object alag-alag).'],
    },
    summary: [
      '7 primitives + object (non-primitive).',
      'Primitive = value copy (immutable), object = reference copy (mutable).',
      'typeof null === "object" (bug).',
      'Array check: Array.isArray().',
    ],
    cheatsheet: [
      { h: 'Primitives', code: `string, number, boolean,\nnull, undefined, symbol, bigint` },
      { h: 'typeof', code: `typeof 1      → 'number'\ntypeof null   → 'object'\ntypeof []     → 'object'\ntypeof fn     → 'function'` },
    ],
    advanced:
      'JS numbers IEEE-754 double-precision hain — isliye `0.1 + 0.2 === 0.30000000000000004`. Bade integers ke liye `BigInt` (123n) use karo. `Symbol` unique keys deता hai (kabhi collide nahi karता) — objects mein hidden properties ke liye.',
    quiz: [
      { q: 'Object kis se copy hota hai?', options: ['Value', 'Reference', 'Dono', 'Copy nahi hota'], answer: 1, explain: 'Reference se.' },
      { q: '0.1 + 0.2 === 0.3?', options: ['true', 'false', 'Error', 'undefined'], answer: 1, explain: 'Floating point precision — false.' },
    ],
    related: ['variables', 'type-conversion', 'copy'],
  },

  'type-conversion': {
    overview:
      'JavaScript **dynamically typed** hai — variable ka type runtime par decide hota hai aur badal sakta hai. Type badalna 2 tarah ka hai: **Type Conversion** (explicit — hum manually karte hain, jaise `Number("5")`) aur **Type Coercion** (implicit — JS khud automatically karता hai, jaise `"5" + 1`).',
    why:
      'Coercion JS ke "weird" outputs ki jad hai (`[] + [] === ""`, `"5" - 1 === 4`). Interview mein output-based questions yahi se aate hain. Samajh lo to bugs khatam.',
    concept: [
      { h: 'Dynamic typing', p: 'Ek variable kisi bhi type ki value le sakta hai aur baad mein badal sakta hai. Type variable se nahi, value se judा hai.', code: `let x = 42      // number\nx = 'hello'     // ab string\nx = true        // ab boolean\n// koi error nahi!` },
      { h: 'Explicit conversion', p: 'Hum khud convert karte hain: `Number()`, `String()`, `Boolean()`, `parseInt()`, `parseFloat()`.', code: `Number('123')   // 123\nString(123)     // '123'\nBoolean(0)      // false\nparseInt('42px')// 42` },
      { h: 'Implicit coercion', p: 'JS automatically convert karता hai operator ke hisaab se. `+` string ke saath concatenation, `-` `*` `/` numbers mein convert.', code: `'5' + 1   // '51' (string)\n'5' - 1   // 4  (number)\ntrue + 1  // 2\n'5' * '2' // 10` },
      { h: 'Truthy & Falsy', p: 'Conditions mein har value boolean mein coerce hoti hai. **Falsy**: `false, 0, "", null, undefined, NaN`. Baaki sab **truthy** (including `[]`, `{}`, `"0"`).', code: `if ('') {}      // falsy\nif ([]) {}      // truthy!\nif ('0') {}     // truthy!\nBoolean('') // false` },
    ],
    analogy:
      'Coercion ek **over-smart waiter** jaisa hai. Tum bolo "5" (string) aur "1" jod do — wo soch leta hai "shायad ye text hai" aur jod ke "51" bana deta hai. Lekin "5" minus "1" bolo to "in dono ko number hi hona chahiye" maan ke 4 deta hai. Uska guesswork hi confusion ki jad hai! 🤵',
    syntax: { code: `// Explicit (recommended)\nNumber(value)\nString(value)\nBoolean(value)\nparseInt(value, 10)\nparseFloat(value)\n\n// Implicit (JS khud)\n'5' + 1  // coercion`, note: 'parseInt ko hamesha radix do: parseInt("10", 10).' },
    steps: [
      '`+` operator: agar koi operand string hai → baaki ko string banakar concatenate.',
      'Baaki arithmetic (`- * / %`): sab ko number mein convert.',
      'Comparison `==`: dono ko ek common type mein convert (coercion) phir compare.',
      'Comparison `===`: koi conversion nahi — type + value dono check.',
      'Condition (if): value ko boolean (truthy/falsy) mein convert.',
    ],
    examples: [
      { level: 'Beginner', title: 'Explicit conversion', code: `console.log(Number('42'))\nconsole.log(String(42))\nconsole.log(Boolean(''))`, result: ['42', '42', 'false'] },
      { level: 'Intermediate', title: 'The famous tricky outputs', code: `console.log('5' + 3)    // concat\nconsole.log('5' - 3)    // number\nconsole.log(true + 1)\nconsole.log([] + [])\nconsole.log([] + {})`, result: ['53', '2', '2', '(empty string)', '[object Object]'], explain: 'Yahi output-based interview questions hain — coercion ke rules yaad rakho.' },
      { level: 'Advanced', title: '== vs ===', code: `console.log(0 == '')      // true (coercion)\nconsole.log(0 == '0')     // true\nconsole.log('' == '0')    // false\nconsole.log(null == undefined) // true\nconsole.log(NaN === NaN)  // false`, explain: '== coercion karता hai (confusing). Hamesha === use karo.' },
    ],
    memory:
      'Conversion nayi primitive value banाता hai (original immutable rehता hai). Coercion temporary values banाता hai operation ke liye. `NaN` ek special number hai jo kisi se equal nahi (khud se bhi nahi) — `Number.isNaN()` se check karो.',
    notes: {
      concept: 'Conversion = manual, Coercion = automatic (JS).',
      tip: 'Hamesha `===` use karo (no coercion). `==` se bacho.',
      warning: '`[]` aur `{}` truthy hain, par `0`, `""`, `null`, `undefined`, `NaN`, `false` falsy.',
      error: 'parseInt bina radix: `parseInt("08")` purane browsers mein galat. Hamesha `parseInt(x, 10)`.',
    },
    compare: {
      headers: ['Feature', 'Type Conversion', 'Type Coercion'],
      rows: [
        ['Kaun karता', 'Developer (manual)', 'JS engine (auto)'],
        ['Bhi kehte', 'Explicit', 'Implicit'],
        ['Example', 'Number("5")', '"5" * 1'],
        ['Control', 'Predictable', 'Surprising ho sakta'],
      ],
    },
    mistakes: [
      { bad: '`==` use karna (coercion se bugs).', fix: 'Hamesha `===` (strict equality).' },
      { bad: '`parseInt(x)` bina radix.', fix: '`parseInt(x, 10)`.' },
      { bad: '`NaN === NaN` se check karna.', fix: '`Number.isNaN(x)` use karo.' },
    ],
    best: ['Explicit conversion prefer karo (clear intent).', '`===` use karo.', 'Falsy values yaad rakho.', 'User input (string) ko Number() se convert karke use karo.'],
    interview: {
      beginner: [
        { q: 'Dynamic typing kya hai?', a: 'Variable ka type runtime par decide hota hai aur badal sakta hai — type value se judा hai, variable se nahi.' },
        { q: 'Conversion vs coercion?', a: 'Conversion manual (Number("5")), coercion automatic (JS khud, jaise "5"*1).' },
      ],
      intermediate: [
        { q: '"5" + 3 aur "5" - 3 ka output?', a: '"53" (+ string concat karता hai) aur 2 (- numbers mein convert). + special hai.' },
      ],
      advanced: [
        { q: '== vs === explain karo.', a: '== coercion ke saath compare karता hai (types convert hote hain), === strict — type aur value dono match hone chahiye. Hamesha === use karo.' },
        { q: 'Falsy values kaunsi hain?', a: 'false, 0, -0, 0n, "", null, undefined, NaN. Baaki sab truthy ([], {} bhi truthy).' },
      ],
    },
    mcqs: [
      { q: '"5" + 1 ka output?', options: ['6', '51', '"6"', 'NaN'], answer: 1, explain: '+ string concat → "51".' },
      { q: 'Kaunsा falsy nahi hai?', options: ['0', '""', '[]', 'NaN'], answer: 2, explain: '[] truthy hai!' },
    ],
    exercises: {
      easy: ['"100" string ko number mein convert karo aur 5 add karo.'],
      medium: ['Predict karo: true + true, "5" * "2", [] + 1 ke outputs.'],
      advanced: ['Ek function likho jo kisi value ko safely number mein convert kare (invalid par 0 de).'],
    },
    summary: [
      'JS dynamically typed hai.',
      'Conversion = manual (Number, String, Boolean).',
      'Coercion = automatic (JS, operators ke hisaab se).',
      'Falsy: false, 0, "", null, undefined, NaN. Hamesha === use karo.',
    ],
    cheatsheet: [
      { h: 'Convert', code: `Number(x)  String(x)\nBoolean(x) parseInt(x,10)` },
      { h: 'Falsy 6+', code: `false, 0, "", null,\nundefined, NaN` },
      { h: 'Coercion', code: `"5"+1 → "51"\n"5"-1 → 4\ntrue+1 → 2` },
    ],
    advanced:
      'Coercion ke peeche **ToPrimitive** algorithm hai: object ko primitive mein convert karne ke liye JS `Symbol.toPrimitive`, phir `valueOf()`, phir `toString()` call karता hai. Isliye `[] + {}` → "" + "[object Object]" → "[object Object]". Custom objects mein `Symbol.toPrimitive` define karke coercion control kar sakte ho.',
    quiz: [
      { q: 'Strict equality operator?', options: ['==', '===', '=', '!='], answer: 1, explain: '=== koi coercion nahi karता.' },
      { q: 'Number("12px") deta hai?', options: ['12', 'NaN', '"12"', '0'], answer: 1, explain: 'Number() pura string parse karта — invalid → NaN. (parseInt 12 deta).' },
    ],
    related: ['data-types', 'operators', 'variables'],
  },
}
