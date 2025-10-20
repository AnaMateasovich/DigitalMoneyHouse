'use client'
import { useAuth } from '@/contexts/AuthContext'
import React from 'react'

const DashboardMainCard = () => {

const {account} = useAuth()
console.log(account)
  return (
    <div className='bg-gray-900 rounded-xl p-6 text-white '>
      <div className='flex gap-2 justify-end'>
        <button className='underline'>Ver tarjetas</button>
        <button className='underline'>Ver CVU</button>
      </div>
      <div className='mt-4'>
        <p className='text-lg'>Dinero disponible</p>
        <p className='inline-block font-bold text-2xl mt-2 py-2 px-6 border-2 border-[var(--color-primary)] rounded-full'>$ {account?.available_amount}</p>
        {/* <p>${account?.available_amount}</p> */}
      </div>
    </div>
  )
}
export default DashboardMainCard