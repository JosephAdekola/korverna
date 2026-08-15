"use server";

import { prisma } from "@/lib/prisma/prisma";
import {
    QuoteProps,
    quoteSchema,
} from "@/lib/zod/schemas/quote";
import { ApiResponse } from "@/utils/api/api-fetch";

export const handleSubmitQuote = async (
    payload: QuoteProps
): Promise<ApiResponse<unknown> & { status: number }> => {

    const validate = quoteSchema.safeParse(payload);

    if (!validate.success) {
        return {
            success: false,
            status: 400,
            message: "Invalid quote data",
            data: [],
        };
    }

    try {
        const data = validate.data;

        const threeHoursAgo = new Date(
            Date.now() - 3 * 60 * 60 * 1000
        );

        const recentSubmission = await prisma.quote.findFirst({
            where: {
                phone: data.phone,
                createdAt: {
                    gt: threeHoursAgo,
                },
            },
        });

        if (recentSubmission) {
            return {
                success: false,
                status: 429,
                message:
                    "You submitted a quote recently. Please wait for a call from us or try again later.",
                data: [],
            };
        }

        const quote = await prisma.quote.create({
            data: {
                ...data,
                start: data.start ? new Date(data.start) : null,
                end: data.end ? new Date(data.end) : null,
            },
        });

        return {
            success: true,
            status: 201,
            message: "Quote submitted successfully. We will be in touch",
            data: quote,
        };

    } catch (error) {
        console.error("Error submitting quote request:", error);

        return {
            success: false,
            status: 500,
            message: "Internal server error",
            data: [],
        };
    }
};