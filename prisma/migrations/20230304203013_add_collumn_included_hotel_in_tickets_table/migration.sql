/*
  Warnings:

  - Added the required column `includedHotel` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "includedHotel" BOOLEAN NOT NULL;
