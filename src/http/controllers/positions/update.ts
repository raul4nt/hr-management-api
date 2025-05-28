import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeUpdatePositionUseCase } from '@/use-cases/factories/make-update-position-use-case'

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

  const useCase = makeUpdatePositionUseCase()

  const { position } = await useCase.execute({
    id,
    data: {
      title,
      salary,
    },
  })

  return reply.status(200).send({ position })
}
