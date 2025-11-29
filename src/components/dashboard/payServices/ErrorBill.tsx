import { CircleX } from 'lucide-react'
import React from 'react'

type ErrorBillProps = {
  title: string
  body: string
}

const ErrorBill = ({title, body} : ErrorBillProps) => {
  return (
    <div className='bg-[var(--color-secondary)] rounded-xl text-white p-6 text-center flex flex-col items-center gap-2'>
        <CircleX size={50} className='text-red-600 mb-4'/>
        <h3 className='h3'>{title}</h3>
        <hr className="w-full border-t border-white/60 my-2" />
        <p className='text-white/80'>{body}</p>
    </div>
  )
}

export default ErrorBill