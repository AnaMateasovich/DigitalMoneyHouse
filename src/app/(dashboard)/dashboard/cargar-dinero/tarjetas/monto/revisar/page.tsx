import CurrentLocation from '@/components/CurrentLocation'
import ReviewDeposit from '@/components/dashboard/addMoney/ReviewDeposit'
import React from 'react'

const page = () => {
    return (
        <>
            <CurrentLocation containerClass='mb-4' text='Cargar dinero' to="/dashboard/cargar-dinero/tarjetas/monto" />
            <ReviewDeposit />
        </>
    )
}

export default page