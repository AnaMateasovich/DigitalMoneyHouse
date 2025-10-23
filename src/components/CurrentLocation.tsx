'use client'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'


type currentLocationProps = {
    to?: string
    text: string
    containerClass?: string
}

const CurrentLocation = ({ to = "/dashboard", text, containerClass }: currentLocationProps) => {

    const router = useRouter()
    return (
        <div className={`flex items-center gap-2 ${containerClass} pointer`} onClick={() => router.push(to) }>
            <ArrowRight className='text-gray-600' />
            <button className='text-[#201F22] text-lg underline' >{text}</button>
        </div>
    )
}

export default CurrentLocation