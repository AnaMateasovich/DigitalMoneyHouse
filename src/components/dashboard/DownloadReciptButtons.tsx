import React from 'react'
import Button from '../Button'
import LinkComponent from '../LinkComponent'

type DownloadReciptButtonsProps = {
    isLoading: boolean
}
const DownloadReciptButtons = ({isLoading} : DownloadReciptButtonsProps) => {
    return (
        <>
            {isLoading ? (
                <>
                    <div className='bg-gray-400 w-full h-30 rounded-xl mb-4 shadow-md animate-pulse'>
                    </div>
                    <div className='bg-gray-400 w-full h-50 rounded-xl mb-4 shadow-md animate-pulse' >
                    </div>
                    <div className='flex flex-col gap-4 mt-5 animate-pulse'>
                        <Button text='Descargar comprobante' className='bg-gray-400 border-gray-400 w-full py-3 shadow-md' disabled={true} />
                        <LinkComponent
                            text='Ir al inicio'
                            href='/dashboard'
                            bgColor='bg-gray-400/50'
                            styles='py-3 shadow-md'
                        />
                    </div>
                </>
            ) : (
                <div className='flex flex-col gap-4 mt-5'>
                    <Button text='Descargar comprobante' className='w-full py-3 shadow-md' />
                    <LinkComponent
                        text='Ir al inicio'
                        href='/dashboard'
                        bgColor='bg-gray-400/50'
                        styles='py-3 shadow-md'
                    />
                </div>
            )}
        </>
    )
}

export default DownloadReciptButtons