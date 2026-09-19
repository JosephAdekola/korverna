import React, { ReactNode } from 'react'

export default function adminLayout({
    children
}: {
    children: ReactNode
}) {
  return (
    <div className='bg-background '
            >
        {children}
    </div>
  )
}
