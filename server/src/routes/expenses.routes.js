import { Router } from 'express'
import { Transaction } from '../models/Transaction.js'
import { crudFactory } from '../controllers/crud.factory.js'
import { protect } from '../middleware/auth.js'

const router = Router()
const txns = crudFactory(Transaction, { searchFields: ['title'], filterField: 'category' })

router.use(protect)
router.get('/', txns.list)
router.post('/', txns.create)
router.get('/:id', txns.getOne)
router.patch('/:id', txns.update)
router.delete('/:id', txns.remove)

export default router
