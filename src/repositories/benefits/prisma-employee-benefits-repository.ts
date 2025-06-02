import { prisma } from '@/lib/prisma'

export class PrismaEmployeeBenefitsRepository {
  async addBenefitToEmployee(
    employeeId: string,
    benefitId: string,
  ): Promise<void> {
    await prisma.employeeBenefit.create({
      data: { employeeId, benefitId },
    })
  }

  async removeBenefitFromEmployee(
    employeeId: string,
    benefitId: string,
  ): Promise<void> {
    await prisma.employeeBenefit.delete({
      where: { employeeId_benefitId: { employeeId, benefitId } },
    })
  }

  async findBenefitsByEmployee(employeeId: string) {
    return await prisma.employeeBenefit.findMany({
      where: { employeeId },
      include: { benefit: true },
    })
  }
}
