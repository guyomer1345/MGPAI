"use client"

import React from "react"

import { useState, useEffect } from "react"
import { CheckCircle, Zap, Trophy, DumbbellIcon, ClockIcon, ActivityIcon, UsersIcon } from "lucide-react"
import { motion } from "framer-motion"
import { useIsMobile } from "@/hooks/use-mobile"

interface WorkoutCircleProps {
  day: number
  status: "check" | "current" | "upcoming"
  name: string
  color: string
  icon: any
  isReward?: boolean
  onClick: () => void
  position: { top: string; left: string }
  isLeft?: boolean
}

export default function WorkoutCircle({
  day,
  status,
  name,
  color,
  icon: Icon,
  isReward = false,
  onClick,
  position,
  isLeft = false,
}: WorkoutCircleProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [animateIcon, setAnimateIcon] = useState(false)
  const isMobile = useIsMobile()

  const isCompleted = status === "check"
  const isCurrent = status === "current"

  // Get the first letter or abbreviation of the workout name
  const getAbbreviation = (name: string) => {
    // For compound names like "Back + Front hand", use initials
    if (name.includes("+")) {
      return name
        .split("+")
        .map((part) => part.trim()[0])
        .join("")
    }

    // For "Chest Day", "Leg Day", etc., just use the first letter
    const words = name.split(" ")
    if (words[0] === "Full") return "FB" // Full Body
    return words[0][0]
  }

  const abbreviation = getAbbreviation(name)

  // Determine workout type
  const workoutType = () => {
    const lowerName = name.toLowerCase()
    if (lowerName.includes("chest") || lowerName.includes("arm") || lowerName.includes("shoulder")) {
      return "upper"
    } else if (lowerName.includes("leg")) {
      return "leg"
    } else if (lowerName.includes("back")) {
      return "back"
    } else if (lowerName.includes("rest")) {
      return "rest"
    } else if (lowerName.includes("full")) {
      return "full"
    }
    return "default"
  }

  // Get animation variants based on workout type
  const getAnimationVariants = () => {
    const type = workoutType()

    switch (type) {
      case "upper":
        return {
          animate: {
            rotate: [0, 15, 0, -15, 0],
            transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" },
          },
        }
      case "leg":
        return {
          animate: {
            y: [0, -5, 0],
            transition: { duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" },
          },
        }
      case "back":
        return {
          animate: {
            x: [0, 5, 0, -5, 0],
            transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" },
          },
        }
      case "rest":
        return {
          animate: {
            rotate: [0, 360],
            transition: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          },
        }
      case "full":
        return {
          animate: {
            scale: [1, 1.2, 1],
            filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"],
            transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" },
          },
        }
      default:
        return {
          animate: {
            opacity: [0.6, 1, 0.6],
            transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" },
          },
        }
    }
  }

  // Get the appropriate icon based on workout type
  const getWorkoutTypeIcon = () => {
    const type = workoutType()

    switch (type) {
      case "upper":
        return <DumbbellIcon className="w-8 h-8 text-white" />
      case "leg":
        return <ActivityIcon className="w-8 h-8 text-white" />
      case "back":
        return <ActivityIcon className="w-8 h-8 text-white" />
      case "rest":
        return <ClockIcon className="w-8 h-8 text-white" />
      case "full":
        return <UsersIcon className="w-8 h-8 text-white" />
      default:
        return <Icon className="w-8 h-8 text-white" />
    }
  }

  // Animation variants for the icon
  const iconAnimationVariants = getAnimationVariants()

  // Get the icon for this workout
  const typeIcon = getWorkoutTypeIcon()

  // Trigger animation on hover or for current day
  useEffect(() => {
    if (isCurrent) {
      setAnimateIcon(true)
    }
  }, [isCurrent])

  return (
    <div
      className="absolute"
      style={{
        top: position.top,
        left: position.left,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="relative">
        {/* Modern circle with clean outline and shadow */}
        <motion.div
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 relative cursor-pointer
            ${
              isReward
                ? "hover:shadow-[0_0_15px_rgba(255,215,0,0.5)]"
                : isCurrent
                  ? "hover:shadow-[0_0_15px_rgba(124,87,255,0.5)]"
                  : isCompleted
                    ? "hover:shadow-[0_0_15px_rgba(96,165,250,0.5)]"
                    : "hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            }`}
          style={{
            background: isReward
              ? "radial-gradient(circle at 30% 30%, #ffd700, #ff9d00)"
              : isCurrent
                ? "linear-gradient(135deg, #7c57ff, #00c6ff)"
                : isCompleted
                  ? "linear-gradient(135deg, #60a5fa, #3b82f6)"
                  : "linear-gradient(135deg, #3f3f3f, #2a2a2a)",
            border: isReward ? "2px solid rgba(255, 215, 0, 0.6)" : "2px solid rgba(255, 255, 255, 0.1)",
            boxShadow: isReward
              ? "0 4px 12px rgba(255, 215, 0, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.3)"
              : isCurrent
                ? "0 4px 15px rgba(124, 87, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)"
                : isCompleted
                  ? "0 4px 15px rgba(96, 165, 250, 0.2), 0 1px 2px rgba(0, 0, 0, 0.2)"
                  : "0 4px 10px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)",
          }}
          onClick={onClick}
          onMouseEnter={() => {
            setShowTooltip(true)
            setAnimateIcon(true)
          }}
          onMouseLeave={() => {
            setShowTooltip(false)
            if (!isCurrent) setAnimateIcon(false)
          }}
          animate={
            isCurrent && !isCompleted
              ? {
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 4px 10px rgba(0,0,0,0.2)",
                    "0 8px 20px rgba(124,87,255,0.4)",
                    "0 4px 10px rgba(0,0,0,0.2)",
                  ],
                  y: [0, -3, 0],
                }
              : {}
          }
          transition={{
            duration: 2,
            repeat: isCurrent && !isCompleted ? Number.POSITIVE_INFINITY : 0,
            repeatType: "loop",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Workout type icon with type-specific animation */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center opacity-20"
            initial={{ opacity: 0.2 }}
            animate={animateIcon ? iconAnimationVariants.animate : { opacity: 0.2 }}
          >
            {typeIcon}
          </motion.div>

          {/* Day number */}
          <span className={`font-bold text-xl relative z-10 ${isReward ? "text-black" : "text-white"}`}>{day}</span>
        </motion.div>

        {/* Tooltip for full workout name */}
        {showTooltip && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-20 whitespace-nowrap">
            <div
              className={`px-3 py-1.5 rounded-lg shadow-lg backdrop-blur-sm ${
                isReward
                  ? "bg-[#ffeb3b]/10 text-[#ffeb3b] border border-[#ffeb3b]/20"
                  : isCurrent
                    ? "bg-[#7c57ff]/10 text-[#aaf163] border border-[#7c57ff]/20"
                    : isCompleted
                      ? "bg-[#60a5fa]/10 text-white border border-[#60a5fa]/20"
                      : "bg-[#3f3f3f]/30 text-gray-300 border border-[#3f3f3f]/20"
              }`}
            >
              <div className="flex items-center space-x-1.5">
                {typeIcon && (
                  <div className="w-3.5 h-3.5">{React.cloneElement(typeIcon, { className: "w-3.5 h-3.5" })}</div>
                )}
                <span className="text-xs font-medium">{name}</span>
              </div>
            </div>
            {/* Tooltip arrow */}
            <div
              className="w-2 h-2 rotate-45 absolute -top-1 left-1/2 -translate-x-1/2"
              style={{
                backgroundColor: isReward
                  ? "rgba(255, 235, 59, 0.1)"
                  : isCurrent
                    ? "rgba(124, 87, 255, 0.1)"
                    : isCompleted
                      ? "rgba(96, 165, 250, 0.1)"
                      : "rgba(63, 63, 63, 0.3)",
                borderTop: isReward
                  ? "1px solid rgba(255, 235, 59, 0.2)"
                  : isCurrent
                    ? "1px solid rgba(124, 87, 255, 0.2)"
                    : isCompleted
                      ? "1px solid rgba(96, 165, 250, 0.2)"
                      : "1px solid rgba(63, 63, 63, 0.2)",
                borderLeft: isReward
                  ? "1px solid rgba(255, 235, 59, 0.2)"
                  : isCurrent
                    ? "1px solid rgba(124, 87, 255, 0.2)"
                    : isCompleted
                      ? "1px solid rgba(96, 165, 250, 0.2)"
                      : "1px solid rgba(63, 63, 63, 0.2)",
              }}
            />
          </div>
        )}

        {/* Status indicator with clean design */}
        <div className="absolute -bottom-1 -right-1">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center border border-background`}
            style={{
              background: isReward
                ? "radial-gradient(circle at 30% 30%, #ffd700, #ff9d00)"
                : isCurrent
                  ? "linear-gradient(135deg, #7c57ff, #00c6ff)"
                  : isCompleted
                    ? "linear-gradient(135deg, #60a5fa, #3b82f6)"
                    : "linear-gradient(135deg, #3f3f3f, #2a2a2a)",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            }}
          >
            {isReward ? (
              <Trophy className="w-4 h-4 text-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]" />
            ) : isCompleted ? (
              <CheckCircle className="w-4 h-4 text-white" />
            ) : isCurrent ? (
              <Zap className="w-4 h-4 text-white" />
            ) : (
              <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
            )}
          </div>
        </div>
      </div>

      {isCurrent && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#aaf163] text-[#1e1e1e] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
          TODAY
        </div>
      )}
    </div>
  )
}
