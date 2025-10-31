import CurrentLocation from '@/components/CurrentLocation'
import EnterAmount from '@/components/dashboard/addMoney/EnterAmount'
import React from 'react'

const page = () => {
    return (
        <>
            <CurrentLocation containerClass='mb-4' text='Cargar dinero' to="/dashboard/cargar-dinero/tarjetas" />
            <EnterAmount/>
        </>
    )
}

export default page