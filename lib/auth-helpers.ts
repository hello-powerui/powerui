import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { hasActiveSubscription } from './user-permissions'

export async function requireUser() {
  const { userId } = await auth()
  
  if (!userId) {
    throw new Error('Unauthorized')
  }
  
  return userId
}

export async function requirePaidUser() {
  const userId = await requireUser()
  
  const hasSubscription = await hasActiveSubscription(userId)
  
  if (!hasSubscription) {
    throw new Error('Subscription required')
  }
  
  return userId
}

export function handleAuthError(error: unknown) {
  if (error instanceof Error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }
    
    if (error.message === 'Subscription required') {
      return NextResponse.json(
        { 
          error: 'Active subscription required',
          upgrade_url: '/upgrade'
        },
        { status: 402 } // Payment Required
      )
    }
  }
  
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  )
}