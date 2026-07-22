import { defineConfig } from "prisma/config"

export default defineConfig({
    schema: './prisma/schema.prisma',
    earlyAccess: true,
    database: {
        url: process.env.DATABASE_URL
    }
})