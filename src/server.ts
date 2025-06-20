// server.ts
import { app } from './app'
import { env } from './env'

async function bootstrap() {
  try {
    await app.listen({
      host: '0.0.0.0',
      port: env.PORT,
    })

    console.log(`🚀 HTTP Server Running on port ${env.PORT}!`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

bootstrap()
