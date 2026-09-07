"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

const STORAGE_KEY = "ivca-quote-cart-v1"

const QuoteCartContext = createContext(null)

function loadStored() {
  if (typeof window === "undefined") return { items: [], clientName: "", clientPhone: "" }
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return { items: [], clientName: "", clientPhone: "" }
    return JSON.parse(raw)
  } catch {
    return { items: [], clientName: "", clientPhone: "" }
  }
}

export function QuoteCartProvider({ children }) {
  const [items, setItems] = useState([])
  const [clientName, setClientName] = useState("")
  const [clientPhone, setClientPhone] = useState("")
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const stored = loadStored()
    setItems(stored.items || [])
    setClientName(stored.clientName || "")
    setClientPhone(stored.clientPhone || "")
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ items, clientName, clientPhone })
    )
  }, [items, clientName, clientPhone, hydrated])

  const addItem = useCallback((item) => {
    setItems((prev) => [...prev, { ...item, id: crypto.randomUUID() }])
  }, [])

  const updateItem = useCallback((id, patch) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...patch } : item))
    )
  }, [])

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    setClientName("")
    setClientPhone("")
  }, [])

  const value = useMemo(
    () => ({
      items,
      clientName,
      clientPhone,
      setClientName,
      setClientPhone,
      addItem,
      updateItem,
      removeItem,
      clearCart,
      hydrated,
    }),
    [
      items,
      clientName,
      clientPhone,
      addItem,
      updateItem,
      removeItem,
      clearCart,
      hydrated,
    ]
  )

  return (
    <QuoteCartContext.Provider value={value}>{children}</QuoteCartContext.Provider>
  )
}

export function useQuoteCart() {
  const ctx = useContext(QuoteCartContext)
  if (!ctx) throw new Error("useQuoteCart debe usarse dentro de QuoteCartProvider")
  return ctx
}
