// Server-only auth functions to avoid Prisma client-side issues
import { auth } from "@/lib/auth"

export async function getServerSession() {
  return await auth()
}

export async function signOutServer() {
  // This will be handled by the client-side signOut
  return { success: true }
}
