import { CardsService } from "@/app/services/cards.service"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const {id} = await params
        const card = await CardsService.getById(id)

        if (!card) {
            return NextResponse.json(
                { error: 'Card not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(card)
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const {id} = await params
        const card = await CardsService.deleteById(params.id)

        return NextResponse.json("Deleted successfully")
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

}