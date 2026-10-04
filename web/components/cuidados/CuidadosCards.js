"use client"

import {
  Ban,
  Droplet,
  FlaskConical,
  Hand,
  Shield,
  Sun,
} from "lucide-react"
import ThermometerCuidadoIcon from "./ThermometerCuidadoIcon"

const ICONS = {
  Hand,
  FlaskConical,
  Shield,
  Sun,
  Droplet,
  Ban,
}

export default function CuidadosCards({ cards }) {
  return (
    <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => {
        const isThermo = card.anim === "thermo"
        const Icon = ICONS[card.icon] || Hand
        const Overlay = card.iconOverlay ? ICONS[card.iconOverlay] : null

        return (
          <li key={card.id}>
            <article
              tabIndex={0}
              className="cuidado-card group flex h-full flex-col rounded-2xl border border-[#E8DFD4] bg-[#F5F0E8] p-6 outline-none transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-primary/50 hover:shadow-md focus-visible:-translate-y-1 focus-visible:border-primary/50 focus-visible:shadow-md focus-visible:ring-2 focus-visible:ring-primary/30 active:border-primary/40"
            >
              <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span
                  className={`cuidado-icon cuidado-icon--${card.anim} relative inline-flex`}
                  aria-hidden
                >
                  {isThermo ? (
                    <ThermometerCuidadoIcon className="size-7 text-primary" />
                  ) : (
                    <>
                      <Icon className="size-7 stroke-[1.6]" />
                      {Overlay && (
                        <Overlay className="cuidado-icon__overlay absolute -right-1 -top-1 size-4 stroke-[2.2] text-primary" />
                      )}
                    </>
                  )}
                </span>
              </div>
              <h3 className="mt-4 font-serif text-xl font-semibold text-[#3D2E28]">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5C4A42]">
                {card.body}
              </p>
            </article>
          </li>
        )
      })}
    </ul>
  )
}
