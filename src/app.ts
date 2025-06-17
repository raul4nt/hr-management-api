// app.ts
import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import multer from 'fastify-multer'
import cors from '@fastify/cors' // Certifique-se de que está importando

import { employeesRoutes } from './http/controllers/employees/routes'
import { env } from './env'
import { ZodError } from 'zod'
import { adminsRoutes } from './http/controllers/admin/routes'
import { positionsRoutes } from './http/controllers/positions/routes'
import { benefitsRoutes } from './http/controllers/benefits/routes'
import { uploadRoutes } from './upload'

export async function buildApp() {
  const app = fastify()

  await app.register(cors, {
    origin: '*', // Permite qualquer origem (ideal para desenvolvimento)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // <-- ADICIONE OU EDITE ESTA LINHA
    allowedHeaders: ['Content-Type', 'Authorization'], // <-- Opcional, mas boa prática para APIs com JWT ou JSON
  })

  app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
      cookieName: 'refreshToken',
      signed: false,
    },
    sign: {
      expiresIn: '10m',
    },
  })

  app.register(fastifyCookie)
  app.register(multer.contentParser)

  app.register(employeesRoutes)
  app.register(adminsRoutes)
  app.register(positionsRoutes)
  app.register(benefitsRoutes)
  app.register(uploadRoutes)

  app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
      return reply
        .status(400)
        .send({ message: 'Validation error.', issues: error.format() })
    }

    if (env.NODE_ENV !== 'production') {
      console.error(error)
    }

    return reply.status(500).send({ message: 'Internal server error.' })
  })

  return app
}