'use client'
import React from 'react'
import SuccessCheck from '../SuccessCheck'
import DepositSummary from '../DepositSummary'
import { usePayService } from '@/contexts/PayServiceContext'
import CardContainer from '../CardContainer'
import DownloadReciptButtons from '../DownloadReciptButtons'

const ServicePayment = () => {

    const { service, selectedCard } = usePayService()

    return (
        <div>
            <SuccessCheck text='Ya realizamos tu pago' />
            <CardContainer >
                <DepositSummary title={service!.name} amount={service!.amount} transactionType='Pago de servicio' cvu='Cuenta propia' />
            </CardContainer>
            <DownloadReciptButtons isLoading={false}/>
        </div>
    )
}

export default ServicePayment