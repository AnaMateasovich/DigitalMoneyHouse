'use client'
import { Account } from "@/app/types/account.types"
import { User } from "@/app/types/user.type"
import { createContext, useContext, useEffect, useState } from "react"

interface AuthContextType {
    user: User | null
    account: Account | null
    isAuthenticated: boolean
    isLoading: boolean
    refreshUser: () => Promise<void>
    fullNameFormatUser: (user?: User | null) => string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<User | null>(null)
    const [account, setAccount] = useState<Account | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const fetchUser = async () => {
        try {
            setIsLoading(true)
            const accountRes = await fetch('/api/account')

             if(!accountRes.ok) {
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
        if(!user) return ""
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
            fullNameFormatUser
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