"use client"

import { useState, useEffect } from "react"
import { X, Edit, Check, Dumbbell, Activity, Clock, Zap, RotateCcw } from "lucide-react"
import Image from "next/image"
// Import the PortalWrapper component
import PortalWrapper from "./portal-wrapper"

interface Exercise {
  id: string
  name: string
  sets: number
  reps: string
  weight?: string
  image?: string
  muscleGroups: string[]
  alternatives?: {
    id: string
    name: string
    image?: string
  }[]
}

interface WorkoutPreviewProps {
  isOpen: boolean
  onClose: () => void
  workoutId: string
  workoutName: string
  workoutDate: string
  workoutType: "strength" | "cardio" | "flexibility" | "recovery"
  workoutIntensity: "low" | "medium" | "high"
  exercises: Exercise[]
  position?: { top: string; left: string }
  color: string
  onSaveChanges?: (workoutId: string, exercises: Exercise[]) => void
}

export default function WorkoutPreviewPopup({
  isOpen,
  onClose,
  workoutId,
  workoutName,
  workoutDate,
  workoutType,
  workoutIntensity,
  exercises: initialExercises,
  position,
  color,
  onSaveChanges,
}: WorkoutPreviewProps) {
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises)
  const [editingExerciseId, setEditingExerciseId] = useState<string | null>(null)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    setExercises(initialExercises)
    setHasChanges(false)
    setEditingExerciseId(null)
  }, [initialExercises, isOpen])

  const getWorkoutTypeIcon = () => {
    switch (workoutType) {
      case "strength":
        return <Dumbbell className="w-3 h-3" />
      case "cardio":
        return <Activity className="w-3 h-3" />
      case "flexibility":
        return <Zap className="w-3 h-3" />
      case "recovery":
        return <Clock className="w-3 h-3" />
      default:
        return null
    }
  }

  const getIntensityIcon = () => {
    switch (workoutIntensity) {
      case "low":
        return <span className="text-green-400">Low</span>
      case "medium":
        return <span className="text-yellow-400">Medium</span>
      case "high":
        return <span className="text-red-400">High</span>
      default:
        return null
    }
  }

  const handleSwapExercise = (exerciseId: string, alternativeId: string, alternativeName: string) => {
    setExercises((prevExercises) =>
      prevExercises.map((exercise) =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              name: alternativeName,
              id: alternativeId,
              image: exercise.alternatives?.find((alt) => alt.id === alternativeId)?.image,
            }
          : exercise,
      ),
    )
    setEditingExerciseId(null)
    setHasChanges(true)
  }

  const handleUpdateReps = (exerciseId: string, repOption: string) => {
    setExercises((prevExercises) =>
      prevExercises.map((exercise) => (exercise.id === exerciseId ? { ...exercise, reps: repOption } : exercise)),
    )
    setHasChanges(true)
  }

  const handleResetChanges = () => {
    setExercises(initialExercises)
    setHasChanges(false)
  }

  const handleSaveChanges = () => {
    if (onSaveChanges) {
      onSaveChanges(workoutId, exercises)
      setHasChanges(false)
    }
  }

  if (!isOpen) return null

  return (
    <PortalWrapper>
      {/* Enhance animations and add GPU acceleration for smoother rendering */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={onClose}>
        {/* Semi-transparent backdrop that doesn't completely obscure the background */}
        <div
          className="absolute inset-0 bg-black/75 backdrop-blur-sm animate-fade-in"
          style={{ willChange: "opacity, backdrop-filter" }}
        ></div>

        {/* Popup with enhanced animations and compact design */}
        <div
          className="relative z-[110] animate-float-in max-w-[340px] w-full"
          onClick={(e) => e.stopPropagation()}
          style={{
            willChange: "transform, opacity, filter",
            transformOrigin: "center center",
            backfaceVisibility: "hidden",
            perspective: "1000px",
          }}
        >
          <div
            className="bg-[#1a1a1a] rounded-xl shadow-2xl border-2 border-[#3f3f3f] overflow-hidden"
            style={{
              boxShadow: `0 10px 30px rgba(0,0,0,0.5), 0 0 20px ${color}60`,
              transform: "translateZ(0)", // Force GPU acceleration
            }}
          >
            {/* Header */}
            <div
              className="p-4 flex items-center justify-between"
              style={{
                background: `linear-gradient(90deg, ${color}, ${color}90)`,
              }}
            >
              <div>
                <h3 className="text-white font-bold text-lg animate-slide-in-right" style={{ animationDelay: "0.1s" }}>
                  {workoutName}
                </h3>
                <div
                  className="flex items-center text-white/90 text-xs animate-slide-in-right"
                  style={{ animationDelay: "0.2s" }}
                >
                  <span className="mr-2">{workoutDate}</span>
                  <div className="flex items-center bg-black/30 rounded-full px-2 py-0.5">
                    {getWorkoutTypeIcon()}
                    <span className="ml-1 capitalize">{workoutType}</span>
                  </div>
                  <div className="ml-2 flex items-center bg-black/30 rounded-full px-2 py-0.5">
                    {getIntensityIcon()}
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center hover:bg-black/60 transition-all duration-300 hover:scale-110 active:scale-90"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Exercise List */}
            <div className="p-4 max-h-[400px] overflow-y-auto custom-scrollbar">
              <h4
                className="text-white text-sm font-medium mb-3 animate-slide-in-right"
                style={{ animationDelay: "0.3s" }}
              >
                Exercises
              </h4>
              <div className="space-y-4">
                {exercises.map((exercise, index) => (
                  <div
                    key={exercise.id}
                    className="bg-[#2a2a2a] rounded-lg overflow-hidden border border-[#3f3f3f] shadow-lg transition-all duration-300 hover:shadow-xl hover:border-[#4a4a4a] hover:animate-subtle-pulse animate-slide-in-up"
                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                  >
                    {editingExerciseId === exercise.id ? (
                      <div className="p-4 animate-fade-slide-up">
                        <div className="flex justify-between items-center mb-3">
                          <h5 className="text-white text-sm font-medium">Choose Alternative</h5>
                          <button
                            onClick={() => setEditingExerciseId(null)}
                            className="w-7 h-7 rounded-full bg-[#1a1a1a] flex items-center justify-center hover:bg-[#3f3f3f] transition-all duration-300 hover:scale-110 active:scale-90"
                          >
                            <X className="w-4 h-4 text-white" />
                          </button>
                        </div>
                        <div className="space-y-3 max-h-[150px] overflow-y-auto custom-scrollbar">
                          {exercise.alternatives?.map((alt) => (
                            <button
                              key={alt.id}
                              onClick={() => handleSwapExercise(exercise.id, alt.id, alt.name)}
                              className="w-full bg-[#1a1a1a] hover:bg-[#3f3f3f] rounded-lg p-3 flex items-center transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                            >
                              <div className="w-10 h-10 bg-[#0f0f0f] rounded-md overflow-hidden mr-3 border border-[#3f3f3f]">
                                <Image
                                  src={alt.image || "/placeholder.svg?height=40&width=40"}
                                  alt={alt.name}
                                  width={40}
                                  height={40}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="text-white text-sm">{alt.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex animate-fade-in">
                        <div className="w-20 h-20 bg-[#1a1a1a] relative overflow-hidden group">
                          <Image
                            src={exercise.image || "/placeholder.svg?height=80&width=80"}
                            alt={exercise.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div className="flex-1 p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="text-white font-medium text-sm">{exercise.name}</h5>
                              <div className="flex flex-wrap mt-1">
                                {exercise.muscleGroups.map((muscle, idx) => (
                                  <span
                                    key={idx}
                                    className="text-[10px] bg-[#1a1a1a] text-gray-300 rounded-full px-1.5 py-0.5 mr-1 mb-1 hover:bg-[#3f3f3f] transition-colors duration-300"
                                  >
                                    {muscle}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <button
                              onClick={() => setEditingExerciseId(exercise.id)}
                              className="w-7 h-7 rounded-full bg-[#1a1a1a] flex items-center justify-center hover:bg-[#3f3f3f] transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-md"
                            >
                              <Edit className="w-3.5 h-3.5 text-white" />
                            </button>
                          </div>
                          <div className="flex items-center mt-2">
                            <span className="text-white/80 text-xs mr-2">{exercise.sets} sets</span>
                            <div className="relative group">
                              <span className="text-white/80 text-xs cursor-pointer underline decoration-dotted">
                                {exercise.reps} reps
                              </span>
                              <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-[#0f0f0f] rounded-lg p-3 shadow-xl z-10 w-36 border border-[#3f3f3f] animate-fade-slide-up">
                                <div className="text-xs text-white mb-2">Adjust reps:</div>
                                <div className="flex flex-wrap gap-1">
                                  {["8-10-12", "10-12-15", "12-15-20", "15-20-25"].map((repOption) => (
                                    <button
                                      key={repOption}
                                      onClick={() => handleUpdateReps(exercise.id, repOption)}
                                      className={`text-[10px] px-2 py-1 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 ${
                                        exercise.reps === repOption
                                          ? "bg-[#7c57ff] text-white"
                                          : "bg-[#2a2a2a] text-gray-300 hover:bg-[#3f3f3f]"
                                      }`}
                                    >
                                      {repOption.split("-")[0]}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          {exercise.weight && <span className="text-white/80 text-xs ml-2">{exercise.weight}</span>}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div
              className="p-4 border-t border-[#3f3f3f] flex justify-between animate-slide-in-up"
              style={{ animationDelay: "0.5s" }}
            >
              {hasChanges ? (
                <>
                  <button
                    onClick={handleResetChanges}
                    className="bg-[#2a2a2a] hover:bg-[#3f3f3f] text-white text-xs py-2 px-4 rounded-lg flex items-center transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                    Reset
                  </button>
                  <button
                    onClick={handleSaveChanges}
                    className="bg-gradient-to-r from-[#7c57ff] to-[#00c6ff] text-white text-xs py-2 px-4 rounded-lg flex items-center transition-all duration-300 hover:shadow-lg hover:shadow-[#7c57ff]/20 hover:scale-105 active:scale-95"
                  >
                    <Check className="w-3.5 h-3.5 mr-1.5" />
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={onClose}
                  className="ml-auto bg-[#2a2a2a] hover:bg-[#3f3f3f] text-white text-xs py-2 px-4 rounded-lg flex items-center transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </PortalWrapper>
  )
}
