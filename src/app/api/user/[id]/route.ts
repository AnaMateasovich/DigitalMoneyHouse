import { UserService } from "@/app/services/user.service"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params
        const user = await UserService.getUserData(id)

        return NextResponse.json(user)
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('Unauthorized')) {
                return NextResponse.json(
                    { error: error.message },
                    { status: 401 }
                )
            }

            if (error.message.includes('not found')) {
                return NextResponse.json(
                    { error: error.message },
                    { status: 404 }
                )
            }
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            )
        }
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params
        const body = await req.json()

        if (!body) {
            return NextResponse.json(
                { error: 'User data is required' },
                { status: 400 }
            )
        }

        const updated = await UserService.updateUserData(body, id)

        return NextResponse.json(updated)
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('Unauthorized')) {
                return NextResponse.json(
                    { error: error.message },
                    { status: 401 }
                )
            }
            if (error.message.includes('Forbidden')) {
                return NextResponse.json(
                    { error: error.message },
                    { status: 403 }
                )
            }
            if (error.message.includes('not found')) {
                return NextResponse.json(
                    { error: error.message },
                    { status: 404 }
                )
            }
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            )
        }
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}