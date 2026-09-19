"use client"
import { authClient } from "@/lib/better-auth/auth-client";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";


type AdminSession = ReturnType<typeof authClient.useSession>["data"];

interface AdminContextProps {
    adminSession: AdminSession | null;
    setAdminSession: Dispatch<SetStateAction<AdminSession | null>>;
    isLoadingSession: boolean;
    setIsLoadingSession: Dispatch<SetStateAction<boolean>>
}

interface AdminContextProviderProps {
    children: ReactNode
}


const adminContext = createContext<AdminContextProps | null>(null)


export const AdminContextProvider = ({
    children
}: AdminContextProviderProps) => {

    const [adminSession, setAdminSession] = useState<AdminSession | null>(null)
    const [isLoadingSession, setIsLoadingSession] = useState(false)

    return (
        <adminContext.Provider
            value={{
                adminSession,
                setAdminSession,
                isLoadingSession,
                setIsLoadingSession
            }}>

            {children}

        </adminContext.Provider>
    )
}

export const useAdminContext = () => {
    const context = useContext(adminContext)

    if (!context) {
        throw new Error(
            "useAdminContext must be used within a AdminContextProvider"
        );
    }

    return context

}