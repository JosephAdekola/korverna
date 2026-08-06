"use client"
import React, { RefAttributes, RefObject, useEffect, useRef, useState } from 'react'
import Button from '@/src/global_ui_vault/button'
import { ArrowRight, CircleSmall, Forklift, LayoutDashboard } from 'lucide-react'
import ShortText from '@/src/global_ui_vault/text_inputs/shortTexts'
import { useRootContext } from '@/src/contexts/rootContext'
import { submitNewsletter } from './root_functions/submitNewsletter'

export default function page() {

  const companiesRef: RefObject<HTMLDivElement | null> = useRef(null)
  const notifyRef: RefObject<HTMLInputElement | null> = useRef(null)
 
  const { state, dispatch } = useRootContext()

  const [email, setEmail] = useState<string>("") 
  const [errorMessage, setErrorMessage] = useState<string>("") 
  const [successMessage, setSuccessMessage] = useState<string>("")
  const [isSubmittingNewsLetter, setIsSubmittingNewsLetter] = useState<boolean>(false)
  
  useEffect(() => {
    if (state.focus_companies) {
      companiesRef.current?.focus();
    }

    if (state.focus_notify_me) {
      notifyRef.current?.focus()
    }
  }, [state.focus_companies, state.focus_notify_me]);

  return (
    <div className='container grid grid-cols-1 lg:grid-cols-[7fr_3fr]'>
      <div className='flex flex-col gap-10 '>
        <div>
          <h1 className='capitalize text-center md:text-start'>
            building businesses that build <i></i>
            <span className='text-primary'>
              Tomorrow
            </span>
          </h1>
          <p className='text-center md:text-start'>
            A diversified company creating sustainable businesses across
            infrastructure and strategic industries
          </p>
        </div>
        <div className='flex flex-col lg:flex-row items-center gap-5'>
          <Button
            className='text-foreground capitalize w-full lg:w-fit whitespace-nowrap'
            rightIcon={
              <ArrowRight />
            }
            onClick={()=>{
              dispatch("FOCUS_NOTIFY_ME")
              setTimeout(() => {
                dispatch("UNFOCUS_NOTIFY_ME")
              }, 10);
            }}>
            Subscribe to our newsletter
          </Button>
          <ShortText
            ref={notifyRef}
            type="email"
            placeholder='Enter your email'
            error={errorMessage}
            success={successMessage}
            loading={isSubmittingNewsLetter}
            inputClassName='pr-30 md:pr-24'
            containerClassName='w-full lg:w-fit'
            rightIcon={
              <Button
                loading={isSubmittingNewsLetter}
                onClick={()=>submitNewsletter(
                  {email},
                  "LIMITED",
                  setErrorMessage,
                  setSuccessMessage,
                  setIsSubmittingNewsLetter
                )}
                className='text-background bg-foreground capitalize
                     translate-x-4 lg:translate-x-10 '>
                subscribe
              </Button>
            }
            value={email}
            onChange={e=>{
              setErrorMessage("");
              setSuccessMessage("")
              setEmail(e.target.value)
            }} />
        </div>
        <div
          ref={companiesRef}
          tabIndex={-1}
          className={`flex flex-col gap-5 ${state.focus_companies
              ? "border-3 border-primary! rounded-lg! animate-bounce"
              : ""
            }`}
        >
          <h6 className='capitalize'>
            our companies
          </h6>
          <div className='flex flex-col lg:flex-row gap-5'>
            <Button
              variant="outline"
              className='border-foreground-muted! py-7! justify-start'
              leftIcon={<Forklift size={30} className='bg-primary/20 p-1 rounded' />}
              rightIcon={<ArrowRight className='text-primary' />}>
              <h6 className='text-start'>
                Korverna Infrastructure
              </h6>
              <p className='text-start text-xs!'>
                Earthworks, Heavy equipments, Civil construction
              </p>
            </Button>

            <Button
              variant="outline"
              className='border-foreground-muted! py-7! justify-start'
              leftIcon={<LayoutDashboard size={30} className='bg-primary/20 p-1 rounded' />}>
              <h6 className='text-start'>
                More Companies
              </h6>
              <p className='text-start text-xs!'>
                Coming Soon
              </p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
