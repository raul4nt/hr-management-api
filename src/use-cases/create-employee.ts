import { EmployeesRepository } from '@/repositories/employees-repository'
import { Prisma, Employee } from '@prisma/client'

interface CreateEmployeeUseCaseRequest extends Omit<Prisma.EmployeeCreateInput, 'benefits'> {
  benefitIds?: string[]
  photoUrl?: string
}

interface CreateEmployeeUseCaseResponse {
  employee: Employee
}

export class CreateEmployeeUseCase {
  constructor(private employeesRepository: EmployeesRepository) {}

  async execute(
    data: CreateEmployeeUseCaseRequest,
  ): Promise<CreateEmployeeUseCaseResponse> {
    const { benefitIds, ...employeeData } = data

    const employee = await this.employeesRepository.create(employeeData)

    if (benefitIds && benefitIds.length > 0) {
      for (const benefitId of benefitIds) {
        await this.employeesRepository.addBenefitToEmployee(employee.id, benefitId)
      }
    }

    return {
      employee,
    }
  }
}
