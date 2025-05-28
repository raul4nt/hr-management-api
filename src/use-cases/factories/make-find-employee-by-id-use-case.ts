import { PrismaEmployeesRepository } from "@/repositories/prisma/prisma-employees-repository"
import { FindEmployeeByIdUseCase } from "../find-employee-by-id"

export function makeFindEmployeeByIdUseCase() {
    const employeesRepository = new PrismaEmployeesRepository()
    const useCase = new FindEmployeeByIdUseCase(employeesRepository)

    return useCase
}