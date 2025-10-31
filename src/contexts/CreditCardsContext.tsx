import { Card } from "@/app/types/card.types";
import { CardResponseUser } from "@/app/types/cardResponseUser.type";
import { createContext, useContext, useState } from "react";

interface CreditCardContextType {
    userCards: CardResponseUser[] | null
    isLoading: boolean
    fetchUserCards: () => void
    addCard: (data: Card) => void
    deleteCard: (id: number, last4: string) => void
    error: string | null
    selectedCard: number | null
    setSelectedCard: (id: number) => void
    amount: number | null
    setAmount: (amount: number) => void
}

const CardContext = createContext<CreditCardContextType | undefined>(undefined)

import React from 'react'

const CardProvider = ({ children }: { children: React.ReactNode }) => {

    const [userCards, setUserCards] = useState<CardResponseUser[] | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedCard, setSelectedCard] = useState<number | null>(null)
    const [amount, setAmount] = useState<number | null>(null)

    const fetchUserCards = async () => {
        try {
            setIsLoading(true)
            const res = await fetch('/api/cards/responseUser')

            if (!res.ok) {
                setUserCards(null)
            }
            const data = await res.json()
            setUserCards(data)
        } catch (error) {
            console.error('Error getting user cards', error)

        } finally {
            setIsLoading(false)
        }
    }

    const deleteCard = async (cardId: number, last4: string): Promise<void> => {
        const confirm = window.confirm('Seguro que quieres eliminar la tarjeta terminada en ' + last4)
        if (confirm) {
            try {
                const res = await fetch(`/api/cards/${cardId}`, {
                    method: 'DELETE',
                })
                if (!res.ok) {
                    throw new Error('Error al eliminar la tarjeta');
                }
                const data = await res.json()
                fetchUserCards()
                return data
            } catch (error) {
                console.error(error)
            }
        }
    }

    const addCard = async (data: Card) => {
        if (userCards?.length === 10) return // can't add more than 10
        try {
            const res = await fetch('/api/cards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if (!res.ok) {
                const resError = await res.json()
                throw new Error(resError.error || "Error al agregar la tarjeta")
            }
            setError(null)
            const dataResponse = res.json()
            console.log(dataResponse)
        } catch (e) {
            setError('Ocurrio un error al cargar la tarjeta')
            console.error(e)

        }
    }


    return (
        <CardContext.Provider
            value={{
                fetchUserCards,
                addCard,
                userCards,
                isLoading,
                deleteCard,
                error,
                selectedCard,
                setSelectedCard,
                amount,
                setAmount
            }}>{children}</CardContext.Provider>
    )
}

export default CardProvider

export function useCreditCard() {
    const context = useContext(CardContext)
    if (context === undefined) {
        throw new Error('useCreditCard debe usarse dentro de CardProvider')
    }
    return context
}