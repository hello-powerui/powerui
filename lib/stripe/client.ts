import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-05-28.basil",
  typescript: true,
});

// Price mapping for our one-time purchase products
export const PRICE_IDS = {
  pro: process.env.STRIPE_PRO_PRICE_ID!,
  "team-5": process.env.STRIPE_TEAM_5_PRICE_ID!,
  "team-10": process.env.STRIPE_TEAM_10_PRICE_ID!,
} as const;

// Debug logging in development
if (process.env.NODE_ENV === "development") {
  
}

export type PlanType = keyof typeof PRICE_IDS;

// Map plan types to database enums
export const planToPurchasePlan = {
  pro: "PRO",
  "team-5": "TEAM_5",
  "team-10": "TEAM_10",
} as const;

export const planToUserPlan = {
  pro: "PRO",
  "team-5": "TEAM",
  "team-10": "TEAM",
} as const;

export const planToSeats = {
  pro: 1,
  "team-5": 5,
  "team-10": 10,
} as const;