import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreatePositionUseCase } from '@/use-cases/factories/make-create-position-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    title: z.string(),
    salary: z.number(),
  })

  const { title, salary } = bodySchema.parse(request.body)

  const useCase = makeCreatePositionUseCase()

  const { position } = await useCase.execute({
    title,
    salary,
  })

  return reply.status(201).send({ position })
}
