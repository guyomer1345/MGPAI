"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Award, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Sample data
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]
const currentQuarter = 2 // Q2
const currentYear = 2023

const quarterMonths = {
  1: [0, 1, 2], // Jan, Feb, Mar
  2: [3, 4, 5], // Apr, May, Jun
  3: [6, 7, 8], // Jul, Aug, Sep
  4: [9, 10, 11], // Oct, Nov, Dec
}

const milestones = [
  { id: 1, name: "5K Run", date: "2023-04-15", completed: true },
  { id: 2, name: "10K Steps Daily", date: "2023-05-01", completed: true },
  { id: 3, name: "Bench Press 100kg", date: "2023-05-20", completed: false },
  { id: 4, name: "10K Run", date: "2023-06-10", completed: false },
]

const workoutDays = {
  "2023-04-01": { type: "strength", completed: true },
  "2023-04-03": { type: "cardio", completed: true },
  "2023-04-05": { type: "strength", completed: true },
  "2023-04-07": { type: "cardio", completed: true },
  "2023-04-10": { type: "strength", completed: true },
  "2023-04-12": { type: "cardio", completed: true },
  "2023-04-14": { type: "strength", completed: true },
  "2023-04-17": { type: "strength", completed: true },
  "2023-04-19": { type: "cardio", completed: true },
  "2023-04-21": { type: "strength", completed: true },
  "2023-04-24": { type: "cardio", completed: true },
  "2023-04-26": { type: "strength", completed: true },
  "2023-04-28": { type: "cardio", completed: true },
  "2023-05-01": { type: "strength", completed: true },
  "2023-05-03": { type: "cardio", completed: true },
  "2023-05-05": { type: "strength", completed: true },
  "2023-05-08": { type: "cardio", completed: true },
  "2023-05-10": { type: "strength", completed: true },
  "2023-05-12": { type: "cardio", completed: true },
  "2023-05-15": { type: "strength", completed: false },
  "2023-05-17": { type: "cardio", completed: false },
  "2023-05-19": { type: "strength", completed: false },
  "2023-05-22": { type: "cardio", completed: false },
  "2023-05-24": { type: "strength", completed: false },
  "2023-05-26": { type: "cardio", completed: false },
  "2023-05-29": { type: "strength", completed: false },
  "2023-05-31": { type: "cardio", completed: false },
  "2023-06-02": { type: "strength", completed: false },
  "2023-06-05": { type: "cardio", completed: false },
  "2023-06-07": { type: "strength", completed: false },
  "2023-06-09": { type: "cardio", completed: false },
  "2023-06-12": { type: "strength", completed: false },
  "2023-06-14": { type: "cardio", completed: false },
  "2023-06-16": { type: "strength", completed: false },
  "2023-06-19": { type: "cardio", completed: false },
  "2023-06-21": { type: "strength", completed: false },
  "2023-06-23": { type: "cardio", completed: false },
  "2023-06-26": { type: "strength", completed: false },
  "2023-06-28": { type: "cardio", completed: false },
  "2023-06-30": { type: "strength", completed: false },
}

export default function QuarterlyProgramPage() {
  const [selectedMonth, setSelectedMonth] = useState(quarterMonths[currentQuarter][0])
  const [showMilestones, setShowMilestones] = useState(false)

  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  // Generate calendar days
  const generateCalendarDays = (year: number, month: number) => {
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: null, date: null })
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`
      days.push({
        day: i,
        date,
        workout: workoutDays[date],
        milestone: milestones.find((m) => m.date === date),
      })
    }

    return days
  }

  const calendarDays = generateCalendarDays(currentYear, selectedMonth)

  // Navigate to previous month
  const prevMonth = () => {
    if (selectedMonth > quarterMonths[currentQuarter][0]) {
      setSelectedMonth(selectedMonth - 1)
    }
  }

  // Navigate to next month
  const nextMonth = () => {
    if (selectedMonth < quarterMonths[currentQuarter][2]) {
      setSelectedMonth(selectedMonth + 1)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Simple Header */}
      <div className="bg-[#111] px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>Back</span>
        </Link>
        <h1 className="text-lg font-medium">
          Q{currentQuarter} {currentYear}
        </h1>
        <div className="w-5"></div> {/* Empty div for spacing */}
      </div>

      <div className="px-4 py-6">
        {/* Calendar - Central Element */}
        <div className="bg-[#1a1a1a] rounded-lg p-4 mb-6 border border-[#333]">
          {/* Month Navigation - Minimal */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={prevMonth}
              disabled={selectedMonth === quarterMonths[currentQuarter][0]}
              className={`p-2 ${
                selectedMonth === quarterMonths[currentQuarter][0] ? "text-gray-500 cursor-not-allowed" : "text-white"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="text-white font-medium text-lg">{months[selectedMonth]}</h3>
            <button
              onClick={nextMonth}
              disabled={selectedMonth === quarterMonths[currentQuarter][2]}
              className={`p-2 ${
                selectedMonth === quarterMonths[currentQuarter][2] ? "text-gray-500 cursor-not-allowed" : "text-white"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Day labels - Minimal */}
          <div className="grid grid-cols-7 mb-3">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <div key={index} className="text-center text-gray-400 text-xs">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid - Clean MVP */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`aspect-square rounded flex flex-col items-center justify-center relative ${
                  day.day ? "bg-[#252525]" : ""
                }`}
              >
                {day.day && (
                  <>
                    <span className={`text-sm ${day.workout?.completed ? "text-white" : "text-white/70"}`}>
                      {day.day}
                    </span>

                    {/* Minimal Workout indicator */}
                    {day.workout && (
                      <div
                        className={`w-2 h-2 rounded-full mt-1 ${
                          day.workout.type === "strength" ? "bg-[#ff3b41]" : "bg-[#3b82f6]"
                        } ${day.workout.completed ? "opacity-100" : "opacity-40"}`}
                      />
                    )}

                    {/* Minimal Milestone indicator */}
                    {day.milestone && <div className="absolute top-1 right-1 w-1 h-1 bg-[#f59e0b] rounded-full" />}
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Minimal Legend */}
          <div className="flex justify-center mt-4 space-x-4 text-xs text-gray-400">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-[#ff3b41] mr-1"></div>
              <span>Strength</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-[#3b82f6] mr-1"></div>
              <span>Cardio</span>
            </div>
          </div>
        </div>

        {/* Milestones - MVP Style */}
        <div className="bg-[#1a1a1a] rounded-lg overflow-hidden border border-[#333]">
          <div
            className="p-4 flex justify-between items-center cursor-pointer"
            onClick={() => setShowMilestones(!showMilestones)}
          >
            <div className="flex items-center">
              <Award className="w-4 h-4 text-[#f59e0b] mr-2" />
              <span className="text-white text-sm">Milestones</span>
            </div>
            <ChevronRight
              className={`w-4 h-4 text-gray-400 transition-transform ${showMilestones ? "rotate-90" : ""}`}
            />
          </div>

          {/* Milestones List - Minimal */}
          {showMilestones && (
            <div className="px-4 pb-4">
              <div className="space-y-2">
                {milestones.map((milestone) => (
                  <div key={milestone.id} className="flex items-center p-2 rounded bg-[#252525]">
                    <div className="flex-1">
                      <h4 className="text-white text-sm">{milestone.name}</h4>
                      <p className="text-gray-400 text-xs">
                        {new Date(milestone.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div
                      className={`px-2 py-0.5 rounded text-xs ${
                        milestone.completed ? "bg-green-900/30 text-green-400" : "bg-[#f59e0b]/20 text-[#f59e0b]"
                      }`}
                    >
                      {milestone.completed ? "Done" : "Pending"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

