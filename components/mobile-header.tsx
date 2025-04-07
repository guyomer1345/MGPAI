"use client"

import type React from "react"
import { Bell } from "lucide-react"
import Logo from "./logo"
import { useRouter } from "next/navigation"

interface MobileHeaderProps {
  showProfile?: boolean
  showBack?: boolean
  title?: string
  date?: string
  backLink?: string
  onBackClick?: (e: React.MouseEvent) => void
}

export default function MobileHeader({
  showProfile = true,
  showBack = false,
  title,
  date,
  backLink = "/",
  onBackClick,
}: MobileHeaderProps) {
  const router = useRouter()

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault()

    if (onBackClick) {
      onBackClick(e)
    } else {
      router.back()
    }
  }

  return (
    <div className="flex items-center justify-between w-full py-4">
      {showBack ? (
        <div className="flex flex-col items-center">
          <button
            className="p-2 transition-transform duration-300 hover:scale-110 active:scale-95"
            onClick={handleBackClick}
            aria-label="Go back"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      ) : showProfile ? (
        <div className="flex items-center">
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#00c6ff] transition-all duration-300 hover:border-[#aaf163] hover:scale-105">
              <img src="/placeholder.svg?height=48&width=48" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1 left-0 right-0 text-center text-xs text-[#00c6ff] font-bold">45%</div>
          </div>
          <div className="ml-4">
            <button className="p-2 transition-transform duration-300 hover:scale-125 active:scale-95">
              <Bell className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      ) : null}

      {title ? (
        <div className="flex flex-col items-center">
          {date && <div className="text-sm text-gray-300">{date}</div>}
          <h1 className="text-xl font-bold text-white">{title}</h1>
        </div>
      ) : (
        <div className="mx-auto">
          <Logo />
        </div>
      )}

      {showProfile ? <div className="w-16"></div> : <div className="w-8"></div>}
    </div>
  )
}

