'use client'
import { useCreditCard } from '@/contexts/CreditCardsContext'
import { useTransference } from '@/contexts/TransferenceContext'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const RouteGuard = ({ children }: { children: React.ReactNode }) => {

    const { selectedCard } = useCreditCard()
    const { amount, checkout } = useTransference()
    const router = useRouter()
    const pathname = usePathname()

    const needCard = pathname.includes("/dashboard/cargar-dinero/tarjetas/monto")
        || pathname.includes("/dashboard/cargar-dinero/tarjetas/revisar")

    const needsAmount = pathname.includes("/dashboard/cargar-dinero/tarjetas/revisar")

    const needsCheckout = pathname.includes("/dashboard/cargar-dinero/check-out")

    useEffect(() => {
        if (needCard && !selectedCard) {
            router.replace("/dashboard/cargar-dinero/tarjetas")
            return
        }
        if (needsAmount && !amount) {
            router.replace("/dashboard/cargar-dinero/tarjetas/monto")
            return
        }

        // if (needsCheckout && !checkout) {
        //     router.replace("/dashboard/cargar-dinero")
        //     return
        // }

    }, [pathname, selectedCard, amount])


    return (
        <>{children}</>
    )
}

export default RouteGuard