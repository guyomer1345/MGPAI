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
}

export type WorkoutExercise = {
  id: string
  name: string
  sets: number
  reps: string
  weight?: string
  duration?: number
  restTime?: number
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
}

// Create a singleton instance
let workoutManagerInstance: WorkoutManager | null = null

export const getWorkoutManager = (): WorkoutManager => {
  if (!workoutManagerInstance) {
    workoutManagerInstance = new WorkoutManager()
  }

  return workoutManagerInstance
}
