'use client'
import { Account } from "@/app/types/account.types"
import { User } from "@/app/types/user.type"
import { useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"
import { useToggleMenu } from "./ToggleMenuContext"

interface AuthContextType {
    user: User | null
    account: Account | null
    isAuthenticated: boolean
    isLoading: boolean
    refreshUser: () => Promise<void>
    fullNameFormatUser: (user?: User | null) => string
    logout: () => void
  
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const router = useRouter()
    const { resetMenu } = useToggleMenu()

    const [user, setUser] = useState<User | null>(null)
    const [account, setAccount] = useState<Account | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const fetchUser = async () => {
        try {
            setIsLoading(true)
            const accountRes = await fetch('/api/account')

            if (!accountRes.ok) {
                setUser(null)
                return
            }

            const data = await accountRes.json()
            setAccount(data.account)
            setUser(data.user)

        } catch (error) {
            setUser(null)
        } finally {
            setIsLoading(false)
        }
    }

    const logout = async (): Promise<void> => {
        try {
            const res = await fetch('/api/logout', {
                method: 'POST'
            })
            if (!res.ok) {
                throw new Error('Error al cerrar sesión');
            }
            setUser(null)
            setAccount(null)
            resetMenu()
            router.push('/')

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const capitalizeFirstLetter = (str: string): string | undefined => {
        if (str.length === 0) {
            return
        }
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    }

    const fullNameFormatUser = (): string => {
        if (!user) return ""
        const name = capitalizeFirstLetter(user.firstname)
        const lastname = capitalizeFirstLetter(user.lastname)
        const fullname = name + " " + lastname
        return fullname
    }
    return (
        <AuthContext.Provider value={{
            user,
            account,
            isAuthenticated: !!user,
            isLoading,
            refreshUser: fetchUser,
            fullNameFormatUser,
            logout,
           
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export function useAuth() {


    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth debe usarse dentro de AuthProvider')
    }
    return context
}