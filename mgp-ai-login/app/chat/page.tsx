"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import StatusBar from "@/components/status-bar"
import Header from "@/components/header"
import AssistantIcon from "@/components/assistant-icon"
import { motion, AnimatePresence } from "framer-motion"

type Message = {
  id: string
  sender: "user" | "assistant"
  text: string
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "assistant",
      text: "Hi Ido! I'm your personal MGP.AI assistant. I noticed you're looking to maintain your current weight of 62kg. What are your fitness goals and interests? This will help me customize your experience.",
      timestamp: new Date(),
    },
  ])

  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate assistant response after a short delay
    setTimeout(() => {
      const assistantResponses = [
        "That's great to know! I'll customize your workout plan based on that. Do you prefer home workouts or going to the gym?",
        "Thanks for sharing! How many days per week would you like to exercise?",
        "I understand. Based on your goals and preferences, I'll create a personalized plan for you. Would you like to see your first workout now?",
        "Perfect! I've noted your preferences. Would you like me to suggest a nutrition plan to complement your workouts?",
      ]

      const randomResponse = assistantResponses[Math.floor(Math.random() * assistantResponses.length)]

      const assistantMessage: Message = {
        id: Date.now().toString(),
        sender: "assistant",
        text: randomResponse,
        timestamp: new Date(),
      }

      setIsTyping(false)
      setMessages((prev) => [...prev, assistantMessage])
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-screen bg-[#1e1e1e]">
      <div className="pt-6 px-6 pb-4">
        <StatusBar />
        <Header showBackButton={false} />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`mb-4 ${message.sender === "user" ? "flex justify-end" : "flex justify-start"}`}
            >
              {message.sender === "assistant" && (
                <div className="mr-2 flex items-end">
                  <AssistantIcon className="w-8 h-8" animate={false} />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-[#00D2FF] to-[#7c57ff] text-white"
                    : "bg-[#2a2a2a] text-white border border-[#3a3a3a]"
                }`}
              >
                <p>{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-400"}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex justify-start mb-4"
            >
              <div className="mr-2 flex items-end">
                <AssistantIcon className="w-8 h-8" animate={false} />
              </div>
              <div className="max-w-[80%] rounded-2xl p-4 bg-[#2a2a2a] text-white border border-[#3a3a3a]">
                <div className="flex space-x-2">
                  <div
                    className="w-2 h-2 rounded-full bg-[#00D2FF] animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-[#7c57ff] animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-[#aaf163] animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-[#3a3a3a]">
        <div className="flex items-center bg-[#2a2a2a] rounded-xl px-4 py-3 border border-[#3a3a3a] focus-within:border-[#7c57ff] transition-all duration-300">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tell me about yourself..."
            className="flex-1 bg-transparent text-white outline-none"
          />
          <motion.button
            onClick={handleSendMessage}
            whileTap={{ scale: 0.9 }}
            className="ml-2 text-[#aaf163] p-2 rounded-full hover:bg-[#3a3a3a] transition-colors"
          >
            <Send size={20} />
          </motion.button>
        </div>
      </div>
    </div>
  )
}

