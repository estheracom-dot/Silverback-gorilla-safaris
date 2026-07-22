"use client"
import { trips } from "@/lib/data"
import { useState, use } from "react"
import Link from "next/link"

export default function SafariDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const [showModal, setShowModal] = useState(false) // <-- this line is key
    const trip = trips.find((t) => String(t.id) === String(id))

    if (!trip) return <div>Not Found</div>

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <Link href="/" className="text-green-700 hover:underline mb-6 block">← Back</Link>
            <img src={trip.image} alt={trip.title} className="w-full h-96 object-cover rounded-2xl mb-6" />
            <h1 className="text-4xl font-bold mb-2">{trip.title}</h1>
            <p className="text-gray-600 mb-4">{trip.duration} • From ${trip.price}</p>
            <p className="mb-8">{trip.description}</p>

            <button
                onClick={() => setShowModal(true)} // <-- this must be here
                className="bg-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-800"
            >
                Book This Safari
            </button>

            {showModal && ( // <-- and this part
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4">Book {trip.title}</h2>
                        <p>
                            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Booking submitted! We'll contact you soon 💚"); setShowModal(false) }}>
                                <input type="text" placeholder="Full Name" className="w-full border p-3 rounded-lg" required />
                                <input type="email" placeholder="Email" className="w-full border p-3 rounded-lg" required />
                                <input type="date" className="w-full border p-3 rounded-lg" required />
                                <select className="w-full border p-3 rounded-lg" required>
                                    <option value="">Number of People</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3-4</option>
                                    <option>5+</option>
                                </select>
                                <button type="submit" className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800">
                                    Confirm Booking
                                </button>
                            </form></p>
                        <button onClick={() => setShowModal(false)} className="mt-4 bg-gray-200 px-4 py-2 rounded-lg">Close</button>
                    </div>
                </div>
            )}
        </div>
    )
}