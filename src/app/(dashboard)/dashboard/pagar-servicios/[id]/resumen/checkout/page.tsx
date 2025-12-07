import CurrentLocation from '@/components/CurrentLocation'
import ServicePayment from '@/components/dashboard/payServices/ServicePayment'
import React from 'react'

const page = () => {
  return (
     <>
      <CurrentLocation containerClass='mb-4 md:hidden' text='Pagar servicios' to='/dashboard' />
      <ServicePayment />
     
    </>
  )
}

export default page