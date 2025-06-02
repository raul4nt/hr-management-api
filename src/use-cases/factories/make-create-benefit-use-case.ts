import { PrismaBenefitsRepository } from "@/repositories/prisma/prisma-benefits-repository"
import { CreateBenefitUseCase } from "../create-benefit"

export function makeCreateBenefitUseCase() {
    const benefitsRepository = new PrismaBenefitsRepository()
    const useCase = new CreateBenefitUseCase(benefitsRepository)

    return useCase
}