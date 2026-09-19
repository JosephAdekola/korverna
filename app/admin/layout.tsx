// "use client"
// import { useAdminContext } from '@/src/contexts/adminContextProvider'
// import React, { ReactNode } from 'react'

// export default function adminLayout({
//   children
// }: {
//   children: ReactNode
// }) {

//   const {
//     adminSession,
//     setAdminSession,
//     isLoadingSession,
//     setIsLoadingSession
//   } = useAdminContext()

//   return (
//     <div className='bg-background'>
//       {children}
//     </div>
//   )
// }


"use client"

import { authClient } from '@/lib/better-auth/auth-client'
import { useAdminContext } from '@/src/contexts/adminContextProvider'
import React, { ReactNode, useEffect } from 'react'

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

    if (session) {
      setAdminSession(session)
    } else {
      setAdminSession(null)
    }
  }, [
    session,
    isPending,
    setAdminSession,
    setIsLoadingSession
  ])

  return (
    <div className='bg-background'>
      {children}
    </div>
  )
}