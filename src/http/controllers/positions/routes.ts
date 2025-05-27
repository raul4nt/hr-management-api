import { FastifyInstance } from 'fastify'
import { create } from './create'
import { update } from './update'
import { remove } from './delete'
import { find } from './find'
import { findAll } from './find-all'

export async function positionsRoutes(app: FastifyInstance) {
  app.post('/positions', create)

  app.put('/positions/:id', update)

  app.delete('/positions/:id', remove)

  app.get('/positions/:id', find)

  app.get('/positions', findAll)
}
