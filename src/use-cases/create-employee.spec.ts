import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryEmployeesRepository } from '@/repositories/in-memory/in-memory-employees-repository'
import { CreateEmployeeUseCase } from './create-employee'

let employeesRepository: InMemoryEmployeesRepository
let sut: CreateEmployeeUseCase

describe('Create Employee Use Case', () => {
  beforeEach(() => {
    employeesRepository = new InMemoryEmployeesRepository()
    sut = new CreateEmployeeUseCase(employeesRepository)
  })

  it('should create a new employee without benefits', async () => {
    const { employee } = await sut.execute({
      name: 'John Doe',
      email: 'john@example.com',
      position: { connect: { id: 'position-01' } },
    })

    expect(employee.id).toEqual(expect.any(String))
    expect(employee.name).toBe('John Doe')
    expect(employee.email).toBe('john@example.com')
    expect(employee.positionId).toBe('position-01')
  })

  it('should create a new employee with photoUrl and add benefits', async () => {
    const { employee } = await sut.execute({
      name: 'John Doe',
      email: 'john@example.com',
      position: { connect: { id: 'position-02' } },
      benefitIds: ['benefit-01', 'benefit-02'],
      photoUrl: 'uploads/photo.png',
    })

    expect(employee.id).toEqual(expect.any(String))
    expect(employee.name).toBe('John Doe')
    expect(employee.email).toBe('john@example.com')
    expect(employee.positionId).toBe('position-02')
    expect(employee.photoUrl).toBe('uploads/photo.png')
  })
})
