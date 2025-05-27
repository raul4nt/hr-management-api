import { PositionsRepository } from '@/repositories/positions-repository'
import { Prisma, Position } from '@prisma/client'

interface UpdatePositionUseCaseRequest {
  id: string
  data: Prisma.PositionUpdateInput
}

interface UpdatePositionUseCaseResponse {
  position: Position
}

export class UpdatePositionUseCase {
  constructor(private positionsRepository: PositionsRepository) {}

  async execute({
    id,
    data,
  }: UpdatePositionUseCaseRequest): Promise<UpdatePositionUseCaseResponse> {
    const position = await this.positionsRepository.update(id, data)

    return {
      position,
    }
  }
}
