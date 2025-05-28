import { PrismaPositionsRepository } from "@/repositories/prisma/prisma-positions-repository"
import { UpdatePositionUseCase } from "../update-position"

export function makeUpdatePositionUseCase() {
    const positionsRepository = new PrismaPositionsRepository()
    const useCase = new UpdatePositionUseCase(positionsRepository)

    return useCase
}