import CurrentLocation from '@/components/CurrentLocation'
import { AccountNumberBox } from '@/components/dashboard/payServices/AccountNumberBox'
import React from 'react'

const page = () => {
    return (
        <>
            <CurrentLocation containerClass='mb-4 md:hidden' text='Pagar servicios' to='/dashboard/pagar-servicios' />
            <AccountNumberBox />
        </>
    )
}

export default page