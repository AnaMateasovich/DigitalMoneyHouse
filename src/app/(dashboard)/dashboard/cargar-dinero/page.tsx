import CurrentLocation from '@/components/CurrentLocation'
import SelectMothodToAdd from '@/components/dashboard/addMoney/SelectMothodToAdd'
import React from 'react'

const page = () => {
  return (
    <>
      <CurrentLocation containerClass='mb-4 md:hidden' text='Cargar dinero' />
        <SelectMothodToAdd /> 
    </>
  )
}

export default page