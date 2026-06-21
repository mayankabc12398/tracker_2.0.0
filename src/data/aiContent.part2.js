// AI Integration Course — Part 2
// Topics: codebase understanding + prompt engineering basics
// Pure data module. No JSX, no imports.

export const aiContentB = {
  "analyze-codebase": {
    overview: "Existing ya legacy codebase ko AI se samajhna ek skill hai. AI ko poora project ek saath nahi diya jaata — aap key files feed karte ho, @-mentions use karte ho, ya tool ko repo index karne dete ho, aur pehle architecture ka summary maangte ho. 🤖",
    why: "Bade projects mein context window limited hota hai. Agar aap bina samjhe direct 'fix this bug' bolte ho, AI galat assume karta hai. Pehle AI ko codebase ka mental map dena chahiye taaki uske edits aapke patterns, conventions aur dependencies ke saath align rahein. Ye time bachata hai aur galat refactors rokta hai.",
    concept: [
      { h: "Top-down se shuru karo", p: "Pehle high-level architecture maango: 'Is repo ka overall structure samjhao — entry points, main modules, data flow.' Phir detail mein jao. Top-down approach se AI ko bada picture milta hai." },
      { h: "Key files feed karna", p: "Sab kuch dene ki zaroorat nahi. Entry file (main.jsx/App.jsx), routing, config, aur ek-do representative components dena hi kaafi hota hai context banane ke liye." },
      { h: "@-mentions / context attach", p: "Cursor, Copilot Chat, Continue jaise tools mein @file, @folder, @codebase mention karke specific context inject kar sakte ho — taaki model exact code padhe, hallucinate na kare.", code: "// Cursor / Continue chat\n@App.jsx @src/api/client.js\nIs file ke API calls ka error handling kaise improve karun?", lang: "js" },
      { h: "Repo indexing / embeddings", p: "Modern tools poore repo ko index (semantic embeddings) kar lete hain, jisse 'codebase-wide' sawaal pooch sakte ho bina manually file dale. Ye RAG-style retrieval hai." },
      { h: "Summarize-first strategy", p: "AI se pehle ek ARCHITECTURE.md draft karwao. Jo summary woh deta hai usse aap verify karte ho — galtiyan pakad ke correct karte ho — aur woh corrected summary aage ke prompts ka context ban jaati hai." }
    ],
    analogy: "Naya engineer jab company join karta hai, woh pehle din se hi random bug fix nahi karta. Pehle onboarding doc padhta hai, architecture diagram dekhta hai, senior se '5-minute tour' leta hai. AI ko bhi waisa hi onboarding chahiye — tabhi woh productive banta hai. 🧭",
    workflow: { type: "boxes", items: [
      { label: "Repo Index", sub: "embeddings ban", color: "#8B5CF6" },
      { label: "Summarize", sub: "architecture maango", color: "#3B82F6" },
      { label: "Verify", sub: "galtiyan fix", color: "#F59E0B" },
      { label: "Ask + Edit", sub: "context ke saath", color: "#22C55E" }
    ] },
    syntax: { code: "// Legacy codebase onboarding prompt\nTumhe ek existing React project diya gaya hai.\nPehle SIRF ye batao (code mat likho):\n1. Entry points kaunse hain?\n2. State management kaise hota hai?\n3. API layer kahan hai?\n4. Folder conventions kya lagte hain?\nMain verify karke aage badhunga.", note: "Pehle samajh, phir edit — ye golden rule hai.", lang: "js" },
    steps: [
      "Tool mein repo open karo aur indexing complete hone do (agar supported hai).",
      "High-level architecture ka summary maango — code abhi nahi.",
      "Summary verify karo, galtiyan correct karo, conventions clarify karo.",
      "Relevant files @-mention karke specific feature/area mein zoom-in karo.",
      "Ab actual task (bug fix / feature) ko detailed prompt ke saath do.",
      "AI ke output ko existing patterns ke against review karo.",
      "Acche samajh wale prompts ko ek doc/rules file mein save kar lo reuse ke liye."
    ],
    internals: { p: "Codebase-aware tools poore repo ko chunks mein todte hain, har chunk ka vector embedding banate hain aur vector DB mein store karte hain. Jab aap sawaal poochte ho, query ka embedding banta hai aur cosine similarity se relevant chunks retrieve hote hain — yahi RAG hai. Retrieved code prompt ke saath model ko milta hai.", code: "// Conceptual retrieval flow\nquery -> embedding -> vectorDB.search(topK=8)\n  -> relevant code chunks\n  -> prompt = systemRules + chunks + question\n  -> model.generate()", lang: "js" },
    examples: [
      { level: "Beginner", title: "Architecture summary maangna", code: "// PROMPT\nIs project ka structure 5 bullet points mein samjhao.\nEntry file, routing, state, API, aur styling approach batao.", lang: "js", explain: "Sabse pehla step — bada picture." },
      { level: "Intermediate", title: "Specific file ke saath sawaal", code: "// PROMPT (Cursor)\n@src/store/cartStore.js @src/api/orders.js\nCart checkout flow trace karo: state se API tak data kaise jaata hai?", lang: "js" },
      { level: "Advanced", title: "Legacy refactor planning", code: "// PROMPT\nYe 600-line component @LegacyDashboard.jsx hai.\nPehle ek refactor PLAN do (kaun se smaller components banenge),\ncode mat likho jab tak main plan approve na karun.", lang: "js", explain: "Plan-first se risky bade refactors safe bante hain." }
    ],
    notes: {
      concept: "AI ko codebase ka context dena = relevant files + architecture summary + conventions.",
      tip: "Hamesha 'summarize before edit' — pehle samajh verify karo.",
      warning: "Pura repo blindly paste mat karo — context window bharega aur quality giregi.",
      error: "Bina context ke 'fix this' bolna AI ko guess karne pe majboor karta hai → galat edits."
    },
    compare: { headers: ["Approach", "Result"], rows: [
      ["Direct 'fix bug' bina context", "Random guesses, galat patterns"],
      ["Summarize-first + key files", "Accurate, convention-aligned edits"],
      ["Pura repo paste", "Token waste, distracted model"],
      ["@-mention specific files", "Precise, focused context"]
    ] },
    mistakes: [
      { bad: "Poori 50 files ek prompt mein daal dena.", fix: "Sirf relevant 2-5 files @-mention karo." },
      { bad: "Architecture samjhe bina seedha refactor karwana.", fix: "Pehle summary + plan maango." },
      { bad: "AI ki summary blindly maan lena.", fix: "Verify karo — AI galtiyan karta hai." },
      { bad: "Conventions na batana.", fix: "Naming, folder, state patterns explicitly batao." }
    ],
    best: [
      "Top-down: pehle architecture, phir detail.",
      "Relevant files @-mention karo, pura repo nahi.",
      "Summarize-first, then verify, then edit.",
      "Repo indexing on rakho codebase-wide sawaalon ke liye.",
      "Verified summary ko reusable doc bana lo."
    ],
    security: "🔒 Codebase analyze karte waqt secrets (API keys, .env, tokens) prompt mein mat bhejo. Public/cloud AI tools mein proprietary code leak ho sakta hai — company policy check karo aur sensitive files ko ignore/exclude karo.",
    performance: "⚡ Sirf relevant context dene se kam tokens lagte hain, response fast aur sasta hota hai. Verified summary reuse karne se har baar repo re-explain nahi karna padta — fewer iterations, less cost.",
    tricky: [
      { title: "AI galat file assume karta hai", explain: "Agar @-mention nahi diya to AI maan leta hai ki code aisa hoga — aur galat edit suggest karta hai. Hamesha actual file context do." },
      { title: "Bada file truncate ho jaata hai", explain: "Context window limit ke kaaran lambi file ke beech ka hissa model 'bhool' sakta hai. Relevant section hi do ya file ko todo." }
    ],
    interview: {
      beginner: [
        { q: "AI ko existing codebase kaise samjhayein?", a: "Key files feed karke, @-mention karke, aur pehle architecture ka summary maang ke." },
        { q: "Summarize-first strategy kya hai?", a: "Edit se pehle AI se codebase ka summary maangna aur verify karna, taaki context accurate bane." }
      ],
      intermediate: [
        { q: "Repo indexing kaise kaam karta hai?", a: "Code ko chunks mein tod ke embeddings banaye jaate hain, vector DB mein store hote hain, aur query par similar chunks retrieve hote hain (RAG)." },
        { q: "Legacy code refactor karte waqt AI ke saath kya approach lein?", a: "Plan-first — pehle refactor plan maango, approve karo, phir incremental edits." }
      ],
      advanced: [
        { q: "Bade monorepo mein context window kaise manage karein?", a: "Semantic retrieval, @-mentions, aur module-wise scope — sirf relevant package/folder context do, pura repo nahi." },
        { q: "AI summary ka hallucination kaise rokein?", a: "Actual files attach karo, summary ko code ke against verify karo, aur high-confidence claims ko cross-check karo." }
      ]
    },
    mcqs: [
      { q: "Legacy codebase samajhne ka pehla step kya hona chahiye?", options: ["Seedha bug fix", "Architecture summary maangna", "Pura repo paste", "Tests delete karna"], answer: 1, explain: "Top-down summary se bada picture milta hai." },
      { q: "@codebase mention kis liye use hota hai?", options: ["Theme change", "Codebase-wide context inject karna", "File delete", "Build chalana"], answer: 1, explain: "Indexed repo se relevant context laata hai." }
    ],
    exercises: {
      easy: ["Apne project ka 5-bullet architecture summary AI se maango aur verify karo."],
      medium: ["Ek feature ka data flow @-mentions ke saath AI se trace karwao."],
      advanced: ["Ek 500+ line legacy component ka refactor plan banwao, code likhwaye bina pehle plan approve karo."]
    },
    summary: [
      "AI ko codebase samajhne ke liye onboarding chahiye, dump nahi.",
      "Top-down summary → verify → focused edits.",
      "@-mentions aur repo indexing context dete hain.",
      "Secrets prompt mein mat bhejo.",
      "Verified summary reuse karke time bachao."
    ],
    cheatsheet: [
      { h: "Summary prompt", code: "Is repo ka architecture 5 points mein samjhao, code mat likho." },
      { h: "Focused context", code: "@file1 @file2 — in files ka data flow trace karo." }
    ],
    projects: [
      "Naye team member ke liye AI se ARCHITECTURE.md generate karna.",
      "Legacy module ka dependency map banwana.",
      "Unknown repo open-source mein contribute karne se pehle samajhna.",
      "Bug ka root cause AI se codebase trace karwa ke dhoondhna."
    ],
    advanced: "🚀 MCP servers aur semantic-search tools se AI ko live codebase access de sakte ho — file system, git history, aur docs ek saath. Agentic tools khud relevant files dhoond ke padh lete hain.",
    quiz: [
      { q: "Pura repo paste karne ka nuksaan?", options: ["Fast hota hai", "Token waste + model distract", "Free hota hai", "Koi nahi"], answer: 1, explain: "Limited window bharta hai, quality girti hai." }
    ],
    related: ["folder-understanding", "make-ai-understand", "semantic-search", "rag-intro"]
  },

  "folder-understanding": {
    overview: "AI ko aapke project ki folder structure samajhana zaroori hai taaki woh naye files sahi jagah banaye aur imports galat na kare. Ek folder tree dena aur conventions explain karna sabse asaan tareeka hai. 🗂️",
    why: "Har team ki apni folder convention hoti hai — components, hooks, utils, api, store. Agar AI ko ye pata nahi, to woh file galat folder mein banata hai, ya import path galat likhta hai. Folder tree dene se AI ko 'kahaan kya rehta hai' clear ho jaata hai.",
    concept: [
      { h: "Folder tree dena", p: "Ek ASCII tree paste karna AI ke liye sabse readable format hai. Isse woh hierarchy aur naming patterns turant samajh leta hai." },
      { h: "Conventions explain karna", p: "Tree ke saath rules batao: 'Saare reusable UI src/components mein, page-level src/pages mein, API calls src/api mein.' Ye AI ke decisions guide karta hai." },
      { h: "Naming patterns", p: "Files kaise naam hoti hain — PascalCase components, camelCase hooks (useX), .test.js for tests. AI in patterns ko follow karega agar bataya jaaye.", code: "// Convention note example\nComponents: PascalCase (UserCard.jsx)\nHooks: useSomething.js\nAPI: src/api/<resource>.js\nTests: *.test.js (file ke paas)", lang: "js" },
      { h: "Index/barrel files", p: "Agar aap index.js se re-export karte ho (barrel pattern), AI ko batao — warna woh deep import paths likhega jo aapke style se match nahi karenge." }
    ],
    analogy: "Folder structure ek ghar ka floor plan hai. 🏠 Agar mehmaan ko pata na ho kitchen kahaan hai, woh glass washroom mein dhoondhega. AI ko floor plan do, woh har cheez sahi kamre mein rakhega.",
    syntax: { code: "// AI ko di gayi folder structure\nsrc/\n  components/   -> reusable UI\n  pages/        -> route-level screens\n  hooks/        -> custom hooks\n  api/          -> server calls\n  store/        -> global state\nNaya reusable button components/ mein banao.", note: "Tree + 1-line rule har folder ke liye = best.", lang: "js" },
    steps: [
      "Apne project ka folder tree generate karo (manually ya tool se).",
      "Har important folder ke saamne 1-line purpose likho.",
      "Naming conventions list karo (PascalCase, useX, etc).",
      "Barrel/index export pattern ho to mention karo.",
      "Prompt mein tree paste karke task do ('naya X yahaan banao').",
      "AI ke generated file path ko verify karo."
    ],
    folders: {
      note: "Typical React/Vite project structure jo AI ko diya jaata hai",
      tree: "src/\n├── components/      # reusable UI (PascalCase)\n│   ├── Button.jsx\n│   └── Modal.jsx\n├── pages/           # route-level screens\n│   ├── Home.jsx\n│   └── Profile.jsx\n├── hooks/           # custom hooks (useX)\n│   └── useAuth.js\n├── api/             # server calls\n│   └── users.js\n├── store/           # global state\n│   └── userStore.js\n├── utils/           # pure helpers\n│   └── formatDate.js\n└── App.jsx          # root + routing"
    },
    internals: "AI text-based hierarchy ko tokens mein padh ke ek implicit map banata hai: indentation depth = nesting level. Isiliye consistent indentation (2 ya 4 spaces) aur ├──/└── symbols important hain — clear structure model ke liye easier to parse hota hai.",
    examples: [
      { level: "Beginner", title: "Tree paste karke file banwana", code: "// PROMPT\nMera structure: src/components, src/pages, src/hooks.\nEk reusable Loader component banao — sahi folder mein rakho.", lang: "js" },
      { level: "Intermediate", title: "Convention enforce karna", code: "// PROMPT\nConventions: hooks useX naming, API src/api/<resource>.js.\nUsers fetch karne ke liye hook + API file dono banao.", lang: "js", explain: "AI dono files sahi naming + folder mein banayega." },
      { level: "Advanced", title: "Feature-folder pattern", code: "// PROMPT\nHum feature-based structure use karte hain:\nsrc/features/<feature>/{components,hooks,api}.\n'cart' feature ka skeleton banao isi pattern mein.", lang: "js" }
    ],
    notes: {
      concept: "Folder tree + per-folder purpose + naming rules = AI sahi jagah file banata hai.",
      tip: "Tree ko ek rules file (.cursorrules / README) mein rakho taaki har prompt mein repeat na karna pade.",
      warning: "Inconsistent tree formatting AI ko confuse karta hai — clean indentation use karo.",
      error: "Folder convention na batane se AI flat structure ya galat imports banata hai."
    },
    compare: { headers: ["Bina tree diye", "Tree + conventions diye"], rows: [
      ["File random folder mein", "Sahi folder mein"],
      ["Galat import paths", "Convention ke hisaab se imports"],
      ["Inconsistent naming", "Project naming match"]
    ] },
    mistakes: [
      { bad: "Sirf 'naya component banao' bolna.", fix: "Folder tree + target folder batao." },
      { bad: "Naming convention skip karna.", fix: "PascalCase/useX rules likho." },
      { bad: "Har prompt mein tree dobara likhna.", fix: "Rules file mein store karo." },
      { bad: "Barrel exports na batana.", fix: "Index re-export pattern mention karo." }
    ],
    best: [
      "Clean ASCII tree do with ├── └── symbols.",
      "Har folder ka 1-line purpose likho.",
      "Naming conventions explicitly list karo.",
      "Tree ko rules/README file mein persist karo.",
      "Feature-based ho to pattern clearly batao."
    ],
    security: "🔒 Folder tree share karte waqt sensitive paths (jaise secrets/, internal config) ya internal naming jo business logic leak kare, usse hata do agar public tool use kar rahe ho.",
    performance: "⚡ Folder tree ko ek baar rules file mein daal do — har prompt mein repeat karne se tokens bachenge aur responses consistent rahenge.",
    tricky: [
      { title: "Deep import vs barrel", explain: "Agar barrel (index.js) batao nahi to AI '../../components/Button/Button' jaise deep path likhega instead of '@/components'. Convention batao." },
      { title: "Tabs vs spaces in tree", explain: "Mixed indentation tree ko model misread karta hai. Uniform spacing rakho." }
    ],
    interview: {
      beginner: [
        { q: "AI ko folder structure kaise batayein?", a: "ASCII folder tree paste karke aur har folder ka purpose likh ke." },
        { q: "Folder tree dene ka fayda?", a: "AI files sahi jagah banata hai aur import paths sahi likhta hai." }
      ],
      intermediate: [
        { q: "Conventions ko har prompt mein repeat na karna pade, iske liye kya karein?", a: "Rules file (.cursorrules) ya README mein tree + conventions store karo." },
        { q: "Feature-based structure AI ko kaise samjhayein?", a: "Pattern (features/<feature>/{components,hooks,api}) explicitly batao with example." }
      ],
      advanced: [
        { q: "Bade monorepo ki structure AI ko kaise dein?", a: "Relevant package ka scoped tree do, pura monorepo nahi — context window bachao." }
      ]
    },
    mcqs: [
      { q: "AI ko folder structure batane ka best format?", options: ["Random text", "ASCII tree with conventions", "Screenshot only", "Sirf file names"], answer: 1, explain: "Tree + conventions clearest hota hai." },
      { q: "Conventions persist karne ke liye?", options: ["Har prompt repeat", "Rules/README file", "Yaad rakho", "Comment har file"], answer: 1, explain: "Rules file reuse aur consistency deta hai." }
    ],
    exercises: {
      easy: ["Apne project ka folder tree likh ke AI ko do aur ek component banwao."],
      medium: ["Naming conventions add karke hook + API file ek saath banwao."],
      advanced: ["Feature-folder pattern define karke ek poora feature skeleton generate karwao."]
    },
    summary: [
      "Folder tree = AI ka project floor plan.",
      "Har folder ka purpose + naming rules do.",
      "Rules file mein persist karke repeat avoid karo.",
      "Clean indentation se model better parse karta hai.",
      "Barrel/feature patterns explicitly batao."
    ],
    cheatsheet: [
      { h: "Tree prompt", code: "src/{components,pages,hooks,api}. Naya X sahi folder mein banao." },
      { h: "Convention note", code: "Components PascalCase, hooks useX, API src/api/<resource>.js" }
    ],
    projects: [
      "AI se project ke liye standard folder structure design karwana.",
      "Existing project ko feature-based structure mein reorganize karwana.",
      ".cursorrules file generate karna jisme tree + conventions ho.",
      "Onboarding doc ke liye annotated folder map banwana."
    ],
    advanced: "🚀 AI-friendly structure (consistent, predictable folders) banane se future AI edits zyada accurate hote hain. Ye ai-friendly-structure topic se connect karta hai.",
    quiz: [
      { q: "Tree mein inconsistent indentation ka asar?", options: ["Koi nahi", "Model misread karta hai", "Fast parse", "Better"], answer: 1, explain: "Uniform indentation zaroori hai." }
    ],
    related: ["analyze-codebase", "ai-friendly-structure", "make-ai-understand", "ai-rules-files"]
  },

  "component-relationships": {
    overview: "React mein components ek tree banate hain — parent child ko props deta hai, kuch state shared hoti hai. AI ko ye relationships samjhana zaroori hai taaki woh ek component edit karte waqt baaki ko na tode. 🧩",
    why: "Agar AI ko nahi pata ki ProductCard, Cart ka child hai aur props se data leta hai, to woh prop rename kar dega aur parent toot jaayega. Component relationships ka map dene se AI safe, ripple-aware edits karta hai.",
    concept: [
      { h: "Parent-child aur props", p: "Data upar se neeche props ke through behta hai. AI ko batao kaun kis ka parent hai aur kaunse props pass hote hain." },
      { h: "Shared / lifted state", p: "Jab do siblings ko same data chahiye, state parent mein lift hoti hai ya global store mein. AI ko ye source-of-truth batana zaroori hai." },
      { h: "Callbacks (data up)", p: "Child parent ko events callbacks (onChange, onClick) ke through bhejta hai. Ye relationship batao taaki AI handler signatures na tode.", code: "// Parent -> Child props, Child -> Parent callback\n<Cart>\n  <ProductCard\n    product={item}        // data down\n    onAdd={handleAdd}     // event up\n  />\n</Cart>", lang: "js" },
      { h: "Context / global state", p: "Theme, auth, cart jaise cross-cutting data Context ya store se aata hai — prop drilling se nahi. AI ko consumer aur provider dono batao." }
    ],
    analogy: "Component tree ek family tree jaisa hai. 👨‍👩‍👧 Parent paise (props) bachchon ko deta hai, bachche reports (callbacks) wapas dete hain. Agar AI ko family relations pata na hon, woh galat insaan ko paise de dega.",
    architecture: { type: "boxes", items: [
      { label: "App", sub: "root", color: "#8B5CF6" },
      { label: "CartProvider", sub: "shared state", color: "#D946EF" },
      { label: "Cart", sub: "parent", color: "#3B82F6" },
      { label: "ProductCard", sub: "props + onAdd", color: "#22C55E" },
      { label: "CartSummary", sub: "reads store", color: "#06B6D4" }
    ] },
    syntax: { code: "// AI ko diya gaya relationship map\nApp\n -> CartProvider (cart state holder)\n    -> Cart\n        -> ProductCard (props: product; callback: onAdd)\n        -> CartSummary (reads cart total)\nEdit karte waqt ProductCard ke props signature mat todo.", note: "Relationship map = safe edits ka insurance.", lang: "js" },
    steps: [
      "Component tree identify karo (kaun kis ka child).",
      "Har relation ke props aur callbacks note karo.",
      "Shared/global state ka source-of-truth dhoondo.",
      "Ye map AI ko prompt mein do (ya diagram describe karo).",
      "Edit task dete waqt 'in props ko mat todo' constraint add karo.",
      "AI ke change ke baad parent + sibling components verify karo."
    ],
    internals: { p: "React internally ek component tree (fiber tree) maintain karta hai. Props change hone par sirf affected subtree re-render hota hai. AI ko relationships batane se woh samajhta hai ki ek prop change ka ripple effect kahaan tak jaayega.", code: "// Mental model AI ko dena\nProductCard ka 'onAdd' rename karoge to\nCart (parent) ka handler bhi update karna padega,\nwarna runtime error: onAdd is not a function", lang: "js" },
    examples: [
      { level: "Beginner", title: "Tree batake edit", code: "// PROMPT\nCart -> ProductCard (props: product, onAdd).\nProductCard mein 'Add to wishlist' button add karo,\nnaya callback onWishlist bhi parent tak wire karo.", lang: "js" },
      { level: "Intermediate", title: "Shared state samjhana", code: "// PROMPT\nCart state CartProvider (context) mein hai.\nCartSummary se total dikhao — context se consume karo,\nprops drilling mat karo.", lang: "js", explain: "Source-of-truth clear hone se AI sahi approach choose karta hai." },
      { level: "Advanced", title: "Refactor without breakage", code: "// PROMPT\nProductCard ko presentational rakho.\nData fetching parent Cart mein le jao.\nKaunse props move honge — pehle list karo, phir code.", lang: "js" }
    ],
    notes: {
      concept: "Component relationships = parent/child + props + callbacks + shared state.",
      tip: "Edit prompt mein 'in props/signatures ko preserve karo' constraint zaroor do.",
      warning: "Prop rename ka ripple parent tak jaata hai — AI ko warn karo.",
      error: "Relationship na batane se AI ek component fix karke doosra tod deta hai."
    },
    compare: { headers: ["Data Down", "Events Up"], rows: [
      ["props se", "callbacks se"],
      ["parent -> child", "child -> parent"],
      ["product={...}", "onAdd={fn}"],
      ["read-only child", "child triggers parent logic"]
    ] },
    mistakes: [
      { bad: "Sirf ek file deke 'isko theek karo'.", fix: "Parent + child dono ka relation batao." },
      { bad: "Prop rename karwana bina parent update.", fix: "Ripple ka mention karo, dono update karwao." },
      { bad: "Shared state source na batana.", fix: "Context/store source-of-truth clarify karo." },
      { bad: "Callback signature ignore karna.", fix: "onX signatures preserve karne ko bolo." }
    ],
    best: [
      "Component tree + props/callbacks ka map do.",
      "Shared state ka source-of-truth batao.",
      "Edit pe 'signatures preserve' constraint lagao.",
      "Bade changes pe pehle 'kaunse props move honge' poochho.",
      "Change ke baad parent + siblings verify karo."
    ],
    security: "🔒 Component relationships mein agar auth/permission logic hai (jaise role-based rendering), AI ko clearly batao taaki woh galti se access control na hata de.",
    performance: "⚡ Relationships samajhne se AI unnecessary re-renders avoid karne wale changes suggest kar sakta hai (memo, lifting state correctly), aur ek-shot mein sahi edit deta hai — kam iterations.",
    tricky: [
      { title: "Prop rename ka silent break", code: "// child\n<ProductCard onAdd={...} />\n// AI ne child mein onClick kar diya, parent abhi onAdd bhej raha", output: "onAdd is not used; button click kaam nahi karta", explain: "Naam mismatch silent fail deta hai — dono jagah sync zaroori." },
      { title: "Prop drilling vs context", explain: "Deep tree mein prop drilling AI badha deta hai; agar context available hai to woh better — source batao." }
    ],
    interview: {
      beginner: [
        { q: "Data parent se child kaise jaata hai?", a: "Props ke through (data down)." },
        { q: "Child parent ko kaise communicate karta hai?", a: "Callback functions (events up) ke through." }
      ],
      intermediate: [
        { q: "AI ko component relationships kyun batana zaroori hai?", a: "Taaki ek component edit karte waqt woh props/callbacks tode na aur parent/siblings break na hon." },
        { q: "Shared state ki jaankari kyun important hai?", a: "Source-of-truth pata hone se AI sahi jagah (lift ya store) data manage karta hai." }
      ],
      advanced: [
        { q: "Presentational vs container split AI se kaise karwayein?", a: "Pehle props migration plan maango, phir data fetching ko container mein move karwao." }
      ]
    },
    mcqs: [
      { q: "Data parent se child kaise jaata hai?", options: ["Callbacks", "Props", "Refs", "Global only"], answer: 1, explain: "Props = data down." },
      { q: "AI ko relationship map dena kyun?", options: ["Speed", "Safe edits, ripple avoid", "Styling", "Tests"], answer: 1, explain: "Ek change doosre ko na tode." }
    ],
    exercises: {
      easy: ["Apne ek feature ka parent-child tree props ke saath likho aur AI ko do."],
      medium: ["AI se ek naya callback child se parent tak wire karwao."],
      advanced: ["Ek component ko presentational banwao, props migration plan pehle banwa ke."]
    },
    summary: [
      "Components ek tree banate hain: props down, callbacks up.",
      "Shared state ka source-of-truth batana zaroori.",
      "Relationship map AI ko safe edits karne deta hai.",
      "Prop rename ka ripple parent tak jaata hai.",
      "Edit ke baad sibling/parent verify karo."
    ],
    cheatsheet: [
      { h: "Relation map", code: "Cart -> ProductCard (props: product; cb: onAdd)" },
      { h: "Safe-edit constraint", code: "Props/callback signatures preserve karo." }
    ],
    projects: [
      "AI se component dependency diagram generate karwana.",
      "Prop drilling ko context mein refactor karwana.",
      "Ek bade component ko chhote presentational + container mein todna.",
      "Shared state ko store mein consolidate karwana."
    ],
    advanced: "🚀 Bade apps mein component graph tools (jaise React DevTools tree export) se relationships AI ko de sakte ho. Architecture map rules file mein rakho.",
    quiz: [
      { q: "onAdd ko onClick rename kiya sirf child mein — kya hoga?", options: ["Sab theek", "Parent ka onAdd unused, button dead", "Faster", "Auto-fix"], answer: 1, explain: "Dono jagah sync chahiye." }
    ],
    related: ["api-state-flow", "analyze-codebase", "react-ai-integration", "multi-file-refactoring"]
  },

  "api-state-flow": {
    overview: "Ek React app mein data API se aata hai → state/store mein jaata hai → component render hota hai. AI ko ye flow samjhana zaroori hai taaki woh data fetching, caching aur UI update sahi jagah handle kare. 🔄",
    why: "Agar AI ko nahi pata ki aap React Query use karte ho ya Redux ya plain useState, to woh galat jagah fetch lagayega — ya double fetch, ya stale data. API + state flow clear hone se AI consistent, idiomatic code likhta hai.",
    concept: [
      { h: "Data fetching layer", p: "API calls ek dedicated layer (src/api) mein hone chahiye, components mein scatter nahi. AI ko ye boundary batao." },
      { h: "State/store layer", p: "Fetched data kahaan store hota hai — local useState, Context, Redux, Zustand, ya React Query cache. Source clarify karo." },
      { h: "Component consumption", p: "Component store/hook se data read karta hai aur render karta hai. Loading/error states bhi handle hone chahiye.", code: "// Clean flow\napi/users.js   -> fetchUsers()\nstore/useUsers -> caches data\nUserList.jsx   -> useUsers() -> render", lang: "js" },
      { h: "Mutations aur sync", p: "Data update (POST/PUT) ke baad store/cache invalidate ya update hona chahiye taaki UI fresh rahe. AI ko ye pattern batao." }
    ],
    analogy: "Socho restaurant: 🍽️ API = kitchen (khana banata hai), store = serving counter (ready dishes rakhta hai), component = waiter (customer ko serve karta hai). Agar waiter seedha kitchen mein ghuse to chaos — har layer ka apna kaam hai.",
    architecture: { type: "boxes", items: [
      { label: "API Layer", sub: "fetch/axios", color: "#8B5CF6" },
      { label: "Store/Cache", sub: "state hold", color: "#D946EF" },
      { label: "Hook", sub: "useUsers()", color: "#3B82F6" },
      { label: "Component", sub: "render UI", color: "#22C55E" },
      { label: "User Action", sub: "mutation", color: "#F59E0B" }
    ] },
    visual: { type: "timeline", items: [
      { year: "1", text: "User screen open karta hai" },
      { year: "2", text: "Hook fetch trigger karta hai (API layer)" },
      { year: "3", text: "Response store/cache mein save" },
      { year: "4", text: "Component data read karke render" },
      { year: "5", text: "User action -> mutation -> cache invalidate -> re-render" }
    ] },
    syntax: { code: "// AI ko diya gaya flow\nUI event\n  -> hook (useUsers)\n  -> api/users.js fetchUsers()\n  -> store/cache update\n  -> component re-render with data\nFetch sirf api layer mein, component mein nahi.", note: "Layer boundaries batao = idiomatic code.", lang: "js" },
    steps: [
      "Data fetching kahaan hota hai identify karo (api layer?).",
      "State manager batao (useState/Context/Redux/Zustand/React Query).",
      "Component data kaise consume karta hai note karo.",
      "Loading/error handling pattern batao.",
      "Mutation ke baad cache/store sync ka rule batao.",
      "Ye flow AI ko do, phir feature/fix task assign karo.",
      "AI ke code mein layer leakage check karo (component mein direct fetch?)."
    ],
    internals: { p: "React Query jaise tools server state ko client state se alag manage karte hain: caching, background refetch, staleTime, aur automatic invalidation. AI ko batao ki aap kaunsa pattern use karte ho — warna woh manual useEffect+useState fetch likhega jo aapke setup se mismatch karega.", code: "// React Query pattern\nfunction useUsers() {\n  return useQuery({\n    queryKey: ['users'],\n    queryFn: fetchUsers\n  })\n}\n// mutation ke baad: queryClient.invalidateQueries(['users'])", lang: "js" },
    examples: [
      { level: "Beginner", title: "Flow batake fetch", code: "// PROMPT\nHum fetch api/ layer mein karte hain, state useState mein.\nUserList component banao jo api/users.js se data laaye,\nloading + error handle kare.", lang: "js" },
      { level: "Intermediate", title: "React Query pattern", code: "// PROMPT\nHum React Query use karte hain.\n'todos' ke liye useTodos hook banao (useQuery),\naur addTodo mutation jo cache invalidate kare.", lang: "js", explain: "Pattern batane se AI idiomatic RQ code likhta hai." },
      { level: "Advanced", title: "Optimistic update", code: "// PROMPT\nLike button pe optimistic update karo:\ncache turant update, API fail ho to rollback.\nReact Query onMutate/onError use karo.", lang: "js" }
    ],
    notes: {
      concept: "Data flow: API layer -> store/cache -> hook -> component. Mutation cache sync kare.",
      tip: "State manager ka naam zaroor batao taaki woh idiomatic code de.",
      warning: "Component ke andar direct fetch (useEffect) anti-pattern ho sakta hai agar aapke paas dedicated layer hai.",
      error: "Mutation ke baad cache invalidate na karna = stale UI."
    },
    compare: { headers: ["Layer", "Responsibility"], rows: [
      ["API", "Server se data laana"],
      ["Store/Cache", "Data hold + share"],
      ["Hook", "Logic + access"],
      ["Component", "Render + UI events"]
    ] },
    mistakes: [
      { bad: "State manager na batana.", fix: "Redux/RQ/Zustand explicitly batao." },
      { bad: "Component mein direct fetch karwana.", fix: "API layer ke through fetch karwao." },
      { bad: "Mutation ke baad refresh bhool jaana.", fix: "Cache invalidate/update rule batao." },
      { bad: "Loading/error ignore karna.", fix: "Dono states handle karwao." }
    ],
    best: [
      "API calls ko dedicated layer mein rakho.",
      "State manager AI ko clearly batao.",
      "Loading + error states hamesha handle karwao.",
      "Mutation ke baad cache sync karwao.",
      "Optimistic updates ke liye rollback bhi banwao."
    ],
    security: "🔒 API flow mein auth tokens secure storage se aane chahiye, prompt mein actual tokens mat daalo. AI ko sirf pattern batao, secrets nahi.",
    performance: "⚡ Sahi caching (React Query staleTime) batane se AI extra network calls avoid karta hai. Idiomatic pattern dene se kam re-renders aur fast UI milta hai.",
    tricky: [
      { title: "Double fetch", code: "// AI ne hook AUR component dono mein fetch laga diya", output: "Same data 2 baar fetch, waterfall", explain: "Single source-of-truth (hook) batane se ye bachta hai." },
      { title: "Stale closure in useEffect", explain: "Manual fetch mein dependency array galat ho to stale data aata hai — RQ jaise tools ye abstract kar dete hain." }
    ],
    interview: {
      beginner: [
        { q: "React app mein data flow kya hai?", a: "API se data -> state/store -> component render." },
        { q: "API calls kahaan honi chahiye?", a: "Dedicated api layer mein, components mein scatter nahi." }
      ],
      intermediate: [
        { q: "Mutation ke baad UI fresh kaise rakhein?", a: "Cache/store invalidate ya update karke (jaise React Query invalidateQueries)." },
        { q: "AI ko state manager batana kyun zaroori?", a: "Taaki woh aapke pattern (RQ/Redux) ke hisaab se idiomatic code likhe, mismatch na ho." }
      ],
      advanced: [
        { q: "Optimistic update kaise kaam karta hai?", a: "UI turant update, request bhejo; fail hone par rollback (onMutate/onError)." },
        { q: "Server state vs client state ka antar?", a: "Server state remote + async (cache, refetch chahiye); client state local UI state hai. RQ server state ke liye banaya gaya hai." }
      ]
    },
    mcqs: [
      { q: "Sahi data flow kaunsa hai?", options: ["Component -> API direct har jagah", "API -> store -> hook -> component", "Store -> API", "Random"], answer: 1, explain: "Layered flow clean hota hai." },
      { q: "Mutation ke baad stale UI kyun?", options: ["Slow net", "Cache invalidate nahi kiya", "Browser bug", "Props"], answer: 1, explain: "Cache sync zaroori hai." }
    ],
    exercises: {
      easy: ["Apne app ka API->state->component flow likh ke AI ko do, ek list component banwao."],
      medium: ["React Query hook + mutation banwao with cache invalidation."],
      advanced: ["Optimistic update with rollback implement karwao ek like/favorite feature pe."]
    },
    summary: [
      "Data: API -> store/cache -> hook -> component.",
      "State manager AI ko batao for idiomatic code.",
      "Loading/error hamesha handle karo.",
      "Mutation ke baad cache invalidate/update karo.",
      "Component mein direct fetch se bacho agar layer hai."
    ],
    cheatsheet: [
      { h: "Flow", code: "API layer -> store/cache -> hook -> component" },
      { h: "RQ invalidate", code: "queryClient.invalidateQueries(['users'])" }
    ],
    projects: [
      "AI se data-fetching layer standardize karwana.",
      "useEffect fetch ko React Query mein migrate karwana.",
      "Optimistic like/comment feature banwana.",
      "Global store (Zustand/Redux) ka data flow document karwana."
    ],
    advanced: "🚀 Server components, streaming, aur RAG-based data ke saath flow aur complex hota hai. AI ko clear data contracts (types/shapes) dena future-proof karta hai.",
    quiz: [
      { q: "Server state best manage karta hai?", options: ["useState", "React Query", "localStorage", "Refs"], answer: 1, explain: "RQ caching + refetch + invalidation deta hai." }
    ],
    related: ["component-relationships", "analyze-codebase", "react-ai-integration", "building-ai-features"]
  },

  "make-ai-understand": {
    overview: "Ye master strategy hai: AI ko aapka project poori tarah samajhane ke liye README, project rules file, documentation, feature docs, aur naming conventions ka combo. Sab milke AI ka 'project knowledge' banate hain. 📚",
    why: "Ek-ek prompt mein context dena thakaane wala aur inconsistent hai. Agar aap docs aur rules file project mein rakhte ho, to AI har baar wahi context automatically padhta hai — consistent, accurate output milta hai bina baar-baar samjhaye.",
    concept: [
      { h: "README.md", p: "Project ka overview, setup, tech stack, aur key decisions. AI sabse pehle yahi padh ke big picture banata hai." },
      { h: "Rules file (.cursorrules / AGENTS.md)", p: "Coding conventions, do's/don'ts, preferred libraries — ye file AI ko har prompt mein silently guide karti hai. Lead-in to ai-rules-files topic." },
      { h: "Feature docs", p: "Har bade feature ka chhota doc (kaise kaam karta hai, kaunse files involved) AI ko targeted context deta hai.", code: "// docs/features/cart.md (excerpt)\n# Cart Feature\n- State: store/cartStore.js (Zustand)\n- API: api/cart.js\n- UI: components/Cart/*\n- Rule: prices paise mein store, display pe /100", lang: "js" },
      { h: "Naming conventions doc", p: "Consistent naming (components, hooks, files) document karna AI ko predictable banata hai — woh aapke style mein code likhta hai." },
      { h: "Inline comments + JSDoc", p: "Complex logic pe comments aur types AI ko intent samjhate hain — woh sahi assumptions banata hai." }
    ],
    analogy: "Naye employee ke liye aap company wiki, coding guidelines, aur onboarding docs banate ho — phir woh khud padh ke kaam shuru kar deta hai bina aapko baar-baar interrupt kiye. AI ke liye docs + rules file wahi wiki hai. 🏢",
    workflow: { type: "boxes", items: [
      { label: "README", sub: "big picture", color: "#8B5CF6" },
      { label: "Rules File", sub: "conventions", color: "#D946EF" },
      { label: "Feature Docs", sub: "targeted", color: "#3B82F6" },
      { label: "Naming Doc", sub: "consistency", color: "#22C55E" },
      { label: "AI reads all", sub: "smart edits", color: "#F59E0B" }
    ] },
    syntax: { code: "// .cursorrules (example)\nYou are working on a React + Vite + Zustand app.\n- Use functional components + hooks only.\n- API calls go in src/api/.\n- State in src/store/ (Zustand).\n- Components: PascalCase. Hooks: useX.\n- Always handle loading + error states.\n- Do not add new dependencies without asking.", note: "Rules file = persistent context, har prompt mein apply.", lang: "js" },
    steps: [
      "README.md likho: overview, stack, setup, key decisions.",
      "Rules file banao with conventions + do's/don'ts.",
      "Important features ke liye chhote docs likho (docs/features/).",
      "Naming conventions document karo.",
      "Complex logic pe comments/JSDoc add karo.",
      "AI tool ko in files ka access do (auto-read ya @-mention).",
      "Time ke saath docs update karte raho (living docs)."
    ],
    folders: {
      note: "AI ko samajhane ke liye docs + rules layout",
      tree: "project/\n├── README.md            # overview + stack + setup\n├── .cursorrules         # AI coding conventions\n├── AGENTS.md            # agent/AI instructions\n├── docs/\n│   ├── architecture.md  # system design\n│   ├── conventions.md   # naming + patterns\n│   └── features/\n│       ├── cart.md      # cart feature doc\n│       └── auth.md      # auth feature doc\n└── src/\n    ├── components/\n    ├── store/\n    └── api/"
    },
    examples: [
      { level: "Beginner", title: "README ko context banana", code: "// PROMPT\n@README.md padh ke batao hum kaunsa state manager\nuse karte hain, phir usi pattern mein ek counter store banao.", lang: "js" },
      { level: "Intermediate", title: "Rules file enforce", code: "// .cursorrules me likha:\n// 'API calls only in src/api/'\n// PROMPT\nProducts fetch karne ka code banao (rules follow karo).", lang: "js", explain: "Rules file ki wajah se AI fetch sahi layer mein dalega." },
      { level: "Advanced", title: "Feature doc se kaam", code: "// PROMPT\n@docs/features/cart.md padho.\nCart mein 'apply coupon' add karo — prices paise mein\nstore karne wale rule ka dhyaan rakho.", lang: "js" }
    ],
    notes: {
      concept: "README + rules file + feature docs + naming = AI ka persistent project knowledge.",
      tip: "Rules file mein 'don't add deps without asking' jaise guardrails zaroor daalo.",
      warning: "Stale docs AI ko galat context dete hain — update karte raho.",
      error: "Sirf prompts pe depend karna = inconsistent results har session mein."
    },
    compare: { headers: ["Sirf prompts", "Docs + Rules file"], rows: [
      ["Har baar context repeat", "Auto context, repeat nahi"],
      ["Inconsistent output", "Consistent, convention-aligned"],
      ["Galat assumptions", "Project-aware edits"],
      ["Onboarding mushkil", "Self-serve AI"]
    ] },
    mistakes: [
      { bad: "Koi README/docs nahi.", fix: "Minimum README + rules file banao." },
      { bad: "Rules file likh ke bhool jaana.", fix: "Living doc — regularly update." },
      { bad: "Sab kuch ek hi file mein cram.", fix: "Feature-wise docs split karo." },
      { bad: "Conventions document na karna.", fix: "Naming + patterns ek doc mein likho." }
    ],
    best: [
      "README pehle: overview + stack + setup.",
      "Rules file with conventions + guardrails.",
      "Feature-wise chhote docs.",
      "Naming conventions document karo.",
      "Docs ko living rakho — update regularly.",
      "AI tool ko auto-read access do."
    ],
    security: "🔒 README/docs mein secrets, internal URLs, ya customer data mat daalo — ye files AI tools aur shayad public repo dono ko visible hote hain.",
    performance: "⚡ Persistent docs/rules se har prompt mein context repeat nahi karna padta — kam tokens, kam iterations, fast aur consistent output.",
    tricky: [
      { title: "Stale doc trap", explain: "Agar doc purana hai (jaise abhi React Query use karte ho par doc Redux kehta hai) to AI galat code dega. Docs ko code ke saath sync rakho." },
      { title: "Rules file ignore", explain: "Kuch tools rules file partially follow karte hain agar bahut lambi ho. Concise, prioritized rules likho." }
    ],
    interview: {
      beginner: [
        { q: "AI ko project samajhane ka sabse achha tareeka?", a: "README, rules file, aur feature docs banana taaki AI ko persistent context mile." },
        { q: "Rules file kya karti hai?", a: "AI ko coding conventions aur guardrails har prompt mein silently provide karti hai." }
      ],
      intermediate: [
        { q: "Prompts vs docs — kyun docs better?", a: "Docs persistent + consistent context dete hain; prompts har baar repeat aur inconsistent hote hain." },
        { q: "Feature docs kis liye?", a: "Targeted context — AI specific feature ke files/rules turant samajhta hai." }
      ],
      advanced: [
        { q: "Living documentation strategy kya hai?", a: "Docs ko code ke saath sync rakhna, har major change pe update, taaki AI ka context kabhi stale na ho." }
      ]
    },
    mcqs: [
      { q: "AI ka persistent context kaunsa file deta hai?", options: ["package.json", "Rules file (.cursorrules)", "index.html", "node_modules"], answer: 1, explain: "Rules file conventions har prompt mein apply karti hai." },
      { q: "Stale docs ka nuksaan?", options: ["Tezi", "AI galat context", "Kuch nahi", "Better"], answer: 1, explain: "Purana doc galat code deta hai." }
    ],
    exercises: {
      easy: ["Apne project ke liye ek chhota README likho with stack + setup."],
      medium: ["Ek .cursorrules file banao with 5 conventions + 2 guardrails."],
      advanced: ["Ek feature ka doc likho aur AI se usi doc ke basis par feature extend karwao."]
    },
    summary: [
      "README + rules file + feature docs = AI project knowledge.",
      "Persistent context = consistent, accurate edits.",
      "Conventions + guardrails rules file mein.",
      "Docs ko living rakho, sync karte raho.",
      "Secrets docs mein kabhi mat daalo."
    ],
    cheatsheet: [
      { h: "Rules file start", code: "You are working on a React+Vite+Zustand app. Functional components only." },
      { h: "Feature doc", code: "# Feature: state file, api file, key rules" }
    ],
    projects: [
      "Project ke liye complete docs/ folder + rules file set karna.",
      "Existing project ke liye AI se README generate karwana.",
      "Feature docs library banana team ke liye.",
      "Naming convention guide document karna."
    ],
    advanced: "🚀 Project memory aur MCP ke saath AI persistent knowledge access kar sakta hai — rules file + docs is foundation ka pehla step hai. Aage ai-rules-files dekho.",
    quiz: [
      { q: "Persistent project context ka best source?", options: ["Chat history", "Docs + rules file", "Comments only", "Commit msgs"], answer: 1, explain: "Docs aur rules file reliably padhe jaate hain." }
    ],
    related: ["ai-rules-files", "documentation-strategy", "project-knowledge", "folder-understanding"]
  },

  "good-vs-bad-prompt": {
    overview: "Ek achha prompt specific, context-rich, aur constrained hota hai; bura prompt vague aur assumption-bhara. Same AI, alag prompt = bilkul alag output quality. ✍️",
    why: "AI 'mind reader' nahi hai. Vague prompt 'fix the code' AI ko guess karne pe majboor karta hai. Specific prompt with context aur constraints se aapko pehli baar mein sahi output milta hai — kam back-and-forth, kam frustration.",
    concept: [
      { h: "Specificity", p: "Exactly kya chahiye batao. 'Make it better' vs 'extract this into a reusable hook with TypeScript types'." },
      { h: "Context dena", p: "Relevant code, framework, constraints batao. Context ke bina AI generic/galat code deta hai." },
      { h: "Constraints", p: "Limits batao: 'no new dependencies', 'keep it under 50 lines', 'use existing utils'. Constraints output ko aapke project se align karte hain.", code: "// BAD\nfix this\n\n// GOOD\nIs function mein null check add karo. Existing\nformatDate util use karo, naya dependency mat add karo.", lang: "js" },
      { h: "Examples dena (few-shot)", p: "Ek example output dikhana AI ko exact format/style samjhata hai. 'Aise hi baaki banao'." },
      { h: "Expected output format", p: "Batao kaisa output chahiye — sirf code, ya explanation bhi, ya diff. Format clarity revisions bachati hai." }
    ],
    analogy: "Tailor ko 'kapde silo' bolna vs 'navy blue formal shirt, slim fit, 40 size, full sleeves' bolna. 🧵 Pehle mein kuch bhi mil sakta hai; doosre mein exactly jo chahiye. Prompt bhi waisa hi — jitna specific, utna accurate.",
    syntax: { code: "// GOOD PROMPT TEMPLATE\n[Context]: React + Vite app, Zustand store.\n[Task]: UserList component banao jo api/users.js se fetch kare.\n[Constraints]: loading + error handle karo, no new deps.\n[Output]: sirf component code do.", note: "Context + Task + Constraints + Output format = reliable prompt.", lang: "js" },
    steps: [
      "Task ko ek line mein clearly likho (kya chahiye).",
      "Relevant context add karo (framework, files, patterns).",
      "Constraints batao (deps, length, libs).",
      "Agar specific style chahiye to ek example do.",
      "Output format specify karo (code only / with explain).",
      "Output verify karo, vague rehne par refine karke dobara poochho."
    ],
    examples: [
      { level: "Beginner", title: "Vague vs specific", code: "// BAD\nbutton banao\n\n// GOOD\nEk reusable Button component banao: props variant\n('primary'|'secondary') aur onClick. Tailwind classes use\nkaro, PascalCase naming.", lang: "js", explain: "Specific prompt exact component deta hai." },
      { level: "Intermediate", title: "Context-rich fix", code: "// BAD\nye slow hai theek karo\n\n// GOOD\nIs list 1000 items render karti hai aur lag karti hai.\nReact.memo + key fix karke optimize karo, virtualization\nmat add karo abhi.", lang: "js" },
      { level: "Advanced", title: "Constrained refactor", code: "// BAD\nis code ko achha banao\n\n// GOOD\nIs 200-line component ko 3 smaller components mein todo.\nProps signatures preserve karo, existing useCart hook reuse\nkaro, naya dependency mat add karo. Pehle plan do.", lang: "js" }
    ],
    notes: {
      concept: "Good prompt = specific + context + constraints + format. Bad = vague + assumption.",
      tip: "Template use karo: Context / Task / Constraints / Output.",
      warning: "Over-constraining bhi bura — itne rules ki AI confuse ho jaaye. Balance rakho.",
      error: "'Fix this' jaise prompts AI ko guess karne dete hain → galat output."
    },
    compare: { headers: ["Bad Prompt", "Good Prompt"], rows: [
      ["fix this", "is function mein null check add karo, X util use karo"],
      ["make it better", "extract into reusable hook with types"],
      ["build a form", "react-hook-form se login form, email+password validation"],
      ["optimize", "list render slow hai, memo + keys se fix karo"]
    ] },
    mistakes: [
      { bad: "'Fix the bug' bina bug describe kiye.", fix: "Bug ka behavior + expected result batao." },
      { bad: "Context skip karna.", fix: "Framework, files, patterns do." },
      { bad: "No constraints.", fix: "Deps/length/libs limits batao." },
      { bad: "Output format na batana.", fix: "'Sirf code' ya 'code + explain' specify karo." }
    ],
    best: [
      "Context + Task + Constraints + Output template follow karo.",
      "Specific raho — exactly kya chahiye.",
      "Style chahiye to example do (few-shot).",
      "Constraints se project alignment lao.",
      "Output verify aur iteratively refine karo."
    ],
    security: "🔒 Prompt mein real secrets, customer data, ya proprietary algorithms paste mat karo — chahe achha prompt ho. Placeholder use karo (YOUR_API_KEY).",
    performance: "⚡ Specific prompt = pehli baar sahi output = kam iterations = kam tokens aur cost. Vague prompts multiple rounds maangte hain.",
    tricky: [
      { title: "Over-specification", explain: "Itne contradictory constraints dena ki AI confuse ho jaaye. Clear, non-conflicting rules rakho." },
      { title: "Hidden assumptions", code: "// 'login form banao'\n// AI ne email/password maan liya, par tumhe phone OTP chahiye tha", explain: "Assumption explicitly clear karo." }
    ],
    interview: {
      beginner: [
        { q: "Achhe prompt ke 3 elements?", a: "Specificity, context, aur constraints." },
        { q: "Vague prompt ka nuksaan?", a: "AI guess karta hai, galat ya generic output deta hai." }
      ],
      intermediate: [
        { q: "Few-shot prompting kya hai?", a: "Prompt mein ek-do example dena taaki AI exact format/style follow kare." },
        { q: "Output format batane ka fayda?", a: "Unnecessary text avoid hota hai, exactly jo chahiye milta hai." }
      ],
      advanced: [
        { q: "Over-prompting kya hai aur kaise avoid karein?", a: "Itne ya conflicting constraints ki AI confuse ho — clear, prioritized, non-conflicting rules likho." }
      ]
    },
    mcqs: [
      { q: "Kaunsa better prompt hai?", options: ["fix this", "is function mein null check add karo X util se", "make good", "do it"], answer: 1, explain: "Specific + context + constraint." },
      { q: "Few-shot prompting kya deta hai?", options: ["Speed", "Format/style example", "Free tokens", "Auto-test"], answer: 1, explain: "Example se exact style milta hai." }
    ],
    exercises: {
      easy: ["Ek vague prompt likho, phir usko specific banao (before/after)."],
      medium: ["Context+Task+Constraints+Output template se ek feature prompt likho."],
      advanced: ["Few-shot example deke AI se consistent formatted output generate karwao."]
    },
    summary: [
      "Good prompt = specific + context + constraints + format.",
      "Bad prompt = vague, assumption-bhara.",
      "Template: Context / Task / Constraints / Output.",
      "Few-shot example exact style deta hai.",
      "Specific prompt = kam iterations + cost."
    ],
    cheatsheet: [
      { h: "Prompt template", code: "[Context][Task][Constraints][Output format]" },
      { h: "Bad -> Good", code: "fix this -> add null check using existing X util, no new deps" }
    ],
    projects: [
      "Team ke liye prompt template library banana.",
      "Vague tickets ko good-prompt mein convert karne ki habit.",
      "Few-shot prompts se consistent code generation pipeline.",
      "Prompt quality review checklist banana."
    ],
    advanced: "🚀 Aage chal ke context-prompting, chain-of-thought, aur role-based prompting techniques se aur fine control milta hai. Good prompt foundation hai.",
    quiz: [
      { q: "Specific prompt ka cost benefit?", options: ["Mehnga", "Kam iterations, kam cost", "No effect", "Slow"], answer: 1, explain: "Pehli baar sahi = kam rounds." }
    ],
    related: ["context-prompting", "chain-of-thought", "role-step-prompting", "what-is-context"]
  },

  "context-prompting": {
    overview: "Context-based prompting matlab model ko sawaal poochne se PEHLE sahi files, snippets, aur requirements dena. Jitna relevant context, utna accurate jawab — AI guess nahi karta. 📎",
    why: "AI ka jawab uske paas maujood context jitna achha hota hai. Bina context ke woh general knowledge se generic code deta hai jo aapke project se match nahi karta. Sahi context dene se output aapke actual code, style aur requirements ke hisaab se aata hai.",
    concept: [
      { h: "Relevant code dena", p: "Sirf zaroori files/snippets attach karo — jo task se directly related hain. @-mention ya paste karke." },
      { h: "Requirements clarify", p: "Business rules, edge cases, aur expected behavior pehle batao. AI ko 'kya banana hai' nahi sirf 'kaise' bhi pata ho." },
      { h: "Existing patterns dikhana", p: "Ek similar existing component/function dikhao taaki AI usi style mein naya banaye — consistency.", code: "// CONTEXT-FIRST PROMPT\nYe mera existing useUsers hook hai (paste).\nIsi pattern mein useProducts hook banao,\nsame error handling style use karo.", lang: "js" },
      { h: "Constraints + types", p: "Data shapes, types, aur limits dena AI ko precise banata hai — woh sahi structure return karta hai." }
    ],
    analogy: "Doctor ko 'pet dard hai' bolna vs reports, history, aur symptoms dena. 🩺 Jitni zyada relevant info, utna accurate diagnosis. AI ko context dena reports dene jaisa hai.",
    syntax: { code: "// Context order: setup -> code -> requirement -> ask\nSetup: React + React Query app.\nContext: @api/products.js @hooks/useUsers.js\nRequirement: useProducts hook with loading/error.\nAsk: isi pattern mein useProducts banao.", note: "Pehle context, phir sawaal — order matters.", lang: "js" },
    steps: [
      "Task se related files/snippets identify karo.",
      "Unhe @-mention ya paste karo (sirf relevant).",
      "Business requirements + edge cases likho.",
      "Ek similar existing pattern dikhao (agar style match chahiye).",
      "Data shapes/types do.",
      "Ab actual question/task poochho.",
      "Output ko context ke against verify karo."
    ],
    examples: [
      { level: "Beginner", title: "Snippet attach karna", code: "// PROMPT\n// existing code:\nfunction add(a,b){ return a+b }\n// Isi style mein multiply function banao.", lang: "js" },
      { level: "Intermediate", title: "Pattern matching", code: "// PROMPT\n@hooks/useUsers.js dekho.\nUsi pattern mein useOrders hook banao —\nsame query key style, same error handling.", lang: "js", explain: "Existing pattern context se consistency milti hai." },
      { level: "Advanced", title: "Requirements + types", code: "// PROMPT\nData shape: { id, title, price: number(paise) }.\nRule: display pe price/100 with currency.\nContext @CartItem.jsx. Ab CartItem mein price\ndisplay fix karo isi shape ke hisaab se.", lang: "js" }
    ],
    notes: {
      concept: "Context-prompting = sawaal se pehle relevant code + requirements + patterns dena.",
      tip: "Context PEHLE, question BAAD mein — model better focus karta hai.",
      warning: "Irrelevant context daalna distract karta hai — sirf zaroori do.",
      error: "Bina context generic code aata hai jo project se match nahi karta."
    },
    compare: { headers: ["Bina context", "Context ke saath"], rows: [
      ["Generic code", "Project-specific code"],
      ["Galat assumptions", "Requirement-aligned"],
      ["Style mismatch", "Existing pattern match"],
      ["Zyada revisions", "Pehli baar sahi"]
    ] },
    mistakes: [
      { bad: "Code mention kiye bina 'isko theek karo'.", fix: "Relevant file attach/paste karo." },
      { bad: "Sab files daal dena.", fix: "Sirf task-relevant context do." },
      { bad: "Requirements/edge cases skip.", fix: "Business rules clearly likho." },
      { bad: "Data shape na dena.", fix: "Types/shapes provide karo." }
    ],
    best: [
      "Context pehle, sawaal baad mein.",
      "Sirf relevant files/snippets do.",
      "Requirements + edge cases likho.",
      "Existing pattern dikhao for consistency.",
      "Data shapes/types provide karo."
    ],
    security: "🔒 Context mein real data, tokens, ya PII mat daalo. Sample/anonymized data use karo. Sensitive files exclude karo agar cloud tool hai.",
    performance: "⚡ Sahi (aur sirf relevant) context se AI ek baar mein sahi deta hai — kam tokens waste, kam iterations. Irrelevant context tokens kha jaata hai.",
    tricky: [
      { title: "Context overload", explain: "Bahut zyada context (10 files) model ko distract karta hai aur important detail miss ho sakti hai. Curate karo." },
      { title: "Lost-in-the-middle", explain: "Lambi context ke beech ki info model kabhi miss karta hai — important cheez start ya end pe rakho." }
    ],
    interview: {
      beginner: [
        { q: "Context-prompting kya hai?", a: "Sawaal se pehle model ko relevant files, snippets aur requirements dena." },
        { q: "Context dene ka fayda?", a: "Project-specific, accurate output milta hai, AI guess nahi karta." }
      ],
      intermediate: [
        { q: "Context ka order kyun matter karta hai?", a: "Pehle context, phir question se model better focus karke relevant jawab deta hai." },
        { q: "Existing pattern dikhane ka fayda?", a: "AI usi style mein naya code banata hai — consistency." }
      ],
      advanced: [
        { q: "Lost-in-the-middle problem kya hai?", a: "Lambi context ke beech wali info model miss kar sakta hai; important info ko start/end pe rakhna chahiye." }
      ]
    },
    mcqs: [
      { q: "Context-prompting ka core idea?", options: ["Jaldi poochho", "Sawaal se pehle relevant context do", "Lamba prompt", "Code mat do"], answer: 1, explain: "Relevant context = accurate jawab." },
      { q: "Context overload ka asar?", options: ["Better", "Model distract", "Faster", "No effect"], answer: 1, explain: "Sirf relevant context do." }
    ],
    exercises: {
      easy: ["Ek existing function paste karke usi style mein naya function banwao."],
      medium: ["Requirements + data shape deke ek component fix karwao."],
      advanced: ["Multiple relevant files curate karke ek feature consistent style mein banwao."]
    },
    summary: [
      "Context = relevant code + requirements + patterns.",
      "Pehle context, baad mein sawaal.",
      "Sirf relevant — overload distract karta hai.",
      "Existing pattern se consistency.",
      "Data shapes/types do for precision."
    ],
    cheatsheet: [
      { h: "Order", code: "Setup -> Context (files) -> Requirement -> Ask" },
      { h: "Pattern match", code: "@existingHook.js — isi pattern mein naya banao" }
    ],
    projects: [
      "Context-rich prompts se consistent component library banwana.",
      "Existing patterns reuse karke naye features generate karna.",
      "Data contracts/types ke saath precise code generation.",
      "Curated context templates banana common tasks ke liye."
    ],
    advanced: "🚀 RAG aur semantic-search tools automatically relevant context retrieve karte hain — manual context-prompting ka next level. MCP se live context bhi mil sakta hai.",
    quiz: [
      { q: "Context kab dena chahiye?", options: ["Sawaal ke baad", "Sawaal se pehle", "Kabhi nahi", "Random"], answer: 1, explain: "Pehle context, phir sawaal." }
    ],
    related: ["good-vs-bad-prompt", "what-is-context", "rag-intro", "semantic-search"]
  },

  "chain-of-thought": {
    overview: "Chain-of-thought (CoT) prompting matlab AI ko 'step by step socho' bolna — jisse woh reasoning chinks mein todta hai aur complex problems mein zyada accurate jawab deta hai. 🧠",
    why: "Complex problems (logic bugs, multi-step refactors, algorithm) mein agar AI seedha answer deta hai to galti ka chance zyada hota hai. Step-by-step reasoning maangne se woh apni soch expose karta hai, intermediate steps verify hote hain, aur final answer reliable banta hai.",
    concept: [
      { h: "Step-by-step trigger", p: "'Think step by step' ya 'Pehle reasoning, phir answer' likhne se model intermediate steps generate karta hai." },
      { h: "Reasoning before code", p: "Code likhne se pehle approach explain karwana — galat plan jaldi pakda jaata hai." },
      { h: "When it helps", p: "Logic-heavy, multi-step, debugging, ya math tasks mein CoT madad karta hai. Simple lookups mein zaroorat nahi.", code: "// PROMPT\nIs function mein bug hai. Step by step socho:\n1. Function ka expected behavior kya hai?\n2. Actual behavior kya hai?\n3. Root cause kahaan?\n4. Fix kya hoga?\nPhir corrected code do.", lang: "js" },
      { h: "Plan-then-execute", p: "Pehle plan maango, approve karo, phir execute. Bade tasks mein ye errors drastically kam karta hai." }
    ],
    analogy: "Math exam mein 'sirf answer likho' vs 'steps dikhao'. ➗ Steps dikhane se galti pakdi jaati hai aur partial marks milte hain. AI bhi jab steps dikhata hai to galtiyan visible aur fixable ho jaati hain.",
    visual: { type: "timeline", items: [
      { year: "1", text: "Problem samjho (restate)" },
      { year: "2", text: "Steps mein todo (decompose)" },
      { year: "3", text: "Har step reason karo" },
      { year: "4", text: "Intermediate verify karo" },
      { year: "5", text: "Final answer/code do" }
    ] },
    syntax: { code: "// CoT prompt patterns\n\"Let's think step by step.\"\n\"Pehle reasoning likho, phir final answer.\"\n\"Is bug ka root cause step-by-step trace karo.\"\n\"Pehle plan do, main approve karunga, phir code.\"", note: "CoT logic-heavy tasks ke liye — simple tasks pe overkill.", lang: "js" },
    steps: [
      "Decide karo task complex/logic-heavy hai (warna CoT skip).",
      "Prompt mein 'step by step socho' ya 'pehle plan' add karo.",
      "AI ki reasoning steps padho.",
      "Intermediate steps verify karo — galti yahi pakdo.",
      "Plan sahi ho to execute karwao (code).",
      "Final output ko reasoning ke against cross-check karo."
    ],
    internals: { p: "LLM next-token predict karta hai. Jab woh reasoning steps generate karta hai, har step uske aage ke prediction ke liye context banta hai — isse 'sochne ki jagah' milti hai aur accuracy badhti hai. Bina CoT model ko ek hi shot mein jump karna padta hai jahaan errors zyada hote hain.", code: "// Conceptual\nNo CoT:  question -> [jump] -> answer (error-prone)\nCoT:     question -> step1 -> step2 -> step3 -> answer\n         (har step next ka context, zyada accurate)", lang: "js" },
    examples: [
      { level: "Beginner", title: "Simple step-by-step", code: "// PROMPT\nIs array ko unique + sorted banane ka tareeka\nstep by step samjhao, phir code do.", lang: "js" },
      { level: "Intermediate", title: "Debugging with CoT", code: "// PROMPT\nye useEffect infinite loop kar raha.\nStep by step: dependency array analyze karo,\nkya re-trigger kar raha hai trace karo, phir fix do.", lang: "js", explain: "Reasoning se actual cause pakda jaata hai." },
      { level: "Advanced", title: "Plan-then-execute", code: "// PROMPT\nIs feature ko 3 modules mein todo.\nPehle SIRF plan (modules, files, order) do.\nMain approve karunga, tab code likhna.", lang: "js" }
    ],
    notes: {
      concept: "CoT = step-by-step reasoning maangna for complex/logic tasks.",
      tip: "Plan-then-execute pattern bade tasks mein errors drastically ghatata hai.",
      warning: "Simple tasks mein CoT extra tokens kha jaata hai — selectively use karo.",
      error: "Logic bug ko bina reasoning ke seedha fix maangna galat patch deta hai."
    },
    compare: { headers: ["Direct answer", "Chain-of-thought"], rows: [
      ["Fast", "Thoda slow/zyada tokens"],
      ["Complex pe error-prone", "Complex pe accurate"],
      ["Reasoning hidden", "Reasoning visible + verifiable"],
      ["Simple tasks ke liye theek", "Logic/multi-step ke liye best"]
    ] },
    mistakes: [
      { bad: "Complex bug ko 'fix it' bolna.", fix: "'Step by step root cause trace karo' bolo." },
      { bad: "Bade refactor ko ek-shot karwana.", fix: "Pehle plan maango, phir execute." },
      { bad: "Har simple task pe CoT.", fix: "Selectively — sirf logic-heavy pe." },
      { bad: "Reasoning skip karke output maan lena.", fix: "Intermediate steps verify karo." }
    ],
    best: [
      "Complex/logic tasks pe 'step by step' use karo.",
      "Plan-then-execute bade changes mein.",
      "Intermediate steps verify karo.",
      "Simple tasks pe CoT avoid (token waste).",
      "Reasoning ke against final output cross-check."
    ],
    security: "🔒 Reasoning steps mein bhi sensitive logic/secrets reveal ho sakte hain — agar output share kar rahe ho to reasoning review karo.",
    performance: "⚡ CoT zyada tokens leta hai (slow + costly), par complex tasks mein ek sahi answer multiple galat tries se sasta padta hai. Simple tasks pe overkill hai.",
    tricky: [
      { title: "CoT on trivial task", explain: "Simple lookup pe 'step by step' faltu tokens aur time leta hai — selectively use karo." },
      { title: "Confident wrong reasoning", explain: "AI confident dikhe par reasoning galat ho sakti hai — har step manually verify karo, blindly mat maano." }
    ],
    interview: {
      beginner: [
        { q: "Chain-of-thought prompting kya hai?", a: "AI ko step-by-step reasoning karne ko bolna taaki complex tasks accurate ho." },
        { q: "Kab CoT use karein?", a: "Logic-heavy, multi-step, debugging, ya math tasks mein." }
      ],
      intermediate: [
        { q: "CoT accuracy kaise badhata hai?", a: "Intermediate reasoning steps model ko 'sochne ki jagah' dete hain, errors visible aur fixable hote hain." },
        { q: "Plan-then-execute kya hai?", a: "Pehle plan maango aur approve karo, phir code execute karwao — bade tasks mein errors kam." }
      ],
      advanced: [
        { q: "CoT ka downside?", a: "Zyada tokens/latency aur simple tasks pe overkill; reasoning confident-but-wrong ho sakti hai, verify zaroori." }
      ]
    },
    mcqs: [
      { q: "CoT prompting trigger phrase?", options: ["fix fast", "let's think step by step", "no explain", "shorter"], answer: 1, explain: "Step-by-step reasoning trigger karta hai." },
      { q: "CoT kab best hai?", options: ["Simple lookup", "Complex/multi-step logic", "Naming", "Formatting"], answer: 1, explain: "Logic-heavy tasks mein accuracy badhati hai." }
    ],
    exercises: {
      easy: ["Ek logic problem AI se step-by-step solve karwao."],
      medium: ["Ek bug ka root cause CoT prompt se trace karwao."],
      advanced: ["Bade feature ka plan-then-execute flow run karo aur har step verify karo."]
    },
    summary: [
      "CoT = step-by-step reasoning maangna.",
      "Complex/logic/debugging tasks mein accuracy badhata hai.",
      "Plan-then-execute bade changes mein errors ghatata hai.",
      "Simple tasks pe overkill — selectively use.",
      "Reasoning confident-but-wrong ho sakti — verify karo."
    ],
    cheatsheet: [
      { h: "CoT trigger", code: "Let's think step by step, phir final answer." },
      { h: "Plan-first", code: "Pehle plan do, approve ke baad code." }
    ],
    projects: [
      "Complex bug debugging CoT se.",
      "Algorithm design step-by-step.",
      "Bade refactor ka plan-then-execute.",
      "Multi-step migration ko reasoning ke saath karwana."
    ],
    advanced: "🚀 Advanced agentic systems CoT + self-reflection (AI apni reasoning critique kare) combine karte hain. Tree-of-thought aur ReAct (reason+act) iske extensions hain.",
    quiz: [
      { q: "CoT ka main downside?", options: ["Sasta", "Zyada tokens/latency", "Hamesha galat", "Koi nahi"], answer: 1, explain: "Reasoning extra tokens leti hai." }
    ],
    related: ["role-step-prompting", "good-vs-bad-prompt", "ai-debugging", "ai-agents"]
  },

  "role-step-prompting": {
    overview: "Role-based prompting matlab AI ko persona dena ('You are a senior React engineer'), aur step-by-step prompting matlab task ko numbered steps mein todna. Dono milke output ka tone, depth aur structure control karte hain. 🎭",
    why: "Role dene se AI uss persona ke standards par jawab deta hai — senior engineer best practices follow karega, security expert vulnerabilities dhundega. Step-by-step structure complex tasks ko organized aur complete banata hai, kuch miss nahi hota.",
    concept: [
      { h: "Role / persona", p: "'You are a senior React engineer who values clean, testable code.' Ye AI ke responses ka expertise level aur priorities set karta hai." },
      { h: "Step-by-step instructions", p: "Task ko numbered steps mein todo. AI har step follow karta hai, completeness ensure hoti hai." },
      { h: "Combine dono", p: "Role + steps = powerful. Persona quality set karta hai, steps structure dete hain.", code: "// ROLE + STEPS PROMPT\nYou are a senior React engineer.\nSteps:\n1. Component ka issue identify karo.\n2. Refactor plan banao.\n3. Clean code likho with comments.\n4. Edge cases note karo.", lang: "js" },
      { h: "Constraints + standards", p: "Role ke saath standards bind karo: 'Follow Airbnb style, prefer composition over inheritance.' AI uss bar tak deliver karta hai." }
    ],
    analogy: "Kisi se kaam karwana: 'koi bhi karega' vs 'senior architect se review karwao'. 🏗️ Role specify karne se aapko uss level ki expertise milti hai. Aur checklist (steps) dene se kuch chhootta nahi.",
    workflow: { type: "boxes", items: [
      { label: "Role set", sub: "senior engineer", color: "#8B5CF6" },
      { label: "Standards", sub: "clean, tested", color: "#D946EF" },
      { label: "Steps", sub: "numbered task", color: "#3B82F6" },
      { label: "Execute", sub: "structured output", color: "#22C55E" }
    ] },
    syntax: { code: "// TEMPLATE\nRole: You are a senior React + TypeScript engineer.\nStandards: clean, typed, tested code; no any.\nTask steps:\n  1. Analyze the requirement.\n  2. Propose component structure.\n  3. Implement with types.\n  4. Add edge-case handling.\nOutput: code + short rationale.", note: "Role + standards + steps + output = pro-grade prompt.", lang: "js" },
    steps: [
      "Suitable role/persona choose karo (senior engineer, security reviewer, etc).",
      "Uss role ke standards/priorities batao.",
      "Task ko clear numbered steps mein todo.",
      "Output format specify karo.",
      "Prompt run karo, step-wise output check karo.",
      "Zaroorat ho to role refine karke dobara try."
    ],
    examples: [
      { level: "Beginner", title: "Simple role", code: "// PROMPT\nYou are a senior React engineer.\nIs component ko review karke clean version suggest karo.", lang: "js" },
      { level: "Intermediate", title: "Role + steps", code: "// PROMPT\nYou are a React performance expert.\nSteps:\n1. Is list ke render bottlenecks dhoondo.\n2. Har ek ka fix batao.\n3. Optimized code do.", lang: "js", explain: "Persona + steps = focused, complete output." },
      { level: "Advanced", title: "Multi-role review", code: "// PROMPT\nPehle as a senior engineer code likho.\nPhir as a security reviewer usi code ke 3\nvulnerabilities dhoondo aur fix suggest karo.", lang: "js", explain: "Ek hi prompt mein do perspectives." }
    ],
    notes: {
      concept: "Role = persona/expertise set karta hai; steps = structure/completeness dete hain.",
      tip: "Role ke saath concrete standards bind karo (style, testing, types).",
      warning: "Bahut bada/unrealistic role ya 20 steps confuse kar sakte hain — focused rakho.",
      error: "Sirf 'expert ho' bolna bina standards = vague improvement."
    },
    compare: { headers: ["Role-based", "Step-based"], rows: [
      ["Tone/expertise set", "Structure/order set"],
      ["'senior engineer'", "'1,2,3 steps'"],
      ["Quality bar", "Completeness"],
      ["Best combined", "Best combined"]
    ] },
    mistakes: [
      { bad: "Generic 'help me' bina role.", fix: "Relevant persona assign karo." },
      { bad: "Role pe standards na batana.", fix: "Style, testing, types bind karo." },
      { bad: "Complex task bina steps.", fix: "Numbered steps mein todo." },
      { bad: "20 steps ka over-detail.", fix: "Focused 3-6 steps rakho." }
    ],
    best: [
      "Task-relevant role choose karo.",
      "Role ke saath concrete standards do.",
      "Complex tasks ko numbered steps mein todo.",
      "Output format specify karo.",
      "Multi-perspective ke liye multiple roles try karo.",
      "Templates reuse karo (cheatsheet)."
    ],
    security: "🔒 'You are a security reviewer' role use karke AI se apne code ke vulnerabilities dhundwa sakte ho — par actual secrets prompt mein mat daalo.",
    performance: "⚡ Role + steps se output structured aur complete aata hai = kam follow-up prompts = kam tokens overall. Precise persona generic responses se behtar value deta hai.",
    tricky: [
      { title: "Role doesn't add knowledge", explain: "Role model ko nayi knowledge nahi deta — sirf existing knowledge ka relevant hissa aur tone surface karta hai. Expectations realistic rakho." },
      { title: "Too many steps", explain: "Bahut steps (15+) model ko overwhelm karte hain, kuch skip ho sakte hain. 3-6 focused steps best." }
    ],
    interview: {
      beginner: [
        { q: "Role-based prompting kya hai?", a: "AI ko persona dena (jaise 'senior React engineer') taaki woh uss expertise/tone mein jawab de." },
        { q: "Step-by-step prompting kya karta hai?", a: "Task ko numbered steps mein todta hai — structured aur complete output." }
      ],
      intermediate: [
        { q: "Role aur steps combine karne ka fayda?", a: "Role quality bar set karta hai, steps structure dete hain — dono milke pro-grade output." },
        { q: "Role ke saath standards kyun bind karein?", a: "Standards (style, testing) ke bina 'expert' vague rehta hai; bind karne se measurable quality milti hai." }
      ],
      advanced: [
        { q: "Kya role AI ki knowledge badhata hai?", a: "Nahi — role sirf existing knowledge ka relevant subset aur tone surface karta hai, nayi info add nahi karta." }
      ]
    },
    mcqs: [
      { q: "Role-based prompting ka example?", options: ["fix this", "You are a senior React engineer...", "code do", "fast"], answer: 1, explain: "Persona assign karta hai." },
      { q: "Step-by-step prompting deta hai?", options: ["Speed", "Structure + completeness", "Free tokens", "Theme"], answer: 1, explain: "Numbered steps organized output dete hain." }
    ],
    exercises: {
      easy: ["Ek code review 'senior engineer' role se karwao."],
      medium: ["Role + 3 steps deke ek component optimize karwao."],
      advanced: ["Multi-role (engineer + security reviewer) prompt se code likhwao aur review karwao."]
    },
    summary: [
      "Role = persona/expertise; steps = structure/completeness.",
      "Role ke saath concrete standards bind karo.",
      "Complex tasks ko 3-6 numbered steps mein todo.",
      "Role nayi knowledge nahi deta, relevant subset surface karta hai.",
      "Role + steps + output format = pro-grade prompt."
    ],
    cheatsheet: [
      { h: "Role template", code: "You are a senior React engineer who writes clean, tested code." },
      { h: "Role + steps", code: "Role: X. Steps: 1.analyze 2.plan 3.implement 4.edge-cases" }
    ],
    projects: [
      "Code review ke liye senior-engineer role prompts.",
      "Security audit security-reviewer role se.",
      "Step-by-step feature implementation templates.",
      "Multi-perspective review pipeline (engineer + QA + security)."
    ],
    advanced: "🚀 Multi-agent systems mein har agent ko ek role diya jaata hai (planner, coder, reviewer) jo aapas mein collaborate karte hain — role prompting ka scaled version. Aage agentic-ai dekho.",
    quiz: [
      { q: "Role prompting kya NAHI karta?", options: ["Tone set", "Nayi knowledge add", "Priorities set", "Expertise surface"], answer: 1, explain: "Role knowledge add nahi karta, surface karta hai." }
    ],
    related: ["chain-of-thought", "good-vs-bad-prompt", "context-prompting", "ai-agents"]
  },
}
