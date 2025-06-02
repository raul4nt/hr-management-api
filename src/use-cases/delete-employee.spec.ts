import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryEmployeesRepository } from '@/repositories/in-memory/in-memory-employees-repository'
import { DeleteEmployeeUseCase } from './delete-employee'

let employeesRepository: InMemoryEmployeesRepository
let sut: DeleteEmployeeUseCase

describe('Delete Employee Use Case', () => {
  beforeEach(() => {
    employeesRepository = new InMemoryEmployeesRepository()
    sut = new DeleteEmployeeUseCase(employeesRepository)
  })

  it('should delete an existing employee', async () => {
    const employee = await employeesRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      position: { connect: { id: 'position-01' } },
    })

    await sut.execute({ id: employee.id })

    const allEmployees = await employeesRepository.findAll()
    expect(allEmployees.length).toBe(0)
  })

  it('should throw error if employee not found', async () => {
    await expect(() => sut.execute({ id: 'non-existing-id' })).rejects.toThrow()
  })
})
