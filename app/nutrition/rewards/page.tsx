"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  Award,
  ChevronDown,
  ChevronUp,
  Clock,
  Flame,
  Gift,
  Utensils,
  Copy,
  CheckCircle,
  HelpCircle,
  Zap,
} from "lucide-react"
import Link from "next/link"
import MobileHeader from "@/components/mobile-header"

export default function RewardsPage() {
  const [activeTab, setActiveTab] = useState<"rewards" | "history" | "how-it-works">("rewards")
  const [expandedReward, setExpandedReward] = useState<number | null>(null)
  const [copiedCode, setCopiedCode] = useState<number | null>(null)

  // Sample rewards data
  const rewards = [
    {
      id: 1,
      name: "Free Delivery",
      description: "Get free delivery on your next order",
      pointsCost: 200,
      expiresIn: "7 days",
      image: "/delivery-truck-icon.png",
      color: "#60a5fa",
      code: "FREEDEL2025",
      platforms: ["UberEats", "DoorDash", "GrubHub"],
    },
    {
      id: 2,
      name: "20% Off Your Order",
      description: "Save 20% on any meal from our partner restaurants",
      pointsCost: 350,
      expiresIn: "30 days",
      image: "/discount-icon.png",
      color: "#aaf163",
      code: "FIT20OFF",
      platforms: ["UberEats", "DoorDash"],
    },
    {
      id: 3,
      name: "Premium Meal Upgrade",
      description: "Upgrade any meal to a premium option for free",
      pointsCost: 400,
      expiresIn: "14 days",
      image: "/placeholder.svg?key=plrqx",
      color: "#ffeb3b",
      code: "PREMIUM25",
      platforms: ["UberEats", "GrubHub"],
    },
    {
      id: 4,
      name: "Protein Shake Add-on",
      description: "Get a free protein shake with your meal",
      pointsCost: 150,
      expiresIn: "30 days",
      image: "/placeholder.svg?key=mebvc",
      color: "#ff6b6b",
      code: "FREESHAKE",
      platforms: ["UberEats", "DoorDash", "GrubHub"],
    },
  ]

  // Sample history data
  const history = [
    {
      id: 1,
      date: "Jan 16, 2025",
      action: "Completed Workout",
      points: "+50",
      description: "Back + Front hand workout",
      icon: Flame,
      color: "#7c57ff",
    },
    {
      id: 2,
      date: "Jan 15, 2025",
      action: "Ordered Meal",
      points: "+25",
      description: "Green Protein Bowl",
      icon: Utensils,
      color: "#aaf163",
    },
    {
      id: 3,
      date: "Jan 15, 2025",
      action: "Used Reward",
      points: "-200",
      description: "Free Delivery",
      icon: Award,
      color: "#60a5fa",
    },
    {
      id: 4,
      date: "Jan 14, 2025",
      action: "Completed Workout",
      points: "+50",
      description: "Leg Day workout",
      icon: Flame,
      color: "#7c57ff",
    },
    {
      id: 5,
      date: "Jan 13, 2025",
      action: "Weekly Streak",
      points: "+100",
      description: "3 workouts in a row",
      icon: Award,
      color: "#ffeb3b",
    },
  ]

  // How to earn points data
  const earnPointsWays = [
    {
      title: "Complete Workouts",
      description: "Earn 50 points for each workout you complete",
      icon: Flame,
      color: "#7c57ff",
      examples: [
        { action: "Complete any workout", points: 50 },
        { action: "Complete a challenge workout", points: 75 },
        { action: "Achieve a personal best", points: 100 },
      ],
    },
    {
      title: "Order Recommended Meals",
      description: "Earn points when you order meals through our app",
      icon: Utensils,
      color: "#aaf163",
      examples: [
        { action: "Order any recommended meal", points: 25 },
        { action: "Order a perfect match meal", points: 50 },
        { action: "First order of the week", points: 75 },
      ],
    },
    {
      title: "Maintain Streaks",
      description: "Earn bonus points for consistent activity",
      icon: Zap,
      color: "#ffeb3b",
      examples: [
        { action: "3 workouts in a week", points: 100 },
        { action: "5 meals in a week", points: 150 },
        { action: "30-day login streak", points: 300 },
      ],
    },
  ]

  // Toggle expanded reward
  const toggleReward = (id: number) => {
    if (expandedReward === id) {
      setExpandedReward(null)
    } else {
      setExpandedReward(id)
    }
  }

  // Handle copy promo code
  const handleCopyCode = (id: number, code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <main className="pt-4 pb-24">
      <MobileHeader />

      <div className="mt-4">
        <Link href="/" className="flex items-center text-white/80 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Points Summary Card */}
        <div className="bg-gradient-to-r from-[#7c57ff] to-[#00c6ff] rounded-xl overflow-hidden shadow-lg mb-4 relative">
          <div className="p-4 relative z-10">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h2 className="text-white font-bold text-2xl">450</h2>
                <p className="text-white/80 text-sm">Available Points</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="text-white text-sm font-medium">Level 2</span>
              </div>
            </div>

            <div className="mb-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-white/80 text-xs">Next Reward at 500 points</span>
                <span className="text-white text-xs font-medium">450/500</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#aaf163] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "90%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-4">
          <div className="flex bg-[#1a1a1a] rounded-lg p-1">
            <button
              className={`flex-1 py-2 px-3 rounded-md flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                activeTab === "rewards" ? "bg-[#3f3f3f] text-white" : "text-gray-400 hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("rewards")}
            >
              <Gift className="w-4 h-4 mr-1.5" />
              Rewards
            </button>
            <button
              className={`flex-1 py-2 px-3 rounded-md flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                activeTab === "history" ? "bg-[#3f3f3f] text-white" : "text-gray-400 hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("history")}
            >
              <Clock className="w-4 h-4 mr-1.5" />
              History
            </button>
            <button
              className={`flex-1 py-2 px-3 rounded-md flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                activeTab === "how-it-works" ? "bg-[#3f3f3f] text-white" : "text-gray-400 hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("how-it-works")}
            >
              <HelpCircle className="w-4 h-4 mr-1.5" />
              How It Works
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "rewards" && (
            <motion.div
              key="rewards"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-3">
                {rewards.map((reward) => (
                  <motion.div
                    key={reward.id}
                    className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#3f3f3f]/50 shadow-md transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.01, borderColor: reward.color }}
                  >
                    <div className="p-3 cursor-pointer hover:bg-[#2a2a2a]" onClick={() => toggleReward(reward.id)}>
                      <div className="flex items-center">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                          style={{ backgroundColor: `${reward.color}20` }}
                        >
                          <Image
                            src={reward.image || "/placeholder.svg"}
                            width={24}
                            height={24}
                            alt={reward.name}
                            className="rounded-md"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="text-white font-medium text-sm">{reward.name}</h4>
                            <div className="flex items-center">
                              <Award className="w-3.5 h-3.5 text-[#ffeb3b] mr-1" />
                              <span className="text-white text-sm font-medium">{reward.pointsCost}</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-white/60 text-xs">{reward.description}</p>
                            {expandedReward === reward.id ? (
                              <ChevronUp className="w-4 h-4 text-white/60" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-white/60" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {expandedReward === reward.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-3 pb-3"
                      >
                        <div className="bg-[#2a2a2a] rounded-lg p-3">
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                              <Award className="w-4 h-4 text-[#ffeb3b] mr-1.5" />
                              <span className="text-white text-xs">Your points: 450</span>
                            </div>
                            <span className="text-white/60 text-xs">
                              {450 >= reward.pointsCost ? "Enough points" : `Need ${reward.pointsCost - 450} more`}
                            </span>
                          </div>

                          {450 >= reward.pointsCost && (
                            <div className="mb-3">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-white text-xs">Reward Code:</span>
                                <div className="flex items-center bg-[#3f3f3f] rounded-lg overflow-hidden">
                                  <span className="text-white font-medium text-xs px-2 py-1">{reward.code}</span>
                                  <button
                                    onClick={() => handleCopyCode(reward.id, reward.code)}
                                    className="bg-[#7c57ff] text-white text-xs px-2 py-1 flex items-center"
                                  >
                                    {copiedCode === reward.id ? (
                                      <CheckCircle className="w-3 h-3" />
                                    ) : (
                                      <Copy className="w-3 h-3" />
                                    )}
                                  </button>
                                </div>
                              </div>
                              <div className="bg-[#1a1a1a] rounded-lg p-2">
                                <p className="text-white/60 text-xs mb-1">Available on:</p>
                                <div className="flex flex-wrap gap-2">
                                  {reward.platforms.map((platform) => (
                                    <div key={platform} className="bg-[#3f3f3f] rounded-full px-2 py-0.5">
                                      <span className="text-white/80 text-xs">{platform}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          <button
                            className={`w-full py-2 rounded-lg font-medium transition-all duration-300 ${
                              450 >= reward.pointsCost
                                ? `bg-gradient-to-r from-[#7c57ff] to-[${reward.color}] text-white`
                                : "bg-[#3f3f3f] text-white/50 cursor-not-allowed"
                            }`}
                            disabled={450 < reward.pointsCost}
                          >
                            {450 >= reward.pointsCost ? "Use Reward" : `Need ${reward.pointsCost - 450} more points`}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "history" && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#3f3f3f]/50 shadow-md">
                <div className="p-4">
                  <div className="space-y-3">
                    {history.map((item) => {
                      const Icon = item.icon
                      const isPositive = item.points.startsWith("+")

                      return (
                        <motion.div
                          key={item.id}
                          className="flex items-center"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                            style={{ backgroundColor: `${item.color}20` }}
                          >
                            <Icon className="w-4 h-4" style={{ color: item.color }} />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="text-white text-sm font-medium">{item.action}</h4>
                                <p className="text-white/60 text-xs">{item.description}</p>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className={`font-medium ${isPositive ? "text-[#aaf163]" : "text-[#ff6b6b]"}`}>
                                  {item.points}
                                </span>
                                <span className="text-white/60 text-xs">{item.date}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "how-it-works" && (
            <motion.div
              key="how-it-works"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-3">
                {earnPointsWays.map((way, index) => (
                  <motion.div
                    key={index}
                    className="bg-[#1a1a1a] rounded-xl p-3 border border-[#3f3f3f]/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-center mb-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                        style={{ backgroundColor: `${way.color}20` }}
                      >
                        <way.icon className="w-4 h-4" style={{ color: way.color }} />
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm">{way.title}</h4>
                        <p className="text-white/60 text-xs">{way.description}</p>
                      </div>
                    </div>

                    <div className="bg-[#2a2a2a] rounded-lg p-2">
                      <div className="space-y-1">
                        {way.examples.map((example, idx) => (
                          <div key={idx} className="flex justify-between items-center">
                            <span className="text-white/80 text-xs">{example.action}</span>
                            <span className="text-[#aaf163] text-xs font-medium">+{example.points}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
