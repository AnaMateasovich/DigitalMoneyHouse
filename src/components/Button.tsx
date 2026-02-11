'use client'
import { ReactNode } from 'react'
import '../app/globals.css'

type ButtonVariant = 'primary' | 'secondary' | 'outline-primary' | 'outline-secondary' | 'light' 

type ButtonProps = {
  text: string
  id?: string
  variant?: ButtonVariant,
  onClick?: () => void
  className?: string
  type?: string
  iconRight?: ReactNode 
  iconLeft?: ReactNode
  disabled?: boolean
  styleContainer?: string
}

const Button = ({ text,id, variant = 'primary', onClick, className = '', type = "button", iconRight, iconLeft, disabled = false, styleContainer }: ButtonProps) => {

  const variants = {
    primary: 'bg-[var(--color-primary)] text-[var(--color-secondary)] border-[var(--color-primary)]',

    secondary: 'bg-[var(--color-secondary)] text-[var(--color-primary)] border-[var(--color-secondary)]',

    'outline-primary': 'bg-transparent text-[var(--color-primary)] border-[var(--color-primary)]',

    'outline-secondary': 'bg-transparent text-[var(--color-secondary)] border-[var(--color-secondary)]',

    light: 'bg-gray-300 text-[var(--color-secondary)] border-gray-300'
  }

  return (
    <div className={`flex ${styleContainer}`}>
      
      <button id={id} onClick={onClick} className={`${variants[variant]} ${iconLeft || iconRight && "flex justify-between items-center"} border-2 btn1 px-2 rounded-md whitespace-nowrap md:px-6 cursor-pointer ${className}`} disabled={disabled}>
        {iconLeft && <span className="flex items-center">{iconLeft}</span>}
        <span>{text}</span>
        {iconRight && <span className="flex items-center">{iconRight}</span>}

        </button>
    </div>
  )
}

export default Button