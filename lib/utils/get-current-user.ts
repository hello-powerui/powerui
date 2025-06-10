import { auth } from '@clerk/nextjs/server'
import { UserService } from '@/lib/db/services/user-service'
import type { User } from '@/lib/generated/prisma'

export async function getCurrentUser(): Promise<User | null> {
  const { userId } = await auth()
  
  if (!userId) {
    return null
  }

  return UserService.getUserById(userId)
}

export async function requireUser(): Promise<User> {
  const user = await getCurrentUser()
  
  if (!user) {
    throw new Error('User not authenticated')
  }
  
  return user
}