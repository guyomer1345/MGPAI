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
  Heart,
  Leaf,
  Star,
  Utensils,
  CheckCircle,
  ExternalLink,
  Copy,
  Bike,
  Zap,
  Sparkles,
  Share2,
} from "lucide-react"
import Link from "next/link"
import MobileHeader from "@/components/mobile-header"

export default function MealDetailsPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [showNutritionDetails, setShowNutritionDetails] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)

  // Sample meal data
  const meal = {
    name: "Recovery Protein Bowl",
    description: "High-protein bowl with grilled chicken, quinoa, avocado, and vegetables",
    price: 14.99,
    calories: 520,
    protein: 38,
    carbs: 42,
    fats: 18,
    fiber: 8,
    sugar: 4,
    sodium: 620,
    image: "/placeholder.svg?key=auvhm",
    tags: ["High Protein", "Low Fat", "Gluten Free", "Dairy Free"],
    matchPercentage: 92,
    workoutBenefits: [
      "Optimal protein for muscle recovery after your Back + Front hand workout",
      "Complex carbs to replenish glycogen stores",
      "Healthy fats for joint recovery and inflammation reduction",
      "Antioxidants to combat workout-induced oxidative stress",
    ],
    restaurant: {
      name: "Green Protein Bowl",
      rating: 4.8,
      reviews: 243,
      deliveryTime: "15-25",
      deliveryFee: 2.99,
      discount: 20,
      image: "/restaurant-logo.png",
      distance: "1.2 miles away",
    },
    platforms: [
      {
        name: "UberEats",
        logo: "/placeholder.svg?key=jfnox",
        deliveryTime: "20-30 min",
        deliveryFee: "$2.99",
        promoCode: "FITNESS20",
        discount: "20% off",
      },
      {
        name: "DoorDash",
        logo: "/placeholder.svg?key=dl9un",
        deliveryTime: "15-25 min",
        deliveryFee: "$1.99",
        promoCode: "FIT15DD",
        discount: "15% off",
      },
      {
        name: "GrubHub",
        logo: "/placeholder.svg?key=bs65n",
        deliveryTime: "25-35 min",
        deliveryFee: "$3.49",
        promoCode: "FITGRUB10",
        discount: "10% off + free delivery",
      },
    ],
    rewards: {
      pointsEarned: 50,
      currentPoints: 450,
      nextReward: "Free Delivery",
      pointsNeeded: 50,
    },
  }

  // Handle copy promo code
  const copyPromoCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  // Handle platform selection
  const handlePlatformSelect = (platformName: string) => {
    setSelectedPlatform(platformName === selectedPlatform ? null : platformName)
  }

  return (
    <main className="pb-24">
      <MobileHeader showProfile={false} title="Meal Details" />

      <div className="mt-4">
        <Link href="/" className="flex items-center text-white/80 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Meal Hero Section */}
        <div className="relative mb-4">
          <div className="aspect-[4/3] relative rounded-xl overflow-hidden">
            <Image src={meal.image || "/placeholder.svg"} alt={meal.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          </div>

          <div className="absolute top-3 left-3 bg-gradient-to-r from-[#7c57ff] to-[#aaf163] text-white text-xs font-bold px-2 py-1 rounded-md flex items-center">
            <CheckCircle className="w-3 h-3 mr-1" />
            <span>Perfect for You</span>
          </div>

          <div className="absolute top-3 right-3 bg-[#1a1a1a]/80 backdrop-blur-sm rounded-full px-2 py-0.5 flex items-center">
            <Heart className="w-3 h-3 text-[#ff6b6b] mr-1" fill="#ff6b6b" />
            <span className="text-white text-xs">{meal.matchPercentage}% Match</span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h1 className="text-white font-bold text-xl">{meal.name}</h1>
            <p className="text-white/80 text-sm mt-1">{meal.description}</p>

            <div className="flex mt-2 space-x-2">
              {meal.tags.map((tag, index) => (
                <div
                  key={index}
                  className="bg-[#3f3f3f]/70 backdrop-blur-sm rounded-full px-2 py-0.5 flex items-center"
                >
                  <Leaf className="w-2.5 h-2.5 text-[#aaf163] mr-1" />
                  <span className="text-white/90 text-[10px]">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Nutrition Information */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-[#1a1a1a] rounded-xl p-3 text-center">
            <p className="text-white/60 text-xs">Protein</p>
            <p className="text-[#7c57ff] font-bold text-lg">{meal.protein}g</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-3 text-center">
            <p className="text-white/60 text-xs">Carbs</p>
            <p className="text-[#60a5fa] font-bold text-lg">{meal.carbs}g</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-3 text-center">
            <p className="text-white/60 text-xs">Calories</p>
            <p className="text-[#aaf163] font-bold text-lg">{meal.calories}</p>
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="bg-[#1a1a1a] rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Image
                src={meal.restaurant.image || "/placeholder.svg"}
                width={40}
                height={40}
                alt={meal.restaurant.name}
                className="rounded-md mr-3"
              />
              <div>
                <h2 className="text-white font-medium">{meal.restaurant.name}</h2>
                <div className="flex items-center mt-0.5">
                  <Star className="w-3 h-3 text-[#ffeb3b] mr-1" fill="#ffeb3b" />
                  <span className="text-white text-xs mr-1">{meal.restaurant.rating}</span>
                  <span className="text-white/60 text-xs">({meal.restaurant.reviews})</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center">
                <Clock className="w-3 h-3 text-white/60 mr-1" />
                <span className="text-white/60 text-xs">{meal.restaurant.deliveryTime} min</span>
              </div>
              <div className="flex items-center mt-1">
                <Bike className="w-3 h-3 text-white/60 mr-1" />
                <span className="text-white/60 text-xs">{meal.restaurant.distance}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#2a2a2a] rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white text-sm">Price</span>
              <div className="flex items-baseline">
                <span className="text-white/60 text-xs line-through mr-1">${(meal.price * 1.2).toFixed(2)}</span>
                <span className="text-white font-bold">${meal.price}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white text-sm">Delivery Fee</span>
              <span className="text-white">${meal.restaurant.deliveryFee}</span>
            </div>
          </div>
        </div>

        {/* Workout Benefits */}
        <div className="bg-[#1a1a1a] rounded-xl p-4 mb-4">
          <h3 className="text-white font-medium mb-3 flex items-center">
            <Zap className="w-4 h-4 text-[#aaf163] mr-1.5" />
            Workout Benefits
          </h3>
          <ul className="space-y-2">
            {meal.workoutBenefits.map((benefit, index) => (
              <li key={index} className="text-white/80 text-xs flex items-start">
                <CheckCircle className="w-3 h-3 text-[#aaf163] mr-1.5 mt-0.5 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Nutrition Information (Expandable) */}
        <div className="bg-[#1a1a1a] rounded-xl p-4 mb-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-white font-medium flex items-center">
              <Utensils className="w-4 h-4 text-[#aaf163] mr-2" />
              Nutrition Details
            </h2>
            <button
              onClick={() => setShowNutritionDetails(!showNutritionDetails)}
              className="text-[#7c57ff] text-xs flex items-center"
            >
              {showNutritionDetails ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5 mr-1" />
                  Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5 mr-1" />
                  More
                </>
              )}
            </button>
          </div>

          <AnimatePresence>
            {showNutritionDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-3 mb-3">
                  <div className="bg-[#2a2a2a] rounded-lg p-3">
                    <div className="grid grid-cols-4 gap-2">
                      <div className="text-center">
                        <p className="text-white/60 text-xs">Fats</p>
                        <p className="text-[#ff6b6b] font-medium">{meal.fats}g</p>
                      </div>
                      <div className="text-center">
                        <p className="text-white/60 text-xs">Fiber</p>
                        <p className="text-white font-medium">{meal.fiber}g</p>
                      </div>
                      <div className="text-center">
                        <p className="text-white/60 text-xs">Sugar</p>
                        <p className="text-white font-medium">{meal.sugar}g</p>
                      </div>
                      <div className="text-center">
                        <p className="text-white/60 text-xs">Sodium</p>
                        <p className="text-white font-medium">{meal.sodium}mg</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Order Options */}
        <div className="bg-[#1a1a1a] rounded-xl p-4 mb-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-white font-medium">Order Options</h2>
            <div className="bg-[#7c57ff]/20 rounded-full px-2 py-0.5 flex items-center">
              <Sparkles className="w-3 h-3 text-[#7c57ff] mr-1" />
              <span className="text-[#7c57ff] text-xs">+{meal.rewards.pointsEarned} Points</span>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            {meal.platforms.map((platform) => (
              <div
                key={platform.name}
                className={`bg-[#2a2a2a] rounded-lg p-3 border transition-all duration-300 ${
                  selectedPlatform === platform.name ? "border-[#7c57ff]" : "border-transparent"
                }`}
                onClick={() => handlePlatformSelect(platform.name)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Image
                      src={platform.logo || "/placeholder.svg"}
                      width={24}
                      height={24}
                      alt={platform.name}
                      className="rounded-md mr-3"
                    />
                    <div>
                      <h3 className="text-white text-sm font-medium">{platform.name}</h3>
                      <div className="flex items-center mt-0.5">
                        <Clock className="w-3 h-3 text-white/60 mr-1" />
                        <span className="text-white/60 text-xs">{platform.deliveryTime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="bg-[#3f3f3f] rounded-full px-2 py-0.5">
                      <span className="text-[#aaf163] text-xs">{platform.discount}</span>
                    </div>
                  </div>
                </div>

                {selectedPlatform === platform.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 pt-3 border-t border-[#3f3f3f]"
                  >
                    <div className="bg-[#1a1a1a] rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white text-xs">Promo Code:</span>
                        <div className="flex items-center bg-[#3f3f3f] rounded-lg overflow-hidden">
                          <span className="text-white font-medium text-xs px-2 py-1">{platform.promoCode}</span>
                          <button
                            onClick={() => copyPromoCode(platform.promoCode)}
                            className="bg-[#7c57ff] text-white text-xs px-2 py-1 flex items-center"
                          >
                            {copiedCode ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                      </div>
                      <Link href={`/nutrition/handoff/${platform.name.toLowerCase()}`}>
                        <button className="w-full bg-gradient-to-r from-[#7c57ff] to-[#aaf163] text-white py-2 rounded-lg flex items-center justify-center">
                          <span className="font-medium text-sm">Order with {platform.name}</span>
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Rewards Information */}
          <div className="bg-[#2a2a2a] rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white text-sm font-medium flex items-center">
                <Award className="w-4 h-4 text-[#ffeb3b] mr-1.5" />
                Rewards
              </h3>
            </div>
            <p className="text-white/60 text-xs mb-2">
              Order this meal to earn {meal.rewards.pointsEarned} points. You currently have{" "}
              {meal.rewards.currentPoints} points.
            </p>
            <div className="mb-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-white/60 text-xs">Progress to {meal.rewards.nextReward}</span>
                <span className="text-white/80 text-xs">
                  {meal.rewards.currentPoints}/{meal.rewards.currentPoints + meal.rewards.pointsNeeded}
                </span>
              </div>
              <div className="h-2 bg-[#3f3f3f] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#7c57ff] to-[#aaf163] rounded-full"
                  style={{
                    width: `${(meal.rewards.currentPoints / (meal.rewards.currentPoints + meal.rewards.pointsNeeded)) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
            <Link href="/nutrition/rewards">
              <button className="w-full bg-[#3f3f3f] hover:bg-[#4a4a4a] text-white text-xs py-1.5 rounded-lg flex items-center justify-center transition-all duration-300">
                View All Rewards
              </button>
            </Link>
          </div>
        </div>

        {/* Share Button */}
        <button className="w-full bg-[#3f3f3f] text-white py-3 rounded-xl flex items-center justify-center transition-all duration-300 mb-6">
          <Share2 className="w-5 h-5 mr-2" />
          <span>Share This Meal</span>
        </button>
      </div>
    </main>
  )
}
