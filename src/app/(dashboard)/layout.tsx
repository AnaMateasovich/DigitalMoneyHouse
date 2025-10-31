'use client'
import Sidebar from '@/components/dashboard/sidebar/Sidebar'
import CardProvider from '@/contexts/CreditCardsContext'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Sidebar />
            <CardProvider>
                <main className='bg-gray-200 h-full p-4 text-[#201F22]'>
                    {children}
                </main>
            </CardProvider>
        </div>
    )
}

export default layout