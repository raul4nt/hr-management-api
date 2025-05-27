import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { FindPositionByIdUseCase } from '@/use-cases/find-position-by-id'
import { PrismaPositionsRepository } from '@/repositories/prisma/prisma-positions-repository'

export async function find(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(request.params)

  const positionsRepository = new PrismaPositionsRepository()
  const useCase = new FindPositionByIdUseCase(positionsRepository)

  const { position } = await useCase.execute({ id })

  if (!position) {
    return reply.status(404).send({ message: 'Position not found.' })
  }

  return reply.status(200).send({ position })
}
