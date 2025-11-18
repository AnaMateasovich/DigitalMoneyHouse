import React from 'react'
import Link from "next/link"

type LinkComponentProps = {
    text: string
    href: string
    styles?: string
    bgColor?: string
}
const LinkComponent = ({ text, href, styles, bgColor = 'bg-[var(--color-primary)]' }: LinkComponentProps) => {
    return (
        <Link href={href} className={`${styles} ${bgColor} shadow-gray-300 shadow-md rounded-md text-lg font-semibold text-center`}>{text}</Link>
    )
}

export default LinkComponent