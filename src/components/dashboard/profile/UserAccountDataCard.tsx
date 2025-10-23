'use client'
import { useAuth } from '@/contexts/AuthContext'
import { Copy } from 'lucide-react'
import React from 'react'


const UserAccountDataCard = () => {

    const {account} = useAuth()
    return (
        <section className='bg-[var(--color-secondary)] text-gray-200 py-4 px-5 rounded-xl text-[#201F22] shadow-gray-300 shadow-md'>
            <p className='text-sm'>Copia tu cvu o alias para ingresar o transferir dinero desde otra cuenta</p>
            <div className='my-4'>
                <div className='text-[var(--color-primary)] flex justify-between items-center text-xl mb-1'>
                    <h4 className='font-semibold'>CVU</h4>
                    <Copy />
                </div>
                <p>{account?.cvu}</p>
            </div>
            <hr />
            <div className='mt-4 mb-2'>
                <div className='text-[var(--color-primary)] flex justify-between items-center text-xl mb-1'>
                    <h4 className='font-semibold'>Alias</h4>
                    <Copy />
                </div>
                <p>{account?.alias}</p>
            </div>
        </section>
    )
}

export default UserAccountDataCard