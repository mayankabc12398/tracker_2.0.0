import dotenv from 'dotenv'
dotenv.config()

function required(key, fallback) {
  const v = process.env[key] ?? fallback
  if (v === undefined) throw new Error(`Missing required env var: ${key}`)
  return v
}

export const env = {
  PORT: parseInt(process.env.PORT ?? '4000', 10),
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  MONGODB_URI: required('MONGODB_URI', 'mongodb://127.0.0.1:27017/lifeflow'),
  JWT_SECRET: required('JWT_SECRET', 'dev-secret-change-me'),
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '7d',
  CLIENT_URL: process.env.CLIENT_URL ?? 'http://localhost:5173',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? '',
}
