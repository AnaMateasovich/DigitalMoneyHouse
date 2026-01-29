import React, { createContext, useContext, useState } from 'react'
import { useCreditCard } from './CreditCardsContext'
import { Service } from '@/app/types/service.types'
import { Transaction } from '@/app/types/transaction.types'
import { Company } from '@/app/types/company.types'

interface PayServiceContextType {
  selectedService: number | null
  setSelectedService: React.Dispatch<React.SetStateAction<number | null>>
  setAccountNumber: React.Dispatch<React.SetStateAction<string>>
  accountNumber: string
  selectedCard: number | null
  service: Service | null
  setService: React.Dispatch<React.SetStateAction<Service | null>>
  searchResult: Company[]
  setSearchResult: React.Dispatch<React.SetStateAction<Company[]>>
  payService: () => Promise<Transaction>
  error: string | null
  clearError: () => void
}

const PayServiceContext = createContext<PayServiceContextType | undefined>(undefined)

const PayServiceProvider = ({ children }: { children: React.ReactNode }) => {

  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [accountNumber, setAccountNumber] = useState<string>("")
  const [service, setService] = useState<Service | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [searchResult, setSearchResult] = useState<Company[]>([])

  const { selectedCard } = useCreditCard()

  const payService = async () => {
    if (!service) return

    try {
      setError(null)

      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: service.amount,
          serviceId: service.id,
          type: 'SERVICE_PAYMENT'
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Error al pagar el servicio')
      }

      return data

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
        throw err // 👈 importante: re-lanzar
      }

      setError('Error inesperado')
      throw err
    }
  }

  const clearError = () => setError(null)

  return (
    <PayServiceContext.Provider value={{
      selectedService,
      setSelectedService,
      accountNumber,
      setAccountNumber,
      selectedCard,
      service,
      setService,
      searchResult,
      setSearchResult,
      payService,
      error,
      clearError
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