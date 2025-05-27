import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { DeletePositionUseCase } from '@/use-cases/delete-position'
import { PrismaPositionsRepository } from '@/repositories/prisma/prisma-positions-repository'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(request.params)

  const positionsRepository = new PrismaPositionsRepository()
  const useCase = new DeletePositionUseCase(positionsRepository)

  await useCase.execute({ id })

  return reply.status(204).send()
}
