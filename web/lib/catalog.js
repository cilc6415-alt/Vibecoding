// Catálogo local cuando Supabase aún no tiene la migración 008 aplicada.

const IMAGENES_PRODUCTO = {
  products: {
    termo: "/productos/termo-20oz.png",
    funda: "/productos/funda.png",
    llavero: "/productos/llavero.png",
  },
  variants: {
    "12 onzas": "/productos/termo-12oz.png",
    "20 onzas": "/productos/termo-20oz.png",
    "30 onzas": "/productos/termo-30oz.png",
    iPhone: "/productos/funda.png",
    Samsung: "/productos/funda.png",
    Motorola: "/productos/funda.png",
    Xiaomi: "/productos/funda.png",
  },
}

function aplicarImagenesCatalogo(products, variants) {
  return {
    products: products.map((p) => ({
      ...p,
      base_image_url: IMAGENES_PRODUCTO.products[p.category] ?? p.base_image_url,
    })),
    variants: variants.map((v) => ({
      ...v,
      image_url: IMAGENES_PRODUCTO.variants[v.variant_label] ?? v.image_url,
    })),
  }
}

export const CATALOG_FALLBACK = {
  products: [
    {
      id: "a1000000-0000-4000-8000-000000000001",
      name: "Termo",
      category: "termo",
      base_image_url: "/productos/termo-20oz.png",
      active: true,
    },
    {
      id: "a1000000-0000-4000-8000-000000000002",
      name: "Funda para celular",
      category: "funda",
      base_image_url: "/productos/funda.png",
      active: true,
    },
    {
      id: "a1000000-0000-4000-8000-000000000003",
      name: "Llavero de resina",
      category: "llavero",
      base_image_url: "/productos/llavero.png",
      active: true,
    },
  ],
  variants: [
    {
      id: "b1000000-0000-4000-8000-000000000001",
      product_id: "a1000000-0000-4000-8000-000000000001",
      variant_type: "size",
      variant_label: "12 onzas",
      image_url: "/productos/termo-12oz.png",
      sort_order: 1,
      active: true,
    },
    {
      id: "b1000000-0000-4000-8000-000000000002",
      product_id: "a1000000-0000-4000-8000-000000000001",
      variant_type: "size",
      variant_label: "20 onzas",
      image_url: "/productos/termo-20oz.png",
      sort_order: 2,
      active: true,
    },
    {
      id: "b1000000-0000-4000-8000-000000000003",
      product_id: "a1000000-0000-4000-8000-000000000001",
      variant_type: "size",
      variant_label: "30 onzas",
      image_url: "/productos/termo-30oz.png",
      sort_order: 3,
      active: true,
    },
    {
      id: "b1000000-0000-4000-8000-000000000004",
      product_id: "a1000000-0000-4000-8000-000000000002",
      variant_type: "model",
      variant_label: "iPhone",
      image_url: "/productos/funda.png",
      sort_order: 1,
      active: true,
    },
    {
      id: "b1000000-0000-4000-8000-000000000005",
      product_id: "a1000000-0000-4000-8000-000000000002",
      variant_type: "model",
      variant_label: "Samsung",
      image_url: "/productos/funda.png",
      sort_order: 2,
      active: true,
    },
    {
      id: "b1000000-0000-4000-8000-000000000006",
      product_id: "a1000000-0000-4000-8000-000000000002",
      variant_type: "model",
      variant_label: "Motorola",
      image_url: "/productos/funda.png",
      sort_order: 3,
      active: true,
    },
    {
      id: "b1000000-0000-4000-8000-000000000007",
      product_id: "a1000000-0000-4000-8000-000000000002",
      variant_type: "model",
      variant_label: "Xiaomi",
      image_url: "/productos/funda.png",
      sort_order: 4,
      active: true,
    },
  ],
}

const VARIANT_SLUGS = {
  "12-onzas": "12 onzas",
  "20-onzas": "20 onzas",
  "30-onzas": "30 onzas",
  iphone: "iPhone",
  samsung: "Samsung",
  motorola: "Motorola",
  xiaomi: "Xiaomi",
}

export function getCatalogData(products, variants) {
  const hasDb = products?.length > 0 && variants?.length > 0
  const raw = {
    products: hasDb ? products : CATALOG_FALLBACK.products,
    variants: hasDb ? variants : CATALOG_FALLBACK.variants,
    usingFallback: !hasDb,
  }
  const conImagenes = aplicarImagenesCatalogo(raw.products, raw.variants)
  return { ...raw, ...conImagenes }
}

export function resolverSeleccionInicial({
  products,
  variants,
  categoria,
  variante,
  diseno,
}) {
  const product =
    (categoria && products.find((p) => p.category === categoria)) ||
    products[0] ||
    null

  if (!product) return { product: null, variant: null, designType: null }

  let variant = null
  if (variante && VARIANT_SLUGS[variante]) {
    const label = VARIANT_SLUGS[variante]
    variant =
      variants.find(
        (v) => v.product_id === product.id && v.variant_label === label
      ) || null
  }

  // Llaveros: la variante tinta/glitter se elige en el cotizador (paso Diseño).
  let designType = diseno || null

  return { product, variant, designType }
}

export function imagenProducto(product, variant) {
  return variant?.image_url || product?.base_image_url || "/placeholders/producto.svg"
}

export function selectionKey(categoria, variante, diseno) {
  return [categoria || "", variante || "", diseno || ""].join("|")
}
