import { EmployeesRepository } from '@/repositories/employees-repository'
import { Employee, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryEmployeesRepository implements EmployeesRepository {
  public items: Employee[] = []

  public employeeBenefits: Map<string, Set<string>> = new Map()

  async findById(id: string): Promise<Employee | null> {
    const employee = this.items.find((item) => item.id === id)
    return employee ?? null
  }

  async findAll(): Promise<Employee[]> {
    return this.items
  }

  async create(data: Prisma.EmployeeCreateInput): Promise<Employee> {
    const employee: Employee = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      positionId: data.position?.connect?.id ?? null,
      photoUrl: data.photoUrl ?? null,
      createdAt: new Date(),
    }

    this.items.push(employee)
    return employee
  }

  async update(
    id: string,
    data: Prisma.EmployeeUpdateInput,
  ): Promise<Employee> {
    const index = this.items.findIndex((item) => item.id === id)
    if (index === -1) throw new Error('Employee not found')

    const existing = this.items[index]

    const updatedEmployee: Employee = {
      ...existing,
      name: data.name?.toString() ?? existing.name,
      email: data.email?.toString() ?? existing.email,
      positionId:
        (data.position as Prisma.PositionUpdateOneWithoutEmployeesNestedInput)?.connect?.id ??
        existing.positionId,
      createdAt: existing.createdAt,
    }

    this.items[index] = updatedEmployee
    return updatedEmployee
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id === id)
    if (index === -1) throw new Error('Employee not found')

    this.items.splice(index, 1)
  }

  async addBenefitToEmployee(employeeId: string, benefitId: string): Promise<void> {
    const benefits = this.employeeBenefits.get(employeeId) ?? new Set()
    benefits.add(benefitId)
    this.employeeBenefits.set(employeeId, benefits)
  }
}
