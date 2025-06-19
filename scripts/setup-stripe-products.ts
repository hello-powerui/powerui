import * as dotenv from "dotenv";
import path from "path";
import Stripe from "stripe";

// Load environment variables from .env.local FIRST
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

// Now check if the environment variable exists
if (!process.env.STRIPE_SECRET_KEY) {
  console.error("❌ Error: STRIPE_SECRET_KEY not found in .env.local");
  console.error("Make sure you have added your Stripe secret key to .env.local:");
  console.error("STRIPE_SECRET_KEY=sk_test_...");
  process.exit(1);
}

// Create Stripe instance directly here instead of importing from lib/stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-05-28.basil",
  typescript: true,
});

async function setupStripeProducts() {
  try {
    console.log("Setting up Stripe products...");

    // Create PowerUI Pro product
    const proProduct = await stripe.products.create({
      name: "PowerUI Pro",
      description: "One-time purchase for individual professionals",
      metadata: {
        plan: "pro",
      },
    });

    const proPrice = await stripe.prices.create({
      product: proProduct.id,
      unit_amount: 11900, // $119.00
      currency: "usd",
      metadata: {
        plan: "pro",
      },
    });

    console.log(`Pro Price ID: ${proPrice.id}`);

    // Create PowerUI Team 5 product
    const team5Product = await stripe.products.create({
      name: "PowerUI Team (5 seats)",
      description: "Perfect for small teams",
      metadata: {
        plan: "team-5",
      },
    });

    const team5Price = await stripe.prices.create({
      product: team5Product.id,
      unit_amount: 39900, // $399.00
      currency: "usd",
      metadata: {
        plan: "team-5",
        seats: "5",
      },
    });

    console.log(`Team 5 Price ID: ${team5Price.id}`);

    // Create PowerUI Team 10 product
    const team10Product = await stripe.products.create({
      name: "PowerUI Team (10 seats)",
      description: "For larger teams and organizations",
      metadata: {
        plan: "team-10",
      },
    });

    const team10Price = await stripe.prices.create({
      product: team10Product.id,
      unit_amount: 69900, // $699.00
      currency: "usd",
      metadata: {
        plan: "team-10",
        seats: "10",
      },
    });

    console.log(`Team 10 Price ID: ${team10Price.id}`);

    console.log("\n✅ Stripe products created successfully!");
    console.log("\nAdd these to your .env.local file:");
    console.log(`STRIPE_PRO_PRICE_ID=${proPrice.id}`);
    console.log(`STRIPE_TEAM_5_PRICE_ID=${team5Price.id}`);
    console.log(`STRIPE_TEAM_10_PRICE_ID=${team10Price.id}`);

  } catch (error) {
    console.error("Error setting up Stripe products:", error);
    process.exit(1);
  }
}

// Run the setup
setupStripeProducts();