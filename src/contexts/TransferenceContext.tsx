import { Transaction } from "@/app/types/transaction.types";
import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import { useCreditCard } from "./CreditCardsContext";

interface TransferenceContextType {
    amount: string
    setAmount: (amount: string) => void
    makeDeposit: () => void
    checkout: Transaction | null
    setCheckout: (data: Transaction | null) => void
    resetTransference: () => void;
    clearCheckout: () => void
    isLoading: boolean
    setIsLoading: (value: boolean) => void 
    recipt: Transaction | null
    setRecipt: (data: Transaction | null ) => void
}

const TransferenceContext = createContext<TransferenceContextType | undefined>(undefined)

const TransferenceProvider = ({ children }: { children: React.ReactNode }) => {


    const [amount, setAmount] = useState<string>("")
    const [checkout, setCheckout] = useState<Transaction | null>(null)
    const [recipt, setRecipt] = useState<Transaction | null>(null)

    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { account } = useAuth()
    const { selectedCard, isValidCard } = useCreditCard()

    const makeDeposit = async () => {
        try {
            setIsLoading(true)
            const amountNumber = Number(amount)
            if (Number.isNaN(amountNumber) || amountNumber <= 0) {
                console.error('Monto inválido')
                return
            }

            const card = await isValidCard(selectedCard!)

            const origin = card ? String(card) : undefined

            const res = await fetch(`/api/deposits/${account?.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: amountNumber, origin })
            })


            const data = await res.json()
            setCheckout(data)
            setIsLoading(false)
        } catch (error) {
            console.error(error)
            setError('Ocurrio un error al cargar el dinero')
            setIsLoading(false)
        }
    }

    const resetTransference = () => {
        setAmount("")
        setCheckout(null)
    }

    const clearCheckout = () => {
        setCheckout(null)
    }

    return (
        <TransferenceContext.Provider
            value={{
                amount,
                setAmount,
                makeDeposit,
                checkout,
                setCheckout,
                resetTransference,
                clearCheckout,
                setIsLoading,
                isLoading,
                recipt,
                setRecipt
            }}>{children}</TransferenceContext.Provider>
    )
}

export default TransferenceProvider

export function useTransference() {
    const context = useContext(TransferenceContext)
    if (context === undefined) {
        throw new Error('useCreditCard debe usarse dentro de TransferenceProvider')
    }
    return context
}