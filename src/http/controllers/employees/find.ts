import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFindEmployeeByIdUseCase } from '@/use-cases/factories/make-find-employee-by-id-use-case'

export async function find(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(request.params)

  const useCase = makeFindEmployeeByIdUseCase()

  const { employee } = await useCase.execute({ id })

  if (!employee) {
    return reply.status(404).send({ message: 'Employee not found.' })
  }

  return reply.status(200).send({ employee })
}
