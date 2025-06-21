import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { hasActiveSubscription } from '@/lib/user-permissions';

export default async function DashboardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }
  
  const hasSubscription = await hasActiveSubscription(userId);
  
  if (!hasSubscription) {
    // Note: For local development, make sure Clerk webhooks are configured
    // to sync organization memberships to the database
    redirect('/upgrade?returnUrl=/dashboard');
  }
  
  return <>{children}</>;
}