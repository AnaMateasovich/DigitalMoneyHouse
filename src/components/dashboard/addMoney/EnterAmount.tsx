'use client'
import { useCreditCard } from "@/contexts/CreditCardsContext"
import CardContainer from "../CardContainer"
import { useTransference } from "@/contexts/TransferenceContext"
import LinkComponent from "@/components/LinkComponent"
import Button from "@/components/Button"

const EnterAmount = () => {

  const { setAmount, amount } = useTransference()

  return (
    <>
    <CardContainer >
      <h3 className='h3'>¿Cuánto querés <br /> ingresar a la cuenta?</h3>
      <input
        type="number"
        name="amount"
        value={amount ?? ''}
        className="w-full placeholder:text-gray-500 rounded-lg py-3 px-4 bg-gray-200 text-[#201F22] my-4"
        placeholder="$0"
        onChange={(e) => setAmount(e.target.value)} />
    </CardContainer>
    {amount !== '' && Number(amount) > 0 ? (
        <div className='flex justify-end mt-4'>
          <LinkComponent text='Continuar' href="/dashboard/cargar-dinero/tarjetas/monto/revisar" styles='btn-size border-2 border-[var(--color-primary)]' />
        </div>
      ) : (
        <div className='flex justify-end mt-4'>
          <Button text='Continuar' disabled className='bg-gray-400 border-gray-400 btn-size' />
        </div>
      )}
        </>
  )
}

export default EnterAmount