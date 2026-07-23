'use client'

import { useState } from 'react'

export default function HomePage() {
  const [loading, setLoading] = useState(false)

  const handleTestPayment = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/payments/pesapal/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 1000,
          currency: 'UGX',
          description: 'SafariGo Test Payment'
        })
      })

      const data = await response.json()
      console.log("DATA FROM SERVER:", data)

      if (data.redirect_url) {
        window.location.href = data.redirect_url
      } else {
        alert("Server says: " + JSON.stringify(data))
      }

    } catch (error: any) {
      alert("Error: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white">
      <h1 className="text-4xl font-bold mb-4 text-black">Safari App</h1>
      <p className="text-lg mb-8 text-black">Test Pesapal Payment</p>

      <button
        onClick={handleTestPayment}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg text-lg"
      >
        {loading ? 'Processing...' : 'Pay UGX 1000 with Pesapal'}
      </button>
    </main>
  )
}