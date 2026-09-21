import Select from '@/src/global_ui_vault/dropdown'
import React, { useState, useTransition } from 'react'
import { emailFromData, EmailSendersProps } from '../data/emailFromData'
import Textarea from '@/src/global_ui_vault/text_inputs/longText'
import ShortText from '@/src/global_ui_vault/text_inputs/shortTexts'
import Button from '@/src/global_ui_vault/button'
import FileUpload from '@/src/global_ui_vault/filesUpload'
import { handleFielldChange } from '../functions/handleFieldChange'
import { FormErrorMessage } from '@/src/global_ui_vault/form-message/error'
import { FormSucessMessage } from '@/src/global_ui_vault/form-message/success'
import { handleSendEmail } from '../functions/handleSendEmail'

export default function SendEmail() {

    const [sender, setSender] = useState<EmailSendersProps | null>(null)

    const [receiver, setReceiver] = useState<string>("")

    const [subject, setSubject] = useState<string>("")

    const [body, setBody] = useState<string>("")

    const [attachments, setAttachments] = useState<File[]>([])

    const [errorMessage, setErrorMessage] = useState<string>("")

    const [successMessage, setSuccessMessage] = useState<string>("")

    const [isSendingEmail, startSendingEmail] = useTransition()

    const payload = {
        sender, receiver, subject, body, attachments
    }    

    return (
        <form
            className='flex flex-col gap-5 pb-5'
            onSubmit={e=>{
                e.preventDefault();
                handleSendEmail({
                    payload, setErrorMessage, setSuccessMessage, startSendingEmail
                })
            }}>
            <Select
                label="From"
                placeholder='Select a sender '
                options={emailFromData}
                required
                value={sender}
                onChange={(e: EmailSendersProps | null) => {
                    handleFielldChange({
                        setErrorMessage,
                        setSuccessMessage,
                        value: e,
                        setValue: setSender
                    })
                }} />

            <Textarea
                label="To"
                placeholder='Enter one email or multiple emails separated by comma'
                required
                value={receiver}
                onChange={e => {
                    handleFielldChange({
                        setErrorMessage,
                        setSuccessMessage,
                        value: e.target.value,
                        setValue: setReceiver
                    })
                }} />

            <ShortText
                label="Subject"
                placeholder='Email subject'
                required
                value={subject}
                onChange={e => {
                    handleFielldChange({
                        setErrorMessage,
                        setSuccessMessage,
                        value: e.target.value,
                        setValue: setSubject
                    })
                }} />

            <Textarea
                label="Body"
                placeholder='Email body text'
                required
                value={body}
                onChange={e => {
                    handleFielldChange({
                        setErrorMessage,
                        setSuccessMessage,
                        value: e.target.value,
                        setValue: setBody
                    })
                }} />

            <FileUpload
                label="Attachments"
                onChange={val => {
                    handleFielldChange({
                        setErrorMessage,
                        setSuccessMessage,
                        value: val,
                        setValue: setAttachments
                    })
                }} />

            <Button
                type="submit"
                loading={isSendingEmail}>
                Send
            </Button>
            {
                errorMessage && <FormErrorMessage message={errorMessage} />
            }
            {
                successMessage && <FormSucessMessage message={successMessage} />
            }

        </form>
    )
}
