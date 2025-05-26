import { Admin } from '@prisma/client'
import { compare } from 'bcryptjs'
import { AdminsRepository } from '@/repositories/admins-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateAdminUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateAdminUseCaseResponse {
  admin: Admin
}

export class AuthenticateAdminUseCase {
  constructor(private adminsRepository: AdminsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateAdminUseCaseRequest): Promise<AuthenticateAdminUseCaseResponse> {
    const admin = await this.adminsRepository.findByEmail(email)

    if (!admin) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatch = await compare(password, admin.password)

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    return { admin }
  }
}
