// AI App Engineering content — Part 1: Foundations (what/how/tokens/first-call/model choice)

export const aiAppContentA = {
  'one-year-roadmap': {
    overview:
      'Yeh ek **12-mahine ka focused roadmap** hai jo aapko ek achhe React developer se ek **senior, AI-native engineer** banata hai — koi jo bade React apps architect kar sake, AI-powered products bana sake, AI-generated code review kar sake, aur frontend + backend + deployment samajhta ho. Target: **₹40–60 LPA** senior frontend / AI-enabled engineering roles ke liye strong profile. Roz sirf **1–2 focused ghante**, consistently — yahi is plan ki asli taakat hai. 🗺️',
    why:
      '5 saal ke experience ke saath aapki sabse badi opportunity ek aur naya framework seekhna nahi hai — balki wo engineer ban-na hai jo **strong frontend architecture ko practical AI integration ke saath jod kar** production-ready products tezi se aur high quality mein deliver kar sake. Yahi combination aaj market mein sabse zyada demand mein hai aur ₹40–60 LPA roles ki taraf le jaata hai. Yeh salary guarantee nahi, par yeh un skills ko banata hai jinhe companies actively dhoondh rahi hain.',
    concept: [
      { h: 'Phase 1 (M1–2): Elite React Engineer', p: 'React aata hai — ab **engineering depth** banao. Seekho: **Advanced TypeScript** (generics, utility types, discriminated unions), React architecture (feature-folders, composition), design patterns, **performance** (memo/useMemo, code-splitting, virtualization), accessibility (a11y), React 19 features, component libraries, advanced state management (Zustand/Query), aur testing fundamentals (React Testing Library). **Build**: ek reusable UI component library, ek professional dashboard, aur apne tracker ko best-practices se refactor. ✅ **Done when**: aap ek bade React app ka structure + trade-offs confidently justify kar sako.' },
      { h: 'Phase 2 (M3–4): Become AI-Native', p: 'Yahin aapka **productivity advantage** banta hai. Seekho: prompt engineering for dev, AI-assisted code review, **LLM APIs**, streaming responses, AI chat interfaces, **RAG**, vector databases (pehle conceptually), AI agent fundamentals, **MCP** basics, aur AI dev workflows. **Build**: AI code explainer, AI documentation generator, aur tracker ke andar ek AI learning assistant. ✅ **Done when**: aap ek AI feature ko cost/latency/security ke saath ship kar sako. *(Yeh poora "AI App Engineering" course exactly yahi phase hai — iske 30 topics aapka Phase-2 curriculum hain.)*' },
      { h: 'Phase 3 (M5–6): Backend for Frontend Engineers', p: 'Backend specialist nahi, par **comfortable** bano: **Node.js, Express**, authentication (JWT/sessions), authorization (roles), databases (SQL + NoSQL basics), file uploads, email services, caching (Redis idea), **WebSockets**, aur basic microservices concepts. **Build**: apne tracker ko `localStorage` se hatakar **real backend + login + cloud database + real user accounts** par le jaao. ✅ **Done when**: aap ek secure, DB-backed API khud design + deploy kar sako.' },
      { h: 'Phase 4 (M7–8): System Design', p: 'Study: scalable frontend architecture, **caching layers**, CDN concepts, **rate limiting**, API design (REST/versioning), load balancing (high level), event-driven architecture (queues), monorepos, aur **CI/CD**. **Practice**: architecture diagrams samjhaao, trade-offs discuss karo, aur code likhne se pehle system ko **kaagaz par design** karo. ✅ **Done when**: aap ek "design X app" prompt par structured, trade-off-aware answer de sako.' },
      { h: 'Phase 5 (M9–10): Portfolio Projects', p: 'Real problems solve karne wale projects: AI Resume Analyzer, AI Interview Assistant, AI Learning Platform, AI Expense Analyzer, collaborative PM app. **Best move**: apne tracker ko ek **flagship product** mein evolve karo — backend, AI mentor, personalized roadmaps, analytics, authentication, aur real-time collaboration. ✅ **Done when**: ek deployed, polished flagship jo architecture + FE + backend + AI ek saath dikhaye.' },
      { h: 'Phase 6 (M11–12): Interview & Career Prep', p: 'Focus: frontend-relevant **DSA**, JavaScript deep dives, **React internals**, browser internals, TypeScript, **frontend system design**, behavioral interviews, resume, LinkedIn, mock interviews, aur salary negotiation. **Apply consistently** aur interview skills refine karte raho. ✅ **Done when**: mock interviews consistently clear ho rahe hon aur real offers aane lagein.' },
    ],
    analogy:
      'Yeh roadmap ek **12-floor building banane** jaisa hai. 🏗️ Neenv (elite React) pehle, phir AI ki manzil (aapka superpower), phir backend ka structure, system design ke pillars, portfolio ki finishing, aur interview prep ki chaabi. Har mahina ek floor — agar aap random floors banao (aaj React, kal DSA, parso backend) to building khadi nahi hogi. Ek-ek floor, roz thoda-thoda, order mein — bas tabhi 12 mahine mein poori imaarat khadi hoti hai.',
    visual: {
      type: 'timeline',
      items: [
        { year: 'M1–2', text: 'Elite React: Advanced TS, architecture, patterns, performance, a11y, component library, testing.' },
        { year: 'M3–4', text: 'AI-Native: LLM APIs, streaming, chat UI, RAG, vectors, agents, MCP, AI dev workflows.' },
        { year: 'M5–6', text: 'Backend for FE: Node, Express, auth, DB, uploads, email, caching, WebSockets.' },
        { year: 'M7–8', text: 'System Design: scaling, caching, CDN, rate-limiting, API design, event-driven, CI/CD.' },
        { year: 'M9–10', text: 'Portfolio: flagship platform + real-problem AI projects.' },
        { year: 'M11–12', text: 'Interviews: DSA, JS/React/browser internals, FE system design, mock, negotiation.' },
      ],
    },
    process: {
      type: 'boxes',
      items: [
        { label: 'Elite React', sub: 'M1–2', color: '#3B82F6' },
        { label: 'AI-Native', sub: 'M3–4', color: '#8B5CF6' },
        { label: 'Backend', sub: 'M5–6', color: '#06B6D4' },
        { label: 'System Design', sub: 'M7–8', color: '#F59E0B' },
        { label: 'Portfolio', sub: 'M9–10', color: '#22C55E' },
        { label: 'Interviews', sub: 'M11–12', color: '#F43F5E' },
      ],
    },
    steps: [
      'Ek **flagship product** chuno (apna tracker) — har phase usi mein add hota jaaye, bikhre demos nahi.',
      'Roz **1–2 focused ghante** — consistency > intensity. Weekly cadence follow karo (neeche table).',
      'Har phase ka **build deliverable** poora karo — sirf padho mat, ship karo.',
      'Har hafte kuch **document** karo (README/notes) — yeh interview stories ban-te hain.',
      'Phase 5–6 mein **apply karna shuru** karo aur mock interviews se refine karte raho.',
    ],
    compare: {
      headers: ['Day', 'Focus'],
      rows: [
        ['Monday', 'React architecture'],
        ['Tuesday', 'TypeScript / JavaScript internals'],
        ['Wednesday', 'AI integration'],
        ['Thursday', 'Backend fundamentals'],
        ['Friday', 'System design'],
        ['Saturday', 'Build or improve a project'],
        ['Sunday', 'Review, document & practice interview Qs'],
      ],
    },
    notes: {
      concept: 'Goal: frontend architecture + practical AI integration ko jodne wala senior engineer banna — ₹40–60 LPA profile.',
      tip: 'Ek flagship product mein invest karo (tracker → full platform), 10 unrelated demos ke bajaye.',
      warning: 'Har phase ek pichle par khadा hai — order skip mat karo; foundation (React+TS) pehle.',
      error: 'Sirf padhna aur build na karna — deliverables hi profile banate hain, notes nahi.',
    },
    best: [
      'Roz 1–2 focused ghante, consistently — yahi asli lever hai.',
      'Ek flagship product deep karo, bikhre projects mat banao.',
      'High-quality resources chuno (sab consume karne ki koshish mat karo).',
      'Har phase ka build ship karo aur document karo.',
      'Phase 5 se apply + mock interviews shuru; feedback se iterate.',
    ],
    projects: [
      'Flagship: Developer Learning & AI Platform (tracker se evolve)',
      'Auth + cloud sync + real user accounts',
      'AI mentor + personalized learning paths',
      'Interview prep + coding challenges + AI-generated quizzes',
      'Progress analytics + notes + bookmarks',
      'AI code reviewer + AI project generator',
      'Resume builder + portfolio tracking + job dashboards',
      'Real-time collaboration',
    ],
    cheatsheet: [
      { h: 'Core resources', code: `The Road to React\nDesigning Data-Intensive Apps (selected)\nOfficial React + TypeScript docs\nNode.js docs\nYour AI provider's API docs\nEngineering blogs (top companies)` },
      { h: '12-month arc', code: `M1-2  Elite React + TS\nM3-4  AI-Native (this course!)\nM5-6  Backend for FE\nM7-8  System Design\nM9-10 Portfolio (flagship)\nM11-12 Interviews + apply` },
    ],
    advanced:
      'Ek line ki asli advice: 5 saal ke experience ke saath har kuch mahine mein naya framework seekhna aapka biggest lever **nahi** hai. Wo engineer ban-na jo **strong frontend architecture + practical AI integration** ko jod kar production-ready apps tezi aur high quality se deliver kare — yahi aaj ki market ke saath align karta hai. Consistent 1–2 ghante/din is direction mein lagao; salary ki guarantee nahi, par yeh exactly wo skills banata hai jinhe companies dhoondh rahi hain.',
    exercises: {
      easy: ['Apne next 4 hafton ka weekly-schedule (Mon–Sun) apne calendar mein block karo.'],
      medium: ['Phase 1 ka ek deliverable chuno (component library ya dashboard) aur uska scope likho.'],
      advanced: ['Apne tracker ka "flagship platform" vision ek 1-page architecture doc mein likho (auth, AI mentor, analytics, collab).'],
    },
    summary: [
      '12 mahine, 6 phases: Elite React → AI-Native → Backend → System Design → Portfolio → Interviews.',
      'Target: senior frontend + AI-enabled engineer, ₹40–60 LPA profile.',
      'Roz 1–2 focused ghante; weekly day-wise cadence.',
      'Ek flagship product (tracker) mein invest karo, bikhre demos nahi.',
      'Har phase ship + document karo; Phase 5 se apply + mock interviews.',
    ],
    examples: [
      {
        level: 'Practical',
        title: 'Phase 2 (AI-Native) — ek sample 4-hafton ka sprint',
        lang: 'js',
        code: `Week 1  LLM APIs + prompting\n  - first API call via backend proxy (key safe)\n  - system prompts + structured output (JSON)\n  - deliverable: /api/summarize + /api/rewrite\n\nWeek 2  Streaming + chat UI\n  - SSE streaming from proxy\n  - React chat: live typing + stop button\n  - deliverable: streaming assistant inside tracker\n\nWeek 3  RAG\n  - chunk -> embed -> vector DB\n  - retrieve + augment + cite sources\n  - deliverable: "chat with your notes"\n\nWeek 4  Tools + agents + MCP\n  - tool calling (validated args)\n  - simple agent loop (max-steps cap)\n  - deliverable: AI code explainer`,
        explain: 'Har hafte ek concrete **deliverable** — sirf padhna nahi, ship karna. Yahi "skill → build → document" pattern har phase par apply karo. (Ye 4 weeks basically is course ke topics hain.)',
      },
    ],
    mistakes: [
      { bad: 'Har mahine naya framework/tech chase karna (shiny-object syndrome).', fix: 'Roadmap follow karo; ek flagship product mein depth banao — 5 saal ke baad depth > breadth.' },
      { bad: 'Sirf tutorials/videos dekhna, khud build na karna ("tutorial hell").', fix: 'Har phase ka deliverable ship karo — profile builds se banta hai, notes se nahi.' },
      { bad: 'Foundation (React + TS) skip karke seedha AI/backend par kudna.', fix: 'Phases order mein — har ek pichle par khada hai.' },
      { bad: 'Interview prep (Phase 6) ko aakhri 2 mahine tak taalna.', fix: 'Sunday ko thoda-thoda poore saal; Phase 5 se apply karna shuru karo.' },
      { bad: '10 bikhre demo projects banana.', fix: 'Ek flagship platform — architecture + FE + backend + AI ek jagah dikhao.' },
      { bad: '1–2 ghante ki consistency chhod kar weekend-binge karna.', fix: 'Rozana chhota compounding > kabhi-kabhi ka burst. Streak banao.' },
    ],
    interview: {
      beginner: [
        { q: 'Aap khud ko kaise position karoge (target profile)?', a: 'Ek senior frontend engineer jo strong React architecture ko practical AI integration ke saath jodkar production-ready products tezi aur high quality se deliver karta hai.' },
        { q: 'Is roadmap ka core bet kya hai?', a: 'Har baar naya framework seekhne ke bajaye frontend architecture + AI integration combine karna — aaj market ki sabse zyada demand yahi hai.' },
      ],
      intermediate: [
        { q: 'Har phase senior interview mein kya test karta hai?', a: 'React/TS depth (Ph1), AI product sense (Ph2), backend comfort (Ph3), system design + trade-offs (Ph4), real shipped projects (Ph5), DSA + internals + behavioral (Ph6).' },
        { q: 'Flagship project ko interview mein kaise pitch karein?', a: 'Problem → architecture → trade-offs → FE/backend/AI decisions → metrics (cost, latency, impact). Live demo + numbers sabse strong.' },
      ],
      advanced: [
        { q: '₹40–60 LPA roles ka asli differentiator kya hai?', a: 'Sirf coding nahi — architecture decisions justify karna, AI features ko cost/latency/security ke saath ship karna, aur system design + behavioral dono strong hona.' },
        { q: 'Roadmap complete hone ke baad next step?', a: 'Consistently apply karo, portfolio + LinkedIn refine karo, mock interviews se gaps close karo, aur salary negotiation prep karo — shipped product ko loudly showcase karo.' },
      ],
    },
    mcqs: [
      { q: 'Is roadmap ka #1 lever kya hai?', options: ['Har mahine naya framework', 'Roz 1–2 focused ghante consistently', 'Zyada tutorials dekhna', 'Sirf DSA'], answer: 1, explain: 'Consistency > intensity — chhota daily compounding 12 mahine mein bada farak.' },
      { q: 'Kitne projects par focus karna chahiye?', options: ['10+ bikhre demos', 'Ek flagship product', 'Zero, sirf theory', 'Random projects'], answer: 1, explain: 'Ek flagship platform architecture + FE + backend + AI ek saath dikhata hai.' },
      { q: 'AI-Native phase (M3–4) kya advantage deta hai?', options: ['Productivity + higher-quality delivery', 'Sirf CSS skills', 'Typing speed', 'Kuch nahi'], answer: 0, explain: 'AI integration se aap tezi aur behtar quality mein ship karte ho.' },
      { q: 'Backend phase (M5–6) ka goal?', options: ['Backend specialist banna', 'Comfortable + DB-backed app deploy karna', 'Backend ignore karna', 'Sirf theory'], answer: 1, explain: 'Specialist nahi — comfortable; tracker ko real backend + auth + cloud DB par le jaao.' },
    ],
    related: ['what-is-ai-app', 'rag-pipeline', 'real-projects', 'interview-questions'],
  },

  'what-is-ai-app': {
    overview:
      'Ek **AI-enabled web app** wahi purani web app hai (React frontend + backend), bas usme ek naya "brain" jud gaya hai — ek **LLM (Large Language Model)** jaise Claude ya GPT. Normal app fixed rules par chalti hai (`if/else`), lekin AI app **natural language** samajh kar dynamically decide karti hai: summarize karo, likho, classify karo, answer do, ya koi tool chalao. Aap LLM ko ek **HTTP API** ki tarah call karte ho — request bhejo, response lo — aur usse apni product feature bana lete ho. 🤖',
    why:
      'Aaj har product mein "AI" feature expect hota hai — search, chat assistant, auto-summary, smart forms. Ek frontend/full-stack dev ke liye yeh **sabse valuable skill** ban chuki hai. Achhi baat: aapko ML/maths seekhne ki zaroorat nahi. Aap model ko **API se consume** karte ho — bilkul waise jaise aap payment ya maps API use karte ho. Jo dev "AI ko app mein ship karna" jaanta hai, wo aaj sabse zyada demand mein hai.',
    concept: [
      { h: 'Traditional app vs AI app', p: 'Traditional app: input → **hardcoded logic** → output. Har case aapko pehle se code karna padta hai. AI app: input → **model** → output. Model ne training se "samajh" seekhi hai, isliye aise inputs bhi handle karta hai jo aapne kabhi socha bhi nahi. Trade-off: AI **probabilistic** hai (kabhi galat bhi ho sakta hai), deterministic nahi.' },
      { h: 'LLM = ek smart API', p: 'Builder ke nazariye se LLM ek black box hai: aap **text (prompt)** bhejte ho, wo **text** wapas deta hai. Aapka kaam hai accha prompt banana, response ko parse karna, aur usse UI mein dikhana. Model ko host karne ki zaroorat nahi — Anthropic/OpenAI ke servers par chalta hai, aap sirf `fetch` karte ho.' },
      { h: 'Kya-kya ban sakta hai', p: '**Chatbots & assistants**, **summarizers** (article/PDF → 3 lines), **classifiers** (email spam? sentiment?), **extractors** (invoice → JSON), **semantic search** (matlab-based search), **content generators** (email/code/marketing copy), aur **agents** (jo tools chala kar multi-step kaam karte hain).' },
      { h: 'Full stack of an AI app', p: '**Frontend** (React chat UI) → **Backend/API route** (jahan aapki API key safe rehti hai) → **LLM provider** (Claude/OpenAI) → optionally **Vector DB** (RAG ke liye) aur **Tools/DB** (agent actions ke liye). Backend zaroori hai — key kabhi browser mein nahi.' },
    ],
    analogy:
      'Traditional app ek **calculator** hai — sirf wahi buttons jo pehle se lage hain. AI app ek **naya intern** hai jise aap English (ya Hinglish!) mein instruction dete ho: "is email ka polite reply likho". Intern har baar exact same shabd nahi bolega (probabilistic), par kaafi naye cases khud samajh leta hai. Aapka kaam accha "instruction" (prompt) dena aur uske kaam ko check karna hai. 🧑‍💼',
    process: {
      type: 'boxes',
      items: [
        { label: 'User', sub: 'types a question', color: '#06B6D4' },
        { label: 'React UI', sub: 'sends request', color: '#3B82F6' },
        { label: 'Backend', sub: 'holds API key', color: '#8B5CF6' },
        { label: 'LLM', sub: 'generates text', color: '#A855F7' },
        { label: 'UI', sub: 'shows answer', color: '#22C55E' },
      ],
    },
    examples: [
      {
        level: 'Beginner',
        title: 'Ek AI feature conceptually kaisa dikhta hai',
        lang: 'js',
        code: `// "Summarize" feature — backend route (Express)\napp.post('/api/summarize', async (req, res) => {\n  const { text } = req.body\n  const summary = await callLLM({\n    system: 'You summarize text into 3 short bullet points.',\n    user: text,\n  })\n  res.json({ summary })\n})\n\n// Frontend bas isse call karta hai\nconst { summary } = await fetch('/api/summarize', {\n  method: 'POST',\n  body: JSON.stringify({ text: article }),\n}).then((r) => r.json())`,
        explain: 'Dhyaan do: koi "summarization algorithm" aapne nahi likha. Aapne bas model ko instruction di aur uska output UI ko de diya. Yahi AI-enabled app ka core idea hai.',
      },
    ],
    notes: {
      concept: 'AI app = normal web app + ek LLM API call. Backend key rakhta hai, model text deta hai, aap UI banate ho.',
      tip: 'Sabse pehla AI feature hamesha simple rakho: summarize / rewrite / classify. Chatbot baad mein.',
      warning: 'LLM **probabilistic** hai — same input par thoda alag output aa sakta hai. Mission-critical exact logic ke liye normal code use karo.',
    },
    compare: {
      headers: ['Pehlu', 'Traditional Feature', 'AI Feature'],
      rows: [
        ['Logic', 'Aap likhte ho (if/else)', 'Model "seekha hua" laata hai'],
        ['Naye inputs', 'Crash/handle nahi', 'Aksar khud samajh leta hai'],
        ['Output', 'Deterministic', 'Probabilistic'],
        ['Cost', 'CPU/hosting', 'Per-token API cost'],
        ['Best for', 'Exact rules, calculations', 'Language, samajh, generation'],
      ],
    },
    mistakes: [
      { bad: 'AI ko har chhoti feature par thopna.', fix: 'AI tab use karo jab input **language/unstructured** ho. Simple validation ke liye normal code hi behtar.' },
      { bad: 'Yeh sochna ki AI hamesha 100% sahi dega.', fix: 'AI galat bhi ho sakta hai. Critical flows mein human review ya validation rakho.' },
      { bad: 'Model ko browser se direct call karna (key expose).', fix: 'Hamesha backend/API route se call karo — [[backend-proxy]].' },
    ],
    best: [
      'Ek clear, chhoti feature se shuru karo — "AI everywhere" mat socho.',
      'Har AI output ko UI mein editable/optional rakho (user control).',
      'Backend proxy zaroor lagao — key safe, cost control, logging.',
      'Failure ka plan rakho: model down ho to graceful fallback dikhao.',
    ],
    performance:
      'LLM call **network + generation** dono ke kaaran slow lag sakti hai (500ms–kai second). Isliye streaming, caching aur chhote model matter karte hain — jo aage [[latency-cost]] aur [[caching]] mein aayega. Cost per-token hoti hai, isliye chhoti prompt = kam paisa. ⚡',
    interview: {
      beginner: [
        { q: 'AI-enabled web app kya hoti hai?', a: 'Normal web app jisme ek LLM (API) juda hai jo language samajh kar dynamic output deta hai — summarize, chat, classify, generate, etc.' },
        { q: 'AI feature banane ke liye ML aana zaroori hai?', a: 'Nahi. Aap model ko API se consume karte ho. Prompting, API integration aur good UX important hai, deep ML nahi.' },
      ],
      intermediate: [
        { q: 'Traditional aur AI feature mein core farak?', a: 'Traditional deterministic hardcoded logic; AI probabilistic model-driven — naye/unstructured inputs handle karta hai par galat bhi ho sakta hai.' },
        { q: 'AI app ka minimal architecture batao.', a: 'Frontend → backend proxy (key + logic) → LLM provider. RAG/agents ke liye vector DB + tools add hote hain.' },
      ],
    },
    mcqs: [
      { q: 'Builder ke liye LLM sabse zyada kis cheez jaisa hai?', options: ['Ek database', 'Ek text-in/text-out API', 'Ek CSS framework', 'Ek compiler'], answer: 1, explain: 'Aap text bhejte ho, text paate ho — ek API ki tarah.' },
      { q: 'AI output ki key property kya hai?', options: ['Hamesha deterministic', 'Probabilistic', 'Hamesha JSON', 'Free of cost'], answer: 1, explain: 'Same input par thoda alag output aa sakta hai — probabilistic.' },
    ],
    exercises: {
      easy: ['Apni current app mein 3 jagah socho jahan ek "summarize" ya "rewrite" button useful hoga.'],
      medium: ['Ek feature choose karke uska input→model→output flow kaagaz par likho.'],
      advanced: ['Decide karo kaun si feature AI se banni chahiye aur kaun si normal code se — reasoning likho.'],
    },
    summary: [
      'AI app = web app + LLM API call.',
      'LLM = text-in, text-out black box; ML seekhne ki zaroorat nahi.',
      'Use cases: summarize, chat, classify, extract, search, generate, agents.',
      'Architecture: frontend → backend proxy → LLM (+ vector DB / tools).',
      'AI probabilistic hai — validate karo, key backend par rakho.',
    ],
    related: ['how-llms-work', 'first-api-call', 'backend-proxy'],
  },

  'how-llms-work': {
    overview:
      'LLM ek bahut bada **neural network** hai jo internet-scale text par train hua hai. Iska ek hi core kaam hai: **"ab tak jo text mila, uske baad sabse probable agla token kya hai?"** — yeh guess baar-baar karke poora sentence bana deta hai. Yeh "next-token prediction" itna scale par hone se model grammar, facts, reasoning aur coding patterns "seekh" jaata hai. Builder ke liye 3 cheezein maayne rakhti hain: **tokens**, **context window**, aur **probabilistic output**. 🧠',
    why:
      'Agar aap "next-token predictor" ka mental model samajh gaye, to bahut saari behaviours khud clear ho jaati hain: AI kabhi jhoothi baat kyun banata (hallucination), temperature kya karta hai, context window kyun matter karta hai, aur prompt itna important kyun hai. Yeh samajh aapko **debugging aur prompt design** dono mein senior bana deti hai.',
    concept: [
      { h: 'Tokens — model ki "language"', p: 'Model shabd nahi, **tokens** (sub-word pieces) mein sochta hai. Roughly **1 token ≈ 4 characters ≈ 0.75 English word**. "internationalization" kai tokens mein tootta hai, "cat" ek. Har input tokenize hota hai, model token-by-token output deta hai — aur **billing tokens par hoti hai**. Detail: [[tokens-context-cost]].' },
      { h: 'Next-token prediction', p: 'Model har step par poore vocabulary (~1 lakh tokens) par ek **probability distribution** nikalta hai aur usme se ek token chunta hai, phir usse input mein jodkar agla predict karta hai — loop. Isi liye output "generate" hota hai, lookup nahi.' },
      { h: 'Temperature & sampling', p: '**Temperature** randomness control karta hai. `temperature: 0` → almost deterministic, hamesha sabse probable token (facts/extraction ke liye best). Zyada temperature (0.7–1) → creative, varied (brainstorm/marketing ke liye). Same prompt par alag output ka yeh ek bada reason hai.' },
      { h: 'Context window = short-term memory', p: 'Model ki koi permanent memory nahi. Har call **stateless** hai — jo bhi aap prompt mein bhejte ho (system + history + user), wahi uska poora "gyaan" us call ke liye hai. Iska size = **context window** (e.g. 200K tokens). Isse bahar sab "bhool" jaata hai.' },
      { h: 'Hallucination', p: 'Kyunki model **plausible text** banata hai (truth database nahi hai), wo confident tarike se galat facts bhi bana sakta hai — isse **hallucination** kehte hain. Isi liye important facts ke liye **RAG** ([[rag-pipeline]]) ya tools ([[tool-calling]]) dete hain taaki model ke paas real data ho.' },
    ],
    analogy:
      'LLM ek super-padha-likha **improv actor** hai jinke paas script nahi hai. 🎭 Aap scene set karte ho (prompt), aur wo har next line "sabse natural kya lagegi" ke hisaab se bolta hai — line-by-line. Temperature = actor kitna experimental hai. Context window = actor ko sirf utna hi yaad jitna aapne is scene mein bataya. Agar aap fact nahi doge, wo confidently kuch bhi bana sakta hai (hallucination).',
    process: {
      type: 'boxes',
      items: [
        { label: 'Prompt', sub: 'text in', color: '#06B6D4' },
        { label: 'Tokenize', sub: 'text → tokens', color: '#3B82F6' },
        { label: 'Predict', sub: 'next token probs', color: '#8B5CF6' },
        { label: 'Sample', sub: 'pick a token', color: '#A855F7' },
        { label: 'Repeat', sub: 'until done', color: '#22C55E' },
      ],
    },
    examples: [
      {
        level: 'Practical',
        title: 'Temperature ka asar',
        lang: 'js',
        code: `// Same prompt, alag temperature\nawait llm({ prompt: 'Ek startup ka naam do', temperature: 0 })\n// → 'TechFlow' (har baar wahi/similar, safe)\n\nawait llm({ prompt: 'Ek startup ka naam do', temperature: 0.9 })\n// → 'Nimbly', 'Zephyra', 'Bloomkit'… (har baar naya, creative)`,
        explain: 'Extraction/classification → temperature 0. Brainstorming/creative writing → temperature 0.7–1. Yeh ek chhota knob hai jo output ka character badal deta hai.',
      },
    ],
    notes: {
      concept: 'LLM = next-token predictor. Stateless hai — memory sirf prompt mein bheji cheez.',
      tip: 'Facts/JSON chahiye? temperature 0. Ideas chahiye? temperature badhao.',
      warning: 'Model confidently jhooth bol sakta hai (hallucination). Critical facts ke liye RAG/tools do.',
      error: 'Yeh maan lena ki model pichhli chat "yaad" rakhta hai — nahi, aap history har call mein dobara bhejte ho.',
    },
    mistakes: [
      { bad: 'Sochna ki AI ek "truth database" hai.', fix: 'Wo probable text banata hai. Truth chahiye to real data (RAG/tools) do.' },
      { bad: 'Creative task par temperature 0 rakhna aur bore output pe complain karna.', fix: 'Task ke hisaab se temperature tune karo.' },
      { bad: 'Yeh expect karna ki model apne aap conversation yaad rakhega.', fix: 'Har request stateless hai — history khud manage/bhejo.' },
    ],
    best: [
      'Har feature ke liye temperature sochkar set karo (default hamesha theek nahi).',
      'Facts par bharosa mat karo — verify ya ground karo (RAG).',
      'Context window ko budget ki tarah treat karo — sirf relevant cheez bhejo.',
      'Model ko "reason step by step" bolne se complex tasks better hote hain.',
    ],
    performance:
      'Output tokens generate karna input padhne se **mehenga aur slow** hai (har output token ek forward pass). Isliye "concise answer do" bolna aur `max_tokens` set karna latency + cost dono kam karta hai. Input jitna lamba, first token utni der se — [[latency-cost]] dekho. ⚡',
    interview: {
      beginner: [
        { q: 'LLM basically karta kya hai?', a: 'Ab tak ke text ke baad sabse probable agla token predict karta hai, baar-baar — isse poora response banta hai.' },
        { q: 'Token kya hai?', a: 'Text ka sub-word piece. ~1 token = 4 chars = 0.75 word. Model tokens mein sochta hai aur billing tokens par hoti hai.' },
      ],
      intermediate: [
        { q: 'Temperature kya control karta hai?', a: 'Sampling randomness. 0 = deterministic/safe, high = creative/varied.' },
        { q: 'Hallucination kyun hoti hai?', a: 'Model plausible text generate karta hai, truth lookup nahi karta. Ground na ho to confidently galat bana deta hai.' },
      ],
      advanced: [
        { q: 'LLM stateless hone ka matlab app design par kya asar?', a: 'Har call mein poora relevant context (system + history + retrieved data) dobara bhejna padta hai; server par conversation state khud manage karna padta hai.' },
      ],
    },
    mcqs: [
      { q: 'Roughly 1 token kitne characters ke barabar hai?', options: ['1', '4', '10', '100'], answer: 1, explain: '~4 characters ya ~0.75 word.' },
      { q: 'Deterministic factual output ke liye temperature?', options: ['0', '0.7', '1', '2'], answer: 0, explain: '0 = sabse probable token, minimal randomness.' },
      { q: 'Hallucination ka best fix?', options: ['Temperature badhao', 'Real data ground karo (RAG/tools)', 'Lamba prompt do', 'Retry karo'], answer: 1, explain: 'Model ko actual facts do taaki wo guess na kare.' },
    ],
    exercises: {
      easy: ['Ek hi prompt temperature 0 aur 1 par chalao, output ka farak note karo.'],
      medium: ['Model se ek obscure fact poochho aur verify karo — hallucination pakdo.'],
      advanced: ['Ek prompt likho jo model ko "step by step reason" karne bole aur answer improve dekho.'],
    },
    summary: [
      'LLM = next-token predictor, internet text par trained.',
      'Model tokens mein sochta hai; billing tokens par.',
      'Temperature = randomness knob (0 safe, high creative).',
      'Model stateless hai — context window hi uski memory.',
      'Hallucination real hai — important facts ground karo.',
    ],
    related: ['tokens-context-cost', 'choosing-a-model', 'rag-pipeline'],
  },

  'tokens-context-cost': {
    overview:
      'Teen cheezein jo har AI feature ki **cost, speed aur reliability** decide karti hain: **tokens** (text ka unit), **context window** (ek call mein max tokens), aur **pricing** (input aur output tokens ke alag rates). Agar aap in teeno ko budget ki tarah manage karna seekh gaye, to aapki app fast bhi rahegi aur sasti bhi. 🔢',
    why:
      'Naye AI devs ka sabse bada surprise: **bill**. Ek lamba document har request mein bhejna, ya poori chat history baar-baar bhejna, cost ko exponentially badha deta hai. Aur context window overflow hote hi requests fail hone lagti hain. Yeh topic aapko **paisa aur errors dono bachata** hai.',
    concept: [
      { h: 'Token counting', p: 'Input tokens = aapki poori prompt (system + history + user + retrieved data). Output tokens = model ka jawab. **Dono count hote hain**, dono ke liye paisa lagta hai — aur aksar output rate input se **zyada** hoti hai.' },
      { h: 'Context window', p: 'Har model ka ek max hota hai, jaise **200K tokens** (Claude). Isme system + saari history + user message + expected output — sab fit hona chahiye. Overflow → error ya purani baatein truncate. Isliye lambi chats ko summarize/trim karna padta hai.' },
      { h: 'Pricing model', p: 'Cost = `(input_tokens × input_rate) + (output_tokens × output_rate)`, per **million tokens** quote hoti hai. Chhota model (Haiku) bada model (Opus) se kai guna sasta hota hai. Isi liye task ke hisaab se model chunna ([[choosing-a-model]]) bada lever hai.' },
      { h: 'History cost trap', p: 'Chat apps mein har naye message ke saath aap **poori pichhli history** dobara bhejte ho. 20-message chat ka 21st message poore 20 ka input dobara pay karta hai. Fix: sliding window, summary of old turns, ya prompt caching ([[caching]]).' },
    ],
    analogy:
      'Context window ek **suitcase** hai jiski fixed capacity hai. 🧳 Tokens = saaman. System prompt + history + question sab isi suitcase mein aana chahiye — aur airline (provider) **per-kilo (per-token)** charge karti hai, output saaman ka rate zyada. Smart traveller sirf zaroori cheez pack karta hai (relevant context) aur purana saaman nikaal deta hai (trim history).',
    syntax: {
      code: `// Cost estimate (illustrative rates, per 1M tokens)\nconst RATES = {\n  'claude-haiku-4-5':  { in: 1,  out: 5  },   // sasta, fast\n  'claude-sonnet-4-6': { in: 3,  out: 15 },   // balanced\n  'claude-opus-4-8':   { in: 15, out: 75 },   // sabse smart\n}\n\nfunction estimateCost(model, inTokens, outTokens) {\n  const r = RATES[model]\n  return (inTokens / 1e6) * r.in + (outTokens / 1e6) * r.out\n}\n\nestimateCost('claude-haiku-4-5', 2000, 500)  // ≈ $0.0045\nestimateCost('claude-opus-4-8', 2000, 500)    // ≈ $0.0675  (15x!)`,
      note: 'Same kaam chhote model par 10–15x sasta pad sakta hai. Rates provider docs se latest lo — yeh sirf illustration hai.',
      lang: 'js',
    },
    process: {
      type: 'boxes',
      items: [
        { label: 'System', sub: 'input tokens', color: '#06B6D4' },
        { label: 'History', sub: 'input tokens', color: '#3B82F6' },
        { label: 'User msg', sub: 'input tokens', color: '#8B5CF6' },
        { label: 'Output', sub: 'costs more', color: '#F59E0B' },
      ],
    },
    notes: {
      concept: 'Cost = input tokens + output tokens (output rate zyada). Context window = ek call ka max budget.',
      tip: 'Output cap karo: max_tokens set karo aur "concise" bolo — speed + cost dono improve.',
      warning: 'Poori chat history baar-baar bhejna cost ka #1 chhupa hua reason hai.',
      error: 'Context window overflow → request fail ya silent truncation. Length monitor karo.',
    },
    compare: {
      headers: ['Lever', 'Effect on cost', 'Effect on speed'],
      rows: [
        ['Chhota model', 'Bahut kam', 'Fast'],
        ['Chhoti prompt/history', 'Kam', 'Fast'],
        ['max_tokens cap', 'Kam (output)', 'Fast'],
        ['Prompt caching', 'Bahut kam (repeat)', 'Fast'],
        ['Bada context bhejna', 'Zyada', 'Slow'],
      ],
    },
    mistakes: [
      { bad: 'Har request mein poora document + poori history bhejna.', fix: 'Sirf relevant chunk (RAG) + trimmed/summarized history bhejo.' },
      { bad: 'max_tokens set na karna.', fix: 'Output cap karo — runaway long answers cost aur latency badhate hain.' },
      { bad: 'Har feature Opus par chalana.', fix: 'Simple tasks Haiku/Sonnet par — 10x tak sasta.' },
    ],
    best: [
      'Har feature ke liye typical input+output tokens estimate karo.',
      'Sabse chhota model use karo jo kaam theek kare.',
      'History ko window/summary se manage karo — unbounded mat rakho.',
      'Repeated bade context ke liye prompt caching on karo.',
      'Real usage dashboard par monitor karo (per-feature cost).',
    ],
    performance:
      'Tokens directly latency drive karte hain: zyada input tokens = zyada "time to first token", zyada output tokens = zyada total time. Concise prompts + chhote outputs + caching se p95 latency girti hai. Yeh [[latency-cost]] aur [[caching]] se gehra juda hai. ⚡',
    interview: {
      beginner: [
        { q: 'Cost kis par lagta hai?', a: 'Input tokens + output tokens dono par; output rate aksar zyada hoti hai.' },
        { q: 'Context window kya hai?', a: 'Ek call mein allowed max tokens (system + history + user + output) — jaise 200K.' },
      ],
      intermediate: [
        { q: 'Chat app mein cost silently kyun badhta hai?', a: 'Har naye message ke saath poori history dobara input mein jaati hai — token count har turn badhta hai.' },
        { q: 'Cost kaise kam karein bina feature tode?', a: 'Chhota model, trimmed history/RAG, max_tokens cap, prompt caching.' },
      ],
    },
    mcqs: [
      { q: 'Aam taur par kaunse tokens mehnge hote hain?', options: ['Input', 'Output', 'Dono barabar', 'Koi nahi'], answer: 1, explain: 'Output rate aksar input se zyada hoti hai.' },
      { q: 'Context window overflow hone par kya hota hai?', options: ['Free ho jaata', 'Error ya truncation', 'Model tez hota', 'Kuch nahi'], answer: 1, explain: 'Request fail ya purana context kat jaata hai.' },
    ],
    exercises: {
      easy: ['Apne ek typical prompt ke tokens estimate karo (chars ÷ 4).'],
      medium: ['Ek 15-message chat ki cumulative input tokens ka rough graph banao.'],
      advanced: ['Ek estimateCost() function likho aur teen models ke liye ek feature ki monthly cost nikaalo (10k calls/month).'],
    },
    summary: [
      'Token = text ka unit (~4 chars). Billing tokens par.',
      'Cost = input + output tokens; output aksar mehnga.',
      'Context window = ek call ka max token budget.',
      'History repeat cost ka bada chhupa reason hai.',
      'Chhota model + trim + max_tokens + caching = sasta & fast.',
    ],
    related: ['choosing-a-model', 'caching', 'latency-cost'],
  },

  'first-api-call': {
    overview:
      'Chalo theory se code par aate hain. Ek LLM API call basically ek **HTTP POST** hai: aap ek `model`, ek list of `messages` (system + user), aur kuch params (`max_tokens`, `temperature`) bhejte ho; response mein model ka text milta hai. Aap ise official SDK (`@anthropic-ai/sdk` / `openai`) se ya plain `fetch` se kar sakte ho. Yeh call **server par** honi chahiye taaki API key safe rahe. 🔌',
    why:
      'Yeh wo "hello world" moment hai jahan AI real feels karne lagta hai. Ek baar aapne ek call successfully kar li, baaki sab (streaming, tools, RAG) usi call ka extension hai. Pattern samajhna — messages array, system vs user, response shape — poori journey ki neenv hai.',
    concept: [
      { h: 'messages array', p: 'Aap conversation ko **role-tagged messages** ki list ke roop mein bhejte ho: `system` (behaviour/rules), `user` (insaan ka input), aur `assistant` (model ke pichhle jawab). Multi-turn chat = yeh array badhta jaata hai. Har call mein poora relevant array jaata hai (model stateless hai).' },
      { h: 'Key params', p: '`model` (kaun sa), `max_tokens` (output cap — required Anthropic mein), `temperature` (randomness), aur `system` (top-level behaviour). Bas itne se 90% features ban jaate hain.' },
      { h: 'SDK vs fetch', p: 'Official **SDK** cleaner hai (types, retries, streaming helpers). **fetch** har jagah chalta hai (edge/serverless) aur zero-dependency hai. Concept dono mein same — POST + JSON.' },
      { h: 'Response shape', p: 'Anthropic response mein `content` ek array of blocks hota hai; text `content[0].text` mein. OpenAI mein `choices[0].message.content`. Aap is text ko nikaal kar UI ya aage ki logic mein use karte ho.' },
    ],
    analogy:
      'API call ek **restaurant order slip** hai. 📝 `model` = kaunsa chef, `system` = "aap ek Italian chef ho" (standing instruction), `messages` = actual order, `max_tokens` = "portion size". Aap slip kitchen (provider) ko bhejte ho aur ready dish (text) wapas aati hai. Slip aapke **backend waiter** ke through jaati hai — customer (browser) seedha kitchen ko order nahi deta (key safety).',
    syntax: {
      code: `// Backend (Node). npm i @anthropic-ai/sdk\nimport Anthropic from '@anthropic-ai/sdk'\nconst client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })\n\nconst msg = await client.messages.create({\n  model: 'claude-sonnet-4-6',\n  max_tokens: 500,\n  temperature: 0.3,\n  system: 'You are a concise assistant. Reply in simple Hinglish.',\n  messages: [\n    { role: 'user', content: 'React kya hai, 2 lines mein?' },\n  ],\n})\n\nconsole.log(msg.content[0].text)`,
      note: 'system top-level param hai (messages array se alag). max_tokens required hai. Key env se aati hai, kabhi hardcode nahi.',
      lang: 'js',
    },
    examples: [
      {
        level: 'Beginner',
        title: 'Wahi call plain fetch se (edge-friendly)',
        lang: 'js',
        code: `const res = await fetch('https://api.anthropic.com/v1/messages', {\n  method: 'POST',\n  headers: {\n    'x-api-key': process.env.ANTHROPIC_API_KEY,\n    'anthropic-version': '2023-06-01',\n    'content-type': 'application/json',\n  },\n  body: JSON.stringify({\n    model: 'claude-sonnet-4-6',\n    max_tokens: 500,\n    messages: [{ role: 'user', content: 'Say hi in Hinglish' }],\n  }),\n})\nconst data = await res.json()\nconst text = data.content[0].text`,
        explain: 'Koi SDK nahi — sirf headers + JSON body. Yeh Cloudflare Workers/Vercel Edge jaise environments mein bhi chalta hai jahan Node SDK bhaari pad sakta hai.',
      },
      {
        level: 'Intermediate',
        title: 'Multi-turn conversation',
        lang: 'js',
        code: `const messages = [\n  { role: 'user', content: 'Mera naam Rahul hai.' },\n  { role: 'assistant', content: 'Namaste Rahul!' },\n  { role: 'user', content: 'Mera naam kya hai?' },\n]\n// Poora array bhejna padta hai — warna model 'Rahul' bhool jayega\nconst msg = await client.messages.create({\n  model: 'claude-haiku-4-5-20251001', max_tokens: 100, messages,\n})\n// → 'Aapka naam Rahul hai.'`,
        explain: 'Memory = messages array jo aap bhejte ho. Assistant ke purane jawab bhi include karne padte hain warna context toot jaata hai.',
      },
    ],
    notes: {
      concept: 'Ek call = POST with { model, max_tokens, system, messages }. Response text nikaal kar use karo.',
      tip: 'Development mein Haiku use karo — sasta aur fast, iterate karna easy.',
      warning: 'Yeh code **server** par chalao. Browser se call = key leak = bill shock.',
      error: 'max_tokens bhoolna (Anthropic mein required) ya system ko messages array ke andar daalna — dono common galtiyan.',
    },
    mistakes: [
      { bad: 'API key ko frontend code/`.env` (VITE_) mein daalna.', fix: 'Key sirf backend env mein. Browser bundle mein kabhi nahi — [[backend-proxy]].' },
      { bad: 'Har call mein sirf latest message bhejna aur "AI bhool gaya" bolna.', fix: 'Poora relevant messages array bhejo.' },
      { bad: 'Response ko blindly `data.text` maan lena.', fix: 'Provider ke hisaab se shape check karo (Anthropic: content[0].text).' },
    ],
    best: [
      'Env var se key lo; SDK ko auto-retry karne do.',
      'Dev mein sasta/fast model, prod mein sahi model.',
      'Response parsing ko ek helper mein wrap karo (provider swap easy).',
      'Errors handle karo — network/timeout/429 sab possible hain ([[reliability]]).',
    ],
    performance:
      'Pehla call aksar "cold" lagta hai. Latency mostly output length par depend karti hai — chhota max_tokens = fast. Agar user ko turant feedback chahiye to streaming ([[streaming]]) lagao taaki words aate hi dikhein. ⚡',
    interview: {
      beginner: [
        { q: 'LLM API call basically kya hai?', a: 'Ek HTTP POST jisme model, messages aur params bhejte ho; response mein generated text milta hai.' },
        { q: 'system aur user message mein farak?', a: 'system = standing behaviour/rules; user = actual input/question.' },
      ],
      intermediate: [
        { q: 'SDK vs fetch kab?', a: 'SDK: DX, retries, streaming helpers (Node backend). fetch: zero-dep, edge/serverless friendly.' },
        { q: 'Multi-turn memory kaise banti hai?', a: 'Har call mein poora messages array (past user+assistant) bhejkar — model khud state nahi rakhta.' },
      ],
    },
    mcqs: [
      { q: 'Anthropic mein kaunsa param required hai?', options: ['temperature', 'max_tokens', 'top_p', 'stream'], answer: 1, explain: 'max_tokens dena zaroori hai.' },
      { q: 'API call kahan honi chahiye?', options: ['Browser', 'Backend/server', 'Dono', 'CDN'], answer: 1, explain: 'Key safety ke liye server par.' },
    ],
    exercises: {
      easy: ['Ek backend route banao jo fixed prompt par model ka jawab return kare.'],
      medium: ['Route ko dynamic karo: user text lo, summarize karke bhejo.'],
      advanced: ['Ek 3-message conversation bhejkar verify karo ki model context yaad rakhta hai (kyunki aap history bhej rahe ho).'],
    },
    summary: [
      'API call = POST { model, max_tokens, system, messages }.',
      'system = behaviour, user/assistant = conversation.',
      'SDK ya fetch — concept same; edge par fetch behtar.',
      'Memory = aapka bheja hua messages array (model stateless).',
      'Hamesha server par; key env se; response shape parse karo.',
    ],
    related: ['backend-proxy', 'streaming', 'system-prompts'],
  },

  'choosing-a-model': {
    overview:
      'Har provider ke paas ek **model family** hoti hai — chhota/fast/sasta se lekar bada/smart/mehnga tak. Anthropic mein roughly: **Haiku** (fast & cheap), **Sonnet** (balanced workhorse), **Opus** (sabse capable). Sahi model chunna ek engineering decision hai jo aapki app ki **speed, cost aur quality** ek saath decide karta hai — aur aksar ek hi app mein alag features alag models use karti hain. 🎯',
    why:
      'Naye devs ya to sab kuch sabse bade model par chalate hain (mehnga + slow) ya sabse chhote par (galtiyan). Sahi jodi chunna ek **10x cost aur 3x latency** ka farak la sakta hai bina user-visible quality gira. Yeh skill seedha aapki app ke unit economics par asar daalti hai.',
    concept: [
      { h: 'Model tiers', p: '**Small/fast** (Haiku): classification, extraction, routing, simple replies — sasta aur turant. **Mid/balanced** (Sonnet): zyadatar production features — RAG answers, chat, coding help. **Large/frontier** (Opus): mushkil reasoning, complex agents, nuanced writing. Rule: **sabse chhota model jo kaam theek kare**.' },
      { h: 'Model routing', p: 'Ek smart pattern: pehle ek sasta model se **classify** karo ("yeh easy hai ya hard?"), phir accordingly chhote ya bade model par bhejo. Isse aap 80% easy traffic sasta serve karte ho aur sirf 20% hard cases par paisa kharch karte ho.' },
      { h: 'Context window & modality', p: 'Kuch models bada context (200K+) ya **vision** (image input) support karte hain. Agar aapko PDFs/images process karne hain ya bahut lamba document, to yeh factors model choice mein aate hain — sirf "smartness" nahi.' },
      { h: 'Latency vs quality trade-off', p: 'Bada model = behtar quality par **slower + costlier**. User-facing autocomplete/typeahead ke liye speed jeetti hai (Haiku). Ek-baar ka deep report banane ke liye quality jeetti hai (Opus). Task ka context decide karta hai.' },
    ],
    analogy:
      'Model chunna = **team hiring**. 🧑‍🤝‍🧑 Har chhote-mote kaam ke liye CEO (Opus) ko mat lagao — mehnga aur slow. Routine kaam intern (Haiku) kar dega turant. Mushkil, high-stakes kaam senior (Opus/Sonnet) ko do. Smart manager (routing) pehle dekhta hai kaam kitna hard hai, phir sahi banda assign karta hai.',
    compare: {
      headers: ['Tier', 'Example', 'Best for', 'Speed', 'Cost'],
      rows: [
        ['Small', 'Haiku', 'Classify, extract, route, simple chat', 'Fastest', '$'],
        ['Balanced', 'Sonnet', 'RAG, chat, coding, most features', 'Fast', '$$'],
        ['Frontier', 'Opus', 'Hard reasoning, agents, nuanced writing', 'Slower', '$$$$'],
      ],
    },
    examples: [
      {
        level: 'Practical',
        title: 'Model routing — sasta pehle, mehnga zaroorat par',
        lang: 'js',
        code: `async function answer(question) {\n  // 1) Sasta model se difficulty judge karo\n  const { difficulty } = await classify(question, 'claude-haiku-4-5-20251001')\n\n  // 2) Accordingly model chuno\n  const model = difficulty === 'hard'\n    ? 'claude-opus-4-8'\n    : 'claude-sonnet-4-6'\n\n  return client.messages.create({\n    model, max_tokens: 800,\n    messages: [{ role: 'user', content: question }],\n  })\n}`,
        explain: 'Zyadatar sawaal easy hote hain → Sonnet par sasta serve. Sirf genuinely hard sawaal Opus tak pahunchte hain. Average cost gir jaati hai bina quality gire.',
      },
    ],
    notes: {
      concept: 'Sabse chhota model chuno jo kaam theek kare. Ek app mein multiple models normal hai.',
      tip: 'Feature ke liye 2 models par same test-set chalao aur output + cost compare karo.',
      warning: 'Bade model ko default mat banao — cost/latency chup-chaap badh jaati hai.',
      error: 'Model ID galat/typo — 404/400 error. IDs docs se exact copy karo.',
    },
    mistakes: [
      { bad: 'Sab kuch frontier model par chalana.', fix: 'Simple tasks chhote model par — routing lagao.' },
      { bad: 'Sirf "smartness" dekhna, latency/context/vision ignore karna.', fix: 'Task ke real constraints (speed, image, length) ke hisaab se chuno.' },
      { bad: 'Model hardcode karke bikher dena.', fix: 'Model ID ko config/env mein rakho — swap easy ho.' },
    ],
    best: [
      'Default Sonnet-tier; upgrade to Opus sirf jab eval demand kare.',
      'High-volume simple tasks Haiku par — bada saving.',
      'Model choice ko config-driven rakho, code mein bikhraao mat.',
      'Naye model aane par apne eval-set par compare karke migrate karo.',
      'Vision/long-context zaroorat pehle check karo, phir tier.',
    ],
    performance:
      'Model tier latency ka sabse bada knob hai — Haiku aksar Opus se kai guna fast. User-facing interactive features ke liye chhota model + streaming best "feel" deta hai. Batch/background jobs mein quality ke liye bada model afford kar sakte ho. ⚡',
    interview: {
      beginner: [
        { q: 'Model tiers ka basic idea?', a: 'Small/fast/sasta (Haiku) → balanced (Sonnet) → frontier/smart/mehnga (Opus). Task ke hisaab se chuno.' },
        { q: 'Default rule?', a: 'Sabse chhota model jo acceptable quality de — cost/latency bachao.' },
      ],
      intermediate: [
        { q: 'Model routing kya hai?', a: 'Sasta model se difficulty classify karke request ko chhote ya bade model par bhejna — cost optimize karta hai.' },
        { q: 'Smartness ke alawa kaunse factors?', a: 'Latency, context window, vision/multimodal support, aur cost.' },
      ],
    },
    mcqs: [
      { q: 'High-volume simple classification ke liye best tier?', options: ['Frontier/Opus', 'Small/Haiku', 'Sabse mehnga', 'Koi bhi'], answer: 1, explain: 'Fast + sasta chhota model ideal.' },
      { q: 'Model routing ka fayda?', options: ['Sirf quality', 'Cost bina quality gire', 'Zyada latency', 'Kam accuracy'], answer: 1, explain: 'Easy traffic sasta, hard traffic hi mehnga.' },
    ],
    exercises: {
      easy: ['Apni app ke 3 features list karo aur har ek ke liye tier suggest karo.'],
      medium: ['Ek feature ko Haiku aur Sonnet dono par chalao, quality + cost note karo.'],
      advanced: ['Ek routing function likho jo difficulty ke hisaab se model chune, aur average cost estimate karo.'],
    },
    summary: [
      'Model family: small/fast/cheap → balanced → frontier/smart.',
      'Rule: sabse chhota model jo kaam theek kare.',
      'Ek app mein multiple models + routing normal hai.',
      'Latency, context, vision bhi choice ke factors hain.',
      'Model ID config-driven rakho; naye models par eval karke migrate.',
    ],
    related: ['tokens-context-cost', 'latency-cost', 'evals'],
  },
}
