'use client'
import React from 'react'
import LinkComponent from '../LinkComponent'

type CardContainerProps = {
    children: React.ReactNode
}

const CardContainer = ({ children}: CardContainerProps) => {

    return (
        <section className='flex flex-col'>
            <div className='bg-[var(--color-secondary)] text-[var(--color-primary)] rounded-xl px-6 py-4'>
                {children}
            </div>
        </section>
    )
}

export default CardContainer