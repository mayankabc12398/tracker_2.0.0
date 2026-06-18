

import { asyncHandler } from '../middleware/error.js'


/**
 * Generates owner-scoped CRUD handlers for any Mongoose model that has a
 * `user` field. Supports pagination (?page, ?limit), search (?q on `title`/`name`)
 * and filtering by an allow-listed field.
 */
export function crudFactory(model, opts = {}) {
  const { searchFields = ['title', 'name'], filterField } = opts

  const list = asyncHandler(async (req, res) => {
    const page = Math.max(1, parseInt((req.query.page ) ?? '1', 10))
    const limit = Math.min(100, parseInt((req.query.limit ) ?? '50', 10))
    const query = { user: req.userId }

    if (req.query.q) {
      query.$or = searchFields.map((f) => ({ [f]: { $regex: req.query.q, $options: 'i' } }))
    }
    if (filterField && req.query[filterField]) {
      query[filterField] = req.query[filterField]
    }

    const [items, total] = await Promise.all([
      model.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      model.countDocuments(query),
    ])
    res.json({ items, total, page, pages: Math.ceil(total / limit) })
  })

  const getOne = asyncHandler(async (req, res) => {
    const item = await model.findOne({ _id: req.params.id, user: req.userId })
    if (!item) return res.status(404).json({ message: 'Not found' })
    res.json(item)
  })

  const create = asyncHandler(async (req, res) => {
    const item = await model.create({ ...req.body, user: req.userId })
    res.status(201).json(item)
  })

  const update = asyncHandler(async (req, res) => {
    const item = await model.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true, runValidators: true },
    )
    if (!item) return res.status(404).json({ message: 'Not found' })
    res.json(item)
  })

  const remove = asyncHandler(async (req, res) => {
    const item = await model.findOneAndDelete({ _id: req.params.id, user: req.userId })
    if (!item) return res.status(404).json({ message: 'Not found' })
    res.json({ message: 'Deleted', id: req.params.id })
  })

  return { list, getOne, create, update, remove }
}
