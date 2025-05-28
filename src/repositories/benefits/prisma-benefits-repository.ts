import { prisma } from '@/lib/prisma'
import { Benefit, Prisma } from '@prisma/client'

export class PrismaBenefitsRepository {
  async findById(id: string): Promise<Benefit | null> {
    return await prisma.benefit.findUnique({ where: { id } })
  }

  async findAll(): Promise<Benefit[]> {
    return await prisma.benefit.findMany()
  }

  async create(data: Prisma.BenefitCreateInput): Promise<Benefit> {
    return await prisma.benefit.create({ data })
  }

  async update(id: string, data: Prisma.BenefitUpdateInput): Promise<Benefit> {
    return await prisma.benefit.update({
      where: { id },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.benefit.delete({ where: { id } })
  }
}
