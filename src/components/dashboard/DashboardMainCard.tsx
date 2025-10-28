'use client'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import React from 'react'

const DashboardMainCard = () => {

const {account} = useAuth()

  const fomatedAmount = account?.available_amount.toFixed(2).replace('.', ',')

  return (
    // Bg can be secondary color but looks nice in gray-900
    <div className='bg-gray-900 rounded-xl p-6 text-white '>
      <div className='flex gap-2 justify-end'>
        <Link href="/dashboard/tarjetas" className='underline'>Ver tarjetas</Link>
        <Link href="/dashboard/perfil" className='underline'>Ver CVU</Link>
      </div>
      <div className='mt-4'>
        <p className='text-lg'>Dinero disponible</p>
        <p className='inline-block font-bold text-2xl mt-2 py-2 px-6 border-2 border-[var(--color-primary)] rounded-full'>$ {fomatedAmount}</p>
        {/* <p>${account?.available_amount}</p> */}
      </div>
    </div>
  )
}
export default DashboardMainCard