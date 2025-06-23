import { prisma } from "./db/prisma";

export async function getUserPurchase(userId: string) {
  const purchase = await prisma.purchase.findFirst({
    where: {
      userId,
      status: "COMPLETED",
    },
    include: {
      user: true,
      organization: true,
    },
  });

  return purchase;
}

export async function hasActiveSubscription(userId: string): Promise<boolean> {
  // Check if user has a plan (indicating they've purchased)
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { plan: true },
  });
  
  if (user?.plan) return true;

  // Check if user is part of an organization with active subscription
  const organizationMembership = await prisma.organizationMember.findFirst({
    where: { userId },
    include: {
      organization: {
        include: {
          purchase: true,
        },
      },
    },
  });

  return organizationMembership?.organization.purchase?.status === "COMPLETED";
}

export async function getUserPlan(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { plan: true },
  });

  return user?.plan || null;
}

export async function isTeamAdmin(userId: string, organizationId: string): Promise<boolean> {
  const member = await prisma.organizationMember.findUnique({
    where: {
      organizationId_userId: {
        organizationId,
        userId,
      },
    },
  });

  return member?.role === "ADMIN";
}

export async function getUserOrganizations(userId: string) {
  const memberships = await prisma.organizationMember.findMany({
    where: { userId },
    include: {
      organization: {
        include: {
          purchase: true,
          _count: {
            select: {
              members: true,
              themes: true,
            },
          },
        },
      },
    },
  });

  return memberships.map((membership) => ({
    ...membership.organization,
    role: membership.role,
    memberCount: membership.organization._count.members,
    themeCount: membership.organization._count.themes,
  }));
}

export async function hasTeamAccess(userId: string): Promise<boolean> {
  // Check if user has a direct team purchase
  const teamPurchase = await prisma.purchase.findFirst({
    where: {
      userId,
      status: "COMPLETED",
      plan: {
        in: ["TEAM_5", "TEAM_10"],
      },
    },
  });

  if (teamPurchase) return true;

  // Check if user is part of a team organization
  const teamMembership = await prisma.organizationMember.findFirst({
    where: { userId },
    include: {
      organization: {
        include: {
          purchase: true,
        },
      },
    },
  });

  return teamMembership?.organization.purchase?.status === "COMPLETED";
}

export async function hasPendingTeamSetup(userId: string): Promise<boolean> {
  const pendingPurchase = await prisma.purchase.findFirst({
    where: {
      userId,
      status: "COMPLETED",
      plan: {
        in: ["TEAM_5", "TEAM_10"],
      },
      organizationId: null,
    },
  });

  return !!pendingPurchase;
}