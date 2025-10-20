import BackNavigation from '@/components/BackNavigation'
import Button from '@/components/Button'
import DashboardMainCard from '@/components/dashboard/DashboardMainCard'
import React from 'react'

const page = () => {
  return (
    <main className='bg-gray-100 p-4'>
      <BackNavigation to="/" containerClass='mb-4' text='Inicio' />
      <DashboardMainCard />
      <div className='w-full flex flex-col gap-4 my-4'>
        <Button text='Ingresar dinero' className='w-full py-4 shadow-gray-300 shadow-md'/>
        <Button text='Pago de servicios' className='w-full py-4 shadow-gray-300 shadow-md'/>
      </div>
    </main>
  )
}

export default page