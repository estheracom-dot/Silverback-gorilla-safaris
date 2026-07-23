import { NextResponse } from "next/server"
import axios from "axios"

export async function POST(req: Request) {
    try {
        console.log("ENV KEY:", process.env.PESAPAL_CONSUMER_KEY ? "FOUND" : "MISSING")

        const body = await req.json()
        console.log("BODY RECEIVED:", body)

        // 1. Get Token
        const tokenRes = await axios.post(`${process.env.PESAPAL_BASE_URL}/api/Auth/RequestToken`, {
            consumer_key: process.env.PESAPAL_CONSUMER_KEY,
            consumer_secret: process.env.PESAPAL_CONSUMER_SECRET
        })
        console.log("TOKEN RESPONSE:", tokenRes.data)
        const token = tokenRes.data.token

        // 2. Submit Order
        const orderRes = await axios.post(`${process.env.PESAPAL_BASE_URL}/api/Transactions/SubmitOrderRequest`, {
            id: body.bookingId,
            currency: "UGX",
            amount: body.amount,
            description: body.description,
            callback_url: process.env.PESAPAL_CALLBACK_URL,
            notification_id: crypto.randomUUID(),
            billing_address: {
                email_address: body.email,
                phone_number: body.phone,
                first_name: body.firstName,
                last_name: body.lastName
            }
        }, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })

        console.log("ORDER RESPONSE:", orderRes.data)
        return NextResponse.json({ redirectUrl: orderRes.data.redirect_url })

    } catch (error: any) {
        console.log("FULL PESAPAL ERROR:", error.response?.data || error.message)
        return NextResponse.json({ error: error.response?.data || error.message }, { status: 500 })
    }
}