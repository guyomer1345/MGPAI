"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"

interface Option {
  id: string
  label: string
  icon?: React.ReactNode
}

interface AnimatedRadioGroupProps {
  options: Option[]
  defaultValue?: string
  onChange?: (value: string) => void
}

export default function AnimatedRadioGroup({ options, defaultValue = "", onChange }: AnimatedRadioGroupProps) {
  const [selectedValue, setSelectedValue] = useState(defaultValue || (options.length > 0 ? options[0].id : ""))

  const handleChange = (value: string) => {
    setSelectedValue(value)
    if (onChange) onChange(value)
  }

  return (
    <div className="space-y-4">
      {options.map((option, index) => (
        <motion.button
          key={option.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          onClick={() => handleChange(option.id)}
          className={`w-full py-4 px-6 rounded-xl flex items-center justify-between transition-all duration-300 ${
            selectedValue === option.id
              ? "bg-gradient-to-r from-[#2a2a2a] to-[#333333] border-[#7c57ff] shadow-lg"
              : "bg-[#2a2a2a] border-[#3a3a3a] hover:bg-[#2d2d2d]"
          } border`}
        >
          <div className="flex items-center">
            {option.icon && <div className="mr-4">{option.icon}</div>}
            <span className="text-xl font-medium text-white">{option.label}</span>
          </div>

          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
              selectedValue === option.id ? "border-[#7c57ff]" : "border-gray-400"
            }`}
          >
            {selectedValue === option.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-3 h-3 rounded-full bg-gradient-to-r from-[#00D2FF] to-[#7c57ff]"
              />
            )}
          </div>
        </motion.button>
      ))}
    </div>
  )
}

