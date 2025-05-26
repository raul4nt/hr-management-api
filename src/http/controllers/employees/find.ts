import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { FindEmployeeByIdUseCase } from '@/use-cases/find-employee-by-id'
import { InMemoryEmployeesRepository } from '@/repositories/in-memory/in-memory-employees-repository'

export async function find(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(request.params)

  const employeesRepository = new InMemoryEmployeesRepository()
  const useCase = new FindEmployeeByIdUseCase(employeesRepository)

  const { employee } = await useCase.execute({ id })

  if (!employee) {
    return reply.status(404).send({ message: 'Employee not found.' })
  }

  return reply.status(200).send({ employee })
}
