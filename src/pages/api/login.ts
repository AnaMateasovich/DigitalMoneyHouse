import client from '@/app/lib/redis';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from "uuid";
import * as yup from 'yup'

const schema = yup.object({
    email: yup.string().required(),
    password: yup.string().required()
}).required()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" })
    }

    try {
        const { email, password } = await schema.validate(req.body)

        // Get token from external API
        const externalRes = await fetch("https://digitalmoney.digitalhouse.com/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!externalRes.ok) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const tokenResponse = await externalRes.json()
        const jwtToken = tokenResponse.token

        // Generate sessionId
        const sessionId = uuidv4()

        // Save in redis with 1hr expiration
        await client.set(`session:${sessionId}`, jwtToken, { EX: 3600 })

        // Set cookie (sin Secure para desarrollo)
        res.setHeader(
            "Set-Cookie",
            `sessionId=${sessionId}; HttpOnly; Path=/; Max-Age=3600`
        )

        return res.status(200).json({ message: "Logged in successfully" })
        
    } catch (e) {
        console.error('❌ Error en login:', e)
        return res.status(500).json({ error: 'Internal server error' })
    }
}