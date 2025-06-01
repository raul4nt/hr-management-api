import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryBenefitsRepository } from '@/repositories/in-memory/in-memory-benefits-repository'
import { FindAllBenefitsUseCase } from './find-all-benefits'

let benefitsRepository: InMemoryBenefitsRepository
let sut: FindAllBenefitsUseCase

describe('Find All Benefits Use Case', () => {
  beforeEach(() => {
    benefitsRepository = new InMemoryBenefitsRepository()
    sut = new FindAllBenefitsUseCase(benefitsRepository)
  })

  it('should return all benefits', async () => {
    await benefitsRepository.create({
      name: 'Health Insurance',
      value: 700
    })

    await benefitsRepository.create({
      name: 'Life Insurance',
      value: 1200,
    })

    const { benefits } = await sut.execute()

    expect(benefits.length).toBe(2)
    expect(benefits[0].name).toBe('Health Insurance')
    expect(benefits[1].name).toBe('Life Insurance')
    expect(benefits[0].value).toBe(700)
    expect(benefits[1].value).toBe(1200)
  })
})
