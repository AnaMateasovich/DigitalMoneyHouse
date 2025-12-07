'use client'
import Button from '@/components/Button'
import ReviewRecipt from '@/components/ReviewRecipt'
import { useAuth } from '@/contexts/AuthContext'
import { useCreditCard } from '@/contexts/CreditCardsContext'
import { useTransference } from '@/contexts/TransferenceContext'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const MakeDeposit = () => {

    const { selectedCard, } = useCreditCard()
    const { amount, makeDeposit } = useTransference()

    const router = useRouter()

    const handleMakeDeposit = () => {
        if (Number(amount) > 0 && selectedCard) {
            makeDeposit()
        }
        router.push('/dashboard/cargar-dinero/check-out')
        console.log('se hizo el deposito')
    }
    return (
        <>
            <ReviewRecipt />
            <div className='flex justify-end mt-4'>
                <Button text='Continuar' onClick={handleMakeDeposit} className='btn-size' />
            </div>
        </>
    )
}

export default MakeDeposit