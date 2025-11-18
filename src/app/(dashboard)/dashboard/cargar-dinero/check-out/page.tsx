import CurrentLocation from '@/components/CurrentLocation'
import DepositCheckout from '@/components/dashboard/addMoney/DepositCheckout'
import React from 'react'

const page = () => {
    return (
        <>
            <CurrentLocation containerClass='mb-4 md:hidden' text='Cargar dinero' to="/dashboard/cargar-dinero " />
            <DepositCheckout />
        </>
    )
}

export default page