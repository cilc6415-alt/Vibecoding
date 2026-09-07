import config from "@/config"

export default function Hero() {
  const { eyebrow, subtitle } = config.landing.hero

  return (
    <section id="inicio" className="relative overflow-hidden bg-[#F5F0E8]">
      <div className="mx-auto max-w-4xl px-4 pt-20 pb-16 text-center md:pt-28 md:pb-24">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#5C4A42]">
          {eyebrow}
        </p>

        <h1 className="mt-6 text-balance font-serif text-4xl font-semibold leading-tight text-[#3D2E28] md:text-6xl">
          Piezas únicas pintadas a mano,{" "}
          <span className="text-primary italic">nunca dos iguales</span>.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-balance text-base leading-relaxed text-[#5C4A42] md:text-lg">
          {subtitle}
        </p>
      </div>
    </section>
  )
}
