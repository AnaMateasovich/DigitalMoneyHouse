'use client'
import { usePayService } from '@/contexts/PayServiceContext'
import React, { useState } from 'react'
import UserCards from '../creditCards/UserCards'
import Button from '@/components/Button'
import { useRouter } from 'next/navigation'
import PayWithBalanceButton from '@/components/PayWithBalanceButton'

const ResumeService = () => {

    const router = useRouter()
    const { service, selectedCard, payService, error } = usePayService()


    const handlePayService = async () => {
        try {
            await payService()

            router.push(`/dashboard/pagar-servicios/${service?.id}/resumen/checkout`)
        } catch (err) {
            console.error(err)
        }
    }


    console.log(service, selectedCard, error)
    return (
        <section>
            <div className='bg-[var(--color-secondary)] text-white rounded-xl p-6 flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <div className='self-end'>
                        <button>Ver detalles del pago</button>
                    </div>
                    <h3 className='h3 text-[var(--color-primary)] '>{service?.name}</h3>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <p className='h4'>Total a pagar</p>
                    <p className='h4'>${service?.amount}</p>
                </div>

            </div>
            <div className='my-6 flex flex-col gap-3'>
                <h3 className='h4'>Elije el medio de pago</h3>
                <PayWithBalanceButton error={error}/>
                <UserCards mode='select' />
            </div>
            <div className='flex justify-end'>
                <Button text='Pagar' className='py-2 px-16' onClick={handlePayService} />
            </div>
        </section>
    )
}

export default ResumeService