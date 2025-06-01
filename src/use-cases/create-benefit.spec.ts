import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryBenefitsRepository } from '@/repositories/in-memory/in-memory-benefits-repository'
import { CreateBenefitUseCase } from './create-benefit'

let benefitsRepository: InMemoryBenefitsRepository
let sut: CreateBenefitUseCase

describe('Create Benefit Use Case', () => {
  beforeEach(() => {
    benefitsRepository = new InMemoryBenefitsRepository()
    sut = new CreateBenefitUseCase(benefitsRepository)
  })

  it('should create a new benefit', async () => {
    const { benefit } = await sut.execute({
      name: 'Health Insurance',
      value: 700,
    })

    expect(benefit.id).toEqual(expect.any(String))
    expect(benefit.name).toBe('Health Insurance')
    expect(benefit.value).toBe(700)
  })
})
