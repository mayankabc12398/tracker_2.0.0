// AI App Engineering content — Part 3: AI UX & Interfaces + RAG & Knowledge

export const aiAppContentC = {
  'chat-ui': {
    overview:
      'Chat interface AI apps ka sabse common UI pattern hai. React mein yeh ek **messages array** (state) + ek input box + auto-scroll + streaming render hota hai. User type karta hai → message list mein add hota hai → backend ko poori history jaati hai → streaming reply live append hoti hai. Achha chat UI banana 80% state management aur 20% polish hai. 💬',
    why:
      'Chat har AI product ka "face" hai — agar yeh laggy, buggy ya confusing ho to poori app kharab lagti hai. Sahi structure (immutable state, streaming, auto-scroll, disabled states) ke bina chat UI jaldi spaghetti ban jaati hai. Yeh topic aapko ek clean, reusable chat component deta hai jo aap kisi bhi feature mein daal sako.',
    concept: [
      { h: 'Messages as state', p: 'Core state ek array hai: `[{ role, content }]`. User bhejta hai → naya user message append. Reply aati hai → assistant message append (streaming mein last assistant message ko incrementally update karo). Immutable updates (`[...prev, msg]`) React ke liye zaroori.' },
      { h: 'Send flow', p: 'On submit: input se message banao, list mein add karo, input clear karo, `isLoading` true karo, backend ko poori messages bhejo, streaming reply ko last assistant message mein append karo, done par loading false. Empty input aur duplicate sends block karo.' },
      { h: 'Auto-scroll & UX polish', p: 'Naya message aane par bottom tak scroll karo (`scrollIntoView` / ref). "AI typing…" indicator dikhao. Send button ko loading/empty par disable karo. Enter to send, Shift+Enter for newline. Yeh chhoti cheezein "product-grade" feel deti hain.' },
      { h: 'Reuse existing components', p: 'App ke design system ka fayda uthao — existing `Button`, `Input`, `Card`, glass styles use karo taaki chat baaki app jaisa lage. Naya design mat banao; consistency > novelty.' },
    ],
    analogy:
      'Chat UI ek **WhatsApp screen** hai. 📱 Messages ek list hain (state), aap type karke bhejte ho (append), doosra banda type kar raha dikhता hai (streaming/typing indicator), aur nayi message aate hi screen niche scroll ho jaati hai (auto-scroll). Aap poori chat history dekh paate ho kyunki wo state mein saved hai — model ko bhi wahi history bhejte ho.',
    syntax: {
      code: `function Chat() {\n  const [messages, setMessages] = useState([])\n  const [input, setInput] = useState('')\n  const [loading, setLoading] = useState(false)\n  const endRef = useRef(null)\n\n  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages])\n\n  async function send() {\n    const text = input.trim()\n    if (!text || loading) return\n    const next = [...messages, { role: 'user', content: text }]\n    setMessages(next); setInput(''); setLoading(true)\n    try {\n      const { reply } = await fetch('/api/chat', {\n        method: 'POST', body: JSON.stringify({ messages: next }),\n      }).then((r) => r.json())\n      setMessages((m) => [...m, { role: 'assistant', content: reply }])\n    } finally { setLoading(false) }\n  }\n  // …render messages.map + input + endRef div\n}`,
      note: 'Poori history (next) backend ko jaati hai (model stateless). Immutable updates, disabled-on-loading, auto-scroll via ref. Streaming ke liye reply ko append-as-it-arrives karo.',
      lang: 'jsx',
    },
    examples: [
      {
        level: 'Intermediate',
        title: 'Streaming assistant message ko live update',
        lang: 'jsx',
        code: `// Send ke baad, streaming chunks ko last assistant msg mein append\nsetMessages((m) => [...m, { role: 'assistant', content: '' }])\nfor await (const delta of readStream(res)) {\n  setMessages((m) => {\n    const copy = [...m]\n    copy[copy.length - 1] = {\n      role: 'assistant',\n      content: copy[copy.length - 1].content + delta,\n    }\n    return copy\n  })\n}`,
        explain: 'Ek empty assistant message pehle daalo, phir har delta par usi last message ko update karo. User ko live typing dikhta hai. Re-renders throttle karo agar bahut fast aayen.',
      },
    ],
    notes: {
      concept: 'Chat = messages array state + send flow + streaming append + auto-scroll.',
      tip: 'Enter=send, Shift+Enter=newline. Send button loading/empty par disable.',
      warning: 'Poori history backend ko bhejni padti hai — token cost badhta hai ([[tokens-context-cost]]).',
      error: 'State ko mutate karna (push) — React re-render nahi karega; hamesha naya array.',
    },
    mistakes: [
      { bad: 'messages array ko directly mutate karna.', fix: 'Immutable updates: [...prev, msg].' },
      { bad: 'Auto-scroll na hona, naya message chhup jaata.', fix: 'endRef + scrollIntoView on messages change.' },
      { bad: 'Loading state na hona → double sends.', fix: 'isLoading se input/button disable karo.' },
    ],
    best: [
      'Existing design-system components reuse karo (consistency).',
      'Streaming se live typing dikhao; stop button do.',
      'Auto-scroll, typing indicator, disabled states polish karo.',
      'Long history ko trim/summarize karo (cost control).',
      'Chat ko ek reusable <Chat/> component banao.',
    ],
    performance:
      'Lambi chat = bade re-renders + bada token payload. `React.memo` message bubbles par, throttled streaming updates, aur history trimming se dono side smooth rehta hai. Virtualization (react-window) bahut lambi chats ke liye. ⚡',
    interview: {
      beginner: [
        { q: 'Chat UI ka core state kya hai?', a: 'Ek messages array [{role, content}] jo user/assistant turns rakhta hai.' },
        { q: 'Model ko kya bhejte ho har message par?', a: 'Poori (ya trimmed) messages history — model stateless hai.' },
      ],
      intermediate: [
        { q: 'Streaming reply UI mein kaise dikhate ho?', a: 'Ek empty assistant message daalo, phir har chunk par usi last message ka content append karo.' },
        { q: 'Lambi chat perf kaise handle?', a: 'Memoized bubbles, throttled updates, history trim, virtualization for very long lists.' },
      ],
    },
    mcqs: [
      { q: 'React state update ka sahi tarika?', options: ['messages.push(m)', '[...messages, m]', 'messages[len]=m', 'delete messages'], answer: 1, explain: 'Immutable naya array; warna re-render nahi.' },
      { q: 'Auto-scroll ke liye?', options: ['scrollIntoView on change', 'setInterval', 'CSS only', 'reload'], answer: 0, explain: 'Ref + scrollIntoView jab messages badle.' },
    ],
    exercises: {
      easy: ['Ek basic chat banao: input + messages list + send (non-streaming).'],
      medium: ['Auto-scroll, typing indicator aur disabled-on-loading add karo.'],
      advanced: ['Streaming append + Stop button + history trimming add karo.'],
    },
    summary: [
      'Chat = messages array + send flow + streaming + auto-scroll.',
      'Immutable state updates; poori history model ko bhejo.',
      'Streaming: empty assistant msg, phir append-per-chunk.',
      'Polish: typing indicator, disabled states, Enter/Shift+Enter.',
      'Reuse design system; trim long history for cost.',
    ],
    related: ['streaming', 'loading-ux', 'api-integration'],
  },

  'loading-ux': {
    overview:
      'AI slow aur unpredictable hai — 1s bhi lag sakta hai, 10s bhi, aur kabhi fail bhi. Achha **AI UX** in realities ko gracefully handle karta hai: skeletons/streaming se wait ko fill karo, errors ko friendly banao, retry do, aur user ko control (stop, edit, regenerate) do. Feature ki quality sirf model par nahi, iss "waiting & failing" experience par bhi depend karti hai. ✨',
    why:
      'Same model, same output — par ek app "fast aur polished" feel karti hai aur doosri "slow aur buggy". Farak UX mein hai. Blank spinner par 8 second = user bounce. Streaming + skeleton + clear errors = user tika rehta hai. AI ki inherent latency/unreliability ko UX se manage karna is skill ka core hai.',
    concept: [
      { h: 'Fill the wait', p: 'Blank spinner sabse bura hai. Better: **streaming** (words aate hi dikhao), **skeletons** (shape ka placeholder), ya ek progress hint ("Searching your docs…"). Perceived speed real speed se zyada matter karti hai.' },
      { h: 'Optimistic & instant feedback', p: 'User action par turant UI respond kare — user message turant list mein dikhe, button "Thinking…" ho jaaye. Latency ko chhupao mat, par usse "kuch ho raha hai" feel do.' },
      { h: 'Graceful errors', p: 'Model down/timeout/429 hoga — kabhi na kabhi. Raw error dikhane ki jagah friendly message ("AI thoda busy hai, dobara try karein") + **Retry** button do. Partial output (stream toota) ko bhi keep karo, poora discard mat karo.' },
      { h: 'User control', p: 'AI output final nahi — user ko **Stop**, **Regenerate**, **Edit**, aur **Copy** do. Output ko editable/dismissable rakho. Yeh trust banata hai: user ko lagta hai wo command mein hai, AI uska tool hai.' },
    ],
    analogy:
      'AI UX ek **restaurant ki service** hai jab kitchen slow ho. 🍽️ Achha waiter aapko bitha kar paani + starter deta hai (skeleton/streaming), batata hai "10 min lagenge" (progress hint), aur agar dish jal jaaye to maafi maang kar naya offer karta hai (friendly error + retry). Bura waiter aapko khali table par ghanton bitha deta hai bina kuch bole (blank spinner). Service experience khaane jitna hi important hai.',
    examples: [
      {
        level: 'Practical',
        title: 'States: idle / loading / streaming / error',
        lang: 'jsx',
        code: `function AiPanel({ state, text, onRetry, onStop }) {\n  if (state === 'idle') return <Hint>Ask me anything ✨</Hint>\n  if (state === 'loading') return <Skeleton lines={3} />        // shape placeholder\n  if (state === 'streaming') return (\n    <>\n      <Prose text={text} />\n      <button onClick={onStop}>■ Stop</button>\n    </>\n  )\n  if (state === 'error') return (\n    <Callout variant=\"error\" title=\"AI thoda busy hai 😅\">\n      <button onClick={onRetry}>↻ Retry</button>\n    </Callout>\n  )\n}`,
        explain: 'Har state ka apna clear UI — blank spinner kahin nahi. Skeleton wait bharता hai, streaming live feedback deta hai, error friendly + retryable hai.',
      },
    ],
    notes: {
      concept: 'AI slow/unreliable hai — UX se fill (skeleton/streaming), forgive (friendly errors+retry), empower (stop/regenerate).',
      tip: 'Blank spinner ko skeleton ya streaming se replace karo — perceived speed jeet.',
      warning: 'Raw provider errors user ko mat dikhao — friendly + actionable rakho.',
      error: 'Stream toot-ne par poora partial output discard karna — use keep karo.',
    },
    mistakes: [
      { bad: 'Sirf blank spinner, koi progress ya streaming nahi.', fix: 'Skeleton/streaming/progress-hint se wait bharo.' },
      { bad: 'Errors handle na karna ya raw dump dikhana.', fix: 'Friendly message + Retry; details log mein.' },
      { bad: 'User ko stop/regenerate/edit na dena.', fix: 'Output editable + controllable banao.' },
    ],
    best: [
      'Streaming default; warna skeleton, kabhi blank nahi.',
      'Friendly, actionable errors + Retry.',
      'Stop, Regenerate, Edit, Copy controls do.',
      'Partial outputs preserve karo.',
      'Empty/first-run states mein guidance/examples dikhao.',
    ],
    performance:
      'Perceived latency real latency se zyada matter karti hai. Streaming + optimistic UI + skeletons se app fast feel hoti hai bhale total time same ho. Yeh directly [[streaming]] aur [[latency-cost]] ke saath kaam karta hai. ⚡',
    interview: {
      beginner: [
        { q: 'AI UX important kyun hai?', a: 'AI slow/unpredictable hai; wait aur failures ko handle karke hi app polished feel karti hai.' },
        { q: 'Blank spinner ki jagah kya?', a: 'Streaming, skeletons, ya progress hints — perceived speed badhaते hain.' },
      ],
      intermediate: [
        { q: 'Error states kaise design karein?', a: 'Friendly message + Retry, partial output preserve, raw errors chhupao, log server par.' },
        { q: 'User control kyun zaroori?', a: 'Stop/regenerate/edit se trust banta hai aur AI ke non-determinism ko user manage kar paata hai.' },
      ],
    },
    mcqs: [
      { q: 'Sabse kharab loading UX?', options: ['Streaming', 'Skeleton', 'Blank spinner 8s', 'Progress hint'], answer: 2, explain: 'Blank wait par users bounce karte hain.' },
      { q: 'Model fail hone par best?', options: ['App crash', 'Raw error dump', 'Friendly msg + Retry', 'Ignore'], answer: 2, explain: 'Graceful, actionable recovery.' },
    ],
    exercises: {
      easy: ['Apne AI feature mein blank spinner ko skeleton se replace karo.'],
      medium: ['Error state + Retry button add karo (partial output preserve).'],
      advanced: ['Stop + Regenerate + Edit controls ek streaming output par add karo.'],
    },
    summary: [
      'AI slow/unreliable — UX se manage karo.',
      'Fill wait: streaming/skeleton, kabhi blank nahi.',
      'Graceful errors + Retry; partial output preserve.',
      'User control: stop, regenerate, edit, copy.',
      'Perceived latency > real latency.',
    ],
    related: ['streaming', 'reliability', 'chat-ui'],
  },

  'embeddings': {
    overview:
      'Embedding ek text ko numbers ki ek list (**vector**, jaise 1536 numbers) mein badal deta hai jo uska **meaning** capture karta hai. Similar meaning wale texts ke vectors "paas" hote hain. Isse aap **semantic search** karte ho — keyword match nahi, matlab ke basis par. "car" aur "automobile" alag shabd hain par unke vectors paas honge. Yeh RAG, recommendations aur smart search ki neenv hai. 🧭',
    why:
      'Normal search "exact word" dhoondti hai — "laptop kharab" query "computer not working" doc ko miss kar degi. Embeddings meaning se match karti hain, isliye users ke asli intent ko pakadti hain. Aur RAG (apne data par AI answers) embeddings ke bina possible hi nahi — yeh us pipeline ka pehla, foundational block hai.',
    concept: [
      { h: 'Text → vector', p: 'Ek embedding model (jaise `text-embedding-3` / Voyage) text leta hai aur ek fixed-length float array deta hai. Yeh "coordinates" hain ek high-dimensional space mein jahan meaning geometry ban jaati hai. Same model se hi query aur documents embed karo (consistency).' },
      { h: 'Similarity = distance', p: 'Do vectors ki nazdeeki **cosine similarity** (ya dot product) se naapte hain — 1 = bahut similar, 0 = unrelated. Search = query ko embed karo, phir sabse "paas" wale document vectors dhoondo. Yeh pure numbers ka kaam hai, LLM ka nahi.' },
      { h: 'Vector database', p: 'Lakhon vectors mein "nearest" dhoondna fast chahiye — iske liye **vector DB** (Pinecone, pgvector, Chroma, Weaviate) use hota hai jo ANN (approximate nearest neighbour) index rakhta hai. Aap vectors + metadata store karte ho aur "top-k similar" query karte ho.' },
      { h: 'Where LLM comes in', p: 'Embeddings sirf **retrieve** karta hai (relevant chunks dhoondta hai). Answer banane ke liye un chunks ko LLM ke prompt mein daalte ho — yahi RAG hai ([[rag-pipeline]]). Embedding model aur chat model alag hote hain.' },
    ],
    analogy:
      'Embeddings ek **library ka map** hai jahan kitaabein subject ke hisaab se paas rakhi hain. 📚 Har kitaab ki ek location (vector) hai; similar topics ki kitaabein paas-paas. Aap ek naya sawaal (query) usi map par plot karte ho aur aas-paas ki kitaabein utha lete ho — bhale unke title mein aapke exact shabd na hon. Keyword search library ko sirf title se dhoondti; embeddings meaning ke "shelf" se.',
    syntax: {
      code: `// 1) Documents ko embed karke store karo (one-time / on update)\nconst docs = ['Reset password from settings', 'Cancel subscription anytime', ...]\nfor (const text of docs) {\n  const [vector] = await embed(text)       // e.g. 1536 floats\n  await vectorDB.upsert({ id, vector, metadata: { text } })\n}\n\n// 2) Query time: query embed karo, top-k similar laao\nconst [qVec] = await embed('how do I change my password?')\nconst hits = await vectorDB.query({ vector: qVec, topK: 3 })\n// → 'Reset password from settings' (meaning match, alag shabd!)`,
      note: 'Same embedding model query aur docs dono ke liye. Store: vector + metadata(text). Query: embed → top-k nearest. Answer LLM banata hai (RAG).',
      lang: 'js',
    },
    notes: {
      concept: 'Embedding = text ka meaning-vector. Similar meaning → paas vectors → semantic search.',
      tip: 'Query aur documents ko HAMESHA same embedding model se embed karo.',
      warning: 'Embeddings retrieve karti hain, answer nahi banati — wo LLM ka kaam.',
      error: 'Alag models se embed karna → vectors compatible nahi → garbage results.',
    },
    compare: {
      headers: ['Pehlu', 'Keyword Search', 'Semantic (Embeddings)'],
      rows: [
        ['Match kis par', 'Exact words', 'Meaning'],
        ['"car" vs "automobile"', 'Miss', 'Match'],
        ['Typos/synonyms', 'Weak', 'Robust'],
        ['Setup', 'Simple (index)', 'Embed + vector DB'],
        ['Best for', 'Exact codes/IDs', 'Natural language, RAG'],
      ],
    },
    mistakes: [
      { bad: 'Query aur docs ko alag models se embed karna.', fix: 'Same embedding model dono ke liye.' },
      { bad: 'Embeddings se hi "answer" ki umeed.', fix: 'Retrieve karo, phir LLM se answer banwao (RAG).' },
      { bad: 'Documents ko bina chunking ke embed karna.', fix: 'Bade docs ko chunk karo ([[chunking]]) — better retrieval.' },
    ],
    best: [
      'Ek hi embedding model consistently use karo.',
      'Vector + useful metadata (source, text) store karo.',
      'Bade docs ko chunk karke embed karo.',
      'top-k tune karo (aksar 3–8) — zyada = noise.',
      'Data update par embeddings refresh karo.',
    ],
    performance:
      'Embedding calls saste hote hain (chat se kaafi kam), aur documents ke embeddings **cache/store** ho jaate hain (one-time). Query time par sirf query embed hoti hai + fast ANN lookup. Cost mostly one-time indexing hai, phir search bahut sasti. ⚡',
    interview: {
      beginner: [
        { q: 'Embedding kya hai?', a: 'Text ko meaning-capturing numeric vector mein badalna; similar meaning wale texts ke vectors paas hote hain.' },
        { q: 'Semantic vs keyword search?', a: 'Keyword exact words match karti; semantic meaning match karti (synonyms/typos robust).' },
      ],
      intermediate: [
        { q: 'Similarity kaise naapte hain?', a: 'Cosine similarity / dot product — vectors kitne "paas" hain.' },
        { q: 'Vector DB kyun chahiye?', a: 'Lakhon vectors mein fast approximate nearest-neighbour search ke liye (top-k similar).' },
      ],
      advanced: [
        { q: 'Embeddings LLM se kaise alag?', a: 'Embedding model retrieval ke liye vectors deta hai; chat LLM answer generate karta hai. RAG dono ko jodta hai.' },
      ],
    },
    mcqs: [
      { q: 'Embedding output kya hai?', options: ['Ek string', 'Ek number-vector', 'JSON', 'Image'], answer: 1, explain: 'Fixed-length float array (vector).' },
      { q: 'Nazdeeki naapne ka common metric?', options: ['Cosine similarity', 'BMI', 'Big-O', 'Latency'], answer: 0, explain: 'Cosine similarity / dot product.' },
    ],
    exercises: {
      easy: ['5 sentences embed karke unme se ek query ke top-2 nearest nikaalo.'],
      medium: ['Keyword search vs embedding search ka same query par result compare karo.'],
      advanced: ['pgvector/Chroma mein 50 docs index karke ek semantic search endpoint banao.'],
    },
    summary: [
      'Embedding = text → meaning-vector.',
      'Similar meaning = paas vectors (cosine similarity).',
      'Vector DB fast top-k nearest search deta hai.',
      'Same model for query + docs; chunk bade docs.',
      'Retrieval only — answer LLM banata hai (RAG).',
    ],
    related: ['rag-pipeline', 'chunking', 'how-llms-work'],
  },

  'rag-pipeline': {
    overview:
      'RAG (**Retrieval-Augmented Generation**) se aap LLM ko **apne data** par answer dene lagate ho — docs, help articles, PDFs, DB. Idea simple hai: user ke sawaal se relevant chunks **retrieve** karo (embeddings/vector search), unhe prompt mein daalo (**augment**), aur LLM se un chunks ke basis par answer **generate** karwao. Isse hallucination girti hai aur AI aapke private, up-to-date knowledge par jawab deta hai. 📥',
    why:
      'Base LLM ko aapki company ke docs, latest data ya private info nahi pata — aur wo guess (hallucinate) kar deta hai. RAG isko fix karta hai bina model retrain kiye. Yeh **sabse common production AI pattern** hai: support bots, "chat with your docs", internal knowledge assistants — sab RAG hai. Ek AI engineer ke liye must-know.',
    concept: [
      { h: 'Two phases', p: '**Indexing (offline)**: docs ko chunk karo → embed karo → vector DB mein store karo. **Query (online)**: user question embed karo → top-k relevant chunks retrieve karo → prompt mein daalo → LLM answer de. Indexing ek baar (ya update par), query har request par.' },
      { h: 'Augment the prompt', p: 'Retrieved chunks ko system/user prompt mein "context" ke roop mein daalo aur model ko instruct karo: "Answer ONLY from the context below. If not present, say you don\'t know." Yeh grounding hallucination drastically kam karta hai.' },
      { h: 'Cite sources', p: 'Har chunk ke saath uska source/metadata rakho aur answer mein citations dikhao ("[Doc 3]"). Users trust karte hain aur verify kar sakte hain. Yeh production RAG ka hallmark hai.' },
      { h: 'Retrieval quality = answer quality', p: 'Agar retrieve kiye chunks galat/adhoore hain, best model bhi galat answer dega ("garbage in, garbage out"). Isliye chunking ([[chunking]]), top-k tuning, aur metadata filtering RAG ka asli engineering hai — LLM call to easy part hai.' },
    ],
    analogy:
      'RAG ek **open-book exam** hai. 📖 Base LLM closed-book deta hai — jo yaad hai wahi (kabhi galat). RAG mein student (LLM) ko pehle sahi pages (retrieved chunks) khol kar diye jaate hain, phir wo un pages se answer likhta hai. Agar aap galat pages khologe (bad retrieval), answer galat hoga — isliye "sahi page dhoondna" (retrieval) sabse important skill hai.',
    process: {
      type: 'boxes',
      items: [
        { label: 'Question', sub: 'user query', color: '#06B6D4' },
        { label: 'Embed', sub: 'query → vector', color: '#3B82F6' },
        { label: 'Retrieve', sub: 'top-k chunks', color: '#8B5CF6' },
        { label: 'Augment', sub: 'chunks → prompt', color: '#A855F7' },
        { label: 'Generate', sub: 'grounded answer', color: '#22C55E' },
      ],
    },
    syntax: {
      code: `async function ragAnswer(question) {\n  // 1) Retrieve\n  const [qVec] = await embed(question)\n  const hits = await vectorDB.query({ vector: qVec, topK: 5 })\n  const context = hits.map((h, i) => 'Doc ' + (i+1) + ': ' + h.metadata.text).join('\\n\\n')\n\n  // 2) Augment + 3) Generate (grounded)\n  const system = 'Answer ONLY using the context. Cite as [Doc N]. ' +\n    'If the answer is not in the context, say you do not know.'\n  const msg = await client.messages.create({\n    model: 'claude-sonnet-4-6', max_tokens: 600, system,\n    messages: [{ role: 'user', content: 'Context:\\n' + context + '\\n\\nQ: ' + question }],\n  })\n  return { answer: msg.content[0].text, sources: hits }\n}`,
      note: 'Retrieve → augment → generate. "Answer ONLY from context" + citations = grounded, trustworthy. Sources UI mein dikhao.',
      lang: 'js',
    },
    notes: {
      concept: 'RAG = retrieve relevant chunks + augment prompt + generate grounded answer.',
      tip: '"Answer only from context, else say you don\'t know" — hallucination ka bada fix.',
      warning: 'Retrieval quality answer quality ki ceiling hai — garbage in, garbage out.',
      error: 'Bina grounding instruction ke context daalna — model phir bhi apni knowledge se guess karega.',
    },
    compare: {
      headers: ['Approach', 'Private/latest data?', 'Hallucination', 'Cost/effort'],
      rows: [
        ['Base LLM', 'No', 'High', 'Low'],
        ['RAG', 'Yes (retrieved)', 'Low (grounded)', 'Medium'],
        ['Fine-tuning', 'Baked in (stale)', 'Medium', 'High'],
      ],
    },
    mistakes: [
      { bad: 'Bina grounding instruction ke chunks daalna.', fix: '"Answer only from context, else say unknown" add karo.' },
      { bad: 'Poore documents prompt mein daalna (cost + noise).', fix: 'Chunk + top-k retrieve; sirf relevant bhejo.' },
      { bad: 'Sources/citations na dikhana.', fix: 'Metadata rakho, answer mein cite karo — trust + verifiability.' },
    ],
    best: [
      'Chunk → embed → store; query → retrieve → augment → generate.',
      'Grounding instruction + "say you don\'t know" always.',
      'Citations dikhao (source metadata).',
      'top-k aur chunk size tune karo ([[chunking]]).',
      'Metadata filters (user/tenant/date) se relevance + security.',
    ],
    performance:
      'RAG fine-tuning se sasta aur flexible hai (data update = re-embed, retrain nahi). Retrieval fast hai; cost mostly LLM call par. Context sirf top-k chunks daalo — poora doc nahi — taaki tokens/cost controlled rahein. Embeddings cache/store hote hain ([[caching]]). ⚡',
    interview: {
      beginner: [
        { q: 'RAG kya hai?', a: 'Retrieval-Augmented Generation — relevant data retrieve karke prompt mein daalna aur LLM se grounded answer lena.' },
        { q: 'RAG kyun use karte hain?', a: 'Private/latest data par answer aur hallucination kam — bina model retrain kiye.' },
      ],
      intermediate: [
        { q: 'RAG ke do phases?', a: 'Offline indexing (chunk→embed→store) aur online query (embed→retrieve→augment→generate).' },
        { q: 'RAG vs fine-tuning?', a: 'RAG data ko prompt mein laata hai (flexible, cheap, fresh); fine-tuning knowledge model mein baked karta hai (mehnga, stale ho sakta).' },
      ],
      advanced: [
        { q: 'RAG answer galat kyun aa sakta hai?', a: 'Poor retrieval (galat/adhoore chunks) ya missing grounding instruction. Retrieval quality = answer ceiling.' },
      ],
    },
    mcqs: [
      { q: 'RAG ka "R" kya laata hai?', options: ['Random', 'Retrieval', 'React', 'Refactor'], answer: 1, explain: 'Retrieval — relevant chunks.' },
      { q: 'Hallucination kam karne ka RAG trick?', options: ['Zyada temperature', 'Answer only from context', 'Bada model always', 'No system prompt'], answer: 1, explain: 'Grounding instruction model ko context tak seemit karta hai.' },
    ],
    exercises: {
      easy: ['Ek chhote docs set par retrieve+augment+generate ka flow likho (pseudocode).'],
      medium: ['Grounding instruction add karke "not in context" case handle karo.'],
      advanced: ['Citations + metadata filtering wala RAG endpoint banao aur test karo.'],
    },
    summary: [
      'RAG = retrieve + augment + generate on your data.',
      'Indexing (offline) + query (online) phases.',
      'Grounding instruction + citations = trust, low hallucination.',
      'Retrieval quality = answer quality ceiling.',
      'RAG > fine-tuning for fresh/private data (cheap, flexible).',
    ],
    related: ['embeddings', 'chunking', 'tool-calling'],
  },

  'chunking': {
    overview:
      'Bade documents ko poora embed/retrieve karna kaam nahi karta — model ko relevant **hissa** chahiye, poori kitaab nahi. **Chunking** matlab document ko chhote, meaningful pieces (jaise 300–800 tokens) mein todna, taaki retrieval precise ho. Chunk size, overlap aur boundaries seedha RAG ki quality decide karte hain. Yeh "boring" step aksar accha aur bekaar RAG ka farak hota hai. 🧩',
    why:
      'Log RAG "kaam nahi kar raha" bolte hain — 90% waqt problem chunking mein hoti hai. Bahut bade chunks = noise aur token waste; bahut chhote = context toota, adhoora answer. Sahi chunking se relevant info precisely retrieve hoti hai, answers accurate aur saste ho jaate hain. Yeh RAG ka sabse under-rated lever hai.',
    concept: [
      { h: 'Chunk size trade-off', p: '**Bade chunks**: zyada context par retrieval kam precise (ek chunk mein kai topics), aur zyada tokens. **Chhote chunks**: precise par context toot sakta hai (ek idea do chunks mein bat jaaye). Sweet spot aksar **300–800 tokens** — content par depend.' },
      { h: 'Overlap', p: 'Adjacent chunks ke beech thoda **overlap** (jaise 10–15%) rakho taaki boundary par kata hua idea dono chunks mein rahe. Bina overlap ke, ek sentence beech se katne par dono chunks adhoore ho sakte hain.' },
      { h: 'Semantic boundaries', p: 'Blindly har N characters par mat kaato — **natural boundaries** (paragraphs, headings, sentences) par kaato taaki har chunk ek coherent idea rakhe. Markdown/HTML structure (headings) ka fayda uthao. "Structure-aware" chunking retrieval bahut improve karti hai.' },
      { h: 'Metadata per chunk', p: 'Har chunk ke saath source, title, section, date, tenant store karo. Isse retrieval par **filter** kar sakte ho (sirf is user ke docs, sirf latest version) aur answer mein cite kar sakte ho. Metadata chunking ka silent superpower hai.' },
    ],
    analogy:
      'Chunking ek kitaab ko **flashcards** mein todna hai. 🗂️ Ek flashcard par poora chapter likhoge to card useless (bahut zyada, dhoondhna mushkil). Ek card par aadha sentence likhoge to idea adhoora. Best: har card par ek complete, self-contained point — aur cards thodा overlap karein taaki context na tootе. Exam (query) ke time aap sahi 3-4 cards jhat se utha lete ho.',
    syntax: {
      code: `// Structure-aware chunking with overlap (simplified)\nfunction chunk(text, { size = 600, overlap = 80 } = {}) {\n  const paras = text.split(/\\n\\n+/)          // natural boundaries\n  const chunks = []\n  let buf = ''\n  for (const p of paras) {\n    if ((buf + p).length > size) {\n      chunks.push(buf.trim())\n      buf = buf.slice(-overlap) + '\\n\\n' + p    // carry overlap\n    } else buf += '\\n\\n' + p\n  }\n  if (buf.trim()) chunks.push(buf.trim())\n  return chunks\n}\n// Har chunk → embed + store with metadata { source, section }`,
      note: 'Paragraph boundaries par kaato, overlap carry karo, aur har chunk ke saath metadata rakho. Blind fixed-size cuts se bacho.',
      lang: 'js',
    },
    notes: {
      concept: 'Chunking = docs ko chhote meaningful pieces mein todna (~300–800 tokens) with overlap + metadata.',
      tip: 'Natural boundaries (para/heading) par kaato, blind N-char cuts nahi.',
      warning: 'Bahut bade chunks = noise + cost; bahut chhote = context toota.',
      error: 'Metadata na rakhna — filtering aur citations dono impossible ho jaate.',
    },
    compare: {
      headers: ['Chunk size', 'Retrieval precision', 'Context per chunk', 'Risk'],
      rows: [
        ['Too large', 'Low', 'High', 'Noise, token waste'],
        ['~300–800 tok', 'Good', 'Good', 'Balanced ✅'],
        ['Too small', 'High', 'Low', 'Broken ideas'],
      ],
    },
    mistakes: [
      { bad: 'Poore document ko ek chunk banana.', fix: 'Meaningful sized chunks (~300–800 tokens).' },
      { bad: 'Blind fixed-length cuts (ideas beech se toot-te).', fix: 'Semantic boundaries + overlap.' },
      { bad: 'Chunks ke saath metadata na rakhna.', fix: 'Source/section/date/tenant store karo — filter + cite.' },
    ],
    best: [
      'Natural boundaries par chunk (para/heading/sentence).',
      '10–15% overlap rakho (boundary context).',
      'Chunk size content ke hisaab se tune karo (~300–800 tok).',
      'Rich metadata store karo (filter + citations).',
      'RAG quality kharab ho to pehle chunking check karo.',
    ],
    performance:
      'Sahi chunk size = kam tokens retrieve (sasta) + zyada relevant (accurate). Over-large chunks har query par extra tokens jalate hain. Chunking one-time cost hai (indexing), par har future query ki cost + quality par asar daalta hai. ⚡',
    interview: {
      beginner: [
        { q: 'Chunking kya hai?', a: 'Bade docs ko chhote meaningful pieces mein todna taaki retrieval precise ho.' },
        { q: 'Chunking kyun zaroori?', a: 'Model ko relevant hissa chahiye; poora doc = noise + cost, adhoora = broken context.' },
      ],
      intermediate: [
        { q: 'Overlap kyun rakhte hain?', a: 'Boundary par kata idea dono chunks mein rahe — context na tootे.' },
        { q: 'RAG kharab ho to pehle kya check?', a: 'Chunking aur retrieval — aksar problem wahin, LLM mein nahi.' },
      ],
    },
    mcqs: [
      { q: 'Typical accha chunk size range?', options: ['5–10 tokens', '300–800 tokens', '50k tokens', '1 char'], answer: 1, explain: 'Balance of precision + context.' },
      { q: 'Overlap ka fayda?', options: ['Cost badhana', 'Boundary context bachana', 'Speed', 'Nothing'], answer: 1, explain: 'Kata idea dono chunks mein rahe.' },
    ],
    exercises: {
      easy: ['Ek lambe article ko paragraph-boundaries par chunk karo.'],
      medium: ['Overlap add karke boundary-cut idea ka test karo.'],
      advanced: ['Chunk size 200 vs 600 vs 1200 par same RAG query ki answer quality compare karo.'],
    },
    summary: [
      'Chunking = docs ko chhote meaningful pieces mein todna.',
      'Size trade-off: bada=noise, chhota=broken; ~300–800 tok.',
      'Overlap boundary context bachata hai.',
      'Semantic boundaries + rich metadata.',
      'RAG quality ka bada, under-rated lever.',
    ],
    related: ['embeddings', 'rag-pipeline', 'latency-cost'],
  },
}
