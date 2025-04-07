"use client"

import React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, Headphones, Mic, Video, Dumbbell, ChevronRight, Star, ArrowRight, Menu } from "lucide-react"
import Link from "next/link"

export default function CircularNavigationPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [showContent, setShowContent] = useState(false)

  // Navigation items with their respective icons and colors
  const navItems = [
    {
      name: "Reading",
      icon: BookOpen,
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30",
      textColor: "text-emerald-400",
    },
    {
      name: "Listening",
      icon: Headphones,
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      textColor: "text-blue-400",
    },
    {
      name: "Speaking",
      icon: Mic,
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      textColor: "text-purple-400",
    },
    {
      name: "Video",
      icon: Video,
      color: "from-rose-500 to-pink-600",
      bgColor: "bg-rose-500/10",
      borderColor: "border-rose-500/30",
      textColor: "text-rose-400",
    },
    {
      name: "Practice",
      icon: Dumbbell,
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/30",
      textColor: "text-amber-400",
    },
  ]

  // Show content after a short delay for a smoother entrance
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="relative">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-br from-slate-800 to-slate-900 rounded-b-[40px] z-0"></div>

        <div className="relative z-10 pt-8 px-6">
          <div className="flex justify-between items-center mb-6">
            <button className="w-10 h-10 rounded-full bg-slate-800/50 backdrop-blur-sm flex items-center justify-center">
              <ChevronRight className="w-5 h-5 text-white/70 rotate-180" />
            </button>
            <button className="w-10 h-10 rounded-full bg-slate-800/50 backdrop-blur-sm flex items-center justify-center">
              <Menu className="w-5 h-5 text-white/70" />
            </button>
          </div>

          <div className="mb-8">
            <div className="text-sm text-white/60 mb-1">SECTION 3, UNIT 12</div>
            <h1 className="text-2xl font-bold">Daily Activities</h1>
          </div>

          <div className="flex items-center space-x-2 mb-2">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${i <= activeIndex ? "bg-gradient-to-r " + navItems[activeIndex].color : "bg-slate-700"}`}
                ></div>
              ))}
            </div>
            <div className="text-xs text-white/60">{activeIndex + 1}/5</div>
          </div>
        </div>
      </header>

      <main className="relative z-20 px-6 -mt-6">
        {/* Circular Navigation */}
        <div className="relative flex justify-center mb-8">
          {/* Orbital path */}
          <div className="absolute w-[280px] h-[280px] rounded-full border border-slate-700/50 flex items-center justify-center">
            <div className="w-[210px] h-[210px] rounded-full border border-slate-700/30"></div>
            <div className="w-[140px] h-[140px] rounded-full border border-slate-700/20"></div>
          </div>

          {/* Center circle */}
          <motion.div
            className={`absolute z-20 w-20 h-20 rounded-full bg-gradient-to-br ${navItems[activeIndex].color} shadow-lg flex items-center justify-center`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Star className="w-8 h-8 text-white" />
          </motion.div>

          {/* Orbital items */}
          {navItems.map((item, index) => {
            // Calculate position on the circle
            const angle = index * ((2 * Math.PI) / navItems.length) - Math.PI / 2
            const radius = 120
            const x = radius * Math.cos(angle)
            const y = radius * Math.sin(angle)

            const isActive = index === activeIndex

            return (
              <motion.button
                key={index}
                className={`absolute w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300
                  ${
                    isActive
                      ? `bg-gradient-to-br ${item.color} shadow-lg shadow-${item.color.split("-")[1]}-500/20`
                      : "bg-slate-800 border border-slate-700"
                  }`}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
                onClick={() => setActiveIndex(index)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <item.icon className={`w-6 h-6 ${isActive ? "text-white" : "text-slate-400"}`} />

                {isActive && (
                  <motion.div
                    className="absolute -bottom-8 whitespace-nowrap bg-slate-800/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.name}
                  </motion.div>
                )}
              </motion.button>
            )
          })}
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {showContent && (
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-12"
            >
              <div
                className={`p-5 rounded-2xl ${navItems[activeIndex].bgColor} border ${navItems[activeIndex].borderColor} mb-6`}
              >
                <div className="flex items-start">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${navItems[activeIndex].color} flex items-center justify-center mr-4`}
                  >
                    {React.createElement(navItems[activeIndex].icon, { className: "w-5 h-5 text-white" })}
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">{navItems[activeIndex].name} Exercise</h3>
                    <p className="text-white/70 text-sm">
                      Complete the {navItems[activeIndex].name.toLowerCase()} activity to earn points and unlock new
                      levels.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 mb-6">
                <h3 className="font-medium text-white mb-3">Today's Challenge</h3>
                <p className="text-white/70 text-sm mb-4">
                  Describe your daily routine using the vocabulary from this unit.
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-amber-400 mr-1" />
                    <span className="text-amber-400 text-sm">25 XP</span>
                  </div>
                  <Link href="#">
                    <button
                      className={`px-4 py-2 rounded-full bg-gradient-to-r ${navItems[activeIndex].color} text-white text-sm font-medium flex items-center`}
                    >
                      Start
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[1, 2].map(
                  (item) =>
                    (
                      <div key={item} className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4">
                    <div className={`w-8 h-8 rounded-full ${navItems[activeIndex].bgColor} flex items-center justify-center mb-3`}>\
                      <navItems[activeIndex].icon className={`w-4 h-4 ${navItems[activeIndex].textColor}`} />
                    </div>
                    <h4 className="text-white text-sm font-medium mb-1">Practice {item}</h4>
                    <p className="text-white/50 text-xs">10 min • Beginner</p>
                  </div>
                    ),
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

