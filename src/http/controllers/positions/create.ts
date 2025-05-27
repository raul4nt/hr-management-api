import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { CreatePositionUseCase } from '@/use-cases/create-position'
import { PrismaPositionsRepository } from '@/repositories/prisma/prisma-positions-repository'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    title: z.string(),
    salary: z.number(),
  })

  const { title, salary } = bodySchema.parse(request.body)

  const positionsRepository = new PrismaPositionsRepository()
  const useCase = new CreatePositionUseCase(positionsRepository)

  const { position } = await useCase.execute({
    title,
    salary,
  })

  return reply.status(201).send({ position })
}
