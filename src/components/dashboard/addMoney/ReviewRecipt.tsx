'use client'
import { useAuth } from '@/contexts/AuthContext'
import { useCreditCard } from '@/contexts/CreditCardsContext'
import { useTransference } from '@/contexts/TransferenceContext'
import { usePathname, useRouter } from 'next/navigation'
import DepositSummary from '../DepositSummary'
import AddMoneyCardContainer from './AddMoneyCardContainer'
import Button from '@/components/Button'
import LinkComponent from '@/components/LinkComponent'

const ReviewRecipt = () => {

    const { selectedCard, } = useCreditCard()
    const { account } = useAuth()
    const { amount, makeDeposit, checkout, clearCheckout, recipt } = useTransference()

    const router = useRouter()
    const path = usePathname()

    const isCheckout = path === '/dashboard/cargar-dinero/check-out'
    const isRecipt = path.startsWith('/dashboard/comprobante/')

    const handleMakeDeposit = () => {
        if (Number(amount) > 0 && selectedCard) {
            makeDeposit()
        }
        router.push('/dashboard/cargar-dinero/check-out')
        console.log('se hizo el deposito')
    }

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
            <AddMoneyCardContainer href='' submit={!isCheckout && !isRecipt ? handleMakeDeposit : undefined}>
                <DepositSummary
                    title={data.title}
                    amount={data.amount}
                    cvu={account?.cvu || ''}
                    editable={data.editable}
                    date={data.date}
                    transactionType={data.transactionType}
                />
            </AddMoneyCardContainer>
            <div className='w-full flex flex-col gap-4 mt-4'>
                <Button text='Descargar comprobante' className='w-full py-3 shadow-md'/>
                <LinkComponent text='Ir al inicio' href='/dashboard' styles='py-3 bg-gray-400 shadow-md'/>
            </div>
        </>

    )
}

export default ReviewRecipt