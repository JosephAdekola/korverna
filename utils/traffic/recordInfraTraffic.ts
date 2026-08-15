import { NextRequest } from "next/server";
import { InfraLandingPage } from "@/generated/prisma/client";
import { getClientIp } from "./getClientIp";
import { prisma } from "@/lib/prisma/prisma";

type RecordInfraTrafficData = {
    machine?: string | null;
    utmSource?: string | null;
    utmMedium?: string | null;
    utmCampaign?: string | null;
    utmTerm?: string | null;
    utmContent?: string | null;
};

export const recordInfraTraffic = async (
    data: RecordInfraTrafficData,
    req: NextRequest
) => {
    try {
        const landingPage = Object.values(InfraLandingPage).find(
            (value) =>
                value.toLowerCase() === data.machine?.toLowerCase()
        );

        const traffic = await prisma.infraPageTraffic.create({
            data: {
                landingPage,

                utmSource: data.utmSource,
                utmMedium: data.utmMedium,
                utmCampaign: data.utmCampaign,
                utmTerm: data.utmTerm,
                utmContent: data.utmContent,

                referrer: req.headers.get("referer"),
                userAgent: req.headers.get("user-agent"),
                ipAddress: getClientIp(req),
            },
        });

        return traffic;
    } catch (error) {
        console.error(
            "Error recording infrastructure traffic:",
            error
        );

        return null;
    }
};