import { PositionsRepository } from '@/repositories/positions-repository'

interface DeletePositionUseCaseRequest {
  id: string
}

export class DeletePositionUseCase {
  constructor(private positionsRepository: PositionsRepository) {}

  async execute({ id }: DeletePositionUseCaseRequest): Promise<void> {
    await this.positionsRepository.delete(id)
  }
}
