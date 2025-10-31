'use client'
import React from 'react'
import AddMoneyCardContainer from './AddMoneyCardContainer'
import { FilePen } from 'lucide-react'
import { useCreditCard } from '@/contexts/CreditCardsContext'

const ReviewDeposit = () => {

    const { amount } = useCreditCard()

    return (
        <AddMoneyCardContainer href='' condition={true}>
            <h3 className='h3'>Revisá que todo este bien</h3>
            <hr className='text-gray-200 my-4' />
            <div className='flex flex-col gap-4 text-gray-100 text-lg mb-8'>
                <div className='flex gap-3'>
                    <div>
                        <p className='text-gray-200'>Vas a transferir</p>
                        <p className='font-semibold'>${amount}</p>
                    </div>
                    <FilePen size={25} className="text-[var(--color-primary)]" />
                </div>
                <div>
                    <p className='text-xs text-gray-200'>Para</p>
                    <p className='font-semibold'>Cuenta propia</p>
                </div>
                <div className='text-sm text-gray-300'>
                    <p>Brubank</p>
                    <p>CVU 0000002100075990000000</p>
                </div>
            </div>
        </AddMoneyCardContainer>

    )
}

export default ReviewDeposit