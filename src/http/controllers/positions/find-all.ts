import { FastifyRequest, FastifyReply } from 'fastify'
import { makeFindAllPositionsUseCase } from '@/use-cases/factories/make-find-all-positions-use-case'

export async function findAll(request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeFindAllPositionsUseCase()

  const { positions } = await useCase.execute()

  return reply.status(200).send({ positions })
}
