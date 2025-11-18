import { Transaction } from "@/app/types/transaction.types";
import { createContext, useContext, useState } from "react";

interface ActivityContextType {
    activity: Transaction[] | null,
    setActivity: React.Dispatch<React.SetStateAction<Transaction[] | null>>
    isLoading: boolean
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    fetchActivity: () => Promise<void>
}

const ActivityContext = createContext<ActivityContextType | undefined>(undefined)

const ActivityProvider = ({ children }: { children: React.ReactNode }) => {

    const [activity, setActivity] = useState<Transaction[] | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const fetchActivity = async () => {
        try {
            setIsLoading(true)
            const res = await fetch('/api/transactions')

            if (!res.ok) {
                setActivity(null)
                return
            }

            const data = await res.json()
            setActivity(data)

        } catch (error) {
            setActivity(null)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <ActivityContext.Provider value={{ activity, isLoading, setIsLoading, setActivity, fetchActivity }}>{children}</ActivityContext.Provider>
    )
}

export default ActivityProvider

export function useActivity() {
    const context = useContext(ActivityContext)
    if (context === undefined) {
        throw new Error('useActivity debe usarse dentro de ActivityProvider')
    }
    return context
}