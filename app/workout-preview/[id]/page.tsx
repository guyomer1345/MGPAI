"use client"

import MobileHeader from "@/components/mobile-header"
import { useState } from "react"
import {
  ArrowLeft,
  Edit,
  Check,
  Dumbbell,
  Clock,
  Target,
  Play,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Plus,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export default function WorkoutPreviewPage({ params }: { params: { id: string } }) {
  const [editMode, setEditMode] = useState(false)
  const [expandedExercise, setExpandedExercise] = useState<number | null>(null)
  const workoutId = params.id

  // Sample workout data - in a real app, this would come from an API or database
  const workout = {
    id: workoutId,
    name: workoutId === "workout-16" ? "Back training + Front hand" : "Chest Day",
    date: workoutId === "workout-16" ? "January 16, 2025" : "January 19, 2025",
    exercises: [
      {
        id: 1,
        name: "Machine T-bar Row",
        sets: 3,
        reps: "12, 10, 8",
        time: "10 min",
        image: "/placeholder.svg?height=200&width=300",
        muscles: "Back, Lats",
        difficulty: "Intermediate",
        alternatives: [
          { id: 101, name: "Bent Over Row", image: "/placeholder.svg?height=100&width=150" },
          { id: 102, name: "Cable Row", image: "/placeholder.svg?height=100&width=150" },
          { id: 103, name: "Single-Arm Dumbbell Row", image: "/placeholder.svg?height=100&width=150" },
        ],
      },
      {
        id: 2,
        name: "Lat Pull Down",
        sets: 3,
        reps: "12, 10, 8",
        time: "8 min",
        image: "/placeholder.svg?height=200&width=300",
        muscles: "Back, Shoulders",
        difficulty: "Beginner",
        alternatives: [
          { id: 201, name: "Pull-Ups", image: "/placeholder.svg?height=100&width=150" },
          { id: 202, name: "Chin-Ups", image: "/placeholder.svg?height=100&width=150" },
          { id: 203, name: "Band Pull-Downs", image: "/placeholder.svg?height=100&width=150" },
        ],
      },
      {
        id: 3,
        name: "Hammers",
        sets: 4,
        reps: "12, 10, 8, 8",
        time: "10 min",
        image: "/placeholder.svg?height=200&width=300",
        muscles: "Biceps, Forearms",
        difficulty: "Intermediate",
        alternatives: [
          { id: 301, name: "Dumbbell Curls", image: "/placeholder.svg?height=100&width=150" },
          { id: 302, name: "EZ Bar Curls", image: "/placeholder.svg?height=100&width=150" },
          { id: 303, name: "Preacher Curls", image: "/placeholder.svg?height=100&width=150" },
        ],
      },
    ],
    totalTime: 28, // minutes
    difficulty: "Intermediate",
  }

  // Function to toggle exercise expansion
  const toggleExercise = (exerciseId: number) => {
    if (expandedExercise === exerciseId) {
      setExpandedExercise(null)
    } else {
      setExpandedExercise(exerciseId)
    }
  }

  // Function to replace an exercise with an alternative
  const replaceExercise = (exerciseId: number, alternativeId: number, alternativeName: string) => {
    // In a real app, this would update the workout in a database
    console.log(`Replacing exercise ${exerciseId} with alternative ${alternativeId} (${alternativeName})`)

    // Close the expanded view
    setExpandedExercise(null)

    // Show success message or update UI
    alert(`Exercise replaced with ${alternativeName}`)
  }

  // Function to add a new exercise
  const addExercise = () => {
    // In a real app, this would open a modal to select a new exercise
    alert("Add new exercise functionality would open here")
  }

  return (
    <main className="pb-28">
      <MobileHeader showProfile={false} showBack={true} title={workout.name} date={workout.date} />

      {/* Header Section */}
      <div className="mt-6 mb-6">
        <div className="bg-gradient-to-r from-[#7c57ff] to-[#00c6ff] rounded-xl p-4 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-white font-bold text-xl">{workout.name}</h2>
              <p className="text-white/80 text-sm">{workout.date}</p>
            </div>
            <div className="bg-white/20 rounded-full px-3 py-1">
              <span className="text-white text-sm font-medium">{workout.exercises.length} Exercises</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
              <div className="flex items-center justify-center mb-1">
                <Dumbbell className="w-4 h-4 text-[#aaf163] mr-1" />
                <span className="text-white text-xs">Exercises</span>
              </div>
              <p className="text-white text-center font-bold">{workout.exercises.length}</p>
            </div>

            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
              <div className="flex items-center justify-center mb-1">
                <Clock className="w-4 h-4 text-[#aaf163] mr-1" />
                <span className="text-white text-xs">Duration</span>
              </div>
              <p className="text-white text-center font-bold">{workout.totalTime} min</p>
            </div>

            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
              <div className="flex items-center justify-center mb-1">
                <Target className="w-4 h-4 text-[#aaf163] mr-1" />
                <span className="text-white text-xs">Difficulty</span>
              </div>
              <p className="text-white text-center font-bold">{workout.difficulty}</p>
            </div>
          </div>

          <div className="flex space-x-3">
            {workoutId === "workout-16" && (
              <Link href="/workout" className="flex-1">
                <button className="w-full bg-white text-[#7c57ff] py-3 rounded-lg flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-white/30 hover:scale-[1.02] active:scale-[0.98] group">
                  <Play
                    className="w-5 h-5 mr-2 text-[#7c57ff] group-hover:text-[#00c6ff] transition-colors"
                    fill="currentColor"
                  />
                  <span className="font-bold">Start Workout</span>
                </button>
              </Link>
            )}
            <button
              onClick={() => setEditMode(!editMode)}
              className={`${workoutId === "workout-16" ? "w-12" : "flex-1"} bg-white/20 text-white py-3 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-white/30`}
            >
              {editMode ? (
                <Check className="w-5 h-5" />
              ) : (
                <>
                  <Edit className="w-5 h-5 mr-2" />
                  <span>Customize</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Exercise List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-white font-semibold text-lg">Exercises</h3>
          {editMode && (
            <button
              onClick={addExercise}
              className="bg-[#3f3f3f] hover:bg-[#4a4a4a] text-white text-sm py-1.5 px-3 rounded-lg flex items-center transition-all duration-300"
            >
              <Plus className="w-4 h-4 mr-1" />
              <span>Add Exercise</span>
            </button>
          )}
        </div>

        {workout.exercises.map((exercise, index) => (
          <div key={exercise.id} className="bg-[#2a2a2a] rounded-xl overflow-hidden shadow-md">
            {/* Exercise Header */}
            <div className="relative">
              <div className="h-32 overflow-hidden">
                <Image
                  src={exercise.image || "/placeholder.svg"}
                  alt={exercise.name}
                  width={300}
                  height={150}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-3">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-white font-bold text-lg">{exercise.name}</h3>
                    <p className="text-[#b3a0ff] text-xs">{exercise.muscles}</p>
                  </div>
                  <div className="bg-[#aaf163] rounded-full px-2 py-0.5">
                    <span className="text-[#1e1e1e] text-xs font-bold">{exercise.difficulty}</span>
                  </div>
                </div>
              </div>

              {/* Edit Mode Overlay */}
              {editMode && (
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => toggleExercise(exercise.id)}
                    className="bg-[#1a1a1a]/80 hover:bg-[#1a1a1a] text-white w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Exercise Details */}
            <div className="p-3">
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="bg-[#1a1a1a] rounded-lg p-2 text-center">
                  <p className="text-white/70 text-xs mb-0.5">Sets</p>
                  <p className="text-white font-bold">{exercise.sets}</p>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg p-2 text-center">
                  <p className="text-white/70 text-xs mb-0.5">Reps</p>
                  <p className="text-white font-bold text-sm">{exercise.reps}</p>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg p-2 text-center">
                  <p className="text-white/70 text-xs mb-0.5">Time</p>
                  <p className="text-white font-bold">{exercise.time}</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <Link href={`/workout/exercise/${exercise.id}`} className="flex-1">
                  <button className="w-full bg-[#3f3f3f] hover:bg-[#4a4a4a] text-white py-2.5 px-4 rounded-lg flex items-center justify-center transition-all duration-300">
                    <span className="mr-1">View Details</span>
                  </button>
                </Link>

                <button
                  onClick={() => toggleExercise(exercise.id)}
                  className="w-10 h-10 bg-[#3f3f3f] hover:bg-[#4a4a4a] text-white rounded-lg flex items-center justify-center transition-all duration-300"
                >
                  {expandedExercise === exercise.id ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Alternatives Section (Expandable) */}
            <AnimatePresence>
              {expandedExercise === exercise.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-3 pt-0 border-t border-[#3f3f3f] mt-3">
                    <h4 className="text-white font-medium text-sm mb-2">Alternative Exercises</h4>
                    <div className="space-y-2">
                      {exercise.alternatives.map((alt) => (
                        <div
                          key={alt.id}
                          className="flex items-center bg-[#1a1a1a] rounded-lg p-2 hover:bg-[#3f3f3f] transition-colors cursor-pointer"
                          onClick={() => editMode && replaceExercise(exercise.id, alt.id, alt.name)}
                        >
                          <div className="w-12 h-12 rounded-md overflow-hidden mr-3">
                            <Image
                              src={alt.image || "/placeholder.svg"}
                              alt={alt.name}
                              width={50}
                              height={50}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-white text-sm font-medium">{alt.name}</p>
                            <p className="text-white/60 text-xs">Similar difficulty</p>
                          </div>
                          {editMode && (
                            <button className="w-8 h-8 bg-[#3f3f3f] hover:bg-[#7c57ff] rounded-full flex items-center justify-center transition-all duration-300">
                              <RefreshCw className="w-4 h-4 text-white" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    {!editMode && (
                      <div className="mt-3 bg-[#1a1a1a] rounded-lg p-3">
                        <p className="text-white/70 text-xs text-center">Enable customize mode to swap exercises</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="mt-8 flex justify-between">
        <Link href="/">
          <button className="bg-[#3f3f3f] text-white py-3 px-5 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-[#4a4a4a]">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Calendar
          </button>
        </Link>

        {workoutId === "workout-16" && (
          <Link href="/workout">
            <button className="bg-gradient-to-r from-[#7c57ff] to-[#00c6ff] text-white py-3 px-5 rounded-xl flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-[#7c57ff]/30">
              <Play className="w-5 h-5 mr-2" fill="currentColor" />
              Start
            </button>
          </Link>
        )}
      </div>
    </main>
  )
}

