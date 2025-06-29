import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { hasActiveSubscription } from '@/lib/user-permissions';

export default async function ThemeStudioLayout({
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
    redirect('/upgrade?returnUrl=/themes/studio');
  }
  
  return <>{children}</>;
}