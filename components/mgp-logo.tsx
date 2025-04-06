export default function MGPLogo() {
  return (
    <svg
      width="160"
      height="60"
      viewBox="0 0 200 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-12 w-auto"
    >
      {/* M */}
      <path
        d="M10 15L30 15L40 35L50 15L70 15L70 65L50 65L50 40L40 55L30 40L30 65L10 65L10 15Z"
        fill="url(#mgp-gradient)"
      />
      {/* G */}
      <path
        d="M80 15L130 15L130 35L100 35L100 40L120 40L120 65L80 65L80 15ZM100 45L100 50L110 50L110 45L100 45Z"
        fill="url(#mgp-gradient)"
      />
      {/* P */}
      <path
        d="M140 15L180 15L180 40L160 40L160 65L140 65L140 15ZM160 20L160 35L170 35L170 20L160 20Z"
        fill="url(#mgp-gradient)"
      />
      {/* Dot */}
      <circle cx="190" cy="40" r="5" fill="url(#mgp-gradient)" />
      {/* A */}
      <path
        d="M210 15L230 15L250 65L230 65L227 55L213 55L210 65L190 65L210 15ZM217 45L223 45L220 35L217 45Z"
        fill="url(#mgp-gradient)"
      />
      {/* I */}
      <path d="M260 15L280 15L280 65L260 65L260 15Z" fill="url(#mgp-gradient)" />

      <defs>
        <linearGradient id="mgp-gradient" x1="10" y1="15" x2="10" y2="65" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#00D2FF" />
          <stop offset="1" stopColor="#7c57ff" />
        </linearGradient>
      </defs>
    </svg>
  )
}

