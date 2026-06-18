
import { User } from '../models/User.js'
import { asyncHandler } from '../middleware/error.js'


// PATCH /api/profile
export const updateProfile = asyncHandler(async (req, res) => {
  const allowed = ['name', 'avatar', 'bio'] 
  const patch = {}
  for (const k of allowed) if (k in req.body) patch[k] = req.body[k]
  const user = await User.findByIdAndUpdate(req.userId, patch, { new: true })
  res.json({ user })
})

// PATCH /api/profile/settings
export const updateSettings = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.userId,
    { $set: { settings: req.body } },
    { new: true },
  )
  res.json({ settings: user?.settings })
})
