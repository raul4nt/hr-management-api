import { Prisma, Position } from '@prisma/client'

export interface PositionsRepository {
  findById(id: string): Promise<Position | null>
  findAll(): Promise<Position[]>
  create(data: Prisma.PositionCreateInput): Promise<Position>
  update(id: string, data: Prisma.PositionUpdateInput): Promise<Position>
  delete(id: string): Promise<void>
}
