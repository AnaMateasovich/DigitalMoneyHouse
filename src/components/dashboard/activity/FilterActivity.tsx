import React, { useEffect, useState } from 'react'
import styles from './activity.module.css'
import Button from '@/components/Button'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'

type FilterActivityProps = {
    closeFilter: () => void
    toggle: boolean
}

type FilterActivity = {
    range: string | null
    type: string | null
}

const FilterActivity = ({ closeFilter, toggle }: FilterActivityProps) => {

    const range = { today: 'Hoy', yesterday: 'Ayer', lastWeek: 'Última semana', last15: 'Últimos 15 días', lastMonth: 'Último mes', lastYear: 'Último año', other: 'Otro período' }
    const type = { Transfer: 'Transferencia', Transaction: 'Transacción', Deposit: 'Deposito', All: 'Todo' }

    const [selected, setSelected] = useState<string>('range')
    const [show, setShow] = useState(false)
    const [filter, setFilter] = useState<FilterActivity>({
        range: null,
        type: null
    })

    const router = useRouter()

    const handleSubmit = () => {
        const params = new URLSearchParams()

        if (filter.range) params.set('range', filter.range)
        if (filter.type) params.set('type', filter.type)

        router.push(`/dashboard/actividad?${params.toString()}`)
        handleClose()
    }


    const handleClose = () => {
        setShow(false)
        setTimeout(() => closeFilter(), 300)
    }


    useEffect(() => {
        if (toggle) {
            setTimeout(() => setShow(true), 10)
        } else {
            setShow(false)
        }
    }, [toggle])

    console.log(filter)

    return (<>
        <div className={`fixed w-dvw h-dvh top-0 left-0 bg-[rgba(0,0,0,.8)] transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}></div>
        <aside className={`${styles.selectStyle} fixed bg-gray-100  rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 transition-all duration-300 ease-out
      ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
    `}>
            <div className='absolute text-white -bottom-25 left-1/2 -translate-x-1/2 bg-[rgba(255,255,255,.3)] rounded-full p-3'>
                <button className='flex' onClick={handleClose}>
                    <X className='text-white' size={30} strokeWidth={2.5} />
                </button>
            </div>
            <div className='w flex justify-between items-center p-4'>
                <select onChange={(e) => setSelected(e.target.value)} value={selected} name="type" id="" className=''>
                    <option value="range">Período</option>
                    <option value="transaction">Operaciones</option>
                </select>
                <button className={`${!filter.range && !filter.type && 'text-gray-500'} pointer`} onClick={() => setFilter({
                    range: null,
                    type: null
                })}>Borrar filtros</button>
            </div>
            <hr className='w-full' />
            {selected === 'range' && (
                <div className='flex flex-col gap-1 px-4 py-2'>
                    {Object.entries(range).map(
                        ([key, label]) => (
                            <div key={key} className='flex justify-between items-center px-2 mt-3 '>
                                <label htmlFor="" className={`${filter.range === null
                                    ? 'text-[var(--color-dark)]'
                                    : filter.range === key
                                        ? 'font-semibold'
                                        : 'text-gray-400'
                                    }`}>{label}</label>
                                <input type="radio" name="range" value={key} checked={filter.range === key} className="accent-[var(--color-secondary)] scale-125" onChange={() => setFilter(prev => ({ ...prev, range: key }))} />
                            </div>
                        )
                    )}
                </div>
            )}


            {selected === 'transaction' && (
                <div className='flex flex-col gap-1 px-4 py-2'>
                    {Object.entries(type).map(
                        ([key, label]) => (
                            <div key={key} className='flex justify-between items-center px-2 mt-3 '>
                                <label htmlFor="" className={`${filter.type === null
                                    ? 'text-[var(--color-dark)]'
                                    : filter.type === key
                                        ? 'font-semibold'
                                        : 'text-gray-400'
                                    }`}>{label}</label>
                                <input type="radio" name="type" value={key} checked={filter.type === key} className="accent-[var(--color-secondary)] scale-125" onChange={() => setFilter(prev => ({ ...prev, type: key }))} />
                            </div>
                        )
                    )}
                </div>
            )}
            <Button text='Aplicar' className='w-full py-1 text-xs m-4' onClick={handleSubmit} />
        </aside>
    </>
    )
}

export default FilterActivity