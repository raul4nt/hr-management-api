import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateEmployeeUseCase } from '@/use-cases/factories/make-create-employee-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    positionId: z.string().uuid().optional(),
  })

  const { name, email, positionId } = bodySchema.parse(request.body)

  const useCase = makeCreateEmployeeUseCase()

  const { employee } = await useCase.execute({
    name,
    email,
    position: positionId ? { connect: { id: positionId } } : undefined,
  })

  return reply.status(201).send({ employee })
}
