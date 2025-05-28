import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFindPostionByIdUseCase } from '@/use-cases/factories/make-find-position-by-id-use-case'

export async function find(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(request.params)

  const useCase = makeFindPostionByIdUseCase()

  const { position } = await useCase.execute({ id })

  if (!position) {
    return reply.status(404).send({ message: 'Position not found.' })
  }

  return reply.status(200).send({ position })
}
