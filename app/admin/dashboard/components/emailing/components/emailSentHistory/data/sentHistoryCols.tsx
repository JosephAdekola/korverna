import { TableColumnProps } from "@/src/global_ui_vault/table/types";
import { SentHistoryRowsProps } from "./sentHistoryRows";


export const sentHistoryCols: TableColumnProps<SentHistoryRowsProps>[] = [
    {
        key: "createdAt",
        header: "Date",
        render(row) {
            return (
                row.createdAt.getTime()
            )
        },
    }
]