-- CreateEnum
CREATE TYPE "QuoteStatus" AS ENUM ('pending', 'contacted', 'quoted', 'accepted', 'rejected', 'completed');

-- CreateTable
CREATE TABLE "Quote" (
    "id" TEXT NOT NULL,
    "company" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "location" TEXT,
    "start" TIMESTAMP(3),
    "end" TIMESTAMP(3),
    "description" TEXT NOT NULL,
    "status" "QuoteStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);
