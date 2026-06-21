// React content — Part 6: Senior internals, SSR, Interview & Projects

export const reactContentF = {
  'fiber-deep': {
    overview:
      'Senior-level Fiber: har **fiber node** ek JS object hai (type, key, stateNode, child/sibling/return links, memoizedState, pendingProps, **alternate**). **Alternate tree** = current ↔ work-in-progress link (double buffering). **Child reconciliation** keys/types se fibers reuse ya recreate karता. Yeh React ke render engine ka deepest layer hai.',
    why:
      'Senior React interviews mein Fiber internals (alternate, reconciliation steps) deeply poochते hain. "React internally kaise" ka ultimate answer.',
    concept: [
      { h: 'Fiber node structure', p: 'Har element/component ek fiber: type, key, stateNode (DOM/instance), child/sibling/return (tree links), pendingProps/memoizedProps, memoizedState (hooks), flags (effects), alternate.', code: `{ type, key, stateNode,\n  child, sibling, return,\n  pendingProps, memoizedProps,\n  memoizedState, flags, alternate }` },
      { h: 'Alternate tree (double buffering)', p: 'current fiber (screen) aur WIP fiber (naya) ek doosre se alternate pointer se linked. React WIP par kaam karता, commit par swap — current ban jaता.', code: `fiber.alternate // current ↔ WIP\n// commit: root.current = workInProgressRoot` },
      { h: 'Child reconciliation', p: 'React parent ke children (new elements) ko current children (fibers) se match karта — single child, keyed lists, arrays. Same key+type → fiber reuse (alternate), warna create/delete.' },
      { h: 'Effects & flags', p: 'Render phase har fiber par flags set karта (Placement, Update, Deletion). Commit phase in flags ko traverse karके DOM mutate karता (effect list).' },
    ],
    analogy:
      'Fiber nodes ek **company org chart** hain — har employee (fiber) ke boss (return), pehla junior (child), aur colleague (sibling) ka link. Alternate = har employee ka "shadow/backup" (current ↔ WIP). Reconciliation = naye org structure ko purane se compare karке kaun rahega/jaayega decide. 🏢',
    syntax: { code: `// Fiber traversal (conceptual)\nfunction workLoop() {\n  while (workInProgress) {\n    workInProgress = performUnitOfWork(workInProgress)\n  }\n}\n// child → sibling → return (depth-first)`, note: 'Fiber internal — samajhna for senior interviews.' },
    steps: [
      'Update → WIP tree banна shuru (root se).',
      'beginWork: fiber process (reconcile children, create/reuse child fibers).',
      'Depth-first: child → child... phir sibling → return.',
      'completeWork: fiber complete, effects (flags) collect.',
      'Pura WIP ready → commit (flags traverse, DOM mutate, swap current).',
    ],
    visual: {
      type: 'tree',
      root: 'FiberRoot',
      children: [
        { label: 'App', sub: 'current ↔ alternate (WIP)', children: [{ label: 'child fiber', sub: 'sibling links' }] },
      ],
    },
    internals:
      'Fiber tree depth-first traverse hota: beginWork (top-down, reconcile) → completeWork (bottom-up, effects collect). Alternate se WIP current fibers reuse karता (bailout if no change). Effect list (linked) commit phase mein process. Hooks fiber.memoizedState par linked list (order matters). flags bitmask (Placement/Update/Deletion).',
    memory:
      'Do fiber trees (current + WIP) — WIP current ke alternate fibers reuse karता jahan possible (memory efficient). Commit ke baad WIP current ban jaता, purana current alternate. Garbage: discarded WIP fibers (interrupted renders). Hooks state alternate fibers ke beech carry.',
    notes: {
      concept: 'Fiber node = type/links/state/alternate. WIP ↔ current double buffering.',
      tip: 'beginWork (reconcile) → completeWork (effects) → commit.',
      warning: 'Alternate fibers reuse — render pure hona zaroori (interruptible).',
      error: 'Hooks order change (conditional hooks) — fiber memoizedState mismatch.',
    },
    compare: {
      headers: ['Tree', 'Role'],
      rows: [
        ['current', 'Abhi screen par'],
        ['WIP (alternate)', 'Naya being built'],
        ['Commit', 'WIP → current swap'],
      ],
    },
    mistakes: [
      { bad: 'Conditional hooks (order change).', fix: 'Top-level hooks (fiber state order).' },
      { bad: 'Render impure (interrupt unsafe).', fix: 'Pure render (effects mein side-effects).' },
    ],
    best: ['Pure render (interruptible/alternate-safe).', 'Top-level hooks (consistent order).', 'Keys for child reconciliation.', 'Memoize to enable bailout.'],
    performance:
      'Bailout (alternate same props/state → subtree skip) wasted work bachаता. Keys + memo se fiber reuse. Interruptible work loop (yield to browser) jank-free. Effect list commit synchronous — heavy DOM jank.',
    interview: {
      advanced: [
        { q: 'Fiber node mein kya hota?', a: 'type, key, stateNode (DOM/instance), child/sibling/return (tree links), pendingProps/memoizedProps, memoizedState (hooks linked list), flags (effects), aur alternate (current↔WIP link).' },
        { q: 'Alternate tree kya hai?', a: 'Double buffering — current fiber (screen) aur WIP fiber ek doosre se alternate pointer se linked. React WIP par kaam karता, commit par swap (WIP current ban jaता). Fibers reuse hote.' },
        { q: 'Child reconciliation kaise?', a: 'React new children ko current child fibers se match karता (single/keyed/array). Same key+type → fiber reuse (alternate clone), warna create (Placement) / delete (Deletion) flags.' },
        { q: 'beginWork vs completeWork?', a: 'beginWork: top-down, fiber process + children reconcile (WIP banाना). completeWork: bottom-up, fiber complete + effects (flags) collect. Phir commit phase.' },
      ],
    },
    mcqs: [
      { q: 'Double buffering?', options: ['Two states', 'current+WIP (alternate)', 'Cache', 'Two DOMs'], answer: 1, explain: 'current ↔ WIP via alternate.' },
      { q: 'Hooks stored on?', options: ['Component', 'fiber.memoizedState', 'Context', 'DOM'], answer: 1, explain: 'Fiber memoizedState linked list.' },
    ],
    exercises: {
      easy: ['Fiber node ke fields likho.'],
      medium: ['Alternate tree samjhao.'],
      advanced: ['beginWork → completeWork → commit flow trace karो.'],
    },
    summary: [
      'Fiber node = type/links/state/flags/alternate.',
      'Alternate = current ↔ WIP (double buffering).',
      'Child reconciliation: key+type se reuse/recreate.',
      'beginWork → completeWork → commit.',
    ],
    cheatsheet: [
      { h: 'Fiber', code: `node: type, child, sibling, return,\n  memoizedState, flags, alternate\nbeginWork→completeWork→commit` },
    ],
    projects: ['Fiber diagram', 'Reconciliation trace'],
    advanced:
      'Bailout optimization (oldProps === newProps → skip). Lanes on fibers (priority). Effect list (firstEffect/lastEffect — older) / subtreeFlags (newer). react-reconciler (custom renderers). Hooks dispatcher per phase. Suspense fibers (offscreen).',
    quiz: [
      { q: 'Traversal order?', options: ['BFS', 'child→sibling→return', 'Random', 'sibling first'], answer: 1, explain: 'Depth-first via links.' },
      { q: 'Bailout?', options: ['Always render', 'Skip if no change', 'Force update', 'Remount'], answer: 1, explain: 'Same props/state → skip.' },
    ],
    related: ['fiber', 'reconciliation', 'scheduler-lanes'],
  },

  'scheduler-lanes': {
    overview:
      'React ka **Scheduler** (separate package) kaam ko **priority** ke hisaab se schedule karता aur browser ko **time-slicing** se control deता (long tasks na ho). **Lane model** (31-bit bitmask) updates ki priorities represent karता — SyncLane (urgent), InputContinuous, Transition, Idle. Higher-priority lower ko **interrupt** kar sakta.',
    why:
      'Concurrent rendering ka deepest layer. Scheduler, lanes, priority, interruptible rendering senior interview ka peak topic.',
    concept: [
      { h: 'Scheduler', p: 'React ka internal scheduler (cooperative). Kaam ko chunks mein todता, har ~5ms ke baad browser ko yield (MessageChannel) — main thread block nahi.', code: `// Conceptual\nwhile (work && !shouldYield()) {\n  work = performUnitOfWork(work)\n}\n// shouldYield → time slice over` },
      { h: 'Priorities', p: 'Levels: Immediate (sync), UserBlocking (clicks/input), Normal, Low, Idle. Updates ko priority milti — urgent pehle.' },
      { h: 'Lane model', p: 'Lanes = 31-bit bitmask, har bit ek priority lane. Multiple updates different lanes mein, batch + priority se process. Bitwise operations fast.', code: `// SyncLane, InputContinuousLane,\n// DefaultLane, TransitionLanes, IdleLane` },
      { h: 'Interruptible rendering', p: 'Low-priority render chal raha + urgent aaye → React low pause/discard, urgent render+commit, phir low restart. UI responsive.' },
    ],
    analogy:
      'Scheduler ek **hospital triage** hai — har patient (update) ko priority (lane) milti. Heart attack (urgent click) pehle, routine checkup (transition) baad mein. Time-slicing = doctor har patient ko thoda time deता phir agle urgent ko check (kisi ek mein atak nahi jaता). 🏥',
    syntax: { code: `// Lanes (priorities)\nSyncLane              // urgent (discrete)\nInputContinuousLane   // continuous (drag)\nDefaultLane           // normal\nTransitionLanes       // useTransition\nIdleLane              // lowest`, note: 'Lanes internal — bitmask se priority + batching.' },
    steps: [
      'Update → priority (lane) assign (event type/context se).',
      'Scheduler highest-priority lane pehle schedule.',
      'Render fiber-by-fiber, shouldYield check har chunk.',
      'Higher-priority update aaye → current low-priority render interrupt/restart.',
      'Render complete → commit (synchronous).',
    ],
    internals:
      'Scheduler MessageChannel se macrotask schedule karता (5ms slices) — setTimeout se behtar (no 4ms clamp). Lanes bitmask: getHighestPriorityLane, mergeLanes (batch). Updates fiber par lane mark hote. Render lane-by-lane. Starvation avoid: low-priority lanes expire ho kar sync ho jaati (entanglement). Suspense, transitions specific lanes.',
    memory:
      'Interrupted renders ka WIP discard/restart (extra work). Multiple lanes ka state track. Time-slicing chunks ke beech main thread free (browser paint/events). Expired lanes sync flush (starvation prevention).',
    notes: {
      concept: 'Scheduler (time-slicing) + lanes (priority bitmask) = concurrent.',
      tip: 'useTransition transition lane (low); clicks urgent lane.',
      warning: 'Render interruptible — pure render zaroori.',
      error: 'Urgent updates ko low-priority (transition) wrap karna — lag.',
    },
    compare: {
      headers: ['Priority', 'Lane', 'Example'],
      rows: [
        ['Highest', 'SyncLane', 'Discrete clicks'],
        ['High', 'InputContinuous', 'Drag/scroll'],
        ['Normal', 'DefaultLane', 'Regular updates'],
        ['Low', 'TransitionLanes', 'useTransition'],
        ['Lowest', 'IdleLane', 'Offscreen'],
      ],
    },
    mistakes: [
      { bad: 'Urgent input in transition.', fix: 'Urgent updates default; heavy result transition.' },
      { bad: 'Impure render (interrupt unsafe).', fix: 'Pure render.' },
    ],
    best: ['useTransition for non-urgent.', 'Urgent (input) default lane.', 'Pure render (interruptible-safe).', 'createRoot (concurrent).'],
    performance:
      'Time-slicing long renders ko chunks mein todता (no main-thread block, INP better). Priority se urgent updates responsive. Lanes batching efficient. Starvation prevention (lane expiration). Net: smooth, responsive UI even with heavy work.',
    interview: {
      advanced: [
        { q: 'React Scheduler kya hai?', a: 'Internal cooperative scheduler jo kaam ko priority + time-slicing se schedule karता — har ~5ms ke baad browser ko yield (MessageChannel) taaki main thread block na ho.' },
        { q: 'Lane model kya hai?', a: '31-bit bitmask jahan har bit ek priority lane (SyncLane, TransitionLanes, IdleLane). Updates ko lanes milti; React highest-priority lane pehle process karता, bitwise se batch/compare.' },
        { q: 'Interruptible rendering kaise?', a: 'Render fiber-by-fiber chalता; har chunk shouldYield check karता. Higher-priority update aaye to current low-priority render pause/discard, urgent render+commit, phir low restart.' },
        { q: 'Starvation kaise prevent?', a: 'Low-priority lanes ka expiration time hota — bahut wait karein to sync (urgent) ho jaati, taaki kabhi process ho. Lane entanglement consistency.' },
      ],
    },
    mcqs: [
      { q: 'Priority model?', options: ['Queue', 'Lanes (bitmask)', 'Stack', 'Tree'], answer: 1, explain: 'Lanes.' },
      { q: 'Scheduler yields via?', options: ['setTimeout', 'MessageChannel', 'Promise', 'rAF'], answer: 1, explain: 'MessageChannel (5ms).' },
    ],
    exercises: {
      easy: ['Lanes ka concept likho.'],
      medium: ['Priority levels list karो.'],
      advanced: ['Interruptible rendering flow explain karो.'],
    },
    summary: [
      'Scheduler: time-slicing + priority (yield to browser).',
      'Lanes: 31-bit priority bitmask.',
      'Urgent interrupts non-urgent (interruptible).',
      'Starvation prevention (lane expiration).',
    ],
    cheatsheet: [
      { h: 'Lanes', code: `SyncLane > InputContinuous\n> Default > Transition > Idle\ntime-slice ~5ms` },
    ],
    projects: ['Concurrent demo', 'Priority visualization'],
    advanced:
      'Lane entanglement. Render expiration (starvation). Suspense lanes (retry). Offscreen (prerender). Transition tracing. React 19 (actions, useOptimistic) lanes par. Scheduler isolated package (reusable).',
    quiz: [
      { q: 'Highest lane?', options: ['Idle', 'SyncLane', 'Transition', 'Default'], answer: 1, explain: 'SyncLane (urgent).' },
      { q: 'Time-slice?', options: ['~5ms', '~50ms', '~1s', 'No limit'], answer: 0, explain: '~5ms chunks.' },
    ],
    related: ['concurrent', 'fiber-deep', 'advanced-hooks'],
  },

  'server-components': {
    overview:
      '**React Server Components (RSC)** server par render hote — **zero client JS** (bundle chhota), server resources (DB, fs) directly access. **Streaming** se HTML chunks progressively bheje jaate (fast first paint). Client Components ("use client") interactive. **Hydration** server HTML ko client par interactive banाता. Next.js App Router RSC use karता.',
    why:
      'RSC + streaming React ka future (Next.js). Server vs client components, hydration senior interview ke cutting-edge topics.',
    concept: [
      { h: 'Server Components', p: 'Server par render, client JS mein nahi jaate (zero bundle). Async (DB/API directly). No hooks/state/events (static).', code: `// Server Component (default in App Router)\nasync function Page() {\n  const data = await db.query(...) // direct DB!\n  return <div>{data.title}</div>\n}` },
      { h: 'Client Components', p: '"use client" directive — interactive (hooks, state, events). Browser par hydrate hote.', code: `'use client'\nfunction Counter() {\n  const [n, setN] = useState(0)\n  return <button onClick={() => setN(n+1)}>{n}</button>\n}` },
      { h: 'Streaming', p: 'Server HTML ko chunks mein progressively bhejता (Suspense boundaries) — user ko jaldi content, slow parts baad mein.', code: `<Suspense fallback={<Skeleton />}>\n  <SlowComponent /> {/* streams when ready */}\n</Suspense>` },
      { h: 'RSC benefits', p: 'Chhota bundle (server code client mein nahi), direct backend access, better SEO/performance, secrets safe. Client components sirf interactivity ke liye.' },
    ],
    analogy:
      'Server Components ek **ready-made dish** (kitchen/server mein bani) — plate par aati, customer ko banाni nahi padti (no client JS). Client Components = "self-serve sauce" (interactive — customer khud daalता). Streaming = courses ek-ek karके aana (starter pehle, main baad mein) — wait kam. 🍽️',
    syntax: { code: `// Server (default)\nasync function Page() {\n  const data = await getData()\n  return <Article data={data} />\n}\n// Client\n'use client'\nfunction Button() { /* hooks, events */ }`, note: 'Server default (App Router); "use client" interactivity ke liye.' },
    steps: [
      'Server component render (server par, async data fetch).',
      'HTML stream client ko bheja (progressive, Suspense chunks).',
      'Client components ke liye JS bheja.',
      'Hydration: client HTML ko interactive banाता (event listeners attach).',
      'Selective/progressive hydration — visible/urgent parts pehle.',
    ],
    notes: {
      concept: 'RSC server-rendered (zero client JS); Client Components interactive.',
      tip: 'Server default; "use client" sirf interactivity par.',
      warning: 'Server Components mein hooks/state/events nahi (static).',
      error: 'Server Component mein useState/onClick (error) — client component banाओ.',
    },
    compare: {
      headers: ['Feature', 'Server Component', 'Client Component'],
      rows: [
        ['Renders', 'Server', 'Server (SSR) + client'],
        ['Client JS', 'Zero', 'Shipped'],
        ['Hooks/state', 'Nahi', 'Haan'],
        ['Data access', 'Direct (DB/fs)', 'Via API'],
        ['Directive', 'Default', '"use client"'],
      ],
    },
    mistakes: [
      { bad: 'Server Component mein hooks/events.', fix: '"use client" component.' },
      { bad: 'Sab "use client".', fix: 'Server default; client sirf interactive parts.' },
    ],
    best: ['Server Components default (chhota bundle).', '"use client" sirf interactivity.', 'Suspense for streaming.', 'Data fetch server par.', 'Client islands minimal.'],
    performance:
      'RSC client bundle drastically kam karता (server code ship nahi hota). Streaming first paint fast (progressive). Direct data access (no API round-trip waterfall). Selective hydration interactive jaldi. Net: faster loads + less JS.',
    interview: {
      advanced: [
        { q: 'React Server Components kya hain?', a: 'Server par render hone wale components jo client JS mein nahi jaate (zero bundle), server resources (DB/fs) directly access kar sakte. Async, no hooks/state. Bundle chhota + fast.' },
        { q: 'Server vs Client Components?', a: 'Server (default): server-rendered, zero client JS, direct data, no interactivity. Client ("use client"): hooks/state/events, browser hydrate. Server default rakho, client sirf interactive islands.' },
        { q: 'Streaming kya hai?', a: 'Server HTML ko chunks mein progressively bhejna (Suspense boundaries) — user ko ready content jaldi, slow parts (data-heavy) baad mein stream. First paint fast.' },
      ],
    },
    mcqs: [
      { q: 'RSC client JS?', options: ['Heavy', 'Zero', 'Medium', 'Same'], answer: 1, explain: 'Server components zero client JS.' },
      { q: 'Interactivity directive?', options: ['"use server"', '"use client"', '"use state"', 'none'], answer: 1, explain: '"use client".' },
    ],
    exercises: {
      easy: ['Server vs client component fark likho.'],
      medium: ['Kaunsा component server/client decide karो (examples).'],
      advanced: ['Streaming + Suspense flow explain karो.'],
    },
    summary: [
      'RSC = server-rendered, zero client JS, direct data.',
      'Client Components ("use client") = interactive.',
      'Streaming = progressive HTML chunks (Suspense).',
      'Chhota bundle + fast first paint.',
    ],
    cheatsheet: [
      { h: 'RSC', code: `// server (default, async)\nasync function Page(){const d=await db()}\n'use client' // interactive` },
    ],
    projects: ['Next.js App Router app', 'Streaming dashboard', 'Server data page'],
    advanced:
      'RSC payload (serialized component tree). Server Actions (mutations on server). Suspense + streaming SSR. Selective hydration. Islands architecture. RSC + client component boundaries (serialization rules). Next.js/Remix.',
    quiz: [
      { q: 'Server Component hooks?', options: ['Yes', 'No', 'Some', 'useState only'], answer: 1, explain: 'No hooks (static).' },
      { q: 'Streaming uses?', options: ['useEffect', 'Suspense', 'memo', 'Context'], answer: 1, explain: 'Suspense boundaries.' },
    ],
    related: ['hydration', 'lazy-suspense', 'spa-vs-mpa'],
  },

  hydration: {
    overview:
      '**Hydration** wo process hai jisse server-rendered (SSR) **static HTML** ko client par **interactive** banाता — React event listeners attach karता aur DOM ko apne VDOM se "claim" karता. **Selective/Progressive Hydration** (React 18) sirf zaroori/visible parts pehle hydrate karता (Suspense + streaming ke saath). Bina hydration SSR HTML "dead" hota.',
    why:
      'SSR/Next.js mein hydration core. Hydration errors common bug. Selective hydration React 18 advanced — senior interview.',
    concept: [
      { h: 'Hydration kya hai', p: 'Server ne HTML bheja (fast paint, SEO). Client par React us HTML ko leता, VDOM se match karता, event listeners attach — ab interactive.', code: `// Client\nimport { hydrateRoot } from 'react-dom/client'\nhydrateRoot(document.getElementById('root'), <App />)` },
      { h: 'Why SSR + hydration', p: 'SSR fast first paint + SEO (HTML ready). Hydration interactivity laता. Best of server (fast/SEO) + client (interactive).' },
      { h: 'Hydration mismatch', p: 'Server aur client ka rendered HTML alag ho (Date.now, random, browser-only API) → hydration error/warning. Server-client output same hona chahiye.', code: `// ❌ mismatch\n<p>{Date.now()}</p> // server ≠ client\n// ✅ useEffect for client-only` },
      { h: 'Selective/Progressive hydration', p: 'React 18 + Suspense: saara ek saath nahi, parts independently hydrate (visible/interacted pehle). User jaldi interact kar sakता.' },
    ],
    analogy:
      'Hydration ek **photo ko zinda karna** jaisा hai. Server ek photo (static HTML) bhejता — dikhता to hai par hilता-dulта nahi. Hydration "jaan daalना" — buttons clickable, inputs typeable. Selective hydration = pehle wo hisse zinda karो jisse user pehle interact karega. 🖼️',
    syntax: { code: `// SSR client entry\nimport { hydrateRoot } from 'react-dom/client'\nhydrateRoot(container, <App />)\n// vs CSR\ncreateRoot(container).render(<App />)`, note: 'hydrateRoot (SSR) existing HTML claim; createRoot (CSR) fresh.' },
    steps: [
      'Server React ko HTML string mein render (renderToString/Pipeable).',
      'HTML browser ko (fast paint + SEO).',
      'Client JS load, hydrateRoot(<App />).',
      'React HTML ko VDOM se match, event listeners attach.',
      'Selective: Suspense boundaries independently hydrate (priority).',
    ],
    notes: {
      concept: 'Hydration = SSR HTML ko interactive banाना (listeners attach).',
      tip: 'Server-client output same rakho (no mismatch).',
      warning: 'Hydration mismatch (Date/random/window) — warning + re-render.',
      error: 'createRoot SSR HTML par (re-creates, slow + flicker) — hydrateRoot use karो.',
    },
    compare: {
      headers: ['Method', 'HTML', 'Interactivity'],
      rows: [
        ['CSR (createRoot)', 'Empty → JS fills', 'After JS'],
        ['SSR + hydration', 'Server HTML', 'After hydrate'],
        ['Selective hydration', 'Streamed', 'Progressive'],
      ],
    },
    mistakes: [
      { bad: 'Date.now/random in SSR render.', fix: 'useEffect (client-only) ya stable value.' },
      { bad: 'createRoot on SSR HTML.', fix: 'hydrateRoot.' },
    ],
    best: ['Server-client output identical.', 'Client-only stuff in useEffect.', 'hydrateRoot for SSR.', 'Suspense for selective hydration.', 'suppressHydrationWarning sparingly.'],
    performance:
      'Hydration CPU-heavy (poora tree process) — "uncanny valley" (dikhता par interactive nahi). Selective/progressive hydration (React 18) ise improve — visible/urgent pehle. Islands architecture (minimal hydration). Streaming + selective = fast TTI.',
    interview: {
      advanced: [
        { q: 'Hydration kya hai?', a: 'Server-rendered static HTML ko client par interactive banाना — React event listeners attach karता aur DOM ko VDOM se match karता. hydrateRoot se. SSR + hydration = fast paint + interactivity.' },
        { q: 'Hydration mismatch kyun?', a: 'Server aur client alag HTML render karein (Date.now, Math.random, window/localStorage, locale) → mismatch warning + React client render se replace. Fix: deterministic render, client-only stuff useEffect mein.' },
        { q: 'Selective hydration?', a: 'React 18 + Suspense: poora tree ek saath nahi, parts independently/priority se hydrate. User jis part se interact kare wo pehle hydrate (event replay). Streaming SSR ke saath fast TTI.' },
      ],
    },
    mcqs: [
      { q: 'SSR hydrate API?', options: ['createRoot', 'hydrateRoot', 'render', 'mount'], answer: 1, explain: 'hydrateRoot.' },
      { q: 'Mismatch cause?', options: ['Same output', 'Date.now/random', 'Static', 'Props'], answer: 1, explain: 'Non-deterministic server vs client.' },
    ],
    exercises: {
      easy: ['Hydration kya hai likho.'],
      medium: ['Hydration mismatch example + fix.'],
      advanced: ['Selective hydration ka fayda explain karो.'],
    },
    summary: [
      'Hydration = SSR HTML ko interactive banाना.',
      'hydrateRoot (SSR) vs createRoot (CSR).',
      'Mismatch: server ≠ client output.',
      'Selective hydration (18) = progressive, priority.',
    ],
    cheatsheet: [
      { h: 'Hydration', code: `hydrateRoot(el,<App/>) // SSR\n// server-client output SAME\n// client-only → useEffect` },
    ],
    projects: ['Next.js SSR app', 'Hydration mismatch debug', 'Streaming page'],
    advanced:
      'renderToPipeableStream (streaming). Event replay (selective). Islands (Astro). Partial hydration. RSC + hydration (only client components). suppressHydrationWarning. Progressive enhancement. TTI vs FCP metrics.',
    quiz: [
      { q: 'Hydration adds?', options: ['HTML', 'Event listeners', 'CSS', 'Data'], answer: 1, explain: 'Interactivity (listeners).' },
      { q: 'Selective hydration?', options: ['All at once', 'Progressive/priority', 'None', 'Server only'], answer: 1, explain: 'Parts independently.' },
    ],
    related: ['server-components', 'lazy-suspense', 'browser-react'],
  },

  'senior-apis': {
    overview:
      'Senior React APIs: **Error Boundaries** (component errors catch), **Portals** (DOM tree ke bahar render — modals), **Strict Mode** (dev checks, double-invoke), **Profiler API** (render performance measure), **Transition API** (useTransition/startTransition). Yeh production-grade React ke tools hain.',
    why:
      'Error boundaries, portals (modals), Strict Mode interview + production must. Profiler performance debugging. Senior toolkit.',
    concept: [
      { h: 'Error Boundaries', p: 'Class component (componentDidCatch/getDerivedStateFromError) jo child errors catch karता — fallback UI dikhाता (crash se poora app na toote). Hooks mein nahi (react-error-boundary lib).', code: `class ErrorBoundary extends React.Component {\n  state = { hasError: false }\n  static getDerivedStateFromError() { return { hasError: true } }\n  render() { return this.state.hasError ? <Fallback /> : this.props.children }\n}` },
      { h: 'Portals', p: 'Component ko DOM tree ke bahar (jaise document.body) render — modals/tooltips (z-index/overflow escape) — par React tree mein logically wahीn (events bubble).', code: `createPortal(<Modal />, document.body)` },
      { h: 'Strict Mode', p: 'Dev-only checks: double-invoke render/effects (impure code, missing cleanup catch), deprecated API warnings. Production mein no-op.', code: `<StrictMode><App /></StrictMode>` },
      { h: 'Profiler & Transitions', p: 'Profiler (DevTools tab / <Profiler> component) render timings measure. useTransition non-urgent updates (concurrent).', code: `<Profiler id="App" onRender={cb}><App /></Profiler>` },
    ],
    analogy:
      'Error Boundary ek **circuit breaker** — ek component fail ho to poora ghar (app) andhera (crash) nahi, sirf wo section. Portal ek **wormhole** — component DOM mein kahin aur dikhता par React family mein wahीn (modal body mein render par App ka part). Strict Mode = dress rehearsal (double check). 🔌',
    syntax: { code: `<ErrorBoundary fallback={<Err/>}><App/></ErrorBoundary>\ncreatePortal(<Modal/>, document.body)\n<StrictMode><App/></StrictMode>\n<Profiler id="x" onRender={fn}>...`, note: 'Error boundaries class-only (ya react-error-boundary).' },
    examples: [
      { level: 'Advanced', title: 'Portal modal', code: `import { createPortal } from 'react-dom'\nfunction Modal({ children, onClose }) {\n  return createPortal(\n    <div className="overlay" onClick={onClose}>\n      <div className="modal">{children}</div>\n    </div>,\n    document.body\n  )\n}`, explain: 'Modal body mein render (z-index/overflow escape), events React tree mein bubble.' },
    ],
    notes: {
      concept: 'Error Boundaries (catch), Portals (escape DOM), Strict Mode (checks), Profiler, Transitions.',
      tip: 'Modals/tooltips → portals. App ko error boundaries se wrap.',
      warning: 'Error boundaries event handlers/async errors catch nahi karte (try/catch).',
      error: 'Functional component se error boundary banाना (class-only ya library).',
    },
    compare: {
      headers: ['API', 'Use'],
      rows: [
        ['Error Boundary', 'Component errors → fallback'],
        ['Portal', 'Render outside DOM tree'],
        ['Strict Mode', 'Dev checks (double-invoke)'],
        ['Profiler', 'Render performance measure'],
        ['useTransition', 'Non-urgent updates'],
      ],
    },
    mistakes: [
      { bad: 'Error boundary se event/async errors expect.', fix: 'try/catch (boundaries sirf render errors).' },
      { bad: 'Modal z-index fight (no portal).', fix: 'createPortal to body.' },
    ],
    best: ['App ko error boundaries se wrap (graceful).', 'Modals/tooltips → portals.', 'Strict Mode on (dev).', 'Profiler se measure.', 'react-error-boundary library.'],
    performance:
      'Profiler render timings (commit duration, why rendered) deता — bottleneck identify. Error boundaries crash se app bachाते (UX). Transitions UI responsive. Portals extra DOM (z-index clean). Strict Mode dev-only (no prod cost).',
    interview: {
      advanced: [
        { q: 'Error Boundary kya hai?', a: 'Class component jo child tree ke render errors catch karता (getDerivedStateFromError/componentDidCatch) aur fallback UI dikhाता — crash se poora app na toote. Event/async errors catch nahi (try/catch).' },
        { q: 'Portal kya hai aur kyun?', a: 'createPortal se component ko DOM tree ke bahar (body) render — modals/tooltips ke liye (z-index/overflow escape). React tree mein logically wahीn (events bubble normally).' },
        { q: 'Strict Mode kya karта?', a: 'Dev-only: render/effects double-invoke (impure code, missing cleanup catch), deprecated warnings, future-proofing. Production mein no-op.' },
      ],
    },
    mcqs: [
      { q: 'Render errors catch?', options: ['try/catch', 'Error Boundary', 'useEffect', 'memo'], answer: 1, explain: 'Error Boundary.' },
      { q: 'Modal outside DOM?', options: ['Portal', 'Fragment', 'Context', 'Ref'], answer: 0, explain: 'createPortal.' },
    ],
    exercises: {
      easy: ['Error boundary banao.'],
      medium: ['Portal modal banao.'],
      advanced: ['Profiler se component render measure karो.'],
    },
    summary: [
      'Error Boundaries: render errors → fallback (class-only).',
      'Portals: render outside DOM (modals).',
      'Strict Mode: dev double-invoke checks.',
      'Profiler (measure), Transitions (non-urgent).',
    ],
    cheatsheet: [
      { h: 'APIs', code: `<ErrorBoundary/> (class)\ncreatePortal(el,target)\n<StrictMode>\n<Profiler onRender>` },
    ],
    projects: ['Global error boundary', 'Modal/tooltip (portal)', 'Profiler analysis'],
    advanced:
      'react-error-boundary (hooks-friendly). Error boundaries + Suspense. Portal event bubbling (React tree). Profiler programmatic. useTransition + Suspense. Strict Mode future behaviours. Error reporting (Sentry) in boundaries.',
    quiz: [
      { q: 'Strict Mode in prod?', options: ['Active', 'No-op', 'Errors', 'Slow'], answer: 1, explain: 'Dev-only.' },
      { q: 'Boundary catches?', options: ['Events', 'Render errors', 'Async', 'All'], answer: 1, explain: 'Render errors only.' },
    ],
    related: ['useeffect-deep', 'concurrent', 'lazy-suspense'],
  },

  'browser-react': {
    overview:
      'React browser ke andar chalता — **event loop**, **microtask/macrotask queues**, aur **rendering pipeline** ke saath interact karता. React updates batch karता, effects timing (microtask/paint) se control hoti, aur concurrent rendering browser ko yield karता. JS event loop + React rendering ka interplay senior-level understanding.',
    why:
      'React + browser internals (event loop, paint timing, effects) senior interview ka deep cross-topic. Performance + timing bugs samajhne ke liye.',
    concept: [
      { h: 'Event loop recap', p: 'JS single-threaded. Call stack → microtasks (promises) → render → macrotasks (setTimeout). React isi ke andar chalता.', code: `// order: sync → microtasks → paint → macrotask` },
      { h: 'React updates + batching', p: 'React 18 events/promises/timeouts mein automatic batching — multiple setState ek re-render (ek microtask/task mein).' },
      { h: 'Effects timing', p: 'useLayoutEffect commit ke baad synchronously (paint se pehle) — DOM measure. useEffect paint ke baad (async, after browser paints). Isliye useEffect non-blocking.', code: `// commit → useLayoutEffect → PAINT → useEffect` },
      { h: 'Concurrent + browser', p: 'Concurrent rendering scheduler MessageChannel (macrotask) se time-slice karता — har ~5ms browser ko paint/events ke liye yield. UI responsive.' },
    ],
    analogy:
      'Browser ek **stage** hai aur event loop **stage manager**. React ek performer — apna kaam (render) chhote acts mein karता, beech-beech mein stage manager (browser) ko audience (user events) + lighting (paint) handle karne deता. useLayoutEffect = "curtain uthने se pehle adjust", useEffect = "curtain uthने ke baad". 🎭',
    syntax: { code: `// Timing\ncommit DOM\n→ useLayoutEffect (sync, pre-paint)\n→ browser paint\n→ useEffect (async, post-paint)\n// concurrent: yield every ~5ms`, note: 'useLayoutEffect blocking (pre-paint); useEffect non-blocking.' },
    steps: [
      'Event/update → React state change.',
      'React batch karता (microtask/task), render phase (interruptible).',
      'Commit phase: DOM update (sync).',
      'useLayoutEffect (sync) → browser paint → useEffect (async).',
      'Concurrent: render chunks browser ko yield (paint/events smooth).',
    ],
    notes: {
      concept: 'React event loop ke andar; batching + effect timing + yield.',
      tip: 'Visual flicker → useLayoutEffect; normal side-effects → useEffect.',
      warning: 'useLayoutEffect blocking — heavy work paint delay (jank).',
      error: 'Heavy sync work render/commit mein — main thread block, jank.',
    },
    compare: {
      headers: ['Hook/Phase', 'Timing', 'Blocking?'],
      rows: [
        ['Commit', 'After render', 'Sync'],
        ['useLayoutEffect', 'Before paint', 'Yes (blocking)'],
        ['Browser paint', 'After layout effects', '—'],
        ['useEffect', 'After paint', 'No (async)'],
      ],
    },
    mistakes: [
      { bad: 'Heavy work useLayoutEffect mein.', fix: 'useEffect (non-blocking) jab possible.' },
      { bad: 'Heavy sync render (jank).', fix: 'useTransition, memoize, virtualize.' },
    ],
    best: ['useEffect default; useLayoutEffect for measure/flicker.', 'Heavy non-urgent → useTransition.', 'Avoid long sync tasks (yield).', 'Batch updates (automatic 18).'],
    performance:
      'useEffect post-paint (non-blocking) UI responsive rakhता. Concurrent rendering yield se long renders main thread block nahi karte (INP better). Microtask flooding (promise loops) paint starve. Web Workers heavy CPU.',
    interview: {
      advanced: [
        { q: 'useEffect vs useLayoutEffect timing (event loop)?', a: 'Commit ke baad: useLayoutEffect synchronously (paint se pehle) — DOM measure/mutate without flicker (blocking). useEffect browser paint ke baad (async, non-blocking). Isliye visual work useLayoutEffect, side-effects useEffect.' },
        { q: 'React concurrent browser ke saath kaise?', a: 'Scheduler MessageChannel (macrotask) se ~5ms chunks render karता, beech mein browser ko paint + user events handle karne ko yield deता — long renders main thread block nahi karte. UI responsive.' },
        { q: 'React batching + event loop?', a: 'React 18 automatic batching — events, promises, timeouts ke andar multiple setState ek re-render (ek microtask/task). Pehle sirf event handlers mein batch hota tha.' },
      ],
    },
    mcqs: [
      { q: 'Pre-paint effect?', options: ['useEffect', 'useLayoutEffect', 'useMemo', 'commit'], answer: 1, explain: 'useLayoutEffect (sync, pre-paint).' },
      { q: 'Concurrent yields to?', options: ['Server', 'Browser', 'Network', 'GC'], answer: 1, explain: 'Browser (paint/events).' },
    ],
    exercises: {
      easy: ['useEffect vs useLayoutEffect timing likho.'],
      medium: ['Event loop mein React render timing samjhao.'],
      advanced: ['Heavy render ko useTransition se non-blocking banao.'],
    },
    summary: [
      'React event loop ke andar chalता.',
      'Batching (18 automatic) → ek re-render.',
      'useLayoutEffect pre-paint (sync), useEffect post-paint (async).',
      'Concurrent yields to browser (~5ms).',
    ],
    cheatsheet: [
      { h: 'Timing', code: `commit → layoutEffect → PAINT → effect\nconcurrent: yield ~5ms` },
    ],
    projects: ['Effect timing demo', 'Smooth heavy update (transition)'],
    advanced:
      'requestAnimationFrame (visual updates). Microtask vs macrotask (effects flush). INP optimization. Web Workers (offload). useInsertionEffect (CSS-in-JS, before layout). Long task breaking. Scheduler postTask (future).',
    quiz: [
      { q: 'useEffect timing?', options: ['Pre-paint', 'Post-paint', 'During render', 'Never'], answer: 1, explain: 'After paint (async).' },
      { q: 'Auto batching (18)?', options: ['Events only', 'Everywhere', 'None', 'Class'], answer: 1, explain: 'Everywhere.' },
    ],
    related: ['concurrent', 'useeffect-deep', 'scheduler-lanes'],
  },

  'interview-questions': {
    overview:
      'Yeh ek **React interview rapid-prep** topic hai — mid se senior level ke conceptual, output-based, scenario, aur tricky questions ek jagah. Practice se patterns (hooks rules, re-renders, closures, keys, reconciliation) pehchaanना aata, jo real interviews mein aate.',
    why:
      'Companies React deeply test karti — fundamentals se internals tak. Yeh tricky cases + answers ek baar dekh lo to confidence + speed.',
    concept: [
      { h: 'Approach', p: 'Conceptual: clear definition + why. Output-based: render flow + hooks order + closures trace. Scenario: trade-offs discuss. Loud thinking karो.' },
      { h: 'Top areas', p: 'Hooks (rules, deps, closures), re-renders + optimization, keys/reconciliation, useEffect, state batching, Context, Fiber/concurrent (senior).' },
      { h: 'Tip', p: 'Senior rounds mein "kyun" aur "trade-offs" matter karte — sirf "kya" nahi. Internals (Fiber, lanes) bonus.' },
    ],
    analogy:
      'React interview prep ek **driving test** jaisा — theory (concepts) + practical (code) + scenarios (traffic). Practice se reflexes ban jaते — tricky question par atak nahi jaते. 🚗',
    tricky: [
      { title: 'Stale closure in setInterval', code: `function Timer() {\n  const [count, setCount] = useState(0)\n  useEffect(() => {\n    const id = setInterval(() => setCount(count + 1), 1000)\n    return () => clearInterval(id)\n  }, []) // count stale!\n}`, output: 'count stuck at 1', explain: 'Empty deps → closure count=0 forever. Fix: setCount(c => c+1) (functional).' },
      { title: 'Multiple setState batched', code: `function click() {\n  setCount(count + 1)\n  setCount(count + 1)\n  setCount(count + 1)\n}`, output: '+1 only', explain: 'Same snapshot. setCount(c => c+1) thrice → +3.' },
      { title: 'Index key bug', code: `{items.map((it, i) => <input key={i} defaultValue={it.name} />)}`, output: 'reorder → wrong values', explain: 'Index key + reorder = state mismatch. key={it.id}.' },
      { title: 'Object dep infinite loop', code: `useEffect(() => { fetchData() }, [{ id }])`, output: 'runs every render', explain: 'Inline object = naya reference har render. Primitive dep [id].' },
      { title: 'Conditional hook', code: `if (loggedIn) { const [x] = useState(0) }`, output: 'Error / order bug', explain: 'Hooks top-level only — order must be stable.' },
    ],
    notes: {
      concept: 'React interviews: concepts + output + scenarios + internals.',
      tip: 'Senior: kyun + trade-offs, na sirf kya.',
      warning: 'Output questions: hooks order + closures + batching trace karो.',
      error: 'Internals (Fiber/lanes) skip karna senior rounds mein.',
    },
    interview: {
      beginner: [
        { q: 'Props vs state?', a: 'Props parent se read-only data (one-way). State component ka internal mutable data (setState → re-render).' },
        { q: 'Keys kyun?', a: 'Reconciliation mein element identity — kaun add/remove/move. Index key reorder par buggy; stable id use karो.' },
        { q: 'useEffect kya hai?', a: 'Side-effects (fetch/timers/subscriptions) render ke baad. Deps re-run control, cleanup resources hatाता.' },
      ],
      intermediate: [
        { q: 'React.memo, useMemo, useCallback?', a: 'React.memo component skip (props same). useMemo value cache. useCallback function stable. memo + stable props saath.' },
        { q: 'Virtual DOM kaise fast?', a: 'JS diff (sasta) → minimal real DOM ops (mehnge). Reconciliation O(n) heuristics, keys se efficient.' },
        { q: 'Custom hook vs HOC?', a: 'Custom hooks logic reuse (clean, no wrapper). HOC component wrap (wrapper hell). Hooks modern.' },
      ],
      advanced: [
        { q: 'Fiber kya hai?', a: 'Reconciliation engine — interruptible, prioritized rendering. Fiber nodes (units of work), current+WIP trees (double buffering), concurrent ka base.' },
        { q: 'Concurrent rendering + lanes?', a: 'Rendering interrupt/prioritize. Lanes (priority bitmask) — urgent (typing) > transitions. Scheduler time-slicing (yield to browser).' },
        { q: 'Reconciliation algorithm?', a: 'O(n) heuristics: type diff → rebuild; same type → update props; lists → keys match. Fiber se interruptible.' },
      ],
    },
    mcqs: [
      { q: 'Hooks rule?', options: ['Anywhere', 'Top-level only', 'In loops', 'Conditional'], answer: 1, explain: 'Top-level, no conditions.' },
      { q: 'setState batching?', options: ['Multiple renders', 'One re-render', 'No render', 'Sync'], answer: 1, explain: 'Batched → one render.' },
      { q: 'Best key?', options: ['index', 'item.id', 'random', 'date'], answer: 1, explain: 'Stable unique id.' },
      { q: 'Fiber enables?', options: ['Styling', 'Concurrent rendering', 'Routing', 'Fetching'], answer: 1, explain: 'Interruptible/concurrent.' },
    ],
    exercises: {
      easy: ['10 React concept questions answer karो.'],
      medium: ['5 output-based questions trace karो.'],
      advanced: ['Fiber + concurrent + reconciliation deeply explain karो.'],
    },
    summary: [
      'React interviews: concepts + output + scenarios + internals.',
      'Top: hooks, re-renders, keys, useEffect, Fiber.',
      'Senior: kyun + trade-offs + internals.',
      'Output questions: hooks order + closures + batching.',
    ],
    cheatsheet: [
      { h: 'Hot topics', code: `hooks rules, deps, closures\nre-renders + memo\nkeys/reconciliation\nFiber/concurrent (senior)` },
    ],
    projects: ['Mock interviews', 'Implement: useDebounce, useFetch', 'Build: from-scratch hooks'],
    advanced:
      'Implement from scratch: useState, useEffect, custom Promise, debounce, deep clone. Polyfills. System design (component design, state architecture). Performance debugging (Profiler). Company-specific (FAANG internals, startups practical).',
    quiz: [
      { q: 'Stale closure fix?', options: ['More deps', 'Functional update', 'useRef only', 'Remove effect'], answer: 1, explain: 'Functional update (or correct deps).' },
      { q: 'Senior focus?', options: ['Syntax', 'Why + trade-offs', 'Copy code', 'Memorize'], answer: 1, explain: 'Reasoning + internals.' },
    ],
    related: ['machine-coding', 'fiber', 'usememo-usecallback'],
  },

  'machine-coding': {
    overview:
      'React machine coding rounds mein chhote **interactive apps/components** banाने hote (Todo, Modal, Tabs, Infinite Scroll, Data Table). Yeh hooks, state, events, performance, aur clean code test karte. Har project ka core: **state design + components + events + edge cases**. Yahan 15 common projects ka approach.',
    why:
      'React interviews mein machine coding round bahut common (especially product companies). Practical skill — sirf theory nahi.',
    concept: [
      { h: 'Approach (har project)', p: '1) Components todो. 2) State design (kahan, kya). 3) Events + handlers. 4) Render UI from state. 5) Edge cases (empty/loading/error). 6) Polish (a11y, performance).' },
      { h: 'Easy', p: '**Todo** (CRUD + state), **Accordion/Tabs** (active index), **Modal** (portal + open state), **Counter/Stopwatch** (interval + ref).' },
      { h: 'Medium', p: '**Pagination** (page slice), **Search Filter** (filter state), **Debounce Search** (useDebounce + API), **Image Carousel** (index + transform), **Multi-step Form** (step + shared state).' },
      { h: 'Advanced', p: '**Infinite Scroll** (IntersectionObserver + load more), **Drag and Drop** (drag state/dnd-kit), **Kanban Board** (columns + DnD), **File Explorer** (recursive tree), **Data Table** (sort/filter/paginate + virtualize).' },
    ],
    analogy:
      'Machine coding ek **cooking exam** hai — recipe (React concepts) pata ho, par time limit mein dish (working component) banाni padti. Practice se haath set ho jaता — interview mein bina ghabraye banा dete ho. 👨‍🍳',
    examples: [
      { level: 'Intermediate', title: 'Todo (core pattern)', code: `function Todos() {\n  const [todos, setTodos] = useState([])\n  const [text, setText] = useState('')\n  const add = () => {\n    if (!text.trim()) return\n    setTodos(t => [...t, { id: Date.now(), text, done: false }])\n    setText('')\n  }\n  const toggle = (id) => setTodos(t => t.map(x => x.id === id ? {...x, done: !x.done} : x))\n  const del = (id) => setTodos(t => t.filter(x => x.id !== id))\n  return (\n    <>\n      <input value={text} onChange={e => setText(e.target.value)} />\n      <button onClick={add}>Add</button>\n      <ul>{todos.map(t => (\n        <li key={t.id}>\n          <span onClick={() => toggle(t.id)} style={{textDecoration: t.done ? 'line-through' : ''}}>{t.text}</span>\n          <button onClick={() => del(t.id)}>X</button>\n        </li>\n      ))}</ul>\n    </>\n  )\n}`, explain: 'State (array) + immutable updates + keys + events — har project ka core.' },
      { level: 'Advanced', title: 'Infinite scroll (hook)', code: `function useInfiniteScroll(loadMore) {\n  const ref = useRef()\n  useEffect(() => {\n    const obs = new IntersectionObserver(([e]) => {\n      if (e.isIntersecting) loadMore()\n    })\n    if (ref.current) obs.observe(ref.current)\n    return () => obs.disconnect()\n  }, [loadMore])\n  return ref // attach to sentinel div\n}`, explain: 'IntersectionObserver sentinel — bottom par next page load.' },
    ],
    notes: {
      concept: 'Core: state design + components + events + edge cases.',
      tip: 'Pehle working version, phir polish (a11y/perf).',
      warning: 'Time limit — over-engineer mat karो; core feature pehle.',
      error: 'Immutable updates bhoolना (state mutate), keys miss.',
    },
    mistakes: [
      { bad: 'State mutate (todos.push).', fix: 'Immutable (spread/map/filter).' },
      { bad: 'Search par har keystroke API.', fix: 'useDebounce.' },
    ],
    best: ['State-driven UI.', 'Immutable updates.', 'Stable keys.', 'Custom hooks (useDebounce, useFetch).', 'Edge cases (empty/loading/error).', 'Accessibility (keyboard, ARIA).'],
    performance:
      'Bade lists virtualize. Search debounce. Memoize heavy rows (React.memo). Avoid inline objects/functions in lists (useCallback). Pagination/infinite scroll for large data.',
    interview: {
      intermediate: [
        { q: 'Machine coding round mein kya dekhते?', a: 'Working feature, clean/modular components, state design, hooks usage, edge cases, performance, accessibility, aur reasoning (loud thinking).' },
        { q: 'Todo app ka core pattern?', a: 'State (array) + immutable updates (add/toggle/delete via spread/map/filter) + keys + controlled input + events. Yahi pattern most projects mein.' },
      ],
      advanced: [
        { q: 'Infinite scroll React mein?', a: 'IntersectionObserver (sentinel div) bottom detect → loadMore (next page fetch + append). hasMore flag, loading state, dedup. Bade lists virtualize.' },
        { q: 'Modal accessible kaise?', a: 'Portal (body), focus trap, Escape to close, aria-modal/role="dialog", outside-click close, scroll lock, return focus on close.' },
      ],
    },
    mcqs: [
      { q: 'Todo state?', options: ['Mutate', 'Immutable (spread)', 'Direct', 'Ref'], answer: 1, explain: 'Immutable updates.' },
      { q: 'Modal outside DOM?', options: ['Fragment', 'Portal', 'Context', 'Ref'], answer: 1, explain: 'createPortal.' },
    ],
    exercises: {
      easy: ['Todo + Accordion + Tabs banao.'],
      medium: ['Pagination + Debounce search + Carousel.'],
      advanced: ['Infinite scroll + Kanban (DnD) + Data table.'],
    },
    summary: [
      'Machine coding = interactive components (hooks/state/events).',
      'Core: state design + components + events + edge cases.',
      'Easy (Todo/Tabs/Modal) → advanced (DnD/Table).',
      'Immutable updates, keys, custom hooks.',
    ],
    cheatsheet: [
      { h: 'Pattern', code: `const [state,setState]=useState()\n// immutable update\n// events → setState\n// render from state` },
    ],
    projects: ['Todo App', 'Pagination', 'Search Filter', 'Infinite Scroll', 'Accordion', 'Tabs', 'Modal', 'Debounce Search', 'Image Carousel', 'Dashboard UI', 'Multi-step Form', 'Drag and Drop', 'Kanban Board', 'File Explorer', 'Data Table'],
    advanced:
      'dnd-kit (drag-drop). react-window (virtualized table). Recursive components (file explorer). useReducer (complex state). Custom hooks (useDebounce, useFetch, useInfiniteScroll). Accessibility (focus, ARIA). Optimistic UI.',
    quiz: [
      { q: 'Core pattern?', options: ['Only DOM', 'State+events+render', 'CSS', 'Fetch only'], answer: 1, explain: 'State-driven UI.' },
      { q: 'Large table fast?', options: ['Render all', 'Virtualize', 'No keys', 'Inline'], answer: 1, explain: 'Virtualization.' },
    ],
    related: ['interview-questions', 'virtualization', 'custom-hooks'],
  },

  roadmap: {
    overview:
      'React developer banne ka roadmap: **Beginner** (JSX, components, props, state, events) → **Intermediate** (hooks, forms, routing, API, Context) → **Advanced** (performance, patterns, TypeScript, testing) → **React Internals** (Fiber, reconciliation, concurrent) → **Performance + System Design** → **Senior React** (SSR, RSC, architecture). Step-by-step path.',
    why:
      'Clear roadmap se learning focused + efficient. "Aage kya seekhein" common confusion — yeh path deta.',
    concept: [
      { h: 'Beginner (foundation)', p: 'Pehle JavaScript (ES6+) solid karो. Phir: JSX, components, props, state (useState), events, conditional rendering, lists/keys.' },
      { h: 'Intermediate', p: 'Hooks (useEffect, useRef, useContext, useReducer, useMemo/useCallback), custom hooks, forms, React Router, API handling (React Query), Context.' },
      { h: 'Advanced', p: 'Performance (memo, lazy, virtualization), patterns (HOC, render props, compound), TypeScript, testing (Jest/RTL), state management (Redux/Zustand).' },
      { h: 'Internals → Senior', p: 'React internals (Fiber, reconciliation, concurrent, lanes), SSR/RSC/hydration, architecture, system design. Senior = depth + trade-offs + leading.' },
    ],
    analogy:
      'React roadmap ek **video game levels** jaisा — Level 1 (basics) clear karke hi Level 2 (hooks) unlock. Boss fights (internals, system design) end mein. Har level practice se cross hota — shortcut nahi. 🎮',
    visual: {
      type: 'timeline',
      items: [
        { year: '1', text: 'Beginner: JSX, components, props, state, events' },
        { year: '2', text: 'Intermediate: hooks, forms, routing, API, Context' },
        { year: '3', text: 'Advanced: performance, patterns, TS, testing' },
        { year: '4', text: 'Internals: Fiber, reconciliation, concurrent' },
        { year: '5', text: 'Senior: SSR/RSC, architecture, system design' },
      ],
    },
    notes: {
      concept: 'Beginner → Intermediate → Advanced → Internals → Senior.',
      tip: 'JavaScript solid karो pehle (React JS par bana).',
      warning: 'Shortcut mat lo — har level practice se.',
      error: 'Internals se shuru karna bina fundamentals (confusing).',
    },
    compare: {
      headers: ['Level', 'Focus', 'Outcome'],
      rows: [
        ['Beginner', 'JSX/components/state', 'Build basic UIs'],
        ['Intermediate', 'Hooks/routing/API', 'Real apps'],
        ['Advanced', 'Perf/patterns/TS/test', 'Production apps'],
        ['Internals', 'Fiber/concurrent', 'Deep understanding'],
        ['Senior', 'SSR/architecture', 'Lead/design'],
      ],
    },
    mistakes: [
      { bad: 'Internals se shuru.', fix: 'Fundamentals pehle.' },
      { bad: 'Sirf tutorials (no building).', fix: 'Projects banाओ.' },
    ],
    best: ['JS solid pehle.', 'Build projects (har level).', 'Read React docs (beta.react.dev).', 'Internals advanced mein.', 'Consistency > speed.'],
    interview: {
      beginner: [
        { q: 'React seekhne ka order?', a: 'JS (ES6+) → JSX/components/props/state/events → hooks → routing/API → performance/patterns/TS/testing → internals → SSR/senior.' },
      ],
      intermediate: [
        { q: 'Senior React developer ke liye kya?', a: 'Deep internals (Fiber/concurrent), performance, architecture, system design, SSR/RSC, testing, mentoring, aur trade-off decisions.' },
      ],
    },
    mcqs: [
      { q: 'React se pehle?', options: ['CSS only', 'JavaScript', 'Backend', 'Database'], answer: 1, explain: 'JS solid foundation.' },
      { q: 'Internals kab?', options: ['Beginning', 'Advanced/senior', 'Never', 'First'], answer: 1, explain: 'After fundamentals.' },
    ],
    exercises: {
      easy: ['Apni current level identify karो.'],
      medium: ['Next 3 topics ka learning plan banao.'],
      advanced: ['Ek full-stack project plan karो (roadmap apply).'],
    },
    summary: [
      'Beginner → Intermediate → Advanced → Internals → Senior.',
      'JS solid karो pehle.',
      'Har level projects se practice.',
      'Senior = depth + architecture + trade-offs.',
    ],
    cheatsheet: [
      { h: 'Path', code: `JS → JSX/state → hooks\n→ routing/API → perf/TS/test\n→ Fiber/concurrent → SSR/senior` },
    ],
    projects: ['Todo (beginner)', 'Dashboard (intermediate)', 'Full app + SSR (advanced)', 'Design system (senior)'],
    advanced:
      'System design (component architecture, state management at scale, micro-frontends, design systems, performance budgets, monorepos). Open-source contribution. Read React source. Stay updated (RSC, React 19, Compiler).',
    quiz: [
      { q: 'Foundation?', options: ['Internals', 'JavaScript', 'SSR', 'Redux'], answer: 1, explain: 'JS first.' },
      { q: 'Senior needs?', options: ['Syntax', 'Depth + architecture', 'Speed', 'Memorize'], answer: 1, explain: 'Deep + design + trade-offs.' },
    ],
    related: ['interview-questions', 'machine-coding', 'architecture'],
  },
}
