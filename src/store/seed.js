









import { todayKey, uid } from '@/lib/utils'

// Build a date key N days ago.
const dayAgo = (n) => todayKey(new Date(Date.now() - n * 86400000))

/** Seed N days of mostly-completed history for a habit. */
function seedCompletions(prob = 0.8, days = 120) {
  const out = {}
  for (let i = 0; i < days; i++) {
    // Deterministic-ish pseudo randomness so the heatmap looks organic.
    const v = Math.sin(i * 12.9898) * 43758.5453
    if (v - Math.floor(v) < prob) out[dayAgo(i)] = true
  }
  return out
}

export const seedHabits = [
  { id: uid('hab'), name: 'Drink Water', icon: '💧', section: 'Morning', color: '#22C55E', createdAt: dayAgo(120), completions: seedCompletions(0.9) },
  { id: uid('hab'), name: 'Meditate 10 min', icon: '🧘', section: 'Morning', color: '#8B5CF6', createdAt: dayAgo(120), completions: seedCompletions(0.7) },
  { id: uid('hab'), name: 'Read 20 pages', icon: '📚', section: 'Morning', color: '#6366F1', createdAt: dayAgo(120), completions: seedCompletions(0.6) },
  { id: uid('hab'), name: 'Deep Work Block', icon: '💻', section: 'Work', color: '#6366F1', createdAt: dayAgo(120), completions: seedCompletions(0.85) },
  { id: uid('hab'), name: 'Inbox Zero', icon: '📧', section: 'Work', color: '#F59E0B', createdAt: dayAgo(120), completions: seedCompletions(0.65) },
  { id: uid('hab'), name: 'Standup Notes', icon: '📝', section: 'Work', color: '#8B5CF6', createdAt: dayAgo(120), completions: seedCompletions(0.8) },
  { id: uid('hab'), name: 'Workout', icon: '🏋️', section: 'Evening', color: '#22C55E', createdAt: dayAgo(120), completions: seedCompletions(0.6) },
  { id: uid('hab'), name: 'Journal', icon: '🖊️', section: 'Evening', color: '#F59E0B', createdAt: dayAgo(120), completions: seedCompletions(0.7) },
  { id: uid('hab'), name: 'No Screens 9pm', icon: '🌙', section: 'Evening', color: '#8B5CF6', createdAt: dayAgo(120), completions: seedCompletions(0.5) },
]

export const seedGoals = [
  {
    id: uid('goal'), title: 'Run a Half Marathon', category: 'Fitness', progress: 64, deadline: dayAgo(-45), createdAt: dayAgo(80),
    milestones: [
      { id: uid('ms'), title: 'Run 5K non-stop', done: true },
      { id: uid('ms'), title: 'Run 10K', done: true },
      { id: uid('ms'), title: 'Run 15K', done: false },
      { id: uid('ms'), title: 'Race day 21K', done: false },
    ],
  },
  {
    id: uid('goal'), title: 'Get Promoted to Senior', category: 'Career', progress: 40, deadline: dayAgo(-120), createdAt: dayAgo(60),
    milestones: [
      { id: uid('ms'), title: 'Lead a project', done: true },
      { id: uid('ms'), title: 'Mentor a junior', done: false },
      { id: uid('ms'), title: 'Performance review', done: false },
    ],
  },
  {
    id: uid('goal'), title: 'Save $10,000 Emergency Fund', category: 'Finance', progress: 78, deadline: dayAgo(-90), createdAt: dayAgo(150),
    milestones: [
      { id: uid('ms'), title: 'Save first $2.5K', done: true },
      { id: uid('ms'), title: 'Save $5K', done: true },
      { id: uid('ms'), title: 'Save $7.5K', done: true },
      { id: uid('ms'), title: 'Hit $10K', done: false },
    ],
  },
  {
    id: uid('goal'), title: 'Read 24 Books This Year', category: 'Personal Growth', progress: 50, deadline: dayAgo(-180), createdAt: dayAgo(120),
    milestones: [
      { id: uid('ms'), title: '6 books (Q1)', done: true },
      { id: uid('ms'), title: '12 books (Q2)', done: true },
      { id: uid('ms'), title: '18 books (Q3)', done: false },
      { id: uid('ms'), title: '24 books (Q4)', done: false },
    ],
  },
]

const cats = ['Food', 'Shopping', 'Travel', 'Bills', 'Entertainment', 'Others'] 
const titles = {
  Food: ['Groceries', 'Lunch', 'Coffee', 'Dinner out', 'Snacks'],
  Shopping: ['Sneakers', 'T-shirt', 'Headphones', 'Books'],
  Travel: ['Uber', 'Fuel', 'Train ticket', 'Flight'],
  Bills: ['Electricity', 'Internet', 'Rent', 'Phone'],
  Entertainment: ['Netflix', 'Movie', 'Concert', 'Games'],
  Others: ['Gift', 'Donation', 'Misc'],
}

function seedTransactions() {
  const out = []
  // 2 incomes per month, last 4 months
  for (let m = 0; m < 4; m++) {
    out.push({ id: uid('txn'), type: 'income', title: 'Salary', amount: 4200, category: 'Others', date: dayAgo(m * 30 + 1) })
    out.push({ id: uid('txn'), type: 'income', title: 'Freelance', amount: 650, category: 'Others', date: dayAgo(m * 30 + 12) })
  }
  // ~60 expenses spread across 120 days
  for (let i = 0; i < 64; i++) {
    const r = Math.abs(Math.sin(i * 7.13))
    const cat = cats[Math.floor(r * cats.length) % cats.length]
    const t = titles[cat]
    out.push({
      id: uid('txn'),
      type: 'expense',
      title: t[i % t.length],
      amount: Math.round(8 + r * 180),
      category: cat,
      date: dayAgo(Math.floor(i * 1.8)),
    })
  }
  return out
}
export const seedTxns = seedTransactions()

export const seedSubjects = [
  { id: 'html', name: 'HTML', icon: '🧱', color: '#F59E0B' },
  { id: 'css', name: 'CSS', icon: '🎨', color: '#6366F1' },
  { id: 'javascript', name: 'JavaScript', icon: '⚡', color: '#F59E0B' },
  { id: 'react', name: 'React', icon: '⚛️', color: '#22C55E' },
  { id: 'nodejs', name: 'Node.js', icon: '🟩', color: '#22C55E' },
  { id: 'typescript', name: 'TypeScript', icon: '🔷', color: '#6366F1' },
]

export const seedTopics = [
  {
    id: uid('top'), subjectId: 'html', title: 'Forms', progress: 100,
    overview: 'HTML forms collect user input and submit it to a server. The <form> element wraps inputs, labels, and controls.',
    syntax: '<form action="/submit" method="post">\n  <label for="email">Email</label>\n  <input id="email" type="email" name="email" required />\n  <button type="submit">Send</button>\n</form>',
    examples: 'Use the correct input types (email, tel, number, date) to get native validation and better mobile keyboards.',
    bestPractices: '• Always pair <label> with inputs via for/id\n• Use semantic input types\n• Add aria-* for accessibility\n• Validate on both client & server',
    notes: 'Remember: novalidate disables native validation. FormData API makes serialization trivial.',
    interviewQuestions: ['Difference between GET and POST forms?', 'How does native form validation work?', 'What is the FormData API?'],
    resources: [{ label: 'MDN: Forms', url: 'https://developer.mozilla.org/en-US/docs/Learn/Forms' }],
    tags: ['forms', 'inputs', 'accessibility'], related: [],
    createdAt: dayAgo(40), updatedAt: dayAgo(2),
    history: [
      { date: dayAgo(40), change: 'Created topic', version: 1 },
      { date: dayAgo(10), change: 'Added interview questions', version: 2 },
      { date: dayAgo(2), change: 'Expanded best practices', version: 3 },
    ],
  },
  {
    id: uid('top'), subjectId: 'css', title: 'Flexbox', progress: 80,
    overview: 'Flexbox is a one-dimensional layout system for distributing space and aligning items in a container.',
    syntax: '.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n}',
    examples: 'Center anything: display:flex; place-content:center; on the parent.',
    bestPractices: '• Use gap instead of margins\n• flex: 1 for equal columns\n• flex-wrap for responsive rows',
    notes: 'flex-basis vs width: flex-basis wins inside a flex container.',
    interviewQuestions: ['Flexbox vs Grid — when to use which?', 'What does flex: 1 expand to?', 'How does align-items differ from align-content?'],
    resources: [{ label: 'CSS Tricks: A Guide to Flexbox', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/' }],
    tags: ['layout', 'flexbox'], related: [],
    createdAt: dayAgo(35), updatedAt: dayAgo(5),
    history: [
      { date: dayAgo(35), change: 'Created topic', version: 1 },
      { date: dayAgo(5), change: 'Added centering example', version: 2 },
    ],
  },
  {
    id: uid('top'), subjectId: 'javascript', title: 'Closures', progress: 60,
    overview: 'A closure is a function that remembers the variables from the scope in which it was created, even after that scope has exited.',
    syntax: 'function counter() {\n  let count = 0\n  return () => ++count\n}\nconst inc = counter()\ninc() // 1\ninc() // 2',
    examples: 'Closures power data privacy, memoization, and React hooks under the hood.',
    bestPractices: '• Beware closures in loops (use let, not var)\n• Watch for memory leaks holding large objects',
    notes: 'Every React useState relies on closures capturing setState.',
    interviewQuestions: ['What is a closure?', 'Explain the classic var-in-a-loop bug.', 'How do closures enable currying?'],
    resources: [{ label: 'MDN: Closures', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures' }],
    tags: ['functions', 'scope', 'core'], related: [],
    createdAt: dayAgo(28), updatedAt: dayAgo(7),
    history: [{ date: dayAgo(28), change: 'Created topic', version: 1 }],
  },
  {
    id: uid('top'), subjectId: 'react', title: 'useEffect', progress: 45,
    overview: 'useEffect runs side effects after render — data fetching, subscriptions, manual DOM mutations.',
    syntax: "useEffect(() => {\n  const id = setInterval(tick, 1000)\n  return () => clearInterval(id) // cleanup\n}, [])",
    examples: 'Empty deps = run once on mount. Always clean up subscriptions in the return function.',
    bestPractices: '• Keep the dependency array honest\n• Split unrelated effects\n• Prefer derived state over effects when possible',
    notes: 'In React 18 StrictMode, effects run twice in dev to surface missing cleanups.',
    interviewQuestions: ['When does useEffect run?', 'Why does StrictMode double-invoke effects?', 'How do you avoid infinite loops?'],
    resources: [{ label: 'React Docs: Synchronizing with Effects', url: 'https://react.dev/learn/synchronizing-with-effects' }],
    tags: ['hooks', 'lifecycle'], related: [],
    createdAt: dayAgo(20), updatedAt: dayAgo(3),
    history: [{ date: dayAgo(20), change: 'Created topic', version: 1 }],
  },
  {
    id: uid('top'), subjectId: 'nodejs', title: 'Event Loop', progress: 30,
    overview: 'The Node.js event loop lets a single thread perform non-blocking I/O by offloading operations to the system kernel.',
    syntax: 'console.log(1)\nsetTimeout(() => console.log(2), 0)\nPromise.resolve().then(() => console.log(3))\n// Output: 1, 3, 2',
    examples: 'Microtasks (promises) run before macrotasks (timers) within each loop tick.',
    bestPractices: '• Never block the loop with sync CPU work\n• Use worker_threads for heavy compute',
    notes: 'Phases: timers → pending → poll → check → close callbacks.',
    interviewQuestions: ['Microtask vs macrotask order?', 'What blocks the event loop?', 'What are the loop phases?'],
    resources: [{ label: 'Node Docs: Event Loop', url: 'https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick' }],
    tags: ['async', 'runtime'], related: [],
    createdAt: dayAgo(15), updatedAt: dayAgo(15),
    history: [{ date: dayAgo(15), change: 'Created topic', version: 1 }],
  },
  {
    id: uid('top'), subjectId: 'typescript', title: 'Generics', progress: 55,
    overview: 'Generics let you write reusable, type-safe code that works over many types while preserving type information.',
    syntax: 'function identity<T>(value: T): T {\n  return value\n}\nconst n = identity<number>(42)',
    examples: 'Constrain generics with extends: <T extends { id: string }>.',
    bestPractices: '• Let inference do the work\n• Constrain only when needed\n• Name params meaningfully (TItem, TKey)',
    notes: 'Generics are erased at runtime — they exist only for the compiler.',
    interviewQuestions: ['What problem do generics solve?', 'What does <T extends U> mean?', 'Difference between unknown and any?'],
    resources: [{ label: 'TS Handbook: Generics', url: 'https://www.typescriptlang.org/docs/handbook/2/generics.html' }],
    tags: ['types', 'generics'], related: [],
    createdAt: dayAgo(12), updatedAt: dayAgo(4),
    history: [{ date: dayAgo(12), change: 'Created topic', version: 1 }],
  },
]

export const seedNotifications = [
  { id: uid('ntf'), type: 'Water', title: 'Hydration reminder', message: 'Time to drink a glass of water 💧', time: '2h ago', read: false },
  { id: uid('ntf'), type: 'Habit', title: 'Evening routine', message: 'You have 3 evening habits left today.', time: '4h ago', read: false },
  { id: uid('ntf'), type: 'Goal', title: 'Goal nearly done!', message: 'Emergency Fund is 78% complete. Keep going!', time: '1d ago', read: true },
  { id: uid('ntf'), type: 'Learning', title: 'Resume learning', message: 'Continue "useEffect" in React.', time: '2d ago', read: true },
]

export const seedProfile = {
  name: 'Mayank Maurya',
  email: 'mayank@gmail.com',
  avatar: '',
  bio: 'Building better habits, one day at a time. Full-stack developer & lifelong learner.',
}

export const seedSettings = {
  theme: 'dark',
  language: 'English',
  timezone: 'Asia/Kolkata',
  currency: 'USD',
  notifications: { habits: true, goals: true, expenses: true, water: true, exercise: false },
  accent: '#6366F1',
}
