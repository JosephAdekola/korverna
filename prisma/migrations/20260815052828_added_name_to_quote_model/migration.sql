/*
  Warnings:

  - Added the required column `name` to the `Quote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quote" ADD COLUMN     "name" TEXT NOT NULL;
