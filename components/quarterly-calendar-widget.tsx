"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, ChevronDown, ChevronUp, Star } from "lucide-react"
import Link from "next/link"

interface QuarterlyCalendarWidgetProps {
  quarterData: {
    months: Array<{
      name: string
      progress: number
      focus: string
      weeks: Array<{
        number: number
        completed: boolean
        focus: string
        current?: boolean
      }>
    }>
  }
}

export default function QuarterlyCalendarWidget({ quarterData }: QuarterlyCalendarWidgetProps) {
  const [expandedMonth, setExpandedMonth] = useState<number | null>(0) // Default to first month expanded

  // Toggle expanded month
  const toggleMonth = (monthIndex: number) => {
    if (expandedMonth === monthIndex) {
      setExpandedMonth(null)
    } else {
      setExpandedMonth(monthIndex)
    }
  }

  return (
    <div className="mb-6">
      <h3 className="text-white font-semibold text-lg mb-3 flex items-center">
        <Calendar className="w-5 h-5 text-[#ff3b41] mr-2" />
        Quarterly Calendar
      </h3>

      <div className="space-y-4">
        {quarterData.months.map((month, index) => {
          const isExpanded = expandedMonth === index
          const isCurrentMonth = index === 0 // First month is current

          return (
            <motion.div
              key={month.name}
              className={`bg-[#1a1a1a] rounded-xl overflow-hidden shadow-md transition-all duration-300 ${
                isCurrentMonth ? "border border-[#ff3b41]/50" : "border border-[#2a3440]/30"
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
                        isCurrentMonth ? "bg-[#ff3b41]/20" : "bg-[#2a3440]/50"
                      }`}
                    >
                      <span className={`text-lg font-bold ${isCurrentMonth ? "text-[#ff3b41]" : "text-white/60"}`}>
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
                        className="bg-[#ff3b41] text-white text-xs px-2 py-0.5 rounded-full mr-2"
                        animate={{
                          scale: [1, 1.05, 1],
                          boxShadow: [
                            "0 0 0px rgba(255, 59, 65, 0.3)",
                            "0 0 10px rgba(255, 59, 65, 0.5)",
                            "0 0 0px rgba(255, 59, 65, 0.3)",
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
                  <div className="h-1.5 bg-[#2a3440] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#ff3b41] rounded-full"
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
                            ? "bg-[#ff3b41]/20 border border-[#ff3b41]/30"
                            : week.completed
                              ? "bg-[#ff3b41]/10 border border-[#ff3b41]/20"
                              : "bg-[#2a2a2a] border border-[#2a3440]/30"
                        }`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: week.number * 0.05 }}
                        whileHover={{ scale: 1.03 }}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span
                            className={`text-sm font-medium ${
                              week.current ? "text-white" : week.completed ? "text-white" : "text-white/60"
                            }`}
                          >
                            Week {week.number}
                          </span>
                        </div>
                        <p className="text-white/80 text-xs">{week.focus}</p>

                        {week.current && (
                          <Link href="/">
                            <motion.button
                              className="mt-2 w-full bg-[#ff3b41]/30 hover:bg-[#ff3b41]/50 text-white text-xs py-1 rounded-md transition-all duration-300"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              View Week
                            </motion.button>
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex justify-center">
                    <Link href={`/quarterly-program`}>
                      <motion.button
                        className="bg-[#2a3440] hover:bg-[#3a4450] text-white/80 text-xs px-3 py-1.5 rounded-full flex items-center transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Star className="w-3 h-3 mr-1 text-[#ff3b41]" />
                        <span>View Full Quarter</span>
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

