import { PrismaPositionsRepository } from '@/repositories/prisma/prisma-positions-repository'
import { FindAllPositionsUseCase } from '../find-all-positions'

export function makeFindAllPositionsUseCase() {
  const positionsRepository = new PrismaPositionsRepository()
  const useCase = new FindAllPositionsUseCase(positionsRepository)

  return useCase
}
