import Image from "next/image"

export default function MGPLogoImage() {
  return <Image src="/images/mgp-logo.png" alt="MGP.AI Logo" width={160} height={60} className="h-12 w-auto" priority />
}

