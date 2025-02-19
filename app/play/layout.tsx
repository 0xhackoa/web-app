import Navbar from '@/components/NavBar';

export default function PlayLayout({
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