import { prisma } from '@/lib/prisma'
import { Prisma, Employee } from '@prisma/client'
import { EmployeesRepository } from '@/repositories/employees-repository'

export class PrismaEmployeesRepository implements EmployeesRepository {
  async findById(id: string): Promise<Employee | null> {
    const employee = await prisma.employee.findUnique({
      where: { id },
    })
    return employee
  }

  async findAll(): Promise<Employee[]> {
    const employees = await prisma.employee.findMany()
    return employees
  }

  async create(data: Prisma.EmployeeCreateInput): Promise<Employee> {
    const employee = await prisma.employee.create({
      data,
    })
    return employee
  }

  async update(
    id: string,
    data: Prisma.EmployeeUpdateInput,
  ): Promise<Employee> {
    const employee = await prisma.employee.update({
      where: { id },
      data,
    })
    return employee
  }

  async delete(id: string): Promise<void> {
    await prisma.employee.delete({
      where: { id },
    })
  }
}
