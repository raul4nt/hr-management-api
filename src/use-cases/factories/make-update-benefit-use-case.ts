import { PrismaBenefitsRepository } from '@/repositories/prisma/prisma-benefits-repository'
import { UpdateBenefitUseCase } from '../update-benefit'

export function makeUpdateBenefitUseCase() {
  const benefitsRepository = new PrismaBenefitsRepository()
  const useCase = new UpdateBenefitUseCase(benefitsRepository)

  return useCase
}
