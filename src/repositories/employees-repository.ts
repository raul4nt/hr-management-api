import { Prisma } from "@prisma/client";

export interface EmployeesRepository {
    findById(id: string): Promise<Employee | null>
    create(data: Prisma.EmployeeCreateInput): Promise<Employee>
}