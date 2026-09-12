import Link from "next/link"
import config from "@/config"

export default function ComoPedir() {
  const { eyebrow, title, steps, closingTitle, closingCta } = config.ivca.comoPedir

  return (
    <section id="como-pedir" className="border-t border-base-200 bg-base-100 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          {eyebrow}
        </p>
        <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-[#3D2E28] md:text-4xl">
          {title}
        </h2>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[#E8DFD4] bg-[#E8DFD4] sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.number}
              className="flex min-h-48 flex-col justify-between bg-[#F5F0E8] p-8"
            >
              <div>
                <p className="font-serif text-4xl text-primary">{step.number}</p>
                <h3 className="mt-4 font-serif text-2xl font-semibold text-[#3D2E28]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5C4A42]">{step.body}</p>
              </div>
            </article>
          ))}
          <article className="flex min-h-48 flex-col items-center justify-center gap-6 bg-[#F5F0E8] p-8 text-center sm:col-span-2 lg:col-span-1">
            <p className="font-serif text-xl font-semibold text-[#3D2E28]">
              {closingTitle}
            </p>
            <Link
              href={closingCta.href}
              className="btn btn-primary px-6 shadow-md"
            >
              {closingCta.label}
            </Link>
          </article>
        </div>
      </div>
    </section>
  )
}
