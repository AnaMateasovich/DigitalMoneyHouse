import CurrentLocation from '@/components/CurrentLocation'
import ActivityCard from '@/components/dashboard/activity/ActivityCard'
const page = () => {
  return (
    <section className=''>
      <CurrentLocation containerClass='mb-4 md:hidden' text='Actividad' to='/dashboard' />
      <ActivityCard />
    </section>
  )
}

export default page