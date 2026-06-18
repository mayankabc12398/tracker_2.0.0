import { Router } from 'express'

import { LearningCategory, LearningTopic } from '../models/Learning.js'
import { crudFactory } from '../controllers/crud.factory.js'
import { protect, } from '../middleware/auth.js'
import { asyncHandler } from '../middleware/error.js'

const router = Router()
const categories = crudFactory(LearningCategory, { searchFields: ['name'] })
const topics = crudFactory(LearningTopic, { searchFields: ['title', 'tags'], filterField: 'category' })

router.use(protect)

// Categories
router.get('/categories', categories.list)
router.post('/categories', categories.create)
router.delete('/categories/:id', categories.remove)

// Topics
router.get('/topics', topics.list)
router.post('/topics', topics.create)
router.get('/topics/:id', topics.getOne)
router.delete('/topics/:id', topics.remove)

// PATCH /api/learning/topics/:id — also appends a version-history entry.
router.patch(
  '/topics/:id',
  asyncHandler(async (req, res) => {
    const topic = await LearningTopic.findOne({ _id: req.params.id, user: req.userId })
    if (!topic) return res.status(404).json({ message: 'Not found' })
    Object.assign(topic, req.body)
    const version = (topic.history.at(-1)?.version ?? 0) + 1
    topic.history.push({ change: req.body._change ?? 'Updated topic', version, date: new Date() })
    await topic.save()
    res.json(topic)
  }),
)

export default router
