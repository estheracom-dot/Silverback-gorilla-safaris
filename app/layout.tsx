import Link from "next/link"
import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-white shadow-md sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-green-700">Silverback Gorilla Safaris Lincoln Ltd</Link>
            <div className="flex gap-6">
              <Link href="/" className="hover:text-green-700">Home</Link>
              <Link href="/about" className="hover:text-green-700">About</Link>
              <Link href="/contact" className="hover:text-green-700">Contact</Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}