import { AccountService } from "@/app/services/account.service";
import { TransactionsService } from "@/app/services/transactions.service";
import { TransactionRequest } from "@/app/types/transactionRequest.types";
import { serviceBill } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const activity = await TransactionsService.getActivity()
        return NextResponse.json(activity)
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error trying get activity')
            return NextResponse.json(
                { error: error.message },
                { status: 401 }
            )
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { amount, serviceId } = body

        const account = await AccountService.getProfile()

        if (account.available_amount < amount) {
            return NextResponse.json(
                { error: 'Saldo insuficiente' },
                { status: 400 }
            )
        }


        const transactionRequest: TransactionRequest = {
            amount: -Math.abs(amount),
            dated: new Date().toISOString(),
            description: 'Pago de servicio'
        }
        const transaction = await TransactionsService.createTransaction(transactionRequest)


        return NextResponse.json(transaction, { status: 201 })

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
