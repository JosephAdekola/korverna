"use server"

import { Newsletter } from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma/prisma"
import { sendNewsletterAdminNotification } from "@/lib/resend/senders/new_newsletter_sub"
import { NewsLetterProps, NewsLetterSchema } from "@/lib/zod/schemas/newsLetter"
import { ErrorMessageLogger } from "@/src/utils/error_message_logger"

export const handleSubmitNewsletter = async (
    payload: NewsLetterProps,
    landingPage: Newsletter["landingPage"]
) => {

    const valid_err = NewsLetterSchema.safeParse(payload)
    if (!valid_err.success) {
        return {
            success: false,
            message: valid_err.error.issues[0]?.message ?? "Invalid email",
            code: 400,
        };
    }

    try {

        const email = valid_err.data.email.trim().toLowerCase();

        const existing_subscriber = await prisma.newsletter.findUnique({
            where: {
                email_landingPage: {
                    email,
                    landingPage
                }
            }
        })

        if (existing_subscriber) {
            return {
                success: true,
                message: "You are already a subscriber. We appreciate you!",
                code: 200
            }
        }

        await prisma.newsletter.create({
            data: {
                email,
                landingPage
            }
        })

        await sendNewsletterAdminNotification({
            email, landingPage
        })

        return {
            success: true,
            message: "Success! You will now receive promotional messages from us",
            code: 201
        }

    } catch (error) {
        const err = await ErrorMessageLogger(error);

        return {
            success: false,
            message: err.message,
            code: typeof err.code === "number" ? err.code : 500,
        };
    }
}