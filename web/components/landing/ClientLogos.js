import Image from "next/image"
import config from "@/config"

function LogoPlaceholder({ index }) {
  return (
    <li
      className="flex h-20 w-36 items-center justify-center rounded-xl border-2 border-dashed border-base-content/35 bg-base-200/40 sm:h-24 sm:w-40"
      aria-hidden
    >
      <span className="size-7 rounded-full border-2 border-dashed border-base-content/30" />
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
      <div className="mx-auto max-w-5xl px-4">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-base-content/40 md:text-sm">
          {title}
        </p>

        <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-5 sm:gap-x-10 md:mt-8">
          <li className="flex h-24 w-36 items-center justify-center overflow-hidden rounded-xl border border-base-300 bg-white p-1.5 sm:h-28 sm:w-40">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={160}
              height={112}
              className="h-full w-full object-contain"
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
