"use client"

import Link from "next/link"
import config from "@/config"
import {
  etiquetaColor,
  etiquetaDiseno,
  etiquetaEstatus,
  etiquetaPersonalizacion,
  ESTILO_ESTATUS,
  formatearPrecio,
} from "@/lib/quotes"
import { updateQuoteStatus } from "./actions"

export default function QuoteDashboard({ quotes, statusFilter }) {
  const estatus = config.ivca.estatusCotizacion.filter(
    (e) => e.value !== "borrador"
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <FilterLink value="all" current={statusFilter} label="Todas" />
        {estatus.map((e) => (
          <FilterLink key={e.value} value={e.value} current={statusFilter} label={e.label} />
        ))}
      </div>

      {!quotes.length ? (
        <div className="rounded-box border border-dashed border-base-300 bg-base-100 px-4 py-12 text-center text-base-content/60">
          No hay cotizaciones con este filtro.
        </div>
      ) : (
        <ul className="space-y-4">
          {quotes.map((quote) => (
            <li
              key={quote.id}
              className="rounded-box border border-base-200 bg-base-100 p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{quote.client_name}</p>
                  <p className="text-sm text-base-content/70">
                    WhatsApp: {quote.client_phone}
                  </p>
                  <p className="text-xs text-base-content/50">
                    {new Date(quote.created_at).toLocaleString("es-MX")}
                  </p>
                </div>
                <span
                  className={`badge ${ESTILO_ESTATUS[quote.status] || "badge-ghost"}`}
                >
                  {etiquetaEstatus(quote.status)}
                </span>
              </div>

              <ul className="mt-4 space-y-3 border-t border-base-200 pt-4">
                {(quote.quote_items || []).map((item) => (
                  <li key={item.id} className="text-sm">
                    <p className="font-medium">
                      {item.products?.name}
                      {item.product_variants?.variant_label
                        ? ` · ${item.product_variants.variant_label}`
                        : ""}
                    </p>
                    <p className="text-base-content/70">
                      {etiquetaDiseno(item.design_type)} ·{" "}
                      {etiquetaColor(item.color_option)}
                      {item.color_detail ? ` — ${item.color_detail}` : ""}
                    </p>
                    {item.phone_model && (
                      <p className="text-base-content/70">Modelo: {item.phone_model}</p>
                    )}
                    <p className="text-base-content/70">
                      {etiquetaPersonalizacion(item.personalization_type)}
                      {item.personalization_text
                        ? ` — ${item.personalization_text}`
                        : ""}
                    </p>
                    <p>Cantidad: {item.quantity}</p>
                    {item.unit_price != null && (
                      <p className="font-medium text-primary">
                        {formatearPrecio(item.unit_price)} c/u ·{" "}
                        {formatearPrecio(item.unit_price * item.quantity)}
                      </p>
                    )}
                  </li>
                ))}
              </ul>

              <form action={updateQuoteStatus} className="mt-4 flex flex-wrap items-center gap-2">
                <input type="hidden" name="id" value={quote.id} />
                <select
                  name="status"
                  defaultValue={quote.status}
                  className="select select-bordered select-sm"
                  aria-label="Cambiar estatus"
                >
                  {estatus.map((e) => (
                    <option key={e.value} value={e.value}>
                      {e.label}
                    </option>
                  ))}
                </select>
                <button type="submit" className="btn btn-primary btn-sm">
                  Actualizar estatus
                </button>
                <a
                  href={`https://wa.me/52${quote.client_phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-sm"
                >
                  WhatsApp cliente
                </a>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function FilterLink({ value, current, label }) {
  const active = value === current
  return (
    <Link
      href={value === "all" ? "/dashboard" : `/dashboard?status=${value}`}
      className={`btn btn-sm ${active ? "btn-primary" : "btn-ghost"}`}
    >
      {label}
    </Link>
  )
}
