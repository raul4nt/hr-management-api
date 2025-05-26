import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryEmployeesRepository } from '@/repositories/in-memory/in-memory-employees-repository'
import { FindAllEmployeesUseCase } from './find-all-employees'

let employeesRepository: InMemoryEmployeesRepository
let sut: FindAllEmployeesUseCase

describe('Find All Employees Use Case', () => {
  beforeEach(() => {
    employeesRepository = new InMemoryEmployeesRepository()
    sut = new FindAllEmployeesUseCase(employeesRepository)
  })

  it('should return all employees', async () => {
    await employeesRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      position: { connect: { id: 'position-01' } },
    })

    await employeesRepository.create({
      name: 'Jane Smith',
      email: 'jane@example.com',
      position: { connect: { id: 'position-02' } },
    })

    const { employees } = await sut.execute()

    expect(employees.length).toBe(2)
    expect(employees[0].name).toBe('John Doe')
    expect(employees[1].name).toBe('Jane Smith')
  })
})
