"use client"

import { useState, useRef, useEffect } from "react"
import { X, Clock, Dumbbell, Calendar, ChevronRight, Target, BarChart2, Play, Edit, List } from "lucide-react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import MuscleGroupVisualizer from "./muscle-group-visualizer"

interface WorkoutDayModalProps {
  isOpen: boolean
  onClose: () => void
  workout: {
    id: string
    name: string
    date: string
    exercises: number
    duration: string
    difficulty: "Easy" | "Medium" | "Hard"
    muscleGroups: Array<{
      name: string
      percentage: number
      color: string
    }>
  }
}

export default function WorkoutDayModal({ isOpen, onClose, workout }: WorkoutDayModalProps) {
  const [showDetails, setShowDetails] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const [animateButton, setAnimateButton] = useState(false)
  const isToday = workout.id === "workout-16"

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      // Start button animation after modal opens
      const timer = setTimeout(() => setAnimateButton(true), 500)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
        clearTimeout(timer)
      }
    }
    return () => {}
  }, [isOpen, onClose])

  // Handle escape key to close
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
    }
    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen, onClose])

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-400"
      case "Medium":
        return "text-yellow-400"
      case "Hard":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{
              opacity: 1,
              backdropFilter: "blur(5px)",
              transition: { duration: 0.3 },
            }}
            exit={{
              opacity: 0,
              backdropFilter: "blur(0px)",
              transition: { duration: 0.2 },
            }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            style={{ backdropFilter: "blur(5px)" }}
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ y: 100, opacity: 0, scale: 0.95, rotateX: 5 }}
            animate={{
              y: 0,
              opacity: 1,
              scale: 1,
              rotateX: 0,
              transition: {
                type: "spring",
                damping: 20,
                stiffness: 300,
                mass: 0.8,
                delayChildren: 0.2,
                staggerChildren: 0.1,
              },
            }}
            exit={{
              y: 50,
              opacity: 0,
              scale: 0.95,
              rotateX: 5,
              transition: {
                duration: 0.25,
                ease: "easeInOut",
              },
            }}
            className="relative w-full max-w-md mx-4 mb-4 sm:mb-0 overflow-hidden"
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
              transformOrigin: "center bottom",
            }}
          >
            <div className="bg-[#212121] rounded-2xl shadow-2xl border border-[#3f3f3f] overflow-hidden">
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-[#7c57ff] to-[#00c6ff] p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-white font-bold text-xl">{workout.name}</h3>
                    <p className="text-white/80 text-sm">{workout.date}</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center hover:bg-black/40 transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Workout Info */}
              <div className="p-4">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-[#2a2a2a] rounded-lg p-3 text-center">
                    <Dumbbell className="w-5 h-5 text-[#7c57ff] mx-auto mb-1" />
                    <p className="text-white text-xs">Exercises</p>
                    <p className="text-white font-bold">{workout.exercises}</p>
                  </div>
                  <div className="bg-[#2a2a2a] rounded-lg p-3 text-center">
                    <Clock className="w-5 h-5 text-[#00c6ff] mx-auto mb-1" />
                    <p className="text-white text-xs">Duration</p>
                    <p className="text-white font-bold">{workout.duration}</p>
                  </div>
                  <div className="bg-[#2a2a2a] rounded-lg p-3 text-center">
                    <BarChart2 className="w-5 h-5 text-[#aaf163] mx-auto mb-1" />
                    <p className="text-white text-xs">Difficulty</p>
                    <p className={`font-bold ${getDifficultyColor(workout.difficulty)}`}>{workout.difficulty}</p>
                  </div>
                </div>

                {/* Muscle Groups Preview */}
                <div className="mb-4">
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="flex items-center justify-between w-full bg-[#2a2a2a] rounded-lg p-3 hover:bg-[#333333] transition-colors"
                  >
                    <div className="flex items-center">
                      <Target className="w-5 h-5 text-[#b3a0ff] mr-2" />
                      <span className="text-white text-sm">Targeted Muscles</span>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                        showDetails ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  {/* Expandable Muscle Group Details */}
                  {showDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 bg-[#1a1a1a] rounded-lg p-4 overflow-hidden"
                    >
                      <div className="flex items-center justify-center mb-4">
                        <MuscleGroupVisualizer muscleGroups={workout.muscleGroups} />
                      </div>
                      <div className="space-y-2">
                        {workout.muscleGroups.map((muscle, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: muscle.color }}
                              ></div>
                              <span className="text-white text-sm">{muscle.name}</span>
                            </div>
                            <span className="text-gray-400 text-xs">{muscle.percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-3">
                  {/* Primary Action Button */}
                  {isToday ? (
                    <Link href="/workout" className="w-full">
                      <motion.button
                        whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(124, 87, 255, 0.3)" }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full bg-gradient-to-r from-[#7c57ff] to-[#00c6ff] text-white font-bold py-3.5 rounded-xl flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-[#7c57ff]/20 hover:scale-[1.02] active:scale-[0.98] group"
                        animate={
                          animateButton
                            ? {
                                scale: [1, 1.05, 1],
                                boxShadow: [
                                  "0 4px 6px rgba(124,87,255,0.1)",
                                  "0 8px 15px rgba(124,87,255,0.3)",
                                  "0 4px 6px rgba(124,87,255,0.1)",
                                ],
                              }
                            : {}
                        }
                        transition={{ duration: 1.5, repeat: animateButton ? 2 : 0, repeatType: "loop" }}
                      >
                        <Play
                          className="w-5 h-5 mr-2 text-white group-hover:text-[#aaf163] transition-colors"
                          fill="currentColor"
                        />
                        <span>Start Workout</span>
                      </motion.button>
                    </Link>
                  ) : (
                    <Link href={`/workout-preview/${workout.id}`} className="w-full">
                      <button className="w-full bg-[#3f3f3f] text-white font-medium py-3.5 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-[#4a4a4a]">
                        <List className="w-5 h-5 mr-2 text-[#7c57ff]" />
                        <span>View Workout Details</span>
                      </button>
                    </Link>
                  )}

                  {/* Secondary Action Buttons */}
                  <div className="flex space-x-3">
                    {isToday ? (
                      <>
                        <Link href={`/workout-preview/${workout.id}`} className="flex-1">
                          <button className="w-full bg-[#2a2a2a] text-white py-2.5 rounded-xl flex items-center justify-center hover:bg-[#333333] transition-colors">
                            <Edit className="w-4 h-4 mr-1.5" />
                            <span>Customize</span>
                          </button>
                        </Link>
                        <button
                          onClick={onClose}
                          className="flex-1 bg-[#2a2a2a] text-white py-2.5 rounded-xl flex items-center justify-center hover:bg-[#333333] transition-colors"
                        >
                          <Calendar className="w-4 h-4 mr-1.5" />
                          <span>Reschedule</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="flex-1 bg-[#2a2a2a] text-white py-2.5 rounded-xl flex items-center justify-center hover:bg-[#333333] transition-colors">
                          <Calendar className="w-4 h-4 mr-1.5" />
                          <span>Reschedule</span>
                        </button>
                        <button
                          onClick={onClose}
                          className="flex-1 bg-[#2a2a2a] text-white py-2.5 rounded-xl flex items-center justify-center hover:bg-[#333333] transition-colors"
                        >
                          <X className="w-4 h-4 mr-1.5" />
                          <span>Close</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

