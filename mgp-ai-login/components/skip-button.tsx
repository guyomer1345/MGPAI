import Link from "next/link"

interface SkipButtonProps {
  href: string
}

export default function SkipButton({ href }: SkipButtonProps) {
  return (
    <Link href={href} className="text-green-400 text-xl mt-4 block text-center">
      Skip
    </Link>
  )
}

