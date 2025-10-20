import { AccountService } from "@/app/services/account.service";
import { UserService } from "@/app/services/user.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    try {
        const account = await AccountService.getProfile()
        const user = await UserService.getUserData(account.user_id.toString())

        return NextResponse.json({account, user})

    } catch (error) {
        if (error instanceof Error) {
            console.error('Error in account', error)
            return NextResponse.json({ error: error.message }, { status: 401 })
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function PATCH(req: NextRequest) {
    try {

        const body = await req.json()
        const { alias } = body

        if (!alias) {
            return NextResponse.json(
                { error: 'Alias is required' },
                { status: 400 }
            )
        }

        const updated = await AccountService.updateAlias({ alias })

        return NextResponse.json(updated)
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            )
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}