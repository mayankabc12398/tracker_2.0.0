import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/** Tracks which HTML topics the user has marked complete. */
export const useLearnProgress = create()(
  persist(
    (set, get) => ({
      completed: {}, // { [slug]: true }
      toggleComplete: (slug) =>
        set((s) => {
          const next = { ...s.completed }
          if (next[slug]) delete next[slug]
          else next[slug] = true
          return { completed: next }
        }),
      markComplete: (slug) => set((s) => ({ completed: { ...s.completed, [slug]: true } })),
      isComplete: (slug) => !!get().completed[slug],
      reset: () => set({ completed: {} }),
    }),
    { name: 'lifeflow-html-progress' },
  ),
)
