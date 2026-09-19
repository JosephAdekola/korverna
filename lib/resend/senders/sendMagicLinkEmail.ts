import { resend } from "../instance";
import { MagicLinkEmail } from "../templates/magic_link";

type SendMagicLinkEmailParams = {
    email: string;
    url: string;
};

export const sendMagicLinkEmail = async ({
    email,
    url,
}: SendMagicLinkEmailParams) => {
    if (!process.env.RESEND_API_KEY) {
        throw new Error("RESEND_API_KEY is not configured.");
    }

    const { data, error } = await resend.emails.send({
        from: "Korverna <noreply@korverna.com>",
        to: email,
        subject: "🔐 Your Korverna Sign-In Link",
        react: MagicLinkEmail({
            url,
        }),
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
};