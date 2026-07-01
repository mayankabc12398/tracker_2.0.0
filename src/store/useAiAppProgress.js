import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/** Progress, bookmarks and personal notes for the AI App Engineering course. */
export const useAiAppProgress = create()(
  persist(
    (set) => ({
      completed: {},
      bookmarks: {},
      notes: {},
      toggleComplete: (slug) =>
        set((s) => {
          const next = { ...s.completed }
          if (next[slug]) delete next[slug]
          else next[slug] = true
          return { completed: next }
        }),
      toggleBookmark: (slug) =>
        set((s) => {
          const next = { ...s.bookmarks }
          if (next[slug]) delete next[slug]
          else next[slug] = true
          return { bookmarks: next }
        }),
      setNote: (slug, text) => set((s) => ({ notes: { ...s.notes, [slug]: text } })),
      reset: () => set({ completed: {}, bookmarks: {}, notes: {} }),
    }),
    { name: 'lifeflow-aiapp-progress' },
  ),
)
