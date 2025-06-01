import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeUpdateBenefitUseCase } from '@/use-cases/factories/make-update-benefit-use-case'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const bodySchema = z.object({
    name: z.string().optional(),
    value: z.number().optional(),
  })

  const { id } = paramsSchema.parse(request.params)
  const { name, value } = bodySchema.parse(request.body)

  const useCase = makeUpdateBenefitUseCase()

  const { benefit } = await useCase.execute({
    id,
    data: {
      name,
      value,
    },
  })

  return reply.status(200).send({ benefit })
}
