import Button from '@/components/Button'
import CurrentLocation from '@/components/CurrentLocation'
import UserCards from '@/components/dashboard/creditCards/UserCards'
import ResumeService from '@/components/dashboard/payServices/ResumeService'

const page = () => {
  return (
    <>
      <CurrentLocation containerClass='mb-4 md:hidden' text='Pagar servicios' to='/dashboard' />
      <ResumeService />
    </>
  )
}

export default page