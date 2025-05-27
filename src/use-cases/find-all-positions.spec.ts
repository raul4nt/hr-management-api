import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryPositionsRepository } from '@/repositories/in-memory/in-memory-positions-repository'
import { FindAllPositionsUseCase } from './find-all-positions'

let positionsRepository: InMemoryPositionsRepository
let sut: FindAllPositionsUseCase

describe('Find All Positions Use Case', () => {
  beforeEach(() => {
    positionsRepository = new InMemoryPositionsRepository()
    sut = new FindAllPositionsUseCase(positionsRepository)
  })

  it('should return all positions', async () => {
    await positionsRepository.create({
      title: 'Software Engineer',
      salary: 85000,
    })

    await positionsRepository.create({
      title: 'Product Manager',
      salary: 95000,
    })

    const { positions } = await sut.execute()

    expect(positions.length).toBe(2)
    expect(positions[0].title).toBe('Software Engineer')
    expect(positions[1].title).toBe('Product Manager')
  })
})
