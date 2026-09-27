import { getEmailSentHistoryForAdmin } from "@/actions/admin/getEmailSentHistoryForAdmin"
import { AdminEmailSentLog, File } from "@/generated/prisma/client"
import { ServerPaginationProps } from "@/src/global_ui_vault/paginator/version_one/data/PaginationProps"
import { Dispatch, SetStateAction } from "react"

export type SentHistoryRowsProps =
    (Omit<AdminEmailSentLog, "resendId">) & {
        attachments?: {
            url: File["url"],
            id: File["id"],
            fileName: string
        }[]
    }

// export const sentHistoryRows: SentHistoryRowsProps[] = [
//     {
//         createdAt: new Date(),
//         id: "thisisa",
//         body: "this is the bodythis is the subject this is the subject this is the subject this is the subject this is the subject this is the subject this is the subject this is the subject this is the subject this is the subject this is the subject ",
//         recipients: [
//             "email@email.com"
//         ],
//         sender: "email@email.com",
//         subject: "this is the subject ",
//         attachments: [
//             {
//                 id: "123",
//                 url: "/logo.png",
//                 name: "adekola"
//             }
//         ]
//     }
// ]

export const fetchSentHistoryRows = async ({
    page = 1,
    limit = 10,
    setEmailLogErrorMessage,
    setHistoryData,
    setHistoryPagination
}: {
    page: number;
    limit: number;
    setEmailLogErrorMessage: Dispatch<SetStateAction<string>>;
    setHistoryData: Dispatch<SetStateAction<SentHistoryRowsProps[] | null>>;
    setHistoryPagination: Dispatch<SetStateAction<ServerPaginationProps | null>>;
}) => {

    const logs = await getEmailSentHistoryForAdmin(
        limit, page
    )

    if (!logs?.data) {
        setEmailLogErrorMessage(
            logs?.message ?? "Admin sent email logs could not load"
        )

        return
    }

    setHistoryData(logs.data)
    setHistoryPagination(logs.pagination)

}