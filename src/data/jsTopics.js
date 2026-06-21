// JavaScript Course — topic metadata, colour-coded groups, difficulty.

export const jsGroups = [
  { id: 'fundamentals', label: 'JS Fundamentals', color: '#F59E0B' },
  { id: 'variables', label: 'Variables & Data Types', color: '#6366F1' },
  { id: 'operators', label: 'Operators', color: '#8B5CF6' },
  { id: 'control', label: 'Control Flow', color: '#22C55E' },
  { id: 'functions', label: 'Functions', color: '#EC4899' },
  { id: 'scope', label: 'Scope & Execution', color: '#06B6D4' },
  { id: 'objects', label: 'Objects, Arrays & Strings', color: '#A855F7' },
  { id: 'dom', label: 'DOM & Events', color: '#14B8A6' },
  { id: 'async', label: 'Asynchronous JavaScript', color: '#F97316' },
  { id: 'oop', label: 'OOP & Prototypes', color: '#EF4444' },
  { id: 'advanced', label: 'Advanced JavaScript', color: '#3B82F6' },
  { id: 'pro', label: 'Performance & Internals', color: '#10B981' },
  { id: 'interview', label: 'Interview & Projects', color: '#EAB308' },
]

// difficulty: 1 Beginner · 2 Intermediate · 3 Advanced
export const jsTopics = [
  // ── Fundamentals ──
  { slug: 'what-is-js', title: 'What is JavaScript', hi: 'JS kya hai? History & ECMAScript', group: 'fundamentals', icon: '🟨', minutes: 7, level: 1 },
  { slug: 'how-js-works', title: 'How JavaScript Works', hi: 'Engine, V8, JIT, Interpreted vs Compiled', group: 'fundamentals', icon: '⚙️', minutes: 9, level: 2 },
  { slug: 'single-threaded', title: 'Single Threaded & Async', hi: 'Sync vs Async, single thread', group: 'fundamentals', icon: '🧵', minutes: 7, level: 2 },

  // ── Variables & Data Types ──
  { slug: 'variables', title: 'var, let & const', hi: 'Variables declare karna', group: 'variables', icon: '📦', minutes: 8, level: 1 },
  { slug: 'data-types', title: 'Data Types', hi: 'Primitive & Non-Primitive', group: 'variables', icon: '🔢', minutes: 8, level: 1 },
  { slug: 'type-conversion', title: 'Type Conversion & Coercion', hi: 'Dynamic typing, conversion', group: 'variables', icon: '🔄', minutes: 8, level: 2 },

  // ── Operators ──
  { slug: 'operators', title: 'Operators', hi: 'Arithmetic, comparison, logical', group: 'operators', icon: '➗', minutes: 8, level: 1 },
  { slug: 'modern-operators', title: 'Modern Operators', hi: '??, ?., ternary', group: 'operators', icon: '✨', minutes: 6, level: 2 },

  // ── Control Flow ──
  { slug: 'conditionals', title: 'Conditionals', hi: 'if-else, switch, ternary', group: 'control', icon: '🔀', minutes: 7, level: 1 },
  { slug: 'loops', title: 'Loops', hi: 'for, while, do-while, break', group: 'control', icon: '🔁', minutes: 8, level: 1 },

  // ── Functions ──
  { slug: 'functions-basics', title: 'Functions Basics', hi: 'Declaration, expression, arrow, IIFE', group: 'functions', icon: '🔧', minutes: 10, level: 1 },
  { slug: 'callbacks-hof', title: 'Callbacks & Higher Order', hi: 'Callback, HOF, pure functions', group: 'functions', icon: '🎯', minutes: 9, level: 2 },
  { slug: 'currying', title: 'Currying & Composition', hi: 'Currying, composition', group: 'functions', icon: '🍛', minutes: 7, level: 3 },
  { slug: 'debounce-throttle', title: 'Debounce & Throttle', hi: 'Performance patterns', group: 'functions', icon: '⏱️', minutes: 8, level: 3 },

  // ── Scope & Execution ──
  { slug: 'scope', title: 'Scope & Scope Chain', hi: 'Global, function, block, lexical', group: 'scope', icon: '🔭', minutes: 8, level: 2 },
  { slug: 'execution-context', title: 'Execution Context', hi: 'Phases + Call Stack', group: 'scope', icon: '🏗️', minutes: 9, level: 3 },
  { slug: 'hoisting', title: 'Hoisting', hi: 'Variable & function hoisting, TDZ', group: 'scope', icon: '🪝', minutes: 8, level: 2 },
  { slug: 'closures', title: 'Closures', hi: 'JS ka sabse important topic', group: 'scope', icon: '🔒', minutes: 11, level: 3 },

  // ── Objects, Arrays & Strings ──
  { slug: 'this-keyword', title: 'this Keyword', hi: 'this, call, apply, bind', group: 'objects', icon: '👈', minutes: 10, level: 3 },
  { slug: 'objects', title: 'Objects', hi: 'Creation, destructuring, spread/rest', group: 'objects', icon: '🧱', minutes: 9, level: 1 },
  { slug: 'copy', title: 'Deep vs Shallow Copy', hi: 'Copy, freeze, seal', group: 'objects', icon: '📑', minutes: 7, level: 2 },
  { slug: 'arrays', title: 'Arrays', hi: 'Basics + push/pop/splice/slice', group: 'objects', icon: '📚', minutes: 8, level: 1 },
  { slug: 'array-methods', title: 'Array HOF Methods', hi: 'map, filter, reduce, find', group: 'objects', icon: '🛠️', minutes: 11, level: 2 },
  { slug: 'strings', title: 'Strings', hi: 'Methods, template literals', group: 'objects', icon: '🔤', minutes: 7, level: 1 },

  // ── DOM & Events ──
  { slug: 'dom', title: 'DOM Manipulation', hi: 'Select, create, modify elements', group: 'dom', icon: '🌳', minutes: 10, level: 2 },
  { slug: 'events', title: 'Events', hi: 'Bubbling, delegation, capturing', group: 'dom', icon: '🖱️', minutes: 9, level: 2 },

  // ── Asynchronous JS ──
  { slug: 'async-intro', title: 'Async Basics & Web APIs', hi: 'Callback queue, async kaise', group: 'async', icon: '⏳', minutes: 8, level: 2 },
  { slug: 'event-loop', title: 'Event Loop', hi: 'Microtask vs Macrotask', group: 'async', icon: '🔄', minutes: 11, level: 3 },
  { slug: 'promises', title: 'Promises', hi: 'Chaining, Promise methods', group: 'async', icon: '🤝', minutes: 11, level: 2 },
  { slug: 'async-await', title: 'async / await', hi: 'Modern async syntax', group: 'async', icon: '⌛', minutes: 9, level: 2 },
  { slug: 'error-handling', title: 'Error Handling', hi: 'try-catch, throw, custom errors', group: 'async', icon: '🚨', minutes: 7, level: 2 },

  // ── OOP & Prototypes ──
  { slug: 'prototype', title: 'Prototype & Inheritance', hi: 'Prototype chain, constructor fn', group: 'oop', icon: '🧬', minutes: 11, level: 3 },
  { slug: 'classes', title: 'Classes', hi: 'class, extends, super', group: 'oop', icon: '🏛️', minutes: 9, level: 2 },
  { slug: 'oop-principles', title: 'OOP Principles', hi: '4 pillars of OOP', group: 'oop', icon: '🏯', minutes: 9, level: 3 },

  // ── Advanced JS ──
  { slug: 'es6-features', title: 'ES6+ Features', hi: 'Destructuring, spread, defaults', group: 'advanced', icon: '🚀', minutes: 9, level: 2 },
  { slug: 'modules', title: 'Modules', hi: 'import / export', group: 'advanced', icon: '📦', minutes: 6, level: 2 },
  { slug: 'functional-programming', title: 'Functional Programming', hi: 'Immutability, composition', group: 'advanced', icon: '🧮', minutes: 8, level: 3 },
  { slug: 'generators-iterators', title: 'Generators & Iterators', hi: 'function*, yield, iterators', group: 'advanced', icon: '🔂', minutes: 8, level: 3 },
  { slug: 'symbols', title: 'Symbols', hi: 'Unique keys', group: 'advanced', icon: '🔑', minutes: 6, level: 3 },
  { slug: 'map-set', title: 'Map, Set, WeakMap, WeakSet', hi: 'Modern collections', group: 'advanced', icon: '🗺️', minutes: 8, level: 2 },
  { slug: 'proxy-reflect', title: 'Proxy & Reflect', hi: 'Meta-programming', group: 'advanced', icon: '🪞', minutes: 7, level: 3 },

  // ── Performance & Internals ──
  { slug: 'memory-management', title: 'Memory & Garbage Collection', hi: 'Heap, stack, memory leaks', group: 'pro', icon: '🧠', minutes: 9, level: 3 },
  { slug: 'performance', title: 'Performance Optimization', hi: 'Lazy load, tree shaking', group: 'pro', icon: '⚡', minutes: 8, level: 3 },
  { slug: 'browser-internals', title: 'Browser Rendering', hi: 'Rendering pipeline', group: 'pro', icon: '🖥️', minutes: 8, level: 3 },

  // ── Interview & Projects ──
  { slug: 'interview-questions', title: 'Interview Questions', hi: 'Output-based + tricky', group: 'interview', icon: '🎤', minutes: 12, level: 3 },
  { slug: 'machine-coding', title: 'Machine Coding Projects', hi: '14 projects ka roadmap', group: 'interview', icon: '💻', minutes: 10, level: 2 },
]

export const jsTopicBySlug = Object.fromEntries(jsTopics.map((t) => [t.slug, t]))
export const jsGroupById = Object.fromEntries(jsGroups.map((g) => [g.id, g]))
export const jsGroupedTopics = jsGroups.map((g) => ({ ...g, items: jsTopics.filter((t) => t.group === g.id) }))

export const JS_LEVELS = {
  1: { label: 'Beginner', color: '#22C55E', bg: 'rgba(34,197,94,0.15)' },
  2: { label: 'Intermediate', color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' },
  3: { label: 'Advanced', color: '#EF4444', bg: 'rgba(239,68,68,0.15)' },
}
