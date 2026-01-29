import { Transaction } from "@/app/types/transaction.types";
import { useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface ActivityContextType {
    activity: Transaction[] | null,
    setActivity: React.Dispatch<React.SetStateAction<Transaction[] | null>>
    isLoading: boolean
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    fetchActivity: () => Promise<void>
    searchResults: Transaction[]
    setSearchResults: React.Dispatch<React.SetStateAction<Transaction[]>>
}

const ActivityContext = createContext<ActivityContextType | undefined>(undefined)

const ActivityProvider = ({ children }: { children: React.ReactNode }) => {

    const searchParams = useSearchParams()

    const [activity, setActivity] = useState<Transaction[] | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [searchResults, setSearchResults] = useState<Transaction[]>([])

    const fetchActivity = async () => {
        try {
            setIsLoading(true)

            const hasFilters =
                searchParams.has('range') ||
                searchParams.has('type')

            const url = hasFilters
                ? `/api/transactions/filter?${searchParams.toString()}`
                : '/api/transactions'


            const res = await fetch(url)

            if (!res.ok) {
                setActivity(null)
                return
            }

            const data = await res.json()
            setActivity(data.data ?? data)

        } catch (error) {
            setActivity(null)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchActivity()
    }, [searchParams.toString()])

    return (
        <ActivityContext.Provider value={{ activity, isLoading, setIsLoading, setActivity, fetchActivity, searchResults,setSearchResults }}>{children}</ActivityContext.Provider>
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