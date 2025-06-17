import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { stripe, PRICE_IDS, PlanType } from "@/lib/stripe";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const user = await currentUser();
    
    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { plan, returnUrl } = body as { plan: PlanType; returnUrl?: string };

    // Validate plan
    if (!plan || !PRICE_IDS[plan]) {
      return new NextResponse("Invalid plan", { status: 400 });
    }

    // Check if user already has a purchase
    const existingPurchase = await prisma.purchase.findFirst({
      where: {
        userId,
        status: "COMPLETED",
      },
    });

    if (existingPurchase) {
      return new NextResponse("User already has an active purchase", { status: 400 });
    }

    // Get or create Stripe customer
    let stripeCustomerId: string;
    const dbUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (dbUser?.stripeCustomerId) {
      stripeCustomerId = dbUser.stripeCustomerId;
    } else {
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0].emailAddress,
        metadata: {
          clerkUserId: userId,
        },
      });
      stripeCustomerId = customer.id;

      // Create or update user with Stripe customer ID
      await prisma.user.upsert({
        where: { id: userId },
        update: { stripeCustomerId },
        create: {
          id: userId,
          email: user.emailAddresses[0].emailAddress,
          stripeCustomerId,
        },
      });
    }

    // Create Stripe checkout session for one-time payment
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      mode: "payment", // One-time payment mode
      payment_method_types: ["card"],
      line_items: [
        {
          price: PRICE_IDS[plan],
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?success=true&session_id={CHECKOUT_SESSION_ID}${returnUrl ? `&returnUrl=${encodeURIComponent(returnUrl)}` : ''}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true${returnUrl ? `&returnUrl=${encodeURIComponent(returnUrl)}` : ''}`,
      metadata: {
        userId,
        plan,
      },
    });

    return NextResponse.json({ url: session.url });

  } catch (error) {
    // console.error("Checkout error:", error);
    
    if (error instanceof Error) {
      // Check for specific Stripe errors
      if (error.message.includes("No such price")) {
        return new NextResponse("Invalid price ID. Please check your Stripe configuration.", { status: 400 });
      }
      if (error.message.includes("api_key")) {
        return new NextResponse("Stripe API key error. Please check your configuration.", { status: 500 });
      }
      return new NextResponse(error.message, { status: 500 });
    }
    
    return new NextResponse("Internal Error", { status: 500 });
  }
}