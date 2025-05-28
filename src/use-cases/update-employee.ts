import { EmployeesRepository } from '@/repositories/employees-repository'
import { Prisma, Employee } from '@prisma/client'

interface UpdateEmployeeUseCaseRequest {
  id: string
  data: Prisma.EmployeeUpdateInput & { benefitIds?: string[] }
}

interface UpdateEmployeeUseCaseResponse {
  employee: Employee
}

export class UpdateEmployeeUseCase {
  constructor(private employeesRepository: EmployeesRepository) {}

async execute({
  id,
  data,
}: UpdateEmployeeUseCaseRequest): Promise<UpdateEmployeeUseCaseResponse> {
  const employee = await this.employeesRepository.update(id, data)
  return { employee }
}

}
