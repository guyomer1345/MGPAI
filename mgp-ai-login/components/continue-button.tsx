"use client"

import Link from "next/link"

interface ContinueButtonProps {
  href: string
  onClick?: () => void
  className?: string
}

export default function ContinueButton({ href, onClick, className = "" }: ContinueButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`bg-purple-gradient text-white text-xl font-medium py-3 px-12 rounded-full shadow-lg w-full flex items-center justify-center ${className}`}
    >
      Continue
    </Link>
  )
}

