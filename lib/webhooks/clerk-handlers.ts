import { WebhookEvent } from '@clerk/nextjs/server';
import { services } from '@/lib/services';
import { prisma } from '@/lib/db/prisma';
import { clerkClient } from '@clerk/nextjs/server';

export interface WebhookHandler {
  eventType: string;
  handle: (event: WebhookEvent) => Promise<void>;
}

// User event handlers
export const userCreatedHandler: WebhookHandler = {
  eventType: 'user.created',
  handle: async (evt: WebhookEvent) => {
    if (evt.type !== 'user.created') return;
    
    const { id, email_addresses } = evt.data;
    const primaryEmail = email_addresses.find(
      email => email.id === evt.data.primary_email_address_id
    );
    
    if (primaryEmail) {
      await services.user.ensureUserExists(id, primaryEmail.email_address);
    }
  },
};

export const userUpdatedHandler: WebhookHandler = {
  eventType: 'user.updated',
  handle: async (evt: WebhookEvent) => {
    if (evt.type !== 'user.updated') return;
    
    const { id, email_addresses } = evt.data;
    const primaryEmail = email_addresses.find(
      email => email.id === evt.data.primary_email_address_id
    );
    
    if (primaryEmail) {
      await services.user.ensureUserExists(id, primaryEmail.email_address);
    }
  },
};

export const userDeletedHandler: WebhookHandler = {
  eventType: 'user.deleted',
  handle: async (evt: WebhookEvent) => {
    if (evt.type !== 'user.deleted' || !evt.data.id) return;
    
    await services.user.deleteUser(evt.data.id);
  },
};

// Organization event handlers
export const organizationCreatedHandler: WebhookHandler = {
  eventType: 'organization.created',
  handle: async (evt: WebhookEvent) => {
    if (evt.type !== 'organization.created') return;
    
    const orgData = evt.data as any;
    const creatorId = orgData.created_by;
    
    if (!creatorId) return;

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
    });

    if (!purchase) return;

    // Create organization in our database
    const organization = await prisma.organization.create({
      data: {
        clerkOrgId: orgData.id,
        name: orgData.name,
        seats: purchase.seats || 5,
        purchase: {
          connect: { id: purchase.id },
        },
      },
    });

    // Update user's plan to TEAM
    await prisma.user.update({
      where: { id: creatorId },
      data: { plan: "TEAM" },
    });

    // Update organization in Clerk with max allowed members
    try {
      const client = await clerkClient();
      await client.organizations.updateOrganization(orgData.id, {
        maxAllowedMemberships: purchase.seats || 5,
      });
    } catch (error) {
      console.error('Error updating Clerk organization limits:', error);
    }
  },
};

// Organization membership event handlers
export const organizationMembershipCreatedHandler: WebhookHandler = {
  eventType: 'organizationMembership.created',
  handle: async (evt: WebhookEvent) => {
    if (evt.type !== 'organizationMembership.created') return;
    
    const membershipData = evt.data as any;
    const { organization, public_user_data } = membershipData;
    
    if (!public_user_data?.user_id) return;

    // Check if this organization has a purchase in our system
    const org = await prisma.organization.findUnique({
      where: { clerkOrgId: organization.id },
    });

    if (!org) return;

    // Ensure user exists in our database
    await services.user.ensureUserExists(
      public_user_data.user_id,
      public_user_data.identifier || `user-${public_user_data.user_id}@org.com`
    );

    // Grant user TEAM plan access
    await prisma.user.update({
      where: { id: public_user_data.user_id },
      data: { plan: "TEAM" },
    });
    
    // Add user to organization members table
    await prisma.organizationMember.upsert({
      where: {
        organizationId_userId: {
          userId: public_user_data.user_id,
          organizationId: org.id,
        },
      },
      update: {
        role: membershipData.role || "member",
      },
      create: {
        userId: public_user_data.user_id,
        organizationId: org.id,
        role: membershipData.role || "member",
      },
    });
  },
};

export const organizationMembershipDeletedHandler: WebhookHandler = {
  eventType: 'organizationMembership.deleted',
  handle: async (evt: WebhookEvent) => {
    if (evt.type !== 'organizationMembership.deleted') return;
    
    const membershipData = evt.data as any;
    const { public_user_data } = membershipData;
    
    if (!public_user_data?.user_id) return;

    // Check if user has their own purchase
    const personalPurchase = await prisma.purchase.findFirst({
      where: {
        userId: public_user_data.user_id,
        status: "COMPLETED",
      },
    });

    // If no personal purchase, revert to PRO plan
    if (!personalPurchase) {
      await prisma.user.update({
        where: { id: public_user_data.user_id },
        data: { plan: "PRO" },
      });
    }
  },
};

// Registry of all handlers
export const clerkWebhookHandlers: WebhookHandler[] = [
  userCreatedHandler,
  userUpdatedHandler,
  userDeletedHandler,
  organizationCreatedHandler,
  organizationMembershipCreatedHandler,
  organizationMembershipDeletedHandler,
];

// Handler function that routes to appropriate handler
export async function handleClerkWebhook(event: WebhookEvent): Promise<void> {
  const handler = clerkWebhookHandlers.find(h => h.eventType === event.type);
  
  if (handler) {
    await handler.handle(event);
  } else {
    console.log(`Unhandled webhook event type: ${event.type}`);
  }
}