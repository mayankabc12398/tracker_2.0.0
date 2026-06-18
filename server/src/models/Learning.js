import { Schema, model, Types } from 'mongoose'

// ─── Learning Category (HTML, CSS, JS, …) ───
const learningCategorySchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true },
    icon: { type: String, default: '📘' },
    color: { type: String, default: '#6366F1' },
  },
  { timestamps: true },
)
export const LearningCategory = model('LearningCategory', learningCategorySchema)

// ─── Embedded version-history entry ───
const historySchema = new Schema(
  {
    change: { type: String, required: true },
    version: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { _id: false },
)

// ─── Learning Topic ───
const learningTopicSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true, index: true },
    category: { type: Types.ObjectId, ref: 'LearningCategory', required: true, index: true },
    title: { type: String, required: true },
    overview: { type: String, default: '' },
    syntax: { type: String, default: '' },
    examples: { type: String, default: '' },
    bestPractices: { type: String, default: '' },
    notes: { type: String, default: '' },
    interviewQuestions: { type: [String], default: [] },
    resources: { type: [{ label: String, url: String }], default: [] },
    tags: { type: [String], default: [] },
    related: { type: [Types.ObjectId], ref: 'LearningTopic', default: [] },
    progress: { type: Number, min: 0, max: 100, default: 0 },
    history: { type: [historySchema], default: [] },
  },
  { timestamps: true },
)
export const LearningTopic = model('LearningTopic', learningTopicSchema)
