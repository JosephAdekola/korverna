import { AdminEmailSentLog, File } from "@/generated/prisma/client"

export type SentHistoryRowsProps =
    (Omit<AdminEmailSentLog, "resendId">) & {
        attachments?: {
            url: File["url"],
            id: File["id"],
            name: string
        }[]
    }

export const sentHistoryRows: SentHistoryRowsProps[] = [
    {
        createdAt: new Date(),
        id: "thisisa",
        body: "this is the bodythis is the subject this is the subject this is the subject this is the subject this is the subject this is the subject this is the subject this is the subject this is the subject this is the subject this is the subject ",
        recipients: [
            "email@email.com"
        ],
        sender: "email@email.com",
        subject: "this is the subject ",
        attachments: [
            {
                id: "123",
                url: "/logo.png",
                name: "adekola"
            }
        ]
    }
]