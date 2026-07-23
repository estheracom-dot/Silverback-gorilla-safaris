import { NextResponse } from 'next/server'

const PAYPAL_API = process.env.PAYPAL_ENV === 'production'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com'

async function getPayPalToken() {
    const auth = Buffer.from(
        `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString('base64')

    const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials'
    })
    const data = await res.json()
    return data.access_token
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const token = await getPayPalToken()

        const orderData = {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: body.currency, // 'USD'
                    value: body.amount // '10.00'
                },
                description: body.description
            }],
            application_context: {
                return_url: 'http://localhost:3000/payment-success',
                cancel_url: 'http://localhost:3000/payment-cancel'
            }
        }

        const res = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(orderData)
        })

        const order = await res.json()
        console.log("PAYPAL ORDER:", order)

        // Find the approval_url
        const approvalUrl = order.links.find((l: any) => l.rel === 'approve').href
        return NextResponse.json({ approval_url: approvalUrl })

    } catch (error: any) {
        console.error("PAYPAL ERROR:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}