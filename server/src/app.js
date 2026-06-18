import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import { env } from './config/env.js'
import { notFound, errorHandler } from './middleware/error.js'

import authRoutes from './routes/auth.routes.js'
import habitRoutes from './routes/habits.routes.js'
import goalRoutes from './routes/goals.routes.js'
import expenseRoutes from './routes/expenses.routes.js'
import learningRoutes from './routes/learning.routes.js'
import analyticsRoutes from './routes/analytics.routes.js'
import profileRoutes from './routes/profile.routes.js'
import notificationRoutes from './routes/notifications.routes.js'

export function createApp() {
  const app = express()

  app.use(helmet())
  app.use(cors({ origin: env.CLIENT_URL, credentials: true }))
  app.use(express.json({ limit: '1mb' }))
  app.use(morgan(env.NODE_ENV === 'development' ? 'dev' : 'combined'))

  // Throttle auth endpoints against brute-force.
  app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, max: 50 }))

  app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'lifeflow-api' }))

  app.use('/api/auth', authRoutes)
  app.use('/api/habits', habitRoutes)
  app.use('/api/goals', goalRoutes)
  app.use('/api/expenses', expenseRoutes)
  app.use('/api/learning', learningRoutes)
  app.use('/api/analytics', analyticsRoutes)
  app.use('/api/profile', profileRoutes)
  app.use('/api/notifications', notificationRoutes)

  app.use(notFound)
  app.use(errorHandler)
  return app
}
