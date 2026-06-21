// React Course — topic metadata, colour-coded groups, difficulty.

export const reactGroups = [
  { id: 'fundamentals', label: 'React Fundamentals', color: '#06B6D4' },
  { id: 'jsx', label: 'JSX', color: '#0EA5E9' },
  { id: 'components', label: 'Components & Props', color: '#6366F1' },
  { id: 'state', label: 'State & Events', color: '#8B5CF6' },
  { id: 'forms', label: 'Forms', color: '#A855F7' },
  { id: 'hooks', label: 'Hooks', color: '#EC4899' },
  { id: 'rendering', label: 'Rendering & Reconciliation', color: '#F43F5E' },
  { id: 'internals', label: 'React Internals (Fiber)', color: '#EF4444' },
  { id: 'context', label: 'Context & Patterns', color: '#F59E0B' },
  { id: 'performance', label: 'Performance', color: '#22C55E' },
  { id: 'routing', label: 'Routing & Data', color: '#14B8A6' },
  { id: 'statemgmt', label: 'State Management', color: '#10B981' },
  { id: 'ecosystem', label: 'TypeScript · Architecture · Testing', color: '#3B82F6' },
  { id: 'senior', label: 'Senior React & SSR', color: '#9333EA' },
  { id: 'interview', label: 'Interview & Projects', color: '#EAB308' },
]

// difficulty: 1 Beginner · 2 Intermediate · 3 Advanced
export const reactTopics = [
  // ── Fundamentals ──
  { slug: 'what-is-react', title: 'What is React', hi: 'React kya & kyun bana', group: 'fundamentals', icon: '⚛️', minutes: 8, level: 1 },
  { slug: 'spa-vs-mpa', title: 'SPA vs MPA & Declarative', hi: 'Single page apps, declarative', group: 'fundamentals', icon: '📄', minutes: 7, level: 1 },
  { slug: 'virtual-dom', title: 'Virtual DOM vs Real DOM', hi: 'VDOM ka magic', group: 'fundamentals', icon: '🌐', minutes: 9, level: 2 },
  { slug: 'rendering-process', title: 'Rendering Process & Workflow', hi: 'React kaise render karta', group: 'fundamentals', icon: '🔄', minutes: 8, level: 2 },
  { slug: 'component-architecture', title: 'Component Architecture', hi: 'Component-based thinking', group: 'fundamentals', icon: '🧩', minutes: 7, level: 1 },

  // ── JSX ──
  { slug: 'jsx', title: 'What is JSX & Babel', hi: 'JSX → createElement', group: 'jsx', icon: '📝', minutes: 8, level: 1 },
  { slug: 'jsx-rules', title: 'JSX Rules & Expressions', hi: 'JSX likhne ke niyam', group: 'jsx', icon: '📐', minutes: 7, level: 1 },
  { slug: 'fragments', title: 'Fragments', hi: 'Extra div se bacho', group: 'jsx', icon: '🧵', minutes: 4, level: 1 },

  // ── Components & Props ──
  { slug: 'components-basics', title: 'Functional Components', hi: 'Components & composition', group: 'components', icon: '🔧', minutes: 8, level: 1 },
  { slug: 'props', title: 'Props & Children', hi: 'Data pass karna', group: 'components', icon: '📦', minutes: 9, level: 1 },
  { slug: 'props-drilling', title: 'Props Drilling', hi: 'Deep props ka problem', group: 'components', icon: '🕳️', minutes: 6, level: 2 },

  // ── State & Events ──
  { slug: 'state-usestate', title: 'State & useState', hi: 'Component ki memory', group: 'state', icon: '🎚️', minutes: 10, level: 1 },
  { slug: 'state-batching', title: 'State Batching & Updates', hi: 'Functional updates, batching', group: 'state', icon: '📊', minutes: 9, level: 2 },
  { slug: 'derived-lifting', title: 'Derived State & Lifting Up', hi: 'State share karna', group: 'state', icon: '⬆️', minutes: 7, level: 2 },
  { slug: 'events', title: 'Synthetic Events', hi: 'Event handling, propagation', group: 'state', icon: '🖱️', minutes: 8, level: 2 },

  // ── Forms ──
  { slug: 'controlled-uncontrolled', title: 'Controlled vs Uncontrolled', hi: 'Forms + useRef', group: 'forms', icon: '📋', minutes: 9, level: 2 },
  { slug: 'form-validation', title: 'Form Validation (Formik/Yup)', hi: 'Validation, dynamic forms', group: 'forms', icon: '✅', minutes: 8, level: 2 },

  // ── Lists & Conditional (rendering basics) ──
  { slug: 'conditional-rendering', title: 'Conditional Rendering', hi: 'if, ternary, &&, switch', group: 'components', icon: '🔀', minutes: 7, level: 1 },
  { slug: 'lists-keys', title: 'Lists & Keys', hi: 'map, keys, index problem', group: 'components', icon: '🗝️', minutes: 9, level: 2 },

  // ── Hooks ──
  { slug: 'useeffect', title: 'useEffect', hi: 'Side-effects, cleanup, deps', group: 'hooks', icon: '🪝', minutes: 11, level: 2 },
  { slug: 'useeffect-deep', title: 'useEffect Deep Dive', hi: 'Mount/update, infinite loops, StrictMode', group: 'hooks', icon: '🔬', minutes: 10, level: 3 },
  { slug: 'useref', title: 'useRef', hi: 'DOM + mutable values', group: 'hooks', icon: '📌', minutes: 7, level: 2 },
  { slug: 'usememo-usecallback', title: 'useMemo & useCallback', hi: 'Memoization hooks', group: 'hooks', icon: '🧠', minutes: 10, level: 3 },
  { slug: 'usereducer', title: 'useReducer', hi: 'Complex state logic', group: 'hooks', icon: '🎛️', minutes: 9, level: 2 },
  { slug: 'custom-hooks', title: 'Custom Hooks', hi: 'Apne hooks banao', group: 'hooks', icon: '🛠️', minutes: 9, level: 2 },
  { slug: 'advanced-hooks', title: 'Advanced Hooks', hi: 'useLayoutEffect, useId, useTransition', group: 'hooks', icon: '🚀', minutes: 11, level: 3 },

  // ── Rendering & Reconciliation ──
  { slug: 'render-commit', title: 'Render & Commit Phases', hi: 'Render vs commit', group: 'rendering', icon: '🎬', minutes: 9, level: 3 },
  { slug: 're-rendering', title: 'Re-rendering Explained', hi: 'Parent/child re-render', group: 'rendering', icon: '♻️', minutes: 9, level: 2 },
  { slug: 'reconciliation', title: 'Reconciliation & Diffing', hi: 'Diff algorithm', group: 'rendering', icon: '🔍', minutes: 10, level: 3 },

  // ── React Internals (Fiber) ──
  { slug: 'fiber', title: 'Fiber Architecture', hi: 'Fiber tree, WIP tree', group: 'internals', icon: '🧬', minutes: 12, level: 3 },
  { slug: 'concurrent', title: 'Concurrent Rendering', hi: 'Scheduler, lanes, priorities', group: 'internals', icon: '⚙️', minutes: 12, level: 3 },

  // ── Context & Patterns ──
  { slug: 'context-api', title: 'Context API', hi: 'Provider, useContext', group: 'context', icon: '🌳', minutes: 10, level: 2 },
  { slug: 'hoc', title: 'Higher Order Components', hi: 'HOC pattern', group: 'context', icon: '🎁', minutes: 8, level: 3 },
  { slug: 'render-props', title: 'Render Props', hi: 'Function as children', group: 'context', icon: '🎭', minutes: 7, level: 3 },
  { slug: 'compound-components', title: 'Compound Components', hi: 'Flexible component APIs', group: 'context', icon: '🧱', minutes: 8, level: 3 },

  // ── Performance ──
  { slug: 'memoization', title: 'React.memo & Memoization', hi: 'Kab use, kab nahi', group: 'performance', icon: '⚡', minutes: 10, level: 3 },
  { slug: 'lazy-suspense', title: 'Lazy Loading & Suspense', hi: 'Code splitting', group: 'performance', icon: '💤', minutes: 9, level: 2 },
  { slug: 'virtualization', title: 'Virtualization (Windowing)', hi: 'Bade lists fast', group: 'performance', icon: '🪟', minutes: 8, level: 3 },

  // ── Routing & Data ──
  { slug: 'react-router', title: 'React Router', hi: 'Routes, params, navigate', group: 'routing', icon: '🛣️', minutes: 10, level: 2 },
  { slug: 'react-query', title: 'React Query (TanStack)', hi: 'Caching, mutations', group: 'routing', icon: '🔁', minutes: 11, level: 3 },
  { slug: 'api-handling', title: 'API Handling', hi: 'fetch, axios, loading/error', group: 'routing', icon: '🌐', minutes: 9, level: 2 },

  // ── State Management ──
  { slug: 'state-management', title: 'State Management Compared', hi: 'Redux, Zustand, Recoil', group: 'statemgmt', icon: '🗂️', minutes: 11, level: 3 },

  // ── Ecosystem ──
  { slug: 'react-typescript', title: 'React + TypeScript', hi: 'Props/state typing', group: 'ecosystem', icon: '🔷', minutes: 9, level: 2 },
  { slug: 'architecture', title: 'React Architecture', hi: 'Folder structure, patterns', group: 'ecosystem', icon: '🏛️', minutes: 8, level: 2 },
  { slug: 'testing', title: 'Testing (Jest + RTL)', hi: 'Unit & integration', group: 'ecosystem', icon: '🧪', minutes: 9, level: 2 },

  // ── Senior React & SSR ──
  { slug: 'fiber-deep', title: 'Fiber Deep Dive', hi: 'Fiber nodes, alternate tree', group: 'senior', icon: '🔬', minutes: 12, level: 3 },
  { slug: 'scheduler-lanes', title: 'Scheduler & Lane Model', hi: 'Priorities, interruptible', group: 'senior', icon: '⏱️', minutes: 11, level: 3 },
  { slug: 'server-components', title: 'Server Components & Streaming', hi: 'RSC, hydration', group: 'senior', icon: '🖥️', minutes: 11, level: 3 },
  { slug: 'hydration', title: 'Hydration & Selective Hydration', hi: 'SSR ko interactive banao', group: 'senior', icon: '💧', minutes: 9, level: 3 },
  { slug: 'senior-apis', title: 'Error Boundaries, Portals & More', hi: 'StrictMode, Profiler, Transitions', group: 'senior', icon: '🛡️', minutes: 10, level: 3 },
  { slug: 'browser-react', title: 'Browser Rendering + React', hi: 'Event loop + React interaction', group: 'senior', icon: '🔃', minutes: 9, level: 3 },

  // ── Interview & Projects ──
  { slug: 'interview-questions', title: 'Interview Questions', hi: 'Mid → Senior prep', group: 'interview', icon: '🎤', minutes: 13, level: 3 },
  { slug: 'machine-coding', title: 'Machine Coding Projects', hi: '15 projects ka roadmap', group: 'interview', icon: '💻', minutes: 11, level: 2 },
  { slug: 'roadmap', title: 'React Developer Roadmap', hi: 'Beginner → Senior', group: 'interview', icon: '🗺️', minutes: 7, level: 1 },
]

export const reactTopicBySlug = Object.fromEntries(reactTopics.map((t) => [t.slug, t]))
export const reactGroupById = Object.fromEntries(reactGroups.map((g) => [g.id, g]))
export const reactGroupedTopics = reactGroups.map((g) => ({ ...g, items: reactTopics.filter((t) => t.group === g.id) }))

export const REACT_LEVELS = {
  1: { label: 'Beginner', color: '#22C55E', bg: 'rgba(34,197,94,0.15)' },
  2: { label: 'Intermediate', color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' },
  3: { label: 'Advanced', color: '#EF4444', bg: 'rgba(239,68,68,0.15)' },
}
