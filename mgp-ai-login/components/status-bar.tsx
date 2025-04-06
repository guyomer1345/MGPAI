export default function StatusBar() {
  // Get current time
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, "0")
  const minutes = now.getMinutes().toString().padStart(2, "0")
  const timeString = `${hours}:${minutes}`

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="text-white text-lg font-medium">{timeString}</div>
      <div className="flex items-center gap-2">
        <div className="h-3.5 w-4">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 15H4V9H6V15ZM10 15H8V5H10V15ZM14 15H12V7H14V15ZM18 15H16V11H18V15Z" fill="white" />
          </svg>
        </div>
        <div className="h-3.5 w-4">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 20.5C16.6944 20.5 20.5 16.6944 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5Z"
              stroke="white"
              strokeWidth="1.5"
            />
            <path d="M12 7V12L15 15" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div className="h-3.5 w-6">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="8" width="20" height="8" rx="2" stroke="white" strokeWidth="1.5" />
            <rect x="4" y="10" width="16" height="4" rx="1" fill="white" />
            <path d="M23 10V14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}

