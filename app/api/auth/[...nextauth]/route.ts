import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log("Trying to login:", credentials?.email)

                // Accept anything that's not empty
                if (credentials?.email && credentials?.password) {
                    return {
                        id: "1",
                        name: credentials.email.split('@')[0],
                        email: credentials.email
                    }
                }
                return null
            }
        })
    ],
    pages: {
        signIn: "/login"
    },
    session: {
        strategy: "jwt"
    },
    secret: "safaritrips-dev-secret"
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
