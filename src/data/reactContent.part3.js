// React content — Part 3: Forms + Hooks (core)

export const reactContentC = {
  'controlled-uncontrolled': {
    overview:
      'Forms mein inputs do tarah ke: **Controlled** — value React state se control hoti (single source of truth, React way), aur **Uncontrolled** — value DOM khud rakhता, React **useRef** se padhता. Controlled prefer hota (validation, dynamic); uncontrolled simple/quick forms ya non-React integration ke liye.',
    why:
      'Forms har app mein. Controlled vs uncontrolled, useRef interview ka standard topic. Validation/dynamic forms ki neev.',
    concept: [
      { h: 'Controlled component', p: 'Input ka value React state se aata, onChange se update. React = single source of truth.', code: `const [name, setName] = useState('')\n<input value={name} onChange={e => setName(e.target.value)} />` },
      { h: 'Uncontrolled component', p: 'DOM input apni value khud rakhता; React useRef se zaroorat par padhता. defaultValue se initial.', code: `const ref = useRef()\n<input defaultValue="" ref={ref} />\n// padho: ref.current.value` },
      { h: 'useRef for DOM', p: 'useRef DOM element ka direct access deता (focus, value read, scroll). .current par node.', code: `const inputRef = useRef(null)\ninputRef.current.focus()` },
      { h: 'Kab kaunsा', p: 'Controlled: real-time validation, conditional fields, dynamic. Uncontrolled: simple forms, file inputs, non-React libs integration.' },
    ],
    analogy:
      'Controlled input ek **puppet** hai — har move (value) React (puppeteer) control karता. Uncontrolled input ek **independent kid** — apna kaam khud karता, React sirf "abhi value kya hai?" (ref) poochता jab zaroorat ho. 🎭',
    syntax: { code: `// Controlled\n<input value={state} onChange={e => setState(e.target.value)} />\n// Uncontrolled\nconst ref = useRef()\n<input defaultValue="x" ref={ref} />\nref.current.value`, note: 'Controlled: value + onChange. Uncontrolled: defaultValue + ref.' },
    examples: [
      { level: 'Beginner', title: 'Controlled form', code: `function Form() {\n  const [email, setEmail] = useState('')\n  return (\n    <form onSubmit={e => { e.preventDefault(); console.log(email) }}>\n      <input value={email} onChange={e => setEmail(e.target.value)} />\n      <button>Submit</button>\n    </form>\n  )\n}`, explain: 'State = source of truth, real-time access.' },
      { level: 'Intermediate', title: 'Uncontrolled with ref', code: `function Form() {\n  const nameRef = useRef()\n  const submit = (e) => {\n    e.preventDefault()\n    console.log(nameRef.current.value)\n  }\n  return (\n    <form onSubmit={submit}>\n      <input ref={nameRef} defaultValue="" />\n      <button>Submit</button>\n    </form>\n  )\n}`, explain: 'DOM value rakhता, submit par ref se padha.' },
    ],
    memory:
      'Controlled: har keystroke state update + re-render (input value state mein). Uncontrolled: value DOM mein (no re-render per keystroke) — ref sirf reference. Bade forms mein controlled zyada re-renders, uncontrolled lighter.',
    notes: {
      concept: 'Controlled = state-driven; uncontrolled = DOM + ref.',
      tip: 'Default controlled use karो; uncontrolled simple/file/perf ke liye.',
      warning: 'value bina onChange = read-only input (warning).',
      error: 'value aur defaultValue dono saath dena.',
    },
    compare: {
      headers: ['Feature', 'Controlled', 'Uncontrolled'],
      rows: [
        ['Value source', 'React state', 'DOM'],
        ['Access', 'state', 'ref.current.value'],
        ['Re-render/keystroke', 'Haan', 'Nahi'],
        ['Validation', 'Easy real-time', 'On submit'],
        ['Best for', 'Most forms', 'Simple/file/perf'],
      ],
    },
    mistakes: [
      { bad: 'value bina onChange.', fix: 'onChange do (ya defaultValue for uncontrolled).' },
      { bad: 'Har keystroke heavy work (controlled).', fix: 'Debounce ya uncontrolled.' },
    ],
    best: ['Default controlled.', 'File inputs uncontrolled (must).', 'Real-time validation → controlled.', 'useRef for focus/scroll/measure.', 'Bade forms → react-hook-form (uncontrolled-ish).'],
    performance:
      'Controlled inputs har keystroke re-render — bade forms mein slow ho sakte. Solutions: debounce, split components, ya uncontrolled (react-hook-form refs use karке minimal re-renders deता).',
    interview: {
      beginner: [
        { q: 'Controlled vs uncontrolled?', a: 'Controlled: value React state se (onChange update). Uncontrolled: value DOM mein, ref se padhते. Controlled = single source of truth.' },
        { q: 'useRef kya hai?', a: 'Mutable container (.current) jo re-render trigger nahi karता — DOM access (focus) ya values persist karne ke liye.' },
      ],
      intermediate: [
        { q: 'Kab uncontrolled use?', a: 'File inputs (must), simple forms, performance (no per-keystroke re-render), ya non-React libs integrate karte time.' },
      ],
      advanced: [
        { q: 'Controlled forms performance issue?', a: 'Har keystroke state update + re-render — bade forms slow. react-hook-form uncontrolled refs use karके minimal re-renders deता.' },
      ],
    },
    mcqs: [
      { q: 'Controlled value?', options: ['DOM', 'React state', 'ref', 'Context'], answer: 1, explain: 'React state.' },
      { q: 'File input?', options: ['Controlled', 'Uncontrolled', 'Both', 'Neither'], answer: 1, explain: 'Always uncontrolled.' },
    ],
    exercises: {
      easy: ['Controlled input banao.'],
      medium: ['Uncontrolled form with ref banao.'],
      advanced: ['useRef se input auto-focus on mount.'],
    },
    summary: [
      'Controlled: value state se (onChange).',
      'Uncontrolled: value DOM, ref se padhо.',
      'useRef DOM access + persist (no re-render).',
      'Default controlled; file/perf → uncontrolled.',
    ],
    cheatsheet: [
      { h: 'Forms', code: `// Controlled\n<input value={s} onChange={..}/>\n// Uncontrolled\n<input ref={r} defaultValue=""/>` },
    ],
    projects: ['Login form', 'Search box', 'Multi-field form'],
    advanced:
      'react-hook-form (uncontrolled + refs, performant). Controlled + debounce for search. useRef + useImperativeHandle for custom inputs. Form libraries (Formik) controlled, react-hook-form uncontrolled philosophy.',
    quiz: [
      { q: 'useRef re-render?', options: ['Triggers', 'No trigger', 'Sometimes', 'Always'], answer: 1, explain: '.current change no re-render.' },
      { q: 'Single source of truth?', options: ['Uncontrolled', 'Controlled', 'Both', 'Neither'], answer: 1, explain: 'Controlled (state).' },
    ],
    related: ['form-validation', 'useref', 'events'],
  },

  'form-validation': {
    overview:
      'Form Validation user input ko check karता (required, email format, length) — galat ho to error dikhाओ, submit roko. Manual validation (state + checks) ya libraries: **Formik** (form state management) + **Yup** (schema validation), ya **react-hook-form** (performant). Dynamic forms = fields runtime par add/remove.',
    why:
      'Har real form validation chahiye (security + UX). Formik/Yup/react-hook-form interview + production standard. Manual validation patterns bhi poochते.',
    concept: [
      { h: 'Manual validation', p: 'State mein errors rakho, onChange/onSubmit par check, error messages dikhाओ.', code: `const [errors, setErrors] = useState({})\nif (!email.includes('@')) errors.email = 'Invalid email'` },
      { h: 'Formik', p: 'Form state, handleChange, errors, touched manage karता — boilerplate kam.', code: `<Formik initialValues={{email:''}} onSubmit={fn}>\n  {({ values, handleChange }) => (...)}\n</Formik>` },
      { h: 'Yup schema', p: 'Declarative validation schema — Formik ke saath integrate.', code: `const schema = Yup.object({\n  email: Yup.string().email().required(),\n  age: Yup.number().min(18)\n})` },
      { h: 'Dynamic forms', p: 'Fields array state mein — add/remove buttons se runtime par fields manage.', code: `const [fields, setFields] = useState([{ id: 1 }])\nsetFields([...fields, { id: Date.now() }])` },
    ],
    analogy:
      'Validation ek **security check at airport** — passport (email format), ticket (required), age limit — sab sahi to entry (submit), warna error. Formik/Yup = ek professional security system (automated checks) vs manually har cheez khud check karna. 🛂',
    syntax: { code: `// react-hook-form (modern)\nconst { register, handleSubmit, formState: { errors } } = useForm()\n<input {...register('email', { required: true })} />\n{errors.email && <span>Required</span>}`, note: 'react-hook-form performant (uncontrolled); Formik+Yup popular combo.' },
    examples: [
      { level: 'Intermediate', title: 'Manual validation', code: `function Form() {\n  const [email, setEmail] = useState('')\n  const [err, setErr] = useState('')\n  const submit = (e) => {\n    e.preventDefault()\n    if (!email.includes('@')) return setErr('Invalid email')\n    setErr(''); console.log('OK')\n  }\n  return (\n    <form onSubmit={submit}>\n      <input value={email} onChange={e => setEmail(e.target.value)} />\n      {err && <span className="error">{err}</span>}\n      <button>Submit</button>\n    </form>\n  )\n}`, explain: 'State-based validation + error display.' },
    ],
    notes: {
      concept: 'Validation: manual ya Formik+Yup / react-hook-form.',
      tip: 'react-hook-form performant (kam re-renders).',
      warning: 'Client validation security nahi — server par bhi validate.',
      error: 'Sirf onSubmit validate — real-time feedback better UX.',
    },
    compare: {
      headers: ['Tool', 'Style', 'Perf'],
      rows: [
        ['Manual', 'State + checks', 'Depends'],
        ['Formik', 'Controlled, full-featured', 'More re-renders'],
        ['react-hook-form', 'Uncontrolled, refs', 'Best (minimal)'],
        ['Yup', 'Schema validation', 'With Formik/RHF'],
      ],
    },
    mistakes: [
      { bad: 'Sirf client-side validation.', fix: 'Server par bhi validate (security).' },
      { bad: 'Har field manual (boilerplate).', fix: 'Library (Formik/RHF).' },
    ],
    best: ['Real-time + on-submit validation.', 'Schema (Yup/Zod) for complex.', 'react-hook-form for performance.', 'Server-side validation bhi.', 'Clear error messages.'],
    performance:
      'Controlled forms (Formik) har keystroke re-render. react-hook-form uncontrolled refs se minimal re-renders (sirf error/submit par). Bade forms ke liye RHF best.',
    interview: {
      intermediate: [
        { q: 'Form validation ke approaches?', a: 'Manual (state + checks), Formik (form state) + Yup (schema), ya react-hook-form (performant, uncontrolled). Schema declarative + reusable.' },
        { q: 'Formik vs react-hook-form?', a: 'Formik controlled (more re-renders, full-featured). react-hook-form uncontrolled refs (minimal re-renders, faster). RHF modern choice.' },
      ],
      advanced: [
        { q: 'Client validation kaafi hai?', a: 'Nahi — security ke liye server-side validation bhi zaroori (client bypass ho sakta). Client UX ke liye, server safety ke liye.' },
      ],
    },
    mcqs: [
      { q: 'Schema validation?', options: ['Formik', 'Yup', 'useState', 'axios'], answer: 1, explain: 'Yup/Zod schema.' },
      { q: 'Most performant?', options: ['Formik', 'react-hook-form', 'Manual', 'Same'], answer: 1, explain: 'RHF minimal re-renders.' },
    ],
    exercises: {
      easy: ['Required field validation manual.'],
      medium: ['Email format + error message.'],
      advanced: ['Dynamic form (add/remove fields) with validation.'],
    },
    summary: [
      'Validation: manual / Formik+Yup / react-hook-form.',
      'react-hook-form performant (uncontrolled).',
      'Yup/Zod declarative schemas.',
      'Server-side validation bhi (security).',
    ],
    cheatsheet: [
      { h: 'RHF', code: `const {register,handleSubmit,formState:{errors}}=useForm()\n<input {...register('x',{required:true})}/>` },
    ],
    projects: ['Signup form', 'Multi-step form', 'Dynamic field array', 'Payment form'],
    advanced:
      'Zod (TS-first schema) + react-hook-form (zodResolver). Async validation (username available?). Field arrays (useFieldArray). Wizard/multi-step forms with shared state. Accessibility (aria-invalid, error announcements).',
    quiz: [
      { q: 'Yup kya?', options: ['Form state', 'Schema validation', 'Router', 'HTTP'], answer: 1, explain: 'Validation schema.' },
      { q: 'Client validation security?', options: ['Enough', 'Need server too', 'Useless', 'Always safe'], answer: 1, explain: 'Server bhi zaroori.' },
    ],
    related: ['controlled-uncontrolled', 'useref', 'api-handling'],
  },

  useeffect: {
    overview:
      '**useEffect** se functional components mein **side-effects** karते — data fetch, subscriptions, timers, manual DOM, logging. Effect render ke **baad** (commit + paint) chalता. **Dependency array** control karता kab re-run ho. **Cleanup function** (return) subscriptions/timers hatाता. React ka lifecycle yahi hai.',
    why:
      'useEffect React ka sabse use hone wala (aur sabse galat samjha jaane wala) hook. Data fetching, cleanup, deps — interview ka guaranteed topic. Bugs (infinite loops, stale closures) yahin se.',
    concept: [
      { h: 'Side-effects kya', p: 'Render ke bahar ki cheezein: API call, timer, subscription, DOM manipulation, localStorage. Render pure rakho, effects yeh handle karte.', code: `useEffect(() => {\n  document.title = \`Count: \${count}\`\n})` },
      { h: 'Dependency array', p: 'Second arg control karता kab effect chale: `[]` (sirf mount), `[dep]` (jab dep badle), koi nahi (har render).', code: `useEffect(fn, [])        // mount only\nuseEffect(fn, [count])   // count badle\nuseEffect(fn)            // har render` },
      { h: 'Cleanup function', p: 'Effect se return ki gayi function cleanup karती — next effect se pehle ya unmount par. Timers, subscriptions hatाने ke liye.', code: `useEffect(() => {\n  const id = setInterval(tick, 1000)\n  return () => clearInterval(id) // cleanup\n}, [])` },
      { h: 'Data fetching', p: 'Common use: mount par fetch. (Modern: React Query better.) Cleanup se stale request ignore.', code: `useEffect(() => {\n  fetch(url).then(r => r.json()).then(setData)\n}, [url])` },
    ],
    analogy:
      'useEffect ek **"render ho jaane ke baad yeh kaam karo"** instruction hai. Jaise theatre mein play (render) khatam hone par cleanup crew (cleanup function) stage saaf karti, aur agle show se pehle setup. Dependency array = "kab phir se yeh karna hai" ka rule. 🎭',
    syntax: { code: `useEffect(() => {\n  // side-effect (after render)\n  return () => {\n    // cleanup (before next / unmount)\n  }\n}, [dependencies])`, note: 'Cleanup optional; deps array re-run control karта.' },
    steps: [
      'Component render hota, DOM commit hota, browser paint.',
      'Phir useEffect chalता (async, after paint).',
      'Next render par: agar deps badle → pehle cleanup, phir naya effect.',
      'Deps same → effect skip.',
      'Unmount par → final cleanup.',
    ],
    visual: {
      type: 'timeline',
      items: [
        { year: '1', text: 'Render + commit + paint' },
        { year: '2', text: 'Effect run (deps changed/mount)' },
        { year: '3', text: 'Re-render: cleanup → new effect (if deps change)' },
        { year: '4', text: 'Unmount: final cleanup' },
      ],
    },
    examples: [
      { level: 'Beginner', title: 'Effect with deps', code: `function Title({ count }) {\n  useEffect(() => {\n    document.title = \`Count: \${count}\`\n  }, [count])\n  return <p>{count}</p>\n}`, explain: 'count badle to title update.' },
      { level: 'Intermediate', title: 'Timer + cleanup', code: `function Timer() {\n  const [s, setS] = useState(0)\n  useEffect(() => {\n    const id = setInterval(() => setS(p => p + 1), 1000)\n    return () => clearInterval(id) // cleanup!\n  }, [])\n  return <p>{s}s</p>\n}`, explain: 'Cleanup na ho to multiple timers leak.' },
      { level: 'Advanced', title: 'Fetch with cleanup', code: `useEffect(() => {\n  let active = true\n  fetch(\`/api/\${id}\`)\n    .then(r => r.json())\n    .then(d => { if (active) setData(d) })\n  return () => { active = false } // ignore stale\n}, [id])`, explain: 'id badle to purana response ignore (race condition fix).' },
    ],
    memory:
      'Effect callback + cleanup closures memory mein (deps capture). Cleanup na ho to timers/subscriptions leak (component gone par bhi chalte). Deps array har render compare hota (Object.is) — naye references (objects/functions) effect re-run karा dete.',
    browser:
      'useEffect browser paint ke BAAD chalता (async, non-blocking) — UI freeze nahi. useLayoutEffect paint se pehle (DOM measure). Isliye visual flicker avoid karne ke liye useLayoutEffect.',
    notes: {
      concept: 'useEffect = side-effects after render; deps control re-run; cleanup.',
      tip: 'Cleanup hamesha for timers/subscriptions/listeners.',
      warning: 'Deps array sahi rakho — missing dep = stale closure bug.',
      error: 'Empty deps mein state use karke wahi state update = stale value. Object/function deps = infinite loop.',
    },
    compare: {
      headers: ['Deps', 'Kab chalता'],
      rows: [
        ['koi nahi', 'Har render'],
        ['[]', 'Sirf mount (+ unmount cleanup)'],
        ['[a, b]', 'a ya b badle'],
        ['Cleanup', 'Next effect se pehle / unmount'],
      ],
    },
    mistakes: [
      { bad: 'Cleanup na karna (timers/subs).', fix: 'return () => cleanup().' },
      { bad: 'Deps array galat (missing dep).', fix: 'Saare used values deps mein (eslint plugin).' },
      { bad: 'Object/function deps inline.', fix: 'useMemo/useCallback se stable.' },
    ],
    best: ['Cleanup for timers/subscriptions.', 'Correct deps (eslint-plugin-react-hooks).', 'Ek effect ek concern.', 'Data fetching → React Query.', 'Stable deps (useCallback/useMemo).'],
    performance:
      'Effects paint ke baad (non-blocking). Galat deps = unnecessary re-runs (API spam). Object/function deps inline = infinite loops. useMemo/useCallback se stable deps. Heavy effects debounce.',
    interview: {
      beginner: [
        { q: 'useEffect kya hai?', a: 'Hook for side-effects (fetch, timers, subscriptions) — render ke baad chalता. Deps array control karता kab re-run ho, cleanup function resources hatाता.' },
        { q: 'Dependency array kya karता?', a: '[] sirf mount, [dep] jab dep badle, koi nahi har render. Control karता effect kab chale.' },
      ],
      intermediate: [
        { q: 'Cleanup function kyun?', a: 'Subscriptions/timers/listeners hatाने ke liye — next effect se pehle ya unmount par. Memory leaks + duplicate effects avoid.' },
        { q: 'Stale closure problem?', a: 'Effect ke andar purani state/props capture ho jaati (deps mein na ho to). Fix: sahi deps ya functional update.' },
      ],
      advanced: [
        { q: 'useEffect infinite loop kab?', a: 'Effect state update kare jo deps mein ho, ya object/function dep inline ho (har render naya reference). Fix: deps sahi karो, useMemo/useCallback, ya functional update.' },
      ],
    },
    mcqs: [
      { q: 'useEffect kab chalता?', options: ['Render se pehle', 'Render ke baad', 'During render', 'Never'], answer: 1, explain: 'After render (paint).' },
      { q: '[] deps?', options: ['Har render', 'Mount only', 'Never', 'Unmount only'], answer: 1, explain: 'Sirf mount.' },
    ],
    exercises: {
      easy: ['Mount par console.log effect.'],
      medium: ['Timer with cleanup banao.'],
      advanced: ['Fetch with cleanup (race condition fix).'],
    },
    summary: [
      'useEffect = side-effects after render.',
      'Deps: [] mount, [x] on change, none every render.',
      'Cleanup (return) for timers/subs.',
      'Correct deps avoid stale/infinite bugs.',
    ],
    cheatsheet: [
      { h: 'useEffect', code: `useEffect(()=>{\n  // effect\n  return ()=>{} // cleanup\n},[deps])` },
    ],
    projects: ['Data fetcher', 'Timer/clock', 'Event listener', 'localStorage sync'],
    advanced:
      'useEffect vs useLayoutEffect timing. Strict Mode double-invoke (dev) effects. Effect dependencies + closures (stale). React 18 effects + concurrent. "You might not need an effect" (derive instead). useEffect race conditions (cleanup/AbortController).',
    quiz: [
      { q: 'Cleanup kab?', options: ['Never', 'Before next/unmount', 'Render', 'Mount'], answer: 1, explain: 'Before next effect / unmount.' },
      { q: 'Missing dep result?', options: ['Faster', 'Stale closure bug', 'Error', 'Nothing'], answer: 1, explain: 'Stale values.' },
    ],
    related: ['useeffect-deep', 'usememo-usecallback', 'react-query'],
  },

  'useeffect-deep': {
    overview:
      'useEffect ko deeply samjho: **Mount** (pehli baar `[]`), **Update** (deps badle), **Cleanup** (next effect/unmount). **Dependency comparison** Object.is se hota (reference). **Infinite loops** galat deps se. **Strict Mode** dev mein effects **double** chalाता (bugs jaldi pakadने ke liye) — production mein ek baar.',
    why:
      'useEffect ke subtle behaviors (double render, stale closure, infinite loops) senior interview + real bugs. "Strict Mode double effect kyun" common question.',
    concept: [
      { h: 'Mount / Update / Cleanup phases', p: 'Mount: effect pehli baar. Update: deps change → cleanup (purana) + effect (naya). Unmount: final cleanup.', code: `useEffect(() => {\n  console.log('effect')\n  return () => console.log('cleanup')\n}, [dep])` },
      { h: 'Dependency comparison', p: 'React har render deps ko Object.is se compare karта. Primitives value se, objects/functions reference se — naya reference = effect re-run.', code: `// Inline object = naya reference har render\nuseEffect(fn, [{ a: 1 }]) // har render run! (bug)` },
      { h: 'Infinite loops', p: 'Effect state update kare jo deps mein ho → re-render → effect → loop. Ya object/function dep inline.', code: `// ❌ Loop\nuseEffect(() => setCount(count + 1), [count])` },
      { h: 'Strict Mode double render', p: 'Dev mein React effects (aur render) **double** chalाता — impure code/missing cleanup pakadने ke liye. Production mein single. Isliye cleanup zaroori.', code: `<StrictMode>\n  <App /> // dev: mount → unmount → mount\n</StrictMode>` },
    ],
    analogy:
      'Strict Mode ek **dress rehearsal** jaisा hai — React do baar "stage" karता (mount-unmount-mount) taaki cleanup bugs (purane props/timers) pakad mein aayein. Agar tumhare cleanup sahi hain to double-run koi problem nahi. 🎬',
    syntax: { code: `useEffect(() => {\n  // mount + every dep change\n  return () => { /* cleanup */ }\n}, [a, b])\n\n// Strict Mode (dev): effect runs 2x\n<StrictMode><App/></StrictMode>`, note: 'Strict Mode double-run sirf dev mein; cleanup robust banाओ.' },
    steps: [
      'Mount: render → commit → effect chalता.',
      'Strict Mode (dev): effect → cleanup → effect again (double).',
      'Update: deps change → cleanup → naya effect.',
      'Deps same → effect skip.',
      'Unmount: final cleanup.',
    ],
    examples: [
      { level: 'Advanced', title: 'Infinite loop bug + fix', code: `// ❌ Infinite loop\nuseEffect(() => {\n  setData([...data, 1])\n}, [data])\n// ✅ Fix: remove data dep ya functional\nuseEffect(() => {\n  setData(prev => [...prev, 1])\n}, []) // run once`, explain: 'data dep + setData(data) = loop. Functional + sahi deps fix.' },
      { level: 'Advanced', title: 'Object dep bug', code: `// ❌ Har render run (options naya reference)\nfunction C({ id }) {\n  const options = { id }\n  useEffect(fetchData, [options])\n}\n// ✅ Primitive dep\nuseEffect(fetchData, [id])`, explain: 'Object dep inline = naya reference har render. Primitive ya useMemo.' },
    ],
    memory:
      'Strict Mode dev mein components ko mount-unmount-mount karता (effects double) — non-cleaned resources (timers, subscriptions) expose hote. Production mein single. Effect closures purani state capture karte (stale) — deps se latest milta.',
    browser:
      'Strict Mode double-effect sirf development build mein (production mein nahi). Console logs double dikhते dev mein — yeh expected hai, bug nahi. Effects async (paint ke baad).',
    notes: {
      concept: 'Mount/update/cleanup phases; Object.is deps compare; Strict double.',
      tip: 'Strict Mode double-run cleanup test karta — embrace it.',
      warning: 'Object/function deps inline = re-run/loop. Stabilize.',
      error: 'Effect mein state update jo deps mein ho (no functional) = infinite loop.',
    },
    compare: {
      headers: ['Scenario', 'Dev (Strict)', 'Production'],
      rows: [
        ['Effect runs (mount)', '2x', '1x'],
        ['Render', '2x', '1x'],
        ['Purpose', 'Catch bugs', 'Real behaviour'],
      ],
    },
    mistakes: [
      { bad: 'Object/function inline deps.', fix: 'Primitive deps ya useMemo/useCallback.' },
      { bad: 'Effect state update without functional.', fix: 'Functional update + sahi deps.' },
      { bad: 'Strict double-run ko bug samajhna.', fix: 'Dev-only; cleanup theek karो.' },
    ],
    best: ['Robust cleanup (Strict-safe).', 'Primitive/stable deps.', 'Functional updates in effects.', 'eslint-plugin-react-hooks.', 'Avoid effects jab derive ho sakta.'],
    performance:
      'Galat deps = redundant effects (API spam, loops). Stable deps (useMemo/useCallback) effects controlled rakhte. Strict double-run dev-only (production fast). Heavy effects debounce ya React Query.',
    interview: {
      intermediate: [
        { q: 'Strict Mode effects double kyun?', a: 'Dev mein React intentionally mount-unmount-mount karता taaki missing cleanup / impure effects pakad mein aayein. Production mein single run.' },
        { q: 'useEffect infinite loop kab?', a: 'Effect state update kare jo deps mein ho, ya object/function dep inline (har render naya reference). Fix: functional update, sahi deps, useMemo/useCallback.' },
      ],
      advanced: [
        { q: 'Dependency comparison kaise hota?', a: 'React Object.is se har dep compare karता. Primitives value se same, objects/functions reference se — inline naya reference har render = effect re-run.' },
        { q: 'Stale closure in effect?', a: 'Effect closure us render ki state/props capture karता. Deps mein na ho to purani value use hoti. Fix: deps add karo ya functional update / ref.' },
      ],
    },
    mcqs: [
      { q: 'Strict Mode effect (dev)?', options: ['1x', '2x', '0x', '3x'], answer: 1, explain: 'Double in dev.' },
      { q: 'Infinite loop cause?', options: ['[] deps', 'state update in deps', 'cleanup', 'mount'], answer: 1, explain: 'setState of a dep.' },
    ],
    exercises: {
      easy: ['Strict Mode mein double log observe karो.'],
      medium: ['Infinite loop banao phir fix karो.'],
      advanced: ['Object dep bug recreate + useMemo se fix.'],
    },
    summary: [
      'Phases: mount, update (cleanup+effect), unmount.',
      'Deps Object.is se compare (reference).',
      'Infinite loop: state update in deps / inline object.',
      'Strict Mode dev double-run (cleanup test).',
    ],
    cheatsheet: [
      { h: 'Pitfalls', code: `// loop: setX in [x] deps\n// inline obj dep = re-run\n// Strict: 2x in dev` },
    ],
    projects: ['Robust data fetcher', 'Subscription manager', 'Debounced effect'],
    advanced:
      'AbortController for fetch cleanup. useEffectEvent (experimental) for non-reactive values. Effects + concurrent rendering. "Effects are an escape hatch" — derive/event handlers prefer. Custom hooks encapsulate effect logic.',
    quiz: [
      { q: 'Strict double-run where?', options: ['Production', 'Dev only', 'Both', 'Never'], answer: 1, explain: 'Development only.' },
      { q: 'Object dep inline?', options: ['Stable', 'Re-runs effect', 'Error', 'Ignored'], answer: 1, explain: 'Naya reference = re-run.' },
    ],
    related: ['useeffect', 'usememo-usecallback', 'render-commit'],
  },

  useref: {
    overview:
      '**useRef** ek mutable container (`{ current: value }`) deता jo **re-render trigger nahi karता** aur renders ke beech **persist** hota. Do main uses: (1) **DOM access** (focus, scroll, measure), (2) **mutable value store** (previous value, timer id, flag) jo render mein nahi chahiye.',
    why:
      'DOM access, timers, previous values, "instance variable" — sab useRef se. State vs ref ka fark interview mein aata.',
    concept: [
      { h: 'DOM access', p: 'ref attribute se DOM element ka reference. .current par node — focus, scroll, measure.', code: `const inputRef = useRef(null)\n<input ref={inputRef} />\ninputRef.current.focus()` },
      { h: 'Mutable value (no re-render)', p: 'Value persist karni hai par UI mein nahi chahiye (timer id, flag, previous value) — useRef. Change re-render nahi karता.', code: `const timerId = useRef(null)\ntimerId.current = setInterval(...)\nclearInterval(timerId.current)` },
      { h: 'Ref vs State', p: 'State: UI mein dikhता, change → re-render. Ref: persist par no re-render, sync update (turant).', code: `// ref turant update\nref.current = 5\nconsole.log(ref.current) // 5 (state hota to async)` },
      { h: 'Previous value', p: 'useEffect + ref se previous render ki value yaad.', code: `const prev = useRef()\nuseEffect(() => { prev.current = value })` },
    ],
    analogy:
      'useRef ek **sticky note** hai jo component apne paas rakhता — likhо/badlो jitna chaho, screen (UI) refresh nahi hoti. State ek **whiteboard** hai — likho to sab dekhते (re-render). DOM ref = ek "remote control" jo actual element ko point karта (focus/scroll). 📝',
    syntax: { code: `const ref = useRef(initialValue)\nref.current          // read/write\n<div ref={ref} />     // DOM attach\n// change ref.current → NO re-render`, note: 'ref.current mutate karna safe (render ke bahar); render mein read avoid.' },
    examples: [
      { level: 'Beginner', title: 'Auto-focus', code: `function Search() {\n  const inputRef = useRef(null)\n  useEffect(() => {\n    inputRef.current.focus()\n  }, [])\n  return <input ref={inputRef} />\n}`, explain: 'Mount par input auto-focus.' },
      { level: 'Advanced', title: 'Previous value', code: `function Counter({ count }) {\n  const prevCount = useRef()\n  useEffect(() => { prevCount.current = count })\n  return <p>Now: {count}, Before: {prevCount.current}</p>\n}`, explain: 'Ref se previous render ki value yaad.' },
    ],
    memory:
      'useRef ek stable object ({current}) return karता jo component ke poore lifetime persist hota (same reference har render). .current mutate karna React ke bahar — no re-render, no batching. Render ke beech value carry karta (fiber par store).',
    notes: {
      concept: 'useRef = mutable {current}, no re-render, persists.',
      tip: 'DOM access + non-rendering mutable values ke liye.',
      warning: 'Render ke dauraan ref.current read/write avoid (use effects).',
      error: 'Ref ko state ki tarah use karke UI update expect karna (no re-render).',
    },
    compare: {
      headers: ['Feature', 'useState', 'useRef'],
      rows: [
        ['Re-render on change', 'Haan', 'Nahi'],
        ['Update', 'Async-ish', 'Sync (turant)'],
        ['UI value', 'Haan', 'Nahi (usually)'],
        ['Use', 'Display data', 'DOM/timers/flags'],
      ],
    },
    mistakes: [
      { bad: 'Ref change se UI update expect.', fix: 'UI value → useState.' },
      { bad: 'Render mein ref.current mutate.', fix: 'Effects/handlers mein.' },
    ],
    best: ['DOM access (focus/scroll/measure).', 'Timer ids, flags, previous values.', 'UI data → state, not ref.', 'forwardRef se child DOM expose.'],
    performance:
      'useRef re-render nahi karता — frequent-changing values jo UI mein nahi chahiye (scroll position, mouse coords) ke liye ideal (state hota to re-render storm). Performance win for non-visual mutable data.',
    interview: {
      beginner: [
        { q: 'useRef kya hai?', a: 'Mutable {current} container jo re-render trigger nahi karता aur renders ke beech persist hota. DOM access ya mutable values ke liye.' },
        { q: 'useRef vs useState?', a: 'State change re-render karता (UI). Ref change re-render nahi (no UI), sync update. DOM/timers/flags ke liye ref.' },
      ],
      intermediate: [
        { q: 'useRef ke common uses?', a: 'DOM access (focus/scroll/measure), timer/interval ids, previous values, flags (mounted?), instance variables jo render mein nahi chahiye.' },
      ],
      advanced: [
        { q: 'Ref render ke dauraan kyun na use?', a: 'Refs render-independent hain — render mein mutate/read karna impure (concurrent mode mein unpredictable). Effects/event handlers mein use karो.' },
      ],
    },
    mcqs: [
      { q: 'useRef re-render?', options: ['Triggers', 'No', 'Sometimes', 'Always'], answer: 1, explain: 'No re-render.' },
      { q: 'DOM focus?', options: ['useState', 'useRef', 'useMemo', 'useEffect alone'], answer: 1, explain: 'useRef + .current.focus().' },
    ],
    exercises: {
      easy: ['Input auto-focus on mount.'],
      medium: ['Timer id ref mein store + clear.'],
      advanced: ['Previous value track karo useRef se.'],
    },
    summary: [
      'useRef = mutable {current}, no re-render, persists.',
      'DOM access (focus/scroll/measure).',
      'Mutable values (timers, flags, prev).',
      'UI data → state, not ref.',
    ],
    cheatsheet: [
      { h: 'useRef', code: `const r=useRef(null)\n<input ref={r}/>\nr.current.focus()\nr.current=val // no re-render` },
    ],
    projects: ['Auto-focus input', 'Scroll-to', 'Stopwatch (timer ref)', 'Previous value tracker'],
    advanced:
      'forwardRef + useImperativeHandle (custom ref API). Callback refs (ref={node => ...}). Ref for "latest value" in effects (stale closure fix). useRef vs createRef (class). Refs + concurrent rendering caution.',
    quiz: [
      { q: 'Ref persists?', options: ['No', 'Across renders', 'One render', 'Never'], answer: 1, explain: 'Whole lifetime.' },
      { q: 'Ref update?', options: ['Async', 'Sync (turant)', 'Batched', 'Never'], answer: 1, explain: 'Synchronous.' },
    ],
    related: ['controlled-uncontrolled', 'useeffect', 'senior-apis'],
  },

  'usememo-usecallback': {
    overview:
      '**useMemo** ek calculated **value** ko cache (memoize) karता — deps na badle to dobara calculate nahi. **useCallback** ek **function** ko memoize karता (same reference jab tak deps na badle). **React.memo** component ko wrap karता — props na badle to re-render skip. Teeno performance optimization ke liye.',
    why:
      'Performance optimization ka core. "useMemo vs useCallback", "kab use karein" interview mein bahut. Over-use bhi galat — yeh discussion senior-level.',
    concept: [
      { h: 'useMemo (value)', p: 'Expensive calculation ko cache. Deps same → cached value, alag → recalculate.', code: `const sorted = useMemo(() =>\n  items.sort((a,b) => a-b)\n, [items])` },
      { h: 'useCallback (function)', p: 'Function reference stable rakhता — deps same to same function. Memoized child ko props stable dene ke liye.', code: `const handleClick = useCallback(() => {\n  doSomething(id)\n}, [id])` },
      { h: 'React.memo (component)', p: 'Component ko wrap karता — props (shallow) same to re-render skip. Memoized children ko stable props chahiye (warna useless).', code: `const Child = React.memo(function Child({ data }) {\n  return <div>{data}</div>\n})` },
      { h: 'Saath mein', p: 'React.memo child + useCallback/useMemo parent se stable props = re-render skip. Sirf React.memo bina stable props useless.', code: `const cb = useCallback(fn, [])\n<MemoChild onClick={cb} /> // ab skip ho sakta` },
    ],
    analogy:
      'useMemo ek **calculator jo answer yaad rakhता** — same sawaal (deps) phir poochо to dobara calculate nahi, saved answer. useCallback same but **function** ke liye. React.memo ek **bouncer** — agar props same (same guest) to component ko dobara andar (render) nahi aane deta. 🧮',
    syntax: { code: `const value = useMemo(() => compute(a, b), [a, b])\nconst fn = useCallback(() => handler(a), [a])\nconst Memo = React.memo(Component)`, note: 'useMemo value cache, useCallback function cache, React.memo component skip.' },
    examples: [
      { level: 'Intermediate', title: 'useMemo expensive calc', code: `function List({ items, query }) {\n  const filtered = useMemo(() =>\n    items.filter(i => i.name.includes(query))\n  , [items, query])\n  return <ul>{filtered.map(i => <li key={i.id}>{i.name}</li>)}</ul>\n}`, explain: 'Filter sirf items/query badle to recalculate.' },
      { level: 'Advanced', title: 'memo + useCallback combo', code: `const Child = React.memo(({ onClick }) => {\n  console.log('child render')\n  return <button onClick={onClick}>Click</button>\n})\nfunction Parent() {\n  const [n, setN] = useState(0)\n  const handle = useCallback(() => console.log('hi'), [])\n  return <><button onClick={() => setN(n+1)}>{n}</button><Child onClick={handle} /></>\n}`, explain: 'useCallback stable → React.memo child re-render skip jab n badle.' },
    ],
    memory:
      'useMemo/useCallback cached value/function ko fiber par store karte (deps ke saath). Memoization khud memory leता (cache) — har cheez memoize karna counterproductive. Stable references (useCallback) memoized children ko re-render se bachाते.',
    notes: {
      concept: 'useMemo→value, useCallback→function, React.memo→component skip.',
      tip: 'useCallback(fn) === useMemo(() => fn). React.memo ke saath useful.',
      warning: 'Over-memoization = complexity + memory, kabhi-kabhi slower.',
      error: 'React.memo child ko inline props (object/function) dena — memo useless.',
    },
    compare: {
      headers: ['Tool', 'Memoizes', 'Kab'],
      rows: [
        ['useMemo', 'Value/result', 'Expensive calc'],
        ['useCallback', 'Function reference', 'Stable fn for memo child'],
        ['React.memo', 'Component render', 'Props rarely change'],
      ],
    },
    mistakes: [
      { bad: 'Sab kuch memoize karna.', fix: 'Sirf measured bottlenecks.' },
      { bad: 'React.memo + inline object/fn props.', fix: 'useMemo/useCallback se stable props.' },
    ],
    best: ['Measure pehle (Profiler), phir memoize.', 'React.memo + stable props together.', 'Expensive calc → useMemo.', 'Stable callbacks → useCallback.', 'Premature optimization avoid.'],
    performance:
      'useMemo expensive computations (sort/filter bade data) ke liye. useCallback memoized children ko stable props. Lekin memoization ka apna cost (comparison + memory) — chhote calcs/components ke liye overhead net loss. Profile karke decide.',
    interview: {
      intermediate: [
        { q: 'useMemo vs useCallback?', a: 'useMemo value/result cache karता. useCallback function reference cache karता. useCallback(fn,deps) === useMemo(()=>fn,deps).' },
        { q: 'React.memo kya karता?', a: 'Component ko wrap karता — props (shallow compare) same to re-render skip. Stable props (useMemo/useCallback) ke saath effective.' },
      ],
      advanced: [
        { q: 'React.memo + useCallback kyun saath?', a: 'React.memo props compare karता. Inline functions har render naya reference → memo break. useCallback se function stable → memo child re-render skip.' },
        { q: 'Over-memoization ka nuksan?', a: 'Har memoization comparison + memory cost rakhती. Chhote calcs/components ke liye overhead net loss. Profile karके sirf real bottlenecks memoize.' },
      ],
    },
    mcqs: [
      { q: 'Value cache?', options: ['useCallback', 'useMemo', 'React.memo', 'useRef'], answer: 1, explain: 'useMemo.' },
      { q: 'Function cache?', options: ['useMemo', 'useCallback', 'React.memo', 'useState'], answer: 1, explain: 'useCallback.' },
    ],
    exercises: {
      easy: ['useMemo se expensive calc cache karो.'],
      medium: ['useCallback + React.memo se child re-render rok.'],
      advanced: ['Profiler se before/after memoization compare karो.'],
    },
    summary: [
      'useMemo = value cache, useCallback = function cache.',
      'React.memo = props same to component skip.',
      'memo + stable props saath effective.',
      'Profile first; over-memoize mat karो.',
    ],
    cheatsheet: [
      { h: 'Memo', code: `useMemo(()=>calc,[deps])\nuseCallback(fn,[deps])\nReact.memo(Comp)` },
    ],
    projects: ['Filtered/sorted list', 'Optimized list rows', 'Expensive dashboard'],
    advanced:
      'React Compiler (auto-memoization — future, memo manually less needed). useMemo for referential stability (effect deps). Custom comparison in React.memo (2nd arg). Memoization + concurrent rendering. Profiler API se measure.',
    quiz: [
      { q: 'Component skip?', options: ['useMemo', 'React.memo', 'useCallback', 'useRef'], answer: 1, explain: 'React.memo.' },
      { q: 'Memo child needs?', options: ['Inline props', 'Stable props', 'No props', 'State'], answer: 1, explain: 'Stable (memoized) props.' },
    ],
    related: ['memoization', 're-rendering', 'usereducer'],
  },

  usereducer: {
    overview:
      '**useReducer** complex state logic ke liye useState ka alternative — state ko ek **reducer function** (state, action) → newState se manage karता. Predictable, centralized state transitions. Multiple related state values ya complex update logic ke liye useState se behtar. Redux ka core pattern.',
    why:
      'Complex state (forms, multi-step, state machines) ke liye useReducer cleaner. useState vs useReducer "kab kaunsa" interview question. Redux samajhne ki neev.',
    concept: [
      { h: 'useReducer basics', p: 'useReducer(reducer, initial) → [state, dispatch]. dispatch(action) reducer chalाता jo naya state deता.', code: `const [state, dispatch] = useReducer(reducer, { count: 0 })\ndispatch({ type: 'increment' })` },
      { h: 'Reducer function', p: 'Pure function (state, action) → newState. Switch par action.type. Immutable update.', code: `function reducer(state, action) {\n  switch (action.type) {\n    case 'inc': return { count: state.count + 1 }\n    case 'reset': return { count: 0 }\n    default: return state\n  }\n}` },
      { h: 'useState vs useReducer', p: 'useState simple/independent values. useReducer complex/related state, multiple sub-values, ya next state previous par depend.', code: `// Complex form\ndispatch({ type: 'field', name: 'email', value })` },
      { h: 'With Context', p: 'useReducer + Context = lightweight global state (Redux-lite).', code: `<StateCtx.Provider value={{ state, dispatch }}>` },
    ],
    analogy:
      'useReducer ek **vending machine** hai — tum button (action) dabाते ho, machine (reducer) apne rules se decide karती kya dena (newState). Saare rules ek jagah (reducer) — predictable. useState ek simple "value badlो" switch hai. 🎰',
    syntax: { code: `function reducer(state, action) {\n  switch (action.type) {\n    case 'X': return newState\n    default: return state\n  }\n}\nconst [state, dispatch] = useReducer(reducer, initial)\ndispatch({ type: 'X', payload })`, note: 'Reducer pure + immutable; dispatch action object.' },
    examples: [
      { level: 'Intermediate', title: 'Counter reducer', code: `function reducer(state, action) {\n  switch (action.type) {\n    case 'inc': return { count: state.count + 1 }\n    case 'dec': return { count: state.count - 1 }\n    case 'reset': return { count: 0 }\n    default: return state\n  }\n}\nfunction Counter() {\n  const [s, dispatch] = useReducer(reducer, { count: 0 })\n  return (\n    <>\n      <button onClick={() => dispatch({ type: 'dec' })}>-</button>\n      {s.count}\n      <button onClick={() => dispatch({ type: 'inc' })}>+</button>\n    </>\n  )\n}`, explain: 'Saari transitions reducer mein — centralized.' },
    ],
    memory:
      'useReducer state + dispatch fiber par store. dispatch reference stable hota (har render same) — useCallback ki zaroorat nahi (effect deps mein safe). Reducer pure hona chahiye (no side-effects, immutable).',
    notes: {
      concept: 'useReducer(reducer, init) → [state, dispatch]. Centralized transitions.',
      tip: 'dispatch stable hai — deps mein safe (useCallback nahi chahiye).',
      warning: 'Reducer pure rakho (no side-effects, immutable returns).',
      error: 'Reducer mein state mutate karna (state.count++) — naya object return karो.',
    },
    compare: {
      headers: ['Feature', 'useState', 'useReducer'],
      rows: [
        ['Best for', 'Simple/independent', 'Complex/related'],
        ['Update logic', 'Inline', 'Centralized (reducer)'],
        ['Predictability', 'OK', 'High (pure transitions)'],
        ['dispatch stable', 'N/A', 'Haan'],
        ['Testability', 'Medium', 'High (pure reducer)'],
      ],
    },
    mistakes: [
      { bad: 'Reducer mein mutate (state.x = ...).', fix: 'Naya object return: {...state, x}.' },
      { bad: 'Simple state ke liye useReducer.', fix: 'useState (overkill avoid).' },
    ],
    best: ['Complex/related state → useReducer.', 'Reducer pure + immutable.', 'Action types constants.', 'dispatch deps mein safe.', 'useReducer + Context for global.'],
    performance:
      'dispatch stable reference (re-render bachाता effect deps mein). Reducer pure → predictable, testable. Bade state objects immutable updates careful (structural sharing). useReducer se related updates ek dispatch mein (batched).',
    interview: {
      intermediate: [
        { q: 'useReducer kya hai?', a: 'Complex state ke liye hook — reducer(state, action) → newState. dispatch(action) se update. Centralized, predictable transitions.' },
        { q: 'useState vs useReducer?', a: 'useState simple/independent values. useReducer complex/related state, multiple sub-values, ya jab transitions complex/predictable chahiye.' },
      ],
      advanced: [
        { q: 'useReducer + Context kya deता?', a: 'Lightweight global state (Redux-lite) — reducer se predictable updates, Context se tree-wide access, bina extra library. dispatch stable (no useCallback).' },
        { q: 'Reducer pure kyun?', a: 'Same state+action → same newState (no side-effects). Predictable, testable, time-travel debugging, concurrent-safe. Side-effects effects mein.' },
      ],
    },
    mcqs: [
      { q: 'useReducer returns?', options: ['[state, setState]', '[state, dispatch]', 'state', 'reducer'], answer: 1, explain: '[state, dispatch].' },
      { q: 'Reducer should be?', options: ['Impure', 'Pure', 'Async', 'Stateful'], answer: 1, explain: 'Pure function.' },
    ],
    exercises: {
      easy: ['Counter useReducer se banao.'],
      medium: ['Todo reducer (add/remove/toggle).'],
      advanced: ['useReducer + Context se global state.'],
    },
    summary: [
      'useReducer: complex state, reducer(state,action)→new.',
      'dispatch(action) se update; centralized.',
      'Reducer pure + immutable.',
      'useReducer + Context = Redux-lite.',
    ],
    cheatsheet: [
      { h: 'useReducer', code: `const [s,dispatch]=useReducer(reducer,init)\ndispatch({type:'X',payload})` },
    ],
    projects: ['Todo app', 'Multi-step form', 'Shopping cart', 'Undo/redo'],
    advanced:
      'useReducer + Context global state pattern. Redux Toolkit (createSlice = reducer + actions). State machines (xstate). Lazy init (3rd arg). Immer for immutable reducers. Action creators pattern.',
    quiz: [
      { q: 'Complex state hook?', options: ['useState', 'useReducer', 'useRef', 'useMemo'], answer: 1, explain: 'useReducer.' },
      { q: 'dispatch reference?', options: ['Changes', 'Stable', 'Random', 'Null'], answer: 1, explain: 'Stable.' },
    ],
    related: ['state-usestate', 'context-api', 'state-management'],
  },

  'custom-hooks': {
    overview:
      '**Custom Hooks** apne reusable hooks hain — ek function jo `use` se shuru ho aur dusre hooks (useState, useEffect) use kare. Logic ko components se nikalकar reuse + share karte (stateful logic). UI se logic separate — clean, testable, DRY.',
    why:
      'Logic reuse ka React way (HOC/render-props se cleaner). useFetch, useDebounce, useLocalStorage — common. "Custom hook kaise banाओ" interview + daily code.',
    concept: [
      { h: 'Custom hook kya hai', p: 'Ek function jo "use" se shuru ho aur hooks call kare. Stateful logic extract + reuse.', code: `function useToggle(initial = false) {\n  const [on, setOn] = useState(initial)\n  const toggle = () => setOn(o => !o)\n  return [on, toggle]\n}` },
      { h: 'Rules', p: '"use" prefix (linting + convention). Sirf top-level call (hooks rules). Har component apna independent state paता (state share nahi hota, logic share hota).', code: `// Use\nconst [isOpen, toggleOpen] = useToggle()` },
      { h: 'Common examples', p: 'useFetch (data), useDebounce (value), useLocalStorage (persist), useWindowSize, usePrevious.', code: `function useDebounce(value, delay) {\n  const [v, setV] = useState(value)\n  useEffect(() => {\n    const id = setTimeout(() => setV(value), delay)\n    return () => clearTimeout(id)\n  }, [value, delay])\n  return v\n}` },
      { h: 'Logic vs state share', p: 'Custom hook **logic** share karता, **state** nahi — har use apna independent state paता.' },
    ],
    analogy:
      'Custom hook ek **recipe card** hai — ek baar likho (logic), har kitchen (component) use kare. Par har kitchen apni alag dish (state) banाती same recipe se. Recipe (logic) share, dish (state) independent. 🍳',
    syntax: { code: `function useCustom(args) {\n  const [state, setState] = useState()\n  useEffect(() => { ... }, [])\n  return state // ya [state, actions]\n}\n// use\nconst data = useCustom(args)`, note: '"use" se shuru; hooks rules follow; har use independent state.' },
    examples: [
      { level: 'Intermediate', title: 'useLocalStorage', code: `function useLocalStorage(key, initial) {\n  const [value, setValue] = useState(() => {\n    const stored = localStorage.getItem(key)\n    return stored ? JSON.parse(stored) : initial\n  })\n  useEffect(() => {\n    localStorage.setItem(key, JSON.stringify(value))\n  }, [key, value])\n  return [value, setValue]\n}\n// use: const [theme, setTheme] = useLocalStorage('theme', 'dark')`, explain: 'State + localStorage sync — reusable.' },
      { level: 'Advanced', title: 'useFetch', code: `function useFetch(url) {\n  const [data, setData] = useState(null)\n  const [loading, setLoading] = useState(true)\n  useEffect(() => {\n    let active = true\n    setLoading(true)\n    fetch(url).then(r => r.json()).then(d => {\n      if (active) { setData(d); setLoading(false) }\n    })\n    return () => { active = false }\n  }, [url])\n  return { data, loading }\n}`, explain: 'Fetch logic encapsulated + cleanup. (React Query better for real apps.)' },
    ],
    memory:
      'Custom hook har component instance mein apne hooks ka independent state banाता (logic shared, state isolated). Hooks rules apply (top-level, same order). Custom hook ka returned object/array har render naya — consumer memoize kar sakta.',
    notes: {
      concept: 'Custom hook = reusable stateful logic (use prefix).',
      tip: 'Logic share hota, state nahi (har use independent).',
      warning: 'Hooks rules: "use" prefix, top-level only.',
      error: 'Hook ko condition/loop mein call karna (rules violation).',
    },
    compare: {
      headers: ['Pattern', 'Logic reuse', 'Modern?'],
      rows: [
        ['Custom hooks', 'Stateful logic', 'Yes (preferred)'],
        ['HOC', 'Wrapper component', 'Older'],
        ['Render props', 'Function as child', 'Older'],
      ],
    },
    mistakes: [
      { bad: 'Hook ko condition mein call.', fix: 'Top-level only.' },
      { bad: '"use" prefix na dena.', fix: 'use se shuru (linting).' },
    ],
    best: ['Repeated logic → custom hook.', '"use" prefix.', 'Return clear API (object/array).', 'Single responsibility.', 'Compose hooks (hook in hook).'],
    performance:
      'Custom hooks performance neutral (just function). Returned objects/functions har render naye — consumer ke memoization affect kar sakte (useMemo/useCallback hook ke andar). Logic encapsulation se optimization centralize.',
    interview: {
      beginner: [
        { q: 'Custom hook kya hai?', a: 'Ek reusable function jo "use" se shuru ho aur dusre hooks use kare — stateful logic extract karke share karne ke liye.' },
        { q: 'Custom hook se state share hota?', a: 'Nahi — logic share hota. Har component jo hook use karता apna independent state paता.' },
      ],
      intermediate: [
        { q: 'Custom hooks vs HOC/render props?', a: 'Custom hooks logic reuse ka modern, cleaner tarika — no wrapper hell, no nesting. HOC/render props older patterns.' },
      ],
      advanced: [
        { q: 'Custom hook ke rules?', a: '"use" prefix (linting), sirf top-level call (no conditions/loops), aur hooks ke andar hi hooks. Har render same order.' },
      ],
    },
    mcqs: [
      { q: 'Custom hook prefix?', options: ['hook', 'use', 'with', 'my'], answer: 1, explain: '"use" prefix.' },
      { q: 'Custom hook shares?', options: ['State', 'Logic', 'Both', 'DOM'], answer: 1, explain: 'Logic (not state).' },
    ],
    exercises: {
      easy: ['useToggle hook banao.'],
      medium: ['useLocalStorage hook banao.'],
      advanced: ['useDebounce + useFetch combine karke search banao.'],
    },
    summary: [
      'Custom hook = reusable stateful logic (use prefix).',
      'Logic share, state independent.',
      'Modern alternative to HOC/render props.',
      'Hooks rules apply.',
    ],
    cheatsheet: [
      { h: 'Custom hook', code: `function useX(){\n  const [s,setS]=useState()\n  return [s,setS]\n}` },
    ],
    projects: ['useFetch', 'useDebounce', 'useLocalStorage', 'useMediaQuery', 'useOnClickOutside'],
    advanced:
      'Hook composition (hooks calling hooks). useSyncExternalStore (external stores, libraries). Custom hooks for data (React Query wraps). Testing hooks (@testing-library/react renderHook). Hook libraries (usehooks-ts, react-use).',
    quiz: [
      { q: 'Logic reuse modern way?', options: ['HOC', 'Custom hooks', 'Render props', 'Mixins'], answer: 1, explain: 'Custom hooks.' },
      { q: 'Hooks call where?', options: ['Anywhere', 'Top-level', 'Conditions', 'Loops'], answer: 1, explain: 'Top-level only.' },
    ],
    related: ['useeffect', 'hoc', 'render-props'],
  },

  'advanced-hooks': {
    overview:
      'React ke advanced/specialized hooks: **useLayoutEffect** (DOM measure, paint se pehle), **useImperativeHandle** (custom ref API), **useId** (unique IDs SSR-safe), **useTransition** (non-urgent updates), **useDeferredValue** (defer expensive value), **useSyncExternalStore** (external stores). Concurrent features yahin hain.',
    why:
      'Concurrent React (useTransition, useDeferredValue) modern performance. useLayoutEffect, useId edge cases. Senior interview mein yeh hooks aate.',
    concept: [
      { h: 'useLayoutEffect', p: 'useEffect jaisа par **paint se pehle** (synchronous) chalता. DOM measure/mutate jisse visual flicker na ho.', code: `useLayoutEffect(() => {\n  const { height } = ref.current.getBoundingClientRect()\n  setHeight(height) // before paint, no flicker\n}, [])` },
      { h: 'useTransition & useDeferredValue', p: 'Non-urgent updates ko low-priority mark karते — urgent (typing) smooth rehता. useTransition (state update wrap), useDeferredValue (value defer).', code: `const [isPending, startTransition] = useTransition()\nstartTransition(() => setList(bigFilteredList))\n// ya\nconst deferredQuery = useDeferredValue(query)` },
      { h: 'useImperativeHandle', p: 'forwardRef ke saath child ka custom ref API expose — parent ko specific methods.', code: `useImperativeHandle(ref, () => ({\n  focus: () => inputRef.current.focus()\n}))` },
      { h: 'useId', p: 'Unique stable IDs (SSR + client match) — accessibility (label htmlFor) ke liye.', code: `const id = useId()\n<label htmlFor={id} /><input id={id} />` },
    ],
    analogy:
      'useTransition ek **"yeh kaam zaroori nahi, jab time mile karna"** label hai — typing (urgent) ko block nahi karता. useLayoutEffect ek **"screen dikhane se pehle yeh fix kar do"** (measure + adjust, no flicker). useId ek **unique ticket number generator** (SSR/client same). 🎫',
    syntax: { code: `useLayoutEffect(fn, deps)      // before paint\nconst [pending, start] = useTransition()\nconst deferred = useDeferredValue(value)\nuseImperativeHandle(ref, () => ({...}))\nconst id = useId()`, note: 'useTransition/useDeferredValue React 18 concurrent features.' },
    examples: [
      { level: 'Advanced', title: 'useTransition (smooth typing)', code: `function Search() {\n  const [query, setQuery] = useState('')\n  const [results, setResults] = useState([])\n  const [isPending, startTransition] = useTransition()\n  const onChange = (e) => {\n    setQuery(e.target.value)        // urgent\n    startTransition(() => {\n      setResults(filterBig(e.target.value)) // non-urgent\n    })\n  }\n  return <><input value={query} onChange={onChange} />{isPending && <Spinner />}</>\n}`, explain: 'Typing instant (urgent); heavy filter deferred — UI smooth.' },
    ],
    memory:
      'useLayoutEffect synchronously paint se pehle (blocking — heavy work jank). useTransition updates ko low-priority lane par schedule (interruptible). useDeferredValue purani value rakhता jab tak nayी non-urgently ready ho. useId tree position se stable id.',
    notes: {
      concept: 'useLayoutEffect (pre-paint), useTransition/useDeferredValue (concurrent), useId (SSR ids).',
      tip: 'Default useEffect; useLayoutEffect sirf measure/flicker ke liye.',
      warning: 'useLayoutEffect blocking — heavy work jank deता.',
      error: 'Random/index se id banाना SSR mein mismatch — useId use karो.',
    },
    compare: {
      headers: ['Hook', 'Use', 'React'],
      rows: [
        ['useLayoutEffect', 'DOM measure pre-paint', 'Always'],
        ['useTransition', 'Non-urgent update', '18+'],
        ['useDeferredValue', 'Defer expensive value', '18+'],
        ['useImperativeHandle', 'Custom ref API', 'Always'],
        ['useId', 'SSR-safe unique id', '18+'],
      ],
    },
    mistakes: [
      { bad: 'Heavy work in useLayoutEffect.', fix: 'useEffect (non-blocking) jab possible.' },
      { bad: 'useId ko key ke liye use.', fix: 'useId IDs ke liye, keys data se.' },
    ],
    best: ['Default useEffect; useLayoutEffect for measure/flicker.', 'Heavy non-urgent updates → useTransition.', 'Accessibility IDs → useId.', 'Custom ref API → forwardRef + useImperativeHandle.'],
    performance:
      'useTransition/useDeferredValue concurrent rendering se UI responsive rakhte (heavy updates interruptible). useLayoutEffect blocking — minimal kaam. useDeferredValue debounce-jaisा behaviour bina timers ke (React priority se).',
    interview: {
      advanced: [
        { q: 'useEffect vs useLayoutEffect?', a: 'useEffect paint ke baad (async, non-blocking). useLayoutEffect paint se pehle (synchronous) — DOM measure/mutate jisse flicker na ho. useLayoutEffect blocking, kam use.' },
        { q: 'useTransition kya karта?', a: 'State update ko non-urgent (low-priority) mark karता — urgent updates (typing) block nahi hote. isPending se loading state. Concurrent feature.' },
        { q: 'useDeferredValue vs debounce?', a: 'useDeferredValue React ki priority se purani value rakhता jab tak nayी ready, interruptible (no fixed timer). Debounce fixed delay. useDeferredValue concurrent-aware.' },
        { q: 'useId kyun?', a: 'SSR + client matching unique IDs (accessibility — label/input). Random/index se hydration mismatch hota; useId stable tree-based id deता.' },
      ],
    },
    mcqs: [
      { q: 'Before paint effect?', options: ['useEffect', 'useLayoutEffect', 'useMemo', 'useId'], answer: 1, explain: 'useLayoutEffect.' },
      { q: 'Non-urgent update?', options: ['useState', 'useTransition', 'useRef', 'useId'], answer: 1, explain: 'useTransition.' },
    ],
    exercises: {
      easy: ['useId se label+input link karो.'],
      medium: ['useLayoutEffect se element height measure.'],
      advanced: ['useTransition se heavy filtered list smooth banao.'],
    },
    summary: [
      'useLayoutEffect: DOM measure pre-paint.',
      'useTransition/useDeferredValue: concurrent non-urgent.',
      'useImperativeHandle: custom ref API.',
      'useId: SSR-safe unique IDs.',
    ],
    cheatsheet: [
      { h: 'Advanced hooks', code: `useLayoutEffect(fn,[])\nconst [p,start]=useTransition()\nconst d=useDeferredValue(v)\nconst id=useId()` },
    ],
    projects: ['Tooltip positioning (useLayoutEffect)', 'Search with transition', 'Custom input (imperativeHandle)', 'Accessible form (useId)'],
    advanced:
      'useSyncExternalStore (external store subscriptions, library authors). useInsertionEffect (CSS-in-JS). useOptimistic (React 19). useActionState/useFormStatus (forms). Concurrent rendering + transitions = interruptible UI.',
    quiz: [
      { q: 'SSR-safe id?', options: ['Math.random', 'useId', 'index', 'Date.now'], answer: 1, explain: 'useId.' },
      { q: 'useDeferredValue?', options: ['Urgent', 'Defers value', 'Blocks', 'Timer'], answer: 1, explain: 'Defers expensive value.' },
    ],
    related: ['useeffect-deep', 'concurrent', 'senior-apis'],
  },
}
