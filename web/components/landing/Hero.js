import config from "@/config"

export default function Hero() {
  const { title, videoSrc } = config.landing.hero

  return (
    <section
      id="inicio"
      className="relative scroll-mt-[5.5rem] overflow-hidden bg-[#F5F0E8] md:scroll-mt-[8.5rem]"
    >
      <h1 className="sr-only">{title || config.brand.logoText}</h1>
      {videoSrc && (
        <div className="w-full bg-[#F5F0E8]">
          <video
            className="block h-auto w-full"
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Galería de piezas IVCA Crafts"
          />
        </div>
      )}
    </section>
  )
}
