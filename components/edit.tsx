export default function Edit({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 20H8L18.5 9.5C19.0304 8.96956 19.3284 8.2502 19.3284 7.5C19.3284 6.7498 19.0304 6.03044 18.5 5.5C17.9696 4.96956 17.2502 4.67157 16.5 4.67157C15.7498 4.67157 15.0304 4.96956 14.5 5.5L4 16V20Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 6.5L17.5 10.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
