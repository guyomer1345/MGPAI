"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

interface PortalWrapperProps {
  children: React.ReactNode
}

export default function PortalWrapper({ children }: PortalWrapperProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Create a portal that renders children into the document body
  return mounted ? createPortal(children, document.body) : null
}
