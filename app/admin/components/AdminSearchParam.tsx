"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface AdminSearchParamProps {
    setErrorMessage: (message: string) => void;
}

export default function AdminSearchParam({
    setErrorMessage,
}: AdminSearchParamProps) {
    const params = useSearchParams();

    const currentError = params.get("error");

    useEffect(() => {
        if (!currentError) return;

        const formattedError = currentError
            .toLowerCase()
            .replace(/_/g, " ");

        setErrorMessage(formattedError);
    }, [currentError, setErrorMessage]);

    return null;
}