"use client"

import MobileHeader from "@/components/mobile-header"
import { Clock, Users, Play, CheckCircle, ArrowRight, Target, Pause, X, Eye, ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

export default function WorkoutPage() {
  const router = useRouter()
  const [workoutStarted, setWorkoutStarted] = useState(false)
  const [workoutPaused, setWorkoutPaused] = useState(false)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [completedExercises, setCompletedExercises] = useState<number[]>([])
  const [activeExerciseView, setActiveExerciseView] = useState<number | null>(null)
  const [exerciseProgress, setExerciseProgress] = useState<Record<number, number>>({})
  const [showConfetti, setShowConfetti] = useState(false)
  const exerciseRefs = useRef<(HTMLDivElement | null)[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Exercise data with updated visuals for all exercises
  const exercises = [
    {
      id: 1,
      name: "Machine T-bar Row",
      sets: 3,
      reps: "12, 10, 8",
      time: "10 min",
      image: "/images/t-bar-rows.gif",
      backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      muscles: "Back, Lats",
      difficulty: "Intermediate",
      instructions: [
        "Position yourself on the T-bar row machine with your chest against the pad.",
        "Grasp the handles with both hands using a neutral grip.",
        "Keep your back straight and core engaged throughout the movement.",
        "Pull the handles towards your lower chest, squeezing your shoulder blades together.",
        "Focus on squeezing your back muscles at the top of the movement.",
        "Slowly lower the weight back to the starting position with control.",
        "Maintain tension in your lats throughout the entire range of motion.",
      ],
      muscleGroups: [
        { name: "Latissimus Dorsi", percentage: 70, color: "#667eea" },
        { name: "Rhomboids", percentage: 20, color: "#764ba2" },
        { name: "Biceps", percentage: 10, color: "#f093fb" },
      ],
    },
    {
      id: 2,
      name: "Lat Pull Down",
      sets: 3,
      reps: "12, 10, 8",
      time: "8 min",
      image: "/images/lat-pulldown.gif",
      backgroundImage: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      muscles: "Back, Shoulders",
      difficulty: "Beginner",
      instructions: [
        "Sit at the lat pulldown machine with your thighs secured under the pads.",
        "Grasp the bar with a wide grip, palms facing forward.",
        "Keep your torso upright and chest out throughout the movement.",
        "Pull the bar down to your upper chest while keeping your back straight.",
        "Squeeze your back muscles and hold briefly at the bottom.",
        "Slowly return the bar to the starting position, fully extending your arms.",
        "Focus on using your lats rather than your arms to pull the weight.",
        "Maintain control throughout the entire range of motion.",
      ],
      muscleGroups: [
        { name: "Latissimus Dorsi", percentage: 60, color: "#4facfe" },
        { name: "Biceps", percentage: 20, color: "#00f2fe" },
        { name: "Rear Deltoids", percentage: 20, color: "#a8edea" },
      ],
    },
    {
      id: 3,
      name: "Hammers",
      sets: 4,
      reps: "12, 10, 8, 8",
      time: "10 min",
      image: "/images/hammer-curl.gif",
      backgroundImage: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      muscles: "Biceps, Forearms",
      difficulty: "Intermediate",
      instructions: [
        "Stand with feet shoulder-width apart, holding a dumbbell in each hand.",
        "Keep your elbows close to your sides and palms facing your body (neutral grip).",
        "Maintain a straight posture with your core engaged.",
        "Curl the weights up while keeping your palms facing each other throughout.",
        "Squeeze your biceps at the top of the movement and hold briefly.",
        "Lower the weights back to the starting position with control.",
        "Keep your wrists straight and avoid swinging the weights.",
        "Focus on the biceps and brachialis muscles working together.",
      ],
      muscleGroups: [
        { name: "Biceps Brachii", percentage: 50, color: "#fa709a" },
        { name: "Brachialis", percentage: 30, color: "#fee140" },
        { name: "Brachioradialis", percentage: 20, color: "#ffeaa7" },
      ],
    },
  ]

  // Calculate total workout time
  const totalTime = exercises.reduce((total, exercise) => {
    return total + Number.parseInt(exercise.time.split(" ")[0])
  }, 0)

  // Calculate progress percentage
  const progressPercentage = (completedExercises.length / exercises.length) * 100

  // Start workout function with enhanced animation - now automatically starts first exercise
  const startWorkout = () => {
    setWorkoutStarted(true)
    setWorkoutPaused(false)
    setCurrentExerciseIndex(0)
    setCompletedExercises([])
    setExerciseProgress({})

    // Automatically start the first exercise
    const firstExercise = exercises[0]
    setActiveExerciseView(firstExercise.id)

    // Initialize progress for first exercise
    setExerciseProgress((prev) => ({
      ...prev,
      [firstExercise.id]: 0,
    }))

    // Start progress timer for first exercise
    startExerciseProgressTimer(firstExercise.id)

    // Scroll to first exercise with smooth animation
    setTimeout(() => {
      exerciseRefs.current[0]?.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 300)
  }

  // Start exercise progress timer
  const startExerciseProgressTimer = (exerciseId: number) => {
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    // Set up new timer that increments progress
    timerRef.current = setInterval(() => {
      setExerciseProgress((prev) => {
        const currentProgress = prev[exerciseId] || 0
        if (currentProgress >= 100) {
          clearInterval(timerRef.current!)
          return prev
        }
        return {
          ...prev,
          [exerciseId]: Math.min(currentProgress + 1, 100),
        }
      })
    }, 600) // Adjust speed as needed
  }

  // Pause workout function
  const pauseWorkout = () => {
    setWorkoutPaused(!workoutPaused)

    // Pause or resume the timer
    if (!workoutPaused) {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    } else {
      const currentExercise = exercises[currentExerciseIndex]
      if (currentExercise && !completedExercises.includes(currentExercise.id)) {
        startExerciseProgressTimer(currentExercise.id)
      }
    }
  }

  // End workout function
  const endWorkout = () => {
    if (confirm("Are you sure you want to end this workout?")) {
      setWorkoutStarted(false)
      setWorkoutPaused(false)
      setCompletedExercises([])
      setCurrentExerciseIndex(0)
      setActiveExerciseView(null)
      setExerciseProgress({})

      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }

  // Start specific exercise
  const startExercise = (index: number) => {
    setCurrentExerciseIndex(index)
    setActiveExerciseView(exercises[index].id)

    // Initialize progress for this exercise if not already started
    const exerciseId = exercises[index].id
    if (!exerciseProgress[exerciseId]) {
      setExerciseProgress((prev) => ({
        ...prev,
        [exerciseId]: 0,
      }))
    }

    // Start progress timer
    startExerciseProgressTimer(exerciseId)

    // Scroll to the exercise
    setTimeout(() => {
      exerciseRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 300)
  }

  // Complete current exercise and move to next, or finish workout
  const completeExercise = (exerciseId: number) => {
    // Stop the timer
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    // Set progress to 100%
    setExerciseProgress((prev) => ({
      ...prev,
      [exerciseId]: 100,
    }))

    // Show confetti animation for completing an exercise
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 2000)

    // Close the active exercise view
    setActiveExerciseView(null)

    // Mark as completed and check if workout is finished
    if (!completedExercises.includes(exerciseId)) {
      const updatedCompleted = [...completedExercises, exerciseId]
      setCompletedExercises(updatedCompleted)

      if (updatedCompleted.length === exercises.length) {
        // All exercises are done, automatically complete the workout
        setTimeout(() => {
          completeWorkout()
        }, 500)
      } else {
        // Find next uncompleted exercise
        const nextIndex = exercises.findIndex((ex) => ex.id > exerciseId && !updatedCompleted.includes(ex.id))

        if (nextIndex !== -1) {
          setCurrentExerciseIndex(nextIndex)
          setActiveExerciseView(exercises[nextIndex].id)
          setExerciseProgress((prev) => ({
            ...prev,
            [exercises[nextIndex].id]: 0,
          }))
          startExerciseProgressTimer(exercises[nextIndex].id)
          setTimeout(() => {
            exerciseRefs.current[nextIndex]?.scrollIntoView({ behavior: "smooth", block: "center" })
          }, 300)
        }
      }
    }
  }

  // Complete workout function
  const completeWorkout = () => {
    // Stop any running timers
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    // Show confetti animation
    setShowConfetti(true)

    // Animation and feedback, then redirect
    setTimeout(() => {
      router.push("/?workout_completed=true")
    }, 2000) // Wait for confetti to be visible
  }

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  // Check if all exercises are completed
  const allExercisesCompleted = completedExercises.length === exercises.length

  return (
    <main className="pb-28">
      <MobileHeader showProfile={false} showBack={true} title="Back training + Front hand" date="16/1/2025" />

      {/* Hero Section with Start Workout Button */}
      <div className="mt-6 mb-8">
        <AnimatePresence mode="wait">
          {!workoutStarted ? (
            <motion.div
              key="start-section"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  damping: 20,
                  stiffness: 300,
                  mass: 0.8,
                },
              }}
              exit={{
                opacity: 0,
                y: -20,
                scale: 0.95,
                transition: {
                  duration: 0.2,
                },
              }}
              className="bg-gradient-to-r from-[#7c57ff] to-[#00c6ff] rounded-xl p-5 shadow-lg"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-white font-bold text-xl">Today's Workout</h2>
                  <p className="text-white/80 text-sm">Back training + Front hand</p>
                </div>
                <div className="bg-white/20 rounded-full px-3 py-1">
                  <span className="text-white text-sm font-medium">Day 16</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-5">
                <motion.div
                  className="bg-white/10 rounded-lg p-3 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.1, duration: 0.4 },
                  }}
                >
                  <div className="flex items-center justify-center mb-1">
                    <Users className="w-4 h-4 text-[#aaf163] mr-1" />
                    <span className="text-white text-xs">Exercises</span>
                  </div>
                  <p className="text-white text-center font-bold">{exercises.length}</p>
                </motion.div>

                <motion.div
                  className="bg-white/10 rounded-lg p-3 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.2, duration: 0.4 },
                  }}
                >
                  <div className="flex items-center justify-center mb-1">
                    <Clock className="w-4 h-4 text-[#aaf163] mr-1" />
                    <span className="text-white text-xs">Duration</span>
                  </div>
                  <p className="text-white text-center font-bold">{totalTime} min</p>
                </motion.div>

                <motion.div
                  className="bg-white/10 rounded-lg p-3 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.3, duration: 0.4 },
                  }}
                >
                  <div className="flex items-center justify-center mb-1">
                    <Target className="w-4 h-4 text-[#aaf163] mr-1" />
                    <span className="text-white text-xs">Focus</span>
                  </div>
                  <p className="text-white text-center font-bold">Back</p>
                </motion.div>
              </div>

              <div className="flex space-x-3">
                <motion.button
                  onClick={startWorkout}
                  className="flex-1 bg-white text-[#7c57ff] py-4 px-6 rounded-xl flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-white/30 group"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.4, duration: 0.4 },
                  }}
                >
                  <Play
                    className="w-6 h-6 mr-3 text-[#7c57ff] group-hover:text-[#00c6ff] transition-colors"
                    fill="currentColor"
                  />
                  <span className="font-bold text-lg">Start Workout</span>
                </motion.button>

                <Link href="/workout-preview/workout-16" className="w-12">
                  <motion.button
                    className="w-12 h-12 bg-white/20 text-white rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-white/30"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { delay: 0.5, duration: 0.4 },
                    }}
                  >
                    <Eye className="w-6 h-6" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="progress-section"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  damping: 20,
                  stiffness: 300,
                  mass: 0.8,
                  delayChildren: 0.1,
                  staggerChildren: 0.05,
                },
              }}
              exit={{
                opacity: 0,
                y: -20,
                scale: 0.95,
                transition: {
                  duration: 0.2,
                },
              }}
              className="bg-[#2a2a2a] rounded-xl p-5 shadow-lg border border-[#3f3f3f]"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-white font-bold text-lg">Workout in Progress</h3>
                <div className="bg-[#7c57ff]/20 rounded-full px-3 py-1">
                  <span className="text-[#aaf163] text-sm font-medium">
                    {completedExercises.length}/{exercises.length} Completed
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/70 text-sm">Progress</span>
                  <span className="text-[#aaf163] text-sm font-medium">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="h-2.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#7c57ff] to-[#00c6ff] rounded-full"
                    initial={{ width: "0%" }}
                    animate={{
                      width: `${progressPercentage}%`,
                      transition: {
                        duration: 0.8,
                        ease: [0.25, 0.1, 0.25, 1], // Cubic bezier for a more natural feel
                        delay: 0.1,
                      },
                    }}
                  />
                </div>
              </div>

              <div className="flex space-x-3 mb-4">
                <motion.div
                  className="flex-1 bg-[#3f3f3f] rounded-lg p-3 text-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { delay: 0.2, duration: 0.4 },
                  }}
                >
                  <Clock className="w-5 h-5 text-[#00c6ff] mx-auto mb-1" />
                  <p className="text-white/70 text-xs mb-1">Estimated Time Left</p>
                  <p className="text-white font-bold">{totalTime - completedExercises.length * 9} min</p>
                </motion.div>

                <motion.div
                  className="flex-1 bg-[#3f3f3f] rounded-lg p-3 text-center"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { delay: 0.3, duration: 0.4 },
                  }}
                >
                  <Target className="w-5 h-5 text-[#7c57ff] mx-auto mb-1" />
                  <p className="text-white/70 text-xs">Current Exercise</p>
                  <p className="text-white font-bold text-sm truncate">
                    {exercises[currentExerciseIndex]?.name || "Complete"}
                  </p>
                </motion.div>
              </div>

              <div className="flex space-x-3">
                {!allExercisesCompleted && (
                  <motion.button
                    onClick={pauseWorkout}
                    className="flex-1 bg-[#3f3f3f] hover:bg-[#4a4a4a] text-white py-3 px-6 rounded-xl flex items-center justify-center transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {workoutPaused ? (
                      <>
                        <Play className="w-5 h-5 mr-2" fill="currentColor" />
                        <span>Resume</span>
                      </>
                    ) : (
                      <>
                        <Pause className="w-5 h-5 mr-2" />
                        <span>Pause</span>
                      </>
                    )}
                  </motion.button>
                )}

                <motion.button
                  onClick={endWorkout}
                  className="w-12 h-12 bg-[#3f3f3f] hover:bg-[#4a4a4a] text-white rounded-xl flex items-center justify-center transition-all duration-300"
                  whileHover={{ scale: 1.1, backgroundColor: "#ff4d4d" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              initial={{
                top: "50%",
                left: "50%",
                scale: 0,
              }}
              animate={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                ease: "easeOut",
                delay: Math.random() * 0.2,
              }}
              style={{
                backgroundColor: ["#7c57ff", "#00c6ff", "#aaf163", "#ffeb3b", "#ff6b6b"][Math.floor(Math.random() * 5)],
              }}
            />
          ))}
        </div>
      )}

      {/* Exercise List */}
      <div className="space-y-8">
        {exercises.map((exercise, index) => {
          const isActive = workoutStarted && currentExerciseIndex === index
          const isCompleted = completedExercises.includes(exercise.id)
          const isViewing = activeExerciseView === exercise.id
          const progress = exerciseProgress[exercise.id] || 0

          return (
            <motion.div
              className="relative"
              key={exercise.id}
              ref={(el) => (exerciseRefs.current[index] = el)}
              initial={{ opacity: 0.7, y: 30, x: -5 }}
              animate={{
                opacity: isActive || !workoutStarted || isViewing ? 1 : isCompleted ? 0.8 : 0.6,
                y: 0,
                x: 0,
                scale: isActive || isViewing ? 1.02 : 1,
                transition: {
                  type: "spring",
                  damping: 25,
                  stiffness: 300,
                  mass: 0.8,
                  delay: index * 0.08,
                },
              }}
              whileHover={{
                scale: isActive || isViewing ? 1.02 : workoutStarted && !isCompleted ? 1.01 : 1.01,
                x: workoutStarted ? 0 : 3,
                transition: { duration: 0.2 },
              }}
            >
              {/* Exercise Number Indicator with Progress Ring */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10">
                <motion.div
                  className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg relative ${
                    isCompleted
                      ? "bg-[#aaf163]"
                      : isActive
                        ? "bg-gradient-to-r from-[#7c57ff] to-[#00c6ff]"
                        : "bg-[#3f3f3f]"
                  }`}
                  animate={
                    isActive && !isCompleted
                      ? {
                          scale: [1, 1.05, 1],
                          boxShadow: [
                            "0 4px 10px rgba(0,0,0,0.2)",
                            "0 8px 20px rgba(124,87,255,0.4)",
                            "0 4px 10px rgba(0,0,0,0.2)",
                          ],
                        }
                      : isViewing
                        ? {
                            scale: [1, 1.03, 1],
                            boxShadow: [
                              "0 4px 10px rgba(0,0,0,0.2)",
                              "0 6px 15px rgba(124,87,255,0.3)",
                              "0 4px 10px rgba(0,0,0,0.2)",
                            ],
                          }
                        : {}
                  }
                  transition={{
                    duration: 2,
                    repeat: isActive && !isCompleted ? Number.POSITIVE_INFINITY : 0,
                    repeatType: "loop",
                  }}
                >
                  {/* Progress Ring */}
                  {(isActive || isCompleted) && !isViewing && (
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="46"
                        fill="none"
                        stroke={isCompleted ? "#1e1e1e" : "#1a1a1a"}
                        strokeWidth="8"
                        strokeLinecap="round"
                        opacity="0.3"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="46"
                        fill="none"
                        stroke={isCompleted ? "#1e1e1e" : "#aaf163"}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray="289.027"
                        initial={{ strokeDashoffset: 289.027 }}
                        animate={{
                          strokeDashoffset: 289.027 - (289.027 * progress) / 100,
                          transition: { duration: 0.5 },
                        }}
                        style={{
                          transformOrigin: "center",
                          transform: "rotate(-90deg)",
                        }}
                      />
                    </svg>
                  )}

                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6 text-[#1e1e1e] z-10" />
                  ) : (
                    <span className={`text-white font-bold z-10 ${isActive ? "text-lg" : ""}`}>{exercise.id}</span>
                  )}
                </motion.div>
              </div>

              {/* Connection Line */}
              {index < exercises.length - 1 && (
                <motion.div
                  className="absolute left-0 top-[calc(50%+30px)] bottom-0 w-0.5 bg-gradient-to-b from-[#00c6ff] to-transparent h-[calc(100%-30px)] -translate-x-1/2 z-0"
                  initial={{ height: 0 }}
                  animate={{
                    height: "calc(100% - 30px)",
                    transition: { duration: 0.5, delay: 0.3 },
                  }}
                />
              )}

              {/* Exercise Card */}
              <div
                className={`bg-[#2a2a2a] rounded-xl overflow-hidden shadow-lg ml-6 transition-all duration-300 ${
                  isActive
                    ? "ring-2 ring-[#aaf163] shadow-[0_0_20px_rgba(170,241,99,0.2)]"
                    : isViewing
                      ? "ring-2 ring-[#7c57ff] shadow-[0_0_20px_rgba(124,87,255,0.2)]"
                      : isCompleted
                        ? "opacity-80"
                        : workoutStarted
                          ? "opacity-60 hover:opacity-80"
                          : "hover:shadow-xl hover:translate-x-1 hover:bg-[#3f3f3f]"
                }`}
              >
                {!isViewing ? (
                  <>
                    <div className="relative h-36 overflow-hidden">
                      {/* Enhanced background for exercises */}
                      <div className="absolute inset-0 opacity-20" style={{ background: exercise.backgroundImage }} />

                      <Image
                        src={exercise.image || "/placeholder.svg"}
                        alt={exercise.name}
                        width={300}
                        height={150}
                        className="w-full h-full object-cover"
                        unoptimized={exercise.image?.endsWith(".gif")}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                      {/* Progress Indicator for Active Exercise */}
                      {isActive && !isCompleted && (
                        <motion.div
                          className="absolute top-0 left-0 h-1 bg-[#aaf163]"
                          initial={{ width: "0%" }}
                          animate={{
                            width: `${progress}%`,
                            transition: { duration: 0.3 },
                          }}
                        />
                      )}

                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex justify-between items-end">
                          <div>
                            <h3 className="text-white font-bold text-xl">{exercise.name}</h3>
                            <p className="text-[#b3a0ff] text-sm">{exercise.muscles}</p>
                          </div>
                          <div className="bg-[#aaf163] rounded-full px-2 py-1">
                            <span className="text-[#1e1e1e] text-xs font-bold">{exercise.difficulty}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <motion.div
                          className="bg-[#1a1a1a] rounded-lg p-2 text-center"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            transition: { delay: 0.1, duration: 0.3 },
                          }}
                        >
                          <p className="text-white/70 text-xs mb-1">Sets</p>
                          <p className="text-white font-bold">{exercise.sets}</p>
                        </motion.div>
                        <motion.div
                          className="bg-[#1a1a1a] rounded-lg p-2 text-center"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            transition: { delay: 0.2, duration: 0.3 },
                          }}
                        >
                          <p className="text-white/70 text-xs mb-1">Reps</p>
                          <p className="text-white font-bold text-sm">{exercise.reps}</p>
                        </motion.div>
                        <motion.div
                          className="bg-[#1a1a1a] rounded-lg p-2 text-center"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            transition: { delay: 0.3, duration: 0.3 },
                          }}
                        >
                          <p className="text-white/70 text-xs mb-1">Time</p>
                          <p className="text-white font-bold">{exercise.time}</p>
                        </motion.div>
                      </div>

                      <div className="flex space-x-3">
                        {workoutStarted ? (
                          <>
                            <motion.button
                              onClick={() => setActiveExerciseView(exercise.id)}
                              className={`flex-1 ${
                                isCompleted
                                  ? "bg-[#3f3f3f] text-white/70"
                                  : "bg-[#3f3f3f] hover:bg-[#7c57ff] text-white"
                              } py-3.5 px-4 rounded-lg flex items-center justify-center transition-all duration-300 group`}
                              whileHover={{ scale: isCompleted ? 1 : 1.02 }}
                              whileTap={{ scale: isCompleted ? 1 : 0.98 }}
                            >
                              <span className="mr-2">{isCompleted ? "Review Exercise" : "View Exercise"}</span>
                              <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </motion.button>

                            {!isCompleted && !isActive && (
                              <motion.button
                                onClick={() => startExercise(index)}
                                className="w-12 h-12 flex-shrink-0 bg-[#7c57ff] hover:bg-[#6744e0] rounded-lg flex items-center justify-center transition-all duration-300"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Play className="w-5 h-5 text-white" fill="currentColor" />
                              </motion.button>
                            )}
                          </>
                        ) : (
                          <Link href={`/workout/exercise/${exercise.id}`} className="flex-1">
                            <motion.button
                              className="w-full bg-[#3f3f3f] hover:bg-[#7c57ff] text-white py-3.5 px-4 rounded-lg flex items-center justify-center transition-all duration-300 group"
                              whileHover={{ scale: 1.02, x: 3 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <span className="mr-2">View Details</span>
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  // Exercise View Mode - Shows instructions and details without play button overlay
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-white font-bold text-xl">{exercise.name}</h3>
                      <motion.button
                        onClick={() => setActiveExerciseView(null)}
                        className="w-8 h-8 rounded-full bg-[#3f3f3f] flex items-center justify-center hover:bg-[#4a4a4a] transition-colors"
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="w-4 h-4 text-white" />
                      </motion.button>
                    </div>

                    {/* Clean Video Preview */}
                    <div className="aspect-video bg-[#3f3f3f] rounded-xl relative overflow-hidden mb-4 shadow-lg">
                      {/* Enhanced background for exercises */}
                      <div className="absolute inset-0 opacity-30" style={{ background: exercise.backgroundImage }} />

                      <Image
                        src={exercise.image || "/placeholder.svg"}
                        alt={exercise.name}
                        fill
                        className="object-cover"
                        unoptimized={exercise.image?.endsWith(".gif")}
                      />

                      {/* Subtle overlay */}
                      <div className="absolute inset-0 bg-black/10" />
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <motion.div
                        className="bg-[#1a1a1a] rounded-lg p-2 text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: { delay: 0.1, duration: 0.3 },
                        }}
                      >
                        <p className="text-white/70 text-xs mb-1">Sets</p>
                        <p className="text-white font-bold">{exercise.sets}</p>
                      </motion.div>
                      <motion.div
                        className="bg-[#1a1a1a] rounded-lg p-2 text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: { delay: 0.2, duration: 0.3 },
                        }}
                      >
                        <p className="text-white/70 text-xs mb-1">Reps</p>
                        <p className="text-white font-bold text-sm">{exercise.reps}</p>
                      </motion.div>
                      <motion.div
                        className="bg-[#1a1a1a] rounded-lg p-2 text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: { delay: 0.3, duration: 0.3 },
                        }}
                      >
                        <p className="text-white/70 text-xs mb-1">Time</p>
                        <p className="text-white font-bold">{exercise.time}</p>
                      </motion.div>
                    </div>

                    <motion.div
                      className="mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { delay: 0.4, duration: 0.3 },
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium">Instructions:</h4>
                        <button className="text-white/60 hover:text-white flex items-center text-xs">
                          <ChevronDown className="w-4 h-4 mr-1" />
                          <span>Show All</span>
                        </button>
                      </div>
                      <div className="bg-[#1a1a1a] rounded-lg p-3">
                        <ol className="list-decimal pl-4 space-y-2">
                          {exercise.instructions.slice(0, 3).map((instruction, idx) => (
                            <motion.li
                              key={idx}
                              className="text-white/80 text-sm"
                              initial={{ opacity: 0, x: -5 }}
                              animate={{
                                opacity: 1,
                                x: 0,
                                transition: { delay: 0.5 + idx * 0.1, duration: 0.3 },
                              }}
                            >
                              {instruction}
                            </motion.li>
                          ))}
                          {exercise.instructions.length > 3 && (
                            <motion.li
                              className="text-white/60 text-sm text-center"
                              initial={{ opacity: 0, x: -5 }}
                              animate={{
                                opacity: 1,
                                x: 0,
                                transition: { delay: 0.8, duration: 0.3 },
                              }}
                            >
                              <ChevronDown className="w-4 h-4 inline" /> {exercise.instructions.length - 3} more steps
                            </motion.li>
                          )}
                        </ol>
                      </div>
                    </motion.div>

                    <div className="flex space-x-3">
                      <Link href={`/workout/exercise/${exercise.id}`} className="flex-1">
                        <motion.button
                          className="w-full bg-[#3f3f3f] hover:bg-[#4a4a4a] text-white py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            transition: { delay: 0.6, duration: 0.3 },
                          }}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          <span>Full Details</span>
                        </motion.button>
                      </Link>

                      <motion.button
                        onClick={() => completeExercise(exercise.id)}
                        className="flex-1 bg-[#aaf163] hover:bg-[#95d84e] text-[#1e1e1e] py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-300 group font-bold"
                        whileHover={{
                          scale: 1.03,
                          boxShadow: "0 0 15px rgba(170, 241, 99, 0.3)",
                        }}
                        whileTap={{ scale: 0.97 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: { delay: 0.7, duration: 0.3 },
                        }}
                      >
                        <span className="mr-2">Complete</span>
                        <CheckCircle className="w-4 h-4 text-[#1e1e1e] group-hover:scale-110 transition-transform" />
                      </motion.button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </main>
  )
}
