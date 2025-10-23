'use client'
import useBreakpoint from '@/hooks/useBreakpoint'
import React from 'react'

const HeroTextResponsive = () => {

  const { isMobile, isTablet } = useBreakpoint()

  return (
    <>
      {isMobile && (
        <div className="relative flex flex-col justify-center cloumn ml-6 mt-7 gap-4 ">
          <h2 className="h1 text-lg text-white leading-9">De ahora<br /> en adelante,<br /> hacés más <br />con tu dinero</h2>
          <hr className="border-t-4  w-5" />
          <h1 className="h2 leading-9 ">Tu nueva<br /> <strong>billetera virtual</strong></h1>
        </div>
      )}
      {isTablet && (
           <div className="relative flex flex-col justify-center cloumn ml-12 mt-18 gap-4">
          <h2 className="h1 text-white">De ahora en <br />adelante, hacés<br />  más con tu dinero</h2>
          <h1 className="h2">Tu nueva <strong>billetera virtual</strong></h1>
        </div>
      )}

    </>
  )
}

export default HeroTextResponsive