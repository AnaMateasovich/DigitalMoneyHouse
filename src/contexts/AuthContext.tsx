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
    
    return (
        <AuthContext.Provider value={{
            user,
            account,
            isAuthenticated: !!user,
            isLoading,
            refreshUser: fetchUser
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