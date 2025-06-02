import { FastifyInstance } from 'fastify'
import {
  createBenefit,
  deleteBenefit,
  getBenefit,
  listBenefits,
  updateBenefit,
} from './benefits-controller'

export async function benefitsRoutes(app: FastifyInstance) {
  app.post('/benefits', createBenefit)

  app.put('/benefits/:id', updateBenefit)

  app.delete('/benefits/:id', deleteBenefit)

  app.get('/benefits/:id', getBenefit)

  app.get('/benefits', listBenefits)
}
