import { Router } from 'express'
import { summary, habitSeries, expenseBreakdown } from '../controllers/analytics.controller.js'
import { protect } from '../middleware/auth.js'

const router = Router()
router.use(protect)
router.get('/summary', summary)
router.get('/habits', habitSeries)
router.get('/expenses', expenseBreakdown)

export default router
