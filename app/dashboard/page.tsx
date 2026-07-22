"use client"
import { useSession } from "next-auth/react"
import Link from "next/link"

export default function Dashboard() {
    const { data: session, status } = useSession()
    const router = useRouter()

    // If not logged in, send to login
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login")
        }
    })

    // show loading while checking
    if (status === "loading") {
        return <p className="text_center py-20">Loading...</p>
    }

    // Don't render if no session
    if (!session) return null

    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold mb-2">Welcome bacck, {session?.user?.name}! </h1>
            <p className="text-gray-600 mb-8">Ready for your next adventure?</p>

            {/* stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-green-50 norder-green-200 p-6 rounded-xl">
                    <p className="text-sm text-gray-600">Your Bookings</p>
                    <p className="text-3xl font-bold text-green-700">0</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
                    <p className="text-sm text-gray-600">Upcoming Trips</p>
                    <p className="text-3xl font-bold text-blue-700">0</p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 p-6 rounds-xl">
                    <p className="text-sm text-gray-600">Wishlist</p>
                    <p className="text-3xl font-bold text-yellow-700">3</p>
                </div>
            </div>

            {/* CTA */}
            <div className="text-center">
                <Link
                    href="/safaris"
                    className="bg-green-700 text-white px-8 py-3 rounded-lg hover:bg-green-800 font-semibold"
                >
                    Browse Safaris
                </Link>
            </div>
        </div>
    )
}
