// React content — Part 5: Performance, Routing/Data, State Mgmt, Ecosystem

export const reactContentE = {
  memoization: {
    overview:
      '**Memoization** React mein unnecessary re-renders/recalculations rokने ka tarika hai: **React.memo** (component skip jab props same), **useMemo** (value cache), **useCallback** (function reference stable). Kab use karein — sirf measured bottlenecks par. Galат/over-use ulta slow + complex.',
    why:
      'Performance optimization ka core. "Kab memoize, kab nahi" senior interview discussion. Real apps mein render performance.',
    concept: [
      { h: 'React.memo', p: 'Component ko wrap karता — props (shallow compare) same to re-render skip.', code: `const Row = React.memo(function Row({ item }) {\n  return <li>{item.name}</li>\n})` },
      { h: 'useMemo & useCallback', p: 'useMemo expensive value cache; useCallback function reference stable (memo children ke liye).', code: `const sorted = useMemo(() => sort(data), [data])\nconst onClick = useCallback(() => fn(id), [id])` },
      { h: 'Kab use karein', p: 'Expensive computations, bade lists, memoized children ko stable props, referential stability (effect deps). Profiler se bottleneck confirm.' },
      { h: 'Kab NAHI', p: 'Chhote/saste components, cheap calculations, har cheez wrap karna — comparison + memory overhead net loss. Premature optimization.' },
    ],
    analogy:
      'Memoization ek **"answer yaad rakhо"** technique — same sawaal phir aaye to dobara solve nahi. Lekin har chhoti cheez yaad rakhna (over-memoize) = dimaag (memory) bhar jaता aur yaad karne mein hi time lagता. Balance chahiye. 🧠',
    syntax: { code: `const Memo = React.memo(Comp)\nconst val = useMemo(() => calc(), [deps])\nconst fn = useCallback(() => {}, [deps])\n// custom compare\nReact.memo(Comp, (prev, next) => prev.id === next.id)`, note: 'React.memo + stable props (useMemo/useCallback) saath effective.' },
    examples: [
      { level: 'Advanced', title: 'memo + stable props', code: `const Item = React.memo(({ data, onSelect }) => {\n  console.log('render', data.id)\n  return <li onClick={onSelect}>{data.name}</li>\n})\nfunction List({ items }) {\n  const onSelect = useCallback((id) => select(id), [])\n  return items.map(it => <Item key={it.id} data={it} onSelect={onSelect} />)\n}`, explain: 'React.memo + useCallback = items re-render skip on parent update.' },
    ],
    notes: {
      concept: 'React.memo (component), useMemo (value), useCallback (function).',
      tip: 'memo + stable props saath; alone often useless.',
      warning: 'Over-memoization complexity + memory; kabhi slower.',
      error: 'React.memo + inline object/function props — memo break.',
    },
    compare: {
      headers: ['Tool', 'Memoizes', 'Kab'],
      rows: [
        ['React.memo', 'Component', 'Props rarely change'],
        ['useMemo', 'Value', 'Expensive calc'],
        ['useCallback', 'Function', 'Stable fn for memo'],
      ],
    },
    mistakes: [
      { bad: 'Har component React.memo.', fix: 'Sirf measured heavy.' },
      { bad: 'memo + inline props.', fix: 'Stable props (useMemo/useCallback).' },
    ],
    best: ['Profile pehle (DevTools Profiler).', 'memo + stable props together.', 'Expensive calc → useMemo.', 'Cheap stuff mat memoize.'],
    performance:
      'Memoization comparison + memory cost rakhती. Net win sirf jab saved work > comparison cost (bade lists, heavy calc). Chhote components ke liye overhead. React Compiler (future) auto-memo karega.',
    interview: {
      intermediate: [
        { q: 'React.memo, useMemo, useCallback?', a: 'React.memo component re-render skip (props same). useMemo value cache. useCallback function reference stable. memo + stable props saath effective.' },
      ],
      advanced: [
        { q: 'Kab memoize NAHI karein?', a: 'Cheap components/calculations, rarely-rendered components, ya jab comparison cost > saved work. Over-memoization complexity + memory + kabhi slower. Profile karके decide.' },
        { q: 'React.memo kaise compare karता?', a: 'Shallow props comparison (Object.is per prop). Custom comparator 2nd arg se. Inline object/function props har render naye reference → memo break.' },
      ],
    },
    mcqs: [
      { q: 'Component skip?', options: ['useMemo', 'React.memo', 'useCallback', 'useRef'], answer: 1, explain: 'React.memo.' },
      { q: 'Over-memoize?', options: ['Always good', 'Can hurt', 'Faster', 'No cost'], answer: 1, explain: 'Overhead + complexity.' },
    ],
    exercises: {
      easy: ['React.memo se list item wrap karो.'],
      medium: ['useMemo + useCallback se memo child stable rakho.'],
      advanced: ['Profiler se memoization impact measure karो.'],
    },
    summary: [
      'React.memo (component), useMemo (value), useCallback (function).',
      'memo + stable props saath effective.',
      'Sirf measured bottlenecks memoize.',
      'Over-memoize = overhead.',
    ],
    cheatsheet: [
      { h: 'Memoize', code: `React.memo(C)\nuseMemo(()=>v,[d])\nuseCallback(fn,[d])` },
    ],
    projects: ['Optimized list', 'Heavy dashboard', 'Memoized table'],
    advanced:
      'React Compiler (auto-memoization — manual memo less needed). Custom React.memo comparator. Referential stability for effect deps. Profiler API. why-did-you-render. Avoid memo as default — measure.',
    quiz: [
      { q: 'Value cache?', options: ['React.memo', 'useMemo', 'useCallback', 'useRef'], answer: 1, explain: 'useMemo.' },
      { q: 'memo compare?', options: ['Deep', 'Shallow props', 'None', 'State'], answer: 1, explain: 'Shallow props.' },
    ],
    related: ['usememo-usecallback', 're-rendering', 'virtualization'],
  },

  'lazy-suspense': {
    overview:
      '**Lazy Loading** + **Code Splitting** se bundle ko chhote chunks mein todते — component ko sirf jab chahiye tab load. **React.lazy** + **dynamic import()** se component lazy hota; **Suspense** loading fallback dikhाता jab tak load ho. Initial bundle chhota = fast first load.',
    why:
      'Bade SPAs ka initial bundle slow. Code splitting + lazy loading performance ka core. Suspense, React.lazy interview + production standard.',
    concept: [
      { h: 'Code splitting', p: 'Bundle ko routes/components ke hisaab se chunks mein todो — sirf zaroori code load. Dynamic import() se.', code: `import('./Heavy').then(module => ...)` },
      { h: 'React.lazy', p: 'Component ko lazy banाता (dynamic import). Sirf render hone par load.', code: `const Dashboard = React.lazy(() => import('./Dashboard'))` },
      { h: 'Suspense', p: 'Lazy component load hone tak fallback (spinner) dikhाता.', code: `<Suspense fallback={<Spinner />}>\n  <Dashboard />\n</Suspense>` },
      { h: 'Route-based splitting', p: 'Sabse common — har route ka component lazy. Initial load sirf current page.', code: `const About = lazy(() => import('./About'))\n<Route path="/about" element={<Suspense fallback={<L/>}><About/></Suspense>} />` },
    ],
    analogy:
      'Lazy loading ek **buffet vs plated meal** jaisा — pura khana ek baar mat laओ (bada bundle). Jo dish customer maange (route visit) wahi serve karo (load). Suspense = "dish aa rahi hai" ka loading sign jab tak ready ho. 🍽️',
    syntax: { code: `const Comp = React.lazy(() => import('./Comp'))\n<Suspense fallback={<Loader />}>\n  <Comp />\n</Suspense>`, note: 'lazy + Suspense saath; route-based splitting common.' },
    examples: [
      { level: 'Intermediate', title: 'Route-based lazy', code: `import { lazy, Suspense } from 'react'\nconst Home = lazy(() => import('./Home'))\nconst Profile = lazy(() => import('./Profile'))\nfunction App() {\n  return (\n    <Suspense fallback={<Spinner />}>\n      <Routes>\n        <Route path="/" element={<Home />} />\n        <Route path="/profile" element={<Profile />} />\n      </Routes>\n    </Suspense>\n  )\n}`, explain: 'Har route alag chunk — initial load chhota.' },
    ],
    memory:
      'Lazy chunks alag JS files (network par on-demand). Loaded chunk cache hota (dobara load nahi). Suspense boundary fallback render karता jab tak promise resolve. Bundle splitting initial parse/memory kam karता.',
    browser:
      'Dynamic import() browser network request karता (chunk file). Loaded chunks cached (HTTP + module cache). Suspense React level par loading state manage karता (not network). Prefetch se chunk pehle load (hover).',
    notes: {
      concept: 'React.lazy + import() = code splitting; Suspense = fallback.',
      tip: 'Route-based splitting sabse impactful.',
      warning: 'lazy component Suspense ke andar hona chahiye (warna error).',
      error: 'Named export lazy nahi (default chahiye) — wrap karो.',
    },
    compare: {
      headers: ['Approach', 'Load', 'Initial bundle'],
      rows: [
        ['No splitting', 'Sab upfront', 'Bada'],
        ['Route splitting', 'Per route', 'Chhota'],
        ['Component lazy', 'On render', 'Chhota'],
      ],
    },
    mistakes: [
      { bad: 'lazy component bina Suspense.', fix: 'Suspense boundary wrap.' },
      { bad: 'Sab kuch lazy.', fix: 'Routes + heavy components (waterfall avoid).' },
    ],
    best: ['Route-based splitting.', 'Heavy/rare components lazy.', 'Meaningful fallbacks.', 'Prefetch on hover/idle.', 'Error boundary with Suspense.'],
    performance:
      'Code splitting initial bundle chhota → fast first paint/TTI. Lazy load on-demand. Trade-off: load delay (spinner). Prefetch se delay hide. Over-splitting waterfall (many requests). Suspense + concurrent streaming.',
    interview: {
      intermediate: [
        { q: 'Code splitting kya hai?', a: 'Bundle ko chhote chunks mein todна (routes/components) taaki sirf zaroori code load ho — chhota initial bundle, fast load. React.lazy + import().' },
        { q: 'React.lazy aur Suspense?', a: 'React.lazy component ko dynamic import se lazy banाता. Suspense load hone tak fallback (spinner) dikhाता. Saath use hote.' },
      ],
      advanced: [
        { q: 'Lazy loading ke trade-offs?', a: 'Pros: chhota initial bundle, fast load. Cons: load delay (spinner), over-splitting se waterfall (many requests). Prefetch + sensible boundaries se balance.' },
      ],
    },
    mcqs: [
      { q: 'Lazy component?', options: ['useMemo', 'React.lazy', 'React.memo', 'useState'], answer: 1, explain: 'React.lazy.' },
      { q: 'Loading fallback?', options: ['useEffect', 'Suspense', 'memo', 'Context'], answer: 1, explain: 'Suspense fallback.' },
    ],
    exercises: {
      easy: ['React.lazy se ek component lazy karो.'],
      medium: ['Route-based code splitting setup karो.'],
      advanced: ['Suspense + error boundary + lazy combine karो.'],
    },
    summary: [
      'Code splitting = bundle chunks mein.',
      'React.lazy (import) + Suspense (fallback).',
      'Route-based splitting most impactful.',
      'Chhota initial bundle = fast load.',
    ],
    cheatsheet: [
      { h: 'Lazy', code: `const C=lazy(()=>import('./C'))\n<Suspense fallback={<L/>}><C/></Suspense>` },
    ],
    projects: ['Lazy routes', 'Lazy modal', 'Lazy heavy chart'],
    advanced:
      'Suspense for data (React Query/Relay). Streaming SSR + Suspense (selective hydration). Prefetch (link hover). Webpack magic comments (chunk names). React.lazy named export workaround. Error boundaries with Suspense.',
    quiz: [
      { q: 'import() returns?', options: ['Component', 'Promise', 'Element', 'Object'], answer: 1, explain: 'Promise (chunk).' },
      { q: 'lazy needs?', options: ['memo', 'Suspense', 'Context', 'Ref'], answer: 1, explain: 'Suspense boundary.' },
    ],
    related: ['memoization', 'react-router', 'hydration'],
  },

  virtualization: {
    overview:
      '**Virtualization (Windowing)** bade lists (1000s items) ko fast banाता — sirf **visible items** (viewport) render karता, baaki nahi. Scroll par render swap. Libraries: **react-window**, **react-virtualized**, **TanStack Virtual**. DOM nodes kam = fast render + scroll.',
    why:
      'Bade lists/tables (chat, feed, data grid) bina virtualization lag karte. Performance senior interview + real apps. "1000 items kaise render karein".',
    concept: [
      { h: 'Problem', p: '10,000 items render = 10,000 DOM nodes = slow mount, scroll jank, memory. Browser sab handle nahi kar pata.' },
      { h: 'Virtualization', p: 'Sirf visible (viewport) items + thoda buffer render. Scroll par items recycle/swap. DOM mein sirf ~20 nodes chahe 10,000 items.', code: `import { FixedSizeList } from 'react-window'\n<FixedSizeList height={400} itemCount={10000} itemSize={35}>\n  {({ index, style }) => <div style={style}>Row {index}</div>}\n</FixedSizeList>` },
      { h: 'Kaise kaam karता', p: 'Total height calculate (items × height), scroll position se visible range nikalता, sirf wo items absolute-positioned render. Spacer se scroll height maintain.' },
      { h: 'Kab use', p: 'Long lists (100s-1000s), infinite feeds, data tables. Chhote lists (<100) ke liye overkill.' },
    ],
    analogy:
      'Virtualization ek **moving train ki khidki** jaisा hai — train (list) bahut lambi (10,000 seats), par tum sirf khidki se dikhne wale (viewport) seats dekhते ho. Train aage badhती (scroll), naye seats dikhते, purane chhup jaate. Sirf visible render. 🚆',
    syntax: { code: `import { FixedSizeList } from 'react-window'\n<FixedSizeList\n  height={500}\n  itemCount={items.length}\n  itemSize={50}\n  width="100%"\n>\n  {({ index, style }) => (\n    <div style={style}>{items[index].name}</div>\n  )}\n</FixedSizeList>`, note: 'style prop (positioning) zaroori har row par.' },
    examples: [
      { level: 'Advanced', title: 'react-window list', code: `import { FixedSizeList } from 'react-window'\nfunction BigList({ items }) {\n  return (\n    <FixedSizeList height={400} itemCount={items.length} itemSize={40} width={300}>\n      {({ index, style }) => (\n        <div style={style} className="row">{items[index].name}</div>\n      )}\n    </FixedSizeList>\n  )\n}`, explain: '10,000 items, sirf ~12 DOM nodes render — fast.' },
    ],
    memory:
      'Virtualization DOM nodes drastically kam karता (10,000 → ~20) — memory + render time + scroll performance dramatically better. Items recycle (reuse). Variable heights ke liye measurement overhead.',
    notes: {
      concept: 'Virtualization = sirf visible items render (windowing).',
      tip: 'react-window (light) ya TanStack Virtual.',
      warning: 'style prop (absolute positioning) har row par zaroori.',
      error: 'Chhote lists virtualize karna — overkill. Ctrl+F / SEO content miss.',
    },
    compare: {
      headers: ['List size', 'Normal render', 'Virtualized'],
      rows: [
        ['<100', 'Fine', 'Overkill'],
        ['1,000+', 'Slow/jank', 'Fast'],
        ['DOM nodes', 'All items', '~viewport'],
      ],
    },
    mistakes: [
      { bad: 'Chhote lists virtualize.', fix: 'Sirf bade (100s+).' },
      { bad: 'style prop bhoolna.', fix: 'Row par style apply.' },
    ],
    best: ['Bade lists (100s-1000s) virtualize.', 'react-window/TanStack Virtual.', 'Fixed size jab possible (fast).', 'Buffer (overscan) for smooth scroll.', 'Variable size for dynamic heights.'],
    performance:
      'Virtualization sabse bada list-performance win — O(viewport) instead of O(n) DOM. Render + scroll + memory dramatically fast. Combine with React.memo (rows), pagination, infinite scroll. SEO/accessibility consider (off-screen content).',
    interview: {
      advanced: [
        { q: 'Virtualization kya hai?', a: 'Bade lists mein sirf visible (viewport) items render karna — baaki DOM mein nahi. Scroll par swap. DOM nodes kam = fast render/scroll. react-window se.' },
        { q: 'Virtualization kaise kaam karता?', a: 'Total height calculate (count × size), scroll position se visible range nikalता, sirf wo items absolute-positioned render. Spacer scroll height maintain karता. Items recycle.' },
        { q: 'Kab virtualize NAHI karein?', a: 'Chhote lists (<100) — overhead net loss. Aur SEO content (off-screen crawl nahi) ya Ctrl+F search miss ho sakta — trade-offs.' },
      ],
    },
    mcqs: [
      { q: 'Virtualization renders?', options: ['All items', 'Visible items', 'Half', 'None'], answer: 1, explain: 'Sirf visible (viewport).' },
      { q: 'Library?', options: ['axios', 'react-window', 'formik', 'zod'], answer: 1, explain: 'react-window.' },
    ],
    exercises: {
      easy: ['Virtualization ka concept likho.'],
      medium: ['react-window se 1000-item list banao.'],
      advanced: ['Variable-height virtualized list banao.'],
    },
    summary: [
      'Virtualization = sirf visible items render.',
      'Bade lists (100s+) ke liye.',
      'react-window/TanStack Virtual.',
      'DOM nodes kam = fast render/scroll.',
    ],
    cheatsheet: [
      { h: 'react-window', code: `<FixedSizeList height itemCount itemSize>\n  {({index,style})=><div style={style}/>}\n</FixedSizeList>` },
    ],
    projects: ['Chat message list', 'Infinite feed', 'Data table', 'Contacts list'],
    advanced:
      'Variable size (VariableSizeList), dynamic measurement (TanStack Virtual). Windowing + infinite scroll (load more on scroll). Grid virtualization (2D). Sticky headers. Accessibility (aria, focus management) virtualized lists mein tricky.',
    quiz: [
      { q: 'DOM nodes virtualized?', options: ['All', '~viewport', 'Half', '0'], answer: 1, explain: 'Sirf visible+buffer.' },
      { q: 'Small list virtualize?', options: ['Always', 'Overkill', 'Required', 'Faster'], answer: 1, explain: 'Overkill for small.' },
    ],
    related: ['lists-keys', 'memoization', 'api-handling'],
  },

  'react-router': {
    overview:
      '**React Router** SPA mein client-side routing deता — URL change par components swap (no page reload). Core: **BrowserRouter** (wrap), **Routes/Route** (path → component), **Link** (navigation), **nested routes + Outlet**, **dynamic params** (`:id` + useParams), **useNavigate** (programmatic).',
    why:
      'Har multi-page SPA ko routing chahiye. React Router standard hai. Nested routes, params, navigation interview + daily kaam.',
    concept: [
      { h: 'Setup (BrowserRouter, Routes, Route)', p: 'App ko BrowserRouter mein wrap; Routes ke andar Route (path → element).', code: `<BrowserRouter>\n  <Routes>\n    <Route path="/" element={<Home />} />\n    <Route path="/about" element={<About />} />\n  </Routes>\n</BrowserRouter>` },
      { h: 'Link & useNavigate', p: 'Link declarative navigation (no reload); useNavigate programmatic (after action).', code: `<Link to="/about">About</Link>\nconst navigate = useNavigate()\nnavigate('/dashboard')` },
      { h: 'Nested routes + Outlet', p: 'Route ke andar Route; parent mein Outlet child render karता (shared layout).', code: `<Route path="/dash" element={<Layout />}>\n  <Route path="stats" element={<Stats />} />\n</Route>\n// Layout: <Outlet />` },
      { h: 'Dynamic routing + useParams', p: ':param se dynamic segments; useParams se value.', code: `<Route path="/user/:id" element={<User />} />\nconst { id } = useParams()` },
    ],
    analogy:
      'React Router ek **building directory + lift** jaisा — URL (floor number) batao, lift (router) tumhe wahi floor (component) dikhाता bina building dobara banaye (no reload). Outlet = floor ka common lobby jisme room (nested route) khulta. 🏢',
    syntax: { code: `<BrowserRouter>\n  <Routes>\n    <Route path="/" element={<Home />} />\n    <Route path="/user/:id" element={<User />} />\n  </Routes>\n</BrowserRouter>\n// useParams(), useNavigate(), <Link>, <Outlet>`, note: 'v6+ element prop; nested routes + Outlet.' },
    examples: [
      { level: 'Intermediate', title: 'Routes + params', code: `function App() {\n  return (\n    <BrowserRouter>\n      <Routes>\n        <Route path="/" element={<Home />} />\n        <Route path="/products/:id" element={<Product />} />\n      </Routes>\n    </BrowserRouter>\n  )\n}\nfunction Product() {\n  const { id } = useParams()\n  const navigate = useNavigate()\n  return <button onClick={() => navigate('/')}>Product {id}</button>\n}`, explain: 'Dynamic param + programmatic navigation.' },
    ],
    notes: {
      concept: 'BrowserRouter + Routes/Route + Link + Outlet + useParams/useNavigate.',
      tip: 'Internal navigation Link/navigate (no <a> — reload).',
      warning: 'SPA refresh par server 404 — rewrites/fallback to index.html chahiye.',
      error: '<a href> internal navigation = full reload (state loss).',
    },
    compare: {
      headers: ['Tool', 'Use'],
      rows: [
        ['BrowserRouter', 'Router wrap'],
        ['Route', 'path → element'],
        ['Link/NavLink', 'Declarative nav'],
        ['useNavigate', 'Programmatic nav'],
        ['useParams', 'URL params'],
        ['Outlet', 'Nested route render'],
      ],
    },
    mistakes: [
      { bad: '<a> for internal links.', fix: '<Link to>.' },
      { bad: 'SPA refresh 404 ignore.', fix: 'Server rewrite to index.html.' },
    ],
    best: ['Link/NavLink for navigation.', 'Nested routes + Outlet (layouts).', 'Lazy load route components.', 'Server rewrite for SPA refresh.', 'useParams for dynamic data.'],
    performance:
      'Route-based code splitting (lazy + Suspense) initial bundle chhota. Data loading (loaders in v6.4+) parallel. Link prefetch. Nested routes shared layout re-render avoid.',
    interview: {
      intermediate: [
        { q: 'React Router kya karता?', a: 'SPA mein client-side routing — URL change par components swap, no page reload. BrowserRouter + Routes/Route + Link.' },
        { q: 'Nested routes + Outlet?', a: 'Route ke andar Route (nested). Parent component mein <Outlet /> child route ko render karता — shared layouts ke liye.' },
        { q: 'useParams aur useNavigate?', a: 'useParams URL ke dynamic params (:id) deता. useNavigate programmatic navigation (function se) deता.' },
      ],
      advanced: [
        { q: 'SPA routing refresh par 404 kyun?', a: 'Server ko /about route nahi pata (sirf client). Refresh par server file dhoondта, milti nahi. Fix: server rewrite — saare routes index.html serve karein (SPA fallback).' },
      ],
    },
    mcqs: [
      { q: 'Internal navigation?', options: ['<a>', '<Link>', 'window.location', 'href'], answer: 1, explain: '<Link> (no reload).' },
      { q: 'URL params?', options: ['useState', 'useParams', 'useRef', 'props'], answer: 1, explain: 'useParams.' },
    ],
    exercises: {
      easy: ['2 routes setup karो.'],
      medium: ['Dynamic route :id + useParams.'],
      advanced: ['Nested routes + Outlet + lazy loading.'],
    },
    summary: [
      'React Router = client-side SPA routing.',
      'BrowserRouter + Routes/Route + Link.',
      'Nested routes + Outlet (layouts).',
      'useParams (params), useNavigate (programmatic).',
    ],
    cheatsheet: [
      { h: 'Router', code: `<Route path="/u/:id" element={<U/>}/>\n<Link to="/x"/>\nuseParams() useNavigate() <Outlet/>` },
    ],
    projects: ['Multi-page SPA', 'Dashboard with nested routes', 'Protected routes'],
    advanced:
      'Data routers (v6.4+): loaders/actions (parallel data), defer, useLoaderData. Protected routes (auth guards). Lazy routes. Search params (useSearchParams). Remote/Next.js routing alternatives. Scroll restoration.',
    quiz: [
      { q: 'Nested route render?', options: ['Outlet', 'children', 'slot', 'render'], answer: 0, explain: '<Outlet />.' },
      { q: 'Programmatic nav?', options: ['useParams', 'useNavigate', 'Link', 'href'], answer: 1, explain: 'useNavigate.' },
    ],
    related: ['spa-vs-mpa', 'lazy-suspense', 'api-handling'],
  },

  'react-query': {
    overview:
      '**React Query (TanStack Query)** server state (API data) manage karता — fetching, **caching**, refetching, sync. useQuery (read), useMutation (write). Automatic caching, background refetch, loading/error states, deduplication. useState + useEffect se manual fetching ki jagah — kam code, behtar UX.',
    why:
      'Server state management ka modern standard. Caching, refetch, optimistic updates senior interview + production. "useEffect se fetch kyun nahi".',
    concept: [
      { h: 'useQuery', p: 'Data fetch + cache. queryKey (cache id) + queryFn. data, isLoading, error automatically.', code: `const { data, isLoading, error } = useQuery({\n  queryKey: ['todos'],\n  queryFn: fetchTodos\n})` },
      { h: 'Caching', p: 'Data queryKey ke against cache hota. Same key dobara → cached data turant (background refetch). staleTime/gcTime control.', code: `useQuery({ queryKey: ['user', id], queryFn, staleTime: 60000 })` },
      { h: 'useMutation', p: 'Create/update/delete. onSuccess par cache invalidate (refetch).', code: `const mutation = useMutation({\n  mutationFn: addTodo,\n  onSuccess: () => queryClient.invalidateQueries(['todos'])\n})` },
      { h: 'Optimistic updates', p: 'UI ko turant update (mutation success maan kar), error par rollback. Snappy UX.', code: `onMutate: async (newTodo) => {\n  // optimistically update cache\n}` },
    ],
    analogy:
      'React Query ek **smart fridge** hai — data (groceries) ek baar laकर store (cache) karता. Dobara chahiye to fridge se turant (cached), aur background mein fresh laकर update. Tumhe har baar market (API) nahi jaana. 🧊',
    syntax: { code: `const { data, isLoading, error, refetch } = useQuery({\n  queryKey: ['key', id],\n  queryFn: () => fetch(url).then(r => r.json())\n})\nconst m = useMutation({ mutationFn, onSuccess })`, note: 'queryKey cache identity; invalidateQueries se refetch.' },
    examples: [
      { level: 'Intermediate', title: 'useQuery basics', code: `function Todos() {\n  const { data, isLoading, error } = useQuery({\n    queryKey: ['todos'],\n    queryFn: () => fetch('/api/todos').then(r => r.json())\n  })\n  if (isLoading) return <Spinner />\n  if (error) return <Error />\n  return <ul>{data.map(t => <li key={t.id}>{t.text}</li>)}</ul>\n}`, explain: 'Caching, loading, error — sab automatic, no useEffect.' },
    ],
    internals:
      'React Query ek in-memory cache (queryKey → data + metadata) rakhता. Query states: fresh, fetching, stale, inactive. staleTime ke baad data stale (refetch on focus/mount). gcTime ke baad inactive cache garbage collect. Deduplication (same key concurrent requests merge). Subscriptions se components re-render on cache change.',
    notes: {
      concept: 'React Query = server state (cache, refetch, sync).',
      tip: 'queryKey unique + descriptive; invalidate se refetch.',
      warning: 'Server state vs client state alag — RQ server ke liye.',
      error: 'useEffect se manual fetch (no cache, race conditions, duplicate) — RQ better.',
    },
    compare: {
      headers: ['Feature', 'useEffect fetch', 'React Query'],
      rows: [
        ['Caching', 'Manual', 'Automatic'],
        ['Refetch', 'Manual', 'Background/auto'],
        ['Loading/error', 'Manual state', 'Built-in'],
        ['Dedup', 'Nahi', 'Haan'],
        ['Code', 'Zyada', 'Kam'],
      ],
    },
    mistakes: [
      { bad: 'Server data ko useState/Redux mein.', fix: 'React Query (server state).' },
      { bad: 'Non-unique queryKeys.', fix: 'Descriptive + params (["user", id]).' },
    ],
    best: ['Server state → React Query.', 'Descriptive queryKeys.', 'invalidateQueries after mutations.', 'staleTime tune karो.', 'Optimistic updates for UX.'],
    performance:
      'Caching duplicate requests bachाता (dedup). Background refetch fresh data without blocking. staleTime se unnecessary refetch kam. Prefetching (hover). Pagination/infinite queries efficient. Server state Redux se nikaal kar bundle/complexity kam.',
    interview: {
      advanced: [
        { q: 'React Query kya solve karता?', a: 'Server state management — caching, background refetch, loading/error states, deduplication, sync. useEffect+useState manual fetching ki boilerplate + bugs (race conditions, no cache) hata deता.' },
        { q: 'React Query caching kaise?', a: 'queryKey ke against in-memory cache. Same key → cached data turant + background refetch (stale-while-revalidate). staleTime fresh duration, gcTime inactive cleanup. Dedup concurrent same-key requests.' },
        { q: 'Optimistic updates?', a: 'Mutation success maan kar UI turant update (onMutate cache update), error par rollback. Snappy UX without waiting for server.' },
      ],
    },
    mcqs: [
      { q: 'Data fetch hook?', options: ['useEffect', 'useQuery', 'useState', 'useFetch'], answer: 1, explain: 'useQuery.' },
      { q: 'Cache identity?', options: ['queryKey', 'url', 'id', 'name'], answer: 0, explain: 'queryKey.' },
    ],
    exercises: {
      easy: ['useQuery se data fetch karो.'],
      medium: ['useMutation + invalidateQueries.'],
      advanced: ['Optimistic update implement karो.'],
    },
    summary: [
      'React Query = server state (cache, refetch, sync).',
      'useQuery (read), useMutation (write).',
      'queryKey cache identity; auto loading/error.',
      'Optimistic updates for snappy UX.',
    ],
    cheatsheet: [
      { h: 'React Query', code: `useQuery({queryKey:['x'],queryFn})\nuseMutation({mutationFn,onSuccess})\nqueryClient.invalidateQueries(['x'])` },
    ],
    projects: ['Data dashboard', 'Infinite feed', 'CRUD app', 'Optimistic todo'],
    advanced:
      'Infinite queries (useInfiniteQuery). Prefetching. Optimistic updates + rollback. Query invalidation strategies. SSR/hydration (dehydrate). Suspense mode. Select (transform). React Query vs SWR vs RTK Query.',
    quiz: [
      { q: 'Server state tool?', options: ['Redux', 'React Query', 'Context', 'useRef'], answer: 1, explain: 'React Query (server state).' },
      { q: 'Mutation refetch?', options: ['reload', 'invalidateQueries', 'setState', 'refresh'], answer: 1, explain: 'invalidateQueries.' },
    ],
    related: ['api-handling', 'state-management', 'useeffect'],
  },

  'api-handling': {
    overview:
      'API handling = server se data fetch/send + states manage (loading, error, success). **fetch** (built-in) ya **axios** (library, interceptors). Patterns: loading/error states, retry, **pagination** (page-by-page), **infinite scroll** (scroll par load). Modern: React Query inhe automate karता.',
    why:
      'Har app API se data leता. Loading/error handling, pagination, infinite scroll daily kaam + interview (manual + library both).',
    concept: [
      { h: 'fetch vs axios', p: 'fetch built-in (manual JSON, error handling). axios library — auto JSON, interceptors, better errors, request cancellation.', code: `// fetch\nconst res = await fetch(url)\nconst data = await res.json()\n// axios\nconst { data } = await axios.get(url)` },
      { h: 'Loading & error states', p: 'useState se loading/error/data manage; useEffect mein fetch + cleanup.', code: `const [data, setData] = useState(null)\nconst [loading, setLoading] = useState(true)\nconst [error, setError] = useState(null)` },
      { h: 'Pagination', p: 'Page-by-page data (page + limit). Buttons/page numbers se navigate.', code: `fetch(\`/api?page=\${page}&limit=10\`)` },
      { h: 'Infinite scroll', p: 'Scroll bottom (IntersectionObserver) par next page load + append. Endless feed.', code: `const observer = new IntersectionObserver(([e]) => {\n  if (e.isIntersecting) loadMore()\n})` },
    ],
    analogy:
      'API handling ek **restaurant order** hai — order do (request), "ban raha hai" (loading), aaya (data) ya "out of stock" (error). Pagination = menu ke pages palatना. Infinite scroll = "aur dikhाओ" automatically jab neeche pahuncho. 🍽️',
    syntax: { code: `useEffect(() => {\n  let active = true\n  setLoading(true)\n  fetch(url)\n    .then(r => { if (!r.ok) throw Error(r.status); return r.json() })\n    .then(d => active && setData(d))\n    .catch(e => active && setError(e))\n    .finally(() => active && setLoading(false))\n  return () => { active = false }\n}, [url])`, note: 'Cleanup (active flag/AbortController) race conditions rokता.' },
    examples: [
      { level: 'Intermediate', title: 'Fetch with states', code: `function Users() {\n  const [users, setUsers] = useState([])\n  const [loading, setLoading] = useState(true)\n  const [error, setError] = useState(null)\n  useEffect(() => {\n    let active = true\n    fetch('/api/users')\n      .then(r => r.json())\n      .then(d => active && setUsers(d))\n      .catch(e => active && setError(e))\n      .finally(() => active && setLoading(false))\n    return () => { active = false }\n  }, [])\n  if (loading) return <Spinner />\n  if (error) return <Error />\n  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>\n}`, explain: 'Manual states + cleanup. (React Query se simpler.)' },
    ],
    memory:
      'Pending fetch ka callback (closure) memory mein. Cleanup (AbortController/flag) se stale response ignore + leak avoid. Infinite scroll mein accumulated data grow karता (virtualize bade lists). axios cancellation (AbortController) unmount par.',
    notes: {
      concept: 'fetch/axios + loading/error/data states. Pagination, infinite scroll.',
      tip: 'Race conditions ke liye cleanup (AbortController/flag).',
      warning: 'fetch errors par reject nahi karता (4xx/5xx) — res.ok check karो.',
      error: 'Cleanup na karna — unmounted component setState warning + race.',
    },
    compare: {
      headers: ['Feature', 'fetch', 'axios'],
      rows: [
        ['Built-in', 'Haan', 'Nahi (library)'],
        ['JSON', 'Manual .json()', 'Auto'],
        ['Errors', '4xx ok (res.ok check)', 'Rejects on 4xx/5xx'],
        ['Interceptors', 'Nahi', 'Haan'],
        ['Cancel', 'AbortController', 'AbortController/CancelToken'],
      ],
    },
    mistakes: [
      { bad: 'fetch 4xx ko success samajhna.', fix: 'res.ok check + throw.' },
      { bad: 'Cleanup na karna.', fix: 'AbortController / active flag.' },
    ],
    best: ['Loading/error/empty states handle.', 'Cleanup (AbortController).', 'res.ok check (fetch).', 'Retry with backoff.', 'Server state → React Query.'],
    performance:
      'Caching (React Query) duplicate fetches bachаता. Debounce search APIs. Pagination/infinite scroll se bade data chunked. AbortController stale requests cancel. Parallel requests (Promise.all). Prefetch.',
    interview: {
      intermediate: [
        { q: 'fetch vs axios?', a: 'fetch built-in (manual JSON, 4xx success — res.ok check). axios library — auto JSON, interceptors, rejects on 4xx/5xx, request cancellation. axios convenient.' },
        { q: 'Loading/error states kaise?', a: 'useState (data, loading, error) + useEffect mein fetch with cleanup. Conditional render (early returns). React Query se automatic.' },
      ],
      advanced: [
        { q: 'Race condition fetch mein?', a: 'Fast successive requests (jaise search) — purana response baad mein aakar naye ko overwrite kar sakta. Fix: cleanup flag ya AbortController (purana cancel).' },
        { q: 'Infinite scroll kaise?', a: 'IntersectionObserver (ya scroll listener) se bottom detect, next page fetch + append. Loading state, hasMore flag, dedup. Bade lists virtualize.' },
      ],
    },
    mcqs: [
      { q: 'fetch 4xx?', options: ['Rejects', 'res.ok check', 'Throws', 'Retries'], answer: 1, explain: 'res.ok check karna padता.' },
      { q: 'Cancel request?', options: ['clearTimeout', 'AbortController', 'return', 'stop'], answer: 1, explain: 'AbortController.' },
    ],
    exercises: {
      easy: ['fetch se data + loading state.'],
      medium: ['Pagination implement karो.'],
      advanced: ['Infinite scroll (IntersectionObserver) banao.'],
    },
    summary: [
      'fetch/axios + loading/error/data states.',
      'fetch 4xx success (res.ok check); axios rejects.',
      'Cleanup (AbortController) race conditions.',
      'Pagination, infinite scroll; React Query best.',
    ],
    cheatsheet: [
      { h: 'Fetch', code: `fetch(url).then(r=>r.json())\nif(!r.ok) throw\nAbortController for cancel` },
    ],
    projects: ['User list with states', 'Paginated table', 'Infinite feed', 'Search with debounce'],
    advanced:
      'AbortController cancellation. Retry with exponential backoff. Optimistic updates. Request deduplication. SWR/React Query (caching). GraphQL (Apollo). Error boundaries for fetch errors. Suspense for data.',
    quiz: [
      { q: 'Auto JSON?', options: ['fetch', 'axios', 'Both', 'Neither'], answer: 1, explain: 'axios auto-parses.' },
      { q: 'Infinite scroll detect?', options: ['useState', 'IntersectionObserver', 'useRef', 'Context'], answer: 1, explain: 'IntersectionObserver.' },
    ],
    related: ['react-query', 'useeffect', 'error-handling'],
  },

  'state-management': {
    overview:
      'State management bade apps mein shared state handle karता. Options: **Context API** (built-in, simple), **Redux Toolkit** (predictable, large apps, devtools), **Zustand** (minimal, hooks-based, no boilerplate), **Recoil/Jotai** (atomic). Server state ke liye React Query alag. Choice app size + complexity par.',
    why:
      'Bade apps mein state management critical. "Redux vs Context vs Zustand" senior interview ka common question. Tool selection skill.',
    concept: [
      { h: 'Context API', p: 'Built-in, simple global state (theme, auth). Frequently-changing/large state ke liye performance issues (all consumers re-render).', code: `const Ctx = createContext()\nconst val = useContext(Ctx)` },
      { h: 'Redux Toolkit', p: 'Predictable centralized store, actions/reducers (createSlice), devtools, middleware. Large apps, complex state, team.', code: `const slice = createSlice({ name, initialState, reducers })\nconst count = useSelector(s => s.counter.value)\ndispatch(increment())` },
      { h: 'Zustand', p: 'Minimal hooks-based store, no boilerplate, no provider, selective subscriptions (no extra re-renders). Modern favourite.', code: `const useStore = create((set) => ({\n  count: 0,\n  inc: () => set(s => ({ count: s.count + 1 }))\n}))\nconst count = useStore(s => s.count)` },
      { h: 'Recoil/Jotai (atomic)', p: 'Atom-based — chhote independent state pieces, fine-grained subscriptions. Jotai lightweight.', code: `const countAtom = atom(0)\nconst [count, setCount] = useAtom(countAtom)` },
    ],
    analogy:
      'State management ek **office filing system** hai. Context = ek shared notice board (chhota office). Redux = ek strict central records department (rules, audit trail — bade org). Zustand = ek smart shared drawer (jisko chahiye wahi kholे, minimal rules). 🗄️',
    syntax: { code: `// Zustand\nconst useStore = create(set => ({ x: 0, inc: () => set(s => ({x:s.x+1})) }))\n// Redux Toolkit\nconst {value} = useSelector(s => s.counter); dispatch(increment())\n// Context\nconst val = useContext(Ctx)`, note: 'Server state (API) ke liye React Query, client state ke liye yeh.' },
    examples: [
      { level: 'Advanced', title: 'Zustand store', code: `import { create } from 'zustand'\nconst useCart = create((set) => ({\n  items: [],\n  add: (item) => set(s => ({ items: [...s.items, item] })),\n  clear: () => set({ items: [] })\n}))\nfunction Cart() {\n  const items = useCart(s => s.items)  // selective\n  const add = useCart(s => s.add)\n  return <button onClick={() => add({ id: 1 })}>{items.length}</button>\n}`, explain: 'No provider, no boilerplate, selective subscription.' },
    ],
    notes: {
      concept: 'Context (simple), Redux Toolkit (large), Zustand (minimal), atomic (fine-grained).',
      tip: 'Server state → React Query; client state → Context/Zustand/Redux.',
      warning: 'Context frequently-changing data ke liye slow (all consumers).',
      error: 'Sab kuch global state mein — local state local rakho.',
    },
    compare: {
      headers: ['Tool', 'Boilerplate', 'Best for'],
      rows: [
        ['Context', 'Low', 'Simple global (theme/auth)'],
        ['Redux Toolkit', 'Medium', 'Large apps, devtools, team'],
        ['Zustand', 'Very low', 'Most apps (minimal)'],
        ['Jotai/Recoil', 'Low', 'Atomic/fine-grained'],
      ],
    },
    mistakes: [
      { bad: 'Sab state global mein.', fix: 'Local state local; sirf shared global.' },
      { bad: 'Server data Redux mein.', fix: 'React Query (server state).' },
    ],
    best: ['Local state local rakho.', 'Server state → React Query.', 'Client global → Zustand (simple) / Redux (complex).', 'Context for rarely-changing (theme/auth).', 'Avoid premature global state.'],
    performance:
      'Context all consumers re-render (no selector). Redux/Zustand selective subscriptions (sirf used slice). Zustand/Jotai minimal re-renders. Server state separate (React Query) se client store light. Memoize selectors.',
    interview: {
      advanced: [
        { q: 'Context vs Redux vs Zustand?', a: 'Context: built-in, simple, all-consumers re-render. Redux Toolkit: predictable, devtools, large apps, more setup. Zustand: minimal, hooks, selective subscriptions, no boilerplate. Choice app complexity par.' },
        { q: 'Redux kab zaroori?', a: 'Large apps, complex shared state, team, time-travel debugging, middleware (sagas). Chhote apps ke liye Context/Zustand kaafi. Redux Toolkit ne boilerplate kam kiya.' },
        { q: 'Client state vs server state?', a: 'Client state: UI state (modals, forms, theme) — Context/Zustand/Redux. Server state: API data (cache, sync) — React Query/SWR. Inhe alag manage karो.' },
      ],
    },
    mcqs: [
      { q: 'Minimal boilerplate?', options: ['Redux', 'Zustand', 'Context', 'MobX'], answer: 1, explain: 'Zustand.' },
      { q: 'Server state?', options: ['Redux', 'React Query', 'Context', 'Zustand'], answer: 1, explain: 'React Query.' },
    ],
    exercises: {
      easy: ['Context se theme state.'],
      medium: ['Zustand store banao (counter).'],
      advanced: ['Redux Toolkit slice banao.'],
    },
    summary: [
      'Context (simple), Redux (large), Zustand (minimal), atomic.',
      'Server state → React Query (separate).',
      'Local state local; global only shared.',
      'Zustand modern minimal favourite.',
    ],
    cheatsheet: [
      { h: 'Options', code: `Context: useContext\nRedux: useSelector/dispatch\nZustand: create + selector` },
    ],
    projects: ['Cart (Zustand)', 'Auth (Context)', 'Complex app (Redux)', 'Atomic state (Jotai)'],
    advanced:
      'Redux Toolkit (createSlice, RTK Query). Zustand middleware (persist, devtools). Jotai atoms + derived. Recoil selectors. State machines (xstate). Selector memoization (reselect). Context + useReducer DIY.',
    quiz: [
      { q: 'Redux selector?', options: ['useContext', 'useSelector', 'useStore', 'atom'], answer: 1, explain: 'useSelector.' },
      { q: 'Atomic library?', options: ['Redux', 'Jotai/Recoil', 'Context', 'Zustand'], answer: 1, explain: 'Jotai/Recoil atoms.' },
    ],
    related: ['context-api', 'usereducer', 'react-query'],
  },

  'react-typescript': {
    overview:
      'TypeScript React ko **type-safe** banाता — props, state, events, hooks sab typed. Bugs compile-time par pakad mein, better autocomplete + refactoring. **Props typing** (interface/type), **state typing** (useState generic), **generic components** (reusable + typed). Modern React + TS standard.',
    why:
      'Bade/team projects mein TypeScript standard. Type-safe props/hooks interview + daily kaam. "TS kyun" senior question.',
    concept: [
      { h: 'Props typing', p: 'interface ya type se props define; component ko type do.', code: `interface Props {\n  name: string\n  age?: number  // optional\n  onClick: () => void\n}\nfunction User({ name, age, onClick }: Props) {}` },
      { h: 'State typing', p: 'useState generic se type (often inferred). Complex/union types explicit.', code: `const [count, setCount] = useState<number>(0)\nconst [user, setUser] = useState<User | null>(null)` },
      { h: 'interface vs type', p: 'interface (extendable, objects), type (unions, primitives, computed). Props ke liye dono OK; interface convention.', code: `type Status = 'idle' | 'loading' | 'error'\ninterface User { id: number; name: string }` },
      { h: 'Generic components', p: 'Reusable typed components — <T> se any type ke saath type-safe.', code: `function List<T>({ items, render }: { items: T[], render: (item: T) => ReactNode }) {\n  return <>{items.map(render)}</>\n}` },
    ],
    analogy:
      'TypeScript ek **spell-checker + grammar-checker** jaisा hai code ke liye — galat type (galti) ko likhte hi underline (compile error) kar deता, run karne se pehle. Bina TS = galti production mein milti (runtime). 📝',
    syntax: { code: `interface Props { title: string; count?: number }\nfunction C({ title, count = 0 }: Props) {}\nconst [s, setS] = useState<string>('')\nconst ref = useRef<HTMLInputElement>(null)`, note: 'Props interface/type; hooks generics; event types (React.ChangeEvent).' },
    examples: [
      { level: 'Intermediate', title: 'Typed component', code: `interface ButtonProps {\n  label: string\n  variant?: 'primary' | 'ghost'\n  onClick: (e: React.MouseEvent) => void\n}\nfunction Button({ label, variant = 'primary', onClick }: ButtonProps) {\n  return <button className={variant} onClick={onClick}>{label}</button>\n}`, explain: 'Props typed — wrong usage compile error.' },
    ],
    notes: {
      concept: 'TS = type-safe props/state/events/hooks. Compile-time bugs.',
      tip: 'useState mostly inferred; explicit for union/null.',
      warning: 'any avoid karो (type safety khatam).',
      error: 'Event types galat (e: any) — React.ChangeEvent<HTMLInputElement> use karो.',
    },
    compare: {
      headers: ['Feature', 'interface', 'type'],
      rows: [
        ['Objects', '✅', '✅'],
        ['Unions', '❌', '✅'],
        ['Extend', 'extends', '& (intersection)'],
        ['Convention', 'Props/objects', 'Unions/utilities'],
      ],
    },
    mistakes: [
      { bad: 'any everywhere.', fix: 'Proper types (unknown if needed).' },
      { bad: 'Event handler e: any.', fix: 'React.ChangeEvent<HTMLInputElement>.' },
    ],
    best: ['Props interface/type.', 'Avoid any (use unknown/generics).', 'Event types (React.* events).', 'Infer where possible.', 'Generic components for reuse.'],
    performance:
      'TypeScript compile-time only — runtime par no cost (types erase ho jaate). Better refactoring + fewer bugs = indirect performance (less debugging). Type-only imports bundle affect nahi.',
    interview: {
      intermediate: [
        { q: 'React mein TS ke fayde?', a: 'Type-safe props/state/hooks — compile-time bugs, better autocomplete + refactoring, self-documenting. Team/large projects mein fewer runtime errors.' },
        { q: 'interface vs type?', a: 'interface objects ke liye (extendable, declaration merging). type unions/primitives/computed ke liye. Props ke liye dono OK; interface convention.' },
      ],
      advanced: [
        { q: 'Generic components kya hain?', a: '<T> type parameter wale reusable components jo kisi bhi type ke saath type-safe kaam karein (jaise typed List<T>). Reusability + safety.' },
      ],
    },
    mcqs: [
      { q: 'Union type?', options: ['interface', 'type', 'Both', 'Neither'], answer: 1, explain: 'type (unions).' },
      { q: 'TS runtime cost?', options: ['High', 'None (erased)', 'Medium', 'Doubles'], answer: 1, explain: 'Compile-time only.' },
    ],
    exercises: {
      easy: ['Props interface banao + use.'],
      medium: ['useState union type (idle/loading/error).'],
      advanced: ['Generic List<T> component banao.'],
    },
    summary: [
      'TS = type-safe props/state/events/hooks.',
      'interface (objects), type (unions).',
      'useState generic (often inferred).',
      'Generic components for typed reuse.',
    ],
    cheatsheet: [
      { h: 'TS React', code: `interface Props{name:string}\nuseState<T>(init)\nuseRef<HTMLInputElement>(null)\nReact.ChangeEvent<...>` },
    ],
    projects: ['Typed form', 'Generic table', 'Typed API hooks'],
    advanced:
      'Utility types (Partial, Pick, Omit, Record). Discriminated unions. Generic hooks. ComponentProps<typeof X>. as const. Type-safe context. Zod + TS inference. Template literal types.',
    quiz: [
      { q: 'Props type tool?', options: ['PropTypes', 'interface/type', 'class', 'enum'], answer: 1, explain: 'interface/type.' },
      { q: 'Avoid?', options: ['interface', 'any', 'generics', 'unions'], answer: 1, explain: 'any (no safety).' },
    ],
    related: ['props', 'state-usestate', 'architecture'],
  },

  architecture: {
    overview:
      'React app architecture = code ko scalable, maintainable structure mein organize karna. Approaches: **folder by type** (components/hooks/utils — chhote apps), **feature-based** (har feature ka folder — bade apps), **Atomic Design** (atoms→molecules→organisms). Plus: custom hooks folder, **service layer** (API isolation), barrel exports.',
    why:
      'Bade apps mein structure maintainability decide karता. "Folder structure kaise" practical interview + real projects. Scalability skill.',
    concept: [
      { h: 'Folder by type', p: 'components/, hooks/, utils/, pages/. Simple, chhote apps. Bade apps mein folders bloat.', code: `src/\n  components/\n  hooks/\n  utils/\n  pages/` },
      { h: 'Feature-based', p: 'Har feature ka self-contained folder (components + hooks + api). Scalable, co-location. Bade apps ke liye best.', code: `src/features/\n  auth/ (components, hooks, api)\n  cart/\n  products/` },
      { h: 'Atomic Design', p: 'UI hierarchy: atoms (Button) → molecules (SearchBar) → organisms (Header) → templates → pages. Design systems.' },
      { h: 'Service layer', p: 'API calls ko alag service files mein isolate — components clean, reusable, testable.', code: `// services/userService.js\nexport const getUser = (id) => api.get(\`/users/\${id}\`)` },
    ],
    analogy:
      'Architecture ek **ghar ka layout** hai. Folder-by-type = sab cheezein type se (saare kapde ek almari, saari kitabein ek). Feature-based = har kamre (feature) mein uski cheezein (bedroom mein bistar+lamp). Bade ghar (app) ke liye feature-based dhoondna aasaan. 🏠',
    syntax: { code: `// Feature-based\nsrc/\n  features/auth/{components,hooks,api,types}\n  shared/{components,hooks,utils}\n  services/api.js\n  app/store.js`, note: 'Co-location: related cheezein saath; shared alag.' },
    notes: {
      concept: 'Folder-by-type (small), feature-based (large), atomic (design).',
      tip: 'Feature-based + shared folder bade apps ke liye.',
      warning: 'Over-engineering chhote apps mein — simple start karो.',
      error: 'API calls components mein scatter — service layer mein.',
    },
    compare: {
      headers: ['Approach', 'Best for', 'Co-location'],
      rows: [
        ['By type', 'Small apps', 'Low'],
        ['Feature-based', 'Large apps', 'High'],
        ['Atomic', 'Design systems', 'UI hierarchy'],
      ],
    },
    mistakes: [
      { bad: 'API calls components mein.', fix: 'Service layer.' },
      { bad: 'Over-engineer chhote app.', fix: 'Simple by-type, grow as needed.' },
    ],
    best: ['Feature-based for scale.', 'Service layer (API isolation).', 'Custom hooks folder.', 'Shared/common folder.', 'Barrel exports (index.js).', 'Consistent naming.'],
    interview: {
      intermediate: [
        { q: 'React folder structure approaches?', a: 'Folder-by-type (components/hooks/utils — small). Feature-based (per-feature folders — large, co-location). Atomic Design (atoms→organisms — design systems).' },
        { q: 'Service layer kya hai?', a: 'API calls ko alag service files mein isolate karna — components UI par focus, API logic reusable + testable + ek jagah.' },
      ],
      advanced: [
        { q: 'Feature-based kyun scale karта?', a: 'Co-location (feature ka sab kuch saath), independent features (low coupling), easy to find/delete/move, team parallel work. Bade apps mein by-type folders bloat ho jaate.' },
      ],
    },
    mcqs: [
      { q: 'Large app structure?', options: ['By type', 'Feature-based', 'Flat', 'Random'], answer: 1, explain: 'Feature-based (co-location).' },
      { q: 'API isolation?', options: ['Components', 'Service layer', 'Context', 'Hooks only'], answer: 1, explain: 'Service layer.' },
    ],
    exercises: {
      easy: ['Folder-by-type structure likho.'],
      medium: ['Feature-based structure design karो.'],
      advanced: ['Service layer + custom hooks + features combine karो.'],
    },
    summary: [
      'By-type (small), feature-based (large), atomic (design).',
      'Service layer = API isolation.',
      'Custom hooks + shared folders.',
      'Simple start, scale as needed.',
    ],
    cheatsheet: [
      { h: 'Structure', code: `features/auth/{components,hooks,api}\nshared/, services/, app/` },
    ],
    projects: ['Scaffold feature-based app', 'Service layer setup', 'Atomic design system'],
    advanced:
      'Monorepo (Turborepo/Nx). Module boundaries (no cross-feature imports). Barrel files + tree-shaking caveats. Layered architecture (presentation/domain/data). Clean architecture. Component-driven (Storybook).',
    quiz: [
      { q: 'Atomic smallest?', options: ['Organism', 'Atom', 'Template', 'Page'], answer: 1, explain: 'Atom (Button).' },
      { q: 'Co-location best?', options: ['By type', 'Feature-based', 'Flat', 'Atomic'], answer: 1, explain: 'Feature-based.' },
    ],
    related: ['custom-hooks', 'react-typescript', 'testing'],
  },

  testing: {
    overview:
      'React testing se code reliable banता. **Jest** (test runner + assertions), **React Testing Library (RTL)** (components ko user ki tarah test — render, query, interact). **Unit testing** (isolated functions/components), **Integration testing** (multiple parts together). Philosophy: test behaviour, not implementation.',
    why:
      'Reliable code + confident refactoring. Testing senior-level skill + interview topic. "RTL philosophy" common question.',
    concept: [
      { h: 'Jest', p: 'Test runner + assertion library. describe/it/expect, mocks, coverage.', code: `test('adds', () => {\n  expect(add(2, 3)).toBe(5)\n})` },
      { h: 'React Testing Library', p: 'Components ko user perspective se test — render, getByRole/getByText, fireEvent/userEvent. Implementation details avoid.', code: `render(<Button label="Save" />)\nexpect(screen.getByText('Save')).toBeInTheDocument()` },
      { h: 'Unit vs Integration', p: 'Unit: isolated (ek function/component). Integration: multiple components together (form + submit + API mock).' },
      { h: 'Philosophy', p: 'Test what user sees/does (behaviour), not internal state/implementation. Refactor-safe tests.', code: `// Good: user behaviour\nfireEvent.click(screen.getByRole('button'))\nexpect(screen.getByText('Done')).toBeVisible()` },
    ],
    analogy:
      'Testing ek **car ka quality check** hai. RTL = "driver ki tarah test karo" (steering ghumao, brake dabाओ — user actions), na ki "engine ke har screw ko check" (implementation). Behaviour test = refactor karne par bhi pass (jab tak car chalti hai). 🚗',
    syntax: { code: `import { render, screen, fireEvent } from '@testing-library/react'\nrender(<Counter />)\nfireEvent.click(screen.getByRole('button'))\nexpect(screen.getByText('1')).toBeInTheDocument()`, note: 'getByRole prefer (accessibility); userEvent realistic.' },
    examples: [
      { level: 'Intermediate', title: 'Component test', code: `import { render, screen, fireEvent } from '@testing-library/react'\nimport Counter from './Counter'\ntest('increments', () => {\n  render(<Counter />)\n  const btn = screen.getByRole('button')\n  fireEvent.click(btn)\n  expect(screen.getByText('Count: 1')).toBeInTheDocument()\n})`, explain: 'User-perspective: click → expect visible result.' },
    ],
    notes: {
      concept: 'Jest (runner) + RTL (component testing). Test behaviour.',
      tip: 'getByRole > getByTestId (accessibility-first).',
      warning: 'Implementation details (state, internals) test mat karो — brittle.',
      error: 'Snapshot over-use (brittle); testing internal state.',
    },
    compare: {
      headers: ['Type', 'Scope', 'Example'],
      rows: [
        ['Unit', 'Isolated', 'Single function/component'],
        ['Integration', 'Multiple parts', 'Form + submit + mock API'],
        ['E2E', 'Full app', 'Cypress/Playwright'],
      ],
    },
    mistakes: [
      { bad: 'Internal state test karna.', fix: 'User-visible behaviour test.' },
      { bad: 'getByTestId everywhere.', fix: 'getByRole/getByText (accessible).' },
    ],
    best: ['Test behaviour, not implementation.', 'getByRole (accessibility).', 'userEvent (realistic interactions).', 'Mock API/external.', 'Integration > shallow unit for confidence.'],
    interview: {
      intermediate: [
        { q: 'Jest aur RTL?', a: 'Jest test runner + assertions (expect). RTL components ko user perspective se test (render, query by role/text, interact). Saath use hote.' },
        { q: 'RTL philosophy?', a: 'Test what user sees/does (behaviour), not implementation details (state, internals). "The more your tests resemble usage, the more confidence." Refactor-safe.' },
      ],
      advanced: [
        { q: 'Unit vs integration testing?', a: 'Unit: isolated piece (function/component). Integration: multiple parts together (form + submit + mocked API) — real flows, zyada confidence. Balance dono.' },
      ],
    },
    mcqs: [
      { q: 'Component testing lib?', options: ['Jest', 'RTL', 'axios', 'Zod'], answer: 1, explain: 'React Testing Library.' },
      { q: 'Prefer query?', options: ['getByTestId', 'getByRole', 'querySelector', 'getById'], answer: 1, explain: 'getByRole (accessibility).' },
    ],
    exercises: {
      easy: ['Ek pure function ka unit test (Jest).'],
      medium: ['Counter component test (RTL).'],
      advanced: ['Form integration test (fill + submit + mock API).'],
    },
    summary: [
      'Jest (runner) + RTL (component testing).',
      'Test behaviour, not implementation.',
      'Unit (isolated) vs integration (together).',
      'getByRole + userEvent (accessible, realistic).',
    ],
    cheatsheet: [
      { h: 'RTL', code: `render(<C/>)\nscreen.getByRole('button')\nfireEvent.click(el)\nexpect(el).toBeInTheDocument()` },
    ],
    projects: ['Test a form', 'Test custom hook', 'Test API component (MSW)', 'Coverage setup'],
    advanced:
      'MSW (mock service worker — API mocking). renderHook (test hooks). userEvent over fireEvent. waitFor (async). jest.mock. Coverage thresholds. E2E (Playwright/Cypress). Visual regression. Vitest (Vite-native).',
    quiz: [
      { q: 'Test runner?', options: ['RTL', 'Jest', 'axios', 'Babel'], answer: 1, explain: 'Jest.' },
      { q: 'Test what?', options: ['Implementation', 'Behaviour', 'State', 'Internals'], answer: 1, explain: 'User behaviour.' },
    ],
    related: ['architecture', 'custom-hooks', 'react-typescript'],
  },
}
