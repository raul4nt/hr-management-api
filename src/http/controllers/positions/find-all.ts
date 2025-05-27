import { FastifyRequest, FastifyReply } from 'fastify'
import { FindAllPositionsUseCase } from '@/use-cases/find-all-positions'
import { PrismaPositionsRepository } from '@/repositories/prisma/prisma-positions-repository'

export async function findAll(request: FastifyRequest, reply: FastifyReply) {
  const positionsRepository = new PrismaPositionsRepository()
  const useCase = new FindAllPositionsUseCase(positionsRepository)

  const { positions } = await useCase.execute()

  return reply.status(200).send({ positions })
}
