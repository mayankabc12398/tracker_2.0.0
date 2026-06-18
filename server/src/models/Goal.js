import { Schema, model, Types } from 'mongoose'

const milestoneSchema = new Schema(
  {
    title: { type: String, required: true },
    done: { type: Boolean, default: false },
  },
  { _id: true },
)

const goalSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['Fitness', 'Career', 'Finance', 'Personal Growth'],
      default: 'Personal Growth',
    },
    progress: { type: Number, min: 0, max: 100, default: 0 },
    deadline: { type: Date },
    milestones: [milestoneSchema],
  },
  { timestamps: true },
)

export const Goal = model('Goal', goalSchema)
