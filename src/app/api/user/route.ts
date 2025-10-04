import { UserService } from "@/app/services/user.service"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const user = await UserService.register(body)


        return NextResponse.json(user, {status: 201})
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