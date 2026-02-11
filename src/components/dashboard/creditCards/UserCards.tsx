'use client'
import { useCreditCard } from '@/contexts/CreditCardsContext'
import React, { useEffect } from 'react'

type UserCardsProps = {
    mode: 'select' | 'manage'
    onSelectCard?: (cardId: number) => void
}

const UserCards = ({ mode, onSelectCard }: UserCardsProps) => {

    const { userCards, isLoading, fetchUserCards, deleteCard, selectedCard, setSelectedCard } = useCreditCard()

    useEffect(() => {
        fetchUserCards()
    }, [])


    return (
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
                userCards?.length! > 0 ? (
                    userCards?.map((card) => (
                        <React.Fragment key={card.id}>
                            <div className='flex justify-between items-center' >
                                <div className='flex gap-4 items-center'>
                                    <div className='bg-[var(--color-primary)] w-6  h-6  rounded-full'></div>
                                    <p>Terminada en {card.last4}</p>
                                </div>
                                {mode === 'select' ? (
                                    <input
                                        type="radio"
                                        name='creditCardSelect'
                                        value={card.id}
                                        checked={selectedCard === card.id}
                                        onChange={() => {
                                            setSelectedCard(card.id)

                                            if (onSelectCard) {
                                                onSelectCard(card.id)
                                            }
                                        }}
                                    />
                                ) : (
                                    <button className='font-bold text-sm' onClick={() => deleteCard(card.id, card.last4)}>Eliminar</button>
                                )}
                            </div>
                            <hr className='text-gray-300 my-8 last:mb-2' />
                        </React.Fragment>
                    ))
                ) : (
                    <p>No tienes tarjetas asociadas</p>
                )
            )}


        </section>
    )
}

export default UserCards