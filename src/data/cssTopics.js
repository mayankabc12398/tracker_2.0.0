// CSS Course — topic metadata, colour-coded groups, difficulty.

export const cssGroups = [
  { id: 'basics', label: 'CSS Basics', color: '#6366F1' },
  { id: 'box', label: 'Box Model & Spacing', color: '#8B5CF6' },
  { id: 'layout', label: 'Layout', color: '#22C55E' },
  { id: 'text', label: 'Typography & Text', color: '#F59E0B' },
  { id: 'styling', label: 'Styling Elements', color: '#EC4899' },
  { id: 'effects', label: 'Effects & Motion', color: '#06B6D4' },
  { id: 'modern', label: 'Modern CSS', color: '#A855F7' },
  { id: 'responsive', label: 'Responsive Design', color: '#14B8A6' },
  { id: 'pro', label: 'Architecture & Career', color: '#EF4444' },
]

// difficulty: 1 Beginner · 2 Intermediate · 3 Advanced
export const cssTopics = [
  { slug: 'introduction', title: 'Introduction to CSS', hi: 'CSS kya hai?', group: 'basics', icon: '🎨', minutes: 6, level: 1 },
  { slug: 'types', title: 'Types of CSS', hi: 'Inline, Internal, External', group: 'basics', icon: '🔀', minutes: 6, level: 1 },
  { slug: 'syntax', title: 'CSS Syntax', hi: 'CSS likhne ka tarika', group: 'basics', icon: '✍️', minutes: 5, level: 1 },
  { slug: 'selectors', title: 'Selectors', hi: 'Elements ko pakadna', group: 'basics', icon: '🎯', minutes: 9, level: 1 },
  { slug: 'colors', title: 'Colors', hi: 'Rang dena', group: 'basics', icon: '🌈', minutes: 6, level: 1 },
  { slug: 'units', title: 'Units', hi: 'px, em, rem, %, vw, vh', group: 'basics', icon: '📏', minutes: 7, level: 2 },

  { slug: 'box-model', title: 'Box Model', hi: 'Har element ek box', group: 'box', icon: '📦', minutes: 8, level: 1 },
  { slug: 'margin', title: 'Margin', hi: 'Bahar ki jagah', group: 'box', icon: '↔️', minutes: 5, level: 1 },
  { slug: 'padding', title: 'Padding', hi: 'Andar ki jagah', group: 'box', icon: '🧱', minutes: 5, level: 1 },
  { slug: 'borders', title: 'Borders', hi: 'Kinaare', group: 'box', icon: '🔲', minutes: 5, level: 1 },
  { slug: 'width-height', title: 'Width & Height', hi: 'Size set karna', group: 'box', icon: '📐', minutes: 5, level: 1 },
  { slug: 'backgrounds', title: 'Backgrounds', hi: 'Background styling', group: 'box', icon: '🖼️', minutes: 6, level: 1 },
  { slug: 'overflow', title: 'Overflow', hi: 'Content bahar nikle to', group: 'box', icon: '📜', minutes: 4, level: 2 },

  { slug: 'display', title: 'Display Property', hi: 'block, inline, none', group: 'layout', icon: '🧩', minutes: 7, level: 2 },
  { slug: 'position', title: 'Position', hi: 'Element ki jagah', group: 'layout', icon: '📍', minutes: 8, level: 2, demo: 'position' },
  { slug: 'z-index', title: 'Z-index', hi: 'Upar-neeche stacking', group: 'layout', icon: '🗂️', minutes: 4, level: 2 },
  { slug: 'float-clear', title: 'Float & Clear', hi: 'Purana layout tarika', group: 'layout', icon: '🌊', minutes: 5, level: 2 },
  { slug: 'flexbox', title: 'Flexbox', hi: '1D layout ka king', group: 'layout', icon: '↔️', minutes: 12, level: 2, demo: 'flexbox' },
  { slug: 'grid', title: 'CSS Grid', hi: '2D layout master', group: 'layout', icon: '▦', minutes: 12, level: 3, demo: 'grid' },

  { slug: 'typography', title: 'Typography', hi: 'Text ka design', group: 'text', icon: '🔤', minutes: 6, level: 1 },
  { slug: 'fonts', title: 'Fonts', hi: 'Font lagana', group: 'text', icon: '🔠', minutes: 5, level: 1 },
  { slug: 'text-properties', title: 'Text Properties', hi: 'align, decoration, spacing', group: 'text', icon: '📝', minutes: 6, level: 1 },

  { slug: 'list-styling', title: 'List Styling', hi: 'Lists ko sajao', group: 'styling', icon: '📋', minutes: 4, level: 1 },
  { slug: 'table-styling', title: 'Table Styling', hi: 'Tables ko sajao', group: 'styling', icon: '🪟', minutes: 5, level: 2 },
  { slug: 'forms-styling', title: 'Forms Styling', hi: 'Forms ko sajao', group: 'styling', icon: '🧾', minutes: 6, level: 2 },
  { slug: 'pseudo-classes', title: 'Pseudo Classes', hi: ':hover, :focus, :nth-child', group: 'styling', icon: '🎭', minutes: 7, level: 2 },
  { slug: 'pseudo-elements', title: 'Pseudo Elements', hi: '::before, ::after', group: 'styling', icon: '✨', minutes: 6, level: 2 },

  { slug: 'transform', title: 'Transform', hi: 'rotate, scale, translate', group: 'effects', icon: '🔄', minutes: 6, level: 2 },
  { slug: 'transition', title: 'Transition', hi: 'Smooth changes', group: 'effects', icon: '🎞️', minutes: 6, level: 2, demo: 'transition' },
  { slug: 'animation', title: 'Animation', hi: 'Keyframes se jaan', group: 'effects', icon: '🎬', minutes: 8, level: 3, demo: 'animation' },
  { slug: 'shadows', title: 'Shadow Effects', hi: 'box & text shadow', group: 'effects', icon: '🌑', minutes: 5, level: 1 },
  { slug: 'gradients', title: 'Gradients', hi: 'Rang ka mixture', group: 'effects', icon: '🌅', minutes: 6, level: 2 },
  { slug: 'filters', title: 'Filters', hi: 'blur, brightness, grayscale', group: 'effects', icon: '🎛️', minutes: 4, level: 2 },

  { slug: 'variables', title: 'Variables', hi: 'Custom Properties (--var)', group: 'modern', icon: '🔧', minutes: 6, level: 2 },
  { slug: 'clamp', title: 'clamp()', hi: 'Fluid sizing', group: 'modern', icon: '🗜️', minutes: 5, level: 3 },
  { slug: 'object-fit', title: 'Object-fit', hi: 'Image fit karna', group: 'modern', icon: '🖼️', minutes: 4, level: 2 },
  { slug: 'aspect-ratio', title: 'Aspect Ratio', hi: 'Ratio maintain karna', group: 'modern', icon: '🔳', minutes: 4, level: 2 },
  { slug: 'css-functions', title: 'CSS Functions', hi: 'calc, min, max, var', group: 'modern', icon: 'ƒ', minutes: 6, level: 2 },
  { slug: 'modern-features', title: 'Modern CSS Features', hi: ':has, container queries', group: 'modern', icon: '🚀', minutes: 6, level: 3 },

  { slug: 'responsive', title: 'Responsive Design', hi: 'Har screen par sahi', group: 'responsive', icon: '📱', minutes: 8, level: 2 },
  { slug: 'media-queries', title: 'Media Queries', hi: 'Screen ke hisaab se', group: 'responsive', icon: '🖥️', minutes: 7, level: 2 },

  { slug: 'specificity', title: 'CSS Specificity', hi: 'Kaunsа rule jeetega', group: 'pro', icon: '⚖️', minutes: 6, level: 3 },
  { slug: 'inheritance', title: 'Inheritance', hi: 'Parent se milta hai', group: 'pro', icon: '🧬', minutes: 4, level: 2 },
  { slug: 'cascade', title: 'Cascade', hi: 'CSS ka "C"', group: 'pro', icon: '💧', minutes: 5, level: 3 },
  { slug: 'bem', title: 'BEM Methodology', hi: 'Naming convention', group: 'pro', icon: '🏗️', minutes: 5, level: 3 },
  { slug: 'performance', title: 'Performance', hi: 'Fast CSS', group: 'pro', icon: '⚡', minutes: 6, level: 3 },
  { slug: 'accessibility', title: 'Accessibility', hi: 'Sabke liye CSS', group: 'pro', icon: '♿', minutes: 5, level: 2 },
  { slug: 'best-practices', title: 'Best Practices', hi: 'Clean CSS aadatein', group: 'pro', icon: '⭐', minutes: 5, level: 2 },
  { slug: 'interview-questions', title: 'Interview Questions', hi: 'Interview prep', group: 'pro', icon: '🎯', minutes: 9, level: 3 },
]

export const cssTopicBySlug = Object.fromEntries(cssTopics.map((t) => [t.slug, t]))
export const cssGroupById = Object.fromEntries(cssGroups.map((g) => [g.id, g]))
export const cssGroupedTopics = cssGroups.map((g) => ({ ...g, items: cssTopics.filter((t) => t.group === g.id) }))

export const LEVELS = {
  1: { label: 'Beginner', color: '#22C55E', bg: 'rgba(34,197,94,0.15)' },
  2: { label: 'Intermediate', color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' },
  3: { label: 'Advanced', color: '#EF4444', bg: 'rgba(239,68,68,0.15)' },
}
