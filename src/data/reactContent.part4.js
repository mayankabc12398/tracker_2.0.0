// React content — Part 4: Rendering, Reconciliation, Fiber, Context & Patterns

export const reactContentD = {
  'render-commit': {
    overview:
      'React UI update 2 phases mein karता: **Render Phase** (components chalाकर VDOM banाना + diffing — pure, interruptible) aur **Commit Phase** (changes real DOM par apply — synchronous, fast). Render "kya badalना hai" calculate karта; commit actually DOM update karता. Phir effects.',
    why:
      'Render vs commit samajhna re-renders, performance, effect timing ke liye core. "Render phase pure kyun" senior interview question.',
    concept: [
      { h: 'Render Phase', p: 'React component functions chalाता, JSX → VDOM, naye ko purane se diff. Pure hona chahiye — React interrupt/restart kar sakta (concurrent).', code: `function App() {\n  // render phase — pure, no side-effects\n  return <h1>{count}</h1>\n}` },
      { h: 'Commit Phase', p: 'Calculated DOM changes apply (synchronous, fast). Refs set hote. DOM ab updated.' },
      { h: 'Effects after commit', p: 'Commit ke baad: useLayoutEffect (sync, pre-paint), phir browser paint, phir useEffect (async).' },
      { h: 'Render ≠ DOM update', p: 'Render (component chalна) zaroori nahi DOM change kare — agar diff mein kuch nahi badla to commit skip. "Re-render" ≠ "DOM update".' },
    ],
    analogy:
      'Render phase = architect blueprint banाता aur purane se compare karता (kaagaz, mita sakta — interruptible). Commit phase = builder actually deewar banाता (real, ek baar). Render bina commit ho sakta (sirf socha, banaya nahi). 🏗️',
    syntax: { code: `// Render: pure calculation (VDOM + diff)\n// Commit: real DOM update (sync)\nuseLayoutEffect(() => {}) // post-commit, pre-paint\nuseEffect(() => {})       // post-paint`, note: 'Render pure rakho; DOM/side-effects commit/effects mein.' },
    steps: [
      'Trigger (mount/setState/parent/context).',
      'Render phase: components run, VDOM, diff (interruptible).',
      'Commit phase: real DOM update (sync), refs set.',
      'useLayoutEffect → browser paint → useEffect.',
    ],
    visual: {
      type: 'boxes',
      items: [
        { label: 'Trigger', sub: 'setState', color: '#06B6D4' },
        { label: 'Render', sub: 'VDOM+diff (pure)', color: '#6366F1' },
        { label: 'Commit', sub: 'DOM (sync)', color: '#22C55E' },
        { label: 'Effects', sub: 'layout→paint→effect', color: '#F59E0B' },
      ],
    },
    notes: {
      concept: 'Render = calculate (pure, interruptible). Commit = DOM (sync).',
      tip: 'Render phase mein side-effects mat daalो.',
      warning: 'Render multiple baar chal sakta bina commit (concurrent).',
      error: 'Render mein setState/API (impure, infinite loop).',
    },
    compare: {
      headers: ['Phase', 'Kaam', 'Nature'],
      rows: [
        ['Render', 'VDOM + diff', 'Pure, interruptible'],
        ['Commit', 'DOM update', 'Synchronous'],
        ['useLayoutEffect', 'DOM sync', 'Pre-paint'],
        ['useEffect', 'Side-effects', 'Post-paint'],
      ],
    },
    mistakes: [
      { bad: 'Side-effects render phase mein.', fix: 'Effects/handlers mein.' },
      { bad: 'Render ko hamesha DOM update samajhna.', fix: 'Diff empty to commit skip.' },
    ],
    best: ['Render functions pure.', 'Side-effects useEffect.', 'Heavy calc useMemo.', 'DOM measure useLayoutEffect.'],
    performance:
      'Render frequent ho sakta — heavy work memoize. Commit synchronous — bhaari DOM/layout jank. Concurrent rendering render ko interrupt/prioritize karता smooth UX.',
    interview: {
      intermediate: [
        { q: 'Render aur commit phase?', a: 'Render: components chalाकर VDOM + diff (pure, interruptible). Commit: real DOM update + refs (synchronous). Phir effects.' },
      ],
      advanced: [
        { q: 'Render phase pure kyun hona chahiye?', a: 'Concurrent mode mein React render ko interrupt/restart/discard kar sakta. Side-effects multiple baar ya inconsistent chal jaate. Isliye pure — side-effects commit ke baad (effects).' },
        { q: 'Render hamesha DOM change karता?', a: 'Nahi — render (component run) VDOM banाता; agar diff mein kuch nahi badla to commit (DOM) skip. Re-render ≠ DOM update.' },
      ],
    },
    mcqs: [
      { q: 'DOM update phase?', options: ['Render', 'Commit', 'Both', 'Effects'], answer: 1, explain: 'Commit.' },
      { q: 'Interruptible?', options: ['Commit', 'Render', 'Paint', 'None'], answer: 1, explain: 'Render (concurrent).' },
    ],
    exercises: {
      easy: ['Render aur commit ka fark likho.'],
      medium: ['useEffect vs useLayoutEffect timing observe karो.'],
      advanced: ['Render bina DOM change demonstrate karो.'],
    },
    summary: [
      'Render: VDOM+diff (pure, interruptible).',
      'Commit: real DOM update (sync).',
      'Effects: layout → paint → effect.',
      'Render ≠ DOM update.',
    ],
    cheatsheet: [
      { h: 'Phases', code: `Render: pure, interruptible\nCommit: DOM, sync\nlayout→paint→effect` },
    ],
    projects: ['Render-phase logger', 'Effect timing demo'],
    advanced:
      'Concurrent rendering render ko lanes mein todता (priority). Double buffering (current + WIP tree). Commit phase 3 sub-phases: before mutation, mutation (DOM), layout. Profiler API render timings deता.',
    quiz: [
      { q: 'Side-effects?', options: ['Render', 'Commit/effects', 'JSX', 'Diff'], answer: 1, explain: 'Effects.' },
      { q: 'Commit nature?', options: ['Interruptible', 'Synchronous', 'Async', 'Lazy'], answer: 1, explain: 'Synchronous.' },
    ],
    related: ['re-rendering', 'reconciliation', 'fiber'],
  },

  're-rendering': {
    overview:
      'Re-render matlab React component function ko **dubara chalाना** (naya VDOM). Triggers: **state change**, **props change**, **parent re-render**, **context change**. **Parent re-render se saare children re-render** hote (default) — chahe unke props na badle. React.memo se rok sakte. Re-render ≠ DOM update.',
    why:
      'Unnecessary re-renders #1 React performance issue. "Parent re-render child ko kyun" aur optimization interview ka core. Daily debugging.',
    concept: [
      { h: 'Re-render triggers', p: 'State change (setState), props change, parent re-render, context value change. Hooks (useState/useReducer/useContext) bhi.', code: `// Yeh sab re-render karwाte\nsetState(x)\n// parent re-renders → children re-render\n// context value changes` },
      { h: 'Parent → children cascade', p: 'Parent re-render hone par uske SAARE children re-render hote (default), chahe props same hon. React.memo se skip.', code: `function Parent() {\n  const [n, setN] = useState(0)\n  return <><button onClick={()=>setN(n+1)}/><Child /></> // Child bhi re-render!\n}` },
      { h: 'React.memo to skip', p: 'Child ko React.memo se wrap karो — props (shallow) same to re-render skip.', code: `const Child = React.memo(() => <div>Static</div>)\n// ab parent re-render par skip (props same)` },
      { h: 'Re-render vs DOM update', p: 'Re-render = component run + VDOM + diff. Agar diff mein kuch nahi badla → DOM update nahi. Re-render mehnga nahi (usually), DOM update mehnga.' },
    ],
    analogy:
      'Parent re-render ek **building ki light switch** jaisा — parent ki light on/off karो to default mein saare floors (children) ki lights bhi toggle. React.memo ek "is floor ko mat chhedो agar kuch nahi badla" rule. 💡',
    syntax: { code: `// Skip child re-render\nconst Child = React.memo(Component)\n// stable props chahiye\nconst cb = useCallback(fn, [])\nconst obj = useMemo(() => ({...}), [])`, note: 'React.memo + stable props = re-render skip.' },
    examples: [
      { level: 'Intermediate', title: 'Unnecessary child re-render', code: `function Parent() {\n  const [count, setCount] = useState(0)\n  return (\n    <>\n      <button onClick={() => setCount(count + 1)}>{count}</button>\n      <ExpensiveChild /> {/* re-renders despite no props! */}\n    </>\n  )\n}\n// Fix: const ExpensiveChild = React.memo(...)`, explain: 'Parent state change → child re-render. React.memo se rok.' },
    ],
    memory:
      'Har re-render naya VDOM tree (purana GC). Inline objects/functions har render naye references — memoized children break karte. React.memo shallow props compare karता. Frequent re-renders = CPU (diffing) cost, even without DOM change.',
    notes: {
      concept: 'Re-render: component re-run. Triggers: state/props/parent/context.',
      tip: 'Parent re-render = children re-render (default). React.memo se rok.',
      warning: 'Re-render itself usually sasta; problem hai unnecessary heavy re-renders.',
      error: 'React.memo + inline object/function props = memo useless.',
    },
    compare: {
      headers: ['Trigger', 'Re-renders'],
      rows: [
        ['setState', 'Wo component + children'],
        ['Props change', 'Wo component'],
        ['Parent re-render', 'Saare children (default)'],
        ['Context change', 'Saare consumers'],
      ],
    },
    mistakes: [
      { bad: 'Sab kuch React.memo karna.', fix: 'Sirf measured heavy components.' },
      { bad: 'memo + inline props.', fix: 'useCallback/useMemo se stable props.' },
    ],
    best: ['Heavy children → React.memo + stable props.', 'State ko jahan chahiye wahan colocate.', 'Component composition (children prop) se re-render scope chhota.', 'Profile pehle.'],
    performance:
      'Unnecessary re-renders CPU waste (diffing). Solutions: React.memo (heavy children), useMemo/useCallback (stable props), state colocation, composition (children prop trick — parent state child ko affect na kare). Profiler se identify.',
    interview: {
      intermediate: [
        { q: 'Re-render kab hota?', a: 'State change, props change, parent re-render, ya context value change par. Hooks (useState/useReducer/useContext) trigger karte.' },
        { q: 'Parent re-render child ko kyun karता?', a: 'Default — parent re-render hone par naye children elements create hote, sab re-render. React.memo se props-same children skip.' },
      ],
      advanced: [
        { q: 'Unnecessary re-renders kaise rokein?', a: 'React.memo (heavy children) + stable props (useCallback/useMemo), state colocation, composition (children as prop), context split. Pehle Profiler se measure.' },
        { q: 'Re-render hamesha mehnga?', a: 'Nahi — re-render (VDOM + diff) usually sasta. DOM update mehnga (diff empty to skip). Problem hai bade trees/heavy components ke frequent re-renders.' },
      ],
    },
    mcqs: [
      { q: 'Parent re-render?', options: ['No effect', 'Children re-render', 'DOM only', 'Error'], answer: 1, explain: 'Children re-render (default).' },
      { q: 'Skip re-render?', options: ['useState', 'React.memo', 'useRef', 'useId'], answer: 1, explain: 'React.memo (+ stable props).' },
    ],
    exercises: {
      easy: ['console.log se child re-render dekho.'],
      medium: ['React.memo se unnecessary re-render rok.'],
      advanced: ['Composition (children prop) se re-render scope chhota karो.'],
    },
    summary: [
      'Re-render = component re-run (state/props/parent/context).',
      'Parent re-render → children re-render (default).',
      'React.memo + stable props se skip.',
      'Re-render ≠ DOM update.',
    ],
    cheatsheet: [
      { h: 'Optimize', code: `React.memo(Child)\nuseCallback(fn,[])\nuseMemo(()=>obj,[])\nstate colocation` },
    ],
    projects: ['Render counter visualizer', 'Optimized dashboard', 'Memoized list'],
    advanced:
      'Composition trick: state ko component mein rakho, baaki children prop se pass — children parent state se re-render nahi hote. Context selector libraries (use-context-selector). React Compiler (auto-memo). Why-did-you-render debugging.',
    quiz: [
      { q: 'Context change?', options: ['No re-render', 'All consumers', 'Parent only', 'DOM'], answer: 1, explain: 'Saare consumers re-render.' },
      { q: 'memo needs?', options: ['Inline props', 'Stable props', 'No props', 'State'], answer: 1, explain: 'Stable props.' },
    ],
    related: ['render-commit', 'memoization', 'usememo-usecallback'],
  },

  reconciliation: {
    overview:
      '**Reconciliation** wo process hai jisse React naye VDOM ko purane se **compare (diff)** karता aur minimum changes nikalता. **Diffing algorithm** O(n) heuristics use karता: (1) alag element type → poora subtree replace, (2) same type → props update, (3) lists → **keys** se match. Yeh React ki efficiency ka core.',
    why:
      'Reconciliation samajhna keys, performance, aur "React kyun re-mount karта" ke liye core. Diffing algorithm + heuristics senior interview question.',
    concept: [
      { h: 'Reconciliation kya', p: 'State change par naya VDOM banता. React purane se diff karता — kya add/remove/update hua — phir minimal DOM ops.' },
      { h: 'Diffing heuristics', p: '(1) Different element type (div→span) → poora subtree destroy + rebuild. (2) Same type → sirf changed props/attributes update. (3) Children → keys se match.', code: `// type change = full rebuild\n<div><Comp/></div> → <span><Comp/></span>\n// Comp remount ho jaता!` },
      { h: 'Keys ka role', p: 'Lists mein keys batate kaun element kaun hai. Same key → reuse (state preserve). No/changing keys → remount.' },
      { h: 'Why O(n)', p: 'Perfect tree diff O(n³) hota. React 2 assumptions se O(n): different types = different trees, keys se stable identity.' },
    ],
    analogy:
      'Reconciliation ek **"pehle wali photo se compare karke sirf changed cheezein update karna"** jaisा hai. Pura ghar dobara nahi banाते — sirf jo deewar/furniture (element) badla wahi. Keys = har furniture par sticker (identity) taaki rearrange par confusion na ho. 📸',
    syntax: { code: `// Diffing rules:\n// 1. type alag → replace subtree\n// 2. type same → update props\n// 3. lists → key se match\n<ul>{items.map(i => <li key={i.id}>{i.t}</li>)}</ul>`, note: 'Stable keys reconciliation ko efficient + correct banाती.' },
    examples: [
      { level: 'Advanced', title: 'Type change = remount', code: `// loading true→false par type badla\n{loading ? <div><Form /></div> : <section><Form /></section>}\n// Form remount (div vs section) — state loss!\n// Fix: same wrapper type rakho`, explain: 'Parent type change pure subtree (Form) remount karता.' },
    ],
    internals:
      'React fiber tree par reconciliation karता. Har fiber node ka type/key compare hota current vs work-in-progress. Same → fiber reuse (alternate), props update mark. Different → delete old, create new. Lists mein keys se O(n) matching (key→fiber map). Effects list banती (kya DOM change).',
    memory:
      'Reconciliation me same-key fibers reuse hote (state/DOM preserve). Type/key change → old fiber + DOM destroy, naya create (state loss, memory churn). Keys se React minimal create/destroy karता.',
    notes: {
      concept: 'Reconciliation = diff old vs new VDOM → minimal DOM ops.',
      tip: 'Same element type + stable keys = max reuse.',
      warning: 'Element type change pure subtree remount karता (state loss).',
      error: 'Conditional different wrappers (div vs section) around same child — remount.',
    },
    compare: {
      headers: ['Change', 'React action'],
      rows: [
        ['Same type, diff props', 'Update props (reuse)'],
        ['Different type', 'Destroy + rebuild subtree'],
        ['Same key (list)', 'Reuse (state preserve)'],
        ['Different/no key', 'Remount'],
      ],
    },
    mistakes: [
      { bad: 'Conditional alag wrapper types.', fix: 'Same type rakho (state preserve).' },
      { bad: 'Index/no keys.', fix: 'Stable id keys.' },
    ],
    best: ['Stable element structure (type same).', 'Stable unique keys.', 'key change intentional reset ke liye.', 'Deep nesting + frequent change avoid.'],
    performance:
      'Diffing O(n) (heuristics). Stable keys + types = minimal create/destroy. Type changes/bad keys = mass remount (slow + state loss). Bade lists virtualization + keys. Reconciliation Fiber se interruptible.',
    interview: {
      intermediate: [
        { q: 'Reconciliation kya hai?', a: 'React naye VDOM ko purane se diff karता aur minimal changes real DOM par apply karता — efficient updates ka process.' },
        { q: 'Diffing algorithm kaise kaam karता?', a: 'O(n) heuristics: different type → subtree replace; same type → props update; lists → keys se match. Perfect O(n³) ke बजाय assumptions se O(n).' },
      ],
      advanced: [
        { q: 'Keys reconciliation mein kya karti?', a: 'Lists mein element identity deती — same key → fiber/DOM/state reuse, changed key → remount. Bina keys positional matching (reorder buggy).' },
        { q: 'Element type change se kya hota?', a: 'React pure subtree destroy karके naya banाता (children remount, state loss). Isliye conditional wrappers same type rakho.' },
      ],
    },
    mcqs: [
      { q: 'Diffing complexity?', options: ['O(n³)', 'O(n)', 'O(1)', 'O(2ⁿ)'], answer: 1, explain: 'O(n) heuristics.' },
      { q: 'Type change?', options: ['Update props', 'Rebuild subtree', 'Ignore', 'Cache'], answer: 1, explain: 'Destroy + rebuild.' },
    ],
    exercises: {
      easy: ['Reconciliation ki 3 heuristics likho.'],
      medium: ['Type change se remount demonstrate karो.'],
      advanced: ['Keys ka reconciliation effect dikhao (state preserve).'],
    },
    summary: [
      'Reconciliation = diff old vs new VDOM.',
      'Heuristics: type diff (rebuild), same (update), keys (match).',
      'O(n) via assumptions.',
      'Keys = identity (reuse vs remount).',
    ],
    cheatsheet: [
      { h: 'Diff rules', code: `type diff → rebuild\ntype same → update\nkey match → reuse` },
    ],
    projects: ['List reorder demo', 'Conditional wrapper bug', 'Key reset trick'],
    advanced:
      'Fiber se reconciliation interruptible (chunks). Child reconciliation (single, keyed lists). Bailout (same props/state → skip subtree). React key={id} se intentional remount. Reconciler pluggable (react-dom, react-native, react-three-fiber).',
    quiz: [
      { q: 'List matching via?', options: ['Index', 'Keys', 'Type', 'Order'], answer: 1, explain: 'Keys.' },
      { q: 'Same type result?', options: ['Rebuild', 'Update props', 'Remove', 'Ignore'], answer: 1, explain: 'Props update (reuse).' },
    ],
    related: ['fiber', 'lists-keys', 'render-commit'],
  },

  fiber: {
    overview:
      '**Fiber** React 16+ ka reconciliation engine hai — ek naya internal architecture jo rendering ko **interruptible, prioritized, aur incremental** banाता. Har component ek **fiber node** (JS object) hota jisme type, state, props, aur tree links hote. React do trees rakhता: **current** (screen par) aur **work-in-progress (WIP)** (naya banта).',
    why:
      'Fiber concurrent rendering, scheduling, time-slicing ko possible banाता. Senior interview ka deep topic — "Fiber kya, kyun" guaranteed.',
    concept: [
      { h: 'Fiber node kya hai', p: 'Har component/element ek fiber node (JS object) — type, props, state (hooks), aur links (child, sibling, return/parent). Unit of work.', code: `// Fiber node (simplified)\n{ type: App, stateNode, child, sibling, return,\n  memoizedState, pendingProps, alternate }` },
      { h: 'Current vs WIP tree', p: 'current tree = abhi screen par. Update par React WIP tree banाता (current ka clone). Commit par swap — WIP current ban jaता ("double buffering").' },
      { h: 'Interruptible rendering', p: 'Fiber se React kaam ko **chunks (units)** mein todता — har chunk ke baad check karता koi urgent kaam to nahi. High-priority (typing) ke liye render pause/resume.' },
      { h: 'Why fiber', p: 'Purana stack reconciler synchronous tha (bada tree = main thread block, jank). Fiber incremental + prioritized — smooth UX.' },
    ],
    analogy:
      'Fiber ek **smart kitchen manager** hai. Purane reconciler ne ek baar mein pura order banाya (bada order = sab ruk gaye). Fiber order ko chhote tasks (fibers) mein todता — beech mein urgent order (customer typing) aaye to wo pehle, phir wapas. Aur do menu boards (current + WIP) rakhता — naya ready hone par swap. 👨‍🍳',
    syntax: { code: `// Fiber concepts (internal)\nfiber.child       // pehla child\nfiber.sibling     // agla sibling\nfiber.return      // parent\nfiber.alternate   // current ↔ WIP link\nfiber.memoizedState // hooks linked list`, note: 'Fiber internal hai — hum directly nahi chhuते, par samajhna important.' },
    steps: [
      'Update trigger → React WIP tree banाना shuru (current se).',
      'Render phase: fiber-by-fiber kaam (reconcile), interruptible.',
      'Har fiber: diff, effects mark (kya DOM change).',
      'Pura WIP tree ready → commit phase.',
      'Commit: effects apply, WIP ↔ current swap (double buffering).',
    ],
    visual: {
      type: 'tree',
      root: 'App (fiber)',
      children: [
        { label: 'Header', sub: 'fiber node' },
        { label: 'Main', sub: 'fiber', children: [{ label: 'List', sub: 'child fiber' }] },
        { label: 'Footer', sub: 'sibling fiber' },
      ],
    },
    internals:
      'Fiber tree linked list jaisा traverse hota (child → sibling → return). Render phase WIP fibers process karता (interruptible — kaam yield kar sakta scheduler ko). Effects list (DOM mutations) commit phase mein synchronously apply. alternate pointer current ↔ WIP link. Hooks fiber.memoizedState linked list par.',
    memory:
      'Do fiber trees (current + WIP) memory mein — WIP current fibers reuse karता jahan possible (alternate). Commit ke baad WIP current ban jaता (purana current ab alternate). Yeh "double buffering" extra memory leता par fast swap.',
    notes: {
      concept: 'Fiber = interruptible reconciliation engine; fiber nodes = units of work.',
      tip: 'current = screen, WIP = naya being built; commit par swap.',
      warning: 'Fiber se render interruptible — render multiple baar/partially chal sakta.',
      error: 'Fiber ko directly access/mutate karne ki koshish (internal).',
    },
    compare: {
      headers: ['Feature', 'Stack reconciler (old)', 'Fiber (16+)'],
      rows: [
        ['Rendering', 'Synchronous', 'Interruptible'],
        ['Priority', 'Nahi', 'Lanes/priorities'],
        ['Big trees', 'Block (jank)', 'Time-sliced'],
        ['Unit', 'Recursion', 'Fiber (linked list)'],
      ],
    },
    mistakes: [
      { bad: 'Render phase mein side-effects (fiber multiple runs).', fix: 'Effects mein.' },
      { bad: 'Fiber internals par depend.', fix: 'Public API use karो.' },
    ],
    best: ['Render pure (interruptible-safe).', 'Heavy work memoize/transition.', 'Concurrent features (useTransition) use.', 'Keys for fiber reuse.'],
    performance:
      'Fiber rendering ko chunks mein todता — bade trees jank-free (time-slicing). High-priority updates (input) low-priority (list render) ko interrupt karते. Memoization wasted fiber work bachाता.',
    interview: {
      advanced: [
        { q: 'Fiber kya hai?', a: 'React 16+ ka reconciliation engine — har component ek fiber node (unit of work). Rendering ko interruptible, prioritized, incremental banाता (concurrent features ka base).' },
        { q: 'Fiber kyun banaya?', a: 'Purana stack reconciler synchronous tha — bade trees main thread block karte (jank). Fiber kaam ko chunks mein todता, urgent updates prioritize, render pause/resume.' },
        { q: 'Current vs WIP tree?', a: 'current = abhi screen par. Update par React WIP tree (current ka clone, alternate se linked) banाता render phase mein. Commit par swap — WIP current ban jaता (double buffering).' },
        { q: 'Fiber node mein kya hota?', a: 'type, key, stateNode (DOM/instance), child/sibling/return links, pendingProps/memoizedProps, memoizedState (hooks), effectTag, aur alternate (current↔WIP).' },
      ],
    },
    mcqs: [
      { q: 'Fiber rendering?', options: ['Synchronous', 'Interruptible', 'Blocking', 'Sequential'], answer: 1, explain: 'Interruptible.' },
      { q: 'Two trees?', options: ['left/right', 'current/WIP', 'old/cache', 'DOM/CSS'], answer: 1, explain: 'current + work-in-progress.' },
    ],
    exercises: {
      easy: ['Fiber kya hai apne shabdon mein likho.'],
      medium: ['current vs WIP tree samjhao.'],
      advanced: ['Fiber se concurrent rendering kaise possible hua, explain.'],
    },
    summary: [
      'Fiber = interruptible reconciliation engine (16+).',
      'Fiber node = unit of work (links + state).',
      'current (screen) + WIP (new) trees; commit swap.',
      'Concurrent rendering ka base.',
    ],
    cheatsheet: [
      { h: 'Fiber', code: `node: type, child, sibling,\n  return, alternate, memoizedState\ncurrent ↔ WIP (double buffer)` },
    ],
    projects: ['Fiber concept diagram', 'Concurrent rendering demo'],
    advanced:
      'Fiber + Scheduler + Lanes = concurrent React. Yield to browser (time-slicing, 5ms chunks). Effects list (linked) commit mein. Reconciler vs renderer separation (react-reconciler). Fiber alternate reuse (bailout).',
    quiz: [
      { q: 'Fiber unit?', options: ['Component', 'Fiber node', 'DOM node', 'Hook'], answer: 1, explain: 'Fiber node = unit of work.' },
      { q: 'Commit par?', options: ['WIP discard', 'WIP↔current swap', 'Both delete', 'Nothing'], answer: 1, explain: 'Swap (double buffering).' },
    ],
    related: ['concurrent', 'reconciliation', 'fiber-deep'],
  },

  concurrent: {
    overview:
      '**Concurrent Rendering** (React 18) React ko rendering **interrupt, pause, resume, aur prioritize** karne deता. **Scheduler** decide karता kaun-sa kaam pehle. **Lanes** priorities represent karti (urgent vs non-urgent). Result: heavy updates UI ko block nahi karte — typing/clicks responsive rehte. useTransition/useDeferredValue iske APIs.',
    why:
      'Concurrent React modern performance ka core. Scheduler, lanes, priorities, interruptible rendering senior interview ke deep topics.',
    concept: [
      { h: 'Concurrent rendering', p: 'React multiple "versions" of UI ek saath prepare kar sakta, render ko interrupt/resume karता. UI responsive — heavy work background mein.' },
      { h: 'Scheduler', p: 'React ka internal scheduler kaam ko priority ke hisaab se schedule karता, browser ko beech-beech mein control deता (time-slicing, ~5ms chunks).' },
      { h: 'Priorities & Lanes', p: 'Updates ko priority milti — urgent (clicks, typing) high, transitions (list filter) low. **Lanes** bitmask se priorities represent. High-priority low ko interrupt karता.', code: `// Urgent (default)\nsetInput(value)\n// Non-urgent (low priority)\nstartTransition(() => setList(filtered))` },
      { h: 'Interruptible rendering', p: 'Low-priority render chal raha ho aur urgent update aaye → React low ko pause, urgent render+commit, phir low resume/restart. UI kabhi freeze nahi.' },
    ],
    analogy:
      'Concurrent React ek **hospital emergency system** hai. Normal checkups (non-urgent renders) chalte rehte, par heart-attack (urgent — typing) aaye to doctor (React) checkup pause karके emergency handle karता, phir wapas. Scheduler = triage nurse jo priority decide karती. 🏥',
    syntax: { code: `import { startTransition, useTransition, useDeferredValue } from 'react'\nconst [isPending, startTransition] = useTransition()\nstartTransition(() => setState(heavy)) // low priority\nconst deferred = useDeferredValue(value)`, note: 'createRoot (React 18) se concurrent features enable.' },
    steps: [
      'Update aata — React priority assign karता (lane).',
      'Scheduler high-priority kaam pehle schedule.',
      'Render fiber-by-fiber, har chunk ke baad yield check.',
      'Urgent update aaye → low-priority render pause/discard.',
      'Urgent commit → phir low-priority resume/restart.',
    ],
    visual: {
      type: 'boxes',
      items: [
        { label: 'Update', sub: 'priority assign', color: '#06B6D4' },
        { label: 'Scheduler', sub: 'lane priority', color: '#6366F1' },
        { label: 'Render', sub: 'interruptible', color: '#F59E0B' },
        { label: 'Commit', sub: 'when ready', color: '#22C55E' },
      ],
    },
    examples: [
      { level: 'Advanced', title: 'useTransition', code: `function Search() {\n  const [q, setQ] = useState('')\n  const [list, setList] = useState([])\n  const [pending, startTransition] = useTransition()\n  function onChange(e) {\n    setQ(e.target.value)  // urgent (input responsive)\n    startTransition(() => {\n      setList(filterBig(e.target.value)) // low priority\n    })\n  }\n  return <><input value={q} onChange={onChange} />{pending && <Spinner/>}</>\n}`, explain: 'Typing instant; heavy list update interruptible — smooth.' },
    ],
    internals:
      'React 18 lanes model (31-bit bitmask) priorities represent karता — SyncLane (urgent), TransitionLanes, etc. Scheduler (separate package) MessageChannel se time-slicing karता (browser ko yield). Render phase interruptible (fiber units), commit synchronous. Higher-priority update lower ka WIP discard/restart kar sakta.',
    memory:
      'Concurrent rendering mein WIP tree discard/restart ho sakta (extra work). React multiple lanes parallel-ish process karता. Tearing (inconsistent UI) avoid karne ke liye useSyncExternalStore. Interrupted renders memory mein temporary.',
    notes: {
      concept: 'Concurrent: interruptible + prioritized rendering. Scheduler + lanes.',
      tip: 'Heavy non-urgent updates → useTransition/useDeferredValue.',
      warning: 'createRoot zaroori (React 18) concurrent features ke liye.',
      error: 'Urgent updates ko transition mein wrap karna (input lag).',
    },
    compare: {
      headers: ['Update', 'Priority', 'Interruptible?'],
      rows: [
        ['Click/type', 'Urgent (high)', 'Nahi (immediate)'],
        ['Transition', 'Low', 'Haan'],
        ['Deferred value', 'Low', 'Haan'],
      ],
    },
    mistakes: [
      { bad: 'Urgent input ko transition mein.', fix: 'Input urgent rakho, heavy result transition.' },
      { bad: 'ReactDOM.render (legacy) use.', fix: 'createRoot for concurrent.' },
    ],
    best: ['Heavy non-urgent → useTransition.', 'Expensive derived → useDeferredValue.', 'createRoot (React 18).', 'External stores → useSyncExternalStore.'],
    performance:
      'Concurrent rendering UI ko responsive rakhता (urgent updates interruption se priority). Time-slicing bade renders ko chunks mein todता (no long main-thread block). useTransition se loading states without blocking. Net: smoother UX.',
    interview: {
      advanced: [
        { q: 'Concurrent rendering kya hai?', a: 'React 18 feature — rendering interrupt/pause/resume/prioritize kar sakta. Heavy updates UI block nahi karte; urgent (typing) responsive rehता. Scheduler + lanes se.' },
        { q: 'Lanes kya hain?', a: 'Priorities ko represent karne wala bitmask model. Har update ko lane (priority) milti — urgent (SyncLane) high, transitions low. React lanes ke hisaab se schedule/interrupt karता.' },
        { q: 'Scheduler ka role?', a: 'Internal package jo kaam ko priority + time-slicing se schedule karता — browser ko ~5ms ke baad control deता (MessageChannel), taaki main thread block na ho.' },
        { q: 'useTransition internally?', a: 'State update ko transition lane (low priority) par schedule karता — interruptible. Urgent updates ise pause kar sakte. isPending se loading state.' },
      ],
    },
    mcqs: [
      { q: 'Concurrent enable?', options: ['render()', 'createRoot()', 'useState', 'StrictMode'], answer: 1, explain: 'createRoot (React 18).' },
      { q: 'Priorities model?', options: ['Queues', 'Lanes', 'Stack', 'Heap'], answer: 1, explain: 'Lanes (bitmask).' },
    ],
    exercises: {
      easy: ['Concurrent rendering ka fayda likho.'],
      medium: ['useTransition se heavy update wrap karो.'],
      advanced: ['useDeferredValue se expensive list defer karो.'],
    },
    summary: [
      'Concurrent: interruptible + prioritized rendering.',
      'Scheduler + lanes priorities manage karte.',
      'Urgent (typing) > non-urgent (transition).',
      'useTransition/useDeferredValue APIs.',
    ],
    cheatsheet: [
      { h: 'Concurrent', code: `createRoot(el).render(<App/>)\nstartTransition(()=>setX(heavy))\nuseDeferredValue(v)` },
    ],
    projects: ['Search with transition', 'Tab switch (deferred)', 'Heavy list filter'],
    advanced:
      'Lanes (31 bits), priority levels (Immediate, UserBlocking, Normal, Low, Idle). Time-slicing (MessageChannel, 5ms). Tearing + useSyncExternalStore. Suspense + concurrent (streaming SSR). React 19 actions/transitions extend.',
    quiz: [
      { q: 'Urgent update?', options: ['Transition', 'Typing/click', 'Deferred', 'Idle'], answer: 1, explain: 'User interactions urgent.' },
      { q: 'Time-slicing yields to?', options: ['Server', 'Browser', 'Network', 'GC'], answer: 1, explain: 'Browser (main thread).' },
    ],
    related: ['fiber', 'scheduler-lanes', 'advanced-hooks'],
  },

  'context-api': {
    overview:
      '**Context API** se data ko bina props drilling ke component tree mein **directly share** karte. **createContext** se context banाओ, **Provider** se value provide karो (top par), **useContext** se kahin bhi consume. Global-ish data (theme, auth, locale) ke liye. Provider value change → saare consumers re-render.',
    why:
      'Props drilling solve karता; theme/auth/global state ka common solution. Context performance issues + Context+useReducer interview ke topics.',
    concept: [
      { h: 'Context creation', p: 'createContext(default) se context object banta — Provider aur consumer deta.', code: `const ThemeContext = createContext('light')` },
      { h: 'Provider', p: 'Provider value deता jo neeche saare consumers ko milti (drilling skip).', code: `<ThemeContext.Provider value={theme}>\n  <App />\n</ThemeContext.Provider>` },
      { h: 'useContext (consume)', p: 'Kahin bhi (nested) context value padho — beech ke components skip.', code: `const theme = useContext(ThemeContext)` },
      { h: 'Context + useReducer', p: 'Reducer + context = global state (Redux-lite). dispatch + state context mein.', code: `<StateCtx.Provider value={{ state, dispatch }}>` },
    ],
    analogy:
      'Context ek **building ka central broadcast system** hai — top floor (Provider) se announcement (value) har floor (consumer) tak directly pahunchti, har floor se manually pass nahi karna. Par announcement badle to saare sunne wale (consumers) react karte (re-render). 📢',
    syntax: { code: `const Ctx = createContext(defaultValue)\n<Ctx.Provider value={val}>{children}</Ctx.Provider>\nconst val = useContext(Ctx)`, note: 'Provider value badle to saare consumers re-render.' },
    examples: [
      { level: 'Intermediate', title: 'Theme context', code: `const ThemeCtx = createContext()\nfunction App() {\n  const [theme, setTheme] = useState('dark')\n  return (\n    <ThemeCtx.Provider value={{ theme, setTheme }}>\n      <Toolbar />\n    </ThemeCtx.Provider>\n  )\n}\nfunction Button() {\n  const { theme } = useContext(ThemeCtx)\n  return <button className={theme}>Click</button>\n}`, explain: 'Button ne theme directly liya — drilling nahi.' },
    ],
    memory:
      'Provider value change (new reference) saare consumers ko re-render karता — chahe wo us specific value ka part use na karein. Value object inline (value={{...}}) har render naya reference → consumers re-render. useMemo se value stable rakho.',
    notes: {
      concept: 'Context: createContext + Provider + useContext. Drilling skip.',
      tip: 'Value object ko useMemo se stable rakho (re-render kam).',
      warning: 'Value change → SAARE consumers re-render (performance).',
      error: 'Provider value inline object (value={{a,b}}) — har render naya, consumers re-render.',
    },
    compare: {
      headers: ['Feature', 'Props', 'Context'],
      rows: [
        ['Pass', 'Explicit (level by level)', 'Direct (skip levels)'],
        ['Best for', 'Local data', 'Global-ish data'],
        ['Re-render', 'Targeted', 'All consumers'],
        ['Setup', 'None', 'Provider + context'],
      ],
    },
    mistakes: [
      { bad: 'Inline value object in Provider.', fix: 'useMemo se stable value.' },
      { bad: 'Frequently-changing data Context mein.', fix: 'Split contexts ya state library.' },
    ],
    best: ['Theme/auth/locale → Context.', 'Value useMemo se stable.', 'Split contexts (alag concerns).', 'Frequently-changing → Zustand/Redux.', 'Default value de.'],
    performance:
      'Context value change saare consumers re-render karता (no selective subscription natively). Solutions: split contexts, useMemo value, ya use-context-selector / Zustand (selective re-render). Frequently-updating data Context ke liye bad.',
    interview: {
      beginner: [
        { q: 'Context API kya hai?', a: 'Data ko bina props drilling ke tree mein share karne ka tarika. createContext + Provider (value) + useContext (consume).' },
      ],
      intermediate: [
        { q: 'Context kab use karein?', a: 'Global-ish, rarely-changing data — theme, auth user, locale. Frequently-changing ya large state ke liye Redux/Zustand better.' },
        { q: 'Context + useReducer?', a: 'Reducer se predictable state + Context se tree-wide access = lightweight global state (Redux-lite) bina library.' },
      ],
      advanced: [
        { q: 'Context performance problem?', a: 'Value change saare consumers re-render karता (selective subscription nahi). Fix: split contexts, useMemo value, use-context-selector, ya Zustand/Jotai (selective).' },
      ],
    },
    mcqs: [
      { q: 'Consume context?', options: ['useState', 'useContext', 'useRef', 'useReducer'], answer: 1, explain: 'useContext.' },
      { q: 'Value change re-renders?', options: ['Provider', 'All consumers', 'Parent', 'None'], answer: 1, explain: 'Saare consumers.' },
    ],
    exercises: {
      easy: ['Theme context banao + consume.'],
      medium: ['Auth context with login/logout.'],
      advanced: ['Context + useReducer global state.'],
    },
    summary: [
      'Context = createContext + Provider + useContext.',
      'Props drilling skip karता.',
      'Value change → saare consumers re-render.',
      'Global-ish data; value useMemo se stable.',
    ],
    cheatsheet: [
      { h: 'Context', code: `const C=createContext()\n<C.Provider value={v}>...\nconst v=useContext(C)` },
    ],
    projects: ['Theme switcher', 'Auth provider', 'Language/locale', 'Cart context'],
    advanced:
      'Context splitting (state + dispatch alag). use-context-selector (selective re-render). Context + useReducer pattern. Server Components + context limitations. Zustand/Jotai context re-render avoid karte (external store + selectors).',
    quiz: [
      { q: 'Drilling solve?', options: ['useState', 'Context', 'useRef', 'props'], answer: 1, explain: 'Context API.' },
      { q: 'Best for Context?', options: ['Frequent data', 'Theme/auth', 'Animations', 'Local state'], answer: 1, explain: 'Rarely-changing global.' },
    ],
    related: ['props-drilling', 'usereducer', 'state-management'],
  },

  hoc: {
    overview:
      '**Higher-Order Component (HOC)** ek function hai jo ek component leता hai aur ek **naya enhanced component** return karता — shared logic ko wrap karne ka pattern (jaise withAuth, withLogger). Pre-hooks era mein logic reuse ka main tarika tha; ab **custom hooks** prefer hote, par HOCs abhi bhi (libraries) use hote.',
    why:
      'Legacy code + libraries (connect, withRouter) HOCs use karte. "HOC vs hooks" interview question. Patterns samajhna senior-level.',
    concept: [
      { h: 'HOC kya hai', p: 'Function jo component leता, enhanced component return karता. Cross-cutting logic (auth, logging, data) wrap karता.', code: `function withLogger(Component) {\n  return function (props) {\n    console.log('rendered', Component.name)\n    return <Component {...props} />\n  }\n}` },
      { h: 'Usage', p: 'HOC se component wrap karके enhanced version use karो.', code: `const EnhancedButton = withLogger(Button)\n// ya\nexport default withAuth(Dashboard)` },
      { h: 'Common HOCs', p: 'withAuth (auth check), withRouter (router props), connect (Redux), memo (React.memo bhi ek HOC-like).' },
      { h: 'HOC vs hooks', p: 'HOCs wrapper hell, prop collision, naming issues dete. Custom hooks cleaner (no nesting) — modern preferred. Par HOCs abhi bhi valid (cross-cutting rendering logic).' },
    ],
    analogy:
      'HOC ek **gift wrapper** hai — ek gift (component) ko leता, extra packaging (logic) add karता, naya wrapped gift deता. withAuth = gift par "VIP only" sticker. Bahut wrappers = wrapper hell (gift dhoondna mushkil). 🎁',
    syntax: { code: `function withX(Component) {\n  return function Enhanced(props) {\n    // extra logic\n    return <Component {...props} extra={...} />\n  }\n}\nconst Wrapped = withX(MyComponent)`, note: 'Props forward karो ({...props}); naam HOC se prefix.' },
    examples: [
      { level: 'Advanced', title: 'withAuth HOC', code: `function withAuth(Component) {\n  return function (props) {\n    const user = useUser()\n    if (!user) return <Login />\n    return <Component {...props} user={user} />\n  }\n}\nconst ProtectedDashboard = withAuth(Dashboard)`, explain: 'Auth logic ek jagah, multiple components wrap.' },
    ],
    notes: {
      concept: 'HOC = function(Component) → enhanced Component. Logic reuse.',
      tip: 'Props forward karो ({...props}); modern code custom hooks prefer.',
      warning: 'Wrapper hell, prop collision, ref forwarding issues.',
      error: 'Render ke andar HOC call (har render naya component → remount).',
    },
    compare: {
      headers: ['Pattern', 'Reuse', 'Issues'],
      rows: [
        ['HOC', 'Wrap component', 'Wrapper hell, props collision'],
        ['Render props', 'Function child', 'Nesting (callback hell)'],
        ['Custom hooks', 'Stateful logic', 'Modern, cleanest'],
      ],
    },
    mistakes: [
      { bad: 'Render mein HOC apply.', fix: 'Component level par (outside render).' },
      { bad: 'Props forward na karna.', fix: '{...props} pass karो.' },
    ],
    best: ['Naye code mein custom hooks prefer.', 'HOC props forward + displayName set.', 'Cross-cutting rendering logic → HOC OK.', 'ref forwarding handle.'],
    performance:
      'HOC extra component layer add karता (tree deeper, thoda overhead). Wrapper components extra re-renders ho sakte. Custom hooks no extra component (lighter). Profiler se check.',
    interview: {
      advanced: [
        { q: 'HOC kya hai?', a: 'Ek function jo component leता aur enhanced component return karता — shared/cross-cutting logic (auth, logging) reuse karne ka pattern.' },
        { q: 'HOC vs custom hooks?', a: 'HOCs wrapper hell, prop collision, ref issues dete. Custom hooks cleaner (no nesting, no wrapper) — modern preferred. HOCs legacy/libraries (connect) mein abhi bhi.' },
        { q: 'HOC ke problems?', a: 'Wrapper hell (deep nesting), prop name collisions, ref forwarding (forwardRef chahiye), static methods copy, aur debugging (displayName).' },
      ],
    },
    mcqs: [
      { q: 'HOC returns?', options: ['Value', 'Component', 'Hook', 'Element'], answer: 1, explain: 'Enhanced component.' },
      { q: 'Modern alternative?', options: ['Render props', 'Custom hooks', 'Mixins', 'Globals'], answer: 1, explain: 'Custom hooks.' },
    ],
    exercises: {
      easy: ['withLogger HOC banao.'],
      medium: ['withAuth HOC banao.'],
      advanced: ['Same logic HOC aur custom hook dono se likho, compare.'],
    },
    summary: [
      'HOC = function(Component) → enhanced Component.',
      'Logic reuse (auth, logging).',
      'Wrapper hell/prop collision issues.',
      'Modern: custom hooks prefer.',
    ],
    cheatsheet: [
      { h: 'HOC', code: `const withX=Comp=>props=>\n  <Comp {...props} extra/>\nwithX(MyComp)` },
    ],
    projects: ['withAuth', 'withLoading', 'withErrorBoundary'],
    advanced:
      'forwardRef in HOCs. Static hoisting (hoist-non-react-statics). Compose multiple HOCs (compose(withA, withB)). connect (Redux) classic HOC. Custom hooks ne mostly replace kiya.',
    quiz: [
      { q: 'HOC input?', options: ['Props', 'Component', 'Hook', 'State'], answer: 1, explain: 'Component.' },
      { q: 'HOC issue?', options: ['Fast', 'Wrapper hell', 'No reuse', 'No props'], answer: 1, explain: 'Wrapper hell/collisions.' },
    ],
    related: ['render-props', 'custom-hooks', 'compound-components'],
  },

  'render-props': {
    overview:
      '**Render Props** ek pattern hai jisme component ek **function as a prop** (often children) leता hai jo batati hai kya render karna — taaki component apni state/logic us function ko de sake. Logic reuse ka pre-hooks pattern. Ab **custom hooks** prefer, par concept (function as child) abhi useful.',
    why:
      'Legacy code + libraries (Formik render prop, React Router old) use karte. "Render props vs HOC vs hooks" interview question.',
    concept: [
      { h: 'Render prop kya hai', p: 'Component ko ek function prop deते jo render karne ka tarika batati. Component apna state us function ko deता.', code: `<DataProvider render={(data) => <List items={data} />} />` },
      { h: 'Function as children', p: 'Common form — children ek function hota.', code: `<Mouse>\n  {({ x, y }) => <p>{x}, {y}</p>}\n</Mouse>` },
      { h: 'Implementation', p: 'Component apna state calculate karता, children/render function ko pass karता.', code: `function Mouse({ children }) {\n  const [pos, setPos] = useState({ x: 0, y: 0 })\n  return <div onMouseMove={e => setPos({x:e.clientX,y:e.clientY})}>\n    {children(pos)}\n  </div>\n}` },
      { h: 'vs hooks', p: 'Render props nesting (callback hell-jaisा) dete. Custom hooks flat + cleaner — modern preferred.' },
    ],
    analogy:
      'Render prop ek **"main data deता hoon, tum decide karo kaise dikhाना"** deal hai. Jaise ek chef (component) ingredients (state) deता, par dish (UI) tum (render function) banाते. Flexible, par bahut nesting = confusing. 👨‍🍳',
    syntax: { code: `// Render prop\n<Comp render={(state) => <UI {...state} />} />\n// Function as children\n<Comp>{(state) => <UI {...state} />}</Comp>`, note: 'children/render ek function — component state deता.' },
    examples: [
      { level: 'Advanced', title: 'Mouse tracker', code: `function MouseTracker({ children }) {\n  const [pos, setPos] = useState({ x: 0, y: 0 })\n  return (\n    <div onMouseMove={e => setPos({ x: e.clientX, y: e.clientY })}>\n      {children(pos)}\n    </div>\n  )\n}\n// Use\n<MouseTracker>\n  {({ x, y }) => <p>Mouse: {x}, {y}</p>}\n</MouseTracker>`, explain: 'Logic (mouse pos) shared, rendering caller decide karता.' },
    ],
    notes: {
      concept: 'Render props = function-as-prop deता render control.',
      tip: 'Function as children common; modern code custom hooks.',
      warning: 'Nesting (callback pyramid) deता multiple render props se.',
      error: 'Render prop function inline (har render naya) — memoized children break.',
    },
    compare: {
      headers: ['Pattern', 'Mechanism', 'Modern?'],
      rows: [
        ['Render props', 'Function as prop/child', 'Older'],
        ['HOC', 'Wrap component', 'Older'],
        ['Custom hooks', 'use* function', 'Preferred'],
      ],
    },
    mistakes: [
      { bad: 'Multiple nested render props.', fix: 'Custom hooks (flat).' },
      { bad: 'Inline render function har render.', fix: 'useCallback ya hook.' },
    ],
    best: ['Naye code mein custom hooks.', 'Render props for flexible UI control.', 'Function as children pattern.', 'Avoid deep nesting.'],
    performance:
      'Inline render functions har render naya — wrapped children re-render. Render props extra render layer. Custom hooks no extra component (lighter). Memoize render functions jab zaroori.',
    interview: {
      advanced: [
        { q: 'Render props kya hai?', a: 'Component ek function prop (often children) leता jo batati kya render karna — component apni state/logic us function ko deता. Logic reuse pattern.' },
        { q: 'Render props vs HOC vs hooks?', a: 'Sab logic reuse karte. HOC wrap karता (wrapper hell). Render props nesting (callback pyramid). Custom hooks flat + cleanest — modern preferred.' },
      ],
    },
    mcqs: [
      { q: 'Render prop is a?', options: ['String', 'Function', 'Object', 'Component'], answer: 1, explain: 'Function as prop.' },
      { q: 'Modern alternative?', options: ['HOC', 'Custom hooks', 'Mixins', 'Classes'], answer: 1, explain: 'Custom hooks.' },
    ],
    exercises: {
      easy: ['Function-as-children component banao.'],
      medium: ['Mouse tracker render prop banao.'],
      advanced: ['Render prop ko custom hook mein convert karो.'],
    },
    summary: [
      'Render props = function-as-prop for render control.',
      'Function as children common form.',
      'Logic reuse (pre-hooks).',
      'Custom hooks modern alternative.',
    ],
    cheatsheet: [
      { h: 'Render prop', code: `<Comp>{state=><UI {...state}/>}</Comp>` },
    ],
    projects: ['Mouse tracker', 'Data fetcher (render prop)', 'Toggle component'],
    advanced:
      'Render props + TypeScript generics. Compound components often better for related UI. Hooks ne render props/HOC mostly replace kiya. Some libraries still expose render prop API (Formik, Downshift).',
    quiz: [
      { q: 'Render prop control?', options: ['State', 'Rendering', 'Routing', 'Styling'], answer: 1, explain: 'What to render.' },
      { q: 'Nesting issue?', options: ['HOC', 'Render props', 'Hooks', 'Context'], answer: 1, explain: 'Callback pyramid.' },
    ],
    related: ['hoc', 'custom-hooks', 'compound-components'],
  },

  'compound-components': {
    overview:
      '**Compound Components** ek pattern hai jisme multiple components milkar ek flexible feature banाते (jaise `<Tabs>`, `<Tabs.Tab>`) — shared implicit state (Context) share karte. Consumer flexible markup likh sakता. **Controlled pattern** se parent component ki state bahar se control hoti.',
    why:
      'Reusable, flexible component APIs (UI libraries) ka senior pattern. "Compound components kya" advanced interview question.',
    concept: [
      { h: 'Compound components', p: 'Parent + child components ek feature, implicit shared state (Context). Consumer markup flexibly arrange kar sakता.', code: `<Tabs defaultActive={0}>\n  <Tabs.List>\n    <Tabs.Tab>One</Tabs.Tab>\n    <Tabs.Tab>Two</Tabs.Tab>\n  </Tabs.List>\n  <Tabs.Panel>Content 1</Tabs.Panel>\n</Tabs>` },
      { h: 'Shared state via Context', p: 'Parent (Tabs) Context se state (active index) provide karता; children consume.', code: `const TabsContext = createContext()\nfunction Tabs({ children }) {\n  const [active, setActive] = useState(0)\n  return <TabsContext.Provider value={{active, setActive}}>{children}</TabsContext.Provider>\n}` },
      { h: 'Controlled pattern', p: 'Component ki state parent control kare (value + onChange props) — flexible.', code: `<Tabs active={active} onChange={setActive}>...</Tabs>` },
      { h: 'Fayda', p: 'Flexible markup, no prop explosion, clear API, separation of concerns. React Router, Reach UI, Radix use karte.' },
    ],
    analogy:
      'Compound components ek **TV remote set** jaise hain — TV (parent), buttons (children) alag, par sab ek system (shared state) se kaam karte. Tum buttons ko apni marzi se arrange kar sakte (flexible), par sab same TV control karte. 📺',
    syntax: { code: `function Tabs({ children }) {\n  const [active, setActive] = useState(0)\n  return <Ctx.Provider value={{active,setActive}}>{children}</Ctx.Provider>\n}\nTabs.Tab = function Tab({ index, children }) {\n  const { active, setActive } = useContext(Ctx)\n  return <button onClick={() => setActive(index)}>{children}</button>\n}`, note: 'Parent.Child = ... se sub-components attach.' },
    examples: [
      { level: 'Advanced', title: 'Tabs compound', code: `const TabCtx = createContext()\nfunction Tabs({ children, defaultIndex = 0 }) {\n  const [active, setActive] = useState(defaultIndex)\n  return <TabCtx.Provider value={{ active, setActive }}>{children}</TabCtx.Provider>\n}\nTabs.Tab = ({ index, children }) => {\n  const { active, setActive } = useContext(TabCtx)\n  return <button className={active === index ? 'on' : ''} onClick={() => setActive(index)}>{children}</button>\n}\nTabs.Panel = ({ index, children }) => {\n  const { active } = useContext(TabCtx)\n  return active === index ? <div>{children}</div> : null\n}`, explain: 'Tabs/Tab/Panel shared context se — flexible API.' },
    ],
    notes: {
      concept: 'Compound = parent + children, shared implicit state (Context).',
      tip: 'Parent.Child syntax + Context for state share.',
      warning: 'Children directly bahar use (without parent) Context error.',
      error: 'Prop drilling between compound parts — Context use karो.',
    },
    compare: {
      headers: ['Pattern', 'Flexibility', 'State'],
      rows: [
        ['Props (monolithic)', 'Kam (prop explosion)', 'Internal'],
        ['Compound', 'Zyada (flexible markup)', 'Shared (Context)'],
        ['Controlled', 'Parent controls', 'External'],
      ],
    },
    mistakes: [
      { bad: 'Compound parts ke beech prop drilling.', fix: 'Context se shared state.' },
      { bad: 'Child bina parent use.', fix: 'Context default ya error guard.' },
    ],
    best: ['Related UI → compound components.', 'Shared state Context se.', 'Controlled + uncontrolled dono support.', 'Parent.Child syntax.', 'Flexible markup allow.'],
    performance:
      'Context-based compound: parent state change saare parts re-render. Heavy parts memoize. Compound components flexible par Context re-render dhyan (split if needed).',
    interview: {
      advanced: [
        { q: 'Compound components kya hain?', a: 'Multiple components jo milkar ek feature banाते (Tabs, Tabs.Tab) aur implicit shared state (Context) share karte. Consumer flexible markup likh sakता.' },
        { q: 'Compound components ka fayda?', a: 'Flexible markup, no prop explosion, clear API, separation of concerns. UI libraries (Radix, Reach) use karti.' },
        { q: 'Controlled vs uncontrolled component pattern?', a: 'Controlled: state parent control kare (value + onChange). Uncontrolled: component apni state rakhe (defaultValue). Achhe components dono support karte.' },
      ],
    },
    mcqs: [
      { q: 'Compound share state via?', options: ['Props', 'Context', 'Refs', 'Globals'], answer: 1, explain: 'Context (implicit).' },
      { q: 'Compound benefit?', options: ['Less code', 'Flexible API', 'Faster', 'No state'], answer: 1, explain: 'Flexible markup/API.' },
    ],
    exercises: {
      easy: ['Parent.Child syntax try karो.'],
      medium: ['Simple Tabs compound banao.'],
      advanced: ['Controlled + uncontrolled Tabs banao.'],
    },
    summary: [
      'Compound = parent + children, shared Context state.',
      'Flexible markup, clear API.',
      'Controlled pattern = parent controls state.',
      'UI libraries ka common pattern.',
    ],
    cheatsheet: [
      { h: 'Compound', code: `<Tabs>\n <Tabs.Tab/>\n <Tabs.Panel/>\n</Tabs>\n// Context for shared state` },
    ],
    projects: ['Tabs', 'Accordion', 'Menu/Dropdown', 'Modal', 'Select'],
    advanced:
      'Flexible compound (React.Children, cloneElement — older). Context-based (modern). Controlled + uncontrolled (useControllableState). Slot patterns. Radix/Headless UI primitives. State reducer pattern (Kent Dodds).',
    quiz: [
      { q: 'Compound example?', options: ['useState', '<Tabs.Tab>', 'props', 'HOC'], answer: 1, explain: 'Parent.Child compound.' },
      { q: 'Controlled state?', options: ['Internal', 'Parent (value+onChange)', 'Ref', 'Context'], answer: 1, explain: 'Parent controls.' },
    ],
    related: ['context-api', 'hoc', 'render-props'],
  },
}
