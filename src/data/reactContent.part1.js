// React content — Part 1: Fundamentals + JSX

export const reactContentA = {
  'what-is-react': {
    overview:
      'React ek **JavaScript library** hai UI (user interfaces) banाने ke liye, jise **Facebook (Meta)** ne 2013 mein banaya. Iska core idea: UI ko chhote **components** mein todो, aur jab data badle to React **automatically** sirf zaroori part update kare. "Library" hai (full framework nahi) — sirf view layer sambhaalti hai.',
    why:
      'React aaj sabse popular frontend library hai — lakhों jobs iski demand karti hain. Components, declarative UI, aur Virtual DOM modern frontend ki neev hain. Interview ka 80% React fundamentals + hooks par hota hai.',
    concept: [
      { h: 'React kya karti hai?', p: 'Aap UI ko **components** (reusable pieces) mein likhte ho. State (data) badalने par React decide karता kya re-render karna hai — aapko manually DOM update nahi karna padता.' },
      { h: 'Kyun banaya gaya?', p: 'Facebook ke bade apps mein DOM manually update karna buggy aur slow tha (jaise notification count alag-alag jagah sync karna). React ne **declarative + component-based** approach se ise solve kiya.' },
      { h: 'Library vs Framework', p: 'React sirf **view (UI)** dekhती hai — routing, data fetching ke liye alag libraries (React Router, React Query). Angular pura framework hai; React flexible library.', code: `import { createRoot } from 'react-dom/client'\nfunction App() {\n  return <h1>Hello React ⚛️</h1>\n}\ncreateRoot(document.getElementById('root')).render(<App />)` },
      { h: 'Key features', p: 'Component-based, declarative, Virtual DOM, unidirectional data flow (one-way), JSX, rich ecosystem, aur huge community.' },
    ],
    analogy:
      'Socho UI ek **LEGO building** hai. React tumhe chhote LEGO blocks (components) deता hai — button, card, navbar. Ek baar block bana lo, baar-baar use karo. Aur agar kisi block ka data badle, React sirf usi block ko badalता, poori building nahi todता. 🧱',
    syntax: { code: `// Ek simple component\nfunction Welcome({ name }) {\n  return <h1>Hello, {name}!</h1>\n}\n\n// Use\n<Welcome name="Devendra" />`, note: 'Component ek function hai jo JSX (UI) return karता hai. Naam Capital letter se shuru.' },
    steps: [
      'App ko components mein todो (UI = components ka tree).',
      'Har component apni state/props se UI describe karता (JSX return).',
      'State badalने par React component dubara chalाता (re-render).',
      'React naya UI ko purane se compare karता (Virtual DOM diff).',
      'Sirf changed parts real DOM mein update — fast.',
    ],
    internals:
      'React ek "Virtual DOM" (JS objects ka tree) maintain karता. State change par naya virtual tree banता, purane se diff hota (reconciliation), aur minimal DOM operations real DOM par apply hote. React 18 se Fiber architecture + concurrent rendering use hota.',
    notes: {
      concept: 'React = component-based, declarative UI library (view layer).',
      tip: 'Component naam hamesha Capital letter se (warna React HTML tag samjhega).',
      warning: 'React framework nahi, library hai — routing/data ke liye extra tools.',
    },
    compare: {
      headers: ['Feature', 'React', 'Vanilla JS', 'Angular'],
      rows: [
        ['Type', 'Library (view)', 'Language', 'Full framework'],
        ['DOM', 'Virtual DOM', 'Manual', 'Real (with zones)'],
        ['UI style', 'Declarative', 'Imperative', 'Declarative'],
        ['Learning curve', 'Medium', 'Low', 'High'],
      ],
    },
    mistakes: [
      { bad: 'Component naam small letter se (function welcome).', fix: 'Capital se: function Welcome.' },
      { bad: 'React ko full framework samajhna.', fix: 'Sirf view layer — routing/data alag.' },
    ],
    best: ['UI ko chhote reusable components mein todो.', 'Component naam PascalCase.', 'State minimum rakho.', 'Logic ko custom hooks mein nikaalो.'],
    performance:
      'React Virtual DOM se unnecessary real-DOM operations bachाती (DOM updates mehnge hote). Phir bhi galत code se extra re-renders hote — memoization (React.memo, useMemo) aur sahi keys se optimize karna padता.',
    interview: {
      beginner: [
        { q: 'React kya hai?', a: 'UI banाने ki JavaScript library (Meta dwara). Component-based, declarative, Virtual DOM use karti hai.' },
        { q: 'React library hai ya framework?', a: 'Library — sirf view layer. Routing (React Router), data (React Query) jaisी cheezein alag libraries se aati.' },
      ],
      intermediate: [
        { q: 'React kyun banaya gaya?', a: 'Bade apps mein manual DOM updates buggy/slow the. React ne declarative + component-based + Virtual DOM se efficient, predictable UI diya.' },
      ],
      advanced: [
        { q: 'React internally UI kaise update karता?', a: 'Naya Virtual DOM tree banाता, purane se diff (reconciliation) karता, minimal changes real DOM par apply karता. React 18+ Fiber + concurrent rendering use karता.' },
      ],
    },
    mcqs: [
      { q: 'React kis ne banaya?', options: ['Google', 'Meta (Facebook)', 'Microsoft', 'Amazon'], answer: 1, explain: 'Facebook/Meta, 2013.' },
      { q: 'React kya hai?', options: ['Framework', 'Library', 'Language', 'Database'], answer: 1, explain: 'View-layer library.' },
    ],
    exercises: {
      easy: ['Ek Welcome component banao jo "Hello" dikhaye.'],
      medium: ['Props se naam leकर greet karne wala component banao.'],
      advanced: ['App ko 3 reusable components (Header, Card, Footer) mein todो.'],
    },
    summary: [
      'React = UI library (Meta), component-based + declarative.',
      'Virtual DOM se efficient updates.',
      'Library hai — view layer; routing/data alag.',
      'Components reusable, state-driven.',
    ],
    cheatsheet: [
      { h: 'Component', code: `function App(){\n  return <h1>Hi</h1>\n}` },
      { h: 'Render', code: `createRoot(el).render(<App/>)` },
    ],
    projects: ['Counter', 'Todo app', 'Profile card', 'Weather widget', 'Dashboard'],
    advanced:
      'React 18+ concurrent features (useTransition, Suspense, automatic batching) UI ko interruptible banाते. React Server Components (RSC) server par render hote — zero client JS. React ka "learn once, write anywhere" — React Native se mobile bhi.',
    quiz: [
      { q: 'React ka core unit?', options: ['Function', 'Component', 'Module', 'Class only'], answer: 1, explain: 'Components.' },
      { q: 'React UI style?', options: ['Imperative', 'Declarative', 'Procedural', 'Manual'], answer: 1, explain: 'Declarative.' },
    ],
    related: ['virtual-dom', 'jsx', 'components-basics'],
  },

  'spa-vs-mpa': {
    overview:
      '**SPA (Single Page Application)** ek hi HTML page load karता hai aur JS se content dynamically badalता — page reload nahi hota (React, Gmail). **MPA (Multi Page Application)** har navigation par naya page server se load karता (traditional websites). React SPAs banाती hai. **Declarative programming** = "kya chahiye" batao, "kaise" nahi.',
    why:
      'SPA vs MPA architecture choice performance + UX + SEO affect karता. Declarative thinking React ka core mindset hai — interview mein "imperative vs declarative" poocha jaता.',
    concept: [
      { h: 'SPA', p: 'Ek baar app load hota, phir navigation/data JS se handle (no full reload). Fast, app-jaisा feel. React Router se "pages" simulate hote.', code: `// SPA: route change → component swap, no reload\n<Route path="/about" element={<About />} />` },
      { h: 'MPA', p: 'Har page alag HTML, har navigation par server request + full reload. SEO friendly, par slower navigation.' },
      { h: 'Declarative vs Imperative', p: '**Imperative** (vanilla JS): step-by-step "kaise" — DOM banao, append karo. **Declarative** (React): "kya chahiye" describe karo, React kaise karega wo handle.', code: `// Imperative\nconst el = document.createElement('h1')\nel.textContent = count\ndoc.body.appendChild(el)\n// Declarative (React)\nreturn <h1>{count}</h1>` },
    ],
    analogy:
      'SPA ek **restaurant** hai jahan ek baar baith gaye, waiter sab laता rehता (no naye table). MPA ek **food court** — har dish ke liye alag stall (naya page). Declarative = "mujhe pizza chahiye" (result batao); Imperative = "atta gundо, sauce lagाओ, bake karo" (har step). 🍕',
    syntax: { code: `// SPA navigation (React Router)\nimport { Link } from 'react-router-dom'\n<Link to="/about">About</Link>  // no reload`, note: 'SPA mein <a> ki jagah <Link> (no full reload).' },
    steps: [
      'SPA: browser ek baar HTML + JS bundle load karता.',
      'React app mount hoti, route render hota.',
      'User navigate kare → React Router component swap karता (no server request).',
      'Data chahiye to API call (fetch) — sirf data, poora page nahi.',
      'URL update hota (history API) bina reload.',
    ],
    notes: {
      concept: 'SPA = ek page, JS-driven. MPA = naye pages. React declarative.',
      tip: 'SPA mein SEO ke liye SSR/SSG (Next.js) use karो.',
      warning: 'SPA ka initial bundle bada ho sakta — code splitting use karो.',
    },
    compare: {
      headers: ['Feature', 'SPA', 'MPA'],
      rows: [
        ['Page load', 'Ek baar', 'Har navigation'],
        ['Speed (nav)', 'Fast (no reload)', 'Slower'],
        ['SEO', 'Tough (needs SSR)', 'Easy'],
        ['Initial load', 'Heavier bundle', 'Lighter per page'],
        ['Example', 'Gmail, React apps', 'Wikipedia, blogs'],
      ],
    },
    mistakes: [
      { bad: 'SPA mein <a href> se internal navigation.', fix: '<Link> use karो (warna full reload).' },
      { bad: 'SPA SEO ignore karna.', fix: 'SSR/SSG (Next.js) use karो.' },
    ],
    best: ['SPA mein <Link> for navigation.', 'Code splitting (lazy) initial bundle ke liye.', 'SEO chahiye to SSR/SSG.', 'Declarative thinking adopt karो.'],
    performance:
      'SPA ka first load heavy (bundle + hydration). Code splitting + lazy loading se improve. MPA har page chhota par har navigation network round-trip. Modern: SSR + hydration best of both.',
    interview: {
      beginner: [
        { q: 'SPA kya hai?', a: 'Single Page Application — ek HTML page, JS se content badalता, no full reload. React SPAs banaता.' },
        { q: 'Declarative vs imperative?', a: 'Imperative "kaise" step-by-step (DOM manually). Declarative "kya chahiye" (React khud kaise handle karta).' },
      ],
      intermediate: [
        { q: 'SPA ke pros/cons?', a: 'Pros: fast navigation, app-like UX. Cons: bada initial bundle, SEO mushkil (SSR/SSG se solve).' },
      ],
      advanced: [
        { q: 'SPA SEO problem aur solution?', a: 'SPA initially empty HTML deता (JS se fill) — crawlers ko content nahi milta. Solution: SSR (server par render) ya SSG (build par pre-render) — Next.js.' },
      ],
    },
    mcqs: [
      { q: 'React banaata?', options: ['MPA', 'SPA', 'Both', 'Neither'], answer: 1, explain: 'SPAs (Next.js se SSR bhi).' },
      { q: 'Declarative?', options: ['How steps', 'What result', 'Manual DOM', 'Loops'], answer: 1, explain: 'What you want.' },
    ],
    exercises: {
      easy: ['SPA aur MPA ke 2-2 examples likho.'],
      medium: ['Ek imperative DOM code ko declarative React mein convert karो.'],
      advanced: ['Explain karो SPA mein SEO kaise improve karenge.'],
    },
    summary: [
      'SPA: ek page, JS-driven, fast nav (React).',
      'MPA: naye pages, SEO-easy, slower nav.',
      'Declarative = kya chahiye (React); imperative = kaise.',
      'SPA SEO ke liye SSR/SSG.',
    ],
    cheatsheet: [
      { h: 'SPA nav', code: `<Link to="/x">X</Link>\nuseNavigate()` },
    ],
    projects: ['Multi-route SPA', 'Dashboard with tabs', 'Portfolio SPA'],
    advanced:
      'Hybrid rendering: SSR (per request), SSG (build time), ISR (incremental). Next.js/Remix SPA + server rendering combine karte. RSC (Server Components) next evolution — server par render, client JS kam.',
    quiz: [
      { q: 'SPA navigation?', options: ['Full reload', 'Component swap', 'New tab', 'Server render'], answer: 1, explain: 'JS component swap.' },
      { q: 'SEO best?', options: ['SPA', 'MPA/SSR', 'Neither', 'Both same'], answer: 1, explain: 'MPA/SSR SEO-friendly.' },
    ],
    related: ['what-is-react', 'react-router', 'server-components'],
  },

  'virtual-dom': {
    overview:
      '**Virtual DOM (VDOM)** real DOM ka ek **lightweight JavaScript copy** hai (plain objects ka tree). State badalने par React naya VDOM banаता, purane se **compare (diff)** karता, aur sirf **changed parts** real DOM mein update karता. Direct DOM manipulation mehngा hai — VDOM ise minimize karता.',
    why:
      'VDOM React ki performance ka core hai. "Real DOM vs Virtual DOM" aur "VDOM kaise fast banाता" interview ka guaranteed question hai. Re-rendering samajhne ki neev.',
    concept: [
      { h: 'Real DOM problem', p: 'DOM update mehngा hai — har change layout/reflow/repaint trigger kar sakta. Manually + frequently update karna slow + buggy.' },
      { h: 'Virtual DOM kya hai', p: 'UI ka JS object representation. Halka, memory mein, manipulate karna sasta. React isi par kaam karता phir real DOM ko batch-update karता.', code: `// VDOM ek aisa object (simplified)\n{ type: 'h1', props: { children: 'Hello' } }` },
      { h: 'Diffing & reconciliation', p: 'State change → naya VDOM. React naye aur purane VDOM ko compare (diff) karता, minimum changes nikalता, real DOM par apply (reconciliation).' },
      { h: 'VDOM fast kyun', p: 'JS objects compare karna sasta; real DOM operations mehnge. React batch karता aur sirf zaroori DOM nodes touch karता.' },
    ],
    analogy:
      'Socho aap ek **building ka blueprint** (VDOM) edit karte ho, actual building (real DOM) nahi. Blueprint par changes mark karo, phir contractor (React) sirf wahi deewarein todता/banाता jo blueprint mein badli — poori building nahi. Sasta + fast. 📐',
    syntax: { code: `// React.createElement (JSX iska sugar)\nReact.createElement('h1', { className: 'title' }, 'Hello')\n// → VDOM object\n// JSX: <h1 className="title">Hello</h1>`, note: 'JSX internally React.createElement banaता jo VDOM object deता.' },
    steps: [
      'Component render hota → VDOM tree banता.',
      'State/props change → naya VDOM tree banता.',
      'React diffing: naya vs purana VDOM compare.',
      'Minimal changes (patches) calculate.',
      'Sirf wo changes real DOM par apply (commit).',
    ],
    visual: {
      type: 'boxes',
      items: [
        { label: 'State change', sub: 'setState', color: '#06B6D4' },
        { label: 'New VDOM', sub: 'JS tree', color: '#6366F1' },
        { label: 'Diff', sub: 'old vs new', color: '#F59E0B' },
        { label: 'Real DOM', sub: 'minimal update', color: '#22C55E' },
      ],
    },
    examples: [
      { level: 'Intermediate', title: 'JSX → createElement', code: `// Aap likhte ho:\nconst el = <h1 className="t">Hi</h1>\n// Babel convert karta:\nconst el = React.createElement('h1', { className: 't' }, 'Hi')\n// Result: VDOM object`, explain: 'JSX sirf createElement ka shortcut — VDOM object banta.' },
    ],
    memory:
      'VDOM JS objects heap mein rehte (real DOM nodes se halke). Har render naya VDOM tree banता (purana GC ho jaता diff ke baad). React do trees rakhता: current (screen par) aur work-in-progress (naya) — diff ke baad swap.',
    browser:
      'Real DOM changes layout (reflow) aur paint trigger karte — mehnge. React batch karके ek baar mein DOM update karता (multiple state changes → ek DOM update), reflows minimize.',
    notes: {
      concept: 'VDOM = real DOM ka JS copy; diff se minimal updates.',
      tip: 'VDOM "magic" nahi — bas smart diffing. Phir bhi extra re-renders ho sakte.',
      warning: 'VDOM hamesha fast nahi — galat code (no keys, no memo) se redundant work.',
      error: 'VDOM ko "always faster than DOM" maan lena — overhead bhi hai.',
    },
    compare: {
      headers: ['Feature', 'Real DOM', 'Virtual DOM'],
      rows: [
        ['Kya hai', 'Browser ka actual tree', 'JS object copy'],
        ['Update cost', 'Mehngा (reflow/paint)', 'Sasta (JS)'],
        ['Direct manipulation', 'Slow if frequent', 'Fast (then batch)'],
        ['Used by', 'Vanilla JS', 'React'],
      ],
    },
    mistakes: [
      { bad: 'VDOM ko hamesha real DOM se fast maanना.', fix: 'Diffing ka overhead hai — sirf redundant DOM work bachाता.' },
      { bad: 'Keys na dena lists mein.', fix: 'Keys se diffing efficient hoti.' },
    ],
    best: ['Lists mein stable keys do.', 'Unnecessary re-renders avoid (memo).', 'State minimal rakho.', 'Bade trees mein virtualization.'],
    performance:
      'VDOM diffing O(n) hai (heuristics se). Galat keys ya bade re-renders se diff cost badhती. React.memo, useMemo, sahi keys, aur component splitting se VDOM work kam hota.',
    interview: {
      beginner: [
        { q: 'Virtual DOM kya hai?', a: 'Real DOM ka lightweight JS copy. React isme changes karता, diff karता, phir minimal updates real DOM par apply karता.' },
        { q: 'Real DOM vs Virtual DOM?', a: 'Real DOM browser ka actual tree (update mehnga). VDOM JS object copy (sasta) — React diff karके real DOM minimally update karता.' },
      ],
      intermediate: [
        { q: 'VDOM fast kyun?', a: 'JS objects compare karna sasta; React batch karता aur sirf changed real-DOM nodes touch karता — reflows/paints minimize.' },
      ],
      advanced: [
        { q: 'VDOM diffing algorithm?', a: 'O(n) heuristics: same type → update props, different type → replace subtree, lists → keys se match. Fiber se yeh interruptible hua.' },
      ],
    },
    mcqs: [
      { q: 'VDOM kya hai?', options: ['Real DOM', 'JS copy of DOM', 'CSS', 'Browser API'], answer: 1, explain: 'Lightweight JS tree.' },
      { q: 'Diffing complexity?', options: ['O(n^3)', 'O(n)', 'O(1)', 'O(log n)'], answer: 1, explain: 'O(n) heuristics.' },
    ],
    exercises: {
      easy: ['Real DOM aur VDOM ka fark likho.'],
      medium: ['JSX ko React.createElement form mein convert karो.'],
      advanced: ['Samjhao keys diffing ko kaise efficient banाती.'],
    },
    summary: [
      'VDOM = real DOM ka JS copy.',
      'State change → naya VDOM → diff → minimal real DOM update.',
      'JS diffing sasta, DOM ops mehnge.',
      'Keys + memo se VDOM work kam.',
    ],
    cheatsheet: [
      { h: 'VDOM flow', code: `setState → new VDOM\n→ diff(old,new)\n→ patch real DOM` },
    ],
    projects: ['Live counter (observe minimal updates)', 'Dynamic list', 'Form with live preview'],
    advanced:
      'Fiber (React 16+) ne diffing ko interruptible banaya — bade trees ko chunks mein process. "Double buffering" (current + WIP tree). Some frameworks (Svelte) VDOM skip karke compile-time updates karte — different tradeoff.',
    quiz: [
      { q: 'React do trees?', options: ['current + WIP', 'left + right', 'DOM + CSS', 'old + cache'], answer: 0, explain: 'current aur work-in-progress.' },
      { q: 'DOM update mehnga kyun?', options: ['JS slow', 'Reflow/paint', 'Network', 'Memory'], answer: 1, explain: 'Layout/paint trigger.' },
    ],
    related: ['rendering-process', 'reconciliation', 'fiber'],
  },

  'rendering-process': {
    overview:
      'React ka rendering 2 phases mein hota: **Render Phase** (component chalाकर VDOM banाना + diffing — pure, interruptible) aur **Commit Phase** (real DOM update + effects run — synchronous). React ka overall workflow: trigger → render → reconcile → commit → browser paint.',
    why:
      'Rendering process samajhna re-renders, performance, aur useEffect timing ke liye zaroori. "Render vs commit phase" interview mein aata; bugs (extra renders) yahin se.',
    concept: [
      { h: 'Trigger (kab render hota)', p: 'Render trigger hota: (1) initial mount, (2) state change (setState), (3) parent re-render, (4) context change.' },
      { h: 'Render Phase', p: 'React component function chalाता, JSX → VDOM. Naye VDOM ko purane se diff karता. **Pure** hona chahiye (no side-effects) — React ise interrupt/restart kar sakta.', code: `function App() {\n  console.log('render phase') // side-effect mat daalo yahan\n  return <h1>Hi</h1>\n}` },
      { h: 'Commit Phase', p: 'React calculated changes real DOM par apply karता (synchronous). Iske baad refs set hote, useLayoutEffect, phir useEffect.' },
      { h: 'Browser paint', p: 'Commit ke baad browser screen paint karता. useEffect paint ke baad (async), useLayoutEffect paint se pehle.' },
    ],
    analogy:
      'React ek **architect + builder** hai. Render phase = architect blueprint banाता aur purane se compare karता (kaagaz par, mita sakta — interruptible). Commit phase = builder actually deewar banाता (real, ek baar mein). Phir browser ghar ko "paint" karता. 🏗️',
    syntax: { code: `// Render phase: pure calculation\nfunction Comp() {\n  return <div>{value}</div>\n}\n// Commit phase: DOM + effects\nuseEffect(() => { /* after commit + paint */ })\nuseLayoutEffect(() => { /* after commit, before paint */ })`, note: 'Render phase pure rakho; side-effects effects mein.' },
    steps: [
      'Trigger: mount / setState / parent render / context change.',
      'Render phase: components chalте, VDOM banта, diff hota (interruptible).',
      'Reconciliation: kya badalना hai decide.',
      'Commit phase: real DOM update (sync), refs set.',
      'useLayoutEffect → browser paint → useEffect.',
    ],
    visual: {
      type: 'timeline',
      items: [
        { year: '1', text: 'Trigger (setState / mount / parent)' },
        { year: '2', text: 'Render phase: VDOM + diff (interruptible)' },
        { year: '3', text: 'Commit phase: real DOM update (sync)' },
        { year: '4', text: 'useLayoutEffect → paint → useEffect' },
      ],
    },
    notes: {
      concept: 'Render phase = calculate (pure). Commit phase = DOM update (sync).',
      tip: 'Render phase mein side-effects mat daalो — effects use karो.',
      warning: 'Render interruptible (concurrent) — isliye render multiple baar chal sakta bina commit.',
      error: 'Render phase mein setState ya API call (infinite loop / impure).',
    },
    compare: {
      headers: ['Phase', 'Kaam', 'Nature'],
      rows: [
        ['Render', 'VDOM + diff', 'Pure, interruptible'],
        ['Commit', 'Real DOM update', 'Synchronous'],
        ['useLayoutEffect', 'DOM measure/sync', 'Before paint'],
        ['useEffect', 'Side-effects', 'After paint'],
      ],
    },
    mistakes: [
      { bad: 'Render phase mein side-effects (API, setState).', fix: 'useEffect mein daalो.' },
      { bad: 'Render ko hamesha "ek baar" maanना.', fix: 'Concurrent mein multiple baar chal sakta.' },
    ],
    best: ['Render functions pure rakho.', 'Side-effects useEffect mein.', 'Heavy calc useMemo se.', 'Layout reads useLayoutEffect mein.'],
    performance:
      'Render phase frequent ho sakta — heavy work memoize karो. Commit phase synchronous hai — bhaari DOM/layout reads jank deते. Concurrent rendering render ko prioritize/interrupt karता smooth UX ke liye.',
    interview: {
      intermediate: [
        { q: 'Render aur commit phase?', a: 'Render: components chalाकर VDOM banाना + diff (pure, interruptible). Commit: real DOM update + refs (synchronous). Phir effects.' },
        { q: 'Render kab trigger hota?', a: 'Initial mount, state change, parent re-render, context change.' },
      ],
      advanced: [
        { q: 'Render phase pure kyun hona chahiye?', a: 'Concurrent mode mein React render ko interrupt/restart kar sakta — side-effects multiple baar chal jaayenge ya inconsistent state. Isliye pure.' },
      ],
    },
    mcqs: [
      { q: 'DOM update kis phase?', options: ['Render', 'Commit', 'Both', 'Neither'], answer: 1, explain: 'Commit phase.' },
      { q: 'Interruptible phase?', options: ['Commit', 'Render', 'Paint', 'None'], answer: 1, explain: 'Render (concurrent).' },
    ],
    exercises: {
      easy: ['Render aur commit phase ka fark likho.'],
      medium: ['console.log se render phase observe karो.'],
      advanced: ['useEffect aur useLayoutEffect ka timing fark dikhao.'],
    },
    summary: [
      'Trigger → Render (VDOM+diff) → Commit (DOM) → paint.',
      'Render phase pure + interruptible.',
      'Commit phase synchronous.',
      'useLayoutEffect before paint, useEffect after.',
    ],
    cheatsheet: [
      { h: 'Phases', code: `Render: pure, interruptible\nCommit: DOM, sync\nuseLayoutEffect → paint → useEffect` },
    ],
    projects: ['Render-count visualizer', 'Effect timing demo'],
    advanced:
      'Concurrent rendering (React 18) render ko priority lanes mein todता — urgent updates (typing) high priority, non-urgent (list) interruptible. useTransition se non-urgent mark hota. Render phase memoization (useMemo) wasted work bachाता.',
    quiz: [
      { q: 'Side-effects kahan?', options: ['Render', 'Commit/effects', 'JSX', 'Props'], answer: 1, explain: 'Effects (post-commit).' },
      { q: 'useEffect kab?', options: ['Before paint', 'After paint', 'During render', 'Never'], answer: 1, explain: 'After paint (async).' },
    ],
    related: ['render-commit', 're-rendering', 'useeffect'],
  },

  'component-architecture': {
    overview:
      '**Component-Based Architecture** matlab UI ko chhote, independent, **reusable components** mein todना — har component apna structure (JSX), logic, aur (kabhi) style rakhता. Components ko jodकर (compose) bada UI banता. Yeh React ka core mental model hai.',
    why:
      'Components reusability, maintainability, aur testability dete. Bade apps ko manageable banाते. "Component kaise design karein" senior interview + daily kaam ka core.',
    concept: [
      { h: 'Component kya hai', p: 'Ek function jo JSX return karता — UI ka ek piece (Button, Card, Navbar). Self-contained: apni props/state.', code: `function Button({ label, onClick }) {\n  return <button onClick={onClick}>{label}</button>\n}` },
      { h: 'Composition', p: 'Chhote components ko jodकर bade banाना. Inheritance ki jagah composition (React philosophy).', code: `function Card() {\n  return (\n    <div className="card">\n      <Avatar />\n      <Button label="Follow" />\n    </div>\n  )\n}` },
      { h: 'Component tree', p: 'App ek tree hai — root (App) se neeche children. Data props se neeche flow karता (unidirectional).' },
      { h: 'Reusable design', p: 'Components ko props se configurable banाओ taaki alag jagah reuse ho. Single Responsibility — ek component ek kaam.' },
    ],
    analogy:
      'Components **kitchen appliances** jaise hain — mixer, oven, toaster (har ek ek kaam). Inhe jodकर poori kitchen (app) banती. Ek appliance kharab ho to sirf wahi badlो — poori kitchen nahi. Aur same mixer kai kitchens mein use ho. 🍳',
    syntax: { code: `// Composition\nfunction App() {\n  return (\n    <Layout>\n      <Header />\n      <Main><ProductList /></Main>\n      <Footer />\n    </Layout>\n  )\n}`, note: 'Components ko nest/compose karके UI banाओ. Data props se flow.' },
    steps: [
      'UI ko dekhо, repeating/independent pieces pehchaano.',
      'Har piece ek component banाओ (single responsibility).',
      'Props se configurable banाओ (reusable).',
      'Components ko compose karके bada UI.',
      'Shared logic custom hooks mein nikaalो.',
    ],
    notes: {
      concept: 'UI = components ka tree; composition over inheritance.',
      tip: 'Ek component ek kaam (single responsibility).',
      warning: 'Bahut bade components (god components) avoid — chhote mein todो.',
      error: 'Props ke बजाय deep nesting se data pass karna (drilling).',
    },
    compare: {
      headers: ['Approach', 'Composition', 'Inheritance'],
      rows: [
        ['React mein', 'Preferred', 'Avoid'],
        ['Kaise', 'Components nest/combine', 'Class extend'],
        ['Flexibility', 'Zyada', 'Kam'],
      ],
    },
    mistakes: [
      { bad: 'God component (sab kuch ek mein).', fix: 'Chhote focused components.' },
      { bad: 'Inheritance se reuse.', fix: 'Composition (children, props).' },
    ],
    best: ['Single responsibility components.', 'Props se configurable.', 'Composition over inheritance.', 'Shared logic → custom hooks.', 'Presentational vs container separate.'],
    performance:
      'Chhote components better memoization deते (React.memo se isolated re-renders). Bade monolithic components poora re-render karte. Component splitting se re-render scope chhota.',
    interview: {
      beginner: [
        { q: 'Component-based architecture kya?', a: 'UI ko chhote reusable independent components mein todना, jinhe compose karके bada UI banta.' },
      ],
      intermediate: [
        { q: 'Composition over inheritance kyun?', a: 'React mein components ko nest/combine karna (composition) zyada flexible aur predictable hai inheritance se. children prop + props se reuse.' },
      ],
      advanced: [
        { q: 'Component kaise design karein (best practices)?', a: 'Single responsibility, props-driven (configurable), presentational vs container separation, shared logic custom hooks mein, sahi abstraction (na zyada na kam).' },
      ],
    },
    mcqs: [
      { q: 'React prefers?', options: ['Inheritance', 'Composition', 'Mixins', 'Globals'], answer: 1, explain: 'Composition.' },
      { q: 'UI structure?', options: ['List', 'Tree', 'Graph', 'Stack'], answer: 1, explain: 'Component tree.' },
    ],
    exercises: {
      easy: ['Ek Button component banao with props.'],
      medium: ['Card ko Avatar + Button se compose karो.'],
      advanced: ['Ek page ko 5 reusable components mein todो.'],
    },
    summary: [
      'UI = reusable components ka tree.',
      'Composition over inheritance.',
      'Single responsibility per component.',
      'Props se configurable; data one-way flow.',
    ],
    cheatsheet: [
      { h: 'Compose', code: `<Layout><Header/><Main/></Layout>` },
    ],
    projects: ['Component library', 'Reusable Card/Modal/Button', 'Design system'],
    advanced:
      'Atomic Design (atoms → molecules → organisms → templates → pages). Compound components flexible APIs dete. Headless components (logic, no UI) maximum reuse. Server vs Client components (RSC) architecture ko aur layer deते.',
    quiz: [
      { q: 'Reuse ka tarika?', options: ['Copy-paste', 'Props + composition', 'Globals', 'Inheritance'], answer: 1, explain: 'Props + composition.' },
      { q: 'Data flow direction?', options: ['Two-way', 'One-way (down)', 'Random', 'Up only'], answer: 1, explain: 'Unidirectional (parent→child).' },
    ],
    related: ['components-basics', 'props', 'compound-components'],
  },

  jsx: {
    overview:
      '**JSX (JavaScript XML)** ek syntax extension hai jo JavaScript mein HTML-jaisा code likhne deta. Browser JSX nahi samajhta — **Babel** ise `React.createElement()` calls mein convert karता, jo VDOM objects banाते. JSX optional hai par har React project use karता (readable).',
    why:
      'JSX React likhने ka standard tarika hai. "JSX kya hai, kaise convert hota" interview ka basic-but-important question. JSX rules samajhe bina React likhna mushkil.',
    concept: [
      { h: 'JSX kya hai', p: 'JS ke andar HTML-jaisा markup. Ek expression hai jo React element (VDOM object) banता.', code: `const el = <h1 className="title">Hello</h1>` },
      { h: 'Babel conversion', p: 'Babel JSX ko React.createElement(type, props, children) mein transpile karता.', code: `// JSX\n<h1 className="t">Hi</h1>\n// Babel →\nReact.createElement('h1', { className: 't' }, 'Hi')` },
      { h: 'createElement → VDOM', p: 'createElement ek plain object (React element / VDOM node) return karता jo React render karता.', code: `// Result object (simplified)\n{ type: 'h1', props: { className: 't', children: 'Hi' } }` },
      { h: 'JSX expressions', p: '{ } ke andar koi bhi JS expression embed kar sakte (variables, calls, ternary).', code: `<p>Hello {user.name}, {2 + 2} items</p>` },
    ],
    analogy:
      'JSX ek **translator** jaisा hai. Aap HTML-jaisी aasaan bhasha (JSX) likhte ho jo padhne mein clear hai, aur Babel (translator) ise React ki "official language" (createElement) mein convert kar deता. Aapko comfort, React ko apna format. 🗣️',
    syntax: { code: `// JSX\nconst element = (\n  <div className="box">\n    <h1>{title}</h1>\n    <p>{count} clicks</p>\n  </div>\n)\n// class → className, for → htmlFor`, note: 'JSX mein HTML attributes camelCase (className, onClick); { } se JS embed.' },
    steps: [
      'Aap JSX likhte ho (HTML-jaisा).',
      'Babel build/compile time par JSX ko React.createElement calls mein badalता.',
      'createElement React element (VDOM object) banाता.',
      'React in objects ka tree banाकर render karता.',
      '{ } ke andar JS runtime par evaluate hota.',
    ],
    examples: [
      { level: 'Beginner', title: 'JSX with expressions', code: `function Greeting({ name, items }) {\n  return (\n    <div>\n      <h1>Hi {name} 👋</h1>\n      <p>You have {items.length} items</p>\n    </div>\n  )\n}`, explain: '{ } se JS values embed; attributes camelCase.' },
      { level: 'Intermediate', title: 'JSX → createElement', code: `// JSX\nconst x = <button onClick={fn}>Click</button>\n// Babel output\nconst x = React.createElement(\n  'button',\n  { onClick: fn },\n  'Click'\n)`, explain: 'JSX sirf createElement ka readable sugar.' },
    ],
    internals:
      'Babel (with @babel/preset-react) JSX ko transform karता. React 17+ "automatic runtime" use karता — React import zaroori nahi, jsx() function auto-import hota (react/jsx-runtime). createElement element object banाता jiska $$typeof Symbol React ko valid element pehchanने deता (XSS protection).',
    notes: {
      concept: 'JSX → Babel → createElement → VDOM object.',
      tip: 'className (class nahi), htmlFor (for nahi), camelCase events (onClick).',
      warning: 'JSX expression return karता — ek hi root element (ya Fragment).',
      error: 'JSX mein if-statement directly (use ternary/&&). { } sirf expressions leता.',
    },
    compare: {
      headers: ['JSX', 'createElement (output)'],
      rows: [
        ['<h1>Hi</h1>', "createElement('h1', null, 'Hi')"],
        ['className', 'props.className'],
        ['{value}', 'children = value'],
        ['<Comp/>', 'createElement(Comp)'],
      ],
    },
    mistakes: [
      { bad: 'class aur for use karna.', fix: 'className aur htmlFor.' },
      { bad: 'Multiple root elements return.', fix: 'Ek root ya Fragment <>...</>.' },
    ],
    best: ['className/htmlFor + camelCase events.', 'Complex logic JSX ke bahar (variables).', 'Ek root element (Fragment).', '{ } sirf expressions ke liye.'],
    interview: {
      beginner: [
        { q: 'JSX kya hai?', a: 'JavaScript ka syntax extension jo HTML-jaisा markup JS mein likhne deta. Babel ise React.createElement mein convert karता.' },
        { q: 'JSX zaroori hai?', a: 'Nahi — optional. Bina JSX React.createElement directly likh sakte, par JSX readable hai.' },
      ],
      intermediate: [
        { q: 'JSX internally kaise convert hota?', a: 'Babel JSX ko React.createElement(type, props, children) calls mein transpile karता, jo VDOM element objects banाते.' },
      ],
      advanced: [
        { q: 'React 17 ka new JSX transform?', a: 'Automatic runtime — React import zaroori nahi, Babel react/jsx-runtime se jsx() auto-import karता. Chhota bundle + better.' },
      ],
    },
    mcqs: [
      { q: 'JSX convert karता?', options: ['Browser', 'Babel', 'Node', 'React'], answer: 1, explain: 'Babel transpile.' },
      { q: 'class JSX mein?', options: ['class', 'className', 'cls', 'classes'], answer: 1, explain: 'className.' },
    ],
    exercises: {
      easy: ['JSX mein ek variable embed karो.'],
      medium: ['Ek JSX snippet ko createElement form mein likho.'],
      advanced: ['Nested JSX (div > h1 + p) likho with expressions.'],
    },
    summary: [
      'JSX = HTML-jaisा syntax in JS.',
      'Babel → React.createElement → VDOM.',
      '{ } se JS expressions embed.',
      'className, htmlFor, camelCase events.',
    ],
    cheatsheet: [
      { h: 'JSX rules', code: `className (not class)\nhtmlFor (not for)\nonClick (camelCase)\n{expression}\nsingle root / <>...</>` },
    ],
    projects: ['JSX playground', 'Profile card with dynamic data'],
    advanced:
      'JSX spread `{...props}`, conditional `{cond && <X/>}`, children as function (render props). Babel pragma (`@jsx`) custom — preact, emotion use karte. JSX $$typeof Symbol XSS se bachाता (injected objects render nahi hote).',
    quiz: [
      { q: 'JSX returns?', options: ['String', 'React element', 'HTML', 'DOM node'], answer: 1, explain: 'React element (VDOM).' },
      { q: 'JS in JSX?', options: ['[]', '{}', '()', '<>'], answer: 1, explain: 'Curly braces { }.' },
    ],
    related: ['jsx-rules', 'virtual-dom', 'fragments'],
  },

  'jsx-rules': {
    overview:
      'JSX likhne ke kuch **rules** hain: ek **single root element** return karo (ya Fragment), tags **close** karo (`<img />`), attributes **camelCase** (`className`, `onClick`), `{ }` mein **expressions** (statements nahi), aur conditional rendering ke liye ternary/&& use karो (if directly nahi).',
    why:
      'JSX rules tod par errors aate. Conditional rendering, lists, expressions — daily React code. Interview mein "JSX mein if kaise" type sawaal.',
    concept: [
      { h: 'Single root + close tags', p: 'Ek hi root element return karो (ya Fragment <>). Saare tags close (self-closing bhi: <br />).', code: `return (\n  <>\n    <h1>Hi</h1>\n    <p>Bye</p>\n  </>\n)` },
      { h: 'camelCase attributes', p: 'class→className, for→htmlFor, onclick→onClick, tabindex→tabIndex. style ek object leता.', code: `<div className="box" style={{ color: 'red' }} onClick={fn} />` },
      { h: 'Expressions only in { }', p: '{ } mein expressions (value dene wale) — variables, calls, ternary. if/for/switch statements directly nahi.', code: `<p>{isLoggedIn ? 'Welcome' : 'Login'}</p>\n<p>{items.map(i => <li key={i.id}>{i.name}</li>)}</p>` },
      { h: 'Conditional rendering', p: 'Ternary (`cond ? a : b`), && (`cond && <X/>`), ya component ke bahar if. Falsy values (false, null, undefined) render nahi hote.', code: `{loading && <Spinner />}\n{error ? <Error /> : <Data />}` },
    ],
    analogy:
      'JSX rules ek **form bharne** jaise hain — har field sahi format mein (className, closed tags). Ek hi envelope (root) mein sab. { } ek "calculator slot" — sirf answer dene wali cheezein daalो, sawaal (if/for) nahi. 📋',
    syntax: { code: `function List({ items, show }) {\n  if (!show) return null   // early return OK\n  return (\n    <ul>\n      {items.map(i => <li key={i.id}>{i.name}</li>)}\n    </ul>\n  )\n}`, note: 'if component ke top par (early return) OK; JSX ke andar ternary/&&.' },
    examples: [
      { level: 'Beginner', title: 'Conditional + list', code: `function Profile({ user }) {\n  return (\n    <div>\n      {user ? <h1>{user.name}</h1> : <p>Loading...</p>}\n      {user?.tags?.map(t => <span key={t}>{t}</span>)}\n    </div>\n  )\n}`, explain: 'Ternary for either-or, && for optional, map for lists.' },
      { level: 'Intermediate', title: '&& pitfall', code: `// Bug: 0 render ho jaता\n{items.length && <List />}  // 0 dikhega!\n// Fix\n{items.length > 0 && <List />}`, explain: '&& mein left falsy (0) render ho jaता — boolean banाओ.' },
    ],
    notes: {
      concept: 'Single root, closed tags, camelCase, { } expressions, ternary/&&.',
      tip: 'Falsy (null/false/undefined) render nahi hote — conditional ke liye useful.',
      warning: '&& ke saath number (0) render ho jaता — boolean condition use karो.',
      error: 'JSX mein if/for statement directly — error. Ternary/map use karो.',
    },
    compare: {
      headers: ['Conditional', 'Syntax', 'Kab'],
      rows: [
        ['Ternary', 'cond ? a : b', 'Either-or'],
        ['&&', 'cond && <X/>', 'Show/hide'],
        ['Early return', 'if (!x) return null', 'Whole component'],
        ['Variable', 'let el = ...; {el}', 'Complex logic'],
      ],
    },
    mistakes: [
      { bad: '{count && <X/>} jab count 0 ho.', fix: '{count > 0 && <X/>}.' },
      { bad: 'class, for, onclick.', fix: 'className, htmlFor, onClick.' },
    ],
    best: ['Single root / Fragment.', 'camelCase attributes.', 'Complex logic JSX ke bahar.', '&& ke liye boolean condition.', 'Lists mein keys.'],
    interview: {
      beginner: [
        { q: 'JSX mein conditional rendering kaise?', a: 'Ternary (cond ? a : b), && (cond && <X/>), early return (if before JSX), ya variable mein element.' },
      ],
      intermediate: [
        { q: '&& rendering ka pitfall?', a: 'Left side falsy number (0) render ho jaता ("0" dikhता). Boolean condition (count > 0 &&) use karो.' },
      ],
      advanced: [
        { q: 'JSX mein if-else kyun nahi?', a: 'JSX expressions accept karता, statements nahi. if statement hai. Solution: ternary/&&/early-return/IIFE.' },
      ],
    },
    mcqs: [
      { q: 'JSX root?', options: ['Multiple', 'Single/Fragment', 'None', 'Array only'], answer: 1, explain: 'Ek root ya Fragment.' },
      { q: '{0 && <X/>} renders?', options: ['nothing', '0', 'X', 'error'], answer: 1, explain: '0 render ho jaता!' },
    ],
    exercises: {
      easy: ['Ternary se login/logout text dikhao.'],
      medium: ['&& se loading spinner conditionally render karो.'],
      advanced: ['List render karो keys ke saath + empty state handle karो.'],
    },
    summary: [
      'Single root (Fragment), closed tags, camelCase.',
      '{ } mein expressions only.',
      'Conditional: ternary, &&, early return.',
      '&& ke saath boolean (0 pitfall).',
    ],
    cheatsheet: [
      { h: 'Conditional', code: `{c ? <A/> : <B/>}\n{c && <A/>}\nif(!x) return null` },
    ],
    projects: ['Conditional UI states', 'Loading/error/empty states'],
    advanced:
      'JSX mein IIFE se complex logic (`{(() => {...})()}`), but readability ke liye bahar nikaalना better. Spread attributes `{...props}`. key prop reconciliation ke liye special (props nahi). Boolean attributes (`disabled`) shorthand.',
    quiz: [
      { q: 'class JSX mein?', options: ['class', 'className', 'cls', 'css'], answer: 1, explain: 'className.' },
      { q: 'Falsy render?', options: ['Yes', 'No (skipped)', 'Error', 'As string'], answer: 1, explain: 'null/false/undefined skip.' },
    ],
    related: ['jsx', 'conditional-rendering', 'lists-keys'],
  },

  fragments: {
    overview:
      '**Fragment** ek wrapper hai jo multiple elements ko group karता **bina extra DOM node** banाye. JSX ko single root chahiye — par Fragment use karके aap bina unnecessary `<div>` ke siblings return kar sakte. Syntax: `<React.Fragment>` ya short `<>...</>`.',
    why:
      'Extra wrapper divs ("div soup") layout/CSS (flex/grid) todте aur DOM bloat karते. Fragments clean DOM dete. Interview: "Fragment kyun".',
    concept: [
      { h: 'Problem: extra div', p: 'JSX single root chahiye. Wrapper <div> extra DOM node banाता jo flex/grid layouts ya tables tod sakता.', code: `// Extra div (avoid)\nreturn (\n  <div>\n    <td>A</td>\n    <td>B</td>\n  </div> // breaks table!\n)` },
      { h: 'Fragment solution', p: '<> </> se group karो — koi DOM node nahi banta, sirf children render hote.', code: `return (\n  <>\n    <td>A</td>\n    <td>B</td>\n  </>\n)` },
      { h: 'Keyed Fragment', p: 'Lists mein key chahiye to short syntax nahi chalता — <React.Fragment key={id}> use karो.', code: `items.map(i => (\n  <React.Fragment key={i.id}>\n    <dt>{i.term}</dt>\n    <dd>{i.def}</dd>\n  </React.Fragment>\n))` },
    ],
    analogy:
      'Fragment ek **invisible folder** hai — multiple files (elements) ek saath rakhता par khud koi jagah nahi leता (no DOM node). Bina folder ke files bikhar jaate (multiple roots error), aur plastic box (div) use karo to extra weight (DOM bloat). 📁',
    syntax: { code: `// Short\n<>\n  <Child1 />\n  <Child2 />\n</>\n\n// With key (lists)\n<React.Fragment key={id}>...</React.Fragment>`, note: 'Short <> key support nahi karता — React.Fragment use karो keys ke liye.' },
    examples: [
      { level: 'Beginner', title: 'Avoid wrapper div', code: `function Columns() {\n  return (\n    <>\n      <td>Name</td>\n      <td>Age</td>\n    </>\n  )\n}`, explain: 'Table cells bina extra div ke — valid HTML.' },
    ],
    notes: {
      concept: 'Fragment = group without extra DOM node.',
      tip: 'Default <> </> use karो; keys chahiye to React.Fragment.',
      warning: 'Short <> key/props support nahi karता.',
      error: 'Har component mein wrapper div (div soup) — Fragment use karो.',
    },
    compare: {
      headers: ['Approach', 'Extra DOM node?', 'Keys?'],
      rows: [
        ['<div>', 'Haan', 'N/A'],
        ['<>...</>', 'Nahi', 'Nahi'],
        ['<React.Fragment>', 'Nahi', 'Haan'],
      ],
    },
    mistakes: [
      { bad: 'Har jagah wrapper div.', fix: 'Fragment <> </>.' },
      { bad: '<> par key dena.', fix: 'React.Fragment key={...}.' },
    ],
    best: ['Default Fragment over div.', 'Tables/flex/grid mein Fragment.', 'Keys ke liye React.Fragment.', 'DOM clean rakho.'],
    performance:
      'Kam DOM nodes = halka tree, fast layout/paint. Fragments unnecessary nesting hataके reflow cost kam karते. Bade lists mein matter karता.',
    interview: {
      beginner: [
        { q: 'Fragment kya hai?', a: 'Multiple elements ko group karne ka wrapper jo extra DOM node nahi banाता. <>...</> ya React.Fragment.' },
        { q: 'Fragment kyun use karein?', a: 'Extra wrapper div se bachne ke liye — clean DOM, layout (flex/grid/table) na toote, kam nesting.' },
      ],
      intermediate: [
        { q: 'Short <> aur React.Fragment mein fark?', a: 'Short <> concise par key/props nahi le sakta. React.Fragment key le sakta (lists ke liye zaroori).' },
      ],
    },
    mcqs: [
      { q: 'Fragment DOM node?', options: ['Banaata', 'Nahi banaata', 'div banaata', 'span'], answer: 1, explain: 'No extra node.' },
      { q: 'Key ke liye?', options: ['<>', 'React.Fragment', 'div', 'span'], answer: 1, explain: 'React.Fragment key support.' },
    ],
    exercises: {
      easy: ['Do elements Fragment se return karो.'],
      medium: ['Table cells Fragment se render karो.'],
      advanced: ['List mein keyed Fragment use karो (dt/dd pairs).'],
    },
    summary: [
      'Fragment groups elements without extra DOM.',
      '<>...</> short; React.Fragment for keys.',
      'Div soup se bachata.',
      'Layout/tables ke liye useful.',
    ],
    cheatsheet: [
      { h: 'Fragment', code: `<>...</>\n<React.Fragment key={id}>...` },
    ],
    projects: ['Table rows', 'Definition lists', 'Layout without wrappers'],
    advanced:
      'Fragments DOM mein invisible — DevTools mein dikhते par real node nahi. Arrays bhi return kar sakte (keys ke saath) Fragment ki jagah. Portals + Fragments combine for advanced layouts.',
    quiz: [
      { q: 'Short Fragment?', options: ['<div>', '<>', '<frag>', '<F>'], answer: 1, explain: '<>...</>.' },
      { q: 'Fragment use?', options: ['Styling', 'Group sans DOM', 'State', 'Routing'], answer: 1, explain: 'Group without extra node.' },
    ],
    related: ['jsx', 'jsx-rules', 'lists-keys'],
  },
}
