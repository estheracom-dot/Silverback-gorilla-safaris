"use client"
import { useState } from "react"

export default function Contact() {
    const [sent, setSent] = useState(false)

    return (
        <main className="max-w-2xl mx-auto px-6 py-20">
            <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

            {!sent ? (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full border p-3 rounded-lg" required />
                    <input type="email" placeholder="Your Email" className="w-full border p-3 rounded-lg" required />
                    <textarea placeholder="Your Message" rows={5} className="w-full border p-3 rounded-lg" required></textarea>
                    <button type="submit" className="bg-green-700 text-white px-8 py-3 rounded-lg font-semibold">Send Message</button>
                </form>
            ) : (
                <p className="text-green-700 text-xl">Thanks! We'll get back to you soon 💚</p>
            )}
        </main>
    )
}