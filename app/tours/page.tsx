import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function ToursPage() {
    const trips = await prisma.trip.findMany()

    return (
        <main className="max-w-6xl mx-auto px-6 py-20">
            <h1 className="text-4xl font-bold text-center mb-12">Uganda Safari Packages</h1>

            <div className="grid md:grid-cols-3 gap-8">
                {trips.map((trip) => (
                    <div key={trip.id} className="border rounded-xl p-6 shadow-lg">
                        <img src={trip.imageUrl || ''} alt={trip.title} className="rounded-lg mb-4 h-48 w-full object-cover" />
                        <h2 className="text-2xl font-bold mb-2">{trip.title}</h2>
                        <p className="text-gray-600 mb-2">{trip.location}</p>
                        <p className="text-gray-700 mb-4">{trip.description}</p>
                        <p className="text-green-700 text-2xl font-bold mb-4">${trip.price}</p>
                        <a href={`https://wa.me/2567XXXXXXXX?text=I%20want%20to%20book%20${trip.title}`}
                            target="_blank"
                            className="bg-green-700 text-white w-full py-3 rounded-lg block text-center font-semibold">
                            Book Now
                        </a>
                    </div>
                ))}
            </div>
        </main>
    )
}