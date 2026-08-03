"use client"
import React from 'react'
import Button from '@/src/global_ui_vault/button'
import { ArrowRight, CircleSmall, Forklift, LayoutDashboard } from 'lucide-react'
import ShortText from '@/src/global_ui_vault/text_inputs/shortTexts'

export default function page() {
  return (
    <div className='container grid grid-cols-1 lg:grid-cols-[7fr_3fr]'>
      <div className='flex flex-col gap-10 '>
        <div>
          <Button
            variant="ghost"
            className='cursor-auto! p-0'
            leftIcon={
              <CircleSmall
                size={15}
                className='text-primary bg-primary rounded-full' />
            }>
            <h6 className='uppercase text-primary! font-bold tracking-widest'>
              lunching soon
            </h6>
          </Button>
          <h1 className='capitalize'>
            building businesses that build <i></i>
            <span className='text-primary'>
              Tomorrow
            </span>
          </h1>
          <p>
            A diversified company creating sustainable businesses across
            infrastructure and strategic industries
          </p>
        </div>
        <div className='flex flex-col lg:flex-row items-center gap-5'>
          <Button
            className='text-foreground capitalize w-full lg:w-fit whitespace-nowrap'
            rightIcon={
              <ArrowRight />
            }>
            explore infrastructure
          </Button>
          <ShortText
              placeholder='Enter your email'
              containerClassName='w-full lg:w-fit'
              rightIcon={
                <Button
                  className='text-background bg-foreground capitalize
                     translate-x-4 lg:translate-x-10'>
                  notify me
                </Button>
              } />
        </div>
        <div className='flex flex-col gap-5'>
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
