import { PrismaAdminsRepository } from '@/repositories/prisma/prisma-admins-repository'
import { RegisterAdminUseCase } from '../register-admin'

export function makeRegisterAdminUseCase() {
  const adminsRepository = new PrismaAdminsRepository()
  const useCase = new RegisterAdminUseCase(adminsRepository)

  return useCase
}
