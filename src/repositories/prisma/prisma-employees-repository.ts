import { prisma } from '@/lib/prisma'
import { Prisma, Employee } from '@prisma/client'
import { EmployeesRepository } from '@/repositories/employees-repository'

export class PrismaEmployeesRepository implements EmployeesRepository {
  async findById(id: string) {
    const employee = await prisma.employee.findUnique({
      where: { id },
      include: {
        position: true,
        benefits: {
          include: {
            benefit: true,
          },
        },
      },
    })
    return employee
  }

 async findAll(): Promise<Employee[]> {
    const employees = await prisma.employee.findMany({
      include: {
        position: true,
        benefits: {
          include: {
            benefit: true,
          },
        },
      },
    })
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

  async addBenefitToEmployee(employeeId: string, benefitId: string): Promise<void> {
    await prisma.employeeBenefit.create({
      data: {
        employeeId,
        benefitId,
      },
    })
  }
}
