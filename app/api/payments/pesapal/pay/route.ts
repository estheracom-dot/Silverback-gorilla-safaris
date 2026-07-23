import { NextResponse } from "next/server"

const PESAPAL_URL = process.env.NODE_ENV === 'production'
    ? 'https://pay.pesapal.com/v3'
    : 'https://cybqa.pesapal.com/pesapalv3' // sandbox

async function getToken() {
    console.log("GETTING TOKEN...")
    const res = await fetch(`${PESAPAL_URL}/api/Auth/RequestToken`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            consumer_key: process.env.PESAPAL_CONSUMER_KEY,
            consumer_secret: process.env.PESAPAL_CONSUMER_SECRET
        })
    })

    const data = await res.json()
    console.log("TOKEN RESPONSE:", data)
    return data.token
}

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const token = await getToken()

        const orderPayload = {
            id: `SAFARI-${Date.now()}`,
            currency: body.currency,
            amount: body.amount,
            description: body.description,
            callback_url: "http://localhost:3000/api/payments/pesapal/callback",
            billing_address: {
                email_address: "test@safarigo.com",
                phone_number: "256700000",
                country_code: "UG",
                first_name: "Test",
                last_name: "User"
            }
        }

        console.log("SENDING ORDER:", orderPayload)
        const orderRes = await fetch(`${PESAPAL_URL}/api/Transactions/SubmitOrderRequest`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(orderPayload)
        })

        const orderData = await orderRes.json()
        console.log("ORDER RESPONSE:", orderData)

        return NextResponse.json({ redirect_url: orderData.redirect_url }) // <-- THIS CLOSES TRY

    } catch (error: any) {  // <-- NOW CATCH WORKS
        console.error("PESAPAL ERROR:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}