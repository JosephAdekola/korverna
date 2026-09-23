import TabSwitch from '@/src/global_ui_vault/tabSwitch'
import React, { useState } from 'react'
import { tabData } from './data/tabData'
import SendEmail from './components/sendEmail'
import EmailSentHistory from './components/emailSentHistory/emailSentHistory'

export default function Emailing() {

    const [currentTab, setCurrentTab] = useState("sent-history")

    return (
        <div
            className='flex flex-col gap-5 max-w-full'>
            <TabSwitch
                tabs={tabData}
                setState={setCurrentTab} />
            <div className=''>
                {
                    currentTab === "send" ?
                        <SendEmail /> :
                        currentTab === "sent-history" ?
                            <EmailSentHistory /> :
                            null
                }
            </div>
        </div>
    )
}
