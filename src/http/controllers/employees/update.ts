import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeUpdateEmployeeUseCase } from '@/use-cases/factories/make-update-employee-use-case'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const bodySchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    positionId: z.string().uuid().nullable().optional(),
  })

  const { id } = paramsSchema.parse(request.params)
  const { name, email, positionId } = bodySchema.parse(request.body)

  const useCase = makeUpdateEmployeeUseCase()

  const { employee } = await useCase.execute({
    id,
    data: {
      name,
      email,
      position: positionId !== undefined
        ? positionId
          ? { connect: { id: positionId } }
          : { disconnect: true }
        : undefined,
    },
  })

  return reply.status(200).send({ employee })
}
