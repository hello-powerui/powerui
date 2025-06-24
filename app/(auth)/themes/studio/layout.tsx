// This layout prevents the parent AppHeader from rendering
// The theme studio has its own integrated header

export default function ThemeStudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}