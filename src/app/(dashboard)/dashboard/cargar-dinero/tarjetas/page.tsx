import Button from '@/components/Button'
import CurrentLocation from '@/components/CurrentLocation'
import SelectFromCards from '@/components/dashboard/addMoney/SelectFromCards'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <>
            <CurrentLocation containerClass='mb-4 md:hidden' text='Cargar dinero' to="/dashboard/cargar-dinero" />
            <SelectFromCards />
        </>
    )
}

export default page