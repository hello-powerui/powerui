import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { clerkOrgId, name } = body;

    if (!clerkOrgId || !name) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Get the user's purchase to determine seats
    const purchase = await prisma.purchase.findFirst({
      where: {
        userId,
        status: "COMPLETED",
        plan: {
          in: ["TEAM_5", "TEAM_10"],
        },
      },
      include: {
        organization: true,
      },
    });

    if (!purchase) {
      return new NextResponse("No valid team purchase found", { status: 400 });
    }

    // Check if organization already exists for this purchase
    if (purchase.organization) {
      return new NextResponse("Organization already created for this purchase", { status: 400 });
    }

    // Check if organization with this Clerk ID already exists
    const existingOrg = await prisma.organization.findUnique({
      where: { clerkOrgId },
      include: {
        members: true,
        purchase: true,
      },
    });

    if (existingOrg) {
      // If it exists, just return it (idempotent operation)
      return NextResponse.json(existingOrg);
    }

    // Create the organization
    const organization = await prisma.organization.create({
      data: {
        clerkOrgId,
        name,
        seats: purchase.seats || 5,
        purchase: {
          connect: {
            id: purchase.id,
          },
        },
      },
      include: {
        members: true,
        purchase: true,
      },
    });

    // Update user's plan to TEAM if not already
    await prisma.user.update({
      where: { id: userId },
      data: { plan: "TEAM" },
    });

    // Update Clerk organization with seat limit
    try {
      const client = await clerkClient();
      await client.organizations.updateOrganization(clerkOrgId, {
        maxAllowedMemberships: purchase.seats || 5,
      });
    } catch (error) {
      // console.error("Error setting Clerk organization limit:", error);
    }

    return NextResponse.json(organization);
  } catch (error) {
    // console.error("Organization creation error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const checkPending = searchParams.get("checkPending") === "true";

    if (checkPending) {
      // Check if user has a team purchase without an organization
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

      return NextResponse.json({
        hasPendingTeamSetup: !!pendingPurchase,
        purchase: pendingPurchase ? {
          plan: pendingPurchase.plan,
          seats: pendingPurchase.seats,
          createdAt: pendingPurchase.createdAt,
        } : null,
      });
    }

    // Get user's organizations
    const memberships = await prisma.organizationMember.findMany({
      where: { userId },
      include: {
        organization: {
          include: {
            members: true,
            _count: {
              select: { themes: true },
            },
          },
        },
      },
    });

    const organizations = memberships.map((membership) => ({
      ...membership.organization,
      role: membership.role,
      memberCount: membership.organization.members.length,
      themeCount: membership.organization._count.themes,
    }));

    return NextResponse.json(organizations);
  } catch (error) {
    // console.error("Error fetching organizations:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}