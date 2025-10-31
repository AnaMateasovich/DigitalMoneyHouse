import { ArrowRight, CircleUser, CreditCard } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const SelectMothodToAdd = () => {
    return (
        <div className='flex flex-col gap-4'>
            <Link href="/dashboard/cargar-dinero/transferencia">
                <div className='flex justify-between bg-[var(--color-secondary)] text-[var(--color-primary)] items-center rounded-xl px-5 py-8 shadow-md'>
                    <div className='flex gap-5 items-center'>
                        <CircleUser strokeWidth={1} size={40}/>
                        <p className='font-semibold text-xl'>Transferencia<br />bancaria</p>
                    </div>
                    <ArrowRight  size={35}/>
                </div>
            </Link>
            <Link href="/dashboard/cargar-dinero/tarjetas">
                <div className='flex justify-between bg-[var(--color-secondary)] text-[var(--color-primary)] items-center rounded-xl px-5 py-8 shadow-md'>
                    <div className='flex gap-5 items-center'>
                        <CreditCard strokeWidth={1} size={40}/>
                        <p className='font-semibold text-xl'>Seleccionar<br />tarjeta</p>
                    </div>
                    <ArrowRight  size={35}/>
                </div>
            </Link>
        </div>
    )
}

export default SelectMothodToAdd