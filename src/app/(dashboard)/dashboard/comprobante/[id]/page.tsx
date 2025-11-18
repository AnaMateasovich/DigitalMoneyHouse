import CurrentLocation from '@/components/CurrentLocation'
import ReviewRecipt from '@/components/dashboard/addMoney/ReviewRecipt'
import React from 'react'

const page = () => {
  return (
    <>
      <CurrentLocation containerClass='mb-4 md:hidden' text='Comprobante' to='/dashboard'/>
        <ReviewRecipt />
    </>
  )
}

export default page