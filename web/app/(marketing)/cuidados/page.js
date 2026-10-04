import config from "@/config"
import { urlWhatsappGeneral } from "@/lib/quotes"
import CuidadosCards from "@/components/cuidados/CuidadosCards"

export const metadata = {
  title: `Cuidados · ${config.brand.logoText}`,
  description: config.ivca.cuidados.intro,
}

export default function CuidadosPage() {
  const copy = config.ivca.cuidados

  return (
    <div className="bg-base-100">
      <section className="border-b border-base-200 bg-[#F5F0E8]/50 py-12 md:py-14">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Cuidados
          </p>
          <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-[#3D2E28] md:text-5xl">
            {copy.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#5C4A42] md:text-lg">
            {copy.intro}
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-serif text-2xl font-semibold text-[#3D2E28] md:text-3xl">
            {copy.resinaTitle}
          </h2>
          <CuidadosCards cards={copy.cards} />
        </div>
      </section>

      <section className="border-t border-base-200 py-10 md:py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-serif text-2xl font-semibold text-[#3D2E28] md:text-3xl">
            {copy.especificosTitle}
          </h2>

          <div className="mt-7 grid gap-6 lg:grid-cols-3">
            {copy.productos.map((producto) => (
              <article
                key={producto.id}
                className="rounded-2xl border border-[#E8DFD4] bg-base-100 p-6"
              >
                <h3 className="font-serif text-xl font-semibold text-[#3D2E28]">
                  {producto.title}
                </h3>
                <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-[#5C4A42]">
                  {producto.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {producto.note && (
                  <p className="mt-5 rounded-xl border border-primary/20 bg-primary/5 px-3 py-2.5 text-xs leading-relaxed text-[#5C4A42]">
                    {producto.note}
                  </p>
                )}
              </article>
            ))}
          </div>

          <article className="mt-6 rounded-2xl border border-dashed border-primary/35 bg-[#F5F0E8] px-5 py-4 md:px-6 md:py-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              {copy.libreta.subtitle}
            </p>
            <h3 className="mt-1.5 font-serif text-2xl font-semibold text-[#3D2E28]">
              {copy.libreta.title}
            </h3>
            <ul className="mt-3 grid gap-2 text-sm leading-relaxed text-[#5C4A42] sm:grid-cols-2">
              {copy.libreta.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="border-t border-base-200 bg-[#F5F0E8]/40 py-10 md:py-14">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-serif text-2xl font-semibold text-[#3D2E28] md:text-3xl">
            {copy.unicaTitle}
          </h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#5C4A42] md:text-base">
            {copy.unicaBody.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-base-200 py-10 md:py-12">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-serif text-2xl font-semibold text-[#3D2E28] md:text-3xl">
            {copy.ctaTitle}
          </h2>
          <a
            href={urlWhatsappGeneral()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-5 px-8 shadow-md"
          >
            {copy.ctaLabel}
          </a>
        </div>
      </section>
    </div>
  )
}
