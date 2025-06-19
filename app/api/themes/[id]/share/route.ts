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

    // Verify user owns the theme
    const theme = await prisma.theme.findUnique({
      where: { id: themeId },
    });

    if (!theme || theme.userId !== userId) {
      return new NextResponse("Theme not found or unauthorized", { status: 404 });
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