import React from 'react'
import { useFormContext } from 'react-hook-form';

type InputProps = {
  label?: string
  fieldName: string
  placeholder?: string;
  styles?: string
  type: 'text' | 'password' | 'tel' | 'email' | 'number'
  errorText?: string
  validations?: {
    required?: string | boolean
    pattern?: {
      value: RegExp
      message: string
    }
    minLength?: {
      value: number,
      message: string
    }
    maxLength?: {
      value: number,
      message: string
    }
    validate?: (value: any) => boolean | string
  }
}

const Input = ({ fieldName, type, placeholder, styles, errorText, validations = {} }: InputProps) => {

  const { register, formState: { errors } } = useFormContext()

  return (
    <div className='w-full relative'>
      <input
        {...register(fieldName, validations)}
        type={type}
        placeholder={placeholder}
     
        className={`w-full placeholder:text-gray-500 rounded-lg py-3 px-4  text-black md:py-4 ${errors[fieldName] ? 'bg-red-100 border-2 border-red-500 ' : 'bg-white'} ${styles}`} />
      {errors[fieldName] && <p className='absolute -bottom-5 left-2 text-red-400 text-xs md:text-sm md:-bottom-6'>
        {(errors[fieldName]?.message as string) || errorText}
      </p>}
    </div>
  )
}

export default Input