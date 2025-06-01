import { BenefitsRepository } from '@/repositories/benefits-repository'
import { Benefit, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryBenefitsRepository implements BenefitsRepository {
  public items: Benefit[] = []

  async findById(id: string): Promise<Benefit | null> {
    const benefit = this.items.find((item) => item.id === id)
    return benefit ?? null
  }

  async findAll(): Promise<Benefit[]> {
    return this.items
  }

  async create(data: Prisma.BenefitCreateInput): Promise<Benefit> {
    const benefit: Benefit = {
      id: randomUUID(),
      name: data.name,
      value: data.value,
    }

    this.items.push(benefit)
    return benefit
  }

  async update(id: string, data: Prisma.BenefitUpdateInput): Promise<Benefit> {
    const index = this.items.findIndex((item) => item.id === id)
    if (index === -1) throw new Error('Benefit not found')

    const existing = this.items[index]

    const updatedBenefit: Benefit = {
      ...existing,
      name: data.name?.toString() ?? existing.name,
      value: typeof data.value === 'number' ? data.value : existing.value,
    }

    this.items[index] = updatedBenefit
    return updatedBenefit
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id === id)
    if (index === -1) throw new Error('Benefit not found')

    this.items.splice(index, 1)
  }
}
