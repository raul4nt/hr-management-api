-- CreateTable
CREATE TABLE "employee_gallery" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "employee_gallery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "employee_gallery" ADD CONSTRAINT "employee_gallery_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
