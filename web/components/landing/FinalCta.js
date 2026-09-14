import Link from "next/link"
import config from "@/config"
import CatalogCarousel from "@/components/landing/CatalogCarousel"

export default function FinalCta({ showActions = true, align = "center" }) {
  const { eyebrow, title, subtitle, cta, ctaSecondary, sheets } =
    config.landing.finalCta
  const isLeft = align === "left"
  const hasSheets = Array.isArray(sheets) && sheets.length > 0

  return (
    <section
      id="catalogo"
      className="relative overflow-hidden border-t border-base-200 bg-base-100"
    >
      {showActions && (
        <div
          className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(60%_60%_at_50%_100%,#000,transparent)]"
          aria-hidden
        >
          <div className="absolute bottom-0 left-1/2 size-[500px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        </div>
      )}

      <div
        className={`mx-auto px-4 py-20 md:py-28 ${
          isLeft || hasSheets ? "max-w-6xl text-left" : "max-w-3xl text-center"
        }`}
      >
        {eyebrow && (
          <p
            className={`text-sm font-medium uppercase text-primary ${
              isLeft || hasSheets ? "tracking-widest" : "tracking-wider"
            }`}
          >
            {eyebrow}
          </p>
        )}
        <h2 className="mt-3 max-w-3xl text-balance font-serif text-3xl font-semibold tracking-tight text-[#3D2E28] md:text-4xl">
          {title}
        </h2>
        {subtitle && (
          <p
            className={`mt-5 text-balance text-lg ${
              isLeft || hasSheets ? "max-w-3xl text-[#5C4A42]" : "text-base-content/70"
            }`}
          >
            {subtitle}
          </p>
        )}

        {hasSheets && <CatalogCarousel />}

        {showActions && (
          <div
            className={`mt-10 flex flex-wrap items-center gap-3 ${
              isLeft ? "justify-start" : "justify-center"
            }`}
          >
            <Link href={cta.href} className="btn btn-accent btn-lg">
              {cta.label}
            </Link>
            {ctaSecondary && (
              <Link href={ctaSecondary.href} className="btn btn-ghost btn-lg">
                {ctaSecondary.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
