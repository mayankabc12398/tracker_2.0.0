// React content — Part 2: Components, Props, Conditional/Lists, State & Events

export const reactContentB = {
  'components-basics': {
    overview:
      '**Functional Components** React mein UI banाne ka modern, standard tarika hain — ek simple JS function jo **props** leता hai aur **JSX** return karता. Hooks ki wajah se ab class components ki zaroorat khatam. Components ko **compose** (nest) karके bada UI banता.',
    why:
      'Har React app components se bani hoti. Functional components + hooks aaj ka standard. Class vs functional, composition interview mein aate.',
    concept: [
      { h: 'Functional component', p: 'Ek function jo PascalCase naam ka ho aur JSX return kare. Props parameter leता.', code: `function Welcome({ name }) {\n  return <h1>Hello, {name}!</h1>\n}` },
      { h: 'Composition', p: 'Chhote components ko jodकर bade banाना. children prop se wrapping.', code: `function Card({ children }) {\n  return <div className="card">{children}</div>\n}\n<Card><Profile /></Card>` },
      { h: 'Reusable components', p: 'Props se configurable banाओ taaki alag jagah reuse ho. Ek component ek kaam.', code: `function Button({ variant, children }) {\n  return <button className={variant}>{children}</button>\n}` },
      { h: 'Class vs Functional', p: 'Class components purane (lifecycle methods, this). Functional + hooks modern — concise, no this. Naya code functional likho.' },
    ],
    analogy:
      'Functional component ek **recipe function** hai — ingredients (props) do, dish (UI) milti. Same recipe har baar same dish; alag ingredients alag result. Recipes ko combine karके pura meal (app). 🍲',
    syntax: { code: `function Greeting({ name = 'Guest' }) {\n  return <h1>Hi {name}</h1>\n}\n// arrow bhi\nconst Greeting = ({ name }) => <h1>Hi {name}</h1>\n// use\n<Greeting name="Dev" />`, note: 'Component PascalCase; props destructure karna common.' },
    steps: [
      'Function PascalCase naam se banाओ.',
      'Props parameter (object) lo, destructure karो.',
      'JSX return karो (props use karके).',
      'Component ko <Name /> se use karो (parent mein).',
      'Compose: components ko nest karके bada UI.',
    ],
    examples: [
      { level: 'Beginner', title: 'Reusable button', code: `function Button({ label, onClick, variant = 'primary' }) {\n  return <button className={variant} onClick={onClick}>{label}</button>\n}\n// use\n<Button label="Save" onClick={save} />\n<Button label="Cancel" variant="ghost" onClick={close} />`, explain: 'Ek component, props se alag-alag use.' },
      { level: 'Intermediate', title: 'Composition with children', code: `function Modal({ title, children }) {\n  return (\n    <div className="modal">\n      <h2>{title}</h2>\n      <div className="body">{children}</div>\n    </div>\n  )\n}\n<Modal title="Confirm"><p>Sure?</p></Modal>`, explain: 'children prop se flexible wrapping.' },
    ],
    memory:
      'Har render par component function dubara chalता (naye local variables). State/refs React internally hooks ke through component instance ke saath persist karता (function ke bahar, fiber node par). Component function khud stateless hai — state hooks deते.',
    notes: {
      concept: 'Functional component = function returning JSX, props leता.',
      tip: 'PascalCase naam; props destructure karो.',
      warning: 'Component function ke andar component define mat karo (har render naya banta).',
      error: 'Component naam small letter — React HTML tag samjhega.',
    },
    compare: {
      headers: ['Feature', 'Functional', 'Class'],
      rows: [
        ['Syntax', 'Function', 'class extends'],
        ['State', 'useState', 'this.state'],
        ['Lifecycle', 'useEffect', 'methods'],
        ['this', 'Nahi', 'Haan (tricky)'],
        ['Modern?', 'Haan', 'Legacy'],
      ],
    },
    mistakes: [
      { bad: 'Component ko function ke andar define.', fix: 'Bahar define karो (har render naya = remount bug).' },
      { bad: 'small letter component naam.', fix: 'PascalCase.' },
    ],
    best: ['Functional components + hooks.', 'PascalCase naam.', 'Props destructure + defaults.', 'children for composition.', 'Single responsibility.'],
    performance:
      'Component function har render chalता — heavy work useMemo se memoize, child re-renders React.memo se rok. Component ko function ke andar define karna har render remount karता (state loss + slow).',
    interview: {
      beginner: [
        { q: 'Functional component kya hai?', a: 'Ek JS function jo props leता aur JSX return karता. Hooks se state/effects. Modern standard.' },
        { q: 'Class vs functional?', a: 'Class purane (this, lifecycle methods). Functional + hooks modern — concise, no this. Naya code functional.' },
      ],
      intermediate: [
        { q: 'children prop kya hai?', a: 'Component ke opening/closing tags ke beech ka content automatically children prop banता — composition ke liye.' },
      ],
      advanced: [
        { q: 'Component ko function ke andar define karne se kya hota?', a: 'Har parent render par naya component type banता → React use naya samajh kar remount karta (state loss, DOM recreate, slow). Hamesha bahar define karो.' },
      ],
    },
    mcqs: [
      { q: 'Modern component?', options: ['Class', 'Functional', 'Both same', 'Mixin'], answer: 1, explain: 'Functional + hooks.' },
      { q: 'Component naam?', options: ['camelCase', 'PascalCase', 'snake_case', 'lowercase'], answer: 1, explain: 'PascalCase.' },
    ],
    exercises: {
      easy: ['Ek functional component banao jo greeting de.'],
      medium: ['children prop wala Card component banao.'],
      advanced: ['variant + size props wala reusable Button banao.'],
    },
    summary: [
      'Functional component = function → JSX, props leता.',
      'Hooks se state/effects (no class).',
      'children + props se composition.',
      'PascalCase; bahar define karो.',
    ],
    cheatsheet: [
      { h: 'Component', code: `function C({a,children}){\n  return <div>{a}{children}</div>\n}` },
    ],
    projects: ['Button/Card/Modal library', 'Layout components', 'Profile page'],
    advanced:
      'Server Components (RSC) functions hain jo server par render hote (async ho sakte, no hooks/state). Client components ("use client") interactive. Component types: presentational (UI), container (logic), HOC, compound. forwardRef se ref pass.',
    quiz: [
      { q: 'Component returns?', options: ['String', 'JSX', 'DOM', 'Object'], answer: 1, explain: 'JSX.' },
      { q: 'State kis se?', options: ['this.state', 'useState', 'props', 'var'], answer: 1, explain: 'useState hook.' },
    ],
    related: ['props', 'state-usestate', 'component-architecture'],
  },

  props: {
    overview:
      '**Props (properties)** wo data hai jo **parent component child ko pass** karता — function arguments ki tarah. Props **read-only** (immutable) hote — child unhe badal nahi sakta. **children** prop tags ke beech ka content. Default values bhi de sakte. Data hamesha **upar se neeche** (one-way) flow karता.',
    why:
      'Props React ka data-passing mechanism hai — components reusable inhi se bante. Props immutability, children, one-way flow interview ke core questions.',
    concept: [
      { h: 'Props pass & receive', p: 'Parent attributes ki tarah props deता; child object mein receive (destructure).', code: `// Parent\n<User name="Amit" age={25} />\n// Child\nfunction User({ name, age }) {\n  return <p>{name}, {age}</p>\n}` },
      { h: 'Props read-only', p: 'Child props ko modify nahi kar sakta (immutable). Change chahiye to parent state badle + naye props bheje.', code: `function X({ count }) {\n  // count = 5 ❌ mat karo\n  return <p>{count}</p>\n}` },
      { h: 'children prop', p: 'Component tags ke beech ka content children mein aata — flexible composition.', code: `function Box({ children }) {\n  return <div className="box">{children}</div>\n}\n<Box><h1>Hi</h1></Box>` },
      { h: 'Default props', p: 'Destructure mein default value do (modern). Undefined prop par default use hota.', code: `function Btn({ variant = 'primary', size = 'md' }) {}` },
    ],
    analogy:
      'Props ek **courier parcel** hai jo parent (sender) child (receiver) ko bhejta. Receiver parcel use kar sakta par **wapas bhej kar modify nahi** kar sakta (read-only). children = parcel ke andar "kuch bhi" daal do (flexible). 📦',
    syntax: { code: `// Pass\n<Card title="Hi" items={list} onClose={fn}>\n  <p>Content</p>\n</Card>\n// Receive\nfunction Card({ title, items, onClose, children }) {}`, note: 'Strings quotes mein; JS values { } mein; children = nested content.' },
    steps: [
      'Parent child ko props attributes ki tarah deता.',
      'Child function ke parameter (object) mein receive karता.',
      'Destructure karके use (with defaults).',
      'Props read-only — child sirf padh sakta.',
      'Parent state badle → naye props → child re-render.',
    ],
    examples: [
      { level: 'Beginner', title: 'Props + default', code: `function Avatar({ src, size = 40 }) {\n  return <img src={src} width={size} height={size} alt="" />\n}\n<Avatar src="a.jpg" />\n<Avatar src="b.jpg" size={64} />`, explain: 'Default size; alag-alag use.' },
      { level: 'Intermediate', title: 'Callback prop (child→parent)', code: `function SearchBox({ onSearch }) {\n  return <input onChange={e => onSearch(e.target.value)} />\n}\n// Parent\n<SearchBox onSearch={(q) => setQuery(q)} />`, explain: 'Function prop se child parent ko data bhejta (still one-way pattern).' },
    ],
    memory:
      'Props har render par naye object ke roop mein aate. Object/array/function props har render naya reference (isliye React.memo child re-render karता jab tak useMemo/useCallback se stable na ho). Primitive props (string/number) value se compare hote.',
    notes: {
      concept: 'Props = parent→child data (read-only, one-way).',
      tip: 'Child se parent ko data dena ho to callback prop pass karो.',
      warning: 'Props mutate mat karो — immutable.',
      error: 'Object/function props inline banाने se child re-render (useMemo/useCallback).',
    },
    compare: {
      headers: ['Feature', 'Props', 'State'],
      rows: [
        ['Owner', 'Parent', 'Component khud'],
        ['Mutable?', 'Nahi (read-only)', 'Haan (setState)'],
        ['Flow', 'Parent → child', 'Internal'],
        ['Change', 'Parent badle', 'setState'],
      ],
    },
    mistakes: [
      { bad: 'Props ko child mein mutate karna.', fix: 'Read-only — parent state se change.' },
      { bad: 'Bahut saari props (prop explosion).', fix: 'Object group ya composition.' },
    ],
    best: ['Props destructure + defaults.', 'Child→parent ke liye callback props.', 'Props read-only treat karो.', 'Related props object mein group.'],
    performance:
      'Inline object/array/function props har render naya reference banाते — memoized children ko re-render karा dete. useMemo (objects/arrays) aur useCallback (functions) se stable rakho jab child React.memo ho.',
    interview: {
      beginner: [
        { q: 'Props kya hain?', a: 'Parent se child ko pass kiya gaya read-only data. Components reusable banाने ke liye. One-way (parent→child) flow.' },
        { q: 'Props immutable kyun?', a: 'Predictable data flow + unidirectional. Child props badle to parent ka state inconsistent ho jaata. Change parent se hota.' },
      ],
      intermediate: [
        { q: 'Child se parent ko data kaise?', a: 'Parent ek callback function prop deता, child use call karके data bhejता (jaise onSearch). Data flow phir bhi controlled.' },
        { q: 'children prop?', a: 'Component ke tags ke beech ka content children prop banता — flexible composition.' },
      ],
      advanced: [
        { q: 'Props change child re-render kaise trigger karта?', a: 'Parent re-render → child ko naye props → React diff → child re-render. Object/function props naya reference banाते (memo break) jab tak memoize na ho.' },
      ],
    },
    mcqs: [
      { q: 'Props kya hain?', options: ['Mutable state', 'Read-only data', 'CSS', 'Events'], answer: 1, explain: 'Read-only parent data.' },
      { q: 'Data flow?', options: ['Two-way', 'Parent→child', 'Child→parent', 'Random'], answer: 1, explain: 'One-way down.' },
    ],
    exercises: {
      easy: ['Naam aur age props pass karके dikhao.'],
      medium: ['Callback prop se child se parent ko value bhejो.'],
      advanced: ['children + default props wala reusable Card banao.'],
    },
    summary: [
      'Props = parent→child read-only data.',
      'One-way (unidirectional) flow.',
      'children = nested content; defaults destructure mein.',
      'Child→parent: callback props.',
    ],
    cheatsheet: [
      { h: 'Props', code: `<C a="x" n={1} cb={fn}>kids</C>\nfunction C({a,n,cb,children}){}` },
    ],
    projects: ['Configurable Button/Card', 'List with item props', 'Form fields'],
    advanced:
      'Prop types / TypeScript se type-safety. Render props (function as prop/children). Spread props {...rest}. Default props (legacy defaultProps vs destructure default). Key is special (not a prop). Prop drilling → Context/composition se solve.',
    quiz: [
      { q: 'Props mutable?', options: ['Haan', 'Nahi', 'Sometimes', 'Only objects'], answer: 1, explain: 'Read-only.' },
      { q: 'Nested content prop?', options: ['content', 'children', 'inner', 'body'], answer: 1, explain: 'children.' },
    ],
    related: ['props-drilling', 'components-basics', 'context-api'],
  },

  'props-drilling': {
    overview:
      '**Props Drilling** tab hota jab data ko deeply nested child tak pahunchाne ke liye **beech ke saare components se props pass karne padte** — chahe unhe us data ki zaroorat na ho. Yeh tedious + fragile hota. Solutions: **Context API**, **composition**, ya state management (Redux/Zustand).',
    why:
      'Bade component trees mein drilling common problem hai. "Props drilling kya, kaise solve karein" interview ka standard question. Context/composition ki motivation.',
    concept: [
      { h: 'Drilling kya hai', p: 'Top component ka data 4-5 levels neeche chahiye. Beech ke components sirf "pass-through" karte (unhe data se matlab nahi).', code: `<App user={user}>\n  <Layout user={user}>\n    <Sidebar user={user}>\n      <Profile user={user} /> // finally yahan chahiye\n` },
      { h: 'Problem', p: 'Beech ke components clutter, refactor mushkil, ek prop badle to chain mein sab update.' },
      { h: 'Solution 1: Context', p: 'Context se data ko provide karो top par, consume karो jahan chahiye — beech skip.', code: `const UserCtx = createContext()\n<UserCtx.Provider value={user}>...\nconst user = useContext(UserCtx)` },
      { h: 'Solution 2: Composition', p: 'children prop se component ko upar render karके pass — drilling avoid.', code: `<Layout>\n  <Profile user={user} /> // App mein hi render\n</Layout>` },
    ],
    analogy:
      'Props drilling ek **building mein paani pahunchाna** jaisा hai — top floor (data) se ground floor (deep child) tak har floor (component) se pipe (prop) ले jaana, chahe beech wale floors ko paani na chahiye. Context = ek **direct pipeline** (wireless delivery). 🏢',
    syntax: { code: `// Drilling (bad)\n<A data={d}><B data={d}><C data={d}/></B></A>\n\n// Context (good)\n<Ctx.Provider value={d}>\n  <A><B><C/></B></A>\n</Ctx.Provider>\n// C: const d = useContext(Ctx)`, note: 'Beech ke components ab data pass nahi karte.' },
    examples: [
      { level: 'Intermediate', title: 'Composition fix', code: `// Drilling avoid karne ka composition tarika\nfunction Page({ user }) {\n  return (\n    <Layout sidebar={<Profile user={user} />}>\n      <Content />\n    </Layout>\n  )\n}\n// Layout sirf slots render karta, user nahi jaanta`, explain: 'Profile App level par bana — Layout ko user pass nahi karna pada.' },
    ],
    notes: {
      concept: 'Drilling = unnecessary prop pass-through deep tak.',
      tip: 'Pehle composition try karो (simpler), phir Context.',
      warning: 'Sab kuch Context mein mat daalो — over-use re-renders badhाता.',
      error: '1-2 level pass-through ke liye Context overkill — props theek.',
    },
    compare: {
      headers: ['Solution', 'Best for', 'Tradeoff'],
      rows: [
        ['Props', '1-2 levels', 'Drilling deep tak'],
        ['Composition', 'Layout/slots', 'Restructure'],
        ['Context', 'Global-ish data', 'Re-render risk'],
        ['Redux/Zustand', 'Large shared state', 'Setup overhead'],
      ],
    },
    mistakes: [
      { bad: 'Har cheez ke liye Context.', fix: 'Composition pehle; Context truly shared data ke liye.' },
      { bad: 'Deep drilling tolerate karna.', fix: 'Context ya restructure.' },
    ],
    best: ['Composition pehle (children/slots).', 'Truly global data → Context.', 'Large app state → Redux/Zustand.', 'Component structure flat rakho.'],
    performance:
      'Context value change saare consumers re-render karता — bade trees mein careful. Split contexts (alag concerns) ya memoize value. Composition re-render scope chhota rakhता.',
    interview: {
      beginner: [
        { q: 'Props drilling kya hai?', a: 'Data ko deeply nested child tak pahunchane ke liye beech ke saare components se props pass karna — chahe unhe data na chahiye.' },
      ],
      intermediate: [
        { q: 'Props drilling kaise solve?', a: 'Composition (children/slots), Context API (provide-consume), ya state management (Redux/Zustand). Pehle composition try karो.' },
      ],
      advanced: [
        { q: 'Context drilling se hamesha better?', a: 'Nahi — Context value change saare consumers re-render karта. 1-2 levels ke liye props/composition better. Context truly shared, kam-badalने wale data ke liye.' },
      ],
    },
    mcqs: [
      { q: 'Drilling solution?', options: ['More props', 'Context/composition', 'Inheritance', 'Globals'], answer: 1, explain: 'Context/composition.' },
      { q: 'Context overkill kab?', options: ['Deep tree', '1-2 levels', 'Global data', 'Theme'], answer: 1, explain: 'Shallow pass-through.' },
    ],
    exercises: {
      easy: ['3-level drilling example likho.'],
      medium: ['Composition se drilling fix karो.'],
      advanced: ['Context se deep child tak data pahunchाओ.'],
    },
    summary: [
      'Drilling = unnecessary prop pass-through deep tak.',
      'Solve: composition, Context, state management.',
      'Composition pehle (simpler).',
      'Context over-use re-renders badhaता.',
    ],
    cheatsheet: [
      { h: 'Solutions', code: `Composition: <Layout slot={<X/>}/>\nContext: useContext(Ctx)` },
    ],
    projects: ['Theme via context', 'Auth user context', 'Composition layout'],
    advanced:
      'Component composition + slots (children, named props) often Context se cleaner. State colocation (state ko jahan chahiye wahan rakho). Zustand/Jotai context re-render issues avoid karte (selective subscription).',
    quiz: [
      { q: 'Drilling problem?', options: ['Fast', 'Tedious pass-through', 'No state', 'Styling'], answer: 1, explain: 'Unnecessary intermediate props.' },
      { q: 'First solution try?', options: ['Redux', 'Composition', 'Drilling more', 'Inheritance'], answer: 1, explain: 'Composition simplest.' },
    ],
    related: ['props', 'context-api', 'state-management'],
  },

  'conditional-rendering': {
    overview:
      '**Conditional Rendering** matlab condition ke hisaab se alag UI dikhाना. React mein JSX expressions use karke: **ternary** (`cond ? a : b`), **&&** (show/hide), **early return** (if before JSX), ya **switch/variable** (multiple cases). Falsy values render nahi hote.',
    why:
      'Loading/error/empty states, auth-based UI, toggles — har app mein conditional rendering. Daily kaam + interview (especially && pitfall).',
    concept: [
      { h: 'if / early return', p: 'Component ke top par if se poora alag UI return karो.', code: `function Profile({ user }) {\n  if (!user) return <Spinner />\n  return <h1>{user.name}</h1>\n}` },
      { h: 'Ternary', p: 'JSX ke andar either-or ke liye.', code: `<div>{isLoggedIn ? <Dashboard /> : <Login />}</div>` },
      { h: '&& operator', p: 'Show/hide (ek hi case). Condition truthy to render. Boolean banाओ (0 pitfall).', code: `{error && <ErrorMsg />}\n{items.length > 0 && <List />}` },
      { h: 'switch / variable', p: 'Multiple cases ke liye switch (component bahar) ya variable mein element.', code: `let content\nswitch (status) {\n  case 'loading': content = <Spinner />; break\n  case 'error': content = <Error />; break\n  default: content = <Data />\n}\nreturn <div>{content}</div>` },
    ],
    analogy:
      'Conditional rendering ek **traffic signal** jaisा — red (loading) to spinner dikhao, green (data) to content, yellow (error) to warning. Condition dekhо, sahi UI render karो. 🚦',
    syntax: { code: `{cond ? <A/> : <B/>}        // either-or\n{cond && <A/>}             // show/hide\nif (x) return <A/>          // early return\n{status === 'x' && <X/>}    // specific`, note: '&& ke saath boolean (count > 0), 0 render ho jaता.' },
    examples: [
      { level: 'Beginner', title: 'Loading/error/data', code: `function Data({ loading, error, data }) {\n  if (loading) return <Spinner />\n  if (error) return <Error msg={error} />\n  return <ul>{data.map(d => <li key={d.id}>{d.name}</li>)}</ul>\n}`, explain: 'Early returns se clean states.' },
      { level: 'Intermediate', title: '&& pitfall', code: `{cartCount && <Badge count={cartCount} />}  // 0 dikhega!\n{cartCount > 0 && <Badge count={cartCount} />}  // fix`, explain: '0 truthy nahi par render ho jaता — boolean banाओ.' },
    ],
    notes: {
      concept: 'Ternary (either-or), && (show/hide), early return (whole).',
      tip: 'Multiple states → early returns (clean).',
      warning: '&& ke saath number — 0 render ho jaता.',
      error: 'JSX mein if statement directly (use ternary/early return).',
    },
    compare: {
      headers: ['Method', 'Kab', 'Example'],
      rows: [
        ['Ternary', 'Either-or', 'c ? a : b'],
        ['&&', 'Show/hide', 'c && <X/>'],
        ['Early return', 'Whole component', 'if(!x) return ...'],
        ['switch/var', 'Many cases', 'status-based'],
      ],
    },
    mistakes: [
      { bad: '{count && <X/>}.', fix: '{count > 0 && <X/>}.' },
      { bad: 'Nested ternary hell.', fix: 'Early returns ya switch.' },
    ],
    best: ['Multiple states → early returns.', '&& ke liye boolean.', 'Nested ternary avoid.', 'Complex → variable/switch.'],
    interview: {
      beginner: [
        { q: 'Conditional rendering ke tarike?', a: 'Ternary (c?a:b), && (show/hide), early return (if before JSX), switch/variable (many cases).' },
      ],
      intermediate: [
        { q: '&& rendering pitfall?', a: 'Left falsy number (0) render ho jaता ("0" dikhता). count > 0 && jaisा boolean use karो.' },
      ],
    },
    mcqs: [
      { q: 'Either-or ke liye?', options: ['&&', 'Ternary', 'if', 'for'], answer: 1, explain: 'Ternary.' },
      { q: '{0 && <X/>}?', options: ['nothing', '0', 'X', 'error'], answer: 1, explain: '0 renders.' },
    ],
    exercises: {
      easy: ['Ternary se login/logout button.'],
      medium: ['Loading/error/data states early return se.'],
      advanced: ['Status (4 cases) switch se render karो.'],
    },
    summary: [
      'Ternary either-or, && show/hide, early return whole.',
      'Falsy values render nahi hote.',
      '&& ke saath boolean (0 pitfall).',
      'Many states → early returns/switch.',
    ],
    cheatsheet: [
      { h: 'Conditional', code: `{c ? <A/> : <B/>}\n{c && <A/>}\nif(!x) return null` },
    ],
    projects: ['Auth-gated UI', 'Loading states', 'Feature flags'],
    advanced:
      'Render maps/lookup objects (status → component) switch se clean. Suspense conditional async UI. Conditional hooks NAHI (hooks rules) — condition ke andar hook na call karो.',
    quiz: [
      { q: 'Whole component conditional?', options: ['&&', 'Ternary', 'Early return', 'map'], answer: 2, explain: 'Early return.' },
      { q: 'Conditional hooks?', options: ['Allowed', 'Not allowed', 'Sometimes', 'In loops'], answer: 1, explain: 'Hooks rules — top level only.' },
    ],
    related: ['jsx-rules', 'lists-keys', 'useeffect'],
  },

  'lists-keys': {
    overview:
      'Lists React mein `array.map()` se render hote — har item ek element. Har element ko ek unique **key** prop chahiye jisse React **reconciliation** ke time items ko identify kare (kaun add/remove/move hua). **Index ko key** banana risky hai (reorder/insert par bugs).',
    why:
      'Har app lists render karता (products, messages, todos). Keys reconciliation performance aur correctness ke liye critical. "Index key kyun bura" interview ka favourite.',
    concept: [
      { h: 'map() se list', p: 'Array ko elements mein transform karो. Har element par key do.', code: `<ul>\n  {users.map(u => <li key={u.id}>{u.name}</li>)}\n</ul>` },
      { h: 'Keys ka kaam', p: 'Key React ko batata kaun-sa element kaun-sa hai (identity). Re-render par React keys se match karता — add/remove/move efficiently.' },
      { h: 'Index key problem', p: 'Index key tab tootta jab list reorder/insert/delete ho — React galat element ko match karता (state/input mix up, bugs).', code: `// Risky\n{items.map((it, i) => <Row key={i} />)}\n// Better\n{items.map(it => <Row key={it.id} />)}` },
      { h: 'Reconciliation impact', p: 'Stable unique keys se React minimal DOM operations karता. Galat/changing keys se elements remount (state loss + slow).' },
    ],
    analogy:
      'Keys ek **roll number** jaisे hain class mein. Roll number (key) se teacher (React) har student (element) ko pehchanta — chahe seating (order) badle. Agar roll number seat position (index) se do, to seat badalते hi confusion — galat student ko marks (state). 🎓',
    syntax: { code: `{items.map(item => (\n  <Item key={item.id} data={item} />\n))}`, note: 'Key unique + stable hona chahiye (id best, index nahi).' },
    examples: [
      { level: 'Beginner', title: 'List with keys', code: `function TodoList({ todos }) {\n  return (\n    <ul>\n      {todos.map(t => (\n        <li key={t.id}>{t.text}</li>\n      ))}\n    </ul>\n  )\n}`, explain: 'Stable id key per item.' },
      { level: 'Advanced', title: 'Index key bug', code: `// Items ke saath input/checkbox ho to:\n{items.map((it, i) => (\n  <input key={i} defaultValue={it.name} />\n))}\n// Reorder/delete par inputs ka state galat item se chipakta!\n// Fix: key={it.id}`, explain: 'Index key + reorder = state mismatch. Stable id use karो.' },
    ],
    memory:
      'React keys se old/new children map banाता (reconciliation). Stable key = same fiber node reuse (state preserve). Changing/index keys = React naya element samjh kar purane ko destroy + naya mount (state loss, DOM recreate — memory churn).',
    notes: {
      concept: 'map() se lists; har item par unique stable key.',
      tip: 'Key item.id se (data ka unique field).',
      warning: 'Index key sirf static, never-reorder lists ke liye.',
      error: 'Key na dena → warning + buggy reconciliation. Math.random() key → har render remount.',
    },
    compare: {
      headers: ['Key type', 'Safe?', 'Kab'],
      rows: [
        ['Unique id', '✅ Best', 'Hamesha (data id)'],
        ['Index', '⚠️ Risky', 'Static, no reorder'],
        ['Math.random()', '❌ Never', 'Har render remount'],
      ],
    },
    mistakes: [
      { bad: 'key={index} reorderable list mein.', fix: 'key={item.id}.' },
      { bad: 'key={Math.random()}.', fix: 'Stable id — random har render naya.' },
    ],
    best: ['Stable unique id key.', 'Index sirf static lists.', 'Key list item ke root element par.', 'Keys siblings mein unique (globally nahi).'],
    performance:
      'Stable keys se React minimal DOM ops (reuse nodes). Galat keys se mass remount (slow + state loss). Bade lists mein keys + virtualization performance ke liye must.',
    interview: {
      beginner: [
        { q: 'Keys kyun zaroori?', a: 'React ko reconciliation mein items identify karne ke liye — kaun add/remove/move hua. Efficient + correct DOM updates.' },
        { q: 'Lists kaise render?', a: 'array.map() se elements; har element par unique key prop.' },
      ],
      intermediate: [
        { q: 'Index ko key kyun nahi?', a: 'List reorder/insert/delete par index badal jaata — React galat element match karता, state/inputs mix up, bugs. Stable id use karो.' },
      ],
      advanced: [
        { q: 'Keys reconciliation ko kaise affect karti?', a: 'Same key → React fiber node reuse karता (state preserve, minimal DOM). Changed key → element destroy + remount. Stable keys = fast + correct.' },
      ],
    },
    mcqs: [
      { q: 'Best key?', options: ['index', 'item.id', 'Math.random()', 'date'], answer: 1, explain: 'Stable unique id.' },
      { q: 'Index key problem?', options: ['Slow always', 'Reorder bugs', 'No render', 'CSS'], answer: 1, explain: 'Reorder/insert state mismatch.' },
    ],
    exercises: {
      easy: ['Array ko map se list mein render karो (keys ke saath).'],
      medium: ['Index key ka bug demonstrate karो (inputs + reorder).'],
      advanced: ['Add/remove/reorder wali list with stable keys banao.'],
    },
    summary: [
      'Lists = array.map() → elements.',
      'Har item par unique stable key.',
      'Index key reorder/insert par buggy.',
      'Keys reconciliation efficient + correct banाती.',
    ],
    cheatsheet: [
      { h: 'List', code: `{arr.map(x=><Li key={x.id}>{x.t}</Li>)}` },
    ],
    projects: ['Todo list (add/remove)', 'Sortable list', 'Chat messages'],
    advanced:
      'Keys component instance identity decide karti — key change se remount (intentional reset trick: key={userId} se component reset). Keys diffing O(n) banाती (without keys O(n) but positional). Virtualized lists (react-window) keys + windowing.',
    quiz: [
      { q: 'Key prop scope?', options: ['Global unique', 'Siblings unique', 'Any', 'Optional'], answer: 1, explain: 'Siblings mein unique.' },
      { q: 'key change karne se?', options: ['Update', 'Remount', 'Nothing', 'Error'], answer: 1, explain: 'Element remount (reset).' },
    ],
    related: ['reconciliation', 'conditional-rendering', 're-rendering'],
  },

  'state-usestate': {
    overview:
      '**State** ek component ka **internal, changeable data** hai jo time ke saath badalता (counter, input, toggle). **useState** hook se functional components mein state add karते. State badalने par component **re-render** hota (UI update). State props se alag — component khud owner.',
    why:
      'State React ki interactivity ka core hai. useState pehla aur sabse zaroori hook. State updates, re-render trigger, immutability — interview + daily kaam ka base.',
    concept: [
      { h: 'useState basics', p: 'useState(initial) array deता: [value, setterFunction]. setter call karke value badalो → re-render.', code: `const [count, setCount] = useState(0)\nsetCount(count + 1) // re-render` },
      { h: 'State update = re-render', p: 'setState call karne par React component dubara chalाता naye state ke saath — UI update.', code: `function Counter() {\n  const [n, setN] = useState(0)\n  return <button onClick={() => setN(n + 1)}>{n}</button>\n}` },
      { h: 'State immutable update', p: 'State directly mutate mat karो — naya object/array do (warna React change detect nahi karता).', code: `// ❌ todos.push(x); setTodos(todos)\n// ✅\nsetTodos([...todos, x])\nsetUser({ ...user, name: 'New' })` },
      { h: 'Lazy initial state', p: 'Initial value mehngी ho to function pass karो — sirf pehle render par chalेga.', code: `const [data] = useState(() => expensiveInit())` },
    ],
    analogy:
      'State component ki **short-term memory** hai — jaise ek counter app yaad rakhता abhi kitne clicks hue. setState ek "naya number likhо aur board update karो" jaisा — purана mitao, naya likho, screen refresh. 🧮',
    syntax: { code: `const [state, setState] = useState(initialValue)\nsetState(newValue)\nsetState(prev => prev + 1)   // functional\nsetState({ ...state, key: val }) // object`, note: 'setState async-ish hai — turant nayी value nahi milti usi render mein.' },
    steps: [
      'useState(initial) component mein call.',
      'React state value aur setter return karта.',
      'Event par setter call → React state update schedule.',
      'Component re-render naye state ke saath.',
      'UI updated value dikhाता.',
    ],
    examples: [
      { level: 'Beginner', title: 'Counter', code: `function Counter() {\n  const [count, setCount] = useState(0)\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Count: {count}\n    </button>\n  )\n}`, explain: 'Click → setCount → re-render → naya count.' },
      { level: 'Intermediate', title: 'Object/array state', code: `const [user, setUser] = useState({ name: '', age: 0 })\nsetUser(prev => ({ ...prev, name: 'Amit' }))\n\nconst [list, setList] = useState([])\nsetList(prev => [...prev, newItem])`, explain: 'Immutable update — spread se naya object/array.' },
      { level: 'Advanced', title: 'Stale state trap', code: `// Bug: teeno same value\nsetCount(count + 1)\nsetCount(count + 1)\nsetCount(count + 1) // +1 only!\n// Fix: functional\nsetCount(c => c + 1)\nsetCount(c => c + 1)\nsetCount(c => c + 1) // +3`, explain: 'count snapshot hai — functional update prev se sahi.' },
    ],
    memory:
      'State React internally fiber node par store karता (component function ke bahar) — isliye re-render par persist hota. Har render state ka ek "snapshot" deता (us render ke liye fixed). useState ka order matter karता (isliye hooks top-level, no conditions).',
    notes: {
      concept: 'useState → [value, setter]. setState → re-render.',
      tip: 'Multiple updates ya prev par depend → functional update (prev => ...).',
      warning: 'State directly mutate mat karो — naya object/array.',
      error: 'setState ke turant baad nayी value expect karna — wo next render mein milti.',
    },
    compare: {
      headers: ['Aspect', 'State', 'Props'],
      rows: [
        ['Owner', 'Component khud', 'Parent'],
        ['Mutable', 'Haan (setState)', 'Nahi'],
        ['Re-render', 'setState par', 'Naye props par'],
        ['Initial', 'useState(x)', 'Parent deता'],
      ],
    },
    mistakes: [
      { bad: 'State directly mutate (push/assign).', fix: 'Naya object/array (spread).' },
      { bad: 'setState ke baad turant value use.', fix: 'Next render / functional update.' },
      { bad: 'Multiple setState(count+1).', fix: 'setState(c => c+1).' },
    ],
    best: ['Immutable updates (spread).', 'Functional update jab prev par depend.', 'State minimal + colocated.', 'Lazy init for expensive initial.', 'Related state group ya useReducer.'],
    performance:
      'Har setState re-render trigger karता (agar value badli). Unnecessary state avoid (derive karो). React 18 multiple setStates batch karता (ek re-render). Heavy initial → lazy init function.',
    interview: {
      beginner: [
        { q: 'useState kya hai?', a: 'Hook jo functional component mein state add karता. [value, setter] deता. setter se value badlo → re-render.' },
        { q: 'State vs props?', a: 'State component ka internal mutable data (setState). Props parent se read-only data. State change re-render trigger karता.' },
      ],
      intermediate: [
        { q: 'State immutably kyun update?', a: 'React reference compare karता (Object.is) — same reference mutate karne se change detect nahi hota, re-render nahi. Naya object/array do.' },
        { q: 'Functional update kab?', a: 'Jab nayी value purani par depend kare (counter) ya multiple updates ek saath — setState(prev => ...) latest value guarantee karता.' },
      ],
      advanced: [
        { q: 'setState async kyun lagता?', a: 'React updates batch karता — current render mein state ek snapshot (fixed). Naya value next render mein. Isliye turant access nahi, functional update se latest milta.' },
      ],
    },
    mcqs: [
      { q: 'useState returns?', options: ['value', '[value, setter]', 'setter', 'object'], answer: 1, explain: 'Array [value, setter].' },
      { q: 'State update?', options: ['Mutate', 'New value (immutable)', 'Both', 'Direct'], answer: 1, explain: 'Immutable — naya value.' },
    ],
    exercises: {
      easy: ['Counter banao useState se.'],
      medium: ['Object state ko immutably update karो.'],
      advanced: ['Stale state bug fix karो functional update se.'],
    },
    summary: [
      'useState → [value, setter].',
      'setState → re-render naye state se.',
      'Immutable updates (spread).',
      'Functional update jab prev par depend.',
    ],
    cheatsheet: [
      { h: 'useState', code: `const [s,setS]=useState(init)\nsetS(v)\nsetS(p=>p+1)\nsetS({...s,k:v})` },
    ],
    projects: ['Counter', 'Toggle', 'Form inputs', 'Todo state'],
    advanced:
      'useState internally fiber ki hooks linked-list par. State updates lanes (priority) mein schedule. useReducer complex state ke liye. State colocation + derived state se cleaner. React 18 automatic batching (even in promises/timeouts).',
    quiz: [
      { q: 'setState effect?', options: ['Mutate DOM', 'Re-render', 'Nothing', 'Reload'], answer: 1, explain: 'Re-render trigger.' },
      { q: 'Latest value guarantee?', options: ['setState(x)', 'setState(p=>...)', 'Both', 'Neither'], answer: 1, explain: 'Functional update.' },
    ],
    related: ['state-batching', 'usereducer', 're-rendering'],
  },

  'state-batching': {
    overview:
      '**Batching** matlab React multiple state updates ko **group karके ek hi re-render** karता (efficiency). **Functional updates** (`setState(prev => ...)`) latest state guarantee karte. React 18 se batching **automatic** har jagah (events, promises, timeouts) — pehle sirf event handlers mein thi.',
    why:
      'Batching performance ke liye core hai. "setState async kyun", "multiple setState ka output" interview ke common output-based questions.',
    concept: [
      { h: 'Batching kya hai', p: 'Ek event handler mein multiple setState → React sabko batch karता, ek re-render. Performance + consistency.', code: `function handle() {\n  setA(1)\n  setB(2)\n  setC(3)\n  // Ek hi re-render (teen nahi)\n}` },
      { h: 'Functional updates', p: 'prev value par depend → setState(prev => new). Multiple updates sahi se apply (snapshot trap se bachao).', code: `setCount(c => c + 1)\nsetCount(c => c + 1) // +2 (sahi)\n// vs setCount(count+1) twice → +1` },
      { h: 'State snapshot', p: 'Ek render ke andar state value fixed (snapshot). setState turant nahi badalता — next render mein nayी value.', code: `const [n, setN] = useState(0)\nfunction click() {\n  setN(n + 1)\n  console.log(n) // abhi bhi purana (0)\n}` },
      { h: 'React 18 automatic batching', p: 'Pehle batching sirf React event handlers mein. React 18 se promises, setTimeout, native events mein bhi automatic.', code: `setTimeout(() => {\n  setA(1); setB(2) // React 18: 1 render\n}, 100)` },
    ],
    analogy:
      'Batching ek **online shopping cart** jaisा — har item alag order (re-render) nahi, sab cart mein daalкar ek baar checkout (ek re-render). Functional update = "current total mein add karo" (latest), na ki "purane total + 1" (stale). 🛒',
    syntax: { code: `// Batched (1 render)\nsetA(1); setB(2)\n// Functional (depends on prev)\nsetCount(c => c + 1)\n// flushSync (force sync, rare)\nflushSync(() => setX(1))`, note: 'Default batch; functional update prev par depend ke liye.' },
    examples: [
      { level: 'Intermediate', title: 'Batching + snapshot', code: `function App() {\n  const [n, setN] = useState(0)\n  function click() {\n    setN(n + 1)\n    setN(n + 1)\n    setN(n + 1)\n    // n abhi 0 (snapshot) → final n = 1\n  }\n  return <button onClick={click}>{n}</button>\n}`, explain: 'Teeno same snapshot (0) use karte → +1. Functional se +3.' },
      { level: 'Advanced', title: 'Functional fix', code: `function click() {\n  setN(c => c + 1)\n  setN(c => c + 1)\n  setN(c => c + 1)\n  // +3 (har functional latest se)\n}`, explain: 'Functional update queue mein latest value se chalta.' },
    ],
    memory:
      'React updates ko queue mein rakhता (lane par). Batch ke end mein ek re-render. Functional updaters queue mein sequentially apply hote (har ko previous result milता). Snapshot per-render closure se aata (us render ka state).',
    notes: {
      concept: 'Batching = multiple setState → ek re-render.',
      tip: 'prev par depend → functional update.',
      warning: 'State render ke andar snapshot hai — setState ke baad turant nahi badalता.',
      error: 'Multiple setState(count+1) → +1 (stale snapshot). Functional use karो.',
    },
    compare: {
      headers: ['Update', 'setState(x)', 'setState(p=>...)'],
      rows: [
        ['Value source', 'Current snapshot', 'Latest queued'],
        ['Multiple updates', 'Last wins / stale', 'Sab apply'],
        ['Kab', 'Independent value', 'Prev par depend'],
      ],
    },
    mistakes: [
      { bad: 'setN(n+1) multiple times.', fix: 'setN(c => c+1).' },
      { bad: 'setState ke baad value use.', fix: 'useEffect ya functional update.' },
    ],
    best: ['Functional update jab prev par depend.', 'Independent states batch ho jaate (theek).', 'flushSync sirf rare (DOM measure).', 'State ko snapshot samjho.'],
    performance:
      'Batching unnecessary re-renders bachाता (multiple setState → 1 render). React 18 automatic batching everywhere = aur fast. flushSync batching tod deता (extra render — avoid unless needed).',
    interview: {
      intermediate: [
        { q: 'State batching kya hai?', a: 'React multiple setState calls ko group karके ek re-render karता — performance. React 18 se events, promises, timeouts sab mein automatic.' },
        { q: 'Functional update kab use?', a: 'Jab nayी value purani par depend kare ya multiple updates ek saath — setState(prev => ...) latest value se sahi result.' },
      ],
      advanced: [
        { q: 'setN(n+1) teen baar ka output?', a: '+1 only — teeno same snapshot (n) use karte. setN(c => c+1) teen baar → +3 (queue mein latest se).' },
        { q: 'React 18 automatic batching kya badla?', a: 'Pehle batching sirf React event handlers mein thi. Ab promises, setTimeout, native handlers mein bhi — sab jagah ek re-render.' },
      ],
    },
    mcqs: [
      { q: 'Batching matlab?', options: ['Multiple renders', 'One re-render', 'No render', 'Sync'], answer: 1, explain: 'Group → ek re-render.' },
      { q: 'setN(n+1) x3?', options: ['+3', '+1', '+2', '0'], answer: 1, explain: 'Stale snapshot → +1.' },
    ],
    exercises: {
      easy: ['3 setState ek handler mein — kitne re-renders?'],
      medium: ['Stale state bug recreate karो.'],
      advanced: ['Functional update se +3 achieve karो.'],
    },
    summary: [
      'Batching: multiple setState → ek re-render.',
      'State render ke andar snapshot.',
      'Functional update prev par depend ke liye.',
      'React 18 automatic batching everywhere.',
    ],
    cheatsheet: [
      { h: 'Updates', code: `setX(v)        // snapshot\nsetX(p=>p+1)   // latest\nflushSync(()=>setX(v)) // force` },
    ],
    projects: ['Counter (functional)', 'Multi-field form', 'Batch operations'],
    advanced:
      'Updates lanes par schedule (priority). useTransition non-urgent batch. flushSync synchronous DOM update (focus/scroll measure). React internally update queue per hook maintain karता. Concurrent rendering batching + interruption combine.',
    quiz: [
      { q: 'Prev-dependent update?', options: ['setX(v)', 'setX(p=>...)', 'flushSync', 'Both'], answer: 1, explain: 'Functional updater.' },
      { q: 'React 18 batching?', options: ['Only events', 'Everywhere', 'None', 'Class only'], answer: 1, explain: 'Automatic everywhere.' },
    ],
    related: ['state-usestate', 'usereducer', 're-rendering'],
  },

  'derived-lifting': {
    overview:
      '**Derived State** matlab jo value existing state/props se **calculate** ho sakti use state mat banाओ — render time par derive karो (single source of truth). **Lifting State Up** matlab do components ko same state share karna ho to wo state unke **common parent** mein rakho.',
    why:
      'Redundant state bugs (sync issues) ki jad hai. "Derived state kab" aur "lifting state up" practical interview + real code patterns hain.',
    concept: [
      { h: 'Derived state', p: 'Jo existing data se nikal sakta (filtered list, total, fullName) use state mat banाओ — render mein calculate.', code: `// ❌ extra state\nconst [total, setTotal] = useState(0)\n// ✅ derive\nconst total = items.reduce((s, i) => s + i.price, 0)` },
      { h: 'Single source of truth', p: 'Ek data ek hi jagah store ho. Duplicate state sync bugs deता. Derive jab possible.' },
      { h: 'Lifting state up', p: 'Do siblings same state chahiye → state common parent mein, props se neeche pass (state down, events up).', code: `function Parent() {\n  const [val, setVal] = useState('')\n  return <><Input value={val} onChange={setVal} /><Preview value={val} /></>\n}` },
      { h: 'State down, events up', p: 'Parent state ko children ko props se deता; children callbacks se parent ko update karwाते. Unidirectional.' },
    ],
    analogy:
      'Derived state: tumhare paas birth date (state) hai to age ko alag store mat karो — calculate karो (warna dono sync karne padे). Lifting up: do bachche (siblings) ek toy (state) share karna chahte → toy ko **maa-baap (parent)** ke paas rakho, dono ko baari-baari do. 🧸',
    syntax: { code: `// Derive (no state)\nconst fullName = first + ' ' + last\nconst active = users.filter(u => u.active)\n\n// Lift up\n<Parent>\n  <Child value={state} onChange={setState} />\n</Parent>`, note: 'Derive over store; share state ko parent mein lift karो.' },
    examples: [
      { level: 'Intermediate', title: 'Derived (no extra state)', code: `function Cart({ items }) {\n  // ❌ const [total, setTotal] = useState(...)\n  const total = items.reduce((s, i) => s + i.price, 0)\n  const count = items.length\n  return <p>{count} items · Rs {total}</p>\n}`, explain: 'Total/count derive — items se calculate, sync bugs gone.' },
      { level: 'Advanced', title: 'Lifting state up', code: `function Converter() {\n  const [celsius, setCelsius] = useState(0)\n  return (\n    <>\n      <TempInput value={celsius} onChange={setCelsius} />\n      <Display fahrenheit={celsius * 9/5 + 32} />\n    </>\n  )\n}`, explain: 'State parent mein; input set karta, display derive — shared.' },
    ],
    notes: {
      concept: 'Derive over store; shared state ko parent mein lift.',
      tip: 'Heavy derivation → useMemo.',
      warning: 'Duplicate state = sync bugs. Single source of truth.',
      error: 'Props ko state mein copy karna (sync issues) — directly use ya derive.',
    },
    compare: {
      headers: ['Pattern', 'Kab', 'Fayda'],
      rows: [
        ['Derived state', 'Value calculate ho sakti', 'No sync bugs'],
        ['Lifting up', 'Siblings share', 'Single source'],
        ['Local state', 'Sirf ek component', 'Simple'],
      ],
    },
    mistakes: [
      { bad: 'Filtered/total ko state banाना.', fix: 'Render mein derive.' },
      { bad: 'Props ko useState mein copy.', fix: 'Props directly use ya derive.' },
    ],
    best: ['Derive jab possible (no extra state).', 'Shared state parent mein lift.', 'State down, events up.', 'Heavy derive → useMemo.', 'State colocate (jahan chahiye).'],
    performance:
      'Derived state extra state + setState + re-render bachाता. Heavy derivation (filter/sort bade data) useMemo se cache. Lifting state up parent re-render karता — agar zyada, state ko split ya colocate.',
    interview: {
      intermediate: [
        { q: 'Derived state kya hai?', a: 'Jo value existing state/props se calculate ho sakti use state mat banाओ — render time par derive karो. Sync bugs avoid + single source of truth.' },
        { q: 'Lifting state up kya hai?', a: 'Do components ko same state share karna ho to state unke common parent mein move karो, props se neeche pass (state down, events up).' },
      ],
      advanced: [
        { q: 'Props ko state mein copy karna kyun bura?', a: 'Props badle to state stale ho jaata (sync issue). Directly props use karो ya derive. Sirf initial value ke liye (uncommon) thoda OK.' },
      ],
    },
    mcqs: [
      { q: 'Total of items?', options: ['useState', 'Derive (reduce)', 'useRef', 'Context'], answer: 1, explain: 'Derive — calculate.' },
      { q: 'Siblings share state?', options: ['Drilling', 'Lift to parent', 'Globals', 'Duplicate'], answer: 1, explain: 'Lifting state up.' },
    ],
    exercises: {
      easy: ['Items se total derive karो (no state).'],
      medium: ['Lifting state up se 2 siblings sync karो.'],
      advanced: ['Filtered + sorted list derive (useMemo).'],
    },
    summary: [
      'Derive over store (single source of truth).',
      'Shared state → lift to common parent.',
      'State down, events up.',
      'Heavy derive → useMemo.',
    ],
    cheatsheet: [
      { h: 'Patterns', code: `const total=items.reduce(...) // derive\n<Child v={s} onChange={setS}/> // lift` },
    ],
    projects: ['Temperature converter', 'Cart total', 'Filtered search'],
    advanced:
      'State colocation (state ko closest component mein) re-render scope chhota rakhता. useMemo for expensive derived. Derived from props (rare initial copy) — key reset trick. State machines (xstate) complex derived logic.',
    quiz: [
      { q: 'Derived state mein?', options: ['Extra useState', 'Calculate in render', 'useRef', 'Context'], answer: 1, explain: 'Calculate, not store.' },
      { q: 'Lift state to?', options: ['Child', 'Common parent', 'Global', 'Sibling'], answer: 1, explain: 'Common parent.' },
    ],
    related: ['state-usestate', 'usememo-usecallback', 'props'],
  },

  events: {
    overview:
      'React mein events **Synthetic Events** ke through handle hote — React ka cross-browser wrapper around native events. `onClick`, `onChange` jaise camelCase props. React events ko **root par delegate** karता (har element par nahi). Args pass karne ke liye arrow function. Event propagation (bubbling) native jaisा.',
    why:
      'Har interaction events se. Synthetic events, event delegation, args passing daily kaam + interview (event pooling ab removed — that itself is a question).',
    concept: [
      { h: 'Synthetic Events', p: 'React native event ko SyntheticEvent (cross-browser wrapper) mein wrap karता. Same API har browser mein consistent.', code: `<button onClick={(e) => console.log(e.type)}>Click</button>` },
      { h: 'Event delegation', p: 'React saare events ko **root container** par attach karता (har element par nahi) — performance. Aapko transparent.' },
      { h: 'Passing arguments', p: 'Handler ko arg dena ho to arrow function (inline) use karो — directly call (fn(arg)) mat karo.', code: `// ✅\n<button onClick={() => handleDelete(id)}>Del</button>\n// ❌ turant call ho jaता\n<button onClick={handleDelete(id)}>` },
      { h: 'Propagation', p: 'e.stopPropagation() bubbling rokता, e.preventDefault() default action (form submit/link). Native jaisा.', code: `<form onSubmit={(e) => { e.preventDefault(); save() }}>` },
    ],
    analogy:
      'Synthetic events ek **universal remote** jaisे hain — har TV (browser) ka apna remote (native event) alag, par React ek universal remote (SyntheticEvent) deता jo sab par same kaam kare. Event delegation = ek hi receptionist (root) saare calls handle karता, har room mein alag nahi. 📺',
    syntax: { code: `<button onClick={handleClick}>\n<input onChange={(e) => setVal(e.target.value)} />\n<form onSubmit={(e) => { e.preventDefault() }}>\n<div onClick={() => fn(id)}>  // args`, note: 'camelCase; arg ke liye arrow function; e.target.value input se.' },
    examples: [
      { level: 'Beginner', title: 'Events basics', code: `function Form() {\n  const [text, setText] = useState('')\n  return (\n    <form onSubmit={(e) => { e.preventDefault(); alert(text) }}>\n      <input value={text} onChange={(e) => setText(e.target.value)} />\n      <button>Submit</button>\n    </form>\n  )\n}`, explain: 'onChange se controlled input; onSubmit + preventDefault.' },
      { level: 'Advanced', title: 'Args + propagation', code: `function List({ items }) {\n  return items.map(it => (\n    <li key={it.id} onClick={() => select(it.id)}>\n      {it.name}\n      <button onClick={(e) => { e.stopPropagation(); del(it.id) }}>X</button>\n    </li>\n  ))\n}`, explain: 'Arrow se arg; stopPropagation se li click na chale.' },
    ],
    internals:
      'React 17+ events ko root container par delegate karता (pehle document par). SyntheticEvent native event ko wrap karता — consistent API. React 17 se **event pooling removed** (pehle event object reuse hota tha, e.persist() chahiye tha — ab nahi).',
    browser:
      'React apne synthetic event system se native browser events ko intercept karता (delegation). e.nativeEvent se actual native event milta. Passive listeners scroll ke liye React internally optimize karता.',
    notes: {
      concept: 'SyntheticEvent = cross-browser wrapper; root delegation.',
      tip: 'Args ke liye arrow function (() => fn(arg)).',
      warning: 'onClick={fn(arg)} turant call ho jaता — arrow use karो.',
      error: 'Event pooling ab nahi (React 17+) — e.persist() ki zaroorat nahi.',
    },
    compare: {
      headers: ['Feature', 'DOM events', 'React (Synthetic)'],
      rows: [
        ['Naming', 'onclick (lower)', 'onClick (camel)'],
        ['Attach', 'Per element', 'Root delegation'],
        ['Cross-browser', 'Manual', 'Wrapped (consistent)'],
        ['Pooling', 'N/A', 'Removed (17+)'],
      ],
    },
    mistakes: [
      { bad: 'onClick={handler(arg)} (turant call).', fix: 'onClick={() => handler(arg)}.' },
      { bad: 'onclick lowercase.', fix: 'onClick camelCase.' },
    ],
    best: ['camelCase event props.', 'Args → arrow function.', 'preventDefault for forms/links.', 'stopPropagation soch-samajh kar.', 'Handlers component ke andar (closures).'],
    performance:
      'Event delegation (React internally) se memory efficient (ek root listener). Inline arrow handlers har render naya function — usually OK, par memoized children ke liye useCallback. Heavy handler logic debounce/throttle.',
    interview: {
      beginner: [
        { q: 'Synthetic event kya hai?', a: 'React ka cross-browser wrapper around native event — consistent API har browser mein. onClick, onChange jaise camelCase props.' },
        { q: 'Args kaise pass karein?', a: 'Arrow function se: onClick={() => fn(arg)}. Directly fn(arg) turant call ho jaता.' },
      ],
      intermediate: [
        { q: 'React event delegation?', a: 'React saare events ko root container par attach karता (har element par nahi) — memory efficient. Aapko transparent.' },
      ],
      advanced: [
        { q: 'Event pooling kya tha aur ab?', a: 'Pehle React SyntheticEvent objects reuse karता tha (performance) — async access ke liye e.persist() chahiye tha. React 17 se pooling removed — ab e normally use kar sakte.' },
      ],
    },
    mcqs: [
      { q: 'React event naming?', options: ['onclick', 'onClick', 'OnClick', 'on-click'], answer: 1, explain: 'camelCase onClick.' },
      { q: 'Args pass?', options: ['fn(arg)', '() => fn(arg)', 'fn.arg', 'fn[arg]'], answer: 1, explain: 'Arrow function.' },
    ],
    exercises: {
      easy: ['Button click par alert dikhao.'],
      medium: ['Input onChange se state update karो.'],
      advanced: ['List item + delete button (stopPropagation) banao.'],
    },
    summary: [
      'SyntheticEvent = cross-browser wrapper.',
      'camelCase props (onClick, onChange).',
      'Args → arrow function.',
      'Root delegation; pooling removed (17+).',
    ],
    cheatsheet: [
      { h: 'Events', code: `onClick={fn}\nonClick={()=>fn(arg)}\ne.target.value\ne.preventDefault()` },
    ],
    projects: ['Form handling', 'Click counter', 'Interactive list'],
    advanced:
      'e.nativeEvent native event deता. Custom events / event emitters for cross-component. Capture phase: onClickCapture. React 18 events automatic batching mein. Keyboard/pointer events. Outside-click detection (ref + document listener).',
    quiz: [
      { q: 'Pooling React 17+?', options: ['Yes', 'Removed', 'Optional', 'Always'], answer: 1, explain: 'Removed.' },
      { q: 'Form reload roko?', options: ['stopPropagation', 'preventDefault', 'return', 'stop'], answer: 1, explain: 'preventDefault.' },
    ],
    related: ['state-usestate', 'controlled-uncontrolled', 'browser-react'],
  },
}
