import { Router } from 'express'

import { Notification } from '../models/Notification.js'
import { crudFactory } from '../controllers/crud.factory.js'
import { protect, } from '../middleware/auth.js'
import { asyncHandler } from '../middleware/error.js'

const router = Router()
const notifications = crudFactory(Notification, { searchFields: ['title'], filterField: 'type' })

router.use(protect)
router.get('/', notifications.list)
router.post('/', notifications.create)
router.delete('/:id', notifications.remove)

// POST /api/notifications/read-all
router.post(
  '/read-all',
  asyncHandler(async (req, res) => {
    await Notification.updateMany({ user: req.userId, read: false }, { read: true })
    res.json({ message: 'All marked read' })
  }),
)

export default router
