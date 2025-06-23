'use client';

import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    async function checkSubscription() {
      if (!isLoaded) return;
      
      if (!userId) {
        router.push('/sign-in');
        return;
      }

      try {
        const response = await fetch('/api/check-subscription');
        const { hasSubscription } = await response.json();
        
        if (!hasSubscription) {
          router.push('/upgrade?returnUrl=/dashboard');
        } else {
          setIsChecking(false);
        }
      } catch (error) {
        console.error('Error checking subscription:', error);
        setIsChecking(false);
      }
    }

    checkSubscription();
  }, [userId, isLoaded, router]);

  if (!isLoaded || isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return <>{children}</>;
}