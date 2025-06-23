import { prisma } from "@/lib/db/prisma";
import { createOrUpdateContact } from "@/lib/loops";
import { clerkClient } from "@clerk/nextjs/server";

async function syncExistingUsers() {
  console.log("Starting Loops.so contact sync...");
  
  try {
    // Get all users from database
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        plan: true,
      },
    });
    
    console.log(`Found ${users.length} users to sync`);
    
    const client = await clerkClient();
    let successCount = 0;
    let errorCount = 0;
    
    for (const user of users) {
      try {
        // Get additional user info from Clerk
        const clerkUser = await client.users.getUser(user.id);
        
        await createOrUpdateContact({
          email: user.email,
          firstName: clerkUser.firstName || undefined,
          lastName: clerkUser.lastName || undefined,
          userId: user.id,
          plan: user.plan || undefined,
          userGroup: user.plan === 'TEAM' ? 'team' : user.plan === 'PRO' ? 'pro' : undefined,
          source: 'sync',
        });
        
        successCount++;
        console.log(`✓ Synced ${user.email}`);
      } catch (error) {
        errorCount++;
        console.error(`✗ Failed to sync ${user.email}:`, error);
      }
    }
    
    console.log(`\nSync complete!`);
    console.log(`✓ Successfully synced: ${successCount}`);
    console.log(`✗ Failed: ${errorCount}`);
    
  } catch (error) {
    console.error("Fatal error during sync:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the sync
syncExistingUsers();