"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"

interface AnimatedInputProps {
  label: string
  defaultValue?: string
  type?: string
  placeholder?: string
  required?: boolean
}

export default function AnimatedInput({
  label,
  defaultValue = "",
  type = "text",
  placeholder = "",
  required = false,
}: AnimatedInputProps) {
  const [value, setValue] = useState(defaultValue)
  const [focused, setFocused] = useState(false)
  const [valid, setValid] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    setValid(e.target.value.length > 0)
  }

  return (
    <div className="space-y-2 transform transition-all duration-300 hover:translate-y-[-2px]">
      <label
        className={`text-lg font-medium block transition-colors duration-300 ${focused ? "text-[#00D2FF]" : "text-[#a3a3a8]"}`}
      >
        {label} {required && <span className="text-[#aaf163]">*</span>}
      </label>
      <div
        className={`relative group overflow-hidden rounded-xl transition-all duration-300 ${focused ? "ring-2 ring-[#7c57ff] ring-opacity-50" : ""}`}
      >
        <input
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="w-full bg-[#2a2a2a] text-white text-xl py-4 px-5 rounded-xl border border-[#3a3a3a] focus:border-[#7c57ff] transition-all outline-none pr-12"
        />

        <div
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-all duration-500 ${valid ? "opacity-100" : "opacity-0"}`}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00D2FF] to-[#7c57ff] flex items-center justify-center">
            <Check className="w-5 h-5 text-white" />
          </div>
        </div>

        <div
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${focused && !valid ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
        >
          <div className="w-8 h-8 rounded-full bg-[#3a3a3a] flex items-center justify-center">
            <ArrowRight className="w-5 h-5 text-[#7c57ff]" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#00D2FF] to-[#7c57ff] transform scale-x-0 origin-left transition-transform duration-300 group-focus-within:scale-x-100"></div>
      </div>
    </div>
  )
}

