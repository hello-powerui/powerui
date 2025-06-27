import { headers } from 'next/headers';
import ComingSoonPage from '@/components/coming-soon';
import dynamic from 'next/dynamic';

// Dynamically import the landing page to avoid build issues
const LandingPage = dynamic(() => import('./(public)/page'), {
  ssr: true
});

export default async function Page() {
  // Check if we're in coming soon mode
  const isComingSoonMode = process.env.COMING_SOON_MODE === 'true';
  
  if (isComingSoonMode) {
    // Check for admin access
    const headersList = await headers();
    const cookie = headersList.get('cookie');
    const hasAdminAccess = cookie?.includes('admin-access=true');
    
    if (!hasAdminAccess) {
      return <ComingSoonPage />;
    }
  }
  
  // Show the regular landing page
  return <LandingPage />;
}