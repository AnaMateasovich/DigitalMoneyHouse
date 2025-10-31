'use client'
import { useCreditCard } from '@/contexts/CreditCardsContext'
import { ArrowRight, CirclePlus } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

type AddCardsProps = {
    className?: string
}
const AddCards = ({ className }: AddCardsProps) => {

    const { userCards } = useCreditCard()

    return (
        <section className={`${className} bg-[var(--color-secondary)] text-gray-200 py-4 px-5 rounded-xl`}>
            {userCards?.length === 10 ? (
                <>
                    <h3 className='font-semibold text-sm'>No puedes agregar más de 10 tarjetas</h3>
                    <div className='text-gray-400 flex justify-between items-center my-6'>
                        <div className='flex gap-4 items-center'>
                            <CirclePlus size={34} strokeWidth={1} />
                            <p className='font-semibold text-xl'>Nueva tarjeta</p>
                        </div>
                        <ArrowRight strokeWidth={3} size={28} />
                    </div>
                </>
            ) : (
                <>

                    <h3 className='font-semibold text-sm'>Agregá tu tarjeta de débito o crédito</h3>
                    <Link href="/dashboard/tarjetas/crear">

                        <div className='text-[var(--color-primary)] flex justify-between items-center my-6'>
                            <div className='flex gap-4 items-center'>
                                <CirclePlus size={34} strokeWidth={1} />
                                <p className='font-semibold text-xl'>Nueva tarjeta</p>
                            </div>
                            <ArrowRight strokeWidth={3} size={28} />
                        </div>
                    </Link>
                </>
            )}
        </section>
    )
}

export default AddCards