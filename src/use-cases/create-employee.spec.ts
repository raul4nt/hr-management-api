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

  it('should create a new employee', async () => {
    const { employee } = await sut.execute({
      name: 'John Doe',
      email: 'john@example.com',
      position: { connect: { id: 'position-01' } }
    })

    expect(employee.id).toEqual(expect.any(String))
    expect(employee.name).toBe('John Doe')
    expect(employee.email).toBe('john@example.com')
    expect(employee.positionId).toBe('position-01')
  })
})
