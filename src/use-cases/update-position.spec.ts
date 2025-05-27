import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryPositionsRepository } from '@/repositories/in-memory/in-memory-positions-repository'
import { UpdatePositionUseCase } from './update-position'

let positionsRepository: InMemoryPositionsRepository
let sut: UpdatePositionUseCase

describe('Update Position Use Case', () => {
  beforeEach(() => {
    positionsRepository = new InMemoryPositionsRepository()
    sut = new UpdatePositionUseCase(positionsRepository)
  })

  it('should update an existing position', async () => {
    const position = await positionsRepository.create({
      title: 'Junior Developer',
      salary: 50000,
    })

    const { position: updatedPosition } = await sut.execute({
      id: position.id,
      data: {
        title: 'Senior Developer',
        salary: 90000,
      },
    })

    expect(updatedPosition.title).toBe('Senior Developer')
    expect(updatedPosition.salary).toBe(90000)
  })

  it('should throw error if position not found', async () => {
    await expect(() =>
      sut.execute({
        id: 'non-existing-id',
        data: { title: 'Ghost Position' },
      }),
    ).rejects.toThrow()
  })
})
