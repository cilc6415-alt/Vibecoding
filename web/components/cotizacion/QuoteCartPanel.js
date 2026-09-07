"use client"

import config from "@/config"
import { useQuoteCart } from "@/context/QuoteCartContext"
import {
  calcularTotalItems,
  etiquetaColor,
  etiquetaDiseno,
  etiquetaPersonalizacion,
  formatearPrecio,
} from "@/lib/quotes"

export default function QuoteCartPanel({ onFinish, finishing, error }) {
  const copy = config.ivca.cotizar
  const { items, removeItem } = useQuoteCart()
  const total = calcularTotalItems(items)

  return (
    <aside className="rounded-2xl border border-base-200 bg-[#F5F0E8] p-6 lg:sticky lg:top-24 lg:self-start">
      <h2 className="font-serif text-xl font-semibold text-[#3D2E28]">
        {copy.totalLabel}
      </h2>

      {!items.length ? (
        <p className="mt-6 rounded-xl border border-dashed border-[#D4C4B8] bg-base-100 p-6 text-sm text-base-content/60">
          {copy.emptyCart}
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="rounded-xl border border-base-200 bg-base-100 p-4 text-sm"
            >
              <p className="font-semibold">
                {item.productName}
                {item.variantLabel ? ` · ${item.variantLabel}` : ""}
              </p>
              {item.phoneModel && (
                <p className="mt-1 text-base-content/70">Modelo: {item.phoneModel}</p>
              )}
              <p className="mt-1 text-base-content/70">
                {etiquetaDiseno(item.designType)} · {etiquetaColor(item.colorOption)}
              </p>
              {item.colorDetail && (
                <p className="text-base-content/60">Colores: {item.colorDetail}</p>
              )}
              <p className="text-base-content/60">
                {etiquetaPersonalizacion(item.personalizationType)}
                {item.personalizationText ? ` — ${item.personalizationText}` : ""}
              </p>
              <p className="mt-1 font-medium">Cantidad: {item.quantity}</p>
              <button
                type="button"
                className="btn btn-ghost btn-xs mt-2 text-error"
                onClick={() => removeItem(item.id)}
              >
                {copy.remove}
              </button>
            </li>
          ))}
        </ul>
      )}

      {items.length > 0 && (
        <div className="mt-6 flex items-center justify-between border-t border-[#D4C4B8] pt-4">
          <span className="text-sm font-medium text-base-content/70">
            {copy.subtotalLabel}
          </span>
          <span className="text-xl font-semibold text-primary">
            {formatearPrecio(total)}
          </span>
        </div>
      )}

      <p className="mt-6 text-xs text-base-content/60">
        El envío se cotiza aparte y se confirma por WhatsApp antes de iniciar tu pieza.
      </p>

      {error && items.length > 0 && (
        <p role="alert" className="mt-3 text-sm text-error">
          {error}
        </p>
      )}

      <button
        type="button"
        className="btn btn-primary btn-block mt-6"
        disabled={!items.length || finishing}
        onClick={onFinish}
      >
        {finishing ? (
          <span className="loading loading-spinner loading-sm" />
        ) : (
          copy.finish
        )}
      </button>
    </aside>
  )
}
