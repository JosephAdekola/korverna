import { Icon } from "lucide-react"
import { useRouter } from "next/navigation"
import {MessageSquare} from "lucide-react"

export const useAdminDashMenu = () => {

    const route = useRouter()

    const sidebarMenu = [
        {
            label: "emailing",
            Icon: <MessageSquare />,
            slug: "emailing",
            action: () => route.replace("/admin/dashboard?where=emailing")
        }
    ]

    return sidebarMenu
}