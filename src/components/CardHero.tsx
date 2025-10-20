import React from 'react'

type CardHeroProps = {
    title: string
    body: string
}

const CardHero = ({ title, body }: CardHeroProps) => {
    return (
        <div className='bg-white p-6 w-full rounded-3xl flex flex-col  gap-3 md:w-4/5 lg:w-3/5 max-h-full lg:place-self-stretch'>
            <h3 className='h1 whitespace-nowrap text-black'>{title}</h3>
            <hr className="border-1" />
            <p className='text-black text-xl'>{body}</p>
        </div>
        // <div className='bg-white w-100  rounded-[2rem] py-6 px-8 flex flex-col gap-3 w-[500px] h-'>
        //     <h3 className='h1 text-black'>{title}</h3>

        //     <hr className="w-90 h[4px] bg-[var(--color-primary)] self-center " />
        //     <p className='text-[1.3rem] text-black'>{body}</p>
        // </div>
    )
}

export default CardHero