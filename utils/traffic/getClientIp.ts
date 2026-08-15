import { NextRequest } from "next/server";

export const getClientIp = (req: NextRequest) => {
    const forwardedFor = req.headers.get("x-forwarded-for");

    if (forwardedFor) {
        return forwardedFor.split(",")[0].trim();
    }

    return (
        req.headers.get("x-real-ip") ||
        req.headers.get("cf-connecting-ip") ||
        null
    );
};