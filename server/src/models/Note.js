import { Schema, model, Types } from 'mongoose'

const noteSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true, index: true },
    topic: { type: Types.ObjectId, ref: 'LearningTopic', index: true },
    title: { type: String, default: 'Untitled' },
    body: { type: String, default: '' },
    pinned: { type: Boolean, default: false },
  },
  { timestamps: true },
)

export const Note = model('Note', noteSchema)
