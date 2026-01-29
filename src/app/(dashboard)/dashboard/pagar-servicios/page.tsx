import { Company } from '@/app/types/company.types'
import CurrentLocation from '@/components/CurrentLocation'
import ServicesCard from '@/components/dashboard/payServices/ServicesCard'
import SearchbarPayServices from '@/components/dashboard/payServices/SearchbarPayServices'

const page = () => {


  return (
    <>
      <CurrentLocation containerClass='mb-4 md:hidden' text='Pagar servicios' to='/dashboard' />
      <div className='flex flex-col gap-4'>
        <SearchbarPayServices />
        <ServicesCard />
      </div>
    </>
  )
}

export default page