// AI App Engineering content — Part 4: Tools, Agents & MCP + Optimize & Scale

export const aiAppContentD = {
  'tool-calling': {
    overview:
      'By default LLM sirf text bana sakta hai — na live data padh sakta, na koi action le sakta. **Tool (function) calling** isse badalta hai: aap model ko batate ho ki kaun se functions available hain (naam + description + input schema), aur model decide karta hai kab kaun sa call karna hai aur kaunse arguments ke saath. Aapka code us function ko chalata hai aur result wapas model ko deta hai. Isse AI "real duniya" se jud jaata hai — DB query, API call, math, search. 🛠️',
    why:
      'Tool calling AI ko chatbot se **assistant** banata hai. Iske bina model aapke order ka status nahi bata sakta (live DB), sahi calculation nahi kar sakta, ya kuch book nahi kar sakta. Yeh agents ([[agents]]), reliable structured output ([[structured-output]]), aur RAG-as-a-tool sabki neenv hai. Modern AI features ka core mechanism yahi hai.',
    concept: [
      { h: 'Tool definition', p: 'Har tool = **name**, **description** (model isse decide karta hai kab use kare — clear likho!), aur **input_schema** (JSON Schema — kaunse arguments chahiye). Yeh definitions aap request mein bhejte ho. Model inko "capabilities" ki tarah dekhta hai.' },
      { h: 'The tool-use loop', p: '1) Model text ya ek **tool_use** block deta hai (tool name + arguments). 2) Aapka code us tool ko un arguments se **chalata** hai. 3) Result ko **tool_result** ke roop mein wapas model ko bhejte ho. 4) Model final answer banata hai (ya aur tools call karta hai). Yeh loop agents ka core hai.' },
      { h: 'Model chooses, you execute', p: 'Important: model **function nahi chalata** — wo sirf bolta hai "yeh function inn args se chalao". Actual execution aapke server par hoti hai. Isliye **aap** control mein ho: validate args, permissions check karo, side-effects guard karo (security!).' },
      { h: 'Schema = reliability', p: 'Kyunki arguments schema-constrained hote hain, tool calling reliable structured data dene ka best tarika bhi hai (isiliye extraction ke liye use hota hai). Model ko "guess format" nahi karna padta — schema uska guide hai.' },
    ],
    analogy:
      'Tool calling ek manager (LLM) aur uske **specialists** (functions) jaisa hai. 🧑‍🔧 Manager khud plumbing nahi karta — wo bolta hai "plumber ko bulao, yeh address, yeh problem" (tool_use with args). Aap (office) actual plumber ko bhejte ho (execute), phir report (tool_result) manager ko dete ho, aur manager customer ko final update deta hai. Manager decide karta hai kise bulana hai; kaam specialists karte hain.',
    syntax: {
      code: `const tools = [{\n  name: 'get_order_status',\n  description: 'Get live status of an order by its ID',\n  input_schema: {\n    type: 'object',\n    properties: { orderId: { type: 'string' } },\n    required: ['orderId'],\n  },\n}]\n\nlet msg = await client.messages.create({\n  model: 'claude-sonnet-4-6', max_tokens: 500, tools,\n  messages: [{ role: 'user', content: 'Where is order A123?' }],\n})\n\n// Model asked to call a tool?\nconst call = msg.content.find((b) => b.type === 'tool_use')\nif (call) {\n  const result = await getOrderStatus(call.input.orderId)   // YOU execute\n  msg = await client.messages.create({\n    model: 'claude-sonnet-4-6', max_tokens: 500, tools,\n    messages: [\n      { role: 'user', content: 'Where is order A123?' },\n      { role: 'assistant', content: msg.content },\n      { role: 'user', content: [{ type: 'tool_result', tool_use_id: call.id, content: result }] },\n    ],\n  })\n}\n// msg ab final natural-language answer deta hai`,
      note: 'Model tool_use maangta hai → aap execute karte ho → tool_result wapas → model final answer. Args validate karo; model khud execute nahi karta.',
      lang: 'js',
    },
    notes: {
      concept: 'Tool calling = model ko functions (name+desc+schema) do; wo decide karta kab call kare, aap execute karte ho.',
      tip: 'Tool description clear likho — isi se model decide karta kab use kare.',
      warning: 'Model output = intent. Args validate + permissions check karo pehle execute karne se.',
      error: 'tool_result wapas na bhejna — loop toot jaata, model answer complete nahi karta.',
    },
    mistakes: [
      { bad: 'Model ke bheje args ko blindly execute karna.', fix: 'Validate + authorize (schema + permission) pehle.' },
      { bad: 'Vague tool descriptions — model galat tool chunta.', fix: 'Precise name + description + schema.' },
      { bad: 'tool_result loop na complete karna.', fix: 'Result wapas bhejo taaki model final answer bana sake.' },
    ],
    best: [
      'Tools chhote aur single-purpose rakho (SOLID).',
      'Descriptions clear — model routing inhi par depend.',
      'Args validate (Zod/JSON-Schema) + authorize before execute.',
      'Side-effecting tools (delete/pay) par extra guard/confirm.',
      'Errors ko tool_result mein wapas do taaki model recover kare.',
    ],
    performance:
      'Har tool round-trip ek extra LLM call hai — latency + cost jodta hai. Zaroorat ho to hi tools do, aur parallel tool calls (jab model support kare) se round-trips ghatao. Simple lookups ke liye tool zaroori hai (accuracy), par har cheez tool mat banao. ⚡',
    interview: {
      beginner: [
        { q: 'Tool calling kya hai?', a: 'Model ko functions (schema ke saath) available karana; wo decide karta kab call kare, aap execute karte ho aur result wapas dete ho.' },
        { q: 'Model function khud chalata hai?', a: 'Nahi — wo sirf intent (naam+args) deta hai; execution aapke code mein hota hai.' },
      ],
      intermediate: [
        { q: 'Tool-use loop ke steps?', a: 'Model tool_use → aap execute → tool_result wapas → model final answer (ya aur tools).' },
        { q: 'Tool calling reliable structured output kaise deta hai?', a: 'Arguments input_schema se constrained hote hain — model ko format guess nahi karna padta.' },
      ],
      advanced: [
        { q: 'Tool calling ka security concern?', a: 'Model-suggested args untrusted hain; execute se pehle validate + authorize karo, warna injection/abuse ho sakta.' },
      ],
    },
    mcqs: [
      { q: 'Tool definition mein kya zaroori?', options: ['Sirf name', 'name + description + input_schema', 'Sirf code', 'URL'], answer: 1, explain: 'Model inhi teen se decide + call karta hai.' },
      { q: 'Function execute kaun karta hai?', options: ['Model', 'Aapka code', 'Browser', 'Vector DB'], answer: 1, explain: 'Model intent deta, execution aapke server par.' },
    ],
    exercises: {
      easy: ['Ek get_weather tool define karo (schema: city) aur uska tool_use handle karo.'],
      medium: ['tool_result wapas bhejkar final answer complete karo.'],
      advanced: ['Do tools do (DB lookup + calculator) aur model ko sahi tool chunne do; args validate karo.'],
    },
    summary: [
      'Tool calling = model ko functions do (name+desc+schema).',
      'Model chooses & fills args; aap execute karte ho.',
      'Loop: tool_use → execute → tool_result → final answer.',
      'Validate + authorize args before executing (security).',
      'Neenv of agents, live data, aur reliable structured output.',
    ],
    related: ['agents', 'structured-output', 'mcp'],
  },

  'agents': {
    overview:
      'Agent ek LLM system hai jo ek goal ke liye **khud multi-step plan** banata aur execute karta hai — ek loop mein tools call karke, results observe karke, aur agla step decide karke. Simple feature "ek call = ek answer" hota hai; agent "ek goal → kai calls + tool uses → done" hota hai. Yeh AI ki sabse powerful (aur sabse risky) form hai. 🦾',
    why:
      'Kuch tasks ek shot mein nahi hote — "mere last month ke expenses analyse karke report banao aur email karo" ke liye AI ko data fetch, calculate, summarize aur send karna padta hai, kramsे. Agents aise complex, multi-step workflows automate karte hain. Par yeh reliability, cost aur safety challenges bhi laate hain — isliye samajh ke banana zaroori hai.',
    concept: [
      { h: 'The agent loop', p: '**Plan → Act (tool call) → Observe (result) → repeat until done.** Model har iteration mein decide karta hai agla kya karna hai, based on ab tak ke results. Jab goal poora, wo final answer deta hai. Yeh tool calling ([[tool-calling]]) ka loop mein extension hai.' },
      { h: 'Agent = LLM + tools + loop + memory', p: 'Ingredients: ek **LLM** (brain), **tools** (actions), ek **loop** (jo tool-use handle kare), aur **memory/state** (ab tak ka progress). Optionally sub-agents, planning steps. Bina loop ke sirf ek tool call hota hai — agent nahi.' },
      { h: 'Guardrails: the hard part', p: 'Agents galat direction mein ja sakte hain, loop mein phas sakte hain, ya bahut paisa jala sakte hain. Isliye: **max steps/iterations cap**, **budget cap**, **human approval** for risky actions, aur clear **termination** condition. "Autonomy" ko bounded rakho.' },
      { h: 'Start simple', p: 'Full autonomous agent aksar overkill hai. Aksar ek **fixed workflow** (aap steps define karo, LLM sirf har step ka kaam kare) zyada reliable, sasta aur debuggable hota hai. Agent tab jab steps genuinely dynamic hon. "Workflow first, agent when needed."' },
    ],
    analogy:
      'Ek simple LLM call ek **calculator** hai (ek input, ek output). Agent ek **intern with a to-do list** hai. 🧑‍💼 Aap goal dete ho ("yeh report banao"), intern khud steps sochta hai, files kholta hai (tools), dekhta hai kya mila (observe), agla step karta hai — jab tak kaam poora. Par bina supervision ke intern ghanton galat cheez kar sakta hai ya bahut paisa kharch — isliye aap max time/budget aur checkpoints set karte ho.',
    process: {
      type: 'boxes',
      items: [
        { label: 'Goal', sub: 'user intent', color: '#06B6D4' },
        { label: 'Plan', sub: 'next step?', color: '#3B82F6' },
        { label: 'Act', sub: 'call a tool', color: '#8B5CF6' },
        { label: 'Observe', sub: 'read result', color: '#A855F7' },
        { label: 'Done?', sub: 'loop or finish', color: '#22C55E' },
      ],
    },
    syntax: {
      code: `async function runAgent(goal, { maxSteps = 6 } = {}) {\n  const messages = [{ role: 'user', content: goal }]\n  for (let step = 0; step < maxSteps; step++) {         // hard cap!\n    const msg = await client.messages.create({\n      model: 'claude-sonnet-4-6', max_tokens: 800, tools, messages,\n    })\n    messages.push({ role: 'assistant', content: msg.content })\n\n    const call = msg.content.find((b) => b.type === 'tool_use')\n    if (!call) return msg   // no tool → agent done, final answer\n\n    const result = await runTool(call.name, call.input)   // validate inside!\n    messages.push({ role: 'user', content: [\n      { type: 'tool_result', tool_use_id: call.id, content: result },\n    ]})\n  }\n  throw new Error('Agent hit max steps')   // safety termination\n}`,
      note: 'Loop with a HARD max-steps cap. Har iteration: model plans → tool call → execute → observe. No tool_use = done. Budget/step caps non-negotiable.',
      lang: 'js',
    },
    notes: {
      concept: 'Agent = LLM + tools + loop (plan→act→observe) + state, ek goal tak.',
      tip: 'Workflow first (fixed steps); full agent sirf jab steps dynamic hon.',
      warning: 'Agents loop/runaway kar sakte hain — max-steps + budget caps mandatory.',
      error: 'No termination condition → infinite loop + huge bill.',
    },
    compare: {
      headers: ['Pehlu', 'Single call', 'Fixed workflow', 'Autonomous agent'],
      rows: [
        ['Steps', '1', 'Predefined', 'Dynamic (LLM decides)'],
        ['Reliability', 'High', 'High', 'Lower'],
        ['Cost/latency', 'Low', 'Medium', 'High/variable'],
        ['Best for', 'Simple task', 'Known multi-step', 'Open-ended goals'],
      ],
    },
    mistakes: [
      { bad: 'Full autonomous agent har jagah use karna.', fix: 'Simple/known tasks ke liye fixed workflow — reliable + sasta.' },
      { bad: 'Max-steps/budget cap na lagana.', fix: 'Hard caps + termination condition mandatory.' },
      { bad: 'Risky actions bina approval agent ko dena.', fix: 'Human-in-the-loop for delete/pay/email.' },
    ],
    best: [
      '"Workflow first, agent when needed" — default simple.',
      'Hard max-steps + budget caps + clear termination.',
      'Risky/irreversible actions par human approval.',
      'Har step log/trace karo (debugging + observability).',
      'Tools chhote, validated, single-purpose rakho.',
    ],
    performance:
      'Agents har step par LLM call karte hain — cost aur latency **multiply** hote hain (6 steps = 6+ calls). Chhote model for routing/steps, caching, aur step-cap se control karo. Aksar ek achha-designed single call ya workflow agent se sasta aur reliable hota hai. ⚡',
    interview: {
      beginner: [
        { q: 'Agent kya hai?', a: 'Ek LLM system jo goal ke liye loop mein plan→act(tool)→observe karke multi-step task khud complete karta hai.' },
        { q: 'Agent vs single call?', a: 'Single call = ek input/output; agent = ek goal, dynamic multi-step tool use loop.' },
      ],
      intermediate: [
        { q: 'Agent ke ingredients?', a: 'LLM (brain) + tools (actions) + loop (handler) + memory/state, plus guardrails.' },
        { q: 'Agent safety kaise?', a: 'Max-steps/budget caps, termination condition, human approval for risky actions, logging.' },
      ],
      advanced: [
        { q: 'Agent kab NA use karein?', a: 'Jab steps known/fixed hon — fixed workflow zyada reliable, sasta, debuggable. Agent sirf genuinely dynamic goals ke liye.' },
      ],
    },
    mcqs: [
      { q: 'Agent loop ka core?', options: ['Plan→Act→Observe', 'Fetch→Render', 'Map→Reduce', 'Push→Pop'], answer: 0, explain: 'Iteratively plan, act via tool, observe.' },
      { q: 'Runaway agent rokne ka must?', options: ['Bigger model', 'Max-steps/budget cap', 'More tools', 'Higher temp'], answer: 1, explain: 'Hard caps + termination.' },
    ],
    exercises: {
      easy: ['Ek 3-step agent loop pseudocode likho with max-steps cap.'],
      medium: ['Ek 2-tool agent banao (search + summarize) with step cap.'],
      advanced: ['Risky action (send email) par human-approval checkpoint add karo.'],
    },
    summary: [
      'Agent = LLM + tools + loop (plan→act→observe) toward a goal.',
      'Dynamic multi-step; powerful par risky.',
      'Guardrails: max-steps, budget caps, termination, approvals.',
      'Workflow first; agent only when steps are dynamic.',
      'Cost/latency multiply — design + monitor carefully.',
    ],
    related: ['tool-calling', 'mcp', 'observability'],
  },

  'mcp': {
    overview:
      'MCP (**Model Context Protocol**) ek open standard hai jo AI apps ko external tools aur data sources se jodne ka **uniform tarika** deta hai. Har integration ko custom code karne ke bajaye, aap ek **MCP server** (jo tools/data expose karta hai) banate ya use karte ho, aur koi bhi MCP-compatible client (Claude Desktop, aapki app, IDEs) usse plug-and-play connect ho jaata hai. Ise "AI integrations ka USB-C port" samjho. 🔗',
    why:
      'Bina standard ke, har AI-tool integration ek ek karke custom-built hoti hai — GitHub ke liye alag, DB ke liye alag, har app mein dobara. MCP isse commoditize karta hai: ek baar MCP server banao, sab clients use karein; ya ready-made servers (filesystem, GitHub, Postgres, Slack) plug karo. Yeh AI ecosystem ka tezi se badhta hua standard hai — jaanna aage kaam aayega.',
    concept: [
      { h: 'Client–server model', p: '**MCP server**: tools, resources (data), aur prompts expose karta hai ek standard protocol par. **MCP client** (host app/AI): in servers se connect karke unke tools use karta hai. Ek app kai servers se ek saath connect ho sakti hai. Yeh tool-calling ko standardize + externalize karता hai.' },
      { h: 'What a server exposes', p: '**Tools** (actions AI le sake — "query_db", "create_issue"), **Resources** (data AI padh sake — files, records), aur **Prompts** (reusable prompt templates). Sab ek discoverable, typed interface ke through — client automatically jaan leta hai kya available hai.' },
      { h: 'Why standard matters', p: 'MCP se integrations **reusable aur composable** ban jaati hain. Ek "Postgres MCP server" ko koi bhi MCP client use kar sakta hai — Claude Desktop, Cursor, aapki custom app. "Build once, use everywhere." Yeh REST/USB jaisa hi network-effect deta hai.' },
      { h: 'MCP vs raw tool calling', p: 'Raw tool calling: tools aap apni app ke andar hardcode karte ho. MCP: tools ek **external, standardized server** mein rehte hain jise koi bhi client discover + use kar sake. Chhoti app = raw tools theek; growing ecosystem/reuse = MCP.' },
    ],
    analogy:
      'MCP AI integrations ke liye **USB-C** hai. 🔌 Pehle har device ka apna charger/port tha (custom integration har baar). USB-C ne ek standard bana diya — koi bhi cable, koi bhi device. MCP waise hi: ek "GitHub MCP server" ek universal plug hai jise koi bhi AI app (Claude Desktop, aapki app) mein daal do aur GitHub capabilities mil jaayein — har baar naya integration likhe bina.',
    syntax: {
      code: `// Conceptual: ek MCP server ek tool expose karta hai\n// (SDK: @modelcontextprotocol/sdk)\nserver.tool(\n  'search_docs',\n  { query: z.string() },\n  async ({ query }) => {\n    const hits = await vectorDB.query({ text: query, topK: 5 })\n    return { content: [{ type: 'text', text: JSON.stringify(hits) }] }\n  },\n)\n\n// Koi bhi MCP client (Claude Desktop / aapki app / IDE)\n// is server se connect karke 'search_docs' ko\n// ek native tool ki tarah use kar sakta hai — bina custom glue code.`,
      note: 'Server tools/resources standard protocol par expose karta hai. Client discover karke use karta hai. Build once, use across many clients.',
      lang: 'js',
    },
    notes: {
      concept: 'MCP = AI integrations ka open standard: servers tools/data expose karte, clients plug-and-play use karte.',
      tip: 'Ready-made MCP servers (filesystem, GitHub, Postgres) reuse karo — dobara mat likho.',
      warning: 'MCP server ko tools ki tarah hi treat karo — auth, validation, permissions zaroori.',
      error: 'MCP ko ek "model" samajhna — yeh protocol/plumbing hai, model nahi.',
    },
    compare: {
      headers: ['Pehlu', 'Raw tool calling', 'MCP'],
      rows: [
        ['Kahan defined', 'App ke andar hardcoded', 'External standard server'],
        ['Reuse across apps', 'No (rewrite)', 'Yes (any client)'],
        ['Setup', 'Simple/quick', 'Standard/composable'],
        ['Best for', 'Small, app-specific', 'Ecosystems, reuse'],
      ],
    },
    mistakes: [
      { bad: 'Har app ke liye same integration dobara likhna.', fix: 'MCP server ek baar banao, sab clients reuse karein.' },
      { bad: 'MCP server par auth/permissions ignore karna.', fix: 'Tools jaise hi secure karo — untrusted callers.' },
      { bad: 'Chhoti app ke liye over-engineer karke MCP forcefit.', fix: 'Simple case = raw tools; MCP jab reuse/ecosystem chahiye.' },
    ],
    best: [
      'Existing MCP servers reuse karo (community/official).',
      'Server tools ko secure karo: auth, validation, scoping.',
      'MCP tab jab integrations reusable/composable chahiye.',
      'Chhote app-specific tools ke liye raw tool calling theek.',
      'Servers ko single-responsibility rakho (ek domain per server).',
    ],
    performance:
      'MCP khud latency add nahi karta — yeh protocol hai; underlying tool calls hi cost/latency laate hain (jaise raw tools). Fayda **engineering efficiency** hai: reuse, standardization, kam glue code. Runtime performance tool implementation par depend karta hai. ⚡',
    interview: {
      beginner: [
        { q: 'MCP kya hai?', a: 'Model Context Protocol — AI apps ko tools/data se jodne ka open standard (client–server).' },
        { q: 'MCP ko kis se compare karte hain?', a: 'USB-C — AI integrations ke liye universal, standardized plug.' },
      ],
      intermediate: [
        { q: 'MCP server kya expose karta hai?', a: 'Tools (actions), resources (data), aur prompts — ek discoverable typed interface par.' },
        { q: 'MCP vs raw tool calling?', a: 'Raw = app ke andar hardcoded tools; MCP = external standard server jise koi bhi client reuse kare.' },
      ],
    },
    mcqs: [
      { q: 'MCP ka best analogy?', options: ['Ek naya model', 'USB-C for AI integrations', 'Ek database', 'Ek CSS lib'], answer: 1, explain: 'Universal standard plug for tools/data.' },
      { q: 'MCP server kya expose nahi karta?', options: ['Tools', 'Resources', 'Prompts', 'GPU cores'], answer: 3, explain: 'Tools, resources, prompts — hardware nahi.' },
    ],
    exercises: {
      easy: ['3 integrations socho jo MCP server se reusable ho sakti hain.'],
      medium: ['Ek search_docs MCP tool ka schema + handler design karo (pseudocode).'],
      advanced: ['Ek MCP server par auth + per-tool permission model design karo.'],
    },
    summary: [
      'MCP = open standard to connect AI to tools/data (USB-C).',
      'Client–server: servers expose tools/resources/prompts.',
      'Build once, reuse across many MCP clients.',
      'Secure servers like tools (auth/validation/scoping).',
      'Raw tools for small apps; MCP for reuse/ecosystems.',
    ],
    related: ['tool-calling', 'agents', 'security'],
  },

  'caching': {
    overview:
      'AI calls slow aur mehngi hain — to same kaam do baar mat karo. **Caching** repeated ya similar requests ke results reuse karta hai. Do bade types: **response caching** (identical request → stored answer, LLM skip) aur **prompt caching** (bade repeated prompt-prefix ko provider par cache karके uska input cost + latency drastically girana). Sahi caching se cost 50–90% tak gir sakti hai. ⚡',
    why:
      'Bahut sari AI requests repeat hoti hain — same FAQ, same document summarize, same system prompt har call. Bina caching ke aap har baar poora paisa aur time dete ho. Caching sabse high-ROI optimization hai: kam code, bada saving. Production AI apps mein yeh optional nahi, expected hai.',
    concept: [
      { h: 'Response caching', p: 'Identical (ya normalized) request ke liye result store karo (in-memory/Redis) aur dobara wahi request aaye to LLM ko skip karke cached answer do. FAQ, popular queries, deterministic tasks ke liye perfect. Key = hash(model + prompt + params).' },
      { h: 'Prompt caching (provider)', p: 'Aapka system prompt / RAG context / few-shot examples aksar har call mein **same** hote hain. Providers "prompt caching" dete hain: is repeated prefix ko unke side cache karke, subsequent calls par input tokens **bahut saste** (aur fast) ho jaate hain. Bade stable prefixes ke liye game-changer.' },
      { h: 'Semantic caching', p: 'Exact match nahi, **similar** queries ke liye: naye query ko embed karke agar koi purani cached query bahut similar hai (cosine), to uska answer reuse karo. Powerful par careful — thodi si meaning difference galat answer de sakti hai. Threshold tight rakho.' },
      { h: 'What NOT to cache', p: 'Personalized, real-time, ya per-user-sensitive outputs cache karna galat/stale/leaky ho sakta hai. Cache keys mein user/tenant/context shaamil karo, aur TTL set karo taaki stale data expire ho. Cache invalidation "do hard problems" mein se ek hai.' },
    ],
    analogy:
      'Caching ek **restaurant ki prep kitchen** hai. 🍳 Har order par sauce zero se nahi banaते — popular sauce pehle se bana ke rakhte hain (response cache), aur base stock (system prompt) ek baar bana ke poore din reuse karte hain (prompt cache). Isse har dish fast aur sasti banti hai. Par perishable/custom cheez (per-user data) fresh hi banani padti hai, warna kharab (stale) ho jaati hai.',
    syntax: {
      code: `// Response cache (simple, in-memory / Redis)\nconst cache = new Map()\nfunction keyOf(model, prompt) { return model + '::' + hash(prompt) }\n\nasync function cachedLLM(model, prompt) {\n  const k = keyOf(model, prompt)\n  if (cache.has(k)) return cache.get(k)            // LLM skip! 0 cost\n  const out = await callLLM(model, prompt)\n  cache.set(k, out)                                // store (add TTL in prod)\n  return out\n}\n\n// Prompt caching (provider): stable prefix ko cache-mark karo\n// system + RAG context ko cache_control se tag karo →\n// repeated calls par woh input tokens ~90% saste + fast.`,
      note: 'Response cache = full skip for identical requests. Prompt cache = saste repeated prefixes. Keys mein user/context daalo; TTL lagao.',
      lang: 'js',
    },
    notes: {
      concept: 'Caching = repeated kaam reuse. Response cache (skip LLM) + prompt cache (saste repeated prefix).',
      tip: 'Stable system prompt/RAG context ko prompt-caching se tag karo — bada input saving.',
      warning: 'Personalized/real-time output cache mat karo without user/context in key + TTL.',
      error: 'Cache invalidation bhoolna → users ko stale/galat answers.',
    },
    compare: {
      headers: ['Type', 'Kya reuse', 'Saving', 'Risk'],
      rows: [
        ['Response cache', 'Identical requests', 'Full call skip', 'Staleness'],
        ['Prompt cache', 'Repeated prefix', 'Input tokens ~90%', 'Low'],
        ['Semantic cache', 'Similar queries', 'High', 'Wrong-match'],
      ],
    },
    mistakes: [
      { bad: 'Har call fresh — koi caching nahi.', fix: 'Response + prompt caching lagao, bada cost gire.' },
      { bad: 'Per-user data ko global cache karna.', fix: 'User/tenant ko cache key mein daalo.' },
      { bad: 'TTL/invalidation na hona — stale answers.', fix: 'TTL set karo; data change par invalidate.' },
    ],
    best: [
      'Stable prefixes (system/RAG/few-shot) par prompt caching.',
      'Identical requests par response caching (TTL ke saath).',
      'Cache keys mein model + params + user/context.',
      'Semantic cache sirf tight similarity threshold par.',
      'Cache hit-rate + savings monitor karo.',
    ],
    performance:
      'Caching latency aur cost dono ka sabse bada lever hai — cache hit = ~0 cost, ~0 latency. Prompt caching bade RAG/system prompts ko har call sasta banata hai. Combined with model choice ([[choosing-a-model]]) aur streaming, yeh production economics banaता ya bigaadta hai. ⚡',
    interview: {
      beginner: [
        { q: 'Caching AI apps mein kyun?', a: 'Repeated slow/mehngi calls ko reuse karke cost + latency girana.' },
        { q: 'Response vs prompt caching?', a: 'Response: identical request par LLM skip. Prompt: repeated prompt-prefix ko provider par cache karke input saste.' },
      ],
      intermediate: [
        { q: 'Semantic caching kya hai aur risk?', a: 'Similar (embedding-close) queries ka answer reuse; galat-match risk — tight threshold chahiye.' },
        { q: 'Kya cache nahi karna chahiye?', a: 'Personalized/real-time/sensitive outputs bina user/context key + TTL ke.' },
      ],
    },
    mcqs: [
      { q: 'Bade repeated system prompt ke liye best?', options: ['Response cache', 'Prompt caching', 'No cache', 'Bigger model'], answer: 1, explain: 'Repeated prefix ko provider par cache — input saste.' },
      { q: 'Cache key mein kya hona chahiye?', options: ['Sirf prompt', 'model+params+user/context', 'Kuch nahi', 'Random'], answer: 1, explain: 'Warna wrong/stale/leaky results.' },
    ],
    exercises: {
      easy: ['Ek in-memory response cache banao for identical prompts.'],
      medium: ['Cache key mein model+params+user daalo aur TTL add karo.'],
      advanced: ['Semantic cache prototype: query embed + similarity threshold reuse; false-match test karo.'],
    },
    summary: [
      'Caching = repeated AI kaam reuse (high ROI).',
      'Response cache: identical request → LLM skip.',
      'Prompt cache: repeated prefix → saste input tokens.',
      'Semantic cache: similar queries (careful threshold).',
      'Keys mein user/context; TTL + invalidation zaroori.',
    ],
    related: ['latency-cost', 'tokens-context-cost', 'system-prompts'],
  },

  'latency-cost': {
    overview:
      'Production AI apps do numbers par jeette-haarte hain: **latency** (kitna fast) aur **cost** (kitna paisa per request). Dono ke same levers hain: model choice, token count, caching, streaming, aur batching. Yeh topic un levers ko ek mental checklist mein jodता hai taaki aap knowingly speed aur paisa dono optimize kar sako — guesswork se nahi. 💰',
    why:
      'Ek AI feature demo mein "kaam karta hai" par production mein slow aur mehnga ho sakta hai — jisse users churn aur aapka margin khatam. Latency aur cost ko engineer karna hi ek AI feature ko sustainable business banata hai. Yeh wo skill hai jo "AI toy" ko "AI product" se alag karti hai.',
    concept: [
      { h: 'The main levers', p: '**Model** (chhota = fast+sasta), **input tokens** (chhoti prompt/history/RAG), **output tokens** (max_tokens cap + "concise"), **caching** (skip/repeat cheap), **streaming** (perceived latency), aur **batching/parallelism** (throughput). Har feature par yeh checklist chalao.' },
      { h: 'Latency breakdown', p: 'Total latency = network + queue + **time-to-first-token (TTFT)** + generation time. TTFT input size + model par; generation output length par. Chhota input + chhota output + chhota model + streaming = best interactive feel.' },
      { h: 'Cost math', p: 'Cost per request = input tokens × in-rate + output tokens × out-rate. Monthly = per-request × volume. Ek chhoti prompt reduction × lakhon requests = bada saving. Hamesha **per-feature unit economics** nikaalo (cost per user action).' },
      { h: 'Parallelism & batching', p: 'Independent sub-tasks ko **parallel** chalao (Promise.all) — wall-clock girta hai. Bulk/offline jobs ko **batch** karo. User-facing single tasks ke liye streaming; background bulk ke liye throughput optimize karo.' },
    ],
    analogy:
      'AI feature ko **car ka fuel economy** ki tarah dekho. ⛽ Engine size (model), load (tokens), aur driving style (caching/streaming) sab mileage (cost) aur speed decide karte hain. Ek SUV (Opus) har chhoti trip par mat chalao — scooter (Haiku) sasta aur fast hai. Aur pre-planned routes (caching) baar-baar ka fuel bachate hain. Achha engineer har trip ka fuel-vs-speed knowingly choose karta hai.',
    syntax: {
      code: `// Latency + cost optimization checklist (per feature)\nconst optimized = {\n  model: 'claude-haiku-4-5-20251001',  // ✅ smallest that works\n  max_tokens: 300,                     // ✅ cap output\n  system: STABLE_PROMPT,               // ✅ prompt-cacheable\n  // ✅ trim history / RAG top-k, not whole doc\n  // ✅ stream to user (perceived latency)\n}\n\n// Parallelize independent calls\nconst [summary, tags] = await Promise.all([\n  summarize(text),   // independent\n  extractTags(text), // independent\n])   // wall-clock = slowest, not sum`,
      note: 'Har feature par: chhota model + capped output + cache + trimmed input + streaming + parallelize independent work.',
      lang: 'js',
    },
    notes: {
      concept: 'Latency + cost ke same levers: model, tokens, caching, streaming, batching/parallelism.',
      tip: 'Independent calls Promise.all se parallel — wall-clock = slowest, not sum.',
      warning: 'Bade model + bade output = slow + mehnga; default mat banao.',
      error: 'Per-feature unit economics na nikaalna — bill surprise deta hai.',
    },
    compare: {
      headers: ['Lever', 'Latency', 'Cost', 'Effort'],
      rows: [
        ['Smaller model', '↓↓', '↓↓↓', 'Low'],
        ['Cap output tokens', '↓', '↓↓', 'Low'],
        ['Caching', '↓↓↓', '↓↓↓', 'Medium'],
        ['Streaming', '↓ (perceived)', '—', 'Medium'],
        ['Trim input/RAG', '↓', '↓↓', 'Medium'],
      ],
    },
    mistakes: [
      { bad: 'Sab kuch bade model + bade output par.', fix: 'Chhota model + max_tokens cap; upgrade only on eval need.' },
      { bad: 'Independent calls serially chalana.', fix: 'Promise.all se parallelize.' },
      { bad: 'Cost measure hi na karna.', fix: 'Per-feature cost/latency instrument karo ([[observability]]).' },
    ],
    best: [
      'Har feature par optimization checklist chalao.',
      'Sabse chhota model jo eval pass kare.',
      'Output cap + concise instruction.',
      'Caching + streaming + prompt caching combine karo.',
      'Independent work parallelize; bulk batch karo.',
      'Unit economics (cost per action) track karo.',
    ],
    performance:
      'Yeh topic khud performance ka hai. Sabse bade wins: chhota model (10x cost), caching (skip calls), aur output capping. Streaming perceived latency jeetta hai. Inko combine karke ek slow/mehngi feature ko fast/sasti banaya ja sakta hai bina quality gire. ⚡',
    interview: {
      beginner: [
        { q: 'AI cost kis par depend?', a: 'Input + output tokens × per-token rate × model. Volume se multiply.' },
        { q: 'Latency ghatane ke 2 tareeke?', a: 'Chhota model + capped/streamed output; input trim; caching.' },
      ],
      intermediate: [
        { q: 'TTFT kis par depend?', a: 'Input size + model tier (aur network). Output length total time badhata hai.' },
        { q: 'Parallelism kaise help karta?', a: 'Independent calls Promise.all se — wall-clock slowest ke barabar, sum nahi.' },
      ],
      advanced: [
        { q: 'Ek slow/mehngi feature kaise optimize karoge?', a: 'Checklist: smaller model, cap output, trim input/RAG, cache (response+prompt), stream, parallelize, phir measure.' },
      ],
    },
    mcqs: [
      { q: 'Sabse bada cost lever aksar?', options: ['Model choice', 'Variable names', 'CSS', 'Fonts'], answer: 0, explain: 'Chhota model 10x tak sasta.' },
      { q: 'Independent calls fast karne ka tarika?', options: ['Serial await', 'Promise.all', 'setTimeout', 'Bigger model'], answer: 1, explain: 'Parallelize — wall-clock = slowest.' },
    ],
    exercises: {
      easy: ['Ek feature ka per-request cost estimate karo (input+output tokens).'],
      medium: ['Usme model downgrade + output cap lagakar naya cost nikaalo.'],
      advanced: ['Do independent AI calls ko parallelize karo aur latency improvement measure karo.'],
    },
    summary: [
      'Latency + cost = production AI ki jeet/haar.',
      'Levers: model, tokens, caching, streaming, batching.',
      'TTFT (input+model), generation (output length).',
      'Per-feature unit economics nikaalo aur measure karo.',
      'Parallelize independent work; combine optimizations.',
    ],
    related: ['caching', 'choosing-a-model', 'streaming'],
  },

  'reliability': {
    overview:
      'LLM APIs external services hain — wo slow ho sakti hain, **rate-limit (429)** kar sakti hain, timeout ho sakti hain, ya kabhi-kabhi down. Ek production AI app in failures ke liye ready hoti hai: **retries with backoff**, **timeouts**, **fallbacks** (doosra model/cached answer), aur **graceful degradation**. Reliability engineering hi "demo" ko "dependable product" banati hai. 🔁',
    why:
      'Ek single unhandled 429 ya timeout aapke feature ko user ke saamne tod deta hai. High volume par rate limits aur transient errors **guaranteed** hain — sawaal "agar" nahi, "kab" hai. Inko gracefully handle karna user trust aur uptime ke liye essential hai. Yeh backend engineering ka core AI apps mein aa jaata hai.',
    concept: [
      { h: 'Retries with exponential backoff', p: 'Transient errors (429, 500, 503, timeout) par turant retry mat karo — thoda ruk kar, badhte gaps ke saath (1s, 2s, 4s…) + **jitter** (random thoda) retry karo. Yeh provider ko saans deta hai aur "thundering herd" rokta hai. SDKs aksar yeh built-in dete hain — par samajhna zaroori.' },
      { h: 'Timeouts', p: 'Har call par ek **timeout** lagao (AbortController) — warna ek hung request user ko hamesha ke liye latka degi. Timeout par retry ya fallback karo. "Fail fast" better than "hang forever".' },
      { h: 'Fallbacks & degradation', p: 'Primary model/provider fail? Ek **fallback** rakho: doosra model, ek chhota model, ya ek cached/generic response. Feature poora todne se behtar hai "thoda kam accha par kaam kar raha". Multi-provider setups isi ke liye hote hain.' },
      { h: 'Idempotency & rate-limit budgets', p: 'Retries ke saath ensure karo actions **idempotent** hon (do baar chalein to double side-effect na ho). Aur apni taraf se **rate-limit budget** manage karo (concurrency cap, queue) taaki aap khud provider limit na cross karo.' },
    ],
    analogy:
      'Reliability ek **delivery service** jaisa hai. 📦 Agar ek raasta band hai (rate limit), driver thodi der ruk kar dobara try karta hai (backoff), ya alternate route leta hai (fallback). Agar package hi nahi mila to customer ko "thodi der mein" batata hai, gayab nahi hota (graceful degradation). Aur wo ek hi package do baar deliver nahi karता (idempotency). Bina inke, ek chhoti rukawat poora order fail kar deti hai.',
    syntax: {
      code: `async function robustCall(fn, { retries = 3, timeoutMs = 20000 } = {}) {\n  for (let attempt = 0; attempt <= retries; attempt++) {\n    const ctrl = new AbortController()\n    const t = setTimeout(() => ctrl.abort(), timeoutMs)   // timeout\n    try {\n      return await fn(ctrl.signal)\n    } catch (err) {\n      clearTimeout(t)\n      const retriable = [429, 500, 503].includes(err.status) || err.name === 'AbortError'\n      if (!retriable || attempt === retries) throw err\n      const backoff = 2 ** attempt * 500 + Math.random() * 300   // + jitter\n      await new Promise((r) => setTimeout(r, backoff))\n    }\n  }\n}\n\n// Fallback: primary fail → chhota model / cached answer\nconst answer = await robustCall(s => callPrimary(s))\n  .catch(() => callFallbackModel())\n  .catch(() => CACHED_GENERIC_RESPONSE)`,
      note: 'Retry sirf transient errors par, exponential backoff + jitter. Har call par timeout. Fallback chain (primary → small model → cached). Idempotency ensure karo.',
      lang: 'js',
    },
    notes: {
      concept: 'Reliability = retries (backoff+jitter) + timeouts + fallbacks + graceful degradation.',
      tip: 'Retry sirf transient errors (429/5xx/timeout) par, 4xx (bad request) par nahi.',
      warning: 'High volume par rate limits guaranteed — handle pehle se karo.',
      error: 'Bina backoff turant retry — provider ko aur choke karta (thundering herd).',
    },
    compare: {
      headers: ['Failure', 'Handle kaise'],
      rows: [
        ['429 rate limit', 'Backoff + jitter retry; concurrency cap'],
        ['Timeout / hang', 'AbortController timeout → retry/fallback'],
        ['500/503 transient', 'Retry with backoff'],
        ['4xx bad request', 'No retry — fix input'],
        ['Provider down', 'Fallback model / cached response'],
      ],
    },
    mistakes: [
      { bad: 'Errors handle na karna — feature crash.', fix: 'Try/catch + retry + fallback + friendly UI.' },
      { bad: 'Har error par turant infinite retry.', fix: 'Sirf transient; capped retries; backoff+jitter.' },
      { bad: 'No timeout — request hamesha latki.', fix: 'AbortController timeout har call par.' },
    ],
    best: [
      'Exponential backoff + jitter for transient errors.',
      'Per-call timeout (AbortController).',
      'Fallback chain: primary → small model → cached/generic.',
      'Idempotent actions; concurrency/rate budgets.',
      'Errors log + monitor ([[observability]]); friendly UI ([[loading-ux]]).',
    ],
    performance:
      'Reliability aur latency balance karo: retries latency badhate hain, isliye caps aur timeouts zaroori. Fallback to a smaller model failures ke dauraan fast + cheap recovery deta hai. Concurrency caps aapko provider rate-limits se bachaते hain, throughput ko predictable rakhte hue. ⚡',
    interview: {
      beginner: [
        { q: 'AI API calls kyun fail hoti hain?', a: 'Rate limits (429), timeouts, transient 5xx, ya provider downtime — external service hai.' },
        { q: 'Retry kaise karna chahiye?', a: 'Sirf transient errors par, exponential backoff + jitter, capped attempts.' },
      ],
      intermediate: [
        { q: 'Fallback strategy kya hai?', a: 'Primary fail par doosra/chhota model ya cached/generic response — feature todne se behtar.' },
        { q: 'Retries ke saath idempotency kyun?', a: 'Taaki retried action do baar chal kar double side-effect (double charge/email) na kare.' },
      ],
      advanced: [
        { q: 'Kaunse errors par retry NAHI?', a: '4xx (bad request/auth) — input/config problem hai; retry se fix nahi hoga.' },
      ],
    },
    mcqs: [
      { q: 'Kaunsa error retry ke laayak?', options: ['400', '401', '429', '404'], answer: 2, explain: '429 transient rate-limit — backoff retry.' },
      { q: 'Jitter kyun add karte hain?', options: ['Speed', 'Thundering herd rokna', 'Cost', 'UI'], answer: 1, explain: 'Randomness se retries synchronize nahi hote.' },
    ],
    exercises: {
      easy: ['Ek call par AbortController timeout add karo.'],
      medium: ['Exponential backoff + jitter wala retry wrapper likho (transient only).'],
      advanced: ['Fallback chain banao: primary → small model → cached, aur test karo.'],
    },
    summary: [
      'AI APIs fail hoti hain — 429/timeout/5xx/downtime.',
      'Retries: transient only, backoff + jitter, capped.',
      'Per-call timeout (AbortController); fail fast.',
      'Fallback chain: primary → small model → cached.',
      'Idempotency + concurrency budgets + monitoring.',
    ],
    related: ['backend-proxy', 'latency-cost', 'observability'],
  },
}
