import Link from "next/link"
import config from "@/config"
import {
  IconoMano,
  IconoSol,
  IconoTermometro,
} from "@/components/cuidados/CuidadosResinaIcons"

const ICONOS = [
  { id: "limpieza", Icon: IconoMano, iconClass: "size-8" },
  { id: "sol", Icon: IconoSol, iconClass: "size-7" },
  { id: "temperatura", Icon: IconoTermometro, iconClass: "size-7" },
]

export default function CuidadosTeaser() {
  const { title, body, ctaLabel, ctaHref } = config.ivca.cuidados.teaser

  return (
    <section
      aria-labelledby="cuidados-teaser-title"
      className="border-t border-base-200 bg-base-100 py-10 md:py-12"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="cuidado-teaser flex flex-col gap-5 rounded-2xl border border-[#E8DFD4] bg-[#F5F0E8] px-5 py-5 md:flex-row md:items-center md:justify-between md:gap-8 md:px-7 md:py-5">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2.5 text-primary" aria-hidden>
              {ICONOS.map(({ id, Icon, iconClass }) => (
                <span
                  key={id}
                  className="flex size-9 items-center justify-center overflow-hidden rounded-full bg-primary/10"
                >
                  <Icon className={iconClass} />
                </span>
              ))}
            </div>
            <h2
              id="cuidados-teaser-title"
              className="mt-3 font-serif text-xl font-semibold tracking-tight text-[#3D2E28] md:text-2xl"
            >
              {title}
            </h2>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-[#5C4A42] md:text-base">
              {body}
            </p>
          </div>

          <Link
            href={ctaHref}
            className="btn btn-primary shrink-0 self-start shadow-md md:self-center"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
