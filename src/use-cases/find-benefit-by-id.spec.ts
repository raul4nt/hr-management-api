import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryBenefitsRepository } from '@/repositories/in-memory/in-memory-benefits-repository'
import { FindBenefitByIdUseCase } from './find-benefit-by-id'

let benefitsRepository: InMemoryBenefitsRepository
let sut: FindBenefitByIdUseCase

describe('Find Benefit By Id Use Case', () => {
  beforeEach(() => {
    benefitsRepository = new InMemoryBenefitsRepository()
    sut = new FindBenefitByIdUseCase(benefitsRepository)
  })

  it('should return the benefit with given id', async () => {
    const benefit = await benefitsRepository.create({
      name: 'Health Insurance',
      value: 700
    })

    const { benefit: foundBenefit } = await sut.execute({ id: benefit.id })

    expect(foundBenefit).not.toBeNull()
    expect(foundBenefit?.id).toBe(benefit.id)
    expect(foundBenefit?.name).toBe('Health Insurance')
    expect(foundBenefit?.value).toBe(700)
  })

  it('should return null if benefit not found', async () => {
    const { benefit: foundBenefit } = await sut.execute({ id: 'non-existing-id' })

    expect(foundBenefit).toBeNull()
  })
})
