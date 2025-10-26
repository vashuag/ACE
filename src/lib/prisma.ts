import { PrismaClient } from '../generated/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Create Prisma client with proper configuration for serverless
const createPrismaClient = () => {
  const config: any = {
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  }

  // Add engine configuration for serverless if available
  if (process.env.PRISMA_QUERY_ENGINE_LIBRARY) {
    config.__internal = {
      engine: {
        binaryPath: process.env.PRISMA_QUERY_ENGINE_LIBRARY,
      },
    }
  }

  return new PrismaClient(config)
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
