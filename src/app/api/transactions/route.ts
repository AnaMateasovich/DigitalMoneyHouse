import { TransactionsService } from "@/app/services/transactions.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const activity = await TransactionsService.getActivity()

        return NextResponse.json(activity)
    } catch (error) {
        if(error instanceof Error) {
            console.error('Error trying get activity')
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
        const transaction = await TransactionsService.createTransaction(body)


        return NextResponse.json(transaction, {status: 201})
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
