"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronDown, ChevronUp, Flame, Heart, Utensils } from "lucide-react"
import Link from "next/link"

interface CibusRewardCardProps {
  userName?: string
  workoutName?: string
  caloriesBurned?: number
}

export default function CibusRewardCard({
  userName = "Alex",
  workoutName = "Back + Front hand",
  caloriesBurned = 320,
}: CibusRewardCardProps) {
  const [expanded, setExpanded] = useState(true) // Default to expanded

  // Sample meal data
  const meal = {
    name: "Recovery Protein Bowl",
    description: "High-protein bowl with grilled chicken, quinoa, avocado, and vegetables",
    price: 14.99,
    calories: 520,
    protein: 38,
    carbs: 42,
    image: "/placeholder.svg?key=hd140",
    matchPercentage: 92,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-8 mb-6"
    >
      <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-2xl overflow-hidden border border-[#3f3f3f] shadow-2xl shadow-black/30">
        <div className="p-5">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-white">כל הכבוד, {userName}!</h3>
              <p className="text-white/70">
                השלמת את אימון {workoutName} ושרפת {caloriesBurned} קלוריות.
              </p>
            </div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-8 h-8 bg-[#3f3f3f]/50 rounded-full flex items-center justify-center text-white/70 hover:bg-[#3f3f3f]"
            >
              {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: "20px" }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#3f3f3f]">
                  <div className="flex gap-4">
                    <div className="w-28 h-28 relative flex-shrink-0">
                      <Image
                        src={meal.image || "/placeholder.svg"}
                        alt={meal.name}
                        fill
                        className="rounded-lg object-cover"
                      />
                      <div className="absolute top-1.5 left-1.5 bg-black/60 backdrop-blur-sm rounded-full px-2 py-0.5 flex items-center gap-1">
                        <Heart className="w-3 h-3 text-red-500" fill="currentColor" />
                        <span className="text-white text-xs font-bold">{meal.matchPercentage}%</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-[#aaf163] font-semibold">ההמלצה המושלמת עבורך</p>
                      <h4 className="text-white font-bold text-lg">{meal.name}</h4>
                      <div className="flex gap-2 mt-2">
                        <div className="bg-[#3f3f3f] text-white/80 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <Flame size={12} className="text-orange-400" /> {meal.calories} קלוריות
                        </div>
                        <div className="bg-[#3f3f3f] text-white/80 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <Utensils size={12} className="text-blue-400" /> {meal.protein}ג חלבון
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link href="/nutrition/order" className="w-full">
                    <button className="mt-4 w-full bg-gradient-to-r from-[#7c57ff] to-[#aaf163] text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:brightness-110">
                      <span>הזמן עכשיו עם Cibus</span>
                      <ArrowRight size={16} />
                    </button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
