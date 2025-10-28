import { CardsService } from "@/app/services/cards.service"
import { CardResponseUser } from "@/app/types/cardResponseUser.type"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req:NextRequest) {
    
    try {
        const cards = await CardsService.getCards()

        const safeCards: CardResponseUser[] = cards.map(card => ({
            id: card.id,
            first_last_name: card.first_last_name,
            expiration_date: card.expiration_date,
            last4: card.number_id.toString().slice(-4)
        }))
        
        return NextResponse.json(safeCards)
    } catch (error) {
         if(error instanceof Error) {
            console.error('Error trying get cards')
            return NextResponse.json(
                {error: error.message},
                {status: 401}
            )
        }

        return NextResponse.json(
            {error: 'Internal server error'},
            {status: 500}
        )
    }
    
}