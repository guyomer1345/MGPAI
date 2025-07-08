"use client"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Award,
  CheckCircle,
  Flame,
  Gift,
  HelpCircle,
  Info,
  Star,
  TrendingUp,
  Utensils,
  Zap,
} from "lucide-react"
import Link from "next/link"
import MobileHeader from "@/components/mobile-header"

export default function HowToEarnPage() {
  // Sample ways to earn points data
  const earnPointsWays = [
    {
      title: "Complete Workouts",
      description: "Earn points for each workout you complete based on intensity and duration",
      icon: Flame,
      color: "#7c57ff",
      examples: [
        { action: "Complete any workout", points: 50, description: "Basic points for any completed workout" },
        {
          action: "Complete a challenge workout",
          points: 75,
          description: "Bonus points for more challenging workouts",
        },
        {
          action: "Achieve a personal best",
          points: 100,
          description: "Extra points when you beat your previous records",
        },
        { action: "Complete a full program", points: 300, description: "Major bonus for finishing a complete program" },
      ],
    },
    {
      title: "Order Recommended Meals",
      description: "Earn points when you order meals through our partner platforms",
      icon: Utensils,
      color: "#aaf163",
      examples: [
        { action: "Order any recommended meal", points: 25, description: "Basic points for any meal order" },
        { action: "Order a perfect match meal", points: 50, description: "Bonus for meals that match your workout" },
        { action: "First order of the week", points: 75, description: "Extra points for your first weekly order" },
        { action: "Try a new restaurant", points: 100, description: "Bonus for trying new partner restaurants" },
      ],
    },
    {
      title: "Maintain Streaks",
      description: "Earn bonus points for consistent activity and engagement",
      icon: Zap,
      color: "#ffeb3b",
      examples: [
        { action: "3 workouts in a week", points: 100, description: "Bonus for consistent weekly workouts" },
        { action: "5 meals in a week", points: 150, description: "Bonus for consistent weekly meal orders" },
        { action: "30-day login streak", points: 300, description: "Major bonus for daily app engagement" },
        { action: "Complete all weekly goals", points: 200, description: "Bonus for achieving all weekly targets" },
      ],
    },
    {
      title: "Achieve Goals",
      description: "Earn points when you hit your fitness and nutrition goals",
      icon: Star,
      color: "#ff6b6b",
      examples: [
        { action: "Reach a nutrition goal", points: 200, description: "Bonus for hitting nutrition targets" },
        { action: "Complete a fitness milestone", points: 250, description: "Bonus for achieving fitness milestones" },
        { action: "Finish a quarterly plan", points: 500, description: "Major bonus for completing a quarterly plan" },
        { action: "Maintain weight/fitness goal", points: 300, description: "Bonus for maintaining achieved goals" },
      ],
    },
  ]

  // Sample membership levels data
  const membershipLevels = [
    {
      level: 1,
      name: "Starter",
      pointsRange: "0-500 points",
      benefits: ["Basic rewards and discounts", "Access to recommended meals", "Standard delivery options"],
      color: "#3f3f3f",
    },
    {
      level: 2,
      name: "Pro",
      pointsRange: "500-1000 points",
      benefits: [
        "Enhanced rewards and exclusive offers",
        "Priority meal recommendations",
        "Discounted delivery fees",
        "Weekly bonus point opportunities",
      ],
      color: "#7c57ff",
      current: true,
    },
    {
      level: 3,
      name: "Elite",
      pointsRange: "1000+ points",
      benefits: [
        "Premium rewards and priority service",
        "Exclusive restaurant partnerships",
        "Free delivery options",
        "Personal nutrition consultation",
        "Early access to new features",
      ],
      color: "#ffeb3b",
    },
  ]

  return (
    <main className="pb-24">
      <MobileHeader showProfile={false} title="How to Earn Points" />

      <div className="mt-4">
        <Link href="/nutrition/rewards" className="flex items-center text-white/80 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Rewards
        </Link>

        {/* Introduction */}
        <motion.div
          className="bg-gradient-to-r from-[#7c57ff] to-[#00c6ff] rounded-xl p-4 mb-6 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-white/20"
                initial={{
                  x: Math.random() * 100 + "%",
                  y: Math.random() * 100 + "%",
                  opacity: 0.2 + Math.random() * 0.3,
                }}
                animate={{
                  x: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
                  y: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 10 + Math.random() * 20,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>

          <div className="relative z-10">
            <h1 className="text-white font-bold text-xl mb-2 flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Rewards Program
            </h1>
            <p className="text-white/80 text-sm mb-3">
              Earn points through workouts, meal orders, and achieving your fitness goals. Redeem points for exclusive
              rewards and discounts.
            </p>
            <div className="flex items-center">
              <div className="bg-white/20 rounded-full px-3 py-1 flex items-center">
                <Star className="w-3.5 h-3.5 text-[#ffeb3b] mr-1.5" />
                <span className="text-white text-sm">Level 2 Member</span>
              </div>
              <div className="bg-white/20 rounded-full px-3 py-1 flex items-center ml-2">
                <Gift className="w-3.5 h-3.5 text-white mr-1.5" />
                <span className="text-white text-sm">450 Points</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Ways to Earn Points */}
        <div className="mb-6">
          <h2 className="text-white font-semibold text-lg mb-3 flex items-center">
            <TrendingUp className="w-5 h-5 text-[#aaf163] mr-2" />
            Ways to Earn Points
          </h2>

          <div className="space-y-4">
            {earnPointsWays.map((way, index) => (
              <motion.div
                key={index}
                className="bg-[#1a1a1a] rounded-xl p-4 border border-[#3f3f3f]/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                    style={{ backgroundColor: `${way.color}20` }}
                  >
                    <way.icon className="w-5 h-5" style={{ color: way.color }} />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{way.title}</h3>
                    <p className="text-white/60 text-xs">{way.description}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {way.examples.map((example, idx) => (
                    <div key={idx} className="bg-[#2a2a2a] rounded-lg p-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-white text-sm">{example.action}</span>
                        <span className="text-[#aaf163] text-sm font-medium">+{example.points}</span>
                      </div>
                      <p className="text-white/60 text-xs">{example.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Membership Levels */}
        <div className="mb-6">
          <h2 className="text-white font-semibold text-lg mb-3 flex items-center">
            <Star className="w-5 h-5 text-[#ffeb3b] mr-2" />
            Membership Levels
          </h2>

          <div className="space-y-4">
            {membershipLevels.map((level) => (
              <motion.div
                key={level.level}
                className={`bg-[#1a1a1a] rounded-xl p-4 border ${
                  level.current ? "border-[#7c57ff]" : "border-[#3f3f3f]/50"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: level.level * 0.1 }}
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                      style={{ backgroundColor: `${level.color}20` }}
                    >
                      <span className="text-lg font-bold" style={{ color: level.color }}>
                        {level.level}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-white font-medium flex items-center">
                        {level.name}
                        {level.current && (
                          <span className="bg-[#7c57ff]/20 text-[#7c57ff] text-xs px-2 py-0.5 rounded-full ml-2">
                            Current
                          </span>
                        )}
                      </h3>
                      <p className="text-white/60 text-xs">{level.pointsRange}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#2a2a2a] rounded-lg p-3">
                  <h4 className="text-white text-sm font-medium mb-2">Benefits:</h4>
                  <ul className="space-y-1">
                    {level.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="w-3.5 h-3.5 text-[#aaf163] mr-1.5 mt-0.5 flex-shrink-0" />
                        <span className="text-white/80 text-xs">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-6">
          <h2 className="text-white font-semibold text-lg mb-3 flex items-center">
            <HelpCircle className="w-5 h-5 text-[#60a5fa] mr-2" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            <div className="bg-[#1a1a1a] rounded-xl p-4">
              <h3 className="text-white font-medium mb-2">How long do points last?</h3>
              <p className="text-white/80 text-sm">
                Points are valid for 12 months from the date they are earned. Any unused points will expire after this
                period.
              </p>
            </div>

            <div className="bg-[#1a1a1a] rounded-xl p-4">
              <h3 className="text-white font-medium mb-2">How do I track my points?</h3>
              <p className="text-white/80 text-sm">
                Your points are automatically tracked in the Rewards section of the app. You can view your current
                balance, history, and available rewards at any time.
              </p>
            </div>

            <div className="bg-[#1a1a1a] rounded-xl p-4">
              <h3 className="text-white font-medium mb-2">Can I transfer points to someone else?</h3>
              <p className="text-white/80 text-sm">
                Currently, points cannot be transferred between accounts. Each user earns and redeems their own points.
              </p>
            </div>

            <div className="bg-[#1a1a1a] rounded-xl p-4">
              <h3 className="text-white font-medium mb-2">What happens if I cancel an order?</h3>
              <p className="text-white/80 text-sm">
                If you cancel an order, any points earned from that order will be deducted from your account. If you've
                already used those points, your balance may go negative.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-[#1a1a1a] rounded-xl p-4">
          <h2 className="text-white font-medium mb-3 flex items-center">
            <Info className="w-5 h-5 text-[#7c57ff] mr-2" />
            Need More Help?
          </h2>
          <p className="text-white/80 text-sm mb-3">
            If you have any questions about the rewards program or need assistance with redeeming points, our support
            team is here to help.
          </p>
          <button className="w-full bg-[#3f3f3f] hover:bg-[#4a4a4a] text-white py-2.5 rounded-lg transition-all duration-300">
            Contact Support
          </button>
        </div>
      </div>
    </main>
  )
}
