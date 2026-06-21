// AI Integration for Existing Projects — topic metadata, colour-coded groups, difficulty.

export const aiGroups = [
  { id: 'foundations', label: 'AI-Assisted Development', color: '#8B5CF6' },
  { id: 'context', label: 'Understanding AI Context', color: '#6366F1' },
  { id: 'integration', label: 'Existing Project Integration', color: '#3B82F6' },
  { id: 'prompting', label: 'Prompt Engineering', color: '#06B6D4' },
  { id: 'tools', label: 'AI Coding Tools', color: '#D946EF' },
  { id: 'rules-docs', label: 'AI Rules & Documentation', color: '#EC4899' },
  { id: 'react-integration', label: 'React + AI Integration', color: '#14B8A6' },
  { id: 'productivity', label: 'Writing Less Code', color: '#22C55E' },
  { id: 'workflow', label: 'AI Workflow', color: '#F59E0B' },
  { id: 'mcp-agents', label: 'MCP & AI Agents', color: '#F97316' },
  { id: 'rag', label: 'RAG & AI Features', color: '#EF4444' },
  { id: 'production', label: 'Production & Frameworks', color: '#10B981' },
  { id: 'senior', label: 'Senior-Level Topics', color: '#A855F7' },
  { id: 'projects', label: 'Real Project Examples', color: '#EAB308' },
  { id: 'interview', label: 'Interview Preparation', color: '#FB7185' },
]

// difficulty: 1 Beginner · 2 Intermediate · 3 Advanced
export const aiTopics = [
  // ── AI-Assisted Development ──
  { slug: 'what-is-ai-coding', title: 'What is AI Coding?', hi: 'AI se code likhna kya hai', group: 'foundations', icon: '🤖', minutes: 8, level: 1 },
  { slug: 'why-use-ai', title: 'Why Developers Use AI', hi: 'AI ke fayde & integration', group: 'foundations', icon: '🎯', minutes: 8, level: 1 },
  { slug: 'ai-limitations', title: 'Limitations of AI', hi: 'AI kahan fail hota hai', group: 'foundations', icon: '⚠️', minutes: 8, level: 1 },
  { slug: 'ai-tools-overview', title: 'AI Tools Overview', hi: 'ChatGPT/Claude/Copilot/Cursor…', group: 'foundations', icon: '🧰', minutes: 12, level: 1 },

  // ── Understanding AI Context ──
  { slug: 'what-is-context', title: 'What is Context?', hi: 'AI ka context kya hai', group: 'context', icon: '🧩', minutes: 8, level: 1 },
  { slug: 'tokens-limits', title: 'Tokens & Token Limits', hi: 'Token kya, limit kyun', group: 'context', icon: '🔢', minutes: 9, level: 2 },
  { slug: 'context-window', title: 'Context Window & Why AI Forgets', hi: 'AI bhool kyun jaata hai', group: 'context', icon: '🪟', minutes: 10, level: 2 },
  { slug: 'project-knowledge', title: 'Maintaining Project Knowledge', hi: 'Project ki memory banao', group: 'context', icon: '📚', minutes: 9, level: 2 },

  // ── Existing Project Integration ──
  { slug: 'analyze-codebase', title: 'Analyzing an Existing Codebase', hi: 'Purana code AI ko samjhao', group: 'integration', icon: '🔍', minutes: 11, level: 2 },
  { slug: 'folder-understanding', title: 'Folder Structure Understanding', hi: 'Folders ka map', group: 'integration', icon: '🗂️', minutes: 9, level: 2 },
  { slug: 'component-relationships', title: 'Component Relationships', hi: 'Components ka rishta', group: 'integration', icon: '🕸️', minutes: 9, level: 2 },
  { slug: 'api-state-flow', title: 'API Flow & State Flow', hi: 'Data kaise behta hai', group: 'integration', icon: '🔄', minutes: 10, level: 2 },
  { slug: 'make-ai-understand', title: 'Making AI Understand the Project', hi: 'README/rules/docs strategy', group: 'integration', icon: '🧠', minutes: 12, level: 2 },

  // ── Prompt Engineering ──
  { slug: 'good-vs-bad-prompt', title: 'Good Prompt vs Bad Prompt', hi: 'Sahi prompt kaise likhein', group: 'prompting', icon: '✍️', minutes: 10, level: 1 },
  { slug: 'context-prompting', title: 'Context-Based Prompting', hi: 'Context ke saath poocho', group: 'prompting', icon: '🎁', minutes: 9, level: 2 },
  { slug: 'chain-of-thought', title: 'Chain of Thought Prompting', hi: 'Soch-soch kar answer', group: 'prompting', icon: '⛓️', minutes: 9, level: 2 },
  { slug: 'role-step-prompting', title: 'Role-Based & Step-by-Step Prompting', hi: 'Role do, steps mein todo', group: 'prompting', icon: '🎭', minutes: 9, level: 2 },

  // ── AI Coding Tools ──
  { slug: 'cursor', title: 'Cursor AI', hi: 'Cursor IDE master karo', group: 'tools', icon: '🖱️', minutes: 12, level: 2 },
  { slug: 'github-copilot', title: 'GitHub Copilot', hi: 'Copilot setup & features', group: 'tools', icon: '🐙', minutes: 10, level: 1 },
  { slug: 'windsurf', title: 'Windsurf IDE', hi: 'Cascade & memory', group: 'tools', icon: '🌊', minutes: 10, level: 2 },
  { slug: 'continue-dev', title: 'Continue.dev', hi: 'Open-source AI assistant', group: 'tools', icon: '⏩', minutes: 9, level: 2 },
  { slug: 'claude-code', title: 'Claude Code', hi: 'Long-context terminal agent', group: 'tools', icon: '✨', minutes: 11, level: 2 },

  // ── AI Rules & Documentation ──
  { slug: 'ai-rules-files', title: 'Creating AI Rules Files', hi: 'coding-rules / architecture.md', group: 'rules-docs', icon: '📜', minutes: 11, level: 2 },
  { slug: 'documentation-strategy', title: 'Documentation Strategy', hi: 'AI ke liye docs likho', group: 'rules-docs', icon: '📝', minutes: 10, level: 2 },
  { slug: 'ai-friendly-structure', title: 'AI-Friendly Folder Structure', hi: 'AI samajh sake aisa structure', group: 'rules-docs', icon: '🏗️', minutes: 10, level: 2 },

  // ── React + AI Integration ──
  { slug: 'react-ai-integration', title: 'React Project Integration', hi: 'Components/hooks/services + AI', group: 'react-integration', icon: '⚛️', minutes: 12, level: 2 },

  // ── Writing Less Code ──
  { slug: 'writing-less-code', title: 'Writing Less Code with AI', hi: 'Boilerplate AI se banwao', group: 'productivity', icon: '✂️', minutes: 10, level: 2 },
  { slug: 'multi-file-refactoring', title: 'Multi-file Refactoring', hi: 'Bade refactors safely', group: 'productivity', icon: '🔧', minutes: 10, level: 3 },
  { slug: 'ai-debugging', title: 'AI Debugging', hi: 'Errors & stack traces solve', group: 'productivity', icon: '🐛', minutes: 10, level: 2 },
  { slug: 'ai-testing', title: 'AI for Testing', hi: 'Unit/integration tests + mocks', group: 'productivity', icon: '🧪', minutes: 10, level: 2 },

  // ── AI Workflow ──
  { slug: 'ai-workflow', title: 'The AI Development Workflow', hi: 'Idea → Production pipeline', group: 'workflow', icon: '🤖', minutes: 10, level: 2 },

  // ── MCP & AI Agents ──
  { slug: 'mcp-intro', title: 'MCP (Model Context Protocol)', hi: 'MCP kya & kyun', group: 'mcp-agents', icon: '🔌', minutes: 11, level: 3 },
  { slug: 'mcp-servers', title: 'MCP Servers (Browser/FS/GitHub/DB)', hi: 'MCP servers use karo', group: 'mcp-agents', icon: '🖥️', minutes: 11, level: 3 },
  { slug: 'ai-agents', title: 'AI Agents & Autonomous Coding', hi: 'Agent mode, task planning', group: 'mcp-agents', icon: '🦾', minutes: 12, level: 3 },

  // ── RAG & AI Features ──
  { slug: 'rag-intro', title: 'RAG (Retrieval Augmented Generation)', hi: 'Vector DB, embeddings', group: 'rag', icon: '📥', minutes: 12, level: 3 },
  { slug: 'project-memory', title: 'Project Memory Systems', hi: 'AI ki long-term memory', group: 'rag', icon: '🧠', minutes: 10, level: 3 },
  { slug: 'building-ai-features', title: 'Building AI Features', hi: 'Chatbot/search/assistant', group: 'rag', icon: '💬', minutes: 12, level: 3 },

  // ── Production & Frameworks ──
  { slug: 'production-best-practices', title: 'Production Best Practices', hi: 'Security/keys/env/cost', group: 'production', icon: '🛡️', minutes: 12, level: 3 },
  { slug: 'advanced-frameworks', title: 'Advanced AI Frameworks', hi: 'LangChain/LangGraph/APIs', group: 'production', icon: '🚀', minutes: 12, level: 3 },

  // ── Senior-Level Topics ──
  { slug: 'agentic-ai', title: 'Agentic AI & Multi-Agent Systems', hi: 'Autonomous agents', group: 'senior', icon: '🧬', minutes: 12, level: 3 },
  { slug: 'tool-function-calling', title: 'Tool Calling & Function Calling', hi: 'AI ko tools do', group: 'senior', icon: '🛠️', minutes: 11, level: 3 },
  { slug: 'semantic-search', title: 'Semantic Search & Embeddings', hi: 'Meaning-based search', group: 'senior', icon: '🔎', minutes: 11, level: 3 },

  // ── Real Project Examples ──
  { slug: 'real-world-projects', title: 'Real Project Examples', hi: 'React/Node/Full-stack AI apps', group: 'projects', icon: '🏆', minutes: 13, level: 3 },

  // ── Interview Preparation ──
  { slug: 'interview-questions', title: 'Interview Questions & Prep', hi: 'AI dev interview crack karo', group: 'interview', icon: '🎤', minutes: 14, level: 3 },
]

export const aiTopicBySlug = Object.fromEntries(aiTopics.map((t) => [t.slug, t]))
export const aiGroupById = Object.fromEntries(aiGroups.map((g) => [g.id, g]))
export const aiGroupedTopics = aiGroups.map((g) => ({ ...g, items: aiTopics.filter((t) => t.group === g.id) }))

export const AI_LEVELS = {
  1: { label: 'Beginner', color: '#22C55E', bg: 'rgba(34,197,94,0.15)' },
  2: { label: 'Intermediate', color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' },
  3: { label: 'Advanced', color: '#EF4444', bg: 'rgba(239,68,68,0.15)' },
}
