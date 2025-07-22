"use client"

import MobileHeader from "@/components/mobile-header"
import Link from "next/link"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function CalendarPage() {
  const [activeView, setActiveView] = useState<"weekly" | "quarterly">("quarterly")
  const [currentMonth, setCurrentMonth] = useState("JANUARY")

  // Generate days of the month
  const days = Array.from({ length: 31 }, (_, i) => i + 1)

  // Days of the week
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  return (
    <main>
      <MobileHeader />

      <div className="mt-6">
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

      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <button className="text-gray-400 text-xl flex items-center">
            <ChevronLeft className="w-5 h-5 mr-1" />
            December
          </button>
          <h2 className="text-white text-2xl font-bold">{currentMonth}</h2>
          <button className="text-gray-400 text-xl flex items-center">
            February
            <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-4">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center text-[#60a5fa] font-medium">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => (
            <div key={day} className="flex justify-center">
              <Link href={day === 16 ? "/workout" : "#"}>
                <button
                  className={`w-12 h-12 rounded-full flex items-center justify-center
                    ${day === 16 ? "bg-[#7c57ff]" : "bg-white"}`}
                >
                  <span
                    className={`font-bold text-lg
                    ${day === 16 ? "text-[#aaf163]" : "text-black"}`}
                  >
                    {day}
                  </span>
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <Link href="/workout">
          <div className="bg-[#7c57ff] rounded-xl p-4 text-center">
            <div className="text-sm text-white">16/1</div>
            <div className="text-xl font-bold text-white">Back training + Front hand</div>
            <button className="mt-2 bg-[#aaf163] text-[#1e1e1e] font-bold py-2 px-8 rounded-md transition-all duration-300 animate-pulse hover:scale-105 hover:shadow-[0_0_15px_rgba(170,241,99,0.6)] active:scale-95">
              START
            </button>
          </div>
        </Link>
      </div>
    </main>
  )
}
