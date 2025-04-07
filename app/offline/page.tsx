"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, WifiOff } from "lucide-react"

export default function OfflinePage() {
  const router = useRouter()

  // Try to reconnect periodically
  useEffect(() => {
    const checkConnection = setInterval(() => {
      if (navigator.onLine) {
        clearInterval(checkConnection)
        router.push("/")
      }
    }, 5000)

    return () => clearInterval(checkConnection)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <WifiOff size={64} className="mb-6 text-gray-400" />
      <h1 className="text-2xl font-bold mb-2">You're offline</h1>
      <p className="text-gray-400 mb-6">Please check your internet connection and try again.</p>

      <div className="space-y-4 w-full max-w-xs">
        <button
          onClick={() => router.push("/")}
          className="w-full py-3 px-4 bg-red-600 text-white rounded-lg flex items-center justify-center"
        >
          <ArrowLeft size={18} className="mr-2" />
          Return to Home
        </button>

        <div className="text-sm text-gray-500">
          <p>Some features are available offline:</p>
          <ul className="mt-2 list-disc list-inside">
            <li>Cached workout routines</li>
            <li>Previously viewed exercises</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

