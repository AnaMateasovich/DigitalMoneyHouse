'use client'
import React, { useEffect } from 'react'
import ReviewRecipt from './ReviewRecipt'
import { CircleCheck } from 'lucide-react'
import LinkComponent from '@/components/LinkComponent'
import Button from '@/components/Button'
import { useTransference } from '@/contexts/TransferenceContext'


const DepositCheckout = () => {

  const { checkout, isLoading, clearCheckout, resetTransference } = useTransference()

      useEffect(() => {
        return () => {
            clearCheckout()
            resetTransference()
        }
    }, [])
  return (
    <section>
      {isLoading ? (
        <>
          <div className='bg-gray-400 w-full h-30 rounded-xl mb-4 shadow-md animate-pulse'>
            {/* Acá va tu Skeleton o loader */}
          </div>
          <div className='bg-gray-400 w-full h-50 rounded-xl mb-4 shadow-md animate-pulse' >
          </div>
          <div className='flex flex-col gap-4 mt-5 animate-pulse'>
            <Button text='Descargar comprobante' className='bg-gray-400 border-gray-400 w-full py-3 shadow-md' disabled={true}/>
            <LinkComponent
              text='Ir al inicio'
              href='/dashboard'
              bgColor='bg-gray-400/50'
              styles='py-3 shadow-md'
            />
          </div>
        </>
      ) : (
        <>
          {checkout !== null && (
            <div className='flex flex-col items-center justify-center gap-2 bg-[var(--color-primary)] w-full h-30 rounded-xl mb-4 shadow-md'>
              <CircleCheck size={55} strokeWidth={1.5} />
              <h4 className='font-semibold text-lg'>Ya cargamos el dinero en tu cuenta</h4>
            </div>
          )}

          <ReviewRecipt />

          <div className='flex flex-col gap-4 mt-5'>
            <Button text='Descargar comprobante' className='w-full py-3 shadow-md' />
            <LinkComponent
              text='Ir al inicio'
              href='/dashboard'
              bgColor='bg-gray-400/50'
              styles='py-3 shadow-md'
            />
          </div>
        </>
      )}
    </section>
  )

}

export default DepositCheckout