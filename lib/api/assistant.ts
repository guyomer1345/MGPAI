import type { ChatCompletionMessageParam } from "openai/resources/chat/completions"
// Add these imports at the top of the file
import {
  getWorkoutManager,
  type WorkoutSchedule,
  getBreakWorkoutTemplate,
  suggestAlternativeExercises,
} from "./workout-manager"

// Types for the assistant API
export type AssistantMessage = {
  role: "user" | "assistant" | "system"
  content: string
  timestamp?: Date
}

export type UserProfile = {
  name: string
  age: number
  weight: number
  height: number
  fitnessLevel: "beginner" | "intermediate" | "advanced"
  fitnessGoals: string[]
  healthConditions?: string[]
  preferredWorkoutDays: number[]
  workoutDuration: number
}

export type WorkoutProgram = {
  id: string
  name: string
  description: string
  weeks: WorkoutWeek[]
  createdAt: Date
  updatedAt: Date
}

export type WorkoutWeek = {
  weekNumber: number
  focus: string
  days: WorkoutDay[]
}

export type WorkoutDay = {
  dayNumber: number
  name: string
  exercises: Exercise[]
  completed: boolean
  date?: Date
}

export type Exercise = {
  id: string
  name: string
  muscleGroups: string[]
  sets: number
  reps: string
  weight?: string
  duration?: number
  restTime?: number
  instructions: string
  difficulty: "beginner" | "intermediate" | "advanced"
}

export type NutritionRecommendation = {
  dailyCalories: number
  macros: {
    protein: number
    carbs: number
    fats: number
  }
  mealPlan?: MealPlan
}

export type MealPlan = {
  meals: Meal[]
}

export type Meal = {
  name: string
  time: string
  foods: Food[]
}

export type Food = {
  name: string
  amount: string
  calories: number
  protein: number
  carbs: number
  fats: number
}

// Assistant API class
export class AssistantAPI {
  private apiKey: string
  private baseUrl: string
  private userProfile: UserProfile | null = null
  private conversationHistory: AssistantMessage[] = []
  private systemPrompt: string

  constructor(apiKey: string, baseUrl = "https://api.openai.com/v1") {
    this.apiKey = apiKey
    this.baseUrl = baseUrl
    this.systemPrompt = this.generateSystemPrompt()

    // Initialize with system message
    this.conversationHistory.push({
      role: "system",
      content: this.systemPrompt,
      timestamp: new Date(),
    })

    // Log if we're in fallback mode
    if (!apiKey || apiKey.trim() === "") {
      console.log("AssistantAPI initialized in fallback mode due to missing API key")
    }
  }

  // Set user profile for personalized assistance
  public setUserProfile(profile: UserProfile): void {
    this.userProfile = profile
    // Update system prompt with user profile information
    this.systemPrompt = this.generateSystemPrompt()
    // Update the system message in conversation history
    if (this.conversationHistory.length > 0 && this.conversationHistory[0].role === "system") {
      this.conversationHistory[0].content = this.systemPrompt
    }
  }

  // Generate system prompt based on user profile and app context
  private generateSystemPrompt(): string {
    let prompt = `You are MGP.AI, an intelligent fitness assistant designed to provide personalized workout advice, nutrition guidance, and motivation. 
    
You should be friendly, encouraging, and knowledgeable about fitness topics. Always provide evidence-based information and avoid giving medical advice.

Your responses should be concise, practical, and tailored to the user's fitness level and goals.`

    // Add user profile information if available
    if (this.userProfile) {
      prompt += `\n\nUser Profile:
- Name: ${this.userProfile.name}
- Age: ${this.userProfile.age}
- Weight: ${this.userProfile.weight} kg
- Height: ${this.userProfile.height} cm
- Fitness Level: ${this.userProfile.fitnessLevel}
- Fitness Goals: ${this.userProfile.fitnessGoals.join(", ")}
${this.userProfile.healthConditions ? `- Health Conditions: ${this.userProfile.healthConditions.join(", ")}` : ""}
- Preferred Workout Days: ${this.userProfile.preferredWorkoutDays.map((day) => ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][day]).join(", ")}
- Workout Duration: ${this.userProfile.workoutDuration} minutes`
    }

    prompt += `
You have direct access to the user's workout schedule and can perform actions like:
1. Viewing scheduled workouts
2. Canceling workouts
3. Rescheduling workouts

When the user asks about their workout schedule, provide specific details about their workouts.
When they want to cancel or reschedule a workout, perform the action directly and confirm it was done.
`

    return prompt
  }

  // Find the sendMessage method and replace it with this improved version that better handles quota exceeded errors

  // Send a message to the assistant and get a response
  public async sendMessage(message: string): Promise<AssistantMessage> {
    try {
      // Check for direct action intents before sending to OpenAI
      const directActionResponse = this.handleDirectActions(message)
      if (directActionResponse) {
        // Add user message to conversation history
        const userMessage: AssistantMessage = {
          role: "user",
          content: message,
          timestamp: new Date(),
        }
        this.conversationHistory.push(userMessage)

        // Add direct action response to conversation history
        const assistantMessage: AssistantMessage = {
          role: "assistant",
          content: directActionResponse,
          timestamp: new Date(),
        }
        this.conversationHistory.push(assistantMessage)

        return assistantMessage
      }

      // Continue with regular OpenAI processing if no direct action was taken
      // Add user message to conversation history
      const userMessage: AssistantMessage = {
        role: "user",
        content: message,
        timestamp: new Date(),
      }
      this.conversationHistory.push(userMessage)

      // Prepare messages for API call
      const messages: ChatCompletionMessageParam[] = this.conversationHistory.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }))

      // Use fallback mode directly without attempting API call if we know the API key is invalid
      if (!this.apiKey || this.apiKey.trim() === "") {
        console.log("No valid API key, using fallback mode")
        const fallbackResponse = this.generateFallbackResponse(message)

        // Add fallback response to conversation history
        const assistantMessage: AssistantMessage = {
          role: "assistant",
          content: fallbackResponse,
          timestamp: new Date(),
        }
        this.conversationHistory.push(assistantMessage)

        return assistantMessage
      }

      try {
        // Make API call to OpenAI
        const response = await fetch(`${this.baseUrl}/chat/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o",
            messages,
            temperature: 0.7,
            max_tokens: 1000,
          }),
        })

        if (!response.ok) {
          let errorMessage = response.statusText
          let errorData

          try {
            errorData = await response.json()
            errorMessage = errorData.error?.message || errorMessage
          } catch (e) {
            // If we can't parse the error as JSON, just use the status text
          }

          // Log more details for debugging
          console.error("OpenAI API error details:", errorMessage)

          // Check for quota exceeded error
          if (
            errorMessage.includes("exceeded your current quota") ||
            errorMessage.includes("billing details") ||
            response.status === 429
          ) {
            console.log("Quota exceeded, using fallback mode")
            // Use fallback response instead of throwing an error
            const fallbackResponse = this.generateFallbackResponse(message)

            // Add fallback response to conversation history
            const assistantMessage: AssistantMessage = {
              role: "assistant",
              content: fallbackResponse + "\n\n(Note: API quota exceeded - using fallback responses)",
              timestamp: new Date(),
            }
            this.conversationHistory.push(assistantMessage)

            return assistantMessage
          }

          // For other errors, also use fallback mode but with a different message
          console.log("API error, using fallback mode:", errorMessage)
          const fallbackResponse = this.generateFallbackResponse(message)

          // Add fallback response to conversation history
          const assistantMessage: AssistantMessage = {
            role: "assistant",
            content: fallbackResponse + "\n\n(Note: API error - using fallback responses)",
            timestamp: new Date(),
          }
          this.conversationHistory.push(assistantMessage)

          return assistantMessage
        }

        const data = await response.json()
        const assistantResponse = data.choices[0].message.content

        // Add assistant response to conversation history
        const assistantMessage: AssistantMessage = {
          role: "assistant",
          content: assistantResponse,
          timestamp: new Date(),
        }
        this.conversationHistory.push(assistantMessage)

        return assistantMessage
      } catch (error) {
        console.error("Error in OpenAI API call:", error)

        // Generate a fallback response for any error
        const fallbackResponse = this.generateFallbackResponse(message)

        // Add fallback response to conversation history
        const assistantMessage: AssistantMessage = {
          role: "assistant",
          content: fallbackResponse + "\n\n(Note: API connection error - using fallback responses)",
          timestamp: new Date(),
        }
        this.conversationHistory.push(assistantMessage)

        return assistantMessage
      }
    } catch (error) {
      console.error("Error sending message to assistant:", error)

      // Final fallback for any unexpected errors
      const fallbackResponse = this.generateFallbackResponse(message)

      // Add fallback response to conversation history
      const assistantMessage: AssistantMessage = {
        role: "assistant",
        content: fallbackResponse + "\n\n(Note: Unexpected error - using fallback responses)",
        timestamp: new Date(),
      }

      return assistantMessage
    }
  }

  // Add this new method to handle direct actions
  private handleDirectActions(message: string): string | null {
    const lowerMessage = message.toLowerCase()

    // Check for workout schedule queries
    if (
      lowerMessage.includes("what workout") &&
      (lowerMessage.includes("today") || lowerMessage.includes("scheduled today"))
    ) {
      return this.handleTodayWorkoutQuery()
    }

    if (
      lowerMessage.includes("what workout") &&
      (lowerMessage.includes("tomorrow") || lowerMessage.includes("scheduled tomorrow"))
    ) {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      return this.handleSpecificDateWorkoutQuery(tomorrow)
    }

    if (
      lowerMessage.includes("upcoming workout") ||
      lowerMessage.includes("next workout") ||
      lowerMessage.includes("this week") ||
      lowerMessage.includes("schedule")
    ) {
      return this.handleUpcomingWorkoutsQuery()
    }

    // Check for cancel workout requests
    if (
      (lowerMessage.includes("cancel") || lowerMessage.includes("skip")) &&
      (lowerMessage.includes("today") || lowerMessage.includes("workout"))
    ) {
      return this.handleCancelWorkoutRequest("today")
    }

    if ((lowerMessage.includes("cancel") || lowerMessage.includes("skip")) && lowerMessage.includes("tomorrow")) {
      return this.handleCancelWorkoutRequest("tomorrow")
    }

    // No direct action matched
    return null
  }

  // Handle today's workout query
  private handleTodayWorkoutQuery(): string {
    const todayWorkout = this.getTodayWorkout()

    if (!todayWorkout) {
      return "You don't have any workouts scheduled for today. Would you like me to help you schedule one?"
    }

    let response = `You have a ${todayWorkout.name} workout scheduled for today. It's a ${todayWorkout.duration}-minute ${todayWorkout.type} workout with the following exercises:\n\n`

    todayWorkout.exercises.forEach((exercise, index) => {
      response += `${index + 1}. ${exercise.name}: ${exercise.sets} sets of ${exercise.reps}`
      if (exercise.weight) response += ` at ${exercise.weight}`
      response += "\n"
    })

    response += "\nWould you like to start this workout now, reschedule it, or cancel it?"

    return response
  }

  // Handle specific date workout query
  private handleSpecificDateWorkoutQuery(date: Date): string {
    const workout = this.getWorkoutForDate(date)

    if (!workout) {
      return `You don't have any workouts scheduled for ${date.toLocaleDateString()}. Would you like me to help you schedule one?`
    }

    let response = `You have a ${workout.name} workout scheduled for ${date.toLocaleDateString()}. It's a ${workout.duration}-minute ${workout.type} workout with the following exercises:\n\n`

    workout.exercises.forEach((exercise, index) => {
      response += `${index + 1}. ${exercise.name}: ${exercise.sets} sets of ${exercise.reps}`
      if (exercise.weight) response += ` at ${exercise.weight}`
      response += "\n"
    })

    response += "\nWould you like to reschedule or cancel this workout?"

    return response
  }

  // Handle upcoming workouts query
  private handleUpcomingWorkoutsQuery(): string {
    const upcomingWorkouts = this.getUpcomingWorkouts(7)

    if (upcomingWorkouts.length === 0) {
      return "You don't have any workouts scheduled for the upcoming week. Would you like me to help you create a workout plan?"
    }

    let response = "Here are your upcoming workouts:\n\n"

    upcomingWorkouts.forEach((workout, index) => {
      response += `${workout.date.toLocaleDateString()}: ${workout.name} (${workout.duration} minutes)\n`
    })

    response += "\nWould you like more details about any of these workouts?"

    return response
  }

  // Handle cancel workout request
  private handleCancelWorkoutRequest(day: "today" | "tomorrow"): string {
    const date = new Date()
    if (day === "tomorrow") {
      date.setDate(date.getDate() + 1)
    }

    const workout = this.getWorkoutForDate(date)

    if (!workout) {
      return `You don't have any workouts scheduled for ${day}.`
    }

    const success = this.cancelWorkout(workout.id)

    if (success) {
      return `I've canceled your ${workout.name} workout scheduled for ${day}. Would you like to reschedule it for another day?`
    } else {
      return `I'm sorry, I couldn't cancel your workout for ${day}. Please try again or contact support if the issue persists.`
    }
  }

  // Add this new method to generate fallback responses
  private generateFallbackResponse(userMessage: string): string {
    const userMessageLower = userMessage.toLowerCase()

    // First check for scheduling and rescheduling requests
    if (
      userMessageLower.includes("reschedule") ||
      (userMessageLower.includes("move") && userMessageLower.includes("workout"))
    ) {
      return "I'd be happy to help you reschedule your workout. Due to API limitations, I'm operating in fallback mode. Please specify when you'd like to reschedule (e.g., 'tomorrow at 5pm' or 'next Monday morning') and I'll do my best to assist you.\n\n(Note: API quota exceeded - using fallback responses)"
    }

    if (
      userMessageLower.includes("break") &&
      (userMessageLower.includes("workout") || userMessageLower.includes("exercise"))
    ) {
      const durationMatch = userMessageLower.match(/(\d+)\s*(?:min|minute)/)
      const duration = durationMatch ? Number.parseInt(durationMatch[1]) : 15

      return `I can suggest a quick ${duration}-minute workout for your break! A short circuit of bodyweight exercises would be perfect: try 3 rounds of 10 push-ups, 15 squats, and 30 seconds of plank with minimal rest between exercises.\n\n(Note: API quota exceeded - using fallback responses)`
    }

    // Check for unavailability messages
    if (
      (userMessageLower.includes("can't") ||
        userMessageLower.includes("cannot") ||
        userMessageLower.includes("busy") ||
        userMessageLower.includes("unavailable")) &&
      (userMessageLower.includes("today") ||
        userMessageLower.includes("tomorrow") ||
        userMessageLower.includes("workout"))
    ) {
      return "I understand you're unavailable for your scheduled workout. No problem! Would you like to reschedule it for another day, or would you prefer a shorter alternative workout that fits your schedule better?\n\n(Note: API quota exceeded - using fallback responses)"
    }

    // Check for workout schedule queries
    if (
      userMessageLower.includes("what workout") &&
      (userMessageLower.includes("today") || userMessageLower.includes("scheduled today"))
    ) {
      return this.handleTodayWorkoutQuery()
    }

    if (
      userMessageLower.includes("what workout") &&
      (userMessageLower.includes("tomorrow") || userMessageLower.includes("scheduled tomorrow"))
    ) {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      return this.handleSpecificDateWorkoutQuery(tomorrow)
    }

    if (
      userMessageLower.includes("upcoming workout") ||
      userMessageLower.includes("next workout") ||
      userMessageLower.includes("this week") ||
      userMessageLower.includes("schedule")
    ) {
      return this.handleUpcomingWorkoutsQuery()
    }

    // Check for cancel workout requests
    if (
      (userMessageLower.includes("cancel") || userMessageLower.includes("skip")) &&
      (userMessageLower.includes("today") || userMessageLower.includes("workout"))
    ) {
      return this.handleCancelWorkoutRequest("today")
    }

    if (
      (userMessageLower.includes("cancel") || userMessageLower.includes("skip")) &&
      userMessageLower.includes("tomorrow")
    ) {
      return this.handleCancelWorkoutRequest("tomorrow")
    }

    // Check for common fitness-related queries and provide canned responses
    if (userMessageLower.includes("workout") || userMessageLower.includes("exercise")) {
      return "I'd be happy to help with workout recommendations! For effective training, consider incorporating a mix of strength training, cardio, and flexibility exercises. A balanced routine might include 3-4 days of strength training, 2-3 days of cardio, and daily stretching.\n\n(Note: API quota exceeded - using fallback responses)"
    }

    if (
      userMessageLower.includes("diet") ||
      userMessageLower.includes("nutrition") ||
      userMessageLower.includes("eat")
    ) {
      return "Nutrition is a crucial component of fitness! Focus on whole foods, adequate protein (around 1.6-2g per kg of bodyweight), complex carbohydrates, healthy fats, and plenty of vegetables. Stay hydrated and consider timing your meals around your workouts for optimal results.\n\n(Note: API quota exceeded - using fallback responses)"
    }

    if (userMessageLower.includes("weight") || userMessageLower.includes("fat") || userMessageLower.includes("lose")) {
      return "For sustainable weight management, focus on creating a small calorie deficit through a combination of nutrition and exercise. Aim for 1-2 pounds of weight loss per week, prioritize protein intake, and include both strength training and cardio in your routine.\n\n(Note: API quota exceeded - using fallback responses)"
    }

    if (
      userMessageLower.includes("muscle") ||
      userMessageLower.includes("strength") ||
      userMessageLower.includes("gain")
    ) {
      return "Building muscle requires a combination of progressive overload in your training, adequate protein intake (1.6-2.2g per kg of bodyweight), and sufficient recovery. Focus on compound movements, gradually increase weights, and ensure you're eating enough calories to support growth.\n\n(Note: API quota exceeded - using fallback responses)"
    }

    if (userMessageLower.includes("pain") || userMessageLower.includes("injury") || userMessageLower.includes("hurt")) {
      return "I'm sorry to hear you're experiencing discomfort. It's important to listen to your body and avoid exercises that cause pain. Consider consulting with a healthcare professional for proper diagnosis and treatment. In the meantime, rest, ice, compression, and elevation (RICE) can help manage many minor injuries.\n\n(Note: API quota exceeded - using fallback responses)"
    }

    // Default response for other queries
    return "I'm here to help with your fitness journey! You can ask me about workout routines, nutrition advice, recovery strategies, or specific fitness goals. I'd be happy to provide guidance based on your needs.\n\n(Note: API quota exceeded - using fallback responses)"
  }

  // Get workout recommendations based on user profile and preferences
  public async getWorkoutRecommendations(
    focus: string[] = [],
    duration = 60,
    difficulty: "beginner" | "intermediate" | "advanced" = "intermediate",
  ): Promise<WorkoutProgram> {
    try {
      const prompt = `Generate a personalized workout program with the following parameters:
- Focus areas: ${focus.join(", ") || "full body"}
- Duration: ${duration} minutes
- Difficulty: ${difficulty}
${this.userProfile ? `- Fitness level: ${this.userProfile.fitnessLevel}` : ""}
${this.userProfile?.healthConditions ? `- Health considerations: ${this.userProfile.healthConditions.join(", ")}` : ""}

The workout program should include a structured plan for 4 weeks, with detailed exercises, sets, reps, and rest periods. Format your response as a structured workout program that can be parsed as JSON.`

      // Add this specific request to conversation history
      this.conversationHistory.push({
        role: "user",
        content: prompt,
        timestamp: new Date(),
      })

      // Make API call to OpenAI
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            { role: "system", content: this.systemPrompt },
            { role: "user", content: prompt },
          ],
          temperature: 0.7,
          max_tokens: 2000,
          response_format: { type: "json_object" },
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`API error: ${errorData.error?.message || response.statusText}`)
      }

      const data = await response.json()
      const workoutProgramJson = JSON.parse(data.choices[0].message.content)

      // Process and structure the workout program
      const workoutProgram: WorkoutProgram = {
        id: `wp-${Date.now()}`,
        name: workoutProgramJson.name || "Custom Workout Program",
        description: workoutProgramJson.description || "Personalized workout program",
        weeks: workoutProgramJson.weeks || [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      return workoutProgram
    } catch (error) {
      console.error("Error generating workout recommendations:", error)
      throw error
    }
  }

  // Get nutrition recommendations based on user profile and goals
  public async getNutritionRecommendations(
    goal: "weight_loss" | "muscle_gain" | "maintenance" = "maintenance",
    dietaryRestrictions: string[] = [],
  ): Promise<NutritionRecommendation> {
    try {
      const prompt = `Generate personalized nutrition recommendations with the following parameters:
- Goal: ${goal}
- Dietary restrictions: ${dietaryRestrictions.join(", ") || "none"}
${
  this.userProfile
    ? `
- Age: ${this.userProfile.age}
- Weight: ${this.userProfile.weight} kg
- Height: ${this.userProfile.height} cm
- Fitness level: ${this.userProfile.fitnessLevel}
- Activity level: Based on ${this.userProfile.preferredWorkoutDays.length} workout days per week`
    : ""
}

The nutrition plan should include daily calorie targets, macronutrient breakdown, and general meal planning advice. Format your response as a structured nutrition plan that can be parsed as JSON.`

      // Make API call to OpenAI
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            { role: "system", content: this.systemPrompt },
            { role: "user", content: prompt },
          ],
          temperature: 0.7,
          max_tokens: 1500,
          response_format: { type: "json_object" },
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`API error: ${errorData.error?.message || response.statusText}`)
      }

      const data = await response.json()
      const nutritionJson = JSON.parse(data.choices[0].message.content)

      // Process and structure the nutrition recommendations
      const nutritionRecommendation: NutritionRecommendation = {
        dailyCalories: nutritionJson.dailyCalories || 0,
        macros: nutritionJson.macros || { protein: 0, carbs: 0, fats: 0 },
        mealPlan: nutritionJson.mealPlan,
      }

      return nutritionRecommendation
    } catch (error) {
      console.error("Error generating nutrition recommendations:", error)
      throw error
    }
  }

  // Get exercise recommendations for specific pain or injury
  public async getExerciseForPain(
    painArea: string,
    painIntensity: "mild" | "moderate" | "severe" = "moderate",
  ): Promise<string> {
    try {
      const prompt = `The user is experiencing ${painIntensity} pain in their ${painArea}. 
      
Provide appropriate exercise recommendations or modifications that might help, along with general advice about when to see a healthcare professional. 

Be cautious and emphasize that this is not medical advice. Focus on gentle mobility exercises and modifications to existing workouts.`

      // Add this specific request to conversation history
      this.conversationHistory.push({
        role: "user",
        content: prompt,
        timestamp: new Date(),
      })

      // Make API call to OpenAI
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            { role: "system", content: this.systemPrompt },
            { role: "user", content: prompt },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`API error: ${errorData.error?.message || response.statusText}`)
      }

      const data = await response.json()
      const advice = data.choices[0].message.content

      return advice
    } catch (error) {
      console.error("Error getting exercise recommendations for pain:", error)
      throw error
    }
  }

  // Get conversation history
  public getConversationHistory(): AssistantMessage[] {
    return this.conversationHistory.filter((msg) => msg.role !== "system")
  }

  // Clear conversation history
  public clearConversationHistory(): void {
    const systemMessage = this.conversationHistory.find((msg) => msg.role === "system")
    this.conversationHistory = systemMessage ? [systemMessage] : []
  }

  // Add these methods to the AssistantAPI class

  // Get today's workout
  public getTodayWorkout(): WorkoutSchedule | null {
    const workoutManager = getWorkoutManager()
    return workoutManager.getTodayWorkout()
  }

  // Get workout for a specific date
  public getWorkoutForDate(date: Date): WorkoutSchedule | null {
    const workoutManager = getWorkoutManager()
    return workoutManager.getWorkoutForDate(date)
  }

  // Get upcoming workouts
  public getUpcomingWorkouts(days = 7): WorkoutSchedule[] {
    const workoutManager = getWorkoutManager()
    return workoutManager.getUpcomingWorkouts(days)
  }

  // Cancel a workout
  public cancelWorkout(workoutId: string): boolean {
    const workoutManager = getWorkoutManager()
    return workoutManager.cancelWorkout(workoutId)
  }

  // Reschedule a workout
  public rescheduleWorkout(workoutId: string, newDate: Date): boolean {
    const workoutManager = getWorkoutManager()
    return workoutManager.rescheduleWorkout(workoutId, newDate)
  }

  // Handle rescheduling request
  public async handleReschedulingRequest(date: string, workoutId?: string): Promise<string> {
    try {
      const workoutManager = getWorkoutManager()

      // Parse the date string
      let targetDate: Date

      if (date.toLowerCase().includes("tomorrow")) {
        targetDate = new Date()
        targetDate.setDate(targetDate.getDate() + 1)
      } else if (date.toLowerCase().includes("next")) {
        targetDate = new Date()
        // Handle "next Monday", "next Tuesday", etc.
        const dayMap: Record<string, number> = {
          sunday: 0,
          monday: 1,
          tuesday: 2,
          wednesday: 3,
          thursday: 4,
          friday: 5,
          saturday: 6,
        }

        for (const [day, index] of Object.entries(dayMap)) {
          if (date.toLowerCase().includes(day)) {
            const today = targetDate.getDay()
            const daysUntil = (index - today + 7) % 7
            targetDate.setDate(targetDate.getDate() + (daysUntil === 0 ? 7 : daysUntil))
            break
          }
        }
      } else {
        // Try to parse as a date string
        targetDate = new Date(date)

        // If invalid, default to tomorrow
        if (isNaN(targetDate.getTime())) {
          targetDate = new Date()
          targetDate.setDate(targetDate.getDate() + 1)
        }
      }

      // If no specific workout ID is provided, use today's workout
      if (!workoutId) {
        const todayWorkout = workoutManager.getTodayWorkout()
        if (todayWorkout) {
          workoutId = todayWorkout.id
        } else {
          return "I couldn't find a workout scheduled for today to reschedule. Would you like to schedule a new workout instead?"
        }
      }

      // Attempt to reschedule
      const success = workoutManager.rescheduleWorkout(workoutId, targetDate)

      if (success) {
        const formattedDate = targetDate.toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })

        return `Great! I've rescheduled your workout for ${formattedDate}. I'll send you a reminder before the session. Is there anything else you need help with?`
      } else {
        return "I'm sorry, I couldn't reschedule your workout. Please try a different date or time."
      }
    } catch (error) {
      console.error("Error handling rescheduling request:", error)
      return "I encountered an error while trying to reschedule your workout. Please try again with a specific date and time."
    }
  }

  // Handle break workout request
  public async handleBreakWorkoutRequest(duration: number): Promise<string> {
    try {
      const workoutManager = getWorkoutManager()

      // Get the appropriate break workout template
      const template = getBreakWorkoutTemplate(duration)

      // Add the break workout to the schedule
      const now = new Date()
      const breakWorkout = workoutManager.addBreakWorkout(duration, now)

      // Format the response
      let response = `Perfect! I've added a ${duration}-minute ${template.name} to your schedule for today. Here's what it includes:\n\n`

      breakWorkout.exercises.forEach((exercise, index) => {
        response += `${index + 1}. ${exercise.name}: ${exercise.sets} ${exercise.sets > 1 ? "sets" : "set"} of ${exercise.reps}\n`
      })

      response +=
        "\nYou can access this workout from your quick workouts section. Would you like me to set a reminder for this?"

      return response
    } catch (error) {
      console.error("Error handling break workout request:", error)
      return "I encountered an error while creating your break workout. Please try again with a specific duration."
    }
  }

  // Suggest alternative exercises
  public async suggestAlternativeExercises(targetMuscle: string): Promise<string> {
    try {
      const alternatives = suggestAlternativeExercises(targetMuscle)

      let response = `Here are some alternative exercises for ${targetMuscle}:\n\n`

      alternatives.forEach((exercise, index) => {
        response += `${index + 1}. ${exercise.name}: ${exercise.sets} sets of ${exercise.reps}\n`
      })

      response += "\nWould you like me to add any of these to your current workout plan?"

      return response
    } catch (error) {
      console.error("Error suggesting alternative exercises:", error)
      return "I encountered an error while finding alternative exercises. Please try again with a specific muscle group."
    }
  }

  // Get available time slots for rescheduling
  public getAvailableTimeSlots(days = 7): Date[] {
    const workoutManager = getWorkoutManager()
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return workoutManager.getAvailableTimeSlots(tomorrow, days)
  }
}

// Replace the getAssistantAPI function with this improved version

// Create a singleton instance for use throughout the app
let assistantInstance: AssistantAPI | null = null

export const getAssistantAPI = (apiKey: string): AssistantAPI => {
  // If we already have an instance, return it regardless of API key
  if (assistantInstance) {
    return assistantInstance
  }

  // Create a new instance even if the API key is invalid
  // The AssistantAPI class will handle fallback mode internally
  assistantInstance = new AssistantAPI(apiKey || "")

  return assistantInstance
}

