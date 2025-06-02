import { PrismaBenefitsRepository } from '@/repositories/prisma/prisma-benefits-repository'
import { FindAllBenefitsUseCase } from '../find-all-benefits'

export function makeFindAllBenefitsUseCase() {
  const benefitsRepository = new PrismaBenefitsRepository()
  const useCase = new FindAllBenefitsUseCase(benefitsRepository)

  return useCase
}
