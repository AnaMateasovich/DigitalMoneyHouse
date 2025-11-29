'use client'
import React, { useState } from 'react'
import compaines from '../../../db.js'
import Image from 'next/image.js'
import { useRouter } from 'next/navigation.js'
import { usePayService } from '@/contexts/PayServiceContext'


const RecentServicesCard = () => {

    const { selectedService, setSelectedService } = usePayService()
    const router = useRouter()

    const goToPayService = (id: number) => {
        setSelectedService(id)
        router.push(`/dashboard/pagar-servicios/${id}`)
    }

    return (
        <section className='bg-white p-6 rounded-xl text-[#201F22] shadow-gray-300 shadow-md'>
            <p className='font-semibold text-xl mb-4'>Más recientes</p>
            <hr className='text-gray-400 mb-3' />
            {compaines.map((companie) => (
                <div key={companie.id} >
                    <div className='flex justify-between items-center my-2'>
                        <div className='flex gap-4 items-center'>
                            <Image src={companie.src} alt={companie.name} width={70} height={15} className='h-15 object-cover' />
                            <p>{companie.name}</p>
                        </div>
                        <button className='font-semibold' onClick={() => goToPayService(companie.id)}>Seleccionar</button>
                    </div>
                    <hr className='text-gray-400' />
                </div>
            ))}

        </section>
    )
}

export default RecentServicesCard