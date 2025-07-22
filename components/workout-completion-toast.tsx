"use client"

import type React from "react"
import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trophy } from "lucide-react"

interface WorkoutCompletionToastProps {
  isOpen: boolean
  onClose: () => void
}

const WorkoutCompletionToast: React.FC<WorkoutCompletionToastProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-32 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-50"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 400, duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-[#aaf163]/80 to-[#7c57ff]/80 rounded-xl p-4 shadow-2xl border border-white/20 backdrop-blur-sm">
            <div className="flex items-start space-x-4">
              <Trophy className="h-6 w-6 shrink-0 text-white" />
              <div>
                <p className="text-white font-medium">Workout Complete!</p>
                <p className="text-white/80 text-sm">You've crushed 50 workouts! Keep the momentum going!</p>
              </div>
              {/* <button onClick={onClose} className="ml-auto text-white hover:text-white/80">
                <XMarkIcon className="h-5 w-5" />
              </button> */}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default WorkoutCompletionToast
