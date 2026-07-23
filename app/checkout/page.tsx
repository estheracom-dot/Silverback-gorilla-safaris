'use client'
import { useState } from 'react'

export default function CheckoutPage() {
    const [loading, setLoading] = useState(false)

    const handlePayPal = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/payments/paypal/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: "10.00",
                    tourName: "Murchison Falls Safari" // change this later
                })
            })

            const data = await res.json()

            if (data.approval_url) {
                window.location.href = data.approval_url // sends user to PayPal
            }
        } catch (err) {
            console.error(err)
            alert("Payment failed to start")
            setLoading(false)
        }
    }

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>

            <div className="mb-4">
                <p className="font-semibold">Tour: Murchison Falls Safari</p>
                <p className="text-3xl font-bold">$10.00</p>
            </div>

            <button
                onClick={handlePayPal}
                disabled={loading}
                className="w-full bg-[#0070ba] hover:bg-[#003087] text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50"
            >
                {loading ? "Redirecting..." : "Pay with PayPal"}
            </button>
        </div>
    )
}