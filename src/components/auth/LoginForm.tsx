'use client'
import React, { useState } from 'react'
import Button from '../Button'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm, useWatch, Watch } from 'react-hook-form'
import Input from '../form/Input'
import { TokenRequest } from '@/app/types/tokenRequest.types'
import { AccessDeniedError } from '@/app/services/http.errors'
import { useAuth } from '@/contexts/AuthContext'

const LoginForm = () => {

    const [secondStep, setSecondStep] = useState<boolean>(false)
    const [serverError, setServerError] = useState<string | null>(null)

    const { refreshUser } = useAuth()

    const router = useRouter()
    const methods = useForm<TokenRequest>({
        mode: "onSubmit"
    })
    const { handleSubmit, formState: { errors } } = methods


    const onSubmit = async (data: TokenRequest) => {
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if (!res.ok) {
                const resError = await res.json()
                throw new Error(resError.error || "Error al iniciar sesión")
            }

            const dataResponse = res.json()
            refreshUser()

            router.push("/");
            router.refresh();
        } catch (e) {
            if (e instanceof AccessDeniedError) {
                setServerError("Credenciales inválidas")
            } else {
                setServerError("Ha ocurrido un error. Intente mas tarde");
            }
        }
    }

    const goToNextStep = async () => {
        const isValid = await methods.trigger('email')

        if (isValid) {
            setSecondStep(true)
        }
    }

    return (
        <div className='w-3/4 flex flex-col items-center gap-4 md:w-2/4 lg:w-1/4'>
            <h3 className='h3 text-white'>¡Hola! Ingresa tu email</h3>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-4 items-center lg:text-base' >
                    {!secondStep ? (
                        <>
                            <Input
                                fieldName='email'
                                type='text'
                                placeholder='Correo electrónico'
                                autoComplete='username'
                                validations={{
                                    required: true,
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Email inválido"
                                    }
                                }}
                            />
                            <div className={`w-full ${errors.email ? 'mt-3' : ''}`}>
                                <Button text='Continuar' variant='primary' className='w-full p-2' onClick={goToNextStep} />
                            </div>
                            <div className='w-full '>
                                <Button text='Crear cuenta' variant='light' className='w-full p-2' onClick={() => router.push('/register')} />
                            </div>
                        </>
                    ) : (
                        <>
                            <Input
                                fieldName='email'
                                type='text'
                                placeholder='Correo electrónico'
                                autoComplete='username'
                                containerStyles='hidden'
                                validations={{
                                    required: true,
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Email inválido"
                                    }
                                }}
                            />
                            <Input
                                fieldName='password'
                                type='password'
                                placeholder='Contraseña'
                                autoComplete='current-password'
                                validations={{
                                    required: true
                                }}
                            />
                            <div className='w-full'>
                                <Button type='submit' text='Ingresar' variant='primary' className='w-full p-2' />
                            </div>
                        </>
                    )}
                </form>
                {serverError && (<p className='w-full text-center bg-red-600 text-white'>{serverError}</p>)}
            </FormProvider>

        </div>
    )
}

export default LoginForm