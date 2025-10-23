import CurrentLocation from '@/components/CurrentLocation'
import AddCards from '@/components/dashboard/creditCards/AddCards'
import UserCards from '@/components/dashboard/creditCards/UserCards'
import React from 'react'

const page = () => {
  return (
    <>
      <CurrentLocation containerClass='mb-4' text='Tarjetas' />
      <AddCards className='mb-5'/>
      <UserCards/>
    </>
  )
}

export default page