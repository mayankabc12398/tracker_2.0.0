import { Router } from 'express'
import { updateProfile, updateSettings } from '../controllers/profile.controller.js'
import { protect } from '../middleware/auth.js'

const router = Router()
router.use(protect)
router.patch('/', updateProfile)
router.patch('/settings', updateSettings)

export default router
