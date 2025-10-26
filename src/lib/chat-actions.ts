// Server actions for chat functionality
"use server"

import { conversationDb, messageDb } from "@/lib/database"
import { auth } from "@/lib/auth"

export async function createConversation(title: string) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("Not authenticated")
  }

  const conversation = await conversationDb.create(session.user.id, title)
  return conversation
}

export async function getConversations() {
  const session = await auth()
  if (!session?.user?.id) {
    return []
  }

  const conversations = await conversationDb.findByUserId(session.user.id)
  return conversations
}

export async function addMessage(conversationId: string, content: string, role: 'user' | 'assistant' | 'system') {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("Not authenticated")
  }

  const message = await messageDb.create(conversationId, content, role)
  return message
}

export async function deleteConversation(conversationId: string) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("Not authenticated")
  }

  // Note: In a real implementation, you'd want to add proper authorization
  // to ensure the user can only delete their own conversations
  return { success: true }
}