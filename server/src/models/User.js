import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'



















const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    password: { type: String, select: false, minlength: 6 },
    avatar: { type: String, default: '' },
    bio: { type: String, default: '' },
    googleId: { type: String, index: true, sparse: true },
    settings: {
      theme: { type: String, enum: ['dark', 'light'], default: 'dark' },
      language: { type: String, default: 'English' },
      timezone: { type: String, default: 'UTC' },
      currency: { type: String, default: 'USD' },
      accent: { type: String, default: '#6366F1' },
      notifications: {
        type: Map,
        of: Boolean,
        default: { habits: true, goals: true, expenses: true, water: true, exercise: false },
      },
    },
  },
  { timestamps: true },
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password ?? '')
}

export const User = model('User', userSchema)
