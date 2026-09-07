import { createClient } from "@/lib/supabase/server"
import {
  getCatalogData,
  resolverSeleccionInicial,
  selectionKey,
} from "@/lib/catalog"
import QuoteWizard from "@/components/cotizacion/QuoteWizard"
import config from "@/config"

export const metadata = {
  title: `Cotizar · ${config.brand.logoText}`,
}

export default async function CotizarPage({ searchParams }) {
  const params = await searchParams
  const categoria = typeof params?.categoria === "string" ? params.categoria : null
  const variante = typeof params?.variante === "string" ? params.variante : null
  const diseno = typeof params?.diseno === "string" ? params.diseno : null

  const supabase = await createClient()

  const [{ data: products }, { data: variants }] = await Promise.all([
    supabase.from("products").select("*").eq("active", true).order("name"),
    supabase
      .from("product_variants")
      .select("*")
      .eq("active", true)
      .order("sort_order"),
  ])

  const { products: catalogProducts, variants: catalogVariants, usingFallback } =
    getCatalogData(products ?? [], variants ?? [])

  const { product, variant, designType } = resolverSeleccionInicial({
    products: catalogProducts,
    variants: catalogVariants,
    categoria,
    variante,
    diseno,
  })

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      {usingFallback && (
        <div className="mb-6 rounded-lg border border-warning/40 bg-warning/10 px-4 py-3 text-sm text-warning-content">
          Catálogo en modo local. Para guardar cotizaciones en la base de datos,
          corre <code className="rounded bg-base-200 px-1">supabase db push</code>.
        </div>
      )}
      <QuoteWizard
        key={selectionKey(categoria, variante, diseno)}
        products={catalogProducts}
        variants={catalogVariants}
        initialProduct={product}
        initialVariant={variant}
        initialDesignType={designType}
        lockedProduct={Boolean(categoria)}
      />
    </div>
  )
}
