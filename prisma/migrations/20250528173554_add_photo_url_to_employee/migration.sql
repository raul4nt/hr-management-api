/*
  Warnings:

  - The primary key for the `employee_benefits` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `assignedAt` on the `employee_benefits` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `employee_benefits` table. All the data in the column will be lost.
  - You are about to drop the `vacations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "vacations" DROP CONSTRAINT "vacations_employeeId_fkey";

-- DropIndex
DROP INDEX "employee_benefits_employeeId_benefitId_key";

-- AlterTable
ALTER TABLE "employee_benefits" DROP CONSTRAINT "employee_benefits_pkey",
DROP COLUMN "assignedAt",
DROP COLUMN "id",
ADD CONSTRAINT "employee_benefits_pkey" PRIMARY KEY ("employeeId", "benefitId");

-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "photoUrl" TEXT;

-- DropTable
DROP TABLE "vacations";
