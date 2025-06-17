import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

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

    if (!purchase) {
      return NextResponse.json({ hasActivePurchase: false });
    }

    return NextResponse.json({
      hasActivePurchase: true,
      plan: purchase.plan,
      seats: purchase.seats,
      amount: purchase.amount,
      currency: purchase.currency,
      createdAt: purchase.createdAt,
      organization: purchase.organization,
    });
  } catch (error) {
    // console.error("Error fetching purchase:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}