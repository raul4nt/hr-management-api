import { prisma } from '@/lib/prisma'
import { Prisma, Employee } from '@prisma/client'
import { EmployeesRepository } from '../employees-repository'

export class PrismaEmployeesRepository implements EmployeesRepository {
  async findById(id: string): Promise<Employee | null> {
    return await prisma.employee.findUnique({
      where: { id },
      include: {
        position: true,
        benefits: {
          include: { benefit: true },
        },
      },
    })
  }

  async findAll(): Promise<Employee[]> {
    return await prisma.employee.findMany({
      include: {
        position: true,
        benefits: {
          include: { benefit: true },
        },
      },
    })
  }

  async create(data: Prisma.EmployeeCreateInput): Promise<Employee> {
    return prisma.employee.create({
      data,
      include: {
        benefits: { include: { benefit: true } },
        position: true,
      },
    })
  }

  async update(
    id: string,
    data: Prisma.EmployeeUpdateInput & { benefitIds?: string[] },
  ): Promise<Employee> {
    const { benefitIds, ...employeeData } = data

    return await prisma.employee.update({
      where: { id },
      data: {
        ...employeeData,
        ...(benefitIds
          ? {
              benefits: {
                deleteMany: { employeeId: id },
                create: benefitIds
                  .filter((id) => id)
                  .map((benefitId) => ({
                    benefit: { connect: { id: benefitId } },
                  })),
              },
            }
          : undefined),
      },
      include: {
        benefits: { include: { benefit: true } },
        position: true,
      },
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.employee.delete({ where: { id } })
  }

  async addBenefitToEmployee(
    employeeId: string,
    benefitId: string,
  ): Promise<void> {
    await prisma.employeeBenefit.create({
      data: {
        employeeId,
        benefitId,
      },
    })
  }
}
