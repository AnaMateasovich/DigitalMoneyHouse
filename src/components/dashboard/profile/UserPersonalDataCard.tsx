'use client'
import { useAuth } from '@/contexts/AuthContext'
import { Pencil } from 'lucide-react'
import React from 'react'

const UserPersonalDataCard = () => {
    const { user, fullNameFormatUser } = useAuth()
    return (
        <section className='bg-gray-100 py-4 px-5 rounded-xl text-[#201F22] shadow-gray-300 shadow-md shadow-gray-500/40'>
            <h3 className='h3 mt-2'>Tus datos</h3>
            <hr className='text-gray-300 my-2' />
            <div>
                <p>Email</p>
                <p className='text-gray-500'>{user?.email}</p>
            </div>
            <hr className='text-gray-300 my-2' />
            <div>
                <p>Nombre y apellido</p>
                <div className='text-gray-500 flex justify-between items-center'>
                    <p >{fullNameFormatUser()}</p>
                    <button ><Pencil size={18} /></button>
                </div>
            </div>
            <hr className='text-gray-300 my-2' />
            <div>
                <p>DNI</p>
                <div className='text-gray-500 flex justify-between items-center'>
                    <p >{user?.dni }</p>
                    <button ><Pencil size={18} /></button>
                </div>
            </div>
            <hr className='text-gray-300 my-2' />
            <div>
                <p>Teléfono</p>
                <div className='text-gray-500 flex justify-between items-center'>
                    <p >{user?.phone}</p>
                    <button ><Pencil size={18} /></button>
                </div>
            </div>
            <hr className='text-gray-300 my-2' />
            <div>
                <p>Contraseña</p>
               <div className='text-gray-500 flex justify-between items-center'>
                    <p >*********</p>
                    <button ><Pencil size={18} /></button>
                </div>
            </div>
            <hr className='text-gray-300 my-2' />
            
        </section>
    )
}

export default UserPersonalDataCard