"use client"

import { useState, useEffect } from "react"
import StatusBar from "@/components/status-bar"
import Header from "@/components/header"
import AnimatedButton from "@/components/animated-button"
import AssistantIcon from "@/components/assistant-icon"
import { motion } from "framer-motion"

export default function AssistantPage() {
  const [assistantName, setAssistantName] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [displayText, setDisplayText] = useState("")

  // Welcome message
  const welcomeText = "Welcome, Ido Mena! I'm your personal AI gym assistant."
  const instructionText = "What would you like to call me?"

  // Typing animation for the welcome message
  useEffect(() => {
    if (isTyping) {
      let i = 0
      const typingInterval = setInterval(() => {
        if (i < welcomeText.length) {
          setDisplayText(welcomeText.substring(0, i + 1))
          i++
        } else {
          clearInterval(typingInterval)
          setIsTyping(false)
        }
      }, 50)

      return () => clearInterval(typingInterval)
    }
  }, [isTyping])

  return (
    <div className="flex flex-col min-h-screen bg-[#1e1e1e]">
      <div className="pt-6 px-6 pb-12 relative">
        <StatusBar />
        <Header backHref="/onboarding/gender" />

        <div className="absolute right-6 top-16 text-white">4 of 4</div>

        <div className="flex flex-col items-center mt-12">
          <AssistantIcon className="mt-8 w-24 h-24" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-white text-2xl leading-relaxed">
            {displayText}
            {isTyping && <span className="inline-block w-2 h-5 bg-white ml-1 animate-blink"></span>}
          </p>

          {!isTyping && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-[#aaf163] text-xl mt-4"
            >
              {instructionText}
            </motion.p>
          )}
        </motion.div>

        {!isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 max-w-sm mx-auto"
          >
            <div className="relative group">
              <label className="text-[#a3a3a8] text-sm font-medium block mb-2 ml-1">Assistant Name</label>
              <input
                type="text"
                value={assistantName}
                onChange={(e) => setAssistantName(e.target.value)}
                placeholder="Enter a name for your assistant..."
                className="w-full bg-[#2a2a2a] text-white text-xl py-4 px-5 rounded-xl border border-[#3a3a3a] focus:border-[#7c57ff] focus:ring-2 focus:ring-[#7c57ff] focus:ring-opacity-20 transition-all outline-none"
              />
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#00D2FF] to-[#7c57ff] transform scale-x-0 origin-left transition-transform duration-300 group-focus-within:scale-x-100"></div>
            </div>

            {assistantName && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-4 text-center"
              >
                <p className="text-white text-lg">
                  Nice to meet you! I'll be your personal assistant,{" "}
                  <span className="text-gradient font-bold">{assistantName}</span>.
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-auto pt-16"
        >
          <AnimatedButton href="/chat" className="bg-white">
            <span className="text-gradient font-bold">Start your journey</span>
          </AnimatedButton>
        </motion.div>
      </div>
    </div>
  )
}

