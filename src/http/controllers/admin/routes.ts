import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'

export async function adminsRoutes(app: FastifyInstance) {
  app.post('/admins', register)
  app.post('/sessions', authenticate)
}
