import { Card } from "@/app/types/card.types";
import { CardResponseUser } from "@/app/types/cardResponseUser.type";
import { Transaction } from "@/app/types/transaction.types";
import { createContext, useContext, useState } from "react";

interface CreditCardContextType {
    userCards: CardResponseUser[] | null
    isLoading: boolean
    fetchUserCards: () => void
    addCard: (data: Card) => void
    deleteCard: (id: number, last4: string) => void
    error: string | null
    selectedCard: number | null
    setSelectedCard: React.Dispatch<React.SetStateAction<number | null>>
    isValidCard: (last4: number) => Promise<boolean>
}

const CardContext = createContext<CreditCardContextType | undefined>(undefined)

const CardProvider = ({ children }: { children: React.ReactNode }) => {

    const [userCards, setUserCards] = useState<CardResponseUser[] | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedCard, setSelectedCard] = useState<number | null>(null)

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

    const isValidCard = async (cardId: number): Promise<boolean> => {
        try {
            const res = await fetch('/api/cards', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            if (!res.ok) {
                const resError = await res.json()
                throw new Error(resError.error || "Error al obtener las tarjetas")
            }
            const cards: Card[] = await res.json()

            return cards.some(card =>
                String(card.id) === String(cardId)
            )


        } catch (e) {
            setError('Ocurrio un error al obtener la tarjeta')
            console.error(e)
            return false
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
                isValidCard
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