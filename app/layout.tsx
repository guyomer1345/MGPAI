import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import NavigationBar from "@/components/navigation-bar"
import { WorkoutProvider } from "@/context/workout-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MGP.AI - Fitness & Nutrition",
  description: "Your personal AI fitness and nutrition assistant",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WorkoutProvider>
          <div className="max-w-md mx-auto min-h-screen">
            <div className="px-4 pt-4 pb-24">{children}</div>
          </div>
          <NavigationBar />
        </WorkoutProvider>
      </body>
    </html>
  )
}
