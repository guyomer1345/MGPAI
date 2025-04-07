"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue } from "framer-motion"
import { BookOpen, Headphones, Mic, Video, Dumbbell, ChevronLeft, Play, Menu, Clock, BarChart } from "lucide-react"
import Link from "next/link"

export default function OrbitalNavigationPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [rotation, setRotation] = useState(0)
  const rotateMotion = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)

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

  // Update active index based on rotation
  useEffect(() => {
    const anglePerItem = 360 / navItems.length
    // Normalize rotation to 0-360
    const normalizedRotation = ((rotation % 360) + 360) % 360
    // Calculate active index
    const newIndex = Math.round(normalizedRotation / anglePerItem) % navItems.length
    setActiveIndex(newIndex)
  }, [rotation, navItems.length])

  // Handle drag to rotate
  const handleDrag = (event: any, info: any) => {
    if (!containerRef.current) return

    setIsDragging(true)

    const containerRect = containerRef.current.getBoundingClientRect()
    const containerCenterX = containerRect.left + containerRect.width / 2
    const containerCenterY = containerRect.top + containerRect.height / 2

    // Calculate angle between center and current position
    const angle = Math.atan2(event.clientY - containerCenterY, event.clientX - containerCenterX) * (180 / Math.PI)

    // Update rotation
    setRotation(angle)
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
            <div className="text-sm text-white/60 mb-1">ORBITAL NAVIGATION</div>
            <h1 className="text-2xl font-bold">Learning Activities</h1>
          </div>
        </div>
      </header>

      <main className="relative z-20 px-6 -mt-6">
        {/* Orbital Navigation */}
        <div ref={containerRef} className="relative h-[340px] flex justify-center items-center mb-8">
          {/* Orbital rings */}
          <div className="absolute w-[300px] h-[300px] rounded-full border border-slate-700/30 flex items-center justify-center">
            <div className="w-[240px] h-[240px] rounded-full border border-slate-700/20 flex items-center justify-center">
              <div className="w-[180px] h-[180px] rounded-full border border-slate-700/10"></div>
            </div>
          </div>

          {/* Center circle */}
          <motion.div
            className={`absolute z-30 w-24 h-24 rounded-full bg-gradient-to-br ${navItems[activeIndex].color} shadow-lg flex items-center justify-center cursor-pointer`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-70"></div>
            </div>
            <motion.div
              className="relative z-10 flex flex-col items-center"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Play className="w-8 h-8 text-white mb-1" fill="white" />
              <div className="text-xs font-medium text-white/90">START</div>
            </motion.div>
          </motion.div>

          {/* Orbital items */}
          <motion.div
            className="absolute w-[300px] h-[300px]"
            animate={{ rotate: rotation }}
            transition={{ type: "spring", stiffness: 100, damping: 30 }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.1}
            onDrag={handleDrag}
            onDragEnd={() => setIsDragging(false)}
          >
            {navItems.map((item, index) => {
              // Calculate position on the circle
              const angle = index * ((2 * Math.PI) / navItems.length)
              const radius = 150
              const x = radius * Math.cos(angle)
              const y = radius * Math.sin(angle)

              const isActive = index === activeIndex

              return (
                <motion.div
                  key={index}
                  className="absolute"
                  style={{
                    left: "50%",
                    top: "50%",
                    x: x,
                    y: y,
                    translateX: "-50%",
                    translateY: "-50%",
                  }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <motion.button
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300
                      ${
                        isActive
                          ? `bg-gradient-to-br ${item.color} shadow-lg`
                          : "bg-slate-800/80 backdrop-blur-sm border border-slate-700/50"
                      }`}
                    onClick={() => {
                      if (!isDragging) {
                        setActiveIndex(index)
                        setRotation(index * (360 / navItems.length))
                      }
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      rotate: -rotation, // Counter-rotate to keep icons upright
                      scale: isActive ? 1.1 : 1,
                    }}
                  >
                    <item.icon className={`w-6 h-6 ${isActive ? "text-white" : "text-slate-400"}`} />
                  </motion.button>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <div className="text-center mb-8">
              <motion.h2
                className="text-2xl font-bold mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {navItems[activeIndex].name}
              </motion.h2>
              <motion.p
                className="text-white/70 text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {navItems[activeIndex].description}
              </motion.p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div
                className={`p-4 rounded-2xl ${navItems[activeIndex].bgColor} border ${navItems[activeIndex].borderColor}`}
              >
                <div className="flex items-center mb-2">
                  <Clock className={`w-5 h-5 ${navItems[activeIndex].textColor} mr-2`} />
                  <h3 className="font-medium text-white text-sm">Duration</h3>
                </div>
                <p className="text-white text-xl font-bold">15 min</p>
              </div>

              <div
                className={`p-4 rounded-2xl ${navItems[activeIndex].bgColor} border ${navItems[activeIndex].borderColor}`}
              >
                <div className="flex items-center mb-2">
                  <BarChart className={`w-5 h-5 ${navItems[activeIndex].textColor} mr-2`} />
                  <h3 className="font-medium text-white text-sm">Difficulty</h3>
                </div>
                <p className="text-white text-xl font-bold">Beginner</p>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 mb-6">
              <h3 className="font-medium text-white mb-3">Activity Details</h3>
              <p className="text-white/70 text-sm mb-4">
                This {navItems[activeIndex].name.toLowerCase()} activity will help you practice your skills with
                interactive exercises designed for beginners.
              </p>

              <div className="flex items-center space-x-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${i < 3 ? "bg-gradient-to-r " + navItems[activeIndex].color : "bg-slate-700"}`}
                  ></div>
                ))}
                <div className="text-xs text-white/60">3/5 completed</div>
              </div>

              <button
                className={`w-full py-3 rounded-xl bg-gradient-to-r ${navItems[activeIndex].color} text-white font-medium flex items-center justify-center`}
              >
                Continue Learning
                <Play className="w-4 h-4 ml-2" fill="white" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

