'use client'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'


type backNavigationProps = {
    to: string
    text: string
    containerClass?: string
}

const BackNavigation = ({ to, text, containerClass }: backNavigationProps) => {

    const router = useRouter()
    return (
        <div className={`flex items-center gap-2 ${containerClass} pointer`} onClick={() => router.push(to) }>
            <ArrowRight className='text-gray-600' />
            <button className='text-black text-lg underline' >{text}</button>
        </div>
    )
}

export default BackNavigation