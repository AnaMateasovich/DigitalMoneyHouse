import { TranferencesService } from "@/app/services/tranferences.service"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    try {

        const { id } = await params

        const body = await req.json()
        const deposit = await TranferencesService.createDeposit(body, id)


        return NextResponse.json(deposit, { status: 201 })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}