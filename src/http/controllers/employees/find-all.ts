import { FastifyRequest, FastifyReply } from 'fastify'
import { makeFindAllEmployeesUseCase } from '@/use-cases/factories/make-find-all-employees-use-case'

export async function findAll(request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeFindAllEmployeesUseCase()

  const { employees } = await useCase.execute()

  return reply.status(200).send({ employees })
}
