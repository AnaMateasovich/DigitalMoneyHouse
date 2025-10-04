import client from "@/app/lib/redis";
import { AuthService } from "@/app/services/auth.service";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const cookieStore = cookies()
        const sessionId = (await cookieStore).get('sessionId')?.value

        if (!sessionId) {
            return NextResponse.json(
                { error: 'No active session' },
                { status: 400 }
            )
        }

        const jwt = await client.get(`session:${sessionId}`)

        if (jwt) {
            const logoutRes = await AuthService.logut()
        }

        await client.del(`session:${sessionId}`)

        const res = NextResponse.json(
            { message: 'Logged out successfully' },
            { status: 200 }
        )

        res.cookies.set({
            name: 'sessionId',
            value: '',
            httpOnly: true,
            path: '/',
            maxAge: 0
        })

        return res

    } catch (error) {
        console.error('Error in logout: ', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}