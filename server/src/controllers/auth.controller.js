
import { z } from 'zod'
import { OAuth2Client } from 'google-auth-library'
import { User } from '../models/User.js'
import { signToken, } from '../middleware/auth.js'
import { asyncHandler } from '../middleware/error.js'
import { env } from '../config/env.js'

const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID)

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
})
const loginSchema = z.object({ email: z.string().email(), password: z.string() })

function sanitize(user) {
  const { password, __v, ...rest } = user.toObject()
  return rest
}

// POST /api/auth/register
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = registerSchema.parse(req.body)
  const exists = await User.findOne({ email })
  if (exists) return res.status(409).json({ message: 'Email already registered' })
  const user = await User.create({ name, email, password })
  res.status(201).json({ token: signToken(user.id), user: sanitize(user) })
})

// POST /api/auth/login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = loginSchema.parse(req.body)
  const user = await User.findOne({ email }).select('+password')
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }
  res.json({ token: signToken(user.id), user: sanitize(user) })
})

// POST /api/auth/google  { credential }
export const googleLogin = asyncHandler(async (req, res) => {
  const { credential } = req.body
  const ticket = await googleClient.verifyIdToken({ idToken: credential, audience: env.GOOGLE_CLIENT_ID })
  const payload = ticket.getPayload()
  if (!payload?.email) return res.status(401).json({ message: 'Google authentication failed' })

  let user = await User.findOne({ email: payload.email })
  if (!user) {
    user = await User.create({
      name: payload.name ?? payload.email,
      email: payload.email,
      avatar: payload.picture,
      googleId: payload.sub,
    })
  }
  res.json({ token: signToken(user.id), user: sanitize(user) })
})

// GET /api/auth/me
export const me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId)
  if (!user) return res.status(404).json({ message: 'User not found' })
  res.json({ user: sanitize(user) })
})
