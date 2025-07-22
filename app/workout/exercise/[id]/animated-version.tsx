"use client"

import MobileHeader from "@/components/mobile-header"
import { Play, ArrowLeft, ArrowRight, Dumbbell, Info, Target } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function ExercisePage({ params }: { params: { id: string } }) {
  const [isAnimating, setIsAnimating] = useState(false)

  // This would normally come from a database
  const exercises = [
    {
      id: "1",
      name: "Machine T-bar Row",
      sets: 3,
      reps: "12, 10, 8",
      weight: "50kg, 60kg, 70kg",
      rest: "60 sec",
      description:
        "The T-bar row is a compound exercise that targets the muscles of the back, particularly the latissimus dorsi and rhomboids.",
      instructions: [
        "Position yourself on the T-bar row machine with your chest against the pad.",
        "Grasp the handles with both hands.",
        "Keep your back straight and core engaged.",
        "Pull the handles towards your lower chest.",
        "Squeeze your back muscles at the top of the movement.",
        "Slowly lower the weight back to the starting position.",
      ],
      image: "/placeholder.svg?height=300&width=500",
      muscles: "Back, Lats",
      difficulty: "Intermediate",
      equipment: "T-bar row machine",
      tips: "Focus on squeezing your back muscles at the top of the movement for maximum engagement.",
      muscleGroups: [
        { name: "Latissimus Dorsi", percentage: 70, color: "#7c57ff" },
        { name: "Rhomboids", percentage: 20, color: "#00c6ff" },
        { name: "Biceps", percentage: 10, color: "#aaf163" },
      ],
      muscleImage: "/placeholder.svg?height=400&width=300",
      musclePositions: [
        { top: "30%", left: "50%", width: "40%", height: "30%" }, // Lats
        { top: "20%", left: "50%", width: "30%", height: "20%" }, // Rhomboids
        { top: "40%", left: "30%", width: "15%", height: "20%" }, // Biceps
      ],
    },
    {
      id: "2",
      name: "Lat pull down",
      sets: 3,
      reps: "12, 10, 8",
      weight: "45kg, 50kg, 55kg",
      rest: "60 sec",
      description:
        "The lat pulldown is a compound exercise that targets the latissimus dorsi muscles of the back, as well as the biceps and shoulders.",
      instructions: [
        "Sit at the lat pulldown machine with your thighs secured under the pads.",
        "Grasp the bar with a wide grip, palms facing forward.",
        "Pull the bar down to your upper chest while keeping your back straight.",
        "Squeeze your back muscles at the bottom of the movement.",
        "Slowly return the bar to the starting position, fully extending your arms.",
        "Repeat for the desired number of repetitions.",
      ],
      image: "/placeholder.svg?height=300&width=500",
      muscles: "Back, Shoulders",
      difficulty: "Beginner",
      equipment: "Lat pulldown machine",
      tips: "Keep your chest up and avoid leaning back excessively during the movement.",
      muscleGroups: [
        { name: "Latissimus Dorsi", percentage: 60, color: "#7c57ff" },
        { name: "Biceps", percentage: 20, color: "#00c6ff" },
        { name: "Rear Deltoids", percentage: 20, color: "#aaf163" },
      ],
      muscleImage: "/placeholder.svg?height=400&width=300",
      musclePositions: [
        { top: "30%", left: "50%", width: "40%", height: "30%" }, // Lats
        { top: "40%", left: "30%", width: "15%", height: "20%" }, // Biceps
        { top: "15%", left: "50%", width: "25%", height: "15%" }, // Rear Delts
      ],
    },
    {
      id: "3",
      name: "Hammers",
      sets: 4,
      reps: "12, 10, 8, 8",
      weight: "15kg, 17.5kg, 20kg, 20kg",
      rest: "45 sec",
      description:
        "Hammer curls are a variation of the bicep curl that targets the brachialis and brachioradialis muscles, giving your arms a thicker appearance.",
      instructions: [
        "Stand with feet shoulder-width apart, holding a dumbbell in each hand.",
        "Keep your elbows close to your sides and palms facing your body.",
        "Curl the weights up while keeping your palms facing each other.",
        "Squeeze your biceps at the top of the movement.",
        "Lower the weights back to the starting position with control.",
        "Repeat for the desired number of repetitions.",
      ],
      image: "/placeholder.svg?height=300&width=500",
      muscles: "Biceps, Forearms",
      difficulty: "Intermediate",
      equipment: "Dumbbells",
      tips: "Maintain a neutral wrist position throughout the exercise to target the brachialis effectively.",
      muscleGroups: [
        { name: "Biceps Brachii", percentage: 50, color: "#7c57ff" },
        { name: "Brachialis", percentage: 30, color: "#00c6ff" },
        { name: "Brachioradialis", percentage: 20, color: "#aaf163" },
      ],
      muscleImage: "/placeholder.svg?height=400&width=300",
      musclePositions: [
        { top: "30%", left: "30%", width: "20%", height: "25%" }, // Biceps
        { top: "40%", left: "30%", width: "15%", height: "20%" }, // Brachialis
        { top: "50%", left: "30%", width: "15%", height: "15%" }, // Brachioradialis
      ],
    },
  ]

  const exercise = exercises.find((ex) => ex.id === params.id) || exercises[0]
  const nextExerciseId = String(Number(params.id) < exercises.length ? Number(params.id) + 1 : 1)

  // Start animation when component mounts
  useEffect(() => {
    setIsAnimating(true)

    // Optional: cycle the animation
    const interval = setInterval(() => {
      setIsAnimating(false)
      setTimeout(() => setIsAnimating(true), 300)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="pb-28">
      <MobileHeader showProfile={false} showBack={true} title={exercise.name} />

      <div className="mt-6">
        {/* Exercise Header Card */}
        <div className="bg-gradient-to-r from-[#7c57ff] to-[#00c6ff] rounded-xl p-4 shadow-lg mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-white font-bold text-xl">{exercise.name}</h2>
              <p className="text-white/80 text-sm">{exercise.muscles}</p>
            </div>
            <div className="bg-white/20 rounded-full px-3 py-1">
              <span className="text-white text-sm font-medium">Exercise {exercise.id}</span>
            </div>
          </div>
        </div>

        {/* Muscle Group Visualization - Animated Version */}
        <div className="bg-[#3f3f3f] rounded-xl p-4 shadow-md mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Target className="w-5 h-5 text-[#b3a0ff] mr-2" />
              <h3 className="text-white font-semibold">Targeted Muscle Groups</h3>
            </div>
            <button
              onClick={() => setIsAnimating(!isAnimating)}
              className="bg-[#2a2a2a] text-white text-sm px-3 py-1 rounded-full hover:bg-[#7c57ff] transition-colors"
            >
              {isAnimating ? "Pause" : "Animate"}
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Muscle Image with Animated Highlights */}
            <div className="relative w-full md:w-1/2 aspect-[3/4] bg-[#2a2a2a] rounded-lg overflow-hidden">
              <Image
                src={exercise.muscleImage || "/placeholder.svg"}
                alt={`${exercise.name} muscle groups`}
                fill
                className="object-contain"
              />

              {/* Animated Muscle Highlights */}
              {exercise.muscleGroups.map((muscle, index) => (
                <div
                  key={index}
                  className={`absolute transition-opacity duration-1000 ${isAnimating ? "opacity-70" : "opacity-0"}`}
                  style={{
                    backgroundColor: muscle.color,
                    ...exercise.musclePositions[index],
                    borderRadius: "50%",
                    filter: "blur(10px)",
                    animation: isAnimating ? `pulse ${2 + index * 0.5}s infinite alternate` : "none",
                    animationDelay: `${index * 0.3}s`,
                  }}
                />
              ))}
            </div>

            {/* Muscle Breakdown with Animated Bars */}
            <div className="w-full md:w-1/2 space-y-4">
              <h4 className="text-white font-medium">Muscle Activation</h4>

              {exercise.muscleGroups.map((muscle, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-white">{muscle.name}</span>
                    <span className="text-[#aaf163] font-medium">{muscle.percentage}%</span>
                  </div>
                  <div className="w-full h-3 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: isAnimating ? `${muscle.percentage}%` : "0%",
                        backgroundColor: muscle.color,
                      }}
                    />
                  </div>
                </div>
              ))}

              <div className="mt-6 p-3 bg-[#2a2a2a] rounded-lg">
                <p className="text-gray-300 text-sm">
                  This exercise primarily targets the {exercise.muscleGroups[0].name}(
                  {exercise.muscleGroups[0].percentage}% activation), with secondary engagement of{" "}
                  {exercise.muscleGroups
                    .slice(1)
                    .map((m) => m.name)
                    .join(" and ")}
                  .
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Video Preview */}
        <div className="aspect-video bg-[#3f3f3f] rounded-xl flex items-center justify-center relative overflow-hidden mb-6 shadow-lg">
          <Image src={exercise.image || "/placeholder.svg"} alt={exercise.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-[#aaf163] hover:shadow-lg hover:shadow-white/20 cursor-pointer">
              <Play className="w-10 h-10 text-white hover:text-[#aaf163]" fill="currentColor" />
            </div>
          </div>
        </div>

        {/* Exercise Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-[#3f3f3f] rounded-xl p-4 shadow-md">
            <div className="flex items-center mb-2">
              <Dumbbell className="w-5 h-5 text-[#b3a0ff] mr-2" />
              <h3 className="text-gray-300 text-sm">Sets & Reps</h3>
            </div>
            <div className="flex flex-col space-y-2">
              {Array.from({ length: Number(exercise.sets) }).map((_, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-white font-medium">Set {index + 1}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-white">
                      {exercise.reps.split(", ")[index] || exercise.reps.split(", ")[0]} reps
                    </span>
                    <span className="text-[#aaf163]">
                      {exercise.weight.split(", ")[index] || exercise.weight.split(", ")[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#3f3f3f] rounded-xl p-4 shadow-md">
            <div className="flex items-center mb-2">
              <Info className="w-5 h-5 text-[#b3a0ff] mr-2" />
              <h3 className="text-gray-300 text-sm">Details</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white">Difficulty:</span>
                <span className="text-[#aaf163]">{exercise.difficulty}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Equipment:</span>
                <span className="text-[#aaf163]">{exercise.equipment}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Rest:</span>
                <span className="text-[#aaf163]">{exercise.rest}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mb-12">
          <Link href="/workout">
            <button className="bg-[#3f3f3f] text-white py-4 px-6 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-[#4a4a4a] hover:shadow-md">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
          </Link>

          <Link href={`/workout/exercise/${nextExerciseId}`}>
            <button className="bg-gradient-to-r from-[#7c57ff] to-[#00c6ff] text-white py-4 px-6 rounded-xl flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-[#7c57ff]/30 hover:translate-x-1">
              Next
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
