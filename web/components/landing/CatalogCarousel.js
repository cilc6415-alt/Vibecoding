"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import config from "@/config"

export default function CatalogCarousel() {
  const sheets = config.landing.finalCta.sheets || []
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined

    function onScroll() {
      const slideWidth = track.clientWidth
      if (!slideWidth) return
      const next = Math.round(track.scrollLeft / slideWidth)
      setIndex(Math.min(Math.max(next, 0), sheets.length - 1))
    }

    track.addEventListener("scroll", onScroll, { passive: true })
    return () => track.removeEventListener("scroll", onScroll)
  }, [sheets.length])

  function goTo(nextIndex) {
    const track = trackRef.current
    if (!track) return
    const clamped = Math.min(Math.max(nextIndex, 0), sheets.length - 1)
    track.scrollTo({
      left: clamped * track.clientWidth,
      behavior: "smooth",
    })
    setIndex(clamped)
  }

  if (!sheets.length) return null

  return (
    <div className="relative mt-10">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Carrusel del catálogo"
      >
        {sheets.map((sheet) => (
          <figure
            key={sheet.id}
            className="w-full shrink-0 snap-center px-1"
          >
            <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-[#E8DFD4] bg-white shadow-sm">
              <Image
                src={sheet.imageSrc}
                alt={sheet.label}
                width={1214}
                height={682}
                quality={100}
                className="h-auto w-full object-contain [image-rendering:high-quality] contrast-[1.05] saturate-[1.03]"
                sizes="(max-width: 768px) 100vw, 48rem"
                unoptimized
                priority={sheet.id === "hoja-1"}
              />
            </div>
            <figcaption className="sr-only">{sheet.label}</figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          type="button"
          className="btn btn-circle btn-outline border-primary text-primary hover:bg-primary hover:text-primary-content"
          aria-label="Hoja anterior"
          disabled={index <= 0}
          onClick={() => goTo(index - 1)}
        >
          <ChevronLeft className="size-5" aria-hidden />
        </button>

        <div className="flex items-center gap-2" aria-hidden>
          {sheets.map((sheet, i) => (
            <button
              key={sheet.id}
              type="button"
              className={`size-2.5 rounded-full transition ${
                i === index ? "bg-primary scale-110" : "bg-primary/25"
              }`}
              aria-label={`Ir a ${sheet.label}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <button
          type="button"
          className="btn btn-circle btn-outline border-primary text-primary hover:bg-primary hover:text-primary-content"
          aria-label="Hoja siguiente"
          disabled={index >= sheets.length - 1}
          onClick={() => goTo(index + 1)}
        >
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>
    </div>
  )
}
