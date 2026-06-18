import { Router } from 'express'
import { Habit } from '../models/Habit.js'
import { crudFactory } from '../controllers/crud.factory.js'
import { protect, } from '../middleware/auth.js'
import { asyncHandler } from '../middleware/error.js'


const router = Router()
const habits = crudFactory(Habit, { searchFields: ['name'], filterField: 'section' })

router.use(protect)
router.get('/', habits.list)
router.post('/', habits.create)
router.get('/:id', habits.getOne)
router.patch('/:id', habits.update)
router.delete('/:id', habits.remove)

// POST /api/habits/:id/toggle  { date }
router.post(
  '/:id/toggle',
  asyncHandler(async (req, res) => {
    const date = req.body.date ?? new Date().toISOString().slice(0, 10)
    const habit = await Habit.findOne({ _id: req.params.id, user: req.userId })
    if (!habit) return res.status(404).json({ message: 'Not found' })
    const current = habit.completions.get(date) ?? false
    habit.completions.set(date, !current)
    await habit.save()
    res.json(habit)
  }),
)

export default router
