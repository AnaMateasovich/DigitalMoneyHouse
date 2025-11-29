'use client'
import Button from '@/components/Button'
import { usePayService } from '@/contexts/PayServiceContext'
import { serviceBill } from '@/db'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ErrorBill from './ErrorBill'

export const AccountNumberBox = () => {

  const router = useRouter()

  const { accountNumber, setAccountNumber, setService } = usePayService()
  const [error, setError] = useState<boolean>(false)
  const [shouldClear, setShouldClear] = useState<boolean>(true)

  const isValid = () => {
    const bill = serviceBill.find(b => b.accountNumber === accountNumber)
    if (bill) {
      setService(bill)
      router.push('/dashboard/pagar-servicios/3/resumen')
      setShouldClear(false)
    } else {
      setError(true)
    }
  }

  useEffect(() => {
    return () => {
      if(shouldClear) {
        setAccountNumber("")
      }
    }
  }, [shouldClear])
  

  return (
    <section >
      {!error ? (
        <>
          <div className='bg-[var(--color-secondary)] rounded-xl p-6 pb-16'>
            <h3 className='h3 text-[var(--color-primary)]'>Número de cuenta <br />sin el primer 2</h3>
            <input
              type="number"
              placeholder='37289701912'
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className='w-full placeholder:text-gray-500 rounded-lg py-3 px-4  text-[#201F22] md:py-4 bg-white mt-6'
            />
          </div>
          <div className='flex justify-end mt-4'>
            <Button text='Continuar' className='py-3 px-10' onClick={isValid} />
          </div>
        </>
      ) : (
        <>
          <ErrorBill title='No encontramos facturas asociadas a este dato' body='Revisá el dato ingresado. Si es correcto, es posible que la empresa aún no haya cargado tu factura.' />
          <div className='flex justify-end mt-4'>
            <Button text='Revisar dato' className='py-3 px-10' onClick={() => setError(false)} />
          </div>
        </>

      )}

    </section>
  )
}
