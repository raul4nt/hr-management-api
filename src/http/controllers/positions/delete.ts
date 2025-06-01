import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeDeletePositionUseCase } from '@/use-cases/factories/make-delete-position-use-case'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(request.params)

  const useCase = makeDeletePositionUseCase()

  await useCase.execute({ id })

  return reply.status(204).send()
}
