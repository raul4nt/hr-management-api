import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryPositionsRepository } from '@/repositories/in-memory/in-memory-positions-repository'
import { FindPositionByIdUseCase } from './find-position-by-id'

let positionsRepository: InMemoryPositionsRepository
let sut: FindPositionByIdUseCase

describe('Find Position By Id Use Case', () => {
  beforeEach(() => {
    positionsRepository = new InMemoryPositionsRepository()
    sut = new FindPositionByIdUseCase(positionsRepository)
  })

  it('should return the position with given id', async () => {
    const position = await positionsRepository.create({
      title: 'Software Engineer',
      salary: 85000,
    })

    const { position: foundPosition } = await sut.execute({ id: position.id })

    expect(foundPosition).not.toBeNull()
    expect(foundPosition?.id).toBe(position.id)
    expect(foundPosition?.title).toBe('Software Engineer')
  })

  it('should return null if position not found', async () => {
    const { position: foundPosition } = await sut.execute({ id: 'non-existing-id' })

    expect(foundPosition).toBeNull()
  })
})
