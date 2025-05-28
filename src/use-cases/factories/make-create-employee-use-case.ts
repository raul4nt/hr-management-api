import { PrismaEmployeesRepository } from "@/repositories/prisma/prisma-employees-repository"
import { CreateEmployeeUseCase } from "../create-employee"

export function makeCreateEmployeeUseCase() {
    const employeesRepository = new PrismaEmployeesRepository()
    const useCase = new CreateEmployeeUseCase(employeesRepository)

    return useCase
}