'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import Button from './Button'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Menu } from 'lucide-react';


const Header = () => {

    const pathname = usePathname()
    const darkHeader = pathname === '/' || pathname === '/dashboard'
    const router = useRouter()
    const { user, isLoading, isAuthenticated } = useAuth()
    const [toggleMenu, setToggleMenu] = useState<boolean>(false)


    const capitalizeFirstLetter = (str: string): string | undefined => {
        if (str.length === 0) {
            return
        }
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    }

    return (
        <header className={`w-full flex items-center h-20 px-4 py-2 justify-between gap-2 ${darkHeader
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
                        <div className={`flex p-2 font-bold text-xl rounded-xl gap-[1px] ${darkHeader ? 'bg-[var(--color-primary)] text-[var(--color-secondary)] ' : 'bg-[var(--color-secondary)] text-[var(--color-primary)] '}`}>
                            <p>{user.firstname.charAt(0).toUpperCase()}</p>
                            <p>{user.lastname.charAt(0).toUpperCase()}</p>
                        </div>

                        <Menu className="text-[var(--color-primary)] md:hidden" size={47} strokeWidth={3} onClick={() => setToggleMenu(!toggleMenu)}/>
                        <p className={`hidden md:block font-bold text-lg ${darkHeader ? 'text-white' : 'text-[var(--color-secondary)]'}`}>Hola, {capitalizeFirstLetter(user.firstname)}{" "}{capitalizeFirstLetter(user.lastname)}</p>
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
                                    variant={!darkHeader ? 'outline-secondary' : 'outline-primary'} onClick={() => router.push('/login')} />
                                <Button text="Crear cuenta"
                                    variant={!darkHeader ? 'secondary' : 'primary'} onClick={() => router.push('/register')} />
                            </>
                        )}
                        {pathname === '/register' && (
                            <Button text="Iniciar sesión"
                                variant='secondary' onClick={() => router.push('/login')} />

                        )}
                    </div>
                </>
            )
            }

        </header >
    )
}

export default Header