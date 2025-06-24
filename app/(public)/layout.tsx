import { PublicHeader } from '@/components/ui/public-header'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <PublicHeader />
      <div className="pt-16">
        {children}
      </div>
    </>
  )
}