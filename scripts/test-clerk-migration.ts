import { clerkClient } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db/prisma';
import { UserService } from '@/lib/db/services/user-service';

const TEST_USER = {
  email: 'testclerk@powerui.com',
  firstName: 'Test',
  lastName: 'Clerk',
};

async function testClerkUserCreation() {
  console.log('🚀 Starting test user migration to Clerk...\n');

  try {
    // Step 1: Create user in Clerk
    console.log('1. Creating user in Clerk...');
    
    const clerk = await clerkClient();
    
    // Check if user already exists
    const existingUsers = await clerk.users.getUserList({
      emailAddress: [TEST_USER.email]
    });
    
    let clerkUser;
    if (existingUsers.data.length > 0) {
      console.log('   ⚠️  User already exists in Clerk');
      clerkUser = existingUsers.data[0];
    } else {
      // Create user with skipPasswordRequirement to avoid sending email
      const userData: any = {
        emailAddress: [TEST_USER.email],
        firstName: TEST_USER.firstName,
        lastName: TEST_USER.lastName,
        username: 'testclerk',
        skipPasswordRequirement: true,
        // Don't send any emails
        skipPasswordChecks: true,
        // Add legal_accepted_at as a custom field
        legal_accepted_at: new Date().toISOString(),
      };
      
      clerkUser = await clerk.users.createUser(userData);
      console.log(`   ✅ User created in Clerk with ID: ${clerkUser.id}`);
    }

    // Step 2: Create/Update user in database
    console.log('\n2. Creating/Updating user in database...');
    
    const dbUser = await UserService.upsertUser(
      clerkUser.id,
      TEST_USER.email,
      'testclerk' // username
    );
    console.log(`   ✅ User created in database with ID: ${dbUser.id}`);

    // Step 3: Assign PRO plan to user
    console.log('\n3. Assigning PRO plan to user...');
    
    const updatedUser = await prisma.user.update({
      where: { id: clerkUser.id },
      data: { plan: 'PRO' }
    });
    console.log(`   ✅ PRO plan assigned to user`);

    // Step 4: Create a purchase record (optional - for tracking)
    console.log('\n4. Creating purchase record...');
    
    const purchase = await prisma.purchase.create({
      data: {
        userId: clerkUser.id,
        stripeCustomerId: 'cus_test_migration',
        stripePaymentId: 'pi_test_migration_' + Date.now(),
        stripePriceId: process.env.STRIPE_PRO_PRICE_ID || 'price_test',
        amount: 3900, // $39.00
        currency: 'usd',
        plan: 'PRO',
        status: 'COMPLETED',
      }
    });
    console.log(`   ✅ Purchase record created with ID: ${purchase.id}`);

    // Step 5: Verify the migration
    console.log('\n5. Verifying migration...');
    
    const verifyUser = await prisma.user.findUnique({
      where: { id: clerkUser.id },
      include: { purchase: true }
    });
    
    console.log('\n✅ Migration completed successfully!');
    console.log('\nUser details:');
    console.log(`- Clerk ID: ${verifyUser?.id}`);
    console.log(`- Email: ${verifyUser?.email}`);
    console.log(`- Plan: ${verifyUser?.plan}`);
    console.log(`- Has Purchase: ${verifyUser?.purchase ? 'Yes' : 'No'}`);

  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test migration
testClerkUserCreation()
  .then(() => {
    console.log('\n🎉 Test migration completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Test migration failed:', error);
    process.exit(1);
  });