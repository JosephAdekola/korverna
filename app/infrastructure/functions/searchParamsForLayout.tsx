import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'

export default function SearchParamsForLayout() {
    const searchParams = useSearchParams();

    useEffect(() => {
        fetch("/api/v1/infrastructure/traffic", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                machine: searchParams.get("machine"),
                utmSource: searchParams.get("utm_source"),
                utmMedium: searchParams.get("utm_medium"),
                utmCampaign: searchParams.get("utm_campaign"),
                utmTerm: searchParams.get("utm_term"),
                utmContent: searchParams.get("utm_content"),
            }),
        }).catch((error) => {
            console.error("Failed to record traffic:", error);
        });
    }, [searchParams]);

    return null
}
