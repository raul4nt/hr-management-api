import { BenefitsRepository } from '@/repositories/benefits-repository'

interface DeleteBenefitUseCaseRequest {
  id: string
}

export class DeleteBenefitUseCase {
  constructor(private BenefitsRepository: BenefitsRepository) {}

  async execute({ id }: DeleteBenefitUseCaseRequest): Promise<void> {
    await this.BenefitsRepository.delete(id)
  }
}
