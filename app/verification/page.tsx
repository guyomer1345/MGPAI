"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import StatusBar from "@/components/status-bar"
import Header from "@/components/header"
import AnimatedButton from "@/components/animated-button"
import { motion } from "framer-motion"

export default function VerificationPage() {
  const [code, setCode] = useState<string[]>(["", "", "", ""])
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Focus the first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleInputChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)

      // Move to next input if value is entered
      if (value && index < 3) {
        setActiveIndex(index + 1)
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !code[index] && index > 0) {
      setActiveIndex(index - 1)
      inputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#1e1e1e] to-[#2a2a2a]">
      <div className="pt-6 px-6 pb-12 relative">
        <StatusBar />
        <Header title="Verification" backHref="/" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <h1 className="text-[#aaf163] text-3xl font-bold mb-2">Enter confirmation code</h1>
          <p className="text-white text-lg">
            A 4-digit code was sent to
            <br />
            050869****
          </p>
        </motion.div>

        <div className="mt-12 flex justify-center gap-4">
          {[0, 1, 2, 3].map((index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center relative overflow-hidden ${
                index === activeIndex ? "border-[#7c57ff]" : code[index] ? "border-[#aaf163]" : "border-gray-400"
              }`}
            >
              <input
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={code[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onClick={() => setActiveIndex(index)}
                className="w-full h-full bg-transparent text-white text-center text-2xl outline-none"
              />
              {code[index] && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 bg-gradient-to-r from-[#00D2FF] to-[#7c57ff] opacity-10"
                />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center text-white text-sm"
        >
          By clicking a button send me a verification code, you
          <br />
          approve the{" "}
          <Link href="#" className="text-[#00D2FF] relative group">
            terms of use and privacy
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00D2FF] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </motion.div>

        <div className="mt-12 text-center">
          <Link href="#" className="text-white text-lg relative inline-block group">
            Resend code
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        <div className="mt-12 px-6">
          <AnimatedButton href="/onboarding/weight">Continue</AnimatedButton>
        </div>
      </div>
    </div>
  )
}

