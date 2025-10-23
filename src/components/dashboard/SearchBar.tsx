import React from 'react'

type SearchBarProps = {
  placeholder?: string
  className?: string
}

const SearchBar = ({className, placeholder = "Buscar"} : SearchBarProps) => {
  return ( 
    <div className={`w-full text-gray-600 ${className}`}>
      <input type="text" placeholder={placeholder} className='w-full bg-gray-100 rounded-xl shadow-[0_3px_7px_rgba(0,0,0,0.25)] p-4' />
      </div>
  )
}

export default SearchBar