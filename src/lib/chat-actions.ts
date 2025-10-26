// Server actions for chat functionality
"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function createConversation(title: string) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("Not authenticated")
  }

  const conversation = await prisma.conversation.create({
    data: {
      title,
      userId: session.user.id,
    }
  })

  return conversation
}

export async function getConversations() {
  const session = await auth()
  if (!session?.user?.id) {
    return []
  }

  const conversations = await prisma.conversation.findMany({
    where: {
      userId: session.user.id
    },
    include: {
      messages: {
        orderBy: {
          createdAt: 'asc'
        }
      }
    },
    orderBy: {
      updatedAt: 'desc'
    }
  })

  return conversations
}

export async function addMessage(conversationId: string, content: string, role: 'USER' | 'ASSISTANT') {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("Not authenticated")
  }

  const message = await prisma.message.create({
    data: {
      content,
      role,
      conversationId,
    }
  })

  // Update conversation timestamp
  await prisma.conversation.update({
    where: { id: conversationId },
    data: { updatedAt: new Date() }
  })

  return message
}

export async function deleteConversation(conversationId: string) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("Not authenticated")
  }

  await prisma.conversation.delete({
    where: { id: conversationId }
  })

  return { success: true }
}
