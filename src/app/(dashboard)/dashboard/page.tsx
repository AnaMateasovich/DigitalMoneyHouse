import CurrentLocation from '@/components/CurrentLocation'
import Button from '@/components/Button'
import ActivityCard from '@/components/dashboard/activity/ActivityCard'
import DashboardMainCard from '@/components/dashboard/DashboardMainCard'
import SearchBar from '@/components/dashboard/SearchBar'
import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <div className='w-full'>
      <CurrentLocation containerClass='mb-4 md:hidden' text='Inicio' />
      <DashboardMainCard />
      <div className='w-full flex flex-col gap-4 my-4'>
        <Link href="/dashboard/cargar-dinero" className='w-full py-4 bg-[var(--color-primary)] shadow-gray-300 shadow-md rounded-md text-xl font-semibold text-center'>Ingresar dinero</Link>
        <Link href="/dashboard/pagar-servicios" className='w-full py-4 bg-[var(--color-primary)] shadow-gray-300 shadow-md rounded-md text-xl font-semibold text-center'>Pago de servicios</Link>
      </div>
      <SearchBar placeholder='Buscar en tu actividad' className='my-2' />
      <ActivityCard className='my-4' />
    </div>
  )
}

export default page