// AI Integration Course content — Part 1: AI Coding Basics + Context Fundamentals

export const aiContentA = {
  'what-is-ai-coding': {
    overview:
      '**AI coding** (AI-assisted coding) ka matlab hai ki ek **LLM (Large Language Model)** — jaise ChatGPT, Claude, ya GitHub Copilot — aapke saath milकर code likhता, complete karता, samjhाता aur refactor karता hai. Aap natural language (English/Hinglish) mein bataते ho "kya chahiye", aur AI code generate karता hai. Ise **AI pair programming** bhi kehte hain — jaise ek experienced developer 24x7 aapke saath baitha ho. 🤖',
    why:
      'AI coding ne **2023 ke baad** development workflow poora badal diya. Boilerplate, repetitive code, tests, docs — sab AI se 5-10x fast. Existing projects mein naye features add karna, legacy code samajhना, bugs dhूंढna — sab asaन. Aaj har modern developer (junior se senior tak) AI tools use karता; interview mein bhi "AI tools ka experience" poocha jaता hai.',
    concept: [
      { h: 'AI coding hai kya?', p: 'LLM ek **next-token prediction** model hai — aapka prompt + code dekhकर sabse probable agla code predict karता. Training crores GitHub repos + docs par hui, isliye patterns "yaad" hain. Ye sochता nahi, predict karता.' },
      { h: 'Teen core kaam', p: '**Generate** (naya code likhna), **Complete** (aadhा code aage badhाna — autocomplete), aur **Refactor/Explain** (purana code sudhारna ya samjhाna). Inhi 3 par poora AI coding tika hai.', code: `// Aap likho comment, AI complete kare:\n// function jo email valid check kare\nfunction isValidEmail(email) {\n  return /^[^@]+@[^@]+\\.[^@]+$/.test(email)\n}` },
      { h: 'AI pair programming', p: 'Traditional pair programming mein 2 insaan ek screen par. AI pair programming mein AI aapka "navigator" hai — suggestions deता, aap "driver" ho jo decide aur verify karता. Final zimmedari aapki.' },
      { h: 'Kaise badla workflow?', p: 'Pehle: docs padhो → Stack Overflow → manually likho. Ab: AI se poochо → suggestion lo → review karo → adjust karo. Speed badhी, par **review skill** zaroori ban gayी.' },
    ],
    analogy:
      'AI coding ek **GPS navigation** jaisा hai 🗺️. GPS raasta suggest karता par steering wheel aapke haath mein. Galत turn bhi bata sakta hai (purana map), isliye aap dhyान se follow karते ho. Waise hi AI code suggest karता — par drive (review + decide) aapko karna hai. Bina dekhे follow kiya to gaड्डे mein! 🚗',
    workflow: {
      type: 'boxes',
      items: [
        { label: 'You (Prompt)', sub: 'Kya chahiye, English mein', color: '#8B5CF6' },
        { label: 'LLM', sub: 'Code predict karता', color: '#6366F1' },
        { label: 'Suggestion', sub: 'Generated code', color: '#3B82F6' },
        { label: 'You (Review)', sub: 'Verify + adjust', color: '#22C55E' },
      ],
    },
    syntax: {
      code: `// Prompt example (AI ko diya gaya):\n"Ek React button component banao jo loading state\n dikhaye aur disabled ho jab loading ho."\n\n// AI ka output:\nfunction Button({ loading, children, ...props }) {\n  return (\n    <button disabled={loading} {...props}>\n      {loading ? "Loading..." : children}\n    </button>\n  )\n}`,
      note: 'Clear prompt = clear code. Jitna specific bataoge, utna accha output.',
    },
    steps: [
      'Apne mind mein clear karo ki kya banाna hai (goal).',
      'AI ko prompt do — context + requirement saaf likho.',
      'AI suggestion generate karता (code/explanation).',
      'Code ko padhо aur samjhо — blindly paste mat karo.',
      'Apne project ke style/needs ke hisाब se adjust karo.',
      'Run + test karो — kaam karता hai ya nahi verify.',
      'Galत lage to prompt refine karke dubara poochо.',
    ],
    internals: {
      p: 'LLM andar se ek **transformer neural network** hai. Aapka text **tokens** mein toड़ता (chhote pieces), phir har step par "agla token kya hoga" probability nikaalता. Code bhi text hi hai, isliye same tarीke se predict hota. Model "samajhता" nahi — bohot saare patterns seekhे hain training se, unhi ko apply karता.',
      code: `// Conceptually AI yeh karता:\ninput  = "function add(a, b) { return"\noutput = " a + b }"   // sabse probable continuation\n// Ek-ek token predict karke chain banाता`,
      lang: 'js',
    },
    visual: {
      type: 'timeline',
      items: [
        { year: '1', text: 'Pre-2021: Manual coding — docs, Stack Overflow, copy-paste.' },
        { year: '2', text: '2021: GitHub Copilot launch — inline AI autocomplete.' },
        { year: '3', text: '2022-23: ChatGPT/Claude — chat se code generate.' },
        { year: '4', text: '2024-25: AI-native IDEs (Cursor, Windsurf) + AI agents.' },
        { year: '5', text: '2025-26: Autonomous coding agents (Claude Code) — multi-file tasks.' },
      ],
    },
    examples: [
      { level: 'Beginner', title: 'Comment se function', code: `// reverse a string\nfunction reverseString(str) {\n  return str.split("").reverse().join("")\n}`, lang: 'js', explain: 'Comment likhо, AI poora function complete karता.' },
      { level: 'Intermediate', title: 'Code explain karwाna', code: `// AI ko poochо: "Yeh code kya karता hai?"\nconst unique = [...new Set(arr)]\n// AI: Set duplicate hatाता, spread se wापस array banता.`, lang: 'js', explain: 'Samajh na aaye to AI se explanation maango.' },
      { level: 'Advanced', title: 'Refactor request', code: `// Purana: nested if-else\n// Prompt: "Ise early-return style mein refactor karo"\nfunction check(user) {\n  if (!user) return "no user"\n  if (!user.active) return "inactive"\n  return "ok"\n}`, lang: 'js', explain: 'Existing code ko AI cleaner bana deता.' },
    ],
    notes: {
      concept: 'AI coding = LLM se code generate/complete/refactor; aap reviewer ho.',
      tip: 'Hamesha generated code padhкर samjhо — interview mein "yeh kyun" poocha jaता.',
      warning: 'AI confident galत bhi de sakta (hallucination). Verify zaroori.',
    },
    mistakes: [
      { bad: 'Bina padhе AI code seedha paste karna.', fix: 'Pehle review + samjhо, phir use karो.' },
      { bad: 'Vague prompt: "code banao".', fix: 'Specific: "React mein email validation function banao".' },
      { bad: 'AI par poora bharोsa, khud sochna band.', fix: 'AI assistant hai, replacement nahi — fundamentals seekhте raho.' },
    ],
    best: [
      'Clear, specific prompts likho (context + goal).',
      'Generated code hamesha review aur test karो.',
      'AI ko learning tool ki tरह use karो — "yeh kaise kaam karता" poochо.',
      'Sensitive data (keys, passwords) prompt mein mat daalо.',
      'Chhote tasks mein toड़कर AI se karwाओ — accuracy badhती.',
    ],
    security:
      'Kabhi bhi API keys, passwords, ya private company code public AI tools mein paste mat karो — wo data train/store ho sakta hai. Enterprise tools (jaise GitHub Copilot Business) data retention off karne deते hain. Generated code mein security holes (SQL injection, XSS) ho sakte — review zaroori.',
    performance:
      'AI calls **tokens** par chalती hain — jitna bada prompt + output, utna zyada cost aur latency (waiting time). Bade codebase ka poora code har baar bhejna mehnga; sirf relevant parts bhejо. Local autocomplete (Copilot) fast; bade chat models (Opus) thode slow par smart.',
    tricky: [
      { title: 'AI confident par galत', explain: 'AI kabhi galत code bhi pure confidence se deता (hallucination). "Ye library aisा method nahi rakhती" — par AI bana deता. Hamesha docs se cross-check.', lang: 'js' },
      { title: 'Outdated suggestions', code: `// AI purana React pattern de sakta:\ncomponentWillMount() { ... }  // deprecated!\n// Modern: useEffect ya naye hooks`, output: 'Deprecated code', explain: 'Training cutoff ke baad ki cheezें AI nahi jaanता — naye APIs miss kar sakta.', lang: 'js' },
    ],
    interview: {
      beginner: [
        { q: 'AI coding kya hai?', a: 'LLM ki madad se code generate, complete aur refactor karna. AI suggest karता, developer review aur decide karता.' },
        { q: 'AI pair programming kya hai?', a: 'AI ko ek pair-programming partner ki tरह use karna — AI navigator (suggests), aap driver (verify + decide).' },
      ],
      intermediate: [
        { q: 'AI code kaise generate karता hai?', a: 'LLM next-token prediction karता — prompt aur code dekhкर sabse probable agla token predict karता, ek-ek karke poora code banाता. Patterns training se seekhे.' },
        { q: 'AI coding ne workflow kaise badla?', a: 'Boilerplate aur repetitive code fast ho gaya, learning asaन hui, par review/verification skill ab core skill ban gayी.' },
      ],
      advanced: [
        { q: 'AI "samajhता" hai ya "predict" karता?', a: 'Predict karता. Ye true understanding nahi — statistical pattern matching hai. Isliye logic galat bhi ho sakta; human judgment zaroori.' },
        { q: 'Existing project mein AI integrate karne ke challenges?', a: 'Codebase ka context AI tak pahुंchाna (limited context window), code style consistency, security/data leakage, aur generated code ka existing architecture ke saath fit hona.' },
      ],
    },
    mcqs: [
      { q: 'AI coding ka core mechanism?', options: ['Random code', 'Next-token prediction', 'Database lookup', 'Manual rules'], answer: 1, explain: 'LLM probable agla token predict karता.' },
      { q: 'AI coding mein final zimmedari kiski?', options: ['AI ki', 'Developer ki', 'Company ki', 'Kisi ki nahi'], answer: 1, explain: 'Developer review + decide karता; AI sirf assist.' },
      { q: 'AI pair programming mein developer kya hai?', options: ['Observer', 'Driver (decide/verify)', 'Sirf typist', 'Inactive'], answer: 1, explain: 'AI navigator, developer driver.' },
    ],
    exercises: {
      easy: ['Ek comment likhо aur AI se ek simple function complete karwाओ.'],
      medium: ['Apne kisi purane function ko AI se explain karwाओ aur samjhо.'],
      advanced: ['Ek nested if-else code AI se early-return style mein refactor karwाओ aur compare karो.'],
    },
    summary: [
      'AI coding = LLM se code generate / complete / refactor.',
      'Mechanism: next-token prediction (samajhता nahi, predict karता).',
      'AI pair programming: AI navigator, developer driver.',
      'Review + verify hamesha zaroori (hallucination + outdated risk).',
      'Modern dev workflow ka core hissा ban gaya hai.',
    ],
    cheatsheet: [
      { h: '3 kaam', code: `Generate → naya code\nComplete  → aadhा code aage\nRefactor  → purana sudhारna` },
      { h: 'Workflow', code: `Prompt → Suggest → Review → Adjust → Test` },
    ],
    projects: [
      'Existing project mein AI se ek naya feature add karna.',
      'Legacy code ko AI se samajhкर document karna.',
      'AI se unit tests generate karna.',
      'Boilerplate (CRUD APIs) AI se banाna.',
    ],
    advanced:
      'Aage AI sirf suggest nahi, **autonomous agents** (Claude Code, Cursor agents) khud multi-file tasks complete karते — files padhna, edit karna, tests chalाna, sab apne aap. Ye "agentic coding" kehlाता. RAG (codebase ko search karke context lana) aur MCP (tools se connect) isे aur powerful banाते.',
    quiz: [
      { q: 'AI coding tools ka pehla bada example?', options: ['Notepad', 'GitHub Copilot', 'MS Word', 'Excel'], answer: 1, explain: 'Copilot (2021) inline AI autocomplete laya.' },
      { q: 'Hallucination ka matlab?', options: ['AI sahi code', 'AI confident galत code', 'Fast code', 'No code'], answer: 1, explain: 'Confident par galат/fake output.' },
    ],
    related: ['why-use-ai', 'ai-limitations', 'ai-tools-overview', 'what-is-context'],
  },

  'why-use-ai': {
    overview:
      'Developers AI isliye use karते kyunki ye **speed, productivity aur learning** sab boost karता hai. Boilerplate aur repetitive code seconds mein, complex concepts turant samajh, bugs jaldी pakad. Existing projects mein naye features add karna, legacy code maintain karna — sab asaन ho jaता. AI ek **force multiplier** hai — ek developer ab 2-3 developers ka kaam kar sakta. 🚀',
    why:
      'Competitive market mein speed maायne rakhती. Companies AI-fluent developers chahती hain — kam time mein zyada deliver. Interview mein bhi "AI tools se kaise productive ho" poocha jaता. Samajhना ki AI kahan madad karता (aur kahan nahi) — ye smart developer ki nishani hai.',
    concept: [
      { h: 'Speed — sabse bada faayda', p: 'Boilerplate (forms, CRUD, config) jo ghanton leता, AI seconds mein. Aap actual logic aur problem-solving par focus kar sakte ho.', code: `// 1 line prompt se poora form:\n"React login form with email + password validation"\n// → AI ne 30 lines turant likh diin` },
      { h: 'Less code likhna', p: '"Writing less code" ka matlab — aap intent batao, AI implementation likhे. Aapka kaam soचना aur review karna ban jaता, typing kam.' },
      { h: 'Learning accelerate', p: 'Naya framework/library? AI se "is concept ko simple example se samjhाओ" — turant. Error aaya? Paste karke "fix samjhाओ". Documentation se fast.' },
      { h: 'Existing projects mein', p: 'Bade codebase mein naya feature joड़ना, ya purana code samajhना — AI context dekhкर guide karता. Refactoring, migration, tests — sab teज.' },
    ],
    analogy:
      'AI ek **power drill** jaisा hai 🔧. Pehle screws haath se ghumाते the (slow, thakaन). Drill se seconds mein — par aapko abhi bhi pataना hai kahan screw lagाni hai (judgment). Drill kaam tej karता, decision aapka. Galत jagah drill kiya to nuksान! Tool powerful hai, par operator (aap) smart hona chahिए.',
    workflow: {
      type: 'boxes',
      items: [
        { label: 'Task aaya', sub: 'Feature/bug/learn', color: '#8B5CF6' },
        { label: 'AI se help', sub: 'Generate/explain', color: '#D946EF' },
        { label: 'Fast output', sub: 'Code in seconds', color: '#3B82F6' },
        { label: 'Ship faster', sub: 'Review + deliver', color: '#22C55E' },
      ],
    },
    syntax: {
      code: `// Bina AI: 30 min likhna + debug\n// AI ke saath: prompt + review = 5 min\n\nPrompt: "Express route banao jo users ko\n         paginate karke return kare"\n// AI: poora route + pagination logic ready`,
      note: 'Time bachта boilerplate par — focus actual business logic par.',
    },
    steps: [
      'Pehchानो kaunsा kaam repetitive/boilerplate hai.',
      'Usे AI se generate karwाओ (clear prompt ke saath).',
      'Naye concept seekhне ke liye AI se simple examples maango.',
      'Errors aaye to AI se explanation + fix lo.',
      'Generated code review + apne project mein fit karो.',
      'Bacha hua time complex logic aur testing par lagाओ.',
    ],
    internals:
      'AI productivity isliye deता kyunki LLM ne crores code examples dekhे — common patterns (auth, CRUD, validation) wo instantly recall kar sakta. Aapko har baar wheel re-invent nahi karna padता. Par ye sirf "known patterns" mein fast — bilkul naya/unique logic mein human soच chahिए.',
    visual: {
      type: 'timeline',
      items: [
        { year: '1', text: 'Boilerplate fast — forms, CRUD, config seconds mein.' },
        { year: '2', text: 'Learning fast — naye concepts/frameworks turant samajh.' },
        { year: '3', text: 'Debugging fast — errors paste karke fix samajhо.' },
        { year: '4', text: 'Maintenance fast — legacy code samajhна + refactor.' },
        { year: '5', text: 'Net result: 1 dev = 2-3x output (force multiplier).' },
      ],
    },
    examples: [
      { level: 'Beginner', title: 'Boilerplate bachana', code: `// Prompt: "5 dummy user objects banao testing ke liye"\nconst users = [\n  { id: 1, name: "Aman", role: "admin" },\n  { id: 2, name: "Priya", role: "user" },\n  // ...AI ne baki bhi bana diye\n]`, lang: 'js', explain: 'Mock data jaisी boring cheez AI se instant.' },
      { level: 'Intermediate', title: 'Learning by example', code: `// Prompt: "debounce kya hai, simple example do"\nfunction debounce(fn, delay) {\n  let timer\n  return (...args) => {\n    clearTimeout(timer)\n    timer = setTimeout(() => fn(...args), delay)\n  }\n}`, lang: 'js', explain: 'Concept + working example ek saath.' },
      { level: 'Advanced', title: 'Existing project feature', code: `// Prompt: "Is project ke pattern follow karke\n// 'export to CSV' button add karo"\n// AI existing code style match karke feature deता`, lang: 'js', explain: 'Context dekhкर consistent code.' },
    ],
    notes: {
      concept: 'AI = speed + learning + productivity boost (force multiplier).',
      tip: 'Boring/repetitive kaam AI ko do, creative/logic kaam khud karो.',
      warning: 'AI productivity tabhi jab aap review kar sako — warna technical debt.',
    },
    compare: {
      headers: ['Task', 'Bina AI', 'AI ke saath'],
      rows: [
        ['Boilerplate form', '30-40 min', '3-5 min'],
        ['Naya concept seekhna', 'Ghanto docs', 'Minutes mein example'],
        ['Bug fix', 'Trial-error', 'Paste + explain'],
        ['Unit tests', 'Manual likhna', 'Auto-generate + review'],
      ],
    },
    mistakes: [
      { bad: 'AI se sab karwाना, khud kuch na seekhna.', fix: 'AI se seekho bhi — "kaise/kyun" poochо.' },
      { bad: 'Speed ke chakkar mein review skip.', fix: 'Fast banाo par hamesha verify.' },
      { bad: 'Unique business logic bhi AI par chhodna.', fix: 'Core/critical logic khud design karो.' },
    ],
    best: [
      'Repetitive aur boilerplate kaam AI ko delegate karो.',
      'AI ko learning partner ki tरह use karो (concepts samjhо).',
      'Time bachакर complex problem-solving par lagाओ.',
      'Generated code consistency ke liye project style batाओ.',
      'Critical/security code khud review + design karो.',
    ],
    security:
      'Speed ke chakkar mein company ka private code public AI mein mat daalो — data leak risk. Enterprise/team plans (data retention off) use karो sensitive projects ke liye. Fast-generated code mein vulnerabilities chhup sakti — productivity ke saath security review skip mat karो.',
    performance:
      'AI se time bachता par har AI call cost (tokens) leती hai. Smart use: chhote focused prompts, sirf relevant code bhejना. Local autocomplete (Copilot) latency kam; bade reasoning tasks ke liye smart models — thode slow par worth it complex kaam mein.',
    tricky: [
      { title: 'Productivity illusion', explain: 'AI fast lagता par agar aap review nahi karते aur baad mein bugs aaते, to net time zyada lag sakta. Real productivity = fast + correct.', lang: 'js' },
      { title: 'Over-reliance trap', explain: 'Sirf AI par depend karke fundamentals bhool gaye to interview/debugging mein phans jaoge. AI se seekho, par concepts khud bhi pakdo.', lang: 'js' },
    ],
    interview: {
      beginner: [
        { q: 'Developers AI kyun use karते hain?', a: 'Speed, productivity, less boilerplate, fast learning aur asaन debugging ke liye. AI ek force multiplier hai.' },
        { q: 'AI sabse zyada kahan madad karता?', a: 'Boilerplate code, repetitive tasks, naye concepts seekhne, aur errors fix karne mein.' },
      ],
      intermediate: [
        { q: 'Existing project mein AI ka faayda?', a: 'Naye features fast, legacy code samajhना, refactoring, migration aur tests generate karna — codebase context ke saath.' },
        { q: '"Writing less code" se kya matlab?', a: 'Developer intent (kya chahिए) bataता, AI implementation likhता. Typing kam, soचना/review zyada.' },
      ],
      advanced: [
        { q: 'AI productivity ka asli measure kya?', a: 'Sirf fast nahi — fast + correct. Agar review/test skip karके baad mein bugs aaye to productivity ghat jaती. Quality ke saath speed.' },
        { q: 'AI over-reliance ke nuksан?', a: 'Fundamentals weak, debugging skill ghatে, hallucinated/insecure code, aur sochne ki capacity kam. Balance zaroori.' },
      ],
    },
    mcqs: [
      { q: 'AI ka sabse bada immediate faayda?', options: ['Free code', 'Speed/productivity', 'No bugs', 'No review'], answer: 1, explain: 'Speed + productivity boost.' },
      { q: 'AI ko force multiplier kyun kehte?', options: ['Free hai', 'Ek dev ka output multiply karता', 'Bugs banाता', 'Slow hai'], answer: 1, explain: 'Ek developer = 2-3x output.' },
      { q: 'AI se asli productivity tab jab?', options: ['Review skip karo', 'Fast + correct dono', 'Sab AI par chhodo', 'Tests na karo'], answer: 1, explain: 'Speed + quality saath.' },
    ],
    exercises: {
      easy: ['Ek boilerplate kaam (mock data/form) AI se 5 min mein karwाओ.'],
      medium: ['Ek naya concept AI se example ke saath seekho aur note banaओ.'],
      advanced: ['Apne project mein AI se ek feature add karke time compare karो (bina AI vs AI).'],
    },
    summary: [
      'AI = speed + productivity + learning boost.',
      'Boilerplate/repetitive kaam AI ko; logic khud.',
      'Existing projects mein features/refactor fast.',
      'Force multiplier — 1 dev = 2-3x output.',
      'Real productivity = fast AUR correct (review zaroori).',
    ],
    cheatsheet: [
      { h: 'AI ko do', code: `Boilerplate, mock data,\ntests, docs, refactor` },
      { h: 'Khud karo', code: `Core logic, design,\ncritical/security code, review` },
    ],
    projects: [
      'AI se CRUD API jaldी banाना.',
      'Naya framework AI ki madad se seekhna.',
      'Legacy module AI se samajhкर document karna.',
      'Boilerplate test suite generate karna.',
    ],
    advanced:
      'Aage AI sirf speed nahi, **autonomy** deता — agents khud poore features banाते, tests chalाते, PR raise karते. Team workflows mein AI code review, auto-documentation, aur CI/CD integration. Smart developer wo jo jaanта kahan AI lagाna hai aur kahan human judgment — yahi competitive edge.',
    quiz: [
      { q: 'AI kis kaam mein sabse fast?', options: ['Unique research', 'Boilerplate/patterns', 'Business strategy', 'Nothing'], answer: 1, explain: 'Known patterns instantly.' },
      { q: 'AI productivity ka risk?', options: ['Too slow', 'Over-reliance + unreviewed bugs', 'Costs nothing', 'No risk'], answer: 1, explain: 'Bina review + dependence khatarnаk.' },
    ],
    related: ['what-is-ai-coding', 'ai-limitations', 'writing-less-code', 'react-ai-integration'],
  },

  'ai-limitations': {
    overview:
      'AI powerful hai par **perfect nahi**. Iski limitations samajhना utna hi zaroori jitna faayde. Main problems: **hallucinations** (confident galат), **outdated knowledge** (training cutoff), **context limits** (sab yaad nahi rakh sakta), **no true understanding** (sirf prediction), **security risks**, aur **over-reliance**. Jo developer ye limits jaanта, wahi AI ko safely use kar sakता. ⚠️',
    why:
      'Bina limitations jaane AI use karna khatarnаk — galat code production mein, security holes, ya outdated patterns. Interview mein "AI par kab bharоsa na karें" ek common smart question. Real-world mein ye knowledge bugs aur disasters se bachाता.',
    concept: [
      { h: 'Hallucination', p: 'AI confident hokar **galат ya fake** cheez bana deता — non-existent functions, galат API methods, made-up library names. Sabse khatarnаk kyunki confident lagता.', code: `// AI bana sakta (galат):\narray.removeDuplicates()  // aisा method JS mein hai hi nahi!\n// Sahi: [...new Set(array)]` },
      { h: 'Outdated knowledge', p: 'AI ka ek **training cutoff** hota — us date ke baad ki nayी libraries, APIs, versions wo nahi jaanта. Naya framework release? AI ko pata nahi.' },
      { h: 'No true understanding', p: 'AI logic "samajhता" nahi, patterns predict karता. Isliye edge cases, business rules, ya tricky logic mein galат ho sakta. Math/counting mein bhi kabhi fail.' },
      { h: 'Context limits', p: 'AI ek baar mein limited text (context window) hi dekh sakta. Bada codebase poora yaad nahi rakh sakta — purani baatें "bhool" jaता.' },
      { h: 'Over-reliance', p: 'Sirf AI par depend karne se fundamentals weak, debugging skill ghatे, aur khud sochna band. Long-term career risk.' },
    ],
    analogy:
      'AI ek **over-confident intern** jaisा hai 🧑‍🎓. Bohot padhा-likhा, fast kaam karता, par kabhi-kabhi galat answer bhi pure confidence se de deता ("sir, yeh bilkul sahi hai!"). Uski har baat blindly maan li to project doob jaega. Use karो, par hamesha **double-check** karो — wo intern hai, expert nahi.',
    workflow: {
      type: 'boxes',
      items: [
        { label: 'AI output', sub: 'Code/answer', color: '#8B5CF6' },
        { label: 'Doubt karो', sub: 'Sahi hai? Real?', color: '#F59E0B' },
        { label: 'Verify', sub: 'Docs + test', color: '#3B82F6' },
        { label: 'Tab use', sub: 'Confirmed code', color: '#22C55E' },
      ],
    },
    syntax: {
      code: `// Hallucination ka example:\n// Prompt: "moment.js se 2 din add karo"\nmoment().addDays(2)   // ❌ aisा method nahi\n// Sahi (docs check karne par):\nmoment().add(2, "days")  // ✅`,
      note: 'Hamesha official docs se method/API verify karो.',
    },
    steps: [
      'AI ka output mile to pehle "kya ye sahi hai?" soचо.',
      'Functions/API methods official docs se verify karो.',
      'Code run + test karке actually kaam karता hai check.',
      'Library versions/dates dekhо — outdated to nahi.',
      'Edge cases khud soचо — AI miss kar sakta.',
      'Sensitive/critical logic extra carefully review karो.',
      'Doubt ho to AI se source/explanation maango.',
    ],
    internals: {
      p: 'Hallucination isliye hota kyunki LLM "probable" text generate karता, "true" nahi. Agar training mein ek pattern dikhा (jaise har class mein `.save()` method), to AI naye context mein bhi `.save()` maan leता — chahे wahan ho ya nahi. Outdated isliye kyunki model ek snapshot par freeze hai (training cutoff); baad ka kuch nahi jaanता.',
      code: `// Model sochता: ".save() common hai, isliye yahan bhi hoga"\nuser.save()   // par is library mein method alag ho sakta\n// Reality ≠ probability`,
      lang: 'js',
    },
    visual: {
      type: 'timeline',
      items: [
        { year: '1', text: 'Hallucination — confident par galात/fake code.' },
        { year: '2', text: 'Outdated — training cutoff ke baad ka nahi pata.' },
        { year: '3', text: 'No understanding — logic/edge cases mein fail.' },
        { year: '4', text: 'Context limit — bada codebase pura yaad nahi.' },
        { year: '5', text: 'Security + over-reliance — leaks aur weak skills.' },
      ],
    },
    examples: [
      { level: 'Beginner', title: 'Fake method', code: `// AI ne suggest kiya:\n"hello".capitalize()  // ❌ JS mein nahi hai\n// Sahi:\n"hello".charAt(0).toUpperCase() + "hello".slice(1)`, lang: 'js', explain: 'Method exist karta ya nahi — verify karो.' },
      { level: 'Intermediate', title: 'Counting mein fail', code: `// Prompt: "is array mein kitne even numbers?"\n// AI kabhi galat count de deता (no true math)\nconst evens = arr.filter(n => n % 2 === 0).length\n// Khud code chalाkar confirm karो`, lang: 'js', explain: 'AI math/counting mein reliable nahi — verify.' },
      { level: 'Advanced', title: 'Outdated pattern', code: `// AI purana de sakta:\nReactDOM.render(<App/>, el)  // React 18 mein deprecated\n// Naya:\ncreateRoot(el).render(<App/>)`, lang: 'js', explain: 'Naye versions AI miss kar sakta.' },
    ],
    notes: {
      concept: 'AI limits: hallucination, outdated, no understanding, context limit, security.',
      tip: 'Rule: AI ko "smart par galात ho sakता" maano — hamesha verify.',
      warning: 'Confident output = sahi output nahi. Confidence galात hone par bhi hoti.',
    },
    compare: {
      headers: ['Limitation', 'Problem', 'Bachne ka tarीka'],
      rows: [
        ['Hallucination', 'Fake code', 'Docs se verify'],
        ['Outdated', 'Purane APIs', 'Latest version check'],
        ['No understanding', 'Logic galात', 'Khud test'],
        ['Context limit', 'Bhool jaता', 'Relevant context do'],
      ],
    },
    mistakes: [
      { bad: 'AI ki har baat blindly sach maanna.', fix: 'Doubt + verify mindset rakho.' },
      { bad: 'Latest framework par AI par bharоsa.', fix: 'Naye cheezें docs se confirm.' },
      { bad: 'Critical math/logic AI par chhodna.', fix: 'Khud run karके verify.' },
    ],
    best: [
      'Har AI output ko "verify pehle" mindset se dekhо.',
      'API/methods official docs se cross-check karो.',
      'Code run + test karके correctness confirm karो.',
      'Latest libraries/versions khud check — AI outdated ho sakta.',
      'AI ko crutch nahi, tool maano — fundamentals khud seekhо.',
      'Critical/security code par extra scrutiny.',
    ],
    security:
      'AI generated code mein **security vulnerabilities** (SQL injection, XSS, weak auth) aa sakti — wo "working" code deता, secure nahi. Saath hi prompt mein daala data leak ho sakta. AI **prompt injection** se manipulate bhi ho sakta (malicious instructions code mein chhupe). Hamesha security review zaroori.',
    performance:
      'Context limit ki wajah se bade codebase ka poora code bhejना mehnga + uncertain — AI fir bhi miss kar sakta. Zyada context = zyada tokens = zyada cost + slow + "lost in middle" (beech ka content miss). Solution: sirf relevant code, RAG-style focused retrieval.',
    tricky: [
      { title: 'Confidently wrong', code: `// AI: "Yeh 100% kaam karेga"\nJSON.parse(undefined)  // crash karेga!`, output: 'TypeError', explain: 'Confidence ka level accuracy ka proof nahi. AI confident galात bhi.', lang: 'js' },
      { title: 'Subtle outdated', explain: 'Code chal jaता par deprecated/insecure pattern use karता jo training time par common tha. "Working" hai par best-practice nahi — review se pakdो.', lang: 'js' },
    ],
    interview: {
      beginner: [
        { q: 'Hallucination kya hai?', a: 'Jab AI confident hokar galात ya fake cheez (non-existent function/API) bana deता. Sabse khatarnаk kyunki sahi lagता.' },
        { q: 'AI outdated kyun ho sakta?', a: 'Model ek training cutoff date tak ka data jaanता. Uske baad ki naye libraries/versions/APIs wo nahi jaanता.' },
      ],
      intermediate: [
        { q: 'AI par kab bharоsa na karें?', a: 'Latest tech, critical math/logic, security-sensitive code, aur business rules mein — yahan hallucination/outdated/no-understanding ka risk zyada.' },
        { q: 'Context limit ki problem?', a: 'AI limited text hi dekh sakta — bada codebase poora yaad nahi, purani baatें bhool jaता, ya beech ka content miss (lost in middle).' },
      ],
      advanced: [
        { q: 'AI "samajhता nahi, predict karता" — iska impact?', a: 'Logic, edge cases, counting/math, aur novel problems mein fail ho sakta. Ye true reasoning nahi, statistical pattern matching hai — isliye human verification zaroori.' },
        { q: 'Over-reliance ke long-term nuksан?', a: 'Fundamentals weak, debugging/sochne ki skill ghatे, hallucinated/insecure code production mein, aur career growth ruk sakti.' },
      ],
    },
    mcqs: [
      { q: 'Hallucination ka matlab?', options: ['Fast code', 'Confident galात/fake output', 'Secure code', 'No output'], answer: 1, explain: 'Confident par incorrect.' },
      { q: 'AI naye libraries kyun miss karता?', options: ['Lazy', 'Training cutoff', 'Slow internet', 'Random'], answer: 1, explain: 'Cutoff ke baad ka data nahi.' },
      { q: 'AI math/counting mein?', options: ['Hamesha sahi', 'Reliable nahi — verify', 'Best', 'Never used'], answer: 1, explain: 'No true understanding — verify.' },
    ],
    exercises: {
      easy: ['AI se ek method poochо jo shayad exist na kare, phir docs se verify karो.'],
      medium: ['Ek outdated pattern dhूंढो jo AI de aur uska modern version pata karो.'],
      advanced: ['Ek AI-generated code mein possible security issue ya edge case identify karो.'],
    },
    summary: [
      'AI perfect nahi — limits jaanна zaroori.',
      'Hallucination: confident par galात/fake.',
      'Outdated: training cutoff ke baad ka nahi pata.',
      'No true understanding — logic/edge cases mein fail.',
      'Context limit, security risk, over-reliance.',
      'Solution: hamesha verify + test + review.',
    ],
    cheatsheet: [
      { h: '5 limits', code: `Hallucinate, Outdated,\nNo-understanding,\nContext-limit, Security-risk` },
      { h: 'Golden rule', code: `Confident ≠ Correct\n→ Always verify` },
    ],
    projects: [
      'AI code mein hallucination/outdated patterns audit karna.',
      'Security review checklist banाna AI code ke liye.',
      'Edge-case test cases khud likhкर AI output verify karna.',
    ],
    advanced:
      'Limitations kam karne ke liye modern techniques: **RAG** (real docs/code retrieve karके context dena — hallucination kam), **tool use** (AI ko calculator/search tools dena), aur **grounding** (AI ko source cite karne pe majboor karna). Phir bhi human-in-the-loop verification gold standard rehta hai.',
    quiz: [
      { q: 'Sabse khatarnаk limit?', options: ['Slow speed', 'Hallucination (confident galात)', 'Costs money', 'Long output'], answer: 1, explain: 'Galат par sahi lagता.' },
      { q: 'Limitations ka best solution?', options: ['AI band karo', 'Verify + test + review', 'Ignore karo', 'Faster AI'], answer: 1, explain: 'Human verification.' },
    ],
    related: ['what-is-ai-coding', 'why-use-ai', 'tokens-limits', 'context-window'],
  },

  'ai-tools-overview': {
    overview:
      'Aaj bohot saare AI coding tools hain, har ek alag purpose ke liye. Inhें 3 categories mein samjhо: **Chat assistants** (ChatGPT, Claude, Gemini — browser/app mein baat-cheet), **IDE/editor tools** (GitHub Copilot, Cursor, Windsurf — directly editor mein), aur **App/UI builders** (v0, Bolt, Lovable — prompt se poora UI/app). Sahi tool chunna = right job ke liye right tool. 🛠️',
    why:
      'Har tool ki strength alag — galात tool chunne se time/paise barbаd. Interview mein "kaunsा tool kab" ek practical question. Existing project mein integration ke liye samajhना zaroori ki kaunसा tool aapke workflow mein fit hota.',
    concept: [
      { h: 'Chat assistants', p: '**ChatGPT (OpenAI), Claude (Anthropic), Gemini (Google)** — browser/app mein chat. Code generate, explain, debug, brainstorm. General-purpose, kisi bhi language/topic. Copy-paste workflow.' },
      { h: 'IDE autocomplete', p: '**GitHub Copilot** — aapke editor (VS Code) mein inline suggestions deता jaise aap type karते ho. Tab dabाओ, suggestion accept. Fastest for flow.' },
      { h: 'AI-native IDEs', p: '**Cursor, Windsurf** — poora editor hi AI ke around bana. Codebase samajhते, multi-file edits, chat + agent mode. Deep integration.' },
      { h: 'App/UI builders', p: '**v0 (Vercel), Bolt (StackBlitz), Lovable** — prompt se poora frontend/app generate. "Banao ek dashboard" → working UI. Rapid prototyping ke liye best.', code: `// v0/Bolt prompt:\n"Modern pricing page with 3 tiers,\n dark mode, responsive"\n// → poora React/Tailwind UI ready` },
      { h: 'Extensions & agents', p: '**Continue.dev** (open-source IDE extension, apna model choose karो), **Claude Code** (terminal-based autonomous agent — multi-file tasks khud karता).' },
    ],
    analogy:
      'Ye tools ek **toolbox** ki tरह hain 🧰. Chat assistant = multi-purpose Swiss knife (kuch bhi poochо). Copilot = nail gun (fast inline). Cursor/Windsurf = poora power-tool workshop (editor). v0/Bolt = 3D printer (prompt se poora object). Plumber paani ke liye Swiss knife nahi, wrench use karता — waise tum sahi tool chunо kaam ke hisाब se.',
    workflow: {
      type: 'boxes',
      items: [
        { label: 'Question/brainstorm', sub: 'Chat (ChatGPT/Claude)', color: '#8B5CF6' },
        { label: 'Inline coding', sub: 'Copilot', color: '#6366F1' },
        { label: 'Codebase work', sub: 'Cursor/Windsurf', color: '#3B82F6' },
        { label: 'UI prototype', sub: 'v0/Bolt/Lovable', color: '#22C55E' },
      ],
    },
    syntax: {
      code: `// Same task, alag tools:\n\n// ChatGPT/Claude: chat mein poochо\n"React modal component banao"\n\n// Copilot: comment likho, Tab dabाओ\n// modal component\n\n// Cursor: Cmd+K → "add a modal here"\n\n// v0: prompt → full UI preview`,
      note: 'Tool same goal, par workflow aur integration alag.',
    },
    steps: [
      'Apna kaam pehchानो (chat? inline? codebase? UI?).',
      'Category chunо: chat / IDE / builder / agent.',
      'Brainstorm/learn → chat assistant (Claude, ChatGPT).',
      'Fast inline coding → GitHub Copilot.',
      'Bade codebase tasks → Cursor ya Windsurf.',
      'Quick UI/prototype → v0, Bolt, ya Lovable.',
      'Privacy/custom model → Continue.dev (open-source).',
    ],
    internals:
      'Andar se sabhी tools kisi LLM ko call karते (GPT, Claude, Gemini family). Difference UX aur context handling mein: chat tools sirf aapka typed text dekhte; IDE tools editor se context (open files, cursor position) auto-include karते; agents codebase scan + tools use karते. Tool ki "power" = wo kitna context aur action de sakता.',
    architecture: {
      type: 'tree',
      root: 'AI Coding Tools',
      children: [
        { label: 'Chat', sub: 'ChatGPT, Claude, Gemini', color: '#8B5CF6', children: [
          { label: 'Use', sub: 'Explain, brainstorm', color: '#D946EF' },
        ] },
        { label: 'IDE', sub: 'Copilot, Cursor, Windsurf', color: '#6366F1', children: [
          { label: 'Use', sub: 'Inline + codebase', color: '#3B82F6' },
        ] },
        { label: 'Builders', sub: 'v0, Bolt, Lovable', color: '#22C55E', children: [
          { label: 'Use', sub: 'Prompt to UI/app', color: '#06B6D4' },
        ] },
      ],
    },
    examples: [
      { level: 'Beginner', title: 'Concept poochना', code: `// ChatGPT/Claude chat:\n"useEffect kya hai? Simple example do."\n// → explanation + working code`, lang: 'js', explain: 'Chat assistant learning ke liye best.' },
      { level: 'Intermediate', title: 'Inline autocomplete', code: `// Copilot — comment likho:\n// fetch users from /api/users\n// → Copilot poora fetch code suggest karता (Tab to accept)`, lang: 'js', explain: 'Flow break kiye bina code.' },
      { level: 'Advanced', title: 'Codebase agent', code: `// Cursor/Claude Code:\n"Saare components mein dark mode\n support add karo"\n// → multi-file edits khud karता`, lang: 'js', explain: 'Bade tasks ke liye agentic tools.' },
    ],
    notes: {
      concept: 'Tools: chat / IDE-inline / AI-IDE / UI-builder / agent — har ek alag kaam.',
      tip: 'Ek tool sab kuch nahi karता — kaam ke hisाब se switch karो.',
      warning: 'Free tiers limited; team/enterprise plans privacy + zyada usage deते.',
    },
    compare: {
      headers: ['Tool', 'Type', 'Best for', 'Pricing model'],
      rows: [
        ['ChatGPT', 'Chat (web/app)', 'General Q&A, explain, debug', 'Free + Plus subscription'],
        ['Claude', 'Chat (web/app)', 'Long context, coding, reasoning', 'Free + Pro subscription'],
        ['Gemini', 'Chat (web/app)', 'Google ecosystem, multimodal', 'Free + Advanced'],
        ['GitHub Copilot', 'IDE autocomplete', 'Inline suggestions in editor', 'Subscription (Individual/Business)'],
        ['Cursor', 'AI-native IDE', 'Codebase-aware multi-file edits', 'Free + Pro subscription'],
        ['Windsurf', 'AI-native IDE', 'Agentic codebase flows', 'Free + Pro subscription'],
        ['v0', 'UI builder', 'React/Tailwind UI from prompt', 'Free + paid (Vercel)'],
        ['Bolt', 'App builder', 'Full-stack app prototypes', 'Free + paid (StackBlitz)'],
        ['Lovable', 'App builder', 'Full app from prompt (no-code-ish)', 'Free + paid'],
        ['Continue.dev', 'Open-source ext', 'Custom/local models, privacy', 'Free (open-source)'],
        ['Claude Code', 'Terminal agent', 'Autonomous multi-file coding', 'Subscription / API'],
      ],
    },
    mistakes: [
      { bad: 'Har kaam ke liye ek hi tool zaबरdasti.', fix: 'Kaam ke hisाब se sahi category chunо.' },
      { bad: 'UI builder se complex backend logic banाna.', fix: 'Builders prototyping ke liye; logic IDE/chat se.' },
      { bad: 'Private code public chat mein.', fix: 'Enterprise/local tools (Continue.dev) use karो.' },
    ],
    best: [
      'Learning/brainstorm ke liye chat assistants (Claude, ChatGPT).',
      'Daily fast coding ke liye IDE autocomplete (Copilot).',
      'Bade codebase tasks ke liye Cursor/Windsurf.',
      'Rapid UI prototyping ke liye v0/Bolt/Lovable.',
      'Privacy chahिए to open-source/local (Continue.dev).',
      'Ek tool master karne se pehle 2-3 try karके pick karो.',
    ],
    security:
      'Har tool ki data policy alag — kuch aapka code train ke liye use karते, kuch nahi. Enterprise/Business plans (Copilot Business, Claude/ChatGPT enterprise) data retention off + privacy guarantee deते. Private/company code ke liye consumer free tiers avoid karो. Continue.dev jaise local-model tools sabse private (data bahar nahi jaता).',
    performance:
      'Chat models (Claude Opus, GPT-4 class) smart par slow + costly per call; Copilot ka inline model fast + light. UI builders ek prompt mein bohot tokens use karते (poora UI). Cost-sensitive ho to: chhote tasks chhote/local models se, complex tasks bade models se — har tool ka apna token/cost trade-off.',
    tricky: [
      { title: 'Same model, alag tools', explain: 'Cursor aur ChatGPT dono Claude/GPT use kar sakte — par Cursor codebase context auto-deता, ChatGPT sirf typed text. Tool ki value model nahi, integration/context handling hai.', lang: 'js' },
      { title: 'Builder ka limit', code: `// v0/Bolt se UI fast,\n// par complex auth/payment logic\n// production-ready nahi hota — refine zaroori`, explain: 'Builders prototype deते, final product nahi — manually polish karna padता.', lang: 'js' },
    ],
    interview: {
      beginner: [
        { q: 'AI coding tools ki main categories?', a: 'Chat assistants (ChatGPT, Claude, Gemini), IDE tools (Copilot, Cursor, Windsurf), aur UI/app builders (v0, Bolt, Lovable).' },
        { q: 'GitHub Copilot kya karता?', a: 'Editor mein inline code suggestions deता jaise aap type karते ho — Tab dabाkar accept. Fast inline coding ke liye.' },
      ],
      intermediate: [
        { q: 'Cursor aur ChatGPT mein farak?', a: 'Cursor AI-native IDE hai — codebase context auto-include, multi-file edits, agent mode. ChatGPT general chat hai — sirf typed text dekhता, copy-paste workflow.' },
        { q: 'v0/Bolt/Lovable kab use karें?', a: 'Rapid UI/app prototyping ke liye — prompt se poora frontend turant. Production logic ke liye nahi, idea validate karne ke liye.' },
      ],
      advanced: [
        { q: 'Tool ki real value kis cheez se?', a: 'Underlying model nahi, balki context handling + integration + actions se. Jo tool zyada relevant context aur actions (file edit, run) de sake, wo zyada powerful.' },
        { q: 'Existing project ke liye tool kaise chunें?', a: 'Codebase size, privacy needs, workflow (inline vs agentic), team plan, aur language support dekhкर — privacy critical ho to Continue.dev/enterprise plans.' },
      ],
    },
    mcqs: [
      { q: 'GitHub Copilot kis category mein?', options: ['Chat', 'IDE autocomplete', 'UI builder', 'Database'], answer: 1, explain: 'Editor mein inline suggestions.' },
      { q: 'Prompt se poora UI banाne wala tool?', options: ['Copilot', 'v0/Bolt', 'Notepad', 'Git'], answer: 1, explain: 'v0, Bolt, Lovable UI builders.' },
      { q: 'Privacy/local model ke liye?', options: ['ChatGPT free', 'Continue.dev', 'v0', 'Gemini'], answer: 1, explain: 'Open-source, custom/local models.' },
      { q: 'Cursor kya hai?', options: ['Chat app', 'AI-native IDE', 'Database', 'Browser'], answer: 1, explain: 'Codebase-aware AI editor.' },
    ],
    exercises: {
      easy: ['3 tools list karो aur unka type (chat/IDE/builder) likhо.'],
      medium: ['Ek task ke liye 2 alag tools try karके workflow compare karो.'],
      advanced: ['Apne project ke liye ideal tool stack design karो (privacy + workflow ke saath justify).'],
    },
    summary: [
      'Chat: ChatGPT, Claude, Gemini — Q&A, explain.',
      'IDE: Copilot (inline), Cursor/Windsurf (codebase).',
      'Builders: v0, Bolt, Lovable — prompt to UI/app.',
      'Open-source: Continue.dev; Agent: Claude Code.',
      'Tool ki value = context handling + integration.',
      'Right tool for right job — ek tool sab nahi karता.',
    ],
    cheatsheet: [
      { h: 'Kab kaunसa', code: `Seekhna   → Claude/ChatGPT\nInline    → Copilot\nCodebase  → Cursor/Windsurf\nUI fast   → v0/Bolt\nPrivacy   → Continue.dev` },
      { h: 'Types', code: `Chat | IDE | Builder | Agent` },
    ],
    projects: [
      'Apne workflow ke liye tool stack decide karna.',
      'v0/Bolt se ek UI prototype banाna.',
      'Cursor/Windsurf se multi-file feature add karna.',
      'Continue.dev local model setup karna.',
    ],
    advanced:
      'Aage tools **agentic** + **MCP-connected** ho rahe — AI tools/databases/APIs se directly connect (MCP servers), khud actions leta. Claude Code jaise terminal agents poore tasks autonomously complete karते. Future: ek AI agent jo multiple tools orchestrate kare — research, code, test, deploy, sab.',
    quiz: [
      { q: 'Inline editor suggestions kaunसa tool?', options: ['v0', 'GitHub Copilot', 'Bolt', 'Gemini'], answer: 1, explain: 'Copilot inline autocomplete.' },
      { q: 'Bade codebase ke liye best?', options: ['ChatGPT free', 'Cursor/Windsurf', 'Notepad', 'Lovable'], answer: 1, explain: 'AI-native IDEs codebase samajhते.' },
    ],
    related: ['what-is-ai-coding', 'cursor', 'github-copilot', 'windsurf', 'continue-dev', 'claude-code'],
  },

  'what-is-context': {
    overview:
      '**Context** ka matlab — AI jo bhi text "dekh" sakta hai ek request mein: aapka prompt, pichhli baat-cheet, aur diya hua code/docs. AI ka koi "memory" nahi hota apne aap — wo sirf usी context ke aadhар par jawab deता jo aap us moment deते ho. Jitna behtar context, utna behtar output. **Context = AI ko di gayी sारी information**. 🧠',
    why:
      'AI ka output 80% context par depend karता. Vague context = vague/galात code. Existing project mein AI ko relevant code/style dena hi key hai accha output ke liye. Interview mein "context kya hai aur kyun matter karта" foundational concept hai — aage ki sारी techniques (prompting, RAG) isी par tikী hain.',
    concept: [
      { h: 'Context hai kya?', p: 'Wo poora text jo AI ko ek request mein milता — system instructions + aapke messages + code/files. AI sirf yahi "dekh" sakta. Ismें jo nahi, AI ko nahi pata.' },
      { h: 'AI ki "amnesia"', p: 'AI har request fresh start karता — pichhle chats apne aap yaad nahi. Chat apps history dobara bhejте hain (context mein), tabhi continuity lagती. Bina context, AI ko kuch yaad nahi.' },
      { h: 'Kyun matter karता', p: 'Same question, alag context = alag answer. "Bug fix karo" sirf likhne se AI guess karेga; code + error + expected behavior dene se exact fix. Context = quality.', code: `// Weak context:\n"button kaam nahi kar raha, fix karo"\n\n// Strong context:\n"Yeh React button (code paste) onClick par\n state update nahi karता. Expected: count +1.\n Error: nothing happens. Fix?"` },
      { h: 'Context ke parts', p: '**System prompt** (AI ka role/rules), **conversation history** (pichhli baatें), **user message** (current sawal), aur **attached code/docs** (relevant files).' },
    ],
    analogy:
      'AI ek **doctor** jaisा hai jise har baar nayी memory milती 🩺. Agar tum sirf "dard ho raha" bolो to wo guess karेga. Par agar puri history batाo — kahan dard, kab se, kya khaya, reports dikhाo — to sahi diagnosis. Doctor sirf jo tum batाo/dikhाo (context) usी se kaam karता. Adhूrी info = galат ilaaj.',
    workflow: {
      type: 'boxes',
      items: [
        { label: 'System prompt', sub: 'AI ka role/rules', color: '#8B5CF6' },
        { label: 'History', sub: 'Pichhli baatें', color: '#6366F1' },
        { label: 'Your message', sub: 'Current sawal', color: '#3B82F6' },
        { label: 'Code/docs', sub: 'Relevant files', color: '#06B6D4' },
      ],
    },
    syntax: {
      code: `// Context = sab kuch jo AI ko bheja:\n{\n  system: "You are a React expert.",\n  history: [ ...pichhli baatें ],\n  user: "Yeh component refactor karo:",\n  code: "function Card() { ... }"\n}\n// AI in sab ko ek saath dekhкर jawab deता`,
      note: 'Context mein jo daloge, wahi AI use kar sakता — kuch chhoot gaya to AI ko pata nahi.',
    },
    steps: [
      'Soचо AI ko jawab dene ke liye kya-kya info chahिए.',
      'Relevant code, error, aur expected behavior include karो.',
      'Apne project ka style/constraints batाओ (rules).',
      'Sirf zaroori context do — fizool text se AI confuse.',
      'Pichhli baat continue karni ho to history rakhо.',
      'Output check — agar galat, shायद context kam tha → improve.',
    ],
    internals: {
      p: 'Technically AI ke paas state/memory nahi — har API call independent. Tum jo bhejte ho (system + messages), wahi model ke "context window" mein load hota, model usi par predict karता. Chat apps illusion-of-memory deते — wo har baar poori conversation dobara bhejte hain. AI ke liye har request ek naya "page" hai jo tum likhते ho.',
      code: `// Har request mein poora context dobara jaता:\nmessages = [\n  { role: "user", content: "Mera naam Aman" },\n  { role: "assistant", content: "Hi Aman!" },\n  { role: "user", content: "Mera naam kya?" } // AI tabhi jaanega jab upar wala context ho\n]`,
      lang: 'js',
    },
    visual: {
      type: 'timeline',
      items: [
        { year: '1', text: 'Context = AI ko di gayी sारी text (prompt + history + code).' },
        { year: '2', text: 'AI ki apni memory nahi — sirf context se kaam.' },
        { year: '3', text: 'Better context → better output (quality link).' },
        { year: '4', text: 'Context = system + history + message + files.' },
        { year: '5', text: 'Sab techniques (prompting, RAG) context improve karne ke liye.' },
      ],
    },
    examples: [
      { level: 'Beginner', title: 'Context ka asar', code: `// Bina context:\n"function banao"  // AI: kya function? guess\n\n// Context ke saath:\n"JS function banao jo array ka sum nikाle"\n// AI: exact function`, lang: 'js', explain: 'Specific context = specific output.' },
      { level: 'Intermediate', title: 'Code as context', code: `// Code paste karke context do:\n"Yeh function slow hai, optimize karo:\nfunction find(arr, x){ return arr.filter(i=>i===x) }"\n// AI exact code dekhкर suggest karता`, lang: 'js', explain: 'Actual code context = relevant fix.' },
      { level: 'Advanced', title: 'Project context', code: `// "Hum Tailwind + React use karते hain,\n// is style mein ek Card component banao"\n// AI project conventions follow karता`, lang: 'js', explain: 'Style/constraints context se consistency.' },
    ],
    notes: {
      concept: 'Context = AI ko ek request mein di gayी sारी info (sirf yahi wo dekhता).',
      tip: 'Output kharab? Pehle context improve karो, model badalne se pehle.',
      warning: 'AI ki apni memory nahi — jo context mein nahi, wo AI ko pata nahi.',
    },
    mistakes: [
      { bad: 'AI assume karega ki wo project jaanта hai.', fix: 'Relevant code/style explicitly do.' },
      { bad: 'Vague one-line prompts.', fix: 'Goal + code + expected behavior do.' },
      { bad: 'Pichhli baat ka reference bina history.', fix: 'Zaroori history context mein rakho.' },
    ],
    best: [
      'Relevant code, error, aur expected behavior hamesha do.',
      'Project ka style/conventions bataओ (consistency).',
      'Sirf zaroori context — fizool text avoid (confuse + cost).',
      'Specific raho — vague context = vague output.',
      'Output kharab ho to context improve karके dobara.',
    ],
    security:
      'Context mein jo daloge wo AI tak (aur shायद logs/training) jaता — isliye API keys, passwords, real user data, ya secrets mat daalо. Sanitize/dummy data use karो. Enterprise tools data retention off karne deते. Context = exposure surface, isliye sensitive cheez avoid.',
    performance:
      'Context jitna bada, utne zyada **tokens** = zyada cost + slow + context window limit ka risk. "Zyada context = better" nahi — relevant + concise context best. Fizool files bhejne se "lost in middle" (beech ka content miss) aur paisा barbаd. Smart context selection key hai.',
    tricky: [
      { title: 'Memory illusion', code: `// Chat app yaad rakhta lagता,\n// par andar har baar poori history dobara bhejी jaती\n// AI ke liye fresh hai — app context maintain karता`, explain: 'AI ko "yaad" nahi — app/tool context resend karता. Ye samajhना zaroori.', lang: 'js' },
      { title: 'Missing context = guess', explain: 'Agar zaroori detail context mein nahi, AI guess (hallucinate) karेga. Galат output ka root cause aksar incomplete context hota.', lang: 'js' },
    ],
    interview: {
      beginner: [
        { q: 'Context kya hai (AI ke liye)?', a: 'Wo sारी text jo AI ek request mein dekh sakता — system prompt, conversation history, aapka message, aur diya hua code/docs.' },
        { q: 'Context kyun important hai?', a: 'AI ka output context par depend karता. Better/relevant context = better, accurate output. Vague context = vague code.' },
      ],
      intermediate: [
        { q: 'AI ki apni memory hoti hai?', a: 'Nahi. Har request independent hai. Chat apps illusion-of-memory deते — wo poori history dobara context mein bhejte hain.' },
        { q: 'Context ke main parts?', a: 'System prompt (role/rules), conversation history, current user message, aur attached code/files.' },
      ],
      advanced: [
        { q: 'Zyada context dena hamesha accha?', a: 'Nahi. Zyada context = zyada tokens (cost + latency) aur "lost in middle" risk. Relevant + concise context best, sab kuch nahi.' },
        { q: 'Galат AI output ka common root cause?', a: 'Incomplete/missing context — AI ke paas zaroori info nahi to wo guess/hallucinate karता. Pehle context improve karो.' },
      ],
    },
    mcqs: [
      { q: 'Context kya hai?', options: ['AI ki memory', 'AI ko di gayी sारी text', 'AI ka model', 'Internet'], answer: 1, explain: 'Request mein di gayी info.' },
      { q: 'AI ki apni memory?', options: ['Haan, sab yaad', 'Nahi — sirf context', 'Sirf 1 din', 'Internet par'], answer: 1, explain: 'Stateless — context se kaam.' },
      { q: 'Better output ke liye?', options: ['Random prompt', 'Better/relevant context', 'Faster typing', 'Bada model bas'], answer: 1, explain: 'Context quality key.' },
    ],
    exercises: {
      easy: ['Ek vague prompt ko strong context (code+goal) ke saath rewrite karो.'],
      medium: ['Ek bug fix ke liye complete context (code+error+expected) likhо.'],
      advanced: ['Apne project ke style/conventions ka ek reusable context block banaओ.'],
    },
    summary: [
      'Context = AI ko ek request mein di gayी sारी text.',
      'AI ki apni memory nahi — sirf context se kaam (stateless).',
      'Parts: system + history + message + code/files.',
      'Better/relevant context → better output.',
      'Zyada nahi, relevant context best (tokens + lost-in-middle).',
    ],
    cheatsheet: [
      { h: 'Context parts', code: `System + History +\nMessage + Code/Files` },
      { h: 'Rule', code: `No context = AI guesses\nGood context = good output` },
    ],
    projects: [
      'Reusable project-context template banाna.',
      'Bug-report context format design karna (code+error+expected).',
      'AI output quality compare karna vague vs rich context se.',
    ],
    advanced:
      'Aage context ko smartly manage karne ki techniques: **RAG** (relevant docs/code auto-retrieve), **rules files** (project context har baar auto-inject), aur **MCP** (live data context). Goal: AI ko sahi context dynamically dena bina manually paste kiye. Context engineering hi AI development ka core skill ban raha hai.',
    quiz: [
      { q: 'AI sirf kya dekh sakता?', options: ['Internet', 'Diya gaya context', 'Aapka mind', 'Sab files'], answer: 1, explain: 'Sirf context window ki text.' },
      { q: 'Context ka quality se rishtा?', options: ['Koi nahi', 'Better context = better output', 'Ulta', 'Random'], answer: 1, explain: 'Direct relation.' },
    ],
    related: ['tokens-limits', 'context-window', 'project-knowledge', 'make-ai-understand'],
  },

  'tokens-limits': {
    overview:
      '**Tokens** chhote text-pieces hain jinmें AI text ko toड़ता hai — na poore words, na single letters. Roughly **1 token ≈ 4 characters ≈ 0.75 word** (English). AI sab kuch tokens mein "sochता" aur **cost + limits tokens par** based hote. Input tokens (jo aap bhejते) aur output tokens (jo AI deता) — dono count + bill hote. Tokens samajhना = cost aur limits samajhना. 🔢',
    why:
      'AI ki pricing, speed, aur context limits sab tokens par chalती. Bina tokens samajhे aap cost control nahi kar sakte ya samajhoge kyun bada code "fit nahi hua". Interview mein "tokens kya hain, cost kaise" practical question. Production AI apps mein token management = paisा bachाna.',
    concept: [
      { h: 'Token hai kya?', p: 'Text ka chhota piece — word, word ka part, ya symbol. "playing" = "play" + "ing" (2 tokens). AI tokens mein convert karके process karता, words mein nahi.', code: `// "Hello, world!" ≈ 4 tokens:\n// ["Hello", ",", " world", "!"]\n// Code mein bhi: spaces, symbols = tokens` },
      { h: 'Tokenization', p: 'Text ko tokens mein toड़ne ka process. Har model ka apna tokenizer. English efficient (kam tokens), code/non-English zyada tokens leते (varied characters).' },
      { h: 'Input vs Output tokens', p: '**Input** = aapka prompt + context (jo AI ko bheja). **Output** = AI ka jawab. Dono alag count + alag price (output usually mehnga).', code: `// Pricing example (per million tokens):\n// Input:  $5  → aapka prompt\n// Output: $25 → AI ka jawab (mehnga)` },
      { h: 'Tokens = cost', p: 'AI APIs per-token charge karती. Bada prompt + lamba output = zyada tokens = zyada paisा. Cost = (input tokens × input rate) + (output tokens × output rate).' },
      { h: 'Token limits', p: 'Har model ki ek max token capacity (context window) — input+output milакर us limit mein hona chahिए. Zyada to error ya truncate.' },
    ],
    analogy:
      'Tokens AI ke **"shabd-paise"** hain 🪙. Jaise taxi meter distance par chalता, AI meter tokens par. Lamba safar (bada prompt) = zyada kiraya. Aur taxi ki ek max capacity (passengers) hoti — usse zyada nahi baith sakte (token limit). Smart traveler chhota efficient route leता (concise prompt) = kam paisा.',
    workflow: {
      type: 'boxes',
      items: [
        { label: 'Text', sub: 'Prompt + code', color: '#8B5CF6' },
        { label: 'Tokenize', sub: 'Pieces mein toड़', color: '#6366F1' },
        { label: 'Process', sub: 'AI tokens par chalता', color: '#3B82F6' },
        { label: 'Bill', sub: 'Input + output count', color: '#F59E0B' },
      ],
    },
    syntax: {
      code: `// Token estimate (rough):\nconst text = "AI integration is powerful"\n// ~5 words → ~6-7 tokens\n// Rule of thumb:\n// tokens ≈ characters / 4\n// tokens ≈ words × 1.33\n\nconst chars = text.length      // 28\nconst estTokens = Math.ceil(chars / 4)  // ~7`,
      note: 'Exact count tokenizer se; rough estimate ke liye chars/4 ya words×1.33.',
    },
    steps: [
      'Samajhо: text → tokens mein toड़ा jaता (na words, na letters).',
      'Input tokens count: aapka prompt + saara context.',
      'Output tokens count: AI ka jawab.',
      'Cost = (input × rate) + (output × rate).',
      'Bada prompt/output = zyada tokens = zyada cost.',
      'Limit ke andar raho — input+output ek capacity mein.',
      'Concise prompts + focused context se tokens bachаओ.',
    ],
    internals: {
      p: 'Tokenizer ek algorithm hai (jaise BPE — Byte Pair Encoding) jo common character-sequences ko ek token banाता. "the", "ing", " a" jaise frequent patterns ek token; rare words multiple tokens mein toड़te. Model in token-IDs ko numbers ki tरह process karता. Isliye 100 words ≈ 130-140 tokens (English), code aur thoda zyada.',
      code: `// Conceptual tokenization:\n"function" → 1 token (common)\n"xKj9zQ"   → 3-4 tokens (rare/random)\n"नमस्ते"    → zyada tokens (non-English)\n// Common = efficient, rare = costly`,
      lang: 'js',
    },
    visual: {
      type: 'timeline',
      items: [
        { year: '1', text: 'Text aata hai (prompt + code + context).' },
        { year: '2', text: 'Tokenizer pieces mein toड़ता (BPE).' },
        { year: '3', text: 'Input tokens count + bill.' },
        { year: '4', text: 'AI output generate — output tokens count + bill.' },
        { year: '5', text: 'Total cost = input + output tokens × rates.' },
      ],
    },
    examples: [
      { level: 'Beginner', title: 'Token rough count', code: `// "Hello world" → ~2-3 tokens\n// "Hello, world! How are you?" → ~7 tokens\n// Rule: chars / 4 ≈ tokens\nconst t = Math.ceil("Hello world".length / 4) // ~3`, lang: 'js', explain: 'Rough estimate chars/4 se.' },
      { level: 'Intermediate', title: 'Cost calculate', code: `// Input 1000 tokens, output 500 tokens\n// Rate: input $5/M, output $25/M\nconst cost =\n  (1000/1e6)*5 + (500/1e6)*25\n// = 0.005 + 0.0125 = $0.0175`, lang: 'js', explain: 'Input+output alag rate se cost.' },
      { level: 'Advanced', title: 'Token bachana', code: `// Bura: poori 500-line file bhejना\n// Accha: sirf relevant 30 lines\n// → 90% kam tokens = 90% kam cost\n// + faster response`, lang: 'js', explain: 'Focused context = kam tokens.' },
    ],
    notes: {
      concept: 'Token = text ka chhota piece (~4 chars). Cost + limits tokens par.',
      tip: 'Output tokens usually input se mehnge — lamba output cost badhाता.',
      warning: 'Code aur non-English text zyada tokens leте — estimate adjust karो.',
    },
    compare: {
      headers: ['Text', 'Approx tokens', 'Note'],
      rows: [
        ['1 English word', '~1.3 tokens', 'Common words = 1'],
        ['100 words', '~130 tokens', 'English baseline'],
        ['1 page (~500 words)', '~650 tokens', 'Plain text'],
        ['Code (varies)', 'More per char', 'Symbols/indents count'],
      ],
    },
    mistakes: [
      { bad: '1 token = 1 word maanna.', fix: '1 token ≈ 0.75 word / ~4 chars.' },
      { bad: 'Poori files bhejना bina zaroorat.', fix: 'Sirf relevant code → kam tokens.' },
      { bad: 'Output cost ignore karna.', fix: 'Lamba output mehnga — concise maango.' },
    ],
    best: [
      'Concise, focused prompts likho (kam input tokens).',
      'Sirf relevant code/context bhejо (sab kuch nahi).',
      'Lamba output zaroori na ho to "short answer" maango.',
      'Cost-sensitive kaam ke liye chhote/saste models.',
      'Repeated context ke liye caching (jahan available) use karो.',
      'Token count estimate karके cost plan karो.',
    ],
    security:
      'Tokens-level par direct security issue kam, par bada context (zyada tokens) mein galती se secrets/PII chhup sakte — jitna kam context, utna kam exposure. Cost-attack (kisi ne aapke AI feature mein huge prompts bheje to bill badhे) se bachne ke liye input token limits + rate limiting lagाओ.',
    performance:
      'Tokens directly latency aur cost drive karते — zyada tokens = slow response + zyada bill. Output tokens sabse mehnge aur slow (ek-ek generate hote). Optimize: short prompts, focused context, concise output, aur prompt caching (same prefix repeat ho to sasta). Token efficiency = production AI ki #1 cost lever.',
    tricky: [
      { title: 'Code zyada tokens', code: `// Same info, alag tokens:\n// "add a and b" → ~4 tokens\nfunction add(a,b){return a+b}\n// → ~10+ tokens (symbols, braces count)`, output: 'Code costs more', explain: 'Code mein symbols/indentation har ek token banाta — plain text se zyada.', lang: 'js' },
      { title: 'Output dominates cost', explain: 'Aksar output tokens input se mehnge (jaise input $5/M, output $25/M). Lamba AI jawab = bada bill. "Brief" maangना cost bachाता.', lang: 'js' },
    ],
    interview: {
      beginner: [
        { q: 'Token kya hai?', a: 'Text ka chhota piece (word, word-part, ya symbol). Roughly 1 token ≈ 4 characters ≈ 0.75 word. AI tokens mein process karता.' },
        { q: 'Input aur output tokens?', a: 'Input = aapka prompt + context (AI ko bheja). Output = AI ka jawab. Dono alag count aur alag price hote.' },
      ],
      intermediate: [
        { q: 'Tokens cost se kaise judе?', a: 'APIs per-token charge karती. Cost = (input tokens × input rate) + (output tokens × output rate). Output usually mehnga.' },
        { q: 'Tokenization kya hai?', a: 'Text ko tokens mein toड़ne ka process (BPE jaise algorithm). Common patterns 1 token, rare/non-English zyada tokens.' },
      ],
      advanced: [
        { q: 'Code text se zyada tokens kyun leta?', a: 'Symbols, braces, indentation, aur varied characters — har ek alag token. Plain English ke common words 1 token, code mein zyada break.' },
        { q: 'Token cost optimize kaise?', a: 'Concise prompts, focused (relevant-only) context, brief output maangना, sasta model for simple tasks, aur prompt caching repeated prefixes ke liye.' },
      ],
    },
    mcqs: [
      { q: '1 token approx?', options: ['1 word', '~4 characters', '1 letter', '1 sentence'], answer: 1, explain: '~4 chars / 0.75 word.' },
      { q: 'Cost kis par based?', options: ['Lines', 'Tokens (in+out)', 'Time only', 'Files'], answer: 1, explain: 'Input + output tokens.' },
      { q: 'Kaunसe tokens aksar mehnge?', options: ['Input', 'Output', 'Dono same', 'Koi nahi'], answer: 1, explain: 'Output usually higher rate.' },
    ],
    exercises: {
      easy: ['Ek sentence ka rough token count nikाlो (chars/4).'],
      medium: ['Input 2000 + output 800 tokens ka cost calculate karो (given rates).'],
      advanced: ['Ek bada prompt ko 50% kam tokens mein rewrite karके same output lo.'],
    },
    summary: [
      'Token = text ka chhota piece (~4 chars, ~0.75 word).',
      'AI sab tokens mein process karता; cost + limits tokens par.',
      'Input (prompt) + output (jawab) — alag count + price.',
      'Output aksar mehnga; code text se zyada tokens.',
      'Optimize: concise prompts, focused context, brief output.',
    ],
    cheatsheet: [
      { h: 'Estimate', code: `tokens ≈ chars / 4\ntokens ≈ words × 1.33` },
      { h: 'Cost', code: `(in × inRate) + (out × outRate)\noutput usually pricier` },
    ],
    projects: [
      'Token counter utility banाna (rough estimate).',
      'AI feature ka cost estimator banाna.',
      'Prompt ko token-optimize karke cost compare.',
    ],
    advanced:
      'Production mein token management critical: **prompt caching** (repeated context sasta), **streaming** (output token-by-token bhejना — perceived speed), aur **batching** (bulk requests sasta). Smart apps token budgets set karते aur dynamically context trim karते cost control ke liye. Token efficiency = scalable AI ki neev.',
    quiz: [
      { q: 'AI text kaise process karta?', options: ['Words mein', 'Tokens mein', 'Letters mein', 'Lines mein'], answer: 1, explain: 'Tokens (BPE pieces).' },
      { q: 'Kam cost ke liye?', options: ['Bada prompt', 'Concise + focused context', 'Lamba output', 'Sab files'], answer: 1, explain: 'Kam tokens.' },
    ],
    related: ['what-is-context', 'context-window', 'ai-limitations', 'why-use-ai'],
  },

  'context-window': {
    overview:
      '**Context window** = ek model ek baar mein kitne **tokens** dekh/process kar sakता — yani uski "working memory" ka size. Input + output dono isी window mein hone chahिए. Models alag-alag window rakhते (jaise 200K se 1 million tokens tak). Jab conversation/code window se bada ho jaता, AI purani baatें "bhool" jaता ya error aata. **Window = AI ki max attention span**. 🪟',
    why:
      'Context window samajhे bina aap nahi jaanoge kyun AI lambी chat mein "bhool" jaता ya bada codebase "fit nahi hota". Tool/model chunne mein (bada codebase = bada window chahिए) ye decisive hai. Interview mein "AI lambी conversation mein kyun forget karता" — direct context window concept.',
    concept: [
      { h: 'Context window hai kya?', p: 'Max tokens jo model ek request mein consider kar sakta — system prompt + history + message + output, sab isी budget mein. Iske bahar kuch "exist" nahi karता AI ke liye.' },
      { h: 'AI kyun "bhool" jaता', p: 'Jab conversation window se bada ho, sabse purani baatें window se bahar nikал jaती (slide out) — AI unhें ab nahi dekhता, isliye "bhool" jaता.', code: `// Window full hone par:\n// [purani msg] ← drop ho gayi (out of window)\n// [recent msgs] ← AI sirf yeh dekhता\n// Purana reference miss = "amnesia"` },
      { h: 'Sliding window', p: 'Lambी chats mein tools purani messages drop karके nayी fit karते — ek "sliding" window. Recent baat retained, purani lost (jab tak summarize na ho).' },
      { h: 'Context overflow', p: 'Jab content window se zyada ho — ya error ("context length exceeded"), ya auto-truncation (kuch katा jaता). Plan na ho to important info kat sakti.' },
      { h: 'Window vs token limit', p: 'Window total capacity (in+out). Bada window = zyada code/history fit, par zyada tokens = zyada cost + slow. Bada hamesha better nahi.' },
    ],
    analogy:
      'Context window ek **whiteboard** jaisा hai 🖊️. Limited jagah — jab bhar jaता, nayी baat likhne ke liye purani mit̄ानी padती (sliding). AI sirf jo abhi board par hai wahi dekhता; jo mit gaya, "bhool" gaya. Bada whiteboard = zyada yaad, par har baar poora padhna slow + mehnga. Smart developer board par sirf zaroori cheez rakhता.',
    workflow: {
      type: 'boxes',
      items: [
        { label: 'Conversation grows', sub: 'Messages badhते', color: '#8B5CF6' },
        { label: 'Window fills', sub: 'Token limit paas', color: '#F59E0B' },
        { label: 'Old slides out', sub: 'Purani drop', color: '#EF4444' },
        { label: 'AI forgets', sub: 'Out-of-window miss', color: '#6366F1' },
      ],
    },
    syntax: {
      code: `// Window budget (conceptual):\nconst WINDOW = 200000  // tokens (model-specific)\n\nconst used = systemTokens + historyTokens\n             + messageTokens + maxOutputTokens\n\nif (used > WINDOW) {\n  // overflow! → trim history ya summarize\n}\n// input + output dono window mein fit hone chahिए`,
      note: 'Input + reserved output dono window budget mein aane chahिए.',
    },
    steps: [
      'Jaanो apne model ka context window size (tokens).',
      'Total = system + history + message + expected output.',
      'Ye total window ke andar rakho.',
      'Lambी chat mein purani baatें slide out hoti — dhyान rakho.',
      'Zaroori purani info ko summarize karके re-feed karो.',
      'Overflow se bachне ke liye relevant context hi rakhо.',
      'Bada codebase ho to chunk/RAG use karो, sab ek saath nahi.',
    ],
    internals: {
      p: 'Model ka architecture (transformer attention) ek fixed max sequence length par train hota — yahi context window. Har token har dusre token ko "attend" karता (attention), jiska cost length ke saath badhता. Window se bahar tokens model ko diखते hi nahi. "Lost in middle" phenomenon: bohot lambे context mein beech ka content model kam attend karता — start/end better yaad.',
      code: `// Attention: har token sab tokens ko dekhता\n// length² jitna kaam → bada window = bada cost\n// Beyond window = invisible to model\n// Middle content = weaker recall (lost in middle)`,
      lang: 'js',
    },
    architecture: {
      type: 'boxes',
      items: [
        { label: 'System prompt', sub: 'Window start', color: '#8B5CF6' },
        { label: 'History', sub: 'Middle (slides)', color: '#6366F1' },
        { label: 'Current msg', sub: 'Recent', color: '#3B82F6' },
        { label: 'Output reserve', sub: 'Window end', color: '#22C55E' },
      ],
    },
    examples: [
      { level: 'Beginner', title: 'Window full = forget', code: `// Lambी chat:\n"Mera naam Aman" (msg #1)\n... 100 messages baad ...\n"Mera naam kya?" \n// Agar #1 window se bahar → AI bhool gaya`, lang: 'js', explain: 'Purani baat window se nikал jaती.' },
      { level: 'Intermediate', title: 'Summarize to retain', code: `// Window bharne se pehle:\n// purani 50 messages → 1 summary message\nconst summary = "User Aman, React project,\n  Tailwind use, dark mode chahिए"\n// → kam tokens, key info retained`, lang: 'js', explain: 'Summary se important info bachी rehती.' },
      { level: 'Advanced', title: 'Overflow handling', code: `// Bada file + chat = overflow risk\nif (totalTokens > WINDOW * 0.8) {\n  history = trimOldMessages(history)\n  // ya summarize, ya RAG se relevant nikालо\n}`, lang: 'js', explain: 'Proactively trim/summarize overflow se pehle.' },
    ],
    notes: {
      concept: 'Context window = max tokens AI ek baar mein dekh sakता (in+out).',
      tip: 'Lambी chat mein key info summarize karके dobara feed karो.',
      warning: 'Window se bahar = AI ko dikhता hi nahi. "Bhool" yahi hai.',
    },
    compare: {
      headers: ['Window size', 'Kya fit hota', 'Trade-off'],
      rows: [
        ['~200K tokens', 'Bada file + lambी chat', 'Standard, balanced'],
        ['~1M tokens', 'Poora codebase', 'Mehnga + slow'],
        ['Chhota (~8K)', 'Short tasks', 'Sasta, jaldी overflow'],
        ['Bada window', 'Zyada context', 'Lost-in-middle + cost'],
      ],
    },
    mistakes: [
      { bad: 'Bada window = sab problem solve maanna.', fix: 'Bada bhi cost + lost-in-middle deता.' },
      { bad: 'Lambी chat mein purani key info ignore.', fix: 'Summarize karके re-feed.' },
      { bad: 'Poora codebase ek saath bhejना.', fix: 'Chunk/RAG se relevant parts only.' },
    ],
    best: [
      'Apne model ka window size jaanो aur uske andar plan karो.',
      'Lambी chat mein important info summarize + re-feed.',
      'Relevant context hi rakho — window waste mat karो.',
      'Bada codebase chunk ya RAG se handle karो.',
      'Important cheez start/end mein rakho (lost-in-middle se bacho).',
      'Overflow se pehle proactively trim/summarize.',
    ],
    security:
      'Bada context window = zyada data ek jagah — galती se secrets/PII window mein jaa sakte (aur logs/training tak). Lambी chats mein purana sensitive data carry hota reh sakta. Best: sensitive info window mein avoid, aur new task ke liye fresh context (clear chat) start karो taki purana leak na ho.',
    performance:
      'Window jitna bhara, utna slow + mehnga (attention length² scale). Poora window har baar bhejना worst — sirf zaroori tokens rakhо. Lost-in-middle ke kaaran bada context mein quality bhi gir sakti. Prompt caching (stable prefix) aur context trimming se latency + cost dono control. Bada window = tool, na ki default.',
    tricky: [
      { title: 'Bada window ≠ better', explain: '1M window impressive lagता par poora bharना mehnga, slow, aur beech ka content miss (lost in middle). Relevant 10K tokens often 1M raw se behtar output deते.', lang: 'js' },
      { title: 'Silent truncation', code: `// Context > window:\n// kuch tools chupchाp purana kaat deते\n// → AI ko adha context, galат output\n// bina warning ke!`, output: 'Partial context', explain: 'Overflow par auto-truncation important info silently kaat sakti — output galат, root cause chhupा.', lang: 'js' },
    ],
    interview: {
      beginner: [
        { q: 'Context window kya hai?', a: 'Max tokens jo model ek request mein dekh/process kar sakता — uski working memory. Input + output dono isी mein.' },
        { q: 'AI lambी chat mein kyun bhool jaता?', a: 'Conversation window se badi ho jaती to purani messages window se bahar slide out hoti — AI unhें dekh nahi pata, isliye "bhool" jaता.' },
      ],
      intermediate: [
        { q: 'Sliding window kya hai?', a: 'Lambी chat mein nayी messages fit karne ke liye purani drop hoti — window slide karता. Recent retained, purana lost (jab tak summarize na ho).' },
        { q: 'Context overflow handle kaise?', a: 'Purani history trim ya summarize karके re-feed, ya RAG se sirf relevant nikालкर — taki important info window se bahar na jaye.' },
      ],
      advanced: [
        { q: 'Bada context window hamesha behtar?', a: 'Nahi. Bada = zyada cost + latency + "lost in middle" (beech ka content kam attend). Relevant concise context aksar bade raw se behtar.' },
        { q: '"Lost in middle" kya hai?', a: 'Bohot lambे context mein model start aur end better yaad rakhता, beech ka content kam attend karता — isliye important info edges par rakhna behtar.' },
      ],
    },
    mcqs: [
      { q: 'Context window kya measure karता?', options: ['Speed', 'Max tokens ek request mein', 'Files count', 'Cost'], answer: 1, explain: 'Token capacity (in+out).' },
      { q: 'AI lambी chat mein bhoolता kyun?', options: ['Lazy', 'Purani baat window se bahar', 'Slow net', 'Random'], answer: 1, explain: 'Out of window = invisible.' },
      { q: 'Bada window ka downside?', options: ['Koi nahi', 'Cost + lost-in-middle', 'Always best', 'Free'], answer: 1, explain: 'Mehnga + middle miss.' },
    ],
    exercises: {
      easy: ['Apne use kiye AI tool ka context window size pata karो.'],
      medium: ['Ek lambी chat ka summary banaओ jo key info kam tokens mein rakhe.'],
      advanced: ['Ek overflow-handling logic design karो (trim/summarize at 80% window).'],
    },
    summary: [
      'Context window = max tokens model ek baar mein dekhता (in+out).',
      'Window se bahar = AI ko invisible → "bhool" jaता.',
      'Sliding window: lambी chat mein purani drop hoti.',
      'Overflow → error ya silent truncation.',
      'Bada window ≠ better (cost + lost-in-middle).',
      'Manage: summarize, trim, relevant-only, RAG.',
    ],
    cheatsheet: [
      { h: 'Budget', code: `system + history +\nmsg + output ≤ window` },
      { h: 'Forget fix', code: `Summarize old → re-feed\nKeep key info at edges` },
    ],
    projects: [
      'Conversation summarizer banaना (window bachане ke liye).',
      'Token-budget tracker for a chat.',
      'Overflow-safe context manager design karna.',
    ],
    advanced:
      'Window manage karne ki advanced techniques: **summarization/compaction** (purana history auto-summarize), **RAG** (window mein sirf relevant retrieved chunks), **context editing** (stale tool-results clear), aur **prompt caching** (stable prefix sasta). Goal: limited window ka smart use — sab kuch thoosna nahi, sahi cheez dynamically rakhना.',
    quiz: [
      { q: 'Window full hone par purana kya hota?', options: ['Save', 'Slide out (drop)', 'Duplicate', 'Speed up'], answer: 1, explain: 'Sliding window se drop.' },
      { q: 'Important info kahan rakhें?', options: ['Beech mein', 'Start/end (edges)', 'Random', 'Bahar'], answer: 1, explain: 'Lost-in-middle se bachne ko edges.' },
    ],
    related: ['what-is-context', 'tokens-limits', 'project-knowledge', 'ai-limitations'],
  },

  'project-knowledge': {
    overview:
      '**Project knowledge** = aapke project ki wo sारी context jo AI ko har session mein chahिए: tech stack, conventions, folder structure, business rules, aur important decisions. Problem: AI ki memory nahi, aur har naya session "khali dimaag" se shuru. Solution: is knowledge ko **rules files, docs, README, aur memory** mein store karके AI ko har baar feed karna. Taki AI har baar zero se shuru na kare. 📚',
    why:
      'Existing project mein AI tabhi useful jab use project ki "samajh" ho — warna inconsistent, off-style code. Har baar manually sab batाna thakाने wala + token-mehnga. Project knowledge maintain karna = consistent, fast AI help. Ye topic aage ki techniques (rules files, docs strategy, memory, RAG) ka foundation hai.',
    concept: [
      { h: 'Problem: AI ka amnesia', p: 'Har naya session AI fresh start karता — pichhle session ka project knowledge gone. Tum bar-bar "hum React+Tailwind use karते" batाते raho. Inefficient.' },
      { h: 'Solution: store + re-feed', p: 'Project knowledge ko files mein likho (rules, README, docs) aur AI ko har session start par feed karो (manually ya tools auto-inject karें). AI ko "context" wापस milता.' },
      { h: 'Rules files', p: 'Project-specific instructions ek file mein (jaise `.cursorrules`, `CLAUDE.md`, AGENTS.md). AI tool ise auto-padhता har baar — conventions, style, do/don\'t.', code: `// Example rules file (CLAUDE.md):\n# Project Rules\n- Use React + TypeScript + Tailwind\n- Functional components only\n- Naming: PascalCase components\n- No inline styles` },
      { h: 'Docs & README', p: 'Good README + docs = AI ko architecture, setup, conventions ka source. AI inhें padhкर project samajhता. Insaan + AI dono ke liye useful.' },
      { h: 'Memory & re-feeding', p: 'Kuch tools "memory" rakhते (cross-session notes file). Ya tum khud key context har baar re-feed karो. Goal: knowledge persist kare.' },
    ],
    analogy:
      'Socho AI ek **naya freelancer** hai jo roज badal jaता 🧑‍💻. Har naye bande ko poora project samjhाna thakाने wala. Solution: ek **"project handbook"** (rules + docs + README) likh do — naya banda aaye, handbook padhе, turant productive. Bina handbook, har baar scratch se brief karo. Handbook = project knowledge stored.',
    workflow: {
      type: 'boxes',
      items: [
        { label: 'Knowledge', sub: 'Stack, rules, structure', color: '#8B5CF6' },
        { label: 'Store', sub: 'Rules/docs/README', color: '#6366F1' },
        { label: 'Feed to AI', sub: 'Auto/manual inject', color: '#3B82F6' },
        { label: 'Consistent AI', sub: 'Project-aware output', color: '#22C55E' },
      ],
    },
    syntax: {
      code: `// Project knowledge ek rules file mein:\n// CLAUDE.md / .cursorrules / AGENTS.md\n\n# Tech Stack\nReact 18, TypeScript, Tailwind, Vite\n\n# Conventions\n- Functional components + hooks\n- Files: PascalCase.tsx\n- State: useState/Context (no Redux)\n\n# Don't\n- No class components\n- No inline styles`,
      note: 'AI tool ye file har session auto-padhता — project context wापस.',
    },
    steps: [
      'Project ka key knowledge identify karो (stack, rules, structure).',
      'Use ek rules file mein likho (CLAUDE.md / .cursorrules).',
      'README + docs ko clear aur updated rakho.',
      'Session start par AI ko ye context feed karो (auto ya manual).',
      'Important decisions/conventions document karte raho.',
      'AI ka output inconsistent lage to rules update karो.',
      'Tool memory available ho to cross-session notes rakhо.',
    ],
    internals: {
      p: 'Andar se ye sab "context injection" hai — rules file/docs ka text AI ke context window mein har request ke saath bheja jaता (system prompt ya prepended message ki tरह). AI ko lagता project "yaad" hai, par actually tool har baar wo text re-inject karता. Advanced setups RAG use karते — poora docs bhejne ki jagah, relevant chunk dynamically retrieve karके context mein daalते.',
      code: `// Tool internally:\nsystemPrompt = readFile("CLAUDE.md")\n  + "\\n" + userMessage\n// AI har request mein project rules dekhता\n// = persistent project knowledge illusion`,
      lang: 'js',
    },
    visual: {
      type: 'timeline',
      items: [
        { year: '1', text: 'Project knowledge identify (stack, rules, structure).' },
        { year: '2', text: 'Store in files — rules, README, docs.' },
        { year: '3', text: 'AI ko har session feed (auto-inject ya manual).' },
        { year: '4', text: 'AI consistent, project-aware code deता.' },
        { year: '5', text: 'Update knowledge as project evolve — keep fresh.' },
      ],
    },
    folders: {
      note: 'Typical project knowledge files ka structure:',
      tree: `project/\n├── CLAUDE.md          # AI rules + project context\n├── .cursorrules       # Cursor-specific rules\n├── README.md          # Setup + overview\n├── docs/\n│   ├── architecture.md  # System design\n│   ├── conventions.md   # Code style rules\n│   └── decisions.md     # Important choices (ADR)\n└── src/`,
    },
    examples: [
      { level: 'Beginner', title: 'Simple rules file', code: `// CLAUDE.md\n# Use React + Tailwind\n# Functional components only\n# Keep components small\n// → AI in rules ko follow karта`, lang: 'js', explain: 'Basic rules se consistency.' },
      { level: 'Intermediate', title: 'Re-feed context', code: `// Naye session mein paste karो:\n"Reminder: ye React+TS+Tailwind project hai,\n functional components, PascalCase naming.\n Ab is feature pe kaam karें..."`, lang: 'js', explain: 'Manual re-feed jab auto na ho.' },
      { level: 'Advanced', title: 'Decision log (ADR)', code: `// docs/decisions.md\n## Why Context API over Redux\n- App chhota, Redux overkill\n- Context + hooks sufficient\n// → AI future code mein ye respect karता`, lang: 'js', explain: 'Documented decisions AI ko guide karते.' },
    ],
    notes: {
      concept: 'Project knowledge = stack+rules+structure, stored in files, fed to AI each session.',
      tip: 'CLAUDE.md / .cursorrules banaओ — AI auto-padhता, har baar batана nahi padता.',
      warning: 'Stale rules/docs AI ko galат guide karें — updated rakhо.',
    },
    compare: {
      headers: ['Method', 'Kya store', 'Auto-fed?'],
      rows: [
        ['Rules file', 'Conventions, do/don\'t', 'Yes (tool auto-reads)'],
        ['README', 'Setup, overview', 'Partly (if pointed)'],
        ['Docs folder', 'Architecture, decisions', 'On demand / RAG'],
        ['Memory', 'Cross-session notes', 'Tool-dependent'],
      ],
    },
    mistakes: [
      { bad: 'Har session sab manually batana.', fix: 'Rules file banaओ — auto-injected.' },
      { bad: 'README/docs purane chhodna.', fix: 'Project evolve ho to update karो.' },
      { bad: 'Sab knowledge ek huge file mein.', fix: 'Focused files (rules/architecture/decisions).' },
    ],
    best: [
      'Ek rules file (CLAUDE.md/.cursorrules) maintain karो.',
      'README + docs clear, concise, updated rakhо.',
      'Important decisions document karte raho (ADR style).',
      'Knowledge focused files mein toड़ो (ek mega-file nahi).',
      'Project evolve ho to knowledge bhi update karो.',
      'Sensitive info (keys/secrets) knowledge files mein mat daalо.',
    ],
    security:
      'Project knowledge files (rules, docs) version control mein jaती — isliye API keys, passwords, internal URLs, ya secrets unmें mat daalо (leak in repo/AI context). Use placeholders/env references. Public repos mein ye files visible — sensitive architecture detail dene se pehle soचो.',
    performance:
      'Bada rules/docs file har request mein inject hona = zyada tokens (cost + window space). Concise rules rakho — sirf essential. Bade projects mein poora docs bhejने ki jagah RAG (relevant chunk only) zyada efficient. Prompt caching: stable rules file prefix sasta ho jaता agar tool cache support kare.',
    tricky: [
      { title: 'Knowledge ≠ memory', code: `// AI "yaad" nahi rakhता —\n// tool har baar CLAUDE.md re-inject karता\n// Persistence aapke files se aati, AI se nahi`, explain: 'Illusion of memory — actually tool context re-feed karता. File update = AI knowledge update.', lang: 'js' },
      { title: 'Stale knowledge', explain: 'Agar rules/docs purane ho gaye (project badal gaya), AI un purane rules follow karके galात code deगा. Knowledge ko code ke saath sync rakhna zaroori.', lang: 'js' },
    ],
    interview: {
      beginner: [
        { q: 'Project knowledge kya hai?', a: 'Project ki context jo AI ko chahिए — tech stack, conventions, folder structure, rules, decisions — har session feed karne ke liye.' },
        { q: 'AI ko ye har baar kyun dena padता?', a: 'AI ki apni memory nahi — har session fresh. Isliye knowledge files mein store karके har baar feed karte hain.' },
      ],
      intermediate: [
        { q: 'Rules file kya hai?', a: 'Project-specific instructions wali file (CLAUDE.md, .cursorrules) jo AI tool har session auto-padhता — conventions, style, do/don\'t define karti.' },
        { q: 'Project knowledge maintain karne ke methods?', a: 'Rules files, clear README, docs folder (architecture/conventions/decisions), aur tool memory/cross-session notes.' },
      ],
      advanced: [
        { q: 'Project knowledge internally kaise kaam karता?', a: 'Context injection — rules/docs ka text har request mein AI ke context window mein bheja jaता (system prompt jaise). Advanced: RAG se relevant chunk dynamically.' },
        { q: 'Bade project mein knowledge scale kaise?', a: 'Focused files + RAG — poora docs har baar bhejने ki jagah relevant chunk retrieve karके context mein daalна (token + window efficient).' },
      ],
    },
    mcqs: [
      { q: 'Project knowledge kahan store karें?', options: ['AI ki memory', 'Rules/docs/README files', 'Browser', 'Nowhere'], answer: 1, explain: 'Files mein store + re-feed.' },
      { q: 'Rules file ka example?', options: ['index.html', 'CLAUDE.md / .cursorrules', 'style.css', 'data.json'], answer: 1, explain: 'AI rules/conventions file.' },
      { q: 'AI knowledge persist kaise karता?', options: ['Apni memory', 'Tool re-injects files', 'Internet', 'Magic'], answer: 1, explain: 'Context re-injection per request.' },
    ],
    exercises: {
      easy: ['Apne project ke liye ek basic CLAUDE.md rules file banaओ.'],
      medium: ['README ko AI-friendly banaओ (stack + conventions clearly).'],
      advanced: ['Ek decisions.md (ADR) banaओ jisमें 3 architectural choices document hon.'],
    },
    summary: [
      'Project knowledge = stack + rules + structure + decisions.',
      'AI ki memory nahi — knowledge files mein store + re-feed.',
      'Tools: rules files (CLAUDE.md), README, docs, memory.',
      'Internally: context injection (text har request mein).',
      'Updated + focused + sensitive-data-free rakhо.',
      'Foundation for rules files, docs strategy, RAG.',
    ],
    cheatsheet: [
      { h: 'Store', code: `CLAUDE.md  → rules\nREADME     → setup\ndocs/      → architecture` },
      { h: 'Rule', code: `Store once → re-feed each session\nKeep updated + concise` },
    ],
    projects: [
      'Apne project ka complete rules file (CLAUDE.md) likhna.',
      'AI-friendly README + docs structure banaना.',
      'Architecture decision records (ADR) maintain karna.',
      'Cross-session context template design karna.',
    ],
    advanced:
      'Aage ye knowledge management automate hota: **rules files** tool auto-inject karते, **RAG** relevant docs dynamically retrieve karта, **memory systems** cross-session notes rakhते, aur **MCP** live project data (issues, DB schema) AI tak laता. Goal: AI ko hamesha sahi, fresh project context bina manual effort — "context engineering" ka core.',
    quiz: [
      { q: 'AI ko project samajh dene ka best tarीka?', options: ['Bar-bar batana', 'Rules file + docs', 'Kuch nahi', 'Bada model'], answer: 1, explain: 'Stored + auto-fed knowledge.' },
      { q: 'Rules file kab kaam karta?', options: ['Kabhi nahi', 'Har session AI auto-padhता', 'Sirf ek baar', 'Build par'], answer: 1, explain: 'Auto-injected each session.' },
    ],
    related: ['ai-rules-files', 'documentation-strategy', 'project-memory', 'rag-intro', 'what-is-context'],
  },
}
