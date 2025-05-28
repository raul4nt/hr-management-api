import { PrismaEmployeesRepository } from "@/repositories/prisma/prisma-employees-repository"
import { DeleteEmployeeUseCase } from "../delete-employee"

export function makeDeleteEmployeeUseCase() {
    const employeesRepository = new PrismaEmployeesRepository()
    const useCase = new DeleteEmployeeUseCase(employeesRepository)

    return useCase
}