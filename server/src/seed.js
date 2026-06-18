/**
 * Seeds a demo user with sample data. Run with: npm run seed
 */
import { connectDB } from './config/db.js'
import { User } from './models/User.js'
import { Habit } from './models/Habit.js'
import { Goal } from './models/Goal.js'
import { Transaction } from './models/Transaction.js'
import { LearningCategory, LearningTopic } from './models/Learning.js'
import mongoose from 'mongoose'

async function run() {
  await connectDB()
  console.log('🌱 Seeding demo data…')

  await Promise.all([
    User.deleteMany({ email: 'demo@lifeflow.app' }),
  ])

  const user = await User.create({
    name: 'Demo User',
    email: 'demo@lifeflow.app',
    password: 'demo1234',
    bio: 'Exploring LifeFlow.',
  })

  const completions = new Map()
  for (let i = 0; i < 60; i++) {
    if (Math.random() < 0.75) completions.set(new Date(Date.now() - i * 86400000).toISOString().slice(0, 10), true)
  }

  await Habit.create([
    { user: user.id, name: 'Drink Water', icon: '💧', section: 'Morning', color: '#22C55E', completions },
    { user: user.id, name: 'Deep Work', icon: '💻', section: 'Work', color: '#6366F1', completions },
    { user: user.id, name: 'Workout', icon: '🏋️', section: 'Evening', color: '#F59E0B', completions },
  ])

  await Goal.create({
    user: user.id,
    title: 'Save $10,000',
    category: 'Finance',
    progress: 70,
    deadline: new Date(Date.now() + 90 * 86400000),
    milestones: [
      { title: 'Save $5K', done: true },
      { title: 'Save $7.5K', done: true },
      { title: 'Hit $10K', done: false },
    ],
  })

  await Transaction.create([
    { user: user.id, type: 'income', title: 'Salary', amount: 4200, category: 'Others', date: new Date() },
    { user: user.id, type: 'expense', title: 'Groceries', amount: 85, category: 'Food', date: new Date() },
  ])

  const cat = await LearningCategory.create({ user: user.id, name: 'JavaScript', icon: '⚡', color: '#F59E0B' })
  await LearningTopic.create({
    user: user.id,
    category: cat.id,
    title: 'Closures',
    overview: 'A closure is a function bundled with its lexical environment.',
    interviewQuestions: ['What is a closure?'],
    tags: ['core', 'functions'],
    progress: 60,
    history: [{ change: 'Created topic', version: 1, date: new Date() }],
  })

  console.log('✅ Seed complete. Login with demo@lifeflow.app / demo1234')
  await mongoose.connection.close()
  process.exit(0)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
