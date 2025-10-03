import client from '@/app/lib/redis'
import { ApiError } from '@/app/types/error.types'
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

export async function authenticatedApiClient<T>(
    url: string,
    options?: RequestInit
): Promise<T> {
    const jwt = await getJwtFromCookies() 

    const res = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: jwt
        },
    })

    const data = await res.json()

    if(!res.ok) {
        const apiError = data as ApiError
        throw new Error(apiError.error)
    }

    return data as T
}

// Función para obtener JWT (App Router)
async function getJwtFromCookies(): Promise<string> {
    const cookieStore = cookies()
    const sessionId = (await cookieStore).get('sessionId')?.value

    if (!sessionId) {
        throw new Error("Unauthorized")
    }

    const jwt = await client.get(`session:${sessionId}`)

    if (!jwt) {
        throw new Error("Session expired")
    }

    return jwt
}