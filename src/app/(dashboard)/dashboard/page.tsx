import CurrentLocation from '@/components/CurrentLocation'
import Button from '@/components/Button'
import ActivityCard from '@/components/dashboard/ActivityCard'
import DashboardMainCard from '@/components/dashboard/DashboardMainCard'
import SearchBar from '@/components/dashboard/SearchBar'
import React from 'react'

const page = () => {
  return (
    <>
      <CurrentLocation containerClass='mb-4' text='Inicio' />
      <DashboardMainCard />
      <div className='w-full flex flex-col gap-4 my-4'>
        <Button text='Ingresar dinero' className='w-full py-4 shadow-gray-300 shadow-md'/>
        <Button text='Pago de servicios' className='w-full py-4 shadow-gray-300 shadow-md'/>
      </div>
      <SearchBar placeholder='Buscar en tu actividad' className='my-2'/>
      <ActivityCard className='my-4'/>
    </>
  )
}

export default page