import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"
import config from "@/config"

const ICONS = {
  facebook: Facebook,
  instagram: Instagram,
}

export default function RedesSociales() {
  const { eyebrow, title, subtitle } = config.ivca.redes
  const links = config.ivca.socialLinks

  return (
    <section id="redes" className="border-t border-base-200 bg-base-100 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          {eyebrow}
        </p>
        <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-[#3D2E28] md:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-base-content/70">{subtitle}</p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {links.map((red) => {
            const Icon = ICONS[red.id] || Instagram
            return (
              <Link
                key={red.id}
                href={red.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline gap-2 border-primary/30 hover:border-primary hover:bg-primary/5"
              >
                <Icon className="size-5" />
                {red.label}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
