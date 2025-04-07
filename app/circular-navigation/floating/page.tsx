"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, Headphones, Mic, Video, Dumbbell, ChevronLeft, Star, Play, Menu, X, Plus, Check } from "lucide-react"
import Link from "next/link"

export default function FloatingCirclesPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [showMenu, setShowMenu] = useState(false)
  const [completedItems, setCompletedItems] = useState<number[]>([])

  // Navigation items with their respective icons and colors
  const navItems = [
    {
      name: "Reading",
      icon: BookOpen,
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30",
      textColor: "text-emerald-400",
      description: "Improve your reading comprehension with interactive texts",
    },
    {
      name: "Listening",
      icon: Headphones,
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      textColor: "text-blue-400",
      description: "Enhance your listening skills with audio exercises",
    },
    {
      name: "Speaking",
      icon: Mic,
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      textColor: "text-purple-400",
      description: "Practice pronunciation and conversation skills",
    },
    {
      name: "Video",
      icon: Video,
      color: "from-rose-500 to-pink-600",
      bgColor: "bg-rose-500/10",
      borderColor: "border-rose-500/30",
      textColor: "text-rose-400",
      description: "Watch and learn with interactive video lessons",
    },
    {
      name: "Practice",
      icon: Dumbbell,
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/30",
      textColor: "text-amber-400",
      description: "Test your knowledge with practice exercises",
    },
  ]

  const toggleComplete = (index: number) => {
    if (completedItems.includes(index)) {
      setCompletedItems(completedItems.filter((i) => i !== index))
    } else {
      setCompletedItems([...completedItems, index])
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden">
      {/* Header */}
      <header className="relative">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-br from-slate-800 to-slate-900 rounded-b-[40px] z-0"></div>

        <div className="relative z-10 pt-8 px-6">
          <div className="flex justify-between items-center mb-6">
            <Link href="/circular-navigation">
              <button className="w-10 h-10 rounded-full bg-slate-800/50 backdrop-blur-sm flex items-center justify-center">
                <ChevronLeft className="w-5 h-5 text-white/70" />
              </button>
            </Link>
            <button className="w-10 h-10 rounded-full bg-slate-800/50 backdrop-blur-sm flex items-center justify-center">
              <Menu className="w-5 h-5 text-white/70" />
            </button>
          </div>

          <div className="mb-8">
            <div className="text-sm text-white/60 mb-1">FLOATING CIRCLES</div>
            <h1 className="text-2xl font-bold">Daily Activities</h1>
          </div>
        </div>
      </header>

      <main className="relative z-20 px-6 -mt-6">
        {/* Main content area */}
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-5 mb-6">
          <h3 className="font-medium text-white mb-3">Today's Progress</h3>
          <p className="text-white/70 text-sm mb-4">
            Complete all activities to earn your daily streak and bonus points.
          </p>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mr-3">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Daily Streak</p>
                <p className="text-amber-400 text-xs">Day 7 - Keep it up!</p>
              </div>
            </div>
            <div className="text-white text-2xl font-bold">3/5</div>
          </div>

          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-600"
              initial={{ width: 0 }}
              animate={{ width: `${(completedItems.length / navItems.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Floating circles container */}
        <div className="relative h-[400px] mb-8">
          {/* Floating circles */}
          {navItems.map((item, index) => {
            // Calculate random positions
            const top = 20 + ((index * 70) % 300)
            const left = 30 + ((index * 83) % 220)
            const isCompleted = completedItems.includes(index)

            return (
              <motion.div
                key={index}
                className="absolute"
                style={{ top, left }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: [0, -10, 0],
                  transition: {
                    y: {
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 3 + index,
                      ease: "easeInOut",
                    },
                  },
                }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <motion.button
                  className={`relative w-16 h-16 rounded-full flex items-center justify-center
                    ${
                      isCompleted
                        ? "bg-slate-800/50 border border-green-500/50"
                        : activeIndex === index
                          ? `bg-gradient-to-br ${item.color} shadow-lg`
                          : "bg-slate-800/80 backdrop-blur-sm border border-slate-700/50"
                    }`}
                  onClick={() => setActiveIndex(index === activeIndex ? null : index)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6 text-green-500" />
                  ) : (
                    <item.icon className={`w-6 h-6 ${activeIndex === index ? "text-white" : "text-slate-400"}`} />
                  )}

                  {/* Activity name label */}
                  <motion.div
                    className={`absolute -bottom-8 whitespace-nowrap px-3 py-1 rounded-full text-xs
                      ${activeIndex === index ? `bg-gradient-to-r ${item.color} text-white` : "bg-slate-800 text-white/70"}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.name}
                  </motion.div>
                </motion.button>
              </motion.div>
            )
          })}

          {/* Floating action button */}
          <motion.button
            className="absolute bottom-4 right-4 w-14 h-14 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 flex items-center justify-center shadow-lg"
            onClick={() => setShowMenu(!showMenu)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {showMenu ? <X className="w-6 h-6 text-white" /> : <Plus className="w-6 h-6 text-white" />}
          </motion.button>

          {/* Radial menu */}
          <AnimatePresence>
            {showMenu && (
              <>
                {[...Array(4)].map((_, index) => {
                  const angle = (index * Math.PI) / 2 // Divide the circle into 4 parts
                  const radius = 80 // Distance from the center button
                  const x = Math.cos(angle) * radius
                  const y = Math.sin(angle) * radius

                  return (
                    <motion.button
                      key={`menu-${index}`}
                      className="absolute w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shadow-md"
                      style={{
                        bottom: 20, // Same as the main button
                        right: 20, // Same as the main button
                      }}
                      initial={{ x: 0, y: 0, opacity: 0 }}
                      animate={{
                        x: -x,
                        y: -y,
                        opacity: 1,
                      }}
                      exit={{ x: 0, y: 0, opacity: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {index === 0 && <Star className="w-5 h-5 text-amber-400" />}
                      {index === 1 && <Play className="w-5 h-5 text-green-400" />}
                      {index === 2 && <BookOpen className="w-5 h-5 text-blue-400" />}
                      {index === 3 && <Mic className="w-5 h-5 text-purple-400" />}
                    </motion.button>
                  )
                })}
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Selected activity details */}
        <AnimatePresence>
          {activeIndex !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className={`p-5 rounded-2xl ${navItems[activeIndex].bgColor} border ${navItems[activeIndex].borderColor} mb-6`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${navItems[activeIndex].color} flex items-center justify-center mr-3`}
                  >
                    \ \{navItems[activeIndex].icon && <navItems[activeIndex].icon className="w-5 h-5 text-white" />}
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">{navItems[activeIndex].name}</h3>
                    <p className="text-white/70 text-sm">{navItems[activeIndex].description}</p>
                  </div>
                </div>
                <button
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                  onClick={() => setActiveIndex(null)}
                >
                  <X className="w-4 h-4 text-white/70" />
                </button>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-amber-400 mr-1" />
                  <span className="text-amber-400 text-sm">15 XP</span>
                </div>
                <button
                  className={`px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium flex items-center`}
                  onClick={() => toggleComplete(activeIndex)}
                >
                  {completedItems.includes(activeIndex) ? (
                    <>
                      <Check className="w-4 h-4 mr-1" />
                      Completed
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-1" fill="white" />
                      Start Activity
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

