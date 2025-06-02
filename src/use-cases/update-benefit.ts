import { BenefitsRepository } from '@/repositories/benefits-repository'
import { Prisma, Benefit } from '@prisma/client'

interface UpdateBenefitUseCaseRequest {
  id: string
  data: Prisma.BenefitUpdateInput
}

interface UpdateBenefitUseCaseResponse {
  benefit: Benefit
}

export class UpdateBenefitUseCase {
  constructor(private benefitsRepository: BenefitsRepository) {}

  async execute({
    id,
    data,
  }: UpdateBenefitUseCaseRequest): Promise<UpdateBenefitUseCaseResponse> {
    const benefit = await this.benefitsRepository.update(id, data)

    return {
      benefit,
    }
  }
}
