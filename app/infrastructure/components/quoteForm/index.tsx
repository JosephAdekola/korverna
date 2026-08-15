import Button from '@/src/global_ui_vault/button'
import DatePicker from '@/src/global_ui_vault/datePicker'
import Textarea from '@/src/global_ui_vault/text_inputs/longText'
import PhoneInput from '@/src/global_ui_vault/text_inputs/phoneNumber'
import ShortText from '@/src/global_ui_vault/text_inputs/shortTexts'
import React, { ReactNode, useState } from 'react'
import { handleFieldChange } from './functions/fieldChange'
import { FormErrorMessage } from '@/src/global_ui_vault/form-message/error'
import { FormSucessMessage } from '@/src/global_ui_vault/form-message/success'
import { handleSubmitQuote } from './functions/submitQuote'

export default function QuoteForm() {

  const [errorMessage, setErrorMessage] = useState<string[]>([])
  const [successMessage, setSuccessMessage] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const [name, setName] = useState<string>("")
  const [company, setCompany] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [start, setStart] = useState<string>("")
  const [end, setEnd] = useState<string>("")
  const [description, setDescription] = useState<string>("")

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmitQuote({
          payload: {
            name, company, phone, email, location, start, end, description
          },
          setErrorMessage,
          setSuccessMessage,
          setIsSubmitting
        })
      }}
      className=' flex flex-col gap-5 '>
      <ShortText
        label="Full name"
        required
        placeholder='Enter your full name'
        value={name}
        onChange={e => handleFieldChange(e.target.value, setErrorMessage, setSuccessMessage, setName)} />
      <ShortText
        label="Company"
        placeholder='Enter your company name(optional)'
        value={company}
        onChange={e => handleFieldChange(e.target.value, setErrorMessage, setSuccessMessage, setCompany)} />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        <PhoneInput
          required
          label="Phone number"
          value={phone}
          onChange={value => handleFieldChange(value, setErrorMessage, setSuccessMessage, setPhone)} />
        <ShortText
          label="Email"
          placeholder='Enter your email address'
          type="email"
          value={email}
          onChange={e => handleFieldChange(e.target.value, setErrorMessage, setSuccessMessage, setEmail)} />
      </div>
      <ShortText
        label="Project location"
        placeholder='Enter your project address(optional)'
        required
        value={location}
        onChange={e => handleFieldChange(e.target.value, setErrorMessage, setSuccessMessage, setLocation)} />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        <DatePicker
          label="Start date"
          value={start}
          onChange={value => handleFieldChange(value, setErrorMessage, setSuccessMessage, setStart)} />
        <DatePicker
          label="End date"
          value={end}
          onChange={value => handleFieldChange(value, setErrorMessage, setSuccessMessage, setEnd)} />
      </div>
      <Textarea
        label="More details"
        placeholder='Share more information about your project/needs.'
        value={description}
        onChange={e => handleFieldChange(e.target.value, setErrorMessage, setSuccessMessage, setDescription)} />
      {
        errorMessage.length > 0 && (
          <div className='flex flex-col gap-1'>
            {
              errorMessage.map((err, idx) => (
                <FormErrorMessage
                  key={idx}
                  message={err} />
              ))
            }
          </div>
        )
      }
      {
        successMessage.length > 0 && (
          <div className='flex flex-col gap-1'>
            {
              successMessage.map((err, idx) => (
                <FormSucessMessage
                  key={idx}
                  message={err} />
              ))
            }
          </div>
        )
      }
      <Button
        type="submit"
        loading={isSubmitting}
        className='text-foreground'>
        Submit
      </Button>
    </form>
  )
}
