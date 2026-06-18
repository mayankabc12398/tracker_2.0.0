
import { Habit } from '../models/Habit.js'
import { Goal } from '../models/Goal.js'
import { Transaction } from '../models/Transaction.js'
import { LearningTopic } from '../models/Learning.js'
import { asyncHandler } from '../middleware/error.js'


const dayKey = (n) => new Date(Date.now() - n * 86400000).toISOString().slice(0, 10)

// GET /api/analytics/summary
export const summary = asyncHandler(async (req, res) => {
  const user = req.userId
  const [habits, goals, topics, txns] = await Promise.all([
    Habit.find({ user }),
    Goal.find({ user }),
    LearningTopic.find({ user }),
    Transaction.find({ user }),
  ])

  const today = dayKey(0)
  const habitsTotal = habits.length
  const habitsDone = habits.filter((h) => h.completions?.get(today)).length
  const todayPct = habitsTotal ? Math.round((habitsDone / habitsTotal) * 100) : 0

  // Streak
  let streak = 0
  for (let i = 0; i < 365; i++) {
    const k = dayKey(i)
    const any = habits.some((h) => h.completions?.get(k))
    if (any) streak++
    else if (i === 0) continue
    else break
  }

  const avgGoal = goals.length ? Math.round(goals.reduce((a, g) => a + g.progress, 0) / goals.length) : 0
  const learningPct = topics.length ? Math.round(topics.reduce((a, t) => a + t.progress, 0) / topics.length) : 0
  const todaySpend = txns
    .filter((t) => t.type === 'expense' && t.date.toISOString().slice(0, 10) === today)
    .reduce((a, t) => a + t.amount, 0)

  res.json({
    todayPct,
    streak,
    habitsDone,
    habitsTotal,
    goalsTotal: goals.length,
    goalsCompleted: goals.filter((g) => g.progress >= 100).length,
    learningPct,
    todaySpend,
    productivity: Math.round(todayPct * 0.4 + avgGoal * 0.3 + learningPct * 0.3),
  })
})

// GET /api/analytics/habits?days=30
export const habitSeries = asyncHandler(async (req, res) => {
  const days = Math.min(365, parseInt((req.query.days ) ?? '30', 10))
  const habits = await Habit.find({ user: req.userId })
  const series = Array.from({ length: days }, (_, i) => {
    const k = dayKey(days - 1 - i)
    const total = habits.length || 1
    const done = habits.filter((h) => h.completions?.get(k)).length
    return { date: k, value: Math.round((done / total) * 100) }
  })
  res.json(series)
})

// GET /api/analytics/expenses
export const expenseBreakdown = asyncHandler(async (req, res) => {
  const txns = await Transaction.find({ user: req.userId, type: 'expense' })
  const byCategory = {}
  for (const t of txns) byCategory[t.category] = (byCategory[t.category] ?? 0) + t.amount
  res.json({ byCategory })
})
