"use client"

import { useMemo, useState, useEffect } from "react"
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
      contenedor: "relative min-h-[300px] flex-1",
      imagen: "object-contain object-center p-10 drop-shadow-md",
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
  const [colorOption, setColorOption] = useState("")
  const [colorDetail, setColorDetail] = useState("")
  const [personalizationType, setPersonalizationType] = useState("")
  const [personalizationText, setPersonalizationText] = useState("")
  const [phoneModel, setPhoneModel] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState("")
  const [finishing, setFinishing] = useState(false)
  const [finished, setFinished] = useState(false)
  const [wantsAnother, setWantsAnother] = useState(null)

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
    setPersonalizationText("")
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
    if (colorOption === "2_colores_glitter" && !colorDetail.trim()) {
      return "Escribe los 2 colores de glitter."
    }
    if (!personalizationType) return copy.errors.personalization
    if (
      personalizationType !== "sin_personalizar" &&
      !personalizationText.trim()
    ) {
      return copy.errors.personalizationText
    }
    return null
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
      personalizationText: personalizationText.trim() || null,
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
    const popup = window.open(waUrl, "_blank", "noopener,noreferrer")
    if (!popup) {
      window.location.href = waUrl
    }

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
          <p className="text-sm uppercase tracking-widest text-primary">03 · Arma tu pedido</p>
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
                  {unitPrice != null && (
                    <p className="mt-1 text-lg font-semibold text-primary">
                      {formatearPrecio(unitPrice)}
                      {quantity > 1
                        ? ` × ${quantity} = ${formatearPrecio(unitPrice * quantity)}`
                        : ""}
                    </p>
                  )}
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
          {productVariants.length > 0 && (
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
            {config.ivca.disenos.map((d) => {
              const precio =
                product &&
                calcularPrecioUnitario({
                  category: product.category,
                  variantLabel: variant?.variant_label || "",
                  designType: d.value,
                })
              return (
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
                    setColorOption("")
                    setColorDetail("")
                  }}
                />
                <span className="flex-1">{d.label}</span>
                {precio != null && (
                  <span className="font-semibold text-primary">{formatearPrecio(precio)}</span>
                )}
              </label>
            )})}
          </div>
        </fieldset>

        {designType && (
          <fieldset>
            <legend className="mb-3 text-sm font-semibold uppercase tracking-wide">
              3. Color
            </legend>
            <div className="space-y-2">
              {colorOptions.map((c) => (
                <label
                  key={c.value}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm ${
                    colorOption === c.value ? "border-primary bg-primary/5" : "border-base-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="colorOption"
                    value={c.value}
                    checked={colorOption === c.value}
                    onChange={() => setColorOption(c.value)}
                  />
                  {c.label}
                </label>
              ))}
            </div>

            {designType === "tinta_alcohol" && (
              <div className="mt-4">
                <p className="mb-2 text-xs font-medium text-base-content/60">
                  Muestras de color (próximamente)
                </p>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {config.ivca.muestrasTinta.map((muestra) => (
                    <div key={muestra.id} className="text-center">
                      <div
                        className="aspect-square w-full rounded-lg border-2 border-dashed border-[#D4C4B8] bg-[#F5F0E8]"
                        aria-hidden
                      />
                      <span className="mt-1 block text-[10px] text-base-content/50">
                        {muestra.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {designType === "glitter" &&
              product?.category === "termo" &&
              (colorOption === "glitter_geoda1" || colorOption === "glitter_geoda2") && (
                <div className="mt-4">
                  <p className="mb-2 text-xs font-medium text-base-content/60">
                    Muestra de glitter geoda (próximamente)
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {config.ivca.muestrasGeoda.map((muestra) => (
                      <div key={muestra.id} className="text-center">
                        <div
                          className="aspect-square w-full rounded-lg border-2 border-dashed border-[#D4C4B8] bg-[#F5F0E8]"
                          aria-hidden
                        />
                        <span className="mt-1 block text-[10px] text-base-content/50">
                          {muestra.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {colorOption === "2_colores_glitter" && (
              <input
                className="input input-bordered mt-3 w-full"
                placeholder="Escribe los 2 colores de glitter"
                value={colorDetail}
                onChange={(e) => setColorDetail(e.target.value)}
              />
            )}
          </fieldset>
        )}

        <fieldset>
          <legend className="mb-3 text-sm font-semibold uppercase tracking-wide">
            4. Personalizar
          </legend>
          <div className="space-y-2">
            {config.ivca.personalizaciones.map((p) => (
              <label
                key={p.value}
                className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm ${
                  personalizationType === p.value
                    ? "border-primary bg-primary/5"
                    : "border-base-200"
                }`}
              >
                <input
                  type="radio"
                  name="personalizationType"
                  value={p.value}
                  checked={personalizationType === p.value}
                  onChange={() => setPersonalizationType(p.value)}
                />
                {p.label}
              </label>
            ))}
          </div>
          {personalizationType && personalizationType !== "sin_personalizar" && (
            <input
              className="input input-bordered mt-3 w-full"
              placeholder={copy.personalizationText}
              value={personalizationText}
              onChange={(e) => setPersonalizationText(e.target.value)}
            />
          )}
        </fieldset>

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
            </fieldset>
          )}
        </div>
      </div>

      <QuoteCartPanel
        onFinish={handleFinish}
        finishing={finishing}
        error={error}
      />
    </div>
  )
}
