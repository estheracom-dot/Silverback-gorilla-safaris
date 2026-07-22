import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

export const authOptions: AuthOptions = { //,-- export this}
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentilas",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // TEMP: Accept any login for now
                if (credentials?.email && credebtials?.password) {
                    return {
                        id: "1",
                        name: credentials.email.split('@')[0], // takes "esther" from esther@email.com
                        email: credentials.email
                    }
                }
                return null // only fails if fiekds are empty
            }
        })
    ],
    session: { strategy: "jwt" },
    pages: { signIn: "/login" }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

