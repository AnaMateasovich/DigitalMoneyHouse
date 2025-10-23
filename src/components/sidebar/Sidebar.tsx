'use client'
import { useAuth } from '@/contexts/AuthContext'
import { useToggleMenu } from '@/contexts/ToggleMenuContext'
import { X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import SidebarLinks from './SidebarLinks'


const Sidebar = () => {

  const { fullNameFormatUser } = useAuth()
  const { toggle, openCloseMenu } = useToggleMenu()


  return (
    <>
      <div className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 z-1 ${
          toggle ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}></div>
    <aside className={`fixed top-0 right-0 min-h-screen w-3/5 bg-[var(--color-primary)] text-[#201F22] z-50  transition-transform duration-300 ease-in-out
        ${toggle ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className='bg-[var(--color-secondary)] h-30 flex items-end text-[var(--color-primary)]'>
          <button onClick={openCloseMenu}>
            <X className="absolute top-4 right-4" size={35} />
          </button>
          <p className='ml-6 mb-6 text-xl font-semibold'>Hola, <br />{fullNameFormatUser()}</p>
        </div>
        <SidebarLinks />
    </aside>
    </>
  )
}

export default Sidebar