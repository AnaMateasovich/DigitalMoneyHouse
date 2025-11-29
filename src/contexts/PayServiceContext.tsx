import React, { createContext, useContext, useState } from 'react'
import { useCreditCard } from './CreditCardsContext'
import { Service } from '@/app/types/service.types'

interface PayServiceContextType {
    selectedService: number | null
    setSelectedService: React.Dispatch<React.SetStateAction<number | null>>
    setAccountNumber: React.Dispatch<React.SetStateAction<string>>
    accountNumber: string
    selectedCard: number | null
    service: Service | null
    setService: React.Dispatch<React.SetStateAction<Service | null>>
}

const PayServiceContext = createContext<PayServiceContextType | undefined>(undefined)

const PayServiceProvider = ({children}: {children: React.ReactNode}) => {

    const [selectedService, setSelectedService] = useState<number | null>(null)
    const [accountNumber, setAccountNumber] = useState<string>("")
    const [service, setService] = useState<Service | null>(null)

    const {selectedCard} = useCreditCard()

  return (
    <PayServiceContext.Provider value={{
        selectedService,
        setSelectedService,
        accountNumber,
        setAccountNumber,
        selectedCard,
        service,
        setService
    }}>{children}</PayServiceContext.Provider>
  )
}

export default PayServiceProvider

export function usePayService() {
    const context = useContext(PayServiceContext)
      if (context === undefined) {
        throw new Error('usePayService debe usarse dentro de TransferenceProvider')
    }
    return context
}