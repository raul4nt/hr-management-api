// server.ts
import { buildApp } from './app'
import { env } from './env'

async function bootstrap() {
  const app = await buildApp()

  await app.listen({
    host: '0.0.0.0',
    port: env.PORT,
  })

  console.log('🚀 HTTP Server Running!')
}

bootstrap()
