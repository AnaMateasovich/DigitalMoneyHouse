import LinkComponent from '@/components/LinkComponent'
import React from 'react'

type AddMoneyCardContainerProps = {
    children: React.ReactNode
    condition?: boolean
    href:string
}

const AddMoneyCardContainer = ({ children, condition, href }: AddMoneyCardContainerProps) => {
    
    return (
        <section className='flex flex-col'>
            <div className='bg-[var(--color-secondary)] text-[var(--color-primary)] rounded-xl px-5 py-4 '>
                {children}
            </div>
            {condition ? (
                <LinkComponent href={href} text="Continuar" styles="w-2/5 py-2 self-end mt-4" />
            ) : (
                <button aria-label='true' disabled className='w-2/5 self-end py-2 px-4 bg-gray-400 shadow-gray-300 shadow-md rounded-md text-lg font-semibold text-center mt-4'>Continuar</button>
            )}
        </section>
    )
}

export default AddMoneyCardContainer