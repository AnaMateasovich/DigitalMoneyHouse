'use client'
import { Company } from '@/app/types/company.types'
import Input from '@/components/form/Input'
import { Search } from 'lucide-react'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const SearchbarPayServices = () => {

     const methods = useForm<Company>({
            mode: "onSubmit"
        })
        const { handleSubmit, formState: { errors } } = methods
    
    return (
        <section>
            <FormProvider {...methods}>
                <Input
                    fieldName="findService" type="text" icon={<Search size={18}/>} placeholder="Busca entre más de 5000 empresas" containerStyles="" styles="py-4"
                />
            </FormProvider>
        </section>
    )
}

export default SearchbarPayServices