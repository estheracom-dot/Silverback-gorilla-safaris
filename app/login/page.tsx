"use client"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const res = await signIn("credentials", {
            email, password, redirect: false
        })

        if (res?.ok) router.push("/dashboard")
        else alert("Invalid login")
    }


    return (
        <div className="flex min-h-screen items-center justify-center">
            <form onSubmit={handleSubmit} className="p-8 border rounded-lg  w-96">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 w-full mb-3" />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="border p-2 w-full mb-3" />
                <button type="submit" className="bg-black text-white p-2 w-full rounded">Login</button>
            </form>
        </div>
    )
}
