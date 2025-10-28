'use client'
import { CardResponseUser } from '@/app/types/cardResponseUser.type'
import CardProvider from '@/contexts/CreditCardsContext'
import React, { useEffect, useState } from 'react'

const UserCards = () => {

    const [userCards, setUserCards] = useState<CardResponseUser[] | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)


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
                console.log(data)
                return data
            } catch (error) {
                console.error(error)
            }
        }
    }

    useEffect(() => {
        fetchUserCards()
    }, [])

    return (
        <CardProvider>

            <section className='bg-gray-100 py-4 px-5 rounded-xl text-[#201F22] shadow-gray-300 shadow-md shadow-gray-500/40'>
                <h3 className='text-lg font-semibold mt-2 mb-4'>Tus tarjetas</h3>
                <hr className='text-gray-300 my-2 mb-8' />
                {isLoading ? (
                    <>
                        {[1, 2].map(i => (
                            <div key={i} className='animate-pulse'>
                                <div className='flex justify-between items-center'>
                                    <div className='flex gap-4 items-center'>
                                        <div className='bg-gray-300 w-6 h-6 rounded-full'></div>
                                        <div className='bg-gray-300 h-4 w-32 rounded'></div>
                                    </div>
                                    <div className='bg-gray-300 h-4 w-16 rounded'></div>
                                </div>
                                <hr className='text-gray-300 my-8' />
                            </div>
                        ))}
                    </>
                ) : (
                    userCards?.map(card => (
                        <>
                            <div className='flex justify-between items-center' key={card.id}>
                                <div className='flex gap-4 items-center'>
                                    <div className='bg-[var(--color-primary)] w-6  h-6  rounded-full'></div>
                                    <p>Terminada en {card.last4}</p>
                                </div>
                                <button className='font-bold text-sm' onClick={() => deleteCard(card.id, card.last4)}>Eliminar</button>
                            </div>
                            <hr className='text-gray-300 my-8' />
                        </>
                    ))
                )}


            </section>
        </CardProvider>
    )
}

export default UserCards