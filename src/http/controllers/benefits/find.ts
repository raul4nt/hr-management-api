import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFindBenefitByIdUseCase } from '@/use-cases/factories/make-find-benefit-by-id-use-case'

export async function find(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(request.params)

  const useCase = makeFindBenefitByIdUseCase()

  const { benefit } = await useCase.execute({ id })

  if (!benefit) {
    return reply.status(404).send({ message: 'Benefit not found.' })
  }

  return reply.status(200).send({ benefit })
}
