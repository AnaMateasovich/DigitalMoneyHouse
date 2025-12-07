import CurrentLocation from '@/components/CurrentLocation'
import MakeDeposit from '@/components/dashboard/addMoney/MakeDeposit'
import ReviewRecipt from '@/components/ReviewRecipt'
import React from 'react'

const page = () => {
    return (
        <>
            <CurrentLocation containerClass='mb-4 md:hidden' text='Cargar dinero' to="/dashboard/cargar-dinero/tarjetas/monto" />
            <MakeDeposit />
        </>
    )
}

export default page