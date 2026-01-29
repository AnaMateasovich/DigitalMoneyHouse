'use client'
import React from 'react'
import UserCards from '../creditCards/UserCards'
import Link from 'next/link'
import { CirclePlus } from 'lucide-react'
import { useCreditCard } from '@/contexts/CreditCardsContext'
import LinkComponent from '@/components/LinkComponent'
import CardContainer from '../CardContainer'
import Button from '@/components/Button'
import { useRouter } from 'next/navigation'

const SelectFromCards = () => {

  const { selectedCard } = useCreditCard()

  return (
    <>
      <CardContainer >
        <h3 className=' h3 my-2 ml-1'>Seleccionar tarjeta</h3>
        <UserCards mode='select' />
        <Link href='/dashboard/tarjetas/crear'>
          <div className='flex items-center pt-5 gap-2' >
            <CirclePlus size={30} strokeWidth={1} />
            <p className='font-semibold'>Nueva tarjeta</p>
          </div>
        </Link>
      </CardContainer>
      {selectedCard !== null ? (
        <div className='flex justify-end mt-4'>
          <LinkComponent text='Continuar' href='/dashboard/cargar-dinero/tarjetas/monto' styles='py-2 px-8' />
        </div>
      ) : (
        <div className='flex justify-end mt-4'>
          <Button text='Continuar' disabled className='bg-gray-400 border-gray-400 py-2 px-8' />
        </div>
      )}
    </>
  )
}

export default SelectFromCards