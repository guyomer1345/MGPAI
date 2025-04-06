"use client"

import Link from "next/link"

import { useState, useEffect } from "react"
import StatusBar from "@/components/status-bar"
import Header from "@/components/header"
import AnimatedButton from "@/components/animated-button"
import { motion } from "framer-motion"

export default function WeightPage() {
  const [unit, setUnit] = useState<"kg" | "lbs">("kg")
  const [weight, setWeight] = useState(62)
  const [isAnimating, setIsAnimating] = useState(false)

  // Animate weight when it changes
  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => setIsAnimating(false), 300)
    return () => clearTimeout(timer)
  }, [weight])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#1e1e1e] to-[#2a2a2a]">
      <div className="pt-6 px-6 pb-12 relative">
        <StatusBar />
        <Header backHref="/verification" />

        <div className="absolute right-6 top-16 text-[#aaf163]">1 of 4</div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-16"
        >
          <h1 className="text-white text-4xl font-bold text-center">
            What's your current
            <br />
            weight right now?
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex justify-center gap-4"
        >
          <button
            onClick={() => setUnit("kg")}
            className={`w-36 py-3 rounded-full text-center text-xl font-medium transition-all duration-300 ${
              unit === "kg"
                ? "bg-gradient-to-r from-[#00D2FF] to-[#7c57ff] text-white shadow-lg"
                : "bg-transparent text-white border border-white hover:border-[#7c57ff]"
            }`}
          >
            Kg
          </button>
          <button
            onClick={() => setUnit("lbs")}
            className={`w-36 py-3 rounded-full text-center text-xl font-medium transition-all duration-300 ${
              unit === "lbs"
                ? "bg-[#aaf163] text-[#1e1e1e] shadow-lg"
                : "bg-transparent text-white border border-white hover:border-[#aaf163]"
            }`}
          >
            Lbs
          </button>
        </motion.div>

        <div className="mt-12 text-center">
          <motion.div
            animate={{
              scale: isAnimating ? 1.05 : 1,
              color: isAnimating ? "#aaf163" : "#ffffff",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="text-white text-8xl font-bold"
          >
            {weight} <span className="text-5xl">{unit === "kg" ? "Kg" : "Lbs"}</span>
          </motion.div>
        </div>

        <div className="mt-12 relative h-24">
          <div className="absolute inset-x-0 top-8 flex items-center justify-between px-4">
            {[50, 55, 60, 65, 70, 75, 80].map((mark, index) => (
              <motion.div
                key={mark}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex flex-col items-center"
              >
                <div
                  className={`h-8 w-0.5 ${mark === weight ? "bg-[#aaf163]" : "bg-white"} mb-2 transition-colors duration-300`}
                ></div>
                <span className={`${mark === weight ? "text-[#aaf163]" : "text-white"} transition-colors duration-300`}>
                  {mark}
                </span>
              </motion.div>
            ))}
          </div>

          <input
            type="range"
            min="40"
            max="150"
            value={weight}
            onChange={(e) => setWeight(Number.parseInt(e.target.value))}
            className="absolute inset-0 w-full opacity-0 cursor-pointer"
          />

          {/* Custom slider track */}
          <div className="absolute top-12 left-0 right-0 h-1 bg-[#3a3a3a] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#00D2FF] to-[#7c57ff]"
              style={{
                width: `${((weight - 40) / (150 - 40)) * 100}%`,
              }}
              animate={{
                width: `${((weight - 40) / (150 - 40)) * 100}%`,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </div>

          {/* Custom slider thumb */}
          <motion.div
            className="absolute top-[44px] w-6 h-6 bg-white rounded-full shadow-lg cursor-pointer"
            style={{
              left: `calc(${((weight - 40) / (150 - 40)) * 100}% - 12px)`,
            }}
            animate={{
              left: `calc(${((weight - 40) / (150 - 40)) * 100}% - 12px)`,
              scale: isAnimating ? 1.2 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </div>

        <div className="mt-16">
          <AnimatedButton href="/onboarding/goal">Continue</AnimatedButton>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-4 text-center"
          >
            <Link href="/onboarding/goal" className="text-[#aaf163] text-xl relative inline-block group">
              Skip
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#aaf163] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

