import { prisma } from '@/lib/prisma'
import { Prisma, Position } from '@prisma/client'
import { PositionsRepository } from '@/repositories/positions-repository'

export class PrismaPositionsRepository implements PositionsRepository {
  async findById(id: string): Promise<Position | null> {
    const position = await prisma.position.findUnique({
      where: { id },
    })
    return position
  }

  async findAll(): Promise<Position[]> {
    const positions = await prisma.position.findMany()
    return positions
  }

  async create(data: Prisma.PositionCreateInput): Promise<Position> {
    const position = await prisma.position.create({
      data,
    })
    return position
  }

  async update(id: string, data: Prisma.PositionUpdateInput): Promise<Position> {
    const position = await prisma.position.update({
      where: { id },
      data,
    })
    return position
  }

  async delete(id: string): Promise<void> {
    await prisma.position.delete({
      where: { id },
    })
  }
}
