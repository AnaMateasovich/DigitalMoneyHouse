'use client'
import { useAuth } from '@/contexts/AuthContext'
import { Pencil } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import EditInput from './EditInput'

const UserPersonalDataCard = () => {

    // TODO: migrar a formContext porque no funciona guardar al presionar enter 

    const { user, account, refreshUser } = useAuth()

    const [onEdit, setOnEdit] = useState<{ field: string | null, value: string | number }>({
        field: null,
        value: ''
    })
    const [repitPass, setRepitPass] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string>('')

    const formatName = (name?: string) =>
        name ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() : ""

    const formatedFirstname = formatName(user?.firstname)
    const formatedLastname = formatName(user?.lastname)


    const startEditing = (field: string, currentValue: string | number) => {
        setOnEdit({ field, value: currentValue })
    }
    const onCancel = () => {
        setOnEdit({
            field: null,
            value: ''
        })
        setError(null)
    }

    

    const onSave = async () => {
        
        if (!user || !onEdit.field) return
        if (onEdit.field === "password" && onEdit.value !== repitPass) {
            setError("Las contraseñas no coiniciden")
            return
        }
        setError(null)
        const userUpdate = {
            ...user,
            [onEdit.field]: onEdit.value
        }
        try {
               if (onEdit.field === 'alias') {
            const accountUpdate = { alias: onEdit.value };
            const res = await fetch(`/api/account/${account?.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(accountUpdate)
            });

            if (!res.ok) throw new Error((await res.json()).error || "Error al actualizar alias");

        } else {
            const userUpdate = { ...user, [onEdit.field]: onEdit.value };
            const res = await fetch(`/api/user/${account?.user_id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userUpdate)
            });

            if (!res.ok) throw new Error((await res.json()).error || "Error al actualizar datos");
        }
            setOnEdit({
                field: null,
                value: ''
            })
            refreshUser()
            setMessage('Se actualizaron los datos')
            setTimeout(() => {
                setMessage('')
            }, 3000)

        } catch (error) {
            console.error(error)
            setOnEdit({
                field: null,
                value: ''
            })
            setError('Ocurrio un error en el servidor, intente más tarde')
            setTimeout(() => {
                setError(null)
            }, 3000);
        }
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
            {onEdit.field === 'firstname' ? (
                <EditInput label='Nombre' value={onEdit.value} onChange={(v) => setOnEdit({ ...onEdit, value: v })} onSave={onSave} onCancel={onCancel} />
            ) : (
                <div>
                    <p>Nombre</p>
                    <div className='text-gray-500 flex justify-between items-center'>
                        <p >{formatedFirstname}</p>
                        <button onClick={() => startEditing("firstname", formatedFirstname)}><Pencil size={18} /></button>
                    </div>
                </div>
            )}
            <hr className='text-gray-300 my-2' />
            {onEdit.field === 'lastname' ? (
                <EditInput label='Apellido' value={onEdit.value} onChange={(v) => setOnEdit({ ...onEdit, value: v })} onSave={onSave} onCancel={onCancel} />
            ) : (
                <div>
                    <p>Apellido</p>
                    <div className='text-gray-500 flex justify-between items-center'>
                        <p >{formatedLastname}</p>
                        <button onClick={() => startEditing("lastname", formatedLastname)}><Pencil size={18} /></button>
                    </div>
                </div>
            )}
            <hr className='text-gray-300 my-2' />

            <div>
                <p>DNI</p>
                <div className='text-gray-500 flex justify-between items-center'>
                    <p >{user?.dni}</p>
                </div>
            </div>

            <hr className='text-gray-300 my-2' />
            {onEdit.field === 'alias' ? (
                <EditInput label='Alias' value={onEdit.value} onChange={(v) => setOnEdit({ ...onEdit, value: v })} onSave={onSave} onCancel={onCancel} />
            ) : (
                <div>
                    <p>Alias</p>
                    <div className='text-gray-500 flex justify-between items-center'>
                        <p >{account?.alias}</p>
                        <button onClick={() => startEditing("alias", account?.alias!)}><Pencil size={18} /></button>
                    </div>
                </div>
            )}

            <hr className='text-gray-300 my-2' />
            {onEdit.field === 'phone' ? (
                <EditInput type='number' label='Teléfono' value={onEdit.value} onChange={(v) => setOnEdit({ ...onEdit, value: v })} onSave={onSave} onCancel={onCancel} />
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
                <>
                    <input
                        type="hidden"
                        name="email"
                        value={user?.email || ''}
                        autoComplete="email"
                    />
                    <EditInput type='password' label='Contraseña' onChange={(v) => setOnEdit({ ...onEdit, value: v })} onSave={onSave} onCancel={onCancel} placeholder='Nueva contraseña' autoComplete='new-password'>
                        <input type="password" placeholder='Repite la contraseña' className='border-1 py-1 px-2 rounded-lg' onChange={(e) => setRepitPass(e.target.value)} autoComplete='new-password' />
                    </EditInput>

                </>
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
            {error && <p className='text-red-600 text-center'>{error}</p>}
            {message && <p className='text-green-600 text-center'>{message}</p>}
        </section>
    )
}

export default UserPersonalDataCard