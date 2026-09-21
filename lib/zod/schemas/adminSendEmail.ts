import * as z from "zod"

export const AdminSendEmailPayloadValidator = z.object({
    sender: z
        .email("Please select a valid sender email address")
        .max(30, "sender email cannot be more than 30 characters"),
    receiver: z
        .string("receiver email(s) cannot be empty")
        .nonempty()
        .max(100, "receiver email cannot be more than 100 characters"),
    subject: z
        .string()
        .nonempty("Email subject cannot be empty")
        .min(5, "subject cannot be less than 5 characters")
        .max(50, "email subject cannot be more than 50 characters"),
    body: z
        .string()
        .nonempty("email body cannot be empty")
        .min(5, "email body cannot be less than 5 characters")
        .max(1000, "email body cannot be more than 1000 characters"),
    attachments: z
        .array(z.file(), "Attachments must be an array of file blobs")
        .optional()
})

export type AdminSendEmailPayloadProps = z.infer<typeof AdminSendEmailPayloadValidator>