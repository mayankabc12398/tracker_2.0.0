// JS content — Part 4: DOM, Events, Asynchronous JS

export const jsContentD = {
  dom: {
    overview:
      '**DOM (Document Object Model)** HTML page ka ek tree-jaisा JavaScript representation hai. Browser HTML ko parse karke ek tree banाता hai jisme har tag ek "node" hai. JS isi DOM ko select, change, add, remove karke page ko dynamic banाता hai — bina reload kiye.',
    why:
      'Har interactive feature (button, form, modal, list update) DOM manipulation se banता hai. Vanilla DOM samajhe bina React jaise frameworks ka "kyun" samajh nahi aata. Machine-coding rounds isi par.',
    concept: [
      { h: 'DOM kya hai?', p: 'HTML ka object tree. `document` root hai. Har element, attribute, text ek node. JS in nodes ko access/modify kar sakta.', code: `document            // poora document\ndocument.body       // body element\ndocument.title      // page title` },
      { h: 'Elements select karna', p: '`getElementById`, `querySelector` (CSS selector, pehla), `querySelectorAll` (saare → NodeList).', code: `document.getElementById('app')\ndocument.querySelector('.btn')\ndocument.querySelectorAll('li')` },
      { h: 'Content & attributes change', p: '`textContent` (sirf text, safe), `innerHTML` (HTML parse — careful XSS), `classList` (class add/remove/toggle), `setAttribute`.', code: `el.textContent = 'Hello'\nel.innerHTML = '<b>Hi</b>'\nel.classList.add('active')\nel.classList.toggle('dark')` },
      { h: 'Create / add / remove', p: '`createElement`, `appendChild`/`append`, `removeChild`/`remove`. Dynamic elements.', code: `const li = document.createElement('li')\nli.textContent = 'New'\nlist.appendChild(li)\nli.remove()` },
    ],
    analogy:
      'DOM ek **family tree** hai — document dada, body baap, divs/buttons bachche. JS ek **interior designer** hai jo tree ke kisi bhi member ko dhoondkar (select) uska rang, text, ya position badal sakta — ya naye members add/remove kar sakta. 🌳',
    syntax: { code: `// Select\nconst el = document.querySelector('.box')\n// Modify\nel.textContent = 'Hi'\nel.classList.add('active')\n// Create + add\nconst node = document.createElement('div')\nparent.appendChild(node)`, note: 'querySelector CSS selectors leता — flexible aur modern.' },
    steps: [
      'Browser HTML parse karke DOM tree banाता hai.',
      'JS document se element select karता (query).',
      'Property/attribute/class change karता.',
      'Naye nodes create karke tree mein add karता.',
      'Browser badle DOM ko re-render karता (reflow/repaint).',
    ],
    examples: [
      { level: 'Beginner', title: 'Text change', code: `// HTML: <h1 id="title">Old</h1>\nconst t = document.getElementById('title')\nt.textContent = 'New Title'\nt.style.color = 'indigo'`, preview: { html: '<h1 id="title">Old</h1>', js: "document.getElementById('title').textContent='New Title ✅'", height: 90 } },
      { level: 'Intermediate', title: 'Dynamic list', code: `const list = document.querySelector('#list')\n['A', 'B', 'C'].forEach(text => {\n  const li = document.createElement('li')\n  li.textContent = text\n  list.appendChild(li)\n})`, preview: { html: '<ul id="list"></ul>', js: "const l=document.querySelector('#list');['A','B','C'].forEach(t=>{const li=document.createElement('li');li.textContent=t;l.appendChild(li)})", height: 110 } },
      { level: 'Advanced', title: 'classList toggle', code: `const box = document.querySelector('.box')\nbox.addEventListener('click', () => {\n  box.classList.toggle('active')\n})`, explain: 'Click par class toggle — accordions, modals ka base.' },
    ],
    memory:
      'DOM nodes objects hain (browser memory mein). JS references unhe pakadte hain. Agar removed node ka reference JS variable/closure mein reh jaaye, to wo memory mein bana rehता ("detached DOM" leak). Event listeners hatना na bhoolो jab element remove karो.',
    browser:
      'innerHTML set karna poora subtree re-parse karता (slow + XSS risk agar user data ho). textContent safe + fast. Bahut saare DOM updates ek-ek karke reflow trigger karte hain — DocumentFragment ya batch updates use karो performance ke liye.',
    notes: {
      concept: 'DOM = HTML ka JS object tree. document root.',
      tip: 'querySelector/querySelectorAll modern + flexible (CSS selectors).',
      warning: 'innerHTML user data ke saath = XSS risk. textContent use karो.',
      error: 'querySelectorAll NodeList deता — map nahi chalता directly (Array.from karो).',
    },
    compare: {
      headers: ['Method', 'Returns', 'Note'],
      rows: [
        ['getElementById', 'Ek element', 'Sabse fast, id se'],
        ['querySelector', 'Pehla match', 'CSS selector'],
        ['querySelectorAll', 'NodeList (saare)', 'CSS selector'],
        ['textContent', 'Text', 'Safe'],
        ['innerHTML', 'HTML', 'XSS risk'],
      ],
    },
    mistakes: [
      { bad: 'User input ko innerHTML mein daalna.', fix: 'textContent (XSS se bacho).' },
      { bad: 'NodeList par .map() direct.', fix: 'Array.from(nodeList).map() ya forEach.' },
    ],
    best: ['querySelector use karो.', 'User data → textContent.', 'Bulk add → DocumentFragment.', 'Removed elements ke listeners cleanup karो.'],
    interview: {
      beginner: [
        { q: 'DOM kya hai?', a: 'Document Object Model — HTML page ka tree-jaisा JS object representation jise JS access/modify kar sakta hai.' },
        { q: 'innerHTML vs textContent?', a: 'innerHTML HTML parse karता (XSS risk), textContent sirf plain text set karता (safe + fast).' },
      ],
      intermediate: [
        { q: 'querySelector vs getElementById?', a: 'getElementById sirf id se (fast). querySelector koi bhi CSS selector leता (flexible), pehla match deता.' },
      ],
      advanced: [
        { q: 'DOM updates performance kaise improve?', a: 'Batch updates, DocumentFragment use karो, reflows minimize karो, virtual DOM (React) diffing karता. innerHTML bade subtrees par mehnga.' },
      ],
    },
    mcqs: [
      { q: 'DOM ka root?', options: ['body', 'html', 'document', 'window'], answer: 2, explain: 'document root object.' },
      { q: 'Safe text set?', options: ['innerHTML', 'textContent', 'outerHTML', 'write'], answer: 1, explain: 'textContent XSS-safe.' },
    ],
    exercises: {
      easy: ['Ek element select karke uska text badlo.'],
      medium: ['Array se dynamic list (ul/li) banao.'],
      advanced: ['Button click par list mein item add/remove karne wala mini app banao.'],
    },
    summary: [
      'DOM = HTML ka JS object tree.',
      'Select: getElementById, querySelector(All).',
      'Modify: textContent, innerHTML, classList.',
      'Create: createElement + appendChild.',
    ],
    cheatsheet: [
      { h: 'Select', code: `getElementById('x')\nquerySelector('.c')\nquerySelectorAll('li')` },
      { h: 'Modify', code: `el.textContent='x'\nel.classList.toggle('a')\nel.append(node)` },
    ],
    projects: ['Todo list', 'Accordion', 'Tabs', 'Modal', 'Live counter', 'Theme toggle'],
    advanced:
      'Virtual DOM (React) real DOM ka lightweight JS copy rakhता, diff karके sirf changed parts update karता (fast). Shadow DOM (Web Components) encapsulated DOM deता. MutationObserver DOM changes watch karता. Yeh sab vanilla DOM par bante hain.',
    quiz: [
      { q: 'classList.toggle kya karता?', options: ['Add only', 'Remove only', 'Add/remove switch', 'Nothing'], answer: 2, explain: 'Class on/off toggle.' },
      { q: 'querySelectorAll deta?', options: ['Array', 'NodeList', 'Object', 'String'], answer: 1, explain: 'NodeList.' },
    ],
    related: ['events', 'what-is-js', 'performance'],
  },

  events: {
    overview:
      'Events user/browser ke actions hain — click, type, scroll, load. JS un par **event listeners** lagाता hai react karne ke liye. Important concepts: **Event Object** (event ki info), **Bubbling/Capturing** (event tree mein kaise travel karता), **Delegation** (parent par ek listener), `preventDefault`, `stopPropagation`.',
    why:
      'Saari interactivity events par chalती hai. Event delegation, bubbling, preventDefault interview ke common questions + real performance patterns hain.',
    concept: [
      { h: 'Event listeners', p: '`addEventListener(type, callback)` se event sunte hain. Callback ko **event object** milta hai (target, type, coordinates).', code: `btn.addEventListener('click', (e) => {\n  console.log(e.target) // clicked element\n})` },
      { h: 'Bubbling vs Capturing', p: 'Event 2 phases mein travel karता: **Capturing** (top→target, neeche) phir **Bubbling** (target→top, upar — default). Default mein handlers bubbling par chalte.', code: `// bubbling (default)\nparent.addEventListener('click', fn)\n// capturing\nparent.addEventListener('click', fn, true)` },
      { h: 'Event Delegation', p: 'Har child par listener ki jagah **parent par ek** listener; bubbling se child events pakdो. Dynamic lists ke liye efficient.', code: `list.addEventListener('click', (e) => {\n  if (e.target.tagName === 'LI') {\n    console.log(e.target.textContent)\n  }\n})` },
      { h: 'preventDefault & stopPropagation', p: '`preventDefault()` default action rokता (form submit, link). `stopPropagation()` bubbling rokता (parent tak na jaaye).', code: `form.addEventListener('submit', (e) => {\n  e.preventDefault() // page reload roko\n})` },
    ],
    analogy:
      'Bubbling ek **paani ka bulbula** hai — neeche (child) se shuru hokar upar (parent) tak uthता. Event delegation ek **class teacher** jaisा — har bachche se alag baat karने ke बजाय poori class (parent) ko ek baar sunती hai, aur jo bola (target) usko handle karती. 🫧',
    syntax: { code: `el.addEventListener('click', handler)\nel.removeEventListener('click', handler)\n// event object\nhandler(e) { e.target; e.preventDefault(); e.stopPropagation() }`, note: 'removeEventListener ke liye same function reference chahiye (anonymous nahi).' },
    steps: [
      'Event hota hai (jaise click) target element par.',
      'Capturing phase: document se target tak neeche aata.',
      'Target par handlers chalte.',
      'Bubbling phase: target se document tak upar jaता (default handlers yahan).',
      'stopPropagation se travel ruk jaता; preventDefault default action rokता.',
    ],
    examples: [
      { level: 'Intermediate', title: 'Event delegation', code: `// HTML: <ul id="menu"><li>A</li><li>B</li></ul>\nconst menu = document.getElementById('menu')\nmenu.addEventListener('click', (e) => {\n  if (e.target.tagName === 'LI')\n    alert('Clicked: ' + e.target.textContent)\n})`, explain: 'Ek listener parent par — naye li bhi automatically handle (bubbling).' },
      { level: 'Advanced', title: 'preventDefault', code: `form.addEventListener('submit', (e) => {\n  e.preventDefault()\n  console.log('Validate karke API call karo')\n})\nlink.addEventListener('click', e => e.preventDefault())`, explain: 'Form reload aur link navigation roka — SPA ka base.' },
    ],
    memory:
      'Har addEventListener ek callback reference memory mein rakhता. Bahut saare elements par individual listeners = zyada memory + slow. Event delegation se ek listener kaafi (memory efficient). Element remove karte time removeEventListener karो warna closure + DOM node leak.',
    browser:
      'Browser event ko capturing → target → bubbling phases mein dispatch karता. Kuch events (focus, blur) bubble nahi karte. Passive listeners (`{ passive: true }`) scroll performance improve karte (browser ko pata hota preventDefault nahi hoga).',
    notes: {
      concept: 'Bubbling default (target→up). Delegation = parent par ek listener.',
      tip: 'Dynamic lists ke liye event delegation use karो.',
      warning: 'stopPropagation zyada use mat karो — doosre handlers tut sakte.',
      error: 'removeEventListener anonymous function se kaam nahi karता (named reference do).',
    },
    compare: {
      headers: ['Concept', 'Direction', 'Use'],
      rows: [
        ['Capturing', 'Top → target', 'Rarely (true flag)'],
        ['Bubbling', 'Target → top', 'Default'],
        ['Delegation', 'Parent listener', 'Dynamic lists'],
        ['preventDefault', '—', 'Default action roko'],
        ['stopPropagation', '—', 'Travel roko'],
      ],
    },
    mistakes: [
      { bad: 'Har li par alag listener (dynamic list).', fix: 'Parent par delegation use karो.' },
      { bad: 'preventDefault ko bubbling rokने ke liye samajhna.', fix: 'preventDefault default action; stopPropagation bubbling.' },
    ],
    best: ['Dynamic lists → delegation.', 'Forms/links → preventDefault for SPA.', 'Cleanup listeners on remove.', 'Scroll par passive listeners.'],
    interview: {
      beginner: [
        { q: 'Event bubbling kya hai?', a: 'Event target se upar (parents tak) travel karता hai. Default behaviour — isliye parent par lagा handler bhi chalता.' },
        { q: 'preventDefault kya karता?', a: 'Element ka default action rokता — jaise form submit par reload, link par navigation.' },
      ],
      intermediate: [
        { q: 'Event delegation kya aur fayda?', a: 'Har child ki jagah parent par ek listener lagाना (bubbling se). Memory efficient + dynamically added elements bhi handle hote.' },
        { q: 'stopPropagation vs preventDefault?', a: 'stopPropagation event ko aage travel (bubble) hone se rokта. preventDefault default browser action rokта. Alag cheezein.' },
      ],
      advanced: [
        { q: 'Capturing vs bubbling phases?', a: 'Event pehle capturing (document→target, neeche) phir bubbling (target→document, upar). addEventListener ka 3rd arg true = capturing.' },
      ],
    },
    mcqs: [
      { q: 'Default event phase?', options: ['Capturing', 'Bubbling', 'Both', 'None'], answer: 1, explain: 'Bubbling par handlers chalte.' },
      { q: 'Form reload rokने ke liye?', options: ['stopPropagation', 'preventDefault', 'return', 'stop'], answer: 1, explain: 'preventDefault.' },
    ],
    exercises: {
      easy: ['Button click par message dikhao.'],
      medium: ['Event delegation se list items ke clicks handle karो.'],
      advanced: ['Form preventDefault karके custom validation + submit banao.'],
    },
    summary: [
      'Events = user/browser actions; addEventListener se suno.',
      'Bubbling (target→up) default; capturing ulta.',
      'Delegation = parent par ek listener (efficient).',
      'preventDefault default roko, stopPropagation travel roko.',
    ],
    cheatsheet: [
      { h: 'Events', code: `el.addEventListener('click', fn)\ne.target  e.preventDefault()\ne.stopPropagation()` },
    ],
    projects: ['Delegated todo list', 'Modal with outside-click close', 'Custom dropdown', 'Keyboard shortcuts', 'Drag and drop'],
    advanced:
      'Custom events `new CustomEvent("name", {detail})` + dispatchEvent se component communication. Event loop async events ko queue karता. React apne "synthetic events" use karता (cross-browser wrapper, delegation at root). AbortController se listeners ek saath remove kar sakte.',
    quiz: [
      { q: 'Delegation kis par based?', options: ['Capturing', 'Bubbling', 'preventDefault', 'Timers'], answer: 1, explain: 'Bubbling se parent pakadता.' },
      { q: 'e.target kya hai?', options: ['Parent', 'Jis par event hua', 'document', 'window'], answer: 1, explain: 'Actual element jahan event hua.' },
    ],
    related: ['dom', 'debounce-throttle', 'async-intro'],
  },

  'async-intro': {
    overview:
      'JavaScript single-threaded hai, par **asynchronous** kaam (timers, network requests, file reads) ko bina block kiye handle karती hai browser ke **Web APIs**, **Callback Queue**, aur **Event Loop** ki madad se. Yeh samajhna promises/async-await ki neev hai.',
    why:
      'Har real app data fetch karता hai (async). "Code order se kyun nahi chala", callback hell, race conditions — sab yahin se. Event loop interview ka top-5 topic hai.',
    concept: [
      { h: 'Sync vs Async recap', p: 'Sync: line-by-line, blocking. Async: kaam background mein, callback baad mein. JS thread block nahi hota.', code: `console.log(1)\nsetTimeout(() => console.log(2), 0)\nconsole.log(3)\n// 1, 3, 2` },
      { h: 'Web APIs', p: 'setTimeout, fetch, DOM events, etc. JS engine ka part NAHI — browser dete hain. Yahi background kaam karte aur callback queue mein daalते.', code: `setTimeout(fn, 1000) // browser timer\nfetch(url)            // browser network` },
      { h: 'Callback Queue & Event Loop', p: 'Web API complete hone par callback **callback queue** mein jaता. **Event loop** check karता — call stack khaali ho to queue se callback stack par push.', code: `// Event loop logic:\n// while(true) {\n//   if (stack empty) push next callback\n// }` },
      { h: 'Callbacks for async', p: 'Pehle async ka result callbacks se milta tha. Nested callbacks = "callback hell" (hard to read). Solution: promises/async-await.', code: `getData((data) => {\n  process(data, (result) => {\n    save(result, () => {}) // nesting!\n  })\n})` },
    ],
    analogy:
      'Restaurant socho: tum order do (async task), waiter (Web API) kitchen ko de deta. Tum wait nahi karte — baaki kaam karte raho. Khana ready hone par waiter "ready!" bolता (callback queue), aur jab tum free ho (stack empty) tab table par aata (event loop). 🍽️',
    syntax: { code: `setTimeout(callback, delay)\nfetch(url).then(res => res.json())\nelement.addEventListener('click', cb)\n\n// callback pattern\ndoAsync((err, data) => { ... })`, note: 'Web APIs background mein chalti, callbacks event loop ke through wapas aate.' },
    steps: [
      'Sync code call stack par chalता.',
      'Async task (setTimeout/fetch) Web API ko diya jaता.',
      'Web API background mein handle karता (timer/network).',
      'Complete hone par callback callback queue (ya microtask queue) mein.',
      'Event loop: stack khaali → callback push → chalता.',
    ],
    examples: [
      { level: 'Beginner', title: 'Async order', code: `console.log('Start')\nsetTimeout(() => console.log('Async'), 0)\nconsole.log('End')`, result: ['Start', 'End', 'Async'], explain: 'setTimeout callback queue mein — sync ke baad.' },
      { level: 'Advanced', title: 'Callback hell', code: `setTimeout(() => {\n  console.log('Step 1')\n  setTimeout(() => {\n    console.log('Step 2')\n    setTimeout(() => console.log('Step 3'), 100)\n  }, 100)\n}, 100)`, result: ['Step 1', 'Step 2', 'Step 3'], explain: 'Nesting badhती jaती — yahi callback hell, promises se solve.' },
    ],
    memory:
      'Async callbacks (closures) memory mein rehte hain jab tak execute na ho. Pending timers/requests apne callbacks ko zinda rakhte. Web APIs browser ke alag threads par chalti hain (JS single-thread rehता). Microtask queue (promises) macrotask queue (setTimeout) se higher priority.',
    notes: {
      concept: 'Web APIs + Callback Queue + Event Loop = async.',
      tip: 'setTimeout(fn, 0) bhi sync code ke baad chalता.',
      warning: 'Callback hell readability maar deta — promises/async-await use karो.',
      error: 'Async result ko sync ki tarah use karna (turant access) — data abhi aaya nahi hota.',
    },
    compare: {
      headers: ['Part', 'Kaun deta', 'Kaam'],
      rows: [
        ['Call Stack', 'JS engine', 'Sync execution'],
        ['Web APIs', 'Browser', 'Timers, network'],
        ['Callback Queue', 'Browser', 'Ready callbacks'],
        ['Event Loop', 'Runtime', 'Stack↔queue manage'],
      ],
    },
    mistakes: [
      { bad: 'setTimeout(fn, 0) turant chalेga maan lena.', fix: 'Sync code ke baad, queue se.' },
      { bad: 'Deep nested callbacks.', fix: 'Promises/async-await.' },
    ],
    best: ['Async ke liye promises/async-await.', 'Callback hell se bacho.', 'Errors handle karो (callbacks/promises).', 'Heavy kaam Web Workers mein.'],
    interview: {
      beginner: [
        { q: 'JS async kaise hai jab single-threaded?', a: 'Browser ke Web APIs background mein async kaam karte, callbacks event loop ke through call stack par aate jab wo khaali ho.' },
      ],
      intermediate: [
        { q: 'Event loop kya hai?', a: 'Ek mechanism jo call stack khaali hone par callback queue se callbacks ko stack par push karता. Yahi async ko non-blocking banाता.' },
        { q: 'Callback hell kya?', a: 'Nested callbacks ka unreadable pyramid. Promises aur async/await se solve hota.' },
      ],
      advanced: [
        { q: 'Web APIs JS engine ka part hain?', a: 'Nahi — browser (ya Node) dete hain. setTimeout, fetch, DOM sab Web APIs hain, engine sirf execute karता.' },
      ],
    },
    mcqs: [
      { q: 'setTimeout kaun deta?', options: ['JS engine', 'Web API (browser)', 'Event loop', 'Call stack'], answer: 1, explain: 'Browser Web API.' },
      { q: 'Event loop kab callback push?', options: ['Turant', 'Stack khaali ho', 'Random', '1 sec baad'], answer: 1, explain: 'Stack khaali hone par.' },
    ],
    exercises: {
      easy: ['setTimeout se 2 sec baad message print karो.'],
      medium: ['3 setTimeout ka output order predict karो.'],
      advanced: ['Callback hell ko likhо phir socho promises se kaise flat hoga.'],
    },
    summary: [
      'JS single-threaded par async (Web APIs).',
      'Web APIs background, callbacks queue mein.',
      'Event loop stack khaali hone par callbacks laता.',
      'Callback hell → promises/async-await.',
    ],
    cheatsheet: [
      { h: 'Async parts', code: `Call Stack (sync)\nWeb APIs (bg)\nCallback Queue\nEvent Loop` },
    ],
    advanced:
      'Microtask queue (Promise.then, queueMicrotask) macrotask queue (setTimeout, setInterval) se pehle drain hota — har macrotask ke baad saare microtasks chalte. Node.js mein extra phases (process.nextTick, I/O, check) hote. Yeh detail event-loop topic mein.',
    quiz: [
      { q: 'Async ka result kab milta?', options: ['Turant', 'Baad mein (callback)', 'Kabhi nahi', 'Compile time'], answer: 1, explain: 'Callback/promise se baad mein.' },
      { q: 'Callback hell solution?', options: ['var', 'Promises', 'Loops', 'More callbacks'], answer: 1, explain: 'Promises/async-await.' },
    ],
    related: ['event-loop', 'promises', 'single-threaded'],
  },

  'event-loop': {
    overview:
      '**Event Loop** JS ka dil hai jo async ko possible banाता. Yeh continuously check karता: "Call stack khaali hai? Toh queue se agla task uthा kar chalाओ." Do queues: **Microtask Queue** (promises, higher priority) aur **Macrotask Queue** (setTimeout, events). Microtasks hamesha pehle.',
    why:
      'Output-prediction questions (setTimeout vs promise order) is topic se aate. Race conditions, UI jank, "kyun yeh pehle chala" — sab event loop. Advanced interview ka guaranteed question.',
    concept: [
      { h: 'Call Stack + Queues', p: 'Sync code stack par. Async callbacks queues mein. Event loop stack khaali hone par queue se uthाता.', code: `console.log('1')   // stack\nsetTimeout(f, 0)   // macrotask queue\nPromise.resolve().then(g) // microtask queue` },
      { h: 'Microtask vs Macrotask', p: '**Microtask** (Promise.then, queueMicrotask, await): higher priority. **Macrotask** (setTimeout, setInterval, events): lower. Har macrotask ke baad SAARE microtasks drain hote.', code: `// Order rule:\n// Sync → all Microtasks → 1 Macrotask\n// → all Microtasks → next Macrotask...` },
      { h: 'The famous order', p: 'Sync pehle, phir saare microtasks, phir ek macrotask, phir microtasks again. Yeh pattern repeat.', code: `console.log('A')\nsetTimeout(() => console.log('B'))\nPromise.resolve().then(() => console.log('C'))\nconsole.log('D')\n// A, D, C, B` },
    ],
    analogy:
      'Event loop ek **receptionist** hai. Sync kaam pehle nipta deta. Phir VIP line (microtasks — promises) ko poora khatam karता. Uske baad normal line (macrotasks — setTimeout) se SIRF EK banda, phir wapas VIP line check. VIP hamesha priority. 🎫',
    syntax: { code: `// Priority order\n1. Synchronous code\n2. ALL microtasks (Promise.then, await)\n3. ONE macrotask (setTimeout, setInterval)\n4. Repeat 2-3`, note: 'Har macrotask ke baad poori microtask queue drain hoti.' },
    steps: [
      'Saara synchronous code call stack par chalता.',
      'Stack khaali → microtask queue COMPLETELY drain (saare promises).',
      'Phir macrotask queue se SIRF EK task uthा kar chalाओ.',
      'Us task ke baad phir saare microtasks drain.',
      'Yeh loop chalta rehता (event loop).',
    ],
    visual: {
      type: 'boxes',
      items: [
        { label: 'Call Stack', sub: 'Sync code', color: '#F59E0B' },
        { label: 'Microtask Q', sub: 'Promises (1st)', color: '#22C55E' },
        { label: 'Macrotask Q', sub: 'setTimeout (2nd)', color: '#EF4444' },
        { label: 'Event Loop', sub: 'Orchestrator', color: '#6366F1' },
      ],
    },
    examples: [
      { level: 'Intermediate', title: 'Classic order', code: `console.log('1')\nsetTimeout(() => console.log('2'), 0)\nPromise.resolve().then(() => console.log('3'))\nconsole.log('4')`, result: ['1', '4', '3', '2'], explain: 'Sync (1,4) → microtask (3) → macrotask (2).' },
      { level: 'Advanced', title: 'Nested microtasks', code: `console.log('A')\nsetTimeout(() => console.log('B'), 0)\nPromise.resolve().then(() => {\n  console.log('C')\n  Promise.resolve().then(() => console.log('D'))\n})\nconsole.log('E')`, result: ['A', 'E', 'C', 'D', 'B'], explain: 'Microtask ke andar bana microtask (D) bhi macrotask (B) se pehle — queue drain hone tak.' },
    ],
    memory:
      'Queues callbacks (closures) hold karti hain. Agar microtasks lagataar naye microtasks banाते rahein, to macrotasks aur rendering "starve" ho sakte (infinite microtask loop → page freeze). Browser har macrotask + microtasks ke baad render karne ka mauka leता.',
    browser:
      'Browser ka render (repaint) macrotasks ke beech hota — bhaari sync/microtask burst UI jank deता. requestAnimationFrame ek special queue hai (render se pehle). Node.js ka event loop alag phases rakhता (timers, pending, poll, check, close) + process.nextTick (microtask se bhi pehle).',
    notes: {
      concept: 'Microtasks (promises) > macrotasks (setTimeout) priority.',
      tip: 'await ke baad ka code microtask hai — setTimeout se pehle.',
      warning: 'Infinite microtask loop UI freeze kar deता (macrotasks/render starve).',
      error: 'setTimeout ke delay ko exact maan lena — minimum hai, guaranteed nahi (queue + min 4ms nesting).',
    },
    compare: {
      headers: ['Feature', 'Microtask', 'Macrotask'],
      rows: [
        ['Examples', 'Promise.then, await, queueMicrotask', 'setTimeout, setInterval, events'],
        ['Priority', 'Higher (pehle)', 'Lower (baad mein)'],
        ['Kab drain', 'Poori queue ek saath', 'Ek-ek (per loop)'],
      ],
    },
    mistakes: [
      { bad: 'Promise aur setTimeout same priority maanना.', fix: 'Promise (microtask) pehle, setTimeout (macrotask) baad.' },
      { bad: 'setTimeout(fn,0) ko "instant" samajhna.', fix: 'Minimum delay; sync + microtasks ke baad.' },
    ],
    best: ['Async ke liye promises (predictable microtask order).', 'Heavy kaam ko chunks/macrotasks mein todो (UI na freeze).', 'Output order samajhne ke liye rule yaad rakho.', 'requestAnimationFrame visual updates ke liye.'],
    interview: {
      intermediate: [
        { q: 'Event loop kya hai?', a: 'Mechanism jo call stack khaali hone par queues se callbacks uthा kar chalाता. Microtasks pehle, phir macrotasks.' },
        { q: 'Microtask vs macrotask?', a: 'Microtask (Promise.then, await) higher priority — har macrotask ke baad poori microtask queue drain hoti. Macrotask (setTimeout) ek-ek chalता.' },
      ],
      advanced: [
        { q: 'console.log(1); setTimeout(()=>log(2)); Promise.resolve().then(()=>log(3)); log(4) — output?', a: '1, 4, 3, 2. Sync (1,4) → microtask (3) → macrotask (2).' },
        { q: 'await event loop par kya asar?', a: 'await ke baad ka code microtask ban jaता — function paused, baaki sync chalता, phir microtask phase mein resume (setTimeout se pehle).' },
      ],
    },
    mcqs: [
      { q: 'Higher priority queue?', options: ['Macrotask', 'Microtask', 'Same', 'Callback'], answer: 1, explain: 'Microtask pehle.' },
      { q: 'Promise.then kis queue mein?', options: ['Macrotask', 'Microtask', 'Stack', 'Web API'], answer: 1, explain: 'Microtask queue.' },
    ],
    exercises: {
      easy: ['log + setTimeout + log ka order batao.'],
      medium: ['Promise + setTimeout mix ka output predict karो.'],
      advanced: ['Nested promises + setTimeout ka exact order trace karो.'],
    },
    summary: [
      'Event loop stack khaali hone par queue se task laता.',
      'Microtasks (promises) > macrotasks (setTimeout).',
      'Har macrotask ke baad saare microtasks drain.',
      'Order: sync → microtasks → 1 macrotask → repeat.',
    ],
    cheatsheet: [
      { h: 'Priority', code: `1. Sync code\n2. Microtasks (all)\n3. 1 Macrotask\n4. Repeat 2-3` },
    ],
    advanced:
      'Node.js event loop ke 6 phases: timers → pending callbacks → poll → check (setImmediate) → close. process.nextTick microtask se bhi pehle. setImmediate vs setTimeout(0) order context-dependent. Browser mein requestIdleCallback idle time mein kaam ke liye.',
    quiz: [
      { q: 'await ke baad code?', options: ['Sync', 'Microtask', 'Macrotask', 'Never'], answer: 1, explain: 'Microtask phase mein resume.' },
      { q: 'Macrotask per loop?', options: ['Saare', 'Ek', 'Do', 'Zero'], answer: 1, explain: 'Ek-ek karke.' },
    ],
    related: ['async-intro', 'promises', 'async-await'],
  },

  promises: {
    overview:
      '**Promise** ek object hai jo async operation ka **future result** represent karता — "abhi nahi, baad mein milेga". 3 states: **pending** (chal raha), **fulfilled** (success), **rejected** (fail). `.then` (success), `.catch` (error), `.finally`. Callback hell ka solution.',
    why:
      'fetch, API calls, async libraries sab promises return karti hain. Promise chaining, Promise.all, error handling daily code + interview ka core. async/await bhi promises par hi banta.',
    concept: [
      { h: 'Promise states', p: 'pending → fulfilled (resolve) ya rejected (reject). Ek baar settle hone par state badalती nahi (immutable).', code: `const p = new Promise((resolve, reject) => {\n  if (success) resolve(value)\n  else reject(error)\n})` },
      { h: 'then / catch / finally', p: '`.then(onSuccess)` result handle. `.catch(onError)` errors. `.finally()` dono mein chalता (cleanup).', code: `fetch(url)\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => console.error(err))\n  .finally(() => hideLoader())` },
      { h: 'Promise chaining', p: 'Har `.then` naya promise return karता — chain banती. Nesting ki jagah flat chain (callback hell solved).', code: `getUser()\n  .then(user => getPosts(user.id))\n  .then(posts => render(posts))\n  .catch(handleError)` },
      { h: 'Promise methods', p: '`Promise.all` (sab success), `Promise.race` (pehla settle), `Promise.allSettled` (sab settle, results), `Promise.any` (pehla success).', code: `Promise.all([p1, p2, p3])     // sab ka wait, ek fail→reject\nPromise.race([p1, p2])        // pehla jo settle\nPromise.allSettled([p1, p2])  // sab ke results` },
    ],
    analogy:
      'Promise ek **food delivery order** hai. Order place karte hi tumhe ek **receipt (promise)** milti — abhi khana nahi (pending). Khana aaya (fulfilled/resolve) ya cancel hua (rejected/reject). Tum receipt par "aane par khana, na aane par paisa wapas" likh dete (then/catch). 🧾',
    syntax: { code: `const p = new Promise((resolve, reject) => { })\np.then(v => {}).catch(e => {}).finally(() => {})\n\nPromise.all([...])      // sab\nPromise.race([...])     // pehla\nPromise.allSettled([...])`, note: 'Har then naya promise deता — isliye chaining possible.' },
    steps: [
      'Promise banta — executor turant chalता (resolve/reject ke saath).',
      'Pending state mein async kaam chalता.',
      'resolve(value) → fulfilled; reject(err) → rejected.',
      '.then/.catch callbacks microtask queue mein jaate.',
      'Chain mein har then ka return agle then ko milता.',
    ],
    examples: [
      { level: 'Beginner', title: 'Basic promise', code: `const wait = ms => new Promise(res => setTimeout(res, ms))\nwait(1000).then(() => console.log('1 sec done!'))`, explain: 'setTimeout ko promise mein wrap — delay utility.' },
      { level: 'Intermediate', title: 'Chaining', code: `Promise.resolve(2)\n  .then(n => n * 2)\n  .then(n => n + 1)\n  .then(n => console.log(n))`, result: '5', explain: 'Har then previous ka result transform karता (2→4→5).' },
      { level: 'Advanced', title: 'Promise.all', code: `const p1 = Promise.resolve('A')\nconst p2 = new Promise(r => setTimeout(() => r('B'), 100))\nPromise.all([p1, p2]).then(res => console.log(res))`, result: "[ 'A', 'B' ]", explain: 'Dono complete hone par ek saath results (parallel).' },
    ],
    memory:
      'Promise ek object hai (heap) jo state aur callbacks hold karता. then/catch callbacks microtasks hain. Unhandled rejected promise warning deता (memory mein reh sakta). Pending promise jis variable ne hold kiya wo aur uske callbacks zinda rehte.',
    notes: {
      concept: '3 states: pending, fulfilled, rejected. then/catch/finally.',
      tip: 'Promise.all parallel ke liye (sab ek saath). Sequential ke liye chain ya for-await.',
      warning: 'Promise.all ek fail → poora reject. Sab chahiye to allSettled.',
      error: 'then ke andar return na karna → chain ko value/promise nahi milti (undefined).',
    },
    compare: {
      headers: ['Method', 'Kab settle', 'Use'],
      rows: [
        ['Promise.all', 'Sab fulfilled (ya koi reject)', 'Sab chahiye'],
        ['Promise.race', 'Pehla jo settle (ya reject)', 'Fastest/timeout'],
        ['Promise.allSettled', 'Sab settle', 'Sab ke results chahiye'],
        ['Promise.any', 'Pehla fulfilled', 'Koi ek success kaafi'],
      ],
    },
    mistakes: [
      { bad: 'then ke andar return bhoolna.', fix: 'Value/promise return karो — chain ko milे.' },
      { bad: '.catch na lagाना.', fix: 'Errors handle karो (unhandled rejection se bacho).' },
      { bad: 'Sequential promises ko parallel chahiye jab.', fix: 'Promise.all use karो.' },
    ],
    best: ['Hamesha .catch (ya try/catch with await).', 'Parallel → Promise.all.', 'Flat chain rakho (nesting nahi).', 'finally se cleanup (loaders).'],
    interview: {
      beginner: [
        { q: 'Promise kya hai?', a: 'Ek object jo async operation ka future result represent karता. 3 states: pending, fulfilled, rejected.' },
        { q: 'then aur catch?', a: 'then success result handle karта, catch errors. finally dono mein chalता (cleanup).' },
      ],
      intermediate: [
        { q: 'Promise.all vs race?', a: 'all — saare resolve hone par results array (ek fail→reject). race — pehla jo settle (resolve/reject) wahi result.' },
        { q: 'Promise chaining kaise callback hell solve karता?', a: 'Har then naya promise return karता, to nesting ki jagah flat sequential chain banती — readable.' },
      ],
      advanced: [
        { q: 'Promise.all vs allSettled?', a: 'all ek bhi reject hone par poora reject. allSettled saare ke results deता (fulfilled/rejected status ke saath) — koi fail ho to bhi baaki milte.' },
      ],
    },
    mcqs: [
      { q: 'Promise states?', options: ['2', '3', '4', '1'], answer: 1, explain: 'pending, fulfilled, rejected.' },
      { q: 'Sab promises chahiye?', options: ['race', 'all', 'any', 'then'], answer: 1, explain: 'Promise.all.' },
    ],
    exercises: {
      easy: ['Ek promise banao jo 1 sec baad resolve ho.'],
      medium: ['3 promises ko chain karके transform karो.'],
      advanced: ['Promise.all se 3 parallel "API calls" simulate karो.'],
    },
    summary: [
      'Promise = future result (pending/fulfilled/rejected).',
      'then success, catch error, finally cleanup.',
      'Chaining se callback hell solve.',
      'Promise.all (sab), race (pehla), allSettled (saare results).',
    ],
    cheatsheet: [
      { h: 'Promise', code: `new Promise((res,rej)=>{})\n.then().catch().finally()` },
      { h: 'Combinators', code: `Promise.all([])\nPromise.race([])\nPromise.allSettled([])` },
    ],
    projects: ['API data fetcher with loader', 'Retry with promises', 'Parallel image loader (all)', 'Timeout race', 'Sequential task runner'],
    advanced:
      'Promises microtasks hain (setTimeout se pehle). Promise constructor executor synchronously chalता. Promisify callbacks ko promise mein convert karта. Avoid "promise constructor anti-pattern" (jab already promise ho). AbortController se fetch cancel hota.',
    quiz: [
      { q: 'Pehla settle wala?', options: ['all', 'race', 'allSettled', 'then'], answer: 1, explain: 'Promise.race.' },
      { q: 'Promise callbacks kis queue?', options: ['Macrotask', 'Microtask', 'Stack', 'Web API'], answer: 1, explain: 'Microtask.' },
    ],
    related: ['async-await', 'event-loop', 'error-handling'],
  },

  'async-await': {
    overview:
      '`async/await` promises ko **synchronous jaisा** likhne ka modern syntax hai. `async` function hamesha promise return karता. `await` promise ke resolve hone tak "ruk" jaता (bina thread block kiye). Errors `try/catch` se handle hote. Sabse clean async code.',
    why:
      'Modern codebases async/await use karti hain (promises ke upar). Readable, sequential-looking, easy error handling. Interview mein "promise vs async/await" aur error handling poocha jaता.',
    concept: [
      { h: 'async function', p: '`async` lagाने par function hamesha promise return karता. Return value resolve ho jaती.', code: `async function get() { return 5 }\nget().then(v => console.log(v)) // 5\n// async fn always returns Promise` },
      { h: 'await', p: '`await` promise ke settle hone tak rukता aur value deता. Sirf async function ke andar (ya top-level module).', code: `async function load() {\n  const res = await fetch(url)\n  const data = await res.json()\n  return data\n}` },
      { h: 'Error handling', p: '`try/catch` se errors pakdो — promise .catch se cleaner. finally bhi.', code: `async function load() {\n  try {\n    const data = await fetchData()\n  } catch (err) {\n    console.error(err)\n  } finally {\n    hideLoader()\n  }\n}` },
      { h: 'Parallel with await', p: 'Sequential awaits slow (ek-ek). Independent calls parallel chahiye → Promise.all + await.', code: `// Slow (sequential)\nconst a = await getA()\nconst b = await getB()\n// Fast (parallel)\nconst [a, b] = await Promise.all([getA(), getB()])` },
    ],
    analogy:
      'await ek **"main yahीn rukता hoon jab tak yeh kaam na ho"** jaisा hai — par smart tarike se (baaki app block nahi hoti). async/await async code ko **kahani ki tarah seedha** padhने layak banाता — promises ki chain se zyada natural. 📖',
    syntax: { code: `async function name() {\n  try {\n    const result = await somePromise()\n  } catch (err) { }\n}\n\n// Parallel\nconst [a, b] = await Promise.all([p1, p2])`, note: 'await sirf async function (ya module top-level) mein.' },
    steps: [
      'async function call hone par execution shuru.',
      'await par function "pause" — promise pending tak.',
      'Baaki sync code chalता rehता (non-blocking).',
      'Promise resolve → microtask mein function resume, value milti.',
      'reject → catch block (ya promise rejection).',
    ],
    examples: [
      { level: 'Beginner', title: 'Basic async/await', code: `const wait = ms => new Promise(r => setTimeout(r, ms))\nasync function run() {\n  console.log('Start')\n  await wait(1000)\n  console.log('After 1s')\n}\nrun()`, result: ['Start', 'After 1s'], explain: 'await ke baad ka code 1s baad — par thread block nahi.' },
      { level: 'Intermediate', title: 'try/catch', code: `async function getData() {\n  try {\n    const res = await fetch('/api')\n    return await res.json()\n  } catch (e) {\n    console.error('Failed:', e.message)\n    return null\n  }\n}`, explain: 'Errors try/catch se — sync code jaisा clean.' },
      { level: 'Advanced', title: 'Sequential vs parallel', code: `async function slow() {\n  const a = await wait(1000)\n  const b = await wait(1000) // 2s total\n}\nasync function fast() {\n  const [a, b] = await Promise.all([wait(1000), wait(1000)]) // 1s\n}`, explain: 'Independent tasks Promise.all se parallel — aadha time.' },
    ],
    memory:
      'async function ek state machine mein convert hota — await par state save hoti, resume par restore. await ke baad ka code microtask hai. Function pause hone par uska execution context suspend hota (memory mein rehता) jab tak resume na ho.',
    notes: {
      concept: 'async = promise return. await = resolve tak ruko.',
      tip: 'Independent awaits ko Promise.all se parallel karो (fast).',
      warning: 'Sequential awaits slow ho sakte (ek-ek wait). Zaroorat ho tabhi.',
      error: 'await ko non-async function mein use karna → SyntaxError. Top-level await sirf modules mein.',
    },
    compare: {
      headers: ['Feature', 'Promises (.then)', 'async/await'],
      rows: [
        ['Readability', 'Chaining', 'Sync jaisा (clean)'],
        ['Error handling', '.catch', 'try/catch'],
        ['Debugging', 'Thoda mushkil', 'Aasaan (step through)'],
        ['Based on', 'Promises', 'Promises (syntax sugar)'],
      ],
    },
    mistakes: [
      { bad: 'Independent calls sequential await.', fix: 'Promise.all se parallel.' },
      { bad: 'await bina try/catch (unhandled).', fix: 'try/catch ya .catch lagाओ.' },
      { bad: 'forEach ke andar await (kaam nahi karता properly).', fix: 'for...of ya Promise.all + map.' },
    ],
    best: ['try/catch se errors handle.', 'Parallel ke liye Promise.all.', 'Loop mein for...of + await (ya Promise.all).', 'async functions chhote rakho.'],
    interview: {
      beginner: [
        { q: 'async/await kya hai?', a: 'Promises ko sync-jaisा likhne ka syntax. async function promise return karता, await uske resolve hone tak rukता (non-blocking).' },
      ],
      intermediate: [
        { q: 'async function kya return karता?', a: 'Hamesha ek promise — chahe aap plain value return karein, wo resolve ho jaती.' },
        { q: 'await error kaise handle?', a: 'try/catch se. await reject ho to catch block chalता. .catch bhi laga sakte ho promise par.' },
      ],
      advanced: [
        { q: 'Sequential vs parallel await?', a: 'Alag-alag await ek-ek wait karte (slow). Independent tasks ke liye Promise.all + await use karो (parallel, fast).' },
        { q: 'await internally kya?', a: 'Function ko pause karता, promise ko microtask queue se observe karता, resolve par resume. Yeh syntactic sugar over promises hai.' },
      ],
    },
    mcqs: [
      { q: 'async function return?', options: ['Value', 'Promise', 'undefined', 'Error'], answer: 1, explain: 'Hamesha promise.' },
      { q: 'await kahan use?', options: ['Kahin bhi', 'async function mein', 'Loops only', 'Global only'], answer: 1, explain: 'async fn (ya module top-level).' },
    ],
    exercises: {
      easy: ['Ek async function likho jo await se 1s baad value de.'],
      medium: ['try/catch ke saath ek fetch wrapper likho.'],
      advanced: ['Sequential awaits ko Promise.all se parallel mein convert karो.'],
    },
    summary: [
      'async/await = promises ka clean syntax.',
      'async fn promise return karता; await resolve tak rukता.',
      'Errors try/catch se.',
      'Independent calls → Promise.all (parallel).',
    ],
    cheatsheet: [
      { h: 'async/await', code: `async function f(){\n  try{ const x=await p() }\n  catch(e){}\n}` },
      { h: 'Parallel', code: `await Promise.all([p1,p2])` },
    ],
    projects: ['Async API client', 'Sequential workflow', 'Retry with backoff', 'Parallel data dashboard', 'Loading states'],
    advanced:
      'Top-level await (ES modules) module ko async banाता. Async iterators + for-await-of streams ke liye. async generators (async function*) lazy async sequences. await har Promise-like (thenable) par chalता. Error stack traces async/await mein better hote.',
    quiz: [
      { q: 'await ke baad code?', options: ['Sync', 'Microtask', 'Macrotask', 'Never'], answer: 1, explain: 'Microtask mein resume.' },
      { q: 'Parallel ke liye?', options: ['Sequential await', 'Promise.all + await', 'forEach', 'setTimeout'], answer: 1, explain: 'Promise.all.' },
    ],
    related: ['promises', 'event-loop', 'error-handling'],
  },

  'error-handling': {
    overview:
      'Errors program crash kar sakte hain — proper handling se app gracefully recover karता. **try/catch** errors pakadता, **finally** hamesha chalता (cleanup), **throw** custom error fenkता. **Custom Error** classes specific errors banाने ke liye. Async errors try/catch (await) ya .catch se.',
    why:
      'Real apps mein cheezein fail hoti (network, invalid input). Bina handling ke poora app crash. Robust error handling senior-level code ki pehchaan + interview topic.',
    concept: [
      { h: 'try / catch / finally', p: '`try` mein risky code, `catch(err)` error pakadता, `finally` dono case mein chalता (cleanup).', code: `try {\n  riskyOperation()\n} catch (err) {\n  console.error(err.message)\n} finally {\n  cleanup()\n}` },
      { h: 'throw', p: '`throw` se khud error fenkो (kuch bhi — par Error object best). Execution ruk kar nearest catch par jaता.', code: `function divide(a, b) {\n  if (b === 0) throw new Error('Divide by zero!')\n  return a / b\n}` },
      { h: 'Error object', p: '`Error` mein `name`, `message`, `stack`. Specific types: TypeError, ReferenceError, SyntaxError, RangeError.', code: `const e = new Error('Oops')\ne.name    // 'Error'\ne.message // 'Oops'\ne.stack   // trace` },
      { h: 'Custom Errors', p: 'Error ko extend karke apne error types — better categorization aur handling.', code: `class ValidationError extends Error {\n  constructor(msg) {\n    super(msg)\n    this.name = 'ValidationError'\n  }\n}\nthrow new ValidationError('Invalid email')` },
    ],
    analogy:
      'try/catch ek **safety net** hai trapeze artist ke neeche — kuch galat ho (error) to net (catch) pakad leta, show crash nahi hota. finally ek **cleanup crew** — chahe artist gire ya na gire, stage saaf karne aati. throw = "main ruk raha hoon, koi sambhaalो". 🎪',
    syntax: { code: `try {\n  // risky\n} catch (err) {\n  // handle\n} finally {\n  // always\n}\n\nthrow new Error('message')\nclass MyError extends Error {}`, note: 'Async/await mein bhi yahi try/catch chalता.' },
    steps: [
      'try block ka code chalता.',
      'Error aaye (ya throw ho) → execution turant ruk jaता.',
      'Control nearest catch(err) par jaता, err object milta.',
      'catch error handle karता (log, recover, rethrow).',
      'finally har case mein chalता (cleanup).',
    ],
    examples: [
      { level: 'Beginner', title: 'Basic try/catch', code: `try {\n  const data = JSON.parse('invalid json')\n} catch (err) {\n  console.log('Parse failed:', err.name)\n}`, result: 'Parse failed: SyntaxError', explain: 'Invalid JSON → SyntaxError, catch ne handle kiya.' },
      { level: 'Intermediate', title: 'throw + custom', code: `class AgeError extends Error {\n  constructor(m) { super(m); this.name = 'AgeError' }\n}\nfunction check(age) {\n  if (age < 18) throw new AgeError('Too young')\n  return 'OK'\n}\ntry { check(15) } catch (e) { console.log(e.name, e.message) }`, result: 'AgeError Too young', explain: 'Custom error specific handling deता.' },
      { level: 'Advanced', title: 'Async error', code: `async function getUser(id) {\n  try {\n    const res = await fetch('/user/' + id)\n    if (!res.ok) throw new Error('HTTP ' + res.status)\n    return await res.json()\n  } catch (err) {\n    console.error('Fetch failed:', err.message)\n    return null\n  }\n}`, explain: 'await + try/catch se async errors clean.' },
    ],
    memory:
      'Error object stack trace hold karता (call chain). throw current execution context unwind karता jab tak catch na mile. Uncaught error event loop tak pahunch kar program (Node) crash kar sakta ya browser console mein error. Error objects normal objects hain (garbage collected).',
    browser:
      'Uncaught errors `window.onerror` / `addEventListener("error")` se pakad sakte. Unhandled promise rejections `unhandledrejection` event se. Production mein error tracking (Sentry) yahi hooks use karta. React mein Error Boundaries component errors pakadte.',
    notes: {
      concept: 'try risky, catch handle, finally always, throw raise.',
      tip: 'Error object throw karो (string nahi) — stack trace milta.',
      warning: 'Async (await) errors try/catch se; raw promises .catch se.',
      error: 'catch ko swallow karna (khali catch) — silent failures. Log/handle karो.',
    },
    compare: {
      headers: ['Keyword', 'Kaam'],
      rows: [
        ['try', 'Risky code wrap'],
        ['catch', 'Error pakdо + handle'],
        ['finally', 'Hamesha chalता (cleanup)'],
        ['throw', 'Error raise karो'],
      ],
    },
    mistakes: [
      { bad: 'String throw karna (throw "error").', fix: 'throw new Error("...") — stack trace milta.' },
      { bad: 'Empty catch (silent swallow).', fix: 'Log karो ya meaningfully handle.' },
    ],
    best: ['Error objects throw karो.', 'Specific custom errors banाओ.', 'Async → try/catch with await.', 'finally se cleanup; production mein error tracking.'],
    interview: {
      beginner: [
        { q: 'try/catch kya karта?', a: 'try mein risky code; error aaye to catch use pakad kar handle karता, crash rokता. finally hamesha chalता.' },
        { q: 'throw kya karता?', a: 'Manually error raise karता — execution rok kar nearest catch par jaता.' },
      ],
      intermediate: [
        { q: 'Custom error kaise?', a: 'Error class ko extend karके: class MyError extends Error { constructor(m){ super(m); this.name="MyError" } }. Specific handling ke liye.' },
        { q: 'Async errors kaise handle?', a: 'async/await mein try/catch. Raw promises mein .catch(). Unhandled rejections ke liye global handler.' },
      ],
      advanced: [
        { q: 'finally aur return ka interaction?', a: 'finally hamesha chalता — try/catch ke return ke baad bhi. Agar finally khud return kare to wo override kar deta (avoid).' },
      ],
    },
    mcqs: [
      { q: 'Hamesha chalता?', options: ['try', 'catch', 'finally', 'throw'], answer: 2, explain: 'finally always.' },
      { q: 'Best throw?', options: ['String', 'Number', 'new Error()', 'null'], answer: 2, explain: 'Error object (stack trace).' },
    ],
    exercises: {
      easy: ['try/catch se JSON.parse error handle karो.'],
      medium: ['Ek function likho jo invalid input par custom error throw kare.'],
      advanced: ['Async fetch wrapper with retry + try/catch banao.'],
    },
    summary: [
      'try/catch errors pakadता, finally hamesha chalता.',
      'throw se manual error raise.',
      'Error object throw karो (stack trace).',
      'Custom errors = Error extend; async = try/catch with await.',
    ],
    cheatsheet: [
      { h: 'Error handling', code: `try{}catch(e){}finally{}\nthrow new Error('msg')\nclass E extends Error{}` },
    ],
    advanced:
      'Error.cause (chained errors), AggregateError (Promise.any). Result/Either patterns (functional error handling) errors ko values ki tarah treat karte. Global handlers (window.onerror, unhandledrejection) production monitoring ke liye. React Error Boundaries UI errors contain karte.',
    quiz: [
      { q: 'catch ka argument?', options: ['Value', 'Error object', 'Boolean', 'Promise'], answer: 1, explain: 'Error object.' },
      { q: 'Custom error base?', options: ['Object', 'Error', 'Array', 'Function'], answer: 1, explain: 'Error ko extend karो.' },
    ],
    related: ['async-await', 'promises', 'oop-principles'],
  },
}
