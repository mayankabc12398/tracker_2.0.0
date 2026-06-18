
import { ZodError } from 'zod'

/** Wrap async controllers so thrown errors reach the error handler. */
export const asyncHandler =
  (fn) =>
  (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next)

export function notFound(_req, res) {
  res.status(404).json({ message: 'Route not found' })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err, _req, res, _next) {
  if (err instanceof ZodError) {
    return res.status(422).json({ message: 'Validation failed', errors: err.flatten().fieldErrors })
  }
  const e = err 
  if (e.code === 11000) return res.status(409).json({ message: 'Resource already exists' })
  const status = e.statusCode ?? 500
  console.error('API error:', e.message ?? err)
  res.status(status).json({ message: e.message ?? 'Internal server error' })
}
