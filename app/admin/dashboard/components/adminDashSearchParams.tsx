import { useSearchParams } from 'next/navigation'
import React, { Dispatch, SetStateAction, useEffect } from 'react'

export default function AdminDashSearchParams({
    setCurrentPage
}: {
    setCurrentPage: Dispatch<SetStateAction<string>>
}) {

    const params = useSearchParams()

    const currentPage = params.get("where")

    useEffect(()=>{
        if (!currentPage) {
            return
        }

        setCurrentPage(currentPage)
    }, [currentPage])

  return null
}
