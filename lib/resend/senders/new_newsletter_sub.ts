import { Resend } from "resend";
import { NewSubscriberAdminNotification } from "../templates/new_newsletter_sub";
import { Newsletter } from "@/generated/prisma/client";

const resend = new Resend(process.env.RESEND_API_KEY);

type SendNewsletterNotificationParams = {
    email: string;
    landingPage: Newsletter["landingPage"];
};

export const sendNewsletterAdminNotification = async ({
    email,
    landingPage
}: SendNewsletterNotificationParams) => {
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!process.env.RESEND_API_KEY) {
        throw new Error("RESEND_API_KEY is not configured.");
    }

    if (!adminEmail) {
        throw new Error("ADMIN_EMAIL is not configured.");
    }

    const { data, error } = await resend.emails.send({
        from: "Korverna <noreply@korverna.com>", // Must be a verified domain
        to: adminEmail,
        subject: "📩 New Newsletter Subscriber",
        react: NewSubscriberAdminNotification({
            email,
            landingPage
        }),
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
};