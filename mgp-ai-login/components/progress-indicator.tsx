interface ProgressIndicatorProps {
  current: number
  total: number
  color?: "green" | "white"
}

export default function ProgressIndicator({ current, total, color = "green" }: ProgressIndicatorProps) {
  return (
    <div className={`absolute right-6 top-16 ${color === "green" ? "text-green-400" : "text-white"}`}>
      {current} of {total}
    </div>
  )
}

