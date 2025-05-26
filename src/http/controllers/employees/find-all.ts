import { FastifyRequest, FastifyReply } from 'fastify'
import { FindAllEmployeesUseCase } from '@/use-cases/find-all-employees'
import { InMemoryEmployeesRepository } from '@/repositories/in-memory/in-memory-employees-repository'

export async function findAll(_: FastifyRequest, reply: FastifyReply) {
  const employeesRepository = new InMemoryEmployeesRepository()
  const useCase = new FindAllEmployeesUseCase(employeesRepository)

  const { employees } = await useCase.execute()

  return reply.status(200).send({ employees })
}
