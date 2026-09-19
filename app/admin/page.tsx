"use client"

import Button from '@/src/global_ui_vault/button'
import Link from '@/src/global_ui_vault/link'
import ShortText from '@/src/global_ui_vault/text_inputs/shortTexts'
import Image from 'next/image'
import React from 'react'

export default function page() {
    return (
        <div
            className='w-full h-screen flex flex-col justify-center items-center gap-5 
                bg-gray-dark/10 relative bg-cover bg-center bg-no-repeat bg-blend-overlay '
            style={{
                backgroundImage:
                    "url('https://ik.imagekit.io/pleddsolca/korverna%20limited/ChatGPT%20Image%20Jul%2031,%202026,%2007_33_04%20AM%20-%20Edited%20(1).png?updatedAt=1785480223193')"
            }}>
            <div
                className='container absolute top-5 left-5 right-5 flex justify-between gap-5'>
                <Link
                    href="/admin"
                    className="relative h-[30px] w-[200px] "
                >
                    <Image
                        src="https://ik.imagekit.io/pleddsolca/korverna%20limited/branding/limited_logo_gold_white_text.png?updatedAt=1786248222677"
                        alt="korverna_logo"
                        width={200}
                        height={50}
                        className="object-cover"
                    />
                </Link>
                <h3
                    className='text-background!'>
                    Admin Panel
                </h3>
            </div>
            <form
                action=""
                className='flex flex-col gap-3'>
                <ShortText
                    placeholder='Email?'
                    type="email" />
                <Button
                    type="submit">
                    Get in
                </Button>
            </form>
        </div>
    )
}
