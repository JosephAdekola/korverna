-- CreateEnum
CREATE TYPE "InfraLandingPage" AS ENUM ('PAYLOADER', 'EXCAVATOR', 'GRADER', 'BACKHOE_LOADER', 'BULLDOZER');

-- CreateTable
CREATE TABLE "InfraPageTraffic" (
    "id" TEXT NOT NULL,
    "landingPage" "InfraLandingPage",
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "utmTerm" TEXT,
    "utmContent" TEXT,
    "referrer" TEXT,
    "visitorId" TEXT,
    "userAgent" TEXT,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InfraPageTraffic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "InfraPageTraffic_landingPage_idx" ON "InfraPageTraffic"("landingPage");

-- CreateIndex
CREATE INDEX "InfraPageTraffic_utmSource_idx" ON "InfraPageTraffic"("utmSource");

-- CreateIndex
CREATE INDEX "InfraPageTraffic_utmMedium_idx" ON "InfraPageTraffic"("utmMedium");

-- CreateIndex
CREATE INDEX "InfraPageTraffic_utmCampaign_idx" ON "InfraPageTraffic"("utmCampaign");

-- CreateIndex
CREATE INDEX "InfraPageTraffic_createdAt_idx" ON "InfraPageTraffic"("createdAt");

-- CreateIndex
CREATE INDEX "InfraPageTraffic_landingPage_utmSource_idx" ON "InfraPageTraffic"("landingPage", "utmSource");
