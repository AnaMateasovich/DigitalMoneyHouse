'use client'
import { useActivity } from '@/contexts/ActivityContext'
import { ArrowRight, SlidersHorizontal } from 'lucide-react'
import { useEffect, useState } from 'react'
import FilterActivity from './FilterActivity'
import { useRouter } from 'next/navigation'
import { useTransference } from '@/contexts/TransferenceContext'
import { Transaction } from '@/app/types/transaction.types'


type ActivityCardProps = {
    className?: string
}

const ActivityCard = ({ className }: ActivityCardProps) => {
    const { activity, fetchActivity, isLoading } = useActivity()
    const { recipt, setRecipt } = useTransference()
    const [toggleFilter, setToggleFilter] = useState<boolean>(false)

    const router = useRouter()
    // const {} = useCreditCard() TODO: agregar que recargue cuando se carga dinero

    const handleSetRecipt = (transaction: Transaction) => {
        setRecipt(transaction)
        router.push(`/dashboard/comprobante/${transaction.id}`)
    }

    const getType = (type: string): string => {
        switch (type) {
            case 'Deposit':
                return 'Ingresaste dinero'
            case 'Transfer':
                return 'Transferencia'
            case 'Transaction':
                return 'Pago de servicio'
            default:
                return ''
        }
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
        <>
            {toggleFilter && (
                <FilterActivity closeFilter={() => setToggleFilter(false)} toggle={toggleFilter} />
            )}
            < section className={`${className} bg-gray-100 py-4 px-6 rounded-xl text-[#201F22] shadow-gray-300 shadow-md`}>
                <div className='flex justify-between'>
                    <h2 className='font-semibold text-lg'>Tu actividad</h2>
                    <button className='font-semibold flex items-center gap-2' onClick={() => setToggleFilter(true)}>Filtrar <SlidersHorizontal size={20} /></button>
                </div>
                <hr className='text-gray-300 my-4' />
                <div className='flex flex-col gap-4'>
                    {isLoading && (
                        <div className="flex flex-col gap-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-center animate-pulse">

                                        <div className="flex items-center gap-3">
                                            <div className="bg-gray-300 w-6 h-6 rounded-full"></div>
                                            <div className="flex flex-col gap-1">
                                                <div className="bg-gray-300 w-32 h-4 rounded-md"></div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end gap-1">
                                            <div className="bg-gray-300 w-16 h-4 rounded-md"></div>
                                            <div className="bg-gray-200 w-10 h-3 rounded-md"></div>
                                        </div>

                                    </div>
                                    <hr className="text-gray-300 mt-4" />
                                </div>
                            ))}
                        </div>
                    )}
                    {activity?.slice(-10).reverse().map(transaction => (
                        <div key={transaction.id} onClick={() => handleSetRecipt(transaction)}>
                            <div className='flex items-center justify-between' >
                                <div className='flex gap-3'>
                                    <div className='bg-[var(--color-primary)] w-6  h-6  rounded-full'></div>
                                    <p className='text-lg'>{getType(transaction.type)}</p>
                                </div>
                                <div className=''>
                                    <p className='text-right'>$ {transaction.amount}</p>
                                    <p className='text-gray-400 text-right'>{getFormatDate(transaction.dated)}</p>
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

            </section >
        </ >
    )
}

export default ActivityCard

