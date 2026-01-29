'use client'
import { useAuth } from '@/contexts/AuthContext'
import React from 'react'

type PayWithBalanceButtonProps = {
    error?: string | null
}

const PayWithBalanceButton = ({ error }: PayWithBalanceButtonProps) => {

    const { account } = useAuth()

    return (
        <div>

            <div className='bg-gray-100 py-4 px-5 rounded-xl flex justify-between items-center text-[#201F22] shadow-gray-300 shadow-md shadow-gray-500/40'>
                <h4 className='font-semibold text-lg'>Dinero disponible</h4>
                <div className='flex gap-2 items-center'>
                    <p className='text-xl font-semibold'>${account?.available_amount}</p>
                    <input type='radio' />
                </div>
            </div>
            {error && (
                <p className='text-sm text-red-600 mt-2 text-center'>
                    {error}
                </p>
            )}
        </div>
    )
}

export default PayWithBalanceButton