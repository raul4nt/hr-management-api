import { PrismaPositionsRepository } from "@/repositories/prisma/prisma-positions-repository"
import { DeletePositionUseCase } from "../delete-position"

export function makeDeletePostionUseCase() {
    const positionsRepository = new PrismaPositionsRepository()
    const useCase = new DeletePositionUseCase(positionsRepository)

    return useCase
}