import { Prisma, Benefit } from '@prisma/client'

export interface BenefitsRepository {
  findById(id: string): Promise<Benefit | null>
  findAll(): Promise<Benefit[]>
  create(data: Prisma.BenefitCreateInput): Promise<Benefit>
  update(id: string, data: Prisma.BenefitUpdateInput): Promise<Benefit>
  delete(id: string): Promise<void>
}
