import { PublicHeader } from '@/components/ui/public-header'
import { headers } from 'next/headers'

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if we're in coming soon mode
  const isComingSoonMode = process.env.COMING_SOON_MODE === 'true'
  
  // Check for admin access
  const headersList = await headers()
  const cookie = headersList.get('cookie')
  const hasAdminAccess = cookie?.includes('admin-access=true')
  
  // Only show header if not in coming soon mode OR if user has admin access
  const shouldShowHeader = !isComingSoonMode || hasAdminAccess
  
  return (
    <>
      {shouldShowHeader && <PublicHeader />}
      <div className={shouldShowHeader ? "pt-16" : ""}>
        {children}
      </div>
    </>
  )
}