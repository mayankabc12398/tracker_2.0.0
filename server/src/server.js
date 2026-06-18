import { createApp } from './app.js'
import { connectDB } from './config/db.js'
import { env } from './config/env.js'

async function bootstrap() {
  await connectDB()
  const app = createApp()
  app.listen(env.PORT, () => {
    console.log(`🚀 LifeFlow API running at http://localhost:${env.PORT}`)
    console.log(`   Health: http://localhost:${env.PORT}/api/health`)
  })
}

bootstrap().catch((err) => {
  console.error('Failed to start server:', err)
  process.exit(1)
})
