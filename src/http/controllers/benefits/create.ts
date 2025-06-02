import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateBenefitUseCase } from '@/use-cases/factories/make-create-benefit-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    value: z.number(),
  })

  const { name, value } = bodySchema.parse(request.body)

  const useCase = makeCreateBenefitUseCase()

  const { benefit } = await useCase.execute({
    name,
    value,
  })

  return reply.status(201).send({ benefit })
}
