import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryPositionsRepository } from '@/repositories/in-memory/in-memory-positions-repository'
import { DeletePositionUseCase } from './delete-position'

let positionsRepository: InMemoryPositionsRepository
let sut: DeletePositionUseCase

describe('Delete Position Use Case', () => {
  beforeEach(() => {
    positionsRepository = new InMemoryPositionsRepository()
    sut = new DeletePositionUseCase(positionsRepository)
  })

  it('should delete an existing position', async () => {
    const position = await positionsRepository.create({
      title: 'Software Engineer',
      salary: 85000,
    })

    await sut.execute({ id: position.id })

    const allPositions = await positionsRepository.findAll()
    expect(allPositions.length).toBe(0)
  })

  it('should throw error if position not found', async () => {
    await expect(() => sut.execute({ id: 'non-existing-id' })).rejects.toThrow()
  })
})
