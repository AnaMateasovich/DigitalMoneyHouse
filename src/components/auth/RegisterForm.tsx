'use client'
import { User } from '@/app/types/user.type'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import Button from '../Button'
import Input from '../form/Input'
import { useState } from 'react'
import Image from 'next/image'

const RegisterForm = () => {

    const [registerComplete, setRegisterComplete] = useState<boolean>(false)

    
    const router = useRouter()
    const methods = useForm<User>({
        mode: "onSubmit"
    })
    const { handleSubmit, formState: { errors }, watch } = methods

    const onSubmit = async (data: User) => {
        try {
            const payload = {
                ...data,
                dni: Number(data.dni)
            }
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Error al registrar')
            }
            const registerResponse = await response.json()
            console.log(registerResponse)
            router.push("/login")
        } catch (error) {
            if (error instanceof Error) {
                console.error(error)
            }
        }
    }


    const password = watch("password")

    const hasErrors = Object.keys(errors).length > 0

    return (
        <div className='w-full flex flex-col items-center gap-4'>
            {!registerComplete ? (
                <>
                    <h3 className='h3 text-white'>Crear cuenta</h3>
                    <FormProvider {...methods}>

                        <form onSubmit={handleSubmit(onSubmit)} className={`w-3/4 flex flex-col gap-6 items-center md:w-1/4 md:grid md:grid-cols-2 md:w-4/5 md:gap-x-12 md:gap-y-7 lg:w-3/5 lg:text-base `}>
                            <Input
                                fieldName='firstname'
                                type='text'
                                placeholder='Nombre *'
                                validations={{
                                    required: true
                                }}
                            />
                            <Input
                                fieldName='lastname'
                                type='text'
                                placeholder='Apellido *'
                                validations={{
                                    required: true
                                }}
                            />
                            <Input
                                fieldName='dni'
                                type='text'
                                placeholder='DNI *'
                                validations={{
                                    required: true,
                                    pattern: {
                                        value: /^[0-9]{7,8}$/,
                                        message: "DNI inválido (7-8 dígitos)"
                                    }
                                }}
                            />
                            <Input
                                fieldName='email'
                                type='text'
                                placeholder='Correo electrónico *'
                                validations={{
                                    required: true,
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Email inválido"
                                    }
                                }}
                            />
                            <p className='w-full text-xs text-center text-gray-300 col-span-2 lg:text-sm'>Usa entre 6 y 20 carácteres {'('}debe contener al menos al menos 1 carácter especial, una mayúscula y un número.{')'}</p>
                            <Input
                                fieldName='password'
                                type='password'
                                placeholder='Contraseña *'
                                validations={{
                                    required: true,
                                    minLength: {
                                        value: 6,
                                        message: "Mínimo 6 caracteres"
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: "Máximo 20 caracteres"
                                    },
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*+.,'?¿])/,
                                        message: "Debe contener mayúscula, número y carácter especial"
                                    }
                                }}
                            />
                            <Input
                                fieldName='confirmPass'
                                type='password'
                                placeholder='Confirmar contraseña*'
                                validations={{
                                    required: true,
                                    validate: value => value === password || "Las contraseñas no coinciden"
                                }}
                            />
                            <Input
                                fieldName='phone'
                                type='tel'
                                placeholder='Teléfono *'
                                validations={{
                                    required: true,
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: "Teléfono inválido (10 dígitos)"
                                    }
                                }}
                            />
                            <div className=' w-full mt-4 md:flex md:flex-col md:h-full md:relative'>
                                <Button type='submit' text='Crear cuenta' variant='primary' className='w-full md:py-3 p-2' />
                                {hasErrors && <div className='bg-red-600 text-white w-full text-center mt-3 md:absolute md:-bottom-7 md:left-0 md:right-0'>Completa los campos requeridos</div>}
                            </div>
                        </form>
                    </FormProvider>
                </>
            ) : (
                <>
                    <h2 className='text-[2.3rem] text-white  md:text-[3.3rem]'>Registro Exitoso</h2>
                    <Image src="/check.png" width={120} height={130} alt="Check de registro exitoso" className='my-2 md:w-[100px]'/>
                    <p className='text-white text-center text-base max-w-4/6 mt-2 md:max-w-3/5 lg:max-w-2/5'>Hemos enviado un correo de confirmación para validar tu email, por favor revisalo para iniciar sesión.</p>
                    <div className='w-3/4 mt-4 md:w-2/5 lg:w-1/5'>
                        <Button text='Continuar' variant='primary' className='w-full md:py-3 p-2' onClick={() => router.push("/")} />
                    </div>
                </>
            )}

        </div>
    )
}

export default RegisterForm