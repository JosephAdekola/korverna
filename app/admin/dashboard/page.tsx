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
      className='flex container h-screen overflow-y-scroll bg-background'>
        <Suspense fallback={null}>
          <AdminDashSearchParams setCurrentPage={setCurrentPage} />
        </Suspense>
      <div
        className='border p-3'>
        <Sidebar
          currentPage={currentPage} />
      </div>
      <div
        className='border p-3 w-full'>
          {
            currentPage === "emailing" ?
            <Emailing /> :
            <AdminDashIndexPage />
          }
      </div>
    </div>
  )
}
