import { CardsService } from "@/app/services/cards.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    
    try {
        const cards = await CardsService.getCards()
        
        return NextResponse.json(cards)
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


export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const card = await CardsService.createCard(body)


        return NextResponse.json(card, {status: 201})
    } catch (error) {
        if(error instanceof Error) {
            return NextResponse.json(
                {error: error.message},
                {status: 400}
            )
        }

        return NextResponse.json(
            {error: 'Internal server error'},
            {status: 500}
        )
    }
}
