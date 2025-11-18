'use client'
import Button from '@/components/Button'
import LinkComponent from '@/components/LinkComponent'
import { usePathname } from 'next/navigation'
import React from 'react'

type AddMoneyCardContainerProps = {
    children: React.ReactNode
    condition?: boolean
    href: string
    submit?: () => void
}

const AddMoneyCardContainer = ({ children, condition, href, submit }: AddMoneyCardContainerProps) => {

    return (
        <section className='flex flex-col'>
            <div className='bg-[var(--color-secondary)] text-[var(--color-primary)] rounded-xl px-6 py-4'>
                {children}
            </div>

            {(!submit && condition === undefined) ? null : (
                submit ? (
                    <div className='flex w-full justify-end mt-4'>
                        <Button text='Continuar' onClick={submit} className='py-2 px-6' />
                    </div>
                ) : (
                    condition ? (
                        <LinkComponent href={href} text="Continuar" styles="w-2/5 py-2 self-end mt-4" />
                    ) : (
                        <button aria-label='true' disabled className='w-2/5 self-end py-2 px-4 bg-gray-400 shadow-gray-300 shadow-md rounded-md text-lg font-semibold text-center mt-4'>Continuar</button>
                    )
                )
            )}
        </section>
    )
}

export default AddMoneyCardContainer