/*
  Warnings:

  - You are about to drop the `Date` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_dateId_fkey";

-- DropTable
DROP TABLE "Date";

-- CreateTable
CREATE TABLE "DateEvent" (
    "id" SERIAL NOT NULL,
    "dateEvent" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DateEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "DateEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
