"use client"

import type React from "react"
import Image from "next/image"

import MobileHeader from "@/components/mobile-header"
import { Send, Loader2 } from "lucide-react"
import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { type AssistantAPI, type AssistantMessage, getAssistantAPI } from "@/lib/api/assistant"

export default function ChatPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      role: "assistant",
      content: "Hello! How can I help you with your fitness journey today?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [assistantApi, setAssistantApi] = useState<AssistantAPI | null>(null)
  const [apiError, setApiError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [pendingAction, setPendingAction] = useState<{
    type: "reschedule"
    workoutId: string
  } | null>(null)

  // Initialize the assistant API
  useEffect(() => {
    const initializeAssistant = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY

        if (!apiKey) {
          setApiError("OpenAI API key is missing. Please check your environment variables.")
          return
        }

        const api = getAssistantAPI(apiKey)

        // Set a mock user profile for demonstration
        api.setUserProfile({
          name: "Ido Mena",
          age: 32,
          weight: 78,
          height: 180,
          fitnessLevel: "intermediate",
          fitnessGoals: ["muscle gain", "strength improvement"],
          preferredWorkoutDays: [1, 3, 5], // Monday, Wednesday, Friday
          workoutDuration: 60,
        })

        setAssistantApi(api)

        // Load conversation history if available
        const history = api.getConversationHistory()
        if (history.length > 0) {
          setMessages(history)
        }
      } catch (error) {
        console.error("Failed to initialize assistant API:", error)

        let errorMessage = "Failed to initialize the assistant. Please check your API key and try again."

        // Check if it's a quota exceeded error
        if (
          error instanceof Error &&
          (error.message.includes("quota") ||
            error.message.includes("billing") ||
            error.message.includes("QUOTA_EXCEEDED"))
        ) {
          errorMessage =
            "The OpenAI API quota has been exceeded. The assistant will operate in fallback mode with limited functionality. To fix this, the account owner needs to check their OpenAI billing settings."
        }

        setApiError(errorMessage)
      }
    }

    initializeAssistant()
  }, [])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleRescheduleWorkout = useCallback(
    (workoutId: string, newDate: Date) => {
      if (!assistantApi) return

      try {
        const success = assistantApi.rescheduleWorkout(workoutId, newDate)

        if (success) {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: `I've rescheduled your workout to ${newDate.toLocaleDateString()}.`,
              timestamp: new Date(),
            },
          ])
        } else {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content:
                "I'm sorry, I couldn't reschedule your workout. Please try again or contact support if the issue persists.",
              timestamp: new Date(),
            },
          ])
        }
      } catch (error) {
        console.error("Error rescheduling workout:", error)
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "I encountered an error while trying to reschedule your workout. Please try again later.",
            timestamp: new Date(),
          },
        ])
      } finally {
        setPendingAction(null)
      }
    },
    [assistantApi, setMessages],
  )

  // Handle sending a message
  const handleSendMessage = async () => {
    if (inputValue.trim() === "" || !assistantApi) return

    // Check if this is a response to a pending action
    if (pendingAction && pendingAction.type === "reschedule") {
      // Try to parse a date from the user input
      try {
        const dateInput = inputValue.trim()
        let newDate: Date

        // Handle relative dates
        if (dateInput.toLowerCase().includes("tomorrow")) {
          newDate = new Date()
          newDate.setDate(newDate.getDate() + 1)
        } else if (dateInput.toLowerCase().includes("next")) {
          newDate = new Date()
          if (dateInput.toLowerCase().includes("monday"))
            newDate.setDate(newDate.getDate() + ((8 - newDate.getDay()) % 7))
          else if (dateInput.toLowerCase().includes("tuesday"))
            newDate.setDate(newDate.getDate() + ((9 - newDate.getDay()) % 7))
          else if (dateInput.toLowerCase().includes("wednesday"))
            newDate.setDate(newDate.getDate() + ((10 - newDate.getDay()) % 7))
          else if (dateInput.toLowerCase().includes("thursday"))
            newDate.setDate(newDate.getDate() + ((11 - newDate.getDay()) % 7))
          else if (dateInput.toLowerCase().includes("friday"))
            newDate.setDate(newDate.getDate() + ((12 - newDate.getDay()) % 7))
          else if (dateInput.toLowerCase().includes("saturday"))
            newDate.setDate(newDate.getDate() + ((13 - newDate.getDay()) % 7))
          else if (dateInput.toLowerCase().includes("sunday"))
            newDate.setDate(newDate.getDate() + ((14 - newDate.getDay()) % 7))
          else newDate = new Date(dateInput)
        } else {
          // Try to parse as a date string
          newDate = new Date(dateInput)
        }

        // Add user message to UI immediately
        const userMessage: AssistantMessage = {
          role: "user",
          content: inputValue,
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMessage])
        setInputValue("")

        // Check if date is valid
        if (isNaN(newDate.getTime())) {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content:
                "I couldn't understand that date. Please try again with a format like 'tomorrow', 'next Monday', or 'January 20, 2025'.",
              timestamp: new Date(),
            },
          ])
          return
        }

        // Handle the rescheduling
        handleRescheduleWorkout(pendingAction.workoutId, newDate)
        return
      } catch (error) {
        console.error("Error parsing date:", error)
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I couldn't understand that date. Please try again with a format like 'tomorrow', 'next Monday', or 'January 20, 2025'.",
            timestamp: new Date(),
          },
        ])
        setInputValue("")
        return
      }
    }

    // Regular message handling
    // Add user message to UI immediately
    const userMessage: AssistantMessage = {
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    try {
      // Send message to API and get response
      const response = await assistantApi.sendMessage(inputValue)

      // Check if response indicates a pending action
      if (response.content.includes("Would you like to reschedule it for another day?")) {
        // Extract workout ID from conversation context
        const todayWorkout = assistantApi.getTodayWorkout()
        const tomorrowDate = new Date()
        tomorrowDate.setDate(tomorrowDate.getDate() + 1)
        const tomorrowWorkout = assistantApi.getWorkoutForDate(tomorrowDate)

        // Determine which workout was canceled
        const workoutId = response.content.includes("today") ? todayWorkout?.id || "" : tomorrowWorkout?.id || ""

        if (workoutId) {
          setPendingAction({
            type: "reschedule",
            workoutId,
          })
        }
      } else {
        // Reset pending action if response doesn't continue the flow
        setPendingAction(null)
      }

      // Update messages with API response
      setMessages((prev) => [...prev, response])
    } catch (error) {
      console.error("Error sending message:", error)

      let errorMessage = "I'm sorry, I encountered an error processing your request. Please try again."

      // Check if it's a quota exceeded error
      if (
        error instanceof Error &&
        (error.message.includes("quota") ||
          error.message.includes("billing") ||
          error.message.includes("QUOTA_EXCEEDED"))
      ) {
        errorMessage =
          "I'm operating in fallback mode because the OpenAI API quota has been exceeded. " +
          "You'll receive pre-programmed responses instead of AI-generated ones. " +
          "To fix this, the account owner needs to check their OpenAI billing settings."
      }

      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorMessage,
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Handle back navigation
  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault()

    // Let the navigation bar handle the transition
    setTimeout(() => {
      router.push("/assistant")
    }, 50)
  }

  return (
    <main className="pb-20">
      <MobileHeader
        showProfile={false}
        showBack={true}
        title="AI Assistant"
        backLink="/assistant"
        onBackClick={handleBackClick}
      />

      <div className="mt-6 h-[calc(100vh-200px)] flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 pb-4 px-1">
          {/* Welcome animation - only shown initially */}
          <div className="flex justify-center mb-6 opacity-0 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mr-4 shadow-lg animate-pulse-slow">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rh5qvaCNAYDjtI6smSUn31uEyeTtx1.png"
                alt="Assistant"
                width={40}
                height={40}
                className="w-10 h-10"
              />
            </div>
          </div>

          {/* API Error Message */}
          {apiError && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-center mb-4">
              <h3 className="text-red-500 font-medium mb-2">Connection Error</h3>
              <p className="text-white/80 text-sm mb-3">{apiError}</p>
              <p className="text-white/60 text-xs mb-3">
                Make sure your NEXT_PUBLIC_OPENAI_API_KEY environment variable is set correctly in your Vercel project
                settings.
              </p>
              <button
                className="mt-1 text-white bg-red-500/20 hover:bg-red-500/30 px-4 py-2 rounded-md text-sm"
                onClick={() => window.location.reload()}
              >
                Retry Connection
              </button>
            </div>
          )}
          {/* Quota Warning Banner */}
          {apiError && apiError.includes("quota") && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-center mb-4">
              <h3 className="text-yellow-500 font-medium mb-2">API Quota Exceeded</h3>
              <p className="text-white/80 text-sm mb-3">
                The OpenAI API quota has been exceeded. The assistant will operate in fallback mode with pre-programmed
                responses.
              </p>
              <p className="text-white/60 text-xs mb-3">
                To restore full functionality, the account owner needs to check their OpenAI billing settings at{" "}
                <a
                  href="https://platform.openai.com/account/billing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  platform.openai.com/account/billing
                </a>
              </p>
            </div>
          )}

          {/* Messages */}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start ${message.role === "user" ? "justify-end" : ""} animate-slide-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-2 shadow-md">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rh5qvaCNAYDjtI6smSUn31uEyeTtx1.png"
                    alt="Assistant"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </div>
              )}

              <div
                className={`rounded-2xl p-3 max-w-[80%] shadow-sm ${
                  message.role === "user"
                    ? "bg-[#7c57ff] text-white rounded-tr-none"
                    : "bg-[#3f3f3f] text-white rounded-tl-none"
                }`}
              >
                <p className="whitespace-pre-line">{message.content}</p>
                <div
                  className={`text-[10px] mt-1 ${message.role === "user" ? "text-white/70 text-right" : "text-gray-400"}`}
                >
                  {message.timestamp ? formatTime(message.timestamp) : formatTime(new Date())}
                </div>
              </div>

              {message.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-[#3f3f3f] flex items-center justify-center ml-2 shadow-md">
                  <span className="text-white text-xs font-bold">U</span>
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-start animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-2">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rh5qvaCNAYDjtI6smSUn31uEyeTtx1.png"
                  alt="Assistant"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
              </div>
              <div className="bg-[#3f3f3f] rounded-2xl rounded-tl-none p-3 max-w-[80%]">
                <div className="flex space-x-1">
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="mt-4 border-t border-[#3f3f3f] pt-4 px-1">
          <div className="flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !isTyping && handleSendMessage()}
              placeholder="Type your message..."
              disabled={isTyping || !assistantApi}
              className="flex-1 bg-[#3f3f3f] text-white rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7c57ff] transition-all duration-300 disabled:opacity-70"
            />
            <button
              onClick={handleSendMessage}
              disabled={inputValue.trim() === "" || isTyping || !assistantApi}
              className={`ml-2 w-12 h-12 rounded-full ${
                inputValue.trim() === "" || isTyping || !assistantApi ? "bg-[#3f3f3f]" : "bg-[#7c57ff]"
              } flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_10px_rgba(124,87,255,0.6)] active:scale-95 disabled:hover:scale-100 disabled:hover:shadow-none`}
            >
              {isTyping ? (
                <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
              ) : (
                <Send
                  className={`w-5 h-5 ${inputValue.trim() === "" || !assistantApi ? "text-gray-500" : "text-white"}`}
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
