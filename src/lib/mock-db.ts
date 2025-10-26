// Simple in-memory database for demo purposes
// This will be replaced with Prisma when database is properly configured

interface User {
  id: string
  email: string
  name: string
  password: string
  createdAt: Date
}

interface Contact {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: Date
}

interface Newsletter {
  id: string
  email: string
  createdAt: Date
}

interface Conversation {
  id: string
  title: string
  userId: string
  messages: Message[]
  createdAt: Date
}

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  conversationId: string
  timestamp: Date
}

// In-memory storage
const users: User[] = []
const contacts: Contact[] = []
const newsletters: Newsletter[] = []
const conversations: Conversation[] = []

export const mockDb = {
  user: {
    create: async (data: Omit<User, 'id' | 'createdAt'>) => {
      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        createdAt: new Date()
      }
      users.push(user)
      return user
    },
    findUnique: async (where: { email: string }) => {
      return users.find(user => user.email === where.email) || null
    }
  },
  contact: {
    create: async (data: Omit<Contact, 'id' | 'createdAt'>) => {
      const contact: Contact = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        createdAt: new Date()
      }
      contacts.push(contact)
      return contact
    }
  },
  newsletter: {
    create: async (data: Omit<Newsletter, 'id' | 'createdAt'>) => {
      const newsletter: Newsletter = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        createdAt: new Date()
      }
      newsletters.push(newsletter)
      return newsletter
    },
    findUnique: async (where: { email: string }) => {
      return newsletters.find(newsletter => newsletter.email === where.email) || null
    }
  },
  conversation: {
    create: async (data: Omit<Conversation, 'id' | 'createdAt'>) => {
      const conversation: Conversation = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        createdAt: new Date()
      }
      conversations.push(conversation)
      return conversation
    },
    findMany: async (where: { userId: string }) => {
      return conversations.filter(conv => conv.userId === where.userId)
    },
    findUnique: async (where: { id: string }) => {
      return conversations.find(conv => conv.id === where.id) || null
    },
    update: async (where: { id: string }, data: any) => {
      const index = conversations.findIndex(conv => conv.id === where.id)
      if (index !== -1) {
        conversations[index] = { ...conversations[index], ...data }
        return conversations[index]
      }
      return null
    },
    delete: async (where: { id: string }) => {
      const index = conversations.findIndex(conv => conv.id === where.id)
      if (index !== -1) {
        conversations.splice(index, 1)
        return true
      }
      return false
    }
  },
  message: {
    create: async (data: Omit<Message, 'id' | 'timestamp'>) => {
      const message: Message = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        timestamp: new Date()
      }
      // Add message to conversation
      const conversation = conversations.find(conv => conv.id === data.conversationId)
      if (conversation) {
        conversation.messages.push(message)
      }
      return message
    },
    findMany: async (where: { conversationId: string }) => {
      const conversation = conversations.find(conv => conv.id === where.conversationId)
      return conversation ? conversation.messages : []
    }
  }
}