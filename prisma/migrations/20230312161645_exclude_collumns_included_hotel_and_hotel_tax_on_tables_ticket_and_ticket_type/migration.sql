/*
  Warnings:

  - You are about to drop the column `includedHotel` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `hotelTax` on the `TicketType` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "includedHotel";

-- AlterTable
ALTER TABLE "TicketType" DROP COLUMN "hotelTax";
