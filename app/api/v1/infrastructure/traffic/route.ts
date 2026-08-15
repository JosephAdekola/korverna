import { recordInfraTraffic } from "@/utils/traffic/recordInfraTraffic";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        await recordInfraTraffic(body, req);

        return NextResponse.json({
            success: true,
        });
    } catch (error) {
        console.error("Traffic recording error:", error);

        return NextResponse.json(
            {
                success: false,
            },
            {
                status: 500,
            }
        );
    }
}