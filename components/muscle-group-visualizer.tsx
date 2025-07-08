"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Clock } from "lucide-react"

interface MuscleGroup {
  name: string
  percentage: number
  color: string
}

interface MuscleGroupVisualizerProps {
  muscleGroups: MuscleGroup[]
  size?: "sm" | "md" | "lg"
  interactive?: boolean
}

export default function MuscleGroupVisualizer({
  muscleGroups,
  size = "md",
  interactive = true,
}: MuscleGroupVisualizerProps) {
  const [hoveredMuscle, setHoveredMuscle] = useState<string | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  // Size mapping
  const sizeMap = {
    sm: {
      width: 120,
      height: 180,
    },
    md: {
      width: 160,
      height: 240,
    },
    lg: {
      width: 200,
      height: 300,
    },
  }

  const { width, height } = sizeMap[size]

  // Map muscle names to body parts
  const muscleToBodyPart: Record<string, string> = {
    "Latissimus Dorsi": "back",
    Rhomboids: "upper-back",
    Biceps: "arms",
    "Biceps Brachii": "arms",
    Brachialis: "arms",
    Brachioradialis: "forearms",
    "Rear Deltoids": "shoulders",
    Chest: "chest",
    Pectoralis: "chest",
    Quadriceps: "legs",
    Hamstrings: "legs-back",
    Glutes: "glutes",
    Calves: "calves",
    Abs: "abs",
    Core: "abs",
    Shoulders: "shoulders",
    Deltoids: "shoulders",
    Trapezius: "upper-back",
    Triceps: "arms-back",
  }

  // Get the primary muscle group (highest percentage)
  const primaryMuscle =
    muscleGroups.length > 0
      ? [...muscleGroups].sort((a, b) => b.percentage - a.percentage)[0]
      : { name: "", percentage: 0, color: "#3f3f3f" }

  return (
    // Add this at the beginning of the return statement, right after the opening parenthesis:
    <>
      {muscleGroups.length === 0 && (
        <div
          className={`relative ${interactive ? "cursor-pointer" : ""} flex items-center justify-center`}
          style={{ width, height }}
        >
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-[#2a2a2a] flex items-center justify-center mx-auto mb-2">
              <Clock className="w-8 h-8 text-gray-500" />
            </div>
            <p className="text-gray-400 text-sm">Rest Day</p>
            <p className="text-gray-500 text-xs mt-1">No muscle activation</p>
          </div>
        </div>
      )}

      {muscleGroups.length > 0 && (
        <div
          className={`relative ${interactive ? "cursor-pointer" : ""}`}
          onClick={() => interactive && setIsExpanded(!isExpanded)}
          style={{ width, height }}
        >
          {/* Body silhouette */}
          <svg
            width={width}
            height={height}
            viewBox="0 0 100 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0"
          >
            {/* Base body silhouette */}
            <path
              d="M50,10 C55,10 60,15 60,20 C60,25 55,30 50,30 C45,30 40,25 40,20 C40,15 45,10 50,10 Z"
              fill="#2a2a2a"
              className="transition-all duration-300"
            />
            {/* Neck */}
            <path d="M45,30 L45,35 L55,35 L55,30 Z" fill="#2a2a2a" className="transition-all duration-300" />
            {/* Shoulders */}
            <path
              d="M45,35 L35,40 L35,50 L40,55 L40,80 L45,85 L45,35 Z"
              fill={hoveredMuscle === "shoulders" ? primaryMuscle.color : "#2a2a2a"}
              className={`transition-all duration-300 ${
                muscleGroups.length > 0 && muscleGroups.some((m) => muscleToBodyPart[m.name] === "shoulders")
                  ? "opacity-100"
                  : "opacity-70"
              }`}
              onMouseEnter={() => setHoveredMuscle("shoulders")}
              onMouseLeave={() => setHoveredMuscle(null)}
            />
            <path
              d="M55,35 L65,40 L65,50 L60,55 L60,80 L55,85 L55,35 Z"
              fill={hoveredMuscle === "shoulders" ? primaryMuscle.color : "#2a2a2a"}
              className={`transition-all duration-300 ${
                muscleGroups.length > 0 && muscleGroups.some((m) => muscleToBodyPart[m.name] === "shoulders")
                  ? "opacity-100"
                  : "opacity-70"
              }`}
              onMouseEnter={() => setHoveredMuscle("shoulders")}
              onMouseLeave={() => setHoveredMuscle(null)}
            />
            {/* Chest */}
            <path
              d="M45,35 L45,60 L50,65 L55,60 L55,35 Z"
              fill={hoveredMuscle === "chest" ? primaryMuscle.color : "#2a2a2a"}
              className={`transition-all duration-300 ${
                muscleGroups.length > 0 && muscleGroups.some((m) => muscleToBodyPart[m.name] === "chest")
                  ? "opacity-100"
                  : "opacity-70"
              }`}
              onMouseEnter={() => setHoveredMuscle("chest")}
              onMouseLeave={() => setHoveredMuscle(null)}
            />
            {/* Abs */}
            <path
              d="M45,60 L45,85 L50,90 L55,85 L55,60 L50,65 Z"
              fill={hoveredMuscle === "abs" ? primaryMuscle.color : "#2a2a2a"}
              className={`transition-all duration-300 ${
                muscleGroups.length > 0 && muscleGroups.some((m) => muscleToBodyPart[m.name] === "abs")
                  ? "opacity-100"
                  : "opacity-70"
              }`}
              onMouseEnter={() => setHoveredMuscle("abs")}
              onMouseLeave={() => setHoveredMuscle(null)}
            />
            {/* Arms */}
            <path
              d="M35,40 L25,60 L30,65 L40,55 Z"
              fill={hoveredMuscle === "arms" ? primaryMuscle.color : "#2a2a2a"}
              className={`transition-all duration-300 ${
                muscleGroups.length > 0 && muscleGroups.some((m) => muscleToBodyPart[m.name] === "arms")
                  ? "opacity-100"
                  : "opacity-70"
              }`}
              onMouseEnter={() => setHoveredMuscle("arms")}
              onMouseLeave={() => setHoveredMuscle(null)}
            />
            <path
              d="M65,40 L75,60 L70,65 L60,55 Z"
              fill={hoveredMuscle === "arms" ? primaryMuscle.color : "#2a2a2a"}
              className={`transition-all duration-300 ${
                muscleGroups.length > 0 && muscleGroups.some((m) => muscleToBodyPart[m.name] === "arms")
                  ? "opacity-100"
                  : "opacity-70"
              }`}
              onMouseEnter={() => setHoveredMuscle("arms")}
              onMouseLeave={() => setHoveredMuscle(null)}
            />
            {/* Forearms */}
            <path
              d="M25,60 L20,75 L25,80 L30,65 Z"
              fill={hoveredMuscle === "forearms" ? primaryMuscle.color : "#2a2a2a"}
              className={`transition-all duration-300 ${
                muscleGroups.length > 0 && muscleGroups.some((m) => muscleToBodyPart[m.name] === "forearms")
                  ? "opacity-100"
                  : "opacity-70"
              }`}
              onMouseEnter={() => setHoveredMuscle("forearms")}
              onMouseLeave={() => setHoveredMuscle(null)}
            />
            <path
              d="M75,60 L80,75 L75,80 L70,65 Z"
              fill={hoveredMuscle === "forearms" ? primaryMuscle.color : "#2a2a2a"}
              className={`transition-all duration-300 ${
                muscleGroups.length > 0 && muscleGroups.some((m) => muscleToBodyPart[m.name] === "forearms")
                  ? "opacity-100"
                  : "opacity-70"
              }`}
              onMouseEnter={() => setHoveredMuscle("forearms")}
              onMouseLeave={() => setHoveredMuscle(null)}
            />
            {/* Legs */}
            <path
              d="M45,85 L40,120 L45,125 L50,90 Z"
              fill={hoveredMuscle === "legs" ? primaryMuscle.color : "#2a2a2a"}
              className={`transition-all duration-300 ${
                muscleGroups.length > 0 && muscleGroups.some((m) => muscleToBodyPart[m.name] === "legs")
                  ? "opacity-100"
                  : "opacity-70"
              }`}
              onMouseEnter={() => setHoveredMuscle("legs")}
              onMouseLeave={() => setHoveredMuscle(null)}
            />
            <path
              d="M55,85 L60,120 L55,125 L50,90 Z"
              fill={hoveredMuscle === "legs" ? primaryMuscle.color : "#2a2a2a"}
              className={`transition-all duration-300 ${
                muscleGroups.length > 0 && muscleGroups.some((m) => muscleToBodyPart[m.name] === "legs")
                  ? "opacity-100"
                  : "opacity-70"
              }`}
              onMouseEnter={() => setHoveredMuscle("legs")}
              onMouseLeave={() => setHoveredMuscle(null)}
            />
            {/* Calves */}
            <path
              d="M40,120 L38,140 L45,145 L45,125 Z"
              fill={hoveredMuscle === "calves" ? primaryMuscle.color : "#2a2a2a"}
              className={`transition-all duration-300 ${
                muscleGroups.length > 0 && muscleGroups.some((m) => muscleToBodyPart[m.name] === "calves")
                  ? "opacity-100"
                  : "opacity-70"
              }`}
              onMouseEnter={() => setHoveredMuscle("calves")}
              onMouseLeave={() => setHoveredMuscle(null)}
            />
            <path
              d="M60,120 L62,140 L55,145 L55,125 Z"
              fill={hoveredMuscle === "calves" ? primaryMuscle.color : "#2a2a2a"}
              className={`transition-all duration-300 ${
                muscleGroups.length > 0 && muscleGroups.some((m) => muscleToBodyPart[m.name] === "calves")
                  ? "opacity-100"
                  : "opacity-70"
              }`}
              onMouseEnter={() => setHoveredMuscle("calves")}
              onMouseLeave={() => setHoveredMuscle(null)}
            />
            {/* Back (shown as a separate layer that appears when expanded) */}
            {isExpanded && (
              <>
                <path
                  d="M45,35 L45,60 L50,65 L55,60 L55,35 Z"
                  fill={hoveredMuscle === "back" ? primaryMuscle.color : "#2a2a2a"}
                  className={`transition-all duration-300 ${
                    muscleGroups.length > 0 && muscleGroups.some((m) => muscleToBodyPart[m.name] === "back")
                      ? "opacity-100"
                      : "opacity-70"
                  }`}
                  onMouseEnter={() => setHoveredMuscle("back")}
                  onMouseLeave={() => setHoveredMuscle(null)}
                  transform="translate(100, 0)"
                />
                <path
                  d="M45,60 L45,85 L50,90 L55,85 L55,60 L50,65 Z"
                  fill={hoveredMuscle === "lower-back" ? primaryMuscle.color : "#2a2a2a"}
                  className={`transition-all duration-300 ${
                    muscleGroups.length > 0 && muscleGroups.some((m) => muscleToBodyPart[m.name] === "lower-back")
                      ? "opacity-100"
                      : "opacity-70"
                  }`}
                  onMouseEnter={() => setHoveredMuscle("lower-back")}
                  onMouseLeave={() => setHoveredMuscle(null)}
                  transform="translate(100, 0)"
                />
              </>
            )}
          </svg>

          {/* Highlight active muscle groups with glow effect */}
          {muscleGroups.map((muscle, index) => {
            const bodyPart = muscleToBodyPart[muscle.name] || "chest"
            const x = bodyPart.includes("arm") ? (bodyPart.includes("back") ? 75 : 25) : 50
            const y = bodyPart.includes("shoulder")
              ? 40
              : bodyPart.includes("chest")
                ? 50
                : bodyPart.includes("abs")
                  ? 70
                  : bodyPart.includes("leg")
                    ? 100
                    : bodyPart.includes("calve")
                      ? 130
                      : 60

            return (
              <motion.div
                key={index}
                className="absolute pointer-events-none"
                style={{
                  left: `${(x / 100) * width}px`,
                  top: `${(y / 150) * height}px`,
                  width: `${(muscle.percentage / 100) * 40 + 10}px`,
                  height: `${(muscle.percentage / 100) * 40 + 10}px`,
                  backgroundColor: muscle.color,
                  borderRadius: "50%",
                  opacity: hoveredMuscle === muscleToBodyPart[muscle.name] ? 0.7 : 0.3,
                  filter: "blur(10px)",
                }}
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2 + index * 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            )
          })}

          {/* Tap to expand indicator (only shown when interactive) */}
          {interactive && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white/50 text-[10px] whitespace-nowrap">
              {isExpanded ? "Tap to collapse" : "Tap to expand"}
            </div>
          )}

          {/* Hover info tooltip */}
          {hoveredMuscle && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#1a1a1a] text-white text-xs py-1 px-2 rounded whitespace-nowrap border border-[#3f3f3f]">
              {muscleGroups
                .filter((m) => muscleToBodyPart[m.name] === hoveredMuscle)
                .map((m) => `${m.name} (${m.percentage}%)`)
                .join(", ")}
            </div>
          )}
        </div>
      )}
    </>
  )
}
