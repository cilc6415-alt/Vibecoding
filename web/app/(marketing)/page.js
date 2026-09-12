import { redirect } from "next/navigation"
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

  return (
    <>
      <Hero />
      <Nosotros />
      <FinalCta showActions={false} align="left" />
      <ComoPedir />
      <Envios />
    </>
  )
}
