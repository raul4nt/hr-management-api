import { BenefitsRepository } from '@/repositories/benefits-repository'
import { Benefit } from '@prisma/client'

interface FindBenefitByIdUseCaseRequest {
  id: string
}

interface FindBenefitByIdUseCaseResponse {
  benefit: Benefit | null
}

export class FindBenefitByIdUseCase {
  constructor(private benefitsRepository: BenefitsRepository) {}

  async execute({
    id,
  }: FindBenefitByIdUseCaseRequest): Promise<FindBenefitByIdUseCaseResponse> {
    const benefit = await this.benefitsRepository.findById(id)

    return {
      benefit,
    }
  }
}
