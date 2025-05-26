import { EmployeesRepository } from '@/repositories/employees-repository'
import { Employee } from '@prisma/client'

interface FindEmployeeByIdUseCaseRequest {
  id: string
}

interface FindEmployeeByIdUseCaseResponse {
  employee: Employee | null
}

export class FindEmployeeByIdUseCase {
  constructor(private employeesRepository: EmployeesRepository) {}

  async execute({
    id,
  }: FindEmployeeByIdUseCaseRequest): Promise<FindEmployeeByIdUseCaseResponse> {
    const employee = await this.employeesRepository.findById(id)

    return {
      employee,
    }
  }
}
