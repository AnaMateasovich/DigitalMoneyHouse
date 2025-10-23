'use client'
import { useToggleMenu } from '@/contexts/ToggleMenuContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SidebarLinks = () => {

    const pathname = usePathname()

    const {toggle, openCloseMenu} = useToggleMenu()

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
        <nav className='flex flex-col gap-4 ml-6 mt-4 text-xl'>
            {links.map(link => (
                <Link key={link.path} href={link.path} className={`${pathname === link.path ? "font-bold" : "font-normal"}`} onClick={() => openCloseMenu()}>
                    {link.name}
                </Link>
            ))}
        </nav>
    )
}

export default SidebarLinks