import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryPositionsRepository } from '@/repositories/in-memory/in-memory-positions-repository'
import { CreatePositionUseCase } from './create-position'

let positionsRepository: InMemoryPositionsRepository
let sut: CreatePositionUseCase

describe('Create Position Use Case', () => {
  beforeEach(() => {
    positionsRepository = new InMemoryPositionsRepository()
    sut = new CreatePositionUseCase(positionsRepository)
  })

  it('should create a new position', async () => {
    const { position } = await sut.execute({
      title: 'Software Engineer',
      salary: 85000,
    })

    expect(position.id).toEqual(expect.any(String))
    expect(position.title).toBe('Software Engineer')
    expect(position.salary).toBe(85000)
  })
})
