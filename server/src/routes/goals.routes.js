import { Router } from 'express'
import { Goal } from '../models/Goal.js'
import { crudFactory } from '../controllers/crud.factory.js'
import { protect } from '../middleware/auth.js'

const router = Router()
const goals = crudFactory(Goal, { searchFields: ['title'], filterField: 'category' })

router.use(protect)
router.get('/', goals.list)
router.post('/', goals.create)
router.get('/:id', goals.getOne)
router.patch('/:id', goals.update)
router.delete('/:id', goals.remove)

export default router
