import StatusBar from "@/components/status-bar"
import Header from "@/components/header"
import AnimatedInput from "@/components/animated-input"
import AnimatedButton from "@/components/animated-button"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#1e1e1e] text-white">
      {/* Top section with status bar and logo */}
      <div className="pt-6 px-6 relative">
        <StatusBar />
        <Header title="Log In" showBackButton={true} />

        <div className="mt-12 animate-fadeIn">
          <h1 className="text-4xl font-bold">
            Hi, Welcome To <span className="text-gradient">MGP.AI</span>
          </h1>
          <h2 className="text-3xl font-bold mt-4">How Would You Be Comfortable Connecting?</h2>
        </div>
      </div>

      {/* Form section */}
      <div className="py-12 px-6 flex-1">
        <div className="space-y-8">
          <AnimatedInput label="Phone number" defaultValue="+ 9 7 2 -  8 6 9 8 9 8 8" />

          <AnimatedInput label="Username" defaultValue="Ido Mena" />
        </div>

        <div className="mt-12">
          <AnimatedButton href="/verification">Log In</AnimatedButton>
        </div>

        <div className="mt-12">
          <p className="text-[#a3a3a8] text-center mb-6">or sign up with</p>

          <div className="flex justify-center gap-6 mb-12">
            <button className="w-14 h-14 rounded-xl bg-[#2a2a2a] border border-[#3a3a3a] flex items-center justify-center hover:bg-[#333333] transition-all duration-300 hover:scale-105 hover:border-[#7c57ff]">
              <span className="text-[#7c57ff] text-2xl font-bold">G</span>
            </button>
            <button className="w-14 h-14 rounded-xl bg-[#2a2a2a] border border-[#3a3a3a] flex items-center justify-center hover:bg-[#333333] transition-all duration-300 hover:scale-105 hover:border-[#7c57ff]">
              <svg width="24" height="28" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14.5 0.5C14.5833 1.58333 14.2083 2.66667 13.375 3.5C12.5417 4.33333 11.4583 4.83333 10.375 4.75C10.2083 3.75 10.625 2.66667 11.375 1.91667C12.2083 1.08333 13.375 0.583333 14.5 0.5ZM17.7917 12.5833C17.7917 12.6667 17.7917 12.75 17.7917 12.8333C17.7917 15.5833 19.125 17.25 20 17.25C19.0417 18.4167 17.7917 19.0833 16.5417 19.0833C15.2083 19.0833 14.5 18.3333 13.2917 18.3333C12 18.3333 11.2917 19.0833 10.0417 19.0833C8.70833 19.0833 7.375 18.3333 6.41667 17.0833C4.95833 15.1667 3.875 11.75 3.875 8.58333C3.875 5.91667 5.20833 4.25 6.54167 3.41667C7.45833 2.83333 8.625 2.5 9.70833 2.5C10.7917 2.5 11.7917 3.25 12.5417 3.25C13.375 3.25 14.2917 2.5 15.5417 2.5C16.4583 2.5 17.375 2.75 18.125 3.25C16.2917 4.5 15.375 6.58333 15.375 8.58333C15.375 10.1667 16 11.5833 17.7917 12.5833Z"
                  fill="#7c57ff"
                />
              </svg>
            </button>
            <button className="w-14 h-14 rounded-xl bg-[#2a2a2a] border border-[#3a3a3a] flex items-center justify-center hover:bg-[#333333] transition-all duration-300 hover:scale-105 hover:border-[#7c57ff]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z"
                  stroke="#7c57ff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.5 8C18.3284 8 19 7.32843 19 6.5C19 5.67157 18.3284 5 17.5 5C16.6716 5 16 5.67157 16 6.5C16 7.32843 16.6716 8 17.5 8Z"
                  stroke="#7c57ff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 19C13.6569 19 15 17.6569 15 16C15 14.3431 13.6569 13 12 13C10.3431 13 9 14.3431 9 16C9 17.6569 10.3431 19 12 19Z"
                  stroke="#7c57ff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M12 13V10" stroke="#7c57ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  d="M6.5 8C6.5 8 6 10 6 12C6 14 7 16.5 8 17.5"
                  stroke="#7c57ff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.5 8C17.5 8 18 10 18 12C18 14 17 16.5 16 17.5"
                  stroke="#7c57ff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <p className="text-center">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#aaf163] font-medium hover:underline relative group">
              Sign Up
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#aaf163] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

