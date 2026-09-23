"use client"

import { useAdminContext } from '@/src/contexts/adminContextProvider'
import { useRouter } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'
import Sidebar from './components/sideBar'
import AdminDashSearchParams from './components/adminDashSearchParams'
import Emailing from './components/emailing'
import AdminDashIndexPage from './components/adminDashIndex'

export default function page() {

  const router = useRouter()

  const { adminSession, isLoadingSession } = useAdminContext()

  const [currentPage, setCurrentPage] = useState<string>("")

  useEffect(() => {
    if (isLoadingSession) return

    if (!adminSession) {
      router.replace("/admin")
    }
  }, [adminSession, isLoadingSession, router])

  return (
    <div
      className='grid grid-cols-[auto_1fr] container h-screen overflow-hidden bg-background'>
        <Suspense fallback={null}>
          <AdminDashSearchParams setCurrentPage={setCurrentPage} />
        </Suspense>
      <div
        className='py-3 px-1 md:px-3'>
        <Sidebar
          currentPage={currentPage} />
      </div>
      <div
        className='py-3 px-1 md:px-3 overflow-hidden '>
          {
            currentPage === "emailing" ?
            <Emailing /> :
            <AdminDashIndexPage />
          }
      </div>
    </div>
  )
}
