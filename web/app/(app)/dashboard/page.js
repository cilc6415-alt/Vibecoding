import { redirect } from "next/navigation"
import config from "@/config"
import { createClient, getUser } from "@/lib/supabase/server"
import { isOwnerEmail } from "@/lib/auth/owner"
import QuoteDashboard from "./QuoteDashboard"
export const metadata = { title: "Cotizaciones" }

export default async function DashboardPage({ searchParams }) {
  const user = await getUser()
  if (!user) redirect(config.auth.loginUrl)
  if (!isOwnerEmail(user.email)) redirect("/?error=unauthorized")

  const params = await searchParams
  const statusFilter =
    typeof params?.status === "string" ? params.status : "all"

  const supabase = await createClient()
  let query = supabase
    .from("quotes")
    .select(
      `
      *,
      quote_items (
        *,
        products ( name, category ),
        product_variants ( variant_label )
      )
    `
    )
    .order("created_at", { ascending: false })

  if (statusFilter !== "all") {
    query = query.eq("status", statusFilter)
  }

  const { data: quotes, error } = await query

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Cotizaciones</h1>
        <p className="mt-1 text-sm text-base-content/70">
          Pedidos enviados desde el cotizador público. Confirma por WhatsApp y
          actualiza el estatus aquí.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-error/40 bg-error/10 px-4 py-3 text-sm text-error">
          No pudimos cargar las cotizaciones. ¿Corriste la migración 008?{" "}
          {error.message}
        </div>
      )}

      <QuoteDashboard quotes={quotes ?? []} statusFilter={statusFilter} />
    </div>
  )
}
