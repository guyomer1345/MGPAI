"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface AssistantIconProps {
  className?: string
  animate?: boolean
}

export default function AssistantIcon({ className = "", animate = true }: AssistantIconProps) {
  if (animate) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className={`relative ${className}`}
      >
        <motion.div
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 5,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/images/assistant-icon.png"
            alt="Personal Assistant"
            width={80}
            height={80}
            className="w-auto h-auto"
          />
        </motion.div>

        {/* Add subtle glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7c57ff33] to-[#00D2FF33] blur-xl -z-10"
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 3,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    )
  }

  return (
    <div className={className}>
      <Image
        src="/images/assistant-icon.png"
        alt="Personal Assistant"
        width={80}
        height={80}
        className="w-auto h-auto"
      />
    </div>
  )
}

