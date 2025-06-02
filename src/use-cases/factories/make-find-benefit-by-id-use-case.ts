import { PrismaBenefitsRepository } from '@/repositories/prisma/prisma-benefits-repository'
import { FindBenefitByIdUseCase } from '../find-benefit-by-id'

export function makeFindBenefitByIdUseCase() {
  const benefitsRepository = new PrismaBenefitsRepository()
  const useCase = new FindBenefitByIdUseCase(benefitsRepository)

  return useCase
}
