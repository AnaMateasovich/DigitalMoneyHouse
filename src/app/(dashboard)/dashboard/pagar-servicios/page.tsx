import CurrentLocation from '@/components/CurrentLocation'
import RecentServicesCard from '@/components/dashboard/payServices/RecentServicesCard'
import SearchbarPayServices from '@/components/dashboard/payServices/SearchbarPayServices'
import React from 'react'

const page = () => {
  return (
    <>
      <CurrentLocation containerClass='mb-4 md:hidden' text='Pagar servicios' to='/dashboard' />
      <div className='flex flex-col gap-4'>
        <SearchbarPayServices />
        <RecentServicesCard />
      </div>
    </>
  )
}

export default page