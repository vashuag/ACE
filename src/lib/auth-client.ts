// Client-safe auth functions
import { signOut as nextAuthSignOut } from "next-auth/react"

export function signOut() {
  return nextAuthSignOut({ callbackUrl: "/" })
}
