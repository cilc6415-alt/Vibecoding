"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, ShoppingCart, X } from "lucide-react"
import config from "@/config"
import { urlWhatsappGeneral } from "@/lib/quotes"

const AVATARES = {
  TERMOS: "/productos/termo-20oz.png",
  FUNDAS: "/productos/funda.png",
  LLAVEROS: "/productos/llavero.png",
}

function productosDesdeNav(navLeft) {
  return (navLeft || []).filter(
    (item) =>
      (typeof item.href === "string" && item.href.includes("/cotizar")) ||
      item.children?.some(
        (child) =>
          typeof child.href === "string" && child.href.includes("/cotizar")
      )
  )
}

function avatarProducto(label) {
  const key = String(label || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
  if (key.includes("TERMO")) return AVATARES.TERMOS
  if (key.includes("FUNDA")) return AVATARES.FUNDAS
  if (key.includes("LLAVERO")) return AVATARES.LLAVEROS
  return config.brand.logoSrc
}

export default function WhatsAppFloat() {
  const copy = config.ivca.cotizar
  const productos = useMemo(
    () => productosDesdeNav(config.ivca.navLeft),
    []
  )
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(null)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    function onClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false)
        setExpanded(null)
      }
    }
    function onEscape(event) {
      if (event.key === "Escape") {
        setOpen(false)
        setExpanded(null)
      }
    }
    document.addEventListener("mousedown", onClickOutside)
    document.addEventListener("keydown", onEscape)
    return () => {
      document.removeEventListener("mousedown", onClickOutside)
      document.removeEventListener("keydown", onEscape)
    }
  }, [open])

  function closeMenu() {
    setOpen(false)
    setExpanded(null)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <div ref={menuRef} className="flex flex-col items-end gap-3">
        {open && (
          <div
            className="relative w-[min(20rem,calc(100vw-3rem))] overflow-hidden rounded-2xl bg-white shadow-2xl"
            role="dialog"
            aria-label={copy.cartMenuTitle}
          >
            {/* Cabecera estilo chat */}
            <div className="relative bg-primary px-5 pb-8 pt-4 text-primary-content">
              <button
                type="button"
                className="absolute right-3 top-3 rounded-full p-1 text-primary-content/80 transition hover:bg-white/15 hover:text-white"
                aria-label="Cerrar menú"
                onClick={closeMenu}
              >
                <X className="size-5" aria-hidden />
              </button>
              <p className="pr-8 text-2xl font-bold leading-tight">
                {copy.cartMenuTitle}
              </p>
              <p className="mt-1 text-sm text-primary-content/90">
                {copy.cartMenuSubtitle}
              </p>
              <svg
                className="absolute -bottom-px left-0 w-full text-white"
                viewBox="0 0 320 28"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  fill="currentColor"
                  d="M0 28 V14 C80 28 120 0 160 8 C220 20 260 28 320 10 V28 Z"
                />
              </svg>
            </div>

            <ul className="max-h-[55vh] overflow-y-auto">
              {productos.map((item, index) => {
                const avatar = avatarProducto(item.label)
                const hasChildren = Boolean(item.children?.length)
                const isExpanded = expanded === item.label

                return (
                  <li
                    key={item.label}
                    className={
                      index < productos.length - 1
                        ? "border-b border-[#E8DFD4]"
                        : ""
                    }
                  >
                    {hasChildren ? (
                      <>
                        <button
                          type="button"
                          className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition hover:bg-primary/5"
                          aria-expanded={isExpanded}
                          onClick={() =>
                            setExpanded((prev) =>
                              prev === item.label ? null : item.label
                            )
                          }
                        >
                          <span className="relative size-12 shrink-0 overflow-hidden rounded-full border border-[#E8DFD4] bg-[#F5F0E8]">
                            <Image
                              src={avatar}
                              alt=""
                              fill
                              className="object-contain p-1"
                              sizes="48px"
                              unoptimized
                            />
                            <span className="absolute bottom-0 right-0 flex size-4 items-center justify-center rounded-full bg-primary text-primary-content ring-2 ring-white">
                              <ShoppingCart className="size-2.5" aria-hidden />
                            </span>
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-bold text-[#3D2E28]">
                              {item.label}
                            </span>
                            <span className="block text-xs text-base-content/60">
                              {copy.cartMenuExpand}
                            </span>
                          </span>
                          <ChevronDown
                            className={`size-4 shrink-0 text-primary transition ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                            aria-hidden
                          />
                        </button>
                        {isExpanded && (
                          <ul className="bg-[#F5F0E8]/70 pb-2">
                            {item.children.map((child) => (
                              <li key={child.label}>
                                <Link
                                  href={child.href}
                                  className="block px-5 py-2.5 pl-[4.75rem] text-sm text-[#3D2E28] transition hover:bg-primary/10 hover:text-primary"
                                  onClick={closeMenu}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="flex w-full items-center gap-3 px-4 py-3.5 transition hover:bg-primary/5"
                        onClick={closeMenu}
                      >
                        <span className="relative size-12 shrink-0 overflow-hidden rounded-full border border-[#E8DFD4] bg-[#F5F0E8]">
                          <Image
                            src={avatar}
                            alt=""
                            fill
                            className="object-contain p-1"
                            sizes="48px"
                            unoptimized
                          />
                          <span className="absolute bottom-0 right-0 flex size-4 items-center justify-center rounded-full bg-primary text-primary-content ring-2 ring-white">
                            <ShoppingCart className="size-2.5" aria-hidden />
                          </span>
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-bold text-[#3D2E28]">
                            {item.label}
                          </span>
                          <span className="block text-xs text-base-content/60">
                            {copy.cartMenuDirect}
                          </span>
                        </span>
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>

            <div className="px-4 pb-4 pt-2">
              <div className="flex items-center justify-center gap-6 rounded-full bg-primary px-5 py-2.5 text-primary-content shadow-md">
                <ShoppingCart className="size-5" aria-hidden />
                <span className="text-xs font-semibold uppercase tracking-wide">
                  {copy.cartMenuTitle}
                </span>
              </div>
            </div>

            <div
              className="mx-auto -mb-1 h-0 w-0 border-x-8 border-t-8 border-x-transparent border-t-primary"
              aria-hidden
            />
          </div>
        )}

        <button
          type="button"
          className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-content shadow-lg transition hover:scale-105 hover:shadow-xl"
          aria-label={copy.cartMenuAria}
          aria-expanded={open}
          aria-haspopup="dialog"
          title={copy.cartMenuTitle}
          onClick={() =>
            setOpen((prev) => {
              if (prev) setExpanded(null)
              return !prev
            })
          }
        >
          <ShoppingCart className="size-6" aria-hidden />
        </button>
      </div>

      <a
        href={urlWhatsappGeneral()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:shadow-xl"
        aria-label={`WhatsApp ${config.brand.logoText}`}
      >
        <svg className="size-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  )
}
