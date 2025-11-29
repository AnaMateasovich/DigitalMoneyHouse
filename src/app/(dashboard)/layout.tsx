'use client'
import Sidebar from '@/components/dashboard/sidebar/Sidebar'
import RouteGuard from '@/components/RouteGuard'
import ActivityProvider from '@/contexts/ActivityContext'
import CardProvider from '@/contexts/CreditCardsContext'
import PayServiceProvider from '@/contexts/PayServiceContext'
import TransferenceProvider from '@/contexts/TransferenceContext'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex min-h-screen'>
            <Sidebar />
            <div className='flex-1'>
                <CardProvider>
                    <TransferenceProvider>
                        <ActivityProvider>
                            <PayServiceProvider>
                                <RouteGuard>
                                    <main className='md:p-10 bg-gray-200 h-full p-4 text-[#201F22]'>
                                        {children}
                                    </main>
                                </RouteGuard>
                            </PayServiceProvider>
                        </ActivityProvider>
                    </TransferenceProvider>
                </CardProvider>
            </div>
        </div>
    )
}

export default layout