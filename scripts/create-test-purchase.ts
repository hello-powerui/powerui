import { prisma } from "../lib/db/prisma";
import { PurchasePlan, UserPlan } from "@prisma/client";

async function createTestPurchase(userId: string, plan: "pro" | "team-5" | "team-10") {
  try {
    console.log(`Creating test purchase for user ${userId} with plan ${plan}...`);

    const purchasePlan: PurchasePlan = 
      plan === "pro" ? "PRO" : 
      plan === "team-5" ? "TEAM_5" : 
      "TEAM_10";

    const userPlan: UserPlan = plan === "pro" ? "PRO" : "TEAM";

    const amount = 
      plan === "pro" ? 11900 : 
      plan === "team-5" ? 39900 : 
      69900;

    const seats = 
      plan === "pro" ? 1 : 
      plan === "team-5" ? 5 : 
      10;

    // Create or update user
    const user = await prisma.user.upsert({
      where: { id: userId },
      update: {
        plan: userPlan,
        stripeCustomerId: `cus_test_${Date.now()}`,
      },
      create: {
        id: userId,
        email: `test-${userId}@example.com`,
        plan: userPlan,
        stripeCustomerId: `cus_test_${Date.now()}`,
      },
    });

    // Create purchase record
    const purchase = await prisma.purchase.create({
      data: {
        userId,
        stripeCustomerId: user.stripeCustomerId!,
        stripePaymentId: `pi_test_${Date.now()}`,
        stripePriceId: `price_test_${plan}_${Date.now()}`,
        amount,
        currency: "usd",
        plan: purchasePlan,
        seats,
        status: "COMPLETED",
      },
    });

    console.log("✅ Test purchase created successfully!");
    console.log("Purchase ID:", purchase.id);
    console.log("Plan:", purchase.plan);
    console.log("Amount:", `$${(purchase.amount / 100).toFixed(2)}`);
    console.log("Seats:", purchase.seats);

    return purchase;
  } catch (error) {
    console.error("Error creating test purchase:", error);
    throw error;
  }
}

// Usage from command line
if (require.main === module) {
  const userId = process.argv[2];
  const plan = process.argv[3] as "pro" | "team-5" | "team-10";

  if (!userId || !plan || !["pro", "team-5", "team-10"].includes(plan)) {
    console.error("Usage: tsx scripts/create-test-purchase.ts <userId> <pro|team-5|team-10>");
    console.error("Example: tsx scripts/create-test-purchase.ts user_123 pro");
    process.exit(1);
  }

  createTestPurchase(userId, plan)
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

export { createTestPurchase };