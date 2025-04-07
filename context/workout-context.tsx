"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Define types for our workout data
type MuscleGroup = {
  name: string
  percentage: number
  color: string
}

type WorkoutDay = {
  day: number
  completed: boolean
  status: "check" | "current" | "upcoming"
  name: string
  color: string
  icon: any
  intensity: "Low" | "Medium" | "High"
  position: { top: string; left: string }
  muscleGroups: MuscleGroup[]
  isReward?: boolean
}

type WeeklyData = WorkoutDay[]

type MonthlyGoal = {
  id: number
  title: string
  description: string
  target: string
  progress: number
  icon: any
  color: string
}

type MonthlyWeek = {
  number: number
  completed: boolean
  focus: string
  current?: boolean
}

type Month = {
  name: string
  progress: number
  focus: string
  weeks: MonthlyWeek[]
}

type QuarterlyData = {
  startDate: string
  endDate: string
  progress: number
  goals: MonthlyGoal[]
  months: Month[]
  milestones: {
    week: number
    title: string
    reward: string
    icon: any
  }[]
}

// Define the context type
type WorkoutContextType = {
  weeklyData: WeeklyData
  quarterlyData: QuarterlyData
  updateWorkoutDay: (day: number, updates: Partial<WorkoutDay>) => void
  updateMonthlyProgress: (monthIndex: number, progress: number) => void
  updateGoalProgress: (goalId: number, progress: number) => void
  completeWeek: (monthIndex: number, weekNumber: number) => void
  activeView: "weekly" | "quarterly"
  setActiveView: (view: "weekly" | "quarterly") => void
}

// Create the context
const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined)

// Sample data for initialization
const initialWeeklyData: WeeklyData = [
  // This would be your existing weekly data
  {
    day: 12,
    completed: true,
    status: "check",
    name: "Chest Day",
    color: "#60a5fa",
    icon: "Dumbbell",
    intensity: "High",
    position: { top: "30px", left: "50%" },
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
    icon: "Activity",
    intensity: "Medium",
    position: { top: "100px", left: "30%" },
    muscleGroups: [
      { name: "Quadriceps", percentage: 60, color: "#7c57ff" },
      { name: "Hamstrings", percentage: 25, color: "#60a5fa" },
      { name: "Glutes", percentage: 15, color: "#aaf163" },
    ],
  },
  // Add more workout days...
]

const initialQuarterlyData: QuarterlyData = {
  // This would be your existing quarterly data
  startDate: "January 1, 2025",
  endDate: "March 31, 2025",
  progress: 15,
  goals: [
    {
      id: 1,
      title: "Build Muscle Mass",
      description: "Increase overall muscle mass with focus on upper body and core strength.",
      target: "Gain 3-5 lbs of muscle",
      progress: 20,
      icon: "Dumbbell",
      color: "#7c57ff",
    },
    // Add more goals...
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
    },
    // Add more months...
  ],
  milestones: [
    { week: 4, title: "First Month Complete", reward: "Recovery Week", icon: "Award" },
    // Add more milestones...
  ],
}

// Create the provider component
export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state with data from localStorage if available
  const [weeklyData, setWeeklyData] = useState<WeeklyData>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("weeklyData")
      return saved ? JSON.parse(saved) : initialWeeklyData
    }
    return initialWeeklyData
  })

  const [quarterlyData, setQuarterlyData] = useState<QuarterlyData>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("quarterlyData")
      return saved ? JSON.parse(saved) : initialQuarterlyData
    }
    return initialQuarterlyData
  })

  const [activeView, setActiveView] = useState<"weekly" | "quarterly">("weekly")

  // Save to localStorage when data changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("weeklyData", JSON.stringify(weeklyData))
    }
  }, [weeklyData])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("quarterlyData", JSON.stringify(quarterlyData))
    }
  }, [quarterlyData])

  // Function to update a workout day
  const updateWorkoutDay = (day: number, updates: Partial<WorkoutDay>) => {
    setWeeklyData((prev) => prev.map((workout) => (workout.day === day ? { ...workout, ...updates } : workout)))

    // Update quarterly data if needed
    // For example, if a workout is completed, update the monthly progress
    if (updates.completed) {
      // Calculate which month this day belongs to
      // For simplicity, assuming all days in January (first month)
      const monthIndex = 0

      // Calculate new progress
      const totalWorkouts = weeklyData.length
      const completedWorkouts = weeklyData.filter((w) => w.completed || (w.day === day && updates.completed)).length
      const newProgress = Math.round((completedWorkouts / totalWorkouts) * 100)

      updateMonthlyProgress(monthIndex, newProgress)
    }
  }

  // Function to update monthly progress
  const updateMonthlyProgress = (monthIndex: number, progress: number) => {
    setQuarterlyData((prev) => ({
      ...prev,
      months: prev.months.map((month, idx) => (idx === monthIndex ? { ...month, progress } : month)),
      // Also update overall quarterly progress
      progress: Math.round(
        prev.months.reduce((sum, month, idx) => sum + (idx === monthIndex ? progress : month.progress), 0) /
          prev.months.length,
      ),
    }))
  }

  // Function to update goal progress
  const updateGoalProgress = (goalId: number, progress: number) => {
    setQuarterlyData((prev) => ({
      ...prev,
      goals: prev.goals.map((goal) => (goal.id === goalId ? { ...goal, progress } : goal)),
    }))
  }

  // Function to mark a week as completed
  const completeWeek = (monthIndex: number, weekNumber: number) => {
    setQuarterlyData((prev) => ({
      ...prev,
      months: prev.months.map((month, idx) =>
        idx === monthIndex
          ? {
              ...month,
              weeks: month.weeks.map((week) =>
                week.number === weekNumber
                  ? { ...week, completed: true, current: false }
                  : week.number === weekNumber + 1
                    ? { ...week, current: true }
                    : week,
              ),
            }
          : month,
      ),
    }))

    // Also update weekly data to mark workouts as completed
    // This would require mapping week numbers to specific days
  }

  return (
    <WorkoutContext.Provider
      value={{
        weeklyData,
        quarterlyData,
        updateWorkoutDay,
        updateMonthlyProgress,
        updateGoalProgress,
        completeWeek,
        activeView,
        setActiveView,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  )
}

// Custom hook to use the workout context
export const useWorkout = () => {
  const context = useContext(WorkoutContext)
  if (context === undefined) {
    throw new Error("useWorkout must be used within a WorkoutProvider")
  }
  return context
}

