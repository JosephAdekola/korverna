import { TableColumnProps } from "@/src/global_ui_vault/table/types";
import { SentHistoryRowsProps } from "./sentHistoryRows";
import { useState } from "react";
import Button from "@/src/global_ui_vault/button";
import Image from "next/image";


export const sentHistoryCols: TableColumnProps<SentHistoryRowsProps>[] = [
    {
        key: "createdAt",
        header: "Date",
        render(row) {
            return (
                row.createdAt.toDateString()
            )
        },
    },
    {
        key: "sender",
        header: "Sender Email"
    },
    {
        key: "recipients",
        header: "reciepient(s)",
        render(row) {
            return (
                <ul>
                    {
                        row.recipients.map((reci, idx) => (
                            <li
                                key={idx}>
                                {reci}
                            </li>
                        ))
                    }
                </ul>
            )
        },
    },
    {
        key: "subject",
        header: "subject",
    },
    {
        key: "body",
        header: "message body",
        render(row) {
            const [showAll, setShowAll] = useState(false)
            const maxWordLenght = 20
            const isLonger = row.body.length > maxWordLenght
            return (
                <div
                    className="flex flex-col gap-2">
                    {
                        !showAll && isLonger
                            ? `${row.body.slice(0, maxWordLenght)}...`
                            : row.body
                    }
                    {
                        isLonger && (
                            <div
                                className="flex justify-end ">
                                <Button
                                    variant="primary"
                                    size="custom"
                                    onClick={() => setShowAll(!showAll)}
                                    className="hover:text-primary whitespace-nowrap text-[10px]! px-2 py-1">
                                    {
                                        showAll ? "View Less" : "View All"
                                    }
                                </Button>
                            </div>
                        )
                    }
                </div>
            )
        },
    },
    {
        key: "attachments",
        header: "Attachments",
        render(row) {
            return (
                <div>
                    {
                        row.attachments && row.attachments?.length < 1 ?
                            <p>No attachments</p> :
                            row.attachments!.map((attach, idx) => (
                                <a
                                    key={idx}
                                    href={attach.url}
                                    className="capitalize underline!">
                                    {attach.name}
                                </a>
                            ))
                    }
                </div>
            )
        },
    }
]