import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees-repository'
import { FindAllEmployeesUseCase } from '../find-all-employees'

export function makeFindAllEmployeesUseCase() {
  const employeesRepository = new PrismaEmployeesRepository()
  const useCase = new FindAllEmployeesUseCase(employeesRepository)

  return useCase
}
