// AI App Engineering Course — build, optimize & ship AI-enabled web apps.
// Topic metadata, colour-coded groups, difficulty (Beginner → Expert).

export const aiAppGroups = [
  { id: 'roadmap', label: 'Career Roadmap', color: '#F43F5E' },
  { id: 'foundations', label: 'AI App Foundations', color: '#06B6D4' },
  { id: 'prompting', label: 'Prompting for Products', color: '#22D3EE' },
  { id: 'integration', label: 'Integrating LLMs', color: '#3B82F6' },
  { id: 'ui', label: 'AI UX & Interfaces', color: '#6366F1' },
  { id: 'rag', label: 'RAG & Knowledge', color: '#8B5CF6' },
  { id: 'agents', label: 'Tools, Agents & MCP', color: '#A855F7' },
  { id: 'optimize', label: 'Optimize & Scale', color: '#F59E0B' },
  { id: 'production', label: 'Production, Evals & Safety', color: '#10B981' },
  { id: 'ship', label: 'Ship & Deploy', color: '#14B8A6' },
  { id: 'capstone', label: 'Projects & Interview', color: '#EAB308' },
]

// difficulty: 1 Beginner · 2 Intermediate · 3 Advanced · 4 Expert
export const aiAppTopics = [
  // ── Career Roadmap (orientation) ──
  { slug: 'one-year-roadmap', title: '12-Month Roadmap: React + AI Engineer', hi: '1 saal ka plan — senior tak (₹40–60 LPA)', group: 'roadmap', icon: '🗺️', minutes: 15, level: 1 },

  // ── AI App Foundations (Beginner) ──
  { slug: 'what-is-ai-app', title: 'What is an AI-Enabled Web App?', hi: 'AI-powered app kya hota hai', group: 'foundations', icon: '🤖', minutes: 8, level: 1 },
  { slug: 'how-llms-work', title: 'How LLMs Work (for Builders)', hi: 'LLM andar se kaise kaam karta hai', group: 'foundations', icon: '🧠', minutes: 10, level: 1 },
  { slug: 'tokens-context-cost', title: 'Tokens, Context & Cost', hi: 'Token, context window & paisa', group: 'foundations', icon: '🔢', minutes: 9, level: 1 },
  { slug: 'first-api-call', title: 'Your First LLM API Call', hi: 'Pehla API call — hello AI', group: 'foundations', icon: '🔌', minutes: 10, level: 1 },
  { slug: 'choosing-a-model', title: 'Choosing the Right Model', hi: 'Sahi model kaise chuno', group: 'foundations', icon: '🎯', minutes: 9, level: 1 },

  // ── Prompting for Products (Intermediate) ──
  { slug: 'prompt-design', title: 'Prompt Design for Features', hi: 'Feature ke liye prompt likhna', group: 'prompting', icon: '✍️', minutes: 11, level: 2 },
  { slug: 'system-prompts', title: 'System Prompts & Roles', hi: 'System prompt se behaviour set karo', group: 'prompting', icon: '🎭', minutes: 9, level: 2 },
  { slug: 'structured-output', title: 'Structured Output (JSON)', hi: 'Reliable JSON nikalwao', group: 'prompting', icon: '📦', minutes: 10, level: 2 },

  // ── Integrating LLMs (Intermediate) ──
  { slug: 'api-integration', title: 'Calling the API from a Web App', hi: 'Web app se API kaise call karein', group: 'integration', icon: '🌐', minutes: 11, level: 2 },
  { slug: 'backend-proxy', title: 'Backend Proxy & Key Safety', hi: 'API key kabhi frontend mein mat rakho', group: 'integration', icon: '🔐', minutes: 10, level: 2 },
  { slug: 'streaming', title: 'Streaming Responses (SSE)', hi: 'Word-by-word streaming', group: 'integration', icon: '📡', minutes: 11, level: 2 },

  // ── AI UX & Interfaces (Intermediate) ──
  { slug: 'chat-ui', title: 'Building a Chat UI in React', hi: 'React mein chat interface', group: 'ui', icon: '💬', minutes: 12, level: 2 },
  { slug: 'loading-ux', title: 'Loading, Errors & AI UX', hi: 'Slow AI ka acha UX', group: 'ui', icon: '✨', minutes: 9, level: 2 },

  // ── RAG & Knowledge (Advanced) ──
  { slug: 'embeddings', title: 'Embeddings & Vector Search', hi: 'Meaning-based search', group: 'rag', icon: '🧭', minutes: 11, level: 3 },
  { slug: 'rag-pipeline', title: 'Building a RAG Pipeline', hi: 'Apne data par AI answers', group: 'rag', icon: '📥', minutes: 12, level: 3 },
  { slug: 'chunking', title: 'Chunking & Retrieval Quality', hi: 'Accha retrieval = accha answer', group: 'rag', icon: '🧩', minutes: 10, level: 3 },

  // ── Tools, Agents & MCP (Advanced) ──
  { slug: 'tool-calling', title: 'Tool / Function Calling', hi: 'AI ko real tools do', group: 'agents', icon: '🛠️', minutes: 11, level: 3 },
  { slug: 'agents', title: 'Agentic Workflows', hi: 'Plan → act → observe loop', group: 'agents', icon: '🦾', minutes: 12, level: 3 },
  { slug: 'mcp', title: 'Model Context Protocol (MCP)', hi: 'AI ke liye USB-C port', group: 'agents', icon: '🔗', minutes: 10, level: 3 },

  // ── Optimize & Scale (Advanced) ──
  { slug: 'caching', title: 'Caching & Prompt Caching', hi: 'Same kaam do baar mat karo', group: 'optimize', icon: '⚡', minutes: 10, level: 3 },
  { slug: 'latency-cost', title: 'Latency & Cost Optimization', hi: 'Fast & sasta banao', group: 'optimize', icon: '💰', minutes: 11, level: 3 },
  { slug: 'reliability', title: 'Rate Limits, Retries & Fallbacks', hi: 'Production mein reliable raho', group: 'optimize', icon: '🔁', minutes: 10, level: 3 },

  // ── Production, Evals & Safety (Expert) ──
  { slug: 'evals', title: 'Evaluations & Testing LLM Apps', hi: 'AI ko test kaise karein', group: 'production', icon: '🧪', minutes: 12, level: 4 },
  { slug: 'observability', title: 'Observability & Tracing', hi: 'Production mein kya ho raha hai', group: 'production', icon: '📊', minutes: 10, level: 4 },
  { slug: 'security', title: 'Security & Prompt Injection', hi: 'Prompt injection se bacho', group: 'production', icon: '🛡️', minutes: 12, level: 4 },
  { slug: 'guardrails', title: 'Guardrails & Content Safety', hi: 'Safe & on-brand output', group: 'production', icon: '🚧', minutes: 10, level: 4 },

  // ── Ship & Deploy (Expert) ──
  { slug: 'deploy-scale', title: 'Deploying & Scaling AI Apps', hi: 'Deploy + scale karo', group: 'ship', icon: '🚀', minutes: 11, level: 4 },
  { slug: 'streaming-edge', title: 'Edge, Serverless & Streaming at Scale', hi: 'Edge functions par AI', group: 'ship', icon: '🌩️', minutes: 10, level: 4 },

  // ── Projects & Interview (Expert) ──
  { slug: 'real-projects', title: 'Real-World AI App Projects', hi: 'Portfolio-worthy projects', group: 'capstone', icon: '🏆', minutes: 12, level: 4 },
  { slug: 'interview-questions', title: 'Interview Questions & Prep', hi: 'AI engineer interview crack karo', group: 'capstone', icon: '🎤', minutes: 14, level: 4 },
]

export const aiAppTopicBySlug = Object.fromEntries(aiAppTopics.map((t) => [t.slug, t]))
export const aiAppGroupById = Object.fromEntries(aiAppGroups.map((g) => [g.id, g]))
export const aiAppGroupedTopics = aiAppGroups.map((g) => ({ ...g, items: aiAppTopics.filter((t) => t.group === g.id) }))

export const AIAPP_LEVELS = {
  1: { label: 'Beginner', color: '#22C55E', bg: 'rgba(34,197,94,0.15)' },
  2: { label: 'Intermediate', color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' },
  3: { label: 'Advanced', color: '#EF4444', bg: 'rgba(239,68,68,0.15)' },
  4: { label: 'Expert', color: '#A855F7', bg: 'rgba(168,85,247,0.15)' },
}
