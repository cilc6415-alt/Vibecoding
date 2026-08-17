// ============================================================
// Supabase · cliente de navegador
// ------------------------------------------------------------
// Úsalo en Client Components ("use client"). Lee las claves
// públicas de NEXT_PUBLIC_*. NUNCA pongas la service_role aquí.
//
// Ejemplo:
//   "use client"
//   import { createClient } from "@/lib/supabase/client"
//   const supabase = createClient()
//   await supabase.from("core_items").select()
// ============================================================

import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new Error(
      "Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY en este entorno. En Vercel: Settings → Environment Variables (Production) → guarda ambas → Deployments → Redeploy sin Build Cache."
    )
  }

  return createBrowserClient(url, anonKey)
}
