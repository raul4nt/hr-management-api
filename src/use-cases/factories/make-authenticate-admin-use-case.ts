import { PrismaAdminsRepository } from '@/repositories/prisma/prisma-admins-repository'
import { AuthenticateAdminUseCase } from '../authenticate-admin'

export function makeAuthenticateAdminUseCase() {
  const adminsRepository = new PrismaAdminsRepository()
  const useCase = new AuthenticateAdminUseCase(adminsRepository)

  return useCase
}
