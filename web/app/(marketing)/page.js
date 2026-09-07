import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import Hero from "@/components/landing/Hero"
import FinalCta from "@/components/landing/FinalCta"
import Nosotros from "@/components/landing/Nosotros"
import ComoPedir from "@/components/landing/ComoPedir"
import Envios from "@/components/landing/Envios"

export default async function HomePage({ searchParams }) {
  const params = await searchParams
  if (typeof params?.code === "string" && params.code) {
    const callback = new URLSearchParams()
    callback.set("code", params.code)
    if (typeof params.next === "string") callback.set("next", params.next)
    redirect(`/auth/callback?${callback.toString()}`)
  }

  let galleryImages = []
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from("gallery_images")
      .select("*")
      .eq("active", true)
      .order("sort_order")
    galleryImages = data ?? []
  } catch {
    galleryImages = []
  }

  return (
    <>
      <Hero />
      <FinalCta showActions={false} />
      <Nosotros images={galleryImages} />
      <ComoPedir />
      <Envios />
    </>
  )
}
