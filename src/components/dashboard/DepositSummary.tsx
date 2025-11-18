import { FilePen } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type DepositSummaryProps = {
    title: string
    amount: number | string
    cvu: string
    editable?: boolean
    hrefToEdit?: string
    date?: string
    transactionType: string
}

const DepositSummary = ({ title, amount, cvu, editable, hrefToEdit = '', date, transactionType }: DepositSummaryProps) => {

    const formatDateTime = (isoString: string) => {
        const date = new Date(isoString)

        const formattedDate = date.toLocaleDateString('es-AR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })

        const formattedTime = date.toLocaleTimeString('es-AR', {
            hour: '2-digit',
            minute: '2-digit',
        })

        return `${formattedDate} a ${formattedTime} hs.`
    }

      const formattedDate = date ? formatDateTime(date) : null

    return (
        <>
            <h3 className="h3 pt-4">{title}</h3>
            <hr className="text-gray-200 my-4" />
            <div className="flex flex-col gap-4 text-gray-100 text-lg mb-8">
                <div className="flex flex-col items-start">
                    <div className='flex items-center gap-3'>
                        <p className='text-sm'>{transactionType}</p>
                        {editable && (
                            <Link href={hrefToEdit}>
                                <FilePen size={25} className="text-[var(--color-primary)]" />
                            </Link>
                        )}
                    </div>
                    <div className='flex flex-col gap-2'>
                        {formattedDate && <p className="text-sm text-gray-200">{formattedDate}</p>}
                        <p className="font-semibold text-2xl text-[var(--color-primary)] mt-1">
                            ${amount}
                        </p>
                    </div>
                </div>

                <div>
                    <p className="text-xs text-gray-200">Para</p>
                    <p className="font-semibold text-2xl text-[var(--color-primary)] mt-2">
                        Cuenta propia
                    </p>
                </div>

                <div className="text-sm text-gray-300">
                    <p>Brubank</p>
                    <p>CVU {cvu}</p>
                </div>
            </div>
        </>
    )
}

export default DepositSummary