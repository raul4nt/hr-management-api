import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryBenefitsRepository } from '@/repositories/in-memory/in-memory-benefits-repository'
import { DeleteBenefitUseCase } from './delete-benefit'

let benefitsRepository: InMemoryBenefitsRepository
let sut: DeleteBenefitUseCase

describe('Delete Benefit Use Case', () => {
  beforeEach(() => {
    benefitsRepository = new InMemoryBenefitsRepository()
    sut = new DeleteBenefitUseCase(benefitsRepository)
  })

  it('should delete an existing benefit', async () => {
    const benefit = await benefitsRepository.create({
      name: 'Health Insurance',
      value: 700
    })

    await sut.execute({ id: benefit.id })

    const allBenefits = await benefitsRepository.findAll()
    expect(allBenefits.length).toBe(0)
  })

  it('should throw error if benefit not found', async () => {
    await expect(() =>
      sut.execute({ id: 'non-existing-id' }),
    ).rejects.toThrow()
  })
})
