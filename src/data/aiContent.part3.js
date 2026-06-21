// AI Integration Course — Part 3: AI Tools & Project Structure (slugs cursor → react-ai-integration)
export const aiContentC = {
  "cursor": {
    overview: "**Cursor** ek AI-first code editor hai (VS Code ka fork) jisme AI deeply built-in hai. Tum normal VS Code ki tarah code likhte ho, but **Tab autocomplete**, **Chat (Cmd+L)**, aur **Composer/Agent mode (Cmd+I)** se AI poore project ko samajh kar multi-file changes kar sakta hai. 🚀",
    why: "Normal editor me AI sirf ek plugin hota hai jo limited context dekhta hai. **Cursor** project ke structure, open files, aur tumhare **rules files** ko padhta hai — isliye suggestions zyada accurate aur project-specific hoti hain. Real-world me ye refactoring, bug-fixing aur naye features banane ki speed 2-3x kar deta hai.",
    concept: [
      { h: "Tab Autocomplete", p: "Tum jaise type karte ho, Cursor next line/block predict karta hai. Sirf **Tab** dabao aur accept. Ye multi-line edits aur cursor ko aage jump bhi karwata hai.", code: "function getUser(id) {\n  // type karo: return fetch...\n  // Cursor poora line suggest karega:\n  return fetch(`/api/users/${id}`).then(r => r.json())\n}", lang: "javascript" },
      { h: "Chat (Cmd+L)", p: "Sidebar chat jisme tum question pooch sakte ho. **@-symbols** se context add karo: @file, @folder, @codebase, @docs.", code: "// Chat me:\n@components/Login.jsx is component me email validation add karo", lang: "text" },
      { h: "Composer / Agent Mode (Cmd+I)", p: "Sabse powerful feature. Tum ek instruction do aur Cursor multiple files create/edit karta hai, terminal commands chalata hai, aur khud verify karta hai (agentic loop).", code: "// Composer me:\nEk useAuth hook banao aur use Login + Signup dono me integrate karo", lang: "text" }
    ],
    analogy: "Cursor ek aisa **senior developer pair-programmer** hai jo tumhare bagal me baith kar poora codebase padh chuka hai. Tum bas batao kya chahiye, wo files khol kar, edit kar ke, aur test chala kar de deta hai. 👨‍💻",
    workflow: {
      type: "boxes",
      items: [
        { label: "Instruction likho", sub: "Cmd+I / Cmd+L", color: "#D946EF" },
        { label: "Context add karo", sub: "@file, @codebase", color: "#8B5CF6" },
        { label: "AI plan + edit", sub: "multi-file diff", color: "#EC4899" },
        { label: "Review & Accept", sub: "diff check karo", color: "#22C55E" }
      ]
    },
    syntax: {
      code: "// .cursor/rules/ folder me rule files (.mdc):\n// project-rules.mdc\n---\ndescription: React project coding standards\nglobs: [\"**/*.jsx\", \"**/*.tsx\"]\nalwaysApply: true\n---\n- Functional components aur hooks use karo\n- API calls services/ folder me rakho\n- Tailwind classes use karo, inline style nahi",
      note: "Naya Cursor `.cursor/rules/` folder me `.mdc` files use karta hai. Purana single `.cursorrules` file root me bhi abhi support hota hai (legacy).",
      lang: "yaml"
    },
    steps: [
      "Cursor download karo (cursor.com) aur install karo",
      "Apna React/Vite project Cursor me kholo",
      "Cmd+L se chat kholo, @codebase add kar ke project samjho",
      "Cmd+I se Composer kholo aur ek feature describe karo",
      "Diff review karo aur Accept/Reject karo",
      ".cursor/rules me apne project ke rules likho taaki har baar repeat na karna pade"
    ],
    internals: {
      p: "Cursor tumhare codebase ka **embeddings index** banata hai (semantic search). Jab tum @codebase use karte ho, ye relevant files ko vector similarity se dhoondh kar prompt me daalta hai. Composer mode me ye ek **agent loop** chalata hai: plan → edit → run → observe → repeat.",
      code: "User instruction\n   ↓\nCodebase index (embeddings) → relevant files\n   ↓\nLLM prompt (rules + files + instruction)\n   ↓\nMulti-file diff → terminal run → verify",
      lang: "text"
    },
    visual: {
      type: "timeline",
      items: [
        { year: "2023", text: "Cursor launch — VS Code fork with AI" },
        { year: "2024", text: "Composer (multi-file agent) aaya" },
        { year: "2025", text: ".cursor/rules folder + Agent mode mature" },
        { year: "2026", text: "MCP support + deeper codebase awareness" }
      ]
    },
    folders: {
      note: "Cursor rules ka standard structure — project-specific rules .cursor/rules me rakho:",
      tree: "my-app/\n├── .cursor/\n│   └── rules/\n│       ├── general.mdc        # poore project ke rules\n│       ├── react.mdc          # React-specific (globs: *.jsx)\n│       └── api.mdc            # API/services rules\n├── .cursorrules               # legacy single file (optional)\n├── src/\n│   ├── components/\n│   └── services/\n└── package.json"
    },
    examples: [
      { level: "Beginner", title: "Tab se function complete", code: "// Sirf comment likho, Cursor body bharega:\n// add two numbers\nconst add = (a, b) => a + b", lang: "javascript", explain: "Comment-driven coding — intent likho, AI implementation deta hai." },
      { level: "Intermediate", title: "Chat se refactor", code: "// Cmd+L chat me:\n@utils/format.js is file ke saare functions ko\nnamed exports me convert karo aur JSDoc add karo", lang: "text", explain: "@file se specific file ka context de kar targeted refactor." },
      { level: "Advanced", title: "Composer se full feature", code: "// Cmd+I Composer me:\nDark mode toggle banao:\n1. ThemeContext create karo\n2. useTheme hook banao\n3. App.jsx me provider wrap karo\n4. Navbar me toggle button add karo", lang: "text", explain: "Composer multiple files ek saath bana/edit karta hai — pure agentic workflow." }
    ],
    notes: {
      concept: "Cursor = VS Code + AI ka deep integration. Tab, Chat, Composer — teeno alag use-cases ke liye.",
      tip: "Hamesha pehle @codebase ya @folder de kar AI ko context do — blind suggestions se bachoge.",
      warning: "Composer ke multi-file changes ko bina diff dekhe blindly Accept mat karo — kabhi-kabhi unrelated files bhi touch karta hai.",
      error: "Agar suggestions bekaar aa rahe hain to .cursor/rules check karo — galat ya missing rules quality giraate hain."
    },
    compare: {
      headers: ["Feature", "Cursor", "GitHub Copilot", "Windsurf", "Continue.dev", "Claude Code"],
      rows: [
        ["Type", "AI editor (VS Code fork)", "Plugin", "AI editor", "Open-source plugin", "CLI agent"],
        ["Multi-file agent", "Composer ✅", "Agent mode ✅", "Cascade ✅", "Limited", "Strong ✅"],
        ["Rules file", ".cursor/rules", "instructions", "rules + memories", "config.json", "CLAUDE.md"],
        ["Free option", "Limited free", "Free tier", "Free tier", "Fully free", "Paid (API)"]
      ]
    },
    mistakes: [
      { bad: "Composer ko ek baar me 'sab kuch bana do' bolna", fix: "Chhote, clear steps me break karo — har step verify karo." },
      { bad: "@codebase kabhi use na karna", fix: "Context add karo taaki AI ko project structure pata ho." },
      { bad: "Rules file na likhna aur har prompt me same instructions repeat karna", fix: ".cursor/rules me ek baar likho, har jagah apply hoga." },
      { bad: "AI ke diff ko blindly accept karna", fix: "Har diff padho — galat changes reject karo." }
    ],
    best: [
      "🧠 .cursor/rules me apne coding standards clearly likho",
      "🧠 @-symbols se precise context do (@file > @codebase jab specific ho)",
      "🧠 Composer me task ko numbered steps me describe karo",
      "🧠 Sensitive files (.env) ko .cursorignore me daalo",
      "🧠 Bade refactor se pehle git commit kar lo (safety)",
      "🧠 Diff review ko apni habit banao — trust but verify"
    ],
    security: "🔒 Cursor tumhara code suggestions ke liye servers par bhej sakta hai. **Privacy Mode** on karo taaki code store na ho. **.cursorignore** file me .env, secrets, keys daalo. Enterprise plan me zero data retention aur SOC 2 compliance milta hai. API keys kabhi code me hardcode mat karo.",
    performance: "⚡ Composer (agent) mode mehnga aur slow hota hai — har step ek LLM call hai. Simple completions ke liye Tab (fast, sasta) use karo. Bade @codebase queries token cost badhati hain. Pro plan me fast vs slow request quota hota hai.",
    tricky: [
      { title: "Tab vs Composer kab", code: "// Tab: ek line/block complete karna\nconst sum = arr.reduce(/* Tab yahan */)\n// Composer: poora feature, multiple files", output: "Tab = micro-edits, Composer = macro-changes", explain: "Galat tool choose karna time waste karta hai — chhota kaam Tab se, bada Composer se.", lang: "javascript" },
      { title: "Rules apply na hona", code: "---\nglobs: [\"*.jsx\"]\nalwaysApply: false\n---", output: "Rule sirf tab apply jab matching file open ho", explain: "alwaysApply: false rakha to globs match hona zaroori hai — warna rule ignore hota hai.", lang: "yaml" }
    ],
    interview: {
      beginner: [
        { q: "Cursor kya hai?", a: "Ek AI-first code editor (VS Code fork) jisme Tab autocomplete, Chat aur Composer agent mode built-in hai." },
        { q: "@codebase ka kya kaam hai?", a: "Ye poore project ko semantic search se index kar ke relevant files context me daalta hai." }
      ],
      intermediate: [
        { q: "Cursor rules file kahan rakhte hain aur kyun?", a: ".cursor/rules folder me .mdc files. Isse AI ko project ke coding standards baar-baar batane ki zaroorat nahi padti." },
        { q: "Composer aur Chat me kya farak hai?", a: "Chat sirf jawab/suggestion deta hai; Composer actually multiple files edit/create karta hai aur agentic loop chalata hai." }
      ],
      advanced: [
        { q: "Cursor codebase ko kaise samajhta hai?", a: "Wo files ka embeddings index banata hai aur vector similarity se relevant code retrieve kar ke prompt me bhejta hai (RAG-style)." },
        { q: "Privacy concerns kaise handle karte ho?", a: "Privacy Mode on karo, .cursorignore me secrets daalo, aur enterprise me zero data retention use karo." }
      ]
    },
    mcqs: [
      { q: "Composer/Agent mode kis shortcut se khulta hai?", options: ["Cmd+L", "Cmd+I", "Cmd+K", "Cmd+P"], answer: 1, explain: "Cmd+I Composer/Agent kholta hai; Cmd+L Chat hai." },
      { q: "Naye Cursor me rules kahan rakhte hain?", options: [".cursorrules only", ".cursor/rules/*.mdc", "package.json", "rules.txt"], answer: 1, explain: ".cursor/rules folder me .mdc files modern approach hai." },
      { q: "Sensitive files ko AI se chhupane ke liye?", options: [".gitignore", ".cursorignore", ".env", ".npmignore"], answer: 1, explain: ".cursorignore Cursor ko bata deta hai kya index na kare." }
    ],
    exercises: {
      easy: "Cursor me ek nayi JS file banao aur sirf comments likh kar Tab se 3 functions complete karo.",
      medium: "Apne project me .cursor/rules/react.mdc banao jisme 3 coding rules ho, aur ek component generate karwa kar dekho rules follow hue ya nahi.",
      advanced: "Composer use kar ke ek complete 'Todo' feature banao: context, hook, component aur list — sab files ek hi instruction me."
    },
    summary: [
      "Cursor = VS Code fork with deep AI (Tab, Chat, Composer)",
      "@-symbols se context do: @file, @folder, @codebase, @docs",
      ".cursor/rules me project standards likho (.mdc files)",
      "Composer = multi-file agentic editing",
      "Privacy Mode + .cursorignore se code safe rakho",
      "Tab fast/sasta, Composer powerful/mehnga"
    ],
    cheatsheet: [
      { h: "Chat kholo", code: "Cmd+L (Mac) / Ctrl+L" },
      { h: "Composer/Agent", code: "Cmd+I (Mac) / Ctrl+I" },
      { h: "Inline edit", code: "Cmd+K (selection edit)" },
      { h: "Context add", code: "@file @folder @codebase @docs" }
    ],
    projects: [
      "Cursor se ek React weather app banao (Composer use kar ke)",
      "Existing project me dark mode add karo agent mode se",
      "Ek legacy file ko Chat se modern hooks me refactor karo",
      ".cursor/rules ka full set likho apne style guide ke according"
    ],
    advanced: "🚀 Cursor ab **MCP (Model Context Protocol)** servers support karta hai — isse AI external tools (DB, GitHub, docs) se connect ho sakta hai. Advanced workflow: custom .mdc rules + MCP + Composer agent = poora autonomous dev assistant.",
    quiz: [
      { q: "@codebase aur @file me main difference?", options: ["Koi nahi", "@file specific file, @codebase poora project", "@file slow hai", "@codebase free nahi"], answer: 1, explain: "@file ek file deta hai, @codebase poora project semantic search karta hai." },
      { q: "Composer kis cheez ke liye best hai?", options: ["Single line complete", "Multi-file feature banane", "Syntax highlight", "Theme change"], answer: 1, explain: "Composer multi-file agentic changes ke liye banaya gaya hai." }
    ],
    related: ["github-copilot", "windsurf", "claude-code", "ai-rules-files"]
  },

  "github-copilot": {
    overview: "**GitHub Copilot** Microsoft/GitHub ka AI coding assistant hai jo tumhare editor (VS Code, JetBrains, Neovim) me plugin ki tarah chalta hai. Iska sabse famous feature **inline suggestions** hai — tum type karo, ghost text aata hai, **Tab** se accept. Saath me **Copilot Chat** aur ab **Agent mode** bhi hai. 🤖",
    why: "Copilot sabse pehla mainstream AI coding tool tha aur abhi bhi sabse widely-used. Ye tumhari typing speed badhata hai, boilerplate khatam karta hai, aur naye APIs sikhne me help karta hai — sab tumhare existing editor me bina switch kiye.",
    concept: [
      { h: "Inline Suggestions (Ghost Text)", p: "Jaise tum likhte ho, Copilot grey 'ghost text' me suggestion dikhata hai. **Tab** = accept, **Esc** = reject, **Alt+]** = next suggestion.", code: "// comment se intent batao:\n// function to validate email\nfunction validateEmail(email) {\n  return /^[^@]+@[^@]+\\.[^@]+$/.test(email)\n}", lang: "javascript" },
      { h: "Copilot Chat", p: "Sidebar chat me code explain, fix, test generate karwa sakte ho. **/commands** use karo: /explain, /fix, /tests, /doc.", code: "// Chat me selected code par:\n/tests   → unit tests banao\n/explain → code samjhao\n/fix     → bug theek karo", lang: "text" },
      { h: "Inline Chat & Agent Mode", p: "Cmd+I se inline editing (file ke andar hi). Agent mode (latest) multi-step tasks aur multi-file changes kar sakta hai.", code: "// Inline (Cmd+I):\nis function ko async/await me convert karo", lang: "text" }
    ],
    analogy: "Copilot ek **autocomplete on steroids** hai — jaise phone ka next-word prediction, par poore code blocks ke liye. Wo dekhta hai tum kya likh rahe ho aur agla logical step suggest kar deta hai. ⌨️",
    workflow: {
      type: "boxes",
      items: [
        { label: "Code/comment likho", sub: "intent dikhao", color: "#D946EF" },
        { label: "Ghost text aaya", sub: "suggestion", color: "#8B5CF6" },
        { label: "Tab = accept", sub: "Esc = reject", color: "#EC4899" },
        { label: "Chat se refine", sub: "/fix /tests", color: "#22C55E" }
      ]
    },
    syntax: {
      code: "// .github/copilot-instructions.md\n# Project Instructions\n- React functional components use karo\n- Tailwind se styling, inline CSS nahi\n- API calls ko src/services me rakho\n- TypeScript types har function par",
      note: "VS Code me `.github/copilot-instructions.md` file project-wide instructions deti hai — Copilot har suggestion me inhe dhyan rakhta hai.",
      lang: "markdown"
    },
    steps: [
      "VS Code me 'GitHub Copilot' extension install karo",
      "GitHub account se sign in karo (subscription/free tier zaroori)",
      "File me code/comment likho — ghost text aayega, Tab se accept",
      "Cmd/Ctrl+I se inline chat, ya sidebar Chat kholo",
      "/explain, /fix, /tests jaise commands use karo",
      ".github/copilot-instructions.md me project rules likho"
    ],
    internals: "Copilot background me OpenAI/GitHub ke fine-tuned models (Codex se evolve hue) use karta hai. Ye tumhari **open file**, nearby tabs, aur cursor context ko prompt me bhejta hai aur completion stream karta hai. Chat aur Agent mode me ye tools (file edit, terminal) ka access leta hai aur ab multiple model providers (incl. Claude) choose kar sakte ho.",
    architecture: {
      type: "boxes",
      items: [
        { label: "Editor context", sub: "open file + tabs", color: "#3B82F6" },
        { label: "Copilot service", sub: "model inference", color: "#8B5CF6" },
        { label: "Suggestion", sub: "ghost text / chat", color: "#EC4899" },
        { label: "Accept/Edit", sub: "you decide", color: "#22C55E" }
      ]
    },
    visual: {
      type: "timeline",
      items: [
        { year: "2021", text: "Copilot launch — inline suggestions" },
        { year: "2022", text: "General availability" },
        { year: "2023", text: "Copilot Chat aaya" },
        { year: "2024", text: "Multi-model + workspace context" },
        { year: "2025", text: "Agent mode + multi-file edits" }
      ]
    },
    examples: [
      { level: "Beginner", title: "Comment se code", code: "// reverse a string\nfunction reverse(str) {\n  return str.split('').reverse().join('')\n}", lang: "javascript", explain: "Comment likho, Copilot poora function ghost text me suggest karta hai." },
      { level: "Intermediate", title: "Chat /tests", code: "// Select karo function, phir Chat me:\n/tests\n// Copilot Jest/Vitest tests bana dega", lang: "text", explain: "/commands se specific tasks — tests, docs, explanation." },
      { level: "Advanced", title: "Agent mode multi-file", code: "// Copilot Chat (Agent):\n#codebase ek login page banao with\nform validation aur error handling", lang: "text", explain: "Agent mode #codebase context le kar multiple files edit karta hai." }
    ],
    notes: {
      concept: "Copilot ka core = inline ghost-text suggestions, plus Chat aur Agent mode.",
      tip: "Achhe comments likho — better comment = better suggestion. Copilot intent comments se sabse accurate hota hai.",
      warning: "Copilot kabhi-kabhi confidently galat ya outdated code suggest karta hai — hamesha verify karo.",
      error: "Suggestions nahi aa rahe? Check: sign-in active hai, subscription valid hai, aur file type supported hai."
    },
    compare: {
      headers: ["Feature", "GitHub Copilot", "Cursor", "Windsurf", "Continue.dev", "Claude Code"],
      rows: [
        ["Form", "Editor plugin", "Standalone editor", "Standalone editor", "Plugin (OSS)", "CLI"],
        ["Inline suggest", "Best-in-class ✅", "Good ✅", "Good ✅", "Yes", "N/A (CLI)"],
        ["Instructions file", "copilot-instructions.md", ".cursor/rules", "rules/memories", "config.json", "CLAUDE.md"],
        ["Model choice", "Multi (incl Claude)", "Multi", "Multi", "Any (local too)", "Claude"]
      ]
    },
    mistakes: [
      { bad: "Vague comment likhna jaise '// do stuff'", fix: "Specific intent likho: '// validate email with regex'." },
      { bad: "Pehli suggestion blindly accept karna", fix: "Alt+] se alternatives dekho, best choose karo." },
      { bad: "Project instructions na set karna", fix: ".github/copilot-instructions.md me standards likho." },
      { bad: "Sensitive logic Copilot par chhodna bina review", fix: "Security/auth code hamesha manually verify karo." }
    ],
    best: [
      "🧠 Intent-rich comments likho — quality directly suggestion par depend karti hai",
      "🧠 /explain se unfamiliar code samjho",
      "🧠 /tests se quick unit tests generate karo",
      "🧠 copilot-instructions.md me project rules rakho",
      "🧠 Alt+] / Alt+[ se suggestions cycle karo",
      "🧠 Generated code ko hamesha review + test karo"
    ],
    security: "🔒 Copilot tumhare code snippets ko suggestions ke liye GitHub servers par bhejta hai. **Business/Enterprise** plans me code retention nahi hota aur tumhara code training me use nahi hota. Content exclusion settings se sensitive repos/files block kar sakte ho. Free/Individual me telemetry zyada hoti hai — secrets wali files avoid karo.",
    performance: "⚡ Inline suggestions fast hote hain (low latency, optimized). Chat aur Agent mode slower aur token-heavy hain. Bade files par context window limit hit ho sakti hai. Latency network par depend karti hai.",
    tricky: [
      { title: "Ghost text accept partial", code: "// Tab = full accept\n// Cmd+Right = word-by-word accept", output: "Poora ya partial accept kar sakte ho", explain: "Pura suggestion na chahiye to word-by-word accept karo — control milta hai.", lang: "text" },
      { title: "Suggestion stuck/repeat", code: "// Esc dabao, thoda aur context likho", output: "Naya context = nayi suggestion", explain: "Copilot context-driven hai — context badlo to suggestion improve hoti hai.", lang: "text" }
    ],
    interview: {
      beginner: [
        { q: "GitHub Copilot kya hai?", a: "Ek AI coding assistant plugin jo inline suggestions, chat aur agent mode editor me deta hai." },
        { q: "Suggestion accept kaise karte hain?", a: "Tab se full accept; Esc se reject; Alt+] se next alternative." }
      ],
      intermediate: [
        { q: "Copilot Chat ke /commands batao", a: "/explain, /fix, /tests, /doc — ye specific tasks ke liye shortcuts hain." },
        { q: "Project-wide instructions kaise dete ho?", a: ".github/copilot-instructions.md file me likhte hain." }
      ],
      advanced: [
        { q: "Copilot context kaise build karta hai?", a: "Open file, nearby tabs, aur cursor ke aas-paas ka code prompt me bhejta hai; Agent mode me #codebase bhi." },
        { q: "Enterprise me privacy kaise ensure hoti hai?", a: "Business/Enterprise plans me code retention off, no-training guarantee, aur content exclusion." }
      ]
    },
    mcqs: [
      { q: "Inline suggestion accept karne ki key?", options: ["Enter", "Tab", "Space", "Cmd+S"], answer: 1, explain: "Tab full suggestion accept karta hai." },
      { q: "Tests generate karne ka command?", options: ["/explain", "/fix", "/tests", "/run"], answer: 2, explain: "/tests Copilot Chat me unit tests banata hai." },
      { q: "Project instructions file?", options: [".cursorrules", "copilot-instructions.md", "CLAUDE.md", "config.json"], answer: 1, explain: ".github/copilot-instructions.md Copilot ke liye standard hai." }
    ],
    exercises: {
      easy: "Ek JS file me 5 utility functions sirf comments likh kar Copilot se generate karwao.",
      medium: "Copilot Chat ke /tests command se kisi ek function ke unit tests banwao aur run karo.",
      advanced: ".github/copilot-instructions.md likho aur ek component generate karwa kar verify karo ki instructions follow hue."
    },
    summary: [
      "Copilot = editor plugin with inline ghost-text suggestions",
      "Tab = accept, Esc = reject, Alt+] = next",
      "Copilot Chat me /explain /fix /tests /doc commands",
      "Agent mode multi-file changes kar sakta hai",
      "copilot-instructions.md se project rules",
      "Enterprise plan me code privacy guaranteed"
    ],
    cheatsheet: [
      { h: "Accept", code: "Tab" },
      { h: "Next suggestion", code: "Alt+] / Alt+[" },
      { h: "Inline chat", code: "Cmd+I / Ctrl+I" },
      { h: "Chat commands", code: "/explain /fix /tests /doc" }
    ],
    projects: [
      "Copilot se ek REST API client banao (comment-driven)",
      "Existing functions ke liye /tests se test suite banao",
      "Ek React form Copilot Chat se validation ke saath banwao",
      "copilot-instructions.md likh kar team style enforce karo"
    ],
    advanced: "🚀 Copilot ab **multiple models** (GPT, Claude, Gemini) choose karne deta hai aur **Agent mode** me autonomous multi-file edits karta hai. Advanced: custom instructions + #codebase + agent = bada feature ek prompt me. MCP integration bhi aa raha hai.",
    quiz: [
      { q: "Copilot ka sabse core feature?", options: ["Theme", "Inline suggestions", "Git", "Debugger"], answer: 1, explain: "Inline ghost-text suggestions Copilot ki pehchaan hai." },
      { q: "Better suggestions ke liye sabse important?", options: ["Fast internet", "Achhe comments/context", "Dark theme", "Big monitor"], answer: 1, explain: "Intent-rich comments aur context quality decide karte hain." }
    ],
    related: ["cursor", "windsurf", "continue-dev", "claude-code"]
  },

  "windsurf": {
    overview: "**Windsurf** (pehle Codeium) ek AI-powered code editor hai jiska star feature **Cascade** hai — ek agentic flow jo poore project ko samajh kar multi-file changes karta hai. Iska **Memories** feature project context ko sessions ke beech yaad rakhta hai. 🌊",
    why: "Windsurf ka focus 'agentic' workflow par hai — tum high-level goal do, Cascade khud files dhoondhta hai, edit karta hai, commands chalata hai aur verify karta hai. Memories ki wajah se tumhe baar-baar same context dene ki zaroorat nahi padti.",
    concept: [
      { h: "Cascade (Agentic Flow)", p: "Windsurf ka core agent. Tum ek task batao, Cascade automatically relevant files dhoondh kar coordinated multi-file changes karta hai aur reasoning dikhata hai.", code: "// Cascade me:\nUser profile page banao — component, route\naur API call sab handle karo", lang: "text" },
      { h: "Memories", p: "Project ke important facts (architecture, conventions) yaad rakhta hai. Manually add kar sakte ho ya Cascade auto-generate karta hai. Sessions ke beech persist hota hai.", code: "// Memory example:\n'Is project me saare API calls\nsrc/api/ folder me axios se hote hain'", lang: "text" },
      { h: "Multi-file Editing", p: "Cascade ek hi task me kayi files create/edit kar sakta hai aur changes ko coherent rakhta hai (imports, references sab update).", code: "// Ek instruction → multiple files:\n- components/Profile.jsx (new)\n- api/user.js (edit)\n- App.jsx (route add)", lang: "text" }
    ],
    analogy: "Windsurf ka Cascade ek **project manager + developer** combo hai jo na sirf code likhta hai, balki yaad bhi rakhta hai ki project kaise kaam karta hai (Memories). Tum direction do, wo poora journey handle karta hai. 🧭",
    workflow: {
      type: "boxes",
      items: [
        { label: "Goal batao", sub: "high-level", color: "#D946EF" },
        { label: "Cascade explore", sub: "files dhoondhe", color: "#8B5CF6" },
        { label: "Multi-file edit", sub: "coordinated", color: "#EC4899" },
        { label: "Verify + Memory", sub: "context save", color: "#22C55E" }
      ]
    },
    syntax: {
      code: "// .windsurfrules (project root)\n# Windsurf Rules\n- React + Vite project\n- Functional components only\n- State: Context API + useReducer\n- Styling: Tailwind CSS\n- API: src/api/ me axios instances",
      note: "Windsurf `.windsurfrules` file (root me) se project rules leta hai, aur Memories runtime context store karti hai.",
      lang: "markdown"
    },
    steps: [
      "Windsurf download karo (windsurf.com / Codeium se) aur install karo",
      "Project kholo aur sign in karo",
      "Cascade panel kholo (right side)",
      "High-level task describe karo, Cascade ka plan review karo",
      "Multi-file diff accept/reject karo",
      ".windsurfrules likho + important facts Memories me add karo"
    ],
    internals: "Cascade ek **agent loop** chalata hai: codebase analyze → plan banao → files edit → terminal run → results dekho → repeat. Memories ek persistent store hai jo relevant facts ko future prompts me inject karta hai (RAG-like). Windsurf bhi codebase ka semantic index banata hai.",
    architecture: {
      type: "boxes",
      items: [
        { label: "Codebase index", sub: "semantic", color: "#3B82F6" },
        { label: "Cascade agent", sub: "plan + act", color: "#8B5CF6" },
        { label: "Memories", sub: "persistent context", color: "#14B8A6" },
        { label: "Multi-file diff", sub: "review", color: "#22C55E" }
      ]
    },
    visual: {
      type: "timeline",
      items: [
        { year: "2022", text: "Codeium launch (free AI autocomplete)" },
        { year: "2024", text: "Windsurf editor + Cascade agent" },
        { year: "2025", text: "Memories + deeper multi-file flows" },
        { year: "2026", text: "MCP + advanced agentic tasks" }
      ]
    },
    examples: [
      { level: "Beginner", title: "Cascade se simple component", code: "// Cascade:\nEk Button component banao with\nvariant (primary/secondary) prop", lang: "text", explain: "Single goal se Cascade component bana deta hai." },
      { level: "Intermediate", title: "Memory add karna", code: "// Cascade me:\n'Remember: forms ke liye react-hook-form\nuse karte hain is project me'", lang: "text", explain: "Memory persist hoti hai — future me forms wale tasks me auto-use hoga." },
      { level: "Advanced", title: "Full feature flow", code: "// Cascade:\nComments feature add karo:\n- API endpoint, model\n- CommentList + CommentForm\n- existing PostPage me integrate", lang: "text", explain: "Cascade poora feature multiple coordinated files me banata hai." }
    ],
    notes: {
      concept: "Windsurf = AI editor with Cascade (agent) + Memories (persistent context).",
      tip: "Important architecture decisions Memories me daalo — Cascade har baar consistent rahega.",
      warning: "Cascade autonomous hai — bade changes se pehle git commit karo aur diff dhyan se padho.",
      error: "Cascade galat files touch kar raha hai? Memories aur .windsurfrules me clearer constraints add karo."
    },
    compare: {
      headers: ["Feature", "Windsurf", "Cursor", "GitHub Copilot", "Continue.dev", "Claude Code"],
      rows: [
        ["Agent", "Cascade ✅", "Composer ✅", "Agent mode ✅", "Limited", "Strong ✅"],
        ["Memory", "Memories ✅", "rules only", "instructions", "config", "CLAUDE.md"],
        ["Form", "Editor", "Editor", "Plugin", "Plugin (OSS)", "CLI"],
        ["Free tier", "Yes (good)", "Limited", "Free tier", "Fully free", "Paid (API)"]
      ]
    },
    mistakes: [
      { bad: "Cascade ko bina constraints ke bada task dena", fix: "Scope clear karo + Memories/.windsurfrules me boundaries set karo." },
      { bad: "Memories na use karna", fix: "Architecture facts add karo — repeated context se bachoge." },
      { bad: "Multi-file diff bina dekhe accept", fix: "Har file ka change review karo." },
      { bad: "Galat ya purani Memory rehne dena", fix: "Outdated memories delete/update karo warna AI confuse hoga." }
    ],
    best: [
      "🧠 Cascade ko clear, scoped goals do",
      "🧠 Architecture + conventions Memories me store karo",
      "🧠 .windsurfrules me coding standards likho",
      "🧠 Bade changes se pehle commit karo",
      "🧠 Cascade ka reasoning/plan padho phir accept karo",
      "🧠 Outdated memories ko regularly clean karo"
    ],
    security: "🔒 Windsurf code analysis ke liye servers use karta hai. Enterprise/Teams plan me zero data retention aur self-hosted options milte hain. Secrets aur .env ko ignore config me daalo. Free tier me telemetry hoti hai — sensitive proprietary code ke liye enterprise prefer karo.",
    performance: "⚡ Cascade agentic flow token-heavy aur slow ho sakta hai (multiple steps). Simple autocomplete fast hai. Memories context ko efficient rakhti hai par bahut zyada/stale memories prompt bloat kar sakti hain — concise rakho.",
    tricky: [
      { title: "Memory vs Rules", code: "// .windsurfrules = static project rules\n// Memories = dynamic, runtime facts", output: "Dono complement karte hain", explain: "Rules fixed standards ke liye, Memories evolving project knowledge ke liye.", lang: "text" },
      { title: "Cascade scope creep", code: "// Galat: 'app improve karo'\n// Sahi: 'Navbar me search bar add karo'", output: "Specific = focused changes", explain: "Vague goal Cascade ko bahut saari files touch karwa deta hai — specific raho.", lang: "text" }
    ],
    interview: {
      beginner: [
        { q: "Windsurf kya hai?", a: "Codeium ka AI editor jisme Cascade agent aur Memories feature hai." },
        { q: "Cascade kya karta hai?", a: "Ye ek agentic flow hai jo project samajh kar coordinated multi-file changes karta hai." }
      ],
      intermediate: [
        { q: "Memories feature kyun useful hai?", a: "Ye project context (architecture, conventions) sessions ke beech yaad rakhta hai, repeated explanation ki zaroorat nahi." },
        { q: ".windsurfrules aur Memories me farak?", a: ".windsurfrules static project rules; Memories dynamic runtime facts jo persist hote hain." }
      ],
      advanced: [
        { q: "Cascade internally kaise kaam karta hai?", a: "Agent loop: analyze → plan → edit → run → observe → repeat, codebase index + memories ko context me le kar." },
        { q: "Multi-file consistency kaise maintain hoti hai?", a: "Cascade related files (imports, references, routes) ek saath update karta hai taaki code coherent rahe." }
      ]
    },
    mcqs: [
      { q: "Windsurf ka agentic feature kaunsa hai?", options: ["Composer", "Cascade", "Copilot", "Memory"], answer: 1, explain: "Cascade Windsurf ka agentic flow feature hai." },
      { q: "Project context persist karne wala feature?", options: ["Rules", "Memories", "Index", "Cache"], answer: 1, explain: "Memories sessions ke beech context yaad rakhti hain." },
      { q: "Windsurf pehle kis naam se tha?", options: ["Cursor", "Codeium", "Tabnine", "Kite"], answer: 1, explain: "Windsurf, Codeium ka evolution hai." }
    ],
    exercises: {
      easy: "Windsurf me Cascade se ek simple Card component banao.",
      medium: "Ek Memory add karo (jaise 'forms react-hook-form se') aur phir ek form banwa kar dekho ki AI use karta hai ya nahi.",
      advanced: "Cascade se ek complete CRUD feature (list, add, edit, delete) banao aur multi-file diff review karo."
    },
    summary: [
      "Windsurf = AI editor (Codeium se evolved)",
      "Cascade = agentic multi-file flow",
      "Memories = persistent project context",
      ".windsurfrules = static project rules",
      "Free tier strong, enterprise me ZDR",
      "Specific goals do — scope creep se bacho"
    ],
    cheatsheet: [
      { h: "Cascade panel", code: "right sidebar / shortcut" },
      { h: "Rules file", code: ".windsurfrules (root)" },
      { h: "Add memory", code: "Cascade: 'Remember: ...'" },
      { h: "Autocomplete", code: "Tab to accept" }
    ],
    projects: [
      "Windsurf se ek notes app banao Cascade use kar ke",
      "Apne project ki architecture Memories me document karo",
      "Ek existing feature ko Cascade se refactor karo",
      "CRUD dashboard multi-file flow se banao"
    ],
    advanced: "🚀 Windsurf MCP servers support karta hai jisse Cascade external tools (DB, APIs, docs) se connect ho sakta hai. Advanced workflow: rich Memories + .windsurfrules + MCP = ek autonomous agent jo poora project samjhe.",
    quiz: [
      { q: "Cascade ka primary kaam?", options: ["Syntax highlight", "Agentic multi-file changes", "Git push", "Theme"], answer: 1, explain: "Cascade agentic multi-file editing karta hai." },
      { q: "Memories ka fayda?", options: ["Faster typing", "Context persist between sessions", "Free credits", "Dark mode"], answer: 1, explain: "Memories project context ko sessions ke beech yaad rakhti hain." }
    ],
    related: ["cursor", "github-copilot", "claude-code", "ai-friendly-structure"]
  },

  "continue-dev": {
    overview: "**Continue.dev** ek **open-source** AI coding assistant hai jo VS Code aur JetBrains me plugin ki tarah chalta hai. Iski sabse badi baat: tum **koi bhi model** use kar sakte ho — OpenAI, Anthropic Claude, ya local models (Ollama) — aur sab kuch **config.json** se control hota hai. 🔓",
    why: "Jab tumhe full control chahiye — privacy ke liye local models (Ollama), cost control ke liye apni API keys, ya customization — tab Continue.dev best hai. Fully free aur open-source, koi vendor lock-in nahi. @codebase se project awareness bhi milti hai.",
    concept: [
      { h: "config.json (ya config.yaml)", p: "Sab kuch yahan configure hota hai — models, context providers, slash commands, embeddings. Apni API keys aur providers add karo.", code: "{\n  \"models\": [{\n    \"title\": \"Claude\",\n    \"provider\": \"anthropic\",\n    \"model\": \"claude-opus-4-8\",\n    \"apiKey\": \"YOUR_KEY\"\n  }]\n}", lang: "json" },
      { h: "Custom / Local Models (Ollama)", p: "Local model chala kar fully offline aur private kaam karo — koi data bahar nahi jata.", code: "{\n  \"models\": [{\n    \"title\": \"Local Llama\",\n    \"provider\": \"ollama\",\n    \"model\": \"llama3\"\n  }]\n}", lang: "json" },
      { h: "@codebase Project Awareness", p: "Chat me @codebase use karo — Continue project ko index kar ke relevant code retrieve karta hai (RAG).", code: "// Chat me:\n@codebase auth logic kahan handle hota hai?", lang: "text" }
    ],
    analogy: "Continue.dev ek **DIY AI assistant kit** hai. Cursor/Copilot ready-made cars hain; Continue tumhe parts deta hai — engine (model) tum choose karo, settings (config) tum tune karo. Maximum freedom, thoda setup. 🛠️",
    workflow: {
      type: "boxes",
      items: [
        { label: "config setup", sub: "model + keys", color: "#D946EF" },
        { label: "Context do", sub: "@codebase @file", color: "#8B5CF6" },
        { label: "Chat / Edit", sub: "Cmd+L / Cmd+I", color: "#EC4899" },
        { label: "Apply diff", sub: "review", color: "#22C55E" }
      ]
    },
    syntax: {
      code: "// .continue/config.json\n{\n  \"models\": [\n    { \"title\": \"Claude\", \"provider\": \"anthropic\",\n      \"model\": \"claude-opus-4-8\", \"apiKey\": \"sk-...\" },\n    { \"title\": \"Local\", \"provider\": \"ollama\", \"model\": \"llama3\" }\n  ],\n  \"contextProviders\": [\n    { \"name\": \"codebase\" },\n    { \"name\": \"folder\" }\n  ],\n  \"embeddingsProvider\": { \"provider\": \"ollama\", \"model\": \"nomic-embed-text\" }\n}",
      note: "config.json (ya config.yaml) Continue ka dil hai — models, context providers aur embeddings sab yahan define hote hain. .continue/ folder me rehta hai.",
      lang: "json"
    },
    steps: [
      "VS Code me 'Continue' extension install karo",
      "Continue panel kholo (sidebar)",
      "config.json me apna model + API key add karo (ya Ollama local)",
      "Cmd/Ctrl+L se chat, @codebase add kar ke poochho",
      "Cmd/Ctrl+I se inline edit karo",
      "Slash commands aur context providers customize karo"
    ],
    internals: "Continue codebase ka **embeddings index** banata hai (embeddingsProvider config se). @codebase query par ye semantic search kar ke relevant chunks retrieve karta hai (RAG) aur chosen model ko prompt bhejta hai. Sab kuch client-side configurable — model API, embeddings, context providers tum decide karte ho.",
    architecture: {
      type: "boxes",
      items: [
        { label: "config.json", sub: "models + providers", color: "#3B82F6" },
        { label: "Embeddings index", sub: "codebase", color: "#14B8A6" },
        { label: "Context providers", sub: "@codebase @file", color: "#8B5CF6" },
        { label: "Chosen LLM", sub: "cloud/local", color: "#22C55E" }
      ]
    },
    visual: {
      type: "timeline",
      items: [
        { year: "2023", text: "Continue.dev open-source launch" },
        { year: "2024", text: "config-driven multi-model + @codebase" },
        { year: "2025", text: "config.yaml, assistants, MCP support" },
        { year: "2026", text: "Mature local-first + custom workflows" }
      ]
    },
    folders: {
      note: "Continue ka config .continue/ folder me rehta hai:",
      tree: "my-app/\n├── .continue/\n│   ├── config.json        # models, providers, embeddings\n│   └── config.yaml        # (alternative format)\n├── src/\n│   ├── components/\n│   └── services/\n└── package.json"
    },
    examples: [
      { level: "Beginner", title: "Claude model add karna", code: "{\n  \"models\": [{\n    \"title\": \"Claude\",\n    \"provider\": \"anthropic\",\n    \"model\": \"claude-opus-4-8\",\n    \"apiKey\": \"sk-...\"\n  }]\n}", lang: "json", explain: "config me model + key daal kar koi bhi provider use karo." },
      { level: "Intermediate", title: "@codebase se query", code: "// Chat me:\n@codebase user authentication\nkis file me handle hota hai?", lang: "text", explain: "@codebase project ko index kar ke relevant file dhoondh deta hai." },
      { level: "Advanced", title: "Local + cloud mix", code: "{\n  \"models\": [\n    { \"title\": \"Fast Local\", \"provider\": \"ollama\", \"model\": \"llama3\" },\n    { \"title\": \"Smart Cloud\", \"provider\": \"anthropic\", \"model\": \"claude-opus-4-8\" }\n  ]\n}", lang: "json", explain: "Simple tasks local model se (free/private), complex cloud se — best of both." }
    ],
    notes: {
      concept: "Continue.dev = open-source, config-driven, any-model AI assistant.",
      tip: "Local Ollama models use karo privacy + zero cost ke liye; complex tasks ke liye Claude switch karo.",
      warning: "config.json me API keys plain text me hoti hain — usse git me commit mat karo (.gitignore me daalo).",
      error: "@codebase kaam nahi kar raha? embeddingsProvider config check karo — wo index banane ke liye zaroori hai."
    },
    compare: {
      headers: ["Feature", "Continue.dev", "Cursor", "GitHub Copilot", "Windsurf", "Claude Code"],
      rows: [
        ["Open-source", "Yes ✅", "No", "No", "No", "No"],
        ["Local models", "Yes (Ollama) ✅", "Limited", "No", "Limited", "No"],
        ["Config", "config.json/yaml", ".cursor/rules", "instructions", "rules", "CLAUDE.md"],
        ["Cost", "Free (your keys)", "Subscription", "Subscription", "Free tier", "API cost"]
      ]
    },
    mistakes: [
      { bad: "config.json (with keys) ko git me commit karna", fix: ".gitignore me .continue/config.json daalo, ya env vars use karo." },
      { bad: "embeddingsProvider set na karna", fix: "@codebase ke liye embeddings model configure karo." },
      { bad: "Har task ke liye sirf ek model", fix: "Local + cloud models mix karo task ke according." },
      { bad: "Context providers ignore karna", fix: "@codebase, @folder, @docs se relevant context do." }
    ],
    best: [
      "🧠 Local models (Ollama) privacy aur cost ke liye use karo",
      "🧠 API keys env vars / secrets me rakho, config me hardcode nahi",
      "🧠 embeddingsProvider configure karo for @codebase",
      "🧠 Multiple models add karo aur task ke hisaab se switch karo",
      "🧠 Context providers (@codebase, @folder) actively use karo",
      "🧠 Custom slash commands se repetitive tasks automate karo"
    ],
    security: "🔒 Continue ka sabse bada plus: **local models (Ollama)** se code kahin bahar nahi jata — full privacy. Cloud models use karo to data unke provider par jata hai. config.json me API keys plain hoti hain — .gitignore me daalo aur env vars prefer karo. Open-source hone se code auditable hai.",
    performance: "⚡ Local models hardware par depend karte hain (GPU = fast, CPU = slow). Cloud models fast par paid. @codebase indexing pehli baar time leti hai. Embeddings local rakho to repeated indexing fast aur free hoti hai.",
    tricky: [
      { title: "Provider name galat", code: "// Galat: \"provider\": \"claude\"\n// Sahi:  \"provider\": \"anthropic\"", output: "Galat provider = model load fail", explain: "Har provider ka exact name config me sahi hona chahiye warna model nahi chalega.", lang: "json" },
      { title: "Local vs cloud switch", code: "// UI me model dropdown se switch karo\n// ya config me 'title' choose karo", output: "Same chat, alag model", explain: "Continue runtime par model switch karne deta hai — flexibility milti hai.", lang: "text" }
    ],
    interview: {
      beginner: [
        { q: "Continue.dev kya hai?", a: "Ek open-source AI coding assistant plugin jo config.json se kisi bhi model (cloud ya local) ko use karne deta hai." },
        { q: "Local models kyun use karte hain?", a: "Privacy (data bahar nahi jata) aur zero API cost ke liye, Ollama ke through." }
      ],
      intermediate: [
        { q: "config.json me kya define hota hai?", a: "Models, providers, API keys, context providers, aur embeddingsProvider." },
        { q: "@codebase kaise kaam karta hai?", a: "Codebase ka embeddings index bana kar semantic search se relevant code retrieve karta hai (RAG)." }
      ],
      advanced: [
        { q: "Continue ka architecture batao", a: "config-driven: chosen LLM + embeddings index + context providers; client-side me sab configurable, RAG se context retrieval." },
        { q: "Local + cloud hybrid setup ka fayda?", a: "Simple/sensitive tasks local (free, private), complex tasks cloud (powerful) — cost aur privacy dono optimize." }
      ]
    },
    mcqs: [
      { q: "Continue.dev ka config file?", options: [".cursorrules", "config.json", "CLAUDE.md", "package.json"], answer: 1, explain: "config.json (ya config.yaml) Continue ka central config hai." },
      { q: "Local models ke liye kaunsa provider?", options: ["anthropic", "openai", "ollama", "azure"], answer: 2, explain: "Ollama se local models chalte hain." },
      { q: "@codebase ke liye kya zaroori?", options: ["GPU", "embeddingsProvider", "Dark theme", "Subscription"], answer: 1, explain: "embeddingsProvider index banata hai jisse @codebase kaam karta hai." }
    ],
    exercises: {
      easy: "Continue install kar ke config.json me ek model add karo aur basic chat karo.",
      medium: "Ollama se ek local model setup karo aur usse code generate karwao (offline test).",
      advanced: "Local + cloud dono models config me add karo, embeddings local set karo, aur @codebase se project query karo."
    },
    summary: [
      "Continue.dev = open-source, any-model AI assistant",
      "config.json se models, providers, embeddings control",
      "Ollama se local/private models (free)",
      "@codebase = RAG-based project awareness",
      "API keys config me — .gitignore zaroori",
      "Full control, no vendor lock-in"
    ],
    cheatsheet: [
      { h: "Chat", code: "Cmd+L / Ctrl+L" },
      { h: "Inline edit", code: "Cmd+I / Ctrl+I" },
      { h: "Config", code: ".continue/config.json" },
      { h: "Context", code: "@codebase @folder @file @docs" }
    ],
    projects: [
      "Continue + Ollama se fully offline AI dev setup banao",
      "Hybrid config (local + Claude) bana kar dono test karo",
      "@codebase se ek bade project ka architecture explore karo",
      "Custom slash command bana kar repetitive task automate karo"
    ],
    advanced: "🚀 Continue.dev MCP servers aur custom context providers support karta hai. Advanced setup: local embeddings + multiple models + custom assistants (config.yaml) = ek fully personalized, private, free AI dev environment jo tumhare exact workflow ke according ho.",
    quiz: [
      { q: "Continue.dev ka sabse bada USP?", options: ["Fastest", "Open-source + any model (local too)", "Best UI", "Free credits"], answer: 1, explain: "Open-source aur kisi bhi model (incl local) ka support iska USP hai." },
      { q: "Privacy ke liye best option?", options: ["Cloud model", "Local Ollama model", "Bigger API key", "More RAM"], answer: 1, explain: "Local Ollama model se data kahin bahar nahi jata." }
    ],
    related: ["cursor", "github-copilot", "claude-code", "documentation-strategy"]
  },

  "claude-code": {
    overview: "**Claude Code** Anthropic ka official **CLI (command-line) agent** hai — ye terminal me chalta hai, editor me nahi. Tum natural language me instruction do aur ye poore codebase ko padh kar files edit karta hai, commands chalata hai, git use karta hai, aur **CLAUDE.md** file se project context leta hai. Iska **long context** isse bade codebases me strong banata hai. 🖥️",
    why: "Claude Code editor-agnostic hai — kisi bhi terminal me chalo. Iska bada context window poore project ko ek saath samajhne deta hai, aur agentic nature isse complex multi-step tasks (refactor, debug, feature) khud complete karne deta hai. CLAUDE.md se ye har baar project rules samajhta hai.",
    concept: [
      { h: "CLI Agent", p: "Terminal me 'claude' command se chalu hota hai. Natural language do, ye plan bana kar autonomously kaam karta hai — read, edit, run, verify.", code: "$ claude\n> auth bug fix karo aur tests pass karwao", lang: "bash" },
      { h: "CLAUDE.md", p: "Project root me ye file project ki important baatein batati hai (architecture, conventions, commands). Claude Code har session me ise padhta hai.", code: "# CLAUDE.md\n## Project\nReact + Vite app\n## Commands\n- npm run dev\n- npm test\n## Rules\n- Functional components only\n- API calls src/services/ me", lang: "markdown" },
      { h: "Long Context + MCP", p: "Bada context window = poora project ek saath. MCP (Model Context Protocol) se external tools (DB, GitHub, docs) connect kar sakte ho.", code: "$ claude\n> @src/ poora folder analyze karke\n  refactor plan banao", lang: "bash" }
    ],
    analogy: "Claude Code ek **autonomous developer** hai jo tumhare terminal me baith kar poora project pad leta hai aur khud kaam kar deta hai. Cursor/Copilot tumhe suggest karte hain; Claude Code khud jaake task complete karta hai (jaise ek junior dev ko task assign karna). 🤖",
    workflow: {
      type: "boxes",
      items: [
        { label: "Task batao", sub: "natural language", color: "#D946EF" },
        { label: "Codebase padhe", sub: "+ CLAUDE.md", color: "#8B5CF6" },
        { label: "Plan + Act", sub: "edit, run, git", color: "#EC4899" },
        { label: "Verify", sub: "tests pass", color: "#22C55E" }
      ]
    },
    syntax: {
      code: "# Install (npm)\nnpm install -g @anthropic-ai/claude-code\n\n# Run in project folder\ncd my-app\nclaude\n\n# Phir natural language:\n> ek dark mode toggle banao aur navbar me add karo",
      note: "Claude Code npm se globally install hota hai aur project folder me 'claude' command se start hota hai. CLAUDE.md root me rakho.",
      lang: "bash"
    },
    steps: [
      "npm se globally install: npm install -g @anthropic-ai/claude-code",
      "Anthropic API key / login setup karo",
      "Apne project folder me jao (cd my-app)",
      "'claude' command run karo",
      "Natural language me task do",
      "CLAUDE.md likho project context ke liye (ya /init se auto-generate)"
    ],
    internals: "Claude Code ek **agentic loop** chalata hai: task samjho → relevant files dhoondho (glob/grep/read) → plan banao → edit/run tools use karo → output dekho → repeat jab tak task complete. Iska long context window poore files ko memory me rakhne deta hai. CLAUDE.md auto har session me load hoti hai. MCP se ye extra tools (servers) ke saath kaam karta hai.",
    architecture: {
      type: "boxes",
      items: [
        { label: "CLAUDE.md", sub: "project context", color: "#3B82F6" },
        { label: "Tools", sub: "read/edit/bash/git", color: "#8B5CF6" },
        { label: "Agent loop", sub: "plan→act→verify", color: "#EC4899" },
        { label: "MCP servers", sub: "external tools", color: "#14B8A6" }
      ]
    },
    visual: {
      type: "timeline",
      items: [
        { year: "2024", text: "Claude Code preview — CLI agent" },
        { year: "2025", text: "CLAUDE.md, MCP, subagents mature" },
        { year: "2026", text: "Long context + advanced agentic workflows" }
      ]
    },
    folders: {
      note: "CLAUDE.md project root me rakho (nested folders me bhi ho sakti hai for specific context):",
      tree: "my-app/\n├── CLAUDE.md              # main project context (auto-loaded)\n├── .claude/\n│   └── settings.json      # Claude Code settings\n├── src/\n│   ├── CLAUDE.md          # (optional) src-specific context\n│   ├── components/\n│   └── services/\n└── package.json"
    },
    examples: [
      { level: "Beginner", title: "Simple task", code: "$ claude\n> README.md me project ka short\n  description aur setup steps add karo", lang: "bash", explain: "Natural language me task do, Claude Code file edit kar deta hai." },
      { level: "Intermediate", title: "CLAUDE.md generate", code: "$ claude\n> /init\n# Claude project analyze kar ke\n# CLAUDE.md auto-generate karta hai", lang: "bash", explain: "/init command project scan kar ke starter CLAUDE.md banata hai." },
      { level: "Advanced", title: "Multi-step refactor", code: "$ claude\n> saare class components ko functional\n  components + hooks me convert karo,\n  phir tests run kar ke verify karo", lang: "bash", explain: "Agent khud files dhoondh kar, refactor kar ke, tests chala kar verify karta hai." }
    ],
    notes: {
      concept: "Claude Code = CLI agent jo terminal me autonomous coding karta hai, CLAUDE.md se context leta hai.",
      tip: "/init se CLAUDE.md auto-banao, phir manually refine karo project-specific rules ke saath.",
      warning: "Agent files edit aur commands run karta hai — important kaam se pehle git commit karo aur risky commands (rm, deploy) review karo.",
      error: "Context kam lag raha hai? CLAUDE.md me commands, architecture aur conventions clearly likho."
    },
    compare: {
      headers: ["Feature", "Claude Code", "Cursor", "GitHub Copilot", "Windsurf", "Continue.dev"],
      rows: [
        ["Form", "CLI agent", "Editor", "Plugin", "Editor", "Plugin"],
        ["Context file", "CLAUDE.md", ".cursor/rules", "instructions", "rules", "config.json"],
        ["Long context", "Very strong ✅", "Good", "Limited", "Good", "Model-dependent"],
        ["Agentic", "Strong ✅", "Composer", "Agent mode", "Cascade", "Limited"],
        ["Editor-agnostic", "Yes ✅", "No", "Plugin", "No", "Plugin"]
      ]
    },
    mistakes: [
      { bad: "CLAUDE.md na banana", fix: "/init se banao — har session me context milega." },
      { bad: "Risky commands blindly allow karna", fix: "Destructive commands (rm, force push) review karo." },
      { bad: "Bade task bina commit ke", fix: "Pehle git commit karo, phir agent ko chalao (rollback safe rahe)." },
      { bad: "CLAUDE.md me commands/scripts na likhna", fix: "npm run dev, test, build commands clearly likho." }
    ],
    best: [
      "🧠 CLAUDE.md me architecture, commands aur conventions clearly likho",
      "🧠 Bade tasks se pehle git commit karo (safety net)",
      "🧠 /init se start karo, phir CLAUDE.md refine karo",
      "🧠 Complex task ko clear steps me describe karo",
      "🧠 MCP se external tools (DB, GitHub) connect karo jab zaroorat ho",
      "🧠 Agent ke plan ko review karo bade changes se pehle"
    ],
    security: "🔒 Claude Code tumhara code Anthropic API par bhejta hai (processing ke liye). API keys safely store hoti hain (env / login). .env aur secrets ko CLAUDE.md me mat likho. Risky commands ke liye permission system hai — destructive ops review karo. Enterprise me data privacy guarantees milti hain.",
    performance: "⚡ Long context powerful par token-heavy aur mehnga ho sakta hai — bade codebases me cost dhyan rakho. Agentic loop multiple LLM calls karta hai. Focused tasks fast aur saste hote hain. Sirf relevant files ko reference karo unnecessary context se bachne ke liye.",
    tricky: [
      { title: "CLAUDE.md scope", code: "# root CLAUDE.md → poore project\n# src/CLAUDE.md → sirf src context", output: "Nested files = scoped context", explain: "Nested CLAUDE.md specific folders ke liye targeted context deti hai.", lang: "markdown" },
      { title: "Plan mode vs auto", code: "> pehle plan dikhao, edit mat karo\n# review ke baad execute", output: "Control vs autonomy", explain: "Bade changes me pehle plan maango, review karo, phir execute karwao.", lang: "bash" }
    ],
    interview: {
      beginner: [
        { q: "Claude Code kya hai?", a: "Anthropic ka official CLI agent jo terminal me natural language se autonomous coding karta hai." },
        { q: "CLAUDE.md kya hai?", a: "Project root me ek file jo project context (architecture, commands, rules) deti hai, jo Claude Code har session me padhta hai." }
      ],
      intermediate: [
        { q: "Claude Code editor tools se kaise alag hai?", a: "Ye CLI-based hai (editor-agnostic), bada context handle karta hai, aur fully agentic — khud files dhoondh kar kaam karta hai." },
        { q: "MCP kya hai Claude Code me?", a: "Model Context Protocol — external tools/servers (DB, GitHub, docs) ko AI se connect karne ka standard." }
      ],
      advanced: [
        { q: "Claude Code ka agentic loop samjhao", a: "Task samajh → files locate (glob/grep/read) → plan → edit/run tools → output observe → repeat until done." },
        { q: "Long context ka kya fayda aur trade-off?", a: "Fayda: poora project ek saath samjhta hai; trade-off: zyada tokens = zyada cost aur latency." }
      ]
    },
    mcqs: [
      { q: "Claude Code kaise install hota hai?", options: ["VS Code extension", "npm global install", "browser", "pip"], answer: 1, explain: "npm install -g @anthropic-ai/claude-code se install hota hai." },
      { q: "Project context file ka naam?", options: [".cursorrules", "config.json", "CLAUDE.md", "README.md"], answer: 2, explain: "CLAUDE.md Claude Code ki context file hai." },
      { q: "Claude Code ka primary form?", options: ["Editor", "CLI agent", "Browser plugin", "Mobile app"], answer: 1, explain: "Ye command-line (CLI) agent hai." }
    ],
    exercises: {
      easy: "Claude Code install kar ke ek project me 'claude' run karo aur README update karwao.",
      medium: "/init se CLAUDE.md generate karo aur usme custom commands + rules add karo.",
      advanced: "Claude Code se ek complete feature (multi-file) banwao aur usse tests run kar ke verify karwao."
    },
    summary: [
      "Claude Code = official CLI agent (terminal-based)",
      "npm se install, 'claude' command se run",
      "CLAUDE.md = project context (auto-loaded)",
      "Long context = poora project samajhta hai",
      "Agentic: plan → edit → run → verify",
      "MCP se external tools connect"
    ],
    cheatsheet: [
      { h: "Install", code: "npm i -g @anthropic-ai/claude-code" },
      { h: "Start", code: "cd my-app && claude" },
      { h: "Auto context", code: "/init  (generates CLAUDE.md)" },
      { h: "Context file", code: "CLAUDE.md (project root)" }
    ],
    projects: [
      "Claude Code se ek small app ko CLI se poora build karwao",
      "Ek bade project ke liye detailed CLAUDE.md likho",
      "Class components ko hooks me refactor karwao (with tests)",
      "MCP server connect kar ke DB ya GitHub se interact karo"
    ],
    advanced: "🚀 Claude Code **subagents**, **MCP servers**, aur **custom slash commands** support karta hai. Advanced workflow: rich CLAUDE.md + MCP tools + plan mode = ek autonomous system jo poora feature design se deploy tak handle kar sake. Long context me poore repo ko ek saath reason kar sakta hai.",
    quiz: [
      { q: "Claude Code dusre tools se kaise alag?", options: ["Sirf editor me", "CLI agent + long context + CLAUDE.md", "Sirf autocomplete", "Sirf chat"], answer: 1, explain: "CLI-based, long context, aur CLAUDE.md context isse alag banate hain." },
      { q: "CLAUDE.md kab load hoti hai?", options: ["Kabhi nahi", "Har session me automatically", "Sirf manual", "Sirf deploy par"], answer: 1, explain: "Har session me Claude Code CLAUDE.md automatically padhta hai." }
    ],
    related: ["cursor", "windsurf", "continue-dev", "ai-rules-files"]
  },

  "ai-rules-files": {
    overview: "**AI Rules Files** wo files hain jisme tum apne project ke coding standards, architecture, aur conventions likhte ho taaki AI tool (Cursor, Copilot, Claude Code) har baar inhe follow kare. Common files: **coding-rules.md**, **architecture.md**, **feature-map.md**, **component-map.md**. 📜",
    why: "Agar tum AI ko har prompt me same instructions repeat karoge (jaise 'functional components use karo', 'API src/services me rakho') to ye time waste aur inconsistent results deta hai. Rules files ek baar likho — AI har suggestion me consistently follow karega. Ye AI ko tumhare project ka 'rulebook' deti hain.",
    concept: [
      { h: "coding-rules.md", p: "Coding standards aur conventions — naming, structure, patterns.", code: "# Coding Rules\n- Functional components + hooks only\n- camelCase variables, PascalCase components\n- API calls sirf src/services/ me\n- Tailwind classes, no inline styles\n- Har function par JSDoc", lang: "markdown" },
      { h: "architecture.md", p: "Project ka high-level structure aur data flow.", code: "# Architecture\n- Pages → Components → Hooks → Services → API\n- State: Context API (global), useState (local)\n- Routing: React Router v6\n- Folder: feature-based structure", lang: "markdown" },
      { h: "feature-map.md & component-map.md", p: "Features aur components ki map taaki AI ko pata ho kya kahan hai.", code: "# Feature Map\n- Auth → src/features/auth/\n- Dashboard → src/features/dashboard/\n\n# Component Map\n- Button, Card → src/components/ui/\n- Navbar, Footer → src/components/layout/", lang: "markdown" }
    ],
    analogy: "Rules files ek naye employee ke liye **onboarding handbook** jaisi hain. Naya developer (ya AI) join karte hi handbook padhta hai aur jaan jata hai 'is company me kaam aise hota hai'. Bina handbook ke har baar batana padega. 📖",
    workflow: {
      type: "boxes",
      items: [
        { label: "Standards decide", sub: "team conventions", color: "#D946EF" },
        { label: "Rules files likho", sub: "coding/arch/maps", color: "#8B5CF6" },
        { label: "Tool me link", sub: ".cursor/rules etc", color: "#EC4899" },
        { label: "AI follows", sub: "consistent output", color: "#22C55E" }
      ]
    },
    syntax: {
      code: "# coding-rules.md  (example rule file)\n\n## Components\n- Sirf functional components use karo\n- Ek file = ek component\n- Props ko destructure karo\n\n## State Management\n- Global state: Context API\n- Server state: TanStack Query\n\n## API\n- Saare API calls src/services/ me\n- axios instance reuse karo\n\n## Styling\n- Tailwind utility classes\n- Inline styles avoid karo",
      note: "Rules clear, bullet-point aur specific honi chahiye. Har AI tool inhe apne tareeke se load karta hai (.cursor/rules, copilot-instructions.md, CLAUDE.md).",
      lang: "markdown"
    },
    steps: [
      "Apne project ke conventions list karo (naming, structure, patterns)",
      "coding-rules.md me coding standards likho",
      "architecture.md me structure + data flow document karo",
      "feature-map.md aur component-map.md banao",
      "In rules ko apne AI tool se connect karo (tool-specific file)",
      "Project grow kare to rules update karte raho"
    ],
    internals: "AI tools rules files ko prompt me **system context** ke roop me inject karte hain. Jab tum koi request karte ho, tool pehle rules padhta hai, phir tumhari request — isse AI ka output rules ke according aata hai. Ye essentially 'prompt prepending' hai jisse consistency aati hai.",
    visual: {
      type: "timeline",
      items: [
        { year: "Start", text: "Project ke conventions decide karo" },
        { year: "Setup", text: "Rules files likho (coding, arch, maps)" },
        { year: "Connect", text: "AI tool se link karo" },
        { year: "Maintain", text: "Project grow kare → rules update" }
      ]
    },
    folders: {
      note: "AI rules files ko ek dedicated folder me organize karo:",
      tree: "my-app/\n├── .ai/                        # ya docs/ai/\n│   ├── coding-rules.md         # coding standards\n│   ├── architecture.md         # structure + data flow\n│   ├── feature-map.md          # features → folders\n│   └── component-map.md        # components → folders\n├── .cursor/\n│   └── rules/                  # Cursor inhe reference karta hai\n├── CLAUDE.md                   # Claude Code (links to .ai/)\n└── src/"
    },
    examples: [
      { level: "Beginner", title: "Simple coding rule", code: "# coding-rules.md\n- Functional components only\n- API calls src/services/ me", lang: "markdown", explain: "Chhoti, clear rules se shuru karo — AI inhe follow karega." },
      { level: "Intermediate", title: "Architecture rule", code: "# architecture.md\n## Data Flow\nComponent → useHook → service → API\n\n## Rules\n- Components me direct API call mat karo\n- Hooks ke through data lo", lang: "markdown", explain: "Data flow document karne se AI sahi layers me code daalta hai." },
      { level: "Advanced", title: "Full rules set referenced in CLAUDE.md", code: "# CLAUDE.md\nRules dekho:\n- @.ai/coding-rules.md\n- @.ai/architecture.md\n- @.ai/component-map.md\n\nNaya code in rules ko strictly follow kare.", lang: "markdown", explain: "Main context file me detailed rules files reference karo — modular aur maintainable." }
    ],
    notes: {
      concept: "Rules files = project ka rulebook for AI: coding-rules, architecture, feature/component maps.",
      tip: "Rules ko specific aur example-driven banao — 'good code aise dikhta hai' clearer hota hai 'be good' se.",
      warning: "Outdated rules AI ko galat direction dete hain — project change ho to rules turant update karo.",
      error: "AI rules follow nahi kar raha? Rules file tool se properly linked hai ya nahi check karo (path/format)."
    },
    compare: {
      headers: ["Tool", "Rules File Location", "Format"],
      rows: [
        ["Cursor", ".cursor/rules/*.mdc", "Markdown + frontmatter"],
        ["GitHub Copilot", ".github/copilot-instructions.md", "Markdown"],
        ["Windsurf", ".windsurfrules", "Markdown"],
        ["Continue.dev", "config.json (rules)", "JSON/config"],
        ["Claude Code", "CLAUDE.md", "Markdown"]
      ]
    },
    mistakes: [
      { bad: "Vague rules: 'achha code likho'", fix: "Specific: 'functional components + Tailwind use karo'." },
      { bad: "Rules likh kar tool se link na karna", fix: "Tool-specific file (.cursor/rules, CLAUDE.md) me reference karo." },
      { bad: "Ek hi giant file me sab kuch", fix: "Modular files: coding, architecture, maps alag." },
      { bad: "Rules ko kabhi update na karna", fix: "Project evolve ho to rules sync rakho." }
    ],
    best: [
      "🧠 Rules specific aur example-driven likho",
      "🧠 Modular files banao (coding, arch, feature/component maps)",
      "🧠 Tool-specific config se rules link karo",
      "🧠 Component/feature maps se AI ko 'kya kahan hai' batao",
      "🧠 Rules ko version control (git) me rakho — team ke saath share",
      "🧠 Project change ke saath rules regularly update karo"
    ],
    security: "🔒 Rules files me **secrets, API keys, ya passwords kabhi mat likho** — ye git me commit hoti hain aur AI ke context me jaati hain. Sirf conventions aur structure document karo. Agar architecture me sensitive endpoints hain to unhe generic rakho. Rules files public repos me visible ho sakti hain.",
    performance: "⚡ Bahut lambi rules files har prompt me load hoti hain — token cost badhati hain aur AI ka focus kam karti hain. Concise rakho — sirf important rules. Modular files isliye behtar hain: tool zaroori file hi load karta hai. Redundant rules hatao.",
    tricky: [
      { title: "Specific vs generic rule", code: "# Generic (kamzor):\n- Be consistent\n\n# Specific (strong):\n- Components PascalCase, files .jsx", output: "Specific rules better follow hote hain", explain: "AI ko measurable, concrete rules chahiye — abstract advice ignore ho jaati hai.", lang: "markdown" },
      { title: "Maps ka power", code: "# component-map.md\nButton, Modal → src/components/ui/\n# AI naya Modal yahin banayega", output: "AI sahi jagah file banata hai", explain: "Maps AI ko convention batati hain taaki wo random jagah file na banaye.", lang: "markdown" }
    ],
    interview: {
      beginner: [
        { q: "AI rules files kya hain?", a: "Files jisme project ke coding standards, architecture aur conventions likhe hote hain taaki AI consistently follow kare." },
        { q: "Rules files kyun zaroori hain?", a: "Taaki har prompt me same instructions repeat na karne pade aur AI ka output consistent rahe." }
      ],
      intermediate: [
        { q: "coding-rules.md aur architecture.md me kya farak?", a: "coding-rules coding standards (naming, patterns); architecture high-level structure aur data flow document karta hai." },
        { q: "feature-map / component-map ka use?", a: "AI ko batate hain kaunsa feature/component kahan rehta hai taaki wo sahi jagah code banaye." }
      ],
      advanced: [
        { q: "Rules files internally kaise apply hote hain?", a: "AI tool inhe system context me prompt me prepend karta hai, isse output rules-aware hota hai." },
        { q: "Rules files ko maintainable kaise rakhte ho?", a: "Modular files, specific examples, git versioning, aur project change ke saath regular updates." }
      ]
    },
    mcqs: [
      { q: "Achhi rule kaisi honi chahiye?", options: ["Vague aur short", "Specific aur example-driven", "Bahut lambi", "Sirf English me"], answer: 1, explain: "Specific, concrete rules best follow hoti hain." },
      { q: "component-map.md kya batata hai?", options: ["Colors", "Components kahan rehte hain", "Git history", "API keys"], answer: 1, explain: "Component map AI ko component locations batata hai." },
      { q: "Rules file me kya NAHI likhna chahiye?", options: ["Coding standards", "API keys/secrets", "Architecture", "Conventions"], answer: 1, explain: "Secrets kabhi rules files me nahi — wo git/AI context me leak hote hain." }
    ],
    exercises: {
      easy: "Apne project ke liye ek coding-rules.md banao jisme 5 clear rules ho.",
      medium: "architecture.md aur component-map.md banao apne project ke structure ke according.",
      advanced: "Poora rules set (coding, architecture, feature-map, component-map) likho aur apne AI tool se link kar ke verify karo ki AI follow karta hai."
    },
    summary: [
      "Rules files = project rulebook for AI",
      "coding-rules.md, architecture.md, feature/component maps",
      "Ek baar likho, AI har baar follow kare",
      "Specific + example-driven rules likho",
      "Tool-specific file se link karo",
      "Secrets kabhi rules me nahi"
    ],
    cheatsheet: [
      { h: "Coding standards", code: "coding-rules.md" },
      { h: "Structure", code: "architecture.md" },
      { h: "Locations", code: "feature-map.md, component-map.md" },
      { h: "Link to tool", code: ".cursor/rules, CLAUDE.md" }
    ],
    projects: [
      "Apne current project ka complete rules set likho",
      "Team ke liye shared rules files banao (git me)",
      "Ek messy project ke liye architecture.md document karo",
      "Rules link kar ke ek component generate karwa kar consistency test karo"
    ],
    advanced: "🚀 Advanced rules setup: tool-specific frontmatter (Cursor .mdc globs), nested CLAUDE.md for sub-folders, aur rules ko ADR (Architecture Decision Records) ke saath combine karna. Saath me automated checks (lint rules + AI rules sync) se consistency guarantee karo.",
    quiz: [
      { q: "Rules files ka main fayda?", options: ["Faster internet", "Consistent AI output without repeating instructions", "Free tokens", "Better UI"], answer: 1, explain: "Ek baar likh kar consistent, repeat-free AI behavior milta hai." },
      { q: "Sabse strong rule kaunsi?", options: ["'Be good'", "'Functional components + Tailwind, API in src/services/'", "'Improve code'", "'Use AI'"], answer: 1, explain: "Specific, actionable rules sabse effective hoti hain." }
    ],
    related: ["cursor", "claude-code", "documentation-strategy", "ai-friendly-structure"]
  },

  "documentation-strategy": {
    overview: "**Documentation Strategy** ka matlab hai apne project ko aise document karna ki **humans aur AI dono** usse aasani se samjhein. Achhi docs (README, folder docs, feature docs, API docs) AI ko zyada accurate context deti hain aur naye developers ko fast onboard karti hain. 📚",
    why: "AI tools jitna behtar context paate hain, utna achha code dete hain. Achhi documentation AI ka 'fuel' hai — wo README, comments aur docs padh kar project samajhta hai. Bina docs ke AI guess karta hai (aur galtiyan karta hai). Humans ke liye bhi onboarding fast aur maintenance aasaan hoti hai.",
    concept: [
      { h: "README.md", p: "Project ka entry point — kya hai, kaise setup karein, kaise chalayein.", code: "# My App\nReact + Vite todo app.\n## Setup\nnpm install\nnpm run dev\n## Structure\nsrc/components, src/services, src/hooks", lang: "markdown" },
      { h: "Folder & Feature Docs", p: "Har major folder/feature ka chhota README ya doc — kya kaam karta hai, kaise use karein.", code: "# src/services/README.md\nSaare API calls yahan.\n- auth.js → login/signup\n- user.js → profile CRUD", lang: "markdown" },
      { h: "API Docs & Code Comments", p: "Functions/endpoints document karo. JSDoc se AI ko types aur intent pata chalta hai.", code: "/**\n * Login user with credentials\n * @param {string} email\n * @param {string} password\n * @returns {Promise<User>}\n */\nasync function login(email, password) { }", lang: "javascript" }
    ],
    analogy: "Documentation ek shehar ke **map aur signboards** jaisi hai. Bina map ke naya banda (ya AI) kho jata hai aur galat raste leta hai. Achhi docs har mod par signboard lagati hain — 'yahan auth hai', 'yahan API calls' — sab seedha pohanch jata hai. 🗺️",
    workflow: {
      type: "boxes",
      items: [
        { label: "README likho", sub: "project overview", color: "#D946EF" },
        { label: "Folder docs", sub: "har module", color: "#8B5CF6" },
        { label: "Feature/API docs", sub: "detailed", color: "#EC4899" },
        { label: "Comments + maintain", sub: "code-level", color: "#22C55E" }
      ]
    },
    syntax: {
      code: "# README.md structure\n\n## Project Name\nEk line description\n\n## Tech Stack\nReact, Vite, Tailwind, axios\n\n## Setup\n```\nnpm install\nnpm run dev\n```\n\n## Folder Structure\n- src/components — UI components\n- src/services — API layer\n- src/hooks — custom hooks\n\n## Key Features\n- Auth, Dashboard, Settings",
      note: "Achha README = overview + tech stack + setup + structure + features. Ye AI aur humans dono ke liye pehla context source hai.",
      lang: "markdown"
    },
    steps: [
      "README.md likho: project kya hai, setup, structure",
      "Har major folder me chhota README/doc add karo",
      "Important features ka detailed doc banao",
      "Functions/APIs ko JSDoc comments se document karo",
      "AI context file (CLAUDE.md/rules) me docs reference karo",
      "Code change ke saath docs update karo (sync rakho)"
    ],
    internals: "AI tools documentation ko context me read karte hain — README, comments, aur folder docs prompt ka hissa banti hain (directly ya semantic retrieval se). JSDoc/types AI ko function signatures aur intent samjhate hain. Achhi docs = better AI retrieval = better suggestions. Ye essentially AI ke liye 'ground truth' provide karti hain.",
    visual: {
      type: "timeline",
      items: [
        { year: "Day 1", text: "README banao (project setup hote hi)" },
        { year: "Growth", text: "Folder + feature docs add karo" },
        { year: "Detail", text: "API docs + JSDoc comments" },
        { year: "Ongoing", text: "Docs ko code ke saath sync rakho" }
      ]
    },
    folders: {
      note: "Documentation ko project ke saath organize karo:",
      tree: "my-app/\n├── README.md                  # main entry point\n├── docs/\n│   ├── architecture.md        # system design\n│   ├── api.md                 # API reference\n│   └── features/\n│       ├── auth.md\n│       └── dashboard.md\n├── src/\n│   ├── components/\n│   │   └── README.md          # components guide\n│   └── services/\n│       └── README.md          # API layer guide\n└── CLAUDE.md                  # AI context (refs docs/)"
    },
    examples: [
      { level: "Beginner", title: "Basic README", code: "# Todo App\nSimple todo app in React.\n## Run\nnpm install && npm run dev", lang: "markdown", explain: "Minimum viable README — overview + run command." },
      { level: "Intermediate", title: "Folder doc", code: "# src/hooks/README.md\nCustom hooks:\n- useAuth → auth state + methods\n- useFetch → data fetching wrapper\n- useLocalStorage → persist state", lang: "markdown", explain: "Folder-level doc AI aur devs ko module ka quick overview deta hai." },
      { level: "Advanced", title: "JSDoc for AI clarity", code: "/**\n * Fetch paginated users\n * @param {number} page - page number (1-based)\n * @param {number} limit - items per page\n * @returns {Promise<{users: User[], total: number}>}\n */\nasync function getUsers(page, limit) { }", lang: "javascript", explain: "Detailed JSDoc se AI exact types aur behavior samjhta hai — galtiyan kam." }
    ],
    notes: {
      concept: "Docs strategy = README + folder docs + feature/API docs + comments, humans aur AI dono ke liye.",
      tip: "Docs ko AI ke perspective se likho — wo cheezein explain karo jo code se obvious nahi (why, not just what).",
      warning: "Outdated docs galat docs se bhi bure hain — AI aur devs dono mislead hote hain. Code ke saath sync rakho.",
      error: "AI galat assumptions le raha hai? Probably docs missing ya outdated hain — important parts document karo."
    },
    compare: {
      headers: ["Doc Type", "Audience", "Purpose"],
      rows: [
        ["README.md", "Humans + AI", "Overview, setup, structure"],
        ["Folder docs", "Humans + AI", "Module ka quick context"],
        ["Feature docs", "Humans + AI", "Detailed feature behavior"],
        ["API docs / JSDoc", "AI mainly", "Types, signatures, intent"]
      ]
    },
    mistakes: [
      { bad: "Koi README na rakhna", fix: "Kam se kam overview + setup likho." },
      { bad: "Sirf 'what' likhna, 'why' nahi", fix: "Decisions ka reason document karo — AI/devs ko context milta hai." },
      { bad: "Docs ko code ke saath sync na rakhna", fix: "Code change ke saath docs update karo." },
      { bad: "Functions bina comments/types", fix: "JSDoc se signatures aur intent clear karo." }
    ],
    best: [
      "🧠 README pehle din se banao (overview + setup + structure)",
      "🧠 Har major folder/feature ka chhota doc rakho",
      "🧠 'Why' document karo, sirf 'what' nahi",
      "🧠 JSDoc/types se AI ko function intent batao",
      "🧠 AI context file (CLAUDE.md) me docs reference karo",
      "🧠 Docs ko code change ke saath sync rakho"
    ],
    security: "🔒 Documentation me **secrets, real API keys, ya internal credentials kabhi mat daalo** — README aur docs aksar public hoti hain (git, npm). Setup me placeholder keys (YOUR_API_KEY) use karo. Sensitive architecture details (security endpoints) ko internal docs me rakho, public README me nahi.",
    performance: "⚡ AI ke liye, concise aur well-structured docs better hain — bahut verbose docs context bloat karti hain. Important info upar rakho (AI pehle wahi padhta hai). Folder-level docs se AI sirf relevant doc retrieve karta hai (efficient). Redundant/outdated docs hatao.",
    tricky: [
      { title: "What vs Why", code: "// What (kamzor):\n// retry 3 times\n\n// Why (strong):\n// retry 3x kyunki API flaky hai\n// aur 429 rate-limit aata hai", output: "Why se AI better decisions leta hai", explain: "Reason document karna AI ko logic samjhata hai, sirf action nahi.", lang: "javascript" },
      { title: "Doc location matters", code: "# src/services/README.md\n# (folder ke paas) → AI easily retrieve", output: "Co-located docs better discoverable", explain: "Doc ko related code ke paas rakho taaki AI/devs use easily find karein.", lang: "text" }
    ],
    interview: {
      beginner: [
        { q: "Documentation strategy kya hai?", a: "Project ko aise document karna ki humans aur AI dono usse aasaani se samjhein — README, folder/feature docs, API docs." },
        { q: "AI ke liye docs kyun important hain?", a: "AI docs padh kar context samajhta hai — better docs = better, more accurate suggestions." }
      ],
      intermediate: [
        { q: "'What' aur 'Why' document karne me farak?", a: "What action batata hai; Why reason — Why AI aur devs ko decisions ke peeche ki logic samjhata hai." },
        { q: "JSDoc AI ki kaise help karta hai?", a: "Ye function signatures, types aur intent batata hai, jisse AI sahi usage samjhta hai aur kam galti karta hai." }
      ],
      advanced: [
        { q: "Docs AI context me kaise feed hoti hain?", a: "Tools docs ko prompt me directly ya semantic retrieval (RAG) se inject karte hain — ground truth provide karti hain." },
        { q: "Documentation maintainable kaise rakhte ho?", a: "Co-located folder docs, concise content, code ke saath sync, aur why-focused writing." }
      ]
    },
    mcqs: [
      { q: "Project ka entry-point doc?", options: ["api.md", "README.md", "config.json", "CLAUDE.md"], answer: 1, explain: "README.md project ka main entry point hai." },
      { q: "Docs me kya likhna sabse valuable hai AI ke liye?", options: ["Sirf what", "Why (reasoning) + what", "Colors", "Git log"], answer: 1, explain: "Why document karna AI ko deeper context deta hai." },
      { q: "Docs me kya NAHI hona chahiye?", options: ["Setup steps", "Real API keys", "Folder structure", "Features"], answer: 1, explain: "Real secrets/keys docs me nahi — placeholders use karo." }
    ],
    exercises: {
      easy: "Apne project ke liye ek complete README.md likho (overview, setup, structure).",
      medium: "src/services aur src/components folders me README docs add karo.",
      advanced: "Ek feature ka detailed doc + uske functions par JSDoc likho, phir AI se us feature ko extend karwa kar dekho ki docs help karti hain."
    },
    summary: [
      "Docs strategy = humans + AI dono ke liye documentation",
      "README + folder docs + feature/API docs + comments",
      "AI docs padh kar better context paata hai",
      "'Why' document karo, sirf 'what' nahi",
      "JSDoc se AI ko types/intent batao",
      "Docs ko code ke saath sync rakho"
    ],
    cheatsheet: [
      { h: "Entry point", code: "README.md" },
      { h: "Module docs", code: "folder/README.md" },
      { h: "Function docs", code: "JSDoc /** ... */" },
      { h: "AI link", code: "CLAUDE.md refs docs/" }
    ],
    projects: [
      "Apne project ka complete documentation set banao",
      "Ek undocumented project ko fully document karo",
      "Saare service functions par JSDoc add karo",
      "docs/ folder structure bana kar feature docs likho"
    ],
    advanced: "🚀 Advanced docs strategy: **auto-generated API docs** (JSDoc → HTML), **ADRs** (Architecture Decision Records), aur docs ko AI context file se link karna. Docs-as-code approach: docs git me, PR me review, aur CI me check ki docs code ke saath sync hain.",
    quiz: [
      { q: "Achhi documentation ka AI par kya asar?", options: ["Koi nahi", "Better context = better code", "Slow karta hai", "Cost badhata hai"], answer: 1, explain: "Better docs se AI ko accurate context milta hai." },
      { q: "Docs me sabse zyada value kya add karta hai?", options: ["Lambi length", "Why + clear structure", "Fancy formatting", "Emojis"], answer: 1, explain: "Reasoning aur clear structure sabse valuable hain." }
    ],
    related: ["ai-rules-files", "ai-friendly-structure", "claude-code", "make-ai-understand"]
  },

  "ai-friendly-structure": {
    overview: "**AI-Friendly Folder Structure** ka matlab hai apne project ko aise organize karna ki AI (aur humans) easily samajh sakein ki kya kahan hai. Clear folders (components, hooks, services, utils, constants, context), descriptive naming, aur **colocation** — ye sab AI ko sahi jagah code dhoondhne aur banane me help karte hain. 🗂️",
    why: "Jab structure clear hota hai, AI ko guess nahi karna padta ki naya code kahan jaye ya existing logic kahan hai. Messy structure me AI random jagah files banata hai aur duplicate logic likhta hai. AI-friendly structure = AI ka accuracy badhta hai aur tumhara project maintainable rehta hai.",
    concept: [
      { h: "Clear, Purpose-Based Folders", p: "Har folder ka ek clear kaam: components (UI), hooks (logic), services (API), utils (helpers), constants (fixed values), context (global state).", code: "src/\n  components/  → UI pieces\n  hooks/       → reusable logic\n  services/    → API calls\n  utils/       → helper functions\n  constants/   → config values\n  context/     → global state", lang: "text" },
      { h: "Descriptive Naming", p: "File/folder names se hi pata chale ki andar kya hai. useAuth.js, userService.js — naam self-explanatory.", code: "// Good:\nuseAuth.js, formatDate.js, userService.js\n// Bad:\nutils2.js, helper.js, stuff.js", lang: "text" },
      { h: "Colocation", p: "Related cheezein saath rakho — ek component ke saath uska CSS, test, aur sub-components.", code: "components/Button/\n  Button.jsx\n  Button.test.jsx\n  Button.module.css\n  index.js", lang: "text" }
    ],
    analogy: "AI-friendly structure ek **well-organized kitchen** jaisi hai — masale ek jagah, bartan ek jagah, sab labeled. Koi bhi (cook ya AI) turant jaan jaye kya kahan hai. Messy kitchen me har cheez dhoondhne me time lagta hai aur galti hoti hai. 🍳",
    workflow: {
      type: "boxes",
      items: [
        { label: "Purpose folders", sub: "components/hooks/...", color: "#D946EF" },
        { label: "Clear naming", sub: "self-explanatory", color: "#8B5CF6" },
        { label: "Colocation", sub: "related together", color: "#EC4899" },
        { label: "AI navigates easy", sub: "accurate code", color: "#22C55E" }
      ]
    },
    syntax: {
      code: "// Naming conventions\nComponents → PascalCase: UserCard.jsx\nHooks      → use prefix:  useAuth.js\nServices   → xService:    authService.js\nUtils      → verb-based:  formatCurrency.js\nConstants  → UPPER_CASE:  API_ROUTES",
      note: "Consistent naming AI ko pattern recognize karne deta hai — wo same convention follow kar ke naya code banata hai.",
      lang: "text"
    },
    steps: [
      "src/ ke andar purpose-based folders banao",
      "Har folder ka ek single responsibility rakho",
      "Files ko descriptive, convention-following naam do",
      "Related files colocate karo (component + test + style)",
      "Index files se clean imports banao",
      "Structure ko architecture.md me document karo"
    ],
    internals: "AI tools file paths aur names ko strong signals ki tarah use karte hain. Jab tum 'useAuth hook banao' bolte ho, AI naming convention (use prefix) aur folder structure (hooks/) se samajh jata hai exactly kahan aur kaise banana hai. Clear structure semantic search aur retrieval ko bhi accurate banata hai.",
    architecture: {
      type: "boxes",
      items: [
        { label: "Pages/Routes", sub: "top level", color: "#3B82F6" },
        { label: "Components", sub: "UI layer", color: "#8B5CF6" },
        { label: "Hooks", sub: "logic layer", color: "#EC4899" },
        { label: "Services/Utils", sub: "data + helpers", color: "#14B8A6" }
      ]
    },
    visual: {
      type: "timeline",
      items: [
        { year: "Setup", text: "Purpose-based folders banao" },
        { year: "Naming", text: "Consistent conventions apply karo" },
        { year: "Colocate", text: "Related files saath rakho" },
        { year: "Scale", text: "Feature-based structure jab project bada ho" }
      ]
    },
    folders: {
      note: "⭐ Ek complete AI-friendly React/Vite project structure (ye section is topic ka star hai):",
      tree: "my-app/\n├── src/\n│   ├── components/              # reusable UI\n│   │   ├── ui/                  # Button, Input, Modal\n│   │   │   ├── Button/\n│   │   │   │   ├── Button.jsx\n│   │   │   │   ├── Button.test.jsx\n│   │   │   │   └── index.js\n│   │   │   └── Input/\n│   │   └── layout/             # Navbar, Footer, Sidebar\n│   ├── features/               # feature-based modules\n│   │   ├── auth/\n│   │   │   ├── components/\n│   │   │   ├── hooks/\n│   │   │   └── authService.js\n│   │   └── dashboard/\n│   ├── hooks/                  # shared custom hooks\n│   │   ├── useAuth.js\n│   │   └── useFetch.js\n│   ├── services/               # API layer\n│   │   ├── apiClient.js        # axios instance\n│   │   └── userService.js\n│   ├── context/                # global state\n│   │   └── ThemeContext.jsx\n│   ├── utils/                  # pure helpers\n│   │   ├── formatDate.js\n│   │   └── validators.js\n│   ├── constants/              # fixed values\n│   │   └── routes.js\n│   ├── pages/                  # route pages\n│   └── App.jsx\n├── README.md\n├── CLAUDE.md\n└── package.json"
    },
    examples: [
      { level: "Beginner", title: "Basic folder split", code: "src/\n  components/\n  hooks/\n  services/\n  utils/", lang: "text", explain: "Simple purpose-based split — har cheez ki apni jagah." },
      { level: "Intermediate", title: "Colocated component", code: "components/Card/\n  Card.jsx        // component\n  Card.test.jsx   // test\n  Card.module.css // styles\n  index.js        // clean export", lang: "text", explain: "Related files saath — AI poora component context ek folder me paata hai." },
      { level: "Advanced", title: "Feature-based structure", code: "features/auth/\n  components/LoginForm.jsx\n  hooks/useLogin.js\n  authService.js\n  authSlice.js\n  index.js", lang: "text", explain: "Bade projects me feature folders — sab auth-related ek jagah, AI ke liye self-contained context." }
    ],
    notes: {
      concept: "AI-friendly structure = purpose folders + clear naming + colocation, taaki AI/humans easily navigate karein.",
      tip: "Naming conventions strictly follow karo — consistency AI ko predict karne deta hai kahan kya banana hai.",
      warning: "Mixed conventions (kabhi camelCase, kabhi snake) AI ko confuse karte hain — ek convention pick karo.",
      error: "AI galat jagah files bana raha hai? Structure unclear hai — folders aur naming clarify karo, architecture.md likho."
    },
    compare: {
      headers: ["Aspect", "AI-Friendly", "Messy Structure"],
      rows: [
        ["Folders", "Purpose-based (clear)", "Mixed/random"],
        ["Naming", "Descriptive, consistent", "Vague (utils2, stuff)"],
        ["Related files", "Colocated", "Scattered"],
        ["AI accuracy", "High ✅", "Low (guesses)"],
        ["Maintainability", "Easy", "Hard"]
      ]
    },
    mistakes: [
      { bad: "Sab kuch ek 'utils' folder me", fix: "Purpose-based folders banao (services, hooks, helpers alag)." },
      { bad: "Vague naming: helper.js, data.js", fix: "Descriptive: formatDate.js, userService.js." },
      { bad: "Related files alag-alag scattered", fix: "Colocate — component + test + style ek folder me." },
      { bad: "Inconsistent naming conventions", fix: "Ek convention decide karo aur strictly follow karo." }
    ],
    best: [
      "🧠 Purpose-based folders (components/hooks/services/utils/constants/context)",
      "🧠 Descriptive, convention-following naming",
      "🧠 Related files colocate karo",
      "🧠 Bade projects me feature-based structure",
      "🧠 Index files se clean imports",
      "🧠 Structure ko architecture.md me document karo"
    ],
    security: "🔒 Structure level par: secrets (.env) ko src ke bahar root me rakho aur .gitignore me daalo. Sensitive config constants/ me hardcode mat karo — env vars use karo. Clear structure se accidentally sensitive files (keys, configs) ko commit karne ka risk bhi kam hota hai (galti se public folder me na chali jaye).",
    performance: "⚡ Achhi structure AI ke semantic retrieval ko fast aur accurate banati hai — relevant folder turant mil jata hai, poora codebase scan nahi karna padta (kam tokens). Feature-based structure me AI sirf ek feature folder load kar ke kaam kar sakta hai — efficient context.",
    tricky: [
      { title: "Folder-based vs feature-based", code: "// Small app: type-based\ncomponents/ hooks/ services/\n\n// Large app: feature-based\nfeatures/auth/ features/cart/", lang: "text", output: "Project size pe depend karta hai", explain: "Chhote me type-based simple; bade me feature-based scalable aur AI ke liye self-contained." },
      { title: "Index file power", code: "// components/ui/index.js\nexport { Button } from './Button'\nexport { Input } from './Input'\n// import: import { Button } from '@/components/ui'", output: "Clean imports, AI easily reference", explain: "Index files imports ko clean rakhti hain — AI aur devs ke liye predictable paths.", lang: "javascript" }
    ],
    interview: {
      beginner: [
        { q: "AI-friendly structure kya hai?", a: "Aisi folder organization jisme purpose-based folders, clear naming aur colocation ho taaki AI/humans easily samjhein." },
        { q: "Colocation kya hai?", a: "Related files (component, test, style) ko ek hi folder me saath rakhna." }
      ],
      intermediate: [
        { q: "Type-based aur feature-based structure me farak?", a: "Type-based folders type se (components, hooks); feature-based feature se (auth, cart). Bade projects me feature-based better scale karta hai." },
        { q: "Naming conventions AI ki kaise help karti hain?", a: "Consistent naming (useAuth, userService) se AI pattern recognize kar ke naya code sahi jagah, sahi naam se banata hai." }
      ],
      advanced: [
        { q: "Structure AI accuracy ko kaise affect karta hai?", a: "Clear structure se AI ko file location guess nahi karna padta, semantic retrieval accurate hoti hai, aur duplicate logic kam banti hai." },
        { q: "Bade project me scalable structure kaisi ho?", a: "Feature-based with colocated components/hooks/services per feature, shared utils/components alag, aur index files for clean imports." }
      ]
    },
    mcqs: [
      { q: "Colocation ka matlab?", options: ["Sab ek file me", "Related files ek folder me saath", "Cloud me rakhna", "Delete karna"], answer: 1, explain: "Colocation = related files (component+test+style) saath rakhna." },
      { q: "Bade project ke liye best structure?", options: ["Type-based", "Feature-based", "Sab root me", "Random"], answer: 1, explain: "Feature-based bade projects me scale aur AI context dono ke liye better." },
      { q: "Achha file naam kaunsa?", options: ["stuff.js", "utils2.js", "formatDate.js", "x.js"], answer: 2, explain: "Descriptive naam (formatDate.js) se intent clear hota hai." }
    ],
    exercises: {
      easy: "Ek project me purpose-based folders (components, hooks, services, utils) banao.",
      medium: "Ek component ko colocate karo: component + test + style ek folder me, index.js ke saath.",
      advanced: "Ek messy project ko feature-based structure me reorganize karo aur architecture.md me document karo."
    },
    summary: [
      "AI-friendly structure = purpose folders + naming + colocation",
      "components, hooks, services, utils, constants, context",
      "Descriptive, consistent naming",
      "Related files colocate karo",
      "Bade projects: feature-based",
      "Clear structure = better AI accuracy"
    ],
    cheatsheet: [
      { h: "Components", code: "PascalCase: UserCard.jsx" },
      { h: "Hooks", code: "use prefix: useAuth.js" },
      { h: "Services", code: "xService: authService.js" },
      { h: "Colocation", code: "Button/{jsx,test,css,index}" }
    ],
    projects: [
      "Apne project ko AI-friendly structure me reorganize karo",
      "Ek feature-based folder structure design karo",
      "Saare components ko colocated pattern me convert karo",
      "Index files add kar ke clean imports setup karo"
    ],
    advanced: "🚀 Advanced: **path aliases** (@/components) for clean imports, **barrel exports** (index.js), aur **feature-sliced design** architecture. AI context file me structure document karo taaki naye code generation me AI exactly conventions follow kare. Lint rules se structure enforce karo.",
    quiz: [
      { q: "AI-friendly structure ka main benefit?", options: ["Pretty look", "AI/humans easily navigate, better accuracy", "Faster internet", "Less code"], answer: 1, explain: "Clear structure se navigation aur AI accuracy dono improve hoti hain." },
      { q: "Sabse maintainable approach bade app me?", options: ["Sab root me", "Feature-based + colocation", "Random folders", "Ek file"], answer: 1, explain: "Feature-based + colocation scale aur clarity dono deta hai." }
    ],
    related: ["documentation-strategy", "ai-rules-files", "react-ai-integration", "folder-understanding"]
  },

  "react-ai-integration": {
    overview: "**React AI Integration** ka matlab hai apne React project me AI workflow ko properly integrate karna — clear **layers** ke saath: components (UI), hooks (logic), context (global state), API layer, aur service layer. Jab ye layers clean hote hain, AI tools project ko aasaani se samajh kar accurate code dete hain. ⚛️🤖",
    why: "React projects me jab logic, UI, aur data fetching mix ho jaate hain, AI confuse hota hai aur tum bhi. Proper layered architecture (components → hooks → services → API) se AI ko har layer ka kaam clear hota hai, wo sahi layer me code daalta hai, aur code reusable + testable rehta hai.",
    concept: [
      { h: "Component Layer (UI)", p: "Components sirf UI render karein — logic na ho. Data hooks se lein.", code: "function UserProfile() {\n  const { user, loading } = useUser()\n  if (loading) return <Spinner />\n  return <div>{user.name}</div>\n}", lang: "javascript" },
      { h: "Hook Layer (Logic) + Context (State)", p: "Custom hooks me reusable logic; Context me global state. Components in se data lete hain.", code: "function useUser() {\n  const [user, setUser] = useState(null)\n  useEffect(() => {\n    userService.getProfile().then(setUser)\n  }, [])\n  return { user }\n}", lang: "javascript" },
      { h: "Service + API Layer", p: "Service layer business logic + data shaping; API layer raw HTTP calls (axios instance).", code: "// apiClient.js (API layer)\nexport const api = axios.create({ baseURL: '/api' })\n\n// userService.js (service layer)\nexport const userService = {\n  getProfile: () => api.get('/me').then(r => r.data)\n}", lang: "javascript" }
    ],
    analogy: "Layered React app ek **restaurant** jaisa hai: Components = waiter (customer ko serve), Hooks = manager (coordinate), Services = kitchen (food prepare), API = supplier (raw ingredients). Har koi apna kaam kare to system smooth chalta hai — AI ko bhi clear pata hota hai kaunsa kaam kahan. 🍽️",
    workflow: {
      type: "boxes",
      items: [
        { label: "Component", sub: "UI render", color: "#D946EF" },
        { label: "Hook", sub: "logic + state", color: "#8B5CF6" },
        { label: "Service", sub: "business logic", color: "#EC4899" },
        { label: "API client", sub: "HTTP calls", color: "#14B8A6" }
      ]
    },
    syntax: {
      code: "// Data flow direction (top → bottom)\n\nComponent (UI)\n   ↓ uses\nCustom Hook (logic + state)\n   ↓ calls\nService (business logic)\n   ↓ uses\nAPI Client (axios → backend)\n\n// Component me NEVER direct API call",
      note: "Strict layering: Component sirf hook se baat kare, hook service se, service API se. Ye separation AI ko clear context deta hai aur code testable rakhta hai.",
      lang: "text"
    },
    steps: [
      "API layer banao: ek central axios client (apiClient.js)",
      "Service layer banao: per-domain services (userService, authService)",
      "Custom hooks banao jo services use karein (useUser, useAuth)",
      "Global state ke liye Context API setup karo",
      "Components ko sirf hooks/context se data lene do (no direct API)",
      "Ye layers architecture.md + CLAUDE.md me document karo"
    ],
    internals: "AI tools layered structure me har file ka role clearly samajhte hain — path aur naming se. Jab tum 'user profile fetch karo' bolte ho, AI samajh jata hai: hook me logic, service me API call, component me render. Clean separation se AI sahi layer me code generate karta hai aur existing patterns reuse karta hai (DRY). Ye essentially AI ko ek mental model deta hai.",
    architecture: {
      type: "boxes",
      items: [
        { label: "Components/Pages", sub: "presentation layer", color: "#3B82F6" },
        { label: "Hooks + Context", sub: "logic + state layer", color: "#8B5CF6" },
        { label: "Services", sub: "business logic layer", color: "#EC4899" },
        { label: "API Client", sub: "data access layer", color: "#14B8A6" }
      ]
    },
    visual: {
      type: "timeline",
      items: [
        { year: "Step 1", text: "API client (axios) setup" },
        { year: "Step 2", text: "Service layer per domain" },
        { year: "Step 3", text: "Custom hooks + Context" },
        { year: "Step 4", text: "Components consume hooks only" }
      ]
    },
    folders: {
      note: "React AI integration ka layered folder structure:",
      tree: "src/\n├── components/             # presentation layer\n│   ├── ui/                 # Button, Input\n│   └── UserProfile.jsx     # uses useUser()\n├── hooks/                  # logic layer\n│   ├── useUser.js          # calls userService\n│   └── useAuth.js\n├── context/                # global state\n│   ├── AuthContext.jsx\n│   └── ThemeContext.jsx\n├── services/               # business logic layer\n│   ├── userService.js      # calls apiClient\n│   └── authService.js\n├── api/                    # data access layer\n│   └── apiClient.js        # axios instance + interceptors\n├── pages/\n└── App.jsx"
    },
    examples: [
      { level: "Beginner", title: "API client setup", code: "// api/apiClient.js\nimport axios from 'axios'\nexport const api = axios.create({\n  baseURL: import.meta.env.VITE_API_URL,\n  timeout: 10000\n})", lang: "javascript", explain: "Central axios instance — saari API calls isi se, ek jagah config." },
      { level: "Intermediate", title: "Service + hook", code: "// services/userService.js\nimport { api } from '../api/apiClient'\nexport const userService = {\n  getUser: (id) => api.get(`/users/${id}`).then(r => r.data)\n}\n\n// hooks/useUser.js\nexport function useUser(id) {\n  const [user, setUser] = useState(null)\n  useEffect(() => { userService.getUser(id).then(setUser) }, [id])\n  return { user }\n}", lang: "javascript", explain: "Service API call karta hai, hook state + logic handle karta hai — clean separation." },
      { level: "Advanced", title: "Context + interceptor", code: "// api/apiClient.js — auth interceptor\napi.interceptors.request.use(config => {\n  const token = localStorage.getItem('token')\n  if (token) config.headers.Authorization = `Bearer ${token}`\n  return config\n})\n\n// context/AuthContext.jsx provides login/logout globally", lang: "javascript", explain: "Interceptor har request me token add karta hai; Context global auth state deta hai — full integration." }
    ],
    notes: {
      concept: "React AI integration = clean layers (component → hook/context → service → API) jisse AI accurate code de.",
      tip: "Component me kabhi direct fetch/axios mat karo — hamesha hook → service → API chain follow karo.",
      warning: "Layers mix karna (component me API call) AI aur maintainability dono ko todta hai — strict separation rakho.",
      error: "AI galat layer me code daal raha hai? architecture.md me data flow + layer rules clearly document karo."
    },
    compare: {
      headers: ["Layer", "Responsibility", "Example File"],
      rows: [
        ["Component", "UI render", "UserProfile.jsx"],
        ["Hook", "Logic + local state", "useUser.js"],
        ["Context", "Global state", "AuthContext.jsx"],
        ["Service", "Business logic", "userService.js"],
        ["API Client", "HTTP calls", "apiClient.js"]
      ]
    },
    mistakes: [
      { bad: "Component me direct axios/fetch call", fix: "Hook → service → API chain use karo." },
      { bad: "Har component me apna axios config", fix: "Ek central apiClient.js banao." },
      { bad: "Business logic component me", fix: "Logic hooks/services me move karo, component sirf UI." },
      { bad: "Global state prop drilling se pass karna", fix: "Context API use karo." }
    ],
    best: [
      "🧠 Strict layering: component → hook → service → API",
      "🧠 Central API client (axios instance + interceptors)",
      "🧠 Per-domain service files (userService, authService)",
      "🧠 Logic hooks me, UI components me — separate rakho",
      "🧠 Global state Context API se manage karo",
      "🧠 Layers ko architecture.md + CLAUDE.md me document karo"
    ],
    security: "🔒 API client me auth tokens interceptor se add karo, hardcode nahi. **API keys/secrets env vars** (VITE_ prefix) me rakho — but yaad rakho VITE_ vars browser me expose hote hain, isliye sensitive secrets sirf backend par. Service layer me input validation karo. localStorage me tokens rakhne ke risks samjho (XSS) — httpOnly cookies safer hain.",
    performance: "⚡ Layered structure AI context ko efficient banata hai — AI sirf relevant layer (hook ya service) load karta hai. Performance ke liye: API responses cache karo (TanStack Query), unnecessary re-renders avoid karo (memo), aur services me data shaping kar ke components ko clean data do.",
    tricky: [
      { title: "Service vs API layer", code: "// API layer: raw HTTP\napi.get('/users')\n\n// Service layer: shaped + logic\ngetActiveUsers: () =>\n  api.get('/users').then(r =>\n    r.data.filter(u => u.active))", output: "API = transport, Service = logic", explain: "API layer sirf HTTP; service layer business logic/data shaping karta hai — dono alag rakho.", lang: "javascript" },
      { title: "Hook ya Context", code: "// Local feature data → hook (useUser)\n// App-wide data → Context (auth, theme)", output: "Scope decide karta hai", explain: "Sirf ek feature ko chahiye to hook; poore app ko chahiye to Context.", lang: "javascript" }
    ],
    interview: {
      beginner: [
        { q: "React AI integration me layers kaunse hain?", a: "Components (UI), hooks (logic), context (global state), services (business logic), API client (HTTP)." },
        { q: "Component me direct API call kyun nahi karni chahiye?", a: "Logic aur UI mix ho jate hain, code reusable/testable nahi rehta, aur AI confuse hota hai." }
      ],
      intermediate: [
        { q: "Service layer aur API layer me farak?", a: "API layer raw HTTP calls (axios); service layer business logic aur data shaping karta hai us par." },
        { q: "Hook ya Context kab use karein?", a: "Feature-specific reusable logic ke liye hook; app-wide global state (auth, theme) ke liye Context." }
      ],
      advanced: [
        { q: "Layered architecture AI ki kaise help karti hai?", a: "Har layer ka clear role hota hai, AI sahi layer me code generate karta hai, existing patterns reuse karta hai, aur context efficient rehta hai." },
        { q: "API client me interceptor ka role?", a: "Har request/response ko centrally modify karna — jaise auth token add karna, errors handle karna — bina har call me repeat kiye." }
      ]
    },
    mcqs: [
      { q: "Component ko data kahan se lena chahiye?", options: ["Direct API", "Hooks/Context", "localStorage", "global var"], answer: 1, explain: "Component hooks/context se data le — direct API nahi." },
      { q: "Central HTTP config kahan rakhte hain?", options: ["Har component", "apiClient.js (API layer)", "App.jsx", "index.html"], answer: 1, explain: "Ek central axios instance (apiClient.js) me." },
      { q: "Global state ke liye?", options: ["Props drilling", "Context API", "localStorage only", "URL"], answer: 1, explain: "Context API global state ke liye proper React way hai." }
    ],
    exercises: {
      easy: "Ek central apiClient.js (axios instance) banao aur ek service file usse use kare.",
      medium: "Ek feature ke liye full chain banao: apiClient → userService → useUser hook → UserProfile component.",
      advanced: "AuthContext + axios interceptor (token) + authService + useAuth hook ka complete layered auth flow banao, architecture.md me document karo."
    },
    summary: [
      "React AI integration = clean layered architecture",
      "Component → Hook/Context → Service → API",
      "Central API client (axios + interceptors)",
      "Logic hooks/services me, UI components me",
      "Global state Context API se",
      "Clean layers = accurate AI code"
    ],
    cheatsheet: [
      { h: "API client", code: "api/apiClient.js (axios)" },
      { h: "Service", code: "services/userService.js" },
      { h: "Hook", code: "hooks/useUser.js" },
      { h: "Context", code: "context/AuthContext.jsx" }
    ],
    projects: [
      "Ek full layered React app banao (component→hook→service→API)",
      "Auth flow integrate karo (Context + interceptor + service)",
      "Existing app ki direct API calls ko service layer me refactor karo",
      "TanStack Query add kar ke service layer ko caching ke saath upgrade karo"
    ],
    advanced: "🚀 Advanced React AI integration: **TanStack Query** (server state), **error boundaries**, **suspense**, aur **feature-sliced architecture**. AI context file me poora layer map document karo taaki AI har naye feature me consistent layered code de. MCP se AI ko backend schema bhi connect kar sakte ho.",
    quiz: [
      { q: "Layered architecture ka AI benefit?", options: ["Pretty code", "AI sahi layer me accurate code deta hai", "Faster build", "Less files"], answer: 1, explain: "Clear layers AI ko har layer ka role samjha kar accurate code dilate hain." },
      { q: "Sabse clean data flow?", options: ["Component → API direct", "Component → Hook → Service → API", "Random", "API → Component"], answer: 1, explain: "Strict top-down chain hi clean aur maintainable hai." }
    ],
    related: ["ai-friendly-structure", "documentation-strategy", "api-state-flow", "building-ai-features"]
  }
}
