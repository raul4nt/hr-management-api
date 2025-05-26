import { Admin } from '@prisma/client'
import { hash } from 'bcryptjs'
import { AdminsRepository } from '@/repositories/admins-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterAdminUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterAdminUseCaseResponse {
  admin: Admin
}

export class RegisterAdminUseCase {
  constructor(private adminsRepository: AdminsRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterAdminUseCaseRequest): Promise<RegisterAdminUseCaseResponse> {
    const existingAdmin = await this.adminsRepository.findByEmail(email)

    if (existingAdmin) {
      throw new UserAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const admin = await this.adminsRepository.create({
      name,
      email,
      password: password_hash,
    })

    return { admin }
  }
}
