import CurrentLocation from '@/components/CurrentLocation'
import FormCreateCreitCard from '@/components/dashboard/creditCards/FormCreateCreitCard'
import React from 'react'

const page = () => {
    return (
    <>
        <CurrentLocation containerClass='mb-4' text='Tarjetas' />
        <section className='bg-white p-5 rounded-xl'>
            <FormCreateCreitCard  />
        </section>
    </>
    )
}

export default page