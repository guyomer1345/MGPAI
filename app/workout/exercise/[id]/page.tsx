"use client"

import MobileHeader from "@/components/mobile-header"
import { ArrowLeft, ArrowRight, Target, Dumbbell, Info } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import ExerciseChatButton from "@/components/exercise-chat-button"

export default function ExercisePage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<"instructions" | "muscles">("instructions")

  // Sample exercise data with muscle group information
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
    },
  ]

  const exercise = exercises.find((ex) => ex.id === params.id) || exercises[0]
  const nextExerciseId = String(Number(params.id) < exercises.length ? Number(params.id) + 1 : 1)

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

        {/* Video Preview */}
        <div className="aspect-video bg-[#3f3f3f] rounded-xl flex items-center justify-center relative overflow-hidden mb-3 shadow-lg">
          <Image src={exercise.image || "/placeholder.svg"} alt={exercise.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-[#aaf163] hover:shadow-lg hover:shadow-white/20 cursor-pointer">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 4L18 12L6 20V4Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Exercise Chat Button - Positioned prominently before the details */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 bg-gradient-to-r from-[#7c57ff] to-[#00c6ff] rounded-full px-4 py-2 shadow-lg hover:shadow-[0_0_15px_rgba(124,87,255,0.5)] transition-all duration-300">
            <ExerciseChatButton exerciseId={exercise.id} exerciseName={exercise.name} />
            <span className="text-white font-medium">Ask about this exercise</span>
          </div>
        </div>

        {/* Exercise Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-[#3f3f3f] rounded-xl p-4 shadow-md">
            <div className="flex items-center mb-2">
              <Dumbbell className="w-5 h-5 text-[#b3a0ff] mr-2" />
              <h3 className="text-gray-300 text-sm">Sets & Reps</h3>
            </div>
            <div className="flex flex-col space-y-2">
              {Array.from({ length: exercise.sets }).map((_, index) => (
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

        {/* Tabs for Instructions and Muscle Groups */}
        <div className="mb-4">
          <div className="flex border-b border-[#3f3f3f]">
            <button
              className={`flex-1 py-3 text-center font-medium ${
                activeTab === "instructions" ? "text-[#7c57ff] border-b-2 border-[#7c57ff]" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("instructions")}
            >
              Instructions
            </button>
            <button
              className={`flex-1 py-3 text-center font-medium ${
                activeTab === "muscles" ? "text-[#7c57ff] border-b-2 border-[#7c57ff]" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("muscles")}
            >
              Muscle Groups
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "instructions" ? (
          <div className="bg-[#3f3f3f] rounded-xl p-4 shadow-md mb-6 animate-fade-in">
            <h3 className="text-white font-medium mb-3">Instructions</h3>
            <ol className="list-decimal pl-5 space-y-4">
              {exercise.instructions.map((instruction, index) => (
                <li key={index} className="text-white/80 relative">
                  <div className="flex items-start">
                    <div className="flex-1">{instruction}</div>
                    <div className="ml-2 mt-[-2px]">
                      <button
                        onClick={() => {
                          // This would open the chat with a pre-filled question about this specific instruction
                          const chatButton = document.querySelector(".exercise-chat-main-button") as HTMLButtonElement
                          if (chatButton) chatButton.click()
                          // In a real implementation, you would pre-fill the chat with a question about this instruction
                        }}
                        className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-all"
                      >
                        <Image
                          src="/images/exercise-chat-icon.png"
                          alt="Ask about this step"
                          width={14}
                          height={14}
                          className="w-3.5 h-3.5"
                        />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-4 bg-[#2a2a2a] rounded-lg p-3">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-[#aaf163] mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-white/80 text-sm">{exercise.tips}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#3f3f3f] rounded-xl p-4 shadow-md mb-6 animate-fade-in">
            <h3 className="text-white font-medium mb-3 flex items-center">
              <Target className="w-5 h-5 text-[#b3a0ff] mr-2" />
              Targeted Muscle Groups
            </h3>

            {/* Simple Muscle Group Visualization */}
            <div className="flex justify-center mb-4">
              <div className="relative w-48 h-64 bg-[#2a2a2a] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=256&width=192"
                  alt="Muscle diagram"
                  width={192}
                  height={256}
                  className="object-contain opacity-50"
                />

                {/* Highlight areas based on muscle groups */}
                {exercise.muscleGroups.map((muscle, index) => {
                  // Position highlights based on muscle name
                  let position = { top: "30%", left: "50%", width: "30%", height: "20%" }

                  if (muscle.name.includes("Latissimus") || muscle.name.includes("Lats")) {
                    position = { top: "30%", left: "50%", width: "40%", height: "30%" }
                  } else if (muscle.name.includes("Biceps")) {
                    position = { top: "40%", left: "30%", width: "15%", height: "20%" }
                  } else if (muscle.name.includes("Deltoid") || muscle.name.includes("Shoulder")) {
                    position = { top: "15%", left: "50%", width: "25%", height: "15%" }
                  } else if (muscle.name.includes("Rhomboid")) {
                    position = { top: "20%", left: "50%", width: "30%", height: "20%" }
                  } else if (muscle.name.includes("Brachialis")) {
                    position = { top: "35%", left: "30%", width: "15%", height: "15%" }
                  } else if (muscle.name.includes("Brachioradialis")) {
                    position = { top: "45%", left: "25%", width: "15%", height: "15%" }
                  }

                  return (
                    <div
                      key={index}
                      className="absolute rounded-full animate-pulse"
                      style={{
                        top: position.top,
                        left: position.left,
                        width: position.width,
                        height: position.height,
                        backgroundColor: muscle.color,
                        opacity: 0.6,
                        filter: "blur(10px)",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  )
                })}
              </div>
            </div>

            {/* Muscle Activation Percentages */}
            <div className="space-y-3">
              {exercise.muscleGroups.map((muscle, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: muscle.color }} />
                      <span className="text-white">{muscle.name}</span>
                    </div>
                    <span className="text-[#aaf163] font-medium">{muscle.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${muscle.percentage}%`,
                        backgroundColor: muscle.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mb-12">
          <Link href="/workout">
            <button className="bg-[#3f3f3f] text-white py-3 px-5 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-[#4a4a4a] hover:shadow-md">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
          </Link>

          <Link href={`/workout/exercise/${nextExerciseId}`}>
            <button className="bg-gradient-to-r from-[#7c57ff] to-[#00c6ff] text-white py-3 px-5 rounded-xl flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-[#7c57ff]/30 hover:translate-x-1">
              Next
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
