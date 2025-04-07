import MobileHeader from "@/components/mobile-header"
import { Settings, Info, CreditCard, HelpCircle, MessageSquare, Bell, Shield, Award } from "lucide-react"

export default function MorePage() {
  return (
    <main>
      <MobileHeader showProfile={false} title="More" />

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-white mb-6">Settings & Info</h2>

        <div className="space-y-4">
          {/* Account Settings */}
          <div className="bg-[#3f3f3f] rounded-lg p-4 transition-all duration-300 hover:bg-[#4a4a4a] hover:translate-x-2 cursor-pointer">
            <div className="flex items-center">
              <Settings className="w-6 h-6 text-[#7c57ff] mr-3" />
              <span className="text-white">Account Settings</span>
            </div>
          </div>

          {/* Subscription */}
          <div className="bg-[#3f3f3f] rounded-lg p-4 transition-all duration-300 hover:bg-[#4a4a4a] hover:translate-x-2 cursor-pointer">
            <div className="flex items-center">
              <CreditCard className="w-6 h-6 text-[#7c57ff] mr-3" />
              <span className="text-white">Subscription</span>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-[#3f3f3f] rounded-lg p-4 transition-all duration-300 hover:bg-[#4a4a4a] hover:translate-x-2 cursor-pointer">
            <div className="flex items-center">
              <Bell className="w-6 h-6 text-[#7c57ff] mr-3" />
              <span className="text-white">Notifications</span>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="bg-[#3f3f3f] rounded-lg p-4 transition-all duration-300 hover:bg-[#4a4a4a] hover:translate-x-2 cursor-pointer">
            <div className="flex items-center">
              <Shield className="w-6 h-6 text-[#7c57ff] mr-3" />
              <span className="text-white">Privacy & Security</span>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mt-8 mb-6">Support</h2>

        <div className="space-y-4">
          {/* Help Center */}
          <div className="bg-[#3f3f3f] rounded-lg p-4 transition-all duration-300 hover:bg-[#4a4a4a] hover:translate-x-2 cursor-pointer">
            <div className="flex items-center">
              <HelpCircle className="w-6 h-6 text-[#7c57ff] mr-3" />
              <span className="text-white">Help Center</span>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-[#3f3f3f] rounded-lg p-4 transition-all duration-300 hover:bg-[#4a4a4a] hover:translate-x-2 cursor-pointer">
            <div className="flex items-center">
              <MessageSquare className="w-6 h-6 text-[#7c57ff] mr-3" />
              <span className="text-white">Contact Support</span>
            </div>
          </div>

          {/* About MGP.AI */}
          <div className="bg-[#3f3f3f] rounded-lg p-4 transition-all duration-300 hover:bg-[#4a4a4a] hover:translate-x-2 cursor-pointer">
            <div className="flex items-center">
              <Info className="w-6 h-6 text-[#7c57ff] mr-3" />
              <span className="text-white">About MGP.AI</span>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-[#3f3f3f] rounded-lg p-4 transition-all duration-300 hover:bg-[#4a4a4a] hover:translate-x-2 cursor-pointer">
            <div className="flex items-center">
              <Award className="w-6 h-6 text-[#7c57ff] mr-3" />
              <span className="text-white">Achievements</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">Version 1.0.0</p>
          <p className="text-gray-400 text-sm mt-1">© 2025 MGP.AI. All rights reserved.</p>
        </div>
      </div>
    </main>
  )
}

