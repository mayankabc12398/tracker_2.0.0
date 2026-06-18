import { Schema, model, Types } from 'mongoose'

const habitSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true, trim: true },
    icon: { type: String, default: '✅' },
    section: { type: String, enum: ['Morning', 'Work', 'Evening'], default: 'Morning' },
    color: { type: String, default: '#6366F1' },
    // Map of YYYY-MM-DD -> boolean
    completions: { type: Map, of: Boolean, default: {} },
  },
  { timestamps: true },
)

export const Habit = model('Habit', habitSchema)
