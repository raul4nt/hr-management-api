import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeDeleteBenefitUseCase } from '@/use-cases/factories/make-delete-benefit-use-case'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(request.params)

  const useCase = makeDeleteBenefitUseCase()

  await useCase.execute({ id })

  return reply.status(204).send()
}
