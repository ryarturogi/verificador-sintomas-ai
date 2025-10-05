import { PageLayout } from '@/components/layout/global-layout'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <PageLayout>{children}</PageLayout>
}
