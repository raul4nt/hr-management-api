import { EmployeesRepository } from '@/repositories/employees-repository'
import { Employee } from '@prisma/client'

interface FindAllEmployeesUseCaseResponse {
  employees: Employee[]
}

export class FindAllEmployeesUseCase {
  constructor(private employeesRepository: EmployeesRepository) {}

  async execute(): Promise<FindAllEmployeesUseCaseResponse> {
    const employees = await this.employeesRepository.findAll()

    return {
      employees,
    }
  }
}
