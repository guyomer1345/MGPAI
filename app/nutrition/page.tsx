"use client"

import { useState, useRef, useEffect } from "react"
import MobileHeader from "@/components/mobile-header"
import {
  Camera,
  ImageIcon,
  Plus,
  Clock,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Info,
  Zap,
  Droplets,
  Flame,
  ArrowRight,
  Search,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function NutritionPage() {
  const [activeTab, setActiveTab] = useState<"scan" | "history" | "insights">("scan")
  const [scanMode, setScanMode] = useState<"camera" | "gallery" | "search">("camera")
  const [showResults, setShowResults] = useState(false)
  const [showMealDetails, setShowMealDetails] = useState(false)
  const [expandedDay, setExpandedDay] = useState<number | null>(0) // Today is expanded by default
  const videoRef = useRef<HTMLVideoElement>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [cameraAvailable, setCameraAvailable] = useState(true)
  const [cameraError, setCameraError] = useState<string | null>(null)

  // Sample nutrition data
  const nutritionData = {
    calories: {
      consumed: 1850,
      goal: 2200,
      percentage: 84,
    },
    protein: {
      consumed: 135,
      goal: 160,
      unit: "g",
      percentage: 84,
    },
    carbs: {
      consumed: 180,
      goal: 220,
      unit: "g",
      percentage: 82,
    },
    fats: {
      consumed: 55,
      goal: 70,
      unit: "g",
      percentage: 79,
    },
    water: {
      consumed: 1.8,
      goal: 2.5,
      unit: "L",
      percentage: 72,
    },
  }

  // Sample meal history data
  const mealHistory = [
    {
      day: "Today",
      date: "Jan 16",
      meals: [
        {
          id: 1,
          name: "Breakfast",
          time: "08:30 AM",
          image: "/placeholder.svg?height=200&width=300",
          calories: 450,
          protein: 30,
          carbs: 45,
          fats: 15,
          items: ["Oatmeal with berries", "Protein shake", "Black coffee"],
        },
        {
          id: 2,
          name: "Lunch",
          time: "01:15 PM",
          image: "/placeholder.svg?height=200&width=300",
          calories: 650,
          protein: 45,
          carbs: 65,
          fats: 20,
          items: ["Grilled chicken breast", "Brown rice", "Steamed vegetables", "Olive oil"],
        },
        {
          id: 3,
          name: "Snack",
          time: "04:30 PM",
          image: "/placeholder.svg?height=200&width=300",
          calories: 200,
          protein: 15,
          carbs: 20,
          fats: 5,
          items: ["Greek yogurt", "Almonds", "Apple"],
        },
      ],
      totals: {
        calories: 1300,
        protein: 90,
        carbs: 130,
        fats: 40,
        water: 1.5,
      },
    },
    {
      day: "Yesterday",
      date: "Jan 15",
      meals: [
        {
          id: 4,
          name: "Breakfast",
          time: "08:15 AM",
          image: "/placeholder.svg?height=200&width=300",
          calories: 420,
          protein: 25,
          carbs: 50,
          fats: 12,
          items: ["Whole grain toast", "Scrambled eggs", "Avocado"],
        },
        {
          id: 5,
          name: "Lunch",
          time: "12:30 PM",
          image: "/placeholder.svg?height=200&width=300",
          calories: 580,
          protein: 40,
          carbs: 60,
          fats: 18,
          items: ["Salmon fillet", "Quinoa", "Roasted vegetables"],
        },
        {
          id: 6,
          name: "Dinner",
          time: "07:00 PM",
          image: "/placeholder.svg?height=200&width=300",
          calories: 520,
          protein: 35,
          carbs: 45,
          fats: 20,
          items: ["Turkey meatballs", "Whole wheat pasta", "Tomato sauce", "Side salad"],
        },
      ],
      totals: {
        calories: 1520,
        protein: 100,
        carbs: 155,
        fats: 50,
        water: 2.0,
      },
    },
  ]

  // Sample scan result data
  const scanResult = {
    name: "Grilled Chicken Salad",
    image: "/placeholder.svg?height=300&width=400",
    calories: 380,
    protein: 35,
    carbs: 20,
    fats: 18,
    items: [
      { name: "Grilled chicken breast", amount: "150g", calories: 165, protein: 31, carbs: 0, fats: 3.6 },
      { name: "Mixed greens", amount: "100g", calories: 25, protein: 2, carbs: 5, fats: 0 },
      { name: "Cherry tomatoes", amount: "50g", calories: 18, protein: 1, carbs: 4, fats: 0 },
      { name: "Avocado", amount: "50g", calories: 80, protein: 1, carbs: 4, fats: 7.5 },
      { name: "Olive oil dressing", amount: "15ml", calories: 92, protein: 0, carbs: 0, fats: 10 },
    ],
    goalMatch: {
      overall: "Good",
      protein: "Excellent",
      carbs: "Good",
      fats: "Moderate",
    },
    recommendations: [
      "Great protein source for muscle recovery",
      "Consider adding more complex carbs if this is a post-workout meal",
      "Good balance of healthy fats from avocado and olive oil",
    ],
  }

  // Weekly insights data
  const weeklyInsights = {
    averages: {
      calories: 1920,
      protein: 125,
      carbs: 190,
      fats: 60,
      water: 1.9,
    },
    goalCompletion: {
      calories: 87,
      protein: 78,
      carbs: 86,
      fats: 85,
      water: 76,
    },
    trends: {
      calories: [1800, 1950, 2100, 1850, 1920, 1850, 1970],
      protein: [110, 130, 140, 120, 125, 115, 135],
      carbs: [180, 195, 210, 185, 190, 180, 190],
      fats: [55, 65, 70, 55, 60, 55, 60],
    },
    insights: [
      "Your protein intake is consistently high on workout days",
      "Consider increasing water intake, you're averaging below your goal",
      "Your calorie intake is well-balanced throughout the week",
    ],
  }

  // Toggle expanded day
  const toggleDay = (index: number) => {
    setExpandedDay(expandedDay === index ? null : index)
  }

  // Handle camera activation
  useEffect(() => {
    if (scanMode === "camera" && !cameraActive) {
      const enableCamera = async () => {
        try {
          if (videoRef.current) {
            const stream = await navigator.mediaDevices.getUserMedia({
              video: { facingMode: "environment" },
            })
            videoRef.current.srcObject = stream
            setCameraActive(true)
            setCameraError(null)
          }
        } catch (err) {
          console.error("Error accessing camera:", err)
          setCameraAvailable(false)
          if (err instanceof DOMException && err.name === "NotFoundError") {
            setCameraError("Camera not available in this environment")
          } else if (err instanceof DOMException && err.name === "NotAllowedError") {
            setCameraError("Camera access denied. Please allow camera permissions")
          } else {
            setCameraError("Could not access camera")
          }
        }
      }

      enableCamera()
    } else if (scanMode !== "camera" && cameraActive) {
      // Stop camera when switching away from camera mode
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach((track) => track.stop())
        videoRef.current.srcObject = null
        setCameraActive(false)
      }
    }

    return () => {
      // Cleanup camera on component unmount
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [scanMode, cameraActive])

  // Handle scan action
  const handleScan = () => {
    setShowResults(true)
  }

  // Reset scan
  const resetScan = () => {
    setShowResults(false)
    setShowMealDetails(false)
  }

  // Add meal to history
  const addMealToHistory = () => {
    // In a real app, this would add the meal to the user's history
    setShowResults(false)
    setActiveTab("history")
  }

  return (
    <main className="pb-28">
      <MobileHeader showProfile={false} title="Nutrition" />

      {/* Tab Navigation */}
      <div className="mt-4 bg-[#3f3f3f] rounded-full p-1">
        <div className="flex">
          <button
            className={`flex-1 ${activeTab === "scan" ? "bg-[#7c57ff]" : "bg-transparent"} text-white py-2 px-4 rounded-full text-center font-medium text-sm transition-all duration-300`}
            onClick={() => {
              setActiveTab("scan")
              resetScan()
            }}
          >
            Scan Food
          </button>
          <button
            className={`flex-1 ${activeTab === "history" ? "bg-[#7c57ff]" : "bg-transparent"} text-white py-2 px-4 rounded-full text-center font-medium text-sm transition-all duration-300`}
            onClick={() => {
              setActiveTab("history")
              resetScan()
            }}
          >
            History
          </button>
          <button
            className={`flex-1 ${activeTab === "insights" ? "bg-[#7c57ff]" : "bg-transparent"} text-white py-2 px-4 rounded-full text-center font-medium text-sm transition-all duration-300`}
            onClick={() => {
              setActiveTab("insights")
              resetScan()
            }}
          >
            Insights
          </button>
        </div>
      </div>

      {/* Scan Food Tab */}
      {activeTab === "scan" && (
        <div className="mt-6">
          {!showResults ? (
            <>
              {/* Scan Mode Selection */}
              <div className="flex justify-center space-x-4 mb-6">
                <button
                  className={`flex flex-col items-center ${scanMode === "camera" ? "text-[#7c57ff]" : "text-gray-400"}`}
                  onClick={() => setScanMode("camera")}
                >
                  <div
                    className={`w-12 h-12 rounded-full ${scanMode === "camera" ? "bg-[#7c57ff]/20" : "bg-[#3f3f3f]"} flex items-center justify-center mb-1`}
                  >
                    <Camera className="w-6 h-6" />
                  </div>
                  <span className="text-xs">Camera</span>
                </button>
                <button
                  className={`flex flex-col items-center ${scanMode === "gallery" ? "text-[#7c57ff]" : "text-gray-400"}`}
                  onClick={() => setScanMode("gallery")}
                >
                  <div
                    className={`w-12 h-12 rounded-full ${scanMode === "gallery" ? "bg-[#7c57ff]/20" : "bg-[#3f3f3f]"} flex items-center justify-center mb-1`}
                  >
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <span className="text-xs">Gallery</span>
                </button>
                <button
                  className={`flex flex-col items-center ${scanMode === "search" ? "text-[#7c57ff]" : "text-gray-400"}`}
                  onClick={() => setScanMode("search")}
                >
                  <div
                    className={`w-12 h-12 rounded-full ${scanMode === "search" ? "bg-[#7c57ff]/20" : "bg-[#3f3f3f]"} flex items-center justify-center mb-1`}
                  >
                    <Search className="w-6 h-6" />
                  </div>
                  <span className="text-xs">Search</span>
                </button>
              </div>

              {/* Camera View */}
              {scanMode === "camera" && (
                <div className="relative">
                  <div className="aspect-[3/4] bg-black rounded-xl overflow-hidden mb-4">
                    {cameraError ? (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#1a1a1a]">
                        <Camera className="w-16 h-16 text-[#3f3f3f] mb-4" />
                        <p className="text-white/70 text-center mb-2">{cameraError}</p>
                        <p className="text-white/50 text-xs text-center">
                          Try using the gallery or search option instead, or check your device permissions
                        </p>
                      </div>
                    ) : (
                      <>
                        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                        <div className="absolute inset-0 border-2 border-[#7c57ff] rounded-xl pointer-events-none"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-64 h-64 border-2 border-[#aaf163] rounded-lg pointer-events-none"></div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="text-center text-white/70 text-sm mb-6">
                    {cameraError
                      ? "Camera not available - use gallery or search instead"
                      : "Position your food within the green square for best results"}
                  </div>
                </div>
              )}

              {/* Gallery View */}
              {scanMode === "gallery" && (
                <div className="mb-6">
                  <div className="aspect-[3/4] bg-[#1a1a1a] rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-[#3f3f3f] mb-4">
                    <ImageIcon className="w-16 h-16 text-[#3f3f3f] mb-4" />
                    <p className="text-white/70 text-sm mb-2">Tap to select a photo from your gallery</p>
                    <p className="text-white/50 text-xs">JPG, PNG or HEIC</p>
                  </div>
                </div>
              )}

              {/* Search View */}
              {scanMode === "search" && (
                <div className="mb-6">
                  <div className="relative mb-4">
                    <input
                      type="text"
                      placeholder="Search for a food item..."
                      className="w-full bg-[#1a1a1a] text-white rounded-full px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-[#7c57ff] transition-all duration-300"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>

                  <div className="bg-[#1a1a1a] rounded-xl p-4">
                    <h3 className="text-white text-sm font-medium mb-3">Recent Searches</h3>
                    <div className="space-y-3">
                      {["Grilled Chicken Breast", "Greek Yogurt", "Protein Shake", "Salmon Fillet"].map(
                        (item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between py-2 border-b border-[#3f3f3f] last:border-0"
                          >
                            <span className="text-white/80 text-sm">{item}</span>
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Scan Button */}
              <button
                onClick={handleScan}
                className="w-full bg-gradient-to-r from-[#7c57ff] to-[#00c6ff] text-white py-4 rounded-xl flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-[#7c57ff]/30"
              >
                {scanMode === "camera" && cameraError ? (
                  <>
                    <ImageIcon className="w-5 h-5 mr-2" />
                    <span className="font-bold">Use Gallery Instead</span>
                  </>
                ) : (
                  <>
                    <Camera className="w-5 h-5 mr-2" />
                    <span className="font-bold">Scan Food</span>
                  </>
                )}
              </button>

              {/* Recent Scans */}
              <div className="mt-8">
                <h3 className="text-white font-semibold text-lg mb-3">Recent Scans</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "Protein Shake", time: "Today, 10:30 AM", calories: 220, protein: 30 },
                    { name: "Chicken Salad", time: "Yesterday, 1:15 PM", calories: 350, protein: 35 },
                    { name: "Oatmeal", time: "Yesterday, 8:30 AM", calories: 280, protein: 12 },
                    { name: "Protein Bar", time: "Jan 14, 3:45 PM", calories: 200, protein: 20 },
                  ].map((item, index) => (
                    <div key={index} className="bg-[#1a1a1a] rounded-lg overflow-hidden">
                      <div className="h-24 bg-[#3f3f3f] relative">
                        <Image
                          src="/placeholder.svg?height=100&width=150"
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <h4 className="text-white font-medium text-sm">{item.name}</h4>
                        <p className="text-gray-400 text-xs mb-1">{item.time}</p>
                        <div className="flex justify-between text-xs">
                          <span className="text-[#aaf163]">{item.calories} cal</span>
                          <span className="text-[#7c57ff]">{item.protein}g protein</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            // Scan Results View
            <div className="mt-4">
              {!showMealDetails ? (
                <>
                  <div className="bg-[#1a1a1a] rounded-xl overflow-hidden mb-6">
                    <div className="relative h-48">
                      <Image
                        src={scanResult.image || "/placeholder.svg"}
                        alt={scanResult.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h2 className="text-white font-bold text-xl">{scanResult.name}</h2>
                        <div className="flex items-center mt-1">
                          <div className="bg-[#7c57ff]/30 text-[#aaf163] text-xs px-2 py-0.5 rounded-full">
                            {scanResult.goalMatch.overall} Match
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="grid grid-cols-4 gap-2 mb-4">
                        <div className="text-center">
                          <div className="text-[#aaf163] font-bold">{scanResult.calories}</div>
                          <div className="text-white/60 text-xs">calories</div>
                        </div>
                        <div className="text-center">
                          <div className="text-[#7c57ff] font-bold">{scanResult.protein}g</div>
                          <div className="text-white/60 text-xs">protein</div>
                        </div>
                        <div className="text-center">
                          <div className="text-[#60a5fa] font-bold">{scanResult.carbs}g</div>
                          <div className="text-white/60 text-xs">carbs</div>
                        </div>
                        <div className="text-center">
                          <div className="text-[#ff6b6b] font-bold">{scanResult.fats}g</div>
                          <div className="text-white/60 text-xs">fats</div>
                        </div>
                      </div>

                      <button
                        onClick={() => setShowMealDetails(true)}
                        className="w-full bg-[#3f3f3f] hover:bg-[#4a4a4a] text-white py-2 rounded-lg flex items-center justify-center transition-all duration-300 mb-3"
                      >
                        <span className="text-sm">View Detailed Breakdown</span>
                        <ChevronDown className="w-4 h-4 ml-1" />
                      </button>

                      <div className="bg-[#3f3f3f]/30 rounded-lg p-3 mb-4">
                        <h3 className="text-white text-sm font-medium mb-2 flex items-center">
                          <Info className="w-4 h-4 text-[#7c57ff] mr-1" />
                          Analysis
                        </h3>
                        <ul className="space-y-2">
                          {scanResult.recommendations.map((rec, index) => (
                            <li key={index} className="text-white/80 text-xs flex items-start">
                              <Check className="w-3 h-3 text-[#aaf163] mr-1 mt-0.5 flex-shrink-0" />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3 mb-6">
                    <button
                      onClick={resetScan}
                      className="flex-1 bg-[#3f3f3f] text-white py-3 rounded-xl flex items-center justify-center transition-all duration-300"
                    >
                      <X className="w-5 h-5 mr-2" />
                      <span>Cancel</span>
                    </button>
                    <button
                      onClick={addMealToHistory}
                      className="flex-1 bg-gradient-to-r from-[#7c57ff] to-[#00c6ff] text-white py-3 rounded-xl flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-[#7c57ff]/30"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      <span>Add Meal</span>
                    </button>
                  </div>

                  <div className="bg-[#1a1a1a] rounded-xl p-4">
                    <h3 className="text-white font-medium mb-3">Today's Nutrition</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white/80 text-sm">Calories</span>
                          <span className="text-[#aaf163] text-sm">
                            {nutritionData.calories.consumed} / {nutritionData.calories.goal}
                          </span>
                        </div>
                        <div className="h-2 bg-[#3f3f3f] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#aaf163] rounded-full"
                            style={{ width: `${nutritionData.calories.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white/80 text-sm">Protein</span>
                          <span className="text-[#7c57ff] text-sm">
                            {nutritionData.protein.consumed}g / {nutritionData.protein.goal}g
                          </span>
                        </div>
                        <div className="h-2 bg-[#3f3f3f] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#7c57ff] rounded-full"
                            style={{ width: `${nutritionData.protein.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white/80 text-sm">Carbs</span>
                          <span className="text-[#60a5fa] text-sm">
                            {nutritionData.carbs.consumed}g / {nutritionData.carbs.goal}g
                          </span>
                        </div>
                        <div className="h-2 bg-[#3f3f3f] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#60a5fa] rounded-full"
                            style={{ width: `${nutritionData.carbs.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white/80 text-sm">Fats</span>
                          <span className="text-[#ff6b6b] text-sm">
                            {nutritionData.fats.consumed}g / {nutritionData.fats.goal}g
                          </span>
                        </div>
                        <div className="h-2 bg-[#3f3f3f] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#ff6b6b] rounded-full"
                            style={{ width: `${nutritionData.fats.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                // Detailed Meal Breakdown
                <div className="mt-4">
                  <div className="bg-[#1a1a1a] rounded-xl overflow-hidden mb-6">
                    <div className="p-4 border-b border-[#3f3f3f]">
                      <div className="flex justify-between items-center">
                        <h2 className="text-white font-bold text-lg">{scanResult.name}</h2>
                        <button onClick={() => setShowMealDetails(false)} className="text-white/60 hover:text-white">
                          <ChevronUp className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="text-white/60 text-sm">Detailed Nutritional Breakdown</div>
                    </div>

                    <div className="p-4">
                      <div className="grid grid-cols-4 gap-2 mb-4">
                        <div className="text-center">
                          <div className="text-[#aaf163] font-bold">{scanResult.calories}</div>
                          <div className="text-white/60 text-xs">calories</div>
                        </div>
                        <div className="text-center">
                          <div className="text-[#7c57ff] font-bold">{scanResult.protein}g</div>
                          <div className="text-white/60 text-xs">protein</div>
                        </div>
                        <div className="text-center">
                          <div className="text-[#60a5fa] font-bold">{scanResult.carbs}g</div>
                          <div className="text-white/60 text-xs">carbs</div>
                        </div>
                        <div className="text-center">
                          <div className="text-[#ff6b6b] font-bold">{scanResult.fats}g</div>
                          <div className="text-white/60 text-xs">fats</div>
                        </div>
                      </div>

                      <h3 className="text-white font-medium text-sm mb-2">Ingredients</h3>
                      <div className="space-y-3 mb-4">
                        {scanResult.items.map((item, index) => (
                          <div key={index} className="bg-[#3f3f3f]/30 rounded-lg p-3">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-white font-medium text-sm">{item.name}</span>
                              <span className="text-white/60 text-xs">{item.amount}</span>
                            </div>
                            <div className="grid grid-cols-4 gap-1 text-xs">
                              <div>
                                <span className="text-[#aaf163]">{item.calories}</span>
                                <span className="text-white/60"> cal</span>
                              </div>
                              <div>
                                <span className="text-[#7c57ff]">{item.protein}g</span>
                                <span className="text-white/60"> prot</span>
                              </div>
                              <div>
                                <span className="text-[#60a5fa]">{item.carbs}g</span>
                                <span className="text-white/60"> carb</span>
                              </div>
                              <div>
                                <span className="text-[#ff6b6b]">{item.fats}g</span>
                                <span className="text-white/60"> fat</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-[#3f3f3f]/30 rounded-lg p-3 mb-4">
                        <h3 className="text-white text-sm font-medium mb-2 flex items-center">
                          <Info className="w-4 h-4 text-[#7c57ff] mr-1" />
                          Goal Match Analysis
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-white/80 text-xs">Protein</span>
                            <span className="text-[#aaf163] text-xs">{scanResult.goalMatch.protein}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/80 text-xs">Carbs</span>
                            <span className="text-[#aaf163] text-xs">{scanResult.goalMatch.carbs}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/80 text-xs">Fats</span>
                            <span className="text-[#aaf163] text-xs">{scanResult.goalMatch.fats}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3 mb-6">
                    <button
                      onClick={() => setShowMealDetails(false)}
                      className="flex-1 bg-[#3f3f3f] text-white py-3 rounded-xl flex items-center justify-center transition-all duration-300"
                    >
                      <ChevronUp className="w-5 h-5 mr-2" />
                      <span>Back</span>
                    </button>
                    <button
                      onClick={addMealToHistory}
                      className="flex-1 bg-gradient-to-r from-[#7c57ff] to-[#00c6ff] text-white py-3 rounded-xl flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-[#7c57ff]/30"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      <span>Add Meal</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* History Tab */}
      {activeTab === "history" && (
        <div className="mt-6">
          <div className="bg-[#1a1a1a] rounded-xl p-4 mb-6">
            <h3 className="text-white font-medium mb-3">Today's Summary</h3>
            <div className="grid grid-cols-5 gap-2 mb-4">
              <div className="text-center">
                <div className="text-[#aaf163] font-bold text-lg">{nutritionData.calories.consumed}</div>
                <div className="text-white/60 text-xs">calories</div>
              </div>
              <div className="text-center">
                <div className="text-[#7c57ff] font-bold text-lg">{nutritionData.protein.consumed}g</div>
                <div className="text-white/60 text-xs">protein</div>
              </div>
              <div className="text-center">
                <div className="text-[#60a5fa] font-bold text-lg">{nutritionData.carbs.consumed}g</div>
                <div className="text-white/60 text-xs">carbs</div>
              </div>
              <div className="text-center">
                <div className="text-[#ff6b6b] font-bold text-lg">{nutritionData.fats.consumed}g</div>
                <div className="text-white/60 text-xs">fats</div>
              </div>
              <div className="text-center">
                <div className="text-[#00c6ff] font-bold text-lg">{nutritionData.water.consumed}L</div>
                <div className="text-white/60 text-xs">water</div>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white/80 text-xs">Calories</span>
                  <span className="text-[#aaf163] text-xs">
                    {nutritionData.calories.consumed} / {nutritionData.calories.goal}
                  </span>
                </div>
                <div className="h-1.5 bg-[#3f3f3f] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#aaf163] rounded-full"
                    style={{ width: `${nutritionData.calories.percentage}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white/80 text-xs">Protein</span>
                  <span className="text-[#7c57ff] text-xs">
                    {nutritionData.protein.consumed}g / {nutritionData.protein.goal}g
                  </span>
                </div>
                <div className="h-1.5 bg-[#3f3f3f] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#7c57ff] rounded-full"
                    style={{ width: `${nutritionData.protein.percentage}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white/80 text-xs">Water</span>
                  <span className="text-[#00c6ff] text-xs">
                    {nutritionData.water.consumed}L / {nutritionData.water.goal}L
                  </span>
                </div>
                <div className="h-1.5 bg-[#3f3f3f] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#00c6ff] rounded-full"
                    style={{ width: `${nutritionData.water.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {mealHistory.map((day, dayIndex) => (
              <div key={dayIndex} className="bg-[#1a1a1a] rounded-xl overflow-hidden">
                <div
                  className="p-4 border-b border-[#3f3f3f] flex justify-between items-center cursor-pointer"
                  onClick={() => toggleDay(dayIndex)}
                >
                  <div>
                    <h3 className="text-white font-medium">{day.day}</h3>
                    <p className="text-white/60 text-xs">{day.date}</p>
                  </div>
                  <div className="flex items-center">
                    <div className="text-right mr-3">
                      <div className="text-[#aaf163] text-sm font-medium">{day.totals.calories} cal</div>
                      <div className="text-white/60 text-xs">{day.totals.protein}g protein</div>
                    </div>
                    {expandedDay === dayIndex ? (
                      <ChevronUp className="w-5 h-5 text-white/60" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white/60" />
                    )}
                  </div>
                </div>

                {expandedDay === dayIndex && (
                  <div className="p-4">
                    <div className="space-y-4">
                      {day.meals.map((meal, mealIndex) => (
                        <div key={mealIndex} className="bg-[#3f3f3f]/30 rounded-lg overflow-hidden">
                          <div className="flex">
                            <div className="w-24 h-24 relative">
                              <Image
                                src={meal.image || "/placeholder.svg"}
                                alt={meal.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 p-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="text-white font-medium">{meal.name}</h4>
                                  <p className="text-white/60 text-xs flex items-center">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {meal.time}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <div className="text-[#aaf163] text-sm">{meal.calories} cal</div>
                                  <div className="text-[#7c57ff] text-xs">{meal.protein}g protein</div>
                                </div>
                              </div>
                              <div className="mt-2 text-white/80 text-xs">{meal.items.join(", ")}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 grid grid-cols-4 gap-2 bg-[#3f3f3f]/30 rounded-lg p-3">
                      <div className="text-center">
                        <div className="text-[#aaf163] font-medium text-sm">{day.totals.calories}</div>
                        <div className="text-white/60 text-xs">calories</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[#7c57ff] font-medium text-sm">{day.totals.protein}g</div>
                        <div className="text-white/60 text-xs">protein</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[#60a5fa] font-medium text-sm">{day.totals.carbs}g</div>
                        <div className="text-white/60 text-xs">carbs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[#ff6b6b] font-medium text-sm">{day.totals.fats}g</div>
                        <div className="text-white/60 text-xs">fats</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <button className="bg-[#3f3f3f] hover:bg-[#4a4a4a] text-white py-2 px-4 rounded-full text-sm flex items-center transition-all duration-300">
              <span>Load More History</span>
              <ChevronDown className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      )}

      {/* Insights Tab */}
      {activeTab === "insights" && (
        <div className="mt-6">
          <div className="bg-[#1a1a1a] rounded-xl p-4 mb-6">
            <h3 className="text-white font-medium mb-3">Weekly Averages</h3>
            <div className="grid grid-cols-5 gap-2 mb-4">
              <div className="text-center">
                <div className="text-[#aaf163] font-bold text-lg">{weeklyInsights.averages.calories}</div>
                <div className="text-white/60 text-xs">calories</div>
              </div>
              <div className="text-center">
                <div className="text-[#7c57ff] font-bold text-lg">{weeklyInsights.averages.protein}g</div>
                <div className="text-white/60 text-xs">protein</div>
              </div>
              <div className="text-center">
                <div className="text-[#60a5fa] font-bold text-lg">{weeklyInsights.averages.carbs}g</div>
                <div className="text-white/60 text-xs">carbs</div>
              </div>
              <div className="text-center">
                <div className="text-[#ff6b6b] font-bold text-lg">{weeklyInsights.averages.fats}g</div>
                <div className="text-white/60 text-xs">fats</div>
              </div>
              <div className="text-center">
                <div className="text-[#00c6ff] font-bold text-lg">{weeklyInsights.averages.water}L</div>
                <div className="text-white/60 text-xs">water</div>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white/80 text-xs">Goal Completion</span>
                  <span className="text-[#aaf163] text-xs">{weeklyInsights.goalCompletion.calories}%</span>
                </div>
                <div className="h-1.5 bg-[#3f3f3f] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#7c57ff] to-[#00c6ff] rounded-full"
                    style={{ width: `${weeklyInsights.goalCompletion.calories}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a1a] rounded-xl p-4 mb-6">
            <h3 className="text-white font-medium mb-3">Weekly Trends</h3>
            <div className="h-40 bg-[#3f3f3f]/30 rounded-lg p-3 mb-3 flex items-end justify-between">
              {weeklyInsights.trends.calories.map((cal, index) => {
                const height = (cal / 2500) * 100 // Max height based on 2500 calories
                return (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="w-6 bg-gradient-to-t from-[#7c57ff] to-[#00c6ff] rounded-t-sm"
                      style={{ height: `${height}%` }}
                    ></div>
                    <div className="text-white/60 text-xs mt-1">{["M", "T", "W", "T", "F", "S", "S"][index]}</div>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between text-xs text-white/60 mb-4">
              <span>Monday</span>
              <span>Sunday</span>
            </div>

            <div className="space-y-4">
              <div className="bg-[#3f3f3f]/30 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <Flame className="w-4 h-4 text-[#aaf163] mr-2" />
                  <h4 className="text-white font-medium text-sm">Calorie Intake</h4>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/80">Daily Average</span>
                  <span className="text-[#aaf163]">{weeklyInsights.averages.calories} cal</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/80">Goal Completion</span>
                  <span className="text-[#aaf163]">{weeklyInsights.goalCompletion.calories}%</span>
                </div>
              </div>

              <div className="bg-[#3f3f3f]/30 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <Zap className="w-4 h-4 text-[#7c57ff] mr-2" />
                  <h4 className="text-white font-medium text-sm">Protein Intake</h4>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/80">Daily Average</span>
                  <span className="text-[#7c57ff]">{weeklyInsights.averages.protein}g</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/80">Goal Completion</span>
                  <span className="text-[#7c57ff]">{weeklyInsights.goalCompletion.protein}%</span>
                </div>
              </div>

              <div className="bg-[#3f3f3f]/30 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <Droplets className="w-4 h-4 text-[#00c6ff] mr-2" />
                  <h4 className="text-white font-medium text-sm">Water Intake</h4>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/80">Daily Average</span>
                  <span className="text-[#00c6ff]">{weeklyInsights.averages.water}L</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/80">Goal Completion</span>
                  <span className="text-[#00c6ff]">{weeklyInsights.goalCompletion.water}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a1a] rounded-xl p-4 mb-6">
            <h3 className="text-white font-medium mb-3 flex items-center">
              <Info className="w-5 h-5 text-[#7c57ff] mr-2" />
              AI Insights
            </h3>
            <div className="space-y-3">
              {weeklyInsights.insights.map((insight, index) => (
                <div key={index} className="bg-[#3f3f3f]/30 rounded-lg p-3">
                  <p className="text-white/80 text-sm">{insight}</p>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-[#7c57ff] to-[#00c6ff] text-white py-3 rounded-xl flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-[#7c57ff]/30 mb-6">
            <span className="font-bold">Generate Detailed Report</span>
          </button>
        </div>
      )}

      {/* Add Meal Button - Only show in history tab */}
      {activeTab === "history" && (
        <div className="fixed bottom-20 right-4 z-10">
          <Link href="/nutrition?tab=scan">
            <button className="w-14 h-14 rounded-full bg-gradient-to-r from-[#7c57ff] to-[#00c6ff] flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Plus className="w-7 h-7 text-white" />
            </button>
          </Link>
        </div>
      )}
    </main>
  )
}
