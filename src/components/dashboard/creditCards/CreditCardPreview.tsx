import { CardRequest } from '@/app/types/cardRequest.types'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

type CreditCardPreviewProps = {
  number_id?: string
  first_last_name?: string
  exp_date_month?: string
  exp_date_year?: string
}

const CreditCardPreview = ({ number_id = '', first_last_name, exp_date_month, exp_date_year }: CreditCardPreviewProps) => {

  const [typeCard, setTypeCard] = useState<string | null>(null)

  const getCardType = (number: string) => {
    const cleanNumber = number.replace(/\D/g, '');

    if (/^4/.test(cleanNumber)) {
      setTypeCard('Visa');
      return;
    }

    if (/^5[1-5]/.test(cleanNumber) || /^2(2[2-9][1-9]|[3-6][0-9]{2}|7[01][0-9]|720)/.test(cleanNumber)) {
      setTypeCard('MasterCard');
      return;
    }

    if (/^3[47]/.test(cleanNumber)) {
      setTypeCard('Amex');
      return;
    }

    setTypeCard('Desconocida');
  };

  useEffect(() => {
    getCardType(number_id);
  }, [number_id]);

  return (
    <>
      <div className={`relative ${!typeCard || typeCard === 'Desconocida' ? 'bg-[#EEEAEA]' : 'bg-[#201F22]'} h-48 rounded-xl shadow-md shadow-gray-500/40 mb-8 w-full ${typeCard && typeCard !== 'Desconocida' ? 'text-gray-100' : 'text-gray-500/90'}`}>
        {!typeCard || typeCard === "Desconocida" && (
          <div className='absolute bg-[#D9D9D9] h-10 w-13 top-4 right-4 rounded-md '></div>
        )}
        {typeCard === "Visa" && (
          <Image src="/Visa_Logo.png" alt='Tarjeta Visa' width={55} height={20} className='absolute top-6 right-6' />
        )}
        {typeCard === "MasterCard" && (
          <Image src="/mastercard_logo.png" alt='Tarjeta MasterCard' width={59} height={20} className='absolute top-6 right-6' />
        )}
        {typeCard === "Amex" && (
          <Image src="/amex_logo.png" alt='Tarjeta MasterCard' width={59} height={20} className='absolute top-4 right-6' />
        )}

        <div className={`absolute bottom-0 left-0 w-3/4 h-35 bg-gradient-to-r from-[#D9D9D9] to-transparent ${typeCard && typeCard !== 'Desconocida' && 'hidden'}`} style={{
          clipPath: 'ellipse(70% 90% at 50% 100%)'
        }}></div>
        <div className={`absolute w-full top-3/6 left-1/2 -translate-x-1/2 flex justify-around text-3xl px-1  z-10`}>
          {typeCard !== 'Amex' ? (
            <>
              <p className={number_id ? 'text-xl' : 'text-2xl'}>{number_id?.slice(0, 4) || '****'}</p>
              <p className={number_id ? 'text-xl' : 'text-2xl'}>{number_id?.slice(4, 8) || '****'}</p>
              <p className={number_id ? 'text-xl' : 'text-2xl'}>{number_id?.slice(8, 12) || '****'}</p>
              <p className={number_id ? 'text-xl' : 'text-2xl'}>{number_id?.slice(12, 16) || '****'}</p>
            </>
          ) : (
            <>
              <p className={number_id ? 'text-xl' : 'text-2xl'}>{number_id?.slice(0, 4) || '****'}</p>
              <p className={number_id ? 'text-xl' : 'text-2xl'}>{number_id?.slice(4, 10) || '******'}</p>
              <p className={number_id ? 'text-xl' : 'text-2xl'}>{number_id?.slice(10, 15) || '*****'}</p>
            </>
          )}
        </div>
        <div className='absolute w-full top-4/6'>
          <p className='absolute left-[1.4rem]'>{first_last_name?.toUpperCase() || 'NOMBRE DEL TITULAR'}</p>
          <p className='absolute right-[1.4rem]'>{exp_date_month ? exp_date_month + '/' + exp_date_year : 'MM/YY'}</p>
        </div>
      </div>
    </>
  )
}

export default CreditCardPreview