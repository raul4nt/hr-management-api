import { EmployeesRepository } from '@/repositories/employees-repository'
import { Prisma, Employee } from '@prisma/client'

interface CreateEmployeeUseCaseRequest extends Prisma.EmployeeCreateInput {}

interface CreateEmployeeUseCaseResponse {
  employee: Employee
}

export class CreateEmployeeUseCase {
  constructor(private employeesRepository: EmployeesRepository) {}

  async execute(
    data: CreateEmployeeUseCaseRequest,
  ): Promise<CreateEmployeeUseCaseResponse> {
    const employee = await this.employeesRepository.create(data)

    return {
      employee,
    }
  }
}
