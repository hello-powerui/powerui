import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe, planToPurchasePlan, planToUserPlan, planToSeats, PlanType } from "@/lib/stripe";
import { prisma } from "@/lib/db/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature") as string;

  if (!signature) {
    // console.error("❌ Webhook Error: No signature header");
    return new NextResponse("No signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    // console.error("❌ Webhook signature verification failed:", err);
    if (process.env.NODE_ENV === "development") {
      // console.error("💡 Dev tip: Make sure you're using the webhook secret from 'npm run dev:stripe'");
    }
    return new NextResponse(`Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`, { status: 400 });
  }

  // Development logging
  if (process.env.NODE_ENV === "development") {

  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Get the metadata from the session
        const { userId, plan } = session.metadata as { userId: string; plan: PlanType };
        
        if (!userId || !plan) {
          // console.error("Missing metadata in checkout session:", session.id);
          return new NextResponse("Invalid metadata", { status: 400 });
        }

        // Get the payment intent to retrieve the payment ID
        const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent as string);
        
        // Start a transaction to handle the purchase
        await prisma.$transaction(async (tx) => {
          // Create or update the user
          const user = await tx.user.upsert({
            where: { id: userId },
            update: {
              plan: planToUserPlan[plan] as "PRO" | "TEAM",
              stripeCustomerId: session.customer as string,
            },
            create: {
              id: userId,
              email: session.customer_details?.email || "",
              plan: planToUserPlan[plan] as "PRO" | "TEAM",
              stripeCustomerId: session.customer as string,
            },
          });

          // Create the purchase record
          const purchase = await tx.purchase.create({
            data: {
              userId,
              stripeCustomerId: session.customer as string,
              stripePaymentId: paymentIntent.id,
              stripePriceId: session.line_items?.data[0]?.price?.id || "",
              amount: session.amount_total || 0,
              currency: session.currency || "usd",
              plan: planToPurchasePlan[plan] as "PRO" | "TEAM_5" | "TEAM_10",
              seats: planToSeats[plan],
              status: "COMPLETED",
            },
          });

          // If this is a team plan, enable organization creation for the user
          if (plan === "team-5" || plan === "team-10") {
            try {
              const client = await clerkClient();
              await client.users.updateUser(userId, {
                createOrganizationEnabled: true,
                createOrganizationsLimit: 1
              });
            } catch (error) {
              console.error("Failed to enable organization creation for user:", error);
              // Don't fail the webhook if this fails - user can contact support
            }
          }
        });

        if (process.env.NODE_ENV === "development") {
          console.log(`Payment successful: ${paymentIntent.id} - Amount: $${(session.amount_total! / 100).toFixed(2)}`);
        }
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        // Update the purchase record if it exists
        if (paymentIntent.metadata.userId) {
          await prisma.purchase.updateMany({
            where: {
              stripePaymentId: paymentIntent.id,
            },
            data: {
              status: "FAILED",
            },
          });
        }
        
        // console.error("Payment failed:", paymentIntent.id);
        break;
      }

      default:
        
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    // console.error("Webhook handler error:", error);
    return new NextResponse("Webhook handler error", { status: 500 });
  }
}