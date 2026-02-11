import React from 'react'
import { useFormContext } from 'react-hook-form';

type InputProps = {
  label?: string
  id?: string
  fieldName: string
  placeholder?: string;
  containerStyles?:string
  styles?: string
  type: string
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
  autoComplete?: string
    icon?: React.ReactNode
}

const Input = ({ fieldName, id, type, placeholder, containerStyles, styles, errorText, validations = {}, autoComplete, icon }: InputProps) => {

  const { register, formState: { errors }, watch } = useFormContext()

  const filedValue = watch(fieldName)

  const showIcon = icon && (!filedValue || filedValue.length === 0)

  return (
    <div className={`w-full relative ${containerStyles}`}>
           {showIcon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 ">
          {icon}
        </div>
      )}
      
      <input
      id={id ?? fieldName}
        {...register(fieldName, validations)}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`w-full placeholder:text-gray-500 rounded-lg py-3 px-4  text-[#201F22] md:py-4 ${icon && 'placeholder:pl-5'} ${errors[fieldName] ? 'bg-red-100 border-2 border-red-500 ' : 'bg-white'} ${styles}`} />
      {errors[fieldName] && <p className='absolute -bottom-5 left-2 text-red-400 text-xs md:text-sm md:-bottom-6'>
        {(errors[fieldName]?.message as string) || errorText}
      </p>}
    </div>
  )
}

export default Input