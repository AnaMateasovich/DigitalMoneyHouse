import Sidebar from '@/components/dashboard/sidebar/Sidebar'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Sidebar />
            <main className='bg-gray-200 h-full p-4 text-[#201F22]'>
                {children}
            </main>
        </div>
    )
}

export default layout