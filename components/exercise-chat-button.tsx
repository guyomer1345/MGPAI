"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, Send, Loader2, Maximize2, Minimize2 } from "lucide-react"
import Image from "next/image"

interface ExerciseChatButtonProps {
  exerciseId: string
  exerciseName: string
}

export default function ExerciseChatButton({ exerciseId, exerciseName }: ExerciseChatButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<
    {
      role: "user" | "assistant"
      content: string
      timestamp: Date
      includeVideo?: boolean
      includeModification?: boolean
      includeAlternatives?: boolean
    }[]
  >([])
  const [isLoading, setIsLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const startY = useRef<number | null>(null)
  const currentY = useRef<number | null>(null)
  const isDragging = useRef(false)

  // Handle touch events for swipe-to-dismiss
  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY.current === null) return
    currentY.current = e.touches[0].clientY
    const deltaY = currentY.current - startY.current

    if (deltaY > 10) {
      isDragging.current = true
      // Apply transform to follow finger, but only downward
      if (chatContainerRef.current && deltaY > 0) {
        chatContainerRef.current.style.transform = `translateY(${deltaY}px)`
        chatContainerRef.current.style.opacity = `${1 - deltaY / 400}`
      }
    }
  }

  const handleTouchEnd = () => {
    if (isDragging.current && currentY.current && startY.current) {
      const deltaY = currentY.current - startY.current

      if (deltaY > 100) {
        // If dragged down more than 100px, close the chat
        setIsOpen(false)
      } else {
        // Otherwise, animate back to original position
        if (chatContainerRef.current) {
          chatContainerRef.current.style.transform = "translateY(0)"
          chatContainerRef.current.style.opacity = "1"
        }
      }
    }

    startY.current = null
    currentY.current = null
    isDragging.current = false
  }

  // Reset styles when closing
  useEffect(() => {
    if (!isOpen && chatContainerRef.current) {
      chatContainerRef.current.style.transform = "translateY(0)"
      chatContainerRef.current.style.opacity = "1"
    }
  }, [isOpen])

  const handleSendMessage = async () => {
    if (!message.trim() && !isLoading) return

    // Store the current message before clearing it
    const currentMessage = message.trim()

    // Add user message
    const userMessage = {
      role: "user" as const,
      content: currentMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setMessage("")
    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      // Generate contextual response based on exercise
      let response = ""
      let includeVideo = false
      let includeModification = false
      let includeAlternatives = false

      const msgLower = currentMessage.toLowerCase()

      if (
        msgLower.includes("form") ||
        msgLower.includes("how to") ||
        msgLower.includes("correctly") ||
        msgLower.includes("proper")
      ) {
        response = `For proper ${exerciseName} form:

1. ${getRandomFormTip(exerciseName)}
2. ${getRandomFormTip(exerciseName)}
3. ${getRandomFormTip(exerciseName)}

Would you like me to show you a quick demonstration?`
        includeVideo = true
      } else if (
        msgLower.includes("alternative") ||
        msgLower.includes("substitute") ||
        msgLower.includes("different")
      ) {
        response = `Here are some alternatives to ${exerciseName} you could try:

1. ${getRandomAlternative(exerciseName)}
2. ${getRandomAlternative(exerciseName)}
3. ${getRandomAlternative(exerciseName)}

Would you like details on any of these?`
        includeAlternatives = true
      } else if (msgLower.includes("pain") || msgLower.includes("hurt") || msgLower.includes("uncomfortable")) {
        response = `I'm sorry to hear you're experiencing discomfort with ${exerciseName}. This could be due to:

• Improper form
• Too much weight
• A pre-existing condition
• Fatigue

Would you like to try a modified version that might be gentler?`
        includeModification = true
      } else if (msgLower.includes("muscle") || msgLower.includes("target") || msgLower.includes("feel")) {
        response = `${exerciseName} primarily targets:

• ${getPrimaryMuscle(exerciseName)}
• ${getSecondaryMuscle(exerciseName)}

To maximize engagement, focus on ${getRandomTechniqueTip(exerciseName)} and ensure you feel tension in these areas throughout the movement.`
      } else if (
        msgLower.includes("modify") ||
        msgLower.includes("change") ||
        msgLower.includes("adjust") ||
        msgLower.includes("easier") ||
        msgLower.includes("harder")
      ) {
        response = `You can modify ${exerciseName} in several ways:

To make it easier:
• ${getEasierModification(exerciseName)}
• Reduce the weight

To make it harder:
• ${getHarderModification(exerciseName)}
• Increase the weight or reps

Would you like me to update your workout plan with one of these modifications?`
        includeModification = true
      } else {
        response = `I see you're working on ${exerciseName}. How can I help you with this exercise? You can ask about:

• Proper form and technique
• Muscle targeting
• Modifications or alternatives
• Common mistakes to avoid`
      }

      // Add assistant response
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response,
          timestamp: new Date(),
          includeVideo,
          includeModification,
          includeAlternatives,
        },
      ])

      setIsLoading(false)
    }, 1000)
  }

  // Helper functions for generating contextual responses
  const getRandomFormTip = (exercise: string) => {
    const tips = [
      `Keep your back straight and core engaged throughout the movement`,
      `Focus on controlled movements rather than using momentum`,
      `Maintain proper breathing - exhale during exertion, inhale during release`,
      `Ensure proper joint alignment to prevent strain`,
      `Focus on the mind-muscle connection with the target muscles`,
    ]
    return tips[Math.floor(Math.random() * tips.length)]
  }

  const getRandomAlternative = (exercise: string) => {
    // Exercise-specific alternatives
    if (exercise.toLowerCase().includes("row")) {
      const alternatives = ["Dumbbell Row", "Cable Row", "Inverted Row", "Bent Over Row"]
      return alternatives[Math.floor(Math.random() * alternatives.length)]
    } else if (exercise.toLowerCase().includes("pull")) {
      const alternatives = ["Pull-Ups", "Chin-Ups", "Band Pull-Downs", "Single-Arm Pulldown"]
      return alternatives[Math.floor(Math.random() * alternatives.length)]
    } else if (exercise.toLowerCase().includes("curl") || exercise.toLowerCase().includes("hammer")) {
      const alternatives = ["Barbell Curl", "Concentration Curl", "Preacher Curl", "Cable Curl"]
      return alternatives[Math.floor(Math.random() * alternatives.length)]
    } else {
      const alternatives = ["Resistance Band Version", "Machine Alternative", "Dumbbell Variation", "Bodyweight Option"]
      return alternatives[Math.floor(Math.random() * alternatives.length)]
    }
  }

  const getPrimaryMuscle = (exercise: string) => {
    if (exercise.toLowerCase().includes("row")) {
      return "Latissimus Dorsi (Lats)"
    } else if (exercise.toLowerCase().includes("pull")) {
      return "Latissimus Dorsi (Lats)"
    } else if (exercise.toLowerCase().includes("curl") || exercise.toLowerCase().includes("hammer")) {
      return "Biceps Brachii"
    } else {
      return "Primary muscle group"
    }
  }

  const getSecondaryMuscle = (exercise: string) => {
    if (exercise.toLowerCase().includes("row")) {
      return "Rhomboids and Trapezius"
    } else if (exercise.toLowerCase().includes("pull")) {
      return "Biceps and Rear Deltoids"
    } else if (exercise.toLowerCase().includes("curl") || exercise.toLowerCase().includes("hammer")) {
      return "Brachialis and Brachioradialis"
    } else {
      return "Secondary muscle group"
    }
  }

  const getRandomTechniqueTip = (exercise: string) => {
    const tips = [
      `squeezing at the peak of contraction`,
      `maintaining tension throughout the full range of motion`,
      `slowing down the eccentric (lowering) phase`,
      `focusing on proper alignment`,
      `eliminating momentum and using strict form`,
    ]
    return tips[Math.floor(Math.random() * tips.length)]
  }

  const getEasierModification = (exercise: string) => {
    const mods = [
      `Use a machine version for more stability`,
      `Reduce the range of motion`,
      `Use an assisted version`,
      `Try the seated variation`,
      `Use a resistance band for variable resistance`,
    ]
    return mods[Math.floor(Math.random() * mods.length)]
  }

  const getHarderModification = (exercise: string) => {
    const mods = [
      `Add a pause at the peak of contraction`,
      `Slow down the tempo (especially the eccentric phase)`,
      `Increase the range of motion`,
      `Add a drop set at the end`,
      `Try the unilateral (single-arm/leg) version`,
    ]
    return mods[Math.floor(Math.random() * mods.length)]
  }

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <>
      {/* Chat Button - Positioned next to exercise */}
      <button
        onClick={() => setIsOpen(true)}
        className="exercise-chat-main-button w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-110 transition-all duration-300"
      >
        <Image src="/images/exercise-chat-icon.png" alt="Exercise Chat" width={20} height={20} className="w-5 h-5" />
      </button>

      {/* Floating Chat Interface */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none"
          onClick={(e) => {
            // Close when clicking outside the chat container
            if ((e.target as HTMLElement).classList.contains("backdrop-blur-sm")) {
              setIsOpen(false)
            }
          }}
        >
          {/* Semi-transparent backdrop */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-auto"></div>

          {/* Floating chat container */}
          <div
            ref={chatContainerRef}
            className={`w-full max-w-md bg-[#1a1a1a] rounded-t-2xl shadow-2xl border border-[#3f3f3f] overflow-hidden pointer-events-auto transition-all duration-300 ease-out animate-slide-up ${isExpanded ? "h-[85vh]" : "h-[50vh]"}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              willChange: "transform, opacity",
              transformOrigin: "bottom center",
            }}
          >
            {/* Drag handle */}
            <div className="w-full h-6 flex justify-center items-center cursor-grab">
              <div className="w-12 h-1 bg-gray-500 rounded-full"></div>
            </div>

            {/* Chat Header */}
            <div className="bg-gradient-to-r from-[#7c57ff] to-[#00c6ff] p-3 flex items-center justify-between">
              <div className="flex items-center">
                <Image
                  src="/images/exercise-chat-icon.png"
                  alt="Exercise Chat"
                  width={20}
                  height={20}
                  className="w-5 h-5 mr-2"
                />
                <h3 className="text-white font-bold">{exerciseName} Assistant</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  {isExpanded ? (
                    <Minimize2 className="w-4 h-4 text-white" />
                  ) : (
                    <Maximize2 className="w-4 h-4 text-white" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div
              className={`overflow-y-auto p-4 space-y-3 ${isExpanded ? "h-[calc(85vh-120px)]" : "h-[calc(50vh-120px)]"}`}
            >
              {/* Welcome Message */}
              {messages.length === 0 && (
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-2 shadow-md">
                    <Image
                      src="/images/exercise-chat-icon.png"
                      alt="Assistant"
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                  </div>
                  <div className="bg-[#2a2a2a] rounded-2xl rounded-tl-none p-3 max-w-[80%]">
                    <p className="text-white text-sm">
                      How can I help you with the {exerciseName} exercise? Ask me about proper form, alternatives, or
                      how to make it more effective.
                    </p>
                    <div className="text-[10px] mt-1 text-gray-400">{formatTime(new Date())}</div>
                  </div>
                </div>
              )}

              {/* Quick Suggestion Buttons */}
              {messages.length === 0 && (
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <button
                    onClick={() => {
                      setMessage("How do I perform this exercise correctly?")
                      handleSendMessage()
                    }}
                    className="bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white text-xs rounded-lg p-2 transition-colors text-left"
                  >
                    How do I perform this correctly?
                  </button>
                  <button
                    onClick={() => {
                      setMessage("Can I modify this exercise?")
                      handleSendMessage()
                    }}
                    className="bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white text-xs rounded-lg p-2 transition-colors text-left"
                  >
                    Can I modify this exercise?
                  </button>
                  <button
                    onClick={() => {
                      setMessage("This exercise causes pain")
                      handleSendMessage()
                    }}
                    className="bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white text-xs rounded-lg p-2 transition-colors text-left"
                  >
                    This exercise causes pain
                  </button>
                  <button
                    onClick={() => {
                      setMessage("Show me alternative exercises")
                      handleSendMessage()
                    }}
                    className="bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white text-xs rounded-lg p-2 transition-colors text-left"
                  >
                    Show me alternatives
                  </button>
                </div>
              )}

              {/* Conversation Messages */}
              {messages.map((msg, index) => (
                <div key={index} className={`flex items-start ${msg.role === "user" ? "justify-end" : ""}`}>
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-2 shadow-md">
                      <Image
                        src="/images/exercise-chat-icon.png"
                        alt="Assistant"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                    </div>
                  )}

                  <div
                    className={`rounded-2xl p-3 max-w-[80%] shadow-sm ${
                      msg.role === "user"
                        ? "bg-[#7c57ff] text-white rounded-tr-none"
                        : "bg-[#2a2a2a] text-white rounded-tl-none"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{msg.content}</p>

                    {/* Interactive elements based on message type */}
                    {msg.role === "assistant" && msg.includeVideo && (
                      <button
                        className="mt-2 bg-[#7c57ff] text-white text-xs rounded-lg px-3 py-1.5 hover:bg-[#6645e0] transition-colors"
                        onClick={() => {
                          setMessage("Yes, show me a demonstration")
                          handleSendMessage()
                        }}
                      >
                        Show demonstration
                      </button>
                    )}

                    {msg.role === "assistant" && msg.includeModification && (
                      <button
                        className="mt-2 bg-[#7c57ff] text-white text-xs rounded-lg px-3 py-1.5 hover:bg-[#6645e0] transition-colors"
                        onClick={() => {
                          setMessage("Yes, update my workout plan")
                          handleSendMessage()
                        }}
                      >
                        Update workout plan
                      </button>
                    )}

                    {msg.role === "assistant" && msg.includeAlternatives && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        <button
                          className="bg-[#7c57ff] text-white text-xs rounded-lg px-2 py-1 hover:bg-[#6645e0] transition-colors"
                          onClick={() => {
                            setMessage("Show me the first alternative")
                            handleSendMessage()
                          }}
                        >
                          Option 1
                        </button>
                        <button
                          className="bg-[#7c57ff] text-white text-xs rounded-lg px-2 py-1 hover:bg-[#6645e0] transition-colors"
                          onClick={() => {
                            setMessage("Show me the second alternative")
                            handleSendMessage()
                          }}
                        >
                          Option 2
                        </button>
                        <button
                          className="bg-[#7c57ff] text-white text-xs rounded-lg px-2 py-1 hover:bg-[#6645e0] transition-colors"
                          onClick={() => {
                            setMessage("Show me the third alternative")
                            handleSendMessage()
                          }}
                        >
                          Option 3
                        </button>
                      </div>
                    )}

                    <div
                      className={`text-[10px] mt-1 ${
                        msg.role === "user" ? "text-white/70 text-right" : "text-gray-400"
                      }`}
                    >
                      {formatTime(msg.timestamp)}
                    </div>
                  </div>

                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-[#3f3f3f] flex items-center justify-center ml-2 shadow-md">
                      <span className="text-white text-xs font-bold">U</span>
                    </div>
                  )}
                </div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-2">
                    <Image
                      src="/images/exercise-chat-icon.png"
                      alt="Assistant"
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                  </div>
                  <div className="bg-[#2a2a2a] rounded-2xl rounded-tl-none p-3 max-w-[80%]">
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
            </div>

            {/* Chat Input */}
            <div className="p-3 border-t border-[#3f3f3f] bg-[#1a1a1a]">
              <div className="flex items-center">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSendMessage()}
                  placeholder="Ask about this exercise..."
                  disabled={isLoading}
                  className="flex-1 bg-[#2a2a2a] text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7c57ff] transition-all duration-300 disabled:opacity-70"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isLoading}
                  className={`ml-2 w-10 h-10 rounded-full ${
                    !message.trim() || isLoading ? "bg-[#3f3f3f]" : "bg-[#7c57ff]"
                  } flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_10px_rgba(124,87,255,0.6)] active:scale-95 disabled:hover:scale-100 disabled:hover:shadow-none`}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                  ) : (
                    <Send className={`w-5 h-5 ${!message.trim() ? "text-gray-500" : "text-white"}`} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
