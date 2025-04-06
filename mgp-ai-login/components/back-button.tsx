import { ChevronLeft } from "lucide-react"
import Link from "next/link"

interface BackButtonProps {
  href: string
  color?: "green" | "white"
}

export default function BackButton({ href, color = "green" }: BackButtonProps) {
  return (
    <Link href={href} className="absolute left-6 top-16">
      <ChevronLeft className={`w-6 h-6 ${color === "green" ? "text-green-400" : "text-white"}`} />
    </Link>
  )
}

