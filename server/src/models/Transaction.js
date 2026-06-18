import { Schema, model, Types } from 'mongoose'

const transactionSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true, index: true },
    type: { type: String, enum: ['expense', 'income'], default: 'expense' },
    title: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      enum: ['Food', 'Shopping', 'Travel', 'Bills', 'Entertainment', 'Others'],
      default: 'Others',
    },
    date: { type: Date, required: true, default: Date.now, index: true },
    note: { type: String, default: '' },
  },
  { timestamps: true },
)

export const Transaction = model('Transaction', transactionSchema)
