import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import NavigationBar from "@/components/navigation-bar"
import { WorkoutProvider } from "@/context/workout-context"
import PWAInstaller from "@/components/pwa-installer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MGP.AI - Fitness & Nutrition",
  description: "Your personal AI fitness and nutrition assistant",
  manifest: "/manifest.json",
  themeColor: "#1e1e1e",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MGP.AI",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "application-name": "MGP.AI",
    "apple-mobile-web-app-title": "MGP.AI",
    "msapplication-TileColor": "#1e1e1e",
    "msapplication-tap-highlight": "no",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={inter.className}>
        <WorkoutProvider>
          <div className="max-w-md mx-auto min-h-screen">
            <div className="px-4 pt-4 pb-24">{children}</div>
          </div>
          <NavigationBar />
          <PWAInstaller />
        </WorkoutProvider>
      </body>
    </html>
  )
}



import './globals.css'