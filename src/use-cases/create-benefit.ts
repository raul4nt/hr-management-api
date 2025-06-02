import { BenefitsRepository } from '@/repositories/benefits-repository'
import { Prisma, Benefit } from '@prisma/client'

interface CreateBenefitUseCaseRequest extends Prisma.BenefitCreateInput {}

interface CreateBenefitUseCaseResponse {
  benefit: Benefit
}

export class CreateBenefitUseCase {
  constructor(private benefitsRepository: BenefitsRepository) {}

  async execute(
    data: CreateBenefitUseCaseRequest,
  ): Promise<CreateBenefitUseCaseResponse> {
    const benefit = await this.benefitsRepository.create(data)

    return {
      benefit,
    }
  }
}
