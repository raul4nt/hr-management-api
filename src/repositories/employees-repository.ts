import { Prisma, Employee } from '@prisma/client'

export interface EmployeesRepository {
  findById(id: string): Promise<Employee | null>
  findAll(): Promise<Employee[]>
  create(data: Prisma.EmployeeCreateInput): Promise<Employee>
  update(id: string, data: Prisma.EmployeeUpdateInput): Promise<Employee>
  delete(id: string): Promise<void>
  addBenefitToEmployee(employeeId: string, benefitId: string): Promise<void>
}
