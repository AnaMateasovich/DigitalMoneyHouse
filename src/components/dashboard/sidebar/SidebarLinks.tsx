'use client'
import { useAuth } from '@/contexts/AuthContext'
import { useToggleMenu } from '@/contexts/ToggleMenuContext'
import useBreakpoint from '@/hooks/useBreakpoint'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SidebarLinks = () => {

    const pathname = usePathname()
    const { logout } = useAuth()

    const { toggle, openCloseMenu } = useToggleMenu()


    const links = [
        { name: "Inicio", path: "/dashboard" },
        { name: "Actividad", path: "/dashboard/actividad" },
        { name: "Tu perfil", path: "/dashboard/perfil" },
        { name: "Cargar dinero", path: "/dashboard/cargar-dinero" },
        { name: "Pagar Servicios", path: "/dashboard/pagar-servicios" },
        { name: "Tarjetas", path: "/dashboard/tarjetas" },
        { name: "Cerrar sesión", path: "/dashboard/logout" },
    ]


    return (
        <nav className='flex flex-col gap-4 ml-6 mt-4 text-xl md:mt-10 md:ml-8 md:pr-4'>
            {links.map(link => (
                link.path === '/dashboard/logout' ? (
                    <button
                        key={link.path}
                        onClick={logout}
                        className='text-left text-xl hover:font-bold transition-all'
                    >
                        {link.name}
                    </button>
                ) : (
                    <Link
                        key={link.path}
                        href={link.path}
                        className={`${pathname === link.path ? "font-bold" : "font-normal"} hover:font-bold transition-all`}
                        onClick={openCloseMenu}
                    >
                        {link.name}
                    </Link>
                )
            ))}
        </nav>

    )
}

export default SidebarLinks