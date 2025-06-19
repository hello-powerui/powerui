#!/usr/bin/env tsx

import { prisma } from "../lib/db/prisma";

async function testOrganizationFlow() {
  console.log("🧪 Testing Organization Setup Flow\n");

  try {
    // 1. Check for team purchases without organizations
    console.log("1️⃣ Checking for team purchases without organizations...");
    const teamPurchasesWithoutOrg = await prisma.purchase.findMany({
      where: {
        plan: { in: ["TEAM_5", "TEAM_10"] },
        status: "COMPLETED",
        organizationId: null,
      },
      include: {
        user: true,
      },
    });

    console.log(`   Found ${teamPurchasesWithoutOrg.length} team purchases without organizations`);
    teamPurchasesWithoutOrg.forEach((purchase) => {
      console.log(`   - User ${purchase.user?.email} (${purchase.plan})`);
    });

    // 2. Check existing organizations
    console.log("\n2️⃣ Checking existing organizations...");
    const organizations = await prisma.organization.findMany({
      include: {
        _count: {
          select: {
            members: true,
            themes: true,
          },
        },
        purchase: true,
      },
    });

    console.log(`   Found ${organizations.length} organizations`);
    organizations.forEach((org) => {
      console.log(`   - ${org.name}: ${org._count.members} members, ${org._count.themes} themes, ${org.seats} seats`);
    });

    // 3. Check organization themes
    console.log("\n3️⃣ Checking organization themes...");
    const orgThemes = await prisma.theme.findMany({
      where: {
        visibility: "ORGANIZATION",
        organizationId: { not: null },
      },
      include: {
        organization: true,
        user: true,
      },
    });

    console.log(`   Found ${orgThemes.length} organization themes`);
    orgThemes.forEach((theme) => {
      console.log(`   - "${theme.name}" by ${theme.user?.email} in ${theme.organization?.name}`);
    });

    // 4. Database integrity checks
    console.log("\n4️⃣ Running integrity checks...");
    
    // Check for organization members with no valid organization
    const allMembers = await prisma.organizationMember.findMany({
      include: { organization: true }
    });
    const orphanedMembers = allMembers.filter(m => !m.organization);
    console.log(`   Orphaned organization members: ${orphanedMembers.length}`);

    // Check for purchases with multiple organizations (should be 0)
    const purchasesWithMultipleOrgs = await prisma.purchase.groupBy({
      by: ["id"],
      having: {
        organizationId: {
          _count: {
            gt: 1,
          },
        },
      },
    });
    console.log(`   Purchases with multiple organizations: ${purchasesWithMultipleOrgs.length}`);

    console.log("\n✅ Organization flow test complete!");

  } catch (error) {
    console.error("\n❌ Error testing organization flow:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testOrganizationFlow();