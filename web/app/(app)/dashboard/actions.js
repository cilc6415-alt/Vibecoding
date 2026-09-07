"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { isOwnerEmail } from "@/lib/auth/owner"

async function requireOwner() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user || !isOwnerEmail(user.email)) throw new Error("No autorizado")
  return { supabase, user }
}

export async function updateQuoteStatus(formData) {
  const id = formData.get("id")?.toString()
  const status = formData.get("status")?.toString()
  if (!id || !status) return

  const allowed = ["autorizada", "en_proceso", "terminada", "enviada"]
  if (!allowed.includes(status)) return

  const { supabase } = await requireOwner()
  const patch = { status }
  if (status === "autorizada") {
    patch.authorized_at = new Date().toISOString()
  }

  await supabase.from("quotes").update(patch).eq("id", id)
  revalidatePath("/dashboard")
}
