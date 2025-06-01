import { PrismaBenefitsRepository } from "@/repositories/prisma/prisma-benefits-repository"
import { DeleteBenefitUseCase } from "../delete-benefit"

export function makeDeletePositionUseCase() {
    const benefitsRepository = new PrismaBenefitsRepository()
    const useCase = new DeleteBenefitUseCase(benefitsRepository)

    return useCase
}