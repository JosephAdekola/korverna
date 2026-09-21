import "server-only";

import { headers } from "next/headers";
import { auth } from "@/lib/better-auth/auth";

export const getServerSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user || !session?.session) {
        return null;
    }

    return session;
};