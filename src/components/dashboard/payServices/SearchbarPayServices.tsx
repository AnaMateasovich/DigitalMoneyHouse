'use client'
import { Company } from '@/app/types/company.types'
import Input from '@/components/form/Input'
import { usePayService } from '@/contexts/PayServiceContext'
import companies, { serviceBill } from '@/db'
import { Search } from 'lucide-react'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'


const SearchbarPayServices = () => {

    const { setSearchResult } = usePayService()

    const methods = useForm<Company>({
        mode: "onChange"
    })
    const { handleSubmit, formState: { errors }, watch } = methods
    const nameValue = watch('name')


    useEffect(() => {
        if (!nameValue || nameValue.trim() === '') {
            setSearchResult([]) 
            return
        }

        const find = nameValue.toLowerCase().trim()
        const companiesFound = companies.filter(c =>
            c.name.toLowerCase().includes(find)
        )

        setSearchResult(companiesFound)
    }, [nameValue])


    return (
        <section>
            <FormProvider {...methods}>
                <form>

                    <Input
                        fieldName="name" type="text" icon={<Search size={18} />} placeholder="Busca entre más de 5000 empresas" containerStyles="" styles="py-4"
                    />
                </form>
            </FormProvider>
        </section>
    )
}

export default SearchbarPayServices