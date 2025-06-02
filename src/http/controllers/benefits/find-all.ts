import { FastifyRequest, FastifyReply } from 'fastify'
import { makeFindAllBenefitsUseCase } from '@/use-cases/factories/make-find-all-benefit-use-case'

export async function findAll(request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeFindAllBenefitsUseCase()

  const { benefits } = await useCase.execute()

  return reply.status(200).send({ benefits })
}
