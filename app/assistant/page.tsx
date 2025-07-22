"use client"

import MobileHeader from "@/components/mobile-header"
import { Dumbbell, Activity, Apple, Weight, Heart, ClipboardList, Edit, MessageCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"

export default function AssistantPage() {
  const [quickPrompts, setQuickPrompts] = useState([
    {
      id: 1,
      text: "How can I improve my bench press?",
      icon: Dumbbell,
    },
    {
      id: 2,
      text: "What should I eat before a workout?",
      icon: Apple,
    },
    {
      id: 3,
      text: "My shoulder hurts when I lift weights",
      icon: Activity,
    },
    {
      id: 4,
      text: "Create a meal plan for muscle gain",
      icon: Weight,
    },
  ])

  return (
    <main>
      <MobileHeader />

      <div className="mt-6">
        <div className="flex items-center">
          <Edit className="w-7 h-7 text-[#b3a0ff] mr-2" />
          <h1 className="text-2xl font-bold">
            Hello{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00c6ff] to-[#7c57ff]">Ido Mena</span>
          </h1>
        </div>
        <h2 className="text-2xl font-bold mt-1">How Can I Help You Today?</h2>
      </div>

      {/* Main Chat Button - Moved higher */}
      <div className="mt-6">
        <Link href="/assistant/chat">
          <div className="relative bg-gradient-to-r from-[#7c57ff] to-[#00c6ff] rounded-xl p-0.5 shadow-lg hover:shadow-[0_0_15px_rgba(124,87,255,0.5)] transition-all duration-300 hover:scale-[1.02] cursor-pointer">
            <div className="bg-[#2a2a2a] rounded-[10px] p-4 flex items-center">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3 shadow-inner">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rh5qvaCNAYDjtI6smSUn31uEyeTtx1.png"
                  alt="Assistant"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium text-sm">Start a conversation</h3>
                <p className="text-white/60 text-xs">Ask me anything about fitness</p>
              </div>
              <div className="ml-2 w-8 h-8 rounded-full bg-[#3f3f3f] flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-[#aaf163]" />
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Categories Grid - Simplified */}
      <div className="mt-6">
        <h3 className="text-white text-base font-medium mb-3">Categories</h3>
        <div className="grid grid-cols-3 gap-3">
          {/* Category 1 */}
          <Link href="/assistant/chat?prompt=Recommend%20exercises%20for%20strength">
            <div className="bg-[#3f3f3f] rounded-lg p-3 flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30 hover:bg-[#4a4a4a] aspect-square">
              <Dumbbell className="w-6 h-6 text-white mb-1" />
              <span className="text-white font-medium text-center text-xs">Exercises</span>
            </div>
          </Link>

          {/* Category 2 */}
          <Link href="/assistant/chat?prompt=Help%20with%20pain%20during%20training">
            <div className="bg-[#3f3f3f] rounded-lg p-3 flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30 hover:bg-[#4a4a4a] aspect-square">
              <Activity className="w-6 h-6 text-white mb-1" />
              <span className="text-white font-medium text-center text-xs">Pain</span>
            </div>
          </Link>

          {/* Category 3 */}
          <Link href="/assistant/chat?prompt=Healthy%20diet%20recommendations">
            <div className="bg-[#3f3f3f] rounded-lg p-3 flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30 hover:bg-[#4a4a4a] aspect-square">
              <Apple className="w-6 h-6 text-white mb-1" />
              <span className="text-white font-medium text-center text-xs">Diet</span>
            </div>
          </Link>

          {/* Category 4 */}
          <Link href="/assistant/chat?prompt=Tips%20for%20building%20muscle%20mass">
            <div className="bg-[#3f3f3f] rounded-lg p-3 flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30 hover:bg-[#4a4a4a] aspect-square">
              <Weight className="w-6 h-6 text-white mb-1" />
              <span className="text-white font-medium text-center text-xs">Mass</span>
            </div>
          </Link>

          {/* Category 5 */}
          <Link href="/assistant/chat?prompt=Tips%20for%20toning%20muscles">
            <div className="bg-[#3f3f3f] rounded-lg p-3 flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30 hover:bg-[#4a4a4a] aspect-square">
              <Heart className="w-6 h-6 text-white mb-1" />
              <span className="text-white font-medium text-center text-xs">Toning</span>
            </div>
          </Link>

          {/* Category 6 */}
          <Link href="/assistant/chat?prompt=Create%20a%20training%20program">
            <div className="bg-[#3f3f3f] rounded-lg p-3 flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30 hover:bg-[#4a4a4a] aspect-square">
              <ClipboardList className="w-6 h-6 text-white mb-1" />
              <span className="text-white font-medium text-center text-xs">Program</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Conversation Starters - Simplified */}
      <div className="mt-6">
        <h3 className="text-white text-base font-medium mb-3">Popular Questions</h3>
        <div className="space-y-2">
          <Link href="/assistant/chat?prompt=What%20exercises%20should%20I%20do%20for%20back%20pain">
            <div className="bg-[#3f3f3f]/50 hover:bg-[#3f3f3f] rounded-lg p-3 flex items-center justify-between transition-all duration-300">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#7c57ff] to-[#00c6ff] flex items-center justify-center mr-3">
                  <Activity className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/90 text-sm">What exercises help with back pain?</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#7c57ff]" />
            </div>
          </Link>

          <Link href="/assistant/chat?prompt=What%20foods%20help%20build%20muscle%20mass">
            <div className="bg-[#3f3f3f]/50 hover:bg-[#3f3f3f] rounded-lg p-3 flex items-center justify-between transition-all duration-300">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#aaf163] to-[#7c57ff] flex items-center justify-center mr-3">
                  <Apple className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/90 text-sm">What foods help build muscle mass?</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#aaf163]" />
            </div>
          </Link>

          <Link href="/assistant/chat?prompt=Create%20a%20workout%20plan%20for%20toning">
            <div className="bg-[#3f3f3f]/50 hover:bg-[#3f3f3f] rounded-lg p-3 flex items-center justify-between transition-all duration-300">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ff6b6b] to-[#00c6ff] flex items-center justify-center mr-3">
                  <ClipboardList className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/90 text-sm">Create a workout plan for toning</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#ff6b6b]" />
            </div>
          </Link>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="mt-8 mb-12">
        <div className="bg-[#3f3f3f]/20 rounded-xl p-4 relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-r from-[#7c57ff]/10 to-[#00c6ff]/10 blur-xl"></div>
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-r from-[#aaf163]/10 to-[#7c57ff]/10 blur-xl"></div>

          <div className="relative z-10 flex items-center">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mr-4 shadow-lg animate-pulse-slow">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rh5qvaCNAYDjtI6smSUn31uEyeTtx1.png"
                alt="Assistant"
                width={28}
                height={28}
                className="w-7 h-7"
              />
            </div>
            <div>
              <h3 className="text-white font-bold text-base mb-1">Your Personal Fitness Guide</h3>
              <p className="text-white/70 text-xs">Ask me anything about workouts, nutrition, or fitness goals</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
