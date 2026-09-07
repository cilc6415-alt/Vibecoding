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
  return copy.disenos.find((d) => d.value === value)?.label ?? value
}

export function etiquetaColor(value) {
  return copy.colores.find((c) => c.value === value)?.label ?? value
}

export function etiquetaPersonalizacion(value) {
  return copy.personalizaciones.find((p) => p.value === value)?.label ?? value
}

export function etiquetaEstatus(value) {
  return copy.estatusCotizacion.find((e) => e.value === value)?.label ?? value
}

export function calcularPrecioUnitario({ category, variantLabel, designType }) {
  if (!category || !designType) return null

  const tabla = copy.precios?.[category]
  if (!tabla) return null

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

export function armarMensajeWhatsappCliente({ clientName, items }) {
  const lineas = items.map((item, index) => {
    const subtotal = (item.unitPrice ?? 0) * (item.quantity || 1)
    const partes = [
      `${index + 1}. ${item.productName}${item.variantLabel ? ` (${item.variantLabel})` : ""}`,
      item.phoneModel ? `   Modelo: ${item.phoneModel}` : null,
      `   Diseño: ${etiquetaDiseno(item.designType)}`,
      `   Color: ${etiquetaColor(item.colorOption)}${item.colorDetail ? ` — ${item.colorDetail}` : ""}`,
      `   Personalización: ${etiquetaPersonalizacion(item.personalizationType)}${item.personalizationText ? ` — ${item.personalizationText}` : ""}`,
      `   Cantidad: ${item.quantity}`,
      item.unitPrice != null ? `   Subtotal: ${formatearPrecio(subtotal)}` : null,
    ].filter(Boolean)
    return partes.join("\n")
  })

  const total = calcularTotalItems(items)
  const negocio = `${copy.whatsappPrefijoPais}${copy.whatsappNumero}`

  return [
    `*Cotización IVCA Crafts*`,
    "",
    `Hola ${clientName}, este es el resumen de tu pedido:`,
    "",
    ...lineas,
    "",
    `*Total estimado: ${formatearPrecio(total)}* (envío por confirmar)`,
    "",
    `Para autorizar tu pedido, envía este mensaje a IVCA Crafts por WhatsApp (${copy.whatsappNumero}) con la palabra *AUTORIZO*.`,
    "",
    `https://wa.me/${negocio}`,
  ].join("\n")
}

export function armarMensajeWhatsapp({ clientName, clientPhone, items }) {
  const lineas = items.map((item, index) => {
    const subtotal = (item.unitPrice ?? 0) * (item.quantity || 1)
    const partes = [
      `${index + 1}. ${item.productName}${item.variantLabel ? ` (${item.variantLabel})` : ""}`,
      item.phoneModel ? `   Modelo: ${item.phoneModel}` : null,
      `   Diseño: ${etiquetaDiseno(item.designType)}`,
      `   Color: ${etiquetaColor(item.colorOption)}${item.colorDetail ? ` — ${item.colorDetail}` : ""}`,
      `   Personalización: ${etiquetaPersonalizacion(item.personalizationType)}${item.personalizationText ? ` — ${item.personalizationText}` : ""}`,
      `   Cantidad: ${item.quantity}`,
      item.unitPrice != null
        ? `   Precio: ${formatearPrecio(item.unitPrice)} c/u · Subtotal: ${formatearPrecio(subtotal)}`
        : null,
    ].filter(Boolean)
    return partes.join("\n")
  })

  const total = calcularTotalItems(items)

  return [
    `Hola, soy ${clientName}. Quiero cotizar lo siguiente en IVCA Crafts:`,
    "",
    ...lineas,
    "",
    `Total estimado: ${formatearPrecio(total)} (envío por confirmar)`,
    "",
    `Mi WhatsApp: ${clientPhone}`,
    "",
    "¿Me confirmas disponibilidad, envío y anticipo? Gracias.",
  ].join("\n")
}

export function urlWhatsappCliente({ clientName, clientPhone, items }) {
  const mensaje = armarMensajeWhatsappCliente({ clientName, items })
  const phone = normalizarTelefono(clientPhone)
  return `https://wa.me/${copy.whatsappPrefijoPais}${phone}?text=${encodeURIComponent(mensaje)}`
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
