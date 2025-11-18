'use client'
import { CardRequest } from '@/app/types/cardRequest.types'
import Input from '@/components/form/Input'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import CreditCardPreview from './CreditCardPreview'
import Button from '@/components/Button'
import { useRouter } from 'next/navigation'



const FormCreateCreitCard = () => {

    const router = useRouter()
    const [error, setError] = useState<string | null>(null)

    const methods = useForm<CardRequest>({
        mode: "onChange",
        reValidateMode: "onChange"
    })
    const { handleSubmit, formState: { errors, isValid } } = methods

    const { cod, first_last_name, expiration_date, number_id } = methods.watch();

    const onSubmit = async (data: CardRequest) => {
        const paredData = {
            ...data,
            expiration_date: expiration_date.slice(0, 2) + '/20' + expiration_date.slice(2, 4),
            number_id: Number(data.number_id),
            cod: Number(data.cod)
        }
        try {
            const res = await fetch('/api/cards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(paredData)
            })

            if (!res.ok) {
                const resError = await res.json()
                throw new Error(resError.error || "Error al agregar la tarjeta")
            }
            setError(null)
            router.push('/dashboard/tarjetas')
        } catch (e) {
            setError('Ocurrio un error al cargar la tarjeta')
            console.error(e)

        }
    }

    return (
        <>
            <CreditCardPreview number_id={number_id ? String(number_id) : ''} 
                first_last_name={first_last_name}
                exp_date_month={expiration_date?.slice(0, 2)}
                exp_date_year={expiration_date?.slice(2, 4)}
            />
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
                    <Input fieldName='number_id' type='text' validations={{
                        required: true, pattern: {
                            value: /^(\d{15}|\d{16})$/,
                            message: 'La tarjeta debe tener 15 o 16 dígitos numéricos'
                        }
                    }} placeholder='Numero de la tarjeta*' styles='border-solid border-2 border-[#D2FFEC] shadow-md shadow-gray-500/20 py-3' />
                    <Input fieldName='first_last_name' type='text' validations={{
                        required: true, pattern: {
                            value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s+[A-Za-zÁÉÍÓÚáéíóúÑñ]+)+$/,
                            message: 'Ingresá nombre y apellido válidos'
                        }
                    }} placeholder='Nombre y apellido*' styles='border-solid border-2 border-[#D2FFEC] shadow-md shadow-gray-500/20 py-3' />
                    <Input fieldName='expiration_date' type='text' validations={{
                        required: true, pattern: {
                            value: /^(0[1-9]|1[0-2])([0-9]{2})$/,
                            message: 'Ingresá una fecha válida en formato MMYY'
                        },
                        validate: (value) => {
                            const month = parseInt(value.slice(0, 2), 10)
                            const year = parseInt('20' + value.slice(2, 4), 10)
                            const now = new Date()
                            const currentMonth = now.getMonth() + 1
                            const currentYear = now.getFullYear()
                            if (year < currentYear || (year === currentYear && month < currentMonth)) {
                                return 'La tarjeta está vencida'
                            }
                            return true
                        }
                    }} placeholder='Fecha de vencimiento*' styles='border-solid border-2 border-[#D2FFEC] shadow-md shadow-gray-500/20 py-3' />
                    <Input fieldName='cod' type='number' placeholder='Código de seguridad*' validations={{
                        required: true,
                        pattern: {
                            value: /^[0-9]{3,4}$/,
                            message: 'El código de seguridad debe tener 3 o 4 dígitos'
                        }
                    }} styles='border-solid border-2 border-[#D2FFEC] shadow-md shadow-gray-500/20 py-3' />
                    <Button text="Continuar" type='submit' className={`${isValid ? 'primary' : 'bg-gray-300'} border-gray-300 shadow-md shadow-gray-600/20 w-full my-2 py-2`} disabled={!isValid} />
                </form>
                {error && <p className='text-red-600 text-center'>{error}</p>}
            </FormProvider>
        </>
    )
}

export default FormCreateCreitCard