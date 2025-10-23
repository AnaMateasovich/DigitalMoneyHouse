'use client'
import { Card } from '@/app/types/card.types'
import React from 'react'

const UserCards = () => {


    

    return (
        <section className='bg-gray-100 py-4 px-5 rounded-xl text-[#201F22] shadow-gray-300 shadow-md shadow-gray-500/40'>
            <h3 className='text-lg font-semibold mt-2 mb-4'>Tus tarjetas</h3>
            <hr className='text-gray-300 my-2 mb-6' />
            <div className='flex justify-between items-center'>
                <div className='flex gap-4 items-center'>
                    <div className='bg-[var(--color-primary)] w-6  h-6  rounded-full'></div>
                    <p>Email</p>
                </div>
                <button className='font-semibold text-sm'>Eliminar</button>
            </div>
            <hr className='text-gray-300 my-6' />


        </section>
    )
}

export default UserCards