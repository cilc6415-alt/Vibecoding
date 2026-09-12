"use client"

import { useMemo, useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import config from "@/config"
import { useQuoteCart } from "@/context/QuoteCartContext"
import {
  calcularPrecioUnitario,
  formatearPrecio,
  normalizarTelefono,
  opcionesColor,
  telefonoValido,
  urlWhatsappCliente,
} from "@/lib/quotes"
import { imagenProducto } from "@/lib/catalog"
import QuoteCartPanel from "./QuoteCartPanel"

const ESTILOS_IMAGEN_TERMO = {
  "12 onzas": {
    contenedor: "relative min-h-[300px] flex-1",
    imagen: "object-contain object-center p-6 drop-shadow-md",
    fill: true,
  },
  "20 onzas": {
    contenedor: "relative min-h-[300px] flex-1",
    imagen: "object-contain object-center px-5 py-2 drop-shadow-md",
    fill: true,
  },
  "30 onzas": {
    contenedor: "relative min-h-[300px] flex-1",
    imagen: "object-contain object-center p-2 px-3 drop-shadow-md",
    fill: true,
  },
}

function estilosImagenCotizador(product, variant) {
  if (product?.category === "termo" && variant?.variant_label) {
    return (
      ESTILOS_IMAGEN_TERMO[variant.variant_label] || {
        contenedor: "relative min-h-[300px] flex-1",
        imagen: "object-contain object-center p-6 drop-shadow-md",
        fill: true,
      }
    )
  }

  if (product?.category === "funda") {
    return {
      contenedor: "relative min-h-[300px] flex-1",
      imagen: "object-contain object-center p-8 drop-shadow-md",
      fill: true,
    }
  }

  if (product?.category === "llavero") {
    return {
      contenedor: "relative min-h-[340px] flex-1",
      imagen: "object-contain object-center p-2 drop-shadow-md",
      fill: true,
    }
  }

  return {
    contenedor: "relative min-h-[300px] flex-1",
    imagen: "object-contain object-center p-6 drop-shadow-md",
    fill: true,
  }
}

export default function QuoteWizard({
  products,
  variants,
  initialProduct,
  initialVariant,
  initialDesignType,
  lockedProduct = false,
  lockedVariant = false,
}) {
  const copy = config.ivca.cotizar
  const {
    items,
    clientName,
    clientPhone,
    setClientName,
    setClientPhone,
    addItem,
    clearCart,
  } = useQuoteCart()

  const [product, setProduct] = useState(initialProduct)
  const [variant, setVariant] = useState(initialVariant)
  const [designType, setDesignType] = useState(initialDesignType || "")
  const [colorOption, setColorOption] = useState(
    initialDesignType === "tinta_alcohol" ? "color_tinta" : ""
  )
  const [colorDetail, setColorDetail] = useState("")
  const [personalizationType, setPersonalizationType] = useState("")
  const [personalizationNombre, setPersonalizationNombre] = useState("")
  const [personalizationInicial, setPersonalizationInicial] = useState("")
  const [phoneModel, setPhoneModel] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState("")
  const [finishing, setFinishing] = useState(false)
  const [finished, setFinished] = useState(false)
  const [wantsAnother, setWantsAnother] = useState(null)
  const cartPanelRef = useRef(null)

  useEffect(() => {
    if (wantsAnother !== "no" || !items.length) return
    cartPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [wantsAnother, items.length])

  const imagenEstilos = estilosImagenCotizador(product, variant)

  const productVariants = useMemo(() => {
    if (!product || product.category === "llavero") return []
    return variants.filter(
      (v) => v.product_id === product.id && v.variant_type !== "design"
    )
  }, [variants, product])

  const colorOptions = useMemo(
    () =>
      product && designType
        ? opcionesColor({ designType, category: product.category })
        : [],
    [product, designType]
  )

  const unitPrice = useMemo(
    () =>
      product && designType
        ? calcularPrecioUnitario({
            category: product.category,
            variantLabel: variant?.variant_label || "",
            designType,
          })
        : null,
    [product, variant, designType]
  )

  function resetForm(keepProduct = true) {
    if (!keepProduct) {
      setProduct(initialProduct)
      setVariant(initialVariant)
      setDesignType(initialDesignType || "")
    }
    setColorOption("")
    setColorDetail("")
    setPersonalizationType("")
    setPersonalizationNombre("")
    setPersonalizationInicial("")
    setPhoneModel("")
    setQuantity(1)
    setError("")
  }

  function validateStep() {
    if (!clientName.trim()) return copy.errors.name
    if (!telefonoValido(normalizarTelefono(clientPhone))) return copy.errors.phone
    if (!product) return "Elige un producto."
    if (product.category !== "llavero" && !variant) return copy.errors.variant
    if (product.category === "funda" && !phoneModel.trim()) return copy.errors.phoneModel
    if (!designType) return copy.errors.design
    if (!colorOption) return copy.errors.color
    if (
      designType === "tinta_alcohol" &&
      colorOption === "color_tinta" &&
      !colorDetail.trim()
    ) {
      return copy.errors.inkColor
    }
    if (colorOption === "2_colores_glitter" && !colorDetail.trim()) {
      return "Elige el color a combinar con blanco."
    }
    if (!personalizationType) return copy.errors.personalization
    if (personalizationType === "nombre" && !personalizationNombre.trim()) {
      return copy.errors.personalizationNombre
    }
    if (personalizationType === "inicial" && !personalizationInicial.trim()) {
      return copy.errors.personalizationInicial
    }
    if (personalizationType === "inicial_nombre") {
      if (!personalizationInicial.trim()) return copy.errors.personalizationInicial
      if (!personalizationNombre.trim()) return copy.errors.personalizationNombre
    }
    return null
  }

  function textoPersonalizacion() {
    if (personalizationType === "nombre") return personalizationNombre.trim()
    if (personalizationType === "inicial") {
      return personalizationInicial.trim().slice(0, 3).toUpperCase()
    }
    if (personalizationType === "inicial_nombre") {
      const inicial = personalizationInicial.trim().slice(0, 3).toUpperCase()
      const nombre = personalizationNombre.trim()
      return `${inicial} · ${nombre}`
    }
    return null
  }

  function handlePersonalizationTypeChange(value) {
    setPersonalizationType(value)
    setPersonalizationNombre("")
    setPersonalizationInicial("")
  }

  function handleAddToCart() {
    const validationError = validateStep()
    if (validationError) {
      setError(validationError)
      return
    }

    addItem({
      productId: product.id,
      productName: product.name,
      productCategory: product.category,
      variantId: variant?.id || null,
      variantLabel: variant?.variant_label || "",
      variantImage: imagenProducto(product, variant),
      phoneModel: product.category === "funda" ? phoneModel.trim() : null,
      designType,
      colorOption,
      colorDetail: colorDetail.trim() || null,
      personalizationType,
      personalizationText: textoPersonalizacion(),
      quantity,
      unitPrice,
    })
    resetForm(true)
    setWantsAnother(null)
    setError("")
  }

  async function handleFinish() {
    if (!items.length) {
      setError(copy.errors.emptyCart)
      return
    }
    if (!telefonoValido(normalizarTelefono(clientPhone))) {
      setError(copy.errors.phone)
      return
    }
    if (!clientName.trim()) {
      setError(copy.errors.name)
      return
    }

    setFinishing(true)
    setError("")

    const phone = normalizarTelefono(clientPhone)
    const name = clientName.trim()
    const cartItems = [...items]

    try {
      await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: name,
          clientPhone: phone,
          items: cartItems,
        }),
      })
    } catch {
      // Sin tablas en Supabase: seguimos al WhatsApp igual.
    }

    const waUrl = urlWhatsappCliente({
      clientName: name,
      clientPhone: phone,
      items: cartItems,
    })

    // Abrir WhatsApp en pestaña nueva sin abandonar el cotizador.
    // (window.open con noopener devolvía null y el fallback location.href
    // sacaba al usuario de la página.)
    const anchor = document.createElement("a")
    anchor.href = waUrl
    anchor.target = "_blank"
    anchor.rel = "noopener noreferrer"
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()

    clearCart()
    setWantsAnother(null)
    setFinished(true)
    setFinishing(false)
  }

  if (finished) {
    return (
      <div className="rounded-2xl border border-success/30 bg-success/10 p-8 text-center">
        <h2 className="text-2xl font-semibold text-success">{copy.successTitle}</h2>
        <p className="mt-3 text-base-content/70">{copy.successMessage}</p>
        <Link href="/#inicio" className="btn btn-primary mt-8">
          {copy.backHome}
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6 rounded-2xl border border-base-200 bg-base-100 p-6">
        <div>
          <p className="text-sm uppercase tracking-widest text-primary">Arma tu pedido</p>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-[#3D2E28]">
            {copy.title}
          </h1>
          <p className="mt-2 text-sm text-base-content/70">{copy.subtitle}</p>
        </div>

        {product && (
          <div
            className="overflow-hidden rounded-xl border border-base-200 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url(/fondos/cotizador-bg.jpg)" }}
          >
            <div className="grid gap-0 sm:grid-cols-2 sm:items-stretch">
              <div className="flex min-h-full flex-col border-b border-white/30 sm:border-b-0 sm:border-r sm:border-white/30">
                <div className={imagenEstilos.contenedor}>
                  {imagenEstilos.fill ? (
                    <Image
                      src={imagenProducto(product, variant)}
                      alt={product.name}
                      fill
                      className={imagenEstilos.imagen}
                      unoptimized
                    />
                  ) : (
                    <Image
                      src={imagenProducto(product, variant)}
                      alt={product.name}
                      width={400}
                      height={500}
                      className={imagenEstilos.imagen}
                      unoptimized
                    />
                  )}
                </div>
                <div className="px-4 pb-4 text-center">
                  <p className="text-sm font-medium text-[#3D2E28]">
                    {product.name}
                    {variant ? ` · ${variant.variant_label}` : ""}
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-4 p-6">
                <label className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-[#3D2E28]">{copy.clientName}</span>
                  <input
                    className="input input-bordered border-white/60 bg-white/85 backdrop-blur-sm"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    required
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-[#3D2E28]">{copy.clientPhone}</span>
                  <input
                    className="input input-bordered border-white/60 bg-white/85 backdrop-blur-sm"
                    inputMode="numeric"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    required
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        <fieldset>
          <legend className="mb-3 text-sm font-semibold uppercase tracking-wide">
            1. Producto
          </legend>
          {lockedProduct && product ? (
            <p className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm font-medium">
              {product.name}
              {variant ? ` · ${variant.variant_label}` : ""}
            </p>
          ) : (
            <div className="grid gap-2 sm:grid-cols-2">
              {products.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`rounded-xl border p-3 text-left text-sm transition ${
                    product?.id === p.id
                      ? "border-primary bg-primary/5"
                      : "border-base-200 hover:border-primary/40"
                  }`}
                  onClick={() => {
                    setProduct(p)
                    if (p.category === "llavero") {
                      setVariant(null)
                    } else {
                      const firstVariant = variants.find(
                        (v) =>
                          v.product_id === p.id && v.variant_type !== "design"
                      )
                      setVariant(firstVariant || null)
                    }
                    setDesignType("")
                    setColorOption("")
                    setPhoneModel("")
                  }}
                >
                  {p.name}
                </button>
              ))}
            </div>
          )}
          {productVariants.length > 0 && !lockedVariant && (
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {productVariants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  className={`rounded-lg border px-3 py-2 text-left text-sm ${
                    variant?.id === v.id ? "border-primary bg-primary/5" : "border-base-200"
                  }`}
                  onClick={() => {
                    setVariant(v)
                    setPhoneModel("")
                  }}
                >
                  {v.variant_label}
                </button>
              ))}
            </div>
          )}
          {product?.category === "funda" && variant && (
            <label className="mt-3 flex flex-col gap-1">
              <span className="text-sm font-medium">{copy.phoneModel}</span>
              <input
                className="input input-bordered"
                placeholder={copy.phoneModelPlaceholder}
                value={phoneModel}
                onChange={(e) => setPhoneModel(e.target.value)}
                required
              />
            </label>
          )}
        </fieldset>

        <fieldset>
          <legend className="mb-3 text-sm font-semibold uppercase tracking-wide">
            2. Diseño
          </legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {config.ivca.disenos.map((d) => (
              <label
                key={d.value}
                className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm ${
                  designType === d.value ? "border-primary bg-primary/5" : "border-base-200"
                }`}
              >
                <input
                  type="radio"
                  name="designType"
                  value={d.value}
                  checked={designType === d.value}
                  onChange={() => {
                    setDesignType(d.value)
                    setColorDetail("")
                    if (d.value === "tinta_alcohol") {
                      setColorOption("color_tinta")
                    } else if (
                      d.value === "glitter" &&
                      product?.category !== "termo"
                    ) {
                      setColorOption("2_colores_glitter")
                    } else {
                      setColorOption("")
                    }
                  }}
                />
                <span>{d.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {designType === "tinta_alcohol" && (
          <fieldset>
            <legend className="mb-3 text-sm font-semibold uppercase tracking-wide">
              3. Elige el color de la tinta
            </legend>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-7">
              {config.ivca.muestrasTinta.map((muestra) => {
                const selected = colorDetail === muestra.label
                return (
                  <button
                    key={muestra.id}
                    type="button"
                    className="text-center transition hover:opacity-100"
                    onClick={() => {
                      setColorOption("color_tinta")
                      setColorDetail(muestra.label)
                    }}
                    aria-pressed={selected}
                  >
                    <div
                      className={`relative aspect-square w-full overflow-hidden rounded-lg border-2 bg-[#F5F0E8] ${
                        selected
                          ? "border-primary ring-2 ring-primary/30"
                          : "border-[#D4C4B8]"
                      }`}
                    >
                      {muestra.imageSrc ? (
                        <Image
                          src={muestra.imageSrc}
                          alt={muestra.label}
                          fill
                          sizes="112px"
                          quality={100}
                          className="object-cover object-center [image-rendering:high-quality] contrast-[1.06] saturate-[1.04]"
                          unoptimized
                        />
                      ) : (
                        <div
                          className="h-full w-full border-2 border-dashed border-[#D4C4B8]"
                          aria-hidden
                        />
                      )}
                    </div>
                    <span className="mt-1.5 flex items-center justify-center gap-1.5">
                      <span
                        className={`inline-flex size-3.5 shrink-0 rounded-full border-2 ${
                          selected
                            ? "border-primary bg-primary"
                            : "border-[#3D2E28] bg-transparent"
                        }`}
                        aria-hidden
                      />
                      <span
                        className={`text-xs font-semibold ${
                          selected ? "text-primary" : "text-[#3D2E28]"
                        }`}
                      >
                        {muestra.label}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </fieldset>
        )}

        {designType === "glitter" && (
          <fieldset>
            <legend className="mb-3 text-sm font-semibold uppercase tracking-wide">
              3. Color
            </legend>

            {colorOptions.some((c) =>
              c.value === "glitter_geoda1" || c.value === "glitter_geoda2"
            ) && (
              <div className="grid max-w-md grid-cols-2 gap-3">
                {config.ivca.muestrasGeoda.map((muestra) => {
                  const selected = colorOption === muestra.value
                  return (
                    <button
                      key={muestra.id}
                      type="button"
                      className="text-center transition"
                      onClick={() => {
                        setColorOption(muestra.value)
                        setColorDetail(muestra.label)
                      }}
                      aria-pressed={selected}
                    >
                      <div
                        className={`aspect-square w-full overflow-hidden rounded-lg border-2 bg-[#F5F0E8] ${
                          selected
                            ? "border-primary ring-2 ring-primary/30"
                            : "border-[#D4C4B8]"
                        }`}
                      >
                        <img
                          src={muestra.imageSrc}
                          alt={muestra.label}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <span className="mt-1.5 flex items-center justify-center gap-1.5">
                        <span
                          className={`inline-flex size-3.5 shrink-0 rounded-full border-2 ${
                            selected
                              ? "border-primary bg-primary"
                              : "border-[#3D2E28] bg-transparent"
                          }`}
                          aria-hidden
                        />
                        <span
                          className={`text-xs font-semibold ${
                            selected ? "text-primary" : "text-[#3D2E28]"
                          }`}
                        >
                          {muestra.label}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>
            )}

            {colorOptions.some((c) => c.value === "2_colores_glitter") && (
              <div
                className={`space-y-3 ${
                  colorOptions.some(
                    (c) =>
                      c.value === "glitter_geoda1" || c.value === "glitter_geoda2"
                  )
                    ? "mt-4"
                    : ""
                }`}
              >
                <label
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm ${
                    colorOption === "2_colores_glitter"
                      ? "border-primary bg-primary/5"
                      : "border-base-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="colorOption"
                    value="2_colores_glitter"
                    checked={colorOption === "2_colores_glitter"}
                    onChange={() => {
                      setColorOption("2_colores_glitter")
                      setColorDetail("")
                    }}
                  />
                  Glitter combinado: {config.ivca.glitterCombinadoBase}
                </label>
                {colorOption === "2_colores_glitter" && (
                  <div>
                    <p className="mb-2 text-xs font-medium text-base-content/70">
                      Elige el color a combinar
                    </p>
                    <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                      {config.ivca.glitterCombinadoColores.map((muestra) => {
                        const detalle = `${config.ivca.glitterCombinadoBase} y ${muestra.label}`
                        const selected = colorDetail === detalle
                        return (
                          <button
                            key={muestra.id}
                            type="button"
                            className="text-center transition"
                            onClick={() => {
                              setColorOption("2_colores_glitter")
                              setColorDetail(detalle)
                            }}
                            aria-pressed={selected}
                          >
                            <span
                              className={`mx-auto flex size-10 items-center justify-center rounded-full border-2 ${
                                selected
                                  ? "border-primary ring-2 ring-primary/30"
                                  : "border-[#D4C4B8]"
                              }`}
                              style={{ backgroundColor: muestra.hex }}
                              aria-hidden
                            />
                            <span className="mt-1.5 flex items-center justify-center gap-1.5">
                              <span
                                className={`inline-flex size-3.5 shrink-0 rounded-full border-2 ${
                                  selected
                                    ? "border-primary bg-primary"
                                    : "border-[#3D2E28] bg-transparent"
                                }`}
                                aria-hidden
                              />
                              <span
                                className={`text-xs font-semibold ${
                                  selected ? "text-primary" : "text-[#3D2E28]"
                                }`}
                              >
                                {muestra.label}
                              </span>
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </fieldset>
        )}

        <fieldset>
          <legend className="mb-3 text-sm font-semibold uppercase tracking-wide">
            4. Personalizar
          </legend>
          <div className="space-y-2">
            <div className="flex gap-2">
              {config.ivca.personalizaciones
                .filter((p) => p.value === "nombre" || p.value === "inicial")
                .map((p) => {
                  const selected = personalizationType === p.value
                  const isInicial = p.value === "inicial"
                  return (
                    <label
                      key={p.value}
                      className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm ${
                        isInicial
                          ? "w-[calc(25%-0.25rem)] shrink-0"
                          : "w-[calc(50%-0.25rem)] shrink-0"
                      } ${
                        selected
                          ? "border-primary bg-primary/5"
                          : "border-base-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="personalizationType"
                        value={p.value}
                        checked={selected}
                        onChange={() => handlePersonalizationTypeChange(p.value)}
                      />
                      {p.label}
                    </label>
                  )
                })}
            </div>

            {personalizationType === "nombre" && (
              <div className="flex gap-2">
                <input
                  className="input input-bordered w-[calc(50%-0.25rem)] shrink-0"
                  placeholder={copy.personalizationNombrePlaceholder}
                  value={personalizationNombre}
                  onChange={(e) => setPersonalizationNombre(e.target.value)}
                  autoComplete="off"
                />
              </div>
            )}

            {personalizationType === "inicial" && (
              <div className="flex gap-2">
                <div className="w-[calc(50%-0.25rem)] shrink-0" aria-hidden />
                <input
                  className="input input-bordered w-[calc(25%-0.25rem)] shrink-0"
                  placeholder={copy.personalizationInicialPlaceholder}
                  value={personalizationInicial}
                  maxLength={3}
                  onChange={(e) =>
                    setPersonalizationInicial(e.target.value.toUpperCase())
                  }
                  autoComplete="off"
                />
              </div>
            )}

            <div className="grid gap-2 sm:grid-cols-2">
              {config.ivca.personalizaciones
                .filter(
                  (p) =>
                    p.value === "inicial_nombre" || p.value === "sin_personalizar"
                )
                .map((p) => {
                  const selected = personalizationType === p.value
                  return (
                    <label
                      key={p.value}
                      className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm ${
                        selected
                          ? "border-primary bg-primary/5"
                          : "border-base-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="personalizationType"
                        value={p.value}
                        checked={selected}
                        onChange={() => handlePersonalizationTypeChange(p.value)}
                      />
                      {p.label}
                    </label>
                  )
                })}
            </div>

            {personalizationType === "inicial_nombre" && (
              <div className="flex items-end gap-2">
                <label className="flex w-20 shrink-0 flex-col gap-1">
                  <span className="text-sm font-medium">
                    {copy.personalizationInicial}
                  </span>
                  <input
                    className="input input-bordered w-full"
                    placeholder={copy.personalizationInicialPlaceholder}
                    value={personalizationInicial}
                    maxLength={3}
                    onChange={(e) =>
                      setPersonalizationInicial(e.target.value.toUpperCase())
                    }
                    autoComplete="off"
                  />
                </label>
                <label className="flex w-[calc(50%-0.25rem)] shrink-0 flex-col gap-1">
                  <span className="text-sm font-medium">
                    {copy.personalizationNombre}
                  </span>
                  <input
                    className="input input-bordered w-full"
                    placeholder={copy.personalizationNombrePlaceholder}
                    value={personalizationNombre}
                    onChange={(e) => setPersonalizationNombre(e.target.value)}
                    autoComplete="off"
                  />
                </label>
              </div>
            )}
          </div>
        </fieldset>

        <div className="space-y-2">
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">{copy.quantity}</span>
            <input
              type="number"
              min={1}
              max={99}
              className="input input-bordered w-32"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
            />
          </label>
          {unitPrice != null && (
            <p className="text-lg font-semibold text-primary">
              {formatearPrecio(unitPrice)}
              {quantity > 1
                ? ` × ${quantity} = ${formatearPrecio(unitPrice * quantity)}`
                : ""}
            </p>
          )}
        </div>

        {error && (
          <p role="alert" className="text-sm text-error">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <button type="button" className="btn btn-primary" onClick={handleAddToCart}>
            {copy.addToCart}
          </button>

          {items.length > 0 && (
            <fieldset>
              <legend className="mb-2 text-sm font-medium">{copy.addAnotherQuestion}</legend>
              <div className="flex flex-wrap gap-4">
                <label className="flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="wantsAnother"
                    value="si"
                    checked={wantsAnother === "si"}
                    onChange={() => setWantsAnother("si")}
                  />
                  {copy.addAnotherYes}
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="wantsAnother"
                    value="no"
                    checked={wantsAnother === "no"}
                    onChange={() => setWantsAnother("no")}
                  />
                  {copy.addAnotherNo}
                </label>
              </div>
              {wantsAnother === "si" && (
                <Link href="/#inicio" className="btn btn-outline mt-3">
                  {copy.addAnother}
                </Link>
              )}
              {wantsAnother === "no" && (
                <p className="mt-3 text-sm text-primary">{copy.addAnotherNoHint}</p>
              )}
            </fieldset>
          )}
        </div>
      </div>

      <QuoteCartPanel
        panelRef={cartPanelRef}
        emphasizeFinish={wantsAnother === "no" && items.length > 0}
        onFinish={handleFinish}
        finishing={finishing}
        error={error}
      />
    </div>
  )
}
