'use client'
import React from 'react'
import compaines from '../../../db.js'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { usePayService } from '@/contexts/PayServiceContext'
import { Company } from '@/app/types/company.types'

const ServicesCard = () => {
  const { setSelectedService, searchResult } = usePayService()
  const router = useRouter()

  const goToPayService = (id: number) => {
    setSelectedService(id)
    router.push(`/dashboard/pagar-servicios/${id}`)
  }

  const dataToRender = searchResult.length > 0 ? searchResult : compaines
  const title = searchResult.length > 0 ? 'Resultados' : 'Más recientes'

  return (
    <section className='bg-white p-6 rounded-xl text-[#201F22] shadow-gray-300 shadow-md'>
      <p className='font-semibold text-xl mb-4'>{title}</p>
      <hr className='text-gray-400 mb-3' />

      {dataToRender.map((companie) => (
        <div key={companie.id}>
          <div className='flex justify-between items-center my-2'>
            <div className='flex gap-4 items-center'>
              <Image
                src={companie.src}
                alt={companie.name}
                width={70}
                height={15}
                className='h-15 object-cover'
              />
              <p>{companie.name}</p>
            </div>

            <button
              className='font-semibold'
              onClick={() => goToPayService(companie.id)}
            >
              Seleccionar
            </button>
          </div>
          <hr className='text-gray-400' />
        </div>
      ))}
    </section>
  )
}

export default ServicesCard
