import { Schema, model, Types } from 'mongoose'

const notificationSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true, index: true },
    type: {
      type: String,
      enum: ['Habit', 'Learning', 'Expense', 'Goal', 'Water', 'Exercise'],
      required: true,
    },
    title: { type: String, required: true },
    message: { type: String, default: '' },
    read: { type: Boolean, default: false },
  },
  { timestamps: true },
)

export const Notification = model('Notification', notificationSchema)
