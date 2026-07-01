// AI App Engineering content — Part 2: Prompting for Products + Integrating LLMs

export const aiAppContentB = {
  'prompt-design': {
    overview:
      'Prompt aapke AI feature ka **source code** hai. Ek feature-grade prompt random "ChatGPT question" nahi hota — usme **role, task, context, rules, format aur examples** clearly likhe hote hain taaki output har baar consistent, sahi shape mein aur reliable ho. Achha prompt design karna AI apps ki sabse high-leverage skill hai: same model, better prompt = dramatically better product. ✍️',
    why:
      '90% "AI feature kaam nahi kar raha" problems actually **prompt problems** hote hain, model problems nahi. Ek structured prompt hallucination kam karta hai, format fix karta hai, edge cases handle karta hai, aur cost bhi kam karta hai (kyunki retries girti hain). Yeh seekhna aapko model upgrade kiye bina hi results improve karne deta hai.',
    concept: [
      { h: 'Anatomy of a good prompt', p: 'Ek strong prompt mein hote hain: **Role** ("You are a support agent…"), **Task** (kya karna hai, specifically), **Context** (relevant data/rules), **Constraints** (kya mat karo, length, tone), aur **Output format** (JSON/markdown/plain). Yeh structure ambiguity hataता hai.' },
      { h: 'Be specific, not polite', p: 'Model ko "please nicely" nahi, **precise instruction** chahiye. "Summarize" se behtar hai "Summarize in exactly 3 bullet points, each under 15 words, focusing on action items." Specificity = predictability.' },
      { h: 'Few-shot examples', p: 'Prompt mein 1–3 **input→output examples** dena (few-shot) model ko exact pattern sikha deta hai — especially format aur edge cases ke liye. Yeh aksar model upgrade se zyada asar karta hai.' },
      { h: 'Delimiters & structure', p: 'User data ko clearly demarcate karo (jaise `<document>…</document>` ya triple backticks) taaki model "instruction" aur "data" ko na mile. Yeh accuracy badhata hai aur prompt injection ([[security]]) se bhi thodा bachata hai.' },
      { h: 'Iterate against examples', p: 'Prompt ko ek test-set (5–10 real inputs) par tune karo. Jab tak sab par output theek na ho, wording adjust karte raho. Yeh "prompt as code + tests" mindset hai — [[evals]] mein aur gehra.' },
    ],
    analogy:
      'Prompt design ek naye employee ke liye **SOP (standard operating procedure) likhna** hai. 📋 Agar aap sirf bolo "reply to customers", naya banda kuch bhi kar dega. Agar aap role, exact steps, tone, do/don\'ts aur 2 sample replies do — wo consistent, on-brand kaam karega. Model bhi bilkul waisa hi hai: jitni clear SOP, utna reliable output.',
    syntax: {
      code: `const system = \`You are a support triage assistant for a SaaS app.\n\nTASK: Classify the user message and draft a reply.\n\nRULES:\n- Tone: friendly, professional, concise (max 4 sentences).\n- Never promise refunds; escalate billing to humans.\n- If unsure, ask one clarifying question.\n\nOUTPUT: Return ONLY valid JSON:\n{ "category": "bug|billing|howto|other", "reply": string, "escalate": boolean }\`\n\nconst user = \`<message>\${customerText}</message>\``,
      note: 'Role + Task + Rules + Output + delimiters. User data <message> tags mein — instruction se alag. Yeh feature-grade prompt hai, casual question nahi.',
      lang: 'js',
    },
    examples: [
      {
        level: 'Beginner',
        title: 'Weak vs strong prompt',
        lang: 'js',
        code: `// ❌ Weak — output kuch bhi shape mein aa sakta hai\n'Summarize this article'\n\n// ✅ Strong — deterministic shape\n\`Summarize the article inside <a></a> as exactly 3 bullets.\nEach bullet < 15 words. Focus on decisions & numbers.\nReturn plain text bullets only, no preamble.\n<a>\${article}</a>\``,
        explain: 'Strong prompt count, length, focus aur format sab pin karta hai. Result parse karna aur UI mein dikhana trivial ho jaata hai.',
      },
      {
        level: 'Intermediate',
        title: 'Few-shot for consistent tone',
        lang: 'js',
        code: `const system = \`Rewrite user text as a polite Hinglish reply.\n\nExample 1\nInput: "order late"\nOutput: "Sorry for the delay! Aapka order jaldi hi pahunch jayega. 🙏"\n\nExample 2\nInput: "app crash"\nOutput: "Oops! Crash ke liye maafi. Please app update karke dekhein. 🔧"\`\n// Ab naye inputs bhi isi tone/format mein aayenge`,
        explain: 'Do examples ne tone, length, emoji-style aur language sab lock kar diya. Naya input automatically pattern follow karega.',
      },
    ],
    notes: {
      concept: 'Prompt = code. Structure: Role + Task + Context + Rules + Output format (+ examples).',
      tip: 'Few-shot examples format problems ka #1 fix hain.',
      warning: 'Vague prompts = unpredictable output = zyada retries = zyada cost.',
      error: 'User data ko instructions ke saath bina delimiter mila dena — model confuse + injection risk.',
    },
    mistakes: [
      { bad: 'Ek-line vague prompt aur consistent output ki umeed.', fix: 'Role/task/rules/format explicitly likho.' },
      { bad: 'Output format specify na karna, phir parsing tootna.', fix: 'Exact format (JSON schema/bullets) maango; examples do.' },
      { bad: 'User input aur instruction ko bina separator jodna.', fix: 'Delimiters (<tags>/```) use karo.' },
    ],
    best: [
      'Prompt ko version control mein rakho, code ki tarah review karo.',
      '1–3 few-shot examples do jahan format/tone matter kare.',
      'Ek chhote real test-set par prompt iterate karo.',
      'System prompt mein rules, user message mein sirf data.',
      'Chhota aur precise > lamba aur vague (cost + clarity).',
    ],
    performance:
      'Lamba prompt = zyada input tokens = zyada cost + latency har call par. Achha prompt design **concise** bhi hona chahiye — redundant instructions hatao. Stable prompts prompt caching ([[caching]]) se aur saste ho jaate hain. ⚡',
    interview: {
      beginner: [
        { q: 'Achhe prompt ke parts?', a: 'Role, Task, Context, Rules/Constraints, Output format, aur optionally few-shot examples.' },
        { q: 'Few-shot prompting kya hai?', a: 'Prompt mein input→output examples dena taaki model exact pattern/format follow kare.' },
      ],
      intermediate: [
        { q: 'Delimiters kyun use karte hain?', a: 'User data ko instructions se alag karne ke liye — accuracy badhti hai aur injection thoda mushkil hota hai.' },
        { q: 'Feature prompt ko reliable kaise banate ho?', a: 'Structure + examples + ek test-set par iterate; version control; output format pin karna.' },
      ],
    },
    mcqs: [
      { q: 'Format problems ka sabse asrdaar fix?', options: ['Bada model', 'Few-shot examples', 'Zyada temperature', 'Retry'], answer: 1, explain: 'Examples exact pattern sikha dete hain.' },
      { q: 'User data ko instruction se alag karne ka tarika?', options: ['Kuch nahi', 'Delimiters/tags', 'CAPS mein likhna', 'Chhota model'], answer: 1, explain: 'Delimiters instruction vs data clarity dete hain.' },
    ],
    exercises: {
      easy: ['Ek vague prompt lo aur usme role+task+format add karke strong banao.'],
      medium: ['Ek classify feature ke liye 2 few-shot examples likho aur output stability test karo.'],
      advanced: ['Ek prompt ko 5 real inputs par iterate karke 100% correct format tak le jaao.'],
    },
    summary: [
      'Prompt = feature ka source code; structure matters.',
      'Role + Task + Context + Rules + Output format.',
      'Few-shot examples format/tone lock karte hain.',
      'Delimiters se data aur instruction alag rakho.',
      'Test-set par iterate karo; concise rakho.',
    ],
    related: ['system-prompts', 'structured-output', 'evals'],
  },

  'system-prompts': {
    overview:
      'System prompt aapke AI feature ka **constitution** hai — ek standing instruction jo poori conversation par lagoo rehti hai: model ka role, personality, rules, boundaries aur output style. User messages badalte rehte hain, par system prompt fixed rehta hai. Isi se aap ek generic model ko ek **specific product feature** mein badalte ho. 🎭',
    why:
      'Bina strong system prompt ke, aapka assistant off-brand, inconsistent, aur unsafe ho sakta hai — kabhi kuch bol de, kabhi refuse kar de. System prompt tone, scope aur safety ek jagah centralize karta hai, taaki har user turn par aapko rules repeat na karne pade. Yeh production AI apps ki reliability ki reedh hai.',
    concept: [
      { h: 'System vs user vs assistant', p: '**system**: behaviour/rules (highest priority, ek baar set). **user**: insaan ka input. **assistant**: model ke pichhle jawab. System prompt ko model baaki messages se zyada weight deta hai — isiliye rules/guardrails yahan jaate hain.' },
      { h: 'Kya daalein', p: 'Role ("You are LifeFlow\'s finance assistant"), scope ("only answer about expenses/budgets"), tone ("concise, encouraging Hinglish"), refusals ("don\'t give tax/legal advice"), aur output conventions ("use ₹, show numbers as tables"). Yeh feature ki personality define karta hai.' },
      { h: 'Boundaries & refusals', p: 'System prompt mein clearly likho ki model **kya nahi** karega — out-of-scope requests par politely refuse ya redirect. Yeh scope creep aur galat jawab dono rokta hai, aur security ([[guardrails]]) ka pehla layer hai.' },
      { h: 'Keep it stable & cacheable', p: 'System prompt aksar har call mein same rehta hai — isse **cache** kiya ja sakta hai (prompt caching) taaki repeated calls saste ho. Isiliye stable, well-structured system prompt cost bhi bachata hai.' },
    ],
    analogy:
      'System prompt ek employee ka **job description + company handbook** hai. 📖 User requests roz badalti hain (alag customers), par employee ka role, tone aur company rules fixed rehte hain. Ek naya customer aane par aap handbook dobara nahi padhते — wo background mein hamesha "on" rehti hai. Waise hi system prompt har turn silently apply hota hai.',
    syntax: {
      code: `const system = \`ROLE: You are Fin, LifeFlow's friendly finance assistant.\n\nSCOPE: Only help with expenses, budgets, and saving tips.\nIf asked anything else, politely redirect to finance.\n\nTONE: Warm, concise, simple Hinglish. Use ₹ for money.\n\nRULES:\n- Never give tax or legal advice; suggest a professional.\n- Never invent transaction data; only use provided context.\n- If data is missing, say so and ask for it.\`\n\nawait client.messages.create({\n  model: 'claude-sonnet-4-6', max_tokens: 500, system,\n  messages: conversation,   // sirf user/assistant turns\n})`,
      note: 'system top-level param hai. Role + scope + tone + rules — ek jagah, har turn par lagu. Conversation array mein sirf user/assistant.',
      lang: 'js',
    },
    notes: {
      concept: 'System prompt = standing behaviour/rules; user messages par har baar apply hota hai.',
      tip: 'Refusals/boundaries system mein likho — scope creep rukega.',
      warning: 'Sensitive rules sirf user message mein daalna weak hai; system mein daalo.',
      error: 'System instructions ko user message mein ghusaana — kam priority, override hone ka risk.',
    },
    compare: {
      headers: ['Message role', 'Kaam', 'Kab badalta hai'],
      rows: [
        ['system', 'Behaviour, rules, tone', 'Rarely (feature-level)'],
        ['user', 'Insaan ka input', 'Har turn'],
        ['assistant', 'Model ka reply', 'Har turn'],
      ],
    },
    mistakes: [
      { bad: 'System prompt na dena, generic assistant behaviour.', fix: 'Role/scope/tone/rules define karo — feature identity do.' },
      { bad: 'Rules ko har user message mein repeat karna.', fix: 'Ek baar system mein rakho — cleaner aur cacheable.' },
      { bad: 'Scope define na karna → model kuch bhi answer de deta.', fix: 'Explicit scope + refusal instructions do.' },
    ],
    best: [
      'Role + scope + tone + refusals ek structured system prompt mein.',
      'System prompt stable rakho (caching + consistency).',
      'Out-of-scope ke liye clear redirect instruction do.',
      'Data-grounding rule: "only use provided context, never invent".',
      'System prompt ko bhi eval-set par test karo.',
    ],
    performance:
      'Stable system prompt prompt caching ke liye ideal hai — bade system prompt ko cache karke aap har call ka input cost drastically gira sakte ho ([[caching]]). Lamba system prompt cache ke bina har turn cost karta hai, to concise + stable rakho. ⚡',
    interview: {
      beginner: [
        { q: 'System prompt kya hai?', a: 'Standing instruction (role/rules/tone) jo poori conversation par lagu rehti hai, user messages se alag aur higher priority.' },
        { q: 'System vs user message?', a: 'System = fixed behaviour; user = badalta input. System ko model zyada weight deta hai.' },
      ],
      intermediate: [
        { q: 'Boundaries/refusals kahan define karein?', a: 'System prompt mein — scope aur "kya nahi karna" clearly, taaki out-of-scope requests handle ho.' },
        { q: 'System prompt cost par kaise asar?', a: 'Stable system prompt cache ho sakta hai — repeated calls ka input cost girta hai.' },
      ],
    },
    mcqs: [
      { q: 'Rules/tone kahan rakhna best hai?', options: ['User message', 'System prompt', 'Assistant message', 'URL'], answer: 1, explain: 'System prompt highest-priority standing instruction hai.' },
      { q: 'System prompt kitni baar badalna chahiye?', options: ['Har turn', 'Rarely (feature-level)', 'Har token', 'Kabhi nahi possible'], answer: 1, explain: 'Feature-level, stable — user turns alag hote hain.' },
    ],
    exercises: {
      easy: ['Apni ek AI feature ke liye 5-line system prompt likho (role+tone+2 rules).'],
      medium: ['Ek scope-limited assistant banao jo out-of-scope par politely redirect kare.'],
      advanced: ['Ek system prompt mein data-grounding + refusal rules add karo aur adversarial inputs par test karo.'],
    },
    summary: [
      'System prompt = feature ki constitution (role/rules/tone).',
      'User messages badalte, system fixed + high-priority.',
      'Scope + refusals + grounding yahan define karo.',
      'Stable system prompt cacheable → sasta.',
      'System prompt ko bhi test/evaluate karo.',
    ],
    related: ['prompt-design', 'guardrails', 'caching'],
  },

  'structured-output': {
    overview:
      'Aksar aapko model se prose nahi, **machine-readable data** chahiye — ek JSON object jise aapka code parse karke UI ya DB mein use kare (jaise `{ sentiment, score, tags }`). Free-text se yeh nikalna flaky hota hai. Reliable structured output ke teen tools hain: **clear format instruction + few-shot**, **JSON mode**, aur sabse robust — **tool/function calling with a schema**. 📦',
    why:
      'Structured output wo pul hai jo LLM ko aapke **deterministic code** se jodta hai. Agar output shape unpredictable hai, aapka `JSON.parse` crash karega aur feature toot jaayega. Reliable JSON = aap AI ko forms, filters, database writes aur workflows mein safely use kar sakte ho — sirf chat mein nahi.',
    concept: [
      { h: 'Why free-text parsing fails', p: 'Agar aap sirf "return JSON" bolo, model kabhi markdown fences (```json) laga deta, kabhi explanation jod deta, kabhi trailing comma. Yeh sab `JSON.parse` todte hain. Isliye "shape" ko enforce karna padta hai, sirf request nahi.' },
      { h: 'Approach 1: format + few-shot', p: 'Exact schema likho aur 1–2 examples do; temperature 0 rakho; "Return ONLY JSON, no prose" bolo. Simple cases ke liye kaafi. Phir bhi output ko **defensively parse** karo (fences strip, try/catch).' },
      { h: 'Approach 2: JSON mode', p: 'Kuch providers ek "JSON mode" dete hain jo output ko valid JSON hone ki guarantee deta hai. Yeh syntax-valid to karता hai, par aapke **specific schema** ka match hona alag baat — validation abhi bhi chahiye.' },
      { h: 'Approach 3: tool calling (best)', p: 'Sabse reliable: model ko ek **tool/function** do jiska **input schema** aap define karte ho (JSON Schema). Model us schema ke hisaab se structured arguments bharta hai. Yeh schema-enforced hai — [[tool-calling]] ka core. Extraction/forms ke liye gold standard.' },
      { h: 'Always validate', p: 'Kaisa bhi approach ho, output ko ek schema validator (jaise **Zod**) se guzaaro. Model 99% sahi de, par production mein us 1% ke liye validation + retry chahiye.' },
    ],
    analogy:
      'Free-text maangna ek waiter se "kuch acha le aao" bolne jaisa hai — kuch bhi aa sakta hai. 🍽️ Structured output ek **form bharwana** hai jisme fixed fields hain (naam, quantity, size). Tool calling to aur strict — form ke fields **validated dropdown** hain, isliye galat value aa hi nahi sakti. Aur waiter jo bhi laaye, aap phir bhi bill (validation) check karte ho.',
    syntax: {
      code: `import { z } from 'zod'\n\n// 1) Schema define\nconst Review = z.object({\n  sentiment: z.enum(['positive', 'neutral', 'negative']),\n  score: z.number().min(0).max(1),\n  tags: z.array(z.string()).max(5),\n})\n\n// 2) Prompt output shape maango (temperature 0)\nconst system = 'Extract review data. Return ONLY JSON: ' +\n  '{ sentiment, score (0-1), tags[] }. No prose, no markdown.'\n\nconst raw = await callLLM({ system, user: reviewText, temperature: 0 })\n\n// 3) Defensive parse + validate\nconst json = JSON.parse(raw.replace(/\\\`\\\`\\\`json?|\\\`\\\`\\\`/g, '').trim())\nconst review = Review.parse(json)   // throws if shape galat → retry/fallback`,
      note: 'Zod se schema enforce karo. Markdown fences strip karo. parse fail ho to retry ya fallback — kabhi raw model output par blindly bharosa mat karo.',
      lang: 'js',
    },
    examples: [
      {
        level: 'Advanced',
        title: 'Tool calling se guaranteed schema (best)',
        lang: 'js',
        code: `const tools = [{\n  name: 'save_review',\n  description: 'Save extracted review fields',\n  input_schema: {\n    type: 'object',\n    properties: {\n      sentiment: { type: 'string', enum: ['positive','neutral','negative'] },\n      score: { type: 'number' },\n      tags: { type: 'array', items: { type: 'string' } },\n    },\n    required: ['sentiment', 'score'],\n  },\n}]\n\nconst msg = await client.messages.create({\n  model: 'claude-sonnet-4-6', max_tokens: 300, tools,\n  tool_choice: { type: 'tool', name: 'save_review' },\n  messages: [{ role: 'user', content: reviewText }],\n})\nconst data = msg.content.find((b) => b.type === 'tool_use').input  // schema-shaped`,
        explain: 'tool_choice se model ko force kiya ki wo save_review tool call kare. Uske arguments schema follow karte hain — extraction ka most reliable tarika.',
      },
    ],
    notes: {
      concept: 'Reliable JSON = schema enforce karo (few-shot / JSON mode / tool calling) + hamesha validate.',
      tip: 'Structured extraction ke liye temperature 0 rakho.',
      warning: 'JSON mode syntax valid deta hai, par aapka schema match validation abhi bhi zaroori.',
      error: 'Model markdown ```json fences laga deta hai — parse se pehle strip karo.',
    },
    mistakes: [
      { bad: 'Sirf "return JSON" bolkar JSON.parse par bharosa.', fix: 'Schema + examples + defensive parse + validation.' },
      { bad: 'Validation skip karna.', fix: 'Zod/JSON-Schema se validate; fail par retry/fallback.' },
      { bad: 'Complex extraction free-text se karna.', fix: 'Tool calling with input_schema use karo — enforced shape.' },
    ],
    best: [
      'Extraction/data tasks ke liye tool calling ko default banao.',
      'Har structured output ko runtime validate karo (Zod).',
      'temperature 0 + "no prose" instruction.',
      'Fences/whitespace strip karke defensive parse karo.',
      'Validation fail par ek retry with error feedback do.',
    ],
    performance:
      'Structured output aksar chhota hota hai (kam output tokens) → sasta aur fast. Tool calling thoda overhead add karta hai par retries bachaता hai, isliye net reliable + efficient. Validation client-side hota hai, cost-free. ⚡',
    interview: {
      beginner: [
        { q: 'Structured output kyun chahiye?', a: 'Taaki code model ke output ko parse karke UI/DB/logic mein use kar sake — chat prose nahi.' },
        { q: 'Free-text JSON kyun flaky hai?', a: 'Model fences, extra prose ya invalid JSON de sakta hai jo JSON.parse todta hai.' },
      ],
      intermediate: [
        { q: 'Sabse reliable structured output tarika?', a: 'Tool/function calling with a JSON input_schema — model schema-shaped arguments deta hai.' },
        { q: 'JSON mode kaafi hai kya?', a: 'Syntax-valid JSON guarantee karta hai, par specific schema match ke liye validation abhi bhi chahiye.' },
      ],
    },
    mcqs: [
      { q: 'Extraction ke liye best approach?', options: ['Free-text JSON', 'Tool calling w/ schema', 'Zyada temperature', 'Bina validation'], answer: 1, explain: 'Schema-enforced tool calling most reliable.' },
      { q: 'Output validation ke liye popular lib?', options: ['Zod', 'Axios', 'Lodash', 'Chalk'], answer: 0, explain: 'Zod runtime schema validation deta hai.' },
    ],
    exercises: {
      easy: ['Ek prompt likho jo review ko { sentiment, score } JSON mein nikaale, temp 0.'],
      medium: ['Output ko Zod se validate karo; invalid par ek retry add karo.'],
      advanced: ['Tool calling with input_schema se ek invoice→JSON extractor banao.'],
    },
    summary: [
      'Structured output = code aur LLM ke beech ka pul.',
      'Free-text JSON flaky — shape enforce karo.',
      'Tool calling with schema sabse reliable.',
      'Hamesha validate (Zod) + defensive parse.',
      'temperature 0; fences strip; retry on fail.',
    ],
    related: ['tool-calling', 'prompt-design', 'evals'],
  },

  'api-integration': {
    overview:
      'Ab poora loop jodte hain: **React frontend → aapka backend API route → LLM provider → wapas UI**. Frontend user ka input leta hai aur aapke apne backend endpoint ko call karta hai (LLM ko seedha nahi). Backend key rakhta hai, prompt banata hai, model call karta hai, aur clean response return karta hai. Yeh clean separation har production AI app ka standard shape hai. 🌐',
    why:
      'Yeh wo integration hai jo "demo" ko "product" banati hai. Sahi tarike se karne par aapko milta hai: key safety, cost control, logging, rate-limiting aur input validation — sab ek jagah (backend). Galat tarike (frontend se direct call) se aapki key leak hoti hai aur bill uda सकता hai. Yeh architecture pattern reusable hai har feature ke liye.',
    concept: [
      { h: 'The 3-layer flow', p: '**UI layer**: React component form/chat. **API layer**: aapka `/api/...` route (Express/Next/serverless) jahan key aur prompt-building rehta hai. **Model layer**: provider SDK/fetch. UI kabhi provider ko nahi jaanti — sirf aapke endpoint ko.' },
      { h: 'React se call (React Query)', p: 'Frontend mein `useMutation`/`fetch` se apne endpoint ko hit karo, loading/error states handle karo. App pehle se React Query use karti hai — usi pattern ko follow karo taaki caching/retries/consistency mile.' },
      { h: 'Backend route responsibilities', p: 'Input validate karo, prompt banao (system + user), model call karo, response parse karo, errors map karo, aur sirf **zaroori data** UI ko bhejo (raw provider response nahi). Yahin caching, rate-limit, aur logging bhi lagti hai.' },
      { h: 'Custom hook for reuse (DRY)', p: 'Ek `useAiSummary()` / `useChat()` custom hook bana lo jo endpoint call, states aur error handling encapsulate kare. Components clean rehte hain, logic reusable — SOLID/DRY. Har feature apna patla hook.' },
    ],
    analogy:
      'Yeh ek **restaurant** hai. 🍴 Customer (React UI) waiter (aapka backend route) ko order deta hai. Waiter kitchen (LLM) tak jaata hai — customer kitchen mein ghus kar chef se baat nahi karta (key/security). Waiter dish ko plate par saja kar (clean response) laata hai, kitchen ka kachra (raw response, keys) customer ko nahi dikhता. Har naye dish (feature) ke liye wahi waiter-kitchen flow.',
    syntax: {
      code: `// Backend: /api/summarize  (Express)\nimport { z } from 'zod'\nconst Body = z.object({ text: z.string().min(1).max(20000) })\n\napp.post('/api/summarize', async (req, res) => {\n  const parse = Body.safeParse(req.body)\n  if (!parse.success) return res.status(400).json({ error: 'Invalid input' })\n  try {\n    const msg = await client.messages.create({\n      model: 'claude-haiku-4-5-20251001', max_tokens: 300,\n      system: 'Summarize into 3 concise Hinglish bullets.',\n      messages: [{ role: 'user', content: parse.data.text }],\n    })\n    res.json({ summary: msg.content[0].text })   // sirf zaroori data\n  } catch (e) {\n    res.status(502).json({ error: 'AI service unavailable' })\n  }\n})`,
      note: 'Validate → build prompt → call → parse → clean response. Errors ko user-friendly map karo, raw provider error leak mat karo.',
      lang: 'js',
    },
    examples: [
      {
        level: 'Intermediate',
        title: 'Frontend: reusable hook (React Query)',
        lang: 'jsx',
        code: `import { useMutation } from '@tanstack/react-query'\n\nexport function useSummary() {\n  return useMutation({\n    mutationFn: async (text) => {\n      const r = await fetch('/api/summarize', {\n        method: 'POST',\n        headers: { 'content-type': 'application/json' },\n        body: JSON.stringify({ text }),\n      })\n      if (!r.ok) throw new Error('Summary failed')\n      return r.json()\n    },\n  })\n}\n\n// Component\nconst { mutate, data, isPending, error } = useSummary()\n<button disabled={isPending} onClick={() => mutate(article)}>\n  {isPending ? 'Summarizing…' : 'Summarize'}\n</button>\n{data && <ul>{/* render bullets */}</ul>}`,
        explain: 'Hook loading/error/data states deta hai, component sirf UI dikhata hai. Yeh app ke existing React Query pattern se match karta hai — reusable aur clean.',
      },
    ],
    notes: {
      concept: '3 layers: UI → backend route → provider. UI kabhi provider ko direct nahi.',
      tip: 'Har AI feature ke liye ek patla custom hook banao — DRY aur testable.',
      warning: 'Raw provider response/errors UI ko mat bhejo — sirf zaroori clean data.',
      error: 'Input validation skip karna → prompt injection + junk requests + cost.',
    },
    mistakes: [
      { bad: 'Frontend se seedha provider call (key exposed).', fix: 'Hamesha apne backend route se — [[backend-proxy]].' },
      { bad: 'Loading/error states handle na karna.', fix: 'React Query/hook se pending/error UI dikhao.' },
      { bad: 'Har component mein fetch logic duplicate karna.', fix: 'Ek reusable hook mein encapsulate karo.' },
    ],
    best: [
      'Backend route: validate → build → call → parse → clean response.',
      'Frontend: reusable hook + React Query (app pattern follow).',
      'Errors ko user-friendly map karo, secrets leak nahi.',
      'Input size limit lagao (cost + abuse control).',
      'Har feature same 3-layer pattern reuse kare.',
    ],
    performance:
      'Backend route caching ([[caching]]), model choice ([[choosing-a-model]]) aur streaming ([[streaming]]) ka natural jagah hai. React Query frontend par duplicate requests dedupe karta hai. Slow calls ke liye optimistic UI + loading skeleton se perceived speed badhao. ⚡',
    interview: {
      beginner: [
        { q: 'AI feature ka standard architecture?', a: 'React UI → aapka backend API route (key + prompt) → LLM provider → clean response UI ko.' },
        { q: 'Frontend provider ko direct kyun nahi call karta?', a: 'Key expose ho jaati aur cost/security control chala jaata. Backend proxy zaroori.' },
      ],
      intermediate: [
        { q: 'Backend route ki responsibilities?', a: 'Input validate, prompt build, model call, response parse, error map, caching/rate-limit/logging.' },
        { q: 'Frontend clean kaise rakhein?', a: 'Reusable custom hook (React Query) jo call + states encapsulate kare; component sirf UI.' },
      ],
    },
    mcqs: [
      { q: 'UI ko provider se kya cheez alag rakhti hai?', options: ['CDN', 'Backend API route', 'CSS', 'localStorage'], answer: 1, explain: 'Backend route beech mein — key aur logic wahin.' },
      { q: 'DRY ke liye frontend mein kya banate ho?', options: ['Har component mein fetch', 'Reusable custom hook', 'Global variable', 'Inline script'], answer: 1, explain: 'Ek hook logic encapsulate + reuse karta hai.' },
    ],
    exercises: {
      easy: ['Ek /api/rewrite route banao jo text ko formal tone mein rewrite kare.'],
      medium: ['Uske liye ek useRewrite() hook banao with loading/error states.'],
      advanced: ['Route mein input validation + error mapping + basic in-memory cache add karo.'],
    },
    summary: [
      'Standard flow: UI → backend route → provider → clean response.',
      'Backend: validate, build prompt, call, parse, map errors.',
      'Frontend: reusable hook + React Query, clean components.',
      'Never call provider from browser; never leak raw errors.',
      'Yahi 3-layer pattern har feature reuse karta hai.',
    ],
    related: ['backend-proxy', 'streaming', 'chat-ui'],
  },

  'backend-proxy': {
    overview:
      'Sabse important security rule sabse pehle: **API key kabhi browser mein nahi jaati.** Frontend code publicly visible hai — koi bhi DevTools/network tab se key nikaal sakta hai aur aapke paise par model call kar sakta hai. Solution: ek **backend proxy** — ek server route jo key rakhta hai, frontend se request leta hai, model ko call karता hai, aur response wapas bhejta hai. Isi layer par aap **rate-limiting, auth, logging aur cost control** bhi lagate ho. 🔐',
    why:
      'Ek leaked LLM key = potentially thousands of rupees ka bill kisi aur ke haath mein. Yeh sabse common aur sabse mehnga beginner mistake hai (`VITE_` prefix wali key bundle mein chali jaati hai). Backend proxy sirf security nahi — yeh wo choke point hai jahan aap poori AI usage ko control, monitor aur protect karte ho.',
    concept: [
      { h: 'Frontend env vars are public', p: 'Vite/CRA mein `VITE_...`/`REACT_APP_...` env vars **build ke time bundle mein inline** ho jaate hain — yaani shipped JS mein plain dikhte hain. Secret key wahan daalna = public karna. Sirf backend (non-prefixed) env vars secret rehte hain.' },
      { h: 'Proxy route', p: 'Aap ek endpoint (`/api/chat`) banate ho jo server par chalta hai. Key `process.env.ANTHROPIC_API_KEY` se aati hai (server-only). Frontend sirf is endpoint ko jaanta hai, provider ko nahi. Provider key server ki chaardiwari mein rehti hai.' },
      { h: 'Add control at the proxy', p: 'Proxy par lagao: **auth** (sirf logged-in users), **rate-limit** (per-user/IP), **input validation & size caps**, **logging** (cost/latency), aur optionally **caching**. Yeh sab ek jagah — har feature ko free milta hai.' },
      { h: 'Abuse & cost protection', p: 'Public endpoint ka matlab log ise spam kar sakte hain. Per-user quotas, max input length, aur ek monthly spend cap lagao. Bina inke ek viral moment (ya bot) aapko bade bill de sakta hai.' },
    ],
    analogy:
      'API key ghar ki **master chaabi** hai. 🔑 Frontend mein rakhna = chaabi darwaze ke bahar chipka dena — koi bhi andar aa jaayega. Backend proxy ek **receptionist** hai: visitors (frontend requests) reception tak aate hain, receptionist unki identity check karta hai (auth), ek time par kitne aa sakte hain limit karta hai (rate-limit), aur andar (provider) khud jaata hai. Master chaabi kabhi visitor ko nahi milti.',
    syntax: {
      code: `// ✅ SAFE — server-only env var, backend route\n// .env (server):  ANTHROPIC_API_KEY=sk-ant-...   (NO VITE_ prefix!)\nimport rateLimit from 'express-rate-limit'\n\nconst limiter = rateLimit({ windowMs: 60_000, max: 20 })  // 20 req/min\n\napp.post('/api/chat', requireAuth, limiter, async (req, res) => {\n  // key server par, browser ko kabhi nahi jaati\n  const msg = await client.messages.create({ /* ... */ })\n  res.json({ reply: msg.content[0].text })\n})\n\n// ❌ NEVER — yeh key shipped bundle mein plain dikhegi\n// const c = new Anthropic({ apiKey: import.meta.env.VITE_ANTHROPIC_KEY })`,
      note: 'VITE_/REACT_APP_ prefix wali cheez public hai. Secret key sirf server env mein. Proxy par auth + rate-limit lagao.',
      lang: 'js',
    },
    notes: {
      concept: 'Key sirf server par. Frontend ek proxy endpoint call karta hai; provider ko kabhi direct nahi.',
      tip: 'Proxy par rate-limit + auth + input caps ek saath lagao — sab features ko fayda.',
      warning: 'VITE_/REACT_APP_ env vars secret NAHI — bundle mein inline ho jaate hain.',
      error: 'Frontend mein SDK initialize karna key ke saath — instant leak.',
    },
    compare: {
      headers: ['Approach', 'Key safe?', 'Control (rate/auth/log)?'],
      rows: [
        ['Frontend direct call', '❌ Leaked', '❌ None'],
        ['VITE_ env var in browser', '❌ Leaked', '❌ None'],
        ['Backend proxy route', '✅ Safe', '✅ Full'],
      ],
    },
    mistakes: [
      { bad: 'Key ko VITE_ env var mein rakhna.', fix: 'Non-prefixed server env var; sirf backend padhe.' },
      { bad: 'Proxy par koi rate-limit/auth na lagana.', fix: 'Per-user rate-limit + auth + input size cap.' },
      { bad: 'Provider ka raw error/headers frontend ko bhejna.', fix: 'Generic error message; details server log mein.' },
    ],
    best: [
      'Secret key sirf server env; frontend mein kabhi nahi.',
      'Har AI endpoint par auth + rate-limit + input validation.',
      'Monthly spend cap + per-user quotas set karo.',
      'Cost/latency/errors ko proxy par log karo ([[observability]]).',
      'Keys ko secret manager mein rakho, git mein kabhi nahi.',
    ],
    performance:
      'Proxy ek natural caching + batching point hai — repeated prompts cache karke cost girao ([[caching]]). Rate-limiting runaway cost rokti hai. Ek extra hop thodi latency add karta hai, par streaming pass-through se user ko farak nahi padta ([[streaming]]). ⚡',
    interview: {
      beginner: [
        { q: 'API key frontend mein kyun nahi?', a: 'Frontend code public hai; key bundle/network se nikaali ja sakti hai aur misuse ho sakti hai.' },
        { q: 'Backend proxy kya karta hai?', a: 'Key server par rakhta hai, frontend request leta hai, provider call karta hai, response return karta hai.' },
      ],
      intermediate: [
        { q: 'VITE_ env var secret kyun nahi?', a: 'Build-time bundle mein inline ho jaata hai — shipped JS mein plain visible.' },
        { q: 'Proxy par aur kya control lagate ho?', a: 'Auth, per-user rate-limit, input size caps, logging, caching, spend caps.' },
      ],
    },
    mcqs: [
      { q: 'Kaunsa env var browser mein leak hota hai?', options: ['ANTHROPIC_API_KEY', 'VITE_ANTHROPIC_KEY', 'Dono safe', 'Koi nahi'], answer: 1, explain: 'VITE_ prefix bundle mein inline ho jaata hai.' },
      { q: 'Runaway cost/abuse rokne ka proxy tool?', options: ['Rate-limiting', 'Bigger model', 'More tokens', 'CSS'], answer: 0, explain: 'Per-user/IP rate-limit + quotas.' },
    ],
    exercises: {
      easy: ['Apne AI route ko ek server-only env key se wire karo (no VITE_).'],
      medium: ['express-rate-limit se 20 req/min limit add karo.'],
      advanced: ['Auth + per-user daily quota + generic error mapping add karo.'],
    },
    summary: [
      'API key sirf server par — browser mein kabhi nahi.',
      'VITE_/REACT_APP_ env vars public hote hain.',
      'Backend proxy = key safety + control choke point.',
      'Proxy par auth, rate-limit, validation, logging, caching.',
      'Spend caps + quotas se bill shock roko.',
    ],
    related: ['api-integration', 'security', 'reliability'],
  },

  'streaming': {
    overview:
      'LLM ka jawab word-by-word banta hai, isliye poora response aane ka intezaar karna slow lagta hai. **Streaming** se aap tokens aate hi UI mein dikhate ho — wahi "ChatGPT jaisa typing" effect. Technically, model **Server-Sent Events (SSE)** ya ek stream deta hai; aap backend proxy se use frontend tak pass karte ho aur incrementally render karte ho. Perceived speed dramatically improve hoti hai. 📡',
    why:
      'Ek 800-token jawab non-streaming mein 5–10 second ka "kuch nahi ho raha" feel de sakta hai — users bounce kar jaate hain. Streaming se pehla word ~1s mein dikhta hai, engagement bana rehta hai, aur app fast "feel" hoti hai bhale total time same ho. Chat/assistant UX ke liye yeh basically mandatory hai.',
    concept: [
      { h: 'Time-to-first-token (TTFT)', p: 'Streaming total time nahi ghataता, par **pehla token** jaldi dikha deta hai. User ke liye "responsiveness" ka sabse bada signal TTFT hai — 8s wait vs 1s-then-typing bahut alag feel karte hain.' },
      { h: 'SSE / stream basics', p: 'Provider `stream: true` par ek event stream deta hai — chhote chunks (token deltas). Aap in chunks ko read karte ho (SDK me `for await`, ya fetch me `ReadableStream`) aur har chunk aate hi append karte ho.' },
      { h: 'Proxy pass-through', p: 'Aapka backend model se stream leta hai aur usi tarah client ko stream karta hai (SSE response ya chunked). Key server par rehti hai, par bytes flow karte rehte hain — best of both. Edge/serverless streaming ([[streaming-edge]]) yahin fit hota hai.' },
      { h: 'Frontend rendering', p: 'React mein ek state string ko har chunk par append karo (throttle/rAF se re-render smooth rakho). Cancel/stop button ke liye `AbortController` rakho taaki user generation rok sake — accha AI UX ([[loading-ux]]).' },
    ],
    analogy:
      'Non-streaming ek **letter** ka intezaar hai — poora likhne ke baad hi milता hai. 📮 Streaming ek **phone call** hai — aap doosre insaan ko bolte hi sunte ho, poora paragraph khatam hone ka wait nahi karte. Kaam ka total time shayad same ho, par conversation zinda aur fast feel hoti hai. Isi liye chat streaming ke bina adhoora lagta hai.',
    syntax: {
      code: `// Backend: model stream ko SSE ki tarah client ko pass karo (Express)\napp.post('/api/chat/stream', async (req, res) => {\n  res.setHeader('Content-Type', 'text/event-stream')\n  res.setHeader('Cache-Control', 'no-cache')\n\n  const stream = await client.messages.stream({\n    model: 'claude-sonnet-4-6', max_tokens: 800,\n    messages: req.body.messages,\n  })\n\n  for await (const event of stream) {\n    if (event.type === 'content_block_delta') {\n      res.write(\\\`data: \\\${JSON.stringify(event.delta.text)}\\n\\n\\\`)\n    }\n  }\n  res.write('data: [DONE]\\n\\n')\n  res.end()\n})`,
      note: 'stream: model se chunks aate hain; har text delta ko SSE line mein client ko bhej do. Key server par safe rehti hai.',
      lang: 'js',
    },
    examples: [
      {
        level: 'Intermediate',
        title: 'Frontend: stream padho aur incrementally render karo',
        lang: 'jsx',
        code: `const [text, setText] = useState('')\n\nasync function ask(messages) {\n  setText('')\n  const res = await fetch('/api/chat/stream', {\n    method: 'POST', body: JSON.stringify({ messages }),\n  })\n  const reader = res.body.getReader()\n  const decoder = new TextDecoder()\n  while (true) {\n    const { done, value } = await reader.read()\n    if (done) break\n    const chunk = decoder.decode(value)\n    for (const line of chunk.split('\\n')) {\n      if (line.startsWith('data: ') && !line.includes('[DONE]')) {\n        setText((t) => t + JSON.parse(line.slice(6)))\n      }\n    }\n  }\n}`,
        explain: 'ReadableStream reader se chunks padho, SSE lines parse karo, aur state mein append karke live "typing" dikhao. AbortController add karke stop button bhi de sakte ho.',
      },
    ],
    notes: {
      concept: 'Streaming = tokens aate hi dikhao (SSE/stream). TTFT girta hai, UX fast feel karta hai.',
      tip: 'Stop/cancel button ke liye AbortController rakho.',
      warning: 'Re-render har chunk par heavy ho sakta hai — throttle/rAF se batch karo.',
      error: 'Buffering proxies/CDN streaming tod sakte hain — no-cache + flush headers set karo.',
    },
    mistakes: [
      { bad: 'Lambe jawab non-streaming dena, user ghoorta rehta hai.', fix: 'Chat/long output ke liye streaming lagao.' },
      { bad: 'Har token par poora tree re-render.', fix: 'State updates throttle/batch karo (rAF).' },
      { bad: 'Cancel option na dena.', fix: 'AbortController se generation stop allow karo.' },
    ],
    best: [
      'Interactive/long outputs ke liye streaming default rakho.',
      'Proxy se stream pass-through karo — key safe, bytes flowing.',
      'Stop button + error-in-stream handling do.',
      'Re-render throttle karo (smoothness).',
      'TTFT ko metric ki tarah monitor karo ([[observability]]).',
    ],
    performance:
      'Streaming **perceived latency** ka sabse bada jeet hai — total tokens same, par user turant engage. Chhota model + streaming = best interactive feel. Edge functions par streaming se TTFT aur girta hai ([[streaming-edge]]). ⚡',
    interview: {
      beginner: [
        { q: 'Streaming kya karta hai?', a: 'Response tokens aate hi UI mein dikhata hai (typing effect), poora jawab ka wait nahi.' },
        { q: 'TTFT kya hai?', a: 'Time-to-first-token — pehla token dikhne ka time; responsiveness ka bada signal.' },
      ],
      intermediate: [
        { q: 'Streaming key ko expose karke to nahi karta?', a: 'Nahi — backend proxy model se stream leta hai aur client ko pass karta hai; key server par rehti hai.' },
        { q: 'Frontend par streaming kaise render karte ho?', a: 'ReadableStream/SSE chunks padho, parse karo, React state mein append karo (throttled).' },
      ],
    },
    mcqs: [
      { q: 'Streaming mainly kya improve karta hai?', options: ['Total time', 'Perceived latency (TTFT)', 'Accuracy', 'Cost'], answer: 1, explain: 'Pehla token jaldi → fast feel.' },
      { q: 'Generation rokne ke liye?', options: ['AbortController', 'setTimeout', 'localStorage', 'useMemo'], answer: 0, explain: 'AbortController se fetch/stream cancel.' },
    ],
    exercises: {
      easy: ['Ek streaming endpoint banao jo ek fixed prompt ka jawab stream kare.'],
      medium: ['Frontend par live typing render karo aur ek Stop button add karo.'],
      advanced: ['Re-renders ko rAF se throttle karo aur TTFT measure karke log karo.'],
    },
    summary: [
      'Streaming = tokens aate hi dikhao; TTFT girta hai.',
      'Provider stream/SSE deta hai; proxy pass-through karta hai.',
      'Frontend chunks padhkar React state mein append karta hai.',
      'Stop button (AbortController) + throttled re-renders.',
      'Chat/long outputs ke liye basically mandatory.',
    ],
    related: ['chat-ui', 'loading-ux', 'streaming-edge'],
  },
}
