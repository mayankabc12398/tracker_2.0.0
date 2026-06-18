import { useMemo } from 'react'
import { useStore } from '@/store/useStore'
import { todayKey } from '@/lib/utils'


const dayKey = (n) => todayKey(new Date(Date.now() - n * 86400000))

/** Current consecutive-day streak across a set of habits (all-or-any). */
export function computeStreak(habits) {
  if (!habits.length) return 0
  let streak = 0
  for (let i = 0; i < 365; i++) {
    const k = dayKey(i)
    const any = habits.some((h) => h.completions[k])
    if (any) streak++
    else if (i === 0) continue // today not done yet shouldn't break a prior streak
    else break
  }
  return streak
}














export function useDashboardStats() {
  const { habits, goals, transactions, topics } = useStore()

  return useMemo(() => {
    const today = todayKey()
    const habitsTotal = habits.length
    const habitsCompleted = habits.filter((h) => h.completions[today]).length
    const todayPct = habitsTotal ? Math.round((habitsCompleted / habitsTotal) * 100) : 0

    const goalsTotal = goals.length
    const goalsCompleted = goals.filter((g) => g.progress >= 100).length
    const avgGoal = goalsTotal ? goals.reduce((a, g) => a + g.progress, 0) / goalsTotal : 0

    const learningPct = topics.length
      ? Math.round(topics.reduce((a, t) => a + t.progress, 0) / topics.length)
      : 0

    const todaySpend = transactions
      .filter((t) => t.type === 'expense' && t.date === today)
      .reduce((a, t) => a + t.amount, 0)

    const streak = computeStreak(habits)

    // Productivity score: blended weighting of the day's signals.
    const productivity = Math.round(todayPct * 0.4 + avgGoal * 0.3 + learningPct * 0.3)

    const weekTrend = Array.from({ length: 7 }, (_, i) => {
      const k = dayKey(6 - i)
      const total = habits.length || 1
      const done = habits.filter((h) => h.completions[k]).length
      return {
        day: new Date(k).toLocaleDateString('en-US', { weekday: 'short' }),
        value: Math.round((done / total) * 100),
      }
    })

    return {
      todayPct,
      habitsCompleted,
      habitsTotal,
      streak,
      goalsCompleted,
      goalsTotal,
      learningPct,
      todaySpend,
      productivity,
      weekTrend,
    }
  }, [habits, goals, transactions, topics])
}

/** Daily completion % over the last `days` days — used by charts & heatmap. */
export function useHabitSeries(days = 30) {
  const habits = useStore((s) => s.habits)
  return useMemo(
    () =>
      Array.from({ length: days }, (_, i) => {
        const k = dayKey(days - 1 - i)
        const total = habits.length || 1
        const done = habits.filter((h) => h.completions[k]).length
        return { date: k, value: Math.round((done / total) * 100), done }
      }),
    [habits, days],
  )
}
