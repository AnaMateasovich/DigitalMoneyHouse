'use client'
import { useAuth } from '@/contexts/AuthContext'
import { useCreditCard } from '@/contexts/CreditCardsContext'
import { useTransference } from '@/contexts/TransferenceContext'
import { usePathname, useRouter } from 'next/navigation'
import DepositSummary from './dashboard/DepositSummary'
import CardContainer from './dashboard/CardContainer'
import Button from '@/components/Button'
import LinkComponent from '@/components/LinkComponent'
import DownloadReciptButtons from './dashboard/DownloadReciptButtons'

const ReviewRecipt = () => {

    const { account } = useAuth()
    const { amount, checkout, recipt } = useTransference()

    const path = usePathname()

    const isCheckout = path === '/dashboard/cargar-dinero/check-out'
    const addMoneyPath = '/dashboard/cargar-dinero/tarjetas/monto/revisar'
    const isRecipt = path.startsWith('/dashboard/comprobante/')


    const getType = (type: string): string => {
        switch (type) {
            case 'Deposit':
                return 'Ingresaste dinero'
            case 'Transfer':
                return 'Transferencia'
            case 'Transaction':
                return 'Pago de servicio'
            default:
                return ''
        }
    }

    const data = checkout
        ? {
            title: 'Comprobante',
            amount: checkout.amount,
            date: checkout.dated,
            editable: false,
            transactionType: getType(checkout.type)
        }
        : recipt
            ?
            {
                title: 'Comprobante de transferencia',
                amount: recipt.amount,
                date: recipt.dated,
                editable: false,
                transactionType: getType(recipt.type),
            }

            :
            {
                title: 'Revisá que todo esté bien',
                amount,
                editable: !isCheckout,
                transactionType: 'Vas a transferir'
            }

    return (
        <>
            <CardContainer >
                <DepositSummary
                    title={data.title}
                    amount={data.amount}
                    cvu={account?.cvu || ''}
                    editable={data.editable}
                    date={data.date}
                    transactionType={data.transactionType}
                />
            </CardContainer>
            {path !== addMoneyPath && (
                <DownloadReciptButtons isLoading={false} />
            )}

        </>

    )
}

export default ReviewRecipt