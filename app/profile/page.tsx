import MobileHeader from "@/components/mobile-header"
import { User, Settings, Award, Calendar, BarChart2, LogOut } from "lucide-react"

export default function ProfilePage() {
  return (
    <main>
      <MobileHeader showProfile={false} title="Profile" />

      <div className="mt-8 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#7c57ff]">
          <img src="/placeholder.svg?height=96&width=96" alt="Profile" className="w-full h-full object-cover" />
        </div>

        <h1 className="text-2xl font-bold text-white mt-4">Ido Mena</h1>
        <p className="text-gray-400">Premium Member</p>

        <div className="mt-4 bg-[#3f3f3f] rounded-full px-4 py-2">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-[#7c57ff] flex items-center justify-center">
              <span className="text-white text-xs font-bold">45%</span>
            </div>
            <span className="ml-2 text-white">Profile Completion</span>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <div className="bg-[#3f3f3f] rounded-lg p-4 transition-all duration-300 hover:bg-[#4a4a4a] hover:translate-x-2 cursor-pointer">
          <div className="flex items-center">
            <User className="w-6 h-6 text-[#7c57ff] mr-3" />
            <span className="text-white">Personal Information</span>
          </div>
        </div>

        <div className="bg-[#3f3f3f] rounded-lg p-4 transition-all duration-300 hover:bg-[#4a4a4a] hover:translate-x-2 cursor-pointer">
          <div className="flex items-center">
            <Settings className="w-6 h-6 text-[#7c57ff] mr-3" />
            <span className="text-white">Settings</span>
          </div>
        </div>

        <div className="bg-[#3f3f3f] rounded-lg p-4 transition-all duration-300 hover:bg-[#4a4a4a] hover:translate-x-2 cursor-pointer">
          <div className="flex items-center">
            <Award className="w-6 h-6 text-[#7c57ff] mr-3" />
            <span className="text-white">Achievements</span>
          </div>
        </div>

        <div className="bg-[#3f3f3f] rounded-lg p-4 transition-all duration-300 hover:bg-[#4a4a4a] hover:translate-x-2 cursor-pointer">
          <div className="flex items-center">
            <Calendar className="w-6 h-6 text-[#7c57ff] mr-3" />
            <span className="text-white">Workout History</span>
          </div>
        </div>

        <div className="bg-[#3f3f3f] rounded-lg p-4 transition-all duration-300 hover:bg-[#4a4a4a] hover:translate-x-2 cursor-pointer">
          <div className="flex items-center">
            <BarChart2 className="w-6 h-6 text-[#7c57ff] mr-3" />
            <span className="text-white">Progress Analytics</span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button className="w-full bg-[#3f3f3f] text-red-500 py-3 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-red-500 hover:text-white">
          <LogOut className="w-5 h-5 mr-2" />
          <span>Log Out</span>
        </button>
      </div>
    </main>
  )
}

