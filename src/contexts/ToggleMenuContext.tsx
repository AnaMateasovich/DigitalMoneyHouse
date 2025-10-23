'use client'
import React, { createContext, useContext, useState } from 'react'

interface ToggleMenuContextType {
    toggle: boolean
    openCloseMenu: () => void
}

const ToggleMenuContext = createContext<ToggleMenuContextType>({
  toggle: false,
  openCloseMenu: () => {}
})

const ToggleMenuProvider = ({ children }: { children: React.ReactNode }) => {

    const [toggle, setToggle] = useState<boolean>(false)

    const openCloseMenu = () => {
        setToggle((prev) => !prev)
    }

    return (
        <ToggleMenuContext.Provider
        value={{
            toggle,
            openCloseMenu
        }}
        >{children}</ToggleMenuContext.Provider>
    )
}

export default ToggleMenuProvider

export const useToggleMenu = () => useContext(ToggleMenuContext)