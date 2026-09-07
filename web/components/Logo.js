import Image from "next/image"
import config from "@/config"

// Monograma IVCA (rosa) — al lado del nombre de marca.
export default function Logo({ className = "h-10" }) {
  const src = config.brand.logoSrc || "/logo-ivca-mark.png"

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center ${className}`}
      aria-hidden
    >
      <Image
        src={src}
        alt=""
        width={619}
        height={1024}
        className="h-full w-auto max-w-none object-contain"
        unoptimized
      />
    </span>
  )
}
