import Image from "next/image"

export default function Logo() {
  return (
    <div className="text-center">
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AAkN5KmOpxP2HdvQBtgwLomIrktjWP.png"
        alt="MGP.AI Logo"
        width={120}
        height={40}
        className="h-auto"
      />
    </div>
  )
}

