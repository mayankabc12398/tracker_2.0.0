import { create } from 'zustand'
import { persist } from 'zustand/middleware'










import { todayKey, uid } from '@/lib/utils'
import {
  seedHabits,
  seedGoals,
  seedTxns,
  seedSubjects,
  seedTopics,
  seedNotifications,
  seedProfile,
  seedSettings,
} from './seed'












































export const useStore = create()(
  persist(
    (set) => ({
      habits: seedHabits,
      goals: seedGoals,
      transactions: seedTxns,
      subjects: seedSubjects,
      topics: seedTopics,
      notifications: seedNotifications,
      profile: seedProfile,
      settings: seedSettings,

      addHabit: (h) =>
        set((s) => ({
          habits: [...s.habits, { ...h, id: uid('hab'), createdAt: todayKey(), completions: {} }],
        })),
      updateHabit: (id, patch) =>
        set((s) => ({ habits: s.habits.map((h) => (h.id === id ? { ...h, ...patch } : h)) })),
      deleteHabit: (id) => set((s) => ({ habits: s.habits.filter((h) => h.id !== id) })),
      toggleHabit: (id, date = todayKey()) =>
        set((s) => ({
          habits: s.habits.map((h) =>
            h.id === id
              ? { ...h, completions: { ...h.completions, [date]: !h.completions[date] } }
              : h,
          ),
        })),

      addGoal: (g) => set((s) => ({ goals: [...s.goals, { ...g, id: uid('goal'), createdAt: todayKey() }] })),
      updateGoal: (id, patch) =>
        set((s) => ({ goals: s.goals.map((g) => (g.id === id ? { ...g, ...patch } : g)) })),
      deleteGoal: (id) => set((s) => ({ goals: s.goals.filter((g) => g.id !== id) })),
      toggleMilestone: (goalId, milestoneId) =>
        set((s) => ({
          goals: s.goals.map((g) => {
            if (g.id !== goalId) return g
            const milestones = g.milestones.map((m) =>
              m.id === milestoneId ? { ...m, done: !m.done } : m,
            )
            const done = milestones.filter((m) => m.done).length
            const progress = milestones.length ? Math.round((done / milestones.length) * 100) : g.progress
            return { ...g, milestones, progress }
          }),
        })),

      addTransaction: (t) => set((s) => ({ transactions: [{ ...t, id: uid('txn') }, ...s.transactions] })),
      updateTransaction: (id, patch) =>
        set((s) => ({ transactions: s.transactions.map((t) => (t.id === id ? { ...t, ...patch } : t)) })),
      deleteTransaction: (id) => set((s) => ({ transactions: s.transactions.filter((t) => t.id !== id) })),

      addTopic: (t) =>
        set((s) => ({
          topics: [
            ...s.topics,
            {
              ...t,
              id: uid('top'),
              createdAt: todayKey(),
              updatedAt: todayKey(),
              history: [{ date: todayKey(), change: 'Created topic', version: 1 }],
            },
          ],
        })),
      updateTopic: (id, patch, change = 'Updated topic') =>
        set((s) => ({
          topics: s.topics.map((t) => {
            if (t.id !== id) return t
            const version = (t.history.at(-1)?.version ?? 0) + 1
            return {
              ...t,
              ...patch,
              updatedAt: todayKey(),
              history: [...t.history, { date: todayKey(), change, version }],
            }
          }),
        })),
      deleteTopic: (id) => set((s) => ({ topics: s.topics.filter((t) => t.id !== id) })),

      markNotificationRead: (id) =>
        set((s) => ({
          notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
        })),
      markAllRead: () =>
        set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })) })),

      updateProfile: (patch) => set((s) => ({ profile: { ...s.profile, ...patch } })),
      updateSettings: (patch) => set((s) => ({ settings: { ...s.settings, ...patch } })),

      resetData: () =>
        set({
          habits: seedHabits,
          goals: seedGoals,
          transactions: seedTxns,
          subjects: seedSubjects,
          topics: seedTopics,
          notifications: seedNotifications,
          profile: seedProfile,
          settings: seedSettings,
        }),
    }),
    { name: 'lifeflow-store-v2' },
  ),
)
