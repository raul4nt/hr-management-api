import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UpdatePositionUseCase } from '@/use-cases/update-position'
import { PrismaPositionsRepository } from '@/repositories/prisma/prisma-positions-repository'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const bodySchema = z.object({
    title: z.string().optional(),
    salary: z.number().optional(),
  })

  const { id } = paramsSchema.parse(request.params)
  const { title, salary } = bodySchema.parse(request.body)

  const positionsRepository = new PrismaPositionsRepository()
  const useCase = new UpdatePositionUseCase(positionsRepository)

  const { position } = await useCase.execute({
    id,
    data: {
      title,
      salary,
    },
  })

  return reply.status(200).send({ position })
}
