import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryAdminsRepository } from '@/repositories/in-memory/in-memory-admins-repository'
import { AuthenticateAdminUseCase } from './authenticate-admin'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let adminsRepository: InMemoryAdminsRepository
let sut: AuthenticateAdminUseCase

describe('Authenticate Admin Use Case', () => {
  beforeEach(() => {
    adminsRepository = new InMemoryAdminsRepository()
    sut = new AuthenticateAdminUseCase(adminsRepository)
  })

  it('should authenticate an admin with correct credentials', async () => {
    const passwordHash = await hash('correct-password', 6)

    await adminsRepository.create({
      id: 'admin-01',
      name: 'Admin Test',
      email: 'admin@test.com',
      password: passwordHash,
      createdAt: new Date(),
    })

    const { admin } = await sut.execute({
      email: 'admin@test.com',
      password: 'correct-password',
    })

    expect(admin).toHaveProperty('id')
    expect(admin.email).toBe('admin@test.com')
  })

  it('should not authenticate with incorrect email', async () => {
    await expect(() =>
      sut.execute({
        email: 'nonexistent@test.com',
        password: 'any-password',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not authenticate with incorrect password', async () => {
    const passwordHash = await hash('right-password', 6)

    await adminsRepository.create({
      id: 'admin-02',
      name: 'Admin Wrong Pass',
      email: 'admin2@test.com',
      password: passwordHash,
      createdAt: new Date(),
    })

    await expect(() =>
      sut.execute({
        email: 'admin2@test.com',
        password: 'wrong-password',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
