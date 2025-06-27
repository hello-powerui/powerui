import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { Webhook } from 'svix'
import { WebhookEvent } from '@clerk/nextjs/server'
import { UserService } from '@/lib/db/services/user-service'
import { prisma } from '@/lib/db/prisma'
import { createOrUpdateContact, deleteContact } from '@/lib/loops'

export async function POST(req: Request) {
  try {
    // Get the headers
    const headerPayload = await headers()
    const svix_id = headerPayload.get("svix-id")
    const svix_timestamp = headerPayload.get("svix-timestamp")
    const svix_signature = headerPayload.get("svix-signature")

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json(
      { error: 'Missing svix headers' },
      { status: 400 }
    )
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '')

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    // console.error('Error verifying webhook:', err)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  // Handle the webhook
  const eventType = evt.type

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, email_addresses, username, first_name, last_name } = evt.data
    const primaryEmail = email_addresses.find(email => email.id === evt.data.primary_email_address_id)
    
    if (primaryEmail) {
      try {
        await UserService.upsertUser(id, primaryEmail.email_address, username || undefined)
        
        // Get user's plan from database
        const user = await prisma.user.findUnique({
          where: { id },
          select: { plan: true }
        })
        
        // Sync to Loops
        await createOrUpdateContact({
          email: primaryEmail.email_address,
          firstName: first_name || undefined,
          lastName: last_name || undefined,
          userId: id,
          plan: user?.plan || undefined,
          userGroup: user?.plan === 'TEAM' ? 'Team Customer' : user?.plan === 'PRO' ? 'Pro Customer' : 'Free User'
        })
        
      } catch (error) {
        console.error('Error syncing user to database:', error)
        return NextResponse.json(
          { 
            error: 'Failed to sync user',
            details: error instanceof Error ? error.message : 'Unknown error'
          },
          { status: 500 }
        )
      }
    }
  }

  if (eventType === 'user.deleted') {
    try {
      // Get user email before deletion
      const user = await prisma.user.findUnique({
        where: { id: evt.data.id! },
        select: { email: true }
      })
      
      if (user?.email) {
        // Delete from Loops
        await deleteContact(user.email)
      }
      
      await UserService.deleteUser(evt.data.id!)
      
    } catch (error) {
      // console.error('Error deleting user from database:', error)
    }
  }

  // Handle organization creation
  if (eventType === 'organization.created') {
    const orgData = evt.data as any
    
    try {
      // Get the user who created the organization
      const creatorId = orgData.created_by
      
      if (creatorId) {
        // Check if user has a team purchase
        const purchase = await prisma.purchase.findFirst({
          where: {
            userId: creatorId,
            status: "COMPLETED",
            plan: {
              in: ["TEAM_5", "TEAM_10"],
            },
            organizationId: null,
          },
        })

        if (purchase) {
          // Create organization in our database
          const organization = await prisma.organization.create({
            data: {
              clerkOrgId: orgData.id,
              name: orgData.name,
              seats: purchase.seats || 5,
              purchase: {
                connect: {
                  id: purchase.id,
                },
              },
            },
          })

          // Update user's plan to TEAM
          await prisma.user.update({
            where: { id: creatorId },
            data: { plan: "TEAM" },
          })

          // Add creator as organization admin
          await prisma.organizationMember.create({
            data: {
              userId: creatorId,
              organizationId: organization.id,
              role: "ADMIN",
            },
          })

          // Update organization in Clerk with max allowed members
          // This ensures Clerk enforces the seat limit
          try {
            const clerkClient = await import('@clerk/nextjs/server').then(m => m.clerkClient)
            const client = await clerkClient()
            await client.organizations.updateOrganization(orgData.id, {
              maxAllowedMemberships: purchase.seats || 5,
            })
          } catch (error) {
            // console.error('Error updating Clerk organization limits:', error)
          }

        }
      }
    } catch (error) {
      // console.error('Error handling organization created:', error)
    }
  }

  // Handle organization member events
  if (eventType === 'organizationMembership.created') {
    const membershipData = evt.data as any
    const { organization, public_user_data } = membershipData
    
    try {
      // Check if this organization has a purchase in our system
      const org = await prisma.organization.findUnique({
        where: { clerkOrgId: organization.id },
      })

      if (org && public_user_data?.user_id) {
        // Ensure user exists in our database
        await UserService.upsertUser(
          public_user_data.user_id,
          public_user_data.identifier || `user-${public_user_data.user_id}@org.com`
        )

        // Grant user TEAM plan access
        await prisma.user.update({
          where: { id: public_user_data.user_id },
          data: { plan: "TEAM" },
        });
        
        // Add user to organization members table
        // Map Clerk roles to our database roles
        const dbRole = membershipData.role === 'org:admin' ? 'ADMIN' : 'MEMBER';
        
        await prisma.organizationMember.upsert({
          where: {
            organizationId_userId: {
              userId: public_user_data.user_id,
              organizationId: org.id,
            },
          },
          update: {
            role: dbRole,
          },
          create: {
            userId: public_user_data.user_id,
            organizationId: org.id,
            role: dbRole,
          },
        })

      }
    } catch (error) {
      // console.error('Error handling organization membership created:', error)
    }
  }

  if (eventType === 'organizationMembership.deleted') {
    const membershipData = evt.data as any
    const { public_user_data } = membershipData
    
    try {
      if (public_user_data?.user_id) {
        // Remove user from organization members table
        const org = await prisma.organization.findFirst({
          where: { clerkOrgId: membershipData.organization.id },
        })
        
        if (org) {
          await prisma.organizationMember.delete({
            where: {
              organizationId_userId: {
                userId: public_user_data.user_id,
                organizationId: org.id,
              },
            },
          }).catch(() => {
            // Member might already be deleted, ignore error
          })
          
          // Check if user is still a member of any other organizations
          const remainingMemberships = await prisma.organizationMember.count({
            where: { userId: public_user_data.user_id },
          })
          
          // If user is not in any other teams, revoke their TEAM plan
          if (remainingMemberships === 0) {
            await prisma.user.update({
              where: { id: public_user_data.user_id },
              data: { plan: null },
            })
          }
        }
      }
    } catch (error) {
      // console.error('Error handling organization membership deleted:', error)
    }
  }

  return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}