import config from "@/config"

export function isOwnerEmail(email) {
  if (!email || typeof email !== "string") return false
  return email.toLowerCase() === config.auth.ownerEmail.toLowerCase()
}
