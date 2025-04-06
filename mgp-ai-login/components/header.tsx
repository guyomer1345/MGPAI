import Link from "next/link"
import MGPLogoImage from "./mgp-logo-image"
import { ChevronLeft } from "lucide-react"

interface HeaderProps {
  showBackButton?: boolean
  backHref?: string
  title?: string
}

export default function Header({ showBackButton = true, backHref = "/", title }: HeaderProps) {
  return (
    <div className="relative flex flex-col items-center pt-4 pb-2">
      {showBackButton && (
        <Link href={backHref} className="absolute left-6 top-1/2 transform -translate-y-1/2">
          <ChevronLeft className="w-6 h-6 text-[#aaf163]" />
        </Link>
      )}

      <div className="logo-container">
        <MGPLogoImage />
      </div>

      {title && <div className="text-[#aaf163] text-2xl font-medium mt-2 animate-fadeIn">{title}</div>}
    </div>
  )
}

