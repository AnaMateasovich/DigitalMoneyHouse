import React from 'react'
import Link from "next/link"

type LinkComponentProps = {
    text: string
    href: string
    styles?: string
}
const LinkComponent = ({ text, href, styles }: LinkComponentProps) => {
    return (
        <Link href={href} className={`${styles} bg-[var(--color-primary)] shadow-gray-300 shadow-md rounded-md text-lg font-semibold text-center`}>{text}</Link>
    )
}

export default LinkComponent