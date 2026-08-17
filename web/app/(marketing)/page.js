import { redirect } from "next/navigation"
import Hero from "@/components/landing/Hero"
import ClientLogos from "@/components/landing/ClientLogos"
import Problem from "@/components/landing/Problem"
import Features from "@/components/landing/Features"
import Pricing from "@/components/landing/Pricing"
import FAQ from "@/components/landing/FAQ"
import FinalCta from "@/components/landing/FinalCta"
import Waitlist from "@/components/landing/Waitlist"
import config from "@/config"

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
      <ClientLogos />
      <Problem />
      <Features />
      {config.features.pricing && <Pricing />}
      <FAQ />
      <FinalCta />
      {config.features.waitlist && <Waitlist />}
    </>
  )
}
