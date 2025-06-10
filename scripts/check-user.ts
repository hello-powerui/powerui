import { prisma } from '../lib/db/prisma';

async function checkUsers() {
  try {
    console.log('Checking users in database...\n');
    
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        createdAt: true,
        _count: {
          select: {
            themes: true,
          }
        }
      }
    });
    
    if (users.length === 0) {
      console.log('❌ No users found in database');
      console.log('\nTo sync your Clerk user:');
      console.log('1. Make sure you\'re signed in to the app');
      console.log('2. Sign out and sign back in (this should trigger the webhook)');
      console.log('3. Or manually trigger a webhook test from Clerk dashboard');
    } else {
      console.log(`✅ Found ${users.length} user(s):\n`);
      users.forEach((user, index) => {
        console.log(`User ${index + 1}:`);
        console.log(`  ID: ${user.id}`);
        console.log(`  Email: ${user.email}`);
        console.log(`  Created: ${user.createdAt.toLocaleString()}`);
        console.log(`  Themes: ${user._count.themes}`);
        console.log('');
      });
    }
  } catch (error) {
    console.error('Error checking users:', error);
    console.log('\nMake sure:');
    console.log('1. Database is running');
    console.log('2. DATABASE_URL is set in .env.local');
    console.log('3. Prisma client is generated (npm run db:generate)');
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();