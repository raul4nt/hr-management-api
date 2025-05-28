import { PrismaEmployeesRepository } from "@/repositories/prisma/prisma-employees-repository"
import { UpdateEmployeeUseCase } from "../update-employee"

export function makeUpdateEmployeeUseCase() {
    const employeesRepository = new PrismaEmployeesRepository()
    const useCase = new UpdateEmployeeUseCase(employeesRepository)

    return useCase
}