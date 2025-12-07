import { CircleCheck } from 'lucide-react'
import React from 'react'

type SuccessCheckProps = {
    text: string
}

const SuccessCheck = ({text}: SuccessCheckProps) => {
    return (
        <div className='flex flex-col items-center justify-center gap-2 bg-[var(--color-primary)] w-full h-30 rounded-xl mb-4 shadow-md'>
            <CircleCheck size={55} strokeWidth={1.5} />
            <h4 className='font-semibold text-lg'>{text}</h4>
        </div>
    )
}

export default SuccessCheck