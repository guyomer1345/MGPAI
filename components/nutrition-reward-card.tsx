"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronDown, ChevronUp, Flame, Heart, Utensils, CheckCircle } from "lucide-react"
import Link from "next/link"

interface NutritionRewardCardProps {
  userName?: string
  points?: number
  workoutName?: string
  caloriesBurned?: number
  isPostWorkout?: boolean
}

export default function NutritionRewardCard({
  userName = "Alex",
  points = 450,
  workoutName = "Back + Front hand",
  caloriesBurned = 320,
  isPostWorkout = true,
}: NutritionRewardCardProps) {
  const [expanded, setExpanded] = useState(false)

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

  // If not post-workout, don't show the card
  if (!isPostWorkout) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-6"
    >
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] rounded-xl overflow-hidden border border-[#3f3f3f]/50 shadow-lg">
        {/* Compact Header */}
        <div className="p-3 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7c57ff] to-[#aaf163]"></div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Utensils className="w-4 h-4 text-[#aaf163] mr-2" />
              <div>
                <h3 className="text-white font-semibold text-sm">Post-Workout Meal</h3>
                <p className="text-white/60 text-xs">Perfect for your {workoutName}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-[#7c57ff]/20 rounded-full px-2 py-0.5 flex items-center mr-2">
                <Flame className="w-3 h-3 text-[#7c57ff] mr-1" />
                <span className="text-[#7c57ff] text-xs">{caloriesBurned} kcal</span>
              </div>
              <button
                onClick={() => setExpanded(!expanded)}
                className="w-6 h-6 bg-[#3f3f3f] rounded-full flex items-center justify-center"
              >
                {expanded ? (
                  <ChevronUp className="w-3.5 h-3.5 text-white/80" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-white/80" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="px-3 pb-3"
            >
              <div className="flex space-x-3">
                {/* Meal Image */}
                <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={meal.image || "/placeholder.svg"} alt={meal.name} fill className="object-cover" />
                  <div className="absolute top-1 left-1 bg-[#1a1a1a]/80 backdrop-blur-sm rounded-full px-1.5 py-0.5 flex items-center">
                    <Heart className="w-2.5 h-2.5 text-[#ff6b6b] mr-0.5" fill="#ff6b6b" />
                    <span className="text-white text-[10px]">{meal.matchPercentage}%</span>
                  </div>
                </div>

                {/* Meal Info */}
                <div className="flex-1">
                  <h4 className="text-white font-medium text-sm">{meal.name}</h4>
                  <p className="text-white/60 text-xs line-clamp-2 mb-1">{meal.description}</p>

                  {/* Nutrition Pills */}
                  <div className="flex space-x-2 mb-2">
                    <div className="bg-[#7c57ff]/20 rounded-full px-2 py-0.5 flex items-center">
                      <span className="text-[#7c57ff] text-[10px]">{meal.protein}g Protein</span>
                    </div>
                    <div className="bg-[#60a5fa]/20 rounded-full px-2 py-0.5 flex items-center">
                      <span className="text-[#60a5fa] text-[10px]">{meal.carbs}g Carbs</span>
                    </div>
                    <div className="bg-[#aaf163]/20 rounded-full px-2 py-0.5 flex items-center">
                      <span className="text-[#aaf163] text-[10px]">{meal.calories} Cal</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle className="w-3 h-3 text-[#aaf163] mr-1" />
                      <span className="text-white/80 text-xs">Perfect for You</span>
                    </div>
                    <Link href="/nutrition/meal-details">
                      <button className="bg-gradient-to-r from-[#7c57ff] to-[#aaf163] text-white text-xs py-1 px-2 rounded-lg flex items-center transition-all duration-300">
                        <span className="font-medium">View</span>
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
