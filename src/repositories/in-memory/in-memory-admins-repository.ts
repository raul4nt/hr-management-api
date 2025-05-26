import { Admin, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { AdminsRepository } from '../admins-repository'

export class InMemoryAdminsRepository implements AdminsRepository {
  public items: Admin[] = []

  async findByEmail(email: string): Promise<Admin | null> {
    const admin = this.items.find((item) => item.email === email)
    return admin ?? null
  }

  async create(data: Prisma.AdminCreateInput): Promise<Admin> {
    const admin: Admin = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      createdAt: new Date(),
    }

    this.items.push(admin)
    return admin
  }
}
