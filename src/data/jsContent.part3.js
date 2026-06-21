// JS content — Part 3: Scope & Execution + Objects, Arrays, Strings

export const jsContentC = {
  scope: {
    overview:
      'Scope bataता hai ki ek variable **kahan se access** ho sakta hai. Types: **Global** (har jagah), **Function** (function ke andar), **Block** (`{ }` ke andar — let/const). **Lexical scope** matlab inner function apne bahar (parent) ke variables access kar sakta hai. **Scope chain** = variable dhoondne ka raasta (andar se bahar).',
    why:
      'Scope samajhe bina closures, hoisting, this kuch samajh nahi aata. "Yeh variable access kyun nahi ho raha" jaise bugs scope se aate hain. Interview ki neev.',
    concept: [
      { h: 'Global Scope', p: 'Function/block ke bahar declare — poore program mein accessible. Zyada global variables = pollution + bugs.', code: `const APP = 'LifeFlow' // global\nfunction f() { console.log(APP) } // accessible` },
      { h: 'Function Scope', p: 'Function ke andar declare variables sirf usi function mein. Bahar se access nahi.', code: `function f() {\n  const secret = 42\n}\n// console.log(secret) ❌ ReferenceError` },
      { h: 'Block Scope', p: '`let`/`const` `{ }` (if, for, etc.) ke andar limited. `var` block-scope nahi maanता.', code: `if (true) {\n  let x = 1   // block\n  var y = 2   // function/global leak\n}\n// x ❌, y ✅` },
      { h: 'Lexical Scope & Chain', p: 'Inner function bahar ke variables access kar sakta (lexical = jahan likha gaya). Variable na mile to JS bahar (parent) dhoondта — yahi scope chain.', code: `const a = 1\nfunction outer() {\n  const b = 2\n  function inner() {\n    console.log(a, b) // dono accessible\n  }\n  inner()\n}` },
    ],
    analogy:
      'Scope ek **ghar ki almaariyaan** hain. Bedroom (inner function) se hall (parent) aur store-room (global) ki cheezein le sakte ho — par hall se bedroom ki personal cheezein nahi. Dhoondte time apne kamre se shuru, na mile to bahar — yahi scope chain. 🏠',
    syntax: { code: `// Global\nconst g = 1\nfunction outer() {\n  // Function scope\n  const o = 2\n  if (true) {\n    // Block scope\n    let b = 3\n  }\n}`, note: 'Inner se outer access ho sakta, outer se inner nahi (one-way).' },
    steps: [
      'JS variable ko current scope mein dhoondта hai.',
      'Na mile to outer (parent) scope mein dhoondта.',
      'Aise hi global tak (scope chain).',
      'Global mein bhi na mile to ReferenceError.',
      'Yeh chain "lexically" (code likhne ki jagah) decide hota hai, call ki jagah se nahi.',
    ],
    examples: [
      { level: 'Beginner', title: 'Scope access', code: `const x = 'global'\nfunction show() {\n  const y = 'local'\n  console.log(x, y)\n}\nshow()`, result: 'global local' },
      { level: 'Intermediate', title: 'Block scope', code: `for (let i = 0; i < 3; i++) {}\n// console.log(i) ❌\nfor (var j = 0; j < 3; j++) {}\nconsole.log(j) // 3 (leak)`, result: '3', explain: 'let block mein band, var bahar leak.' },
      { level: 'Advanced', title: 'Lexical scope chain', code: `const a = 1\nfunction outer() {\n  const b = 2\n  return function inner() {\n    const c = 3\n    return a + b + c\n  }\n}\nconsole.log(outer()())`, result: '6', explain: 'inner a, b (parents) aur c (apna) — sab access.' },
    ],
    memory:
      'Har scope ek "Lexical Environment" banाता hai jisme us scope ke variables hote hain + parent ka reference. Scope chain in environments ka linked sequence hai. Block scope ke variables block khatam hone par freed ho sakte hain (agar closure capture na kare).',
    notes: {
      concept: 'Inner → outer access (one way). let/const block-scoped, var function-scoped.',
      tip: 'Variables ko sabse chhote zaroori scope mein rakho (kam pollution).',
      warning: 'Lexical scope likhne ki jagah se decide hota, call ki jagah se nahi.',
      error: 'Block ke bahar let/const access karna → ReferenceError.',
    },
    compare: {
      headers: ['Scope', 'Banta', 'Access', 'Keyword'],
      rows: [
        ['Global', 'File top level', 'Har jagah', 'koi bhi'],
        ['Function', 'Function ke andar', 'Usi function mein', 'var/let/const'],
        ['Block', '{ } ke andar', 'Usi block mein', 'let/const'],
      ],
    },
    mistakes: [
      { bad: 'var ko block-scoped maanना.', fix: 'var function-scoped — let/const block-scoped.' },
      { bad: 'Sab kuch global banाना.', fix: 'Chhote scope mein rakho.' },
    ],
    best: ['let/const use karo (predictable block scope).', 'Globals minimum rakho.', 'Variables zaroorat ke scope mein declare karo.', 'Modules/IIFE se scope isolate karo.'],
    interview: {
      beginner: [
        { q: 'Scope kya hai?', a: 'Variable kahan accessible hai uska region. Global, function, aur block scope hote hain.' },
        { q: 'Block scope kya hai?', a: '{ } (if/for) ke andar let/const ka limited access. var block-scope nahi maanта.' },
      ],
      intermediate: [
        { q: 'Lexical scope kya hai?', a: 'Inner function apne bahar (jahan likha gaya) ke variables access kar sakta hai. Scope likhne ki jagah se decide hota, call se nahi.' },
      ],
      advanced: [
        { q: 'Scope chain kaise kaam karता?', a: 'Variable current scope mein na mile to JS parent scope mein dhoondта, aise global tak. Yeh lexical environments ki chain hai.' },
      ],
    },
    mcqs: [
      { q: 'var ka scope?', options: ['Block', 'Function', 'Global only', 'Module'], answer: 1, explain: 'Function-scoped.' },
      { q: 'Inner function outer variables?', options: ['Access kar sakta', 'Nahi', 'Sirf global', 'Error'], answer: 0, explain: 'Lexical scope se.' },
    ],
    exercises: {
      easy: ['Global aur local variable banao, dono ko function mein print karo.'],
      medium: ['Block scope demonstrate karo let vs var se.'],
      advanced: ['3-level nested functions banao aur scope chain dikhao.'],
    },
    summary: [
      'Scope = variable access ka region.',
      'Global, function, block scope.',
      'Lexical scope = inner outer ko access kar sakta.',
      'Scope chain = andar se bahar dhoondna.',
    ],
    cheatsheet: [
      { h: 'Scopes', code: `Global → har jagah\nFunction → andar\nBlock {} → let/const` },
    ],
    advanced:
      'Scope chain closures ki neev hai — jab function return hota hai, uska lexical environment zinda reh sakta hai. Module scope (ES modules) ek alag top-level scope hai (global pollution nahi). `eval` aur `with` scope ko dynamically badal sakte hain (avoid karo).',
    quiz: [
      { q: 'Lexical scope kis se decide?', options: ['Call jagah', 'Likhne ki jagah', 'Runtime', 'Random'], answer: 1, explain: 'Likhne (lexical) ki jagah se.' },
      { q: 'Scope chain direction?', options: ['Bahar→andar', 'Andar→bahar', 'Random', 'Top only'], answer: 1, explain: 'Inner se outer dhoondта.' },
    ],
    related: ['closures', 'hoisting', 'execution-context'],
  },

  'execution-context': {
    overview:
      '**Execution Context (EC)** wo environment hai jisme JS code chalता hai. Do types: **Global EC** (poora program) aur **Function EC** (har function call par naya). Har EC do phases mein banта: **Memory Creation Phase** (variables/functions ke liye space) aur **Code Execution Phase** (line-by-line chalना). **Call Stack** in contexts ko manage karता.',
    why:
      'Hoisting, closures, "undefined kyun aaya", call stack errors — sab EC se samajh aate hain. JS "kaise chalता hai" yeh dikhाने wala core internal topic — advanced interview favourite.',
    concept: [
      { h: 'Execution Context kya hai?', p: 'Code chalने ka "container/environment". Global EC sabse pehle banта; har function call ek naya Function EC banाता.' },
      { h: 'Memory Creation Phase', p: 'Code chalने se PEHLE: variables ko `undefined` aur function declarations ko poora function memory mein allocate kar diya jaता (hoisting yahi hota).', code: `console.log(x) // undefined\nfoo()          // works (hoisted)\nvar x = 5\nfunction foo() { console.log('hi') }` },
      { h: 'Code Execution Phase', p: 'Ab line-by-line chalता: variables ko actual value milती, functions call hote (har call par naya EC).', code: `var x = 5  // ab x = 5 assign\nx = x + 1  // execution phase` },
      { h: 'Call Stack', p: 'LIFO stack jo ECs ko track karता. Function call → push, return → pop. Global EC sabse neeche.', code: `function a() { b() }\nfunction b() { console.log('hi') }\na()\n// Stack: global → a → b → console.log` },
    ],
    analogy:
      'Execution context ek **kitchen station** hai. Pehle ingredients table par rakhte ho (memory phase: undefined slots), phir actually cooking karte ho (execution phase). Call stack ek **plate ka dher** — upar wali plate (function) pehle uthती hai (LIFO). 🍳',
    syntax: { code: `// 2 phases har EC ke\n// 1. Memory: var→undefined, fn→full\n// 2. Execution: actual values + calls\n\nfunction f() { return 1 }\nf() // naya EC banाता, stack par push`, note: 'Memory phase hi hoisting ka reason hai.' },
    steps: [
      'Global EC banта (memory phase: saare var → undefined, function declarations full store).',
      'Execution phase: code line-by-line chalता, values assign hoti.',
      'Function call par naya Function EC banта (apna memory + execution phase).',
      'Naya EC call stack par push.',
      'Function return par EC pop; control wapas pichle EC par.',
    ],
    visual: {
      type: 'timeline',
      items: [
        { year: '1', text: 'Global EC create → Memory phase (hoisting)' },
        { year: '2', text: 'Global Execution phase shuru' },
        { year: '3', text: 'Function call → naya EC, stack par push' },
        { year: '4', text: 'Function return → EC pop, wapas pichle par' },
      ],
    },
    examples: [
      { level: 'Intermediate', title: 'Memory phase proof', code: `console.log(a) // undefined\nsayHi()        // 'Hi'\nvar a = 10\nfunction sayHi() { console.log('Hi') }`, result: ['undefined', 'Hi'], explain: 'Memory phase mein a=undefined, sayHi full hoisted.' },
      { level: 'Advanced', title: 'Call stack order', code: `function first() { console.log('1 start'); second(); console.log('1 end') }\nfunction second() { console.log('2') }\nfirst()`, result: ['1 start', '2', '1 end'], explain: 'first push → second push → second pop → first resume.' },
    ],
    memory:
      'Har EC ke 3 components: Variable Environment (var, function declarations), Lexical Environment (let/const + scope chain reference), aur `this` binding. Memory phase mein space allocate hota; execution phase mein bharta. Stack overflow tab hota jab bahut deep recursion call stack bhar de.',
    notes: {
      concept: 'EC = code chalने ka environment. 2 phases: memory + execution.',
      tip: 'Memory phase samjho to hoisting automatically samajh aa jaता hai.',
      warning: 'Deep/infinite recursion → "Maximum call stack size exceeded" (stack overflow).',
      error: 'Async callbacks call stack par nahi — wo queue se aate hain (event loop).',
    },
    compare: {
      headers: ['Phase', 'Kya hota', 'Result'],
      rows: [
        ['Memory Creation', 'Space allocate', 'var→undefined, fn→full'],
        ['Code Execution', 'Line-by-line run', 'Values assign, calls'],
      ],
    },
    mistakes: [
      { bad: 'Maan lena code seedha line-by-line chalता.', fix: 'Pehle memory phase (hoisting), phir execution.' },
      { bad: 'Async ko call stack par expect karna.', fix: 'Async callbacks queue se event loop laता.' },
    ],
    best: ['Recursion ki depth control karo (stack overflow se bacho).', 'Functions chhote rakho (clean stack traces).', 'Hoisting par depend mat karo — declare-before-use likho.'],
    interview: {
      intermediate: [
        { q: 'Execution context kya hai?', a: 'Code chalने ka environment. Global EC + har function call par Function EC. 2 phases: memory creation aur code execution.' },
      ],
      advanced: [
        { q: 'Memory creation phase mein kya hota?', a: 'var ko undefined aur function declarations ko poora function memory mein allocate kiya jaता — yahi hoisting ki wajah hai.' },
        { q: 'Call stack kya hai?', a: 'LIFO structure jo execution contexts track karता. Function call → push, return → pop. Deep recursion → stack overflow.' },
      ],
    },
    mcqs: [
      { q: 'Hoisting kis phase mein?', options: ['Execution', 'Memory creation', 'Dono', 'Koi nahi'], answer: 1, explain: 'Memory creation phase.' },
      { q: 'Call stack order?', options: ['FIFO', 'LIFO', 'Random', 'Priority'], answer: 1, explain: 'Last In First Out.' },
    ],
    exercises: {
      easy: ['Likho: 2 phases ke naam aur kya hota.'],
      medium: ['Nested functions ka call stack order trace karo.'],
      advanced: ['Stack overflow trigger karne wala recursion likho (samajhne ke liye).'],
    },
    summary: [
      'EC = code chalने ka environment (global + function).',
      '2 phases: memory creation + code execution.',
      'Memory phase hoisting ka reason.',
      'Call stack LIFO se ECs manage karता.',
    ],
    cheatsheet: [
      { h: 'EC phases', code: `1. Memory: var→undefined\n         fn→full\n2. Execution: assign + run` },
      { h: 'Stack', code: `call → push\nreturn → pop (LIFO)` },
    ],
    advanced:
      'Async code call stack ke bahar chalता: setTimeout/promise callbacks Web API + queues se aate. Event loop tabhi callback ko stack par push karता jab stack khaali ho. Yahi reason hai ki async stack traces tricky hote hain (modern engines ab better async traces dete hain).',
    quiz: [
      { q: 'Naya EC kab banта?', options: ['Har line', 'Har function call', 'Har loop', 'Kabhi nahi'], answer: 1, explain: 'Har function call par.' },
      { q: 'Global EC stack mein kahan?', options: ['Top', 'Bottom', 'Middle', 'Nahi hota'], answer: 1, explain: 'Sabse neeche (pehle banта).' },
    ],
    related: ['hoisting', 'scope', 'closures'],
  },

  hoisting: {
    overview:
      '**Hoisting** JS ka behaviour hai jisme variable aur function declarations memory creation phase mein **upar utha liye** jaate hain (logically). Isliye function declarations declare se pehle call ho sakti hain. `var` hoist hokar `undefined`, jabki `let`/`const` hoist to hote hain par **Temporal Dead Zone (TDZ)** mein — access par error.',
    why:
      'Hoisting output-based interview questions ki jad hai. "undefined kyun aaya", "ReferenceError kyun" — sab hoisting se. var vs let vs const ka asli fark yahi dikhता hai.',
    concept: [
      { h: 'Variable Hoisting (var)', p: '`var` declaration upar uthती hai par value nahi — declare se pehle access par `undefined`.', code: `console.log(x) // undefined\nvar x = 5\nconsole.log(x) // 5` },
      { h: 'Function Hoisting', p: 'Function **declarations** poori hoist hoti hain — declare se pehle call ho sakti. Function **expressions** nahi (variable ki tarah behave).', code: `foo()  // ✅ works\nfunction foo() { console.log('hi') }\n\nbar()  // ❌ TypeError\nvar bar = function () {}` },
      { h: 'Temporal Dead Zone (TDZ)', p: '`let`/`const` hoist to hote, par initialize nahi — declaration se pehle ka region "TDZ". Wahan access → ReferenceError.', code: `console.log(y) // ❌ ReferenceError (TDZ)\nlet y = 10` },
      { h: 'let vs var vs const', p: 'var → undefined (no error). let/const → TDZ (error). const ko declare time value bhi chahiye.', code: `// var: undefined\n// let/const: ReferenceError\n// const bina value: SyntaxError` },
    ],
    analogy:
      'Hoisting ek **guest list** jaisा hai. var ke naam list par pehle aa jaते hain par "seat khaali" (undefined). Function declarations poori taiyaar seat ke saath. let/const ke naam list par hain par "entry abhi band" (TDZ) — bula nahi sakte jab tak declaration na aaye. 🎟️',
    syntax: { code: `// Hoisting ka mental model\n// JS isko:\nconsole.log(a)\nvar a = 1\n// aise treat karता:\nvar a          // undefined (hoist)\nconsole.log(a) // undefined\na = 1`, note: 'Sirf declarations hoist hoti hain, assignments nahi.' },
    steps: [
      'Memory creation phase mein declarations scan hoti hain.',
      'var → undefined se initialize.',
      'function declarations → poora function store.',
      'let/const → allocate par uninitialized (TDZ).',
      'Execution phase mein actual values assign hoti.',
    ],
    examples: [
      { level: 'Beginner', title: 'var hoisting', code: `console.log(a)\nvar a = 10\nconsole.log(a)`, result: ['undefined', '10'] },
      { level: 'Intermediate', title: 'Function vs expression', code: `decl()  // 'I am declaration'\nfunction decl() { console.log('I am declaration') }\ntry { expr() } catch (e) { console.log(e.name) }\nvar expr = function () {}`, result: ['I am declaration', 'TypeError'], explain: 'Declaration hoisted; expr undefined hai (var), call par TypeError.' },
      { level: 'Advanced', title: 'TDZ', code: `try { console.log(x) } catch (e) { console.log(e.name) }\nlet x = 5`, result: 'ReferenceError', explain: 'let TDZ mein — declaration se pehle access nahi.' },
    ],
    memory:
      'Memory creation phase mein var ka slot bana kar undefined daal diya jaता; function declaration ka poora object store hota. let/const ka slot banta par "uninitialized" mark hota — yahi TDZ. Execution line par pahunchne par hi initialize hote.',
    browser:
      'Strict mode (`"use strict"`) mein undeclared variable ko assign karna error deta (sloppy mode mein wo accidentally global ban jaता tha). ES modules automatically strict mode mein chalte hain.',
    notes: {
      concept: 'Declarations hoist hoti, assignments nahi. var→undefined, let/const→TDZ.',
      tip: 'Confusion se bachne ke liye variables hamesha upar declare karो.',
      warning: 'let/const ko declare se pehle access → ReferenceError (TDZ), undefined nahi.',
      error: 'Function expression ko declare se pehle call → TypeError (var undefined hai).',
    },
    compare: {
      headers: ['Type', 'Hoist?', 'Pehle access'],
      rows: [
        ['var', 'Haan', 'undefined'],
        ['let', 'Haan', 'ReferenceError (TDZ)'],
        ['const', 'Haan', 'ReferenceError (TDZ)'],
        ['function declaration', 'Haan (full)', 'Call ho sakti'],
        ['function expression', 'Var jaisा', 'undefined / TypeError'],
      ],
    },
    mistakes: [
      { bad: 'let/const ko var jaisा undefined samajhna.', fix: 'Wo TDZ mein hain → ReferenceError.' },
      { bad: 'Function expression ko pehle call karna.', fix: 'Declare ke baad call karo.' },
    ],
    best: ['Variables upar declare karो.', 'let/const use karो (TDZ se bugs jaldi pakad mein).', 'Hoisting par depend mat karo.', 'Strict mode use karो.'],
    interview: {
      beginner: [
        { q: 'Hoisting kya hai?', a: 'Declarations ko memory phase mein upar utha lena. var undefined milta, function declarations poori call ho sakti.' },
      ],
      intermediate: [
        { q: 'var vs let hoisting?', a: 'var hoist hokar undefined milता. let bhi hoist hota par TDZ mein — declare se pehle access par ReferenceError.' },
      ],
      advanced: [
        { q: 'TDZ kya hai?', a: 'Temporal Dead Zone — let/const ke declaration se pehle ka region jahan unhe access nahi kar sakte (uninitialized). Access par ReferenceError.' },
      ],
    },
    mcqs: [
      { q: 'var declare se pehle access?', options: ['Error', 'undefined', 'null', '0'], answer: 1, explain: 'undefined (hoisted).' },
      { q: 'let declare se pehle?', options: ['undefined', 'ReferenceError', 'null', 'works'], answer: 1, explain: 'TDZ → ReferenceError.' },
    ],
    exercises: {
      easy: ['var ka hoisting console.log se dikhao.'],
      medium: ['Function declaration aur expression ka fark code se dikhao.'],
      advanced: ['TDZ ka example likho aur samjhao kyun error aata.'],
    },
    summary: [
      'Hoisting = declarations upar uthना (memory phase).',
      'var → undefined, let/const → TDZ (error).',
      'Function declarations fully hoisted; expressions nahi.',
      'Assignments hoist nahi hoti.',
    ],
    cheatsheet: [
      { h: 'Pehle access', code: `var  → undefined\nlet  → ReferenceError\nconst→ ReferenceError\nfn declaration → works` },
    ],
    advanced:
      'class declarations bhi hoist hoti hain par TDZ mein (let/const jaisा). Function declarations block ke andar (block-scoped function) browsers mein alag behave kar sakti hain — strict mode mein block-scoped. Best practice: ambiguity avoid karne ke liye function expressions + const use karो.',
    quiz: [
      { q: 'Kya hoist hota?', options: ['Declarations', 'Assignments', 'Dono', 'Kuch nahi'], answer: 0, explain: 'Sirf declarations.' },
      { q: 'TDZ kis ke liye?', options: ['var', 'let/const', 'function', 'sab'], answer: 1, explain: 'let/const (aur class).' },
    ],
    related: ['execution-context', 'variables', 'scope'],
  },

  closures: {
    overview:
      '**Closure** tab banта hai jab ek function apne **bahar (lexical) scope ke variables ko yaad rakhता** hai — chahe outer function khatam ho chuka ho. Matlab function + uska surrounding state ka bundle. Yeh JS ka **sabse important aur sabse poocha jaane wala** topic hai.',
    why:
      'Closures data privacy, function factories, debounce/throttle, React hooks, currying — sabki neev hain. Har serious JS interview mein closure ka question aata hai (often output-based).',
    concept: [
      { h: 'Closure kya hai?', p: 'Inner function jab outer ke variables use karता hai aur outer return hone ke baad bhi unhe yaad rakhता — yahi closure. Function "apni jagah ka environment saath le jaता" hai.', code: `function outer() {\n  let count = 0\n  return function inner() {\n    count++\n    return count\n  }\n}\nconst counter = outer()\ncounter() // 1\ncounter() // 2 (count yaad raha!)` },
      { h: 'Lexical Environment', p: 'Har function bante time apne surrounding variables ka reference rakhता. Closure isi reference ko zinda rakhता hai.', code: `function greet(name) {\n  return () => 'Hi ' + name // name yaad\n}\nconst hi = greet('A')\nhi() // 'Hi A'` },
      { h: 'Data Privacy', p: 'Closures se "private" variables banते — bahar se directly access nahi, sirf returned functions se. Encapsulation.', code: `function bank(balance) {\n  return {\n    deposit: x => (balance += x),\n    get: () => balance\n  }\n}\nconst acc = bank(100)\nacc.deposit(50)\nacc.get() // 150 (balance private)` },
    ],
    analogy:
      'Closure ek **backpack** jaisा hai jo function apne saath le jaता hai. Jab function banता hai, wo apne aas-paas ki cheezein (variables) backpack mein daal leता. Outer function chala bhi jaaye (return ho jaaye), backpack ki cheezein function ke paas rehti hain. 🎒',
    syntax: { code: `function outer() {\n  let data = 'secret'\n  return function inner() {\n    return data // closure over 'data'\n  }\n}\nconst fn = outer()\nfn() // 'secret'`, note: 'Closure = function + uska lexical environment (yaad rakhe variables).' },
    steps: [
      'outer() call hota hai, naya EC banता with local variable.',
      'inner function define hota — outer ke variables ka reference rakhता.',
      'outer return karता inner ko (outer EC pop ho jaता).',
      'Normally outer ke variables freed honge — par inner reference rakhता hai.',
      'Isliye wo variables memory mein zinda rehte (closure) jab tak inner zinda hai.',
    ],
    examples: [
      { level: 'Beginner', title: 'Counter closure', code: `function makeCounter() {\n  let c = 0\n  return () => ++c\n}\nconst inc = makeCounter()\nconsole.log(inc(), inc(), inc())`, result: '1 2 3', explain: 'c har call mein yaad rehता — closure.' },
      { level: 'Intermediate', title: 'Private variables', code: `function counter() {\n  let count = 0\n  return {\n    inc: () => ++count,\n    dec: () => --count,\n    value: () => count\n  }\n}\nconst c = counter()\nc.inc(); c.inc(); c.dec()\nconsole.log(c.value())`, result: '1', explain: 'count bahar se access nahi — sirf methods se. Data privacy.' },
      { level: 'Advanced', title: 'Loop + closure (classic bug)', code: `// Bug with var\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100)\n}\n// 3, 3, 3\n// Fix with let\nfor (let j = 0; j < 3; j++) {\n  setTimeout(() => console.log(j), 100)\n}\n// 0, 1, 2`, result: ['3', '3', '3', '0', '1', '2'], explain: 'var ek hi i share karता; let har iteration ka naya j (block scope) — alag closure.' },
    ],
    memory:
      'Closure ke captured variables heap mein rehte hain (stack se nahi freed hote) jab tak closure function zinda hai. Yeh power bhi hai aur risk bhi — agar closures bade objects ko unnecessarily capture karein to **memory leak** ho sakta. Reference hatne par garbage collect ho jaते hain.',
    browser:
      'Event listeners, setTimeout, aur React hooks (useState, useEffect) sab closures par bante hain. DevTools ke "Scope" panel mein closure variables dikhते hain. Purane closures jo DOM nodes pakad lein, wo nodes memory mein reh sakti hain (detached DOM leak).',
    notes: {
      concept: 'Closure = function + yaad rakhe gaye outer variables.',
      tip: 'Data privacy, counters, debounce, currying — sab closures se.',
      warning: 'Loop mein var + closure = classic bug (sab same value). let use karो.',
      error: 'Bade objects ko closure mein unnecessarily capture karna → memory leak.',
    },
    compare: {
      headers: ['Aspect', 'Normal function', 'Closure'],
      rows: [
        ['Outer variables', 'Call ke baad gone', 'Yaad rehte (captured)'],
        ['Use', 'Simple reuse', 'Private state, factories'],
        ['Memory', 'Freed', 'Captured vars zinda'],
      ],
    },
    mistakes: [
      { bad: 'Loop mein var ke saath closure (3,3,3 bug).', fix: 'let use karो (har iteration naya binding).' },
      { bad: 'Closures se bade objects capture karna.', fix: 'Sirf zaroori data capture karो (leak se bachो).' },
    ],
    best: ['Data privacy ke liye closures use karो.', 'Loop mein let use karो.', 'Unused closures/listeners cleanup karो.', 'Closures se factory functions banाओ.'],
    interview: {
      beginner: [
        { q: 'Closure kya hai?', a: 'Function jo apne lexical (outer) scope ke variables ko yaad rakhता hai, chahe outer function khatam ho gaya ho. Function + surrounding state ka bundle.' },
      ],
      intermediate: [
        { q: 'Closure ka real use?', a: 'Data privacy (private variables), counters, function factories, debounce/throttle, currying, aur React hooks.' },
        { q: 'Loop + var + setTimeout output?', a: 'Sab same final value (jaise 3,3,3) — kyunki var ek hi variable share karता. let se 0,1,2 (har iteration alag binding).' },
      ],
      advanced: [
        { q: 'Closure memory leak kaise?', a: 'Agar closure unnecessary bade objects ya DOM nodes capture kare aur closure zinda rahe, to wo memory free nahi hoti. Cleanup zaroori.' },
      ],
    },
    mcqs: [
      { q: 'Closure kya yaad rakhता?', options: ['Sirf parameters', 'Outer scope variables', 'Global only', 'Kuch nahi'], answer: 1, explain: 'Lexical outer variables.' },
      { q: 'Loop bug fix?', options: ['var', 'let', 'const only', 'global'], answer: 1, explain: 'let har iteration naya binding.' },
    ],
    exercises: {
      easy: ['Ek counter closure banao (inc function).'],
      medium: ['Private balance wala bank account closure se banao.'],
      advanced: ['once() banao — function jo sirf ek baar chale (closure se flag).'],
    },
    summary: [
      'Closure = function + yaad rakhe outer variables.',
      'Outer return hone ke baad bhi variables zinda.',
      'Use: privacy, counters, factories, debounce, hooks.',
      'Loop mein let use karो (var bug se bacho).',
    ],
    cheatsheet: [
      { h: 'Closure', code: `function outer(){\n  let x=0\n  return ()=>++x  // closure\n}` },
      { h: 'Loop fix', code: `for(let i=0;i<3;i++)\n  setTimeout(()=>log(i)) // 0,1,2` },
    ],
    projects: ['Counter with private state', 'once() / memoize utility', 'Debounce/throttle', 'Module pattern (private + public)', 'Event emitter'],
    advanced:
      'Closures "module pattern" ka base hain (private + public API). React hooks pure closures par bante (stale closure ek common bug hai jab purana state capture ho jaता — dependency array se fix). Memoization closures se cache hold karता. Engines ab smart hain — sirf actually-used variables capture karte (optimization).',
    quiz: [
      { q: 'Closure kab banта?', options: ['Har variable', 'Inner fn outer vars use kare', 'Sirf global', 'Loops mein'], answer: 1, explain: 'Inner function outer scope use kare.' },
      { q: 'Closure se kya banाya?', options: ['Private variables', 'CSS', 'HTML', 'Threads'], answer: 0, explain: 'Data privacy/private state.' },
    ],
    related: ['scope', 'functions-basics', 'currying'],
  },

  'this-keyword': {
    overview:
      '`this` ek special keyword hai jo bataता hai ki function ko **kis context mein** call kiya gaya. Iski value **call-time par** decide hoti hai (kaise call hua), define-time par nahi. Arrow functions ka apna `this` nahi (lexical). `call`, `apply`, `bind` se `this` manually set karte hain.',
    why:
      '`this` JS ka sabse confusing topic hai aur interview ka favourite (tricky outputs). Object methods, event handlers, React class components — sab `this` par depend karte hain.',
    concept: [
      { h: 'Global & regular function', p: 'Global context mein `this` = window (browser) / global (node). Regular function (non-strict) mein bhi global; strict mode mein `undefined`.', code: `console.log(this) // window\nfunction f() { console.log(this) }\nf() // window (ya undefined strict)` },
      { h: 'Object method', p: 'Method ke andar `this` = wo object jisne method call kiya (dot ke left wala).', code: `const user = {\n  name: 'A',\n  greet() { return 'Hi ' + this.name }\n}\nuser.greet() // 'Hi A' (this = user)` },
      { h: 'Arrow function', p: 'Arrow ka apna `this` nahi — parent (lexical) scope se leta. Isliye object method ke liye arrow galat, par callbacks ke liye perfect.', code: `const obj = {\n  name: 'A',\n  greet: () => this.name // ❌ undefined\n}` },
      { h: 'call, apply, bind', p: '`call(thisArg, ...args)` turant call. `apply(thisArg, [args])` array se. `bind(thisArg)` naya function return (baad mein call).', code: `function greet() { return this.name }\nconst u = { name: 'X' }\ngreet.call(u)   // 'X'\ngreet.apply(u)  // 'X'\nconst bound = greet.bind(u)\nbound()         // 'X'` },
    ],
    analogy:
      '`this` ek **"main kaun bol raha hoon"** jaisा hai. Same sentence "yeh mera ghar hai" alag log bolein to "mera" alag-alag person ko point karता. `this` bhi caller (kaun call kar raha) ke hisaab se badalता. Arrow function "apni pehchaan parent se udhaar leta". 🗣️',
    syntax: { code: `obj.method()        // this = obj\nfn()                // this = window/undefined\nfn.call(ctx, a, b)  // this = ctx\nfn.apply(ctx, [a])  // this = ctx (array)\nconst b = fn.bind(ctx) // baad mein`, note: 'Rule: dot ke left jo hai wahi this (method call mein).' },
    steps: [
      'Dekho function kaise call hua (call-site).',
      'obj.method() → this = obj.',
      'Plain fn() → this = window (non-strict) / undefined (strict).',
      'Arrow → this = parent lexical scope ka this.',
      'call/apply/bind → this = pehla argument.',
    ],
    examples: [
      { level: 'Intermediate', title: 'Lost this', code: `const user = {\n  name: 'A',\n  greet() { return 'Hi ' + this.name }\n}\nconst fn = user.greet\nconsole.log(fn()) // 'Hi undefined' (this lost!)\nconsole.log(user.greet()) // 'Hi A'`, result: ['Hi undefined', 'Hi A'], explain: 'Method ko alag variable mein lene par this lost ho jaता.' },
      { level: 'Advanced', title: 'bind fixes it', code: `const user = { name: 'A', greet() { return this.name } }\nconst bound = user.greet.bind(user)\nconsole.log(bound())\nsetTimeout(user.greet.bind(user), 0)`, result: 'A', explain: 'bind se this permanently user par lock.' },
      { level: 'Advanced', title: 'Arrow in method', code: `const timer = {\n  secs: 0,\n  start() {\n    setInterval(() => { this.secs++ }, 1000)\n  }\n}\n// Arrow callback me this = timer (lexical) ✅`, explain: 'Callback mein arrow se this object par rehता (normal function hota to lost).' },
    ],
    memory:
      '`this` ek binding hai jo har function execution context mein store hoti hai (call-time par set). Arrow functions apna this slot create nahi karte — wo enclosing context ka this reference use karte. bind() ek naya function banाता jiska this permanently fixed (thoda extra memory).',
    notes: {
      concept: 'this call-time par decide hota — kaise call hua.',
      tip: 'Method ki tarah call → this = object. Callbacks mein arrow ya bind use karो.',
      warning: 'Method ko variable mein store karke call karo to this lost ho jaता.',
      error: 'Object method ko arrow function banाना — this object par nahi aata (lexical).',
    },
    compare: {
      headers: ['Call type', 'this value'],
      rows: [
        ['obj.method()', 'obj'],
        ['fn() (non-strict)', 'window'],
        ['fn() (strict)', 'undefined'],
        ['Arrow function', 'Parent (lexical) this'],
        ['fn.call/apply/bind', 'Diya gaya argument'],
        ['new Fn()', 'Naya object'],
      ],
    },
    mistakes: [
      { bad: 'Object method ko arrow banाना.', fix: 'Normal function use karो (this object par aaye).' },
      { bad: 'Callback mein normal function se this lost.', fix: 'Arrow callback ya bind use karो.' },
    ],
    best: ['Methods → normal function.', 'Callbacks → arrow (this preserve).', 'Permanent this → bind.', 'call/apply borrow methods ke liye.'],
    interview: {
      beginner: [
        { q: 'this kya hai?', a: 'Ek keyword jo batata hai function kis context mein call hua. Value call-time par decide hoti hai.' },
      ],
      intermediate: [
        { q: 'call, apply, bind mein fark?', a: 'call(ctx, args...) turant call. apply(ctx, [args]) array se turant. bind(ctx) naya function return karता jo baad mein call hota.' },
        { q: 'Arrow function ka this?', a: 'Apna this nahi — parent lexical scope se. Isliye object method ke liye galat, callbacks ke liye sahi.' },
      ],
      advanced: [
        { q: 'this lost kab hota?', a: 'Jab method ko object se alag karke (variable/callback) call karein. Fix: bind ya arrow.' },
      ],
    },
    mcqs: [
      { q: 'obj.method() mein this?', options: ['window', 'obj', 'undefined', 'global'], answer: 1, explain: 'Dot ke left wala object.' },
      { q: 'Arrow function this?', options: ['Apna', 'Lexical parent', 'window', 'caller'], answer: 1, explain: 'Lexical parent ka this.' },
    ],
    exercises: {
      easy: ['Ek object method banao jo this.name return kare.'],
      medium: ['Method ko variable mein lekar this lost dikhao, bind se fix karो.'],
      advanced: ['call/apply se ek object ka method doosre object par use karो (method borrowing).'],
    },
    summary: [
      'this call-time par decide hota.',
      'Method → object, plain fn → window/undefined.',
      'Arrow ka apna this nahi (lexical).',
      'call/apply/bind se this manually set.',
    ],
    cheatsheet: [
      { h: 'this rules', code: `obj.fn()    → obj\nfn()        → window/undef\narrow       → lexical\nfn.bind(x)  → x` },
    ],
    advanced:
      '`new Fn()` mein this naya banाya object hota hai. DOM event handlers (normal function) mein this = element. React class components mein methods ko bind karna padता tha (ya arrow class fields). `bind` partial application bhi karता: `fn.bind(null, arg1)`.',
    quiz: [
      { q: 'bind kya return karता?', options: ['Value', 'Naya function', 'undefined', 'Object'], answer: 1, explain: 'Naya bound function.' },
      { q: 'apply args kaise leta?', options: ['Comma', 'Array', 'Object', 'String'], answer: 1, explain: 'Array mein.' },
    ],
    related: ['functions-basics', 'objects', 'classes'],
  },

  objects: {
    overview:
      'Object JS ka sabse important data structure hai — **key-value pairs** ka collection. Real-world cheezein (user, product) represent karta. Modern features: **destructuring** (values nikalna), **spread** (`...` se copy/merge), **rest** (baaki collect), `Object.freeze/seal` (lock karna).',
    why:
      'Har JS app objects se bhari hoti hai (state, API response, config). Destructuring/spread React mein har jagah. Object manipulation interview + daily code dono ka core.',
    concept: [
      { h: 'Object creation & access', p: 'Literal `{}` sabse common. Access: dot (`obj.key`) ya bracket (`obj["key"]` — dynamic keys).', code: `const user = { name: 'A', age: 25 }\nuser.name      // 'A'\nuser['age']    // 25\nuser.city = 'Delhi' // add` },
      { h: 'Destructuring', p: 'Object se values directly variables mein nikalना. Rename aur default bhi.', code: `const { name, age, city = 'NA' } = user\nconst { name: n } = user // rename` },
      { h: 'Spread & Rest', p: 'Spread `...` object copy/merge karता. Rest baaki properties collect karता.', code: `const copy = { ...user }\nconst merged = { ...user, role: 'admin' }\nconst { name, ...others } = user // rest` },
      { h: 'freeze & seal', p: '`Object.freeze` — kuch add/edit/delete nahi (fully locked). `Object.seal` — edit ho sakta par add/delete nahi.', code: `const o = Object.freeze({ a: 1 })\no.a = 2 // ignore (strict: error)\nObject.isFrozen(o) // true` },
    ],
    analogy:
      'Object ek **labelled drawer set** hai — har drawer (key) par naam, andar value. Destructuring = "name aur age wale drawer se cheezein nikaal lo". Spread = "saare drawers ki copy bana lo". freeze = "drawers ko taale lagा do". 🗄️',
    syntax: { code: `const obj = { key: value }\nobj.key / obj['key']        // access\nconst { a, b } = obj         // destructure\nconst c = { ...obj }         // spread\nconst { a, ...rest } = obj    // rest`, note: 'Bracket notation dynamic keys ke liye: obj[variable].' },
    examples: [
      { level: 'Beginner', title: 'Object basics', code: `const car = { brand: 'Tata', year: 2023 }\nconsole.log(car.brand)\ncar.color = 'red'\nconsole.log(Object.keys(car))`, result: ['Tata', "[ 'brand', 'year', 'color' ]"] },
      { level: 'Intermediate', title: 'Destructure + spread', code: `const user = { name: 'A', age: 25, city: 'Delhi' }\nconst { name, ...rest } = user\nconsole.log(name, rest)\nconst updated = { ...user, age: 26 }\nconsole.log(updated.age)`, result: ['A { age: 25, city: \'Delhi\' }', '26'], explain: 'rest baaki collect; spread se immutable update.' },
      { level: 'Advanced', title: 'Nested destructure', code: `const res = { data: { user: { name: 'X' } } }\nconst { data: { user: { name } } } = res\nconsole.log(name)\nconst entries = Object.entries({ a: 1, b: 2 })\nconsole.log(entries)`, result: ['X', '[ [ \'a\', 1 ], [ \'b\', 2 ] ]'] },
    ],
    memory:
      'Objects heap mein store hote hain; variable sirf reference (pointer) rakhता. Spread `{...obj}` **shallow** copy banाता — top-level naya, par nested objects abhi bhi shared reference. freeze sirf top-level lock karता (nested freeze ke liye recursive "deep freeze" chahiye).',
    notes: {
      concept: 'Object = key-value. Destructure nikalता, spread copy/merge.',
      tip: 'Immutable update ke liye `{ ...obj, key: newVal }`.',
      warning: 'Spread shallow copy hai — nested objects share hote hain.',
      error: 'freeze sirf top-level — nested abhi bhi mutable.',
    },
    compare: {
      headers: ['Method', 'Add', 'Edit', 'Delete'],
      rows: [
        ['Normal object', '✅', '✅', '✅'],
        ['Object.seal', '❌', '✅', '❌'],
        ['Object.freeze', '❌', '❌', '❌'],
      ],
    },
    mistakes: [
      { bad: 'Spread ko deep copy samajhna.', fix: 'Shallow hai — nested ke liye structuredClone.' },
      { bad: 'Dynamic key ke liye dot notation.', fix: 'Bracket: obj[keyVar].' },
    ],
    best: ['Immutable updates (spread).', 'Destructuring se clean code.', 'Object.keys/values/entries iterate karne ke liye.', 'Config constants Object.freeze se lock karो.'],
    interview: {
      beginner: [
        { q: 'Object kaise banाते?', a: 'Literal {} (common), new Object(), Object.create(). Access dot ya bracket se.' },
        { q: 'Destructuring kya hai?', a: 'Object/array se values seedhे variables mein nikalना: const {a, b} = obj.' },
      ],
      intermediate: [
        { q: 'Spread aur rest mein fark?', a: 'Spread (...) values phailाता (copy/merge). Rest (...) baaki values collect karता (destructure/params mein).' },
      ],
      advanced: [
        { q: 'freeze aur seal mein fark?', a: 'freeze — add/edit/delete kuch nahi. seal — existing edit ho sakta, par add/delete nahi. Dono shallow.' },
      ],
    },
    mcqs: [
      { q: 'Dynamic key access?', options: ['obj.key', 'obj[key]', 'obj->key', 'obj::key'], answer: 1, explain: 'Bracket notation.' },
      { q: 'Spread copy kaisi?', options: ['Deep', 'Shallow', 'None', 'Frozen'], answer: 1, explain: 'Shallow copy.' },
    ],
    exercises: {
      easy: ['Ek user object banao aur destructure karो.'],
      medium: ['Spread se ek object ki immutable updated copy banao.'],
      advanced: ['Object.entries se ek object iterate karke key-value print karो.'],
    },
    summary: [
      'Object = key-value pairs (reference type).',
      'Destructure nikalता, spread copy/merge, rest collect.',
      'freeze full lock, seal add/delete lock.',
      'Spread shallow copy hai.',
    ],
    cheatsheet: [
      { h: 'Object ops', code: `const {a,b}=obj   // destructure\n{...obj}          // spread copy\nObject.keys(obj)\nObject.entries(obj)` },
    ],
    advanced:
      'Computed property names `{ [key]: val }` dynamic keys banाते. Optional chaining + destructuring combine hota. `Object.assign(target, ...src)` bhi merge karता (mutates target). Getters/setters (`get`/`set`) computed properties dete. Property descriptors se enumerable/writable control hota.',
    quiz: [
      { q: 'rest operator kahan?', options: ['Values phailाne', 'Baaki collect', 'Delete', 'Freeze'], answer: 1, explain: 'Baaki properties collect.' },
      { q: 'Object.entries deta?', options: ['Keys', 'Values', '[key,value] pairs', 'Length'], answer: 2, explain: 'Array of [key, value].' },
    ],
    related: ['copy', 'arrays', 'es6-features'],
  },

  copy: {
    overview:
      'JS mein objects/arrays **reference** se copy hote hain — `=` se sirf address copy hota, dono same data point karte. Asli copy ke liye **Shallow Copy** (top-level naya, nested shared — spread/Object.assign) ya **Deep Copy** (sab kuch naya — structuredClone/JSON) chahiye. `Object.freeze` immutability ke liye.',
    why:
      '"Maine copy kiya phir bhi original badal gaya" — yeh #1 confusing bug hai. React state immutability (deep/shallow) interview + real code dono mein critical.',
    concept: [
      { h: 'Reference assignment (copy nahi)', p: '`=` se sirf reference copy. Dono same object — ek badlo, dusra bhi badalता.', code: `const a = { x: 1 }\nconst b = a\nb.x = 99\nconsole.log(a.x) // 99 (same ref!)` },
      { h: 'Shallow Copy', p: 'Top-level properties naye, par nested objects abhi bhi shared. `{...obj}`, `Object.assign`, `[...arr]`, `slice`.', code: `const o = { a: 1, nested: { b: 2 } }\nconst c = { ...o }\nc.a = 9        // o.a unaffected ✅\nc.nested.b = 9 // o.nested.b BHI 9 ❌` },
      { h: 'Deep Copy', p: 'Har level naya — fully independent. `structuredClone(obj)` (modern, best), ya `JSON.parse(JSON.stringify(obj))` (limited).', code: `const deep = structuredClone(o)\ndeep.nested.b = 9 // o safe ✅` },
      { h: 'JSON trick limits', p: 'JSON method functions, undefined, Date, Map/Set, circular refs handle nahi karता — lossy. structuredClone better.', code: `JSON.parse(JSON.stringify({ d: new Date() }))\n// Date string ban gayi (lost type)` },
    ],
    analogy:
      'Reference = ek Google Doc ka **link** share karna (dono edit same doc). Shallow copy = doc ki copy banाना par usme jo **embedded links** hain wo abhi bhi same (nested shared). Deep copy = poora doc + saare nested docs ki nayi copies (fully independent). 📄',
    syntax: { code: `// Shallow\nconst s = { ...obj }\nconst s2 = Object.assign({}, obj)\nconst arr2 = [...arr]\n\n// Deep\nconst d = structuredClone(obj)\nconst d2 = JSON.parse(JSON.stringify(obj))`, note: 'structuredClone modern + best deep copy hai.' },
    examples: [
      { level: 'Intermediate', title: 'Shallow trap', code: `const user = { name: 'A', addr: { city: 'Delhi' } }\nconst copy = { ...user }\ncopy.name = 'B'        // original safe\ncopy.addr.city = 'Pune' // original BHI change!\nconsole.log(user.name, user.addr.city)`, result: 'A Pune', explain: 'name independent (shallow), par addr nested shared.' },
      { level: 'Advanced', title: 'Deep copy fix', code: `const user = { name: 'A', addr: { city: 'Delhi' } }\nconst deep = structuredClone(user)\ndeep.addr.city = 'Pune'\nconsole.log(user.addr.city)`, result: 'Delhi', explain: 'structuredClone se nested bhi independent.' },
    ],
    memory:
      'Shallow copy nested objects ke references copy karта (memory mein wahi nested object). Deep copy har nested object ka naya instance heap mein banाता (zyada memory). structuredClone circular references bhi handle karता; JSON method nahi (error).',
    notes: {
      concept: '= reference, spread shallow, structuredClone deep.',
      tip: 'Flat objects → shallow theek. Nested → deep copy.',
      warning: 'Shallow copy nested objects share karता — silent bugs.',
      error: 'JSON deep copy functions/Date/undefined lose kar deta.',
    },
    compare: {
      headers: ['Method', 'Type', 'Nested independent?'],
      rows: [
        ['= (assign)', 'Reference', '❌ same object'],
        ['{...obj} / assign', 'Shallow', '❌ shared'],
        ['structuredClone', 'Deep', '✅ yes'],
        ['JSON parse/stringify', 'Deep (lossy)', '✅ but limited'],
      ],
    },
    mistakes: [
      { bad: 'Spread se nested ko independent maanना.', fix: 'Deep copy use karो nested ke liye.' },
      { bad: 'Functions wale object ko JSON se copy.', fix: 'structuredClone ya manual.' },
    ],
    best: ['Flat → spread, nested → structuredClone.', 'React state immutably update karो.', 'Config lock ke liye Object.freeze.', 'Circular refs ke liye structuredClone.'],
    interview: {
      intermediate: [
        { q: 'Shallow vs deep copy?', a: 'Shallow top-level naya banाता par nested objects share rehte. Deep har level naya — fully independent.' },
        { q: 'Deep copy kaise?', a: 'structuredClone(obj) (best) ya JSON.parse(JSON.stringify(obj)) (lossy — functions/Date lose).' },
      ],
      advanced: [
        { q: 'JSON deep copy ke nuksaan?', a: 'Functions, undefined, Symbol skip; Date string ban jaati; Map/Set/circular refs handle nahi (error ya loss). structuredClone behtar.' },
      ],
    },
    mcqs: [
      { q: 'Spread copy?', options: ['Deep', 'Shallow', 'Reference', 'None'], answer: 1, explain: 'Shallow copy.' },
      { q: 'Best deep copy?', options: ['=', 'spread', 'structuredClone', 'slice'], answer: 2, explain: 'structuredClone.' },
    ],
    exercises: {
      easy: ['Reference share dikhao (b=a; b badlo; a check).'],
      medium: ['Shallow copy ka nested-shared bug dikhao.'],
      advanced: ['structuredClone se deep copy karke independence prove karो.'],
    },
    summary: [
      '= sirf reference copy karता.',
      'Shallow: top naya, nested shared (spread).',
      'Deep: sab naya (structuredClone).',
      'JSON deep copy lossy hai.',
    ],
    cheatsheet: [
      { h: 'Copy', code: `{...o}            // shallow\nstructuredClone(o)// deep\nObject.freeze(o)  // lock` },
    ],
    advanced:
      'Immutability libraries (Immer) "structural sharing" use karti — sirf changed parts naye, baaki shared (memory efficient). React/Redux performance isi par. Deep equality check ke liye lodash isEqual ya recursive comparison chahiye (=== sirf reference compare karता).',
    quiz: [
      { q: 'Nested independent chahiye?', options: ['Shallow', 'Deep', 'Reference', 'freeze'], answer: 1, explain: 'Deep copy.' },
      { q: 'structuredClone circular refs?', options: ['Error', 'Handle karता', 'Skip', 'Crash'], answer: 1, explain: 'Handle karता (JSON nahi).' },
    ],
    related: ['objects', 'data-types', 'functional-programming'],
  },

  arrays: {
    overview:
      'Array ek **ordered list** hai jo kai values ek variable mein rakhती (index 0 se shuru). Basic mutating methods: `push`/`pop` (end), `shift`/`unshift` (start), `splice` (add/remove anywhere), aur non-mutating `slice`/`concat`. Arrays JS mein objects hi hain (special).',
    why:
      'Lists, data, API responses — sab arrays. Mutating vs non-mutating fark React state mein bahut important. Array operations daily coding + interview ka base.',
    concept: [
      { h: 'Array basics', p: 'Ordered, index-based (0 se). `.length`, mixed types allowed. `arr[i]` se access.', code: `const arr = [10, 20, 30]\narr[0]       // 10\narr.length   // 3\narr[1] = 99  // edit` },
      { h: 'Add/Remove (mutating)', p: '`push` (end add), `pop` (end remove), `unshift` (start add), `shift` (start remove). Original ko badalte hain.', code: `const a = [1, 2]\na.push(3)    // [1,2,3]\na.pop()      // [1,2]\na.unshift(0) // [0,1,2]\na.shift()    // [1,2]` },
      { h: 'splice (mutating)', p: 'Anywhere add/remove/replace: `splice(start, deleteCount, ...items)`. Original badalता.', code: `const a = [1, 2, 3, 4]\na.splice(1, 2)        // remove 2,3 → [1,4]\na.splice(1, 0, 'x')   // add at 1 → [1,'x',4]` },
      { h: 'slice & concat (non-mutating)', p: '`slice(start, end)` portion copy (original safe). `concat` arrays jodता (naya array).', code: `const a = [1, 2, 3, 4]\na.slice(1, 3)   // [2,3] (a safe)\na.concat([5,6]) // [1,2,3,4,5,6]` },
    ],
    analogy:
      'Array ek **train ke dabbe** hain (numbered seats). push = end mein dabba jodना, pop = end ka hatना, unshift/shift = front mein. splice = beech mein dabbe add/remove karne wala flexible tool. slice = kuch dabbon ki photocopy (original train safe). 🚂',
    syntax: { code: `arr.push(x)    arr.pop()\narr.unshift(x) arr.shift()\narr.splice(i, count, ...items)\narr.slice(start, end)  // copy\narr.concat(arr2)`, note: 'splice mutating, slice non-mutating — naam similar, kaam alag!' },
    examples: [
      { level: 'Beginner', title: 'Stack/Queue ops', code: `const stack = []\nstack.push(1); stack.push(2)\nconsole.log(stack.pop())\nconst q = [1, 2, 3]\nconsole.log(q.shift())`, result: ['2', '1'], explain: 'push/pop = stack (LIFO), push/shift = queue (FIFO).' },
      { level: 'Intermediate', title: 'splice vs slice', code: `const a = [1, 2, 3, 4, 5]\nconst sliced = a.slice(1, 3)\nconsole.log(sliced, a)\nconst removed = a.splice(1, 2)\nconsole.log(removed, a)`, result: ['[ 2, 3 ] [ 1, 2, 3, 4, 5 ]', '[ 2, 3 ] [ 1, 4, 5 ]'], explain: 'slice original safe; splice original badal deta.' },
    ],
    memory:
      'Arrays objects hain (heap mein), variable reference rakhता. Mutating methods (push/splice) wahi array badalte (same reference). Non-mutating (slice/concat/spread) naya array banाते — React state ke liye yahi prefer (immutability se re-render detect hota).',
    notes: {
      concept: 'push/pop/shift/unshift/splice mutate; slice/concat/spread nahi.',
      tip: 'React state ke liye non-mutating use karो ([...arr, x]).',
      warning: 'splice aur slice confuse mat karो — splice mutates!',
      error: 'arr.length se index access (arr[arr.length] undefined — last arr[length-1]).',
    },
    compare: {
      headers: ['Method', 'Kaam', 'Mutates?'],
      rows: [
        ['push/pop', 'End add/remove', '✅'],
        ['shift/unshift', 'Start remove/add', '✅'],
        ['splice', 'Anywhere add/remove', '✅'],
        ['slice', 'Portion copy', '❌'],
        ['concat / spread', 'Join / copy', '❌'],
      ],
    },
    mistakes: [
      { bad: 'splice ko non-mutating samajhna.', fix: 'splice original badalता — slice copy karता.' },
      { bad: 'React state ko push se mutate karna.', fix: 'Spread: setState([...arr, item]).' },
    ],
    best: ['React state → non-mutating (spread/slice).', 'Stack: push/pop. Queue: push/shift.', 'Last element: arr[arr.length-1] ya arr.at(-1).', 'Array.isArray() se check.'],
    interview: {
      beginner: [
        { q: 'push aur unshift mein fark?', a: 'push end mein add karता, unshift start mein. Dono mutate karte hain.' },
        { q: 'slice aur splice?', a: 'slice non-mutating portion copy. splice mutating add/remove anywhere.' },
      ],
      intermediate: [
        { q: 'Mutating vs non-mutating methods?', a: 'Mutating (push/pop/splice/sort) original badalte. Non-mutating (slice/concat/map/filter) naya array dete. React mein non-mutating zaroori.' },
      ],
      advanced: [
        { q: 'splice(2, 1, "x") kya karता?', a: 'Index 2 se 1 element remove karke uski jagah "x" daal deta (replace).' },
      ],
    },
    mcqs: [
      { q: 'End se remove?', options: ['shift', 'pop', 'splice', 'slice'], answer: 1, explain: 'pop end se.' },
      { q: 'Non-mutating?', options: ['push', 'splice', 'slice', 'sort'], answer: 2, explain: 'slice copy banाता.' },
    ],
    exercises: {
      easy: ['push/pop/shift/unshift practice karो.'],
      medium: ['splice se array ke beech se 2 elements hataओ.'],
      advanced: ['Bina splice ke, ek element index par insert karne wali function likho (slice se).'],
    },
    summary: [
      'Array = ordered, index-based list.',
      'push/pop/shift/unshift/splice mutate karte.',
      'slice/concat/spread naya array dete.',
      'React state ke liye non-mutating use karो.',
    ],
    cheatsheet: [
      { h: 'Mutating', code: `push pop shift unshift\nsplice sort reverse` },
      { h: 'Non-mutating', code: `slice concat spread\nmap filter reduce` },
    ],
    advanced:
      '`Array.from()`, `Array.of()`, `arr.at(-1)` (last element), `arr.flat()` modern helpers. Arrays sparse ho sakte (holes). Typed Arrays (Int8Array etc.) binary data ke liye. Performance: end operations (push/pop) O(1), start operations (shift/unshift) O(n) — bade arrays mein dhyan.',
    quiz: [
      { q: 'Queue (FIFO) kaise?', options: ['push+pop', 'push+shift', 'unshift+pop', 'slice'], answer: 1, explain: 'push add, shift remove (FIFO).' },
      { q: 'arr.at(-1) deta?', options: ['First', 'Last', 'Length', 'Error'], answer: 1, explain: 'Last element.' },
    ],
    related: ['array-methods', 'objects', 'loops'],
  },

  'array-methods': {
    overview:
      'Modern JS ke **higher-order array methods** — `map`, `filter`, `reduce`, `find`, `some`, `every`, `sort`, `flat`, `flatMap` — declarative, readable, aur mostly **non-mutating**. Loops ki jagah ye use karte. Inhe master karna frontend interview ke liye **must** hai.',
    why:
      'Data transform/filter/aggregate — daily kaam. React rendering `map` par chalता. reduce, sort, find interview ke favourite. Functional, clean code inhi se aata.',
    concept: [
      { h: 'map — transform', p: 'Har element ko transform karke **naya array** (same length) deta. Render lists, transform data.', code: `[1, 2, 3].map(x => x * 2) // [2,4,6]\nusers.map(u => u.name)` },
      { h: 'filter — select', p: 'Condition true wale elements ka naya array (chhota ho sakta).', code: `[1,2,3,4].filter(x => x % 2 === 0) // [2,4]\nusers.filter(u => u.active)` },
      { h: 'reduce — aggregate', p: 'Saare elements ko ek value mein "reduce" karता (sum, max, group). Accumulator + current.', code: `[1,2,3,4].reduce((acc, x) => acc + x, 0) // 10\n// max, count, group by — sab reduce se` },
      { h: 'find / some / every', p: '`find` pehla matching element. `some` koi ek true? (boolean). `every` sab true? (boolean).', code: `[1,2,3].find(x => x > 1)   // 2\n[1,2,3].some(x => x > 2)   // true\n[1,2,3].every(x => x > 0)  // true` },
      { h: 'sort / flat / flatMap', p: '`sort` (mutating! compare fn do), `flat` nested arrays flatten, `flatMap` map + flat ek saath.', code: `[3,1,2].sort((a,b)=>a-b)  // [1,2,3]\n[1,[2,[3]]].flat(2)        // [1,2,3]\n[1,2].flatMap(x=>[x,x*2])  // [1,2,2,4]` },
    ],
    analogy:
      'Socho ek **factory assembly line**: map = har item par paint lagाना (sab transform). filter = quality check (sirf pass wale aage). reduce = saare items ko ek box mein pack (single result). find = pehla red item dhoondna. sort = items ko height se line mein lagाना. 🏭',
    syntax: { code: `arr.map((item, i) => newItem)\narr.filter(item => condition)\narr.reduce((acc, item) => acc, initial)\narr.find(item => condition)\narr.sort((a, b) => a - b)`, note: 'map/filter/reduce non-mutating; sort/reverse MUTATE karte hain!' },
    steps: [
      'map/filter/reduce har element par callback chalाते (left→right).',
      'map: callback ka return naye array mein (same length).',
      'filter: callback true → element rakho.',
      'reduce: accumulator har step update hota, last value return.',
      'sort: compare function ka return (-,0,+) order decide karता.',
    ],
    examples: [
      { level: 'Beginner', title: 'map + filter chain', code: `const nums = [1, 2, 3, 4, 5, 6]\nconst result = nums.filter(n => n % 2 === 0).map(n => n * 10)\nconsole.log(result)`, result: '[ 20, 40, 60 ]', explain: 'Pehle even filter, phir *10 map — chaining.' },
      { level: 'Intermediate', title: 'reduce — sum & group', code: `const cart = [{ p: 100 }, { p: 250 }, { p: 50 }]\nconst total = cart.reduce((sum, item) => sum + item.p, 0)\nconsole.log(total)`, result: '400', explain: 'reduce se total price aggregate.' },
      { level: 'Advanced', title: 'reduce — group by', code: `const people = [{ age: 'y', n: 'A' }, { age: 'o', n: 'B' }, { age: 'y', n: 'C' }]\nconst grouped = people.reduce((acc, p) => {\n  (acc[p.age] ||= []).push(p.n)\n  return acc\n}, {})\nconsole.log(grouped)`, result: "{ y: [ 'A', 'C' ], o: [ 'B' ] }", explain: 'reduce se grouping — powerful pattern.' },
    ],
    memory:
      'map/filter naye arrays banाते (extra memory, original safe). reduce ek accumulator carry karता. sort in-place mutate karता (same array). Bade arrays par chained map/filter multiple arrays banाते — performance-critical mein single reduce ya for loop better ho sakta.',
    notes: {
      concept: 'map transform, filter select, reduce aggregate.',
      tip: 'reduce sabse powerful — map/filter/find sab reduce se ban sakte.',
      warning: 'sort MUTATES + default string sort karта! Numbers ke liye compare fn: (a,b)=>a-b.',
      error: 'map ko forEach ki tarah (side-effect) use karna — return na karo to undefined array.',
    },
    compare: {
      headers: ['Method', 'Returns', 'Mutates?'],
      rows: [
        ['map', 'Naya array (same len)', '❌'],
        ['filter', 'Naya array (subset)', '❌'],
        ['reduce', 'Single value', '❌'],
        ['find', 'Pehla element', '❌'],
        ['some/every', 'Boolean', '❌'],
        ['sort/reverse', 'Same array', '✅'],
      ],
    },
    mistakes: [
      { bad: 'sort numbers bina compare fn.', fix: '[10,2,1].sort((a,b)=>a-b) — warna string sort.' },
      { bad: 'map ka return bhoolna.', fix: 'Har callback se value return karो (warna undefined).' },
      { bad: 'Original mutate karne ke liye sort use, fir confusion.', fix: '[...arr].sort() se copy sort karो.' },
    ],
    best: ['Transform → map, select → filter, aggregate → reduce.', 'sort se pehle copy: [...arr].sort().', 'Existence check → some/find.', 'Chaining se readable pipelines banाओ.'],
    interview: {
      beginner: [
        { q: 'map aur forEach mein fark?', a: 'map naya transformed array return karता. forEach kuch return nahi karता (sirf side-effects, iterate).' },
        { q: 'filter kya karता?', a: 'Condition true wale elements ka naya array deता (original safe).' },
      ],
      intermediate: [
        { q: 'reduce kaise kaam karता?', a: 'Accumulator + current element se chalता, har step acc update hota, last value return. Sum/max/group sab kar sakta.' },
        { q: 'some aur every?', a: 'some — koi ek true? every — sab true? Dono boolean dete (short-circuit karte).' },
      ],
      advanced: [
        { q: 'sort ka default behaviour?', a: 'Elements ko string mein convert karke compare karता (isliye [10,2,1] → [1,10,2]). Numbers ke liye compare fn (a,b)=>a-b zaroori. Aur sort MUTATES.' },
        { q: 'map ko reduce se kaise banाoge?', a: 'arr.reduce((acc, x) => [...acc, fn(x)], []) — har element transform karke accumulate.' },
      ],
    },
    mcqs: [
      { q: 'Naya array (same length)?', options: ['filter', 'map', 'reduce', 'find'], answer: 1, explain: 'map har element transform.' },
      { q: 'sort mutate karता?', options: ['Haan', 'Nahi', 'Kabhi-kabhi', 'Sirf strings'], answer: 0, explain: 'sort in-place mutates.' },
      { q: 'Boolean kaun deta?', options: ['map', 'filter', 'every', 'slice'], answer: 2, explain: 'every/some boolean.' },
    ],
    exercises: {
      easy: ['map se array ke har element ko square karो.', 'filter se even numbers nikaalो.'],
      medium: ['reduce se array ka sum aur max nikaalो.'],
      advanced: ['reduce se objects array ko ek property se group karो.'],
    },
    summary: [
      'map transform, filter select, reduce aggregate.',
      'find pehla, some koi-ek, every sab.',
      'sort/reverse MUTATE karte (baaki nahi).',
      'reduce sabse powerful — sab kuch ban sakta.',
    ],
    cheatsheet: [
      { h: 'HOF methods', code: `.map(x=>...)     // transform\n.filter(x=>...)  // select\n.reduce((a,x)=>...,0)\n.find .some .every` },
      { h: 'sort numbers', code: `arr.sort((a,b)=>a-b) // asc` },
    ],
    projects: ['Product filter + sort', 'Cart total (reduce)', 'Search filter', 'Group by category', 'Leaderboard sort'],
    advanced:
      'reduce universal hai — map, filter, find sab reduce se implement ho sakte. `reduceRight` right-to-left. Method chaining lazy nahi — har method poora array process karता (bade data par single-pass reduce ya transducers efficient). `Array.prototype` par custom methods add kar sakte (avoid in prod).',
    quiz: [
      { q: 'Aggregate ke liye?', options: ['map', 'filter', 'reduce', 'find'], answer: 2, explain: 'reduce single value.' },
      { q: 'Pehla matching element?', options: ['filter', 'find', 'some', 'map'], answer: 1, explain: 'find pehla element.' },
    ],
    related: ['arrays', 'callbacks-hof', 'functional-programming'],
  },

  strings: {
    overview:
      'String text data hai (characters ka sequence). JS mein strings **immutable** hain — koi method original ko nahi badalता, naya string deता. **Template literals** (backticks) interpolation aur multi-line dete. Useful methods: slice, split, replace, includes, trim, padStart, etc.',
    why:
      'User input, text processing, URLs, formatting — sab strings. Immutability concept aur template literals interview + daily code mein common.',
    concept: [
      { h: 'String methods', p: 'Common: `length`, `toUpperCase/toLowerCase`, `slice/substring`, `indexOf/includes`, `replace/replaceAll`, `split`, `trim`, `padStart`.', code: `'Hello'.length          // 5\n'Hello'.toUpperCase()   // 'HELLO'\n'Hello'.slice(0, 3)     // 'Hel'\n'a,b,c'.split(',')      // ['a','b','c']\n'  hi  '.trim()         // 'hi'` },
      { h: 'Template literals', p: 'Backticks `` ` `` se: `${expression}` interpolation aur multi-line strings. String concatenation se behtar.', code: `const name = 'A', age = 25\n\`Hi \${name}, age \${age}\`\n\`Line1\nLine2\` // multi-line` },
      { h: 'Immutability', p: 'Strings badle nahi ja sakte. `str[0] = "X"` kaam nahi karता. Har method naya string banाता.', code: `let s = 'hello'\ns[0] = 'H'    // ignore (no change)\ns = s.toUpperCase() // naya string assign` },
    ],
    analogy:
      'String ek **printed page** jaisा hai — usme likha kuch mita nahi sakte (immutable). Badalना ho to **nayi page** print karni padti (naya string). Template literal ek **fill-in-the-blanks form** — `${}` mein values bhar do. 📄',
    syntax: { code: `str.slice(start, end)\nstr.split(sep)\nstr.replace(old, new)\nstr.includes(sub)\n\`Hello \${name}\`  // template literal`, note: 'Template literals backticks use karte, normal quotes nahi.' },
    examples: [
      { level: 'Beginner', title: 'Common methods', code: `const s = '  JavaScript  '\nconsole.log(s.trim())\nconsole.log(s.trim().toUpperCase())\nconsole.log('a-b-c'.split('-'))`, result: ['JavaScript', 'JAVASCRIPT', "[ 'a', 'b', 'c' ]"] },
      { level: 'Intermediate', title: 'Template literals', code: `const user = 'Devendra', items = 3\nconst msg = \`Hi \${user}, aapke cart mein \${items} items hain.\`\nconsole.log(msg)`, result: 'Hi Devendra, aapke cart mein 3 items hain.' },
      { level: 'Advanced', title: 'Immutability + reverse', code: `const str = 'hello'\nconst reversed = str.split('').reverse().join('')\nconsole.log(reversed, str)`, result: 'olleh hello', explain: 'Original safe — reverse ke liye array banाna padा (string immutable).' },
    ],
    memory:
      'Strings primitive hain — value se copy hote, immutable. Engines short strings ko intern (reuse) kar sakte memory bachाने ke liye. Bahut saare string concatenations (loop mein +) naye strings banाते — bade text ke liye array.join() ya template literals efficient.',
    notes: {
      concept: 'Strings immutable — methods naya string dete.',
      tip: 'Concatenation ke बजाय template literals use karो (readable).',
      warning: 'str[0]="X" se string nahi badalती (silently ignore).',
      error: 'substring vs slice — negative index sirf slice support karता.',
    },
    compare: {
      headers: ['Method', 'Kaam', 'Negative index?'],
      rows: [
        ['slice(a,b)', 'Portion', '✅ haan'],
        ['substring(a,b)', 'Portion', '❌ nahi'],
        ['split(sep)', 'Array banाता', '—'],
        ['replace', 'Pehla match badle', '—'],
        ['replaceAll', 'Sab match badle', '—'],
      ],
    },
    mistakes: [
      { bad: 'String index se modify karna (str[0]="X").', fix: 'Strings immutable — naya string banाओ.' },
      { bad: 'replace se saare matches expect karna.', fix: 'replace pehla; replaceAll ya regex /g use karो.' },
    ],
    best: ['Template literals for interpolation.', 'trim() user input par.', 'includes() for search (indexOf se readable).', 'Bade concatenation → array.join().'],
    interview: {
      beginner: [
        { q: 'String immutable kya matlab?', a: 'String badli nahi ja sakti — har method naya string return karता, original same rehता.' },
        { q: 'Template literal kya hai?', a: 'Backtick string jisme ${} se variables embed aur multi-line likh sakte. Concatenation se clean.' },
      ],
      intermediate: [
        { q: 'slice vs substring?', a: 'Dono portion dete. slice negative index support karता (end se), substring nahi (0 maan leta).' },
      ],
      advanced: [
        { q: 'String reverse kaise?', a: 'str.split("") → array, reverse(), join("") — kyunki string immutable hai directly reverse nahi ho sakti.' },
      ],
    },
    mcqs: [
      { q: 'Strings hain?', options: ['Mutable', 'Immutable', 'Reference type', 'Arrays'], answer: 1, explain: 'Immutable primitives.' },
      { q: 'Interpolation kis se?', options: ['Quotes', 'Backticks ${}', 'Brackets', 'Plus only'], answer: 1, explain: 'Template literals.' },
    ],
    exercises: {
      easy: ['Ek string ko uppercase aur trim karो.'],
      medium: ['Template literal se ek formatted message banao.'],
      advanced: ['Ek string palindrome hai ya nahi check karne wali function likho.'],
    },
    summary: [
      'Strings immutable — methods naya string dete.',
      'Template literals: ${} interpolation + multi-line.',
      'slice negative index, substring nahi.',
      'replace pehla, replaceAll sab.',
    ],
    cheatsheet: [
      { h: 'Methods', code: `slice split replace\nincludes trim toUpperCase\npadStart repeat` },
      { h: 'Template', code: '`Hi ${name}`' },
    ],
    advanced:
      'Tagged template literals (`tag\\`...\\``) advanced string processing dete (styled-components, GraphQL queries). Strings UTF-16 hain — emojis/special chars 2 code units le sakte (length tricky). `Intl` API locale-aware formatting deता. Regex (`/pattern/`) powerful string matching ke liye.',
    quiz: [
      { q: 'replaceAll kya karता?', options: ['Pehla match', 'Saare matches', 'Kuch nahi', 'Reverse'], answer: 1, explain: 'Saare occurrences badle.' },
      { q: 'Multi-line string?', options: ['Quotes', 'Backticks', 'Brackets', 'Possible nahi'], answer: 1, explain: 'Template literals multi-line.' },
    ],
    related: ['data-types', 'array-methods', 'type-conversion'],
  },
}
