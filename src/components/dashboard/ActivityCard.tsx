'use client'
import { Transaction } from '@/app/types/transaction.types'
import React, { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'


type ActivityCardProps = {
    className?: string
}

const ActivityCard = ({ className }: ActivityCardProps) => {
    const [activity, setActivity] = useState<Transaction[] | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const fetchActivity = async () => {
        try {
            setIsLoading(true)
            const res = await fetch('/api/transactions')

            if (!res.ok) {
                setActivity(null)
                return
            }

            const data = await res.json()
            setActivity(data)

        } catch (error) {
            setActivity(null)
        } finally {
            setIsLoading(false)
        }
    }

    const getType = (type: string): string => {
        let message = ''
        if (type === 'Deposit') {
            message = 'Ingresaste dinero'
        }
        return message
    }

    const getFormatDate = (dateString: string): string => {
        const transactionDate = new Date(dateString)
        const today = new Date()

        const diffMs = today.getTime() - transactionDate.getTime()
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays < 1) {
            return "Hoy";
        } else if (diffDays < 2) {
            return "Ayer";
        } else if (diffDays < 6) {
            const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
            return diasSemana[transactionDate.getDay()];
        } else {
            return transactionDate.toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "numeric"
            });
        }
    }


    useEffect(() => {
        fetchActivity()
    }, [])

    return (
        <section className={`${className} bg-gray-100 py-4 px-6 rounded-xl text-[#201F22] shadow-gray-300 shadow-md`}>
            <h2 className='font-semibold text-lg'>Tu actividad</h2>
            <hr className='text-gray-300 my-4' />
            <div className='flex flex-col gap-4'>
                {activity?.slice(-10).reverse().map(transaction => (
                    <div key={transaction.id}>
                        <div className='flex justify-between' >
                            <div className='flex gap-3'>
                                <div className='bg-[var(--color-primary)] w-6  h-6  rounded-full'></div>
                                <p className=''>{getType(transaction.type)}</p>
                            </div>
                            <div className=''>
                                <p>$ {transaction.amount}</p>
                                <p className='text-gray-400'>{getFormatDate(transaction.dated)}</p>
                            </div>
                        </div>
                        <hr className='text-gray-300 mt-4' />
                    </div>
                )
                )}
                <div className='flex justify-between'>
                    <button className='font-semibold'>Ver toda tu actividad</button>
                    <ArrowRight className='text-gray-600' />

                </div>
            </div>
        </section>
    )
}

export default ActivityCard

