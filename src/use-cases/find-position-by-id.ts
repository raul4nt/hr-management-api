import { PositionsRepository } from '@/repositories/positions-repository'
import { Position } from '@prisma/client'

interface FindPositionByIdUseCaseRequest {
  id: string
}

interface FindPositionByIdUseCaseResponse {
  position: Position | null
}

export class FindPositionByIdUseCase {
  constructor(private positionsRepository: PositionsRepository) {}

  async execute({
    id,
  }: FindPositionByIdUseCaseRequest): Promise<FindPositionByIdUseCaseResponse> {
    const position = await this.positionsRepository.findById(id)

    return {
      position,
    }
  }
}
