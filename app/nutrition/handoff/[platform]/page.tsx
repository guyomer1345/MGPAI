"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, Award, CheckCircle, Copy, ExternalLink, Info, Sparkles } from "lucide-react"
import Link from "next/link"
import MobileHeader from "@/components/mobile-header"

export default function PlatformHandoffPage({ params }: { params: { platform: string } }) {
  const [copiedCode, setCopiedCode] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const [redirecting, setRedirecting] = useState(false)

  // Platform data
  const platformData = {
    ubereats: {
      name: "UberEats",
      logo: "/placeholder.svg?key=82tbe",
      color: "#06C167",
      promoCode: "FITNESS20",
      discount: "20% off",
      deepLink: "https://ubereats.com",
      instructions: [
        "Open UberEats app or website",
        "Search for 'Green Protein Bowl'",
        "Select 'Recovery Protein Bowl'",
        "Apply promo code at checkout",
      ],
    },
    doordash: {
      name: "DoorDash",
      logo: "/placeholder.svg?key=vqkbe",
      color: "#FF3008",
      promoCode: "FIT15DD",
      discount: "15% off",
      deepLink: "https://doordash.com",
      instructions: [
        "Open DoorDash app or website",
        "Search for 'Green Protein Bowl'",
        "Select 'Recovery Protein Bowl'",
        "Apply promo code at checkout",
      ],
    },
    grubhub: {
      name: "GrubHub",
      logo: "/placeholder.svg?key=hlnoy",
      color: "#FF8000",
      promoCode: "FITGRUB10",
      discount: "10% off + free delivery",
      deepLink: "https://grubhub.com",
      instructions: [
        "Open GrubHub app or website",
        "Search for 'Green Protein Bowl'",
        "Select 'Recovery Protein Bowl'",
        "Apply promo code at checkout",
      ],
    },
  }

  // Get platform from params
  const platform = params.platform.toLowerCase() as keyof typeof platformData
  const currentPlatform = platformData[platform] || platformData.ubereats

  // Handle copy promo code
  const copyPromoCode = () => {
    navigator.clipboard.writeText(currentPlatform.promoCode)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  // Countdown effect
  useEffect(() => {
    if (countdown > 0 && !redirecting) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0 && !redirecting) {
      setRedirecting(true)
      // In a real app, this would redirect to the platform's deep link
      // window.location.href = currentPlatform.deepLink
    }
  }, [countdown, redirecting, currentPlatform.deepLink])

  return (
    <main className="pb-24">
      <MobileHeader showProfile={false} title={`Order with ${currentPlatform.name}`} />

      <div className="mt-4">
        <Link href="/nutrition/meal-details" className="flex items-center text-white/80 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Meal Details
        </Link>

        {/* Platform Handoff Card */}
        <motion.div
          className="bg-[#1a1a1a] rounded-xl p-4 mb-4 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: currentPlatform.color }}></div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-12 h-12 relative rounded-xl overflow-hidden bg-white p-2 mr-3">
                <Image
                  src={currentPlatform.logo || "/placeholder.svg"}
                  alt={currentPlatform.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="text-white font-bold text-lg">Redirecting to {currentPlatform.name}</h2>
                <p className="text-white/60 text-sm">You'll be redirected in {countdown} seconds</p>
              </div>
            </div>
          </div>

          {/* Promo Code Section */}
          <div className="bg-[#2a2a2a] rounded-lg p-3 mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-white font-medium">Your Promo Code</h3>
              <div className="bg-[#3f3f3f] rounded-full px-2 py-0.5">
                <span className="text-[#aaf163] text-xs">{currentPlatform.discount}</span>
              </div>
            </div>

            <div className="flex items-center justify-between bg-[#1a1a1a] rounded-lg p-3">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-[#3f3f3f] flex items-center justify-center mr-2">
                  <Sparkles className="w-4 h-4 text-[#ffeb3b]" />
                </div>
                <span className="text-white font-bold text-lg">{currentPlatform.promoCode}</span>
              </div>
              <button
                onClick={copyPromoCode}
                className="bg-[#7c57ff] hover:bg-[#6744e0] text-white px-3 py-1.5 rounded-lg flex items-center transition-all duration-300"
              >
                {copiedCode ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-1.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Instructions */}
          <div className="mb-4">
            <h3 className="text-white font-medium mb-2">Quick Instructions</h3>
            <div className="space-y-2">
              {currentPlatform.instructions.map((instruction, index) => (
                <div key={index} className="flex items-start">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center mr-2 flex-shrink-0 text-xs font-bold"
                    style={{ backgroundColor: `${currentPlatform.color}30`, color: currentPlatform.color }}
                  >
                    {index + 1}
                  </div>
                  <p className="text-white/80 text-xs">{instruction}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Rewards Info */}
          <div className="bg-[#2a2a2a] rounded-lg p-3 mb-4">
            <div className="flex items-center">
              <Award className="w-4 h-4 text-[#ffeb3b] mr-1.5" />
              <span className="text-white text-sm font-medium">+50 Points</span>
            </div>
            <p className="text-white/60 text-xs mt-1">
              Complete your order to earn 50 points. Points will be added automatically.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Link href="/nutrition/meal-details" className="flex-1">
              <button className="w-full bg-[#3f3f3f] text-white py-2 rounded-lg flex items-center justify-center">
                Cancel
              </button>
            </Link>
            <a href={currentPlatform.deepLink} className="flex-1" target="_blank" rel="noopener noreferrer">
              <button
                className="w-full text-white py-2 rounded-lg flex items-center justify-center"
                style={{
                  background: redirecting
                    ? `linear-gradient(to right, ${currentPlatform.color}, ${currentPlatform.color}CC)`
                    : "linear-gradient(to right, #7c57ff, #aaf163)",
                }}
              >
                {redirecting ? (
                  <>
                    <span className="font-medium">Opening {currentPlatform.name}</span>
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    <span className="font-medium">Open Now</span>
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </a>
          </div>
        </motion.div>

        {/* Return Instructions */}
        <div className="bg-[#1a1a1a] rounded-xl p-4">
          <div className="flex items-start mb-3">
            <Info className="w-4 h-4 text-[#7c57ff] mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-white/80 text-xs">
              Return to the app after ordering to track your rewards points and nutrition goals.
            </p>
          </div>
          <Link href="/">
            <button className="w-full bg-[#3f3f3f] hover:bg-[#4a4a4a] text-white py-2 rounded-lg transition-all duration-300">
              Return to Home
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
