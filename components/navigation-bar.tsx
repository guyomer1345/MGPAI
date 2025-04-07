"use client"

import type React from "react"

import Link from "next/link"
import { Home, Headphones, Maximize2, MoreHorizontal, Apple } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function NavigationBar() {
  const pathname = usePathname()
  const router = useRouter()
  const isInChatPage = pathname.includes("/assistant/chat")
  const isAssistantActive = pathname.includes("/assistant")

  // Simple position state
  const [position, setPosition] = useState(isInChatPage ? "inline" : "elevated")

  // Update position when route changes
  useEffect(() => {
    setPosition(isInChatPage ? "inline" : "elevated")
  }, [isInChatPage])

  // Handle back navigation
  const handleBackNavigation = (e: React.MouseEvent) => {
    if (isInChatPage) {
      e.preventDefault()

      // First change position, then navigate after transition completes
      setPosition("elevated")

      setTimeout(() => {
        router.push("/assistant")
      }, 300) // Match the transition duration
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      {/* Main Navigation Bar */}
      <div className="relative bg-[#7c57ff] rounded-t-xl py-3 px-6 overflow-visible">
        {/* Assistant Icon - Elevated Position */}
        <div
          className={`
            absolute transition-all duration-300 ease-in-out
            ${
              position === "elevated"
                ? "left-1/2 -translate-x-1/2 -top-6 opacity-100 scale-100"
                : "left-1/2 -translate-x-1/2 -top-20 opacity-0 scale-75"
            }
            z-50
          `}
        >
          <Link href="/assistant" onClick={handleBackNavigation}>
            <div
              className={`w-14 h-14 rounded-full ${
                isAssistantActive ? "bg-white" : "bg-white"
              } flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg border-4 border-[#7c57ff]`}
              style={{
                boxShadow: isAssistantActive
                  ? "0 4px 10px rgba(170, 241, 99, 0.4), 0 0 20px rgba(170, 241, 99, 0.2)"
                  : "0 4px 10px rgba(0, 198, 255, 0.4), 0 0 20px rgba(0, 198, 255, 0.2)",
              }}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rh5qvaCNAYDjtI6smSUn31uEyeTtx1.png"
                alt="Assistant"
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </div>
          </Link>
        </div>

        {/* Navigation Items - Evenly distributed */}
        <div className="flex justify-between items-center">
          {/* Home Icon */}
          <Link href="/" className="flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full ${pathname === "/" ? "bg-[#aaf163]" : "bg-transparent"} flex items-center justify-center transition-transform duration-300 hover:scale-110`}
            >
              <Home
                className={`w-6 h-6 ${pathname === "/" ? "text-[#7c57ff]" : "text-white"} transition-all duration-200`}
              />
            </div>
            <span className={`text-xs mt-1 ${pathname === "/" ? "text-[#aaf163]" : "text-white/70"}`}>Home</span>
          </Link>

          {/* Workout Icon */}
          <Link href="/workout" className="flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full ${pathname.includes("/workout") ? "bg-[#aaf163]" : "bg-transparent"} flex items-center justify-center transition-transform duration-300 hover:scale-110`}
            >
              <Maximize2
                className={`w-6 h-6 ${pathname.includes("/workout") ? "text-[#7c57ff]" : "text-white"} transition-all duration-200`}
              />
            </div>
            <span className={`text-xs mt-1 ${pathname.includes("/workout") ? "text-[#aaf163]" : "text-white/70"}`}>
              Workout
            </span>
          </Link>

          {/* Assistant Icon or Placeholder */}
          <div className="w-12 flex flex-col items-center relative">
            {/* Inline Assistant Icon */}
            <div
              className={`
                absolute left-0 transition-all duration-300 ease-in-out
                ${position === "inline" ? "opacity-100 top-0 scale-100" : "opacity-0 top-10 scale-50"}
              `}
            >
              <Link href="/assistant" onClick={handleBackNavigation}>
                <div
                  className={`w-12 h-12 rounded-full bg-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md`}
                  style={{
                    boxShadow: "0 4px 8px rgba(170, 241, 99, 0.3), 0 0 15px rgba(170, 241, 99, 0.2)",
                  }}
                >
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rh5qvaCNAYDjtI6smSUn31uEyeTtx1.png"
                    alt="Assistant"
                    width={28}
                    height={28}
                    className="w-7 h-7"
                  />
                </div>
              </Link>
            </div>

            {/* Placeholder for spacing when elevated */}
            <div className={`w-12 h-12 ${position === "inline" ? "opacity-0" : "opacity-0"}`}>
              <Headphones className="w-6 h-6 opacity-0" />
            </div>

            <span className={`text-xs mt-1 ${isAssistantActive ? "text-[#aaf163]" : "text-white/70"}`}>Assistant</span>
          </div>

          {/* Nutrition Icon */}
          <Link href="/nutrition" className="flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full ${pathname.includes("/nutrition") ? "bg-[#aaf163]" : "bg-transparent"} flex items-center justify-center transition-transform duration-300 hover:scale-110`}
            >
              <Apple
                className={`w-6 h-6 ${pathname.includes("/nutrition") ? "text-[#7c57ff]" : "text-white"} transition-all duration-200`}
              />
            </div>
            <span className={`text-xs mt-1 ${pathname.includes("/nutrition") ? "text-[#aaf163]" : "text-white/70"}`}>
              Nutrition
            </span>
          </Link>

          {/* More Icon */}
          <Link href="/more" className="flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full ${pathname.includes("/more") ? "bg-[#aaf163]" : "bg-transparent"} flex items-center justify-center transition-transform duration-300 hover:scale-110`}
            >
              <MoreHorizontal
                className={`w-6 h-6 ${pathname.includes("/more") ? "text-[#7c57ff]" : "text-white"} transition-all duration-200`}
              />
            </div>
            <span className={`text-xs mt-1 ${pathname.includes("/more") ? "text-[#aaf163]" : "text-white/70"}`}>
              More
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

