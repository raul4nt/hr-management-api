import { FastifyInstance } from 'fastify'
import { create } from './create'
import { update } from './update'
import { remove } from './delete'
import { find } from './find'
import { findAll } from './find-all'


export async function employeesRoutes(app: FastifyInstance) {
  app.post('/employees', create)

  app.put('/employees/:id', update)

  app.delete('/employees/:id', remove)

  app.get('/employees/:id', find)

  app.get('/employees', findAll)
}
