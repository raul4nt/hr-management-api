import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryEmployeesRepository } from '@/repositories/in-memory/in-memory-employees-repository'
import { FindEmployeeByIdUseCase } from './find-employee-by-id'

let employeesRepository: InMemoryEmployeesRepository
let sut: FindEmployeeByIdUseCase

describe('Find Employee By Id Use Case', () => {
  beforeEach(() => {
    employeesRepository = new InMemoryEmployeesRepository()
    sut = new FindEmployeeByIdUseCase(employeesRepository)
  })

  it('should return the employee with given id', async () => {
    const employee = await employeesRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      position: { connect: { id: 'position-01' } },
    })

    const { employee: foundEmployee } = await sut.execute({ id: employee.id })

    expect(foundEmployee).not.toBeNull()
    expect(foundEmployee?.id).toBe(employee.id)
    expect(foundEmployee?.name).toBe('John Doe')
  })

  it('should return null if employee not found', async () => {
    const { employee: foundEmployee } = await sut.execute({
      id: 'non-existing-id',
    })

    expect(foundEmployee).toBeNull()
  })
})
