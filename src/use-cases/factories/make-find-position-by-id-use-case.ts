import { PrismaPositionsRepository } from '@/repositories/prisma/prisma-positions-repository'
import { FindPositionByIdUseCase } from '../find-position-by-id'

export function makeFindPositionByIdUseCase() {
  const positionsRepository = new PrismaPositionsRepository()
  const useCase = new FindPositionByIdUseCase(positionsRepository)

  return useCase
}
