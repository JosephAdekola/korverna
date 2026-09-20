"use client"

import { authClient } from '@/lib/better-auth/auth-client'
import { useAdminContext } from '@/src/contexts/adminContextProvider'
import React, { ReactNode, useEffect } from 'react'
import AdminLoading from './components/adminLoading'

export default function adminLayout({
  children
}: {
  children: ReactNode
}) {

  const {
    setAdminSession,
    setIsLoadingSession
  } = useAdminContext()

  const {
    data: session,
    isPending
  } = authClient.useSession()

  useEffect(() => {
    setIsLoadingSession(isPending)

    if (isPending) return

    setAdminSession(session ?? null)
  }, [
    session,
    isPending,
    setAdminSession,
    setIsLoadingSession
  ])

  if (isPending) {
    return <AdminLoading />
  }

  return (
    <div className='bg-background'>
      {children}
    </div>
  )
}