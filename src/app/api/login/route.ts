import client from '@/app/lib/redis';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from "uuid";
import * as yup from 'yup'

const schema = yup.object({
    email: yup.string().required(),
    password: yup.string().required()
}).required()

export async function POST(req: NextRequest) {

    try {
        const body = await req.json()
        const { email, password } = await schema.validate(body)

        // Get token from external API
        const externalRes = await fetch("https://digitalmoney.digitalhouse.com/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!externalRes.ok) {
            return NextResponse.json(
                {error: "Invalid credentials"},
                {status: 401}
            )
        }

        const tokenResponse = await externalRes.json()
        const jwtToken = tokenResponse.token

        // Generate sessionId
        const sessionId = uuidv4()

        // Save in redis with 1hr expiration
        await client.set(`session:${sessionId}`, jwtToken, { EX: 3600 })
        
        const res = NextResponse.json(
            {message: "Logged in saccessfully"},
            {status: 200}
        )

        // Set cookie (sin Secure para desarrollo)
        res.cookies.set({
            name: 'sessionId',
            value: sessionId,
            httpOnly: true,
            path: '/',
            maxAge: 3600,
            // secure: true,
            // sameSite: 'strict'
        })

        return res
        
    } catch (e) {
        console.error('❌ Error en login:', e)
        return NextResponse.json({ error: 'Internal server error' }, {status: 500})
    }
}