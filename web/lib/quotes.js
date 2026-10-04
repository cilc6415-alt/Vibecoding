import config from "@/config"

const copy = config.ivca

export function normalizarTelefono(raw) {
  const digits = String(raw || "").replace(/\D/g, "")
  if (digits.length === 12 && digits.startsWith("52")) return digits.slice(2)
  return digits
}

export function telefonoValido(digits) {
  return /^\d{10}$/.test(digits)
}

export function urlWhatsappGeneral() {
  return `https://wa.me/${copy.whatsappPrefijoPais}${copy.whatsappNumero}`
}

export function etiquetaDiseno(value) {
  return (
    copy.disenos.find((d) => d.value === value)?.label ??
    copy.disenosLibreta?.find((d) => d.value === value)?.label ??
    value
  )
}

export function etiquetaColor(value) {
  return copy.colores.find((c) => c.value === value)?.label ?? value
}

/** Texto de color para carrito y WhatsApp (ej. "Color Blanco y Rosa"). */
export function lineaColorItem(item) {
  if (!item) return null
  if (item.productCategory === "libreta" || item.colorOption?.startsWith?.("hojas_")) {
    return item.colorOption ? etiquetaColor(item.colorOption) : null
  }
  if (item.designType === "tinta_alcohol" && item.colorDetail) {
    return `Color ${item.colorDetail}`
  }
  if (item.colorOption?.startsWith?.("glitter_geoda") && item.colorDetail) {
    return `Color ${item.colorDetail}`
  }
  if (item.colorOption === "2_colores_glitter" && item.colorDetail) {
    return `Color ${item.colorDetail}`
  }
  if (!item.colorOption) return null
  return `Color: ${etiquetaColor(item.colorOption)}${
    item.colorDetail ? ` — ${item.colorDetail}` : ""
  }`
}

export function etiquetaPersonalizacion(value) {
  const listas = [
    copy.personalizaciones,
    copy.personalizacionesLlavero,
    copy.personalizacionesLibreta,
  ]
  for (const lista of listas) {
    const found = lista?.find((p) => p.value === value)
    if (found) return found.label
  }
  return value
}

export function opcionesPersonalizacion(category) {
  if (category === "llavero") return copy.personalizacionesLlavero || []
  if (category === "libreta") return copy.personalizacionesLibreta || []
  return copy.personalizaciones || []
}

export function etiquetaEstatus(value) {
  return copy.estatusCotizacion.find((e) => e.value === value)?.label ?? value
}

export function calcularPrecioUnitario({ category, variantLabel, designType }) {
  if (!category || !designType) return null

  const tabla = copy.precios?.[category]
  if (!tabla) return null

  if (category === "libreta") {
    return tabla[designType] ?? 200
  }

  if (category === "termo") {
    if (!variantLabel) return null
    return tabla[variantLabel]?.[designType] ?? null
  }

  return tabla[designType] ?? null
}

export function formatearPrecio(monto) {
  if (monto == null || Number.isNaN(monto)) return "—"
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(monto)
}

export function calcularTotalItems(items) {
  return items.reduce((sum, item) => {
    const unit = item.unitPrice ?? 0
    return sum + unit * (item.quantity || 1)
  }, 0)
}

export function opcionesColor({ designType, category }) {
  if (category === "libreta") {
    return copy.colores.filter((c) =>
      ["hojas_blancas", "hojas_colores"].includes(c.value)
    )
  }
  if (designType === "tinta_alcohol") {
    return copy.colores.filter((c) => c.value === "color_tinta")
  }
  if (designType === "glitter" && category === "termo") {
    return copy.colores.filter((c) =>
      ["2_colores_glitter", "glitter_geoda1", "glitter_geoda2"].includes(c.value)
    )
  }
  if (designType === "glitter") {
    return copy.colores.filter((c) => c.value === "2_colores_glitter")
  }
  return []
}

export function disenoDesdeVarianteLlavero(variantLabel) {
  if (!variantLabel) return null
  const lower = variantLabel.toLowerCase()
  if (lower.includes("glitter")) return "glitter"
  if (lower.includes("tinta")) return "tinta_alcohol"
  return null
}

function lineasDetalleItem(item) {
  const color = lineaColorItem(item)
  const lineas = []

  if (item.productCategory === "libreta") {
    lineas.push(`   Diseño: ${etiquetaDiseno(item.designType)}`)
    if (color) lineas.push(`   Tipo de hojas: ${color}`)
    if (item.personalizationType === "nombre_portada" && item.personalizationText) {
      lineas.push(`   Nombre en portada: ${item.personalizationText}`)
    } else if (item.personalizationType === "sin_nombre_portada") {
      lineas.push(`   Nombre en portada: Sin nombre en portada`)
    }
    if (item.designNotes) {
      lineas.push(`   Describe tu diseño: ${item.designNotes}`)
    }
  } else {
    if (item.phoneModel) lineas.push(`   Modelo: ${item.phoneModel}`)
    lineas.push(`   Diseño: ${etiquetaDiseno(item.designType)}`)
    if (color) lineas.push(`   ${color}`)
    lineas.push(
      `   Personalización: ${etiquetaPersonalizacion(item.personalizationType)}${
        item.personalizationText ? ` — ${item.personalizationText}` : ""
      }`
    )
  }

  lineas.push(`   Cantidad: ${item.quantity}`)
  const subtotal = (item.unitPrice ?? 0) * (item.quantity || 1)
  const subtotalTexto = Number(subtotal).toLocaleString("es-MX", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
  lineas.push(`   Subtotal: $${subtotalTexto}`)

  return lineas
}

/** Mensaje de confirmación que el cliente envía a IVCA Crafts. */
export function armarMensajeWhatsapp({ clientName, clientPhone, items }) {
  const phone = normalizarTelefono(clientPhone)
  const lineas = items.map((item, index) => {
    const titulo = `${index + 1}. ${item.productName}${
      item.variantLabel ? ` (${item.variantLabel})` : ""
    }`
    return [titulo, ...lineasDetalleItem(item)].join("\n")
  })

  const total = calcularTotalItems(items)
  const totalTexto = Number(total).toLocaleString("es-MX", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })

  return [
    `Hola, soy ${clientName}.`,
    `Celular de contacto: ${phone}`,
    "Revisé mi cotización y deseo continuar con este pedido:",
    "",
    ...lineas,
    "",
    `Total: $${totalTexto} MXN`,
    "",
    "Confirmo que revisé los datos de mi cotización y deseo continuar con mi pedido.",
    "La entrega o envío se confirmará por separado.",
    "",
    `WhatsApp de contacto: https://wa.me/${copy.whatsappPrefijoPais}${phone}`,
  ].join("\n")
}

export function urlWhatsappCotizacion({ clientName, clientPhone, items }) {
  const mensaje = armarMensajeWhatsapp({ clientName, clientPhone, items })
  return `https://wa.me/${copy.whatsappPrefijoPais}${copy.whatsappNumero}?text=${encodeURIComponent(mensaje)}`
}

export const ESTILO_ESTATUS = {
  borrador: "badge-ghost",
  enviada: "badge-primary",
  autorizada: "badge-info",
  en_proceso: "badge-warning",
  terminada: "badge-success",
}
