// Browser Internals Course — topic metadata, colour-coded groups, difficulty.

export const browserGroups = [
  { id: 'fundamentals', label: 'Browser Fundamentals', color: '#F97316' },
  { id: 'navigation', label: 'Navigation & Network', color: '#FB923C' },
  { id: 'crp', label: 'Critical Rendering Path', color: '#EF4444' },
  { id: 'jsengine', label: 'JavaScript Engine', color: '#8B5CF6' },
  { id: 'eventloop', label: 'Event Loop & Async', color: '#06B6D4' },
  { id: 'storage', label: 'Storage & Caching', color: '#10B981' },
  { id: 'workers', label: 'Web Workers', color: '#14B8A6' },
  { id: 'security', label: 'Browser Security', color: '#F43F5E' },
  { id: 'performance', label: 'Performance & Metrics', color: '#22C55E' },
  { id: 'apis', label: 'Browser APIs', color: '#3B82F6' },
  { id: 'senior', label: 'Senior-Level Internals', color: '#9333EA' },
  { id: 'interview', label: 'Interview Preparation', color: '#EAB308' },
]

// difficulty: 1 Beginner · 2 Intermediate · 3 Advanced
export const browserTopics = [
  // ── Browser Fundamentals ──
  { slug: 'what-is-browser', title: 'What is a Browser?', hi: 'Browser kya hai & types', group: 'fundamentals', icon: '🌐', minutes: 8, level: 1 },
  { slug: 'browser-architecture', title: 'Browser Architecture & Components', hi: 'Browser ke andar kya hai', group: 'fundamentals', icon: '🏛️', minutes: 10, level: 1 },
  { slug: 'multi-process', title: 'Multi-Process Architecture', hi: 'Multiple processes kyun', group: 'fundamentals', icon: '🧩', minutes: 9, level: 2 },
  { slug: 'browser-processes', title: 'Browser Processes Explained', hi: 'Browser/Renderer/GPU/Network', group: 'fundamentals', icon: '⚙️', minutes: 11, level: 2 },
  { slug: 'rendering-engines', title: 'Rendering Engines (Blink/WebKit/Gecko)', hi: 'Engines ka difference', group: 'fundamentals', icon: '🔧', minutes: 8, level: 2 },

  // ── Navigation & Network ──
  { slug: 'navigation-flow', title: 'What Happens When You Enter a URL', hi: 'URL se page tak ka safar', group: 'navigation', icon: '🚀', minutes: 12, level: 2 },
  { slug: 'dns-lookup', title: 'DNS Lookup', hi: 'Domain → IP resolution', group: 'navigation', icon: '📖', minutes: 9, level: 2 },
  { slug: 'tcp-udp', title: 'TCP & UDP', hi: 'Connection protocols', group: 'navigation', icon: '🤝', minutes: 9, level: 2 },
  { slug: 'tls-ssl', title: 'SSL/TLS Handshake & HTTPS', hi: 'Secure connection kaise', group: 'navigation', icon: '🔒', minutes: 10, level: 2 },
  { slug: 'http-versions', title: 'HTTP/1.1 vs HTTP/2 vs HTTP/3', hi: 'HTTP ka evolution', group: 'navigation', icon: '📡', minutes: 11, level: 3 },

  // ── Critical Rendering Path ──
  { slug: 'critical-rendering-path', title: 'Critical Rendering Path Overview', hi: 'Pixels tak ka pipeline', group: 'crp', icon: '🎨', minutes: 11, level: 2 },
  { slug: 'html-parsing-dom', title: 'HTML Parsing & DOM Tree', hi: 'DOM kaise banta hai', group: 'crp', icon: '🌲', minutes: 11, level: 2 },
  { slug: 'cssom', title: 'CSS Parsing & CSSOM', hi: 'CSSOM tree internals', group: 'crp', icon: '🎭', minutes: 9, level: 2 },
  { slug: 'render-tree', title: 'Render Tree', hi: 'DOM + CSSOM = Render Tree', group: 'crp', icon: '🌳', minutes: 8, level: 2 },
  { slug: 'layout-reflow', title: 'Layout & Reflow', hi: 'Geometry calculation', group: 'crp', icon: '📐', minutes: 10, level: 3 },
  { slug: 'paint-repaint', title: 'Paint & Repaint', hi: 'Pixels draw karna', group: 'crp', icon: '🖌️', minutes: 9, level: 3 },
  { slug: 'compositing', title: 'Compositing & GPU Layers', hi: 'Layers + GPU acceleration', group: 'crp', icon: '🧅', minutes: 10, level: 3 },

  // ── JavaScript Engine ──
  { slug: 'v8-architecture', title: 'V8 Engine Architecture', hi: 'V8 ke andar kya hai', group: 'jsengine', icon: '🚂', minutes: 11, level: 3 },
  { slug: 'parsing-ast', title: 'Parsing & AST', hi: 'Code → AST', group: 'jsengine', icon: '🌿', minutes: 9, level: 3 },
  { slug: 'ignition-turbofan', title: 'Ignition, TurboFan & JIT', hi: 'Interpreter + compiler', group: 'jsengine', icon: '⚡', minutes: 11, level: 3 },
  { slug: 'memory-management', title: 'Memory Management & GC', hi: 'Stack/Heap, Mark & Sweep', group: 'jsengine', icon: '🧠', minutes: 12, level: 3 },
  { slug: 'execution-context', title: 'Execution Context & Call Stack', hi: 'Code kaise execute hota', group: 'jsengine', icon: '📚', minutes: 10, level: 2 },

  // ── Event Loop & Async ──
  { slug: 'event-loop', title: 'Event Loop', hi: 'Call stack, queue, loop', group: 'eventloop', icon: '🔄', minutes: 12, level: 3 },
  { slug: 'microtask-macrotask', title: 'Microtask vs Macrotask Queue', hi: 'Promise vs setTimeout order', group: 'eventloop', icon: '⏳', minutes: 10, level: 3 },
  { slug: 'async-internals', title: 'Async JS Internals', hi: 'Promise/async-await/fetch', group: 'eventloop', icon: '🔮', minutes: 11, level: 3 },

  // ── Storage & Caching ──
  { slug: 'browser-storage', title: 'Browser Storage', hi: 'Cookies/Local/Session/IndexedDB', group: 'storage', icon: '🗄️', minutes: 11, level: 2 },
  { slug: 'browser-caching', title: 'Browser Caching', hi: 'Cache-Control, ETag, SW cache', group: 'storage', icon: '💾', minutes: 10, level: 3 },

  // ── Web Workers ──
  { slug: 'web-workers', title: 'Web Workers & Service Workers', hi: 'Background threads', group: 'workers', icon: '👷', minutes: 11, level: 3 },

  // ── Browser Security ──
  { slug: 'same-origin-cors', title: 'Same-Origin Policy & CORS', hi: 'Origin rules + CORS', group: 'security', icon: '🛡️', minutes: 11, level: 2 },
  { slug: 'xss-csrf-csp', title: 'XSS, CSRF & CSP', hi: 'Web attacks & defense', group: 'security', icon: '🦠', minutes: 11, level: 3 },

  // ── Performance & Metrics ──
  { slug: 'rendering-performance', title: 'Rendering Performance', hi: 'Reflow/Repaint optimize', group: 'performance', icon: '🏎️', minutes: 11, level: 3 },
  { slug: 'debounce-throttle', title: 'Lazy Loading, Debounce & Throttle', hi: 'Kaam kam karo, smart karo', group: 'performance', icon: '🪶', minutes: 9, level: 2 },
  { slug: 'web-vitals', title: 'Core Web Vitals', hi: 'FCP/LCP/CLS/INP/TTFB', group: 'performance', icon: '📊', minutes: 10, level: 2 },
  { slug: 'devtools', title: 'Chrome DevTools', hi: 'Debugging ke tools', group: 'performance', icon: '🛠️', minutes: 9, level: 1 },

  // ── Browser APIs ──
  { slug: 'browser-apis', title: 'Essential Browser APIs', hi: 'Fetch/History/Geolocation/Clipboard', group: 'apis', icon: '🔌', minutes: 10, level: 2 },
  { slug: 'observers', title: 'Observer APIs', hi: 'Intersection/Mutation/Resize', group: 'apis', icon: '👁️', minutes: 9, level: 2 },

  // ── Senior-Level Internals ──
  { slug: 'blink-renderingng', title: 'Blink Architecture & RenderingNG', hi: 'Modern Chromium rendering', group: 'senior', icon: '🧬', minutes: 12, level: 3 },
  { slug: 'site-isolation', title: 'Site & Process Isolation', hi: 'Security via processes', group: 'senior', icon: '🏝️', minutes: 10, level: 3 },
  { slug: 'frame-scheduler', title: 'Frame Lifecycle & Scheduler', hi: '60fps ka raaz', group: 'senior', icon: '🎞️', minutes: 11, level: 3 },
  { slug: 'compositor-raster', title: 'Compositor & Raster Threads', hi: 'Smooth scroll internals', group: 'senior', icon: '🧵', minutes: 11, level: 3 },

  // ── Interview Preparation ──
  { slug: 'interview-questions', title: 'Interview Questions & Prep', hi: 'Product-based companies', group: 'interview', icon: '🎤', minutes: 14, level: 3 },
]

export const browserTopicBySlug = Object.fromEntries(browserTopics.map((t) => [t.slug, t]))
export const browserGroupById = Object.fromEntries(browserGroups.map((g) => [g.id, g]))
export const browserGroupedTopics = browserGroups.map((g) => ({ ...g, items: browserTopics.filter((t) => t.group === g.id) }))

export const BROWSER_LEVELS = {
  1: { label: 'Beginner', color: '#22C55E', bg: 'rgba(34,197,94,0.15)' },
  2: { label: 'Intermediate', color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' },
  3: { label: 'Advanced', color: '#EF4444', bg: 'rgba(239,68,68,0.15)' },
}
