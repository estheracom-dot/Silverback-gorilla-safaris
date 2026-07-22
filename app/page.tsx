import Link from "next/link"
import { trips } from "@/lib/data"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-green-900 text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">Discover Your Next Safari</h1>
        <p className="text-xl text-green-100">Wild adventures across Africa, curated for you</p>
      </section>

      {/* Safari Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center">Popular Safaris</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map((trip) => (
            <Link
              key={trip.id}
              href={`/safari/${trip.id}`}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
            >
              <img
                src={trip.image}
                alt={trip.title}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{trip.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{trip.duration}</p>
                <p className="text-gray-700 mb-4 line-clamp-2">{trip.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-700">${trip.price}</span>
                  <span className="text-green-700 font-semibold group-hover:underline">View Details →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}