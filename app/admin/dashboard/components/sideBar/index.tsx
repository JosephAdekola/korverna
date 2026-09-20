import Link from '@/src/global_ui_vault/link'
import Image from 'next/image'
import React from 'react'
import { useAdminDashMenu } from './data/sidebarMenuItems'

export default function Sidebar({
  currentPage
}: {
  currentPage: string
}) {

  const menu = useAdminDashMenu()


  return (
    <div
      className='flex flex-col gap-10'>
      <Link
        href="/admin/dashboard"
        className="relative h-[30px] w-[200px] hidden md:block"
      >
        <Image
          src="https://ik.imagekit.io/pleddsolca/korverna%20infrastructure/branding/logo%20and%20name.png?updatedAt=1785301349063"
          alt="korverna_logo"
          width={200}
          height={50}
          className="object-cover"
        />
      </Link>
      <Link
        href="/admin/dashboard"
        className="relative md:hidden"
      >
        <Image
          src={"/logo.png"}
          alt="korverna_logo"
          width={50}
          height={50}
          className="object-cover"
        />
      </Link>
      <ul>
        {
          menu.map((men, idx) => {
            const isActive = currentPage == men.slug

            return (
              <li
                key={idx}
                className={`flex items-center justify-center md:justify-start gap-2
                  ${isActive && "border bg-primary-hover/30"}
                  px-1`}
                onClick={()=> men.action()}
              >
                {men.Icon}
                <p
                  className='capitalize hidden md:block text-foreground!'>
                  {men.label}
                </p>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
