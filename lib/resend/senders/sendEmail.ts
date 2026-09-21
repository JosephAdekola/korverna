import { resend } from "../instance";

export interface SendEmailAttachment {
    filename: string | undefined;
    path: string | undefined;
}

export interface SendEmailParams {
    sender: string;
    recipients: string[];
    subject: string;
    body: string;
    attachments?: SendEmailAttachment[];
}

export const sendEmail = async ({
    sender,
    recipients,
    subject,
    body,
    attachments,
}: SendEmailParams) => {
    if (!process.env.RESEND_API_KEY) {
        throw new Error(
            "RESEND_API_KEY is not configured."
        );
    }

    const { data, error } =
        await resend.emails.send({
            from: sender,
            to: recipients,
            subject,
            html: body,
            ...(attachments?.length && {
                attachments,
            }),
        });

    if (error) {
        throw new Error(error.message);
    }

    return data;
};