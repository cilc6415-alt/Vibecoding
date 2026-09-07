import config from "@/config"

export default function Envios() {
  const { eyebrow, title, paragraphs } = config.ivca.envios

  return (
    <section id="envios" className="border-t border-base-200 bg-[#F5F0E8] py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          {eyebrow}
        </p>
        <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-[#3D2E28] md:text-4xl">
          {title}
        </h2>
        <div className="mt-8 space-y-5 text-left text-base leading-relaxed text-[#5C4A42]">
          {paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
