import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id: themeId } = await params;
    const body = await req.json();
    const { visibility, organizationId } = body;

    // Get theme and check access
    const theme = await prisma.theme.findUnique({
      where: { id: themeId },
      include: {
        user: true,
        organization: true,
      },
    });

    if (!theme) {
      return new NextResponse("Theme not found", { status: 404 });
    }

    // Check if user has permission to share
    let canShare = false;
    
    // Owner can always share
    if (theme.userId === userId) {
      canShare = true;
    }
    
    // Organization members can share organization themes
    if (theme.visibility === "ORGANIZATION" && theme.organizationId) {
      const membership = await prisma.organizationMember.findFirst({
        where: {
          userId,
          organizationId: theme.organizationId,
        },
      });
      if (membership) {
        canShare = true;
      }
    }

    if (!canShare) {
      return new NextResponse("Unauthorized to share this theme", { status: 403 });
    }

    // Check if user is trying to set organization visibility
    if (visibility === "ORGANIZATION") {
      // Get the current user's plan
      const currentUser = await prisma.user.findUnique({
        where: { id: userId },
        select: { plan: true },
      });
      
      if (currentUser?.plan !== "TEAM") {
        return new NextResponse(
          "Organization sharing is only available for Team plan users",
          { status: 403 }
        );
      }

      // Verify user is part of the organization
      if (organizationId) {
        const membership = await prisma.organizationMember.findFirst({
          where: {
            userId,
            organizationId,
          },
        });

        if (!membership) {
          return new NextResponse(
            "You are not a member of this organization",
            { status: 403 }
          );
        }
      }
    }

    // Update theme visibility
    const updatedTheme = await prisma.theme.update({
      where: { id: themeId },
      data: {
        visibility: visibility as "PRIVATE" | "ORGANIZATION" | "PUBLIC",
        organizationId: visibility === "ORGANIZATION" ? organizationId : null,
      },
    });

    return NextResponse.json(updatedTheme);
  } catch (error) {
    // console.error("Error updating theme sharing:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id: themeId } = await params;

    // Get theme with sharing info
    const theme = await prisma.theme.findUnique({
      where: { id: themeId },
      include: {
        sharedWith: true,
        organization: true,
      },
    });

    if (!theme) {
      return new NextResponse("Theme not found", { status: 404 });
    }

    // Check access permissions
    const hasAccess = 
      theme.userId === userId || // Owner
      theme.visibility === "PUBLIC" || // Public theme
      (theme.visibility === "ORGANIZATION" && theme.organizationId && 
        await prisma.organizationMember.findFirst({
          where: {
            organizationId: theme.organizationId,
            userId,
          },
        }));

    if (!hasAccess) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    return NextResponse.json({
      visibility: theme.visibility,
      organizationId: theme.organizationId,
      organization: theme.organization,
      sharedCount: theme.sharedWith.length,
    });
  } catch (error) {
    // console.error("Error fetching theme sharing:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}