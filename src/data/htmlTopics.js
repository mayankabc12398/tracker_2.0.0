// ─────────────────────────────────────────────────────────────
// HTML Course — topic metadata + colour-coded groups (sidebar)
// Content for each topic lives in ./htmlContent.js (keyed by slug)
// ─────────────────────────────────────────────────────────────

export const groups = [
  { id: 'basics', label: 'Basics', color: '#6366F1' },      // indigo
  { id: 'structure', label: 'Structure', color: '#8B5CF6' }, // purple
  { id: 'text', label: 'Text & Content', color: '#22C55E' }, // green
  { id: 'media', label: 'Links & Media', color: '#F59E0B' }, // amber
  { id: 'forms', label: 'Forms', color: '#EC4899' },         // pink
  { id: 'advanced', label: 'Advanced', color: '#06B6D4' },   // cyan
  { id: 'pro', label: 'Pro & Career', color: '#EF4444' },    // red
]

export const topics = [
  { slug: 'introduction', title: 'Introduction', hi: 'HTML kya hai?', group: 'basics', icon: '🌐', minutes: 6 },
  { slug: 'history', title: 'History of HTML', hi: 'HTML ka itihaas', group: 'basics', icon: '📜', minutes: 5 },
  { slug: 'versions', title: 'HTML Versions', hi: 'HTML ke versions', group: 'basics', icon: '🔖', minutes: 5 },
  { slug: 'document-structure', title: 'Document Structure', hi: 'Page ka dhaancha', group: 'structure', icon: '🏗️', minutes: 8 },
  { slug: 'tags', title: 'Tags', hi: 'Tags samjho', group: 'structure', icon: '🏷️', minutes: 6 },
  { slug: 'elements', title: 'Elements', hi: 'Elements kya hai', group: 'structure', icon: '🧱', minutes: 6 },
  { slug: 'attributes', title: 'Attributes', hi: 'Attributes', group: 'structure', icon: '⚙️', minutes: 7 },
  { slug: 'headings', title: 'Headings', hi: 'Headings h1-h6', group: 'text', icon: '🔠', minutes: 5 },
  { slug: 'paragraphs', title: 'Paragraphs', hi: 'Paragraphs', group: 'text', icon: '📄', minutes: 5 },
  { slug: 'formatting', title: 'Formatting Tags', hi: 'Text formatting', group: 'text', icon: '✨', minutes: 6 },
  { slug: 'comments', title: 'Comments', hi: 'Comments', group: 'text', icon: '💬', minutes: 3 },
  { slug: 'links', title: 'Links', hi: 'Links (anchor)', group: 'media', icon: '🔗', minutes: 7 },
  { slug: 'images', title: 'Images', hi: 'Images', group: 'media', icon: '🖼️', minutes: 7 },
  { slug: 'lists', title: 'Lists', hi: 'Lists (ul, ol)', group: 'text', icon: '📋', minutes: 6 },
  { slug: 'tables', title: 'Tables', hi: 'Tables', group: 'structure', icon: '🪟', minutes: 7 },
  { slug: 'forms', title: 'Forms', hi: 'Forms', group: 'forms', icon: '📝', minutes: 9 },
  { slug: 'input-types', title: 'Input Types', hi: 'Input types', group: 'forms', icon: '⌨️', minutes: 7 },
  { slug: 'semantic', title: 'Semantic Elements', hi: 'Semantic HTML', group: 'advanced', icon: '🧩', minutes: 7 },
  { slug: 'audio', title: 'Audio', hi: 'Audio', group: 'media', icon: '🔊', minutes: 4 },
  { slug: 'video', title: 'Video', hi: 'Video', group: 'media', icon: '🎬', minutes: 4 },
  { slug: 'iframes', title: 'Iframes', hi: 'Iframes', group: 'media', icon: '🪟', minutes: 4 },
  { slug: 'meta-tags', title: 'Meta Tags', hi: 'Meta tags', group: 'advanced', icon: '🧾', minutes: 6 },
  { slug: 'entities', title: 'Entities', hi: 'HTML entities', group: 'advanced', icon: '🔣', minutes: 4 },
  { slug: 'block-inline', title: 'Block vs Inline', hi: 'Block aur Inline', group: 'advanced', icon: '📐', minutes: 5 },
  { slug: 'class-id', title: 'Class and ID', hi: 'Class aur ID', group: 'advanced', icon: '🏷️', minutes: 5 },
  { slug: 'accessibility', title: 'Accessibility', hi: 'Accessibility (a11y)', group: 'pro', icon: '♿', minutes: 6 },
  { slug: 'seo', title: 'SEO Basics', hi: 'SEO basics', group: 'pro', icon: '📈', minutes: 6 },
  { slug: 'best-practices', title: 'Best Practices', hi: 'Best practices', group: 'pro', icon: '⭐', minutes: 6 },
  { slug: 'interview-questions', title: 'Interview Questions', hi: 'Interview prep', group: 'pro', icon: '🎯', minutes: 8 },
]

export const topicBySlug = Object.fromEntries(topics.map((t) => [t.slug, t]))
export const groupById = Object.fromEntries(groups.map((g) => [g.id, g]))

/** Ordered topics grouped for the sidebar. */
export const groupedTopics = groups.map((g) => ({
  ...g,
  items: topics.filter((t) => t.group === g.id),
}))
