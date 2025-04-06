"use client"

import { useState } from "react"
import Link from "next/link"
import StatusBar from "@/components/status-bar"
import Header from "@/components/header"
import AnimatedButton from "@/components/animated-button"
import AnimatedRadioGroup from "@/components/animated-radio-group"
import { motion } from "framer-motion"
import { TrendingDown, TrendingUp, Minus } from "lucide-react"

type Goal = "lose" | "maintain" | "gain"

export default function GoalPage() {
  const [selectedGoal, setSelectedGoal] = useState<Goal>("maintain")

  const goalOptions = [
    {
      id: "lose",
      label: "Lose weight",
      icon: <TrendingDown className="w-6 h-6 text-[#00D2FF]" />,
    },
    {
      id: "maintain",
      label: "Maintain weight",
      icon: <Minus className="w-6 h-6 text-[#aaf163]" />,
    },
    {
      id: "gain",
      label: "Gain weight",
      icon: <TrendingUp className="w-6 h-6 text-[#7c57ff]" />,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#1e1e1e] to-[#2a2a2a]">
      <div className="pt-6 px-6 pb-12 relative">
        <StatusBar />
        <Header backHref="/onboarding/weight" />

        <div className="absolute right-6 top-16 text-[#aaf163]">2 of 4</div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-16"
        >
          <h1 className="text-white text-4xl font-bold text-center">
            What goal do you
            <br />
            have in mind?
          </h1>
        </motion.div>

        <div className="mt-12">
          <AnimatedRadioGroup
            options={goalOptions}
            defaultValue={selectedGoal}
            onChange={(value) => setSelectedGoal(value as Goal)}
          />
        </div>

        <div className="mt-16">
          <AnimatedButton href="/onboarding/gender">Continue</AnimatedButton>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-4 text-center"
          >
            <Link href="/onboarding/gender" className="text-[#aaf163] text-xl relative inline-block group">
              Skip
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#aaf163] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

