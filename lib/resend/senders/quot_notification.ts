import { Quote } from "@/generated/prisma/client";
import { resend } from "../instance";
import { NewQuoteAdminNotification } from "../templates/new_quote_notification";

type SendQuoteNotificationParams = {
    quote: Quote;
};

export const sendQuoteAdminNotification = async ({
    quote,
}: SendQuoteNotificationParams) => {
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!process.env.RESEND_API_KEY) {
        throw new Error("RESEND_API_KEY is not configured.");
    }

    if (!adminEmail) {
        throw new Error("ADMIN_EMAIL is not configured.");
    }

    const { data, error } = await resend.emails.send({
        from: "Korverna <noreply@korverna.com>",
        to: adminEmail,
        subject: "📩 New Quote Request",
        react: NewQuoteAdminNotification({
            quote,
        }),
    });

    if (error) {
        console.log(error);        
    }

    return data;
};