import { PositionsRepository } from '@/repositories/positions-repository'
import { Prisma, Position } from '@prisma/client'

interface CreatePositionUseCaseRequest extends Prisma.PositionCreateInput {}

interface CreatePositionUseCaseResponse {
  position: Position
}

export class CreatePositionUseCase {
  constructor(private positionsRepository: PositionsRepository) {}

  async execute(
    data: CreatePositionUseCaseRequest,
  ): Promise<CreatePositionUseCaseResponse> {
    const position = await this.positionsRepository.create(data)

    return {
      position,
    }
  }
}
