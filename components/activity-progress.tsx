"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Video, BookOpen, Headphones, Mic, Dumbbell, ChevronRight, Menu } from "lucide-react"

export default function ActivityProgress() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [expanded, setExpanded] = useState(false)

  const activities = [
    {
      name: "Video Tutorial",
      icon: Video,
      completed: true,
      duration: "10 min",
    },
    {
      name: "Reading",
      icon: BookOpen,
      completed: true,
      duration: "15 min",
    },
    {
      name: "Audio Lesson",
      icon: Headphones,
      completed: false,
      duration: "8 min",
      active: true,
    },
    {
      name: "Practice",
      icon: Mic,
      completed: false,
      duration: "12 min",
    },
    {
      name: "Workout",
      icon: Dumbbell,
      completed: false,
      duration: "20 min",
    },
  ]

  return (
    <div className="bg-[#121820] min-h-screen text-white">
      {/* Header */}
      <div className="bg-[#ff3b41] rounded-b-3xl p-6 pb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm font-medium opacity-80">SECTION 2, UNIT 16</div>
          <button className="w-8 h-8 flex items-center justify-center">
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>
        <h1 className="text-2xl font-bold mb-2">Describe your routine</h1>
        <div className="flex items-center">
          <div className="flex space-x-1 mr-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${i <= 2 ? "bg-white" : "bg-white/30"}`}></div>
            ))}
          </div>
          <span className="text-xs opacity-80">3/5 completed</span>
        </div>
      </div>

      {/* Main content */}
      <div className="px-6 -mt-6">
        {/* Central activity circle */}
        <div className="relative flex justify-center mb-8">
          <div className="relative">
            {/* Segmented ring */}
            <svg
              width="180"
              height="180"
              viewBox="0 0 180 180"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <circle cx="90" cy="90" r="80" fill="none" stroke="#2a3440" strokeWidth="8" strokeDasharray="30 15" />
              <circle
                cx="90"
                cy="90"
                r="80"
                fill="none"
                stroke="#ff3b41"
                strokeWidth="8"
                strokeDasharray="30 15"
                strokeDashoffset="0"
                className="transition-all duration-500"
                strokeLinecap="round"
                style={{
                  strokeDashoffset: 360 - (360 * 3) / 5,
                  transform: "rotate(-90deg)",
                  transformOrigin: "center",
                }}
              />
            </svg>

            {/* Central circle */}
            <motion.div
              className="relative z-10 w-32 h-32 rounded-full bg-[#ff3b41] flex items-center justify-center shadow-lg"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <div className="absolute inset-0 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-70"></div>
              </div>
              <Star className="w-14 h-14 text-white" fill="white" />
            </motion.div>
          </div>
        </div>

        {/* Activity list */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Today's Activities</h2>
            <button className="text-[#ff3b41] text-sm flex items-center" onClick={() => setExpanded(!expanded)}>
              {expanded ? "Collapse" : "See all"}
              <ChevronRight className={`w-4 h-4 ml-1 transition-transform ${expanded ? "rotate-90" : ""}`} />
            </button>
          </div>

          <div className="space-y-3">
            <AnimatePresence>
              {activities.map((activity, index) => {
                // Only show first 3 items when not expanded
                if (!expanded && index > 2) return null

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`flex items-center p-3 rounded-xl ${activity.active ? "bg-[#1e2834]" : "bg-transparent"}`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                        activity.completed ? "bg-[#2a3440]" : activity.active ? "bg-[#ff3b41]" : "bg-[#2a3440]"
                      }`}
                    >
                      <activity.icon className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-medium">{activity.name}</h3>
                        <span className="text-xs opacity-70">{activity.duration}</span>
                      </div>

                      <div className="w-full h-1.5 bg-[#2a3440] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#ff3b41] rounded-full"
                          style={{ width: activity.completed ? "100%" : activity.active ? "60%" : "0%" }}
                        ></div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Character section */}
        <div className="bg-[#1e2834] rounded-2xl p-5 mb-6 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="font-bold mb-2">Daily Challenge</h3>
            <p className="text-sm opacity-80 mb-4">Complete all activities to earn your daily streak bonus!</p>

            <div className="flex items-center">
              <div className="flex -space-x-1 mr-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full bg-[#ff3b41] flex items-center justify-center border-2 border-[#1e2834]"
                  >
                    <Star className="w-3 h-3 text-white" fill="white" />
                  </div>
                ))}
              </div>
              <span className="text-sm font-medium">3 stars earned today</span>
            </div>
          </div>

          {/* Character illustration (simplified) */}
          <div className="absolute right-0 bottom-0 w-24 h-32 opacity-50">
            <div className="w-16 h-16 rounded-full bg-[#2a3440] absolute bottom-8 right-4"></div>
            <div className="w-8 h-16 bg-[#2a3440] absolute bottom-0 right-8 rounded-t-lg"></div>
            <div className="w-8 h-16 bg-[#2a3440] absolute bottom-0 right-12 rounded-t-lg"></div>
          </div>
        </div>

        {/* Next activity button */}
        <button className="w-full py-4 bg-[#ff3b41] rounded-xl font-bold text-white flex items-center justify-center">
          Continue to Next Activity
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  )
}

