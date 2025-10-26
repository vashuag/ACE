// Alternative Prisma configuration for serverless environments
// This file provides a fallback if the main Prisma client fails

import { PrismaClient } from '../generated/client'

// Simple Prisma client without complex configuration
export const createSimplePrismaClient = () => {
  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  })
}

// Export a simple client as fallback
export const simplePrisma = createSimplePrismaClient()
