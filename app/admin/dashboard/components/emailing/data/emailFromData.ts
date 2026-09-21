import { SelectOption } from "@/src/global_ui_vault/dropdown";


export type EmailSendersProps = "coo@korverna.com" | "joseph@korverna.com"

export const emailFromData: SelectOption<EmailSendersProps>[] = [
    {
        label: "coo@korverna.com",
        value: "coo@korverna.com"
    },
    {
        label: "joseph@korverna.com",
        value: "joseph@korverna.com"
    }
]