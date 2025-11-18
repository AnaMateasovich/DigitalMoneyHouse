'use client'
import React, { createContext, useContext, useState } from 'react'

interface ToggleMenuContextType {
    toggle: boolean
    openCloseMenu: () => void
    resetMenu: () => void
    setToggle: React.Dispatch<React.SetStateAction<boolean>>
}

const ToggleMenuContext = createContext<ToggleMenuContextType>({
  toggle: false,
  openCloseMenu: () => {},
  resetMenu: () => {},
  setToggle: () => {}
})

const ToggleMenuProvider = ({ children }: { children: React.ReactNode }) => {

    const [toggle, setToggle] = useState<boolean>(false)

    const resetMenu = () => setToggle(false)

    const openCloseMenu = () => {
        setToggle((prev) => !prev)
    }

    return (
        <ToggleMenuContext.Provider
        value={{
            toggle,
            openCloseMenu,
            resetMenu,
            setToggle
        }}
        >{children}</ToggleMenuContext.Provider>
    )
}

export default ToggleMenuProvider

export const useToggleMenu = () => useContext(ToggleMenuContext)