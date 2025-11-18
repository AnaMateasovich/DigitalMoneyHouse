'use client'
import { useTransference } from '@/contexts/TransferenceContext'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import Button from './Button'

const PaymentRecipt = () => {
 const { checkout } = useTransference()

  const handleDownload = async () => {
    const element = document.getElementById('receipt-pdf')
    if (!element) return

    // Capturar el comprobante como imagen
    const canvas = await html2canvas(element, { scale: 2 })
    const imgData = canvas.toDataURL('image/png')

    // Crear PDF
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save(`comprobante_${checkout?.id || 'deposito'}.pdf`)
  }

  if (!checkout) return null

  return (
    <section className="flex flex-col items-center gap-6">
      {/* comprobante visible */}
      <div
        id="receipt-pdf"
        className="bg-white text-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md border border-gray-200"
      >
        <h2 className="text-xl font-bold text-center text-[var(--color-primary)] mb-4">
          Comprobante de Depósito
        </h2>

        <div className="space-y-2 text-sm">
          <p><span className="font-semibold">Fecha:</span> {checkout.dated}</p>
          <p><span className="font-semibold">Monto:</span> ${checkout.amount}</p>
          <p><span className="font-semibold">Origen:</span> {checkout.origin || 'Tarjeta no especificada'}</p>
          <p><span className="font-semibold">Destino:</span> {checkout.destination || 'Cuenta propia'}</p>
          <p><span className="font-semibold">ID de transacción:</span> {checkout.id}</p>
        </div>

        <div className="text-center mt-6 text-xs text-gray-500">
          Gracias por confiar en nuestro servicio 💎
        </div>
      </div>

      <Button
        // onClick={() => handleDownload()}
        className="w-full py-3 shadow-md hover:opacity-90"
        text='Descargar comprobante'
        />
    </section>
  )
}
export default PaymentRecipt