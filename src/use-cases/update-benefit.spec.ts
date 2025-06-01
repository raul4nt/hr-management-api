import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryBenefitsRepository } from '@/repositories/in-memory/in-memory-benefits-repository'
import { UpdateBenefitUseCase } from './update-benefit'

let benefitsRepository: InMemoryBenefitsRepository
let sut: UpdateBenefitUseCase

describe('Update Benefit Use Case', () => {
  beforeEach(() => {
    benefitsRepository = new InMemoryBenefitsRepository()
    sut = new UpdateBenefitUseCase(benefitsRepository)
  })

  it('should update an existing benefit', async () => {
    const benefit = await benefitsRepository.create({
      name: 'Health Insurance',
      value: 700,
    })

    const { benefit: updatedBenefit } = await sut.execute({
      id: benefit.id,
      data: {
        name: 'Life Insurance',
      value: 1000,
      },
    })

    expect(updatedBenefit.name).toBe('Life Insurance')
    expect(updatedBenefit.value).toBe(1000)
  })

  it('should throw error if benefit not found', async () => {
    await expect(() =>
      sut.execute({
        id: 'non-existing-id',
        data: { name: 'Ghost Benefit' },
      }),
    ).rejects.toThrow()
  })
})
