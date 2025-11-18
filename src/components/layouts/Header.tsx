'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import Button from '../Button'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Menu } from 'lucide-react';
import { useToggleMenu } from '@/contexts/ToggleMenuContext'
import Link from 'next/link'


const Header = () => {

    const pathname = usePathname()
    const darkHeader = pathname === '/' || pathname.startsWith('/dashboard')
    const router = useRouter()
    const { user, isLoading, isAuthenticated, fullNameFormatUser } = useAuth()
    const { toggle, openCloseMenu } = useToggleMenu()

    return (
        <header className={`relative w-full flex items-center h-20 px-4 py-2 justify-between gap-2 ${darkHeader
            ? 'bg-[var(--color-secondary)]'
            : 'bg-[var(--color-primary)]'
            }`}>
            {isLoading ? (
                <>
                    <div>
                        <Image src={darkHeader ? '/logoHeader.png' : '/logoDark.png'}
                            alt="Picture of the author"
                            width={200}
                            height={50}
                            className="w-16 h-9 py-1 cursor-pointer"
                            onClick={() => router.push("/")} />
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-300 animate-pulse" />
                        <div className="w-32 h-6 rounded bg-gray-300 animate-pulse" />
                    </div>
                </>
            ) : user ? (
                <>
                    <div>
                        <Image src={darkHeader ? '/logoHeader.png' : '/logoDark.png'}
                            alt="Picture of the author"
                            width={200}
                            height={50}
                            className="w-20 h-9 py-1 cursor-pointer"
                            onClick={() => router.push("/")} />
                    </div>
                
                    <div className='w-full flex gap-3 items-center justify-end '>
                        <Link href= "/dashboard">
                        <div className={`flex p-2 font-bold text-xl rounded-xl gap-[1px] ${darkHeader ? 'bg-[var(--color-primary)] text-[var(--color-secondary)] ' : 'bg-[var(--color-secondary)] text-[var(--color-primary)] '}`}>
                            <p>{user.firstname.charAt(0).toUpperCase()}</p>
                            <p>{user.lastname.charAt(0).toUpperCase()}</p>
                        </div>
                        </Link>

                        <Menu className={`text-[var(--color-primary)] transition-transform duration-300 ease-in-out ${toggle && 'translate-x-full'} ${!pathname.startsWith('/dashboard') && 'hidden' } md:hidden`} size={47} strokeWidth={3} onClick={() => openCloseMenu()} />
                        <p className={`hidden md:block font-bold text-lg ${darkHeader ? 'text-white' : 'text-[var(--color-secondary)]'}`}>Hola, {fullNameFormatUser()}</p>
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <Image src={darkHeader ? '/logoHeader.png' : '/logoDark.png'}
                            alt="Picture of the author"
                            width={200}
                            height={50}
                            className="w-20 h-9 py-1 cursor-pointer"
                            onClick={() => router.push("/")} />
                    </div>
                    <div className="flex items-center gap-3 md:flex-row-reverse">
                        {pathname !== "/login" && pathname !== "/register" && !user && (
                            <>
                                <Button text="Ingresar"
                                    variant={!darkHeader ? 'outline-secondary' : 'outline-primary'} onClick={() => router.push('/login')} className='p-2'/>
                                <Button text="Crear cuenta"
                                    variant={!darkHeader ? 'secondary' : 'primary'} onClick={() => router.push('/register')} className='p-2'/>
                            </>
                        )}
                        {pathname === '/register' && (
                            <Button text="Iniciar sesión"
                                variant='secondary' onClick={() => router.push('/login')} className='p-2'/>

                        )}
                    </div>
                </>
            )
            }

        </header >
    )
}

export default Header