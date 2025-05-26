import { EmployeesRepository } from '@/repositories/employees-repository'

interface DeleteEmployeeUseCaseRequest {
  id: string
}

export class DeleteEmployeeUseCase {
  constructor(private employeesRepository: EmployeesRepository) {}

  async execute({ id }: DeleteEmployeeUseCaseRequest): Promise<void> {
    await this.employeesRepository.delete(id)
  }
}
