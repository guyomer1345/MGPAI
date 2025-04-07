"use client"

import { useState, useEffect } from "react"
import { Download } from "lucide-react"

export default function PWAInstaller() {
  const [installPrompt, setInstallPrompt] = useState<any>(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [showInstallButton, setShowInstallButton] = useState(false)

  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((registration) => {
            console.log("Service Worker registered with scope:", registration.scope)
          })
          .catch((error) => {
            console.error("Service Worker registration failed:", error)
          })
      })
    }

    // Handle PWA install prompt
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later
      setInstallPrompt(e)
      setShowInstallButton(true)
    })

    // Check if app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
      setShowInstallButton(false)
    }

    // Listen for app install
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true)
      setShowInstallButton(false)
      console.log("PWA was installed")
    })

    return () => {
      window.removeEventListener("beforeinstallprompt", () => {})
      window.removeEventListener("appinstalled", () => {})
    }
  }, [])

  const handleInstallClick = () => {
    if (!installPrompt) return

    // Show the install prompt
    installPrompt.prompt()

    // Wait for the user to respond to the prompt
    installPrompt.userChoice.then((choiceResult: { outcome: string }) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt")
        setShowInstallButton(false)
      } else {
        console.log("User dismissed the install prompt")
      }
      // Clear the saved prompt since it can't be used again
      setInstallPrompt(null)
    })
  }

  if (!showInstallButton || isInstalled) return null

  return (
    <div className="fixed bottom-24 right-4 z-50">
      <button
        onClick={handleInstallClick}
        className="flex items-center justify-center bg-red-600 text-white p-3 rounded-full shadow-lg"
        aria-label="Install app"
      >
        <Download size={24} />
      </button>
    </div>
  )
}

