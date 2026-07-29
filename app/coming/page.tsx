"use client"
import React from 'react'
import MainNavBar from './root_components/main_nav/main_nav_bar'

export default function page() {
  return (
    <main className='py-5'>
        <nav className='container'>
            <MainNavBar />
        </nav>
    </main>
  )
}
