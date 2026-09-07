"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronDown, Menu, ShoppingCart, X } from "lucide-react"
import config from "@/config"
import Logo from "@/components/Logo"
import { urlWhatsappGeneral } from "@/lib/quotes"

function resolveHref(item) {
  if (item.href === "whatsapp") return urlWhatsappGeneral()
  return item.href
}

function homeSectionHref(href) {
  if (typeof href !== "string") return href
  if (href.startsWith("/#")) return href
  if (href.startsWith("#")) return `/${href}`
  return href
}

function isHomeSectionHref(href) {
  return typeof href === "string" && (href.startsWith("/#") || href.startsWith("#"))
}

function goHomeSection(event, href) {
  if (!isHomeSectionHref(href)) return false
  event.preventDefault()
  window.location.assign(homeSectionHref(href))
  return true
}

function NavDropdownItem({ href, label, menuLabel, external }) {
  const router = useRouter()
  const navigatingRef = useRef(false)

  function handleNavigate(event) {
    event.preventDefault()
    if (navigatingRef.current) return
    navigatingRef.current = true
    if (external) {
      window.open(href, "_blank", "noopener,noreferrer")
      return
    }
    router.push(href)
  }

  return (
    <a
      href={href}
      className="block px-4 py-2 text-sm text-base-content/80 hover:bg-base-200 hover:text-primary"
      onMouseDown={handleNavigate}
      onClick={handleNavigate}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {label}
    </a>
  )
}

function NavDropdown({ label, items, align = "left", isOpen, onOpen, onClose }) {
  const ref = useRef(null)
  const closeTimerRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined

    function onClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) onClose()
    }
    function onEscape(event) {
      if (event.key === "Escape") onClose()
    }
    document.addEventListener("click", onClickOutside)
    document.addEventListener("keydown", onEscape)
    return () => {
      document.removeEventListener("click", onClickOutside)
      document.removeEventListener("keydown", onEscape)
    }
  }, [isOpen, onClose])

  function handleMouseEnter() {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    onOpen()
  }

  function handleMouseLeave() {
    closeTimerRef.current = setTimeout(onClose, 120)
  }

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    }
  }, [])

  return (
    <div
      className="relative"
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className={`flex items-center gap-1 text-xs font-medium tracking-widest transition hover:text-primary ${
          isOpen ? "text-primary" : "text-base-content/80"
        }`}
        aria-expanded={isOpen}
        onClick={() => (isOpen ? onClose() : onOpen())}
      >
        {label}
        <ChevronDown className={`size-3 transition ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div
          className={`absolute top-full z-50 min-w-44 pt-2 ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          <div className="rounded-lg border border-base-200 bg-base-100 py-2 shadow-lg">
            {items.map((child) => {
              const href = resolveHref(child)
              const external = child.external || child.href === "whatsapp"
              return (
                <NavDropdownItem
                  key={child.label}
                  href={href}
                  label={child.label}
                  menuLabel={label}
                  external={external}
                />
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

function NavLink({ item, openMenu, onOpenMenu, onCloseMenu }) {
  if (item.children) {
    return (
      <NavDropdown
        label={item.label}
        items={item.children}
        isOpen={openMenu === item.label}
        onOpen={() => onOpenMenu(item.label)}
        onClose={onCloseMenu}
      />
    )
  }
  const href = resolveHref(item)
  const linkHref = homeSectionHref(href)

  return (
    <Link
      href={linkHref}
      className="text-xs font-medium tracking-widest text-base-content/80 transition hover:text-primary"
      onClick={(event) => goHomeSection(event, href)}
      {...(item.external || item.href === "whatsapp"
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {item.label}
    </Link>
  )
}

export default function IvcaNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(null)
  const ivca = config.ivca

  const closeMenu = useCallback(() => setOpenMenu(null), [])
  const openMenuByLabel = useCallback((label) => setOpenMenu(label), [])

  return (
    <header className="sticky top-0 z-50 border-b border-base-200 bg-base-100/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Logo className="h-[1.25rem]" />
            <span className="font-serif text-xl font-semibold tracking-wide text-primary leading-none">
              {config.brand.logoText.toUpperCase()}
            </span>
          </div>

          <button
            type="button"
            className="btn btn-ghost btn-sm md:hidden"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          <Link
            href="/cotizar"
            className="btn btn-primary btn-sm hidden md:inline-flex"
            aria-label="Cotizar"
            title="Cotizar"
          >
            <ShoppingCart className="size-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-4 hidden items-center justify-between gap-6 md:flex">
          <nav className="flex flex-wrap items-center gap-5" aria-label="Menú principal">
            {ivca.navLeft.map((item) => (
              <NavLink
                key={item.label}
                item={item}
                openMenu={openMenu}
                onOpenMenu={openMenuByLabel}
                onCloseMenu={closeMenu}
              />
            ))}
          </nav>
          <nav className="flex flex-wrap items-center gap-5" aria-label="Menú secundario">
            {ivca.navRight.map((item) => (
              <NavLink
                key={item.label}
                item={item}
                openMenu={openMenu}
                onOpenMenu={openMenuByLabel}
                onCloseMenu={closeMenu}
              />
            ))}
          </nav>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-base-200 bg-base-100 px-4 py-4 md:hidden">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-base-content/50">
            Menú
          </p>
          <ul className="space-y-3">
            {ivca.navLeft.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <details className="group">
                    <summary className="cursor-pointer text-sm font-medium">
                      {item.label}
                    </summary>
                    <ul className="mt-2 space-y-2 border-l border-base-200 pl-4">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={resolveHref(child)}
                            className="text-sm text-base-content/70"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link
                    href={homeSectionHref(resolveHref(item))}
                    className="text-sm font-medium"
                    onClick={(event) => {
                      goHomeSection(event, resolveHref(item))
                      setMobileOpen(false)
                    }}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <p className="mb-2 mt-6 text-xs font-semibold uppercase tracking-widest text-base-content/50">
            Más
          </p>
          <ul className="space-y-3">
            {ivca.navRight.map((item) => (
              <li key={item.label}>
                <Link
                  href={homeSectionHref(resolveHref(item))}
                  className="text-sm font-medium"
                  onClick={(event) => {
                    goHomeSection(event, resolveHref(item))
                    setMobileOpen(false)
                  }}
                  {...(item.external || item.href === "whatsapp"
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/cotizar"
            className="btn btn-primary btn-block mt-6"
            onClick={() => setMobileOpen(false)}
            aria-label="Cotizar"
          >
            <ShoppingCart className="size-5" aria-hidden />
            <span className="sr-only">Cotizar</span>
          </Link>
        </div>
      )}
    </header>
  )
}
