import config from "@/config"

export default function Envios() {
  const { eyebrow, title, blocks } = config.ivca.envios

  return (
    <section id="envios" className="border-t border-base-200 bg-[#F5F0E8] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          {eyebrow}
        </p>
        <h2 className="mt-3 max-w-3xl font-serif text-3xl font-semibold tracking-tight text-[#3D2E28] md:text-4xl">
          {title}
        </h2>
        <div className="mt-6 max-w-3xl space-y-6">
          {blocks.map((block) => (
            <div key={block.heading}>
              <h3 className="font-serif text-xl font-semibold text-[#3D2E28]">
                {block.heading}
              </h3>
              <div className="mt-2 space-y-3 text-base leading-relaxed text-[#5C4A42]">
                {block.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
