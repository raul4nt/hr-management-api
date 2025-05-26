import { prisma } from '@/lib/prisma'
import { AdminsRepository } from '../admins-repository'
import { Admin, Prisma } from '@prisma/client'

export class PrismaAdminsRepository implements AdminsRepository {
  async findByEmail(email: string): Promise<Admin | null> {
    return await prisma.admin.findUnique({
      where: { email },
    })
  }

  async create(data: Prisma.AdminCreateInput): Promise<Admin> {
    return await prisma.admin.create({
      data,
    })
  }
}
