import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryEmployeesRepository } from '@/repositories/in-memory/in-memory-employees-repository'
import { UpdateEmployeeUseCase } from './update-employee'

let employeesRepository: InMemoryEmployeesRepository
let sut: UpdateEmployeeUseCase

describe('Update Employee Use Case', () => {
  beforeEach(() => {
    employeesRepository = new InMemoryEmployeesRepository()
    sut = new UpdateEmployeeUseCase(employeesRepository)
  })

  it('should update an existing employee', async () => {
    const employee = await employeesRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      position: { connect: { id: 'position-01' } },
    })

    const { employee: updatedEmployee } = await sut.execute({
      id: employee.id,
      data: {
        name: 'John Updated',
        position: { connect: { id: 'position-02' } },
      },
    })

    expect(updatedEmployee.name).toBe('John Updated')
    expect(updatedEmployee.positionId).toBe('position-02')
    expect(updatedEmployee.email).toBe('john@example.com')
  })

  it('should throw error if employee not found', async () => {
    await expect(() =>
      sut.execute({
        id: 'non-existing-id',
        data: { name: 'Nobody' },
      }),
    ).rejects.toThrow()
  })
})
