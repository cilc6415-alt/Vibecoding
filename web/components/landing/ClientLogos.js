import Image from "next/image"
import config from "@/config"

function LogoPlaceholder({ index }) {
  return (
    <li
      className="flex h-14 w-28 items-center justify-center rounded-lg border border-dashed border-base-300/80 bg-base-200/30 sm:h-16 sm:w-32"
      aria-hidden
    >
      <span className="size-6 rounded-full border border-base-300/60 bg-base-200/50" />
      <span className="sr-only">Espacio reservado {index + 1}</span>
    </li>
  )
}

export default function ClientLogos() {
  const { title, logo, placeholderCount = 3 } = config.landing.clients

  return (
    <section
      aria-label="Marcas y colaboraciones"
      className="border-t border-base-200/70 bg-base-100 py-10 md:py-14"
    >
      <div className="mx-auto max-w-4xl px-4">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-base-content/40 md:text-sm">
          {title}
        </p>

        <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-12 md:mt-8">
          <li className="flex h-14 w-28 items-center justify-center rounded-lg border border-base-300/50 bg-neutral px-4 sm:h-16 sm:w-36">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={120}
              height={48}
              className="h-8 w-auto object-contain opacity-90 sm:h-10"
            />
          </li>

          {Array.from({ length: placeholderCount }, (_, index) => (
            <LogoPlaceholder key={index} index={index} />
          ))}
        </ul>
      </div>
    </section>
  )
}
