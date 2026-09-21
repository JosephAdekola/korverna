-- AlterTable
ALTER TABLE "File" ADD COLUMN     "emailLogId" TEXT;

-- CreateTable
CREATE TABLE "AdminEmailSentLog" (
    "id" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "recipients" TEXT[],
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "resendId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminEmailSentLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AdminEmailSentLog_sender_idx" ON "AdminEmailSentLog"("sender");

-- CreateIndex
CREATE INDEX "AdminEmailSentLog_createdAt_idx" ON "AdminEmailSentLog"("createdAt");

-- CreateIndex
CREATE INDEX "File_emailLogId_idx" ON "File"("emailLogId");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_emailLogId_fkey" FOREIGN KEY ("emailLogId") REFERENCES "AdminEmailSentLog"("id") ON DELETE SET NULL ON UPDATE CASCADE;
