"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface AnimatedButtonProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export default function AnimatedButton({ href, children, className = "", onClick }: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative overflow-hidden group w-full bg-gradient-to-r from-[#00D2FF] to-[#7c57ff] text-white text-xl font-medium py-4 px-6 rounded-xl shadow-lg flex items-center justify-center transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative z-10 flex items-center">
        {children}
        <div className={`ml-2 transition-all duration-500 ${isHovered ? "translate-x-1" : ""}`}>
          <ArrowRight className="w-5 h-5" />
        </div>
      </span>

      <div className="absolute inset-0 bg-gradient-to-r from-[#33DAFF] to-[#8d6aff] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        <div className="absolute -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
      </div>
    </Link>
  )
}

