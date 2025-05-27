import { FastifyRequest, FastifyReply } from 'fastify'
import { FindAllEmployeesUseCase } from '@/use-cases/find-all-employees'
import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees-repository'

export async function findAll(request: FastifyRequest, reply: FastifyReply) {
  const employeesRepository = new PrismaEmployeesRepository()
  const useCase = new FindAllEmployeesUseCase(employeesRepository)

  const { employees } = await useCase.execute()

  return reply.status(200).send({ employees })
}
