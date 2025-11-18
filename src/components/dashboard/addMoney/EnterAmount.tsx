'use client'
import { useCreditCard } from "@/contexts/CreditCardsContext"
import AddMoneyCardContainer from "./AddMoneyCardContainer"
import { useTransference } from "@/contexts/TransferenceContext"

const EnterAmount = () => {

  const { setAmount, amount } = useTransference()

  return (
    <AddMoneyCardContainer condition={amount !== '' && Number(amount) > 0} href="/dashboard/cargar-dinero/tarjetas/monto/revisar">
      <h3 className='h3'>¿Cuánto querés <br /> ingresar a la cuenta?</h3>
      <input
        type="number"
        name="amount"
        value={amount ?? ''}
        className="w-full placeholder:text-gray-500 rounded-lg py-3 px-4 bg-gray-200 text-[#201F22] my-4"
        placeholder="$0"
        onChange={(e) => setAmount(e.target.value)} />
    </AddMoneyCardContainer>
  )
}

export default EnterAmount