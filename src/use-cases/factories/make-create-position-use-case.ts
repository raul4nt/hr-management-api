import { PrismaPositionsRepository } from '@/repositories/prisma/prisma-positions-repository'
import { CreatePositionUseCase } from '../create-position'

export function makeCreatePositionUseCase() {
  const positionsRepository = new PrismaPositionsRepository()
  const useCase = new CreatePositionUseCase(positionsRepository)

  return useCase
}
