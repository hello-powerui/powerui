import { headers } from "next/headers";
import Stripe from "stripe";

export async function verifyStripeWebhook(
  body: string,
  signature: string,
  webhookSecret: string,
  stripe: Stripe
): Promise<Stripe.Event | null> {
  try {
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    return event;
  } catch (err) {
    // console.error("Webhook signature verification failed:", err);
    return null;
  }
}