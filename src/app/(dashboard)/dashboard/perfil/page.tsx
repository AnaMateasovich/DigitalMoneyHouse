import Button from '@/components/Button'
import CurrentLocation from '@/components/CurrentLocation'
import React from 'react'
import { ArrowRight, Link } from 'lucide-react'
import UserPersonalDataCard from '@/components/dashboard/profile/UserPersonalDataCard'
import UserAccountDataCard from '@/components/dashboard/profile/UserAccountDataCard'

const page = () => {
  return (
    <>
      <CurrentLocation containerClass='mb-4 md:hidden' text='Perfil' />
      <UserPersonalDataCard />
      <Link href="/dashboard/tarjetas">
        <Button text='Gestioná los medios de pago' iconRight={<ArrowRight />} className='w-full px-4 py-4 my-6 shadow-md' />
      </Link>
      <UserAccountDataCard />
    </>
  )
}

export default page