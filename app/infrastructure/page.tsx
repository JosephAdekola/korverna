"use client"
import React, { RefObject, useEffect, useRef, useState } from 'react'
import { useRootContext } from '@/src/contexts/rootContext'
import Button from '@/src/global_ui_vault/button'
import DialogueBox from '@/src/global_ui_vault/dialogueBox'
import QuoteForm from './components/quoteForm'
import { X } from 'lucide-react'
import { useInfrastructureContext } from '@/src/contexts/infrastructureContext'
import AboutUsCard from './components/aboutUsCard'

export default function page() {

  const companiesRef: RefObject<HTMLDivElement | null> = useRef(null)
  const notifyRef: RefObject<HTMLInputElement | null> = useRef(null)

  const {
    state,
    setShowContact
  } = useRootContext()
  const {
    showQuoteForm,
    setShowQuoteForm,
    showAboutUs,
    setShowAboutUs,
    showServices,
    setShowServices
  } = useInfrastructureContext()

  useEffect(() => {
    if (state.focus_companies) {
      companiesRef.current?.focus();
    }

    if (state.focus_notify_me) {
      notifyRef.current?.focus()
    }
  }, [state.focus_companies, state.focus_notify_me]);

  return (
    <div className='container grid grid-cols-1 lg:grid-cols-2 h-full'>

      {
        showQuoteForm && (
          <DialogueBox
            setDialogueBoxState={setShowQuoteForm}
            classname=' bg-background/80 container lg:max-w-[600px] max-h-[70vh] '
            body={<div>
              <div className='flex justify-between items-center'>
                <h4>
                  Quote Form
                </h4>
                <Button
                  variant="danger"
                  onClick={() => setShowQuoteForm(false)}>
                  <X />
                </Button>
              </div>
              <QuoteForm />
            </div>} />
        )
      }
      {
        showServices && (
          <DialogueBox
            setDialogueBoxState={setShowServices}
            classname=' bg-background/80 container lg:max-w-[600px] max-h-[70vh] '
            body={<div className=' flex flex-col gap-5'>
              <div className='flex justify-between items-center'>
                <h4>
                  What we do
                </h4>
                <Button
                  variant="danger"
                  onClick={() => setShowServices(false)}>
                  <X />
                </Button>
              </div>
              <AboutUsCard />
            </div>} />
        )
      }
      {
        showAboutUs && (
          <DialogueBox
            setDialogueBoxState={setShowAboutUs}
            classname=' bg-background/90 container lg:max-w-[600px] max-h-[70vh] '
            body={<div className='flex flex-col gap-5'>
              <div className='flex justify-between items-center'>
                <h4>
                  About Korverna Infrastructure
                </h4>
                <Button
                  variant="danger"
                  onClick={() => setShowAboutUs(false)}>
                  <X />
                </Button>
              </div>
              <p>
                Korverna Infrastructure is a trusted provider of heavy equipment hire, earthworks, and site development services. We support construction, infrastructure, and development projects with reliable machinery, experienced operators, and a strong commitment to safety, efficiency, and dependable service.

                Our goal is simple: to provide the equipment and expertise our clients need to keep projects moving, on time and on site.
              </p>

              <div className='flex justify-end'>
                <Button
                  className='text-foreground'
                  onClick={()=> {
                    setShowAboutUs(false);
                    setShowContact(true)
                  }}>
                  Contact us
                </Button>
              </div>
            </div>} />
        )
      }

      <div className='flex flex-col gap-5 lg:justify-center '>
        <div className='overflow-hidden'>
          <h2 className='capitalize text-center md:text-start text-background! '>
            <span className='text-primary'>
              Payloader
            </span> <br />
            available for hire
          </h2>
          <p className='text-center md:text-start text-background!'>
            We have payloaders readily available for hire, with a wide range of additional heavy machinery available to meet your project needs. Get in touch today and request a quote.
          </p>
        </div>
        <Button
          className='text-foreground'
          onClick={() => setShowQuoteForm(true)}>
          Get a quote
        </Button>
      </div>
    </div>
  )
}
