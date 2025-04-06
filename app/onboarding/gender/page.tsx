"use client"

import { useState } from "react"
import Link from "next/link"
import StatusBar from "@/components/status-bar"
import Header from "@/components/header"
import AnimatedButton from "@/components/animated-button"
import { motion } from "framer-motion"

type Gender = "female" | "male" | "other"

export default function GenderPage() {
  const [selectedGender, setSelectedGender] = useState<Gender>("male")

  const genderIcons = {
    female: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <circle cx="12" cy="8" r="5" stroke="#00D2FF" strokeWidth="2" />
        <path d="M12 13V21" stroke="#00D2FF" strokeWidth="2" />
        <path d="M9 18H15" stroke="#00D2FF" strokeWidth="2" />
      </svg>
    ),
    male: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <circle cx="10" cy="14" r="5" stroke="#7c57ff" strokeWidth="2" />
        <path d="M14 10L20 4" stroke="#7c57ff" strokeWidth="2" />
        <path d="M15 4H20V9" stroke="#7c57ff" strokeWidth="2" />
      </svg>
    ),
    other: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <circle cx="10" cy="14" r="5" stroke="#aaf163" strokeWidth="2" />
        <path d="M14 10L20 4" stroke="#aaf163" strokeWidth="2" />
        <path d="M15 4H20V9" stroke="#aaf163" strokeWidth="2" />
        <path d="M12 19V21" stroke="#aaf163" strokeWidth="2" />
        <path d="M9 18H15" stroke="#aaf163" strokeWidth="2" />
      </svg>
    ),
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#1e1e1e] to-[#2a2a2a]">
      <div className="pt-6 px-6 pb-12 relative">
        <StatusBar />
        <Header backHref="/onboarding/goal" />

        <div className="absolute right-6 top-16 text-[#aaf163]">3 of 4</div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-16"
        >
          <h1 className="text-white text-4xl font-bold text-center">What's your gender?</h1>
        </motion.div>

        <div className="mt-12 flex flex-col gap-4">
          {(["female", "male", "other"] as Gender[]).map((gender, index) => (
            <motion.button
              key={gender}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => setSelectedGender(gender)}
              className={`w-full py-4 px-6 rounded-xl flex items-center justify-between transition-all duration-300 ${
                selectedGender === gender
                  ? "bg-gradient-to-r from-[#2a2a2a] to-[#333333] border-[#7c57ff] shadow-lg"
                  : "bg-[#2a2a2a] border-[#3a3a3a] hover:bg-[#2d2d2d]"
              } border`}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 mr-4">{genderIcons[gender]}</div>
                <span className="text-xl font-medium text-white capitalize">{gender}</span>
              </div>

              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  selectedGender === gender ? "border-[#7c57ff]" : "border-gray-400"
                }`}
              >
                {selectedGender === gender && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="w-3 h-3 rounded-full bg-gradient-to-r from-[#00D2FF] to-[#7c57ff]"
                  />
                )}
              </div>
            </motion.button>
          ))}
        </div>

        <div className="mt-16">
          <AnimatedButton href="/onboarding/assistant">Continue</AnimatedButton>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-4 text-center"
          >
            <Link href="/onboarding/assistant" className="text-[#aaf163] text-xl relative inline-block group">
              Skip
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#aaf163] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

