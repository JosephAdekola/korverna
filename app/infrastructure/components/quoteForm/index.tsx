import Button from '@/src/global_ui_vault/button'
import DatePicker from '@/src/global_ui_vault/datePicker'
import Textarea from '@/src/global_ui_vault/text_inputs/longText'
import PhoneInput from '@/src/global_ui_vault/text_inputs/phoneNumber'
import ShortText from '@/src/global_ui_vault/text_inputs/shortTexts'
import React from 'react'

export default function QuoteForm() {
  return (
    <form
      action=""
      className=' flex flex-col gap-5 '>
      <ShortText
        label="Full name"
        required
        placeholder='Enter your full name' />
      <ShortText
        label="Company"
        placeholder='Enter your company name(optional)' />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        <PhoneInput
          required
          label="Phone number" />
        <ShortText
          label="Email"
          placeholder='Enter your email address'
          type="email" />
      </div>
      <ShortText
        label="Project location"
        placeholder='Enter your project address(optional)'
        required
      />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        <DatePicker
          label="Start date" />
        <DatePicker
          label="End date" />
      </div>
      <Textarea
        label="More details"
        placeholder='Share more information about your project/needs.' />
      <Button
        className='text-foreground'>
        Submit
      </Button>
    </form>
  )
}
