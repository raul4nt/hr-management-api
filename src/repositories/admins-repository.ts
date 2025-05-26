import { Admin, Prisma } from '@prisma/client'

export interface AdminsRepository {
  findByEmail(email: string): Promise<Admin | null>
  create(data: Prisma.AdminCreateInput): Promise<Admin>
}
