import { AdminEmailSentLog, File } from "@/generated/prisma/client"

export type SentHistoryRowsProps =
    (Omit<AdminEmailSentLog, "resendId">) & {
        attachments?: {
            url: File["url"],
            id: File["id"]
        }[]
    }

export const sentHistoryRows: SentHistoryRowsProps[] = [
    // {

    // }
]