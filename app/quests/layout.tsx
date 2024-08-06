import type { Metadata } from 'next'
import Navbar from '@/components/NavBar';

// export const metadata: Metadata = {
//   title: 'Dashboard | QuestChain',
//   description: 'Manage your quests and rewards',
// }

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        {children}
      </div>
    </>
  )
}