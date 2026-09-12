import config from "@/config"

const GALLERY = [
  {
    id: "galeria-termo-20",
    image_url: "/galeria/termo-skinny-20oz.jpg",
    caption: "Termo skinny 20 oz.",
    // Sube el producto dentro del recorte
    objectPosition: "object-[center_68%]",
  },
  {
    id: "galeria-funda",
    image_url: "/galeria/funda-celular.jpg",
    caption: "Funda para celular",
    objectPosition: "object-[center_64%]",
  },
  {
    id: "galeria-llavero",
    image_url: "/galeria/llavero-glitter.jpg",
    caption: "Llavero con glitter",
    objectPosition: "object-center",
  },
]

export default function Nosotros() {
  const copy = config.ivca.nosotros

  return (
    <section id="nosotros" className="border-t border-base-200 bg-[#F5F0E8] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          {copy.eyebrow}
        </p>
        <h2 className="mt-3 max-w-3xl font-serif text-3xl font-semibold tracking-tight text-[#3D2E28] md:text-5xl">
          {copy.title}
        </h2>
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-[#5C4A42]">
          {copy.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-8 lg:mt-14 lg:flex-row lg:items-center lg:justify-start lg:gap-8">
          <div className="flex flex-wrap items-end justify-center gap-5 sm:gap-6 lg:justify-start">
            {GALLERY.map((img) => (
              <figure
                key={img.id}
                className="group flex w-[180px] flex-col items-center sm:w-[200px]"
              >
                <div className="relative z-0 w-[118%] -translate-y-1 overflow-hidden rounded-lg border border-[#E8DFD4] bg-[#F5F0E8] shadow-sm">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={img.image_url}
                      alt={img.caption}
                      className={`h-full w-full scale-[1.28] object-cover ${img.objectPosition}`}
                    />
                  </div>
                </div>
                <figcaption className="ivca-caption-lift relative z-10 -mt-1 w-full cursor-default rounded-md border border-[#E8DFD4] bg-white px-2.5 py-2 text-center text-xs font-medium leading-snug text-[#3D2E28] shadow-sm sm:text-sm">
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>

          <ul className="flex w-full max-w-[220px] flex-col justify-center gap-4 self-center lg:ml-2 lg:shrink-0">
            {copy.highlights.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-[#E8DFD4] bg-white px-4 py-3.5 text-center text-sm font-medium leading-snug text-[#3D2E28] shadow-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
