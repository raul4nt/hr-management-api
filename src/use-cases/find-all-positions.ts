import { PositionsRepository } from '@/repositories/positions-repository'
import { Position } from '@prisma/client'

interface FindAllPositionsUseCaseResponse {
  positions: Position[]
}

export class FindAllPositionsUseCase {
  constructor(private positionsRepository: PositionsRepository) {}

  async execute(): Promise<FindAllPositionsUseCaseResponse> {
    const positions = await this.positionsRepository.findAll()

    return {
      positions,
    }
  }
}
