// Types for workout data
export type WorkoutSchedule = {
  id: string
  date: Date
  name: string
  type: string
  duration: number
  exercises: WorkoutExercise[]
  completed: boolean
  canceled: boolean
  isBreakWorkout?: boolean
}

export type WorkoutExercise = {
  id: string
  name: string
  sets: number
  reps: string
  weight?: string
  duration?: number
  restTime?: number
  isModified?: boolean
}

// Mock data for demonstration
const MOCK_WORKOUTS: WorkoutSchedule[] = [
  {
    id: "w1",
    date: new Date(2025, 0, 16), // January 16, 2025
    name: "Back training + Front hand",
    type: "strength",
    duration: 60,
    exercises: [
      {
        id: "e1",
        name: "Machine T-bar Row",
        sets: 3,
        reps: "12, 10, 8",
        weight: "50kg, 60kg, 70kg",
      },
      {
        id: "e2",
        name: "Lat Pull Down",
        sets: 3,
        reps: "12, 10, 8",
        weight: "45kg, 50kg, 55kg",
      },
      {
        id: "e3",
        name: "Hammers",
        sets: 4,
        reps: "12, 10, 8, 8",
        weight: "15kg, 17.5kg, 20kg, 20kg",
      },
    ],
    completed: false,
    canceled: false,
  },
  {
    id: "w2",
    date: new Date(2025, 0, 17), // January 17, 2025
    name: "Shoulder Day",
    type: "strength",
    duration: 45,
    exercises: [
      {
        id: "e4",
        name: "Overhead Press",
        sets: 4,
        reps: "10, 8, 8, 6",
        weight: "40kg, 45kg, 45kg, 50kg",
      },
      {
        id: "e5",
        name: "Lateral Raises",
        sets: 3,
        reps: "12, 12, 12",
        weight: "10kg, 10kg, 10kg",
      },
      {
        id: "e6",
        name: "Face Pulls",
        sets: 3,
        reps: "15, 15, 15",
        weight: "25kg, 25kg, 25kg",
      },
    ],
    completed: false,
    canceled: false,
  },
  {
    id: "w3",
    date: new Date(2025, 0, 18), // January 18, 2025
    name: "Full Body",
    type: "strength",
    duration: 75,
    exercises: [
      {
        id: "e7",
        name: "Squats",
        sets: 4,
        reps: "10, 8, 8, 6",
        weight: "80kg, 90kg, 100kg, 100kg",
      },
      {
        id: "e8",
        name: "Bench Press",
        sets: 4,
        reps: "10, 8, 8, 6",
        weight: "70kg, 80kg, 85kg, 85kg",
      },
      {
        id: "e9",
        name: "Deadlifts",
        sets: 3,
        reps: "8, 6, 6",
        weight: "100kg, 120kg, 130kg",
      },
    ],
    completed: false,
    canceled: false,
  },
]

// Predefined break workouts
const BREAK_WORKOUTS = {
  short: {
    name: "Quick 5-Minute Energizer",
    type: "break",
    duration: 5,
    exercises: [
      {
        id: "b1",
        name: "Jumping Jacks",
        sets: 1,
        reps: "30 seconds",
        duration: 30,
        isModified: true,
      },
      {
        id: "b2",
        name: "Push-ups",
        sets: 1,
        reps: "30 seconds",
        duration: 30,
        isModified: true,
      },
      {
        id: "b3",
        name: "Squats",
        sets: 1,
        reps: "30 seconds",
        duration: 30,
        isModified: true,
      },
      {
        id: "b4",
        name: "Mountain Climbers",
        sets: 1,
        reps: "30 seconds",
        duration: 30,
        isModified: true,
      },
    ],
  },
  medium: {
    name: "15-Minute Circuit",
    type: "break",
    duration: 15,
    exercises: [
      {
        id: "b5",
        name: "Burpees",
        sets: 3,
        reps: "45 seconds",
        duration: 45,
        restTime: 15,
        isModified: true,
      },
      {
        id: "b6",
        name: "Lunges",
        sets: 3,
        reps: "45 seconds",
        duration: 45,
        restTime: 15,
        isModified: true,
      },
      {
        id: "b7",
        name: "Push-ups",
        sets: 3,
        reps: "45 seconds",
        duration: 45,
        restTime: 15,
        isModified: true,
      },
      {
        id: "b8",
        name: "Plank",
        sets: 3,
        reps: "45 seconds",
        duration: 45,
        restTime: 15,
        isModified: true,
      },
      {
        id: "b9",
        name: "High Knees",
        sets: 3,
        reps: "45 seconds",
        duration: 45,
        restTime: 15,
        isModified: true,
      },
    ],
  },
  long: {
    name: "30-Minute Full Workout",
    type: "break",
    duration: 30,
    exercises: [
      {
        id: "b10",
        name: "Warm-up",
        sets: 1,
        reps: "5 minutes",
        duration: 300,
        isModified: true,
      },
      {
        id: "b11",
        name: "Squats",
        sets: 3,
        reps: "12",
        restTime: 30,
        isModified: true,
      },
      {
        id: "b12",
        name: "Push-ups",
        sets: 3,
        reps: "10",
        restTime: 30,
        isModified: true,
      },
      {
        id: "b13",
        name: "Dumbbell Rows",
        sets: 3,
        reps: "10 per arm",
        restTime: 30,
        isModified: true,
      },
      {
        id: "b14",
        name: "Plank",
        sets: 3,
        reps: "30 seconds",
        duration: 30,
        restTime: 30,
        isModified: true,
      },
      {
        id: "b15",
        name: "Cool-down",
        sets: 1,
        reps: "5 minutes",
        duration: 300,
        isModified: true,
      },
    ],
  },
}

// Workout Manager class
export class WorkoutManager {
  private workouts: WorkoutSchedule[] = [...MOCK_WORKOUTS]

  // Get all workouts
  public getAllWorkouts(): WorkoutSchedule[] {
    return [...this.workouts]
  }

  // Get today's workout
  public getTodayWorkout(): WorkoutSchedule | null {
    const today = new Date()
    return (
      this.workouts.find(
        (workout) =>
          workout.date.getDate() === today.getDate() &&
          workout.date.getMonth() === today.getMonth() &&
          workout.date.getFullYear() === today.getFullYear() &&
          !workout.canceled,
      ) || null
    )
  }

  // Get workout for a specific date
  public getWorkoutForDate(date: Date): WorkoutSchedule | null {
    return (
      this.workouts.find(
        (workout) =>
          workout.date.getDate() === date.getDate() &&
          workout.date.getMonth() === date.getMonth() &&
          workout.date.getFullYear() === date.getFullYear() &&
          !workout.canceled,
      ) || null
    )
  }

  // Get upcoming workouts (next 7 days)
  public getUpcomingWorkouts(days = 7): WorkoutSchedule[] {
    const today = new Date()
    const endDate = new Date()
    endDate.setDate(today.getDate() + days)

    return this.workouts.filter((workout) => workout.date >= today && workout.date <= endDate && !workout.canceled)
  }

  // Cancel a workout
  public cancelWorkout(workoutId: string): boolean {
    const workoutIndex = this.workouts.findIndex((w) => w.id === workoutId)
    if (workoutIndex === -1) return false

    this.workouts[workoutIndex].canceled = true
    return true
  }

  // Reschedule a workout
  public rescheduleWorkout(workoutId: string, newDate: Date): boolean {
    const workoutIndex = this.workouts.findIndex((w) => w.id === workoutId)
    if (workoutIndex === -1) return false

    this.workouts[workoutIndex].date = newDate
    this.workouts[workoutIndex].canceled = false
    return true
  }

  // Add a new workout
  public addWorkout(workout: Omit<WorkoutSchedule, "id">): WorkoutSchedule {
    const newWorkout: WorkoutSchedule = {
      ...workout,
      id: `w${this.workouts.length + 1}`,
    }

    this.workouts.push(newWorkout)
    return newWorkout
  }

  // Mark workout as completed
  public completeWorkout(workoutId: string): boolean {
    const workoutIndex = this.workouts.findIndex((w) => w.id === workoutId)
    if (workoutIndex === -1) return false

    this.workouts[workoutIndex].completed = true
    return true
  }

  // Get available time slots for rescheduling
  public getAvailableTimeSlots(startDate: Date, days = 7): Date[] {
    const availableSlots: Date[] = []
    const currentDate = new Date(startDate)

    // Generate time slots for the next 'days' days
    for (let i = 0; i < days; i++) {
      // Morning slot (9 AM)
      const morningSlot = new Date(currentDate)
      morningSlot.setHours(9, 0, 0, 0)

      // Afternoon slot (2 PM)
      const afternoonSlot = new Date(currentDate)
      afternoonSlot.setHours(14, 0, 0, 0)

      // Evening slot (6 PM)
      const eveningSlot = new Date(currentDate)
      eveningSlot.setHours(18, 0, 0, 0)

      // Check if slots are available (not already booked)
      if (!this.isTimeSlotBooked(morningSlot)) {
        availableSlots.push(new Date(morningSlot))
      }

      if (!this.isTimeSlotBooked(afternoonSlot)) {
        availableSlots.push(new Date(afternoonSlot))
      }

      if (!this.isTimeSlotBooked(eveningSlot)) {
        availableSlots.push(new Date(eveningSlot))
      }

      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return availableSlots
  }

  // Check if a time slot is already booked
  private isTimeSlotBooked(date: Date): boolean {
    // Consider a 2-hour window for each workout
    const startTime = new Date(date)
    const endTime = new Date(date)
    endTime.setHours(endTime.getHours() + 2)

    return this.workouts.some((workout) => {
      if (workout.canceled) return false

      const workoutDate = new Date(workout.date)
      return workoutDate >= startTime && workoutDate <= endTime
    })
  }

  // Add a break workout
  public addBreakWorkout(duration: number, date: Date = new Date()): WorkoutSchedule {
    let template

    if (duration <= 5) {
      template = BREAK_WORKOUTS.short
    } else if (duration <= 15) {
      template = BREAK_WORKOUTS.medium
    } else {
      template = BREAK_WORKOUTS.long
    }

    const newWorkout: WorkoutSchedule = {
      id: `b${this.workouts.length + 1}`,
      date: date,
      name: template.name,
      type: template.type,
      duration: template.duration,
      exercises: template.exercises.map((ex) => ({ ...ex })),
      completed: false,
      canceled: false,
      isBreakWorkout: true,
    }

    this.workouts.push(newWorkout)
    return newWorkout
  }

  // Get break workouts
  public getBreakWorkouts(): WorkoutSchedule[] {
    return this.workouts.filter((workout) => workout.isBreakWorkout && !workout.canceled)
  }

  // Modify an exercise in a workout
  public modifyExercise(workoutId: string, exerciseId: string, modifications: Partial<WorkoutExercise>): boolean {
    const workoutIndex = this.workouts.findIndex((w) => w.id === workoutId)
    if (workoutIndex === -1) return false

    const exerciseIndex = this.workouts[workoutIndex].exercises.findIndex((e) => e.id === exerciseId)
    if (exerciseIndex === -1) return false

    this.workouts[workoutIndex].exercises[exerciseIndex] = {
      ...this.workouts[workoutIndex].exercises[exerciseIndex],
      ...modifications,
      isModified: true,
    }

    return true
  }
}

// Create a singleton instance
let workoutManagerInstance: WorkoutManager | null = null

export const getWorkoutManager = (): WorkoutManager => {
  if (!workoutManagerInstance) {
    workoutManagerInstance = new WorkoutManager()
  }

  return workoutManagerInstance
}

// Helper function to get a break workout template
export const getBreakWorkoutTemplate = (duration: number) => {
  if (duration <= 5) {
    return BREAK_WORKOUTS.short
  } else if (duration <= 15) {
    return BREAK_WORKOUTS.medium
  } else {
    return BREAK_WORKOUTS.long
  }
}

// Helper function to suggest alternative exercises
export const suggestAlternativeExercises = (targetMuscle: string): WorkoutExercise[] => {
  const alternatives: Record<string, WorkoutExercise[]> = {
    back: [
      {
        id: "alt1",
        name: "Bent Over Row",
        sets: 3,
        reps: "10-12",
        isModified: true,
      },
      {
        id: "alt2",
        name: "Pull-ups",
        sets: 3,
        reps: "8-10",
        isModified: true,
      },
      {
        id: "alt3",
        name: "Single-Arm Dumbbell Row",
        sets: 3,
        reps: "10-12 per arm",
        isModified: true,
      },
    ],
    chest: [
      {
        id: "alt4",
        name: "Push-ups",
        sets: 3,
        reps: "12-15",
        isModified: true,
      },
      {
        id: "alt5",
        name: "Dumbbell Flyes",
        sets: 3,
        reps: "10-12",
        isModified: true,
      },
      {
        id: "alt6",
        name: "Incline Dumbbell Press",
        sets: 3,
        reps: "10-12",
        isModified: true,
      },
    ],
    legs: [
      {
        id: "alt7",
        name: "Lunges",
        sets: 3,
        reps: "10-12 per leg",
        isModified: true,
      },
      {
        id: "alt8",
        name: "Leg Press",
        sets: 3,
        reps: "12-15",
        isModified: true,
      },
      {
        id: "alt9",
        name: "Romanian Deadlift",
        sets: 3,
        reps: "10-12",
        isModified: true,
      },
    ],
    shoulders: [
      {
        id: "alt10",
        name: "Dumbbell Shoulder Press",
        sets: 3,
        reps: "10-12",
        isModified: true,
      },
      {
        id: "alt11",
        name: "Upright Rows",
        sets: 3,
        reps: "12-15",
        isModified: true,
      },
      {
        id: "alt12",
        name: "Front Raises",
        sets: 3,
        reps: "12-15",
        isModified: true,
      },
    ],
    arms: [
      {
        id: "alt13",
        name: "Tricep Dips",
        sets: 3,
        reps: "12-15",
        isModified: true,
      },
      {
        id: "alt14",
        name: "Hammer Curls",
        sets: 3,
        reps: "10-12",
        isModified: true,
      },
      {
        id: "alt15",
        name: "Skull Crushers",
        sets: 3,
        reps: "10-12",
        isModified: true,
      },
    ],
  }

  return alternatives[targetMuscle.toLowerCase()] || alternatives.back
}

