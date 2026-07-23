"use client" // must be first line
import { useState } from "react"

export default function HomePage() {
  const [loading, setLoading] = useState(false)

  const handleTestPayment = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/payments/pesapal/pay', {
        method: 'POST',
        // ... your headers and body
      });

      // Check if the response is NOT OK (e.g., a 500 error)
      if (!response.ok) {
        // Read the text to see what the server actually sent back
        const errorText = await response.text();
        console.error('Server returned an error:', response.status, errorText);
        throw new Error(`Payment failed with status: ${response.status}`);
      }

      // Only parse as JSON if the response was successful
      const data = await response.json();
      console.log("Payment successful!", data);

    } catch (error) {
      console.error("Error processing payment:", error);
      // Handle the UI state here (e.g., show an error toast to the user)
    }


    const data = await res.json()
    console.log("Pesapal response:", data)

    if (data.redirectUrl) {
      window.location.href = data.redirectUrl // BOOM -> goes to Pesapal
    } else {
      alert("Error: " + data.error)
    }
    fetch('/api/payments/pesapal/pay')
      .then(data => {
        console.log("payment successful!", data);
      })
      .catch(err => {
        console.error(err)
        alert("Failed to start payment")
      })
      .finally(() => {
        setLoading(false)
      })

    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-8">Safari App</h1>
        <p className="mb-4">Test Pesapal Payment</p>

        <button
          onClick={handleTestPayment}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold disabled:opacity-50"
        >
          {loading ? "Redirecting to Pesapal..." : "Pay UGX 1000 with Pesapal"}
        </button>
      </main>
    )
  }
}
