"use client"
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

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server returned an error:', response.status, errorText);
        throw new Error(`Payment failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Pesapal response:", data);

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl; // Redirects to Pesapal
      } else {
        alert("Error: " + (data.error || "No redirect URL provided"));
      }

    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Failed to start payment");
    } finally {
      setLoading(false);
    }
  }

  // The return statement MUST be outside the handleTestPayment function!
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