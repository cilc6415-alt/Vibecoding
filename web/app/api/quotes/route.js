import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { normalizarTelefono, telefonoValido } from "@/lib/quotes"

export async function POST(request) {
  try {
    const { clientName, clientPhone, items } = await request.json()

    if (!clientName || typeof clientName !== "string" || !clientName.trim()) {
      return NextResponse.json({ error: "Nombre requerido." }, { status: 400 })
    }

    const phone = normalizarTelefono(clientPhone)
    if (!telefonoValido(phone)) {
      return NextResponse.json({ error: "Celular inválido." }, { status: 400 })
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Carrito vacío." }, { status: 400 })
    }

    const quoteId = crypto.randomUUID()
    const supabase = await createClient()

    const { error: quoteError } = await supabase.from("quotes").insert({
      id: quoteId,
      client_name: clientName.trim(),
      client_phone: phone,
      status: "enviada",
    })

    if (quoteError) {
      console.error("[quotes] insert:", quoteError.message)
      return NextResponse.json(
        { error: "No pudimos guardar la cotización." },
        { status: 500 }
      )
    }

    const rows = items.map((item) => ({
      quote_id: quoteId,
      product_id: item.productId,
      variant_id: item.variantId,
      design_type: item.designType,
      color_option: item.colorOption,
      color_detail: item.colorDetail,
      phone_model: item.phoneModel || null,
      unit_price: item.unitPrice ?? null,
      personalization_type: item.personalizationType,
      personalization_text: item.personalizationText,
      quantity: item.quantity,
    }))

    const { error: itemsError } = await supabase.from("quote_items").insert(rows)

    if (itemsError) {
      console.error("[quote_items] insert:", itemsError.message)
      return NextResponse.json(
        { error: "No pudimos guardar los productos de la cotización." },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true, quoteId })
  } catch (err) {
    console.error("[quotes] error:", err?.message)
    return NextResponse.json({ error: "Error procesando la solicitud." }, { status: 500 })
  }
}
