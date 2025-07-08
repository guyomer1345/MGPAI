"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Award,
  Check,
  ChevronDown,
  Clock,
  CreditCard,
  Flame,
  Heart,
  Info,
  Leaf,
  MapPin,
  Minus,
  Plus,
  Star,
  Truck,
  Utensils,
} from "lucide-react"
import Link from "next/link"
import MobileHeader from "@/components/mobile-header"

export default function OrderPage() {
  const [quantity, setQuantity] = useState(1)
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState("standard")
  const [showNutritionInfo, setShowNutritionInfo] = useState(false)
  const [applyPoints, setApplyPoints] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState("cibus")

  // Sample restaurant data
  const restaurant = {
    name: "Green Protein Bowl",
    rating: 4.8,
    reviews: 243,
    deliveryTime: "15-25",
    deliveryFee: 2.99,
    discount: 20,
    image: "/placeholder.svg?key=c05gi",
    meal: {
      name: "Recovery Protein Bowl",
      description: "High-protein bowl with grilled chicken, quinoa, avocado, and vegetables",
      price: 14.99,
      calories: 520,
      protein: 38,
      carbs: 42,
      fats: 18,
      image: "/placeholder.svg?key=yxovt",
      tags: ["High Protein", "Low Fat", "Gluten Free"],
    },
  }

  // Calculate totals
  const subtotal = restaurant.meal.price * quantity
  const deliveryFee = selectedDeliveryOption === "express" ? 4.99 : restaurant.deliveryFee
  const discount = (subtotal * (restaurant.discount / 100)).toFixed(2)
  const pointsDiscount = applyPoints ? 3.0 : 0
  const total = (subtotal + deliveryFee - Number.parseFloat(discount) - pointsDiscount).toFixed(2)

  return (
    <main className="pt-4 pb-24">
      <MobileHeader />

      <div className="mt-4">
        <Link href="/" className="flex items-center text-white/80 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] rounded-xl overflow-hidden border border-[#3f3f3f]/50 shadow-lg mb-6">
          <div className="relative">
            <Image
              src={restaurant.meal.image || "/placeholder.svg"}
              width={600}
              height={300}
              alt={restaurant.meal.name}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-4 left-4 bg-[#1a1a1a]/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
              <Heart className="w-3.5 h-3.5 text-[#ff6b6b] mr-1.5" />
              <span className="text-white text-xs">Perfect Match</span>
            </div>
            <div className="absolute bottom-4 right-4 bg-[#aaf163] rounded-full px-2 py-0.5">
              <span className="text-[#1a1a1a] text-xs font-medium">{restaurant.discount}% OFF</span>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Image
                  src={restaurant.image || "/placeholder.svg"}
                  width={40}
                  height={40}
                  alt={restaurant.name}
                  className="rounded-md mr-3"
                />
                <div>
                  <h4 className="text-white font-medium text-sm">{restaurant.name}</h4>
                  <div className="flex items-center mt-0.5">
                    <Star className="w-3 h-3 text-[#ffeb3b] mr-1" fill="#ffeb3b" />
                    <span className="text-white text-xs mr-1">{restaurant.rating}</span>
                    <span className="text-white/60 text-xs">({restaurant.reviews})</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="w-3.5 h-3.5 text-white/60 mr-1.5" />
                <span className="text-white/60 text-xs">{restaurant.deliveryTime} min</span>
              </div>
            </div>

            <h2 className="text-white font-semibold text-xl mt-3">{restaurant.meal.name}</h2>
            <p className="text-white/70 text-sm mt-1">{restaurant.meal.description}</p>

            <div className="flex mt-3 space-x-2">
              {restaurant.meal.tags.map((tag, index) => (
                <div key={index} className="bg-[#3f3f3f] rounded-full px-2.5 py-1 flex items-center">
                  <Leaf className="w-3 h-3 text-[#aaf163] mr-1.5" />
                  <span className="text-white/80 text-xs">{tag}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowNutritionInfo(!showNutritionInfo)}
              className="mt-4 w-full bg-[#3f3f3f] hover:bg-[#4a4a4a] text-white py-2.5 rounded-lg flex items-center justify-center transition-all duration-300"
            >
              <Info className="w-4 h-4 mr-2" />
              <span className="font-medium">Nutrition Information</span>
              <ChevronDown
                className={`w-4 h-4 ml-2 transition-transform duration-300 ${showNutritionInfo ? "rotate-180" : ""}`}
              />
            </button>

            {showNutritionInfo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <div className="bg-[#2a2a2a] rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3 flex items-center">
                    <Flame className="w-4 h-4 text-[#ff6b6b] mr-2" />
                    Nutritional Values
                  </h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#3f3f3f]/50 rounded-lg p-3">
                      <p className="text-white/60 text-xs">Calories</p>
                      <div className="flex items-baseline">
                        <p className="text-white font-bold text-xl">{restaurant.meal.calories}</p>
                        <p className="text-white/60 text-xs ml-1">kcal</p>
                      </div>
                      <div className="mt-1 h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
                        <div className="h-full bg-[#ff6b6b] rounded-full" style={{ width: "65%" }}></div>
                      </div>
                      <p className="text-white/60 text-[10px] mt-1">65% of daily value</p>
                    </div>

                    <div className="bg-[#3f3f3f]/50 rounded-lg p-3">
                      <p className="text-white/60 text-xs">Protein</p>
                      <div className="flex items-baseline">
                        <p className="text-white font-bold text-xl">{restaurant.meal.protein}</p>
                        <p className="text-white/60 text-xs ml-1">g</p>
                      </div>
                      <div className="mt-1 h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
                        <div className="h-full bg-[#7c57ff] rounded-full" style={{ width: "76%" }}></div>
                      </div>
                      <p className="text-white/60 text-[10px] mt-1">76% of daily value</p>
                    </div>

                    <div className="bg-[#3f3f3f]/50 rounded-lg p-3">
                      <p className="text-white/60 text-xs">Carbs</p>
                      <div className="flex items-baseline">
                        <p className="text-white font-bold text-xl">{restaurant.meal.carbs}</p>
                        <p className="text-white/60 text-xs ml-1">g</p>
                      </div>
                      <div className="mt-1 h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
                        <div className="h-full bg-[#60a5fa] rounded-full" style={{ width: "45%" }}></div>
                      </div>
                      <p className="text-white/60 text-[10px] mt-1">45% of daily value</p>
                    </div>

                    <div className="bg-[#3f3f3f]/50 rounded-lg p-3">
                      <p className="text-white/60 text-xs">Fats</p>
                      <div className="flex items-baseline">
                        <p className="text-white font-bold text-xl">{restaurant.meal.fats}</p>
                        <p className="text-white/60 text-xs ml-1">g</p>
                      </div>
                      <div className="mt-1 h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
                        <div className="h-full bg-[#ffeb3b] rounded-full" style={{ width: "28%" }}></div>
                      </div>
                      <p className="text-white/60 text-[10px] mt-1">28% of daily value</p>
                    </div>
                  </div>

                  <div className="mt-3 bg-[#7c57ff]/20 rounded-lg p-3 border border-[#7c57ff]/30">
                    <div className="flex items-start">
                      <Utensils className="w-4 h-4 text-[#aaf163] mr-2 mt-0.5" />
                      <div>
                        <p className="text-white text-sm font-medium">Perfect for your workout recovery</p>
                        <p className="text-white/70 text-xs mt-1">
                          This meal provides the optimal balance of protein, carbs, and healthy fats to support muscle
                          recovery after your Back + Front hand workout.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Order Details Section */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#3f3f3f]/50 shadow-lg mb-6">
          <div className="p-4">
            <h3 className="text-white font-semibold text-lg mb-4">Order Details</h3>

            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-lg bg-[#2a2a2a] flex items-center justify-center mr-3">
                  <Utensils className="w-6 h-6 text-[#aaf163]" />
                </div>
                <div>
                  <p className="text-white font-medium">{restaurant.meal.name}</p>
                  <p className="text-white/60 text-xs">${restaurant.meal.price} each</p>
                </div>
              </div>

              <div className="flex items-center">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="w-8 h-8 rounded-full bg-[#3f3f3f] flex items-center justify-center"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4 text-white" />
                </button>
                <span className="mx-3 text-white font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full bg-[#3f3f3f] flex items-center justify-center"
                >
                  <Plus className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-white font-medium mb-2">Delivery Options</p>
              <div className="grid grid-cols-2 gap-3">
                <div
                  className={`p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
                    selectedDeliveryOption === "standard"
                      ? "bg-[#7c57ff]/20 border-[#7c57ff]"
                      : "bg-[#2a2a2a] border-[#3f3f3f]"
                  }`}
                  onClick={() => setSelectedDeliveryOption("standard")}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <Truck className="w-4 h-4 text-white mr-2" />
                      <span className="text-white text-sm font-medium">Standard</span>
                    </div>
                    {selectedDeliveryOption === "standard" && <Check className="w-4 h-4 text-[#aaf163]" />}
                  </div>
                  <div className="mt-2 flex justify-between">
                    <span className="text-white/60 text-xs">{restaurant.deliveryTime} min</span>
                    <span className="text-white text-xs">${restaurant.deliveryFee}</span>
                  </div>
                </div>

                <div
                  className={`p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
                    selectedDeliveryOption === "express"
                      ? "bg-[#7c57ff]/20 border-[#7c57ff]"
                      : "bg-[#2a2a2a] border-[#3f3f3f]"
                  }`}
                  onClick={() => setSelectedDeliveryOption("express")}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <Truck className="w-4 h-4 text-[#aaf163] mr-2" />
                      <span className="text-white text-sm font-medium">Express</span>
                    </div>
                    {selectedDeliveryOption === "express" && <Check className="w-4 h-4 text-[#aaf163]" />}
                  </div>
                  <div className="mt-2 flex justify-between">
                    <span className="text-white/60 text-xs">10-15 min</span>
                    <span className="text-white text-xs">$4.99</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-white font-medium mb-2">Delivery Address</p>
              <div className="bg-[#2a2a2a] rounded-lg p-3 flex items-start">
                <MapPin className="w-5 h-5 text-[#7c57ff] mr-2 mt-0.5" />
                <div>
                  <p className="text-white text-sm">Home</p>
                  <p className="text-white/60 text-xs">123 Main Street, Apt 4B</p>
                  <p className="text-white/60 text-xs">New York, NY 10001</p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div
                className={`p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
                  applyPoints ? "bg-[#7c57ff]/20 border-[#7c57ff]" : "bg-[#2a2a2a] border-[#3f3f3f]"
                }`}
                onClick={() => setApplyPoints(!applyPoints)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <Award className="w-4 h-4 text-[#ffeb3b] mr-2" />
                    <div>
                      <span className="text-white text-sm font-medium">Use 300 Reward Points</span>
                      <p className="text-white/60 text-xs">Get $3.00 off your order</p>
                    </div>
                  </div>
                  {applyPoints && <Check className="w-4 h-4 text-[#aaf163]" />}
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <div className="bg-[#3f3f3f] rounded-full h-1.5 w-32 overflow-hidden">
                    <div className="bg-[#ffeb3b] h-full rounded-full" style={{ width: "75%" }}></div>
                  </div>
                  <span className="text-white/60 text-xs">450 available</span>
                </div>
              </div>
            </div>

            <div className="bg-[#2a2a2a] rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/70 text-sm">Subtotal</span>
                <span className="text-white text-sm">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/70 text-sm">Delivery Fee</span>
                <span className="text-white text-sm">${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#aaf163] text-sm">Discount ({restaurant.discount}%)</span>
                <span className="text-[#aaf163] text-sm">-${discount}</span>
              </div>
              {applyPoints && (
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#ffeb3b] text-sm">Points Discount</span>
                  <span className="text-[#ffeb3b] text-sm">-$3.00</span>
                </div>
              )}
              <div className="border-t border-[#3f3f3f] my-2 pt-2 flex justify-between items-center">
                <span className="text-white font-medium">Total</span>
                <span className="text-white font-bold text-lg">${total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#3f3f3f]/50 shadow-lg mb-6">
          <div className="p-4">
            <h3 className="text-white font-semibold text-lg mb-4">Payment Method</h3>

            <div className="space-y-3">
              {/* Cibus Option */}
              <div
                className={`p-3 rounded-lg border cursor-pointer transition-all duration-300 flex items-center ${
                  selectedPayment === "cibus" ? "bg-[#7c57ff]/20 border-[#7c57ff]" : "bg-[#2a2a2a] border-[#3f3f3f]"
                }`}
                onClick={() => setSelectedPayment("cibus")}
              >
                <div className="w-10 h-6 bg-blue-500 rounded-sm flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white font-bold text-[10px]">Cibus</span>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Cibus</p>
                  <p className="text-white/60 text-xs">Balance: ₪250.00</p>
                </div>
                {selectedPayment === "cibus" && <Check className="w-4 h-4 text-[#aaf163] ml-auto" />}
              </div>

              {/* Ten Bis Option */}
              <div
                className={`p-3 rounded-lg border cursor-pointer transition-all duration-300 flex items-center ${
                  selectedPayment === "tenbis" ? "bg-[#7c57ff]/20 border-[#7c57ff]" : "bg-[#2a2a2a] border-[#3f3f3f]"
                }`}
                onClick={() => setSelectedPayment("tenbis")}
              >
                <div className="w-10 h-6 bg-orange-500 rounded-sm flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white font-bold text-[10px]">10bis</span>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Ten Bis</p>
                  <p className="text-white/60 text-xs">Balance: ₪400.00</p>
                </div>
                {selectedPayment === "tenbis" && <Check className="w-4 h-4 text-[#aaf163] ml-auto" />}
              </div>

              {/* Credit Card Option */}
              <div
                className={`p-3 rounded-lg border cursor-pointer transition-all duration-300 flex items-center ${
                  selectedPayment === "credit_card"
                    ? "bg-[#7c57ff]/20 border-[#7c57ff]"
                    : "bg-[#2a2a2a] border-[#3f3f3f]"
                }`}
                onClick={() => setSelectedPayment("credit_card")}
              >
                <CreditCard className="w-5 h-5 text-[#60a5fa] mr-3" />
                <div>
                  <p className="text-white text-sm">•••• •••• •••• 4242</p>
                  <p className="text-white/60 text-xs">Expires 12/25</p>
                </div>
                {selectedPayment === "credit_card" && <Check className="w-4 h-4 text-[#aaf163] ml-auto" />}
              </div>
            </div>

            <button className="mt-4 w-full bg-[#3f3f3f] hover:bg-[#4a4a4a] text-white/80 text-sm py-2 rounded-lg flex items-center justify-center transition-all duration-300">
              <Plus className="w-4 h-4 mr-2" />
              Add Payment Method
            </button>
          </div>
        </div>

        {/* Place Order Button */}
        <div className="fixed bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-[#121212] to-transparent pt-8 max-w-md mx-auto">
          <button className="w-full bg-gradient-to-r from-[#7c57ff] to-[#aaf163] text-white py-3.5 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:shadow-[#7c57ff]/20">
            Place Order with{" "}
            {
              {
                cibus: "Cibus",
                tenbis: "Ten Bis",
                credit_card: "Card",
              }[selectedPayment]
            }{" "}
            • ${total}
          </button>
        </div>
      </div>
    </main>
  )
}
