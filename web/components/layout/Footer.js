import Link from "next/link"
import config from "@/config"
import Logo from "@/components/Logo"
import { urlWhatsappGeneral } from "@/lib/quotes"

function FooterLink({ link, className }) {
  const href = link.href === "whatsapp" ? urlWhatsappGeneral() : link.href
  const external = link.external || link.href === "whatsapp"

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={className}
    >
      {link.label}
    </Link>
  )
}

export default function Footer() {
  const { tagline, columns = [] } = config.landing.footer

  return (
    <footer className="border-t border-base-200 bg-base-100">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo className="h-[1.125rem]" />
              <span className="font-serif text-lg font-semibold tracking-wide text-primary leading-none">
                {config.brand.logoText.toUpperCase()}
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-base-content/60">{tagline}</p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold">{col.title}</p>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink
                      link={link}
                      className="text-sm text-base-content/60 transition hover:text-base-content"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-base-200 pt-6 text-sm text-base-content/50">
          © {new Date().getFullYear()} {config.brand.logoText} · Chihuahua, México
        </div>
      </div>
    </footer>
  )
}
