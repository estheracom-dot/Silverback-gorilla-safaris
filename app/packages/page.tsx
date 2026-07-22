import { PrismaClient } from '@prisma/client'
import Link from 'next/link'

const prisma = new PrismaClient()

export default async function PackagesPage() {
    const trips = await prisma.trip.findMany()

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
            <h1 className="text-3xl sm:text-5xl font-bold text-center mb-4">Uganda Safari Packages</h1>
            <p className="text-center text-gray-600 mb-8 sm:mb-12 text-sm sm:text-base">Adventure, Gorillas & The Pearl of Africa</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {trips.map((trip) => (
                    <div key={trip.id} className="border rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition flex-col">
                        <img src={trip.imageUrl || ''} alt={trip.title} className="h-48 sm:h-56 w-full object-cover" />
                        <div className="p-4 sm:p-6 flex flex-col flex-1">
                            <p className="text-xs sm:text-sm text-green-700 font-semibold mb-2">{trip.location}</p>
                            <h2 className="text-xl sm:text-2xl font-bold mb-2">{trip.title}</h2>
                            <p className="text-gray-700 mb-4 text-sm sm:text-base flex-1">{trip.description}</p>
                            <p className="text-2xl sm:text-3xl font-bold text-green-800 mb-4">${trip.price}</p>
                            <Link
                                href="#"
                                className="bg-green-700 text-white w-full py-3 rounded-lg block text-center font-semibold hover:bg-green-800 text-sm sm:text-base">
                                Book on WhatsApp
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}