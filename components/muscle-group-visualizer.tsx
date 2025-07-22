"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface MuscleGroup {
  name: string
  percentage: number
  color: string
}

interface MuscleGroupVisualizerProps {
  muscleGroups: MuscleGroup[]
  className?: string
}

export default function MuscleGroupVisualizer({ muscleGroups, className = "" }: MuscleGroupVisualizerProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Main muscle diagram container */}
      <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2a2a2a] via-[#1a1a1a] to-[#0a0a0a]" />

        {/* Muscle anatomy diagram */}
        <div className="relative w-full h-full flex items-center justify-center p-4">
          <motion.div
            className="relative w-full max-w-sm h-full"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/images/muscle-anatomy.png"
              alt="Targeted muscle groups"
              fill
              className="object-contain drop-shadow-lg"
              priority
            />

            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-lg" />
          </motion.div>
        </div>

        {/* Minimal color indicators in corner */}
        <div className="absolute bottom-3 right-3 flex space-x-1">
          {muscleGroups.slice(0, 3).map((group, index) => (
            <motion.div
              key={group.name}
              className="w-3 h-3 rounded-full shadow-sm"
              style={{ backgroundColor: group.color }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.8, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.2, opacity: 1 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
