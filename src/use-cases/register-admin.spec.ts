import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryAdminsRepository } from '@/repositories/in-memory/in-memory-admins-repository'
import { RegisterAdminUseCase } from './register-admin'

let adminsRepository: InMemoryAdminsRepository
let sut: RegisterAdminUseCase

describe('Register Admin Use Case', () => {
  beforeEach(() => {
    adminsRepository = new InMemoryAdminsRepository()
    sut = new RegisterAdminUseCase(adminsRepository)
  })

  it('should register a new admin', async () => {
    const { admin } = await sut.execute({
      name: 'Admin Example',
      email: 'admin@example.com',
      password: '123456',
    })

    expect(admin.id).toEqual(expect.any(String))
    expect(admin.name).toBe('Admin Example')
    expect(admin.email).toBe('admin@example.com')
  })

  it('should not allow duplicate email', async () => {
    await sut.execute({
      name: 'Admin One',
      email: 'duplicate@example.com',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'Admin Two',
        email: 'duplicate@example.com',
        password: 'abcdef',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
