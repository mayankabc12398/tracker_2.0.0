
import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'





export function signToken(userId) {
  return jwt.sign({ sub: userId }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN } )
}

/** Verifies the `Authorization: Bearer <token>` header and attaches userId. */
export function protect(req, res, next) {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authenticated' })
  }
  try {
    const decoded = jwt.verify(header.split(' ')[1], env.JWT_SECRET) 
    req.userId = decoded.sub
    next()
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' })
  }
}
