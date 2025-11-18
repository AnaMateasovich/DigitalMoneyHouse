import CurrentLocation from '@/components/CurrentLocation'
import UserAccountDataCard from '@/components/dashboard/profile/UserAccountDataCard'
import React from 'react'

const page = () => {
    return (
        <>
            <CurrentLocation containerClass='mb-4 md:hidden' text='Cargar dinero' to="/dashboard/cargar-dinero" />
            <UserAccountDataCard />
        </>
    )
}

export default page