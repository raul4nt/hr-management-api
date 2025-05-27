import { PositionsRepository } from '@/repositories/positions-repository'
import { Position, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryPositionsRepository implements PositionsRepository {
  public items: Position[] = []

  async findById(id: string): Promise<Position | null> {
    const position = this.items.find((item) => item.id === id)
    return position ?? null
  }

  async findAll(): Promise<Position[]> {
    return this.items
  }

  async create(data: Prisma.PositionCreateInput): Promise<Position> {
    const position: Position = {
      id: randomUUID(),
      title: data.title,
      salary: data.salary,
    }

    this.items.push(position)
    return position
  }

  async update(id: string, data: Prisma.PositionUpdateInput): Promise<Position> {
    const index = this.items.findIndex((item) => item.id === id)
    if (index === -1) throw new Error('Position not found')

    const existing = this.items[index]

    const updatedPosition: Position = {
      ...existing,
      title: data.title?.toString() ?? existing.title,
      salary: typeof data.salary === 'number' ? data.salary : existing.salary,
    }

    this.items[index] = updatedPosition
    return updatedPosition
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id === id)
    if (index === -1) throw new Error('Position not found')

    this.items.splice(index, 1)
  }
}
