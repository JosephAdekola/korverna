"use server";

import { AdminSendEmailPayloadValidator } from "@/lib/zod/schemas/adminSendEmail";
import { emailValidator } from "@/lib/zod/schemas/email";
import { uploadFile } from "@/lib/imagekit/uploadFile";
import { deleteFile } from "@/lib/imagekit/deleteFile";
import { sendEmail } from "@/lib/resend/senders/sendEmail";
import { prisma } from "@/lib/prisma/prisma";
import { getServerSession } from "../general/getServerSession";
import { EmailSendersProps } from "@/app/admin/dashboard/components/emailing/data/emailFromData";

const ALLOWED_SENDERS: EmailSendersProps[] = [
    "coo@korverna.com",
    "joseph@korverna.com",
];

export async function sendAdminEmailAction(
    payload: unknown
) {   

    /*
     * Validate on the server.
     */
    const validation =
        AdminSendEmailPayloadValidator.safeParse(payload);

    if (!validation.success) {
        throw new Error(
            validation.error.issues[0].message
        );
    }

    const {
        sender,
        receiver,
        subject,
        body,
        attachments = [],
    } = validation.data;

    const session = await getServerSession()

    if (!session) {
        throw new Error("unauthenticated")
    }

    /*
     * Never trust the sender supplied by the client.
     */
    if (!ALLOWED_SENDERS.includes(sender as EmailSendersProps)) {
        throw new Error(
            "This sender address is not authorized."
        );
    }

    /*
     * Convert comma-separated recipients into
     * a clean unique array.
     */
    const recipients = [
        ...new Set(
            receiver
                .split(",")
                .map((email) => email.trim().toLowerCase())
                .filter(Boolean)
        ),
    ];

    if (!recipients.length) {
        throw new Error(
            "At least one receiver email is required."
        );
    }

    /*
     * Validate every recipient.
     */
    for (const recipient of recipients) {
        const validation =
            emailValidator.safeParse(recipient);

        if (!validation.success) {
            throw new Error(
                `Invalid receiver email: ${recipient}`
            );
        }
    }

    let uploadedFiles: Awaited<
        ReturnType<typeof uploadFile>
    > = [];

    try {

        /*
         * Upload attachments when available.
         */
        if (attachments.length) {
            uploadedFiles = await uploadFile({
                files: attachments,
                folder: "/korverna_limited/sent_email_uploads",
                // maxFiles: 10,
            });
        }

        /*
         * Send the email.
         */
        const emailResponse = await sendEmail({
            sender,
            recipients,
            subject,
            body,
            attachments: uploadedFiles.map((file) => ({
                filename: file.fileName,
                path: file.url,
            })),
        });

        /*
         * Save uploaded files to the database.
         */
        const savedFiles = uploadedFiles.length
            ? await prisma.file.createManyAndReturn({
                data: uploadedFiles.map((file) => ({
                    url: file.url!,
                    fileId: file.fileId!,
                    fileType: file.fileType!,
                    fileName: file.fileName!,
                    size: file.size,
                })),
            })
            : [];

        /*
         * Save the sent email log.
         */
        await prisma.adminEmailSentLog.create({
            data: {
                sender,
                recipients,
                subject,
                body,
                resendId: emailResponse?.id,
                attachments: {
                    connect: savedFiles.map((file) => ({
                        id: file.id,
                    })),
                },
            },
        });

        return {
            success: true,
            message: "Email sent successfully.",
        };

    } catch (error) {

        /*
         * If ImageKit uploads succeeded but something
         * later failed, remove those files from ImageKit.
         *
         * This prevents orphaned attachments.
         */
        if (uploadedFiles.length) {
            try {
                await deleteFile({
                    fileId: uploadedFiles.map(
                        (file) => file.fileId!
                    ),
                });
            } catch {
                /*
                 * Don't replace the original error with
                 * a cleanup error.
                 */
            }
        }

        throw error;
    }
}