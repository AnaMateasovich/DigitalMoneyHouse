import Button from '@/components/Button'
import React from 'react'

type EditInputProps = {
  label: string
  placeholder?:string
  value?: string | number
  onChange: (value: string) => void
  onCancel: () => void
  onSave: () => void
}

const EditInput = ({label, placeholder, value, onChange, onCancel, onSave}:EditInputProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <p>{label}</p>
      <input type='text' placeholder={placeholder} value={value} onChange={(e) => onChange( e.target.value)} className='border-1 py-1 px-2 rounded-lg' />
      <div className='flex justify-between'>
        <button className='bg-[var(--color-secondary)] text-gray-100 py-1 px-6 rounded-lg' onClick={onCancel}>Cancelar</button>
        <button type="submit" className='bg-[var(--color-primary)] py-1 px-6 rounded-lg' onClick={onSave}>Guardar</button>
      </div>
    </div>
  )
}

export default EditInput