import { BenefitsRepository } from '@/repositories/benefits-repository'
import { Benefit } from '@prisma/client'

interface FindAllBenefitsUseCaseResponse {
  benefits: Benefit[]
}

export class FindAllBenefitsUseCase {
  constructor(private benefitsRepository: BenefitsRepository) {}

  async execute(): Promise<FindAllBenefitsUseCaseResponse> {
    const benefits = await this.benefitsRepository.findAll()

    return {
      benefits,
    }
  }
}
