'use client'
import { useAuth } from '@/contexts/AuthContext'
import { Pencil } from 'lucide-react'
import React, { useState } from 'react'
import EditInput from './EditInput'

const UserPersonalDataCard = () => {
    const { user, fullNameFormatUser } = useAuth()

    const [onEdit, setOnEdit] = useState<{ field: string | null, value: string | number }>({
        field: null,
        value: ''
    })

    const startEditing = (field: string, currentValue: string | number) => {
        setOnEdit({ field, value: currentValue })
    }
    const onCancel = () => {
        setOnEdit({
            field: null,
            value: ''
        })
    }
    const onSave =  () => {

        console.log('todo')
    }
    return (
        <section className='bg-gray-100 py-4 px-5 rounded-xl text-[#201F22] shadow-gray-300 shadow-md shadow-gray-500/40'>
            <h3 className='h3 mt-2'>Tus datos</h3>
            <hr className='text-gray-300 my-2' />
            <div>
                <p>Email</p>
                <p className='text-gray-500'>{user?.email}</p>
            </div>
            <hr className='text-gray-300 my-2' />
               {onEdit.field === 'first_last_name' ? (
                <EditInput label='Nombre y apellido' value={onEdit.value} onChange={(v) => setOnEdit({ ...onEdit, value: v })} onSave={onSave} onCancel={onCancel} />
            ) : (
                <div>
                    <p>Nombre y apellido</p>
                    <div className='text-gray-500 flex justify-between items-center'>
                        <p >{fullNameFormatUser()}</p>
                        <button onClick={() => startEditing("first_last_name", fullNameFormatUser())}><Pencil size={18} /></button>
                    </div>
                </div>
            )}
            <hr className='text-gray-300 my-2' />
            {onEdit.field === 'dni' ? (
                <EditInput label='DNI' value={onEdit.value} onChange={(v) => setOnEdit({ ...onEdit, value: v })} onSave={onSave} onCancel={onCancel} />
            ) : (
                <div>
                    <p>DNI</p>
                    <div className='text-gray-500 flex justify-between items-center'>
                        <p >{user?.dni}</p>
                        <button onClick={() => startEditing("dni", user?.dni ?? '')}><Pencil size={18} /></button>
                    </div>
                </div>
            )}
            <hr className='text-gray-300 my-2' />
            {onEdit.field === 'phone' ? (
                <EditInput label='Teléfono' value={onEdit.value} onChange={(v) => setOnEdit({ ...onEdit, value: v })} onSave={onSave} onCancel={onCancel} />
            ) : (
                <div>
                    <p>Teléfono</p>
                    <div className='text-gray-500 flex justify-between items-center'>
                        <p >{user?.phone}</p>
                        <button onClick={() => startEditing("phone", user?.phone ?? '')}><Pencil size={18} /></button>
                    </div>
                </div>
            )}
            <hr className='text-gray-300 my-2' />
            {onEdit.field === 'password' ? (
                <EditInput label='Contraseña'  onChange={(v) => setOnEdit({ ...onEdit, value: v })} onSave={onSave} onCancel={onCancel} placeholder='Nueva contraseña'/>
            ) : (
                <div>
                    <p>Contraseña</p>
                    <div className='text-gray-500 flex justify-between items-center'>
                        <p >*********</p>
                        <button onClick={() => startEditing("password", user?.password ?? '')}><Pencil size={18} /></button>
                    </div>
                </div>
            )}
            <hr className='text-gray-300 my-2' />
           
        </section>
    )
}

export default UserPersonalDataCard