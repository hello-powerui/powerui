import { PrismaClient } from '@/lib/generated/prisma'
import path from 'path'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Set the path for the query engine binary in production
if (process.env.NODE_ENV === 'production' && process.env.VERCEL) {
  const queryEnginePath = path.join(
    process.cwd(),
    'lib/generated/prisma/libquery_engine-rhel-openssl-3.0.x.so.node'
  )
  process.env.PRISMA_QUERY_ENGINE_LIBRARY = queryEnginePath
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma