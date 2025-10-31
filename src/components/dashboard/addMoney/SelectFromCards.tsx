'use client'
import React from 'react'
import UserCards from '../creditCards/UserCards'
import Link from 'next/link'
import { CirclePlus } from 'lucide-react'
import { useCreditCard } from '@/contexts/CreditCardsContext'
import LinkComponent from '@/components/LinkComponent'
import AddMoneyCardContainer from './AddMoneyCardContainer'

const SelectFromCards = () => {

  const { selectedCard } = useCreditCard()

  return (
    <AddMoneyCardContainer condition={selectedCard !== null} href="/dashboard/cargar-dinero/tarjetas/monto">
      <h3 className=' h3 my-2 ml-1'>Seleccionar tarjeta</h3>
      <UserCards mode='select' />
      <Link href="/">
        <div className='flex items-center pt-5 gap-2'>
          <CirclePlus size={30} strokeWidth={1} />
          <p className='font-semibold'>Nueva tarjeta</p>
        </div>
      </Link>
    </AddMoneyCardContainer>
  )
}

export default SelectFromCards