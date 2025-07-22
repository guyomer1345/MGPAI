"use client"

import MobileHeader from "@/components/mobile-header"
import {
  Check,
  Zap,
  Trophy,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Activity,
  Dumbbell,
  BarChart2,
  ArrowRight,
  X,
  Heart,
  Users,
  Clock,
  ChevronDown,
  Edit,
  CheckCircle,
  Target,
  Award,
  TrendingUp,
  ChevronUp,
  Info,
  Play,
  Flame,
  LayoutGrid,
  ArrowUpRight,
  Sparkles,
  Star,
  CalendarDays,
  BarChart3,
  Layers,
  Plus,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import WorkoutDayModal from "@/components/workout-day-modal"
import { AnimatePresence, motion } from "framer-motion"
import { useSearchParams, useRouter } from "next/navigation"
import WorkoutCompletionToast from "@/components/workout-completion-toast"

export default function HomePage() {
  const [activeView, setActiveView] = useState<"weekly" | "quarterly">("weekly")
  const [currentMonth, setCurrentMonth] = useState("JANUARY")
  const [currentWeek, setCurrentWeek] = useState(1)
  const [currentQuarter, setCurrentQuarter] = useState(1)
  const [expandedMonth, setExpandedMonth] = useState<number | null>(0) // 0 = January, 1 = February, 2 = March
  const [expandedGoal, setExpandedGoal] = useState<number | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [showStatsPopup, setShowStatsPopup] = useState(false)
  const [showWorkoutModal, setShowWorkoutModal] = useState(false)
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<"overview" | "goals" | "calendar">("overview")
  const [showCompletionToast, setShowCompletionToast] = useState(false)

  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    if (searchParams.get("workout_completed") === "true") {
      setShowCompletionToast(true)
      // Clean the URL to prevent the toast from showing on refresh
      router.replace("/", { scroll: false })
    }
  }, [searchParams, router])

  // Set the background color to be darker
  useEffect(() => {
    if (activeView === "quarterly") {
      document.body.style.backgroundColor = "#121212"
    } else {
      document.body.style.backgroundColor = "#1e1e1e"
    }

    return () => {
      document.body.style.backgroundColor = "#1e1e1e"
    }
  }, [activeView])

  // Days of the week
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  // Generate days of the month
  const days = Array.from({ length: 31 }, (_, i) => i + 1)

  // Quarterly plan data
  const quarterlyData = {
    startDate: "January 1, 2025",
    endDate: "March 31, 2025",
    progress: 15, // percentage of quarter completed
    goals: [
      {
        id: 1,
        title: "Build Muscle Mass",
        description: "Increase overall muscle mass with focus on upper body and core strength.",
        target: "Gain 3-5 lbs of muscle",
        progress: 20,
        icon: Dumbbell,
        color: "#7c57ff",
        metrics: [
          { name: "Weight", current: "165 lbs", target: "170 lbs", progress: 25 },
          { name: "Chest Size", current: "40 in", target: "42 in", progress: 30 },
          { name: "Arm Size", current: "14 in", target: "15 in", progress: 20 },
        ],
      },
      {
        id: 2,
        title: "Improve Endurance",
        description: "Enhance cardiovascular health and stamina through regular cardio sessions.",
        target: "Run 5K without stopping",
        progress: 35,
        icon: Activity,
        color: "#60a5fa",
        metrics: [
          { name: "Max Run Time", current: "15 min", target: "30 min", progress: 50 },
          { name: "Resting Heart Rate", current: "72 bpm", target: "65 bpm", progress: 40 },
          { name: "Recovery Time", current: "3 min", target: "1.5 min", progress: 30 },
        ],
      },
      {
        id: 3,
        title: "Nutrition Optimization",
        description: "Follow a balanced diet with proper macro distribution for optimal results.",
        target: "2200 calories daily with 40% protein",
        progress: 60,
        icon: Heart,
        color: "#ff6b6b",
        metrics: [
          { name: "Daily Protein", current: "120g", target: "160g", progress: 75 },
          { name: "Water Intake", current: "2L", target: "3L", progress: 66 },
          { name: "Meal Consistency", current: "3 meals", target: "5 meals", progress: 60 },
        ],
      },
    ],
    months: [
      {
        name: "January",
        progress: 45,
        focus: "Building Foundation",
        weeks: [
          { number: 1, completed: true, focus: "Intro & Assessment" },
          { number: 2, completed: true, focus: "Form & Technique" },
          { number: 3, completed: false, focus: "Progressive Overload", current: true },
          { number: 4, completed: false, focus: "Recovery Optimization" },
        ],
        highlights: [
          { day: 12, type: "achievement", title: "First chest day completed" },
          { day: 15, type: "milestone", title: "Increased weights by 10%" },
          { day: 16, type: "current", title: "Today's workout" },
        ],
      },
      {
        name: "February",
        progress: 0,
        focus: "Strength Development",
        weeks: [
          { number: 5, completed: false, focus: "Compound Movements" },
          { number: 6, completed: false, focus: "Hypertrophy Training" },
          { number: 7, completed: false, focus: "Power & Explosiveness" },
          { number: 8, completed: false, focus: "Deload Week" },
        ],
        highlights: [
          { day: 5, type: "planned", title: "Fitness assessment" },
          { day: 15, type: "planned", title: "Adjust nutrition plan" },
          { day: 28, type: "planned", title: "Monthly review" },
        ],
      },
      {
        name: "March",
        progress: 0,
        focus: "Performance & Definition",
        weeks: [
          { number: 9, completed: false, focus: "Intensity Increase" },
          { number: 10, completed: false, focus: "Metabolic Conditioning" },
          { number: 11, completed: false, focus: "Peak Performance" },
          { number: 12, completed: false, focus: "Progress Assessment" },
        ],
        highlights: [
          { day: 10, type: "planned", title: "Cardio challenge" },
          { day: 20, type: "planned", title: "Final measurements" },
          { day: 31, type: "planned", title: "Q1 completion" },
        ],
      },
    ],
    milestones: [
      { week: 4, title: "First Month Complete", reward: "Recovery Week", icon: Award },
      { week: 8, title: "Two Months Complete", reward: "Fitness Assessment", icon: Target },
      { week: 12, title: "Quarter Complete", reward: "Program Adjustment", icon: Trophy },
    ],
    keyMetrics: [
      { name: "Workouts Completed", value: "16/48", percentage: 33, icon: CheckCircle, color: "#60a5fa" },
      { name: "Calories Burned", value: "12,450", percentage: 41, icon: Flame, color: "#ff6b6b" },
      { name: "Strength Increase", value: "+15%", percentage: 50, icon: TrendingUp, color: "#aaf163" },
      { name: "Consistency Score", value: "8.5/10", percentage: 85, icon: BarChart3, color: "#ffeb3b" },
    ],
  }

  // Weekly progress data with workout types and icons - exactly 7 workouts
  const weeklyData = [
    {
      day: 12,
      completed: true,
      status: "check",
      name: "Chest Day",
      color: "#60a5fa",
      icon: Dumbbell,
      intensity: "High",
      position: { top: "30px", left: "50%" }, // Top center
      muscleGroups: [
        { name: "Pectoralis", percentage: 70, color: "#60a5fa" },
        { name: "Deltoids", percentage: 20, color: "#7c57ff" },
        { name: "Triceps", percentage: 10, color: "#aaf163" },
      ],
    },
    {
      day: 13,
      completed: true,
      status: "check",
      name: "Leg Day",
      color: "#7c57ff",
      icon: Activity,
      intensity: "Medium",
      position: { top: "100px", left: "30%" }, // Left middle
      muscleGroups: [
        { name: "Quadriceps", percentage: 60, color: "#7c57ff" },
        { name: "Hamstrings", percentage: 25, color: "#60a5fa" },
        { name: "Glutes", percentage: 15, color: "#aaf163" },
      ],
    },
    {
      day: 14,
      completed: true,
      status: "check",
      name: "Rest Day",
      color: "#ff6b6b",
      icon: Clock,
      intensity: "Low",
      position: { top: "170px", left: "50%" }, // Center
      muscleGroups: [{ name: "Rest", percentage: 100, color: "#ff6b6b" }],
    },
    {
      day: 15,
      completed: true,
      status: "check",
      name: "Arm Day",
      color: "#60a5fa",
      icon: Dumbbell,
      intensity: "Medium",
      position: { top: "240px", left: "70%" }, // Right middle
      muscleGroups: [
        { name: "Biceps", percentage: 50, color: "#60a5fa" },
        { name: "Triceps", percentage: 40, color: "#7c57ff" },
        { name: "Forearms", percentage: 10, color: "#aaf163" },
      ],
    },
    {
      day: 16,
      completed: false,
      status: "current",
      name: "Back + Front hand",
      color: "#7c57ff",
      icon: Activity,
      intensity: "High",
      position: { top: "310px", left: "40%" }, // Left lower
      muscleGroups: [
        { name: "Latissimus Dorsi", percentage: 60, color: "#7c57ff" },
        { name: "Rhomboids", percentage: 25, color: "#00c6ff" },
        { name: "Biceps", percentage: 15, color: "#aaf163" },
      ],
    },
    {
      day: 17,
      completed: false,
      status: "upcoming",
      name: "Shoulder Day",
      color: "#60a5fa",
      icon: Dumbbell,
      intensity: "Medium",
      position: { top: "380px", left: "60%" }, // Right lower
      muscleGroups: [
        { name: "Deltoids", percentage: 70, color: "#60a5fa" },
        { name: "Trapezius", percentage: 20, color: "#7c57ff" },
        { name: "Triceps", percentage: 10, color: "#aaf163" },
      ],
    },
    {
      day: 18,
      completed: false,
      status: "upcoming",
      name: "Full Body",
      color: "#ffeb3b",
      icon: Users,
      intensity: "High",
      position: { top: "450px", left: "50%" }, // Bottom center - final workout with reward
      isReward: true,
      muscleGroups: [
        { name: "Quadriceps", percentage: 25, color: "#ffeb3b" },
        { name: "Pectoralis", percentage: 25, color: "#60a5fa" },
        { name: "Latissimus Dorsi", percentage: 25, color: "#7c57ff" },
        { name: "Core", percentage: 25, color: "#aaf163" },
      ],
    },
  ]

  // Next week's data preview
  const nextWeekData = [
    {
      day: 19,
      completed: false,
      status: "upcoming",
      name: "Chest Day",
      color: "#60a5fa",
      icon: Dumbbell,
      intensity: "High",
      position: { top: "550px", left: "30%" }, // First day of next week
      muscleGroups: [
        { name: "Pectoralis", percentage: 70, color: "#60a5fa" },
        { name: "Deltoids", percentage: 20, color: "#7c57ff" },
        { name: "Triceps", percentage: 10, color: "#aaf163" },
      ],
    },
    {
      day: 20,
      completed: false,
      status: "upcoming",
      name: "Leg Day",
      color: "#7c57ff",
      icon: Activity,
      intensity: "Medium",
      position: { top: "620px", left: "50%" }, // Second day of next week
      muscleGroups: [
        { name: "Quadriceps", percentage: 60, color: "#7c57ff" },
        { name: "Hamstrings", percentage: 25, color: "#60a5fa" },
        { name: "Glutes", percentage: 15, color: "#aaf163" },
      ],
    },
    {
      day: 21,
      completed: false,
      status: "upcoming",
      name: "Rest Day",
      color: "#ff6b6b",
      icon: Clock,
      intensity: "Low",
      position: { top: "690px", left: "70%" }, // Third day of next week
      muscleGroups: [{ name: "Rest", percentage: 100, color: "#ff6b6b" }],
    },
  ]

  // Handle scroll to update position for fixed button
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        setScrollPosition(window.scrollY)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Function to navigate between weeks
  const changeWeek = (direction: "prev" | "next") => {
    if (direction === "prev" && currentWeek > 1) {
      setCurrentWeek(currentWeek - 1)
    } else if (direction === "next") {
      setCurrentWeek(currentWeek + 1)
    }
  }

  // Function to navigate between quarters
  const changeQuarter = (direction: "prev" | "next") => {
    if (direction === "prev" && currentQuarter > 1) {
      setCurrentQuarter(currentQuarter - 1)
    } else if (direction === "next") {
      setCurrentQuarter(currentQuarter + 1)
    }
  }

  // Toggle expanded month
  const toggleMonth = (monthIndex: number) => {
    if (expandedMonth === monthIndex) {
      setExpandedMonth(null)
    } else {
      setExpandedMonth(monthIndex)
    }
  }

  // Toggle expanded goal
  const toggleGoal = (goalId: number) => {
    if (expandedGoal === goalId) {
      setExpandedGoal(null)
    } else {
      setExpandedGoal(goalId)
    }
  }

  // Handle workout day click
  const handleWorkoutDayClick = (workout: any) => {
    setSelectedWorkout({
      id: `workout-${workout.day}`,
      name: workout.name,
      date: `January ${workout.day}, 2025`,
      exercises: workout.day % 2 === 0 ? 6 : 5,
      duration: `${workout.day % 2 === 0 ? 45 : 40} min`,
      difficulty: workout.intensity,
      muscleGroups: workout.muscleGroups,
    })
    setShowWorkoutModal(true)
  }

  // Get color for highlight type
  const getHighlightColor = (type: string) => {
    switch (type) {
      case "achievement":
        return "#aaf163"
      case "milestone":
        return "#ffeb3b"
      case "current":
        return "#7c57ff"
      case "planned":
        return "#60a5fa"
      default:
        return "#3f3f3f"
    }
  }

  // Get icon for highlight type
  const getHighlightIcon = (type: string) => {
    switch (type) {
      case "achievement":
        return <CheckCircle className="w-3 h-3" />
      case "milestone":
        return <Trophy className="w-3 h-3" />
      case "current":
        return <Zap className="w-3 h-3" />
      case "planned":
        return <Calendar className="w-3 h-3" />
      default:
        return <Info className="w-3 h-3" />
    }
  }

  return (
    <main className="pt-[120px]">
      {" "}
      {/* Add padding to account for fixed header */}
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-background px-4 pt-4 pb-2 max-w-md mx-auto">
        <MobileHeader />

        <div className="mt-4">
          <div className="bg-gradient-to-r from-[#00c6ff] to-[#7c57ff] rounded-full p-1">
            <div className="flex">
              <button
                className={`flex-1 ${activeView === "weekly" ? "bg-background" : "bg-transparent"} text-white py-2 px-4 rounded-full text-center font-semibold transition-all duration-300`}
                onClick={() => setActiveView("weekly")}
              >
                Weekly Program
              </button>
              <button
                className={`flex-1 ${activeView === "quarterly" ? "bg-background" : "bg-transparent"} text-white py-2 px-4 rounded-full text-center font-semibold transition-all duration-300`}
                onClick={() => setActiveView("quarterly")}
              >
                Quarterly Plan
              </button>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* End of fixed header */}
      <div ref={contentRef} className="overflow-y-auto">
        {activeView === "weekly" ? (
          <div className="mt-4">
            {/* Week Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => changeWeek("prev")}
                className={`flex items-center text-sm ${currentWeek > 1 ? "text-gray-300" : "text-gray-600"}`}
                disabled={currentWeek <= 1}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous Week
              </button>
              <div className="text-white font-medium">Week {currentWeek}</div>
              <button onClick={() => changeWeek("next")} className="flex items-center text-gray-300 text-sm">
                Next Week
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            {/* Compact Program Stats Button */}
            <button
              onClick={() => setShowStatsPopup(true)}
              className="w-full flex items-center justify-between px-2.5 py-1.5 mb-6 bg-[#3f3f3f]/40 rounded-lg transition-all duration-300 hover:bg-[#3f3f3f]/60 active:scale-98"
            >
              <div className="flex items-center">
                <BarChart2 className="w-3.5 h-3.5 text-[#b3a0ff] mr-1.5" />
                <span className="text-white text-xs font-medium">Your Program</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-300 text-[10px] mr-1">View Stats</span>
                <ArrowRight className="w-2.5 h-2.5 text-gray-300" />
              </div>
            </button>

            {/* Stats Popup */}
            {showStatsPopup && (
              <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                <div className="bg-[#212121] rounded-xl w-full max-w-sm shadow-2xl border border-[#3f3f3f] overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b border-[#3f3f3f]">
                    <h3 className="text-white font-bold text-lg">Your Program Stats</h3>
                    <button
                      onClick={() => setShowStatsPopup(false)}
                      className="w-8 h-8 rounded-full bg-[#3f3f3f]/50 flex items-center justify-center hover:bg-[#3f3f3f] transition-colors"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-[#3f3f3f]/50 rounded-lg p-3 text-center">
                        <div className="flex justify-center mb-2">
                          <Dumbbell className="w-6 h-6 text-[#60a5fa]" />
                        </div>
                        <p className="text-gray-300 text-xs">Workouts</p>
                        <p className="text-white text-xl font-bold">4/7</p>
                        <p className="text-[#aaf163] text-xs mt-1">57% Complete</p>
                      </div>
                      <div className="bg-[#3f3f3f]/50 rounded-lg p-3 text-center">
                        <div className="flex justify-center mb-2">
                          <Activity className="w-6 h-6 text-[#7c57ff]" />
                        </div>
                        <p className="text-gray-300 text-xs">Calories</p>
                        <p className="text-white text-xl font-bold">2,450</p>
                        <p className="text-[#aaf163] text-xs mt-1">+320 from last week</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[#3f3f3f]/50 rounded-lg p-3 text-center">
                        <div className="flex justify-center mb-2">
                          <Calendar className="w-6 h-6 text-[#aaf163]" />
                        </div>
                        <p className="text-gray-300 text-xs">Time</p>
                        <p className="text-white text-xl font-bold">3.5h</p>
                        <p className="text-[#aaf163] text-xs mt-1">42 min per workout</p>
                      </div>
                      <div className="bg-[#3f3f3f]/50 rounded-lg p-3 text-center">
                        <div className="flex justify-center mb-2">
                          <Heart className="w-6 h-6 text-[#ff6b6b]" />
                        </div>
                        <p className="text-gray-300 text-xs">Intensity</p>
                        <p className="text-white text-xl font-bold">Medium</p>
                        <p className="text-[#aaf163] text-xs mt-1">Good progress</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowStatsPopup(false)}
                      className="w-full mt-6 bg-gradient-to-r from-[#7c57ff] to-[#00c6ff] text-white py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#7c57ff]/20"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Dynamic flowing path - adjusted for 7 workouts plus next week preview */}
            <div className="relative px-4 mb-8 mt-4">
              {/* Container for the path and circles */}
              <div className="relative h-[750px]">
                {/* SVG Path - extended to include next week preview */}
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 100 750"
                  preserveAspectRatio="none"
                  className="absolute inset-0"
                >
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>

                  {/* Current week path */}
                  <path
                    d="M50,30 
                     C50,30 30,60 30,100 
                     S50,140 50,170 
                     S70,200 70,240 
                     S40,280 40,310 
                     S60,340 60,380 
                     S50,410 50,450"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="8 5"
                    filter="url(#glow)"
                  />

                  {/* Week transition indicator */}
                  <path
                    d="M50,450 
                     C50,450 50,470 50,490"
                    stroke="url(#weekTransition)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="3 8"
                    filter="url(#glow)"
                  />

                  {/* Next week path */}
                  <path
                    d="M50,490 
                     C50,490 30,520 30,550 
                     S50,580 50,620 
                     S70,660 70,690"
                    stroke="url(#nextWeekGradient)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="8 5"
                    strokeOpacity="0.6"
                    filter="url(#glow)"
                  />

                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="50%" stopColor="#7c57ff" />
                      <stop offset="100%" stopColor="#ffeb3b" />
                    </linearGradient>
                    <linearGradient id="weekTransition" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffeb3b" />
                      <stop offset="100%" stopColor="#60a5fa" />
                    </linearGradient>
                    <linearGradient id="nextWeekGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="50%" stopColor="#7c57ff" />
                      <stop offset="100%" stopColor="#aaf163" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Week transition indicator */}
                <div className="absolute" style={{ top: "490px", left: "50%", transform: "translate(-50%, -50%)" }}>
                  <div className="bg-[#3f3f3f]/50 px-4 py-1.5 rounded-full border border-[#3f3f3f] flex items-center">
                    <Calendar className="w-4 h-4 text-[#ffeb3b] mr-1.5" />
                    <span className="text-white text-xs font-medium">Next Week</span>
                  </div>
                </div>

                {/* Workout day circles positioned along the path */}
                {weeklyData.map((item, index) => {
                  const isLeft = index % 2 === 0
                  const Icon = item.icon
                  const isCurrent = item.day === 16

                  return (
                    <div
                      key={item.day}
                      className="absolute"
                      style={{
                        top: item.position.top,
                        left: item.position.left,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <div className="relative">
                        {/* Modern circle with clean outline and shadow */}
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 relative cursor-pointer
${
  item.isReward
    ? "hover:shadow-[0_0_15px_rgba(255,215,0,0.5)]"
    : item.status === "current"
      ? "hover:shadow-[0_0_15px_rgba(124,87,255,0.5)]"
      : item.completed
        ? "hover:shadow-[0_0_15px_rgba(96,165,250,0.5)]"
        : "hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
}`}
                          style={{
                            background: item.isReward
                              ? "radial-gradient(circle at 30% 30%, #ffd700, #ff9d00)"
                              : item.status === "current"
                                ? "linear-gradient(135deg, #7c57ff, #00c6ff)"
                                : item.completed
                                  ? "linear-gradient(135deg, #60a5fa, #3b82f6)"
                                  : "linear-gradient(135deg, #3f3f3f, #2a2a2a)",
                            border: item.isReward
                              ? "2px solid rgba(255, 215, 0, 0.6)"
                              : "2px solid rgba(255, 255, 255, 0.1)",
                            boxShadow: item.isReward
                              ? "0 4px 12px rgba(255, 215, 0, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.3)"
                              : item.status === "current"
                                ? "0 4px 15px rgba(124, 87, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)"
                                : item.completed
                                  ? "0 4px 15px rgba(96, 165, 250, 0.2), 0 1px 2px rgba(0, 0, 0, 0.2)"
                                  : "0 4px 10px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)",
                            transform: "translateZ(0)", // Force GPU acceleration
                          }}
                          onClick={() => handleWorkoutDayClick(item)}
                        >
                          {/* Workout type icon */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-10">
                            <Icon className="w-8 h-8 text-white" />
                          </div>

                          {/* Day number */}
                          <span
                            className={`font-bold text-xl relative z-10 ${item.isReward ? "text-black" : "text-white"}`}
                          >
                            {item.day}
                          </span>
                        </div>

                        {/* Remove the Preview Button */}

                        {/* Status indicator with clean design */}
                        <div className="absolute -bottom-1 -right-1">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center border border-background`}
                            style={{
                              background: item.isReward
                                ? "radial-gradient(circle at 30% 30%, #ffd700, #ff9d00)"
                                : item.status === "current"
                                  ? "linear-gradient(135deg, #7c57ff, #00c6ff)"
                                  : item.completed
                                    ? "linear-gradient(135deg, #60a5fa, #3b82f6)"
                                    : "linear-gradient(135deg, #3f3f3f, #2a2a2a)",
                              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                            }}
                          >
                            {item.isReward ? (
                              <Trophy className="w-4 h-4 text-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]" />
                            ) : item.completed ? (
                              <Check className="w-4 h-4 text-white" />
                            ) : item.status === "current" ? (
                              <Zap className="w-4 h-4 text-white" />
                            ) : (
                              <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                            )}
                          </div>
                        </div>

                        {/* Only add Start Workout button for Circle 16 (current day) */}
                        {item.day === 16 && (
                          <Link href="/workout" className="absolute top-1/2 left-full transform -translate-y-1/2 ml-3">
                            <button className="bg-gradient-to-r from-[#7c57ff] to-[#00c6ff] text-white py-1.5 px-3 rounded-lg flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-[#7c57ff]/30 text-sm whitespace-nowrap">
                              <Play className="w-3.5 h-3.5 mr-1.5 text-white" fill="currentColor" />
                              <span className="font-medium">Start Workout</span>
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>
                  )
                })}

                {/* Next week preview circles */}
                {nextWeekData.map((item, index) => {
                  const isLeft = index % 2 === 0
                  const Icon = item.icon

                  return (
                    <div
                      key={item.day}
                      className="absolute"
                      style={{
                        top: item.position.top,
                        left: item.position.left,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <div className="relative">
                        {/* Next week circle with faded appearance */}
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 relative hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] cursor-pointer"
                          style={{
                            background: "linear-gradient(135deg, #3f3f3f, #2a2a2a)",
                            border: "2px solid rgba(255, 255, 255, 0.05)",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.2)",
                            opacity: 0.7,
                          }}
                          onClick={() => handleWorkoutDayClick(item)}
                        >
                          {/* Workout type icon */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-10">
                            <Icon className="w-7 h-7 text-white" />
                          </div>

                          {/* Day number */}
                          <span className="font-bold text-lg relative z-10 text-white">{item.day}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}

                {/* View more next week indicator */}
                <div className="absolute" style={{ top: "730px", left: "50%", transform: "translate(-50%, -50%)" }}>
                  <button className="bg-[#3f3f3f]/30 hover:bg-[#3f3f3f]/50 px-4 py-2 rounded-full border border-[#3f3f3f]/50 flex items-center transition-all duration-300">
                    <span className="text-gray-300 text-sm mr-2">View Full Next Week</span>
                    <ChevronDown className="w-4 h-4 text-gray-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6">
            {/* Quarterly Plan View - Enhanced Version */}
            <div className="mb-6">
              {/* Quarter Navigation */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => changeQuarter("prev")}
                  className={`flex items-center text-sm ${currentQuarter > 1 ? "text-gray-300" : "text-gray-600"}`}
                  disabled={currentQuarter <= 1}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous Quarter
                </button>
                <motion.div
                  className="text-white font-medium flex items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Sparkles className="w-4 h-4 mr-1 text-[#ffeb3b]" />
                  <span>Q{currentQuarter} 2025</span>
                </motion.div>
                <button onClick={() => changeQuarter("next")} className="flex items-center text-gray-300 text-sm">
                  Next Quarter
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              {/* Quarter Header Card - Enhanced with animations */}
              <motion.div
                className="bg-gradient-to-r from-[#00c6ff] to-[#7c57ff] rounded-xl p-4 shadow-lg mb-6 cursor-pointer hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                onClick={() => {
                  // Expand the current month (January = 0)
                  setExpandedMonth(expandedMonth === 0 ? null : 0)
                  // Scroll to monthly breakdown section
                  document.getElementById("monthly-breakdown")?.scrollIntoView({ behavior: "smooth", block: "start" })
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Animated background particles */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-white/20"
                      initial={{
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%",
                        opacity: 0.2 + Math.random() * 0.3,
                      }}
                      animate={{
                        x: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
                        y: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
                        opacity: [0.2, 0.5, 0.2],
                      }}
                      transition={{
                        duration: 10 + Math.random() * 20,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    />
                  ))}
                </div>

                <div className="flex justify-between items-center mb-2 relative z-10">
                  <motion.h2
                    className="text-white font-bold text-xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    Q1 2025 Plan
                  </motion.h2>
                  <motion.div
                    className="bg-white/20 rounded-full px-3 py-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <span className="text-white text-sm font-medium">
                      {quarterlyData.startDate} - {quarterlyData.endDate}
                    </span>
                  </motion.div>
                </div>

                <motion.div
                  className="mb-2 relative z-10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white/80 text-sm">Quarter Progress</span>
                    <span className="text-white text-sm font-medium">{quarterlyData.progress}%</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#aaf163] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${quarterlyData.progress}%` }}
                      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>

                <div className="flex justify-between items-center relative z-10">
                  <motion.div
                    className="flex items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Calendar className="w-4 h-4 text-white/80 mr-1" />
                    <span className="text-white/80 text-xs">Week 3 of 12</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <Target className="w-4 h-4 text-white/80 mr-1" />
                    <span className="text-white/80 text-xs">3 Main Goals</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <ChevronDown className="w-4 h-4 text-white/80 ml-1" />
                    <span className="text-white/80 text-xs mr-1">Tap to view months</span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Navigation Tabs */}
              <div className="mb-6">
                <div className="flex bg-[#1a1a1a] rounded-lg p-1">
                  <button
                    className={`flex-1 py-2 px-3 rounded-md flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      activeTab === "overview" ? "bg-[#3f3f3f] text-white" : "text-gray-400 hover:text-gray-300"
                    }`}
                    onClick={() => setActiveTab("overview")}
                  >
                    <LayoutGrid className="w-4 h-4 mr-1.5" />
                    Overview
                  </button>
                  <button
                    className={`flex-1 py-2 px-3 rounded-md flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      activeTab === "goals" ? "bg-[#3f3f3f] text-white" : "text-gray-400 hover:text-gray-300"
                    }`}
                    onClick={() => setActiveTab("goals")}
                  >
                    <Target className="w-4 h-4 mr-1.5" />
                    Goals
                  </button>
                  <button
                    className={`flex-1 py-2 px-3 rounded-md flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      activeTab === "calendar" ? "bg-[#3f3f3f] text-white" : "text-gray-400 hover:text-gray-300"
                    }`}
                    onClick={() => setActiveTab("calendar")}
                  >
                    <CalendarDays className="w-4 h-4 mr-1.5" />
                    Calendar
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Key Metrics Section */}
                    <div className="mb-6">
                      <h3 className="text-white font-semibold text-lg mb-3 flex items-center">
                        <BarChart3 className="w-5 h-5 text-[#60a5fa] mr-2" />
                        Key Metrics
                      </h3>

                      <div className="grid grid-cols-2 gap-3">
                        {quarterlyData.keyMetrics.map((metric, index) => {
                          const Icon = metric.icon
                          return (
                            <motion.div
                              key={metric.name}
                              className="bg-[#1a1a1a] rounded-xl p-3 border border-[#3f3f3f]/50"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              whileHover={{ scale: 1.03, borderColor: metric.color }}
                            >
                              <div className="flex items-center mb-2">
                                <div
                                  className="w-8 h-8 rounded-full flex items-center justify-center mr-2"
                                  style={{ backgroundColor: `${metric.color}20` }}
                                >
                                  <Icon className="w-4 h-4" style={{ color: metric.color }} />
                                </div>
                                <div>
                                  <h4 className="text-white text-xs">{metric.name}</h4>
                                  <p className="text-white font-bold text-lg">{metric.value}</p>
                                </div>
                              </div>
                              <div className="h-1.5 bg-[#3f3f3f] rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full rounded-full"
                                  style={{ backgroundColor: metric.color }}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${metric.percentage}%` }}
                                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                />
                              </div>
                            </motion.div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Current Week Highlight */}
                    <div className="mb-6">
                      <h3 className="text-white font-semibold text-lg mb-3 flex items-center">
                        <Zap className="w-5 h-5 text-[#aaf163] mr-2" />
                        Current Week
                      </h3>

                      <motion.div
                        className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] rounded-xl p-4 border border-[#3f3f3f]/50 relative overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        {/* Animated accent */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7c57ff] to-[#00c6ff]"></div>

                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="text-white font-medium">Week 3: Progressive Overload</h4>
                            <p className="text-white/60 text-xs">January 15 - January 21</p>
                          </div>
                          <div className="bg-[#7c57ff]/20 rounded-full px-2 py-0.5 flex items-center">
                            <Zap className="w-3 h-3 text-[#7c57ff] mr-1" />
                            <span className="text-[#7c57ff] text-xs">Current</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-[#3f3f3f] flex items-center justify-center mr-2">
                              <Dumbbell className="w-4 h-4 text-[#60a5fa]" />
                            </div>
                            <div>
                              <p className="text-white/60 text-xs">Workouts</p>
                              <p className="text-white font-medium">4/7 Completed</p>
                            </div>
                          </div>
                          <Link href="/" className="text-[#7c57ff] text-xs flex items-center">
                            View Weekly Plan
                            <ArrowUpRight className="w-3 h-3 ml-1" />
                          </Link>
                        </div>

                        <div className="bg-[#1a1a1a] rounded-lg p-3">
                          <h5 className="text-white text-sm font-medium mb-2">Today's Workout</h5>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#7c57ff] to-[#00c6ff] flex items-center justify-center mr-3">
                                <Activity className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="text-white font-medium">Back + Front hand</p>
                                <p className="text-white/60 text-xs">High intensity • 45 min</p>
                              </div>
                            </div>
                            <Link href="/workout">
                              <button className="bg-[#7c57ff] hover:bg-[#6744e0] text-white text-xs py-1.5 px-3 rounded-lg flex items-center transition-all duration-300">
                                <Play className="w-3 h-3 mr-1" fill="currentColor" />
                                Start
                              </button>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Upcoming Milestones */}
                    <div className="mb-6">
                      <h3 className="text-white font-semibold text-lg mb-3 flex items-center">
                        <Trophy className="w-5 h-5 text-[#ffeb3b] mr-2" />
                        Upcoming Milestones
                      </h3>

                      <div className="space-y-3">
                        {quarterlyData.milestones.map((milestone, index) => (
                          <motion.div
                            key={milestone.week}
                            className="bg-[#1a1a1a] rounded-xl p-3 border border-[#3f3f3f]/50 flex items-center"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, borderColor: "#ffeb3b" }}
                          >
                            <div className="w-10 h-10 rounded-full bg-[#ffeb3b]/10 flex items-center justify-center mr-3 flex-shrink-0">
                              <milestone.icon className="w-5 h-5 text-[#ffeb3b]" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-white font-medium text-sm">{milestone.title}</h4>
                              <div className="flex justify-between items-center">
                                <p className="text-white/60 text-xs">Week {milestone.week}</p>
                                <div className="bg-[#3f3f3f] rounded-full px-2 py-0.5">
                                  <p className="text-white/80 text-xs">{milestone.reward}</p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Help Section - Enhanced */}
                    <div className="mb-8">
                      <motion.div
                        className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] rounded-xl overflow-hidden border border-[#3f3f3f] relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#7c57ff]/10 rounded-full -translate-x-5 -translate-y-10 blur-xl"></div>
                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#00c6ff]/10 rounded-full translate-x-3 translate-y-5 blur-lg"></div>

                        <div className="p-4 relative z-10">
                          <div className="flex items-start">
                            <div className="w-12 h-12 rounded-full bg-[#7c57ff]/20 flex items-center justify-center mr-4 flex-shrink-0">
                              <Info className="w-6 h-6 text-[#7c57ff]" />
                            </div>
                            <div>
                              <h4 className="text-white font-medium mb-1">Need Help With Your Plan?</h4>
                              <p className="text-white/60 text-sm mb-3">
                                Our AI assistant can help you adjust your quarterly goals or create a custom plan based
                                on your progress.
                              </p>
                              <Link href="/assistant">
                                <motion.button
                                  className="bg-gradient-to-r from-[#7c57ff] to-[#00c6ff] text-white text-sm py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#7c57ff]/20"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  Talk to Assistant
                                </motion.button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "goals" && (
                  <motion.div
                    key="goals"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Quarterly Goals Section - Enhanced */}
                    <div className="mb-6">
                      <h3 className="text-white font-semibold text-lg mb-3 flex items-center">
                        <Target className="w-5 h-5 text-[#7c57ff] mr-2" />
                        Quarterly Goals
                      </h3>

                      <div className="space-y-4">
                        {quarterlyData.goals.map((goal, goalIndex) => {
                          const Icon = goal.icon
                          const isExpanded = expandedGoal === goal.id

                          return (
                            <motion.div
                              key={goal.id}
                              className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-md transition-all duration-300 border border-[#3f3f3f]/50"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: goalIndex * 0.1 }}
                              whileHover={{ scale: 1.02, borderColor: goal.color }}
                            >
                              <div
                                className="p-4 cursor-pointer hover:bg-[#2a2a2a]"
                                onClick={() => toggleGoal(goal.id)}
                              >
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    <div
                                      className="w-12 h-12 rounded-full flex items-center justify-center mr-3"
                                      style={{ backgroundColor: `${goal.color}20` }}
                                    >
                                      <Icon className="w-6 h-6" style={{ color: goal.color }} />
                                    </div>
                                    <div>
                                      <h4 className="text-white font-medium">{goal.title}</h4>
                                      <div className="flex items-center mt-1">
                                        <div className="w-24 h-2 bg-[#3f3f3f] rounded-full overflow-hidden mr-2">
                                          <motion.div
                                            className="h-full rounded-full"
                                            style={{ backgroundColor: goal.color }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${goal.progress}%` }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                          />
                                        </div>
                                        <span className="text-white/60 text-xs">{goal.progress}%</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    {isExpanded ? (
                                      <ChevronUp className="w-5 h-5 text-white/60" />
                                    ) : (
                                      <ChevronDown className="w-5 h-5 text-white/60" />
                                    )}
                                  </div>
                                </div>
                              </div>

                              {isExpanded && (
                                <motion.div
                                  className="px-4 pb-4 pt-1"
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <div className="bg-[#2a2a2a] rounded-lg p-3 mb-3">
                                    <p className="text-white/80 text-sm">{goal.description}</p>
                                  </div>

                                  <div className="flex items-center mb-3">
                                    <TrendingUp className="w-4 h-4 text-[#aaf163] mr-2" />
                                    <span className="text-[#aaf163] text-sm font-medium">Target: {goal.target}</span>
                                  </div>

                                  {/* Metrics */}
                                  <div className="space-y-3 mb-4">
                                    {goal.metrics.map((metric, index) => (
                                      <div key={index} className="bg-[#1a1a1a] rounded-lg p-2">
                                        <div className="flex justify-between items-center mb-1">
                                          <span className="text-white text-xs">{metric.name}</span>
                                          <div className="flex items-center">
                                            <span className="text-white/60 text-xs mr-2">{metric.current}</span>
                                            <ArrowRight className="w-3 h-3 text-white/40 mr-2" />
                                            <span className="text-[#aaf163] text-xs">{metric.target}</span>
                                          </div>
                                        </div>
                                        <div className="h-1.5 bg-[#3f3f3f] rounded-full overflow-hidden">
                                          <motion.div
                                            className="h-full rounded-full"
                                            style={{ backgroundColor: goal.color }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${metric.progress}%` }}
                                            transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                                          />
                                        </div>
                                      </div>
                                    ))}
                                  </div>

                                  <div className="flex justify-end">
                                    <motion.button
                                      className="bg-[#3f3f3f] hover:bg-[#4a4a4a] text-white/80 text-xs px-3 py-1.5 rounded-full flex items-center transition-all duration-300"
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <Edit className="w-3 h-3 mr-1" />
                                      Update Progress
                                    </motion.button>
                                  </div>
                                </motion.div>
                              )}
                            </motion.div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Add Goal Button */}
                    <div className="mb-6">
                      <motion.button
                        className="w-full bg-[#3f3f3f] hover:bg-[#4a4a4a] text-white py-3 rounded-lg flex items-center justify-center transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        <span>Add New Goal</span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {activeTab === "calendar" && (
                  <motion.div
                    key="calendar"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Monthly Breakdown Section - Enhanced */}
                    <div className="mb-6" id="monthly-breakdown">
                      <h3 className="text-white font-semibold text-lg mb-3 flex items-center">
                        <Calendar className="w-5 h-5 text-[#60a5fa] mr-2" />
                        Monthly Breakdown
                      </h3>

                      <div className="space-y-4">
                        {quarterlyData.months.map((month, index) => {
                          const isExpanded = expandedMonth === index
                          const isCurrentMonth = index === 0 // January is current month

                          return (
                            <motion.div
                              key={month.name}
                              className={`bg-[#1a1a1a] rounded-xl overflow-hidden shadow-md transition-all duration-300 ${
                                isCurrentMonth ? "border border-[#7c57ff]/50" : "border border-[#3f3f3f]/30"
                              }`}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              whileHover={{ scale: 1.02 }}
                            >
                              <div className="p-4 cursor-pointer hover:bg-[#2a2a2a]" onClick={() => toggleMonth(index)}>
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    <div
                                      className={`w-12 h-12 rounded-full flex items-center justify-center mr-3 ${
                                        isCurrentMonth ? "bg-[#7c57ff]/20" : "bg-[#3f3f3f]/50"
                                      }`}
                                    >
                                      <span
                                        className={`text-lg font-bold ${isCurrentMonth ? "text-[#7c57ff]" : "text-white/60"}`}
                                      >
                                        {month.name.substring(0, 1)}
                                      </span>
                                    </div>
                                    <div>
                                      <h4 className="text-white font-medium">{month.name}</h4>
                                      <p className="text-white/60 text-xs">{month.focus}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center">
                                    {isCurrentMonth && (
                                      <motion.span
                                        className="bg-[#7c57ff] text-white text-xs px-2 py-0.5 rounded-full mr-2"
                                        animate={{
                                          scale: [1, 1.05, 1],
                                          boxShadow: [
                                            "0 0 0px rgba(124, 87, 255, 0.3)",
                                            "0 0 10px rgba(124, 87, 255, 0.5)",
                                            "0 0 0px rgba(124, 87, 255, 0.3)",
                                          ],
                                        }}
                                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                      >
                                        Current
                                      </motion.span>
                                    )}
                                    {isExpanded ? (
                                      <ChevronUp className="w-5 h-5 text-white/60" />
                                    ) : (
                                      <ChevronDown className="w-5 h-5 text-white/60" />
                                    )}
                                  </div>
                                </div>

                                <div className="mt-2">
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-white/60 text-xs">Progress</span>
                                    <span className="text-white/80 text-xs">{month.progress}%</span>
                                  </div>
                                  <div className="h-1.5 bg-[#3f3f3f] rounded-full overflow-hidden">
                                    <motion.div
                                      className="h-full bg-[#60a5fa] rounded-full"
                                      initial={{ width: 0 }}
                                      animate={{ width: `${month.progress}%` }}
                                      transition={{ duration: 1, delay: 0.5 }}
                                    />
                                  </div>
                                </div>
                              </div>

                              {isExpanded && (
                                <motion.div
                                  className="px-4 pb-4"
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  {/* Weekly breakdown */}
                                  <div className="grid grid-cols-2 gap-3 mb-4">
                                    {month.weeks.map((week) => (
                                      <motion.div
                                        key={week.number}
                                        className={`p-3 rounded-lg ${
                                          week.current
                                            ? "bg-[#7c57ff]/20 border border-[#7c57ff]/30"
                                            : week.completed
                                              ? "bg-[#60a5fa]/10 border border-[#60a5fa]/20"
                                              : "bg-[#2a2a2a] border border-[#3f3f3f]/30"
                                        }`}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3, delay: week.number * 0.05 }}
                                        whileHover={{ scale: 1.03 }}
                                      >
                                        <div className="flex justify-between items-center mb-1">
                                          <span
                                            className={`text-sm font-medium ${
                                              week.current
                                                ? "text-[#aaf163]"
                                                : week.completed
                                                  ? "text-white"
                                                  : "text-white/60"
                                            }`}
                                          >
                                            Week {week.number}
                                          </span>
                                          {week.completed && <CheckCircle className="w-4 h-4 text-[#60a5fa]" />}
                                          {week.current && <Zap className="w-4 h-4 text-[#aaf163]" />}
                                        </div>
                                        <p className="text-white/80 text-xs">{week.focus}</p>

                                        {week.current && (
                                          <Link href="/">
                                            <motion.button
                                              className="mt-2 w-full bg-[#7c57ff]/30 hover:bg-[#7c57ff]/50 text-white text-xs py-1 rounded-md transition-all duration-300"
                                              whileHover={{ scale: 1.05 }}
                                              whileTap={{ scale: 0.95 }}
                                            >
                                              View Current Week
                                            </motion.button>
                                          </Link>
                                        )}
                                      </motion.div>
                                    ))}
                                  </div>

                                  {/* Month Highlights */}
                                  <div className="mb-4">
                                    <h5 className="text-white font-medium text-sm mb-2 flex items-center">
                                      <Star className="w-4 h-4 text-[#ffeb3b] mr-1.5" />
                                      Month Highlights
                                    </h5>
                                    <div className="bg-[#2a2a2a] rounded-lg p-3">
                                      <div className="space-y-2">
                                        {month.highlights.map((highlight, idx) => (
                                          <div key={idx} className="flex items-center">
                                            <div
                                              className="w-5 h-5 rounded-full flex items-center justify-center mr-2"
                                              style={{ backgroundColor: getHighlightColor(highlight.type) }}
                                            >
                                              {getHighlightIcon(highlight.type)}
                                            </div>
                                            <span className="text-white/80 text-xs mr-2">Day {highlight.day}:</span>
                                            <span className="text-white text-xs">{highlight.title}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Full Month Calendar View */}
                                  <div className="bg-[#2a2a2a] rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-4">
                                      <h4 className="text-white font-medium">{month.name} 2025</h4>
                                      <motion.button
                                        className="bg-[#3f3f3f] hover:bg-[#4a4a4a] text-white/80 text-xs px-2 py-1 rounded-full flex items-center"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                      >
                                        <Layers className="w-3 h-3 mr-1" />
                                        <span>Full View</span>
                                      </motion.button>
                                    </div>

                                    <div className="grid grid-cols-7 gap-2 mb-2">
                                      {daysOfWeek.map((day) => (
                                        <div key={day} className="text-center text-[#60a5fa] text-xs font-medium">
                                          {day}
                                        </div>
                                      ))}
                                    </div>

                                    <div className="grid grid-cols-7 gap-1">
                                      {/* Generate days for the month */}
                                      {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                                        const isWorkoutDay = [
                                          12, 13, 15, 16, 17, 18, 19, 22, 23, 25, 26, 29, 30,
                                        ].includes(day)
                                        const isCurrentDay = day === 16
                                        const isCompleted = day < 16
                                        const highlight = month.highlights.find((h) => h.day === day)

                                        return (
                                          <motion.div
                                            key={day}
                                            className="flex justify-center py-1"
                                            whileHover={{ scale: 1.1 }}
                                          >
                                            <div
                                              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs
                                              ${
                                                isCurrentDay
                                                  ? "bg-[#7c57ff] text-white"
                                                  : isWorkoutDay
                                                    ? isCompleted
                                                      ? "bg-[#60a5fa]/20 text-white"
                                                      : "bg-[#3f3f3f] text-white/80"
                                                    : "text-white/40"
                                              } ${highlight ? "ring-2" : ""}`}
                                              style={highlight ? { ringColor: getHighlightColor(highlight.type) } : {}}
                                            >
                                              {day}
                                            </div>
                                          </motion.div>
                                        )
                                      })}
                                    </div>

                                    <div className="mt-3 flex justify-between text-xs">
                                      <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full bg-[#7c57ff] mr-1"></div>
                                        <span className="text-white/60">Current</span>
                                      </div>
                                      <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full bg-[#60a5fa]/20 mr-1"></div>
                                        <span className="text-white/60">Completed</span>
                                      </div>
                                      <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full bg-[#3f3f3f] mr-1"></div>
                                        <span className="text-white/60">Upcoming</span>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </motion.div>
                          )
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
      {/* Workout Day Modal */}
      {selectedWorkout && (
        <WorkoutDayModal
          isOpen={showWorkoutModal}
          onClose={() => setShowWorkoutModal(false)}
          workout={selectedWorkout}
        />
      )}
      {/* Workout Completion Toast */}
      <WorkoutCompletionToast isOpen={showCompletionToast} onClose={() => setShowCompletionToast(false)} />
      {/* Extra space to ensure content isn't hidden behind fixed button */}
      <div className="h-40"></div>
    </main>
  )
}
