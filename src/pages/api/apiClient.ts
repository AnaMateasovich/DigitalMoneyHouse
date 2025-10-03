import client from '@/app/lib/redis'
import { ApiError } from '@/app/types/error.types'
import { NextApiRequest } from 'next'
import { cookies } from 'next/headers'

export const EXTERNAL_API = "https://digitalmoney.digitalhouse.com"

export async function externalApi<T>(url: string, options?: RequestInit): Promise<T> {
    const res = await fetch(url, {
        headers: {
            "Content-Type": "application/json"
        },
        ...options
    })

    const data = await res.json()

    if (!res.ok) {
        const apiError = data as ApiError
        throw new Error(apiError.error)
    }

    return data as T
}

// ⬇️ SIN req como parámetro
export async function authenticatedApiClient<T>(
    req: NextApiRequest,
    url: string,
    options?: RequestInit
): Promise<T> {
    const jwt = await getJwtFromCookies(req) 

    const res = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: jwt
        },
        ...options
    })

    const data = await res.json()

    if(!res.ok) {
        const apiError = data as ApiError
        throw new Error(apiError.error)
    }

    return data as T
}

// Función para obtener JWT (App Router)
async function getJwtFromCookies(req: NextApiRequest): Promise<string> {
    const sessionId = req.cookies.sessionId

    if (!sessionId) {
        throw new Error("Unauthorized")
    }

    const jwt = await client.get(`session:${sessionId}`)

    if (!jwt) {
        throw new Error("Session expired")
    }

    return jwt
}