"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, RotateCcw, Check, MessageCircle, Clock, Dumbbell, BarChart2, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ExercisePage({ params }: { params: { id: string } }) {
  // Router for navigation
  const router = useRouter()

  // UI state
  const [isPlaying, setIsPlaying] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [currentSet, setCurrentSet] = useState(1)
  const [completedSets, setCompletedSets] = useState<number[]>([])
  const [showChat, setShowChat] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Sample exercise data
  const exercise = {
    id: "1",
    name: "Machine T-bar Row",
    sets: 3,
    reps: "12, 10, 8",
    weight: "50kg, 60kg, 70kg",
    rest: "60 sec",
    time: "10 min",
    muscles: "Back, Lats",
    difficulty: "Intermediate",
    equipment: "T-bar row machine",
    image: "/placeholder.svg?height=300&width=500",
    video: "/placeholder.svg?height=300&width=500",
  }

  // Timer functionality
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1)
      }, 1000)
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPlaying])

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Toggle play/pause with error handling
  const togglePlay = () => {
    if (!videoRef.current) {
      setIsPlaying(!isPlaying)
      return
    }

    try {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        // Use the play promise to handle potential errors
        const playPromise = videoRef.current.play()

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true)
            })
            .catch((error) => {
              console.error("Error playing video:", error)
              setIsPlaying(false)
            })
        } else {
          setIsPlaying(true)
        }
      }
    } catch (error) {
      console.error("Video control error:", error)
      setIsPlaying(false)
    }
  }

  // Reset timer with improved video handling
  const resetTimer = () => {
    setElapsedTime(0)
    setIsPlaying(false)

    if (videoRef.current) {
      try {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      } catch (error) {
        console.error("Error resetting video:", error)
      }
    }
  }

  // Complete current set
  const completeSet = () => {
    if (currentSet <= exercise.sets && !completedSets.includes(currentSet)) {
      setCompletedSets((prev) => [...prev, currentSet])

      if (currentSet < exercise.sets) {
        setCurrentSet(currentSet + 1)
        resetTimer()
      } else {
        // All sets completed
        setIsPlaying(false)
      }
    }
  }

  // Toggle chat
  const toggleChat = () => {
    setShowChat(!showChat)
  }

  // Initialize video element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("loadeddata", () => {
        console.log("Video data loaded")
      })
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.pause()
      }
    }
  }, [])

  // Handle back navigation
  const handleBack = () => {
    router.back()
  }

  return (
    <main className="pb-24 bg-black">
      {/* Custom Header */}
      <div className="bg-[#1a1a1a] px-4 py-3 flex items-center">
        <button
          onClick={handleBack}
          className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center mr-3"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div>
          <h1 className="text-white font-bold text-lg">{exercise.name}</h1>
          <p className="text-white/60 text-xs">{exercise.muscles}</p>
        </div>
      </div>

      <div className="px-4 py-4">
        {/* Video Player */}
        <div className="relative rounded-xl overflow-hidden bg-[#1a1a1a] mb-4">
          <video
            ref={videoRef}
            className="w-full aspect-video object-cover"
            poster={exercise.image}
            playsInline
            loop
            preload="auto"
            onLoadedMetadata={() => console.log("Video metadata loaded")}
            onError={(e) => console.error("Video error:", e)}
          >
            <source src="/placeholder.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white" />
              ) : (
                <Play className="w-8 h-8 text-white" fill="white" />
              )}
            </button>
          </div>
        </div>

        {/* Exercise Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-[#1a1a1a] rounded-lg p-3 text-center">
            <Dumbbell className="w-5 h-5 text-[#7c57ff] mx-auto mb-1" />
            <p className="text-white/60 text-xs">Sets</p>
            <p className="text-white font-bold">{exercise.sets}</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-lg p-3 text-center">
            <BarChart2 className="w-5 h-5 text-[#00c6ff] mx-auto mb-1" />
            <p className="text-white/60 text-xs">Reps</p>
            <p className="text-white font-bold">{exercise.reps}</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-lg p-3 text-center">
            <Clock className="w-5 h-5 text-[#aaf163] mx-auto mb-1" />
            <p className="text-white/60 text-xs">Rest</p>
            <p className="text-white font-bold">{exercise.rest}</p>
          </div>
        </div>

        {/* Current Progress */}
        <div className="bg-[#1a1a1a] rounded-xl p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center mr-2">
                <span className="text-white text-sm">
                  {currentSet}/{exercise.sets}
                </span>
              </div>
              <span className="text-white">Current Set</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-[#aaf163] mr-1" />
              <span className="text-white">{formatTime(elapsedTime)}</span>
            </div>
          </div>

          {/* Set Progress Indicators */}
          <div className="flex space-x-2 mb-4">
            {Array.from({ length: exercise.sets }, (_, i) => (
              <div
                key={i}
                className={`flex-1 h-2 rounded-full ${
                  completedSets.includes(i + 1)
                    ? "bg-[#aaf163]"
                    : i + 1 === currentSet
                      ? "bg-[#aaf163]/50"
                      : "bg-[#2a2a2a]"
                }`}
              />
            ))}
          </div>

          {/* Exercise Controls */}
          <div className="flex justify-between items-center">
            <button
              onClick={resetTimer}
              className="w-12 h-12 rounded-full bg-[#2a2a2a] flex items-center justify-center hover:bg-[#3a3a3a] transition-all"
            >
              <RotateCcw className="w-5 h-5 text-white" />
            </button>

            <button
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-[#7c57ff] to-[#00c6ff] flex items-center justify-center hover:shadow-lg hover:shadow-[#7c57ff]/20 transition-all"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white" />
              ) : (
                <Play className="w-8 h-8 text-white" fill="white" />
              )}
            </button>

            <button
              onClick={completeSet}
              disabled={completedSets.includes(currentSet)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                completedSets.includes(currentSet)
                  ? "bg-[#aaf163]/30 cursor-not-allowed"
                  : "bg-[#2a2a2a] hover:bg-[#3a3a3a]"
              }`}
            >
              <Check className={`w-5 h-5 ${completedSets.includes(currentSet) ? "text-[#aaf163]" : "text-white"}`} />
            </button>
          </div>
        </div>

        {/* Complete Exercise Button */}
        <button
          className={`w-full py-4 rounded-xl font-medium text-center mb-4 ${
            completedSets.length === exercise.sets ? "bg-[#aaf163] text-black" : "bg-[#2a2a2a] text-white/70"
          }`}
          disabled={completedSets.length !== exercise.sets}
          onClick={() => {
            // Handle exercise completion
            if (completedSets.length === exercise.sets) {
              // Navigate back
              router.back()
            }
          }}
        >
          {completedSets.length === exercise.sets ? (
            <span className="flex items-center justify-center">
              Complete Exercise <Check className="ml-2 w-5 h-5" />
            </span>
          ) : (
            `Complete All Sets (${completedSets.length}/${exercise.sets})`
          )}
        </button>

        {/* Chat Button - Fixed at bottom right */}
        <button
          onClick={toggleChat}
          className="fixed bottom-20 right-4 w-12 h-12 rounded-full bg-gradient-to-r from-[#7c57ff] to-[#00c6ff] flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-10"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Inline Chat */}
      {showChat && (
        <div className="fixed inset-0 bg-black/80 z-50 flex flex-col">
          <div className="bg-[#1a1a1a] p-4 flex items-center">
            <button
              onClick={toggleChat}
              className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center mr-3"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <h2 className="text-white font-bold">Exercise Assistant</h2>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            <div className="bg-[#2a2a2a] rounded-xl p-3 mb-4 max-w-[80%]">
              <p className="text-white text-sm">
                Hi there! I'm your exercise assistant for {exercise.name}. How can I help you with this exercise?
              </p>
            </div>

            <div className="bg-[#7c57ff] rounded-xl p-3 mb-4 max-w-[80%] ml-auto">
              <p className="text-white text-sm">What's the proper form for this exercise?</p>
            </div>

            <div className="bg-[#2a2a2a] rounded-xl p-3 mb-4 max-w-[80%]">
              <p className="text-white text-sm">
                For the {exercise.name}, make sure to:
                <br />
                <br />
                1. Keep your back straight and core engaged throughout the movement
                <br />
                <br />
                2. Pull the handles towards your lower chest, not your upper chest or neck
                <br />
                <br />
                3. Squeeze your back muscles at the top of the movement
                <br />
                <br />
                4. Lower the weight with control, don't let it drop
              </p>
            </div>
          </div>

          <div className="bg-[#1a1a1a] p-4">
            <div className="flex">
              <input
                type="text"
                placeholder="Ask a question about this exercise..."
                className="flex-1 bg-[#2a2a2a] text-white rounded-l-xl px-4 py-3 outline-none"
              />
              <button className="bg-[#7c57ff] text-white px-4 rounded-r-xl">
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

