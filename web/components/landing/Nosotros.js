import config from "@/config"

export default function Nosotros({ images = [] }) {
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
        <ul className="mt-8 grid gap-3 sm:grid-cols-3">
          {copy.highlights.map((item) => (
            <li
              key={item}
              className="rounded-lg border border-[#E8DFD4] bg-base-100 px-4 py-3 text-center text-sm font-medium text-[#3D2E28]"
            >
              {item}
            </li>
          ))}
        </ul>
        <GalleryCarousel images={images} />
      </div>
    </section>
  )
}

function GalleryCarousel({ images }) {
  const fallback = [
    {
      id: "galeria-30",
      image_url: "/galeria/termo-30oz.jpg",
      caption: "Termo tumbler 30 oz",
    },
    {
      id: "galeria-20",
      image_url: "/galeria/termo-20oz.jpg",
      caption: "Termo skinny 20 oz",
    },
    {
      id: "galeria-12",
      image_url: "/galeria/termo-12oz.jpg",
      caption: "Termo wine 12 oz",
    },
  ]

  const items = images.length ? images : fallback

  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((img) => (
        <figure
          key={img.id}
          className="overflow-hidden rounded-xl border border-[#E8DFD4] bg-base-100"
        >
          <img
            src={img.image_url}
            alt={img.caption || "Trabajo IVCA Crafts"}
            className="aspect-[3/4] w-full object-cover object-top"
          />
          {img.caption && (
            <figcaption className="px-3 py-2 text-sm text-base-content/60">
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  )
}
